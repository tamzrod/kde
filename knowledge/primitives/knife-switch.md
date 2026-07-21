# Knife Switch Geometry

**Knowledge ID**: KDE-GEOM-KNIFE-001
**Title**: Knife Switch Geometry — Shared Component Specification
**Class**: SHARED_COMPONENT
**Domain**: primitive-geometry
**Version**: 1.1.0
**Status**: APPROVED
**Confidence**: HIGH
**Evidence Level**: 5
**Owner**: KDE-EXPERT-SLD-001
**Created**: 2026-07-21T14:30:00Z
**Updated**: 2026-07-21T15:30:00Z
**Reviewed**: 2026-07-21
**Source Investigation**: EXP-011, EXP-011-Rev1
**Evidence**: Engineering first principles for knife-operated switches

---

## Definition

The **Knife Switch** is a shared mechanical component used by Disconnect Switch (DS) and Earth Switch (ES) primitives. It defines the geometry of the rotating blade and its relationship to fixed contacts.

This artifact does NOT define:
- What device uses the knife switch
- What the device connects to
- What voltage level applies
- What color the conductor uses

This artifact ONLY defines:
- Contact geometry
- Blade geometry
- Pivot mechanics
- State transitions

---

## 0. Internal Electrical Topology

### 0.1 Engineering Principle

A Knife Switch is **NOT** a rotating conductor. It is a **bridge between two fixed electrical contacts**.

**Key Insight**: The electrical contacts remain fixed. Only the knife moves.

### 0.2 Internal Components

Every Knife Switch consists of four internal components:

| Component | Type | Function |
|-----------|------|----------|
| **Source Contact** | Fixed | Permanently connected to incoming conductor |
| **Load Contact** | Fixed | Permanently connected to outgoing conductor |
| **Moving Knife** | Moving | Rotates to bridge or isolate contacts |
| **Mechanical Pivot** | Mechanical | Defines axis of rotation |

### 0.3 Internal Topology Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                 KNIFE SWITCH INTERNAL TOPOLOGY                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   INCOMING                                                      │
│   CONDUCTOR ──────────────┐                                     │
│                           │                                     │
│                           ▼                                     │
│                    ┌────────────────┐                          │
│                    │   SOURCE       │  ← Permanently connected │
│                    │   CONTACT      │    to incoming conductor  │
│                    └───────┬────────┘                          │
│                            │                                    │
│                            ▼                                    │
│                    ┌────────────────┐                          │
│                    │   MOVING       │  ← Rotates about pivot   │
│                    │   KNIFE        │    to bridge or isolate  │
│                    └───────┬────────┘                          │
│                            │                                    │
│                            ▼                                    │
│                    ┌────────────────┐                          │
│                    │   LOAD         │  ← Permanently connected │
│                    │   CONTACT      │    to outgoing conductor  │
│                    └───────┬────────┘                          │
│                            │                                    │
│                            ▼                                    │
│   OUTGOING                                                  │
│   CONDUCTOR ──────────────┘                                     │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │ MECHANICAL PIVOT: Defines rotation axis                 │  │
│   │           ↑                                             │  │
│   │           │ NOT the electrical connection point          │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 0.4 Component Definitions

#### Source Contact

The **Source Contact** is permanently connected to the incoming conductor. It **never moves** and remains electrically connected regardless of switch state.

```
Source Contact = Connection Point for incoming electrical path
```

#### Load Contact

The **Load Contact** is permanently connected to the outgoing conductor. It **never moves** and remains electrically connected to the outgoing conductor.

```
Load Contact = Connection Point for outgoing electrical path
```

#### Moving Knife

The **Moving Knife** is the **only moving electrical conductor**. It rotates about the Mechanical Pivot and establishes or interrupts continuity between the Source Contact and Load Contact.

```
Moving Knife = Only moving electrical component
```

#### Mechanical Pivot

The **Mechanical Pivot** supports the knife and defines the axis of rotation. It is a **mechanical feature only** and is **NOT the electrical connection point**.

```
Mechanical Pivot ≠ Electrical Connection Point
```

### 0.5 State Behaviors

#### CLOSED State

```
Source Contact ──┐
                 │
                 ├── MOVING KNIFE ──→ Electrical continuity EXISTS
                 │
Load Contact ────┘
```

The Moving Knife bridges Source Contact to Load Contact.

#### OPEN State

```
Source Contact ──┐
                 │
                 ├── MOVING KNIFE ──→ No electrical continuity
                 │
Load Contact ────┘
     ↑
     └── Air gap between knife and Load Contact
```

The Moving Knife rotates **away** from the Load Contact. Both fixed contacts remain connected to their respective conductors, but **no continuity exists between them**.

#### UNKNOWN State

The Moving Knife is not rendered. Both fixed contacts remain visible.

### 0.6 Key Rules

| Rule | Description |
|------|-------------|
| INT-001 | Source Contact is permanently connected to incoming conductor |
| INT-002 | Load Contact is permanently connected to outgoing conductor |
| INT-003 | Only the Moving Knife moves |
| INT-004 | Mechanical Pivot is NOT the electrical connection point |
| INT-005 | When OPEN, both fixed contacts remain connected to their conductors |
| INT-006 | Air gap exists between knife and Load Contact when OPEN |

---

## Summary

The Knife Switch consists of two fixed contacts (Source and Load) and one rotating blade (Moving Knife). When CLOSED, the blade bridges both contacts, creating electrical continuity. When OPEN, the blade rotates away, creating visible isolation. The blade is intentionally 1 pixel longer than the gap to ensure visual continuity when closed.

**Key Principles**: 
1. The knife blade length = conductor gap + 1px. This guarantees visual contact while preventing rendering artifacts.
2. Source Contact and Load Contact are **permanent** connections to their respective conductors.
3. Only the **Moving Knife** rotates.

---

## 1. Component Architecture

### 1.1 Knife Switch Components

```
                    CONDUCTOR GAP
    ←─────────────────────────────────→
    
    ┌─────────────────────────────────┐
    │       SOURCE CONTACT            │  ← y = TOP_CONTACT_Y
    │  (Connected to incoming conductor)│
    └─────────────────────────────────┘
              ↓
    ┌─────────────────────────────────┐
    │           MOVING KNIFE          │  ← Rotates about PIVOT
    │         (L = gap + 1px)         │
    └─────────────────────────────────┘
              ↓
    ┌─────────────────────────────────┐
    │         LOAD CONTACT            │  ← y = BOTTOM_CONTACT_Y
    │  (Connected to outgoing conductor)│
    └─────────────────────────────────┘
```

### 1.2 Components Table

| Component | Type | Description |
|-----------|------|-------------|
| Source Contact | Geometry | Top stationary contact, permanently connected to incoming |
| Load Contact | Geometry | Bottom stationary contact, permanently connected to outgoing |
| Moving Knife | Geometry | Rotating conductor blade |
| Pivot Point | Geometry | Center rotation point |
| Conductor Gap | Geometry | Distance between contacts |

---

## 2. Contacts

### 2.1 Contact Geometry

| Parameter | Value | Description |
|-----------|-------|-------------|
| **Contact Width** | 30px | Horizontal span |
| **Contact Thickness** | 3px | Stroke width |
| **Contact Color** | Inherited from Bus | Conductor color |
| **Source Contact Y** | TOP_CONTACT_Y | Upper contact position |
| **Load Contact Y** | BOTTOM_CONTACT_Y | Lower contact position |

### 2.2 Contact SVG Representation

```svg
<!-- Source Contact (connected to incoming conductor) -->
<line 
  x1="(center_x - 15)" 
  y1="TOP_CONTACT_Y" 
  x2="(center_x + 15)" 
  y2="TOP_CONTACT_Y" 
  stroke="[bus_color]" 
  stroke-width="3" 
  stroke-linecap="round"/>

<!-- Load Contact (connected to outgoing conductor) -->
<line 
  x1="(center_x - 15)" 
  y1="BOTTOM_CONTACT_Y" 
  x2="(center_x + 15)" 
  y2="BOTTOM_CONTACT_Y" 
  stroke="[bus_color]" 
  stroke-width="3" 
  stroke-linecap="round"/>
```

### 2.3 Contact Rules

| Rule | Description |
|------|-------------|
| CONT-001 | Contacts are ALWAYS rendered regardless of state |
| CONT-002 | Contact color is inherited from the connected Bus |
| CONT-003 | Contact width must be sufficient to visually support blade |
| CONT-004 | Both contacts exist at fixed, immutable positions |
| CONT-005 | Source Contact is permanently connected to incoming conductor |
| CONT-006 | Load Contact is permanently connected to outgoing conductor |
| CONT-007 | Contacts NEVER move regardless of switch state |

---

## 3. Conductor Gap

### 3.1 Gap Definition

The **Conductor Gap** is the vertical distance between the inner edges of the two fixed contacts.

| Parameter | Value | Calculation |
|-----------|-------|-------------|
| **Gap Distance** | Calculated | BOTTOM_CONTACT_Y - TOP_CONTACT_Y |
| **Gap Minimum** | 52px | Minimum recommended gap |
| **Gap Tolerance** | ±0px | Exact value required |

### 3.2 Gap Geometry

```
TOP_CONTACT_Y ──────────────
                           │
                           │  ← GAP = 52px
                           │
BOTTOM_CONTACT_Y ──────────
```

### 3.3 Gap Rules

| Rule | Description |
|------|-------------|
| GAP-001 | The gap represents electrical isolation distance |
| GAP-002 | The gap is IMMUTABLE once device position is set |
| GAP-003 | Visual gap communicates open circuit condition |

---

## 4. Moving Knife Geometry

### 4.1 Knife Length

**Critical Rule**: Moving Knife length SHALL be:

```
KNIFE_LENGTH = GAP_DISTANCE + 1px
```

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| **Knife Length** | GAP + 1px | Ensures visual contact when closed |
| **Extra Pixel** | 1px | Prevents rendering gaps at contact points |
| **Knife Width** | 5px | Stroke width for visibility |
| **Knife Color (CLOSED)** | Red (#FF4444) | Indicates closed state |
| **Knife Color (OPEN)** | Green (#44FF44) | Indicates open state |

### 4.2 Why +1 Pixel?

When SVG renders two overlapping lines, sub-pixel rendering can create visible gaps. By making the knife 1 pixel longer than the gap:

| Scenario | Result |
|----------|--------|
| Knife = Gap | Possible visible seam at contact points |
| Knife = Gap + 1px | Knife overlaps contacts, no visible seam |

### 4.3 Mechanical Pivot

The Moving Knife rotates about the **Mechanical Pivot** (center point):

```
PIVOT_Y = TOP_CONTACT_Y + (GAP / 2) + 1
```

| Parameter | Value |
|-----------|-------|
| **Pivot X** | center_x |
| **Pivot Y** | TOP_CONTACT_Y + 26 (for 52px gap) |
| **Rotation Range** | 0° to 40° |

**Important**: The Mechanical Pivot is the axis of rotation, NOT the electrical connection point.

### 4.4 Knife SVG Representation

```svg
<!-- Moving Knife (closed position, inline) -->
<line 
  x1="center_x" 
  y1="TOP_CONTACT_Y" 
  x2="center_x" 
  y2="BOTTOM_CONTACT_Y + 1" 
  stroke="[state_color]" 
  stroke-width="5" 
  stroke-linecap="round"/>
```

---

## 5. State Geometries

### 5.1 CLOSED State

**Visual**: The Moving Knife is perfectly aligned with the conductor, bridging both contacts.

```
CLOSED (angle = 0°):

SOURCE_CONTACT ────────────── ═══════════════
                              ║
                              ║  ← Knife bridges both contacts
                              ║
LOAD_CONTACT ──────────────── ═══════════════
```

| Property | Value |
|----------|-------|
| **Angle** | 0° (perfectly vertical) |
| **Knife Color** | Red (#FF4444) |
| **Knife Visibility** | Visible |
| **Knife Y1** | SOURCE_CONTACT_Y (TOP_CONTACT_Y) |
| **Knife Y2** | LOAD_CONTACT_Y + 1 (BOTTOM_CONTACT_Y + 1) |
| **Contact with Contacts** | Both contacts bridged |

**Rules**:
- KNIFE-001: Knife must be exactly vertical (0°)
- KNIFE-002: Knife must span the entire gap plus 1px overlap
- KNIFE-003: No visible gap at contact points
- KNIFE-004: Knife bridges Source Contact to Load Contact

### 5.2 OPEN State

**Visual**: The Moving Knife rotates 40° away from the Load Contact, creating visible air gap.

```
OPEN (angle = 40°):

SOURCE_CONTACT ──────────────
                              ╲
                               ╲  ← Knife rotated away
                                ╲
LOAD_CONTACT ───────────────────╲
                                ↑
                            AIR GAP
```

| Property | Value |
|----------|-------|
| **Angle** | 40° (rotation from vertical) |
| **Knife Color** | Green (#44FF44) |
| **Knife Visibility** | Visible |
| **Source Contact Connection** | Still connected to incoming conductor |
| **Load Contact Connection** | Still connected to outgoing conductor |
| **Continuity** | BROKEN (air gap) |
| **Air Gap** | Visible between knife and Load Contact |

**Key Insight**: When OPEN, the Source Contact remains connected to the incoming conductor, and the Load Contact remains connected to the outgoing conductor. Only the Moving Knife moves.

**Knife Endpoints (OPEN)**:

```javascript
// Calculate rotated knife endpoints
const centerY = TOP_CONTACT_Y + (GAP / 2) + 1;
const halfLength = (GAP + 1) / 2;
const angleRad = 40 * Math.PI / 180;

const dx = Math.sin(angleRad) * halfLength;
const dy = Math.cos(angleRad) * halfLength;

// Top end (moves left for 40° clockwise rotation)
const topX = center_x - dx;
const topY = centerY - dy;

// Bottom end (moves right)
const bottomX = center_x + dx;
const bottomY = centerY + dy;
```

**Rules**:
- KNIFE-005: Knife must NOT touch Load Contact when OPEN
- KNIFE-006: Knife must NOT intersect or overlap Load Contact
- KNIFE-007: Air gap must be clearly visible
- KNIFE-008: Rotation direction follows standard convention (clockwise = open)
- KNIFE-009: Source Contact remains connected to incoming conductor
- KNIFE-010: Load Contact remains connected to outgoing conductor

### 5.3 UNKNOWN State

**Visual**: The Moving Knife is not rendered. Both fixed contacts remain visible.

```
UNKNOWN:

SOURCE_CONTACT ──────────────

LOAD_CONTACT ───────────────

         ↑ NO KNIFE ↑
```

| Property | Value |
|----------|-------|
| **Knife Visibility** | Hidden (display: none) |
| **Knife Color** | N/A |
| **Source Contact** | Visible |
| **Load Contact** | Visible |
| **Circuit State** | Unknown |

**Rules**:
- KNIFE-011: Knife element must not be rendered
- KNIFE-012: Both contacts remain visible
- KNIFE-013: Cannot infer circuit state from geometry alone

---

## 6. Immutable vs. Mutable Properties

### 6.1 Immutable Properties

These properties NEVER change:

| Property | Value | Rationale |
|----------|-------|-----------|
| Source Contact Position | Fixed Y coordinate | Permanently connected to incoming |
| Load Contact Position | Fixed Y coordinate | Permanently connected to outgoing |
| Contact Width | 30px | Physical contact size |
| Contact Thickness | 3px | Visual weight |
| Conductor Gap | 52px | Electrical isolation distance |
| Knife Length | GAP + 1px | Must cover gap plus overlap |
| Pivot Location | Center of gap | Mechanical pivot point |

### 6.2 Mutable Properties

These properties change with state:

| Property | States | Description |
|----------|--------|-------------|
| Knife Angle | 0° (CLOSED), 40° (OPEN) | Rotation position |
| Knife Visibility | true/false | Render or hide knife |
| Knife Color | Red/Green | Indicates state |
| Selected | true/false | User selection state |

---

## 7. Geometry Reference

### 7.1 Coordinate System

```
    X: center_x
    │
    │    ┌─────────────────────────┐
    │    │   SOURCE CONTACT         │  ← y = 94 (TOP_CONTACT_Y)
    │    │  (to incoming)          │
    │    └─────────────────────────┘
    │              │
    │              │     ← Moving Knife rotates here
    │              │
    │    ┌─────────────────────────┐
    │    │    LOAD CONTACT         │  ← y = 146 (BOTTOM_CONTACT_Y)
    │    │   (to outgoing)        │
    │    └─────────────────────────┘
    │
    Y
```

### 7.2 Standard Dimensions

| Dimension | Value | Notes |
|-----------|-------|-------|
| Contact Width | 30px | x = center_x ± 15 |
| Contact Thickness | 3px | stroke-width |
| Source Contact Y | 94px | TOP_CONTACT_Y |
| Load Contact Y | 146px | BOTTOM_CONTACT_Y |
| Conductor Gap | 52px | 146 - 94 |
| Knife Length | 53px | 52 + 1 |
| Knife Width | 5px | stroke-width |
| Pivot Y | 96px | 94 + 1 |

### 7.3 SVG Element Summary

```svg
<svg viewBox="0 0 200 200">
  <!-- Source Contact (to incoming conductor) -->
  <line x1="85" y1="94" x2="115" y2="94" 
        stroke="[bus_color]" stroke-width="3" stroke-linecap="round"/>
  
  <!-- Load Contact (to outgoing conductor) -->
  <line x1="85" y1="146" x2="115" y2="146" 
        stroke="[bus_color]" stroke-width="3" stroke-linecap="round"/>
  
  <!-- Moving Knife (CLOSED: inline) -->
  <line id="knife" x1="100" y1="94" x2="100" y2="147" 
        stroke="[state_color]" stroke-width="5" stroke-linecap="round"/>
  
  <!-- Or (OPEN: 40° rotation about center) -->
  <!-- Calculated: center = (100, 121), halfLength = 26.5 -->
</svg>
```

---

## 8. Validation Rules

### 8.1 Rendering Validation

| Rule ID | Test | Expected Result |
|---------|------|----------------|
| KNIFE-001 | Render CLOSED state | Knife perfectly vertical, spans gap + 1px |
| KNIFE-002 | Render OPEN state | Knife at 40°, no contact with Load Contact |
| KNIFE-003 | Render UNKNOWN state | Knife hidden, both contacts visible |
| KNIFE-004 | Measure gap | Knife does not touch Load Contact when OPEN |
| KNIFE-005 | Check overlap | Knife overlaps contacts by 1px when CLOSED |

### 8.2 Geometric Validation

| Rule ID | Test | Expected Result |
|---------|------|----------------|
| GEOM-001 | Contact width = 30px | x1 = center_x - 15, x2 = center_x + 15 |
| GEOM-002 | Gap = 52px | y2 - y1 = 52 |
| GEOM-003 | Knife length = gap + 1px | y2 - y1 = 53 |
| GEOM-004 | Pivot at center | pivot_y = TOP_CONTACT_Y + 26 |

### 8.3 Internal Topology Validation

| Rule ID | Test | Expected Result |
|---------|------|----------------|
| TOPO-001 | Source Contact permanently connected | Yes - never disconnects from incoming |
| TOPO-002 | Load Contact permanently connected | Yes - never disconnects from outgoing |
| TOPO-003 | Only Moving Knife moves | Yes - contacts never move |
| TOPO-004 | Mechanical Pivot ≠ electrical connection | Pivot is axis of rotation only |

---

## 9. Knowledge Assessment

### Internal Topology Questions (EXP-011-Rev1)

**Q: Which component is permanently connected to the incoming conductor?**
> A: **Source Contact** is permanently connected to the incoming conductor. It never moves.

**Q: Does the knife connect directly to the main conductor?**
> A: **No.** The knife does NOT connect directly to the main conductor. The Source Contact is the permanent electrical connection point to the incoming conductor. The knife only bridges the Source Contact and Load Contact.

**Q: Which component rotates?**
> A: **Moving Knife** is the only component that rotates. Source Contact and Load Contact remain fixed.

**Q: What is the function of the Mechanical Pivot?**
> A: The Mechanical Pivot defines the axis of rotation for the Moving Knife. It is a **mechanical feature only** and is **NOT** the electrical connection point.

**Q: What remains electrically connected when the switch is OPEN?**
> A: When OPEN, **both fixed contacts remain connected** to their respective conductors:
> - Source Contact remains connected to the incoming conductor
> - Load Contact remains connected to the outgoing conductor
> - Only the Moving Knife moves away, creating an air gap

**Q: Why does the Main Conductor remain continuous in an Earth Switch?**
> A: In an Earth Switch:
> - The **Source Contact** is connected to the Main Conductor (incoming)
> - The **Load Contact** is connected to the Ground Conductor (not the main path)
> - The Main Conductor is **never interrupted** by the knife switch
> - The knife switch branches to ground, but the main path continues

### Conceptual Questions

**Q: Why is the knife longer than the conductor gap?**
> A: The Moving Knife is exactly 1 pixel longer than the conductor gap (GAP + 1px). This ensures that when the knife is closed, it overlaps both contacts by 0.5px on each side, preventing visible rendering gaps caused by SVG sub-pixel positioning.

**Q: What defines the conductor gap?**
> A: The conductor gap is the vertical distance between the inner edges of the two contacts. It represents the electrical isolation distance and is defined by the difference: BOTTOM_CONTACT_Y - TOP_CONTACT_Y. For standard geometry, this is 52px.

**Q: What changes between OPEN and CLOSED?**
> A: Three properties change:
> 1. **Angle**: From 0° (CLOSED) to 40° (OPEN)
> 2. **Color**: From Red (#FF4444) for CLOSED to Green (#44FF44) for OPEN
> 3. **Position**: Knife endpoints move laterally from rotation about Mechanical Pivot

**Q: Why must the knife not touch the Load Contact when OPEN?**
> A: The knife must NOT touch the Load Contact when OPEN to visually communicate electrical isolation. Any contact would imply a conductive path exists. The air gap is essential for safety identification on the diagram.

**Q: Why is the knife hidden in UNKNOWN?**
> A: The UNKNOWN state indicates the device status cannot be determined. Hiding the knife (while keeping both contacts visible) communicates that the circuit state is indeterminate without making assumptions.

### Application Questions

**Q: What happens if knife length equals exactly the gap?**
> A: Due to SVG sub-pixel rendering, the knife may show a visible seam where it meets the contacts. The +1px overlap ensures seamless visual continuity.

**Q: What if the knife rotates in the wrong direction?**
> A: Standard convention is clockwise rotation (40°) to open. Rotation direction must be consistent with the device orientation (vertical devices rotate to the right).

**Q: What is the correct renderer instantiation pattern?**
> A: The renderer must instantiate the knife switch using:
> 1. Source Contact → connected to incoming conductor
> 2. Moving Knife → bridges Source Contact to Load Contact
> 3. Load Contact → connected to outgoing conductor
> 
> The knife does NOT connect directly to the main conductor. The Source Contact is the permanent electrical connection.

---

## 10. Related Knowledge

| Document | Relationship | Notes |
|----------|--------------|-------|
| KDE-PRIM-DS-001 | Uses Knife Switch | DS primitive references this geometry |
| KDE-PRIM-ES-001 | Uses Knife Switch | ES primitive references this geometry |
| KDE-GEOM-BUS-001 | Inherited color | Contacts inherit bus color |

---

## 11. Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2026-07-21 | Initial creation for EXP-011 | KDE-EXPERT-SLD-001 |
| 1.1.0 | 2026-07-21 | Added internal topology (EXP-011-Rev1): Source Contact, Load Contact, Moving Knife, Mechanical Pivot definitions | KDE-EXPERT-SLD-001 |

---

## 12. Provenance

| Source | Reference | Date |
|--------|-----------|------|
| Investigation | EXP-011 | 2026-07-21 |
| Investigation | EXP-011-Rev1 | 2026-07-21 |
| First Principles | Knife switch mechanics | 2026-07-21 |

---

*This knowledge artifact defines the shared geometry of knife-operated switching devices for accurate rendering in Single Line Diagrams.*
