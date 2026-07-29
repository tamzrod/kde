# Architecture Comparison: Current vs. Recommended

**Evidence ID**: EVID-ECU-005
**Experiment**: LAB-065
**created**: 2026-07-29T04:25:00Z
**Engine**: KDE-ENGINE-001

---

## Current Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER REQUEST                             │
│                    (with pre-selected engines/seeds)              │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                    RuntimeECU.execute()                          │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Input Parameters:                                          │  │
│  │   - engine_selections (pre-selected)                       │  │
│  │   - seed_selections (pre-selected)                         │  │
│  │   - consensus_mode (optional)                               │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                ↓                                 │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ ExecutionPlanner.create_plan()                             │  │
│  │   - Uses pre-selected engines/seeds                         │  │
│  │   - Determines mode from input count                        │  │
│  │   - NO capability matching                                  │  │
│  │   - NO automatic selection                                   │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                ↓                                 │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Execute with selected components                             │  │
│  │   - CapabilityResolver exists but NOT called               │  │
│  │   - No request classification                               │  │
│  │   - Fixed execution mode                                    │  │
│  └─────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Current Characteristics

| Aspect | Current State |
|--------|---------------|
| Engine Selection | External caller provides |
| Seed Selection | External caller provides |
| Capability Matching | Not performed |
| Mode Selection | Based on input count |
| Request Classification | Not performed |
| Adaptive Execution | Not supported |

---

## Recommended Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER REQUEST                             │
│                    (natural language task)                        │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                    ECU INTELLIGENT ROUTING                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │ Request          │  │ Capability     │  │ Governance      │  │
│  │ Classifier       │→ │ Resolver        │→ │ Enforcement     │  │
│  │                  │  │                 │  │                 │  │
│  │ - Type detection │  │ - Engine match  │  │ - Policy check  │  │
│  │ - Stage mapping  │  │ - Seed match    │  │ - Rules apply  │  │
│  │ - Keywords       │  │ - Score rank    │  │ - Violations   │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
│         ↓                    ↓                     ↓              │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ SEED SELECTION                                              │  │
│  │   - GOVERNANCE seed always active (Genesis)                 │  │
│  │   - EXECUTION seed selected based on task                   │  │
│  │   - CONTEXT seed for investigation memory                  │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                ↓                                 │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ MODE SELECTOR                                               │  │
│  │   - SINGLE: Simple analysis                                │  │
│  │   - SEQUENTIAL: Multi-stage investigations                 │  │
│  │   - PARALLEL: Independent subtasks                        │  │
│  │   - CONSENSUS: High-stakes validation                      │  │
│  └─────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                    EXECUTION PIPELINE                            │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Adaptive Stage-Based Routing                                │  │
│  │                                                             │  │
│  │ IDEA → DISCOVERY Engine                                    │  │
│  │   ↓                                                         │  │
│  │ EVIDENCE → EVIDENCE Engine                                 │  │
│  │   ↓                                                         │  │
│  │ SYNTHESIS → SYNTHESIS Engine                               │  │
│  │   ↓                                                         │  │
│  │ VALIDATION → VALIDATION Engine                             │  │
│  │   ↓                                                         │  │
│  │ PROMOTION → PROMOTION Engine                               │  │
│  │                                                             │  │
│  │ Each stage: Selected engine + Execution seed + Governance   │  │
│  └─────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Recommended Characteristics

| Aspect | Recommended State |
|--------|------------------|
| Engine Selection | Automatic via CapabilityResolver |
| Seed Selection | GOVERNANCE always active, EXECUTION auto |
| Capability Matching | Integrated into execution path |
| Mode Selection | Based on task analysis |
| Request Classification | Automatic via RequestClassifier |
| Adaptive Execution | Stage-based engine switching |

---

## Genesis Lifecycle Redesign

### Current: Genesis Participates in Execution

```
Genesis ─────────────────→ Execution (confusing)
    │
    └── Provides: Principles, Evidence Model, Confidence
```

### Recommended: Genesis is Governance Only

```
Genesis ─────────────────→ Policy Enforcement (clear)
    │
    └── Type: GOVERNANCE
    └── Status: FROZEN
    └── Purpose: Five Core Principles only
    └── NOT: Execution strategy

New EXECUTION Seeds ──────→ Task Execution (separate)
    │
    └── Type: EXECUTION
    └── Status: ACTIVE
    └── Purpose: Investigation strategies
    └── Selected: Based on task capabilities
```

---

## STOP ENGINE Mechanism

### Current Behavior

```python
# runtime/principles_enforcer.py
class PrincipleViolationError(Exception):
    """Raised when a principle violation is detected."""
```

### Recommended Behavior: Execution Gate with Safety Interlock

```
┌─────────────────────────────────────────────────────────────────┐
│                    STOP ENGINE Gate                              │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Before Execution:                                           │  │
│  │   1. Policy check → Violation?                               │  │
│  │   2. If violation → STOP with remediation                   │  │
│  │   3. If passed → Continue execution                         │  │
│  │                                                             │  │
│  │ Gate Properties:                                            │  │
│  │   - Blocks specific operations (not entire system)           │  │
│  │   - Provides clear remediation guidance                     │  │
│  │   - Allows human override with acknowledgment               │  │
│  │   - Logs all violations for audit                          │  │
│  └─────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Engineering Analogy Comparison

| Analogy | Fit | Characteristics |
|---------|-----|-----------------|
| Kernel Panic | 3/10 | Too severe, system failure |
| Security Policy | 8/10 | Access control, specific rules |
| Permission Denied | 7/10 | Access control, clear rejection |
| **Execution Gate** | **9/10** | **Pre-execution check, allows override** |
| **Safety Interlock** | **8/10** | **Failsafe, guards critical operations** |
| Runtime Exception | 4/10 | Too generic, error handling |

**Recommendation**: STOP ENGINE = **Execution Gate** (primary) + **Safety Interlock** (secondary)

---

## Advantages and Disadvantages

### Current Architecture

| Advantages | Disadvantages |
|------------|---------------|
| Simple implementation | No automatic optimization |
| Predictable behavior | Requires external selection |
| Clear input/output | Static execution |
| | Suboptimal engine-task matching |

### Recommended Architecture

| Advantages | Disadvantages |
|------------|---------------|
| Automatic engine-task optimization | Increased complexity |
| Stage-based adaptive execution | Integration effort |
| Clear separation: Governance vs Execution | Performance overhead (minimal) |
| Better investigation quality | Risk of selection errors |

### Net Assessment

**Recommended Architecture provides significantly better execution quality with manageable complexity increase.**

---

## Migration Strategy

### Phase 1: Backward Compatibility
- Make new parameters optional
- Default to current behavior
- No breaking changes

### Phase 2: Optional Intelligence
- Add `allow_auto_select` flag
- Default to False
- Allow gradual adoption

### Phase 3: Default to Intelligent
- Flip default to True
- Deprecate pre-selection mode
- Full migration complete

---
