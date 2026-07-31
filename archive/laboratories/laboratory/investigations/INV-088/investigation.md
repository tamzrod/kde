# Investigation: ECU Runtime Execution Control Architecture

**Investigation ID**: INV-088
**created**: 2026-07-29T03:58:00Z
**modified**: 2026-07-29T03:58:00Z
**Status**: ACTIVE
**Domain**: AI Runtime Architecture
**Engine**: KDE-ENGINE-001
**Seed**: SEED-001 (Genesis)
**Methodology**: Knowledge-Driven Engineering v2.0

---

## Research Question

**Primary Question**: Why does the KDE Runtime always execute using the Genesis seed, and why is Engine selection static rather than dynamic?

**Secondary Questions**:
1. What are the current responsibilities of the ECU?
2. Should the ECU perform intelligent execution planning?
3. What should Seed actually represent in the architecture?
4. Should Engines be specialized and automatically selected?
5. What is the proper lifecycle for Genesis?

---

## Evidence-Based Findings

### Finding 1: ECU Current State

The ECU (`runtime/ecu/__init__.py`) currently provides:
- Engine Registry with automatic discovery
- Seed Registry with automatic discovery
- Capability Resolver for capability matching
- Execution Planner for plan generation
- Policy Layer for rule enforcement
- Consensus Manager for multi-engine coordination
- Result Aggregator for output aggregation

**OBSERVATION**: The infrastructure exists for intelligent routing, but **the actual selection logic is not being invoked during runtime execution**.

### Finding 2: Genesis Always Selected

Evidence from `runtime/principles_enforcer.py`:
```python
def get_principles_status(self) -> Dict[str, Any]:
    return {
        "enforcer_active": True,
        "seed_id": "SEED-001",
        "seed_name": "Genesis",
        ...
    }
```

**OBSERVATION**: Genesis is hardcoded as the authority for the Five Core Principles enforcer. The enforcer references Genesis as the source of authority, but Genesis is not being used for execution strategy selection.

### Finding 3: Engine Selection Mechanism Exists But Unused

From `runtime/ecu/resolver/__init__.py`:
- `CapabilityResolver.resolve()` calculates match scores between request capabilities and engine capabilities
- `CapabilityResolver.select_seeds()` finds compatible seeds for selected engines
- `ExecutionPlanner` generates execution plans with different modes (SINGLE, SEQUENTIAL, PARALLEL, CONSENSUS)

**OBSERVATION**: The capability resolution infrastructure exists, but the `RuntimeECU.execute()` method requires explicit `engine_selections` and `seed_selections` parameters. There is **no automatic selection logic** that invokes the resolver.

### Finding 4: ExecutionPlanner Has Multiple Modes

From `runtime/ecu/planner/__init__.py`:
- `SINGLE`: Single engine execution
- `SEQUENTIAL`: Multiple engines in sequence
- `PARALLEL`: Multiple engines concurrent
- `CONSENSUS`: Multiple engines with consensus
- `SEED_ASSISTED`: Seed-based context enhancement

**OBSERVATION**: The planner supports diverse execution strategies, but the selection of which mode to use depends entirely on the input parameters. **No intelligent mode selection based on task characteristics**.

---

## Root Cause Analysis

### Current Execution Flow

```
User Request
    ↓
External Caller (provides engine_selections, seed_selections)
    ↓
RuntimeECU.execute()
    ↓
ExecutionPlanner.create_plan()
    ↓
Engine Execution
```

**PROBLEM**: The ECU is **NOT** performing:
1. Request classification
2. Capability analysis
3. Automatic Engine selection
4. Automatic Seed selection
5. Mode determination based on task

### Why Genesis Appears Static

1. Genesis is the **authority source** for the Five Core Principles, not an execution strategy
2. The principles enforcer always references Genesis for governance rules
3. Genesis is not being compared against other Seeds for execution selection
4. No selection algorithm evaluates which Seed fits the task

### Why Engine Selection Appears Static

1. External callers must provide `engine_selections`
2. No automatic invocation of `CapabilityResolver.resolve()`
3. No task-to-capability mapping in the execution path
4. The resolver exists but is not integrated into the main execution flow

---

## Recommended Architecture

### Option A: ECU Performs All Governance Before Execution (RECOMMENDED)

**Rationale**: Centralizing governance in ECU ensures:
- Consistent policy enforcement
- Single point of control
- Clear separation of concerns

**Proposed Flow**:
```
User Request
    ↓
ECU.analyze_request()        ← NEW: Classify task, extract capabilities
    ↓
ECU.resolve_capabilities()   ← Uses CapabilityResolver
    ↓
ECU.select_engine()          ← NEW: Intelligent engine selection
    ↓
ECU.select_seed()            ← NEW: Intelligent seed selection
    ↓
ECU.determine_mode()         ← NEW: Select execution mode
    ↓
ECU.enforce_governance()     ← Policy checks before execution
    ↓
ECU.execute_plan()           ← Execute with selected components
```

### Option B: Genesis Performs Governance

**PROBLEMS**:
- Genesis is currently a metadata bundle (principles, evidence model)
- Not designed as an active execution component
- Would conflate knowledge content with governance logic
- **NOT RECOMMENDED**

### Option C: Governance Distributed Across Engines

**PROBLEMS**:
- Inconsistent enforcement
- Each engine might interpret rules differently
- Higher risk of governance bypass
- **NOT RECOMMENDED**

---

## Seed Concept Redesign

### Current Seed Definition

Seeds currently represent:
- Knowledge bundles (Genesis has principles, evidence model, confidence model)
- Compatibility lists with engines
- Capability definitions

### Recommended Seed Types

| Seed Type | Purpose | Lifecycle |
|-----------|---------|-----------|
| **BOOTSTRAP** | Runtime initialization only | Loaded at startup, unloaded after init |
| **EXECUTION** | Task-specific execution strategy | Selected per-task, replaced between tasks |
| **GOVERNANCE** | Policy and rules (Genesis moves here) | Persistent, immutable |
| **CONTEXT** | Investigation-specific memory | Persists within investigation |

### Genesis Lifecycle Redesign

**RECOMMENDATION**: Genesis should become a pure GOVERNANCE seed.

| Phase | Genesis State | ECU State |
|-------|--------------|-----------|
| Runtime Init | LOADED (bootstrap) | INITIALIZING |
| Policy Setup | ACTIVE (governance) | READY |
| Execution | ACTIVE (governance only) | EXECUTING |
| Post-Execution | ACTIVE (governance) | COMPLETE |

Genesis should **NOT** participate in execution strategy selection. It should only provide:
- Five Core Principles
- Evidence classification rules
- Governance policies

---

## Engine Specialization

### Current Engine Capabilities

From `runtime/ecu/registry/engine_registry.py`:

| Engine | Capabilities |
|--------|--------------|
| ALPHA | Reasoning, Analysis |
| BETA | Reasoning, Analysis, Synthesis |
| GAMMA | Reasoning, Analysis, Synthesis, Validation |
| DELTA | Reasoning, Analysis, Generation |
| EPSILON | Validation, Evaluation |
| ADVERSARIAL | Evaluation, Analysis |
| CONSENSUS-SYNTH | Synthesis, Validation |
| PROTOCOL-SYNTH | Synthesis, Generation |

### Recommended Engine Specialization

| Engine Type | Capabilities | Use Case |
|-------------|--------------|----------|
| **DISCOVERY** | Analysis | Pattern recognition, research |
| **EVIDENCE** | Validation | Evidence collection, verification |
| **SYNTHESIS** | Synthesis, Generation | Hypothesis generation, technique creation |
| **VALIDATION** | Validation, Evaluation | Theory testing, result verification |
| **PROMOTION** | Reasoning, Analysis | Knowledge promotion, review |

### Adaptive Execution Pipeline

```
IDEA Stage      → DISCOVERY Engine + EXECUTION Seed
    ↓
EVIDENCE Stage  → EVIDENCE Engine + EXECUTION Seed
    ↓
SYNTHESIS      → SYNTHESIS Engine + EXECUTION Seed
    ↓
VALIDATION      → VALIDATION Engine + EXECUTION Seed
    ↓
PROMOTION       → PROMOTION Engine + GOVERNANCE Seed
```

---

## STOP ENGINE Mechanism

### Current Implementation

From `runtime/principles_enforcer.py`:
```python
class PrincipleViolationError(Exception):
    """Raised when a principle violation is detected and blocked."""
```

### Engineering Analogy Analysis

| Analogy | Fit Score | Assessment |
|---------|-----------|------------|
| Kernel Panic | 3/10 | Too severe, total system failure |
| Security Policy | 8/10 | Good fit - blocks specific violations |
| Permission Denied | 7/10 | Good fit - access control analogy |
| Execution Gate | 9/10 | **BEST FIT** - pre-execution check |
| Runtime Exception | 4/10 | Too generic |
| Safety Interlock | 8/10 | Good fit - failsafe mechanism |

**RECOMMENDATION**: STOP ENGINE should behave as an **Execution Gate with Safety Interlock characteristics**.

Properties:
- Blocks specific operations, not entire execution
- Provides clear remediation guidance
- Allows human override with acknowledgment
- Logs all violations for audit

---

## Proposed KDE Runtime Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER REQUEST                             │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                           ECU (Central)                          │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────┐  │
│  │ Request      │  │ Capability  │  │ Governance             │  │
│  │ Classifier   │→ │ Resolver    │→ │ Enforcement            │  │
│  └──────────────┘  └──────────────┘  └────────────────────────┘  │
│         ↓                ↓                     ↓                │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────┐  │
│  │ Engine      │  │ Seed        │  │ Mode                   │  │
│  │ Selector    │  │ Selector    │  │ Selector                │  │
│  └──────────────┘  └──────────────┘  └────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                     EXECUTION PLANNER                            │
│  Creates execution plan with selected Engine + Seed + Mode       │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                     EXECUTION PIPELINE                          │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐          │
│  │ Stage 1 │ → │ Stage 2 │ → │ Stage 3 │ → │ Stage N │          │
│  │ Engine  │   │ Engine  │   │ Engine  │   │ Engine  │          │
│  │ + Seed  │   │ + Seed  │   │ + Seed  │   │ + Seed  │          │
│  └─────────┘   └─────────┘   └─────────┘   └─────────┘          │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                    RESULT AGGREGATOR                             │
│  Combines outputs, manages consensus, produces final result      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Investigation Stages (9-Stage Workflow)

- [x] 1. IDEA - Research questions formulated
- [x] 2. INVESTIGATION - ECU architecture analyzed
- [x] 3. EVIDENCE COLLECTION - Code review completed
- [ ] 4. OBSERVATION - Pattern identification
- [ ] 5. SYNTHESIS - Architecture redesign
- [ ] 6. VALIDATION - Theoretical evaluation
- [ ] 7. CANDIDATE KNOWLEDGE - Draft recommendations
- [ ] 8. PROMOTION - Review and approval
- [ ] 9. KNOWLEDGE REPOSITORY - Archive findings

---

## Key Recommendations Summary

1. **ECU should perform intelligent execution planning**, not just initialization
2. **Genesis should become a GOVERNANCE seed**, not an execution seed
3. **Seeds should have distinct types**: BOOTSTRAP, EXECUTION, GOVERNANCE, CONTEXT
4. **Engines should specialize** by investigation stage
5. **Adaptive execution** should switch Engines based on stage
6. **STOP ENGINE = Execution Gate with Safety Interlock** characteristics
7. **Automatic capability resolution** should be integrated into ECU.execute()

---

## Notes

This investigation challenges the assumption that the current KDE architecture is optimal. Evidence shows that while the ECU infrastructure supports intelligent routing, the actual selection logic is not being invoked, leading to static execution behavior.

---
