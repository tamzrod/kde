# Dashboard Concepts: Marinduque SCADA

**Document Version**: 0.1.0  
**Date**: 2026-07-21  
**Investigation**: INV-014  
**Based On**: 
- `domain/visualization/dashboard-principles.md`
- `domain/utility-sld/principles.md`

---

## 1. Design Principles

### 1.1 Primary Design Drivers

| Principle | Source | Application |
|-----------|--------|-------------|
| Situational Awareness First | utility-sld/principles.md | Operators detect issues in seconds |
| Information Hierarchy | dashboard-principles.md | Critical → KPI → Trend → Detail |
| Cognitive Load Management | dashboard-principles.md | Minimize mental effort |
| Visual Consistency | dashboard-principles.md | Uniform colors, symbols |
| Clarity Over Density | utility-sld/principles.md | Operator-relevant, not all data |

### 1.2 The 5-Second Rule

> "An operator glancing at a well-designed display should be able to identify any abnormal condition within seconds, without scanning every value."

**Design Application:**
- Most screen visually calm (normal state)
- Abnormal states contrast sharply
- Critical info immediately visible
- Color encodes meaning, not decoration

---

## 2. Visual Design System

### 2.1 Color Palette

**Semantic Colors (from utility-sld/principles.md):**

| State | Color | Hex | Usage |
|-------|-------|-----|-------|
| Normal | Muted Blue | #4A90A4 | Calm, healthy |
| Energized | Dark Green | #2D5016 | Conductor/line active |
| De-energized | Gray | #6B7280 | Line inactive |
| Closed | Red | #DC2626 | Breaker closed (NA convention) |
| Open | Green | #16A34A | Breaker open |
| Tripped | Flashing Red | #DC2626 | Fault indication |
| Unknown | Yellow | #F59E0B | Status uncertain |
| Warning | Orange | #EA580C | Non-critical alert |
| Critical | Red | #DC2626 | Immediate attention |
| Info | Blue | #2563EB | Informational |
| Off-line | Gray | #9CA3AF | Device disconnected |

### 2.2 Night Mode Palette

| State | Color | Hex | Notes |
|-------|-------|-----|-------|
| Background | Dark Gray | #1F2937 | Reduces eye strain |
| Text | Light Gray | #E5E7EB | High contrast |
| Normal | Teal | #14B8A6 | Softer than blue |
| Closed | Bright Red | #EF4444 | Still visible |
| Open | Bright Green | #22C55E | Still visible |

### 2.3 Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Page Title | Inter | 24px | 600 |
| Section Header | Inter | 18px | 600 |
| KPI Value | JetBrains Mono | 32px | 700 |
| Label | Inter | 14px | 400 |
| Data Value | JetBrains Mono | 16px | 400 |
| Caption | Inter | 12px | 400 |

### 2.4 Spacing System

| Element | Value |
|---------|-------|
| Card padding | 16px (24px recommended) |
| Card gap | 16px |
| Section margin | 24px |
| Screen edge | 16px |

---

## 3. Primary Dashboard Layout

### 3.1 Overview Dashboard

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ HEADER                                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────┐  ┌───────────────────────────────────────┐ │
│ │      SYSTEM MAP (GIS)       │  │         GENERATION SUMMARY            │ │
│ │                             │  │                                       │ │
│ │   [Marinduque Island]       │  │  Total Gen: ████████████░░ 6.3 MW     │ │
│ │                             │  │  Total Load: ███████████░░░ 5.8 MW    │ │
│ │      ● Balanacan PP         │  │  Reserve:   ███░░░░░░░░░░░░ 0.5 MW    │ │
│ │      ● Bantad PP            │  │                                       │ │
│ │                             │  │  ┌─────────────────────────────────┐  │ │
│ │      ═══ Feeder 1           │  │  │ Balanacan      Bantad    Solar │  │ │
│ │      ═══ Feeder 2           │  │  │ ████████░░    ██████░░░░  ███░ │  │ │
│ │      ═══ Feeder 3           │  │  │ 4.2 MW        1.8 MW    0.3 MW│  │ │
│ │      ═══ Feeder 4           │  │  └─────────────────────────────────┘  │ │
│ │                             │  │                                       │ │
│ │      ○ Boac (municipality)  │  └───────────────────────────────────────┘ │
│ │      ○ Sta Cruz             │  ┌───────────────────────────────────────┐ │
│ │      ○ Mogpog               │  │           FEEDER LOADING              │ │
│ │                             │  │                                       │ │
│ │                             │  │  F1-Sta Cruz  ████████████░░░  2.1 MW │ │
│ │                             │  │  F2-Boac      █████████░░░░░  1.8 MW │ │
│ │                             │  │  F3-SantaCruz ████████░░░░░░  1.2 MW │ │
│ │                             │  │  F4-Mogpog    ██████░░░░░░░░  0.7 MW │ │
│ │                             │  │                                       │ │
│ └─────────────────────────────┘  └───────────────────────────────────────┘ │
│                                                                             │
│ ┌─────────────────────────────┐  ┌───────────────────────────────────────┐ │
│ │       ALARM SUMMARY         │  │         SYSTEM HEALTH                  │ │
│ │                             │  │                                       │ │
│ │  ┌───────────────────────┐  │  │  System Availability: ████████████ 100%│ │
│ │  │ 🔴 CRITICAL:     0    │  │  │  Data Latency:        █████████░░░ 45ms │ │
│ │  │ 🟠 WARNING:      2    │  │  │  Alarm Response:      ████████████ <2s │ │
│ │  │ 🟡 INFO:         5    │  │  │  Command Success:     ████████████ 99% │ │
│ │  └───────────────────────┘  │  │                                       │ │
│ │                             │  │  Last 24 Hours:                       │ │
│ │  Recent Alarms:             │  │  ┌─────────────────────────────────┐  │ │
│ │  • 08:41 F1-SW1 High Temp   │  │  │ Daily Load Profile (Line)      │  │ │
│ │  • 08:22 Gen2 Temp Warning   │  │  │                                 │  │ │
│ │  • 08:15 F3-RC1 Reclose     │  │  │  7 ────────────────────●        │  │ │
│ │  • 08:00 Daily Report Gen    │  │  │  6 ──────────────────●───      │  │ │
│ │  • 07:55 F2-SW3 Restored    │  │  │  5 ──────────────●─────────    │  │ │
│ │                             │  │  │  4 ──────●─────────────────     │  │ │
│ └─────────────────────────────┘  │  │  0 ─────────────────────────    │  │ │
│                                   │  └─────────────────────────────────┘  │ │
│                                   └───────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│ NAVIGATION: [Overview] [SLD] [Alarms] [GIS] [Reports] [Settings]   [User ▾] │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Layout Analysis

| Zone | Content | Priority | Size |
|------|---------|----------|------|
| Header | Title, time, user, navigation | - | Fixed |
| Primary Left | GIS Map | 1 | 50% width |
| Primary Right Top | Generation Summary | 1 | 50% width |
| Primary Right Mid | Feeder Loading | 2 | 50% width |
| Secondary Left | Alarm Summary | 2 | 50% width |
| Secondary Right | System Health | 3 | 50% width |
| Navigation | Main menu | - | Fixed |

**F-Pattern Compliance**: Primary information in top-left (GIS), secondary in top-right (generation), supporting content below.

---

## 4. Single Line Diagram (SLD) View

### 4.1 Balanacan Substation SLD

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SLD: BALANACAN SUBSTATION  │  Station: Balanacan  │  13.8 kV  │  [◐ Zoom] │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                                    POWER FLOW ───►                           │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                      │   │
│  │   ╔═══════════╗         ╔═══════════╗         ╔═══════════╗        │   │
│  │   ║   GEN 1   ║         ║   GEN 2   ║         ║   GEN 3   ║        │   │
│  │   ║  1.5 MW  ║         ║  1.5 MW  ║         ║  1.5 MW  ║        │   │
│  │   ║          ║         ║          ║         ║          ║        │   │
│  │   ║  V: 6.6kV ║         ║  V: 6.6kV ║         ║  V: 6.6kV ║        │   │
│  │   ║  I: 220A  ║         ║  I: 218A ║         ║  I: 208A ║        │   │
│  │   ║          ║         ║          ║         ║          ║        │   │
│  │   ║   🔴     ║         ║   🔴     ║         ║   🟡     ║        │   │
│  │   ║  CLOSED  ║         ║  CLOSED ║         ║  UNKNOWN ║        │   │
│  │   ╚════┬════╝         ╚════┬════╝         ╚════┬════╝        │   │
│  │        │                   │                   │              │   │
│  │        └───────────────────┼───────────────────┘              │   │
│  │                            │                                  │   │
│  │        ┌──────────────────┼──────────────────┐              │   │
│  │        ▼                  ▼                  ▼              │   │
│  │   ═══════════════════════════════════════════════════════   │   │
│  │   ║                    13.8 kV BUSBAR                   ║   │   │
│  │   ═══════════════════════════════════════════════════════   │   │
│  │        │                  │                  │              │   │
│  │        │      ┌───────────┴───────────┐      │              │   │
│  │        │      │                       │      │              │   │
│  │        ▼      ▼                       ▼      ▼              │   │
│  │   ┌─────┐ ┌─────┐                 ┌─────┐ ┌─────┐          │   │
│  │   │ CB1 │ │ CB2 │                 │ CB3 │ │ CB4 │          │   │
│  │   │ 🔴  │ │ 🔴  │                 │ 🔴  │ │ 🔴  │          │   │
│  │   └──┬──┘ └──┬──┘                 └──┬──┘ └──┬──┘          │   │
│  │      │       │                      │       │             │   │
│  │      ▼       ▼                      ▼       ▼             │   │
│  │   ═══════ ═══════               ═══════ ═══════          │   │
│  │   FEEDER1 FEEDER2                FEEDER3 FEEDER4         │   │
│  │   2.1 MW  1.8 MW                 1.2 MW   0.7 MW         │   │
│  │   🔴       🔴                     🔴        🔴             │   │
│  │                                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ STATUS LEGEND:                                                        │   │
│  │  🔴 Closed   │  ○ Open   │  ◐ Tripped   │  ⊗ Unknown  │  ◌ Offline │   │
│  │  [Click device for details] [Export SVG] [Print]                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 SLD Design Features

| Feature | Implementation | Source |
|---------|---------------|--------|
| Color coding | NA breaker conventions | utility-sld/principles.md |
| Real-time values | Telemetry overlay | Pattern 3 (WebSocket) |
| Viewport zoom | SVG virtualization | Pattern 10 |
| Status indication | Fill/outline pattern | utility-sld/principles.md |
| Power flow | Animated lines | Visualization best practices |

---

## 5. Alarm Dashboard

### 5.1 Alarm List View

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ALARMS                                              [Filter ▾] [Ack All]   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │ FILTER: [Active ▾] [All Types ▾] [All Stations ▾] [Reset]              │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │ SEVERITY  │  TIME      │  DEVICE           │  MESSAGE        │  ACTION │ │
│  ├─────────────────────────────────────────────────────────────────────────┤ │
│  │ 🟠 WARNING │  08:41:23  │  F1-SW1-Temp     │  High temperature │ [ACK]  │ │
│  │           │            │  35.2°C (warn>32)│  above threshold  │        │ │
│  ├─────────────────────────────────────────────────────────────────────────┤ │
│  │ 🟠 WARNING │  08:22:15  │  Gen2-Coolant    │  Coolant level   │ [ACK]  │ │
│  │           │            │  45% (warn<50%)  │  below warning   │        │ │
│  ├─────────────────────────────────────────────────────────────────────────┤ │
│  │ 🟡 INFO    │  08:15:42  │  F3-RC1          │  Reclose event   │ [ACK]  │ │
│  │           │            │  Auto-reclosed   │  1 of 3 attempts │        │ │
│  ├─────────────────────────────────────────────────────────────────────────┤ │
│  │ 🟡 INFO    │  08:00:00  │  System          │  Daily report    │ [ACK]  │ │
│  │           │            │  Generation 24h  │  report generated│        │ │
│  ├─────────────────────────────────────────────────────────────────────────┤ │
│  │ 🟡 INFO    │  07:55:30  │  F2-SW3          │  Switch restored │ [ACK]  │ │
│  │           │            │  Manual close    │  by operator A   │        │ │
│  ├─────────────────────────────────────────────────────────────────────────┤ │
│  │ 🟢 NORMAL  │  07:30:00  │  Gen1-Temp       │  Temperature     │        │ │
│  │           │            │  28.5°C          │  returned to     │        │ │
│  │           │            │                  │  normal range    │        │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  SHOWING: 1-25 of 47 │ ◀ 1 2 ▶ │ │ [Export CSV] [Print List]              │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ALARM DETAILS (when selected)                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │ Alarm: F1-SW1 High Temperature                                         │ │
│  │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│  │ ID: ALM-2024-0841                                                     │ │
│  │ Severity: WARNING                                                      │ │
│  │ State: ACTIVE                                                          │ │
│  │ Priority: Medium                                                       │ │
│  │                                                                            │ │
│  │ Device: F1-SW1                                                         │ │
│  │ Location: Feeder 1, Section 2                                         │ │
│  │ Coordinates: 13.4523°N, 121.9124°E                                    │ │
│  │                                                                            │ │
│  │ Condition: Temperature > 32°C                                          │ │
│  │ Current Value: 35.2°C                                                  │ │
│  │ Threshold: 32°C (warning), 38°C (critical)                             │ │
│  │                                                                            │ │
│  │ Generated: 2024-07-21 08:41:23                                         │ │
│  │ Duration: 0d 00:02:15                                                  │ │
│  │                                                                            │ │
│  │ [Acknowledge]  [Shelve (Maintenance)]  [View History]  [Details ▶]    │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Alarm Design Features

| Feature | Implementation | Source |
|---------|---------------|--------|
| Severity hierarchy | Color + icon + position | dashboard-principles.md |
| State indication | Active/Acknowledged/Cleared | Pattern 4 (State Machine) |
| Duration tracking | Elapsed time display | Operator requirements |
| Bulk actions | Acknowledge all | Dashboard efficiency |
| Filtering | Multiple criteria | Information density |

---

## 6. GIS Map View

### 6.1 Geographic Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ GIS MAP: MARINDUQUE                              [Layers ▾] [🔍] [📍]      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                      │   │
│  │                    ┌──────────────────┐                              │   │
│  │                    │                  │                              │   │
│  │                    │   ◉ Bantad PP   │                              │   │
│  │                    │     (2.0 MW)    │                              │   │
│  │                    │                  │                              │   │
│  │                    └────────┬─────────┘                              │   │
│  │                             │                                         │   │
│  │                             ═══════════════════════                   │   │
│  │                                              │ Feeder 4               │   │
│  │                    ┌──────────────────┐      │                        │   │
│  │                    │                  │      │                        │   │
│  │        ════════════│  ⬡ Balanacan    │══════╪════════                │   │
│  │        Feeder 1    │    Substation   │      │                        │   │
│  │                    │    (13.8kV)     │      │                        │   │
│  │        ○ Gasan     │                  │      │                        │   │
│  │                    └────────┬─────────┘      │                        │   │
│  │                             │                 │                        │   │
│  │         ═══════════════════╪═════════════════╪══════════              │   │
│  │         │                  │                 │          │              │   │
│  │         │                  │                 │          │              │   │
│  │    ○ Mogpog           ○ Boac           ○ Sta Cruz   ○ Buenavista      │   │
│  │                             ▲                                          │   │
│  │                             │                                          │   │
│  │                      ═══════════                                      │   │
│  │                      │ Feeder 3 │                                      │   │
│  │                      └──────────┘                                      │   │
│  │                                                                      │   │
│  │  ┌─────────────────┐                                                  │   │
│  │  │ LAYERS          │                                                  │   │
│  │  │ ☑ Substations   │                                                  │   │
│  │  │ ☑ Power Lines   │                                                  │   │
│  │  │ ☑ Municipalities│                                                  │   │
│  │  │ ☐ Transformers  │                                                  │   │
│  │  │ ☐ Load Values   │                                                  │   │
│  │  └─────────────────┘                                                  │   │
│  │                                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│  LEGEND:  ⬡ Substation  ● Power Plant  ══ Feeder (click for details)     │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 GIS Implementation

| Feature | Implementation | Source |
|---------|---------------|--------|
| Base map | OpenStreetMap | gis/fundamentals.md |
| Coordinates | WGS84 (EPSG:4326) | gis/fundamentals.md |
| Layer control | Toggle visibility | gis/layer-management.md |
| Asset markers | SVG icons per type | utility-sld/principles.md |
| Real-time updates | WebSocket sync | Pattern 3 |

---

## 7. Responsive Design

### 7.1 Breakpoints

| Screen | Width | Layout Adaptation |
|--------|-------|-------------------|
| Desktop | > 1200px | Full layout, all panels |
| Tablet | 768-1200px | 2-column, collapsible panels |
| Mobile | < 768px | Single column, tab navigation |

### 7.2 Mobile Considerations

- Critical alarms always visible
- Simplified SLD view
- Essential KPIs only
- Touch-friendly controls (44px min targets)

---

## 8. Accessibility

### 8.1 WCAG Compliance

| Requirement | Implementation |
|-------------|----------------|
| Color contrast | 4.5:1 minimum |
| Focus indicators | Visible on all interactive elements |
| Screen reader | ARIA labels on all controls |
| Keyboard navigation | Full functionality without mouse |

### 8.2 Operator Environment

| Aspect | Consideration |
|--------|---------------|
| Control room lighting | Day/Night mode support |
| Distance viewing | Minimum 16px font for data |
| Color blindness | Pattern + color for states |
| Fatigue | Reduced motion option |

---

## 9. Reference Screenshots

### 9.1 Public SCADA References

Based on publicly available SCADA/HMI screenshots from industry:

| Reference | Source | Elements Used |
|-----------|--------|---------------|
| GE iFIX | Public demos | Alarm banner, status colors |
| Siemens WinCC | Public docs | Navigation, tag displays |
| Schneider Vijeo | Public docs | SLD conventions, symbols |
| Ignition SCADA | Public demos | Modern web UI patterns |

### 9.2 Design Pattern Inspiration

- **Alarm Banner**: Top-fixed, color-coded severity
- **Status Colors**: Semantic meaning, not decorative
- **Data Display**: Monospace for values, proportional for labels
- **Interactive Elements**: Consistent hover/active states

---

## 10. Implementation Notes

### 10.1 Component Library

| Component | Variants |
|-----------|----------|
| StatusIndicator | normal, warning, critical, offline |
| DataValue | numeric, boolean, enum |
| PowerBar | horizontal, vertical, segmented |
| AlarmRow | active, acknowledged, cleared |
| NavButton | default, active, disabled |
| Card | default, highlighted, alert |

### 10.2 State Management

```typescript
interface DashboardState {
  selectedStation: string | null;
  selectedDevice: string | null;
  timeRange: '1h' | '6h' | '24h' | '7d';
  filters: AlarmFilters;
  nightMode: boolean;
  sidebarCollapsed: boolean;
}
```

---

**Document Status**: CONCEPT  
**Next Review**: After UI prototype  
**Evidence**: Based on dashboard-principles.md, utility-sld/principles.md, KDE-ARCH-009
