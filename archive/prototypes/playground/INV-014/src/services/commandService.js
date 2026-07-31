/**
 * Command Service
 * 
 * Pattern 7: Command Sequencing
 * 
 * Implements command lifecycle:
 * PENDING → EXECUTING → EXECUTED
 *     ↓           ↓
 *  CANCELLED   FAILED
 * 
 * @evidence KDE-ARCH-009 Pattern 7
 */

const { v4: uuidv4 } = require('uuid');

class CommandService {
    constructor(alarmService) {
        this.commands = new Map();
        this.alarmService = alarmService;
        
        // Command timeout (default 30 seconds)
        this.commandTimeout = 30000;
        
        // Valid command types
        this.validCommandTypes = [
            'open',      // Open breaker/switch
            'close',     // Close breaker/switch
            'set',       // Set parameter
            'reset',     // Reset device
            'trip',      // Trip breaker
            'select',    // Select for control
            'deselect'   // Deselect
        ];
    }
    
    /**
     * Issue a new command
     * Pattern 7: Command Sequencing with Issue → Execute → Result
     */
    issueCommand(commandData) {
        // Validate command
        if (!this.validCommandTypes.includes(commandData.commandType)) {
            throw new Error(`Invalid command type: ${commandData.commandType}`);
        }
        
        if (!commandData.deviceId) {
            throw new Error('Device ID is required');
        }
        
        const command = {
            id: uuidv4(),
            device_id: commandData.deviceId,
            command_type: commandData.commandType,
            parameters: commandData.parameters || {},
            status: 'pending',
            issued_by: commandData.operatorId || 'system',
            issued_at: Date.now(),
            started_at: null,
            completed_at: null,
            result: null,
            error: null,
            timeout_at: Date.now() + this.commandTimeout,
            history: [{
                event: 'issued',
                timestamp: Date.now(),
                operator_id: commandData.operatorId
            }]
        };
        
        this.commands.set(command.id, command);
        
        // Auto-execute after short delay (simulating device response)
        setTimeout(() => this.executeCommand(command.id), 1000);
        
        return command;
    }
    
    /**
     * Execute a pending command
     * Pattern 7: Execute phase
     */
    executeCommand(commandId) {
        const command = this.commands.get(commandId);
        if (!command) return;
        
        if (command.status !== 'pending') return;
        
        command.status = 'executing';
        command.started_at = Date.now();
        
        command.history.push({
            event: 'executing',
            timestamp: Date.now()
        });
        
        // Simulate command execution (in production, this would communicate with device)
        const success = Math.random() > 0.05; // 95% success rate
        
        setTimeout(() => {
            if (success) {
                this.completeCommand(commandId, { success: true });
            } else {
                this.failCommand(commandId, { error: 'Device communication timeout' });
            }
        }, 2000);
    }
    
    /**
     * Complete command successfully
     */
    completeCommand(commandId, result) {
        const command = this.commands.get(commandId);
        if (!command) return;
        
        command.status = 'executed';
        command.completed_at = Date.now();
        command.result = result;
        
        command.history.push({
            event: 'completed',
            timestamp: Date.now(),
            success: true
        });
    }
    
    /**
     * Fail command
     */
    failCommand(commandId, error) {
        const command = this.commands.get(commandId);
        if (!command) return;
        
        command.status = 'failed';
        command.completed_at = Date.now();
        command.error = error.error || 'Unknown error';
        
        command.history.push({
            event: 'failed',
            timestamp: Date.now(),
            error: command.error
        });
    }
    
    /**
     * Cancel pending command
     */
    cancelCommand(commandId) {
        const command = this.commands.get(commandId);
        if (!command) {
            throw new Error(`Command not found: ${commandId}`);
        }
        
        if (command.status !== 'pending') {
            throw new Error(`Cannot cancel command in ${command.status} state`);
        }
        
        command.status = 'cancelled';
        command.completed_at = Date.now();
        
        command.history.push({
            event: 'cancelled',
            timestamp: Date.now()
        });
        
        return command;
    }
    
    /**
     * Get command by ID
     */
    getCommand(commandId) {
        return this.commands.get(commandId);
    }
    
    /**
     * Get command history with optional filters
     */
    getHistory(filters = {}) {
        let results = Array.from(this.commands.values());
        
        if (filters.deviceId) {
            results = results.filter(c => c.device_id === filters.deviceId);
        }
        
        if (filters.status) {
            results = results.filter(c => c.status === filters.status);
        }
        
        if (filters.limit) {
            results = results.slice(0, filters.limit);
        }
        
        // Sort by timestamp (newer first)
        results.sort((a, b) => b.issued_at - a.issued_at);
        
        return results;
    }
    
    /**
     * Check for timed out commands
     */
    checkTimeouts() {
        const now = Date.now();
        
        this.commands.forEach((command, id) => {
            if (command.status === 'pending' && now > command.timeout_at) {
                this.failCommand(id, { error: 'Command timeout' });
            }
        });
    }
    
    /**
     * Get command statistics
     */
    getStatistics() {
        const all = Array.from(this.commands.values());
        
        return {
            total: all.length,
            pending: all.filter(c => c.status === 'pending').length,
            executing: all.filter(c => c.status === 'executing').length,
            executed: all.filter(c => c.status === 'executed').length,
            failed: all.filter(c => c.status === 'failed').length,
            cancelled: all.filter(c => c.status === 'cancelled').length,
            success_rate: all.length > 0 
                ? (all.filter(c => c.status === 'executed').length / all.length * 100).toFixed(1)
                : 0
        };
    }
}

module.exports = CommandService;
