# Investigation: INV-RUNTIME-GAPS

**Investigation ID**: INV-RUNTIME-GAPS
**created**: 2026-07-29T05:40:00Z
**modified**: 2026-07-29T05:45:00Z
**Status**: COMPLETE
**Author**: OpenHands Agent
**Domain**: Runtime Governance / System Integrity

---

## Research Question

Why was experiment LAB-SANDWICH-001 allowed to execute without proper runtime verification, dependency checking, and engine validation?

## Scope

- Runtime ECU bootstrap and initialization process
- Policy layer dependency validation coverage
- Five Core Principles enforcement gaps
- Experiment execution bypass conditions

## Background

During execution of experiment LAB-SANDWICH-001, the preflight check failed with:

```
ModuleNotFoundError: No module named 'yaml'
```

Despite this, the experiment was allowed to proceed and artifacts were created. This represents a critical governance gap.

---

## Evidence Collection

### Evidence 1: Failed Preflight Check

**Location**: `/workspace/project/kde/runtime/preflight.py`
**Type**: Runtime Failure

```
Traceback (most recent call last):
  File "<string>", line 2, in <module>
    from runtime.preflight import run_preflight_check
  File "/workspace/project/kde/runtime/ecu/__init__.py", line 18, in <module>
    from .registry import EngineRegistry
  File "/workspace/project/kde/runtime/ecu/registry/engine_registry.py", line 8, in <module>
    import yaml
ModuleNotFoundError: No module named 'yaml'
```

### Evidence 2: Runtime State Shows "Initialized"

**Location**: `/workspace/project/kde/runtime/state.json`
**Type**: Contradictory State

```json
{
  "status": "initialized",
  "initialized_at": "2026-07-26T00:00:00Z",
  "state": "ready",
  "ecu_configured": true
}
```

### Evidence 3: Fake Engine References in Experiment

**Location**: `/workspace/project/kde/laboratory/experiments/LAB-SANDWICH-001/experiment.md`

```markdown
**Engine**: KDE-ENGINE-CULINARY-001
**Seed**: SEED-FLAVOR-001
**Investigation**: INV-CULINARY-SYNTHESIS
```

None of these exist in the actual runtime registries.

### Evidence 4: Bootstrap Has No Dependency Check

**Location**: `/workspace/project/kde/runtime/ecu/bootstrap/__init__.py`

The `ECUBootstrap._generate_validation_report()` method checks:
- Engine count
- Seed count
- Policy violations
- Directory existence

**Missing Checks**:
- Python package availability
- Runtime import validation
- Actual ECU instantiation success

### Evidence 5: Policy Layer Gaps

**Location**: `/workspace/project/kde/runtime/ecu/policy/__init__.py`

Policy rules include:
- `engine_must_be_registered` ✓
- `engine_must_have_specification` ✓
- `seed_must_be_registered` ✓
- `execution_plan_must_be_valid` ✓

**Missing Rules**:
- `runtime_dependencies_available` ✗
- `engine_actually_importable` ✗
- `preflight_validation_required` ✗

---

## Observation

### Factual Findings

| # | Observation | Category |
|---|-------------|----------|
| 1 | `engine_registry.py` imports `yaml` directly | Measurement |
| 2 | Preflight fails when yaml is missing | Event |
| 3 | State.json shows "initialized" despite preflight failure | Fact |
| 4 | Experiment references non-existent engine and seed | Behavior |
| 5 | No Python package dependency validation in bootstrap | Event |

### Pattern Identification

1. **Dependency Blindspot**: Runtime claims "initialized" without verifying imports work
2. **State-Stating vs State-Verifying**: State file is set without verification
3. **Unregistered Engine Bypass**: Experiments can claim any engine without validation
4. **Bootstrap Validation Gap**: Only structural checks, no functional checks

---

## Synthesis

### Root Cause Analysis

The system has a fundamental disconnect between:

1. **Claimed State** vs **Actual State**
   - `state.json` is set to "initialized" manually or by previous run
   - No verification that system can actually start from scratch

2. **Policy Structure** vs **Policy Enforcement**
   - Policy rules exist for engines and seeds
   - No rules for runtime dependencies or import validation

3. **Experiment Creation** vs **ECU Involvement**
   - Files are created without ECU involvement
   - ECU is never consulted during experiment creation
   - No validation gate before artifact creation

### Governance Failure Chain

```
Human Expectation: "Experiments should be validated by ECU"
                        ↓
        ECU is not called during experiment creation
                        ↓
        Files created without any validation
                        ↓
        Runtime "initialized" from stale state file
                        ↓
        Preflight fails, but experiment already complete
                        ↓
        No mechanism to detect or prevent this
```

---

## Validation

### Logical Consistency

The reasoning is internally consistent:
- If ECU is not invoked → no validation occurs
- If no validation → arbitrary engines/seeds can be claimed
- If preflight fails → runtime cannot verify anything
- If state is stale → system appears ready when it is not

### Assumption Documentation

| Assumption | Status |
|------------|--------|
| ECU is invoked for all experiments | FALSE |
| State file reflects actual runtime state | FALSE |
| Preflight is required before execution | NOT ENFORCED |
| Engine references are validated | NOT ENFORCED |

---

## Candidate Knowledge

### Finding 1: Runtime Dependency Validation Gap

**Statement**: The KDE Runtime does not validate Python package dependencies at bootstrap time, allowing systems to report "initialized" status while critical imports fail.

**Evidence**: 
- `preflight.py` fails with `ModuleNotFoundError: No module named 'yaml'`
- `state.json` still shows `"initialized": true`

### Finding 2: Experiment Artifact Bypass

**Statement**: Laboratory experiments can be created and completed without ECU involvement, bypassing all governance checks.

**Evidence**:
- LAB-SANDWICH-001 created with fake engine/seed IDs
- No validation occurred during creation
- ECU was never consulted

### Finding 3: State vs. Verification Disconnect

**Statement**: The runtime uses claimed state (in state.json) rather than verified state, creating false confidence in system readiness.

**Evidence**:
- State shows "ready" despite preflight failures
- No mechanism to verify state matches reality

---

## Limitations

- Only examined YAML dependency scenario
- Did not test other missing dependencies
- Did not examine actual working ECU scenarios
- LAB-SANDWICH-001 was a single test case

---

## Recommendations

See: `/laboratory/investigations/INV-RUNTIME-GAPS/recommendations.md`

---

## Implementation Update: Auto-Install Behavior

**Human Expectation**: The system should ATTEMPT to install missing dependencies automatically, not just block immediately.

**Implemented Behavior**:
1. Dependency checker detects missing package
2. Automatically runs `pip install <package>`
3. Verifies the import works after installation
4. Only blocks if auto-install fails
5. Reports what was auto-installed vs what requires manual intervention

**Files Updated**:
- `/runtime/ecu/dependency_checker.py` - Added `check_and_fix()` with auto-install
- `/laboratory/investigations/INV-RUNTIME-GAPS/recommendations.md` - Updated with new behavior

---

## Metadata

| Field | Value |
|-------|-------|
| Investigation ID | INV-RUNTIME-GAPS |
| created | 2026-07-29T05:40:00Z |
| modified | 2026-07-29T05:45:00Z |
| Confidence | HIGH |
| Schema Version | 2.0 |

---

## Status

```
Idea                    ✅
Investigation           ✅
Evidence Collection     ✅
Observation             ✅
Synthesis               ✅
Validation              ✅
Candidate Knowledge     ✅
Promotion Proposal      ⏳
Knowledge Repository    ⏳
```
