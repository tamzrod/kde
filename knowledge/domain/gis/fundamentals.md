# GIS Fundamentals

## Overview

This document covers fundamental GIS concepts essential for building professional geospatial applications.

---

## Core Concepts

### Geographic Information System (GIS)

A system designed to capture, store, manipulate, analyze, manage, and present spatial or geographic data.

### Key Components

| Component | Description |
|-----------|-------------|
| Hardware | GPS devices, servers, workstations |
| Software | Desktop GIS, web GIS, databases |
| Data | Spatial and attribute data |
| People | GIS professionals, users |
| Procedures | Methods and workflows |

---

## Coordinate Systems

### Geographic Coordinate System (GCS)

Uses latitude and longitude to define positions on a spherical surface.

**Format**: `longitude, latitude`

**Examples**:
- WGS84 (EPSG:4326): Standard GPS coordinate system
- NAD83 (EPSG:4269): North American Datum 1983

### Projected Coordinate System (PCS)

Converts 3D spherical surface to 2D flat plane using mathematical projections.

**Common Projections**:
| Projection | EPSG | Use Case |
|------------|------|----------|
| Web Mercator | 3857 | Web mapping (Google Maps, OSM) |
| UTM | Various | Regional mapping |
| State Plane | Various | Local surveys |

### Key EPSG Codes

| Code | Name | Use |
|------|------|-----|
| 4326 | WGS84 | GPS, general use |
| 3857 | Web Mercator | Web maps |
| 326xx | UTM Zone | Regional analysis |

---

## Geometry Types

### Point

Single location.
```json
{
  "type": "Point",
  "coordinates": [-122.4194, 37.7749]
}
```

### LineString

Connected series of points.
```json
{
  "type": "LineString",
  "coordinates": [
    [-122.4194, 37.7749],
    [-122.4294, 37.7849]
  ]
}
```

### Polygon

Closed area with filled interior.
```json
{
  "type": "Polygon",
  "coordinates": [[
    [-122.4194, 37.7749],
    [-122.4194, 37.7849],
    [-122.4094, 37.7849],
    [-122.4094, 37.7749],
    [-122.4194, 37.7749]
  ]]
}
```

### MultiPoint, MultiLineString, MultiPolygon

Collections of geometries.

---

## Layers

### Layer Types

| Type | Description | Examples |
|------|-------------|----------|
| Base Map | Underlying geographic context | Street map, satellite |
| Vector | Points, lines, polygons | Assets, boundaries |
| Raster | Grid/cell-based data | Satellite imagery, elevation |
| Tile | Pre-rendered map tiles | XYZ, TMS |
| Vector Tile | Compressed vector data | MVT, Mapbox |

### Layer Properties

- Visibility (on/off)
- Opacity (0-100%)
- Z-index (stacking order)
- Filtering
- Styling

---

## Spatial Data Formats

### GeoJSON

```json
{
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "properties": { "name": "Substation A" },
    "geometry": { "type": "Point", "coordinates": [-122.4, 37.7] }
  }]
}
```

### TopoJSON

Extension of GeoJSON with topology sharing.

### KML/KMZ

Keyhole Markup Language for Google Earth.

### Shapefile

ESRI format (legacy but still common):
- .shp: Geometry
- .shx: Shape index
- .dbf: Attributes

---

## Spatial Databases

### PostgreSQL + PostGIS

Open-source spatial database.

```sql
SELECT name, ST_Distance(geom, ST_MakePoint(-122.4, 37.7))
FROM substations
ORDER BY geom <-> ST_MakePoint(-122.4, 37.7)::geography;
```

### SQLite + SpatiaLite

Lightweight file-based spatial database.

### GeoPackage

OGC standard, based on SQLite.

---

## Web Map Tile Services

### XYZ Tiles

```
https://tile.openstreetmap.org/{z}/{x}/{y}.png
```

### TMS (Tile Map Service)

Similar to XYZ but with flipped Y-axis.

### WMTS (Web Map Tile Service)

OGC standard for tile services.

### WMS (Web Map Service)

Dynamic map rendering, not tiles.

---

## Summary

| Concept | Key Point |
|---------|-----------|
| GCS | Latitude/Longitude on sphere |
| PCS | Flat projected coordinates |
| EPSG:4326 | WGS84 standard |
| EPSG:3857 | Web Mercator |
| Geometry Types | Point, Line, Polygon |
| Layers | Base, vector, raster |
| Formats | GeoJSON, KML, Shapefile |

---

*Source: OGC standards, GIS fundamentals*
