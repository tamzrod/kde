# Utility-Grade SLD Knowledge Summary

## Overview

This document synthesizes the complete knowledge extracted from INV-027 investigation into a single reference for KDE use in generating professional utility-grade SCADA Single Line Diagrams.

---

## Key Finding

> **The primary difference between generic AI-generated SLDs and utility-grade SLDs is OPERATIONAL PURPOSE.**

| Generic SLD | Utility-Grade SLD |
|-------------|-------------------|
| Documentation | Operator interface |
| Static representation | Dynamic situational awareness |
| All information shown | Operator-relevant information |
| Visual appeal | Cognitive efficiency |
| No state indication | Real-time status |

---

## Core Principles

### 1. Situational Awareness First

**Principle**: SLD must enable operators to detect abnormal conditions within seconds.

**Implementation**:
- Quiet screens (normal state muted)
- Sharp contrast for alarms
- Visual hierarchy by operational importance
- Color as semantic indicator

### 2. Information Hierarchy

| Priority | Information | Display |
|----------|-------------|---------|
| 1 | Breaker status, alarms | Large, prominent, colored |
| 2 | Voltage, current, power | Clearly visible |
| 3 | Equipment health | Secondary emphasis |
| 4 | Historical data | On-demand |

### 3. Semantic Color

**Principle**: Every color has meaning. Never decorative.

| Color | Meaning |
|-------|---------|
| Red | Closed (NA) / Alarm |
| Green | Open / Normal |
| Yellow | Warning / Unknown |
| Blue | Selected / Information |
| Gray | De-energized / Offline |

### 4. Consistent Layout

**Principle**: Uniform conventions across all displays.

- Power flows left-to-right
- Higher voltage at top
- Equipment aligned horizontally
- Consistent spacing
- Hierarchical drill-down

### 5. Dynamic Updates

**Principle**: Real-time information reflects current state.

- Status changes immediately
- Values update continuously
- Alarms flash until acknowledged
- Power flow animation optional

---

## Symbol Quick Reference

### Breaker States

```
CLOSED:     ┌────┐  (Red, filled)
             └────┘

OPEN:       ┌    ┐  (Green, outline)
             └    ┘

TRIPPED:    ┌────┐  (Red, flashing)
             └────┘
```

### Standard Symbols

| Equipment | Symbol |
|-----------|--------|
| Circuit Breaker | Rectangle (filled/open) |
| Disconnect | Line with perpendicular |
| Transformer | Parallel lines |
| Busbar | Thick horizontal line |
| Line | Single line with arrow |
| CT | Circle |
| PT | Circle |

---

## Color Quick Reference

### Day/Night Mode

```
DAY:  Background #F0F0F0  Text #000000
NIGHT: Background #1A1A1A  Text #FFFFFF
```

### Alarm Priority

| Priority | Color | Flash |
|----------|-------|-------|
| Critical | Red | Yes (0.5s) |
| High | Orange | No |
| Medium | Yellow | No |
| Low | Blue | No |

---

## Layout Quick Reference

### Standard Station Layout

```
                    115kV Bus
═══════════════════════════════════════
    │         │         │         │
  [CB101]   [CB102]   [CB103]   [CB104]
    │         │         │         │
  Feeder1   Feeder2   Feeder3   Feeder4
    │         │         │         │
═══════════════════════════════════════
                    13.8kV Bus
```

### Information Hierarchy

```
┌─────────────────────────────────────────────────┐
│ Header: Station Name, Time, User, Alarms       │
├─────────────────────────────────────────────────┤
│                                                 │
│   Main SLD Display                             │
│   - Buses (thick lines)                        │
│   - Breakers (rectangles)                      │
│   - Values (MW, kV, Hz)                        │
│   - Flow direction (arrows)                    │
│                                                 │
├─────────────────────────────────────────────────┤
│ Alarm Banner (when active)                      │
└─────────────────────────────────────────────────┘
```

---

## Typography Quick Reference

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Station Name | Sans-serif | 24px | Bold |
| Equipment ID | Sans-serif | 12px | Bold |
| Values | Monospace | 14-16px | Regular |
| Units | Sans-serif | 10px | Regular |
| Alarm Text | Sans-serif | 12px | Bold |

---

## Navigation Quick Reference

### Standard Navigation

| Action | Control |
|--------|---------|
| Previous view | Back button |
| Next view | Forward button |
| Overview | Home button |
| Zoom in/out | Mouse wheel / buttons |
| Pan | Click + drag |
| Search | Search box |
| Drill-down | Single click |
| Detail panel | Double click |

### Breadcrumb Format

```
Home > Station Alpha > 115kV > Feeder 1
```

---

## Human Factors Quick Reference

### Design Guidelines

| Factor | Recommendation |
|--------|----------------|
| Reading distance | Minimum 12pt for 1m |
| Contrast ratio | 4.5:1 minimum, 7:1 recommended |
| Color blindness | Shape + color, not color alone |
| Night operation | Dark mode available |
| Information density | Operator-relevant only |

### Alarm Response Targets

| Priority | Response Time |
|----------|---------------|
| Critical | Immediate |
| High | < 1 minute |
| Medium | < 5 minutes |
| Low | < 15 minutes |

---

## Technical Implementation

### SVG Structure

```svg
<svg class="sld">
  <defs>
    <!-- Symbol definitions -->
    <symbol id="breaker-closed">...</symbol>
    <symbol id="breaker-open">...</symbol>
  </defs>
  
  <g class="header">...</g>
  <g class="diagram">
    <g class="bus">...</g>
    <g class="equipment">...</g>
  </g>
  <g class="alarms">...</g>
</svg>
```

### CSS Variables

```css
:root {
  --bg-primary: #1A1A1A;
  --breaker-closed: #FF4444;
  --breaker-open: #44FF44;
  --alarm-critical: #FF0000;
  --text-primary: #FFFFFF;
}
```

### WebSocket Updates

```javascript
// Subscribe to real-time updates
websocket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  updateBreaker(data.deviceId, data.status);
  updateValue(data.tag, data.value);
};
```

---

## Comparison: Generic vs Utility

| Aspect | Generic SLD | Utility SLD |
|--------|-------------|-------------|
| **Purpose** | Documentation | Operator interface |
| **Status** | Static | Dynamic |
| **Colors** | Decorative | Semantic |
| **Values** | Ratings only | Live measurements |
| **Alarms** | None | Prominent |
| **Layout** | Variable | Consistent |
| **Updates** | Manual | Real-time |
| **Night mode** | No | Yes |
| **Navigation** | None | Hierarchical |

---

## Research Sources

| Source | Contribution |
|--------|-------------|
| ISA-101.01-2015 | HMI design principles |
| IEC 61850 | Substation communication |
| IEC 62682 | Alarm management |
| EEMUA 201 | Control room design |
| IEEE C37.2 | Device function numbers |
| GE iPower | Utility implementation |
| ABB Network Manager | Utility implementation |
| Siemens Spectrum Power | Utility implementation |
| COPA-DATA zenon | Implementation patterns |

---

## Deliverables Checklist

This knowledge package enables KDE to generate SLDs with:

- [x] Standard electrical symbols
- [x] Semantic color coding
- [x] Consistent layouts
- [x] Real-time dynamic updates
- [x] Alarm indication
- [x] Hierarchical navigation
- [x] Day/night mode support
- [x] Operator workflow support
- [x] Human factors compliance

---

## Conclusion

The knowledge extracted in INV-027 transforms SLD generation from generic electrical diagrams to operator-grade SCADA interfaces. Key differentiators:

1. **Operational Purpose**: Every design choice serves operator decision-making
2. **Situational Awareness**: Abnormal conditions immediately visible
3. **Semantic Color**: Colors convey meaning, not decoration
4. **Dynamic Updates**: Real-time state reflection
5. **Human Factors**: Designed for 24/7 control room operations

This knowledge is now permanent KDE knowledge for reusable SLD generation.

---

*Generated from INV-027 Investigation*
*Knowledge Classification: Engineering Design*
