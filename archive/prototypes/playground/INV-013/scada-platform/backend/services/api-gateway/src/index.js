const express = require('express');
const cors = require('cors');
const { WebSocketServer } = require('ws');
const { v4: uuidv4 } = require('uuid');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

const PORT = process.env.PORT || 8080;

// Service URLs from environment
const SERVICES = {
  historian: process.env.HISTORIAN_SERVICE_URL || 'http://historian:8081',
  event: process.env.EVENT_SERVICE_URL || 'http://event:8082',
  alarm: process.env.ALARM_SERVICE_URL || 'http://alarm:8083',
  device: process.env.DEVICE_SERVICE_URL || 'http://device:8084',
  command: process.env.COMMAND_SERVICE_URL || 'http://command:8085',
  simulation: process.env.SIMULATION_SERVICE_URL || 'http://simulation:8086',
  auth: process.env.AUTH_SERVICE_URL || 'http://auth:8087',
};

// PostgreSQL configuration
const POSTGRES = {
  host: process.env.POSTGRES_HOST || 'postgres',
  port: process.env.POSTGRES_PORT || 5432,
  database: process.env.POSTGRES_DB || 'scada',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'scada_dev_password',
};

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Active WebSocket connections
const activeConnections = new Map(); // clientId -> { ws, subscriptions }

// Broadcast to channel subscribers
function broadcast(channel, message) {
  const payload = JSON.stringify(message);
  activeConnections.forEach((client) => {
    if (client.ws.readyState === 1 && client.subscriptions.has(channel)) {
      try {
        client.ws.send(payload);
      } catch (e) {
        console.error('Error sending to client:', e.message);
      }
    }
  });
}

// Broadcast function for internal use
global.broadcastToChannel = broadcast;

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    services: SERVICES
  });
});

// Device routes
app.get('/api/devices', async (req, res) => {
  try {
    const { Pool } = require('pg');
    const pool = new Pool(POSTGRES);
    
    const { type, status, parentId } = req.query;
    let query = 'SELECT * FROM devices WHERE 1=1';
    const params = [];
    let paramIndex = 1;
    
    if (type) {
      query += ` AND type = $${paramIndex++}`;
      params.push(type);
    }
    if (status) {
      query += ` AND status = $${paramIndex++}`;
      params.push(status);
    }
    if (parentId) {
      query += ` AND parent_id = $${paramIndex++}`;
      params.push(parentId);
    }
    
    query += ' ORDER BY type, name';
    
    const result = await pool.query(query, params);
    await pool.end();
    
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching devices:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: error.message } });
  }
});

app.get('/api/devices/:id', async (req, res) => {
  try {
    const { Pool } = require('pg');
    const pool = new Pool(POSTGRES);
    
    const result = await pool.query('SELECT * FROM devices WHERE id = $1', [req.params.id]);
    await pool.end();
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Device not found' } });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error fetching device:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: error.message } });
  }
});

app.get('/api/devices/:id/tags', async (req, res) => {
  try {
    const { Pool } = require('pg');
    const pool = new Pool(POSTGRES);
    
    const result = await pool.query(
      'SELECT * FROM device_tags WHERE device_id = $1',
      [req.params.id]
    );
    await pool.end();
    
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching device tags:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: error.message } });
  }
});

// Alarm routes
app.get('/api/alarms', async (req, res) => {
  try {
    const { Pool } = require('pg');
    const pool = new Pool(POSTGRES);
    
    const { state, severity, limit } = req.query;
    let query = 'SELECT * FROM alarms WHERE 1=1';
    const params = [];
    let paramIndex = 1;
    
    if (state) {
      query += ` AND state = $${paramIndex++}`;
      params.push(state);
    }
    if (severity) {
      query += ` AND severity = $${paramIndex++}`;
      params.push(severity);
    }
    
    query += ' ORDER BY created_at DESC';
    
    if (limit) {
      query += ` LIMIT $${paramIndex++}`;
      params.push(parseInt(limit));
    }
    
    const result = await pool.query(query, params);
    await pool.end();
    
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching alarms:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: error.message } });
  }
});

app.get('/api/alarms/active', async (req, res) => {
  try {
    const { Pool } = require('pg');
    const pool = new Pool(POSTGRES);
    
    const result = await pool.query(
      "SELECT * FROM alarms WHERE state IN ('active', 'acknowledged') ORDER BY severity, created_at DESC"
    );
    await pool.end();
    
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching active alarms:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: error.message } });
  }
});

app.post('/api/alarms/:id/acknowledge', async (req, res) => {
  try {
    const { Pool } = require('pg');
    const pool = new Pool(POSTGRES);
    
    const { userId, comment } = req.body;
    
    const result = await pool.query(
      `UPDATE alarms 
       SET state = 'acknowledged', acknowledged_at = NOW(), acknowledged_by = $1, acknowledged_comment = $2
       WHERE id = $3 RETURNING *`,
      [userId || 'system', comment || '', req.params.id]
    );
    await pool.end();
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Alarm not found' } });
    }
    
    // Broadcast alarm update
    broadcast('alarms', {
      type: 'alarm',
      channel: 'alarms',
      timestamp: new Date().toISOString(),
      data: result.rows[0],
    });
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error acknowledging alarm:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: error.message } });
  }
});

// Telemetry routes (queries InfluxDB via historian)
app.get('/api/telemetry/query', async (req, res) => {
  try {
    const { deviceId, tagId, start, end, limit } = req.query;
    
    // Query simulation service for latest telemetry (since we're not connecting to InfluxDB directly)
    const response = await fetch(`${SERVICES.simulation}/api/telemetry/latest?deviceId=${deviceId || ''}`);
    const data = await response.json();
    
    res.json({ success: true, data: data.data || [] });
  } catch (error) {
    console.error('Error fetching telemetry:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: error.message } });
  }
});

app.get('/api/telemetry/latest', async (req, res) => {
  try {
    const response = await fetch(`${SERVICES.simulation}/api/telemetry/latest`);
    const data = await response.json();
    res.json({ success: true, data: data.data || [] });
  } catch (error) {
    console.error('Error fetching latest telemetry:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: error.message } });
  }
});

// Event routes (queries Loki via event service)
app.get('/api/events/query', async (req, res) => {
  try {
    const { start, end, type, limit } = req.query;
    
    const params = new URLSearchParams();
    if (start) params.append('start', start);
    if (end) params.append('end', end);
    if (type) params.append('type', type);
    if (limit) params.append('limit', limit);
    
    const response = await fetch(`${SERVICES.event}/api/events/query?${params}`);
    const data = await response.json();
    
    res.json({ success: true, data: data.data || [] });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: error.message } });
  }
});

// Command routes
app.post('/api/commands', async (req, res) => {
  try {
    const { Pool } = require('pg');
    const pool = new Pool(POSTGRES);
    
    const { deviceId, commandType, parameters, userId } = req.body;
    
    // Validate device exists
    const deviceCheck = await pool.query('SELECT id FROM devices WHERE id = $1', [deviceId]);
    if (deviceCheck.rows.length === 0) {
      await pool.end();
      return res.status(400).json({ success: false, error: { code: 'INVALID_DEVICE', message: 'Device not found' } });
    }
    
    // Create command record
    const result = await pool.query(
      `INSERT INTO commands (device_id, command_type, parameters, issued_by, status)
       VALUES ($1, $2, $3, $4, 'pending') RETURNING *`,
      [deviceId, commandType, JSON.stringify(parameters || {}), userId || 'system']
    );
    await pool.end();
    
    // Broadcast command
    broadcast('commands', {
      type: 'command_result',
      channel: 'commands',
      timestamp: new Date().toISOString(),
      data: result.rows[0],
    });
    
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error creating command:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: error.message } });
  }
});

app.get('/api/commands/history', async (req, res) => {
  try {
    const { Pool } = require('pg');
    const pool = new Pool(POSTGRES);
    
    const { deviceId, limit } = req.query;
    let query = 'SELECT * FROM commands WHERE 1=1';
    const params = [];
    let paramIndex = 1;
    
    if (deviceId) {
      query += ` AND device_id = $${paramIndex++}`;
      params.push(deviceId);
    }
    
    query += ' ORDER BY issued_at DESC';
    
    if (limit) {
      query += ` LIMIT $${paramIndex++}`;
      params.push(parseInt(limit));
    }
    
    const result = await pool.query(query, params);
    await pool.end();
    
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching command history:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: error.message } });
  }
});

// Simulation routes
app.get('/api/simulation/state', async (req, res) => {
  try {
    const response = await fetch(`${SERVICES.simulation}/api/simulation/state`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching simulation state:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: error.message } });
  }
});

app.post('/api/simulation/start', async (req, res) => {
  try {
    const response = await fetch(`${SERVICES.simulation}/api/simulation/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error starting simulation:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: error.message } });
  }
});

app.post('/api/simulation/stop', async (req, res) => {
  try {
    const response = await fetch(`${SERVICES.simulation}/api/simulation/stop`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error stopping simulation:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: error.message } });
  }
});

app.post('/api/simulation/fault', async (req, res) => {
  try {
    const { feederId } = req.body;
    const response = await fetch(`${SERVICES.simulation}/api/simulation/fault`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feederId }),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error injecting fault:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: error.message } });
  }
});

// Auth routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { Pool } = require('pg');
    const pool = new Pool(POSTGRES);
    
    const { username, password } = req.body;
    
    const user = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND is_active = true',
      [username]
    );
    
    if (user.rows.length === 0) {
      await pool.end();
      return res.status(401).json({ success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' } });
    }
    
    // For simplicity, using plain text comparison (in production, use bcrypt)
    const bcrypt = require('bcryptjs');
    const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
    
    if (!validPassword) {
      await pool.end();
      return res.status(401).json({ success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' } });
    }
    
    // Update last login
    await pool.query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.rows[0].id]);
    await pool.end();
    
    // Generate JWT
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { userId: user.rows[0].id, role: user.rows[0].role },
      process.env.JWT_SECRET || 'scada_dev_jwt_secret_change_in_production',
      { expiresIn: '8h' }
    );
    
    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.rows[0].id,
          username: user.rows[0].username,
          email: user.rows[0].email,
          role: user.rows[0].role,
          permissions: user.rows[0].permissions,
        },
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: error.message } });
  }
});

// Stats endpoint for dashboard
app.get('/api/stats', async (req, res) => {
  try {
    const { Pool } = require('pg');
    const pool = new Pool(POSTGRES);
    
    // Get device counts by type
    const deviceCounts = await pool.query(`
      SELECT type, COUNT(*) as count 
      FROM devices 
      WHERE status = 'active' 
      GROUP BY type
    `);
    
    // Get active alarm counts by severity
    const alarmCounts = await pool.query(`
      SELECT severity, COUNT(*) as count 
      FROM alarms 
      WHERE state IN ('active', 'acknowledged') 
      GROUP BY severity
    `);
    
    // Get total active alarms
    const totalAlarms = await pool.query(`
      SELECT COUNT(*) as count 
      FROM alarms 
      WHERE state IN ('active', 'acknowledged')
    `);
    
    await pool.end();
    
    res.json({
      success: true,
      data: {
        devices: deviceCounts.rows.reduce((acc, row) => {
          acc[row.type] = parseInt(row.count);
          return acc;
        }, {}),
        alarms: alarmCounts.rows.reduce((acc, row) => {
          acc[row.severity] = parseInt(row.count);
          return acc;
        }, {}),
        totalActiveAlarms: parseInt(totalAlarms.rows[0].count),
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: error.message } });
  }
});

// WebSocket handling
wss.on('connection', (ws, req) => {
  const clientId = uuidv4();
  const subscriptions = new Set(['telemetry', 'alarms', 'events', 'commands']);
  
  activeConnections.set(clientId, { ws, subscriptions });
  
  console.log(`WebSocket client connected: ${clientId}`);
  
  // Send connection acknowledgment
  ws.send(JSON.stringify({
    type: 'connected',
    channel: 'system',
    timestamp: new Date().toISOString(),
    data: { clientId, subscriptions: Array.from(subscriptions) },
  }));
  
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());
      
      switch (message.type) {
        case 'subscribe':
          if (message.channels && Array.isArray(message.channels)) {
            message.channels.forEach((ch) => subscriptions.add(ch));
            ws.send(JSON.stringify({
              type: 'subscribed',
              channel: 'system',
              timestamp: new Date().toISOString(),
              data: { channels: Array.from(subscriptions) },
            }));
          }
          break;
          
        case 'unsubscribe':
          if (message.channels && Array.isArray(message.channels)) {
            message.channels.forEach((ch) => subscriptions.delete(ch));
            ws.send(JSON.stringify({
              type: 'unsubscribed',
              channel: 'system',
              timestamp: new Date().toISOString(),
              data: { channels: Array.from(subscriptions) },
            }));
          }
          break;
          
        case 'heartbeat':
          ws.send(JSON.stringify({
            type: 'heartbeat',
            channel: 'system',
            timestamp: new Date().toISOString(),
            data: {},
          }));
          break;
      }
    } catch (e) {
      console.error('Error parsing WebSocket message:', e.message);
    }
  });
  
  ws.on('close', () => {
    activeConnections.delete(clientId);
    console.log(`WebSocket client disconnected: ${clientId}`);
  });
  
  ws.on('error', (error) => {
    console.error(`WebSocket error for client ${clientId}:`, error.message);
    activeConnections.delete(clientId);
  });
});

// Heartbeat interval
setInterval(() => {
  broadcast('system', {
    type: 'heartbeat',
    channel: 'system',
    timestamp: new Date().toISOString(),
    data: {},
  });
}, 30000);

// Start server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`API Gateway listening on port ${PORT}`);
  console.log('Services:', SERVICES);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
