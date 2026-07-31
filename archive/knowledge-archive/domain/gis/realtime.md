# Real-Time GIS

## Overview

This document covers real-time GIS visualization techniques for monitoring and tracking.

---

## Real-Time Data Patterns

### WebSocket Architecture

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│  SCADA   │────▶│ Backend  │────▶│   GIS    │
│ Systems  │     │  Server  │     │ Frontend │
└──────────┘     └──────────┘     └──────────┘
                        │
                        ▼
                  ┌──────────┐
                  │ InfluxDB │
                  └──────────┘
```

### Data Flow

```javascript
// WebSocket connection
const ws = new WebSocket('wss://api.example.com/geo');

// Connection handler
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  updateFeature(data.layer, data.feature);
};

// Reconnection
ws.onclose = () => {
  setTimeout(connect, 5000);
};
```

---

## Update Strategies

### Full Replace

Replace entire GeoJSON on each update.

```javascript
function updateAll(features) {
  const source = map.getSource('realtime-layer');
  source.setData({
    type: 'FeatureCollection',
    features: features
  });
}
```

### Incremental Update

Update only changed features.

```javascript
function updateFeature(layerId, feature) {
  const source = map.getSource(layerId);
  const features = source.data.features;
  
  const index = features.findIndex(f => f.id === feature.id);
  if (index >= 0) {
    features[index] = feature;
  } else {
    features.push(feature);
  }
  
  source.setData({ type: 'FeatureCollection', features });
}
```

---

## Time-Series Visualization

### Telemetry Overlay

```javascript
{
  id: 'telemetry-points',
  type: 'circle',
  source: 'telemetry',
  paint: {
    'circle-radius': [
      'interpolate', ['linear'], ['zoom'],
      8, 3,
      14, 8
    ],
    'circle-color': [
      'interpolate', ['linear'], ['get', 'value'],
      0, '#22C55E',    // Low
      50, '#F59E0B',  // Medium
      100, '#EF4444'   // High
    ],
    'circle-opacity': 0.8
  }
}
```

### Heatmap for Density

```javascript
{
  id: 'events-heatmap',
  type: 'heatmap',
  source: 'events',
  paint: {
    'heatmap-weight': ['get', 'intensity'],
    'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 15, 3],
    'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 15, 30],
    'heatmap-color': [
      'interpolate', ['linear'], ['heatmap-density'],
      0, 'rgba(0,0,0,0)',
      0.2, '#ffffb2',
      0.4, '#fecc5c',
      0.6, '#fd8d3c',
      0.8, '#f03b76',
      1, '#bd0026'
    ]
  }
}
```

---

## Live Tracking

### GPS Tracking Animation

```javascript
class GPSTracker {
  constructor(map, vehicleId) {
    this.map = map;
    this.vehicleId = vehicleId;
    this.trail = [];
    this.marker = null;
  }
  
  update(position) {
    // Add to trail
    this.trail.push(position);
    if (this.trail.length > 100) this.trail.shift();
    
    // Update marker
    if (!this.marker) {
      this.marker = this.createMarker();
    }
    this.marker.setLngLat([position.lon, position.lat]);
    
    // Update trail line
    this.updateTrail();
  }
  
  createMarker() {
    return new maplibregl.Marker({ color: '#3B82F6' })
      .setLngLat([0, 0])
      .addTo(this.map);
  }
  
  updateTrail() {
    // Update line source with trail coordinates
  }
}
```

---

## Historical Playback

### Timeline Control

```javascript
class TimeSlider {
  constructor(startTime, endTime) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.currentTime = startTime;
  }
  
  seek(time) {
    this.currentTime = time;
    this.updateMap();
  }
  
  play(speed = 1) {
    this.interval = setInterval(() => {
      this.currentTime += 1000 * speed; // speed in seconds
      if (this.currentTime >= this.endTime) {
        this.currentTime = this.startTime;
      }
      this.updateMap();
    }, 100);
  }
}
```

---

## Alert Visualization

### Flashing Alerts

```css
@keyframes alert-flash {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.alert-critical {
  animation: alert-flash 0.5s infinite;
}

.alert-high {
  animation: alert-flash 1s infinite;
}
```

### Alert Clustering

```javascript
// Group alerts by severity
function clusterAlerts(alerts) {
  return {
    critical: alerts.filter(a => a.severity === 'critical'),
    high: alerts.filter(a => a.severity === 'high'),
    medium: alerts.filter(a => a.severity === 'medium'),
    low: alerts.filter(a => a.severity === 'low')
  };
}
```

---

## Performance Considerations

### Batching Updates

```javascript
const updateQueue = [];
let scheduled = false;

function queueUpdate(feature) {
  updateQueue.push(feature);
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(processQueue);
  }
}

function processQueue() {
  const updates = updateQueue.splice(0);
  updates.forEach(applyUpdate);
  scheduled = false;
}
```

### Throttling

```javascript
function throttledUpdate(callback, delay = 1000) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      callback.apply(this, args);
    }
  };
}
```

---

## Summary

| Pattern | Use Case |
|---------|----------|
| WebSocket | Real-time updates |
| Full replace | Small datasets |
| Incremental | Large datasets |
| Timeline | Historical playback |
| Clustering | Dense alerts |

---

*Source: Real-time GIS best practices*
