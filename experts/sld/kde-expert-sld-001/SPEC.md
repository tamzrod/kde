# SLD Engineering Expert

**ID**: KDE-EXPERT-SLD-001 | **v1.1.0** | **Status**: SYNTHESIZED  
**Domain**: utility-sld | **Source**: EXP-005, EXP-007, EXP-008, EXP-010, EXP-011

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
| ID | Purpose |
|----|---------|
| KDE-PRIM-CB-001 | Circuit Breaker |
| KDE-PRIM-DS-001 | Disconnect Switch |
| KDE-PRIM-ES-001 | Earthing Switch |
| KDE-GEOM-KNIFE-001 | Knife geometry |
| KDE-VOLTAGE-NGCP-001 | Bus colors |

## Confidence
| Condition | Level |
|---------|-------|
| Valid + knowledge | HIGH |
| Warnings | MEDIUM |
| Missing | LOW |

## Key Rules
| Primitive | Closed | Open | Unknown |
|----------|--------|------|---------|
| CB | Red fill | Green outline | No fill |
| DS | Red knife 0° | Green knife 40° | No knife |
| ES | Red knife + ground | Green knife | No knife |

**ES**: Branches from main (does NOT interrupt main path)

## Voltage Colors
| kV | Color |
|----|-------|
| 500 | Blue |
| 230 | Red |
| 115 | Yellow-Orange |
| 69 | Cyan |

**v1.1.0 | 2026-07-22**
