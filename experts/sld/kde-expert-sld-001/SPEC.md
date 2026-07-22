# SLD Engineering Expert

**ID**: KDE-EXPERT-SLD-001 | **v1.3.0** | **Status**: APPROVED  
**Domain**: utility-sld | **Source**: EXP-005, EXP-007, EXP-008, EXP-010, EXP-011, LAB-SLD-TEST-001, LAB-SLD-IMPROVE-001

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

---

## Earthing Switch (ES) — APPROVED
**Source**: `playground/ES-improved.html`, `playground/ES-corrected.html`  
**Knowledge**: KDE-PRIM-ES-001

```
Structure:
┌─────────────────────────────────────┐
│        Conductor / Bus             │
│              │                     │
│      ────────●───────  ← Top Contact│
│              │                     │
│              │  ← Knife (0° closed) │
│              │                     │
│      ────────●───────  ← Bottom Cont│
│              │                     │
│              │  ← Down to Ground    │
│            ═════  ← Ground Symbol  │
└─────────────────────────────────────┘
```

| Element | Geometry | Color |
|---------|----------|-------|
| Conductor/Bus | Vertical line, 4px stroke | Bus color |
| Horizontal Branch | Horizontal line (for bus connection) | Bus color |
| Top/Bottom Contacts | Horizontal lines, 30px wide | Bus color |
| Pivot/Hinge | Circle at center-top contact, r=6 | Bus color |
| Knife Blade | Vertical line, 5px stroke | **CLOSED=Red, OPEN=Green, UNKNOWN=hidden** |
| Knife Angle | 0° (closed), 40° (open) | — |
| Ground Symbol | 3-bar symbol below knife | Bus color |

**Key Differences from DS**:
| Feature | DS | ES |
|---------|----|----|
| Connection | Two conductors | One conductor → ground |
| Chevrons | **No** | **No** |
| Ground Symbol | **No** | **Yes** |
| Knife | Yes (rotates) | Yes (rotates) |
| Pivot | Yes | Yes |

**ES Topology Rules**:
- ES is a **branch** from the main path
- ES does **NOT interrupt** the main path
- When attached to vertical bus/path: use clean horizontal branch connection

---

## Canonical Feeder Assembly
**Source**: `playground/feeder-assembly.html`  
**Pattern**: `DS – CB – ES – DS`

```
┌─────────────────────────────────────┐
│             BUS BAR                │
└─────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│            DS_TOP                   │
│  (Isolates CB for maintenance)     │
└─────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│              CB                     │
│  (Primary protection and switching) │
└─────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│       ES (BRANCH - does NOT         │
│        interrupt main path)          │
│  (Grounds feeder for safety)        │
└─────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│           DS_BOTTOM                  │
│  (Isolates line for maintenance)   │
└─────────────────────────────────────┘
                  │
                  ▼
              OUTGOING LINE
```

---

## Minimum Viable Feeder SLD (MVFSLD)
**Definition**: The simplest valid single line diagram containing a feeder.

### Requirements
| Element | Specification |
|---------|---------------|
| Bus | One horizontal bus bar |
| Feeder | One complete feeder: **DS – CB – ES – DS** |
| States | Correct colors per state (Closed=Red, Open=Green) |
| Labels | Basic labels: bus voltage, component identifiers |

### Validation Checklist
- [ ] Bus renders at correct voltage color
- [ ] Feeder assembly follows DS–CB–ES–DS pattern
- [ ] ES appears as branch (does NOT interrupt main path)
- [ ] All switches show correct state colors
- [ ] Basic labels present

---

## Consistency Rules (v1.3.0)

### State Colors
| State | Color | Hex |
|-------|-------|-----|
| CLOSED | Red | `#ef4444` |
| OPEN | Green | `#22c55e` |
| UNKNOWN | Dashed outline | — |

### Bus/Conductor Colors (NGCP Voltage Profile)
| Voltage | Color | Hex |
|---------|-------|-----|
| 500 kV | Blue | `#0000FF` |
| 230 kV | Red | `#FF0000` |
| 115 kV | Yellow-Orange | `#FFBF00` |
| 69 kV | Cyan | `#00FFFF` |

### Stroke Style Consistency
| Element | Stroke Width | Style |
|---------|-------------|-------|
| Conductors | 4px | Solid |
| Contacts | 3px | Solid |
| Ground bars | 3px | Solid |
| Chevrons | 2.5px | Solid |
| Knife blades | 5px | Solid, round caps |
| Pivot circles | 2px | No fill |

---

**v1.3.0 | 2026-07-22 | LAB-SLD-IMPROVE-001**
