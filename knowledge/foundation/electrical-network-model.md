# Electrical Network Model

**Knowledge ID:** KDE-NETWORK-MODEL-001  
**Lesson:** EXP-014  
**Version:** 1.0.0  
**Date:** 2026-07-21  
**Author:** KDE-EXPERT-SLD-001  

---

## 1. Overview

This document establishes the **Electrical Network Model** that governs how engineering primitives connect to form an electrical network.

**Core Principle:** A Single Line Diagram is an electrical network. Conductors represent electrical continuity.

---

## 2. Engineering Principle

| Electrical Reality | SLD Representation |
|-------------------|-------------------|
| Continuous electrical path | Continuous conductor |
| Open circuit (intentional) | Broken conductor at Series Object |
| Open circuit (fault) | Broken conductor (error) |

**Electrical continuity shall never be broken unless intentionally interrupted by an engineering device.**

---

## 3. Electrical Continuity

### 3.1 Definition

**Electrical continuity** means an unbroken path for electric current to flow.

```
┌─────────────────────────────────────────────────────┐
│                 ELECTRICAL CONTINUITY               │
├─────────────────────────────────────────────────────┤
│                                                     │
│   Conductor A ──► Device ──► Conductor B ──► ...  │
│                                                     │
│   If all connections are made, current flows.       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 3.2 Continuous Conductor

A **continuous conductor** represents a continuous electrical path.

```
═══════════════════════════════════════════════
         CONTINUOUS CONDUCTOR
═══════════════════════════════════════════════
         
Result: Current can flow through.
```

### 3.3 Broken Conductor

A **broken conductor** represents an open electrical path.

```
──────────────X───────────────────────────────
           BREAK
──────────────X───────────────────────────────
         
Result: Current CANNOT flow through.
```

### 3.4 Intentional vs Fault Break

| Condition | Cause | Valid? |
|-----------|-------|--------|
| Continuous | Normal operation | ✓ Yes |
| Broken | Series Object OPEN | ✓ Yes |
| Broken | Fault/Error | ✗ No |

---

## 4. Engineering Objects

### 4.1 Definition

Every **engineering primitive** is an independent object.

### 4.2 Object Properties

| Property | Description |
|----------|-------------|
| **Independent** | Object exists without neighbouring objects |
| **Encapsulated** | Object owns its internal geometry only |
| **Exposed** | Object exposes connection points for joining |
| **Immutable** | Object's connection points never change |

### 4.3 Object Ownership

**A primitive never owns neighbouring conductors.**

```
┌─────────┐     ┌─────────┐     ┌─────────┐
│ Object  │     │ Object  │     │ Object  │
│    A    │     │    B    │     │    C    │
└────┬────┘     └────┬────┘     └────┬────┘
     │               │               │
     ▼               ▼               ▼
  Conductor       Conductor       Conductor
  (NOT owned)     (NOT owned)     (NOT owned)
```

---

## 5. Connection Points

### 5.1 Definition

A **Connection Point** is an exposed interface where conductors attach.

### 5.2 Connection Point Properties

| Property | Description |
|----------|-------------|
| **Name** | Unique identifier within object |
| **Position** | Location on object (normalized) |
| **Direction** | Input, Output, or Bidirectional |
| **State** | Connected or Disconnected |

### 5.3 Connection Point Types

```
┌─────────────────────────────────────────┐
│           CONNECTION POINT TYPES        │
├─────────────────────────────────────────┤
│                                         │
│   INPUT ◄─────────► OUTPUT              │
│                                         │
│   ◄── Direction of current flow         │
│                                         │
└─────────────────────────────────────────┘
```

### 5.4 Connection Point Rules

| Rule | Description |
|------|-------------|
| CP-001 | Connection points are immutable |
| CP-002 | Connection points never move |
| CP-003 | Conductors attach to connection points |
| CP-004 | A connection point may connect to one conductor |

---

## 6. Series Objects

### 6.1 Definition

A **Series Object** interrupts the electrical path. It exposes **two** connection points.

### 6.2 Series Object Diagram

```
                    CONNECTION POINT A
                          │
                          ▼
    ┌─────────────────────────────────────────┐
    │                                         │
    │            SERIES OBJECT                │
    │         (Current passes through)        │
    │                                         │
    │    When OPEN: Continuity broken         │
    │    When CLOSED: Continuity maintained  │
    │                                         │
    └─────────────────────────────────────────┘
                          │
                          ▼
                    CONNECTION POINT B
```

### 6.3 Series Object Examples

| Device | Symbol | Series? | Reason |
|--------|--------|---------|--------|
| **Circuit Breaker** | □ | ✓ Yes | Interrupts path |
| **Disconnect Switch** | □ | ✓ Yes | Interrupts path |
| **Current Transformer** | ○ | ✓ Yes | Inserts in series |
| **Voltage Transformer** | ○ | ✓ Yes | Taps off series |

### 6.4 Series Object Behavior

```
CLOSED State (Continuity maintained):
═══════════════■══════════════════════════

OPEN State (Continuity broken):
═══════════════X══════════════════════════
              ↑
         Intentional break
```

---

## 7. Parallel Objects

### 7.1 Definition

A **Parallel Object** branches from an existing conductor. It exposes **one** electrical connection point.

### 7.2 Parallel Object Diagram

```
                          
    MAIN CONDUCTOR ─────────────────────────
            │                      │
            │    CONNECTION POINT   │
            │          │            │
            ▼          ▼            ▼
            ┌─────────────────┐
            │                 │
            │  PARALLEL       │
            │  OBJECT         │
            │                 │
            │  Does NOT       │
            │  interrupt main │
            │                 │
            └────────┬────────┘
                     │
                     ▼
              (Ground / Load)
```

### 7.3 Parallel Object Examples

| Device | Symbol | Parallel? | Reason |
|--------|--------|-----------|--------|
| **Earth Switch** | ⊥ | ✓ Yes | Branches to ground |
| **Surge Arrester** | ⊥ | ✓ Yes | Branches to ground |
| **Ground Fault** | ⊥ | ✓ Yes | Branch path |

### 7.4 Parallel Object Behavior

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   MAIN CONDUCTOR ════════════════════════════════  │
│                    │                               │
│                    │ (Parallel branch)             │
│                    ▼                               │
│              ┌──────────┐                          │
│              │ PARALLEL │                          │
│              │  OBJECT  │                          │
│              └────┬─────┘                          │
│                   │                               │
│                   ▼                               │
│                 GROUND                             │
│                                                     │
│   Main conductor continuity: MAINTAINED             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 7.5 Key Principle

**A Parallel Object SHALL NOT interrupt the main conductor.**

```
┌─────────────────────────────────────────┐
│         EARTH SWITCH EXAMPLE            │
├─────────────────────────────────────────┤
│                                         │
│   Main Conductor: CONTINUOUS            │
│   ════════════════════════════════════  │
│                                         │
│        │ (Branch connection)            │
│        │                               │
│        ◯ ─ ─ ─ ─ ─ ─ ─ ─              │
│        │ (Knife switch)                │
│        │                               │
│        ▼ (When closed)                 │
│        ⊥ (Ground symbol)                │
│                                         │
│   Main conductor continuity:            │
│   ════════════════════════════ (INTACT) │
│                                         │
└─────────────────────────────────────────┘
```

---

## 8. Series vs Parallel Comparison

| Property | Series Object | Parallel Object |
|----------|--------------|-----------------|
| **Connection Points** | 2 | 1 |
| **Interrupts Path?** | Yes | No |
| **Main Conductor** | Breaks | Continuous |
| **Branch Creation** | No | Yes |
| **Examples** | CB, DS, CT | ES, SA |

### 8.1 Visual Comparison

```
SERIES (Breaks main conductor):

═══════════════■═══════════════════════════
              ↑
        Breaks continuity

PARALLEL (Maintains main conductor):

═══════════════════════════════════════════
│
│   ═══╬═══
│      ⊥
│
(Continuity maintained through main path)
```

---

## 9. Network Topology

### 9.1 Network Definition

A **Network** is formed by connecting objects through their connection points.

### 9.2 Network Formation Rules

| Rule | Description |
|------|-------------|
| NET-001 | Objects connect via connection points |
| NET-002 | A conductor connects two connection points |
| NET-003 | Connection points form a path |
| NET-004 | Series objects extend the path |
| NET-005 | Parallel objects branch from the path |

### 9.3 Network Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        ELECTRICAL NETWORK                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   BUS ────●═══[DS]═══●═══[CB]═══●═══[DS]═══●═══...        │
│                  │                           │              │
│                  │ (Parallel branch)         │              │
│                  ▼                           │              │
│               [ES]                           │              │
│                 │                            │              │
│                 ▼                            │              │
│                GND                           │              │
│                                                             │
│   Legend:                                                   │
│   ● = Connection point                                      │
│   [ ] = Series object                                      │
│   { } = Parallel object                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 9.4 Feeder Network Example

```
┌─────────────────────────────────────────────────────────────┐
│                      FEEDER BAY                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                          69 kV BUS                          │
│   ════════════════════════════════════════════════════════  │
│                              │                              │
│                              │ (Connection to feeder)       │
│                              ▼                              │
│                    ┌─────────────────┐                      │
│                    │   DS-TOP        │                      │
│                    │ (Series)        │                      │
│                    └────────┬────────┘                      │
│                             │                              │
│                             ▼                              │
│              ┌─────────────────────────┐                   │
│              │        ES              │                    │
│              │  (Parallel - Branch)    │                    │
│              │    Main conductor      │                    │
│              │    CONTINUOUS         │                    │
│              └────────────┬───────────┘                    │
│                           │                                │
│                           ▼                                │
│                    ┌─────────────────┐                      │
│                    │      CB        │                      │
│                    │   (Series)     │                      │
│                    └────────┬────────┘                      │
│                             │                              │
│                             ▼                              │
│                    ┌─────────────────┐                      │
│                    │   DS-BOTTOM    │                      │
│                    │   (Series)     │                      │
│                    └────────┬────────┘                      │
│                             │                              │
│                             ▼                              │
│                    ════════════════                        │
│                       OUTGOING                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 10. Conductor Generation

### 10.1 Generation Rule

**Conductors are generated by connecting connection points.**

### 10.2 Generation Process

```
Step 1: Place objects
        [A]     [B]     [C]

Step 2: Identify connection points
        [A]●───●[B]●───●[C]

Step 3: Connect points with conductors
        [A]════════[B]════════[C]

Step 4: Result - Continuous network
        [A]════════[B]════════[C]
```

### 10.3 Renderer Responsibility

The renderer SHALL:

| Responsibility | Description |
|----------------|-------------|
| Read connection points | From each object's definition |
| Generate conductors | Between connected points |
| Route conductors | Appropriate path (straight, orthogonal) |
| Maintain continuity | Never break unless Series Object |

The renderer SHALL NOT:

| Prohibition | Reason |
|-------------|--------|
| Manually draw conductors | Must be generated |
| Break continuity | Unless intentional (Series OPEN) |
| Override connection points | Immutable |

---

## 11. Electrical Continuity Rules

### 11.1 Continuity Rules

| Rule | Description |
|------|-------------|
| EC-001 | A conductor shall always remain continuous |
| EC-002 | Only a Series Object may intentionally break continuity |
| EC-003 | A Parallel Object shall never interrupt the main conductor |
| EC-004 | Breaking continuity for any other reason is an error |

### 11.2 Continuity Table

| Configuration | Main Conductor | Continuity |
|---------------|----------------|-------------|
| Bus alone | Continuous | ✓ Maintained |
| Bus + Series CLOSED | Continuous | ✓ Maintained |
| Bus + Series OPEN | Broken | ✓ Intentionally |
| Bus + Parallel | Continuous | ✓ Maintained |
| Bus + Series + Parallel | Broken/Continuous | ✓ Correct |

### 11.3 Error Conditions

| Error | Condition | Detection |
|-------|-----------|-----------|
| E1 | Parallel object breaks main conductor | ✗ Violates EC-003 |
| E2 | Conductor break without Series Object | ✗ No device to blame |
| E3 | Two conductors connected to one point | ✗ Violates CP-004 |
| E4 | Disconnected connection point | ⚠ Warning only |

---

## 12. Rendering Principle

### 12.1 Network First, Render Second

The electrical network **exists independently** of the drawing.

```
┌─────────────────────────────────────────────────────────────┐
│                   RENDERING PRINCIPLE                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   NETWORK MODEL          →       RENDERED SLD               │
│   (Electrical Reality)           (Visual Representation)    │
│                                                             │
│   ┌───────────────┐       ════════════════════════         │
│   │  Connection   │       │                      │         │
│   │   Points      │  →    │     Conductor        │         │
│   └───────────────┘       │                      │         │
│           │               └──────────────────────┘         │
│           │                                                 │
│           ▼                                                 │
│   ┌───────────────┐       ┌──────────────────────┐         │
│   │  Series/      │  →    │    Device Symbol     │         │
│   │  Parallel     │       │                      │         │
│   └───────────────┘       └──────────────────────┘         │
│                                                             │
│   Network: EXISTS        Render: REPRESENTS                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 12.2 Independence

| Aspect | Network | Render |
|--------|---------|--------|
| Existence | Independent | Dependent |
| Definition | Engineering | Visual |
| Changes | Rare | Frequent |
| Purpose | Electrical truth | Communication |

---

## 13. Validation Questions

### Electrical Continuity

**Q: What does a continuous conductor represent?**
> A: A continuous electrical path where current can flow.

**Q: What does a broken conductor represent?**
> A: An open electrical path where current cannot flow. If broken by a Series Object (OPEN state), this is intentional. Otherwise, it indicates a fault.

### Series Objects

**Q: What is a Series Object?**
> A: An object that interrupts the electrical path. It exposes two connection points.

**Q: How many connection points does a Series Object expose?**
> A: **Two** (input and output).

### Parallel Objects

**Q: What is a Parallel Object?**
> A: An object that branches from an existing conductor without interrupting it.

**Q: How many connection points does a Parallel Object expose?**
> A: **One** (connection to main conductor).

### Conductor Generation

**Q: Who generates conductors?**
> A: The **renderer** generates conductors by connecting connection points.

### Earth Switch

**Q: Does an Earth Switch interrupt the main conductor?**
> A: **NO.** The Earth Switch is a Parallel Object. It creates a branch from the main conductor while the main conductor remains continuous.

---

## 14. Relationship to Other Knowledge

### 14.1 Engineering Geometry Model (EXP-013)

| Concept | Engineering Geometry | Electrical Network |
|---------|---------------------|-------------------|
| Anchor | Geometric connection point | Connection point |
| Primitive ownership | Owns geometry, not conductors | Owns device, not conductors |
| Conductor | Generated by renderer | Generated by renderer |

### 14.2 Primitive Specifications

| Primitive | Series/Parallel | Connection Points |
|-----------|-----------------|-------------------|
| Circuit Breaker | Series | 2 (top, bottom) |
| Disconnect Switch | Series | 2 (top, bottom) |
| Earthing Switch | Parallel | 1 (main) |
| Bus | Conductor | N (connections) |

---

## 15. Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-07-21 | Initial creation for EXP-014 |

---

## 16. Provenance

| Source | Reference | Date |
|--------|-----------|------|
| Lesson | EXP-014 | 2026-07-21 |
| Foundation | KDE-GEOM-MODEL-001 (EXP-013) | 2026-07-21 |
| Primitives | EXP-005, EXP-007, EXP-008 | 2026-07-21 |

---

*This knowledge artifact establishes the foundational Electrical Network Model that governs how primitives form an electrical network.*
