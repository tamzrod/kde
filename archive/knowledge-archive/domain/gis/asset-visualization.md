# Asset Visualization

## Overview

This document covers techniques for visualizing infrastructure assets on GIS maps.

---

## Asset Categories

### Power Grid Assets

| Asset | Symbol | Description |
|-------|--------|-------------|
| Substation | Rectangle/Polygon | Electrical transformation |
| Transmission Line | Thick line | High voltage |
| Distribution Line | Medium line | Medium/Low voltage |
| Transformer | Circle | Voltage conversion |
| Circuit Breaker | Diamond | Protection |
| Switch | Small square | Isolation |
| Capacitor Bank | C icon | Reactive power |
| Meter | Small circle | Measurement |

### Renewable Energy Assets

| Asset | Symbol | Description |
|-------|--------|-------------|
| Solar Farm | Panel array | Solar generation |
| Wind Farm | Turbine icon | Wind generation |
| Battery Storage | Battery icon | Energy storage |
| Substation | Standard | Grid connection |

### Infrastructure Assets

| Asset | Symbol | Description |
|-------|--------|-------------|
| Building | Polygon | Structures |
| Tower | Triangle | Support structure |
| Pole | Small circle | Line support |
| Manhole | Square | Access point |
| Valve | V icon | Control point |

---

## Symbol Design

### Status-Based Symbols

```javascript
const assetStyles = {
  normal: {
    color: '#333333',
    fillColor: '#22C55E',
    weight: 2
  },
  warning: {
    color: '#333333',
    fillColor: '#F59E0B',
    weight: 2
  },
  fault: {
    color: '#EF4444',
    fillColor: '#EF4444',
    weight: 3,
    animation: 'pulse'
  },
  offline: {
    color: '#9CA3AF',
    fillColor: '#9CA3AF',
    weight: 1,
    dashArray: '4,4'
  }
};
```

### Symbol Layers (MapLibre GL)

```javascript
{
  id: 'substations',
  type: 'circle',
  source: 'substations',
  paint: {
    'circle-radius': [
      'interpolate', ['linear'], ['zoom'],
      8, 4,
      14, 12
    ],
    'circle-color': ['get', 'statusColor'],
    'circle-stroke-width': 2,
    'circle-stroke-color': '#ffffff'
  }
}
```

---

## Line Visualization

### Transmission Lines

```javascript
{
  id: 'transmission-lines',
  type: 'line',
  source: 'transmission',
  paint: {
    'line-color': [
      'match', ['get', 'voltage'],
      '345', '#000080',  // Dark blue
      '230', '#0000FF',  // Blue
      '115', '#4169E1',  // Royal blue
      '#666666'           // Default
    ],
    'line-width': [
      'match', ['get', 'voltage'],
      '345', 4,
      '230', 3,
      '115', 2,
      1.5                  // Default
    ]
  }
}
```

### Distribution Circuits

```javascript
{
  id: 'distribution-lines',
  type: 'line',
  source: 'distribution',
  paint: {
    'line-color': '#333333',
    'line-width': 1,
    'line-dasharray': [
      'match', ['get', 'status'],
      'de-energized', ['literal', [2, 2]],
      'planned', ['literal', [4, 2]],
      ['literal', [1]]
    ]
  }
}
```

---

## Point Features

### Substations

```javascript
{
  id: 'substations-fill',
  type: 'fill',
  source: 'substations',
  paint: {
    'fill-color': ['get', 'statusColor'],
    'fill-opacity': 0.8
  }
},
{
  id: 'substations-outline',
  type: 'line',
  source: 'substations',
  paint: {
    'line-color': '#333333',
    'line-width': 2
  }
}
```

### Asset Labels

```javascript
{
  id: 'substations-labels',
  type: 'symbol',
  source: 'substations',
  layout: {
    'text-field': ['get', 'name'],
    'text-size': 12,
    'text-anchor': 'top',
    'text-offset': [0, 1]
  },
  minzoom: 12
}
```

---

## Animations

### Fault Animation

```css
@keyframes fault-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.asset-fault {
  animation: fault-pulse 1s infinite;
}
```

### Live Tracking

```javascript
function animateTrackingMarker(marker) {
  let angle = 0;
  function update() {
    angle += 2;
    marker.setRotation(angle);
    requestAnimationFrame(update);
  }
  update();
}
```

---

## Clustering

### Point Clustering

```javascript
{
  id: 'clustered-assets',
  type: 'circle',
  source: 'assets',
  cluster: true,
  clusterMaxZoom: 14,
  clusterRadius: 50,
  paint: {
    'circle-color': [
      'step', ['get', 'point_count'],
      '#22C55E', 10,   // Green
      '#F59E0B', 50,   // Yellow
      '#EF4444'         // Red
    ],
    'circle-radius': [
      'step', ['get', 'point_count'],
      15, 10,
      20, 50,
      30
    ]
  }
}
```

---

## Summary

| Asset Type | Symbol | Key Properties |
|------------|--------|----------------|
| Substation | Polygon/Circle | Status, voltage |
| Line | Line | Voltage, status, type |
| Equipment | Icon | Status, type |
| Transformer | Circle | Size, status |

---

*Source: Utility mapping standards, industry practices*
