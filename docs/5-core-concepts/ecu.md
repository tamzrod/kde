# ECU

---

## The Simple Idea

In aviation, the pilot flies the plane—but the autopilot ensures the plane can fly safely. It monitors systems, enforces protocols, and prevents dangerous states.

KDE has the same architecture. The Engine investigates. The ECU (Execution Control Unit) ensures the investigation can proceed safely.

---

## Real-World Observation

A modern aircraft has thousands of sensors. The pilot can't monitor all of them simultaneously. The autopilot does—it watches for problems, applies corrections, and alerts the pilot when attention is needed.

The pilot makes decisions. The autopilot ensures decisions can be executed.

KDE's ECU is the autopilot. The Engine makes decisions. The ECU ensures those decisions are safe.

---

## What the ECU Does

The ECU orchestrates KDE operations. It does not investigate—that's the Engine's job. The ECU ensures investigations can proceed correctly.

| Responsibility | What It Means |
|----------------|---------------|
| **Engine Selection** | Chooses the right Engine for the task |
| **Seed Management** | Maintains and loads foundational principles |
| **Policy Enforcement** | Applies governance rules |
| **Capability Resolution** | Matches requests to available capabilities |
| **Result Aggregation** | Combines multi-Engine outputs |

---

## The Components

```
ECU
├── Engine Registry        # Discovers available Engines
├── Seed Registry         # Maintains Seeds
├── Capability Resolver   # Matches requests to capabilities
├── Execution Planner    # Creates execution pipelines
├── Policy Layer        # Enforces governance rules
├── Consensus Manager    # Coordinates multi-Engine work
└── Result Aggregator   # Combines outputs
```

---

## The Pre-Flight Check

Before any investigation, the ECU verifies system readiness:

```
■ CHECK 1: INITIALIZATION
  Status: ✅ READY

■ CHECK 2: ENGINE REGISTRY
  Engines: [N] total | Active

■ CHECK 3: SEED REGISTRY
  Seeds: [N] registered

■ CHECK 4: POLICY LAYER
  Rules: [N]
  Active Violations: 0

■ CHECK 5: SYSTEM HEALTH
  Status: ✅ HEALTHY
```

This isn't optional. It's how you know you're safe to proceed.

---

## Policy Enforcement

The ECU enforces governance rules:

| Rule | What It Prevents |
|------|-----------------|
| engine_must_be_registered | Unverified engines |
| engine_must_have_specification | Undefined capabilities |
| seed_must_be_registered | Unverified principles |
| execution_plan_must_be_valid | Invalid execution |
| no_unofficial_assets | Untrusted components |

Violations block execution. Not warnings—blocks.

---

## Execution Modes

The ECU can run investigations in different modes:

| Mode | When to Use |
|------|-------------|
| **SINGLE** | One Engine is sufficient |
| **SEQUENTIAL** | Multiple Engines, one after another |
| **PARALLEL** | Multiple Engines simultaneously |
| **CONSENSUS** | Multiple Engines must agree |
| **ADVERSARIAL** | Engines challenge each other |

---

## State Machine

The ECU follows a strict state machine:

```
UNINITIALIZED
    ↓ initialize()
INITIALIZING
    ↓ ready
READY
    ↓ error
ERROR
```

You can't investigate if the ECU isn't ready. This is intentional.

---

## See Also

- [Engines and Seeds](engines-and-seeds.md) — What the ECU coordinates
- [Laboratory](laboratory.md) — Where investigations happen
- [Architecture](../8-architecture/models.md) — Technical details
