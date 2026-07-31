# NGCP Bus Voltage Profile

**Knowledge ID**: KDE-VOLTAGE-NGCP-001
**Title**: NGCP Bus Voltage Profile — Engineering Knowledge
**Class**: DOMAIN
**Domain**: bus-voltage
**Version**: 1.0.0
**Status**: APPROVED
**Confidence**: HIGH
**Evidence Level**: 5
**Owner**: KDE-EXPERT-SLD-001
**Created**: 2026-07-21T14:15:00Z
**Updated**: 2026-07-21T14:15:00Z
**Reviewed**: 2026-07-21
**Source Investigation**: EXP-010
**Evidence**:
  - NGCP Engineering Standard, Section 20
  - NGCP Color Coding for drawings, displays and documentation

---

## Definition

The **Bus Voltage Profile** defines the color mapping between nominal voltage levels and their visual representation in Single Line Diagrams (SLD). Utilities adopt standardized voltage-color mappings to ensure consistency across all engineering drawings, SCADA displays, and documentation.

The **NGCP Voltage Profile** is a specific mapping standard adopted by utilities operating under or aligned with NGCP (National Grid Corporation of the Philippines) engineering guidelines.

---

## Summary

The Bus Voltage Profile is a lookup table that determines the color of a Bus based on its nominal voltage. This profile is owned by the Bus primitive — all connected conductors, breakers, switches, and other devices inherit the Bus color rather than defining their own.

**Key Principle**: The Bus owns conductor color. All connected elements inherit this color. No device may override the Bus color.

---

## 1. Engineering Concept

### 1.1 Why Voltage Color Profiles Exist

Voltage color profiles exist for:

| Purpose | Rationale |
|---------|-----------|
| **Visual Identification** | Engineers can instantly identify voltage levels on complex diagrams |
| **Safety** | Quick recognition of high-voltage equipment |
| **Consistency** | Standardization across all utility drawings |
| **SCADA Integration** | Consistent color rendering in control systems |
| **Training** | Familiarity reduces errors during operations |

### 1.2 Color Inheritance Model

```
┌─────────────────────────────────────┐
│           BUS (Owner)               │
│  Color determined by voltage level   │
└───────────────┬─────────────────────┘
                │
                │ Inherits to:
                ▼
    ┌───────────┼───────────────┐
    │           │               │
    ▼           ▼               ▼
┌───────┐  ┌─────────┐  ┌─────────────┐
│Conductor│  │ Breaker  │  │ Disconnect  │
│(color) │  │(color)  │  │  (color)   │
└───────┘  └─────────┘  └─────────────┘
```

**Rule**: The Bus determines the conductor color. All connected devices display this color.

---

## 2. NGCP Voltage Profile Specification

### 2.1 Voltage-to-Color Mapping

| Voltage Level | Color Name | Hex Code | Visual |
|---------------|------------|----------|--------|
| 500 kV | Blue | `#0000FF` | ██████ |
| 350 kV DC | Chocolate Brown | `#4C0000` | ██████ |
| 230 kV | Red | `#FF0000` | ██████ |
| 138 kV | Coral | `#FF7F50` | ██████ |
| 115 kV | Yellow-Orange | `#FFBF00` | ██████ |
| 69 kV | Cyan | `#00FFFF` | ██████ |
| 34.5 kV | Dark Green | `#006400` | ██████ |
| 24–16 kV | Green | `#00FF00` | ██████ |
| 15–4 kV | Violet | `#6600CC` | ██████ |
| 3 kV–600 V | Brown-Orange | `#D46138` | ██████ |

### 2.2 Color Categories

| Category | Voltages | Colors |
|----------|----------|--------|
| **Extra High Voltage (EHV)** | ≥ 230 kV | Blue, Red |
| **High Voltage (HV)** | 69–138 kV | Cyan, Coral |
| **Medium Voltage (MV)** | 4–34.5 kV | Dark Green, Green, Violet |
| **Low Voltage (LV)** | ≤ 3 kV | Brown-Orange |

---

## 3. Rendering Implementation

### 3.1 Bus Color Determination

The Bus color is determined by matching its `nominal_voltage` property against the NGCP profile:

```javascript
const NGCP_VOLTAGE_PROFILE = {
  '500kV':   { color: '#0000FF', name: 'Blue' },
  '350kV':   { color: '#4C0000', name: 'Chocolate Brown' },
  '230kV':   { color: '#FF0000', name: 'Red' },
  '138kV':   { color: '#FF7F50', name: 'Coral' },
  '115kV':   { color: '#FFBF00', name: 'Yellow-Orange' },
  '69kV':    { color: '#00FFFF', name: 'Cyan' },
  '34.5kV':  { color: '#006400', name: 'Dark Green' },
  '24kV':    { color: '#00FF00', name: 'Green' },
  '15kV':    { color: '#6600CC', name: 'Violet' },
  '3kV':     { color: '#D46138', name: 'Brown-Orange' }
};

function getBusColor(nominalVoltage) {
  // Match voltage to profile
  // Return hex color
}
```

### 3.2 Color Inheritance Example

```svg
<!-- 115kV Bus -->
<g id="bus-115kV">
  <rect x="50" y="50" width="300" height="10" fill="#FFBF00"/>
</g>

<!-- Connected Conductor inherits #FFBF00 -->
<g id="conductor">
  <line x1="50" y1="55" x2="50" y2="100" stroke="#FFBF00" stroke-width="4"/>
</g>

<!-- Breaker inherits #FFBF00 -->
<g id="breaker">
  <rect x="45" y="100" width="10" height="40" fill="#FFBF00"/>
</g>
```

---

## 4. Rendering Rules

### 4.1 Color Ownership Hierarchy

```
1. BUS (Owner)
   └── Determines base color from voltage profile
   
2. CONDUCTOR (Inherits)
   └── Always uses Bus color
   
3. BREAKER/SWITCH (Inherits)
   └── Conductor segments use Bus color
   └── Mechanism parts (arc, status indicators) may have state colors
   
4. OTHER DEVICES (Inherit)
   └── CT, PT, Transformer windings inherit Bus color
```

### 4.2 What Devices May NOT Do

| Device | May NOT Override Bus Color |
|--------|--------------------------|
| Circuit Breaker | Conductor color must match Bus |
| Disconnect Switch | Knife color is state indicator only; conductor inherits Bus |
| Earthing Switch | Ground conductor inherits Bus color |
| Current Transformer | Windings inherit Bus color |
| Potential Transformer | Windings inherit Bus color |

### 4.3 State Colors vs. Bus Color

**State Colors** (for mechanisms, not conductors):
- Breaker OPEN indicator: Green arc
- Breaker TRIPPED: Flashing red
- Switch OPEN knife: Green
- Switch CLOSED knife: Red

**Bus Color** (for all conductors):
- All conductors connected to the same Bus must display the same color
- This color is determined by the Bus nominal voltage

---

## 5. Common Voltage Scenarios

### 5.1 Transmission Substation (230kV)

```
230kV Bus (Red #FF0000)
    │
    ├── Circuit Breaker (#FF0000)
    │       │
    │       ├── Disconnect Switch (#FF0000)
    │       │       │
    │       │       └── 230kV Line
    │       │
    │       └── Transformer Connection
    │
    └── Transformer (230/115kV)
            │
            └── 115kV Bus (Yellow-Orange #FFBF00)
```

### 5.2 Distribution Substation (34.5kV)

```
34.5kV Bus (Dark Green #006400)
    │
    ├── Circuit Breaker (#006400)
    │       │
    │       └── 34.5kV Feeder
    │
    └── Transformer (34.5/4.16kV)
            │
            └── 4.16kV Bus (Green #00FF00)
                    │
                    └── 4.16kV Feeders
```

---

## 6. Validation Rules

### 6.1 Color Consistency Validation

| Rule ID | Rule | Validation Method |
|---------|------|-------------------|
| NGCP-001 | All conductors at same voltage must have same color | Compare hex values |
| NGCP-002 | Bus color must match NGCP profile for voltage | Lookup table validation |
| NGCP-003 | Breaker conductor must inherit Bus color | Check breaker stroke/fill |
| NGCP-004 | Switch conductor must inherit Bus color | Check knife base color |

### 6.2 Voltage Profile Validation

| Rule ID | Rule | Validation Method |
|---------|------|-------------------|
| NGCP-010 | 500kV must be rendered in Blue (#0000FF) | Exact color match |
| NGCP-011 | 230kV must be rendered in Red (#FF0000) | Exact color match |
| NGCP-012 | 115kV must be rendered in Yellow-Orange (#FFBF00) | Exact color match |
| NGCP-013 | 69kV must be rendered in Cyan (#00FFFF) | Exact color match |

---

## 7. Knowledge Assessment

The expert who has absorbed this knowledge can correctly answer:

### Conceptual Questions

**Q: What is a Bus Voltage Profile?**
> A: A standardized mapping that defines which color represents each voltage level in SLDs. It allows engineers to instantly identify voltage levels by color.

**Q: Why do utilities use voltage color profiles?**
> A: For visual identification of voltage levels, safety awareness (high-voltage quick recognition), consistency across all drawings, and SCADA integration.

### Ownership Questions

**Q: Which object owns conductor color?**
> A: The Bus owns conductor color. It determines the color based on its nominal voltage from the voltage profile. All connected conductors and devices inherit this color.

**Q: Can a Circuit Breaker override the Bus color?**
> A: No. The breaker conductor (when closed) must display the Bus color. Only mechanism indicators (like OPEN arc) may show state colors.

### Specific Voltage Questions

**Q: What color represents a 69 kV Bus?**
> A: Cyan (#00FFFF)

**Q: What color represents a 230 kV Bus?**
> A: Red (#FF0000)

**Q: What color represents a 115 kV Bus?**
> A: Yellow-Orange (#FFBF00)

**Q: What color represents a 34.5 kV Bus?**
> A: Dark Green (#006400)

### Profile Questions

**Q: Can another utility provide a different voltage profile?**
> A: Yes. While NGCP defines one standard, other utilities (PES, Meralco, local cooperatives) may adopt different profiles. Always verify the applicable standard for the specific project or utility.

---

## 8. Related Knowledge

| Document | Relationship | Notes |
|----------|--------------|-------|
| KDE-PRIM-BUS-001 | Parent primitive | Bus is the color owner |
| KDE-PRIM-CB-001 | Inherits color | CB conductor inherits Bus color |
| KDE-PRIM-DS-001 | Inherits color | DS conductor inherits Bus color |
| KDE-PRIM-ES-001 | Inherits color | ES conductor inherits Bus color |

---

## 9. External Sources

| Source | Name | Citation |
|--------|------|----------|
| Utility Standard | NGCP Engineering Standard | Section 20, Color Coding |
| Standard | NGCP Voltage Level Color Coding | Drawings, displays, documentation |

---

## 10. Confidence Assessment

| Factor | Assessment | Rationale |
|--------|------------|-----------|
| Evidence Quality | HIGH | Official utility standard |
| Reproducibility | HIGH | Standardized mapping |
| Consistency | HIGH | Consistent with industry practices |

**Overall Confidence**: HIGH

---

## 11. Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2026-07-21 | Initial creation for EXP-010 | KDE-EXPERT-SLD-001 |

---

## 12. Provenance

| Source | Reference | Date |
|--------|-----------|------|
| Investigation | EXP-010 | 2026-07-21 |
| Utility Standard | NGCP Engineering Standard Section 20 | 2026-07-21 |

---

*This knowledge artifact teaches the NGCP Bus Voltage Profile for accurate color rendering in Single Line Diagrams.*
