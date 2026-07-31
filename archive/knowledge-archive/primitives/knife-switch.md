# Knife Switch Geometry

**Knowledge ID**: KDE-GEOM-KNIFE-001
**Title**: Knife Switch Geometry — Shared Component Specification
**Class**: SHARED_COMPONENT
**Domain**: primitive-geometry
**Version**: 1.2.0
**Status**: APPROVED
**Confidence**: HIGH
**Evidence Level**: 5
**Owner**: KDE-EXPERT-SLD-001
**Created**: 2026-07-21T14:30:00Z
**Updated**: 2026-07-21T16:00:00Z
**Reviewed**: 2026-07-21
**Source Investigation**: EXP-011, EXP-011-Rev1, EXP-011-Rev2
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

A Knife Switch is a **hinged bridge**. The knife is **permanently attached** to the Source Contact via a hinge that serves as both the mechanical pivot AND the permanent electrical connection.

**Key Insight**: The knife NEVER detaches from the Source Contact. The hinge is the electrical AND mechanical connection point.

### 0.2 Internal Components

Every Knife Switch consists of four internal components:

| Component | Type | Function |
|-----------|------|----------|
| **Source Contact** | Fixed | Permanently connected to incoming conductor; knife is hinged here |
| **Load Contact** | Fixed | Permanently connected to outgoing conductor |
| **Moving Knife** | Moving | Rotates about hinge (attached to Source Contact) |
| **Hinge** | Combined | Mechanical pivot AND permanent electrical connection to Source Contact |

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
│                    │   CONTACT     │    to incoming conductor  │
│                    └───────┬────────┘                          │
│                            │                                    │
│                    ┌───────┴────────┐                          │
│                    │     HINGE      │  ← Mechanical pivot     │
│                    │  (also electrical│    AND electrical       │
│                    │   connection)   │    connection           │
│                    └───────┬────────┘                          │
│                            │                                    │
│                            ▼                                    │
│                    ┌────────────────┐                          │
│                    │   MOVING       │  ← Rotates about hinge   │
│                    │   KNIFE        │    attached to Source    │
│                    └───────┬────────┘                          │
│                            │                                    │
│                            ▼                                    │
│                    ┌────────────────┐                          │
│                    │   LOAD         │  ← Permanently connected │
│                    │   CONTACT     │    to outgoing conductor  │
│                    └───────┬────────┘                          │
│                            │                                    │
│                            ▼                                    │
│   OUTGOING                                                  │
│   CONDUCTOR ──────────────┘                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 0.4 Component Definitions

#### Source Contact

The **Source Contact** is permanently connected to the incoming conductor. The **knife is hinged here**. The hinge is both the mechanical pivot point and the permanent electrical connection.

```
Source Contact + Hinge = Incoming conductor connection point
                        + Knife attachment point
                        + Mechanical pivot
```

#### Hinge (Critical)

The **Hinge** serves two functions:
1. **Mechanical**: Defines the axis of rotation for the knife
2. **Electrical**: Permanent connection between knife and Source Contact

```
Hinge = Mechanical Pivot + Electrical Connection Point
```

**The knife NEVER detaches from the hinge/Source Contact.**

#### Load Contact

The **Load Contact** is permanently connected to the outgoing conductor. It **never moves**. The knife tip touches or separates from this contact.

```
Load Contact = Connection Point for outgoing electrical path
```

#### Moving Knife

The **Moving Knife** is the **only moving electrical conductor**. It is **permanently attached** to the Source Contact via the hinge. It rotates about the hinge and touches or separates from the Load Contact.

```
Moving Knife = Only moving electrical component
             = Permanently attached to Source Contact via hinge
             = NEVER floats independently
```

### 0.5 State Behaviors

#### CLOSED State

```
INCOMING ──┬── HINGE ──┬── MOVING KNIFE ──┬── LOAD CONTACT ──┬── OUTGOING
CONDUCTOR  │           │                  │                  │      CONDUCTOR
           │           │                  │                  │
           │           │    (knife touches both contacts)     │
           │           │◄──────── continuity ────────►        │
```

The Moving Knife touches both Source Contact (at hinge) and Load Contact.

#### OPEN State

```
INCOMING ──┬── HINGE ──┬── MOVING KNIFE ──┐    LOAD CONTACT ──┬── OUTGOING
CONDUCTOR  │           │                  │    (not touched)  │      CONDUCTOR
           │           │                  │                   │
           │           │◄── no continuity  │                   │
           │           │    (air gap only  │                   │
           │           │    at Load side)  │                   │
```

**Critical**: The knife ALWAYS remains in contact with the Source Contact (via hinge). The air gap exists ONLY between the knife tip and the Load Contact.

#### UNKNOWN State

The Moving Knife is not rendered. Both contacts remain visible and connected to their conductors.

### 0.6 Key Rules

| Rule | Description |
|------|-------------|
| INT-001 | Source Contact is permanently connected to incoming conductor |
| INT-002 | Load Contact is permanently connected to outgoing conductor |
| INT-003 | Knife is HINGED to Source Contact (never detaches) |
| INT-004 | Hinge serves as mechanical pivot AND electrical connection |
| INT-005 | Knife NEVER floats independently |
| INT-006 | Air gap exists ONLY at Load Contact side when OPEN |
| INT-007 | NO air gap at Source Contact (knife always attached) |
| INT-008 | Knife tip is the only point that changes contact |

### 0.7 Rejection Criteria

Any rendering that violates these rules shall be **rejected**:

| Rejection Rule | Description |
|----------------|-------------|
| REJ-001 | Knife is detached from the Source Contact |
| REJ-002 | Air gap exists at the Source Contact side |
| REJ-003 | Knife floats independently (not attached to hinge) |
| REJ-004 | Double chevrons are omitted from connection interface |

---

## Summary

The Knife Switch consists of two fixed contacts (Source and Load) and one rotating blade (Moving Knife). The knife is **permanently hinged** to the Source Contact. When CLOSED, the blade bridges both contacts, creating electrical continuity. When OPEN, the blade rotates away, creating visible isolation at the Load Contact only.

**Key Principles**: 
1. The knife is **permanently hinged** to the Source Contact (hinge = mechanical pivot + electrical connection)
2. The knife **NEVER detaches** from the Source Contact
3. Air gap exists ONLY between knife tip and Load Contact (never at Source Contact side)
4. The knife blade length = conductor gap + 1px (for visual continuity)

---

## 1. Component Architecture

### 1.1 Knife Switch Components

```
                    CONDUCTOR GAP
    ←─────────────────────────────────→
    
    ┌─────────────────────────────────┐
    │       SOURCE CONTACT            │  ← y = TOP_CONTACT_Y
    │  (Connected to incoming conductor)│
    └───────────────┬─────────────────┘
                    │
              ┌─────┴─────┐
              │   HINGE   │  ← Mechanical pivot + Electrical connection
              │  (knife   │    Knife NEVER detaches from here
              │  attached)│
              └─────┬─────┘
                    │
    ┌───────────────┴─────────────────┐
    │           MOVING KNIFE          │  ← Rotates about HINGE
    │         (L = gap + 1px)         │    Always attached to Source
    └───────────────┬─────────────────┘
                    │
    ┌─────────────────────────────────┐
    │         LOAD CONTACT            │  ← y = BOTTOM_CONTACT_Y
    │  (Connected to outgoing conductor)│
    └─────────────────────────────────┘
```

### 1.2 Components Table

| Component | Type | Description |
|-----------|------|-------------|
| Source Contact | Geometry | Top stationary contact, permanently connected to incoming, knife hinged here |
| Hinge | Combined | Knife attachment point, mechanical pivot, AND electrical connection |
| Load Contact | Geometry | Bottom stationary contact, permanently connected to outgoing |
| Moving Knife | Geometry | Rotating conductor blade, always attached to hinge/Source |
| Conductor Gap | Geometry | Distance between contacts |

---

## 2. Contacts and Hinge

### 2.1 Contact Geometry

| Parameter | Value | Description |
|-----------|-------|-------------|
| **Contact Width** | 30px | Horizontal span |
| **Contact Thickness** | 3px | Stroke width |
| **Contact Color** | Inherited from Bus | Conductor color |
| **Source Contact Y** | TOP_CONTACT_Y | Upper contact position (knife hinged here) |
| **Load Contact Y** | BOTTOM_CONTACT_Y | Lower contact position |
| **Hinge Position** | TOP_CONTACT_Y | Knife attachment point |

### 2.2 Contact SVG Representation

```svg
<!-- Source Contact (connected to incoming conductor, knife hinged here) -->
<line 
  x1="(center_x - 15)" 
  y1="TOP_CONTACT_Y" 
  x2="(center_x + 15)" 
  y2="TOP_CONTACT_Y" 
  stroke="[bus_color]" 
  stroke-width="3" 
  stroke-linecap="round"/>

<!-- Hinge indicator (at Source Contact) -->
<circle
  cx="center_x"
  cy="TOP_CONTACT_Y"
  r="4"
  stroke="[bus_color]"
  stroke-width="2"
  fill="none"/>

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
| CONT-008 | Knife is hinged to Source Contact (never detaches) |
| CONT-009 | Hinge serves as both mechanical pivot and electrical connection |

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

### 4.3 Hinge (Pivot Point)

The Moving Knife is **permanently hinged** to the Source Contact at the **Hinge** point:

```
HINGE_Y = TOP_CONTACT_Y
```

| Parameter | Value |
|-----------|-------|
| **Hinge X** | center_x |
| **Hinge Y** | TOP_CONTACT_Y (same as Source Contact) |
| **Rotation Range** | 0° to 40° |

**Critical**: The Hinge is BOTH the mechanical pivot AND the electrical connection. The knife NEVER detaches from the hinge.

### 4.4 Knife SVG Representation

```svg
<!-- Moving Knife (closed position, inline) -->
<!-- Knife top is ALWAYS at Hinge (Source Contact position) -->
<!-- Knife bottom extends to Load Contact position + 1px overlap -->
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

SOURCE_CONTACT ────┬─── HINGE ───╪═══ MOVING KNIFE ════════╪═══ LOAD_CONTACT
   (incoming)      │             │                       │         (outgoing)
                   │             │◄── continuity ───────►│
                   │             │   (knife bridges both)  │
```

| Property | Value |
|----------|-------|
| **Angle** | 0° (perfectly vertical) |
| **Knife Color** | Red (#FF4444) |
| **Knife Visibility** | Visible |
| **Knife Top (Y1)** | HINGE_Y = SOURCE_CONTACT_Y (hinged, never moves) |
| **Knife Bottom (Y2)** | LOAD_CONTACT_Y + 1 (overlaps contact) |
| **Contact with Contacts** | Both contacts bridged |

**Rules**:
- KNIFE-001: Knife must be exactly vertical (0°)
- KNIFE-002: Knife must span the entire gap plus 1px overlap
- KNIFE-003: No visible gap at contact points
- KNIFE-004: Knife bridges Source Contact (via hinge) to Load Contact
- KNIFE-005: Knife top is ALWAYS at hinge (Source Contact position)

### 5.2 OPEN State

**Visual**: The Moving Knife rotates 40° away from the Load Contact, creating visible air gap.

```
OPEN (angle = 40°):

SOURCE_CONTACT ────┬─── HINGE ───╪═══ MOVING KNIFE ───┐    LOAD_CONTACT
   (incoming)      │             │                   │    (outgoing)
                   │             │◄── NO continuity  │    (not touched)
                   │             │   (air gap only   │
                   │             │    at Load side)  │
```

**Critical**: The knife tip moves away from the Load Contact, but the knife top NEVER moves from the hinge.

| Property | Value |
|----------|-------|
| **Angle** | 40° (rotation from vertical) |
| **Knife Color** | Green (#44FF44) |
| **Knife Visibility** | Visible |
| **Knife Top (Y1)** | HINGE_Y = SOURCE_CONTACT_Y (ALWAYS at hinge) |
| **Knife Bottom (Y2)** | Rotates away from Load Contact |
| **Continuity** | BROKEN (air gap at Load Contact only) |
| **Air Gap** | Only between knife tip and Load Contact |

**Key Insight**: The knife ALWAYS remains attached to the hinge/Source Contact. The air gap exists ONLY at the Load Contact side.

**Knife Endpoints (OPEN)**:

```javascript
// Knife is HINGED at Source Contact (top never moves from hinge)
const hingeY = TOP_CONTACT_Y;  // Knife TOP is ALWAYS here

// Knife rotates about hinge
const halfLength = (GAP + 1) / 2;
const angleRad = 40 * Math.PI / 180;

const dx = Math.sin(angleRad) * halfLength;
const dy = Math.cos(angleRad) * halfLength;

// Top end: ALWAYS at hinge (Source Contact position)
const topX = center_x;
const topY = hingeY;

// Bottom end: rotates away from Load Contact
const bottomX = center_x + dx;
const bottomY = hingeY + dy;
```

**Rules**:
- KNIFE-006: Knife TOP is ALWAYS at hinge (Source Contact position)
- KNIFE-007: Knife must NOT touch Load Contact when OPEN
- KNIFE-008: Knife must NOT intersect or overlap Load Contact
- KNIFE-009: Air gap must be clearly visible
- KNIFE-010: NO air gap at hinge/Source Contact side (knife always attached)
- KNIFE-011: Knife NEVER floats independently

### 5.3 UNKNOWN State

**Visual**: The Moving Knife is not rendered. Both fixed contacts remain visible.

```
UNKNOWN:

SOURCE_CONTACT ────┬─── HINGE ────────────────    LOAD_CONTACT
   (incoming)      │         NO KNIFE          │    (outgoing)
                   │                            │
                   │   (knife not rendered)    │
```

| Property | Value |
|----------|-------|
| **Knife Visibility** | Hidden (display: none) |
| **Knife Color** | N/A |
| **Source Contact** | Visible |
| **Load Contact** | Visible |
| **Circuit State** | Unknown |

**Rules**:
- KNIFE-012: Knife element must not be rendered
- KNIFE-013: Both contacts remain visible
- KNIFE-014: Cannot infer circuit state from geometry alone

---

## 6. Immutable vs. Mutable Properties

### 6.1 Immutable Properties

These properties NEVER change:

| Property | Value | Rationale |
|----------|-------|-----------|
| Source Contact Position | Fixed Y coordinate | Permanently connected to incoming |
| Load Contact Position | Fixed Y coordinate | Permanently connected to outgoing |
| Hinge Position | Same as Source Contact | Knife attachment point (never moves) |
| Contact Width | 30px | Physical contact size |
| Contact Thickness | 3px | Visual weight |
| Conductor Gap | 52px | Electrical isolation distance |
| Knife Length | GAP + 1px | Must cover gap plus overlap |
| Knife Top Position | Always at hinge | Knife NEVER detaches |

### 6.2 Mutable Properties

These properties change with state:

| Property | States | Description |
|----------|--------|-------------|
| Knife Angle | 0° (CLOSED), 40° (OPEN) | Rotation position |
| Knife Visibility | true/false | Render or hide knife |
| Knife Color | Red/Green | Indicates state |
| Knife Bottom Position | At Load Contact (CLOSED) or away (OPEN) | Only bottom moves |
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
    │    └───────────┬─────────────┘
    │                │
    │           ┌────┴────┐
    │           │  HINGE  │  ← y = 94 (knife hinged here)
    │           │ (pivot) │
    │           └────┬────┘
    │                │
    │    ┌───────────┴─────────────┐
    │    │    MOVING KNIFE         │  ← Rotates about hinge
    │    │   (always attached)     │    Top at hinge, bottom moves
    │    └───────────┬─────────────┘
    │                │
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
| Hinge Y | 94px | Same as Source Contact |
| Conductor Gap | 52px | 146 - 94 |
| Knife Length | 53px | 52 + 1 |
| Knife Width | 5px | stroke-width |
| Knife Top (Y1) | 94px | ALWAYS at hinge |
| Knife Bottom (Y2) | 147px (CLOSED) | LOAD_CONTACT_Y + 1 |

### 7.3 SVG Element Summary

```svg
<svg viewBox="0 0 200 200">
  <!-- Source Contact (to incoming conductor, knife hinged here) -->
  <line x1="85" y1="94" x2="115" y2="94" 
        stroke="[bus_color]" stroke-width="3" stroke-linecap="round"/>
  
  <!-- Hinge indicator (at Source Contact) -->
  <circle cx="100" cy="94" r="4" 
          stroke="[bus_color]" stroke-width="2" fill="none"/>
  
  <!-- Load Contact (to outgoing conductor) -->
  <line x1="85" y1="146" x2="115" y2="146" 
        stroke="[bus_color]" stroke-width="3" stroke-linecap="round"/>
  
  <!-- Moving Knife (CLOSED: inline, TOP at hinge) -->
  <line id="knife" x1="100" y1="94" x2="100" y2="147" 
        stroke="[state_color]" stroke-width="5" stroke-linecap="round"/>
  
  <!-- Or (OPEN: 40° rotation about hinge at y=94) -->
  <!-- knife.y1 = 94 (hinge), knife rotates to y2 -->
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
| KNIFE-006 | Knife top position | ALWAYS at hinge/Source Contact position |

### 8.2 Geometric Validation

| Rule ID | Test | Expected Result |
|---------|------|----------------|
| GEOM-001 | Contact width = 30px | x1 = center_x - 15, x2 = center_x + 15 |
| GEOM-002 | Gap = 52px | y2 - y1 = 52 |
| GEOM-003 | Knife length = gap + 1px | y2 - y1 = 53 |
| GEOM-004 | Knife top = hinge position | knife.y1 = TOP_CONTACT_Y |

### 8.3 Internal Topology Validation

| Rule ID | Test | Expected Result |
|---------|------|----------------|
| TOPO-001 | Source Contact permanently connected | Yes - never disconnects from incoming |
| TOPO-002 | Load Contact permanently connected | Yes - never disconnects from outgoing |
| TOPO-003 | Only Moving Knife moves | Yes - contacts never move |
| TOPO-004 | Hinge = mechanical pivot + electrical | Hinge serves both functions |
| TOPO-005 | Knife hinged to Source Contact | Knife top NEVER moves from hinge |
| TOPO-006 | Air gap location | ONLY at Load Contact side when OPEN |

### 8.4 Rejection Criteria

Any rendering that violates these rules shall be **rejected**:

| Rejection Rule | Description |
|----------------|-------------|
| REJ-001 | Knife is detached from the Source Contact |
| REJ-002 | Air gap exists at the Source Contact side |
| REJ-003 | Knife floats independently (not attached to hinge) |
| REJ-004 | Double chevrons are omitted from connection interface |
| REJ-005 | Knife top position not at hinge position |

---

## 9. Knowledge Assessment

### Internal Topology Questions (EXP-011-Rev2)

**Q: Which component is permanently connected to the incoming conductor?**
> A: **Source Contact** is permanently connected to the incoming conductor. The knife is hinged to the Source Contact at the hinge point.

**Q: Does the knife connect directly to the main conductor?**
> A: **No.** The knife does NOT connect directly to the main conductor. The **Source Contact** is the permanent electrical connection point to the incoming conductor. The knife is **hinged** to the Source Contact and only bridges the gap to the Load Contact.

**Q: Which component rotates?**
> A: **Moving Knife** is the only component that rotates. The knife is **permanently hinged** to the Source Contact - it rotates about the hinge but **never detaches**.

**Q: What is the function of the Hinge?**
> A: The **Hinge** serves two combined functions:
> 1. **Mechanical**: Defines the axis of rotation for the knife
> 2. **Electrical**: Permanent electrical connection between knife and Source Contact
> 
> The Hinge is at the Source Contact position. The knife NEVER detaches from it.

**Q: What remains electrically connected when the switch is OPEN?**
> A: When OPEN, **the knife ALWAYS remains attached to the Source Contact** via the hinge:
> - Source Contact remains connected to the incoming conductor
> - Load Contact remains connected to the outgoing conductor
> - **The knife remains attached to the hinge/Source Contact** (this never breaks)
> - Only the knife tip moves away from the Load Contact
> - **Air gap exists ONLY at the Load Contact side**

**Q: Why does the Main Conductor remain continuous in an Earth Switch?**
> A: In an Earth Switch:
> - The **Source Contact** is connected to the Main Conductor (incoming)
> - The **Load Contact** is connected to the Ground Conductor (not the main path)
> - The Main Conductor is **never interrupted** by the knife switch
> - The knife switch branches to ground, but the main path continues
> - The knife is **hinged** to the Source Contact (main conductor connection)

**Q: Why must the knife be hinged, not floating?**
> A: The knife must be hinged to the Source Contact because:
> 1. The hinge provides the electrical connection point
> 2. Without the hinge, the knife would float independently
> 3. The knife tip is the only part that should change position
> 4. A floating knife would create an open circuit even when "closed"

### Conceptual Questions

**Q: Why is the knife longer than the conductor gap?**
> A: The Moving Knife is exactly 1 pixel longer than the conductor gap (GAP + 1px). This ensures that when the knife is closed, it overlaps both contacts by 0.5px on each side, preventing visible rendering gaps caused by SVG sub-pixel positioning.

**Q: What defines the conductor gap?**
> A: The conductor gap is the vertical distance between the inner edges of the two contacts. It represents the electrical isolation distance and is defined by the difference: BOTTOM_CONTACT_Y - TOP_CONTACT_Y. For standard geometry, this is 52px.

**Q: What changes between OPEN and CLOSED?**
> A: Three properties change:
> 1. **Angle**: From 0° (CLOSED) to 40° (OPEN)
> 2. **Color**: From Red (#FF4444) for CLOSED to Green (#44FF44) for OPEN
> 3. **Knife Tip Position**: Moves toward or away from Load Contact

**What does NOT change:**
> - **Knife Top Position**: ALWAYS at hinge/Source Contact position
> - **Hinge Attachment**: Knife NEVER detaches from hinge

**Q: Why must the knife not touch the Load Contact when OPEN?**
> A: The knife must NOT touch the Load Contact when OPEN to visually communicate electrical isolation. The air gap is essential for safety identification on the diagram.

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
> 2. Hinge → at Source Contact position
> 3. Moving Knife → hinged at top, extends toward Load Contact
> 4. Load Contact → connected to outgoing conductor
> 
> The knife top is ALWAYS at the hinge/Source Contact position. The knife NEVER floats independently.

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
| 1.2.0 | 2026-07-21 | Fixed hinge concept (EXP-011-Rev2): Knife is hinged to Source Contact, hinge = mechanical pivot + electrical connection | KDE-EXPERT-SLD-001 |

---

## 12. Provenance

| Source | Reference | Date |
|--------|-----------|------|
| Investigation | EXP-011 | 2026-07-21 |
| Investigation | EXP-011-Rev1 | 2026-07-21 |
| Investigation | EXP-011-Rev2 | 2026-07-21 |
| First Principles | Knife switch mechanics | 2026-07-21 |

---

*This knowledge artifact defines the shared geometry of knife-operated switching devices for accurate rendering in Single Line Diagrams.*
