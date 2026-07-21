# Earthing Switch Primitive

**Knowledge ID**: KDE-PRIM-ES-001
**Title**: Earthing Switch Primitive — Engineering Knowledge
**Class**: DOMAIN
**Domain**: utility-sld
**Version**: 1.0.0
**Status**: DRAFT
**Confidence**: HIGH
**Evidence Level**: 4
**Owner**: KDE-EXPERT-SLD-001
**Created**: 2026-07-21T13:40:00Z
**Updated**: 2026-07-21T13:40:00Z
**Reviewed**: 2026-07-21
**Source Investigation**: EXP-008
**Evidence**:
  - KDE-PRIM-DS-001
  - KDE-UTILITY-SLD-SYMBOLS
  - KDE-UTILITY-SLD-COLORS
  - IEEE C37.2
  - IEC 60617

---

## Definition

An **Earthing Switch** (ES) is an inline grounding device that creates a visible connection between the protected circuit and earth ground. In a Single Line Diagram (SLD), it is represented as a rotating knife blade mechanism where the top end connects to the conductor and the bottom end connects to a grounding symbol. Unlike a disconnect switch, the earthing switch creates a deliberate fault path to ground for safety during maintenance.

---

## Summary

The Earthing Switch is a safety-critical grounding device installed to protect maintenance personnel by creating a visible ground connection. Its primary purpose is to discharge capacitive coupling voltages and provide a visible indication that equipment is safely grounded.

The earthing switch differs from the disconnect switch in its termination: while the disconnect switch's lower end connects to another conductor segment, the earthing switch's lower end connects to a ground symbol. This ground symbol represents the earth reference point.

When the earthing switch is CLOSED, the protected circuit is intentionally shorted to ground—creating a visible fault condition that any protection system will immediately detect and clear. This is intentional: it proves the circuit is de-energized and safe for maintenance.

In SLD rendering, the earthing switch appears similar to a disconnect switch but with a ground symbol at the bottom instead of a conductor. The knife blade behavior is identical: rotates from inline (closed) to angled (open).

---

## 1. Engineering Concept

### 1.1 What is an Earthing Switch?

An earthing switch is a mechanical switching device designed to:

1. **Provide visible grounding** — create observable connection to earth
2. **Discharge capacitive coupling** — eliminate dangerous voltages on de-energized lines
3. **Confirm de-energization** — prove circuit is safe for maintenance
4. **Prevent accidental energization** — ground fault will trip upstream protection

**Critical limitation**: Earthing switches shall only be operated when the associated circuit is de-energized. Closing an earthing switch on an energized circuit creates a bolted fault.

### 1.2 Why Does an Earthing Switch Exist?

Earthing switches exist for **maintenance safety**:

| Problem | Solution |
|---------|----------|
| De-energized lines can retain dangerous capacitive voltage | Ground connection bleeds off charge |
| Workers need confirmation of safe condition | Visible ground connection provides proof |
| Accidental re-energization is a hazard | Ground fault trips protection immediately |
| Induced voltages from adjacent lines | Ground provides voltage reference |

### 1.3 Earthing Switch vs. Disconnect Switch

| Characteristic | Earthing Switch | Disconnect Switch |
|----------------|-----------------|-------------------|
| **Primary Purpose** | Visible grounding | Visible isolation |
| **Lower Termination** | Ground symbol | Conductor segment |
| **Closed State Effect** | Creates fault to ground | Creates isolation gap |
| **Safety Implication** | Intentional grounding | Physical isolation |
| **Protection Response** | Immediate trip | No trip (already de-energized) |

---

## 2. Primitive Classification

### 2.1 Inline Grounding Device

The earthing switch is classified as an **inline grounding device**. This means:

| Property | Value | Rationale |
|----------|-------|-----------|
| **Orientation** | Vertical (standard) | Knife rotates in plane perpendicular to view |
| **Anchor Count** | 1 (top) + Ground | Top conductor + ground reference |
| **Anchor Position** | Top-center | Conductor connection at top |
| **Ground Connection** | Fixed at bottom | Ground symbol always visible |

### 2.2 Relationship to Other Devices

The earthing switch is typically found adjacent to disconnect switches:

```
Busbar ═════════════════════════════════════
          │
    [DISCONNECT SWITCH]
          │
          ▼
    ═══════════════════════════════  ← Equipment isolated
          │
    [EARTHING SWITCH] ─── ⊥  ← Ground connection
```

**Typical Arrangement**:
1. Disconnect switch isolates the equipment
2. Earthing switch grounds the isolated segment
3. Combined: isolation + grounding = safe for maintenance

### 2.3 Immutable vs. Mutable Properties

**Immutable Properties**:

| Property | Type | Description |
|----------|------|-------------|
| `equipment_id` | String | Unique identifier (e.g., "ES-115-A1-F1") |
| `voltage_class` | Enum | kV level (e.g., 115, 345) |
| `position` | Coordinate | X,Y location on diagram |
| `orientation` | Enum | VERTICAL (only valid orientation) |
| `knife_length` | Float | Physical blade length |
| `ground_symbol` | Fixed | Always present at bottom |
| `knife_color_closed` | Color | Color when closed (typically black/yellow) |
| `knife_color_open` | Color | Color when open (typically green) |

**Mutable Properties**:

| Property | Type | Values | Default |
|----------|------|--------|---------|
| `status` | Enum | CLOSED, OPEN, UNKNOWN | OPEN |
| `knife_angle` | Float | 0° (closed), 35-45° (open) | 45° |
| `selected` | Boolean | true, false | false |

---

## 3. Geometry Specification

### 3.1 Component Geometry

The Earthing Switch consists of:

```
           TOP CONDUCTOR (inherited color)
                    │
                    ▼
            ┌───────────────┐
            │  Fixed Contact│
            └───────┬───────┘
                    │
                    │
              KNIFE BLADE  ← Rotates from center
                    │
                    │
            ┌───────┴───────┐
            │ Ground Symbol │
            │      ⊥        │
            └───────────────┘
```

**Component Definitions**:

| Component | Description | Immutable |
|----------|-------------|-----------|
| **Top Conductor** | Incoming electrical connection | Yes |
| **Fixed Contact** | Stationary contact point at top | Yes |
| **Knife Blade** | Single straight conductor that bridges contact to ground | Yes (position changes) |
| **Ground Symbol** | Fixed earth reference | Yes |
| **Ground Conductor** | Connection from ground symbol to knife | Yes |

### 3.2 Anchor Position

```
TOP ANCHOR (X, Y_top)
        │
        │
        ▼
    ═══════════════  ← Top conductor segment
        │
        │  ← Fixed contact
        │
        │  KNIFE BLADE  (rotates)
        │
        │  ← Ground conductor
        │
        ⊥  GROUND SYMBOL  (fixed)
```

**Anchor Coordinates**:
- Top Anchor: `(X, Y - height/2)` — Conductor connection
- Ground Reference: `(X, Y_bottom)` — Fixed ground symbol

### 3.3 Knife Blade Geometry

| Parameter | Value | Notes |
|-----------|-------|-------|
| **Blade Width** | 4-6px at 100% zoom | Thin conductor stroke |
| **Blade Length** | Spans from top contact to ground symbol | Fixed length |
| **Blade Color (Closed)** | Black (#000000) | Standard ground indication |
| **Blade Color (Open)** | Green (#44FF44) | Indicates open state |
| **Rotation Angle (Closed)** | 0° | Inline vertical, touching ground |
| **Rotation Angle (Open)** | 35-45° | Center rotation, breaks ground connection |
| **Pivot** | Center of blade | Conceptual rotation point |

**Blade Behavior by State**:
- **CLOSED**: Blade is a straight vertical line connecting top contact to ground. Circuit is grounded.
- **OPEN**: Blade rotates 40° about its center. No connection to ground.
- **UNKNOWN**: Blade not rendered. Only conductor and ground symbol visible.

---

## 4. Electrical Representation

### 4.1 Standard Symbols

#### IEC 60617 Symbol
```
  │
  ├─
  │
  ⊥
```

#### SCADA Implementation
```svg
<!-- Open Earthing Switch -->
<g id="ES-open">
  <!-- Conductor -->
  <line x1="100" y1="0" x2="100" y2="90" stroke="black" stroke-width="4"/>
  
  <!-- Fixed Contact -->
  <line x1="85" y1="90" x2="115" y2="90" stroke="black" stroke-width="3"/>
  
  <!-- Knife Blade (angled 40°) -->
  <line x1="64" y1="107" x2="136" y2="193" stroke="#44FF44" stroke-width="5"/>
  
  <!-- Ground Conductor -->
  <line x1="100" y1="210" x2="100" y2="230" stroke="black" stroke-width="4"/>
  
  <!-- Ground Symbol -->
  <g transform="translate(100, 245)">
    <line x1="0" y1="-15" x2="0" y2="0" stroke="black" stroke-width="4"/>
    <line x1="-12" y1="-5" x2="12" y2="-5" stroke="black" stroke-width="3"/>
    <line x1="-8" y1="0" x2="8" y2="0" stroke="black" stroke-width="3"/>
    <line x1="-4" y1="5" x2="4" y2="5" stroke="black" stroke-width="3"/>
  </g>
</g>

<!-- Closed Earthing Switch -->
<g id="ES-closed">
  <!-- Conductor -->
  <line x1="100" y1="0" x2="100" y2="90" stroke="black" stroke-width="4"/>
  
  <!-- Fixed Contact -->
  <line x1="85" y1="90" x2="115" y2="90" stroke="black" stroke-width="3"/>
  
  <!-- Knife Blade (inline) -->
  <line x1="100" y1="94" x2="100" y2="206" stroke="#000000" stroke-width="5"/>
  
  <!-- Ground Conductor -->
  <line x1="100" y1="206" x2="100" y2="230" stroke="black" stroke-width="4"/>
  
  <!-- Ground Symbol -->
  <g transform="translate(100, 245)">
    <line x1="0" y1="-15" x2="0" y2="0" stroke="black" stroke-width="4"/>
    <line x1="-12" y1="-5" x2="12" y2="-5" stroke="black" stroke-width="3"/>
    <line x1="-8" y1="0" x2="8" y2="0" stroke="black" stroke-width="3"/>
    <line x1="-4" y1="5" x2="4" y2="5" stroke="black" stroke-width="3"/>
  </g>
</g>
```

### 4.2 State Indication Matrix

| State | Knife Position | Knife Color | Ground Connected | Rendering |
|-------|---------------|-------------|------------------|-----------|
| OPEN | 35-45° from vertical | Green (#44FF44) | No | Blade clearly angled |
| CLOSED | 0° (inline) | Black (#000000) | Yes | Blade aligned with conductor |
| UNKNOWN | Not rendered | — | Unknown | No blade visible |

### 4.3 Ground Symbol Specification

The ground symbol consists of:

```
    │  ← Vertical line (4px)
   ────  ← Horizontal line 1 (3px, width 24px)
   ────  ← Horizontal line 2 (3px, width 16px)
    ──  ← Horizontal line 3 (3px, width 8px)
```

---

## 5. State Machine

### 5.1 Valid States

```
                    ┌──────────────┐
                    │    OPEN      │
                    │(Green blade) │
                    └──────┬───────┘
                           │
                           │
                    Close command
                    (after isolation verified)
                           │
                           ▼
                    ┌──────────────┐
                    │   CLOSED     │
                    │(Black blade) │
                    └──────┬───────┘
                           │
                           │
                    Open command
                    (for isolation)
                           │
                           ▼
```

### 5.2 State Transition Rules

| From | To | Precondition | Authority |
|------|----|--------------|-----------|
| OPEN | CLOSED | Circuit must be de-energized/isolated | Operator |
| CLOSED | OPEN | Any | Operator |
| ANY | UNKNOWN | Position feedback failure | System |

**Warning**: Closing an earthing switch on an energized circuit creates a bolted fault that will cause severe damage and system instability.

---

## 6. Composition Patterns

### 6.1 With Disconnect Switch

The earthing switch is typically paired with a disconnect switch:

```
Busbar ═══════════════════════════════════════════════════════
              │
        [DISCONNECT SWITCH]  ← Isolation first
              │
              ▼
        ═══════════════════════════════════  ← Equipment isolated
              │
              ├→ [EARTHING SWITCH] ── ⊥  ← Grounding
              │
              ▼
        Equipment
```

**Operating Sequence**:
1. Open disconnect switch (isolates equipment)
2. Close earthing switch (grounds isolated segment)
3. Equipment is now safe for maintenance

### 6.2 With Circuit Breaker

For transformer protection:

```
115kV Bus ═══════════════════════════════════
              │
        [CIRCUIT BREAKER]  ← Protection
              │
              ▼
        ════════════════════════ 115kV Transformer
              │
              ├→ [EARTHING SWITCH] ── ⊥  ← Transformer grounding
              │
              ▼
        [LOWER CIRCUIT BREAKER]
```

---

## 7. Rendering Specifications

### 7.1 Open State Rendering

```svg
<!-- Open Earthing Switch -->
<g id="ES-open">
  <!-- Conductor -->
  <line x1="100" y1="0" x2="100" y2="90" stroke="black" stroke-width="4"/>
  
  <!-- Fixed Contact -->
  <line x1="85" y1="90" x2="115" y2="90" stroke="black" stroke-width="3"/>
  
  <!-- Knife Blade (angled 40° about center) -->
  <!-- Length=56, center=(100,150) -->
  <!-- Top end: (100-36, 150-43) = (64, 107) -->
  <!-- Bottom end: (100+36, 150+43) = (136, 193) -->
  <line x1="64" y1="107" x2="136" y2="193" 
        stroke="#44FF44" stroke-width="5" stroke-linecap="round"/>
  
  <!-- Ground Conductor -->
  <line x1="100" y1="210" x2="100" y2="230" stroke="black" stroke-width="4"/>
  
  <!-- Ground Symbol -->
  <line x1="100" y1="230" x2="100" y2="245" stroke="black" stroke-width="4"/>
  <line x1="88" y1="245" x2="112" y2="245" stroke="black" stroke-width="3"/>
  <line x1="92" y1="252" x2="108" y2="252" stroke="black" stroke-width="3"/>
  <line x1="96" y1="259" x2="104" y2="259" stroke="black" stroke-width="3"/>
</g>
```

**Visual Characteristics**:
- Knife clearly angled away from vertical (40°)
- Green color indicates open state (not grounded)
- Visible gap between blade and ground conductor
- Ground symbol always visible at bottom

### 7.2 Closed State Rendering

```svg
<!-- Closed Earthing Switch -->
<g id="ES-closed">
  <!-- Conductor -->
  <line x1="100" y1="0" x2="100" y2="90" stroke="black" stroke-width="4"/>
  
  <!-- Fixed Contact -->
  <line x1="85" y1="90" x2="115" y2="90" stroke="black" stroke-width="3"/>
  
  <!-- Knife Blade (inline - connecting to ground) -->
  <!-- Ends at y=206, just above ground conductor at y=210 -->
  <line x1="100" y1="94" x2="100" y2="206" 
        stroke="#000000" stroke-width="5" stroke-linecap="round"/>
  
  <!-- Ground Conductor -->
  <line x1="100" y1="210" x2="100" y2="230" stroke="black" stroke-width="4"/>
  
  <!-- Ground Symbol -->
  <line x1="100" y1="230" x2="100" y2="245" stroke="black" stroke-width="4"/>
  <line x1="88" y1="245" x2="112" y2="245" stroke="black" stroke-width="3"/>
  <line x1="92" y1="252" x2="108" y2="252" stroke="black" stroke-width="3"/>
  <line x1="96" y1="259" x2="104" y2="259" stroke="black" stroke-width="3"/>
</g>
```

**Visual Characteristics**:
- Knife aligned with conductor (0° angle)
- Black color indicates closed state (grounded)
- Blade connects through to ground conductor
- Ground symbol visible at bottom

### 7.3 Unknown State Rendering

```svg
<!-- Unknown State Earthing Switch -->
<g id="ES-unknown">
  <!-- Conductor -->
  <line x1="100" y1="0" x2="100" y2="90" stroke="black" stroke-width="4"/>
  
  <!-- Fixed Contact -->
  <line x1="85" y1="90" x2="115" y2="90" stroke="black" stroke-width="3"/>
  
  <!-- Knife Blade: NOT RENDERED -->
  <!-- Absence indicates unknown state -->
  
  <!-- Ground Conductor -->
  <line x1="100" y1="210" x2="100" y2="230" stroke="black" stroke-width="4"/>
  
  <!-- Ground Symbol (always visible) -->
  <line x1="100" y1="230" x2="100" y2="245" stroke="black" stroke-width="4"/>
  <line x1="88" y1="245" x2="112" y2="245" stroke="black" stroke-width="3"/>
  <line x1="92" y1="252" x2="108" y2="252" stroke="black" stroke-width="3"/>
  <line x1="96" y1="259" x2="104" y2="259" stroke="black" stroke-width="3"/>
</g>
```

**Visual Characteristics**:
- No knife blade rendered
- Only fixed contact, conductor, and ground symbol visible
- Ground symbol always present (ES always terminates at ground)

---

## 8. Validation Rules

### 8.1 Rendering Validation

| Rule ID | Rule | Validation Method |
|---------|------|-------------------|
| ES-001 | ES must be vertical orientation | Rotation angle = 90° or orientation = VERTICAL |
| ES-002 | Knife must be centered on anchor axis | Blade rotation axis at X coordinate |
| ES-003 | Top anchor at conductor connection | Y_top is highest point |
| ES-004 | Ground symbol at bottom | Always rendered |
| ES-005 | Open knife angle must be 35-45° | Angle check |
| ES-006 | Closed knife angle must be 0° | Blade inline with conductor |
| ES-007 | Equipment ID label required | Label exists and non-empty |
| ES-008 | Knife is NOT rendered in UNKNOWN state | Element presence check |

### 8.2 State Consistency Validation

| Rule ID | Rule | Validation Method |
|---------|------|-------------------|
| ES-020 | Open state requires green knife | Fill color #44FF44 |
| ES-021 | Closed state requires black knife | Fill color #000000 |
| ES-022 | Unknown state requires no knife | Element not present |
| ES-023 | Ground symbol always rendered | Element present in all states |

### 8.3 Connection Validation

| Rule ID | Rule | Validation Method |
|---------|------|-------------------|
| ES-030 | ES must have 1 top connection | Connection to conductor or bus |
| ES-031 | ES must terminate at ground | Ground symbol present |
| ES-032 | Knife length must reach ground | Length covers contact-to-ground distance |

---

## 9. Knowledge Assessment

The expert who has absorbed this knowledge can correctly answer:

### Conceptual Questions

**Q: What is an Earthing Switch?**
> A: An inline grounding device that creates a visible connection between a protected circuit and earth ground. It consists of a rotating knife blade where the top connects to the conductor and the bottom connects to a ground symbol. When closed, it intentionally grounds the circuit for maintenance safety.

**Q: How does an Earthing Switch differ from a Disconnect Switch?**
> A: The disconnect switch's lower end connects to another conductor segment (creating isolation), while the earthing switch's lower end connects to a ground symbol (creating a ground connection). The DS breaks the circuit; the ES creates a fault path to ground.

### State Questions

**Q: What changes between OPEN and CLOSED states?**
> A: Only the knife blade position and color change:
> - **OPEN**: Knife rotates 35-45°, green color, no ground connection
> - **CLOSED**: Knife inline (0°), black color, ground connected

**Q: How is UNKNOWN state rendered?**
> A: The knife blade is NOT rendered. Only the conductor, fixed contact, and ground symbol are visible.

### Geometry Questions

**Q: What components are immutable?**
> A: Top conductor, fixed contact position, knife blade dimensions, ground symbol (always present), ground conductor.

**Q: What is always visible regardless of state?**
> A: The ground symbol at the bottom. Unlike a disconnect switch which has a symmetric conductor on both ends, the earthing switch always terminates at ground.

---

## 10. Related Knowledge

| Document | Relationship | Notes |
|----------|--------------|-------|
| KDE-PRIM-DS-001 | Similar primitive | Shares knife blade mechanism |
| KDE-PRIM-CB-001 | Adjacent primitive | Circuit breaker provides isolation |
| KDE-UTILITY-SLD-SYMBOLS | Parent standard | Defines ES symbol |
| KDE-UTILITY-SLD-COLORS | Parent standard | Defines state colors |

---

## 11. External Sources

| Source | Name | Citation |
|--------|------|----------|
| Standard | IEEE C37.2 | IEEE Standard for Electrical Power System Device Function Numbers |
| Standard | IEC 60617 | IEC International Standard for Graphical Symbols for Diagrams |
| Standard | IEC 62271-102 | High-voltage switchgear - Earthing switches |
| Publication | IEC 61936-1 | Power installations exceeding 1 kV AC |

---

## 12. Confidence Assessment

| Factor | Assessment | Rationale |
|--------|------------|-----------|
| Evidence Quality | HIGH | Based on IEEE/IEC standards + DS similarity |
| Reproducibility | HIGH | Symbol conventions standardized |
| Consistency | HIGH | Consistent with DS geometry; no contradictions |

**Overall Confidence**: HIGH

---

## 13. Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2026-07-21 | Initial draft for EXP-008 | KDE-EXPERT-SLD-001 |

---

## 14. Provenance

| Source | Reference | Date |
|--------|-----------|------|
| Investigation | EXP-008 | 2026-07-21 |
| Disconnect Switch | KDE-PRIM-DS-001 | 2026-07-21 |
| Symbols Knowledge | KDE-UTILITY-SLD-SYMBOLS | 2026-07-21 |
| Colors Knowledge | KDE-UTILITY-SLD-COLORS | 2026-07-21 |
| IEEE Standard | IEEE C37.2 | 2008 |
| IEC Standard | IEC 60617 | 2013 |

---

*This knowledge artifact teaches the engineering fundamentals of the Earthing Switch primitive for accurate SLD rendering and composition.*
