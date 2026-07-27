# Runtime Concepts

Understanding the KDE runtime architecture.

---

## ECU: Execution Control Unit

The ECU orchestrates all runtime operations.

### Responsibilities

| Responsibility | Description |
|----------------|-------------|
| Engine Selection | Choose appropriate reasoning engine |
| Seed Management | Maintain foundational principles |
| Capability Resolution | Match requests to capabilities |
| Policy Enforcement | Apply governance rules |
| Result Aggregation | Combine multi-engine outputs |

### Components

```
ECU
├── Engine Registry    # Discovers available engines
├── Seed Registry      # Maintains foundational knowledge
├── Capability Resolver # Matches requests to engines
├── Execution Planner  # Creates execution pipelines
├── Policy Layer       # Enforces governance rules
├── Consensus Manager  # Coordinates multi-engine work
└── Result Aggregator  # Combines outputs
```

---

## Engine

A reasoning methodology for conducting investigations.

### Engine Properties

| Property | Description |
|----------|-------------|
| ID | Unique identifier (e.g., KDE-ENGINE-001) |
| Codename | Human-readable name (Alpha, Beta, etc.) |
| Status | Active, Historical, or Experimental |
| Capabilities | Reasoning, Analysis, Synthesis, etc. |

### Available Engines

| ID | Codename | Status |
|----|----------|--------|
| KDE-ENGINE-001 | Alpha | Historical |
| KDE-ENGINE-002 | Beta | Active |
| KDE-ENGINE-003 | Gamma | Active |
| KDE-ENGINE-004 | Delta | Active |

---

## Seed

Immutable foundational principles that guide reasoning.

### Seed Properties

| Property | Description |
|----------|-------------|
| ID | Unique identifier (e.g., SEED-001) |
| Codename | Thematic name (Genesis, Evolution, etc.) |
| Status | Frozen or Active |
| Principles | Core operational rules |

### Available Seeds

| ID | Codename | Purpose |
|----|----------|---------|
| SEED-001 | Genesis | Scientific loop, evidence model |
| SEED-002 | Evolution | Reasoning, validation |

---

## Capability Resolution

How the ECU matches requests to engines.

### Resolution Flow

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

## See Also

- [Laboratory Workflow](laboratory.md)
- [Governance](governance.md)
