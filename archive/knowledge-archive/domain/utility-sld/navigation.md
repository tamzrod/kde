# Navigation Patterns for Utility SLDs

## Overview

This document defines navigation patterns for utility-grade SCADA Single Line Diagrams, including hierarchical navigation, zoom behaviors, and multi-display support.

---

## Navigation Hierarchy

### Standard Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                    NAVIGATION HIERARCHY                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Level 0: System Overview (Regional/National Grid)          │
│  ─────────────────────────────────────────────────────────   │
│  │  [Area 1]   [Area 2]   [Area 3]   [Area 4]              │
│  │    │          │          │          │                     │
│  └────┼──────────┼──────────┼──────────┼─────────────────   │
│       ▼          ▼          ▼          ▼                     │
│                                                              │
│  Level 1: Area/Region Overview                               │
│  ─────────────────────────────────────────────────────────   │
│  │  [Station A]   [Station B]   [Station C]                 │
│  │      │             │             │                        │
│  └──────┼─────────────┼─────────────┼─────────────────────   │
│         ▼             ▼             ▼                         │
│                                                              │
│  Level 2: Station Overview (Single Substation)               │
│  ─────────────────────────────────────────────────────────   │
│  │  115kV Bus ──[Breakers]── 34.5kV Bus                     │
│  │      │                           │                         │
│  └──────┼───────────────────────────┼─────────────────────   │
│         ▼                           ▼                         │
│                                                              │
│  Level 3: Bay/Feeder Detail                                  │
│  ─────────────────────────────────────────────────────────   │
│  │  [Line]──[CT]──[CB]──[DS]──[Bus]                         │
│  │                 │                                        │
│  └─────────────────┼──────────────────────────────────────  │
│                    ▼                                         │
│                                                              │
│  Level 4: Equipment Detail (IED/Relay)                       │
│  ─────────────────────────────────────────────────────────   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Header Navigation

### Required Header Elements

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Station Alpha - 115kV     │  User: Operator1  14:32 ││
│ [Area A] [←Back] [Home→] [→]   │  [Alarm: 2] [Settings]  ││
├─────────────────────────────────────────────────────────────┤
│                     │                                       │
│  Breadcrumb:        │   Home > Station Alpha > 115kV       │
│                     │                                       │
└─────────────────────────────────────────────────────────────┘
```

### Navigation Controls

| Control | Function | Location |
|---------|----------|----------|
| Back | Previous view | Header left |
| Forward | Next view | Header left |
| Home | System overview | Header left |
| Breadcrumb | Hierarchical path | Header center |
| Alarm | Alarm summary | Header right |
| User | User info/logout | Header right |
| Time | System time | Header right |

---

## Zoom Behaviors

### Zoom Levels

| Level | Scale | Visible Content |
|-------|-------|-----------------|
| 25% | 0.25x | Major buses, substations |
| 50% | 0.5x | Feeders, transformers |
| 100% | 1x | Standard view (default) |
| 150% | 1.5x | Bay detail |
| 200% | 2x | Equipment detail |

### Zoom Controls

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   [Zoom Out] ────●────────────── [Zoom In]  100%  [Fit]    │
│                       │                                    │
│                    Current                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Decluttering by Zoom Level

**Zoom Out (< 50%)**:
- Hide individual values
- Show only major equipment
- Simplify breaker symbols
- Hide protection devices

**Zoom In (> 150%)**:
- Show full detail
- Display all measurements
- Show protection status
- Enable editing

---

## Pan and Scroll

### Pan Behavior

| Input | Action |
|-------|--------|
| Click + Drag | Pan viewport |
| Scroll Wheel | Vertical scroll |
| Shift + Scroll | Horizontal scroll |
| Pinch (touch) | Zoom |
| Two-finger drag | Pan (touch) |

### Viewport Indicators

```
┌─────────────────────────────────────────────────────────────┐
│ ┌───────────────────────────────────────────────────────┐  │
│ │                                                       │  │
│ │                    VIEWPORT                           │  │
│ │                    (Current view)                     │  │
│ │                                                       │  │
│ └───────────────────────────────────────────────────────┘  │
│ │              ▼                                          │
│ │     ┌──────────────┐                                    │
│ │     │   Minimap    │  ← Shows full SLD with            │
│ │     │   [■]        │    viewport indicator              │
│ │     └──────────────┘                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## Drill-Down Navigation

### Single-Click Actions

| Element | Single Click | Double Click |
|---------|--------------|--------------|
| Station | Open station view | Open in new tab |
| Bus | Select bus | Bus detail |
| Breaker | Select | Open control dialog |
| Transformer | Select | Equipment detail |
| Line | Select | Line parameters |
| Measurement | View value | Open trend |

### Drill-Down Sequence

```
1. Operator identifies area of interest
         │
         ▼
2. Click on station/area
         │
         ▼
3. Station overview loads
         │
         ▼
4. Click on voltage level or feeder
         │
         ▼
5. Bay/feeder detail loads
         │
         ▼
6. Click on equipment
         │
         ▼
7. Equipment detail panel opens
```

---

## Multi-Monitor Support

### Control Room Layout

```
┌───────────────────────────────────────────────────────────────────┐
│                        WALL DISPLAY                                │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐     │
│  │ Station │ │ Station │ │ Station │ │ Alarm   │ │ System  │     │
│  │ Alpha   │ │ Beta    │ │ Gamma   │ │ Summary │ │ Overview│     │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘     │
├───────────────────────────────────────────────────────────────────┤
│                        OPERATOR CONSOLE                           │
│  ┌─────────────────────────────────────┐ ┌─────────────────────┐ │
│  │                                     │ │                     │ │
│  │      Primary SLD (Focused View)      │ │   Alarm Banner /    │ │
│  │                                     │ │   Event Log         │ │
│  │                                     │ │                     │ │
│  │                                     │ │                     │ │
│  └─────────────────────────────────────┘ └─────────────────────┘ │
└───────────────────────────────────────────────────────────────────┘
```

### Multi-Window Behavior

| Window | Purpose | Content |
|--------|---------|---------|
| Primary | Active control | Current SLD view |
| Secondary | Reference | Different area |
| Alarm | Monitoring | Alarm list |
| Trend | Analysis | Historical data |
| Events | Logging | Sequence of events |

---

## Context Panel

### Slide-Out Panel

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ┌───────────────────────┐                                │
│   │                       │                                │
│   │   Main SLD Display    │                                │
│   │                       │                                │
│   │                       ├────────────────────────────────│
│   │                       │ Context Panel                  │
│   │                       │ ─────────────────             │
│   │                       │ Equipment: CB101               │
│   │                       │ Type: Circuit Breaker          │
│   │                       │ Status: CLOSED                 │
│   │                       │ MW: 45.2                       │
│   │                       │ ─────────────────             │
│   │                       │ [Control] [Trend] [Details]   │
│   │                       │                                │
│   └───────────────────────┘                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Panel Content by Context

| Selection | Panel Content |
|-----------|---------------|
| Breaker | Status, measurements, control, events |
| Transformer | Rating, loading, temperature, oil level |
| Bus | Voltage, frequency, section status |
| Line | Flow, impedance, status |
| Alarm | Details, acknowledge, trend |

---

## Search and Filter

### Equipment Search

```
┌─────────────────────────────────────────────────────────────┐
│  🔍 Search: [CB_____]  [Type: Breaker ▼]  [Status: All ▼]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Results:                                                   │
│  ├── CB101 - Feeder 1 - CLOSED                             │
│  ├── CB102 - Feeder 2 - OPEN                               │
│  ├── CB103 - Feeder 3 - CLOSED                             │
│  └── CB201 - Bus Tie - CLOSED                              │
│                                                             │
│  [Show on Diagram]                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Quick Filters

| Filter | Function |
|--------|----------|
| Status | Show only open/closed/tripped |
| Alarm | Show only alarmed equipment |
| Voltage | Filter by voltage level |
| Area | Filter by geographic area |
| Equipment | Filter by type |

---

## Summary

| Navigation Element | Standard Practice |
|-------------------|-------------------|
| Hierarchy | 4-5 levels deep |
| Breadcrumb | Always visible |
| Zoom | Mouse wheel + buttons |
| Pan | Click and drag |
| Drill-down | Single click |
| Multi-monitor | 2-5 displays |
| Search | Equipment by ID/name |

---

*Source: ISA-101, EEMUA 201, GE iPower, Siemens Spectrum Power*
