const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = process.env.PORT || 8086;
const TICK_INTERVAL = parseInt(process.env.TICK_INTERVAL) || 1000;

const LOKI_URL = process.env.LOKI_URL || 'http://loki:3100';
const INFLUXDB_URL = process.env.INFLUXDB_URL || 'http://influxdb:8086';
const INFLUXDB_TOKEN = process.env.INFLUXDB_TOKEN || 'scada-influx-token';
const INFLUXDB_ORG = process.env.INFLUXDB_ORG || 'scada';

app.use(express.json());

// ============================================
// GRID MODEL - Distribution Utility Grid
// ============================================

class GridModel {
  constructor() {
    this.simulationTime = 0;
    this.isRunning = false;
    this.lastTick = Date.now();
    
    // Initialize grid components
    this.initializeGrid();
  }
  
  initializeGrid() {
    // Substations
    this.substations = [
      {
        id: '11111111-1111-1111-1111-111111111111',
        name: 'North Substation',
        primaryVoltage: 138000,
        secondaryVoltage: 13800,
        feederIds: ['aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'],
        state: 'energized',
        activePower: 45,
        reactivePower: 12,
        // Internal state for simulation
        _loadBase: 45,
        _hourOfDay: 12,
      },
      {
        id: '22222222-2222-2222-2222-222222222222',
        name: 'South Substation',
        primaryVoltage: 138000,
        secondaryVoltage: 13800,
        feederIds: ['cccccccc-cccc-cccc-cccc-cccccccccccc'],
        state: 'energized',
        activePower: 38,
        reactivePower: 8,
        _loadBase: 38,
        _hourOfDay: 12,
      },
    ];
    
    // Feeders
    this.feeders = [
      {
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        name: 'North Feeder 1',
        substationId: '11111111-1111-1111-1111-111111111111',
        nominalVoltage: 13800,
        status: 'energized',
        headCurrent: 220,
        headVoltage: 13800,
        powerFlow: 5.2,
        loadFactor: 0.65,
        impedance: { r: 0.2, x: 0.4 },
        lengthKm: 5.5,
        // Devices on this feeder
        devices: ['brk-001', 'sec-001', 'xfmr-001', 'cap-001', 'rec-001', 'der-001', 'load-001', 'load-002'],
      },
      {
        id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        name: 'North Feeder 2',
        substationId: '11111111-1111-1111-1111-111111111111',
        nominalVoltage: 13800,
        status: 'energized',
        headCurrent: 180,
        headVoltage: 13800,
        powerFlow: 4.1,
        loadFactor: 0.55,
        impedance: { r: 0.25, x: 0.45 },
        lengthKm: 4.2,
        devices: ['brk-002', 'sec-002', 'xfmr-002', 'cap-002', 'rec-002', 'der-002', 'load-003'],
      },
      {
        id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
        name: 'South Feeder 1',
        substationId: '22222222-2222-2222-2222-222222222222',
        nominalVoltage: 13800,
        status: 'energized',
        headCurrent: 150,
        headVoltage: 13800,
        powerFlow: 3.2,
        loadFactor: 0.5,
        impedance: { r: 0.22, x: 0.42 },
        lengthKm: 3.8,
        devices: ['brk-003', 'sec-003', 'load-004'],
      },
    ];
    
    // Devices with measurements
    this.devices = {
      // Breakers
      'brk-001': { type: 'breaker', feederId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', state: 'closed', measurements: { position: 1, current: 220, trip_coil_status: 1 } },
      'brk-002': { type: 'breaker', feederId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', state: 'closed', measurements: { position: 1, current: 180, trip_coil_status: 1 } },
      'brk-003': { type: 'breaker', feederId: 'cccccccc-cccc-cccc-cccc-cccccccccccc', state: 'closed', measurements: { position: 1, current: 150, trip_coil_status: 1 } },
      
      // Sectionalizers
      'sec-001': { type: 'sectionalizer', feederId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', state: 'closed', measurements: { position: 1, current: 180 } },
      'sec-002': { type: 'sectionalizer', feederId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', state: 'closed', measurements: { position: 1, current: 150 } },
      'sec-003': { type: 'sectionalizer', feederId: 'cccccccc-cccc-cccc-cccc-cccccccccccc', state: 'closed', measurements: { position: 1, current: 130 } },
      
      // Transformers
      'xfmr-001': { type: 'transformer', feederId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', state: 'closed', measurements: { oil_temp: 55, winding_temp: 72, tap_position: 0 } },
      'xfmr-002': { type: 'transformer', feederId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', state: 'closed', measurements: { oil_temp: 52, winding_temp: 68, tap_position: -1 } },
      
      // Capacitor Banks
      'cap-001': { type: 'capacitor', feederId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', state: 'closed', measurements: { reactive_power: 2.0, current_step: 2 } },
      'cap-002': { type: 'capacitor', feederId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', state: 'closed', measurements: { reactive_power: 1.5, current_step: 1 } },
      
      // Reclosers
      'rec-001': { type: 'recloser', feederId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', state: 'closed', measurements: { position: 1, trip_count: 2, lockout: 0 } },
      'rec-002': { type: 'recloser', feederId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', state: 'closed', measurements: { position: 1, trip_count: 1, lockout: 0 } },
      
      // DER (Solar)
      'der-001': { type: 'der', feederId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', state: 'closed', measurements: { active_power: 3.5, irradiance: 850, status: 1 } },
      'der-002': { type: 'der', feederId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', state: 'closed', measurements: { active_power: 2.0, irradiance: 850, status: 1 } },
      
      // Loads
      'load-001': { type: 'load', feederId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', state: 'closed', measurements: { active_power: 2.0, power_factor: 0.92 } },
      'load-002': { type: 'load', feederId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', state: 'closed', measurements: { active_power: 1.0, power_factor: 0.88 } },
      'load-003': { type: 'load', feederId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', state: 'closed', measurements: { active_power: 1.5, power_factor: 0.90 } },
      'load-004': { type: 'load', feederId: 'cccccccc-cccc-cccc-cccc-cccccccccccc', state: 'closed', measurements: { active_power: 0.8, power_factor: 0.85 } },
    };
    
    // System-wide values
    this.system = {
      frequency: 60.0,
      totalGeneration: 83,
      totalLoad: 83,
      systemLosses: 0.5,
    };
    
    // Latest telemetry storage
    this.latestTelemetry = new Map();
  }
  
  // Calculate daily load profile factor (0-1)
  getDailyLoadFactor(hourOfDay) {
    // Weekday profile
    if (hourOfDay >= 0 && hourOfDay < 6) {
      // Night minimum
      return 0.45 + Math.sin(hourOfDay * Math.PI / 6) * 0.05;
    } else if (hourOfDay >= 6 && hourOfDay < 10) {
      // Morning ramp
      const t = (hourOfDay - 6) / 4;
      return 0.45 + 0.4 * t + Math.sin(t * Math.PI) * 0.05;
    } else if (hourOfDay >= 10 && hourOfDay < 18) {
      // Daytime peak
      return 0.85 + Math.sin((hourOfDay - 10) * Math.PI / 8) * 0.05;
    } else if (hourOfDay >= 18 && hourOfDay < 22) {
      // Evening peak
      const t = (hourOfDay - 18) / 4;
      return 0.90 - 0.2 * t + Math.sin(t * Math.PI) * 0.05;
    } else {
      // Night decline
      const t = (hourOfDay - 22) / 2;
      return 0.70 - 0.25 * t;
    }
  }
  
  // Calculate solar generation based on time
  getSolarGeneration(hourOfDay, capacity) {
    const sunrise = 6.5;
    const sunset = 18.5;
    
    if (hourOfDay < sunrise || hourOfDay > sunset) {
      return 0;
    }
    
    // Bell curve approximation of solar output
    const solarNoon = (sunrise + sunset) / 2;
    const peakHour = solarNoon;
    const spread = (sunset - sunrise) / 2;
    
    // Weather variation factor (simulated)
    const weatherFactor = 0.7 + Math.random() * 0.3;
    
    const irradiance = Math.exp(-Math.pow(hourOfDay - peakHour, 2) / (2 * Math.pow(spread / 2, 2))) * 1000;
    const efficiency = 0.18;
    
    return capacity * (irradiance / 1000) * efficiency * weatherFactor;
  }
  
  // Generate telemetry for one tick
  generateTelemetry() {
    const timestamp = Date.now();
    const telemetryBatch = [];
    
    // Calculate hour of day (simulated time)
    const hourOfDay = (this.simulationTime / 3600) % 24;
    const loadFactor = this.getDailyLoadFactor(hourOfDay);
    
    // Update substations
    this.substations.forEach(sub => {
      // Power follows daily load profile with small noise
      const targetPower = sub._loadBase * loadFactor;
      const noise = (Math.random() - 0.5) * 2;
      sub.activePower = Math.max(0, targetPower + noise);
      
      // Reactive power loosely follows active power
      sub.reactivePower = sub.activePower * 0.25 + (Math.random() - 0.5) * 2;
      
      // Voltage slightly varies
      const voltageVariation = (Math.random() - 0.5) * 500;
      sub.primaryVoltage = 138000 + voltageVariation;
      sub.secondaryVoltage = 13800 + voltageVariation / 10;
      
      // Record telemetry
      this.recordTelemetry(sub.id, 'active_power', sub.activePower, telemetryBatch, timestamp);
      this.recordTelemetry(sub.id, 'reactive_power', sub.reactivePower, telemetryBatch, timestamp);
      this.recordTelemetry(sub.id, 'voltage_primary', sub.primaryVoltage, telemetryBatch, timestamp);
      this.recordTelemetry(sub.id, 'voltage_secondary', sub.secondaryVoltage, telemetryBatch, timestamp);
      this.recordTelemetry(sub.id, 'frequency', this.system.frequency + (Math.random() - 0.5) * 0.02, telemetryBatch, timestamp);
    });
    
    // Update feeders
    this.feeders.forEach(feeder => {
      if (feeder.status === 'fault') {
        // During fault, current spikes
        feeder.headCurrent = 800 + Math.random() * 400;
        feeder.headVoltage = feeder.nominalVoltage * 0.7;
        feeder.powerFlow = feeder.headCurrent * feeder.headVoltage * Math.sqrt(3) / 1000000;
      } else {
        // Normal operation
        const baseCurrent = feeder.headCurrent / feeder.loadFactor * loadFactor;
        const noise = (Math.random() - 0.5) * 10;
        feeder.headCurrent = Math.max(50, baseCurrent + noise);
        
        // Voltage drop based on current and impedance
        const voltageDrop = feeder.headCurrent * feeder.impedance.r * feeder.lengthKm / 1000;
        feeder.headVoltage = feeder.nominalVoltage - voltageDrop;
        
        // Power flow
        feeder.powerFlow = feeder.headCurrent * feeder.headVoltage * Math.sqrt(3) / 1000000;
      }
      
      // Record telemetry
      this.recordTelemetry(feeder.id, 'current', feeder.headCurrent, telemetryBatch, timestamp);
      this.recordTelemetry(feeder.id, 'voltage', feeder.headVoltage, telemetryBatch, timestamp);
      this.recordTelemetry(feeder.id, 'active_power', feeder.powerFlow, telemetryBatch, timestamp);
    });
    
    // Update devices
    Object.entries(this.devices).forEach(([deviceId, device]) => {
      switch (device.type) {
        case 'breaker':
          // Small current variations
          device.measurements.current = device.measurements.position * (150 + Math.random() * 50);
          this.recordTelemetry(deviceId, 'position', device.measurements.position, telemetryBatch, timestamp);
          this.recordTelemetry(deviceId, 'current', device.measurements.current, telemetryBatch, timestamp);
          this.recordTelemetry(deviceId, 'trip_coil_status', device.measurements.trip_coil_status, telemetryBatch, timestamp);
          break;
          
        case 'transformer':
          // Temperature follows load with time delay
          const targetTemp = 45 + (device.measurements.current / 150) * 30;
          device.measurements.oil_temp += (targetTemp - device.measurements.oil_temp) * 0.1 + (Math.random() - 0.5) * 2;
          device.measurements.winding_temp = device.measurements.oil_temp * 1.3 + (Math.random() - 0.5) * 5;
          
          // Tap position adjusts for voltage regulation
          const xfmrFeeder = this.feeders.find(f => f.id === device.feederId);
          if (xfmrFeeder && xfmrFeeder.headVoltage < xfmrFeeder.nominalVoltage * 0.98) {
            device.measurements.tap_position = Math.min(16, device.measurements.tap_position + 1);
          } else if (xfmrFeeder && xfmrFeeder.headVoltage > xfmrFeeder.nominalVoltage * 1.02) {
            device.measurements.tap_position = Math.max(-16, device.measurements.tap_position - 1);
          }
          
          this.recordTelemetry(deviceId, 'oil_temp', device.measurements.oil_temp, telemetryBatch, timestamp);
          this.recordTelemetry(deviceId, 'winding_temp', device.measurements.winding_temp, telemetryBatch, timestamp);
          this.recordTelemetry(deviceId, 'tap_position', device.measurements.tap_position, telemetryBatch, timestamp);
          break;
          
        case 'capacitor':
          // Reactive power follows voltage (simplified)
          const capFeeder = this.feeders.find(f => f.id === device.feederId);
          if (capFeeder) {
            const baseKVAR = parseFloat(device.measurements.reactive_power) || 1.5;
            device.measurements.reactive_power = baseKVAR * (capFeeder.headVoltage / capFeeder.nominalVoltage) * (1 + (Math.random() - 0.5) * 0.1);
          }
          this.recordTelemetry(deviceId, 'reactive_power', device.measurements.reactive_power, telemetryBatch, timestamp);
          this.recordTelemetry(deviceId, 'current_step', device.measurements.current_step, telemetryBatch, timestamp);
          break;
          
        case 'recloser':
          this.recordTelemetry(deviceId, 'position', device.measurements.position, telemetryBatch, timestamp);
          this.recordTelemetry(deviceId, 'trip_count', device.measurements.trip_count, telemetryBatch, timestamp);
          this.recordTelemetry(deviceId, 'lockout', device.measurements.lockout, telemetryBatch, timestamp);
          break;
          
        case 'der':
          // Solar generation based on time
          const capacity = deviceId === 'der-001' ? 5 : 3;
          const solarOutput = this.getSolarGeneration(hourOfDay, capacity);
          device.measurements.active_power = solarOutput;
          device.measurements.irradiance = (solarOutput / capacity) * 1000;
          device.measurements.status = solarOutput > 0.1 ? 1 : 0;
          
          this.recordTelemetry(deviceId, 'active_power', device.measurements.active_power, telemetryBatch, timestamp);
          this.recordTelemetry(deviceId, 'irradiance', device.measurements.irradiance, telemetryBatch, timestamp);
          this.recordTelemetry(deviceId, 'status', device.measurements.status, telemetryBatch, timestamp);
          break;
          
        case 'load':
          // Load follows daily profile with variations
          const baseLoad = device.measurements.active_power || 1.0;
          const loadVariation = baseLoad * loadFactor * (1 + (Math.random() - 0.5) * 0.1);
          device.measurements.active_power = Math.max(0.1, loadVariation);
          device.measurements.power_factor = 0.85 + Math.random() * 0.1;
          
          this.recordTelemetry(deviceId, 'active_power', device.measurements.active_power, telemetryBatch, timestamp);
          this.recordTelemetry(deviceId, 'power_factor', device.measurements.power_factor, telemetryBatch, timestamp);
          break;
      }
    });
    
    // System frequency
    this.system.frequency = 60.0 + (Math.random() - 0.5) * 0.05;
    this.recordTelemetry('system', 'frequency', this.system.frequency, telemetryBatch, timestamp);
    
    return telemetryBatch;
  }
  
  recordTelemetry(deviceId, tagId, value, batch, timestamp) {
    const key = `${deviceId}:${tagId}`;
    const quality = 'good';
    
    const point = {
      deviceId,
      tagId,
      value: parseFloat(value.toFixed(4)),
      quality,
      timestamp: new Date(timestamp).toISOString(),
    };
    
    this.latestTelemetry.set(key, point);
    batch.push(point);
  }
  
  // Inject fault on a feeder
  injectFault(feederId) {
    const feeder = this.feeders.find(f => f.id === feederId);
    if (feeder) {
      feeder.status = 'fault';
      
      // Log event to Loki
      this.logEvent({
        type: 'fault',
        severity: 'critical',
        source: feederId,
        message: `Fault injected on feeder ${feeder.name}`,
        metadata: { feederId, faultType: 'SLG' },
      });
      
      return { success: true, message: `Fault injected on ${feeder.name}` };
    }
    return { success: false, message: 'Feeder not found' };
  }
  
  // Clear fault on a feeder
  clearFault(feederId) {
    const feeder = this.feeders.find(f => f.id === feederId);
    if (feeder) {
      feeder.status = 'energized';
      
      this.logEvent({
        type: 'fault',
        severity: 'info',
        source: feederId,
        message: `Fault cleared on feeder ${feeder.name}`,
        metadata: { feederId },
      });
      
      return { success: true, message: `Fault cleared on ${feeder.name}` };
    }
    return { success: false, message: 'Feeder not found' };
  }
  
  // Log event to Loki
  async logEvent(event) {
    const timestamp = new Date().toISOString();
    const logEntry = JSON.stringify({
      timestamp,
      ...event,
    }) + '\n';
    
    try {
      await fetch(`${LOKI_URL}/loki/api/v1/push`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          streams: [{
            stream: { app: 'scada', type: event.type },
            values: [[Date.now() * 1000000, logEntry]],
          }],
        }),
      });
    } catch (e) {
      console.error('Error logging to Loki:', e.message);
    }
  }
  
  // Send telemetry to InfluxDB (batched)
  async sendToInfluxDB(batch) {
    // For simplicity, we'll just log the batch
    // In production, this would write to InfluxDB
    if (batch.length > 0) {
      console.log(`[${new Date().toISOString()}] Telemetry batch: ${batch.length} points`);
    }
  }
}

// Initialize grid model
const grid = new GridModel();

// Active WebSocket clients
const wsClients = new Set();

// Simulation loop
let simulationInterval = null;

function startSimulation() {
  if (grid.isRunning) return;
  
  grid.isRunning = true;
  console.log('Simulation started');
  
  simulationInterval = setInterval(() => {
    if (!grid.isRunning) return;
    
    // Advance simulation time (1 second per tick)
    grid.simulationTime++;
    
    // Generate telemetry
    const telemetryBatch = grid.generateTelemetry();
    
    // Broadcast to WebSocket clients
    const message = {
      type: 'telemetry',
      channel: 'telemetry',
      timestamp: new Date().toISOString(),
      data: telemetryBatch,
    };
    
    wsClients.forEach(ws => {
      if (ws.readyState === 1) { // OPEN
        try {
          ws.send(JSON.stringify(message));
        } catch (e) {
          console.error('Error sending to WebSocket client:', e.message);
        }
      }
    });
    
    // Send to InfluxDB (async, don't wait)
    grid.sendToInfluxDB(telemetryBatch);
    
  }, TICK_INTERVAL);
}

function stopSimulation() {
  if (!grid.isRunning) return;
  
  grid.isRunning = false;
  if (simulationInterval) {
    clearInterval(simulationInterval);
    simulationInterval = null;
  }
  console.log('Simulation stopped');
}

// ============================================
// REST API
// ============================================

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    simulation: {
      isRunning: grid.isRunning,
      simulationTime: grid.simulationTime,
      tickInterval: TICK_INTERVAL,
    }
  });
});

app.get('/api/simulation/state', (req, res) => {
  res.json({
    success: true,
    data: {
      isRunning: grid.isRunning,
      simulationTime: grid.simulationTime,
      substations: grid.substations,
      feeders: grid.feeders,
      system: grid.system,
    },
  });
});

app.post('/api/simulation/start', (req, res) => {
  startSimulation();
  res.json({ success: true, message: 'Simulation started' });
});

app.post('/api/simulation/stop', (req, res) => {
  stopSimulation();
  res.json({ success: true, message: 'Simulation stopped' });
});

app.post('/api/simulation/fault', (req, res) => {
  const { feederId } = req.body;
  const result = grid.injectFault(feederId);
  res.json(result);
});

app.post('/api/simulation/clear-fault', (req, res) => {
  const { feederId } = req.body;
  const result = grid.clearFault(feederId);
  res.json(result);
});

// Get latest telemetry
app.get('/api/telemetry/latest', (req, res) => {
  const { deviceId } = req.query;
  
  let data = Array.from(grid.latestTelemetry.values());
  
  if (deviceId) {
    data = data.filter(t => t.deviceId === deviceId);
  }
  
  res.json({ success: true, data });
});

// ============================================
// WEBSOCKET SERVER
// ============================================

wss.on('connection', (ws) => {
  console.log('Simulation WebSocket client connected');
  wsClients.add(ws);
  
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('Received:', data);
      
      if (data.type === 'subscribe') {
        ws.send(JSON.stringify({
          type: 'subscribed',
          timestamp: new Date().toISOString(),
          data: { channels: data.channels || [] },
        }));
      }
    } catch (e) {
      console.error('Error parsing WebSocket message:', e.message);
    }
  });
  
  ws.on('close', () => {
    console.log('Simulation WebSocket client disconnected');
    wsClients.delete(ws);
  });
  
  ws.on('error', (error) => {
    console.error('WebSocket error:', error.message);
    wsClients.delete(ws);
  });
  
  // Send initial state
  ws.send(JSON.stringify({
    type: 'connected',
    timestamp: new Date().toISOString(),
    data: { message: 'Connected to simulation service' },
  }));
});

// ============================================
// START SERVER
// ============================================

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Simulation Service listening on port ${PORT}`);
  console.log(`Tick interval: ${TICK_INTERVAL}ms`);
  
  // Auto-start simulation
  startSimulation();
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down...');
  stopSimulation();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
