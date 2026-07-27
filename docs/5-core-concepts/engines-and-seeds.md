# Engines and Seeds

---

## The Simple Idea

KDE uses two complementary systems for reasoning:

- **Engines** — How you investigate
- **Seeds** — What guides your investigation

Think of it as: the engine is the vehicle, the seed is the map. The engine determines how you travel. The seed determines where you're going.

---

## Real-World Observation

A researcher and a detective both solve mysteries. But they use different methods.

The researcher systematically tests hypotheses. The detective follows clues where they lead. Same goal—understanding what happened. Different methodologies.

KDE supports both. Engines are different methodologies for investigation.

---

## Engines

### What is an Engine?

An Engine is a reasoning methodology. It defines how investigations are conducted.

Each Engine has:
- **ID** — Unique identifier (e.g., KDE-ENGINE-001)
- **Codename** — Human-readable name
- **Status** — Active, Historical, or Experimental
- **Capabilities** — What it does well

### Available Engines

| ID | Codename | Purpose |
|----|----------|---------|
| KDE-ENGINE-001 | Alpha | Pattern discovery |
| KDE-ENGINE-002 | Beta | Contextual knowledge |
| KDE-ENGINE-003 | Gamma | Causal discovery |
| KDE-ENGINE-004 | Delta | Bootstrap + Context |

### Engine Strengths

**Alpha (Pattern Discovery)**
- Finds relationships in data
- Identifies themes
- Surfaces anomalies
- *Best for: Initial exploration*

**Beta (Contextual Knowledge)**
- Interprets nuance
- Considers circumstances
- Provides depth
- *Best for: Understanding significance*

**Gamma (Causal Discovery)**
- Identifies root causes
- Traces dependencies
- Predicts outcomes
- *Best for: Finding why things happen*

**Delta (Bootstrap + Context)**
- Systematic approach
- Bootstrapped validation
- Context awareness
- *Best for: Comprehensive investigation*

---

## Seeds

### What is a Seed?

A Seed contains immutable principles that guide all reasoning.

Seeds are foundational. They're not changed.

### Seed Properties

- **ID** — Unique identifier (e.g., SEED-001)
- **Codename** — Thematic name
- **Status** — Frozen or Active
- **Principles** — Core rules

### Available Seeds

| ID | Codename | Purpose |
|----|----------|---------|
| SEED-001 | Genesis | Scientific loop, evidence model |
| SEED-002 | Evolution | Reasoning, validation |

### The Immutability Rule

> Seeds shall never be modified after creation.

Once frozen, a Seed represents foundational truth. Changing it would undermine everything built on it.

---

## The Scientific Loop

Every Engine follows the same pattern:

```
OBSERVE → HYPOTHESIZE → PREDICT → TEST → ANALYZE → ITERATE?
```

1. **Observe** — Gather data
2. **Hypothesize** — Form hypothesis
3. **Predict** — Predict outcomes
4. **Test** — Validate hypothesis
5. **Analyze** — Interpret results
6. **Iterate?** — Continue or conclude

This isn't KDE's invention. It's how science has worked for centuries.

---

## How They Work Together

```
Human Request
      ↓
    ECU (Orchestrates)
      ↓
   ┌─────────┐
   │ Engine  │ ← Method (how to investigate)
   └────┬────┘
        │
   ┌────┴────┐
   │  Seed   │ ← Principles (what guides investigation)
   └────┬────┘
        ↓
  Investigation Result
```

The ECU coordinates. The Engine provides methodology. The Seed provides principles.

---

## See Also

- [ECU](ecu.md) — The orchestrator
- [Laboratory](laboratory.md) — Where investigations happen
- [Processes](../6-how-it-works/processes.md) — How investigations flow
