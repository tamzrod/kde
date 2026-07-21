/**
 * Marinduque SCADA Backend Server
 * 
 * Based on KDE-ARCH-009 SCADA Platform Architecture Patterns:
 * - Pattern 2: Backend-as-Abstraction-Layer
 * - Pattern 3: WebSocket Subscription Model
 * - Pattern 4: Alarm State Machine
 * - Pattern 7: Command Sequencing
 * - Pattern 8: Circuit Breaker for Services
 * 
 * @evidence KDE-ARCH-009 Patterns 2, 3, 4, 7, 8
 */

const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid');

// Import services
const TelemetryService = require('../services/telemetryService');
const AlarmService = require('../services/alarmService');
const CommandService = require('../services/commandService');
const DeviceModel = require('../services/deviceModel');
const MockDataGenerator = require('../services/mockDataGenerator');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// Services (per KDE-ARCH-009 Pattern 2: Backend-as-Abstraction-Layer)
const telemetryService = new TelemetryService();
const alarmService = new AlarmService();
const commandService = new CommandService(alarmService);
const deviceModel = new DeviceModel();
const mockDataGenerator = new MockDataGenerator(deviceModel);

// Circuit breaker state (Pattern 8)
const circuitBreakers = {
    telemetry: { state: 'CLOSED', failures: 0, lastFailure: null },
    alarm: { state: 'CLOSED', failures: 0, lastFailure: null },
    command: { state: 'CLOSED', failures: 0, lastFailure: null }
};

// WebSocket subscription manager (Pattern 3)
const subscriptions = new Map();

/**
 * WebSocket Connection Handler
 * Implements topic-based subscriptions per Pattern 3
 */
io.on('connection', (socket) => {
    console.log(`[WS] Client connected: ${socket.id}`);
    subscriptions.set(socket.id, {
        channels: new Set(['system']),  // Default channel
        socket
    });

    // Handle subscription requests
    socket.on('subscribe', (data) => {
        const sub = subscriptions.get(socket.id);
        if (sub && data.channels) {
            data.channels.forEach(ch => sub.channels.add(ch));
            console.log(`[WS] ${socket.id} subscribed to: ${data.channels}`);
        }
    });

    socket.on('unsubscribe', (data) => {
        const sub = subscriptions.get(socket.id);
        if (sub && data.channels) {
            data.channels.forEach(ch => sub.channels.delete(ch));
        }
    });

    socket.on('disconnect', () => {
        subscriptions.delete(socket.id);
        console.log(`[WS] Client disconnected: ${socket.id}`);
    });
});

/**
 * Broadcast to subscribed clients only
 * Implements Pattern 3: WebSocket Subscription Model
 */
function broadcast(channel, message) {
    subscriptions.forEach((sub, socketId) => {
        if (sub.channels.has(channel)) {
            sub.socket.emit(channel, message);
        }
    });
}

/**
 * Circuit Breaker Implementation
 * Pattern 8: Circuit Breaker for Services
 */
function checkCircuitBreaker(service) {
    const cb = circuitBreakers[service];
    if (cb.state === 'OPEN') {
        const timeSinceFailure = Date.now() - cb.lastFailure;
        if (timeSinceFailure > 30000) {  // Try after 30s
            cb.state = 'HALF_OPEN';
        } else {
            return false;  // Fail fast
        }
    }
    return true;
}

function recordFailure(service) {
    const cb = circuitBreakers[service];
    cb.failures++;
    cb.lastFailure = Date.now();
    if (cb.failures >= 5) {
        cb.state = 'OPEN';
    }
}

function recordSuccess(service) {
    circuitBreakers[service].failures = 0;
    circuitBreakers[service].state = 'CLOSED';
}

// ==================== REST API ENDPOINTS ====================

/**
 * Health Check
 */
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        uptime: process.uptime(),
        services: {
            telemetry: circuitBreakers.telemetry.state,
            alarm: circuitBreakers.alarm.state,
            command: circuitBreakers.command.state
        }
    });
});

/**
 * Get Current Telemetry (Pattern 1: Polyglot Persistence)
 */
app.get('/api/telemetry/current', (req, res) => {
    if (!checkCircuitBreaker('telemetry')) {
        return res.status(503).json({ error: 'Service temporarily unavailable' });
    }
    
    try {
        const data = telemetryService.getCurrentValues();
        recordSuccess('telemetry');
        res.json(data);
    } catch (error) {
        recordFailure('telemetry');
        res.status(500).json({ error: error.message });
    }
});

/**
 * Get Historical Telemetry
 */
app.get('/api/telemetry/history/:deviceId', (req, res) => {
    const { deviceId } = req.params;
    const { from, to, resolution } = req.query;
    
    try {
        const data = telemetryService.getHistory(deviceId, { from, to, resolution });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Get Device List
 * Pattern 6: Hierarchical Device Model
 */
app.get('/api/devices', (req, res) => {
    const hierarchy = req.query.hierarchy === 'true';
    
    try {
        const devices = hierarchy 
            ? deviceModel.getHierarchy() 
            : deviceModel.getAllDevices();
        res.json(devices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Get Device Details
 */
app.get('/api/devices/:deviceId', (req, res) => {
    const { deviceId } = req.params;
    const device = deviceModel.getDevice(deviceId);
    
    if (!device) {
        return res.status(404).json({ error: 'Device not found' });
    }
    res.json(device);
});

/**
 * Get Active Alarms
 * Pattern 4: Alarm State Machine
 */
app.get('/api/alarms', (req, res) => {
    const { state, severity } = req.query;
    
    try {
        const alarms = alarmService.getAlarms({ state, severity });
        res.json(alarms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Get Alarm Details
 */
app.get('/api/alarms/:alarmId', (req, res) => {
    const { alarmId } = req.params;
    const alarm = alarmService.getAlarm(alarmId);
    
    if (!alarm) {
        return res.status(404).json({ error: 'Alarm not found' });
    }
    res.json(alarm);
});

/**
 * Acknowledge Alarm
 * Pattern 4: Alarm State Machine
 */
app.post('/api/alarms/:alarmId/acknowledge', (req, res) => {
    const { alarmId } = req.params;
    const { operatorId } = req.body;
    
    try {
        const alarm = alarmService.acknowledge(alarmId, operatorId);
        
        // Broadcast alarm update (Pattern 3)
        broadcast('alarms', { type: 'alarm_update', payload: alarm });
        
        res.json(alarm);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * Clear Alarm
 * Pattern 4: Alarm State Machine
 */
app.post('/api/alarms/:alarmId/clear', (req, res) => {
    const { alarmId } = req.params;
    const { operatorId, reason } = req.body;
    
    try {
        const alarm = alarmService.clear(alarmId, operatorId, reason);
        broadcast('alarms', { type: 'alarm_update', payload: alarm });
        res.json(alarm);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * Issue Command
 * Pattern 7: Command Sequencing
 */
app.post('/api/commands', (req, res) => {
    const { deviceId, commandType, parameters, operatorId } = req.body;
    
    try {
        const command = commandService.issueCommand({
            deviceId,
            commandType,
            parameters,
            operatorId
        });
        
        // Broadcast command update (Pattern 3)
        broadcast('commands', { type: 'command_update', payload: command });
        
        res.status(201).json(command);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * Get Command Status
 */
app.get('/api/commands/:commandId', (req, res) => {
    const { commandId } = req.params;
    const command = commandService.getCommand(commandId);
    
    if (!command) {
        return res.status(404).json({ error: 'Command not found' });
    }
    res.json(command);
});

/**
 * Cancel Command
 */
app.post('/api/commands/:commandId/cancel', (req, res) => {
    const { commandId } = req.params;
    
    try {
        const command = commandService.cancelCommand(commandId);
        broadcast('commands', { type: 'command_update', payload: command });
        res.json(command);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * Get Command History
 */
app.get('/api/commands/history', (req, res) => {
    const { deviceId, limit } = req.query;
    const commands = commandService.getHistory({ deviceId, limit });
    res.json(commands);
});

/**
 * Get System Summary
 */
app.get('/api/system/summary', (req, res) => {
    const summary = {
        generation: {
            total: 0,
            byPlant: {}
        },
        load: {
            total: 0,
            byFeeder: {}
        },
        alarms: {
            critical: 0,
            warning: 0,
            info: 0
        },
        systemHealth: {
            availability: 100,
            latency: 45,
            alarmResponse: '<2s',
            commandSuccess: 99
        }
    };
    
    // Calculate generation
    deviceModel.getDevicesByType('generator').forEach(gen => {
        const telemetry = telemetryService.getCurrentValues();
        const value = telemetry[gen.id]?.active_power || 0;
        summary.generation.total += value;
        const plant = gen.parent_id;
        summary.generation.byPlant[plant] = (summary.generation.byPlant[plant] || 0) + value;
    });
    
    // Calculate load
    deviceModel.getDevicesByType('feeder').forEach(feeder => {
        const telemetry = telemetryService.getCurrentValues();
        const value = telemetry[feeder.id]?.power_flow || 0;
        summary.load.total += value;
        summary.load.byFeeder[feeder.id] = value;
    });
    
    // Count alarms by severity
    alarmService.getAlarms({ state: 'active' }).forEach(alarm => {
        summary.alarms[alarm.severity]++;
    });
    
    res.json(summary);
});

// ==================== MOCK DATA SIMULATION ====================

/**
 * Start mock data generation
 * Pattern 5: Electrical Consistency in Mock Data
 */
function startSimulation() {
    console.log('[SIM] Starting mock data simulation...');
    
    // Initialize devices and start telemetry generation
    mockDataGenerator.initialize();
    
    // Generate telemetry every 500ms (Pattern 11: Delta Compression)
    setInterval(() => {
        const updates = mockDataGenerator.generateTelemetryBatch();
        
        // Only broadcast changed values
        updates.forEach(update => {
            broadcast('telemetry', {
                type: 'telemetry',
                device_id: update.device_id,
                tag_id: update.tag_id,
                value: update.value,
                timestamp: update.timestamp,
                quality: update.quality
            });
        });
    }, 500);
    
    // Generate alarms periodically
    setInterval(() => {
        const alarm = mockDataGenerator.generateRandomAlarm();
        if (alarm) {
            alarmService.addAlarm(alarm);
            broadcast('alarms', { type: 'alarm_new', payload: alarm });
        }
    }, 30000);
    
    console.log('[SIM] Mock simulation running');
}

// ==================== SERVER STARTUP ====================

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║          MARINDUQUE SCADA BACKEND SERVER                      ║
╠═══════════════════════════════════════════════════════════════╣
║  Port: ${PORT}                                                    ║
║  WebSocket: ws://localhost:${PORT}                              ║
║                                                               ║
║  Based on KDE-ARCH-009 Patterns:                             ║
║  • Pattern 2: Backend-as-Abstraction-Layer                    ║
║  • Pattern 3: WebSocket Subscription Model                   ║
║  • Pattern 4: Alarm State Machine                             ║
║  • Pattern 7: Command Sequencing                              ║
║  • Pattern 8: Circuit Breaker                                 ║
╚═══════════════════════════════════════════════════════════════╝
    `);
    
    // Initialize mock data
    startSimulation();
});
