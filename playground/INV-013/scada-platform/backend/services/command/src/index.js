const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 8085;

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
  res.json({ status: 'healthy', service: 'command' });
});

// Issue command
app.post('/api/commands', async (req, res) => {
  try {
    const { device_id, command_type, parameters, user_id } = req.body;
    
    // Validate device exists
    const deviceCheck = await pool.query('SELECT id, name FROM devices WHERE id = $1', [device_id]);
    if (deviceCheck.rows.length === 0) {
      return res.status(400).json({ success: false, error: 'Device not found' });
    }
    
    // Create command record
    const result = await pool.query(
      `INSERT INTO commands (device_id, command_type, parameters, issued_by, status)
       VALUES ($1, $2, $3, $4, 'executed') RETURNING *`,
      [device_id, command_type, JSON.stringify(parameters || {}), user_id || 'system']
    );
    
    const command = result.rows[0];
    
    // Simulate command execution (in production, this would send to actual device)
    // For now, just mark as executed
    await pool.query(
      `UPDATE commands SET completed_at = NOW(), result = $1 WHERE id = $2`,
      [JSON.stringify({ device: deviceCheck.rows[0].name, executed: true }), command.id]
    );
    
    res.status(201).json({ success: true, data: command });
  } catch (error) {
    console.error('Error creating command:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get command history
app.get('/api/commands/history', async (req, res) => {
  try {
    const { device_id, status, limit } = req.query;
    let query = 'SELECT * FROM commands WHERE 1=1';
    const params = [];
    let paramIndex = 1;
    
    if (device_id) {
      query += ` AND device_id = $${paramIndex++}`;
      params.push(device_id);
    }
    if (status) {
      query += ` AND status = $${paramIndex++}`;
      params.push(status);
    }
    
    query += ' ORDER BY issued_at DESC';
    
    if (limit) {
      query += ` LIMIT $${paramIndex++}`;
      params.push(parseInt(limit));
    }
    
    const result = await pool.query(query, params);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching command history:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Cancel pending command
app.post('/api/commands/:id/cancel', async (req, res) => {
  try {
    const { user_id } = req.body;
    
    const result = await pool.query(
      `UPDATE commands SET status = 'cancelled' 
       WHERE id = $1 AND status = 'pending' RETURNING *`,
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(400).json({ success: false, error: 'Command not found or already processed' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error cancelling command:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Command Service listening on port ${PORT}`);
});
