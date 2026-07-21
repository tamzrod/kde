const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 8083;

const POSTGRES = {
  host: process.env.POSTGRES_HOST || 'postgres',
  port: process.env.POSTGRES_PORT || 5432,
  database: process.env.POSTGRES_DB || 'scada',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'scada_dev_password',
};

const LOKI_URL = process.env.LOKI_URL || 'http://loki:3100';

let pool;

app.use(express.json());

// Initialize database connection
async function initDB() {
  pool = new Pool(POSTGRES);
  console.log('Connected to PostgreSQL');
}

initDB().catch(console.error);

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'alarm' });
});

// Get all alarms
app.get('/api/alarms', async (req, res) => {
  try {
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
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching alarms:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get active alarms
app.get('/api/alarms/active', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM alarms WHERE state IN ('active', 'acknowledged') ORDER BY severity, created_at DESC"
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching active alarms:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Acknowledge alarm
app.post('/api/alarms/:id/acknowledge', async (req, res) => {
  try {
    const { userId, comment } = req.body;
    
    const result = await pool.query(
      `UPDATE alarms 
       SET state = 'acknowledged', acknowledged_at = NOW(), acknowledged_by = $1, acknowledged_comment = $2
       WHERE id = $3 RETURNING *`,
      [userId || 'system', comment || '', req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Alarm not found' });
    }
    
    // Log to Loki
    try {
      await fetch(`${LOKI_URL}/loki/api/v1/push`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          streams: [{
            stream: { app: 'scada', type: 'alarm' },
            values: [[Date.now() * 1000000, JSON.stringify({
              timestamp: new Date().toISOString(),
              type: 'alarm',
              severity: 'info',
              source: req.params.id,
              message: `Alarm acknowledged: ${result.rows[0].message}`,
            })]],
          }],
        }),
      });
    } catch (e) {
      console.error('Error logging to Loki:', e.message);
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error acknowledging alarm:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Shelve alarm
app.post('/api/alarms/:id/shelve', async (req, res) => {
  try {
    const result = await pool.query(
      `UPDATE alarms SET state = 'shelved' WHERE id = $1 RETURNING *`,
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Alarm not found' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error shelving alarm:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get alarm rules
app.get('/api/alarms/rules', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM alarm_rules ORDER BY priority');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching alarm rules:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create alarm (for simulation/testing)
app.post('/api/alarms', async (req, res) => {
  try {
    const { device_id, tag_id, severity, message, value, setpoint } = req.body;
    
    const result = await pool.query(
      `INSERT INTO alarms (device_id, tag_id, severity, state, message, value, setpoint)
       VALUES ($1, $2, $3, 'active', $4, $5, $6) RETURNING *`,
      [device_id, tag_id, severity, message, value, setpoint]
    );
    
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error creating alarm:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Alarm Service listening on port ${PORT}`);
});
