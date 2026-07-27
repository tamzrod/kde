# Models

---

## The Simple Idea

These are the technical specifications for KDE's components. Engine, Seed, and ECU each have a defined structure.

---

## Engine Model

### Structure

```
engine/
├── SPEC.md              # Engine specification
├── methodology.md       # Reasoning approach
├── pipeline.md         # Processing pipeline
├── knowledge-model.md  # Knowledge representation
├── changes.md          # Change log
└── provenance.md       # Origin and evolution
```

### Specification Template

```markdown
# Engine Specification

**Engine ID**: KDE-ENGINE-XXX
**Codename**: [Name]
**Status**: [Active/Historical/Experimental]
**Version**: X.Y.Z

## Purpose
[What this engine does]

## Capabilities
- [Capability 1]
- [Capability 2]

## Methodology
[How reasoning proceeds]

## Inputs
[What the engine expects]

## Outputs
[What the engine produces]

## Constraints
[Limitations and requirements]
```

---

## Seed Model

### Structure

```
seed/
├── SPEC.md              # Seed specification
├── principles/          # Core principles
│   ├── 5-principles.md # Immutable rules
│   └── derived-practices.md
└── specifications/       # Detailed specs
    └── lifecycle.md
```

### Principles Template

```markdown
# Core Principles

**Seed ID**: SEED-XXX
**Codename**: [Name]
**Status**: [Frozen/Active]

## Principles

### Principle N: [Name]
[Description]

**Rationale**: [Why this principle]
**Implementation**: [How it applies]
```

---

## ECU Model

### Components

```
runtime/ecu/
├── __init__.py         # ECU main
├── models/             # Data models
├── registry/           # Component discovery
├── resolver/           # Capability resolution
├── planner/            # Execution planning
├── policy/             # Policy enforcement
├── consensus/          # Consensus coordination
├── aggregator/         # Result aggregation
└── bootstrap/          # Bootstrap integration
```

### Capability Types

| Type | Description |
|------|-------------|
| REASONING | Logical deduction |
| ANALYSIS | Pattern recognition |
| SYNTHESIS | Combining information |
| VALIDATION | Verification |
| GENERATION | Creating new content |

---

## State Models

### Runtime State

```
UNINITIALIZED
    ↓ initialize()
INITIALIZING
    ↓ ready
READY
    ↓ error
ERROR
    ↓ recover
READY
```

### Document State

```
DRAFT
    ↓ submit()
REVIEW
    ↓ approve() / reject() / revise()
APPROVED ←→ REVISION_REQUIRED
    ↓ validate()
VALIDATED
    ↓ promote()
PROMOTED
```

### Investigation State

```
PROPOSED
    ↓ approve() / reject()
APPROVED
    ↓ begin()
IN_PROGRESS
    ↓ submit() / block()
REVIEW
    ↓ complete() / revise()
COMPLETE
```

---

## Data Models

### ExecutionRequest

```python
@dataclass
class ExecutionRequest:
    request_id: str
    description: str
    required_capabilities: List[CapabilityType]
```

### ExecutionPlan

```python
@dataclass
class ExecutionPlan:
    mode: ExecutionMode
    engines: List[EngineID]
    seed: SeedID
    steps: List[ExecutionStep]
```

### ExecutionResult

```python
@dataclass
class ExecutionResult:
    request_id: str
    plan: ExecutionPlan
    results: List[EngineResult]
    aggregated: AggregatedResult
    consensus: Optional[ConsensusResult]
```

---

## Registry Models

### EngineInfo

```python
@dataclass
class EngineInfo:
    engine_id: str
    codename: str
    status: EngineStatus
    capabilities: List[Capability]
    version: str
    specification_path: str
```

### SeedInfo

```python
@dataclass
class SeedInfo:
    seed_id: str
    codename: str
    status: SeedStatus
    version: str
    frozen: bool
    specification_path: str
```

---

## See Also

- [Architecture](architecture.md) — Repository structure
- [ECU](../5-core-concepts/ecu.md) — ECU overview
- [Engines and Seeds](../5-core-concepts/engines-and-seeds.md) — Component overview
