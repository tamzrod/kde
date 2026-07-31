/**
 * Alarm Service
 * 
 * Pattern 4: Alarm State Machine
 * 
 * Implements multi-state alarm model:
 * ACTIVE → ACKNOWLEDGED → CLEARED
 *     ↓          ↓
 *  SHELVED    SHELVED
 * 
 * @evidence KDE-ARCH-009 Pattern 4
 */

const { v4: uuidv4 } = require('uuid');

class AlarmService {
    constructor() {
        this.alarms = new Map();
        
        // State transitions per Pattern 4
        this.validTransitions = {
            'active': ['acknowledged', 'cleared', 'shelved'],
            'acknowledged': ['cleared', 'shelved'],
            'shelved': ['active'],  // Unshelve returns to active
            'cleared': [],  // Terminal state
            'suppressed': ['active']  // Can unsuppress
        };
    }
    
    /**
     * Add a new alarm
     */
    addAlarm(alarmData) {
        const alarm = {
            id: uuidv4(),
            state: 'active',
            severity: alarmData.severity || 'info',
            priority: alarmData.priority || 50,
            device_id: alarmData.device_id,
            message: alarmData.message,
            condition: alarmData.condition,
            threshold: alarmData.threshold,
            current_value: alarmData.current_value,
            timestamp: Date.now(),
            acknowledged_at: null,
            acknowledged_by: null,
            cleared_at: null,
            cleared_by: null,
            clear_reason: null,
            shelved_at: null,
            shelved_until: null,
            shelved_by: null,
            history: [{
                event: 'created',
                timestamp: Date.now(),
                details: alarmData
            }]
        };
        
        this.alarms.set(alarm.id, alarm);
        return alarm;
    }
    
    /**
     * Check if transition is valid
     */
    canTransition(alarmId, newState) {
        const alarm = this.alarms.get(alarmId);
        if (!alarm) return false;
        
        return this.validTransitions[alarm.state]?.includes(newState) || false;
    }
    
    /**
     * Transition alarm to new state
     */
    transition(alarmId, newState, metadata = {}) {
        const alarm = this.alarms.get(alarmId);
        if (!alarm) {
            throw new Error(`Alarm not found: ${alarmId}`);
        }
        
        if (!this.canTransition(alarmId, newState)) {
            throw new Error(`Invalid transition: ${alarm.state} → ${newState}`);
        }
        
        const oldState = alarm.state;
        alarm.state = newState;
        
        // Record state change
        alarm.history.push({
            event: 'state_change',
            timestamp: Date.now(),
            from_state: oldState,
            to_state: newState,
            ...metadata
        });
        
        // Update relevant timestamp fields
        switch (newState) {
            case 'acknowledged':
                alarm.acknowledged_at = Date.now();
                alarm.acknowledged_by = metadata.operator_id;
                break;
            case 'cleared':
                alarm.cleared_at = Date.now();
                alarm.cleared_by = metadata.operator_id;
                alarm.clear_reason = metadata.reason;
                break;
            case 'shelved':
                alarm.shelved_at = Date.now();
                alarm.shelved_until = metadata.until || (Date.now() + 8 * 60 * 60 * 1000); // Default 8 hours
                alarm.shelved_by = metadata.operator_id;
                break;
            case 'active':
                // Unshelving
                alarm.shelved_until = null;
                break;
        }
        
        return alarm;
    }
    
    /**
     * Acknowledge alarm
     */
    acknowledge(alarmId, operatorId) {
        return this.transition(alarmId, 'acknowledged', { operator_id: operatorId });
    }
    
    /**
     * Clear alarm
     */
    clear(alarmId, operatorId, reason) {
        return this.transition(alarmId, 'cleared', { 
            operator_id: operatorId, 
            reason: reason 
        });
    }
    
    /**
     * Shelve alarm (for maintenance)
     */
    shelve(alarmId, operatorId, durationHours = 8) {
        return this.transition(alarmId, 'shelved', { 
            operator_id: operatorId,
            until: Date.now() + (durationHours * 60 * 60 * 1000)
        });
    }
    
    /**
     * Unshelve alarm
     */
    unshelve(alarmId) {
        return this.transition(alarmId, 'active', { event: 'unshelved' });
    }
    
    /**
     * Get alarm by ID
     */
    getAlarm(alarmId) {
        return this.alarms.get(alarmId);
    }
    
    /**
     * Get alarms with optional filters
     */
    getAlarms(filters = {}) {
        let results = Array.from(this.alarms.values());
        
        if (filters.state) {
            if (Array.isArray(filters.state)) {
                results = results.filter(a => filters.state.includes(a.state));
            } else {
                results = results.filter(a => a.state === filters.state);
            }
        }
        
        if (filters.severity) {
            if (Array.isArray(filters.severity)) {
                results = results.filter(a => filters.severity.includes(a.severity));
            } else {
                results = results.filter(a => a.severity === filters.severity);
            }
        }
        
        if (filters.device_id) {
            results = results.filter(a => a.device_id === filters.device_id);
        }
        
        // Sort by priority (higher first), then by timestamp (newer first)
        results.sort((a, b) => {
            if (b.priority !== a.priority) {
                return b.priority - a.priority;
            }
            return b.timestamp - a.timestamp;
        });
        
        return results;
    }
    
    /**
     * Get active alarm count by severity
     */
    getActiveCounts() {
        const active = this.getAlarms({ state: ['active', 'acknowledged'] });
        
        return {
            critical: active.filter(a => a.severity === 'critical').length,
            warning: active.filter(a => a.severity === 'warning').length,
            info: active.filter(a => a.severity === 'info').length,
            total: active.length
        };
    }
    
    /**
     * Get alarm history
     */
    getHistory(alarmId) {
        const alarm = this.alarms.get(alarmId);
        return alarm ? alarm.history : [];
    }
    
    /**
     * Check for alarm conditions (called by mock data generator)
     */
    checkCondition(deviceId, tagId, value, condition) {
        // Simple condition checking
        // Format: "value > threshold" or "value < threshold"
        const match = condition.match(/(\w+)\s*(>|<|>=|<=|==|!=)\s*([\d.]+)/);
        if (!match) return false;
        
        const [, , operator, threshold] = match;
        const thresholdValue = parseFloat(threshold);
        
        switch (operator) {
            case '>': return value > thresholdValue;
            case '<': return value < thresholdValue;
            case '>=': return value >= thresholdValue;
            case '<=': return value <= thresholdValue;
            case '==': return value === thresholdValue;
            case '!=': return value !== thresholdValue;
            default: return false;
        }
    }
}

module.exports = AlarmService;
