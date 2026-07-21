# Cartography Principles

## Overview

This document covers cartographic principles for designing professional GIS map displays.

---

## Map Design Principles

### Visual Hierarchy

Elements must be organized by importance:

| Priority | Element | Visual Treatment |
|----------|---------|------------------|
| 1 | Critical data (alerts, selected) | Large, bold, prominent |
| 2 | Primary features (assets) | Medium, clear symbols |
| 3 | Secondary features (labels) | Smaller, subdued |
| 4 | Base map (context) | Subtle, supporting |

### Color Usage

**Map-Specific Colors**:
| Type | Purpose | Examples |
|------|---------|----------|
| Hue | Categorical distinction | Red, blue, green |
| Value | Quantitative emphasis | Dark, light |
| Saturation | Intensity | Vivid, muted |

**Best Practices**:
- Use color to convey meaning
- Maintain adequate contrast
- Consider color-blind users
- Keep palette simple (5-7 colors)

---

## Symbolization

### Point Symbols

| Type | Use Case |
|------|----------|
| Simple marker | General points |
| Circle | Measured values |
| Icon | Specific asset types |
| Scaled circle | Quantitative data |

### Line Symbols

| Type | Use Case |
|------|----------|
| Solid | Boundaries, cables |
| Dashed | Approximate, planned |
| Dotted | Easements |
| Cased | Multiple attributes |

### Polygon Symbols

| Type | Use Case |
|------|----------|
| Fill | Areas, zones |
| Outline | Boundaries |
| Pattern | Categorical areas |
| Gradient | Quantitative data |

---

## Label Placement

### Placement Rules

1. **Avoid overlap** with other labels
2. **Follow features** for linear features
3. **Position consistently** for same type
4. **Prioritize** important labels

### Label Styles

```javascript
{
  "symbol": {
    "type": "text",
    "color": "#333333",
    "size": 12,
    "font": "Arial",
    "haloColor": "#ffffff",
    "haloSize": 1
  }
}
```

---

## Legends

### Legend Design

```
┌─────────────────────────────────┐
│ LEGEND                           │
├─────────────────────────────────┤
│                                 │
│ ● Substation      ─── Transmission │
│ ■ Transformer      - - - Distribution │
│ ▲ Switch                          │
│                                 │
└─────────────────────────────────┘
```

### Legend Rules

- Include all symbols used
- Group by category
- Keep concise
- Update dynamically with layers

---

## Scale

### Scale Representation

| Scale | Representation | Use |
|-------|---------------|-----|
| Large | 1:1,000 - 1:50,000 | Urban, site |
| Medium | 1:50,000 - 1:250,000 | Regional |
| Small | 1:250,000+ | National, world |

### Scale Bar

Always include a scale bar for reference.

```html
<div class="scale-bar">
  <div class="scale-marks">
    <span>0</span>
    <span>100m</span>
    <span>200m</span>
  </div>
  <div class="scale-line"></div>
</div>
```

---

## Map Elements

### Required Elements

- Title
- Legend
- Scale bar
- North arrow (if not north-up)
- Attribution/source
- Timestamp

### Optional Elements

- Overview map
- Locator map
- Data source notes
- Projection information

---

## Symbol Conventions

### Utility Infrastructure

| Feature | Symbol | Color |
|---------|--------|-------|
| Substation | Rectangle | Blue |
| Transmission Line | Thick line | Black |
| Distribution Line | Medium line | Black |
| Transformer | Circle | Green |
| Switch | Diamond | Red |
| Meter | Small square | Gray |

### Status Indication

| Status | Color | Style |
|--------|-------|-------|
| Normal | Green | Solid |
| Warning | Yellow | Solid |
| Fault | Red | Flashing |
| Unknown | Gray | Dashed |

---

## Summary

| Principle | Application |
|-----------|-------------|
| Hierarchy | Most important = Most visible |
| Color | Semantic, consistent |
| Symbols | Clear, recognizable |
| Labels | Readable, non-overlapping |
| Legend | Complete, updated |
| Scale | Always visible |

---

*Source: Cartographic standards, GIS design best practices*
