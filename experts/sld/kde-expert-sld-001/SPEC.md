# SLD Engineering Expert

**Expert ID**: KDE-EXPERT-SLD-001  
**Version**: 1.1.0  
**Status**: SYNTHESIZED  
**Domain**: utility-sld  
**Source**: EXP-005, EXP-007, EXP-008, EXP-010, EXP-011

---

## Purpose

Generates, validates, and renders Single Line Diagrams (SLD) for utility-grade SCADA systems. Specializes in electrical primitives: circuit breakers, disconnect switches, earthing switches, busbars.

---

## Scope

**Owns**: SLD primitives, substation layout, state visualization, SLD validation  
**Does Not Own**: GIS decisions, physical calculations, protection coordination

---

## Capabilities

| Capability | Description |
|-----------|-------------|
| render | Render SVG primitives (CB, DS, ES, busbar) |
| validate | Validate geometry and topology rules |
| compose | Compose primitives into substation layouts |
| analyze | Analyze network topology |

### Supported Primitives
- Circuit Breaker (CB): Series object, red/green/empty states
- Disconnect Switch (DS): Series object, knife rotation 0°/40°
- Earthing Switch (ES): Parallel object, branches to ground
- Busbar: Inherits voltage-based color

---

## Knowledge Dependencies

| ID | Purpose |
|----|---------|
| KDE-PRIM-CB-001 | Circuit Breaker spec |
| KDE-PRIM-DS-001 | Disconnect Switch spec |
| KDE-PRIM-ES-001 | Earthing Switch spec |
| KDE-GEOM-KNIFE-001 | Knife switch geometry |
| KDE-VOLTAGE-NGCP-001 | Bus voltage colors |

---

## Confidence Rules

| Condition | Confidence |
|-----------|------------|
| Valid output + all knowledge | HIGH |
| Warnings present | MEDIUM |
| Knowledge missing | LOW |

---

## Key Primitive Rules

| Primitive | Closed | Open | Unknown |
|----------|--------|------|---------|
| CB | Red fill | Green outline | No fill |
| DS | Red knife 0° | Green knife 40° | No knife |
| ES | Red knife 0° + ground | Green knife 40° | No knife |

**ES Key Rule**: Branches from main conductor (does NOT interrupt main path)

---

## Voltage Colors (NGCP)

| kV | Color |
|----|-------|
| 500 | Blue #0000FF |
| 230 | Red #FF0000 |
| 115 | Yellow-Orange #FFBF00 |
| 69 | Cyan #00FFFF |

---

**Version**: 1.1.0 | **Updated**: 2026-07-22
