# GIS Performance Optimization

## Overview

This document covers techniques for optimizing GIS application performance.

---

## Rendering Performance

### WebGL Optimization

```javascript
// Enable GPU acceleration
const map = new maplibregl.Map({
  container: 'map',
  antialias: true,
  preserveDrawingBuffer: true,
  trackResize: true
});

// Disable unnecessary features
map.doubleClickZoom.disable();
```

### Layer Optimization

```javascript
// Use appropriate layer types
{
  id: 'points',
  type: 'symbol',  // Use symbol for icons/text (GPU-accelerated)
  // NOT: type: 'circle' + icon-image
}

// Batch similar features
{
  id: 'all-buildings',
  type: 'fill',
  source: 'buildings'
  // NOT: Individual layers per building
}
```

---

## Large Dataset Strategies

### Feature Simplification

```javascript
import simplify from 'simplify-js';

function simplifyFeature(feature, tolerance = 0.001) {
  if (feature.geometry.type === 'LineString') {
    const points = feature.geometry.coordinates.map(c => ({
      x: c[0], y: c[1]
    }));
    const simplified = simplify(points, tolerance, true);
    return {
      ...feature,
      geometry: {
        type: 'LineString',
        coordinates: simplified.map(p => [p.x, p.y])
      }
    };
  }
  return feature;
}
```

### Progressive Loading

```javascript
// Load features progressively by zoom
function loadFeaturesForZoom(zoom, bounds) {
  const detail = Math.floor(zoom / 4); // 0-3 detail levels
  const layer = `features-level${detail}`;
  
  if (!map.getSource(layer)) {
    map.addSource(layer, {
      type: 'geojson',
      data: `/api/features?detail=${detail}&bounds=${bounds}`
    });
  }
}

map.on('zoom', () => {
  loadFeaturesForZoom(map.getZoom(), map.getBounds());
});
```

---

## Marker Performance

### Clustering

```javascript
{
  id: 'clustered-markers',
  type: 'circle',
  source: 'markers',
  cluster: true,
  clusterMaxZoom: 14,
  clusterRadius: 50,
  clusterProperties: {
    // Sum values for cluster display
    totalLoad: ['+', ['get', 'load']]
  }
}
```

### Marker Limits

| Markers | Strategy |
|---------|----------|
| < 1,000 | Direct rendering |
| 1K - 50K | Clustering or Canvas |
| 50K - 500K | Vector tiles |
| 500K+ | Server-side aggregation |

---

## Canvas Rendering

### Canvas vs WebGL

| Aspect | Canvas | WebGL |
|--------|--------|-------|
| Performance | Medium | High |
| Features | Limited | Advanced |
| Memory | Lower | Higher |
| GPU | Not used | Required |

### Canvas Layer

```javascript
const canvasLayer = {
  id: 'canvas-overlay',
  type: 'custom',
  renderingMode: 'overlay',
  
  onAdd(map, gl) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    map.getCanvasContainer().appendChild(this.canvas);
  },
  
  render(gl, matrix) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw custom content
    this.drawCustomContent(ctx);
    
    map.triggerRepaint();
  }
};

map.addLayer(canvasLayer);
```

---

## Memory Management

### Cleanup on Layer Removal

```javascript
function removeLayerCompletely(layerId) {
  // Remove source data
  if (map.getSource(layerId)) {
    const source = map.getSource(layerId);
    if (source._data) {
      source._data = null;
    }
    map.removeSource(layerId);
  }
  
  // Remove layer
  if (map.getLayer(layerId)) {
    map.removeLayer(layerId);
  }
  
  // Force garbage collection
  if (window.gc) window.gc();
}
```

### Image Cleanup

```javascript
// Remove unused images
map.on('sourcedata', (e) => {
  if (e.sourceId && map.getSource(e.sourceId)) {
    const source = map.getSource(e.sourceId);
    if (source.type === 'raster' || source.type === 'image') {
      // Track and remove old sources
    }
  }
});
```

---

## Network Optimization

### Lazy Loading

```javascript
class LazyLayer {
  constructor(map, config) {
    this.map = map;
    this.config = config;
    this.loaded = false;
  }
  
  async ensureLoaded() {
    if (this.loaded) return;
    
    const data = await fetch(this.config.url);
    const geojson = await data.json();
    
    this.map.addSource(this.config.id, {
      type: 'geojson',
      data: geojson
    });
    
    this.addLayers();
    this.loaded = true;
  }
}
```

### Compression

```javascript
// Request compressed tiles
const tileSource = new maplibregl.TileSource({
  tiles: ['/tiles/{z}/{x}/{y}.pbf'],
  tileSize: 256,
  minzoom: 0,
  maxzoom: 14
});
```

---

## Performance Monitoring

### FPS Monitor

```javascript
class FPSMonitor {
  constructor() {
    this.frames = 0;
    this.lastTime = performance.now();
  }
  
  tick() {
    this.frames++;
    const now = performance.now();
    
    if (now - this.lastTime >= 1000) {
      console.log(`FPS: ${this.frames}`);
      this.frames = 0;
      this.lastTime = now;
    }
    
    requestAnimationFrame(() => this.tick());
  }
}
```

### Performance Markers

```javascript
performance.mark('map-load-start');
// ... map operations ...
performance.mark('map-load-end');
performance.measure('Map Load', 'map-load-start', 'map-load-end');
```

---

## Summary

| Strategy | Impact |
|----------|--------|
| Clustering | High for markers |
| Simplification | High for large features |
| Vector tiles | High for datasets |
| WebGL | High for rendering |
| Lazy loading | Medium |
| Compression | Medium |

---

*Source: GIS performance optimization*
