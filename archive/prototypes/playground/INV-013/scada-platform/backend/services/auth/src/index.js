const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 8087;

const POSTGRES = {
  host: process.env.POSTGRES_HOST || 'postgres',
  port: process.env.POSTGRES_PORT || 5432,
  database: process.env.POSTGRES_DB || 'scada',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'scada_dev_password',
};

const JWT_SECRET = process.env.JWT_SECRET || 'scada_dev_jwt_secret_change_in_production';

let pool;

app.use(express.json());

async function initDB() {
  pool = new Pool(POSTGRES);
  console.log('Connected to PostgreSQL');
}

initDB().catch(console.error);

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'auth' });
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND is_active = true',
      [username]
    );
    
    if (user.rows.length === 0) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    
    const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
    
    if (!validPassword) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    
    // Update last login
    await pool.query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.rows[0].id]);
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user.rows[0].id, role: user.rows[0].role },
      JWT_SECRET,
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
    res.status(500).json({ success: false, error: error.message });
  }
});

// Verify token
app.get('/api/auth/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await pool.query(
      'SELECT id, username, email, role, permissions FROM users WHERE id = $1 AND is_active = true',
      [decoded.userId]
    );
    
    if (user.rows.length === 0) {
      return res.status(401).json({ success: false, error: 'User not found' });
    }
    
    res.json({ success: true, data: { user: user.rows[0] } });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
});

// Get users (admin only)
app.get('/api/auth/users', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, email, role, last_login, is_active FROM users'
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create user (admin only)
app.post('/api/auth/users', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    
    const passwordHash = await bcrypt.hash(password, 10);
    
    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash, role, permissions)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email, role`,
      [username, email, passwordHash, role || 'operator', JSON.stringify([])]
    );
    
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Auth Service listening on port ${PORT}`);
});
