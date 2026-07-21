# GIS Data Standards

## Overview

This document covers geospatial data standards and formats.

---

## Vector Data Formats

### GeoJSON

**Standard**: RFC 7946  
**Type**: JSON

```json
{
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "id": "substation-1",
    "geometry": {
      "type": "Point",
      "coordinates": [-122.4194, 37.7749]
    },
    "properties": {
      "name": "Downtown Substation",
      "voltage": 115,
      "capacity": "50 MVA"
    }
  }]
}
```

**Pros**:
- Human-readable
- Wide support
- Easy to debug

**Cons**:
- Large file size
- No topology

---

### TopoJSON

**Type**: Topological JSON

```json
{
  "type": "Topology",
  "arcs": [[0, 0, 1, 1], [1, 1, 2, 2]],
  "objects": {
    "building": {
      "type": "Polygon",
      "arcs": [[0]],
      "properties": { "name": "A" }
    }
  }
}
```

**Pros**:
- Shared geometry (smaller files)
- Topology preserved

**Cons**:
- Less common support

---

### KML/KMZ

**Standard**: OGC  
**Type**: XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Placemark>
    <name>Substation A</name>
    <Point>
      <coordinates>-122.4194,37.7749</coordinates>
    </Point>
  </Placemark>
</kml>
```

**Pros**:
- Google Earth compatible
- Supports styling

**Cons**:
- XML verbose
- Limited features

---

### Shapefile

**Type**: Multi-file (legacy)

| File | Content |
|------|---------|
| .shp | Geometry |
| .shx | Shape index |
| .dbf | Attributes |
| .prj | Projection |

**Pros**:
- Legacy standard
- Wide GIS support

**Cons**:
- Multi-file
- Limited field types
- 2GB limit

---

## Tile Formats

### MVT (Mapbox Vector Tile)

**Standard**: Mapbox  
**Type**: Protocol Buffers

```protobuf
message Tile {
  repeated Layer layers = 1;
  
  message Layer {
    string name = 1;
    uint32 extent = 2;
    repeated Feature features = 3;
  }
}
```

### PMTiles

**Type**: Single-file

```javascript
// Header (127 bytes)
// • signature, version, minzoom, maxzoom, bounds
// Directory (varint offsets)
// Tile data (z/x/y)
```

---

## OGC Standards

### WMS (Web Map Service)

Dynamic map image generation.

```xml
<GetMap version="1.3.0"
  service="WMS"
  layers="topp:states"
  styles=""
  crs="EPSG:4326"
  bbox="-125,24,-66,50"
  width="600" height="300"
  format="image/png"/>
```

### WMTS (Web Map Tile Service)

Pre-cached tiles.

```xml
<GetTile service="WMTS"
  layer="topp:states"
  style="default"
  tileMatrixSet="EPSG:4326"
  tileMatrix="5"
  tileRow="12" tileCol="8"/>
```

### WFS (Web Feature Service)

Feature data access.

```xml
<GetFeature service="WFS" version="2.0.0"
  typeNames="topp:states">
  <Filter>
    <PropertyIsEqualTo>
      <ValueReference>STATE_NAME</ValueReference>
      <Literal>California</Literal>
    </PropertyIsEqualTo>
  </Filter>
</GetFeature>
```

---

## Database Standards

### GeoPackage

**Standard**: OGC  
**Type**: SQLite-based

```sql
CREATE TABLE features (
  id INTEGER PRIMARY KEY,
  geometry BLOB,
  properties TEXT
);
```

### PostGIS

**Type**: PostgreSQL extension

```sql
SELECT name, ST_AsGeoJSON(geom)
FROM substations
WHERE ST_Contains(
  ST_MakeEnvelope(-122.5, 37.5, -122.0, 38.0),
  geom
);
```

---

## Summary

| Format | Type | Best Use |
|--------|------|----------|
| GeoJSON | Vector | Web APIs |
| TopoJSON | Vector | Shared geometry |
| KML | Vector | Google Earth |
| Shapefile | Vector | Legacy GIS |
| MVT | Tiles | Web maps |
| PMTiles | Tiles | Offline |
| WMS | Raster | Dynamic maps |
| WFS | Vector | Feature access |
| GeoPackage | DB | Mobile/offline |
| PostGIS | DB | Server storage |

---

*Source: OGC standards, geospatial formats*
