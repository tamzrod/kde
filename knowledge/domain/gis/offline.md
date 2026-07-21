# Offline GIS

## Overview

This document covers offline GIS strategies for air-gapped and disconnected deployments.

---

## Offline Architecture

### Offline-First Design

```
┌──────────────────────────────────────────────────┐
│                    GIS Client                      │
├──────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  Local   │  │   Local  │  │   Sync   │       │
│  │  Tiles   │  │  GeoJSON │  │  Queue   │       │
│  └──────────┘  └──────────┘  └──────────┘       │
├──────────────────────────────────────────────────┤
│              IndexedDB / Local Storage             │
└──────────────────────────────────────────────────┘
                        │
                        ▼ (when online)
┌──────────────────────────────────────────────────┐
│                    Server API                      │
└──────────────────────────────────────────────────┘
```

---

## Tile Caching Strategies

### Pre-cache Tiles

```javascript
async function cacheTiles(bounds, minZoom, maxZoom) {
  const tiles = getTileList(bounds, minZoom, maxZoom);
  
  for (const tile of tiles) {
    const url = tile.url.replace('{x}', tile.x)
                        .replace('{y}', tile.y)
                        .replace('{z}', tile.z);
    
    const response = await fetch(url);
    const blob = await response.blob();
    await storeTile(tile.key, blob);
  }
}
```

### Service Worker Caching

```javascript
const CACHE_NAME = 'map-tiles-v1';

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/tiles/')) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        return cached || fetch(event.request).then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clone);
          });
          return response;
        });
      })
    );
  }
});
```

---

## Vector Tile Caching

### MBTiles Format

Single file containing vector tiles.

```bash
# Create MBTiles
tippecanoe -o base-map.mbtiles -z14 -Z0 *.geojson

# Serve MBTiles
mbtileserver -p 8080 base-map.mbtiles
```

### PMTiles

Single-file format with better random access.

```bash
# Create PMTiles
tippecanoe -o base-map.pmtiles -z14 -Z0 *.geojson --drop-densest-as-needed
```

### Client Usage

```javascript
import { PMTiles } from 'pmtiles';

const pmtiles = new PMTiles('/data/base-map.pmtiles');

const layer = new maplibregl.XYZ({
  minzoom: 0,
  maxzoom: 14,
  tileSize: 256,
  async getTileData(url, abortController) {
    const [z, x, y] = url.match(/(\d+)\/(\d+)\/(\d+)/).slice(1);
    const data = await pmtiles.getZxy(z, x, y);
    return { tiles: [data] };
  }
});
```

---

## Local Data Storage

### IndexedDB for GeoJSON

```javascript
const DB_NAME = 'gis-offline';
const STORE_NAME = 'features';

async function saveFeatures(features) {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    }
  });
  
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  
  for (const feature of features) {
    await store.put(feature);
  }
  
  return tx.complete;
}
```

### Sync Queue

```javascript
class SyncQueue {
  constructor() {
    this.queue = [];
    this.isOnline = navigator.onLine;
    
    window.addEventListener('online', () => this.processQueue());
  }
  
  add(operation) {
    this.queue.push(operation);
    if (this.isOnline) {
      this.processQueue();
    }
  }
  
  async processQueue() {
    while (this.queue.length > 0 && this.isOnline) {
      const operation = this.queue.shift();
      await operation.execute();
    }
  }
}
```

---

## Offline Map Manager

### UI Component

```javascript
class OfflineMapManager {
  constructor(map) {
    this.map = map;
    this.regions = [];
  }
  
  async downloadRegion(name, bounds, options = {}) {
    const { zoomLevels = [8, 14], tileSize = 512 } = options;
    
    const tiles = this.getTilesInBounds(bounds, zoomLevels);
    
    for (const tile of tiles) {
      await this.downloadTile(tile);
      this.updateProgress(tile.downloaded / tiles.length);
    }
    
    this.regions.push({ name, bounds, options });
  }
  
  getTilesInBounds(bounds, zoomLevels) {
    const tiles = [];
    for (let z = zoomLevels[0]; z <= zoomLevels[1]; z++) {
      const n = Math.pow(2, z);
      for (let x = Math.floor((bounds.west + 180) / 360 * n); x <= Math.floor((bounds.east + 180) / 360 * n); x++) {
        for (let y = Math.floor((90 - bounds.north) / 180 * n); y <= Math.floor((90 - bounds.south) / 180 * n); y++) {
          tiles.push({ z, x, y });
        }
      }
    }
    return tiles;
  }
}
```

---

## Air-Gapped Deployment

### Docker-Based Solution

```yaml
# docker-compose.yml
services:
  mapcache:
    image: geomatic珈b/mapproxy
    ports:
      - "8080:8080"
    volumes:
      - ./tiles:/tiles
      - ./config:/config
  
  postgis:
    image: postgis/postgis
    volumes:
      - ./data:/var/lib/postgresql/data
```

### Self-Hosted Vector Tiles

```javascript
// Serve vector tiles from local storage
const tileServer = express();

tileServer.get('/tiles/:layer/:z/:x/:y.pbf', async (req, res) => {
  const { layer, z, x, y } = req.params;
  const tile = await getLocalTile(layer, z, x, y);
  
  if (tile) {
    res.set('Content-Type', 'application/x-protobuf');
    res.send(tile);
  } else {
    res.status(404).send();
  }
});
```

---

## Summary

| Strategy | Use Case |
|----------|----------|
| Service Worker | Browser caching |
| MBTiles | Compact tile storage |
| PMTiles | Better random access |
| IndexedDB | Feature storage |
| Sync Queue | Offline edits |
| Docker | Air-gapped deployment |

---

*Source: Offline GIS best practices*
