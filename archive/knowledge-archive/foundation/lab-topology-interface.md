# Lab Experiment Lessons: Network Topology & Connection Interface

**Knowledge ID:** KDE-LAB-TOPO-001  
**Lesson:** EXP-LAB-6  
**Version:** 1.0.0  
**Date:** 2026-07-21  
**Source:** Lab-Experiment Iteration 6  

---

## 1. Overview

This document captures the engineering knowledge gained from Lab-Experiment Iteration 6, which validated the Electrical Network Model (EXP-014) through renderer implementation.

---

## 2. Correct Feeder Topology

### 2.1 Network Model vs SVG Rendering

**Critical Finding:** The electrical network model must match the SVG visual representation.

### 2.2 Correct Series/Parallel Topology

```
┌─────────────────────────────────────────────────────────────────┐
│                     CORRECT FEEDER TOPOLOGY                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   69 kV Bus ════════════════════════════════════════════════   │
│                     │                                           │
│                     ▼                                           │
│              ┌─────────────┐                                    │
│              │    DS_TOP   │ ← Series Object (2 CPs)            │
│              │  (isolator) │   INTERRUPTS main path             │
│              └──────┬──────┘                                    │
│                     │                                           │
│                     │ (main conductor continues)                │
│                     ├──●────────────┬──────────────────────    │
│                     │          │    │                         │
│                     │          │    └──ES──knife──ground──⊥   │
│                     │          │       (Parallel branch)        │
│                     │          │       1 CP only               │
│                     │          │       DOES NOT interrupt      │
│                     ▼          ▼                                 │
│              ┌─────────────┐ │                                  │
│              │      CB     │ │ ← Series Object (2 CPs)          │
│              │  (breaker) │─┘   INTERRUPTS main path           │
│              └──────┬──────┘                                    │
│                     │                                           │
│                     ▼                                           │
│              ┌─────────────┐                                    │
│              │   DS_BOTTOM │ ← Series Object (2 CPs)           │
│              │  (isolator) │   INTERRUPTS main path           │
│              └──────┬──────┘                                    │
│                     │                                           │
│                     ▼                                           │
│                  Outgoing                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 Topology Rules

| Rule | Description |
|------|-------------|
| TOPO-001 | Series Objects (DS, CB) form the MAIN PATH |
| TOPO-002 | ES is NOT in the series path |
| TOPO-003 | ES branches OFF the main conductor at a junction point |
| TOPO-004 | The main conductor CONTINUES through the ES branch point |
| TOPO-005 | ES has ONLY ONE connection point (main) |
| TOPO-006 | Series Objects have TWO connection points (top, bottom) |

### 2.4 Common Error

**INCORRECT TOPOLOGY (DEFECT):**

```
DS → ES → CB → DS  ← WRONG!

ES is placed IN SERIES with CB/DS.
This violates the Parallel Object definition.
```

**CORRECT TOPOLOGY:**

```
DS → CB → DS  ← Main path (series)
    ↑
    └── ES (parallel branch)
```

---

## 3. Series Object Connection Interface

### 3.1 Purpose

The connection interface clearly distinguishes the electrical connection point from the device body.

### 3.2 Interface Components

```
┌─────────────────────────────────────────────────────────────────┐
│            SERIES OBJECT CONNECTION INTERFACE                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│            │ (conductor stub)                                   │
│            │                                                   │
│            ◄►◄►  ← Double chevron (>>)                         │
│            │        - Centered on conductor axis                │
│            │        - Always cyan color                         │
│            │        - Spacing: 4px between chevrons             │
│            │                                                   │
│       ─────┼───── ← Top contact bar (inside body)              │
│            │                                                   │
│            │ (knife blade or rectangle - shows state)            │
│            │                                                   │
│       ─────┼───── ← Bottom contact bar (inside body)           │
│            │                                                   │
│            ◄►◄►  ← Double chevron (>>)                         │
│            │                                                   │
│            │ (conductor stub)                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.3 Interface Dimensions

| Component | Value |
|-----------|-------|
| Conductor stub length | 15px |
| Chevron size | 5px |
| Chevron spacing | 4px |
| Contact bar width | 30px |
| Contact bar thickness | 3px |
| Device body gap | 20px (inside chevrons) |

### 3.4 State Visualization

The device body contains the state visualization (knife blade or rectangle):

| State | DS Visualization | CB Visualization |
|-------|------------------|------------------|
| CLOSED | Red knife inline (0°) | Red rectangle |
| OPEN | Green knife rotated (40°) | Green rectangle |
| UNKNOWN | No knife | No rectangle |

### 3.5 Key Implementation Rule

**IMPORTANT:** The connection interface (chevrons) must NOT interfere with the state visualization.

- Chevrons are positioned OUTSIDE the device body
- Knife/rectangle is positioned INSIDE the device body
- The two systems are independent and can coexist

---

## 4. Validation Checklist

### 4.1 Network Topology

| Validation | Pass/Fail |
|------------|-----------|
| □ ES has only ONE connection point | [ ] |
| □ ES is NOT in series with CB/DS | [ ] |
| □ ES branches from main conductor | [ ] |
| □ Main conductor continues through ES branch point | [ ] |
| □ CB has TWO connection points | [ ] |
| □ DS has TWO connection points | [ ] |
| □ CB interrupts main path when OPEN | [ ] |
| □ DS interrupts main path when OPEN | [ ] |

### 4.2 Connection Interface

| Validation | Pass/Fail |
|------------|-----------|
| □ Double chevrons visible at top and bottom | [ ] |
| □ Chevrons centered on conductor axis | [ ] |
| □ State visualization (knife/rectangle) works | [ ] |
| □ CLOSED shows red inline | [ ] |
| □ OPEN shows green rotated | [ ] |
| □ UNKNOWN shows no fill | [ ] |

---

## 5. Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-07-21 | Initial creation from Lab-Experiment Iteration 6 |

---

## 6. Provenance

| Source | Reference | Date |
|--------|-----------|------|
| Lab Experiment | Iteration 6 | 2026-07-21 |
| Electrical Network Model | KDE-NETWORK-MODEL-001 (EXP-014) | 2026-07-21 |
| Circuit Breaker | KDE-PRIM-CB-001 (EXP-005) | 2026-07-21 |
| Disconnect Switch | KDE-PRIM-DS-001 (EXP-007) | 2026-07-21 |
| Earthing Switch | KDE-PRIM-ES-001 (EXP-008) | 2026-07-21 |

---

*This knowledge artifact captures lessons learned from practical renderer implementation and validation.*
