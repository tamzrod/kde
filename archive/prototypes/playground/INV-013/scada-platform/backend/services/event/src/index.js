const express = require('express');
const app = express();
const PORT = process.env.PORT || 8082;

const LOKI_URL = process.env.LOKI_URL || 'http://loki:3100';

app.use(express.json());

// In-memory event store (for demo purposes)
const eventStore = [];

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'event', events: eventStore.length });
});

// Create event
app.post('/api/events', async (req, res) => {
  const event = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    ...req.body,
  };
  
  eventStore.push(event);
  
  // Keep only last 1000 events in memory
  if (eventStore.length > 1000) {
    eventStore.shift();
  }
  
  // Log to Loki
  try {
    await fetch(`${LOKI_URL}/loki/api/v1/push`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        streams: [{
          stream: { app: 'scada', type: event.type || 'system' },
          values: [[Date.now() * 1000000, JSON.stringify(event)]],
        }],
      }),
    });
  } catch (e) {
    console.error('Error logging to Loki:', e.message);
  }
  
  res.json({ success: true, data: event });
});

// Query events
app.get('/api/events/query', async (req, res) => {
  const { start, end, type, severity, source, limit } = req.query;
  
  let results = [...eventStore];
  
  // Filter by time range
  if (start) {
    results = results.filter(e => new Date(e.timestamp) >= new Date(start));
  }
  if (end) {
    results = results.filter(e => new Date(e.timestamp) <= new Date(end));
  }
  if (type) {
    results = results.filter(e => e.type === type);
  }
  if (severity) {
    results = results.filter(e => e.severity === severity);
  }
  if (source) {
    results = results.filter(e => e.source === source);
  }
  
  // Sort by timestamp descending
  results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  // Apply limit
  if (limit) {
    results = results.slice(0, parseInt(limit));
  }
  
  res.json({ success: true, data: results });
});

// Get sequence of events (SOE)
app.get('/api/events/soe', (req, res) => {
  const { timestamp, window } = req.query;
  
  let results = [...eventStore];
  
  if (timestamp) {
    const ts = new Date(timestamp).getTime();
    const w = parseInt(window) || 60000; // Default 1 minute window
    results = results.filter(e => {
      const et = new Date(e.timestamp).getTime();
      return et >= ts - w && et <= ts + w;
    });
  }
  
  // Sort by timestamp
  results.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  
  res.json({ success: true, data: results });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Event Service listening on port ${PORT}`);
});
