# GIS Best Practices

## Overview

This document consolidates GIS best practices for professional applications.

---

## General Guidelines

### Map Design

- **Start with basemap** - Provide clear geographic context
- **Layer organization** - Logical grouping by function
- **Visual hierarchy** - Most important = most visible
- **Color consistency** - Use semantic colors throughout
- **Performance** - Optimize for smooth interaction

### Coordinate Systems

- **Default to WGS84** (EPSG:4326) for GPS/latitude-longitude
- **Use Web Mercator** (EPSG:3857) for web maps
- **Project data** to local CRS for analysis
- **Document** coordinate systems in metadata

---

## Data Management

### Feature IDs

```javascript
// Always use stable IDs
const feature = {
  id: 'substation-12345',  // Stable business ID
  properties: { name: 'Station A' }
};

// NOT: Use database row ID which may change
```

### Attribute Naming

```javascript
// Descriptive, consistent naming
{
  "asset_id": "SUB-001",
  "asset_type": "substation",
  "voltage_kv": 115,
  "capacity_mva": 50,
  "status": "active",
  "commissioned_date": "2020-01-15"
}
```

### Data Validation

```javascript
function validateFeature(feature) {
  const errors = [];
  
  if (!feature.geometry) {
    errors.push('Missing geometry');
  }
  
  if (!feature.properties?.asset_id) {
    errors.push('Missing asset_id');
  }
  
  const validStatuses = ['active', 'inactive', 'maintenance'];
  if (!validStatuses.includes(feature.properties?.status)) {
    errors.push('Invalid status');
  }
  
  return { valid: errors.length === 0, errors };
}
```

---

## Layer Configuration

### Performance Layers

| Zoom Level | Features | Recommendation |
|------------|----------|----------------|
| 0-8 | Regional overview | Clustered, simplified |
| 9-12 | Area view | Moderate detail |
| 13-16 | Local view | Full detail |
| 17+ | Site view | Maximum detail |

### Style Organization

```javascript
const MAP_STYLE = {
  version: 8,
  name: 'Custom Style',
  sources: {
    basemap: { /* base map config */ },
    assets: { /* asset source */ }
  },
  layers: [
    // Basemap layers first
    ...basemapLayers,
    // Asset layers second
    ...assetLayers,
    // Overlay layers last
    ...overlayLayers
  ]
};
```

---

## Interaction Design

### Feature Selection

```javascript
map.on('click', 'assets-layer', (e) => {
  const feature = e.features[0];
  
  // Show popup
  new maplibregl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(`
      <h3>${feature.properties.name}</h3>
      <p>Status: ${feature.properties.status}</p>
    `)
    .addTo(map);
});
```

### Hover Effects

```javascript
{
  id: 'assets-hover',
  type: 'circle',
  filter: ['==', ['id'], ''],
  paint: {
    'circle-radius': 8,
    'circle-color': '#ffffff'
  }
}

map.on('mousemove', 'assets', (e) => {
  map.setFilter('assets-hover', ['==', ['id'], e.features[0].id]);
});
```

---

## Mobile Considerations

### Touch Interactions

| Interaction | Desktop | Mobile |
|------------|---------|--------|
| Pan | Drag | Touch drag |
| Zoom | Scroll wheel | Pinch |
| Rotate | Ctrl+drag | Two-finger rotate |
| Select | Click | Tap |

### Responsive Design

```css
/* Mobile-first approach */
.map-container {
  width: 100%;
  height: 100vh;
}

@media (min-width: 768px) {
  .sidebar {
    display: block;
    width: 300px;
  }
}
```

---

## Offline Operation

### Data Preparation

1. **Identify coverage area** - Define geographic bounds
2. **Determine detail levels** - Select zoom range
3. **Prepare vector tiles** - Generate PMTiles/MBTiles
4. **Prepare features** - Export GeoJSON to IndexedDB
5. **Test offline** - Verify all functionality

### Cache Strategy

```javascript
const CACHE_CONFIG = {
  tiles: {
    priority: ['current-area'],
    levels: [10, 11, 12, 13, 14],
    size: 500 * 1024 * 1024 // 500MB
  },
  features: {
    layers: ['assets', 'boundaries'],
    offlineEditable: true
  }
};
```

---

## Accessibility

### Keyboard Navigation

```javascript
// Add keyboard controls
map.addControl(new maplibregl.NavigationControl());

// Custom keyboard handler
document.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'ArrowUp': map.panBy([0, -100]); break;
    case 'ArrowDown': map.panBy([0, 100]); break;
    case 'ArrowLeft': map.panBy([-100, 0]); break;
    case 'ArrowRight': map.panBy([100, 0]); break;
    case '+': map.zoomIn(); break;
    case '-': map.zoomOut(); break;
  }
});
```

### Screen Reader Support

```html
<div role="application" aria-label="Interactive map">
  <div id="map"></div>
  <div id="map-description" class="sr-only">
    Map showing substations and transmission lines in the region.
    Press arrow keys to pan, plus and minus to zoom.
  </div>
</div>
```

---

## Summary

| Category | Practice |
|----------|----------|
| Design | Visual hierarchy, consistent colors |
| Data | Stable IDs, validated attributes |
| Performance | Layer optimization, clustering |
| Interaction | Responsive, accessible |
| Offline | Prepared cache, tested |

---

*Source: GIS best practices*
