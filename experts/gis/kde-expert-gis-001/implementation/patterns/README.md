# GIS Engineering Expert - Reusable Patterns

**Expert ID**: KDE-EXPERT-GIS-001  
**Version**: 0.1.0  
**Date**: 2026-07-21  

---

## Overview

This document contains reusable implementation patterns for GIS engineering. These patterns apply Knowledge requirements to practical implementation code.

---

## 1. Status Color System

### Pattern: Status Color Configuration

```javascript
/**
 * Status Color System
 * Applies KDE-GIS-002 Rule 7 and KDE-GIS-006 symbol standards
 * 
 * Usage:
 *   const style = statusColors[device.status];
 */
const STATUS_COLORS = {
  normal: {
    color: '#22C55E',    // Green
    label: 'Normal',
    priority: 0
  },
  warning: {
    color: '#F59E0B',    // Yellow/Amber
    label: 'Warning',
    priority: 1
  },
  fault: {
    color: '#EF4444',    // Red
    label: 'Fault',
    priority: 2
  },
  offline: {
    color: '#6B7280',    // Gray
    label: 'Offline',
    priority: -1
  },
  unknown: {
    color: '#9CA3AF',    // Light gray
    label: 'Unknown',
    priority: -2
  }
};

/**
 * Get marker style for device status
 * @param {string} status - Device status
 * @returns {object} Marker style configuration
 */
function getDeviceMarkerStyle(status) {
  const style = STATUS_COLORS[status] || STATUS_COLORS.unknown;
  
  return {
    radius: 8,
    fillColor: style.color,
    fillOpacity: 0.8,
    color: '#ffffff',
    weight: 2,
    // Fault state gets pulsing animation
    className: status === 'fault' ? 'marker-fault-pulse' : ''
  };
}
```

### Pattern: Fault Animation

```css
/**
 * Fault Animation
 * Applies KDE-GIS-005 alert visualization
 * 
 * Usage:
 *   <div class="marker-fault-pulse">...</div>
 */
@keyframes fault-pulse {
  0%, 100% { 
    opacity: 1; 
    transform: scale(1);
  }
  50% { 
    opacity: 0.5; 
    transform: scale(1.2);
  }
}

.marker-fault-pulse {
  animation: fault-pulse 1s ease-in-out infinite;
}
```

---

## 2. Device Clustering

### Pattern: Clustering Configuration

```javascript
/**
 * Device Clustering Configuration
 * Applies KDE-GIS-004 performance optimization
 * 
 * Usage:
 *   map.addLayer(createClusteredLayer('devices', devices));
 */
const CLUSTER_CONFIG = {
  // Cluster appears at zoom 14 and below
  clusterMaxZoom: 14,
  
  // Cluster radius in pixels
  clusterRadius: 50,
  
  // Cluster colors by count
  clusterColors: {
    low: '#22C55E',      // Green: < 10 devices
    medium: '#F59E0B',   // Yellow: 10-50 devices
    high: '#EF4444'      // Red: > 50 devices
  },
  
  // Cluster sizes by count
  clusterSizes: {
    small: 15,  // < 10 devices
    medium: 20, // 10-50 devices
    large: 30   // > 50 devices
  }
};

/**
 * Create clustered marker layer
 * @param {string} sourceId - GeoJSON source ID
 * @param {Array} features - GeoJSON features
 * @returns {object} Layer configuration
 */
function createClusteredLayer(sourceId, features) {
  return {
    id: `${sourceId}-clusters`,
    type: 'circle',
    source: sourceId,
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': [
        'step',
        ['get', 'point_count'],
        CLUSTER_CONFIG.clusterColors.low,
        10, CLUSTER_CONFIG.clusterColors.medium,
        50, CLUSTER_CONFIG.clusterColors.high
      ],
      'circle-radius': [
        'step',
        ['get', 'point_count'],
        CLUSTER_CONFIG.clusterSizes.small,
        10, CLUSTER_CONFIG.clusterSizes.medium,
        50, CLUSTER_CONFIG.clusterSizes.large
      ],
      'circle-stroke-width': 2,
      'circle-stroke-color': '#ffffff'
    }
  };
}

/**
 * Create cluster count label
 */
function createClusterCountLayer(sourceId) {
  return {
    id: `${sourceId}-cluster-count`,
    type: 'symbol',
    source: sourceId,
    filter: ['has', 'point_count'],
    layout: {
      'text-field': ['get', 'point_count_abbreviated'],
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12
    },
    paint: {
      'text-color': '#ffffff'
    }
  };
}
```

---

## 3. Network Line Styling

### Pattern: Transmission Line Styles

```javascript
/**
 * Transmission Line Styling
 * Applies KDE-GIS-006 line visualization
 * 
 * Usage:
 *   const transmissionStyle = getTransmissionLineStyle(voltage);
 */
const VOLTAGE_STYLES = {
  '345': { color: '#000080', width: 4, label: '345kV' },  // Navy
  '230': { color: '#0000FF', width: 3, label: '230kV' },    // Blue
  '115': { color: '#4169E1', width: 2, label: '115kV' },  // Royal blue
  '69':  { color: '#6495ED', width: 2, label: '69kV' },    // Cornflower
  'default': { color: '#666666', width: 1, label: 'Unknown' }
};

/**
 * Get line style for voltage level
 * @param {string} voltage - Voltage level (e.g., "115")
 * @returns {object} Line paint properties
 */
function getTransmissionLineStyle(voltage) {
  const style = VOLTAGE_STYLES[voltage] || VOLTAGE_STYLES.default;
  
  return {
    'line-color': style.color,
    'line-width': style.width,
    'line-cap': 'round',
    'line-join': 'round'
  };
}

/**
 * Create transmission line layer
 * @param {string} sourceId - GeoJSON source ID
 * @returns {object} Layer configuration
 */
function createTransmissionLineLayer(sourceId) {
  return {
    id: 'transmission-lines',
    type: 'line',
    source: sourceId,
    paint: {
      'line-color': [
        'match',
        ['get', 'voltage'],
        '345', VOLTAGE_STYLES['345'].color,
        '230', VOLTAGE_STYLES['230'].color,
        '115', VOLTAGE_STYLES['115'].color,
        '69', VOLTAGE_STYLES['69'].color,
        VOLTAGE_STYLES.default.color
      ],
      'line-width': [
        'match',
        ['get', 'voltage'],
        '345', 4,
        '230', 3,
        '115', 2,
        '69', 2,
        VOLTAGE_STYLES.default.width
      ]
    }
  };
}
```

### Pattern: Power Flow Animation

```javascript
/**
 * Power Flow Animation
 * Applies KDE-GIS-005 real-time visualization
 * 
 * Usage:
 *   const animatedLine = createPowerFlowLine('flow-data', coordinates);
 */
const POWER_FLOW_CONFIG = {
  dashArray: [2, 4],  // Pattern: 2px line, 4px gap
  animationSpeed: 500,  // ms per frame
  direction: 1          // 1 = forward, -1 = reverse
};

/**
 * Create animated power flow line
 * @param {string} sourceId - GeoJSON source ID
 * @param {Array} coordinates - Line coordinates
 * @returns {object} Layer configuration
 */
function createPowerFlowLine(sourceId, coordinates) {
  // Calculate line length for animation
  const length = calculateLineLength(coordinates);
  const dashLength = POWER_FLOW_CONFIG.dashArray.reduce((a, b) => a + b, 0);
  
  return {
    id: 'power-flow',
    type: 'line',
    source: sourceId,
    paint: {
      'line-dasharray': [0, POWER_FLOW_CONFIG.dashArray[0], 
                         length / dashLength, 0],
      'line-width': 3,
      'line-color': '#22C55E',
      'line-translate': [0, 0]
    },
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    }
  };
}

/**
 * Animate power flow
 * @param {object} map - MapLibre GL map instance
 * @param {string} layerId - Line layer ID
 */
function animatePowerFlow(map, layerId) {
  let offset = 0;
  
  function animate() {
    offset = (offset + 1) % 10;
    
    map.setPaintProperty(layerId, 'line-dasharray', [
      0, 
      POWER_FLOW_CONFIG.dashArray[0], 
      10 - offset,
      POWER_FLOW_CONFIG.dashArray[1]
    ]);
    
    requestAnimationFrame(animate);
  }
  
  animate();
}
```

---

## 4. Focus-Alarm Implementation

### Pattern: Alarm Focus

```javascript
/**
 * Focus on Alarm Location
 * Applies KDE-GIS-005 alert visualization
 * 
 * Usage:
 *   await focusAlarm(map, alarmId);
 */
const ALARM_FOCUS_CONFIG = {
  zoom: 16,
  duration: 500,        // Animation duration in ms
  padding: 100,        // Padding around target
  highlightDuration: 5000  // How long to show highlight
};

/**
 * Focus map on alarm location
 * @param {object} map - MapLibre GL map instance
 * @param {object} alarm - Alarm object with location
 * @returns {Promise} Resolves when animation complete
 */
async function focusAlarm(map, alarm) {
  const { coordinates } = alarm.location;
  
  // Fly to alarm location
  await map.flyTo({
    center: coordinates,
    zoom: ALARM_FOCUS_CONFIG.zoom,
    duration: ALARM_FOCUS_CONFIG.duration,
    essential: true
  });
  
  // Highlight alarm marker
  highlightAlarmMarker(map, alarm.id);
  
  // Add pulsing alarm indicator
  addAlarmIndicator(map, coordinates);
}

/**
 * Add alarm indicator at location
 * @param {object} map - MapLibre GL map instance
 * @param {Array} coordinates - [lng, lat]
 */
function addAlarmIndicator(map, coordinates) {
  // Create alarm circle
  const alarmLayer = {
    id: `alarm-indicator-${Date.now()}`,
    type: 'circle',
    paint: {
      'circle-radius': 20,
      'circle-color': '#EF4444',
      'circle-opacity': 0.5,
      'circle-stroke-width': 3,
      'circle-stroke-color': '#EF4444'
    }
  };
  
  // Add temporary layer
  map.addSource('alarm-indicator-source', {
    type: 'geojson',
    data: {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: coordinates
      }
    }
  });
  
  map.addLayer(alarmLayer);
  
  // Remove after duration
  setTimeout(() => {
    map.removeLayer(alarmLayer.id);
    map.removeSource('alarm-indicator-source');
  }, ALARM_FOCUS_CONFIG.highlightDuration);
}
```

---

## 5. Layer Organization

### Pattern: Layer Order

```javascript
/**
 * Layer Order Configuration
 * Applies KDE-GIS-002 Rule 5 and layer management best practices
 * 
 * Usage:
 *   const layerOrder = getLayerOrder();
 */
const LAYER_ORDER = {
  // Bottom layers first
  zIndex: [
    'basemap-raster',      // 0: Base map tiles
    'basemap-labels',      // 1: Map labels
    'terrain',             // 2: Terrain/elevation
    'boundaries',          // 3: Administrative boundaries
    'landcover',            // 4: Land use/cover
    
    // Network layers
    'transmission-lines',   // 5: High voltage transmission
    'distribution-lines', // 6: Medium/low voltage
    'underground-cable',    // 7: Underground sections
    'fiber-network',        // 8: Communication lines
    
    // Asset layers
    'substations-fill',     // 9: Substation polygons
    'substations-outline',  // 10: Substation borders
    'transformers',         // 11: Transformer points
    'devices-points',       // 12: Other device points
    
    // Labels and UI
    'substations-labels',    // 13: Substation names
    'devices-labels',      // 14: Device labels
    'line-labels',          // 15: Line identifiers
    
    // Overlay layers
    'alarms-overlay',       // 16: Alarm highlights
    'selection-overlay',    // 17: Selected items
    'drawing-tools',        // 18: User drawings
    'measurement-tools'     // 19: Measurement overlays
  ]  // Top layers last
};

/**
 * Apply standard layer ordering
 * @param {object} map - MapLibre GL map instance
 */
function applyLayerOrder(map) {
  LAYER_ORDER.zIndex.forEach((layerId, index) => {
    if (map.getLayer(layerId)) {
      map.moveLayer(layerId);
    }
  });
}
```

---

## 6. Popup Configuration

### Pattern: Device Popup

```javascript
/**
 * Device Popup Configuration
 * Applies KDE-GIS-002 Rule 10 and usability best practices
 * 
 * Usage:
 *   const popup = createDevicePopup(device);
 */
const POPUP_CONFIG = {
  maxWidth: '350px',
  closeButton: true,
  closeOnClick: false,
  offset: 15,
  className: 'gis-device-popup'
};

/**
 * Create device information popup
 * @param {object} device - Device object
 * @returns {string} HTML content
 */
function createDevicePopupContent(device) {
  const statusStyle = STATUS_COLORS[device.status] || STATUS_COLORS.unknown;
  
  return `
    <div class="popup-header">
      <span class="status-indicator" style="background: ${statusStyle.color}"></span>
      <h3 class="device-name">${device.name}</h3>
    </div>
    <div class="popup-body">
      <table class="device-info">
        <tr>
          <td class="label">ID:</td>
          <td class="value">${device.id}</td>
        </tr>
        <tr>
          <td class="label">Type:</td>
          <td class="value">${device.type}</td>
        </tr>
        <tr>
          <td class="label">Status:</td>
          <td class="value" style="color: ${statusStyle.color}">${statusStyle.label}</td>
        </tr>
        ${device.voltage ? `
        <tr>
          <td class="label">Voltage:</td>
          <td class="value">${device.voltage} kV</td>
        </tr>
        ` : ''}
        ${device.capacity ? `
        <tr>
          <td class="label">Capacity:</td>
          <td class="value">${device.capacity} MVA</td>
        </tr>
        ` : ''}
      </table>
    </div>
    <div class="popup-actions">
      <button onclick="viewDeviceDetails('${device.id}')">Details</button>
      <button onclick="focusDevice('${device.id}')">Focus</button>
      <button onclick="routeToDevice('${device.id}')">Route</button>
    </div>
  `;
}

/**
 * Create popup for device
 * @param {object} map - MapLibre GL map instance
 * @param {object} device - Device object
 * @param {Array} lngLat - [lng, lat]
 */
function showDevicePopup(map, device, lngLat) {
  const popup = new maplibregl.Popup({
    ...POPUP_CONFIG,
    className: `${POPUP_CONFIG.className} ${device.status}-status`
  })
    .setLngLat(lngLat)
    .setHTML(createDevicePopupContent(device))
    .addTo(map);
}
```

---

## 7. Dark Mode Styling

### Pattern: Dark Mode Map Style

```javascript
/**
 * Dark Mode Configuration
 * Applies KDE-GIS-002 Rule 15 for control room environments
 * 
 * Usage:
 *   const darkStyle = getDarkMapStyle();
 */
const DARK_MODE_CONFIG = {
  // Basemap colors
  basemap: {
    background: '#0f172a',     // Dark blue-gray
    land: '#1e293b',           // Darker land
    water: '#0f172a',           // Dark water
    roads: '#334155',           // Muted roads
    labels: '#94a3b8'           // Muted labels
  },
  
  // UI colors
  ui: {
    background: '#1e293b',
    text: '#e2e8f0',
    border: '#334155',
    accent: '#3b82f6'
  },
  
  // Status colors (remain consistent)
  status: STATUS_COLORS
};

/**
 * Get dark mode map style
 * @returns {object} MapLibre GL style object
 */
function getDarkMapStyle() {
  return {
    version: 8,
    name: 'Dark Mode',
    sources: {
      'osm-tiles': {
        type: 'raster',
        tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '© OpenStreetMap'
      }
    },
    layers: [
      {
        id: 'basemap-dark',
        type: 'background',
        paint: {
          'background-color': DARK_MODE_CONFIG.basemap.background
        }
      },
      {
        id: 'osm-tiles-dark',
        type: 'raster',
        source: 'osm-tiles',
        paint: {
          'raster-saturation': -0.8,  // Desaturate
          'raster-brightness-max': 0.6 // Darken
        }
      }
    ]
  };
}

/**
 * Apply dark mode to map
 * @param {object} map - MapLibre GL map instance
 */
function enableDarkMode(map) {
  map.setStyle(getDarkMapStyle());
  document.documentElement.setAttribute('data-theme', 'dark');
}

/**
 * CSS variables for dark mode
 */
const DARK_MODE_CSS = `
[data-theme="dark"] {
  --popup-background: #1e293b;
  --popup-text: #e2e8f0;
  --popup-border: #334155;
  --button-background: #334155;
  --button-text: #e2e8f0;
  --button-hover: #475569;
}
`;
```

---

## 8. Real-Time Updates

### Pattern: Telemetry Integration

```javascript
/**
 * Real-Time Update Configuration
 * Applies KDE-GIS-005 real-time patterns
 * 
 * Usage:
 *   const updater = createTelemetryUpdater(map);
 */
const TELEMETRY_CONFIG = {
  // Update batching
  batchInterval: 100,      // ms to batch updates
  maxBatchSize: 50,         // Max updates per batch
  
  // Update strategies
  strategy: 'incremental',  // 'full' or 'incremental'
  
  // Debounce
  debounceDelay: 100       // ms to debounce rapid updates
};

/**
 * Create telemetry update manager
 * @param {object} map - MapLibre GL map instance
 * @returns {object} Update manager instance
 */
function createTelemetryUpdater(map) {
  const updateQueue = new Map();
  let batchScheduled = false;
  
  return {
    /**
     * Queue a device update
     * @param {object} device - Updated device data
     */
    queueUpdate(device) {
      updateQueue.set(device.id, device);
      
      if (!batchScheduled) {
        batchScheduled = true;
        requestAnimationFrame(() => this.processBatch());
      }
    },
    
    /**
     * Process batched updates
     */
    processBatch() {
      const updates = Array.from(updateQueue.values());
      updateQueue.clear();
      batchScheduled = false;
      
      if (updates.length === 0) return;
      
      // Update GeoJSON source
      this.applyUpdates(updates);
    },
    
    /**
     * Apply updates to map
     * @param {Array} updates - Array of updated devices
     */
    applyUpdates(updates) {
      const source = map.getSource('devices');
      if (!source) return;
      
      // Incremental update - only update changed features
      const currentData = source._data || { type: 'FeatureCollection', features: [] };
      
      updates.forEach(update => {
        const index = currentData.features.findIndex(
          f => f.properties.id === update.id
        );
        
        if (index >= 0) {
          // Update existing feature
          currentData.features[index] = {
            ...currentData.features[index],
            properties: {
              ...currentData.features[index].properties,
              ...update
            }
          };
        } else {
          // Add new feature
          currentData.features.push(createDeviceFeature(update));
        }
      });
      
      source.setData(currentData);
    }
  };
}

/**
 * Create GeoJSON feature from device
 * @param {object} device - Device data
 * @returns {object} GeoJSON feature
 */
function createDeviceFeature(device) {
  return {
    type: 'Feature',
    id: device.id,
    geometry: {
      type: 'Point',
      coordinates: device.coordinates
    },
    properties: {
      ...device,
      statusColor: STATUS_COLORS[device.status]?.color || STATUS_COLORS.unknown.color
    }
  };
}
```

---

## Summary

| Pattern | Knowledge Source | Complexity |
|---------|----------------|------------|
| Status Colors | KDE-GIS-002, KDE-GIS-006 | LOW |
| Clustering | KDE-GIS-004 | MEDIUM |
| Network Lines | KDE-GIS-006 | MEDIUM |
| Power Flow Animation | KDE-GIS-005 | MEDIUM |
| Focus Alarm | KDE-GIS-005 | LOW |
| Layer Order | KDE-GIS-002 | LOW |
| Popup Configuration | KDE-GIS-002 | LOW |
| Dark Mode | KDE-GIS-002 | MEDIUM |
| Telemetry Updates | KDE-GIS-005 | HIGH |

---

*Patterns apply knowledge standards to implementation*
