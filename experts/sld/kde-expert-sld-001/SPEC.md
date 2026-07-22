# SLD Engineering Expert

**ID**: KDE-EXPERT-SLD-001 | **v1.2.0** | **Status**: APPROVED  
**Domain**: utility-sld | **Source**: EXP-005, EXP-007, EXP-008, EXP-010, EXP-011, LAB-SLD-TEST-001

---

## Purpose
Generates, validates, and renders Single Line Diagrams (SLD) for utility SCADA systems.

## Scope
**Owns**: SLD primitives, substation layout, state visualization, SLD validation  
**Does Not Own**: GIS decisions, physical calculations, protection coordination

## Capabilities
| Action | Description |
|--------|-------------|
| render | SVG primitives (CB, DS, ES, busbar) |
| validate | Geometry and topology rules |
| compose | Substation layouts |

## Dependencies
| ID | Purpose | Status |
|----|---------|--------|
| KDE-PRIM-CB-001 | Circuit Breaker | **APPROVED** |
| KDE-PRIM-DS-001 | Disconnect Switch | **APPROVED** |
| KDE-PRIM-ES-001 | Earthing Switch | **APPROVED** |
| KDE-GEOM-KNIFE-001 | Knife geometry | **APPROVED** |
| KDE-VOLTAGE-NGCP-001 | Bus colors | **APPROVED** |

## Confidence
| Condition | Level |
|---------|-------|
| Valid + knowledge | HIGH |
| Warnings | MEDIUM |
| Missing | LOW |

---

## ⭐ APPROVED SYMBOL GEOMETRY (v1.2.0)

### Disconnect Switch (DS) — APPROVED
**Source**: `playground/disconnect-switch.html`  
**Knowledge**: KDE-PRIM-DS-001

```
Structure:
┌─────────────────────────────────────┐
│           Conductor                │
│              ║                     │
│     ────────●───────  ← Top Contact│
│              │                     │
│              │  ← Knife (0° closed) │
│              │                     │
│     ────────●───────  ← Bottom Cont│
│              ║                     │
│           Conductor                │
└─────────────────────────────────────┘
```

| Element | Geometry | Color |
|---------|----------|-------|
| Conductors | Vertical lines, 4px stroke | Bus color |
| Top/Bottom Contacts | Horizontal lines, 115px wide | Bus color |
| Pivot/Hinge | Circle at center-top contact | Bus color |
| Knife Blade | Vertical line, 5px stroke | **CLOSED=Red, OPEN=Green, UNKNOWN=hidden** |
| Knife Angle | 0° (closed), 40° (open) | — |

**Color Rules (69 kV example)**:
- Bus elements (conductors, contacts): Cyan `#00FFFF`
- Knife CLOSED: Red `#FF4444`
- Knife OPEN: Green `#44FF44`

---

### Circuit Breaker (CB) — APPROVED
**Source**: `playground/CB-improved.html`  
**Knowledge**: KDE-PRIM-CB-001

```
Structure:
┌─────────────────────────────────────┐
│           Conductor                │
│              ║                     │
│             ∧∧    ← Double Chevron │
│             │ │      UP (Cyan)    │
│           ┌──────┐                 │
│           │██████│ ← Rectangle    │
│           │██████│   (state fill) │
│           └──────┘                 │
│             ∧∧    ← Double Chevron │
│             │ │      DOWN (Cyan)   │
│              ║                     │
│           Conductor                │
└─────────────────────────────────────┘
```

| Element | Geometry | Color |
|---------|----------|-------|
| Conductors | Vertical lines, 4px stroke | Bus color |
| Chevrons (∧∧ and ∨∨) | Double V-shapes, 8px wide | Bus color |
| Continuous Line | Vertical through chevrons | Bus color |
| Rectangle Body | 36×80px, centered, rx=4 | **CLOSED=Red, OPEN=Green, UNKNOWN=dashed outline** |

**Color Rules (69 kV example)**:
- Chevrons + Line: Cyan `#00FFFF`
- Rectangle CLOSED: Red `#ef4444`
- Rectangle OPEN: Green `#22c55e`
- Rectangle UNKNOWN: Dashed cyan outline

**Key Differences from DS**:
| Feature | DS | CB |
|---------|----|----|
| Pivot/Hinge | Yes | **No** |
| Contact Circles | Yes | **No** |
| Moving Knife | Yes (rotates) | **No knife** |
| State Indication | Knife angle + color | Rectangle fill color |

---

## Legacy State Rules
| Primitive | Closed | Open | Unknown |
|----------|--------|------|---------|
| CB | Red fill `#ef4444` | Green fill `#22c55e` | Dashed outline |
| DS | Red knife 0° `#ef4444` | Green knife 40° `#44FF44` | No knife |
| ES | Red knife + ground | Green knife | No knife |

**ES**: Branches from main (does NOT interrupt main path)

---

## Voltage Colors (NGCP Profile)
| kV | Color |
|----|-------|
| 500 | Blue `#0000FF` |
| 230 | Red `#FF0000` |
| 115 | Yellow-Orange `#FFBF00` |
| 69 | Cyan `#00FFFF` |

---

**v1.2.0 | 2026-07-22 | LAB-SLD-TEST-001**
