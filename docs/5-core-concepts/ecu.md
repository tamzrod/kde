# ECU

**Purpose**: Execution Control Unit - KDE's orchestration system
**Audience**: Practitioners, contributors

---

## Overview

The ECU (Execution Control Unit) orchestrates all KDE runtime operations. It does not conduct investigations itself—that is the Engine's role. The ECU ensures investigations can proceed correctly.

---

## ECU Responsibilities

| Responsibility | Description |
|----------------|-------------|
| **Engine Selection** | Choose appropriate Engine for task |
| **Seed Management** | Maintain and load Seeds |
| **Capability Resolution** | Match requests to capabilities |
| **Policy Enforcement** | Apply governance rules |
| **Result Aggregation** | Combine multi-Engine outputs |

---

## ECU Components

```
ECU
├── Engine Registry        # Discovers available Engines
├── Seed Registry         # Maintains Seeds
├── Capability Resolver   # Matches requests to capabilities
├── Execution Planner     # Creates execution pipelines
├── Policy Layer          # Enforces governance rules
├── Consensus Manager     # Coordinates multi-Engine work
└── Result Aggregator     # Combines outputs
```

---

## Engine Registry

Automatically discovers available Engines:

- Parses Engine specifications
- Extracts capabilities
- Tracks status (Active, Historical, Experimental)
- Supports dynamic loading

---

## Seed Registry

Maintains foundational Seeds:

- Loads frozen Seeds at startup
- Verifies Seed integrity
- Provides Seed capabilities to Engine
- Ensures immutability

---

## Capability Resolver

Matches requests to Engine capabilities:

```
User Request
    ↓
Required Capabilities
    ↓
Matching Engines (by capability)
    ↓
Engine Ranking (by confidence)
    ↓
Seed Selection (by compatibility)
    ↓
Execution Plan
```

---

## Policy Layer

Enforces governance rules:

| Rule | Severity | Action |
|------|----------|--------|
| engine_must_be_registered | Error | Block |
| engine_must_have_specification | Error | Block |
| seed_must_be_registered | Error | Block |
| execution_plan_must_be_valid | Error | Block |
| no_unofficial_assets | Error | Block |

---

## Execution Planner

Creates execution pipelines:

| Mode | Description |
|------|-------------|
| **SINGLE** | Single Engine execution |
| **SEQUENTIAL** | Multiple Engines in order |
| **PARALLEL** | Multiple Engines simultaneously |
| **CONSENSUS** | Multi-Engine with agreement |
| **SEED_ASSISTED** | Seed-enhanced execution |

---

## Consensus Manager

Coordinates multi-Engine work:

| Strategy | Description |
|----------|-------------|
| **SINGLE** | First valid result wins |
| **MAJORITY** | >50% agreement required |
| **UNANIMOUS** | All Engines must agree |
| **WEIGHTED** | Weighted by Engine priority |
| **ADVERSARIAL** | Adversarial evaluation |

---

## State Machine

```
UNINITIALIZED
    ↓ initialize()
INITIALIZING
    ↓ ready
READY
    ↓ error
ERROR
```

---

## Using the ECU

### Initialize

```python
from runtime.ecu import create_ecu

ecu = create_ecu('/path/to/kde')
```

### Get State

```python
state = ecu.get_runtime_state()
```

### Run Pre-Flight

```python
# From command line
pre-flight check
```

---

## See Also

- [Engines and Seeds](engines-and-seeds.md) - Reasoning components
- [Laboratory](laboratory.md) - Investigation workspace
- [Architecture](../8-architecture/models.md) - Technical details
