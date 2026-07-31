# Engineering Geometry Model

**Knowledge ID:** KDE-GEOM-MODEL-001  
**Lesson:** EXP-013  
**Version:** 1.0.0  
**Date:** 2026-07-21  
**Author:** KDE-EXPERT-SLD-001  

---

## 1. Overview

This document establishes the **Engineering Geometry Model** used by all engineering primitives in the KDE SLD system.

**Core Principle:** Engineering primitives are defined by geometry and relationships, not by pixels or absolute coordinates.

---

## 2. Engineering Principle

| ❌ NOT This | ✅ BUT This |
|-------------|-------------|
| Pixels | Geometry |
| Absolute coordinates | Relative relationships |
| Manual conductor drawing | Anchor-based connections |
| Device-specific sizing | Normalized dimensions |

---

## 3. Local Coordinate System

Every primitive owns a **normalized coordinate system**.

### 3.1 Primitive Origin

All primitives define their local origin at:

```
(0, 0)
```

### 3.2 Normalized Dimensions

| Dimension | Value | Notes |
|-----------|-------|-------|
| Width | 1 | Normalized unit |
| Height | 1 | Normalized unit |

### 3.3 Why Normalized?

```
No engineering knowledge shall depend on:
  • SVG pixels
  • Screen resolution
  • Physical device size
  • Graphics engine units
```

---

## 4. Engineering Anchors

### 4.1 Definition

An **Engineering Anchor** is a named connection point exposed by a primitive where electrical conductors connect.

### 4.2 Anchor Properties

| Property | Description |
|----------|-------------|
| **Name** | Unique identifier within primitive |
| **Type** | TOP, BOTTOM, LEFT, RIGHT, GROUND |
| **Position** | Normalized coordinates within primitive |
| **Direction** | Input, Output, Bidirectional |

### 4.3 Anchor Examples by Primitive

#### Circuit Breaker

```
        [BREAKER]
            
  TOP ← ──── ◯ ──── → BOTTOM
       Anchor   Anchor
```

| Anchor Name | Type | Description |
|-------------|------|-------------|
| `top` | Input/Output | Upper conductor connection |
| `bottom` | Input/Output | Lower conductor connection |

#### Disconnect Switch

```
            
      ◯ ← TOP
      │
      │  ← Knife (rotates)
      │
      ◯ ← BOTTOM
```

| Anchor Name | Type | Description |
|-------------|------|-------------|
| `top` | Input/Output | Upper contact connection |
| `bottom` | Input/Output | Lower contact connection |

#### Earth Switch

```
            
      ◯ ← MAIN (on main conductor)
      │
      │  ← Branch with Knife
      │
      ⊥ ← GROUND (ground symbol)
```

| Anchor Name | Type | Description |
|-------------|------|-------------|
| `main` | Input/Output | Connection to main conductor |
| `ground` | Output | Connection to ground reference |

#### Bus

```
═══════════════════════════════
     Bus (continuous conductor)
═══════════════════════════════
   ◯    ◯    ◯    ◯    ◯
   Anchors for each connection point
```

| Anchor Name | Type | Description |
|-------------|------|-------------|
| `conn_1` ... `conn_N` | Input/Output | Connection points along bus |

---

## 5. Primitive Ownership

### 5.1 Ownership Principle

**A primitive owns only its own geometry. A primitive never owns neighbouring conductors.**

### 5.2 Ownership Examples

#### Circuit Breaker Ownership

```
[BREAKER BODY] ──┬── [TOP ANCHOR]
                 │
                 └── [BOTTOM ANCHOR]

OWNED:
  ✓ Body geometry
  ✓ Anchor positions
  ✓ Internal state representation

NOT OWNED:
  ✗ Conductor segments
  ✗ Adjacent primitives
  ✗ Conductor routing
```

#### Disconnect Switch Ownership

```
[CONTACTS] ──┬── [TOP ANCHOR]
            │
            │ ← Knife (rotates)
            │
            └── [BOTTOM ANCHOR]

OWNED:
  ✓ Fixed contacts
  ✓ Knife blade
  ✓ Knife pivot
  ✓ Anchor positions

NOT OWNED:
  ✗ Conductor segments above/below
  ✗ Adjacent devices
```

#### Earth Switch Ownership

```
                    [MAIN CONDUCTOR] (NOT OWNED)
                           │
                           ↓
              ┌────────────────────────┐
              │      BRANCH           │
              │         │             │
              │    [KNIFE]            │ ← OWNED
              │         │             │
              │    [GROUND CONDUCTOR] │ ← OWNED
              │         │             │
              │      [GROUND SYMBOL]  │ ← OWNED
              └─────────┴─────────────┘
                           │
                           ↓
                    [GROUND ANCHOR]
```

OWNED:
  ✓ Branch geometry
  ✓ Knife blade
  ✓ Knife pivot
  ✓ Ground conductor
  ✓ Ground symbol
  ✓ Anchors (main, ground)

NOT OWNED:
  ✗ Main conductor
  ✗ Conductor routing to main

---

## 6. Conductors

### 6.1 Conductor Generation

Conductors are **NOT manually drawn**. Conductors are **generated** by connecting Engineering Anchors.

### 6.2 Anchor-to-Anchor Connection

```
ANCHOR A
    │
    │ ← Generated conductor
    │
    ↓
ANCHOR B
```

### 6.3 Conductor Rules

| Rule | Description |
|------|-------------|
| COND-001 | Conductor generated between connected anchors |
| COND-002 | Conductor inherits color from upstream bus |
| COND-003 | Conductor routing determined by renderer |
| COND-004 | If either primitive moves, conductor follows |

### 6.4 Electrical Continuity

Electrical continuity is preserved through anchor connections:

```
BUS ──► ANCHOR_A ── CONDUCTOR ── ANCHOR_B ──► DEVICE
                    (auto-generated)
```

**When devices are connected, conductors automatically follow.**

---

## 7. Geometric Constraints

### 7.1 Constraint Principle

Primitive geometry is defined using **engineering relationships**, not pixel measurements.

### 7.2 Constraint Examples

#### Knife Length Constraint

```
KNIFE_LENGTH = CONTACT_GAP + TOLERANCE

Where:
  CONTACT_GAP = Distance between contacts
  TOLERANCE = Overlap amount (ensures visual contact)
```

**NOT:** "Knife length = 53 pixels"

#### Ground Symbol Constraint

```
GROUND_SYMBOL:
  is_below: GROUND_CONDUCTOR
  is_centered_on: GROUND_CONDUCTOR
```

**NOT:** "Ground symbol at y=200"

#### Earth Switch Branch Constraint

```
ES_BRANCH:
  originates_from: MAIN_CONDUCTOR
  angle_toward: GROUND
  is_perpendicular_to: MAIN_CONDUCTOR
```

**NOT:** "Branch at 45 degrees"

#### Knife Rotation Constraint

```
KNIFE:
  angle_when_closed: 0_DEGREES  (inline with conductor)
  angle_when_open: 40_DEGREES  (rotation from vertical)
```

**NOT:** "Knife rotates to position (x+10, y+20)"

### 7.3 Constraint Table

| Primitive | Constraint Type | Expression |
|-----------|----------------|------------|
| Knife Switch | Length | `BLADE_LENGTH = GAP + TOLERANCE` |
| Knife Switch | Rotation | `CLOSED = 0°, OPEN = 40°` |
| ES Branch | Origin | `BRANCH starts_on MAIN_CONDUCTOR` |
| ES Branch | Direction | `BRANCH angle_toward GROUND` |
| Ground Symbol | Position | `GROUND_SYMBOL is_below GROUND_CONDUCTOR` |
| CB | Orientation | `HORIZONTAL or VERTICAL` |
| CB | Anchors | `ANCHORS aligned_with CONDUCTOR_AXIS` |

---

## 8. Scaling

### 8.1 Who Determines Physical Size?

| Component | Responsibility |
|-----------|----------------|
| **Engineering Knowledge** | Geometry and relationships |
| **Renderer** | Physical size and units |
| **Display Context** | Resolution and scaling |

### 8.2 Rendering Independence

The same engineering knowledge shall render correctly in:

| Engine | Example |
|--------|---------|
| SVG | Web-based SLD display |
| DXF | CAD export |
| Canvas | HMI display |
| PDF | Printed drawings |
| PNG | Static images |

### 8.3 Scaling Rules

```
ENGINEERING MODEL          RENDERER OUTPUT
─────────────────         ───────────────
Width = 1          ──►   Actual pixel/unit size
Height = 1         ──►   Determined by scale factor
Gap = GAP_CONST    ──►   gap_pixels = GAP_CONST × scale
```

---

## 9. Composition

### 9.1 Bay Composition Process

A substation bay is created by:

1. **Place Primitives** at normalized positions
2. **Define Connections** between anchors
3. **Renderer Generates** conductors between connected anchors
4. **Renderer Routes** conductors (straight, orthogonal, or routed)

### 9.2 Composition Diagram

```
                    ┌─────────────────────────┐
                    │     ENGINEERING        │
                    │       MODEL            │
                    ├─────────────────────────┤
                    │  [CB]──[DS]──[DS]──[ES]│
                    │   │     │     │     │   │
                    │   ▼     ▼     ▼     ▼   │
                    │ ANCHORS CONNECTED      │
                    └─────────────────────────┘
                               │
                               ▼
                    ┌─────────────────────────┐
                    │      RENDERER          │
                    ├─────────────────────────┤
                    │  Conductors generated   │
                    │  Routing applied       │
                    │  Colors assigned       │
                    └─────────────────────────┘
                               │
                               ▼
                    ┌─────────────────────────┐
                    │    RENDERED SLD        │
                    │  (SVG, DXF, etc.)      │
                    └─────────────────────────┘
```

### 9.3 Renderer Rules

The renderer SHALL:

| Rule | Description |
|------|-------------|
| REND-001 | Never manually split conductors |
| REND-002 | Automatically connect anchors |
| REND-003 | Preserve conductor continuity |
| REND-004 | Route conductors appropriately |
| REND-005 | Apply bus color to conductors |

The renderer SHALL NOT:

| Rule | Description |
|------|-------------|
| REND-101 | Hard-code conductor positions |
| REND-102 | Manually draw conductor segments |
| REND-103 | Break anchor connections |
| REND-104 | Override engineering constraints |

---

## 10. Validation Questions

The expert who has absorbed this knowledge can correctly answer:

### Primitive Ownership

**Q: Does a primitive own neighbouring conductors?**
> A: NO. A primitive owns only its own geometry (body, contacts, knife, anchors). Conductors are generated by the renderer when anchors are connected.

### Conductor Continuity

**Q: What defines conductor continuity?**
> A: Anchor connections define conductor continuity. When primitive A's output anchor connects to primitive B's input anchor, the renderer generates a continuous conductor between them.

### Engineering Anchors

**Q: What is an Engineering Anchor?**
> A: An Engineering Anchor is a named connection point exposed by a primitive where electrical conductors connect. Anchors are defined using normalized coordinates within the primitive's local coordinate system.

### Normalized Dimensions

**Q: Why are primitive dimensions normalized?**
> A: Normalized dimensions (Width=1, Height=1) ensure engineering knowledge is independent of pixels, screen resolution, and graphics engine. The same knowledge can render to SVG, DXF, CAD, HMI, or any graphics format.

### Physical Size

**Q: Who determines physical size?**
> A: The RENDERER determines physical size. Engineering knowledge defines geometry and relationships; the renderer applies scaling factors to produce actual pixels or units.

### Multi-Engine Rendering

**Q: Can the same engineering knowledge render to different graphics engines?**
> A: YES. Because engineering knowledge uses normalized coordinates and constraint relationships (not pixels), the same model renders correctly to SVG, DXF, Canvas, CAD, HMI, and printed drawings.

---

## 11. Implementation Notes

### 11.1 For Primitive Developers

When defining a new primitive:

```yaml
primitive: EarthSwitch
anchors:
  main:
    type: InputOutput
    position: { x: 0, y: 0 }  # Normalized
  ground:
    type: Output
    position: { x: 0, y: 1 }  # Normalized

constraints:
  - knife_angle_closed: 0_degrees
  - knife_angle_open: 40_degrees
  - knife_length: contact_gap + tolerance
```

### 11.2 For Renderer Developers

When rendering:

```yaml
# DO:
# 1. Read anchor positions (normalized)
# 2. Generate conductors between connected anchors
# 3. Apply scale factor for physical size
# 4. Route conductors appropriately

# DON'T:
# 1. Hard-code conductor positions
# 2. Manually draw conductor segments
# 3. Break anchor connections
# 4. Override constraints
```

---

## 12. Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-07-21 | Initial creation for EXP-013 |

---

## 13. Provenance

| Source | Reference | Date |
|--------|-----------|------|
| Lesson | EXP-013 | 2026-07-21 |
| Lessons | EXP-005, EXP-007, EXP-008, EXP-011, EXP-012 | 2026-07-21 |

---

*This knowledge artifact establishes the foundational Engineering Geometry Model that all primitives use for composition.*
