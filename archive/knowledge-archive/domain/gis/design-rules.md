# GIS Design Rules

## Overview

This document provides actionable design rules for GIS applications.

---

## Map Configuration Rules

### Rule 1: Default View

**Statement**: Set appropriate initial view centered on user's area.

```javascript
const DEFAULT_VIEW = {
  center: [-122.4194, 37.7749],  // San Francisco
  zoom: 10,
  minZoom: 3,
  maxZoom: 18
};
```

### Rule 2: Bounds Limiting

**Statement**: Prevent panning outside valid area.

```javascript
const BOUNDS = [
  [-125.0, 24.0],  // Southwest
  [-66.0, 50.0]     // Northeast
];

const map = new maplibregl.Map({
  maxBounds: BOUNDS,
  maxBoundsViscosity: 0.9
});
```

---

## Coordinate System Rules

### Rule 3: Consistent CRS

**Statement**: Use consistent coordinate system throughout application.

```javascript
// Default to WGS84 for coordinates
const DEFAULT_CRS = 'EPSG:4326';

// Transform only when necessary
function ensureWGS84(coordinates, sourceCRS) {
  if (sourceCRS === 'EPSG:4326') return coordinates;
  return transformCoords(coordinates, sourceCRS, 'EPSG:4326');
}
```

### Rule 4: Display Projection

**Statement**: Use Web Mercator for web display.

```javascript
// Map display in Web Mercator
const map = new maplibregl.Map({
  projection: 'mercator'  // EPSG:3857
});
```

---

## Layer Rules

### Rule 5: Layer Order

**Statement**: Maintain consistent layer ordering.

```javascript
const LAYER_ORDER = [
  'basemap-raster',      // Bottom
  'basemap-labels',
  'terrain',
  'assets-lines',
  'assets-polygons',
  'assets-points',
  'labels',
  'overlays',
  'alerts'                // Top
];
```

### Rule 6: Visibility Toggles

**Statement**: Provide user control for all operational layers.

```javascript
function createLayerToggle(layerId, label) {
  return `
    <label>
      <input type="checkbox" 
             data-layer="${layerId}"
             checked>
      ${label}
    </label>
  `;
}
```

---

## Symbolization Rules

### Rule 7: Status Colors

**Statement**: Use consistent status colors.

```javascript
const STATUS_COLORS = {
  normal: '#22C55E',     // Green
  warning: '#F59E0B',   // Yellow
  fault: '#EF4444',      // Red
  offline: '#6B7280',   // Gray
  unknown: '#9CA3AF'     // Light gray
};
```

### Rule 8: Line Width by Zoom

**Statement**: Scale line width with zoom.

```javascript
{
  'line-width': [
    'interpolate', ['linear'], ['zoom'],
    8, 1,
    12, 2,
    16, 4
  ]
}
```

---

## Interaction Rules

### Rule 9: Feature Identification

**Statement**: Support click and hover identification.

```javascript
// Click for selection
map.on('click', 'assets', (e) => {
  selectFeature(e.features[0]);
});

// Hover for highlight
map.on('mouseenter', 'assets', () => {
  map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'assets', () => {
  map.getCanvas().style.cursor = '';
});
```

### Rule 10: Popup Positioning

**Statement**: Prevent popups from overflow.

```javascript
const popup = new maplibregl.Popup({
  closeButton: true,
  closeOnClick: false,
  maxWidth: '300px'
});

// Smart positioning
popup.options.offset = {
  'top': [0, 10],
  'top-left': [0, 0],
  'top-right': [0, 0],
  'bottom': [0, -10],
  'bottom-left': [0, 0],
  'bottom-right': [0, 0]
};
```

---

## Performance Rules

### Rule 11: Feature Simplification

**Statement**: Simplify features at low zoom levels.

```javascript
{
  'symbol-placement': 'line',
  'symbol-spacing': 100,
  'text-field': ['step', ['zoom'],
    '', 12,
    ['get', 'name']
  ],
  'text-size': 12
}
```

### Rule 12: Clustering Threshold

**Statement**: Cluster dense point data.

```javascript
{
  cluster: true,
  clusterMaxZoom: 14,
  clusterRadius: 50,
  clusterProperties: {
    total: ['+', 1]
  }
}
```

---

## Offline Rules

### Rule 13: Cache Strategy

**Statement**: Implement aggressive caching for basemap tiles.

```javascript
const CACHE_RULES = {
  'basemap-tiles': 'CacheFirst',
  'asset-data': 'NetworkFirst',
  'user-edits': 'StaleWhileRevalidate'
};
```

### Rule 14: Data Sync

**Statement**: Queue edits for sync when offline.

```javascript
class OfflineSyncManager {
  queueEdits(edit) {
    localStorage.setItem(
      `pending-edit-${Date.now()}`,
      JSON.stringify(edit)
    );
  }
  
  async syncPendingEdits() {
    const pending = this.getPendingEdits();
    for (const edit of pending) {
      await this.submitEdit(edit);
      this.markSynced(edit.id);
    }
  }
}
```

---

## Accessibility Rules

### Rule 15: Alternative Views

**Statement**: Provide non-map alternatives for critical information.

```javascript
// Always provide list/table view alongside map
function createAlternativeView(features) {
  return `
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        ${features.map(f => `
          <tr>
            <td>${f.properties.name}</td>
            <td>${f.properties.status}</td>
            <td>${f.geometry.coordinates.join(', ')}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}
```

---

## Summary

| Category | Rules |
|----------|-------|
| Configuration | View, bounds |
| CRS | Consistent, transform |
| Layers | Order, visibility |
| Symbols | Status, scale |
| Interaction | Click, hover, popup |
| Performance | Simplify, cluster |
| Offline | Cache, sync |
| Accessibility | Alternative views |

---

*Source: GIS engineering standards*
