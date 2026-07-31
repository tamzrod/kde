# Layer Management

## Overview

This document covers layer management strategies for professional GIS applications.

---

## Layer Types

### Base Layers

Provides geographic context.

| Type | Examples |
|------|---------|
| Street maps | OSM, Mapbox Streets |
| Satellite | Bing, Esri World Imagery |
| Terrain | USGS, Mapbox Terrain |
| Dark/light | Various basemap styles |

### Operational Layers

Application-specific data.

| Type | Examples |
|------|---------|
| Assets | Substations, lines, poles |
| Events | Alarms, outages, work orders |
| Analysis | Buffers, heatmaps, routes |

---

## Layer Organization

### Hierarchy Structure

```javascript
const layerGroups = {
  base: {
    streets: { visible: true, opacity: 1 },
    satellite: { visible: false, opacity: 1 }
  },
  assets: {
    substations: { visible: true, opacity: 1 },
    transmission: { visible: true, opacity: 0.8 },
    distribution: { visible: true, opacity: 0.8 }
  },
  events: {
    alarms: { visible: true, opacity: 1 },
    outages: { visible: true, opacity: 1 }
  }
};
```

### Grouping Best Practices

1. **Logical grouping** by function
2. **Consistent naming** conventions
3. **Visibility control** at group and layer level
4. **Dependency awareness** for related layers

---

## Layer Controls

### Visibility

```javascript
// Toggle layer visibility
function toggleLayer(layerId, visible) {
  map.setLayoutProperty(layerId, 'visibility', visible ? 'visible' : 'none');
}
```

### Opacity

```javascript
// Set layer opacity
function setLayerOpacity(layerId, opacity) {
  map.setPaintProperty(layerId, 'fill-opacity', opacity);
  map.setPaintProperty(layerId, 'line-opacity', opacity);
}
```

### Ordering

```javascript
// Move layer above another
map.moveLayer('layer-to-move', 'reference-layer');
```

---

## Dynamic Layer Updates

### Feature Updates

```javascript
// Update feature properties
function updateFeature(layerId, featureId, properties) {
  const source = map.getSource(layerId + '-source');
  const features = source.data.features.map(f => {
    if (f.id === featureId) {
      return { ...f, properties: { ...f.properties, ...properties } };
    }
    return f;
  });
  source.setData({ type: 'FeatureCollection', features });
}
```

### Real-time Updates

```javascript
// WebSocket update handler
websocket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  updateFeature('assets-layer', data.id, data.properties);
};
```

---

## Layer Filtering

### Attribute Filtering

```javascript
// Filter by status
function filterByStatus(layerId, status) {
  if (status === 'all') {
    map.setFilter(layerId, null);
  } else {
    map.setFilter(layerId, ['==', ['get', 'status'], status]);
  }
}
```

### Spatial Filtering

```javascript
// Filter features in view
function filterInView(layerId) {
  const bounds = map.getBounds();
  map.setFilter(layerId, ['within', bounds]);
}
```

---

## Layer Legends

### Dynamic Legend Generation

```javascript
function generateLegend(layerConfig) {
  const legend = document.createElement('div');
  legend.className = 'layer-legend';
  
  layerConfig.symbols.forEach(symbol => {
    const item = document.createElement('div');
    item.innerHTML = `
      <span class="legend-item">
        <span class="legend-symbol" style="${symbol.style}"></span>
        <span class="legend-label">${symbol.label}</span>
      </span>
    `;
    legend.appendChild(item);
  });
  
  return legend;
}
```

---

## Layer Manager UI

### Standard Controls

| Control | Function |
|---------|----------|
| Visibility toggle | Show/hide layer |
| Opacity slider | Adjust transparency |
| Reorder | Change z-index |
| Filter | Apply filters |
| Style | Change symbology |
| Info | Layer details |
| Remove | Delete layer |

### Example Panel

```
┌─────────────────────────────────┐
│ LAYERS                           │
├─────────────────────────────────┤
│ ▼ Base Maps                      │
│   ☑ Streets          [⚙] [👁]   │
│   ☐ Satellite        [⚙] [👁]   │
├─────────────────────────────────┤
│ ▼ Assets                         │
│   ☑ Substations     [⚙] [👁]   │
│   ☑ Transmission    [⚙] [👁]   │
│   ☑ Distribution    [⚙] [👁]   │
├─────────────────────────────────┤
│ ▼ Events                         │
│   ☑ Alarms           [⚙] [👁]   │
│   ☑ Outages         [⚙] [👁]   │
└─────────────────────────────────┘
```

---

## Summary

| Aspect | Practice |
|--------|----------|
| Organization | Logical grouping |
| Visibility | Toggle and opacity |
| Filtering | Attribute and spatial |
| Updates | Real-time capable |
| Legend | Dynamic, complete |

---

*Source: GIS layer management best practices*
