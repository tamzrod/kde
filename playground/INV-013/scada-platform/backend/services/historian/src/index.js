const express = require('express');
const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());

// In-memory storage for telemetry (in production, use InfluxDB)
const telemetryStore = [];

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'historian', points: telemetryStore.length });
});

app.post('/api/telemetry', (req, res) => {
  const { deviceId, tagId, value, timestamp, quality } = req.body;
  
  telemetryStore.push({
    device_id: deviceId,
    tag_id: tagId,
    value,
    timestamp: timestamp || Date.now(),
    quality: quality || 'good',
  });
  
  // Keep only last 10000 points in memory
  if (telemetryStore.length > 10000) {
    telemetryStore.splice(0, telemetryStore.length - 10000);
  }
  
  res.json({ success: true });
});

app.get('/api/telemetry/query', (req, res) => {
  const { deviceId, tagId, start, end, limit } = req.query;
  
  let results = [...telemetryStore];
  
  if (deviceId) {
    results = results.filter(t => t.device_id === deviceId);
  }
  if (tagId) {
    results = results.filter(t => t.tag_id === tagId);
  }
  if (start) {
    results = results.filter(t => t.timestamp >= parseInt(start));
  }
  if (end) {
    results = results.filter(t => t.timestamp <= parseInt(end));
  }
  
  // Sort by timestamp descending
  results.sort((a, b) => b.timestamp - a.timestamp);
  
  // Apply limit
  if (limit) {
    results = results.slice(0, parseInt(limit));
  }
  
  res.json({ success: true, data: results });
});

app.get('/api/telemetry/latest', (req, res) => {
  const { deviceId } = req.query;
  
  let results = [...telemetryStore];
  
  if (deviceId) {
    results = results.filter(t => t.device_id === deviceId);
  }
  
  // Get latest value for each device:tag combination
  const latestMap = new Map();
  results.forEach(t => {
    const key = `${t.device_id}:${t.tag_id}`;
    if (!latestMap.has(key) || t.timestamp > latestMap.get(key).timestamp) {
      latestMap.set(key, t);
    }
  });
  
  res.json({ success: true, data: Array.from(latestMap.values()) });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Historian Service listening on port ${PORT}`);
});
