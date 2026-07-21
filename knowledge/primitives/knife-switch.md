# Knife Switch Geometry

**Knowledge ID**: KDE-GEOM-KNIFE-001
**Title**: Knife Switch Geometry — Shared Component Specification
**Class**: SHARED_COMPONENT
**Domain**: primitive-geometry
**Version**: 1.0.0
**Status**: APPROVED
**Confidence**: HIGH
**Evidence Level**: 5
**Owner**: KDE-EXPERT-SLD-001
**Created**: 2026-07-21T14:30:00Z
**Updated**: 2026-07-21T14:30:00Z
**Reviewed**: 2026-07-21
**Source Investigation**: EXP-011
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

## Summary

The Knife Switch consists of two fixed contacts and one rotating blade. When CLOSED, the blade bridges both contacts, creating electrical continuity. When OPEN, the blade rotates away, creating visible isolation. The blade is intentionally 1 pixel longer than the gap to ensure visual continuity when closed.

**Key Principle**: The knife blade length = conductor gap + 1px. This guarantees visual contact while preventing rendering artifacts.

---

## 1. Component Architecture

### 1.1 Knife Switch Components

```
                    CONDUCTOR GAP
    ←─────────────────────────────────→
    
    ┌─────────────────────────────────┐
    │         FIXED CONTACT A         │  ← y = TOP_CONTACT_Y
    └─────────────────────────────────┘
              ↓
    ┌─────────────────────────────────┐
    │           KNIFE BLADE           │  ← Rotates about PIVOT
    │         (L = gap + 1px)         │
    └─────────────────────────────────┘
              ↓
    ┌─────────────────────────────────┐
    │         FIXED CONTACT B         │  ← y = BOTTOM_CONTACT_Y
    └─────────────────────────────────┘
```

### 1.2 Components Table

| Component | Type | Description |
|-----------|------|-------------|
| Fixed Contact A | Geometry | Top stationary contact |
| Fixed Contact B | Geometry | Bottom stationary contact |
| Knife Blade | Geometry | Rotating conductor blade |
| Pivot Point | Geometry | Center rotation point |
| Conductor Gap | Geometry | Distance between contacts |

---

## 2. Fixed Contacts

### 2.1 Contact Geometry

| Parameter | Value | Description |
|-----------|-------|-------------|
| **Contact Width** | 30px | Horizontal span |
| **Contact Thickness** | 3px | Stroke width |
| **Contact Color** | Inherited from Bus | Conductor color |
| **Top Contact Y** | TOP_CONTACT_Y | Upper contact position |
| **Bottom Contact Y** | BOTTOM_CONTACT_Y | Lower contact position |

### 2.2 Contact SVG Representation

```svg
<!-- Top Fixed Contact -->
<line 
  x1="(center_x - 15)" 
  y1="TOP_CONTACT_Y" 
  x2="(center_x + 15)" 
  y2="TOP_CONTACT_Y" 
  stroke="[bus_color]" 
  stroke-width="3" 
  stroke-linecap="round"/>

<!-- Bottom Fixed Contact -->
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

## 4. Knife Blade Geometry

### 4.1 Blade Length

**Critical Rule**: Knife blade length SHALL be:

```
BLADE_LENGTH = GAP_DISTANCE + 1px
```

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| **Blade Length** | GAP + 1px | Ensures visual contact when closed |
| **Extra Pixel** | 1px | Prevents rendering gaps at contact points |
| **Blade Width** | 5px | Stroke width for visibility |
| **Blade Color (CLOSED)** | Red (#FF4444) | Indicates closed state |
| **Blade Color (OPEN)** | Green (#44FF44) | Indicates open state |

### 4.2 Why +1 Pixel?

When SVG renders two overlapping lines, sub-pixel rendering can create visible gaps. By making the blade 1 pixel longer than the gap:

| Scenario | Result |
|----------|--------|
| Blade = Gap | Possible visible seam at contact points |
| Blade = Gap + 1px | Blade overlaps contacts, no visible seam |

### 4.3 Pivot Point

The knife blade rotates about its **center point**:

```
PIVOT_Y = TOP_CONTACT_Y + (GAP / 2) + 1
```

| Parameter | Value |
|-----------|-------|
| **Pivot X** | center_x |
| **Pivot Y** | TOP_CONTACT_Y + 26 (for 52px gap) |
| **Rotation Range** | 0° to 40° |

### 4.4 Blade SVG Representation

```svg
<!-- Knife Blade (closed position, inline) -->
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

**Visual**: The knife blade is perfectly aligned with the conductor, bridging both contacts.

```
CLOSED (angle = 0°):

TOP_CONTACT_Y ────────────── ═══════════════
                           ║
                           ║  ← Blade is inline
                           ║
BOTTOM_CONTACT_Y ────────── ═══════════════
```

| Property | Value |
|----------|-------|
| **Angle** | 0° (perfectly vertical) |
| **Blade Color** | Red (#FF4444) |
| **Blade Visibility** | Visible |
| **Blade Y1** | TOP_CONTACT_Y |
| **Blade Y2** | BOTTOM_CONTACT_Y + 1 |
| **Contact with Contacts** | Both contacts fully bridged |

**Rules**:
- BLADE-001: Blade must be exactly vertical (0°)
- BLADE-002: Blade must span the entire gap plus 1px overlap
- BLADE-003: No visible gap at contact points

### 5.2 OPEN State

**Visual**: The knife blade rotates 40° away from the contacts, creating visible air gaps.

```
OPEN (angle = 40°):

TOP_CONTACT_Y ──────────────
                           ╲
                            ╲  ← Blade rotated
                             ╲
BOTTOM_CONTACT_Y ────────────╲
                           ↑
                        AIR GAP
```

| Property | Value |
|----------|-------|
| **Angle** | 40° (rotation from vertical) |
| **Blade Color** | Green (#44FF44) |
| **Blade Visibility** | Visible |
| **Contact A Connection** | None (disconnected) |
| **Contact B Connection** | None (disconnected) |
| **Air Gap** | Visible at both ends |

**Blade Endpoints (OPEN)**:

```javascript
// Calculate rotated blade endpoints
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
- BLADE-004: Blade must NOT touch either contact when OPEN
- BLADE-005: Blade must NOT intersect or overlap contacts
- BLADE-006: Air gap must be clearly visible
- BLADE-007: Rotation direction follows standard convention (clockwise = open)

### 5.3 UNKNOWN State

**Visual**: The knife blade is not rendered. Only the fixed contacts remain visible.

```
UNKNOWN:

TOP_CONTACT_Y ──────────────

BOTTOM_CONTACT_Y ──────────

         ↑ NO BLADE ↑
```

| Property | Value |
|----------|-------|
| **Blade Visibility** | Hidden (display: none) |
| **Blade Color** | N/A |
| **Contact A** | Visible |
| **Contact B** | Visible |
| **Circuit State** | Unknown |

**Rules**:
- BLADE-008: Blade element must not be rendered
- BLADE-009: Contacts remain visible
- BLADE-010: Cannot infer circuit state from geometry alone

---

## 6. Immutable vs. Mutable Properties

### 6.1 Immutable Properties

These properties NEVER change:

| Property | Value | Rationale |
|----------|-------|-----------|
| Contact Width | 30px | Physical contact size |
| Contact Thickness | 3px | Visual weight |
| Contact Positions | Fixed Y coordinates | Device anchor points |
| Conductor Gap | 52px | Electrical isolation distance |
| Blade Length | GAP + 1px | Must cover gap plus overlap |
| Pivot Location | Center of gap | Mechanical pivot point |

### 6.2 Mutable Properties

These properties change with state:

| Property | States | Description |
|----------|--------|-------------|
| Blade Angle | 0° (CLOSED), 40° (OPEN) | Rotation position |
| Blade Visibility | true/false | Render or hide blade |
| Blade Color | Red/Green | Indicates state |
| Selected | true/false | User selection state |

---

## 7. Geometry Reference

### 7.1 Coordinate System

```
    X: center_x
    │
    │    ┌─────────────────────────┐
    │    │     TOP CONTACT         │  ← y = 94
    │    └─────────────────────────┘
    │              │
    │              │     ← Blade rotates here
    │              │
    │    ┌─────────────────────────┐
    │    │   BOTTOM CONTACT        │  ← y = 146
    │    └─────────────────────────┘
    │
    Y
```

### 7.2 Standard Dimensions

| Dimension | Value | Notes |
|-----------|-------|-------|
| Contact Width | 30px | x = center_x ± 15 |
| Contact Thickness | 3px | stroke-width |
| Contact Y (top) | 94px | TOP_CONTACT_Y |
| Contact Y (bottom) | 146px | BOTTOM_CONTACT_Y |
| Conductor Gap | 52px | 146 - 94 |
| Blade Length | 53px | 52 + 1 |
| Blade Width | 5px | stroke-width |
| Pivot Y | 96px | 94 + 1 |

### 7.3 SVG Element Summary

```svg
<svg viewBox="0 0 200 200">
  <!-- Top Contact -->
  <line x1="85" y1="94" x2="115" y2="94" 
        stroke="[bus_color]" stroke-width="3" stroke-linecap="round"/>
  
  <!-- Bottom Contact -->
  <line x1="85" y1="146" x2="115" y2="146" 
        stroke="[bus_color]" stroke-width="3" stroke-linecap="round"/>
  
  <!-- Knife Blade (CLOSED: inline) -->
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
| KNIFE-001 | Render CLOSED state | Blade perfectly vertical, spans gap + 1px |
| KNIFE-002 | Render OPEN state | Blade at 40°, no contact with either fixed contact |
| KNIFE-003 | Render UNKNOWN state | Blade hidden, contacts visible |
| KNIFE-004 | Measure gap | Blade does not touch contacts when OPEN |
| KNIFE-005 | Check overlap | Blade overlaps contacts by 1px when CLOSED |

### 8.2 Geometric Validation

| Rule ID | Test | Expected Result |
|---------|------|----------------|
| GEOM-001 | Contact width = 30px | x1 = center_x - 15, x2 = center_x + 15 |
| GEOM-002 | Gap = 52px | y2 - y1 = 52 |
| GEOM-003 | Blade length = gap + 1px | y2 - y1 = 53 |
| GEOM-004 | Pivot at center | pivot_y = TOP_CONTACT_Y + 26 |

---

## 9. Knowledge Assessment

### Conceptual Questions

**Q: Why is the knife longer than the conductor gap?**
> A: The knife blade is exactly 1 pixel longer than the conductor gap (GAP + 1px). This ensures that when the knife is closed, it overlaps both fixed contacts by 0.5px on each side, preventing visible rendering gaps caused by SVG sub-pixel positioning.

**Q: What defines the conductor gap?**
> A: The conductor gap is the vertical distance between the inner edges of the two fixed contacts. It represents the electrical isolation distance and is defined by the difference: BOTTOM_CONTACT_Y - TOP_CONTACT_Y. For standard geometry, this is 52px.

**Q: What changes between OPEN and CLOSED?**
> A: Three properties change:
> 1. **Angle**: From 0° (CLOSED) to 40° (OPEN)
> 2. **Color**: From Red (#FF4444) for CLOSED to Green (#44FF44) for OPEN
> 3. **Position**: Blade endpoints move laterally from rotation about center pivot

**Q: Why must the knife not touch the contacts when OPEN?**
> A: The knife must NOT touch either contact when OPEN to visually communicate electrical isolation. Any contact would imply a conductive path exists. The air gap is essential for safety identification on the diagram.

**Q: Why is the knife hidden in UNKNOWN?**
> A: The UNKNOWN state indicates the device status cannot be determined. Hiding the blade (while keeping contacts visible) communicates that the circuit state is indeterminate without making assumptions.

### Application Questions

**Q: What happens if blade length equals exactly the gap?**
> A: Due to SVG sub-pixel rendering, the blade may show a visible seam where it meets the contacts. The +1px overlap ensures seamless visual continuity.

**Q: What if the blade rotates in the wrong direction?**
> A: Standard convention is clockwise rotation (40°) to open. Rotation direction must be consistent with the device orientation (vertical devices rotate to the right).

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

---

## 12. Provenance

| Source | Reference | Date |
|--------|-----------|------|
| Investigation | EXP-011 | 2026-07-21 |
| First Principles | Knife switch mechanics | 2026-07-21 |

---

*This knowledge artifact defines the shared geometry of knife-operated switching devices for accurate rendering in Single Line Diagrams.*
