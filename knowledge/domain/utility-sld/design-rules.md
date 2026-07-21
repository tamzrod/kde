# Utility SLD Design Rules

## Overview

This document provides actionable design rules for creating professional utility-grade SCADA Single Line Diagrams. Rules are organized by category with clear guidance.

---

## Symbol Rules

### Breaker Symbol

| Rule | Requirement |
|------|-------------|
| 1.1 | Closed breaker = filled rectangle, red (NA) |
| 1.2 | Open breaker = outline rectangle, green |
| 1.3 | Tripped = flashing red |
| 1.4 | Unknown = yellow or hatched |
| 1.5 | Size must be consistent across diagram |

### Busbar Symbol

| Rule | Requirement |
|------|-------------|
| 2.1 | Solid horizontal line, thicker than conductors |
| 2.2 | Color indicates energization state |
| 2.3 | Voltage label at one end |
| 2.4 | Section gaps clearly visible |
| 2.5 | Spacing consistent with equipment |

### Transformer Symbol

| Rule | Requirement |
|------|-------------|
| 3.1 | Filled winding lines when energized |
| 3.2 | Equipment ID label |
| 3.3 | Voltage ratings (primary/secondary) |
| 3.4 | MVA rating label |
| 3.5 | Vector group (optional) |

### Line/Conductor Symbol

| Rule | Requirement |
|------|-------------|
| 4.1 | Single line representation |
| 4.2 | Color indicates state |
| 4.3 | Arrow indicates power flow direction |
| 4.4 | MW/MVAR values labeled |
| 4.5 | Line ID label |

---

## Color Rules

### Breaker Colors

| State | Color | Notes |
|-------|-------|-------|
| Closed | #FF4444 (Red) | North America standard |
| Open | #44FF44 (Green) | |
| Tripped | #FF0000 (Flash) | Until acknowledged |
| Selected | #FFFFFF (White outline) | Control pending |
| Locked | #888888 (Gray) | Cannot control |

### Line Colors

| State | Color | Notes |
|-------|-------|-------|
| Energized | Voltage-based | 115kV=Blue, etc. |
| De-energized | #666666 (Gray) | |
| Grounded | #000000 (Black) | |
| Fault | #FF0000 (Red) | Flashing |

### Alarm Colors

| Priority | Background | Text |
|----------|------------|------|
| Critical | #FF0000 (Red) | #FFFFFF (White) |
| High | #FF8800 (Orange) | #000000 (Black) |
| Medium | #FFCC00 (Yellow) | #000000 (Black) |
| Low | #0088FF (Blue) | #FFFFFF (White) |

### Background Colors

| Mode | Background | Text |
|------|------------|------|
| Day | #F0F0F0 | #000000 |
| Night | #1A1A1A | #FFFFFF |

---

## Typography Rules

### Font Selection

| Use | Font Family | Notes |
|-----|-------------|-------|
| Values | Monospace (Consolas) | Clear digit distinction |
| Labels | Sans-serif (Segoe UI) | Professional appearance |
| Headers | Sans-serif Bold | Hierarchy |

### Font Sizes

| Element | Size | Weight |
|---------|------|--------|
| Station Name | 24px | Bold |
| Section Header | 18px | SemiBold |
| Equipment ID | 12px | Bold |
| Values | 14-16px | Regular |
| Labels | 10-12px | Regular |

### Text Alignment

| Element | Alignment |
|---------|-----------|
| Values | Right-aligned |
| Equipment ID | Center-aligned |
| Labels | Left-aligned |
| Units | Left-aligned (adjacent to value) |

---

## Layout Rules

### General Layout

| Rule | Requirement |
|------|-------------|
| 10.1 | Power flows left-to-right |
| 10.2 | Higher voltage at top |
| 10.3 | Generation on left, load on right |
| 10.4 | Consistent horizontal alignment |
| 10.5 | Consistent vertical spacing |
| 10.6 | Minimum 20px between bays |
| 10.7 | Minimum 50px between voltage levels |

### Hierarchy

| Level | Content | Zoom |
|-------|---------|------|
| 0 | System overview | < 50% |
| 1 | Station overview | 50-75% |
| 2 | Voltage level | 100% |
| 3 | Bay/feeder detail | 150% |
| 4 | Equipment detail | > 150% |

### Spacing

| Element | Minimum | Recommended |
|---------|---------|-------------|
| Bay width | 150px | 200px |
| Equipment spacing | 15px | 25px |
| Text to symbol | 3px | 5px |
| Panel margins | 10px | 20px |

---

## Dynamic Behavior Rules

### Update Timing

| Data Type | Update Rate | Notes |
|-----------|-------------|-------|
| Breaker status | 1-2 sec | Critical |
| Voltage | 2-5 sec | |
| Power values | 2-5 sec | |
| Frequency | 1 sec | |

### Alarm Animation

| Priority | Flash Rate | Duration |
|----------|------------|----------|
| Critical | 0.5s | Until ACK |
| High | 1.0s | Until ACK |
| Medium | None | |
| Low | None | |

### Transitions

| Action | Duration | Notes |
|--------|----------|-------|
| State change | 200ms | Quick, clear |
| Value update | 100ms | Smooth |
| Navigation | Instant | No delay |
| Zoom | 300ms | Smooth |

---

## Navigation Rules

### Header

| Element | Required | Position |
|---------|----------|----------|
| Station name | Yes | Left |
| Breadcrumb | Yes | Below header |
| Time | Yes | Right |
| User | Yes | Right |
| Alarm indicator | Yes | Right |

### Controls

| Control | Required | Position |
|---------|----------|----------|
| Back | Yes | Left |
| Forward | Yes | Left |
| Home | Yes | Left |
| Zoom In/Out | Yes | Right |
| Fit to screen | Yes | Right |
| Search | Yes | Toolbar |

### Drill-down

| Action | Behavior |
|--------|----------|
| Click station | Open station view |
| Click bus | Select bus |
| Double-click equipment | Open detail panel |
| Right-click | Context menu |

---

## Information Rules

### Required on SLD

| Information | Always Visible | On-Demand |
|-------------|----------------|-----------|
| Equipment ID | Yes | |
| Breaker status | Yes | |
| Voltage | Yes | |
| MW/MVAR | Yes | |
| Equipment rating | | Yes |
| Configuration | | Yes |
| Historical data | | Yes |

### Alarm Display

| Requirement | Rule |
|-------------|------|
| Banner | Always visible at top |
| Count | Show unacknowledged |
| Color | By priority |
| Sound | By priority |
| Flash | Until acknowledged |

---

## Accessibility Rules

| Rule | Requirement |
|------|-------------|
| 20.1 | Color-blind safe (shape + color) |
| 20.2 | Minimum contrast ratio 4.5:1 |
| 20.3 | Font size minimum 10px |
| 20.4 | Text labels for ambiguous items |
| 20.5 | Keyboard navigation support |

---

## Performance Rules

| Metric | Target |
|--------|--------|
| Initial load | < 3 seconds |
| Update latency | < 100ms |
| Animation frame rate | 30+ FPS |
| Memory usage | < 200MB |

---

## Design Checklist

### Pre-Development

- [ ] Define symbol library
- [ ] Define color palette
- [ ] Define typography standards
- [ ] Define navigation structure
- [ ] Review with operators

### Development

- [ ] Follow symbol rules
- [ ] Apply color correctly
- [ ] Use consistent spacing
- [ ] Implement responsive zoom
- [ ] Test alarm flashing
- [ ] Verify navigation flow

### Validation

- [ ] Check color contrast
- [ ] Verify font readability
- [ ] Test zoom levels
- [ ] Validate alarm behavior
- [ ] Operator acceptance testing

---

## Summary

| Category | Rules Count | Priority |
|----------|-------------|----------|
| Symbols | 20 | Critical |
| Colors | 15 | Critical |
| Typography | 10 | High |
| Layout | 15 | Critical |
| Dynamics | 10 | High |
| Navigation | 12 | High |
| Accessibility | 5 | High |
| Performance | 4 | Medium |

---

*Source: ISA-101, IEC 61850, IEEE standards, vendor implementations*
