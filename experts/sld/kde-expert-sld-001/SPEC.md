# SLD Engineering Expert

**Expert ID**: KDE-EXPERT-SLD-001
**Version**: 1.0.0
**Status**: SYNTHESIZED
**Domain**: utility-sld
**Created**: 2026-07-21
**Source**: EXP-005, EXP-007, EXP-008, EXP-010, EXP-011, EXP-012, EXP-013, EXP-014

---

## Purpose

Generates, validates, renders, and reasons about Single Line Diagrams (SLD) for utility-grade SCADA systems. Specializes in electrical primitives including circuit breakers, disconnect switches, busbars, conductors, and transformers.

---

## Scope

### Owns
- SLD engineering decisions
- Primitive rendering (circuit breaker, disconnect switch, earthing switch, busbar, conductor, transformer)
- Substation layout and composition
- State visualization and animation
- SLD validation rules

### Does Not Own
- GIS engineering decisions (KDE-EXPERT-GIS-001)
- Physical electrical calculations
- Protection coordination settings
- Hardware specifications

---

## Capabilities

### Primitives: Circuit Breaker
**Question Answered**: How do I render and reason about a circuit breaker?

| ID | Name | Description | Inputs | Output |
|----|------|-------------|--------|--------|
| sld-cb-render | Render CB | Render breaker with correct state colors | config, state | SVG element |
| sld-cb-state | State Management | Track CLOSED/OPEN/TRIPPED/UNKNOWN | device_id, state | updated config |
| sld-cb-validate | Validation | Verify geometry and color rules | svg_element | validation result |

### Primitives: Disconnect Switch
**Question Answered**: How do I render and reason about a disconnect switch?

| ID | Name | Description | Inputs | Output |
|----|------|-------------|--------|--------|
| sld-ds-render | Render DS | Render switch with rotating knife | config, state | SVG element |
| sld-ds-geometry | Geometry | Apply knife switch rules (hinge, gap, angle) | config | geometry |
| sld-ds-validate | Validation | Verify knife angle, color, and topology | svg_element | validation result |

### Primitives: Earthing Switch
**Question Answered**: How do I render and reason about an earthing switch?

| ID | Name | Description | Inputs | Output |
|----|------|-------------|--------|--------|
| sld-es-render | Render ES | Render switch with ground symbol | config, state | SVG element |
| sld-es-topology | Topology | Apply branch topology rules | network_config | topology |
| sld-es-validate | Validation | Verify ground connection and topology | svg_element | validation result |

### Primitives: Busbar
**Question Answered**: How do I render and reason about busbars?

| ID | Name | Description | Inputs | Output |
|----|------|-------------|--------|--------|
| sld-bus-render | Render Bus | Render busbar with voltage color | config, voltage | SVG element |
| sld-bus-color | Color Profile | Apply voltage-based color scheme | voltage_level | color |
| sld-bus-validate | Validation | Verify voltage-color mapping | svg_element | validation result |

### Composition: Substation
**Question Answered**: How do I compose primitives into substations?

| ID | Name | Description | Inputs | Output |
|----|------|-------------|--------|--------|
| sld-sub-layout | Bay Layout | Arrange primitives in standard patterns | primitive_list, layout_type | layout |
| sld-sub-connect | Connections | Connect breakers, switches, transformers | layout | network |
| sld-sub-validate | Topology | Verify feeder topology correctness | network | validation result |

### Visualization: State
**Question Answered**: How do I visualize and animate device states?

| ID | Name | Description | Inputs | Output |
|----|------|-------------|--------|--------|
| sld-state-animate | Animation | Animate state transitions | device_list, animation_config | animated_svg |
| sld-state-colors | Color Rules | Apply state-based coloring | state, device_type | color |
| sld-state-validate | Consistency | Verify state consistency | device_list | validation result |

---

## Knowledge Dependencies

| Knowledge ID | Purpose | Status |
|-------------|---------|--------|
| KDE-PRIM-CB-001 | Circuit Breaker primitive definition | REQUIRED |
| KDE-PRIM-DS-001 | Disconnect Switch primitive definition | REQUIRED |
| KDE-PRIM-ES-001 | Earthing Switch primitive definition | REQUIRED |
| KDE-GEOM-KNIFE-001 | Knife switch geometry (shared) | REQUIRED |
| KDE-VOLTAGE-NGCP-001 | Bus voltage profile (NGCP) | REQUIRED |
| KDE-UTILITY-SLD-SYMBOLS | Symbol conventions | REQUIRED |
| KDE-UTILITY-SLD-COLORS | Color conventions | REQUIRED |

---

## Confidence Rules

| Condition | Confidence | Rationale |
|-----------|-------------|-----------|
| Within single primitive scope | HIGH | Direct knowledge available |
| Cross-primitive composition (standard topology) | HIGH | Topology rules well-defined |
| Novel configuration (non-standard) | MEDIUM | Less confidence in untested layouts |
| Missing knowledge dependency | LOW | Cannot verify correctness |
| Validation warnings present | MEDIUM | Knowledge may be incomplete |
| Contains internal contradictions | LOW | Knowledge integrity issue |

---

## Interface Contract

### Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| task | string | Yes | Task description ("Render CB-101", "Validate bay layout") |
| action | string | Yes | Action type (render, validate, compose, analyze) |
| context | object | No | Execution context (domain, voltage_level, layout_type) |
| primitives | array | No | List of primitives for composition |
| knowledge_refs | array | No | Specific knowledge IDs to use |

### Outputs

| Parameter | Type | Description |
|-----------|------|-------------|
| result | object | Expert output (SVG, decisions, etc.) |
| confidence | HIGH/MEDIUM/LOW | Output confidence |
| decisions | array | Engineering decisions made |
| validation | object | Validation results |
| metadata | object | Expert metadata |

### Errors

| Code | Condition | Response |
|------|-----------|----------|
| E001 | Insufficient context | Request more info |
| E002 | Unknown primitive type | Return error with details |
| E003 | Validation failure | Return validation report with issues |
| E004 | Knowledge missing | Return error, suggest knowledge creation |

---

## Examples

### Example 1: Render Circuit Breaker

**Input:**
```yaml
task: "Render circuit breaker CB-101"
action: render
context:
  domain: utility-sld
  voltage_level: 115kV
primitives:
  - type: circuit-breaker
    id: CB-101
    state: CLOSED
    position: [100, 100]
knowledge_refs:
  - KDE-PRIM-CB-001
  - KDE-VOLTAGE-NGCP-001
```

**Output:**
```yaml
result:
  type: svg_element
  content: "<g id='CB-101'>...</g>"
confidence: HIGH
decisions:
  - "Applied red fill (#FF4444) for CLOSED state"
  - "Inherited #FF0000 color from 115kV bus profile"
  - "Rendered filled rectangle per CB convention"
validation:
  - rule: CB-001
    status: PASS
    message: "Breaker rendered correctly"
  - rule: CB-002
    status: PASS
    message: "State color correct"
metadata:
  expert: KDE-EXPERT-SLD-001
  version: 1.0.0
```

### Example 2: Compose Substation Bay

**Input:**
```yaml
task: "Compose standard feeder bay"
action: compose
context:
  layout_type: feeder-bay
  voltage_level: 115kV
  breaker_id: CB-101
  switches:
    - DS-101A
    - DS-101B
  earth_switch: ES-101
```

**Output:**
```yaml
result:
  type: substation_bay
  svg: "<svg>...</svg>"
  topology:
    type: feeder-bay
    voltage: 115kV
    devices: [DS-101A, CB-101, DS-101B, ES-101]
confidence: HIGH
decisions:
  - "Applied standard left-to-right power flow topology"
  - "DS-101A positioned upstream of CB-101"
  - "ES-101 branched from main conductor (not in series)"
  - "Applied 115kV color profile (#FFBF00)"
validation:
  - rule: TOPO-001
    status: PASS
    message: "Breaker upstream of disconnect switches"
  - rule: TOPO-002
    status: PASS
    message: "Earthing switch correctly branched"
  - rule: TOPO-003
    status: PASS
    message: "Main conductor continuous"
```

### Example 3: Validation Failure

**Input:**
```yaml
task: "Validate earthing switch ES-101"
action: validate
context:
  domain: utility-sld
```

**Output:**
```yaml
result: null
confidence: LOW
decisions: []
validation:
  - rule: ES-001
    status: FAIL
    message: "ES terminates at ground symbol - PASS"
  - rule: ES-002
    status: WARNING
    message: "Main conductor interrupted - potential issue"
  - rule: TOPO-003
    status: FAIL
    message: "Main conductor NOT continuous - topology error"
issues:
  - type: topology_error
    severity: critical
    description: "Earthing switch incorrectly placed in series"
    suggestion: "Move ES to branch position, not series position"
```

---

## Primitive Knowledge Summary

### Knife Switch Geometry (Shared by DS, ES)
- **Source**: KDE-GEOM-KNIFE-001
- **Key Rules**:
  - Knife is HINGED to Source Contact (NEVER detaches)
  - Hinge = mechanical pivot AND electrical connection
  - Conductor Gap = 52px, Knife Length = 53px (+1px overlap)
  - CLOSED: 0° angle, RED knife
  - OPEN: 40° angle, GREEN knife
  - UNKNOWN: No knife rendered

### Circuit Breaker (CB)
- **Source**: KDE-PRIM-CB-001
- **Key Rules**:
  - Series object (interrupts main path)
  - Two anchors (top, bottom)
  - CLOSED: Red filled rectangle
  - OPEN: Green outlined rectangle
  - UNKNOWN: No fill

### Disconnect Switch (DS)
- **Source**: KDE-PRIM-DS-001
- **Key Rules**:
  - Series object
  - Knife rotates about center
  - CLOSED: Red knife, 0°
  - OPEN: Green knife, 40°
  - UNKNOWN: No knife

### Earthing Switch (ES)
- **Source**: KDE-PRIM-ES-001
- **Key Rules**:
  - Parallel object (branches from main conductor)
  - Main conductor CONTINUES through
  - Lower end terminates at ground symbol
  - CLOSED: Creates fault to ground
  - OPEN: No ground connection

### Bus Voltage Profile (NGCP)
- **Source**: KDE-VOLTAGE-NGCP-001
- **Color Mapping**:
  - 500kV → Blue (#0000FF)
  - 230kV → Red (#FF0000)
  - 115kV → Yellow-Orange (#FFBF00)
  - 69kV → Cyan (#00FFFF)
  - 34.5kV → Dark Green (#006400)

---

## Changelog

| Version | Date | Changes | Authority |
|---------|------|---------|-----------|
| 1.0.0 | 2026-07-21 | Initial version from EXP-005, EXP-007 | Synthesis |
| 1.1.0 | 2026-07-22 | Added interface contract, confidence rules | INV-037 |
