# Disconnect Switch Primitive

**Knowledge ID**: KDE-PRIM-DS-001
**Title**: Disconnect Switch Primitive — Engineering Knowledge
**Class**: DOMAIN
**Domain**: utility-sld
**Version**: 1.0.0
**Status**: DRAFT
**Confidence**: HIGH
**Evidence Level**: 4
**Owner**: KDE-EXPERT-SLD-001
**Created**: 2026-07-21T13:15:00Z
**Updated**: 2026-07-21T13:15:00Z
**Reviewed**: 2026-07-21
**Source Investigation**: EXP-007
**Evidence**:
  - KDE-PRIM-CB-001
  - KDE-UTILITY-SLD-SYMBOLS
  - KDE-UTILITY-SLD-COLORS
  - IEEE C37.2
  - IEC 60617

---

## Definition

A **Disconnect Switch** (DS) is an inline isolation device that provides visible electrical isolation of equipment for maintenance purposes. In a Single Line Diagram (SLD), it is represented as a rotating knife blade mechanism positioned between two conductors, with the blade angle indicating whether the electrical path is open or closed. Unlike a circuit breaker, the disconnect switch is **not rated for interrupting load current**—its sole function is to create a visible break in the circuit when the equipment it isolates has been de-energized.

---

## Summary

The Disconnect Switch is a safety-critical isolation device installed on the load side of circuit breakers. Its primary purpose is to provide **visible isolation**—a physical, observable gap in the electrical path that maintenance personnel can verify before working on isolated equipment.

The key distinction between a disconnect switch and a circuit breaker is **current interruption capability**. A breaker can safely interrupt fault currents; a disconnect switch cannot. This is why disconnect switches are always paired with breakers: the breaker interrupts current flow, then the disconnect switch isolates the de-energized equipment for safe access.

In SLD rendering, the disconnect switch appears similar to a circuit breaker but with a critical difference: only the knife blade position changes between states, not the fill of a rectangular body. The knife blade rotates from inline (closed) to an angled position (open), providing visual confirmation of isolation state.

The disconnect switch's conductor color is **never independently defined**—it always inherits from the connected bus. This is because the switch itself does not create an energization boundary; it merely facilitates isolation of an already de-energized segment.

Understanding the disconnect switch requires understanding three interconnected aspects: its **purpose** (visible isolation for safety), its **mechanical representation** (rotating knife blade), and its **compositional role** (always downstream of a breaker).

---

## 1. Engineering Concept

### 1.1 What is a Disconnect Switch?

A disconnect switch is a mechanical switching device designed to:

1. **Provide visible isolation** — create a physical gap that maintenance workers can see
2. **Support maintenance work** — isolate equipment for safe access
3. **Carry normal current** — when closed, conduct load current without heating
4. **Withstand fault currents briefly** — not interrupt them, but survive until breaker clears

**Critical limitation**: A disconnect switch shall **not** be operated to interrupt load current. Attempting to open a switch under load will cause severe arcing, equipment damage, and potential injury.

### 1.2 Why Does a Disconnect Switch Exist?

Disconnect switches exist for **human safety** through visible isolation:

| Problem | Solution |
|---------|----------|
| Maintenance workers need to verify equipment is de-energized | Visible knife blade creates observable gap |
| Breakers alone don't provide physical verification | Switch adds redundant isolation point |
| Legal/safety codes require visible isolation | Switch satisfies regulatory requirements |
| Maintenance crews work near high-voltage equipment | Isolated segment is mechanically verifiable |

**The "visible" in visible isolation** is the key. Operators and technicians can physically see the gap created by an open knife blade and confirm energization cannot occur.

### 1.3 Disconnect Switch vs. Circuit Breaker

| Characteristic | Disconnect Switch | Circuit Breaker |
|----------------|------------------|-----------------|
| **Primary Purpose** | Visible isolation | Protection + switching |
| **Load Interruption** | Prohibited | Permitted |
| **Fault Interruption** | Withstand only | Required capability |
| **Operating Speed** | Manual/slow | High-speed (3-10 cycles) |
| **Arc Quenching** | None | Extensive chambers |
| **Typical Location** | Load side of breaker | Line side of bus |
| **State Change Visuals** | Knife angle | Fill color |

### 1.4 Types of Disconnect Switches

| Type | Description | Typical Use |
|------|-------------|-------------|
| **Knife Switch** | Rotating blade between fixed contacts | Low voltage (< 600V) |
| **Center Break** | Blade pivots from center, arms move apart | Medium voltage |
| **Side Break** | Blade pivots at one end | High voltage |
| **Vertical Break** | Blade moves vertically | Compact installations |
| **Horn Break** | Arc horns stretch the arc | Reduced contact erosion |

---

## 2. Primitive Classification

### 2.1 Inline Isolation Device

The disconnect switch is classified as an **inline isolation device**. This means:

| Property | Value | Rationale |
|----------|-------|-----------|
| **Orientation** | Vertical (standard) | Knife rotates in plane perpendicular to view |
| **Anchor Count** | 2 | Top and Bottom electrical connections |
| **Anchor Position** | Top-center, Bottom-center | Conductor passes through center axis |
| **Flow Direction** | Top → Bottom (standard) | Matches vertical power flow |

**Why vertical orientation**:
- Knife blade rotation is visible when viewed from the front
- Blade movement (inline vs. angled) is clearly distinguishable
- Standard SLD convention for isolation devices

### 2.2 Relationship to Circuit Breaker

The disconnect switch is always found **downstream of a circuit breaker**:

```
Busbar ════════════════════════════════════
          │
          ▼
    [CIRCUIT BREAKER]
          │  ← Breaker interrupts current
          ▼
    [DISCONNECT SWITCH]
          │  ← Switch provides visible isolation
          ▼
    Isolated Equipment
```

**The correct sequence**:
1. Circuit breaker opens to stop current flow
2. Disconnect switch opens to provide visible isolation
3. Equipment is now safely isolated and accessible

**Reversing this order (opening switch before breaker)** is dangerous and prohibited.

### 2.3 Immutable vs. Mutable Properties

**Immutable Properties** (defined at design/installation):

| Property | Type | Description |
|----------|------|-------------|
| `equipment_id` | String | Unique identifier (e.g., "DS-115-A1-F1") |
| `voltage_class` | Enum | kV level (e.g., 115, 345) |
| `rated_current` | Integer | Continuous current rating (e.g., 1200A) |
| `position` | Coordinate | X,Y location on diagram |
| `orientation` | Enum | VERTICAL (only valid orientation) |
| `blade_type` | Enum | CENTER_BREAK, SIDE_BREAK, VERTICAL |
| `knife_length` | Float | Physical blade dimensions |
| `knife_color_closed` | Color | Color when closed (typically red) |
| `knife_color_open` | Color | Color when open (typically green) |

**Mutable Properties** (change with state):

| Property | Type | Values | Default |
|----------|------|--------|---------|
| `status` | Enum | CLOSED, OPEN, UNKNOWN | CLOSED |
| `knife_angle` | Float | 0° (closed), 35-45° (open) | 0° |
| `selected` | Boolean | true, false | false |

---

## 3. Geometry Specification

### 3.1 Component Geometry

The Disconnect Switch consists of three geometric components:

```
           TOP CONDUCTOR (inherited color)
                    │
                    ▼
            ┌───────────────┐
            │  Fixed Contact│
            └───────┬───────┘
                    │
                  ╱   ╲  ← Knife Blade (rotates)
                 ╱     ╲
                ╱       ╲
               ▼         ▼
         ┌─────────┐ ┌─────────┐
         │ Fixed   │ │ Fixed   │  ← Contacts (angled open)
         │ Contact │ │ Contact │
         └─────────┘ └─────────┘
                    │
                    ▼
           BOTTOM CONDUCTOR (inherited color)
```

**Component Definitions**:

| Component | Description | Immutable |
|----------|-------------|-----------|
| **Top Conductor** | Incoming electrical connection | Yes |
| **Bottom Conductor** | Outgoing electrical connection | Yes |
| **Fixed Contact** | Stationary contact points | Yes |
| **Knife Blade** | Rotating conductor that makes/breaks | Yes (position changes) |
| **Pivot Point** | Blade rotation center | Yes |

### 3.2 Anchor Positions

```
TOP ANCHOR (X, Y_top)
        │
        │
        ▼
    ═══════════════  ← Top conductor segment
        │
        │  ← Fixed contact connection
        │
        ●  ← Pivot point
        │
        │
    KNIFE BLADE  (rotates)
        │
        │
        │  ← Fixed contact connection
        │
    ═══════════════  ← Bottom conductor segment
        │
        ▼
BOTTOM ANCHOR (X, Y_bottom)
```

**Anchor Coordinates**:
- Top Anchor: `(X, Y - height/2)`
- Bottom Anchor: `(X, Y + height/2)`
- Both anchors share the same X coordinate (center axis)

### 3.3 Knife Blade Geometry

| Parameter | Value | Notes |
|-----------|-------|-------|
| **Blade Width** | 4-6px at 100% zoom | Thin conductor |
| **Blade Length** | 70-80% of switch height | Reaches both contacts |
| **Blade Color (Closed)** | Red (#FF4444) | Matches NA convention |
| **Blade Color (Open)** | Green (#44FF44) | Indicates open state |
| **Rotation Angle (Closed)** | 0° | Inline with conductor |
| **Rotation Angle (Open)** | 35-45° | Creates visible gap |

### 3.4 Rendering Dimensions

| Dimension | Value | Notes |
|-----------|-------|-------|
| **Total Height** | 60-80px at 100% zoom | Includes conductors |
| **Switch Body Height** | 40-50px | Knife mechanism area |
| **Conductor Width** | 4px | Matches conductor standard |
| **Contact Width** | 8-10px | Visible contact points |

---

## 4. Electrical Representation

### 4.1 Standard Symbols

#### IEEE/ANSI Symbol
```
  ││
  ││  ← Fixed contacts
  │
──┤    ← Knife blade (open)
  │
  ││
```

#### IEC 60617 Symbol
```
  │
  ├─  ← Single pole
  │
  
  ├─┼─  ← Three positions
  │
```

#### SCADA Implementation
```svg
<!-- Open Disconnect Switch -->
<g transform="translate(100, 200)">
  <!-- Top Conductor -->
  <line x1="0" y1="-40" x2="0" y2="-20" stroke="black" stroke-width="4"/>
  <!-- Fixed Contacts -->
  <line x1="-6" y1="-15" x2="6" y2="-15" stroke="black" stroke-width="2"/>
  <line x1="-6" y1="15" x2="6" y2="15" stroke="black" stroke-width="2"/>
  <!-- Knife Blade (angled open) -->
  <line x1="0" y1="0" x2="-20" y2="-18" stroke="#44FF44" stroke-width="4" stroke-linecap="round"/>
  <!-- Bottom Conductor -->
  <line x1="0" y1="20" x2="0" y2="40" stroke="black" stroke-width="4"/>
</g>

<!-- Closed Disconnect Switch -->
<g transform="translate(200, 200)">
  <!-- Top Conductor -->
  <line x1="0" y1="-40" x2="0" y2="-20" stroke="black" stroke-width="4"/>
  <!-- Fixed Contacts -->
  <line x1="-6" y1="-15" x2="6" y2="-15" stroke="black" stroke-width="2"/>
  <line x1="-6" y1="15" x2="6" y2="15" stroke="black" stroke-width="2"/>
  <!-- Knife Blade (inline closed) -->
  <line x1="0" y1="-15" x2="0" y2="15" stroke="#FF4444" stroke-width="4" stroke-linecap="round"/>
  <!-- Bottom Conductor -->
  <line x1="0" y1="20" x2="0" y2="40" stroke="black" stroke-width="4"/>
</g>
```

### 4.2 State Indication Matrix

| State | Knife Position | Knife Color | Conductor | Rendering |
|-------|---------------|-------------|-----------|-----------|
| OPEN | 35-45° from vertical | Green (#44FF44) | Inherited | Blade clearly angled |
| CLOSED | 0° (inline) | Red (#FF4444) | Inherited | Blade aligned with conductor |
| UNKNOWN | Not rendered | — | Inherited | No blade visible |

### 4.3 Conductor Color Inheritance

**Critical Rule**: The disconnect switch **never defines** conductor color.

| Condition | Conductor Color Source | Rationale |
|-----------|----------------------|-----------|
| Connected to energized bus | Bus color | DS does not create energization boundary |
| Breaker upstream open | Gray (#666666) | Bus de-energized |
| Bus fault | Red (flashing) | Bus fault indication |
| Unknown bus state | Yellow/hatched | Diagnostic indication |

**Why DS inherits, not defines**:
- The DS is placed downstream of a breaker that already controls energization
- The DS's state change (open/close) does not affect the upstream bus
- Conductor color must reflect the **actual energization state**, not DS position
- This prevents misleading display (DS open but conductor shows energized)

---

## 5. State Machine

### 5.1 Valid States

```
                    ┌──────────────┐
                    │    CLOSED    │
                    │ (Red blade)  │
                    └──────┬───────┘
                           │
                           │
                    Open command
                    (after breaker opens)
                           │
                           ▼
                    ┌──────────────┐
                    │    OPEN      │
                    │(Green blade) │
                    └──────┬───────┘
                           │
                           │
                    Close command
                    (before breaker closes)
                           │
                           ▼
```

### 5.2 State Transition Rules

| From | To | Precondition | Authority |
|------|----|--------------|-----------|
| CLOSED | OPEN | Upstream breaker must be OPEN | Operator |
| OPEN | CLOSED | Any | Operator |
| ANY | UNKNOWN | Communication/position feedback failure | System |

### 5.3 Precondition Enforcement

**The CLOSED → OPEN transition requires the upstream breaker to be open.**

```
Valid Sequence (Safe):
1. Breaker: CLOSED → OPEN  ✓
2. DS: CLOSED → OPEN       ✓ (breaker already open)

Invalid Sequence (Prohibited):
1. DS: CLOSED → OPEN       ✗ (breaker still carrying current)
   → Results in arc, damage, potential injury
```

**Rendering Implication**: If DS shows OPEN but upstream breaker shows CLOSED, this is an **invalid topology** that should trigger an alarm.

---

## 6. Composition Patterns

### 6.1 Standard Bay Composition

The disconnect switch is always downstream of a breaker:

```
Busbar ═══════════════════════════════════════════════════════
              │
              ▼
        [CIRCUIT BREAKER]  ← Current interruption here
              │  (breaker handles fault clearing)
              ▼
        [DISCONNECT SWITCH]  ← Visible isolation here
              │  (only provides isolation point)
              ▼
        [EQUIPMENT TO ISOLATE]
              │
              ▼
        Transformer / Feeder / Load
```

**Composition Rules**:
1. DS is always on the load side of the breaker
2. DS position follows breaker position in the left-to-right (or top-to-bottom) sequence
3. DS aligns horizontally with associated breaker
4. DS and breaker share the same control relationship

### 6.2 With Bypass Switch

Some installations include a bypass around the breaker:

```
Busbar ═════════════════════════════════════
              │
        [DISCONNECT SWITCH A]
              │
        ═══════════════════════════════  ← BYPASS CONDUCTOR
              │
        [DISCONNECT SWITCH B]
              │
              ▼
        [CIRCUIT BREAKER] (can be isolated)
```

**Use Case**: Allow breaker maintenance without interrupting power via bypass.

### 6.3 Three-Position Switch

Some DS have three positions (closed, open, grounded):

```
CLOSED ──── OPEN ──── GROUNDED
   │          │           │
   ▼          ▼           ▼
Conducts    Isolated    Grounded
             (safe)      (safe)
```

**Rendering**: Third position shown with additional ground symbol.

---

## 7. Rendering Specifications

### 7.1 Open State Rendering

```svg
<!-- Open Disconnect Switch -->
<g id="DS-open">
  <!-- Conductor (inherits color) -->
  <line x1="0" y1="-40" x2="0" y2="40" stroke="inherit" stroke-width="4"/>
  
  <!-- Fixed Contacts -->
  <rect x="-6" y="-20" width="12" height="4" fill="black"/>
  <rect x="-6" y="16" width="12" height="4" fill="black"/>
  
  <!-- Knife Blade (angled ~40°) -->
  <line x1="0" y1="0" x2="-22" y2="-18" 
        stroke="#44FF44" stroke-width="5" stroke-linecap="round"/>
  
  <!-- Pivot Point -->
  <circle cx="0" cy="0" r="3" fill="black"/>
</g>
```

**Visual Characteristics**:
- Knife clearly angled away from vertical
- Green color indicates open state
- Visible gap between blade and lower contact
- Conductor passes through but is not continuous

### 7.2 Closed State Rendering

```svg
<!-- Closed Disconnect Switch -->
<g id="DS-closed">
  <!-- Conductor (inherits color) -->
  <line x1="0" y1="-40" x2="0" y2="40" stroke="inherit" stroke-width="4"/>
  
  <!-- Fixed Contacts -->
  <rect x="-6" y="-20" width="12" height="4" fill="black"/>
  <rect x="-6" y="16" width="12" height="4" fill="black"/>
  
  <!-- Knife Blade (inline) -->
  <line x1="0" y1="-18" x2="0" y2="18" 
        stroke="#FF4444" stroke-width="5" stroke-linecap="round"/>
  
  <!-- Pivot Point -->
  <circle cx="0" cy="0" r="3" fill="black"/>
</g>
```

**Visual Characteristics**:
- Knife aligned with conductor (0° angle)
- Red color indicates closed state
- Continuous path through contacts
- Blade touches both fixed contacts

### 7.3 Unknown State Rendering

```svg
<!-- Unknown State Disconnect Switch -->
<g id="DS-unknown">
  <!-- Conductor (inherits color) -->
  <line x1="0" y1="-40" x2="0" y2="40" stroke="inherit" stroke-width="4"/>
  
  <!-- Fixed Contacts (visible) -->
  <rect x="-6" y="-20" width="12" height="4" fill="black"/>
  <rect x="-6" y="16" width="12" height="4" fill="black"/>
  
  <!-- Knife Blade: NOT RENDERED -->
  <!-- Absence of blade indicates unknown state -->
  
  <!-- Unknown Indicator (optional) -->
  <text x="0" y="50" text-anchor="middle" fill="#FFCC00">?</text>
</g>
```

**Visual Characteristics**:
- No knife blade rendered
- Only fixed contacts visible
- Conductor shown (inherited color)
- May include "?" indicator or yellow/hatched overlay

---

## 8. Validation Rules

### 8.1 Rendering Validation

| Rule ID | Rule | Validation Method |
|---------|------|-------------------|
| DS-001 | DS must be vertical orientation | Rotation angle = 90° or orientation = VERTICAL |
| DS-002 | Knife must be centered on anchor axis | Blade rotation axis at X coordinate |
| DS-003 | Top anchor Y < Bottom anchor Y | Y_top < Y_bottom |
| DS-004 | Anchor X coordinates must match | X_top == X_bottom |
| DS-005 | Open knife angle must be 35-45° | Angle check on transform |
| DS-006 | Closed knife angle must be 0° | Blade inline with conductor |
| DS-007 | Equipment ID label required | Label exists and non-empty |
| DS-008 | Voltage class must be specified | Value in [4.16, 13.8, 34.5, 69, 115, 230, 345] |
| DS-009 | Adjacent conductors must align | Conductor Y positions match anchors |
| DS-010 | Knife is NOT rendered in UNKNOWN state | Element presence check |

### 8.2 State Consistency Validation

| Rule ID | Rule | Validation Method |
|---------|------|-------------------|
| DS-020 | Open state requires green knife | Fill color #44FF44 |
| DS-021 | Closed state requires red knife | Fill color #FF4444 |
| DS-022 | Unknown state requires no knife | Element not present |
| DS-023 | Conductor color must inherit from bus | Color not defined by DS |

### 8.3 Connection Validation

| Rule ID | Rule | Validation Method |
|---------|------|-------------------|
| DS-030 | DS must have exactly 2 connections | Connection count == 2 |
| DS-031 | Top connection must be breaker or conductor | Type in [breaker, conductor] |
| DS-032 | Bottom connection must be conductor or equipment | Type in [conductor, transformer, load] |
| DS-033 | DS must be downstream of a breaker | Upstream element type check |
| DS-034 | Voltage class must match connected equipment | Voltage consistency |

---

## 9. Knowledge Assessment

The expert who has absorbed this knowledge can correctly answer:

### Conceptual Questions

**Q: What is a Disconnect Switch?**
> A: A mechanical isolation device that provides visible electrical isolation for maintenance purposes. It consists of fixed contacts and a rotating knife blade that makes or breaks the connection. Unlike a circuit breaker, it cannot interrupt load current—it can only be operated when the upstream breaker has already de-energized the circuit.

**Q: Why is a Disconnect Switch used?**
> A: To provide visible isolation that maintenance personnel can verify. The rotating knife blade creates a physical gap that is observable from a distance, confirming that the isolated equipment cannot become energized. This satisfies safety codes and protects workers performing maintenance on high-voltage equipment.

### State Questions

**Q: What changes between OPEN and CLOSED states?**
> A: Only the knife blade position changes:
> - **OPEN**: Knife rotates 35-45° from vertical, green color, visible gap between blade and lower contact
> - **CLOSED**: Knife aligns inline (0°), red color, blade touches both fixed contacts
> The conductor, fixed contacts, and anchor positions never change.

**Q: How is UNKNOWN state rendered?**
> A: The knife blade is **not rendered at all**. Only the fixed contacts and conductors are visible. This distinguishes UNKNOWN from OPEN (where angled blade is visible). Conductor color continues to inherit from the bus.

### Geometry Questions

**Q: Which geometry properties are immutable?**
> A: Immutable properties include:
> - Conductor geometry (position, path)
> - Fixed contact positions
> - Anchor positions (top and bottom)
> - Knife blade dimensions (length, width)
> - Pivot point location
> Only the knife **angle** and **color** change with state.

### Conductor Questions

**Q: Who owns the conductor color?**
> A: The **connected bus** owns conductor color. The disconnect switch **never defines** conductor color because it does not create an energization boundary—that is the breaker's function. The conductor always inherits its color from the upstream bus, reflecting the actual energization state.

---

## 10. Related Knowledge

| Document | Relationship | Notes |
|----------|--------------|-------|
| KDE-PRIM-CB-001 | Upstream primitive | Breaker must open before DS opens |
| KDE-UTILITY-SLD-SYMBOLS | Parent standard | Defines DS symbol |
| KDE-UTILITY-SLD-COLORS | Parent standard | Defines state colors |
| KDE-UTILITY-SLD-LAYOUT | Composition context | Bay layout patterns |
| KDE-PRIM-CONDUCTOR | Composes with | Connects to DS anchors |
| KDE-PRIM-BUSBAR | Ancestor | Source of conductor color |

---

## 11. External Sources

| Source | Name | Citation |
|--------|------|----------|
| Standard | IEEE C37.2 | IEEE Standard for Electrical Power System Device Function Numbers |
| Standard | IEC 60617 | IEC International Standard for Graphical Symbols for Diagrams |
| Standard | NFPA 70E | Standard for Electrical Safety in the Workplace |
| Publication | ISA-101 | High-Performance HMI Philosophy |

---

## 12. Confidence Assessment

| Factor | Assessment | Rationale |
|--------|------------|-----------|
| Evidence Quality | HIGH | Based on IEEE/IEC standards + established safety codes |
| Reproducibility | HIGH | Symbol conventions standardized; state colors documented |
| Consistency | HIGH | Consistent with breaker knowledge; no contradictions |

**Overall Confidence**: HIGH

---

## 13. Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2026-07-21 | Initial draft for EXP-007 | KDE-EXPERT-SLD-001 |

---

## 14. Provenance

| Source | Reference | Date |
|--------|-----------|------|
| Investigation | EXP-007 | 2026-07-21 |
| Circuit Breaker | KDE-PRIM-CB-001 | 2026-07-21 |
| Symbols Knowledge | KDE-UTILITY-SLD-SYMBOLS | 2026-07-21 |
| Colors Knowledge | KDE-UTILITY-SLD-COLORS | 2026-07-21 |
| IEEE Standard | IEEE C37.2 | 2008 |
| IEC Standard | IEC 60617 | 2013 |

---

*This knowledge artifact teaches the engineering fundamentals of the Disconnect Switch primitive for accurate SLD rendering and composition.*
