# LAB-SLD-TEST-001: SLD Expert Rendering Test

**Experiment ID**: LAB-SLD-TEST-001  
**Date**: 2026-07-22  
**Expert**: KDE-EXPERT-SLD-001  
**Status**: IN_PROGRESS

---

## Task

Render a single-line diagram with 3 feeders:
- Feeder A: OPEN status
- Feeder B: CLOSED status  
- Feeder C: UNKNOWN status

---

## Expert Invocation

### Input (per interface.yaml)

```yaml
task: "Render 3-feeder single line diagram"
action: render
context:
  voltage_level: "115kV"
  layout_type: "feeder-diagram"
primitives:
  - type: disconnect-switch
    id: "FEEDER-A"
    state: OPEN
    position: [100, 50]
  - type: disconnect-switch
    id: "FEEDER-B"
    state: CLOSED
    position: [100, 150]
  - type: disconnect-switch
    id: "FEEDER-C"
    state: UNKNOWN
    position: [100, 250]
knowledge_refs:
  - KDE-PRIM-DS-001
  - KDE-VOLTAGE-NGCP-001
```

### Output

```yaml
confidence: HIGH
decisions:
  - "Applied 115kV color profile (#FFBF00)"
  - "Used disconnect switch primitives for all feeders"
  - "Applied state-based coloring per DS rules"
validation:
  - rule: DS-001
    status: PASS
    message: "State colors correct"
  - rule: DS-002
    status: PASS
    message: "Labels rendered"
```

---

## Rendered Output

### SLD Diagram (SVG)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 350">
  <title>3-Feeder Single Line Diagram</title>
  
  <!-- Bus (115kV - Yellow-Orange #FFBF00) -->
  <rect x="20" y="20" width="360" height="15" fill="#FFBF00"/>
  <text x="200" y="12" text-anchor="middle" font-size="12" fill="#333">115kV Bus</text>
  
  <!-- Feeder A - OPEN (Green knife at 40°) -->
  <g id="FEEDER-A">
    <line x1="50" y1="35" x2="50" y2="70" stroke="#FFBF00" stroke-width="3"/>
    <line x1="50" y1="70" x2="50" y2="100" stroke="#FFBF00" stroke-width="3"/>
    <!-- DS body -->
    <rect x="35" y="65" width="30" height="40" fill="none" stroke="#00AA00" stroke-width="2"/>
    <!-- OPEN knife at 40° -->
    <line x1="50" y1="85" x2="70" y2="65" stroke="#00AA00" stroke-width="3"/>
    <!-- Label -->
    <text x="50" y="130" text-anchor="middle" font-size="14" font-weight="bold">FEEDER A</text>
    <text x="50" y="145" text-anchor="middle" font-size="11" fill="#00AA00">OPEN</text>
  </g>
  
  <!-- Feeder B - CLOSED (Red knife at 0°) -->
  <g id="FEEDER-B">
    <line x1="200" y1="35" x2="200" y2="100" stroke="#FFBF00" stroke-width="3"/>
    <!-- DS body -->
    <rect x="185" y="95" width="30" height="40" fill="none" stroke="#FF4444" stroke-width="2"/>
    <!-- CLOSED knife at 0° (horizontal) -->
    <line x1="185" y1="115" x2="215" y2="115" stroke="#FF4444" stroke-width="3"/>
    <!-- Label -->
    <text x="200" y="160" text-anchor="middle" font-size="14" font-weight="bold">FEEDER B</text>
    <text x="200" y="175" text-anchor="middle" font-size="11" fill="#FF4444">CLOSED</text>
  </g>
  
  <!-- Feeder C - UNKNOWN (No knife) -->
  <g id="FEEDER-C">
    <line x1="350" y1="35" x2="350" y2="70" stroke="#FFBF00" stroke-width="3"/>
    <line x1="350" y1="70" x2="350" y2="100" stroke="#FFBF00" stroke-width="3"/>
    <!-- DS body - dashed outline for UNKNOWN -->
    <rect x="335" y="65" width="30" height="40" fill="none" stroke="#888888" stroke-width="2" stroke-dasharray="4,2"/>
    <!-- No knife for UNKNOWN -->
    <!-- Label -->
    <text x="350" y="130" text-anchor="middle" font-size="14" font-weight="bold">FEEDER C</text>
    <text x="350" y="145" text-anchor="middle" font-size="11" fill="#888888">UNKNOWN</text>
  </g>
</svg>
```

---

## Legend

| Symbol | Meaning |
|--------|---------|
| Horizontal bar | Bus (115kV) |
| Red horizontal knife | CLOSED switch |
| Green angled knife | OPEN switch |
| Dashed outline, no knife | UNKNOWN status |
| Yellow-Orange line | 115kV conductor |

---

## Confidence Assessment

| Factor | Value | Rationale |
|--------|-------|-----------|
| Knowledge available | YES | KDE-PRIM-DS-001 loaded |
| Voltage profile | YES | 115kV → #FFBF00 |
| State rendering | YES | Red/Green/Empty per rules |
| Standard topology | YES | Single bus with feeders |
| **Overall** | **HIGH** | All knowledge available |

---

## Status

**Result**: SUCCESS  
**Confidence**: HIGH  
**Diagram rendered correctly per SLD Expert specifications**

---

**Completed**: 2026-07-22
