const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 8084;

const POSTGRES = {
  host: process.env.POSTGRES_HOST || 'postgres',
  port: process.env.POSTGRES_PORT || 5432,
  database: process.env.POSTGRES_DB || 'scada',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'scada_dev_password',
};

let pool;

app.use(express.json());

async function initDB() {
  pool = new Pool(POSTGRES);
  console.log('Connected to PostgreSQL');
}

initDB().catch(console.error);

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'device' });
});

// Get all devices
app.get('/api/devices', async (req, res) => {
  try {
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
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching devices:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get device by ID
app.get('/api/devices/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM devices WHERE id = $1', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Device not found' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error fetching device:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get device tags
app.get('/api/devices/:id/tags', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM device_tags WHERE device_id = $1',
      [req.params.id]
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching device tags:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create device
app.post('/api/devices', async (req, res) => {
  try {
    const { name, type, parent_id, voltage_level, rating, status, location_lat, location_lng, metadata } = req.body;
    
    const result = await pool.query(
      `INSERT INTO devices (name, type, parent_id, voltage_level, rating, status, location_lat, location_lng, metadata)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [name, type, parent_id, voltage_level, rating, status || 'active', location_lat, location_lng, JSON.stringify(metadata || {})]
    );
    
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error creating device:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update device
app.put('/api/devices/:id', async (req, res) => {
  try {
    const { name, type, status, metadata } = req.body;
    
    const result = await pool.query(
      `UPDATE devices SET 
        name = COALESCE($1, name),
        type = COALESCE($2, type),
        status = COALESCE($3, status),
        metadata = COALESCE($4, metadata)
       WHERE id = $5 RETURNING *`,
      [name, type, status, metadata ? JSON.stringify(metadata) : null, req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Device not found' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error updating device:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get device health (mock)
app.get('/api/devices/:id/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, status FROM devices WHERE id = $1', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Device not found' });
    }
    
    // Mock health data
    res.json({
      success: true,
      data: {
        device_id: req.params.id,
        health_status: result.rows[0].status === 'active' ? 'healthy' : 'degraded',
        last_communication: new Date().toISOString(),
        uptime_percentage: 99.5 + Math.random() * 0.5,
        packet_loss: Math.random() * 0.5,
      },
    });
  } catch (error) {
    console.error('Error fetching device health:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Device Registry Service listening on port ${PORT}`);
});
