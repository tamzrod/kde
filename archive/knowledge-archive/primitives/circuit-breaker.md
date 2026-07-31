# Circuit Breaker Primitive

**Knowledge ID**: KDE-PRIM-CB-001
**Title**: Circuit Breaker Primitive — Engineering Knowledge
**Class**: DOMAIN
**Domain**: utility-sld
**Version**: 2.0.0
**Status**: **APPROVED** ✅
**Confidence**: HIGH
**Evidence Level**: 5
**Owner**: KDE-EXPERT-SLD-001
**Created**: 2026-07-21T13:10:00Z
**Updated**: 2026-07-22T06:45:00Z
**Reviewed**: 2026-07-22
**Source Investigation**: EXP-005, LAB-SLD-TEST-001
**Approved By**: LAB-SLD-TEST-001
**Evidence**:
  - KDE-UTILITY-SLD-SYMBOLS
  - KDE-UTILITY-SLD-COLORS
  - KDE-UTILITY-SLD-LAYOUT
  - IEEE C37.2
  - IEC 60617
  - `playground/CB-improved.html` (validated implementation)

---

## ⭐ APPROVED SYMBOL GEOMETRY (v2.0.0)

### Visual Structure
```
┌─────────────────────────────────────┐
│           Conductor                │
│              ║                     │
│             ∧∧    ← Double Chev UP│
│             │ │    ← Continuous   │
│           ┌──────┐                 │
│           │██████│ ← Rectangle   │
│           │██████│   (state fill) │
│           └──────┘                 │
│             ∧∧    ← Double Chev DN│
│             │ │                    │
│              ║                     │
│           Conductor                │
└─────────────────────────────────────┘
```

### Approved Element Specifications

| Element | SVG | Geometry | Color |
|---------|-----|----------|-------|
| Top Conductor | `<line>` | Vertical, x=60, y=0→40 | Bus color |
| Double Chevron UP (∧∧) | `<path>` × 2 | M -8,-12 L 0,-20 L 8,-12 | Bus color |
| Continuous Line | `<line>` | Vertical, x=60, y=25→175 | Bus color |
| Rectangle Body | `<rect>` | x=42, y=80, w=36, h=80, rx=4 | State color |
| Double Chevron DOWN (∨∨) | `<path>` × 2 | M -8,4 L 0,12 L 8,4 | Bus color |
| Bottom Conductor | `<line>` | Vertical, x=60, y=200→240 | Bus color |

### Approved State Colors (69 kV)

| State | Rectangle Fill | Hex |
|-------|----------------|-----|
| CLOSED | Red (solid) | `#ef4444` |
| OPEN | Green (solid) | `#22c55e` |
| UNKNOWN | None (dashed outline) | `#00FFFF` |

### Key Differences from DS

| Feature | DS | CB |
|---------|----|----|
| Pivot/Hinge | Yes (circle) | **No** |
| Contact Circles | Yes | **No** |
| Moving Knife | Yes (rotates) | **No knife** |
| State Indication | Knife angle + color | Rectangle fill color |
| Bus Elements | Contacts | Double chevrons (∧∧ ∧∨) |

---

## Definition

A **Circuit Breaker** is a protective switching device installed in-line on a power conductor that can interrupt fault currents and isolate electrical equipment by opening its contacts under automatic or manual command. In a Single Line Diagram (SLD), it is represented as a filled or outlined square symbol positioned horizontally on the conductor path, with its state (closed/open) indicated by fill color and its identity labeled by equipment designation.

---

## Summary

The Circuit Breaker is the most critical control primitive in utility Single Line Diagrams. Unlike passive elements that merely conduct power, the breaker is an **active protection device** capable of interrupting load and fault currents by physically separating its contacts. This interruption capability is its defining characteristic and the reason it exists in power systems.

In SLD rendering, the circuit breaker serves as the primary control point for operators and the primary protection element for engineers. Every feeder, transformer, and transmission line connection is protected by at least one breaker. The breaker's position on the diagram—always **in-line** with the conductor—reflects its electrical function: it is a break in the power path that can be opened or closed under operator control or automatic protection schemes.

The breaker connects electrically at two anchor points on the conductor, and its state determines whether current flows through it. When closed, the breaker is galvanically continuous; when open, it creates an isolation point. This simple binary state has profound implications for how operators understand system topology, how protection schemes coordinate, and how the SCADA system displays real-time status.

Understanding the circuit breaker as a primitive requires understanding four interconnected aspects: its **purpose** (protection and control), its **representation** (symbol and state), its **connections** (anchors and conductors), and its **behavior** (state changes and protection coordination). This document establishes the complete engineering knowledge required for accurate SLD rendering.

---

## 1. Engineering Concept

### 1.1 What is a Circuit Breaker?

A circuit breaker is an electromechanical device designed to:

1. **Carry normal load current** continuously without significant heating or voltage drop
2. **Interrupt fault currents** up to its rated short-circuit capacity (often 40-63 kA)
3. **Isolate equipment** for maintenance by creating a visible break in the circuit
4. **Coordinate with protection** relays that detect abnormal conditions and command trips

The key differentiator from a simple switch is **current interruption capability**. A switch may make/break load current, but only a breaker can safely interrupt the high electromagnetic forces present during a short-circuit. The breaker achieves this through:

- **Arc-quenching chambers** that stretch and cool the arc
- **High-speed mechanism** (3-10 cycles for transmission breakers)
- **High dielectric strength** between open contacts

### 1.2 Why Does a Circuit Breaker Exist?

Circuit breakers exist to solve a fundamental problem: **fault interruption**. When a lightning strike, equipment failure, or animal contact causes a short circuit, thousands of amperes of fault current flow within milliseconds. Without interruption:

- conductors overheat and burn
- equipment is destroyed by electromagnetic forces
- arcs cause fires and explosions
- the entire system may collapse (blackout)

The breaker detects this fault (via protection relay) and interrupts the current in milliseconds, limiting damage and maintaining stability of the healthy portions of the network.

**Secondary purposes**:
- **Switching**: Making and breaking load current for operational switching
- **Isolation**: Creating visible isolation points for safety during maintenance (often with bypass disconnect switches)
- **Reconfiguration**: Changing system topology for load management or contingency response

### 1.3 Types of Circuit Breakers

| Type | Voltage Class | Typical Application | Interruption Medium |
|------|--------------|---------------------|-------------------|
| Air Magnetic | < 15kV | Distribution | Air arc chute |
| SF6 Gas | 15-800kV | Transmission/Subtrans | SF6 gas |
| Oil | < 765kV | Legacy transmission | Transformer oil |
| Vacuum | 15-38kV | Distribution/Industrial | Vacuum |
| Gas Blast (Dead Tank) | 115-800kV | Bulk transmission | SF6 + gas blast |
| Gas Insulated (GIS) | 72.5-800kV | Space-constrained | SF6 sealed |

**For SLD rendering purposes**, the type affects:
- Symbol shape (varies by vendor/standard)
- Nameplate data displayed
- Typical response times shown in dynamics

---

## 2. Primitive Classification

### 2.1 Inline Primitive

The circuit breaker is classified as an **inline primitive**. This means:

| Property | Value | Rationale |
|----------|-------|-----------|
| **Orientation** | Horizontal (standard) | Power flows left-to-right |
| **Anchor Count** | 2 | Input and output on same axis |
| **Anchor Position** | Left-center, Right-center | Conductor passes through |
| **Flow Direction** | Left → Right (standard) | Matches power flow convention |

**Why inline matters**:
- Breaker must not change the conductor's electrical path direction
- Anchor points must align with adjacent conductor endpoints
- Rendering must preserve horizontal alignment with other bay equipment

### 2.2 Primitives That Use Breakers as Anchors

The following primitives anchor TO circuit breakers:

| Primitive | Anchor Role | Connection Pattern |
|-----------|-------------|-------------------|
| Busbar | Downstream endpoint | Breaker connects to bus |
| Conductor/Feeder | Upstream endpoint | Conductor originates from breaker |
| Transformer | Connection point | Breaker feeds transformer |
| Disconnect Switch | Downstream (interlocked) | DS is load-side of breaker |

### 2.3 Immutable vs. State Properties

**Immutable Properties** (defined at design/installation):

| Property | Type | Description |
|----------|------|-------------|
| `equipment_id` | String | Unique identifier (e.g., "BRK-115-A1") |
| `voltage_class` | Enum | kV level (e.g., 115, 345) |
| `rated_current` | Integer | Continuous current rating (e.g., 2000A) |
| `interrupting_rating` | Integer | Maximum fault current (e.g., 40000A) |
| `operating_time` | Float | Trip time in cycles (e.g., 3 cycles) |
| `position` | Coordinate | X,Y location on diagram |
| `orientation` | Enum | HORIZONTAL (only valid orientation) |
| `protection_zone` | String | Protection scheme identifier |
| `breaker_type` | Enum | SF6, Vacuum, Oil, etc. |

**State Properties** (change during operation):

| Property | Type | Values | Default |
|----------|------|--------|---------|
| `status` | Enum | CLOSED, OPEN, TRIPPED, UNKNOWN | CLOSED |
| `position_primary` | Enum | CLOSED, OPEN | CLOSED |
| `position_secondary` | Enum | CLOSED, OPEN, N/A | N/A |
| `breaker_failure` | Boolean | true, false | false |
| `lockout` | Boolean | true, false | false |
| `selected` | Boolean | true, false | false |
| `control_mode` | Enum | REMOTE, LOCAL, LOCKED | REMOTE |

---

## 3. Electrical Representation

### 3.1 Standard Symbols

#### IEEE/ANSI Symbol (North America)
```
┌────┐
│ X  │  ← Filled square when closed
└────┘

┌────┐
│    │  ← Outline square when open
└────┘
```

#### IEC 60617 Symbol (International)
```
──┤    ├──  ← Rectangle with diagonal (varies by country)

──┤    ├──  ← US convention: filled when closed
```

#### SCADA Implementation
```svg
<!-- Closed Breaker -->
<rect x="0" y="0" width="40" height="24" 
      fill="var(--breaker-closed)" stroke="black" stroke-width="1"/>

<!-- Open Breaker -->
<rect x="0" y="0" width="40" height="24" 
      fill="none" stroke="var(--breaker-open)" stroke-width="2"/>

<!-- Tripped Breaker -->
<rect x="0" y="0" width="40" height="24" 
      fill="var(--breaker-tripped)" stroke="red" stroke-width="2">
  <animate attributeName="opacity" values="1;0.3;1" dur="0.5s" repeatCount="indefinite"/>
</rect>
```

### 3.2 Visual Dimensions

| Dimension | Value | Notes |
|-----------|-------|-------|
| Width | 40-50px at 100% zoom | Consistent across diagram |
| Height | 20-24px at 100% zoom | Square aspect ratio |
| Stroke Width | 1-2px | Thicker when open (outline) |
| Label Position | Below center | Equipment ID |
| State Indicator | Fill color | Red/Green/Flashing |

### 3.3 State Indication Matrix

| State | Fill | Stroke | Color (NA) | Animation |
|-------|------|--------|------------|-----------|
| Closed | Solid | Black | Red (#FF4444) | None |
| Open | None | Green | Green (#44FF44) | None |
| Tripped | Solid | Red | Flashing Red | 0.5s flash |
| Unknown | Hatch | Yellow | Yellow (#FFCC00) | None |
| Locked/Tagged | Solid | Blue | Blue (#0088FF) | None |
| Selected | White | White | (shows selection) | Outline pulse |

---

## 4. Anchor Specification

### 4.1 Anchor Positions

The circuit breaker has exactly **two anchors**:

```
LEFT ANCHOR                          RIGHT ANCHOR
    │                                     │
    │                                     │
    ◄───────────────────────────►
              [BREAKER]
                    X, Y = position center
                    
LEFT_X = X - (width/2)
RIGHT_X = X + (width/2)
ANCHOR_Y = Y
```

**Anchor Coordinates**:
- Left Anchor: `(X - width/2, Y)`
- Right Anchor: `(X + width/2, Y)`

### 4.2 Conductor Connection Rules

When a conductor connects to a circuit breaker:

1. **Conductor endpoint** snaps to the breaker anchor point
2. **Conductor inherits bus color** from the source bus when:
   - Breaker is CLOSED
   - Conductor carries current
   - Bus is energized
3. **Conductor changes color** when:
   - Breaker opens (de-energized portion turns gray)
   - Protection trips (both sides may show fault indication)

**Why conductor inherits bus color**:
- The conductor is electrically continuous with the bus when breaker is closed
- The bus is the "parent" network segment the conductor is part of
- Color inheritance maintains visual continuity of energized paths
- This follows the principle that conductors take color from their source bus

### 4.3 Connection Topology

```
Busbar (115kV) ═══════════════════════════════
                    │           │
                    ▼           ▼
              [LEFT ANCHOR] [RIGHT ANCHOR]
                    │           │
                    │    CB     │
                    │  ┌────┐   │
                    └──┤ X  ├───┘
                       └────┘
                          │
                          ▼
                    Conductor to next element
```

**Critical rule**: The breaker's internal representation must not introduce electrical impedance. When rendered closed, the breaker is a **zero-impedance connection** between its anchors.

---

## 5. State Machine

### 5.1 Valid States

```
                    ┌──────────────┐
                    │    CLOSED    │
                    │  (Red fill)  │
                    └──────┬───────┘
                           │
            Trip Command   │   Close Command
            (from relay)   │   (from SCADA/operator)
                           ▼
                    ┌──────────────┐
            ┌───────│   TRIPPED    │───────┐
            │       │ (Flash Red)  │       │
            │       └──────────────┘       │
            │              │               │
         Auto-reclose       │          Manual
         or Reset           │          Reset
            │               ▼               │
            │       ┌──────────────┐        │
            └──────►│    OPEN      │◄───────┘
                    │ (Green outline)
                    └──────────────┘
                           │
                           │
                    Close Command
                    (from SCADA/operator)
                           │
                           ▼
```

### 5.2 State Transition Rules

| From | To | Trigger | Authority |
|------|----|---------|-----------|
| CLOSED | TRIPPED | Protection trip signal | Automatic (Relay) |
| CLOSED | OPEN | Operator open command | Remote/Local |
| TRIPPED | OPEN | Reset after trip | Operator |
| TRIPPED | CLOSED | Auto-reclose (if enabled) | Automatic |
| OPEN | CLOSED | Close command | Remote/Local |
| OPEN | CLOSED | Auto-close (after reclose delay) | Automatic |
| ANY | LOCKED | Safety tag applied | Operator/Policy |

### 5.3 State Display Requirements

| State | Must Display | Color | Animation |
|-------|-------------|-------|-----------|
| CLOSED | Yes | Red fill | None |
| OPEN | Yes | Green outline | None |
| TRIPPED | Yes | Flashing red | 0.5s interval |
| UNKNOWN | Yes | Yellow/hatch | None |
| LOCKED | Yes | Blue | Tag symbol |

---

## 6. Composition Patterns

### 6.1 Standard Bay Composition

A typical feeder bay follows this equipment sequence:

```
Busbar ═══════════════════════════════════════════
          │                    │
          │                    │
          ▼                    ▼
    [LEFT ANCHOR]        [RIGHT ANCHOR]
          │                    │
          │  ┌────────────┐     │
          └──┤    CT      ├─────┘
             └────────────┘
                    │
                    ▼
             [BREAKER: BRK-115-A1]
                    │
                    ▼
             ┌────────────┐
             │    DS      │  ← Disconnect Switch
             └────────────┘
                    │
                    ▼
              Line to Feeder
```

**Composition rules**:
1. CT (Current Transformer) is always on the line-side of breaker
2. DS (Disconnect Switch) is on the load-side of breaker
3. Breaker is horizontally centered in bay
4. All equipment aligned at same vertical centerline

### 6.2 Breaker-and-Half Configuration

```
         Bus 1 ═══════════════════════════════════
                   │         │         │         │
                   ▼         ▼         ▼         ▼
               [CB-1]     [CB-2]     [CB-3]    [CB-4]
                   │         │         │         │
                   └────┬────┴─────────┴────┬────┘
                        │                   │
                        ▼                   ▼
                    [CB-T1]            [CB-T2]
                        │                   │
                        └─────────┬─────────┘
                                  ▼
                        ═══════════════════════════ Bus 2
```

**Key patterns**:
- Each circuit has 1.5 breakers protecting it
- Middle breaker is shared between two circuits
- Breakers provide redundancy for protection
- Topology allows any breaker to clear any fault

### 6.3 Ring Bus Configuration

```
         ┌───────────────────────────────────┐
         │                                   │
      [CB1]                             [CB2]
         │           Line 1                 │
         │                                   │
      [CB6]                             [CB3]
         │           Line 2                 │
         │                                   │
      [CB5]                             [CB4]
         │           Line 3                 │
         └───────────────────────────────────┘
```

**Key patterns**:
- Each line has two breakers (one at each end)
- Ring can be reconfigured by opening any breaker
- No single point of failure for continuity
- More complex protection coordination

---

## 7. Protection Coordination

### 7.1 Protection Hierarchy

Circuit breakers operate within protection zones:

```
┌─────────────────────────────────────────────────────────┐
│                    TRANSMISSION SYSTEM                  │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                    BUSBAR PROTECTION                    │
│              (Breaker Failure Backup: 87B)              │
└─────────────────────────────────────────────────────────┘
                           │
            ┌──────────────┼──────────────┐
            ▼              ▼              ▼
       [BREAKER]       [BREAKER]      [BREAKER]
            │              │              │
            ▼              ▼              ▼
    ┌───────────┐  ┌───────────┐  ┌───────────┐
    │ FEEDER 1   │  │ FEEDER 2   │  │ FEEDER 3   │
    │ PROTECTION│  │ PROTECTION│  │ PROTECTION │
    │    67     │  │    67      │  │    67      │
    └───────────┘  └───────────┘  └───────────┘
```

### 7.2 Breaker Failure Protection

If a breaker fails to trip when commanded:

1. **Breaker Failure Relay (50BF/51BF)** detects:
   - Breaker is still carrying current after trip command
   - Protection zone fault persists
2. **Backtrip command** sent to all breakers protecting zone
3. **Upstream breakers** receive trip command
4. **Larger zone** is isolated to contain fault

**For SLD rendering**:
- Breaker failure shown as separate alarm
- Failure status shown as `breaker_failure: true`
- May require manual intervention to clear

---

## 8. Validation Rules

### 8.1 Rendering Validation

| Rule ID | Rule | Validation Method |
|---------|------|-------------------|
| CB-001 | Breaker symbol must be square | Aspect ratio check = 1.0 |
| CB-002 | Breaker must be horizontal | Rotation angle = 0° |
| CB-003 | Left anchor X < Right anchor X | Coordinate comparison |
| CB-004 | Anchor Y coordinates must match | Y1 == Y2 |
| CB-005 | Closed breaker fill must be red (NA) | Color code #FF4444 |
| CB-006 | Open breaker must have no fill | Fill opacity = 0 |
| CB-007 | Equipment ID label required | Label exists and non-empty |
| CB-008 | Voltage class must be specified | Value in [13.8, 34.5, 69, 115, 230, 345, 500, 765] |
| CB-009 | Adjacent conductors must align | Conductor Y == Anchor Y |
| CB-010 | Breaker position must be integer | X, Y are whole pixels |

### 8.2 State Consistency Validation

| Rule ID | Rule | Validation Method |
|---------|------|-------------------|
| CB-020 | Tripped state must have trip reason | trip_reason field populated |
| CB-021 | Tripped state requires alarm | Alarm object present |
| CB-022 | Locked state requires safety tag | Tag indicator shown |
| CB-023 | Selected state requires control context | Operator action pending |
| CB-024 | Unknown state requires diagnostic | System health alarm |

### 8.3 Connection Validation

| Rule ID | Rule | Validation Method |
|---------|------|-------------------|
| CB-030 | Breaker must have exactly 2 connections | Connection count == 2 |
| CB-031 | Left connection must be conductor or busbar | Type in [conductor, busbar] |
| CB-032 | Right connection must be conductor or busbar | Type in [conductor, busbar] |
| CB-033 | Connected conductor color inherits bus color | When breaker closed + bus energized |
| CB-034 | Voltage class must match connected bus | Bus voltage == Breaker voltage |

---

## 9. Interaction Behavior

### 9.1 Operator Controls

| Action | Control | Pre-condition | Result |
|--------|---------|---------------|--------|
| Close Breaker | Click → Close button | OPEN, not locked | CLOSED state |
| Open Breaker | Click → Open button | CLOSED, not locked | OPEN state |
| Select | Click on breaker | Any state | selected: true |
| Deselect | Click elsewhere | selected: true | selected: false |
| View Details | Double-click | Any state | Detail panel opens |

### 9.2 Click Response

When an operator clicks on a breaker:

1. **Visual feedback**: Selection highlight appears
2. **Control panel**: Contextual controls appear
3. **Status panel**: Real-time status displays
4. **History**: Recent state changes shown

### 9.3 Control Mode Restrictions

| Mode | Can Close | Can Open | Can Reset |
|------|-----------|----------|-----------|
| REMOTE | Yes (SCADA) | Yes (SCADA) | Yes (SCADA) |
| LOCAL | Yes (station) | Yes (station) | Yes (station) |
| LOCKED | No | No | No |
| MAINTENANCE | No | Yes | Yes |

---

## 10. Knowledge Assessment

The expert who has absorbed this knowledge can correctly answer:

### Conceptual Questions

**Q: What is a Circuit Breaker?**
> A: A protective switching device that can interrupt fault currents and isolate equipment by opening its contacts. It is the primary protection and control element in power systems, carrying load current normally and breaking fault current during protection operations.

**Q: Why is the Circuit Breaker classified as an inline primitive?**
> A: Because it has exactly two anchors positioned horizontally on the same axis. The breaker does not change the direction of the power flow path—it is a break in the straight-line conductor that can be opened or closed.

**Q: Where are the Circuit Breaker's anchors positioned?**
> A: The breaker has two anchors: a left anchor at (X - width/2, Y) and a right anchor at (X + width/2, Y). Both anchors share the same Y coordinate to maintain horizontal alignment with the connected conductors.

### Property Questions

**Q: Which properties of a Circuit Breaker are immutable?**
> A: Immutable properties include: equipment_id, voltage_class, rated_current, interrupting_rating, operating_time, position, orientation, protection_zone, and breaker_type. These are set at design/installation and do not change during operation.

**Q: Which properties change with state?**
> A: State properties that change during operation include: status (CLOSED/OPEN/TRIPPED/UNKNOWN), position_primary, position_secondary, breaker_failure, lockout, selected, and control_mode.

**Q: What are the valid states for a Circuit Breaker?**
> A: CLOSED (red fill), OPEN (green outline), TRIPPED (flashing red), UNKNOWN (yellow/hatched), LOCKED (blue), and SELECTED (white outline pulse). The state machine defines valid transitions between these states.

### Connection Questions

**Q: How is the Circuit Breaker connected to other primitives?**
> A: The breaker connects to adjacent conductors or busbars at its two anchor points. The left anchor typically connects to a busbar or upstream conductor; the right anchor connects to the downstream feeder conductor. All connections must maintain horizontal alignment.

**Q: Why does a conductor inherit bus color when connected to a closed breaker?**
> A: Because when the breaker is closed, it provides galvanic continuity between the bus and the conductor. The conductor becomes electrically part of the bus network. The conductor color represents the energized state of that network segment, which originates from the bus.

---

## 11. Related Knowledge

| Document | Relationship | Notes |
|----------|--------------|-------|
| KDE-UTILITY-SLD-SYMBOLS | Parent standard | Defines breaker symbol |
| KDE-UTILITY-SLD-COLORS | Parent standard | Defines state colors |
| KDE-UTILITY-SLD-LAYOUT | Composition context | Bay layout patterns |
| KDE-UTILITY-SLD-DESIGN-RULES | Design guidance | Breaker placement rules |
| KDE-PRIM-CONDUCTOR | Composes with | Connects to breaker |
| KDE-PRIM-BUSBAR | Composes with | Source/target of breaker |
| KDE-PRIM-DISCONNECT | Adjacent primitive | Load-side isolation |

---

## 12. External Sources

| Source | Name | Citation |
|--------|------|----------|
| Standard | IEEE C37.2 | IEEE Standard for Electrical Power System Device Function Numbers |
| Standard | IEC 60617 | IEC International Standard for Graphical Symbols for Diagrams |
| Standard | IEC 61850 | Communication Networks and Systems in Substations |
| Publication | ISA-101 | High-Performance HMI Philosophy |
| Vendor | ABB | Breaker Technology Handbook |
| Vendor | Siemens | Protection and Control Engineering |

---

## 13. Confidence Assessment

| Factor | Assessment | Rationale |
|--------|------------|-----------|
| Evidence Quality | HIGH | Based on IEEE/IEC standards + multiple vendor implementations + established industry practice |
| Reproducibility | HIGH | Symbol conventions are standardized across utilities; colors documented in ISA-101 |
| Consistency | HIGH | Consistent across all referenced sources; no contradictions |

**Overall Confidence**: HIGH

---

## 14. Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2026-07-21 | Initial draft for EXP-005 | KDE-EXPERT-SLD-001 |

---

## 15. Provenance

| Source | Reference | Date |
|--------|-----------|------|
| Investigation | EXP-005 | 2026-07-21 |
| Symbols Knowledge | KDE-UTILITY-SLD-SYMBOLS | 2026-07-21 |
| Colors Knowledge | KDE-UTILITY-SLD-COLORS | 2026-07-21 |
| Layout Knowledge | KDE-UTILITY-SLD-LAYOUT | 2026-07-21 |
| IEEE Standard | IEEE C37.2 | 2008 |
| IEC Standard | IEC 60617 | 2013 |

---

*This knowledge artifact teaches the engineering fundamentals of the Circuit Breaker primitive for accurate SLD rendering and reasoning.*
