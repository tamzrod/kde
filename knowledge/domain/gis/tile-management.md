# Tile Management

## Overview

This document covers map tile formats and management strategies.

---

## Tile Systems

### XYZ Tiles

Standard web map tile scheme.

```
URL Pattern: /{z}/{x}/{y}.png
Example: /12/654/1582.png

z = Zoom level (0-22)
x = Column (0 to 2^z - 1)
y = Row (0 to 2^z - 1)
```

### TMS (Tile Map Service)

Similar to XYZ but Y is inverted.

```
URL Pattern: /{z}/{x}/{y}.png
Example: /12/654/1582.png

Y calculation: y' = 2^z - 1 - y
```

### WMTS

OGC standard for tile services.

```xml
<Capabilities>
  <Contents>
    <Layer>
      <Identifier>osm</Identifier>
      <TileMatrixSetLink>
        <TileMatrixSet>EPSG:3857</TileMatrixSet>
      </TileMatrixSetLink>
    </Layer>
  </Contents>
</Capabilities>
```

---

## Tile Formats

### Raster Tiles

Pre-rendered image tiles.

| Format | Compression | Use Case |
|--------|-------------|----------|
| PNG | Lossless | Satellite, terrain |
| JPEG | Lossy | Photos, imagery |
| WebP | Best | Modern browsers |

### Vector Tiles

Encoded vector data (Protobuf).

| Format | Standard | Use Case |
|--------|----------|----------|
| MVT | Mapbox | General vectors |
| GeoJSON | N/A | Debugging |

---

## Tile Generation

### Tippecanoe (Vector Tiles)

```bash
# Basic usage
tippecanoe -o output.pmtiles input.geojson

# With zoom levels
tippecanoe -o output.pmtiles -z14 -Z5 input.geojson

# Multiple files
tippecanoe -o output.pmtiles -l layer1 file1.geojson -l layer2 file2.geojson

# Drop dense features at low zoom
tippecanoe -o output.pmtiles --drop-densest-as-needed input.geojson
```

### MBTiles Generation

```bash
# Using ogr2ogr
ogr2ogr -f MBTiles output.mbtiles input.shp

# Using tilelive
tile-join -o output.mbtiles source1.mbtiles source2.mbtiles
```

---

## Tile Optimization

### Compression

```bash
# Optimize PNG tiles
optipng -o5 tile.png

# Optimize JPEG tiles
jpegoptim tile.jpg

# Generate WebP
cwebp -q 80 tile.png -o tile.webp
```

### Multi-resolution

```javascript
// Serve different resolutions based on device
const getTileUrl = (z, x, y) => {
  if (isHighDensityDisplay) {
    return `/tiles/${z}/${x}/${y}@2x.webp`;
  }
  return `/tiles/${z}/${x}/${y}.png`;
};
```

---

## Tile Serving

### Tile Server Options

| Server | Type | Best For |
|--------|------|----------|
| tileserver-gl | Vector/Raster | General |
| tessera | Vector | High performance |
| mbtileserver | Vector | Simple |
| tilecache | Raster | Legacy |
| mapproxy | WMS/TMS | Complex |

### tileserver-gl Configuration

```json
{
  "options": {
    "serveAllFonts": true,
    "serveAllGlyphs": true,
    "pbfMimeType": "application/x-protobuf"
  },
  "styles": {
    "osm-bright": {
      "style": "styles/osm-bright.json",
      "tilejson": {
        "bounds": [-180, -85, 180, 85]
      }
    }
  },
  "data": {
    "openmaptiles": {
      "pmtiles": "./data/openmaptiles.pmtiles"
    }
  }
}
```

---

## Tile Caching

### HTTP Cache Headers

```
Cache-Control: public, max-age=31536000, immutable
ETag: "abc123"
```

### Cache Invalidation

```javascript
// Versioned tiles
const TILE_VERSION = 'v1.2';
const getTileUrl = (z, x, y) => 
  `/tiles/${TILE_VERSION}/${z}/${x}/${y}.png`;

// Clear old cache
function invalidateCache() {
  caches.keys().then(keys => {
    keys.filter(key => key.startsWith('tiles-v'))
        .forEach(key => caches.delete(key));
  });
}
```

---

## Tile Indexing

### R-Tree Spatial Index

```javascript
const rbush = require('rbush');

const tree = new rbush();

const items = tiles.map(tile => ({
  minX: tile.bounds.west,
  minY: tile.bounds.south,
  maxX: tile.bounds.east,
  maxY: tile.bounds.north,
  tile
}));

tree.load(items);

// Query tiles in viewport
const results = tree.search({
  minX: bounds.west,
  minY: bounds.south,
  maxX: bounds.east,
  maxY: bounds.north
});
```

---

## Summary

| Aspect | Technology |
|--------|-----------|
| Format | MVT, PNG, JPEG |
| Storage | MBTiles, PMTiles |
| Generation | Tippecanoe |
| Serving | tileserver-gl |
| Caching | HTTP, Service Worker |

---

*Source: Tile system documentation*
