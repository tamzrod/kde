# SLD Symbol Registry

**Expert**: KDE-EXPERT-SLD-001  
**Status**: APPROVED (v1.2.0)  
**Authority**: LAB-SLD-MULTILOOP-001

---

## Approved Symbols

| ID | Name | Version | Status | Confidence | Source |
|----|------|---------|--------|------------|--------|
| KDE-PRIM-DS-001 | Disconnect Switch | 2.0.0 | **APPROVED** | HIGH | LAB-SLD-TEST-001 |
| KDE-PRIM-CB-001 | Circuit Breaker | 2.0.0 | **APPROVED** | HIGH | LAB-SLD-TEST-001 |
| KDE-PRIM-ES-001 | Earthing Switch | 2.0.0 | **APPROVED** | HIGH | LAB-SLD-MULTILOOP-001 |
| KDE-BUSBAR-001 | Busbar | 1.0.0 | **APPROVED** | HIGH | LAB-SLD-SYNTH-001 |

---

## Symbol Geometry Summary

### Disconnect Switch (DS)
```
Structure: Conductor → Contact → Knife → Contact → Conductor
States: CLOSED (knife 0°, red), OPEN (knife 40°, green), UNKNOWN (hidden)
```

### Circuit Breaker (CB)
```
Structure: Conductor → Chevrons ∧∧ → Rectangle → Chevrons ∨∨ → Conductor
States: CLOSED (red fill), OPEN (green fill), UNKNOWN (dashed outline)
```

### Earthing Switch (ES)
```
Structure: Bus → Branch → Chevrons ∧∧ → Knife → Ground
States: CLOSED (knife to ground, red), OPEN (knife away, green), UNKNOWN (hidden)
Note: Parallel branch, does NOT interrupt main path
```

### Busbar
```
Structure: Horizontal rectangle with feeder taps
Color: Voltage-based (69kV = Cyan #00FFFF)
Types: Single, Sectionalized, Main+Transfer, Ring
```

---

## Feeder Assembly

```
┌─────────────────────────────────────────┐
│              69 kV BUS                 │
└─────────────────────────────────────────┘
                    │
    ┌───────────────┼───────────────┐
    ▼               ▼               ▼
┌───────┐     ┌───────┐     ┌───────┐
│DS_TOP │     │DS_TOP │     │DS_TOP │
└───────┘     └───────┘     └───────┘
    │               │               │
    ▼               ▼               ▼
┌───────┐     ┌───────┐     ┌───────┐
│  CB   │     │  CB   │     │  CB   │
└───────┘     └───────┘     └───────┘
    │               │               │
    ├───────┐       ├───────┐       ├───────┐
    ▼       ▼       ▼       ▼       ▼       ▼
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│ ES  │ │ ES  │ │ ES  │ │ ES  │ │ ES  │ │ ES  │
│ GND │ │ GND │ │ GND │ │ GND │ │ GND │ │ GND │
└─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘
    │               │               │
    ▼               ▼               ▼
┌───────┐     ┌───────┐     ┌───────┐
│DS_BOT │     │DS_BOT │     │DS_BOT │
└───────┘     └───────┘     └───────┘
```

---

## Validation Rules

| Rule ID | Description | Method |
|---------|-------------|--------|
| VAL-001 | All conductors must be vertical | Angle check |
| VAL-002 | Chevrons must be double (2 per side) | Count check |
| VAL-003 | Rectangle must be centered on X | Coordinate check |
| VAL-004 | State colors must match spec | Color check |
| VAL-005 | ES must branch (not interrupt) | Topology check |
| VAL-006 | Bus voltage color must match NGCP | Lookup check |

---

## Layout Rules

| Parameter | Value |
|-----------|-------|
| Base grid | 20px |
| Feeder spacing | 200px minimum |
| Conductor width | 4px |
| Chevron size | 8px |
| Knife width | 5px |

---

## Confidence Summary

| Component | Confidence | Basis |
|-----------|------------|-------|
| DS Symbol | HIGH | Validated, approved |
| CB Symbol | HIGH | Validated, approved |
| ES Symbol | HIGH | Validated, approved |
| Busbar | HIGH | Synthesized, validated |
| Feeder Assembly | HIGH | Validated in substation-v2.html |
| Layout Rules | MEDIUM | Proposed, not validated |
| Professional Template | BLOCKED | Requires company info |

---

## Authority Chain

- **LAB-SLD-TEST-001**: DS + CB approved
- **LAB-SLD-SYNTH-001**: ES synthesized, busbar proposed
- **LAB-SLD-MULTILOOP-001**: ES refined to HIGH, all gaps closed

---

**v1.2.0 | 2026-07-22**
