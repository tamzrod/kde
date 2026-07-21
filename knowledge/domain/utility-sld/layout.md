# Layout Principles for Utility SLDs

## Overview

This document defines the layout principles and conventions used in utility-grade SCADA Single Line Diagrams, including substation configurations, alignment patterns, and spatial organization.

---

## Fundamental Layout Philosophy

### Topological vs Physical

**Key Principle**: SLDs represent electrical topology, not physical layout.

> "Elements on the diagram do not represent the physical size or location of the electrical equipment, but it is a common convention to organize the diagram with the same left-to-right, top-to-bottom sequence as the switchgear or other apparatus represented."

**Source**: COPA-DATA zenon documentation

### Left-to-Right Power Flow

**Standard Convention**:
- Power flows from left to right
- Higher voltage on left
- Lower voltage on right
- Generation on left
- Load on right

```
[Generator] → [Transformer] → [Bus] → [Feeder] → [Load]
   13.8kV        115/13.8kV      115kV       13.8kV
```

---

## Substation Layout Patterns

### 1. Bay (Feeder) Layout

**Standard Structure**:
```
Incoming      Protection      Switching      Outgoing
   │              │               │              │
   ▼              ▼               ▼              ▼
════════════════════════════════════════════════════
          │              │               │
       [BRK]          [BRK]          [BRK]
          │              │               │
          ▼              ▼               ▼
        ══             ══             ══
       Bus            Bus            Bus
      Section        Section        Section
```

**Bay Components** (Left to Right):
1. Incoming line/transformer connection
2. Current Transformer (CT)
3. Circuit Breaker
4. Disconnect Switch
5. Bus section
6. (Repeat for each feeder)

### 2. Breaker-and-Half Configuration

**Layout**:
```
         Bus 1
══════════════════════════════════════
   │         │         │         │
[CB1]     [CB2]     [CB3]    [CB4]
   │         │         │         │
────────┬───┘─────────┼────┬─────┘
        │             │    │
      [CB5]        [CB6] [CB7]
        │             │    │
══════════════════════════════════════
         Bus 2
```

**Key Characteristics**:
- Each circuit protected by 1.5 breakers
- Either breaker can clear fault
- Higher reliability than single bus
- More complex layout

### 3. Ring Bus Configuration

**Layout**:
```
        ┌─────────────────┐
        │                 │
    [CB1]             [CB2]
        │                 │
        │    Line 1       │
        │                 │
      [CB6]             [CB3]
        │                 │
        │    Line 2       │
        │                 │
      [CB5]             [CB4]
        │                 │
        │    Line 3       │
        └─────────────────┘
```

**Key Characteristics**:
- Closed ring topology
- Any breaker can isolate any section
- Minimum 3 feeders
- Flexible for maintenance

### 4. Double Bus Configuration

**Layout**:
```
Main Bus 1          Transfer Bus
══════════════     ═══════════════
    │                  │
[CB1A]             [CB1B]
    │                  │
    └────────┬────────┘
             │
           [CB5] (Tie)
             │
    ┌────────┴────────┐
    │                  │
[CB2A]             [CB2B]
    │                  │
══════════════     ═══════════════
   Main Bus 2        Transfer Bus
```

### 5. Main and Transfer Bus

**Layout**:
```
Main Bus             Transfer Bus
══════════════     ═══════════════
    │                  │
[CB1]──────────────[CB1T]
    │                  │
  Line 1            Line 1
    │                  │
    │                  │
[CB2]──────────────[CB2T]
    │                  │
  Line 2            Line 2
```

**Use Case**: Distribution substations, simpler switching

---

## Alignment Principles

### Horizontal Alignment

**Bay Equipment**:
```
     ┌─────────────────────────────────────────┐
  ───┤ CT           CB            DS          ├──
     └─────────────────────────────────────────┘
       │           │           │
       ▼           ▼           ▼
```

**Rules**:
- All breakers in a row at same vertical position
- Switches aligned with associated breaker
- CTs positioned before breakers
- Consistent spacing between bays

### Vertical Alignment

**Multi-Level** (by voltage):
```
════════════════════════════════════  345kV
           │
         [T1]
           │
════════════════════════════════════  115kV
           │
         [T2]
           │
════════════════════════════════════  13.8kV
```

**Rules**:
- Higher voltage bus at top
- Transformers connect between voltage levels
- Clear vertical spacing between levels
- Consistent left-right alignment for transformers

### Spacing Guidelines

| Element | Minimum Spacing | Recommended |
|---------|-----------------|-------------|
| Bay to Bay | 20mm | 30mm |
| Equipment in Bay | 15mm | 25mm |
| Voltage Level | 50mm | 80mm |
| Text to Symbol | 3mm | 5mm |

---

## Reading Direction

### Operator Scan Path

**Expected Pattern**: Z-pattern or F-pattern

```
1. Header (Station name, area)
2. Primary bus (top)
3. Left-to-right across feeders
4. Down through bays
5. Right-to-left on lower sections
6. Secondary systems (bottom)
```

### Visual Flow Guides

**Power Flow**:
```
═══════════════════════════════════════
│                    ←──────         │
│          BUS      MW: 45.2        │
│                                    │
│  [BRK1]  [BRK2]  [BRK3]          │
│    ↓        ↓       ↓              │
│   Load    Load    Load            │
```

**Techniques**:
- Arrows indicate direction
- Wider spacing suggests flow path
- Aligned elements suggest connection
- Color indicates energized state

---

## White Space Usage

### Purpose of White Space

1. **Visual Separation**: Distinguish equipment groups
2. **Readability**: Prevent clutter
3. **Scalability**: Room for expansion
4. **Clarity**: Emphasize important elements

### White Space Guidelines

**Don't**:
- Fill every pixel with information
- Cram related items together
- Remove spacing to fit more content
- Use white space as decorative element

**Do**:
- Group related equipment logically
- Allow breathing room around critical items
- Maintain minimum spacing standards
- Reserve space for expansion

---

## Hierarchical Layout

### Level 1: System Overview

```
[Area 1]     [Area 2]     [Area 3]
   │            │            │
  [T1]        [T2]        [T3]
   │            │            │
  ──────── Regional Grid ─────────
```

**Focus**: Geographic/regional overview
**Content**: Major substations, interconnections
**Density**: Low

### Level 2: Substation Overview

```
    ─────── 115kV Bus ──────────
       │        │        │
     [T1]     [BRK1]   [BRK2]
       │        │        │
    ─────── 13.8kV Bus ────────
       │        │        │
     [F1]      [F2]    [F3]
```

**Focus**: Single substation
**Content**: All feeders, transformers, buses
**Density**: Medium

### Level 3: Bay Detail

```
[Line]──[CT]──[CB]──[DS]──[Bus Section]
                  │
              [Protection Relay]
                  │
               [Trip Coil Status]
```

**Focus**: Single feeder/bay
**Content**: All protection devices, measurements
**Density**: High

---

## Context and Navigation

### Header Zone

**Required Elements**:
```
┌─────────────────────────────────────────────────┐
│ [Logo] Station Alpha - 115kV    [User] [Time]   │
│         [Area A - Feeder 1]           [Zoom +/-]│
└─────────────────────────────────────────────────┘
```

**Position**: Always top of screen
**Content**: Station name, voltage level, area, user, time

### Breadcrumb Navigation

**Format**: Station > Voltage > Area > Bay

```
Home > Station Alpha > 115kV > Area A > Feeder 1
```

### Panel Zones

**Standard Layout**:
```
┌──────────┬──────────────────────────────────────┐
│          │                                      │
│  Nav     │         Main SLD Display            │
│  Panel   │                                      │
│          │                                      │
│          │                                      │
├──────────┴──────────────────────────────────────┤
│            Alarm Banner / Status Bar            │
└─────────────────────────────────────────────────┘
```

---

## Scaling and Decluttering

### Zoom Levels

| Level | Visible Elements | Notes |
|-------|------------------|-------|
| Overview | Buses, Transformers | Maximum abstraction |
| Station | Feeders, Breakers | Standard view |
| Bay | Protection, Measurements | Detail view |
| Equipment | Full detail | Diagnostic |

### Decluttering Rules

**When Zooming Out**:
1. Hide individual measurement values
2. Hide secondary switches
3. Consolidate multiple CTs
4. Simplify transformer symbols
5. Show only critical alarms

**Implementation**:
- Progressive disclosure
- Layer-based rendering
- Threshold-based visibility

---

## Summary

| Principle | Purpose |
|-----------|---------|
| Left-to-right flow | Intuitive power direction |
| Horizontal bays | Standard industry pattern |
| Vertical voltage | Clear level separation |
| Consistent spacing | Visual predictability |
| Hierarchical levels | Appropriate detail at each level |
| White space | Clarity and emphasis |

---

*Source: IEC 61850, IEEE standards, utility control room practices, COPA-DATA documentation*
