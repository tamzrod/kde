# Dashboard Design Patterns

## Overview

This document catalogs recurring design patterns for dashboards that improve usability and user experience.

---

## Navigation Patterns

### 1. Overview + Detail

**Pattern**: Summary view with drill-down capability

**Structure**:
```
┌─────────────────────────────────────────────────────┐
│ Overview Dashboard                                    │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│ │ KPI 1   │ │ KPI 2   │ │ KPI 3   │ │ KPI 4   │    │
│ └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘    │
│      │           │           │           │          │
│      └───────────┴───────────┴───────────┘          │
│                       │                              │
│                       ▼                              │
│              ┌─────────────────┐                    │
│              │    Detail View    │                    │
│              │   (Drill-down)    │                    │
│              └─────────────────┘                    │
└─────────────────────────────────────────────────────┘
```

**Use When**:
- Multiple metrics need summary
- Users need deep-dive capability
- Hierarchical data structure

### 2. Hub and Spoke

**Pattern**: Central dashboard with related views

**Structure**:
```
         ┌──────────┐
         │  Home    │
         │(Dashboard)│
         └────┬─────┘
              │
    ┌─────────┼─────────┬──────────┐
    ▼         ▼         ▼          ▼
┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐
│ Reports│ │ Users │ │ Alerts│ │ Settings│
└───────┘ └───────┘ └───────┘ └───────┘
```

**Use When**:
- Multiple distinct sections
- Clear categorization
- Easy return to home

### 3. Breadcrumb Navigation

**Pattern**: Hierarchical path display

**Format**: `Home > Region > Station > Equipment`

**Behavior**:
- Each level clickable
- Shows current location
- Supports drill-up

---

## Visualization Patterns

### 4. Multi-View Linking

**Pattern**: Multiple charts that filter together

**Structure**:
```
┌─────────────────────────────────────────────────────┐
│ [Map]  [Chart]  [Table]                            │
├─────────────────────────────────────────────────────┤
│ ┌─────────────────┐ ┌─────────────────────────────┐ │
│ │                 │ │                             │ │
│ │    Map          │ │   Related Chart             │ │
│ │   (click        │ │   (filters by              │ │
│ │    filters      │ │    map selection)          │ │
│ │    others)      │ │                             │ │
│ │                 │ │                             │ │
│ └─────────────────┘ └─────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────┐ │
│ │   Table (shows selected items)                  │ │
│ └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

### 5. Layered Visualization

**Pattern**: Multiple data layers toggleable

**Structure**:
```
┌─────────────────────────────────────────────────────┐
│ Layers: [✓] Power Flow  [✓] Alarms  [ ] Capacity  │
├─────────────────────────────────────────────────────┤
│                                                     │
│              Interactive Map                         │
│              with togglable layers                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 6. Comparison Pattern

**Pattern**: Side-by-side or before/after

**Variants**:
- Time: This month vs. Last month
- Region: East vs. West
- Plan: Actual vs. Target

---

## Filter Patterns

### 7. Faceted Search

**Pattern**: Multiple filter dimensions

**Structure**:
```
┌─────────────────────────────────────────────────────┐
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐│
│ │ Date ▼  │ │ Region ▼│ │ Status ▼│ │ Search ││
│ └──────────┘ └──────────┘ └──────────┘ └────────┘│
│ Active Filters: [Region: East ×] [Status: Active ×]│
├─────────────────────────────────────────────────────┤
│ Results: 127 items                                  │
└─────────────────────────────────────────────────────┘
```

### 8. Time Range Selector

**Pattern**: Predefined + custom range

**Options**:
| Range | Selection |
|-------|-----------|
| Quick | Today, 7D, 30D, 90D, YTD |
| Compare | vs. Last Period |
| Custom | Date picker |

---

## Interaction Patterns

### 9. Hover Tooltip

**Pattern**: Rich tooltip on hover

**Structure**:
```
┌─────────────────────────────────────────────┐
│                                             │
│              Chart Area                     │
│               ▲                            │
│          ┌────┴────┐                      │
│          │ Tooltip  │                      │
│          │ ──────── │                      │
│          │ Series A │                      │
│          │ Value: 45│                      │
│          │ Change: +5│                      │
│          └──────────┘                      │
└─────────────────────────────────────────────┘
```

### 10. Click Action

**Pattern**: Single click for preview, double for details

| Action | Result |
|--------|--------|
| Hover | Tooltip |
| Single click | Select / Highlight |
| Double click | Full detail view |
| Right click | Context menu |

---

## Layout Patterns

### 11. F-Pattern Layout

**Pattern**: Based on reading patterns

```
┌─────────────────────────────────────────────────────┐
│ ████████████████████████████  High Priority          │
├─────────────────────────────────────────────────────┤
│ ██████████████████  │  ████████████                 │
│ Primary Content     │  Secondary                    │
│                     │                               │
├─────────────────────────────────────────────────────┤
│ ████████████  │  ████████████  │  ████████████    │
│ Lower Priority │  Lower Priority │  Lower Priority  │
└─────────────────────────────────────────────────────┘
```

### 12. Golden Zone

**Pattern**: Important content in optimal viewing area

```
┌─────────────────────────────────────────────────────┐
│ Header                                             │
├─────────────────────────────────────────────────────┤
│ ┌───────────────────────────────────────────────┐  │
│ │           ← Golden Zone (top-left) →          │  │
│ │    Most visible area for key metrics          │  │
│ └───────────────────────────────────────────────┘  │
│                                                      │
│ Secondary Content                                    │
└─────────────────────────────────────────────────────┘
```

---

## Data Patterns

### 13. Sparkline

**Pattern**: Inline trend in tables/cards

**Example**:
```
┌─────────────────────────────────────────────────────┐
│ Revenue          │ Trend        │ Status           │
├──────────────────┼──────────────┼──────────────────┤
│ $1,234,567       │ ∿∿∿∿∿∿╲    │ ● Active        │
│ $987,654          │ ∿∿∿∿╱∿∿     │ ● Active        │
│ $456,789          │ ∿∿╱╲∿∿∿     │ ● Active        │
└─────────────────────────────────────────────────────┘
```

### 14. Status Indicator

**Pattern**: Visual status with color + icon

| Status | Color | Icon |
|--------|-------|------|
| Success | Green | ● |
| Warning | Amber | ▲ |
| Error | Red | ✕ |
| Unknown | Gray | ○ |

### 15. Trend Arrow

**Pattern**: Direction indicator

```
↑ 12.5%   (Green, up is good)
↓ 3.2%    (Red, down is bad)
→ 0.0%    (Gray, no change)
```

---

## Summary

| Pattern | Category | Use Case |
|---------|----------|----------|
| Overview + Detail | Navigation | Hierarchical data |
| Hub and Spoke | Navigation | Multiple sections |
| Multi-View Linking | Visualization | Coordinated views |
| Layered Viz | Visualization | Toggle data |
| Faceted Search | Filter | Multi-dimension |
| Time Range | Filter | Temporal data |
| Hover Tooltip | Interaction | Quick preview |
| F-Pattern | Layout | Scan priority |
| Golden Zone | Layout | Key metrics |
| Sparkline | Data | Inline trends |

---

*Source: Nielsen Norman Group, dashboard design research, industry patterns*
