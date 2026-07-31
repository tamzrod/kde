# Integration Architecture: LAB-035

**Analysis Date**: 2026-07-22
**Experiment**: LAB-035
**Status**: COMPLETE

---

## Architecture Overview

This document describes the minimal integration architecture for adding a Metadata Validator to the KDE Runtime.

**Design Philosophy**: Change as little as possible while adding required functionality.

---

## Current Runtime Structure

### Current Runtime Functions (RUNTIME.md)

```
initialize()     → Initialize Runtime and Laboratory context
discover()       → Discover active investigations
track()         → Track investigation progress
archive()       → Archive completed investigations
generate_proposal() → Generate promotion proposals
```

### Current Evidence Collection

```
Evidence Collection Procedure:
1. Identify evidence need
2. Collect evidence
3. Preserve evidence (SHA-256)
4. Create reference
5. Link bidirectionally
```

**Current behavior**: Evidence is collected without metadata validation.

---

## Minimal Integration Approach

### Design Principle

**Add validation as invisible infrastructure, not as a change to behavior.**

### Integration Strategy

| Strategy | Description | Chosen? |
|----------|-------------|---------|
| **A: Append-only** | Add validation output, don't change existing | **YES** |
| B: New function | Add new Runtime function | No |
| C: Decorator | Wrap existing functions | No |
| D: Pipeline | Add validation stage | No |
| E: Sidecar | Run validation externally | No |

**Rationale**: Strategy A is the smallest change that achieves the goal.

---

## Strategy A: Append-Only Integration

### Principle

Add validation **alongside** existing behavior without modifying it.

### Change Model

```
BEFORE (Runtime):
┌─────────────────────────────────────────────┐
│ Evidence Collection                          │
│ 1. Identify need                           │
│ 2. Collect evidence                        │
│ 3. Preserve (SHA-256)                      │
│ 4. Create reference                        │
│ 5. Link bidirectionally                    │
└─────────────────────────────────────────────┘
                                             ↓
                                    Artifact Generated

AFTER (Runtime + Validation):
┌─────────────────────────────────────────────┐
│ Evidence Collection                          │
│ 1. Identify need                           │
│ 2. Collect evidence                        │
│ 3. Preserve (SHA-256)                      │
│ 4. Create reference                        │
│ 5. Link bidirectionally                    │
└─────────────────────────────────────────────┘
                                             ↓
┌─────────────────────────────────────────────┐
│ Metadata Validation (NEW - Append-only)      │
│ • Validate metadata schema                  │
│ • Generate validation output                │
│ • Store in separate validation file         │
│ • NEVER modify original artifact            │
└─────────────────────────────────────────────┘
                                             ↓
                                    Artifact Generated
                                    Validation Report Generated
```

### Key Invariants

| Invariant | Enforcement |
|-----------|-------------|
| Original artifact unchanged | Validation writes to separate file |
| Runtime behavior unchanged | Validation is post-collection |
| No blocking | Validation never throws exception |
| Deterministic output | Same input → same output |

---

## Integration Points

### Point 1: After Evidence Collection

**Location**: After step 5 in evidence collection procedure

**Change**: Add metadata validation

**No Change**: Evidence collection procedure itself

### Point 2: After Artifact Generation

**Location**: After experiment.md or analysis/*.md is written

**Change**: Validate metadata

**No Change**: File content or structure

### Point 3: At Runtime Shutdown

**Location**: Before Runtime exits

**Change**: Generate validation summary

**No Change**: Existing Runtime state

---

## Validator Implementation

### Metadata Validator Function

```python
def validate_metadata(artifact_path: str, schema: dict) -> ValidationResult:
    """
    Validate artifact metadata against schema.
    
    Args:
        artifact_path: Path to artifact file
        schema: Metadata schema definition
    
    Returns:
        ValidationResult with PASS/WARNING/ERROR
    
    Notes:
        - Read-only operation
        - Never modifies artifact
        - Outputs to separate validation file
    """
    # 1. Read artifact metadata (NOT content)
    # 2. Apply schema rules
    # 3. Return validation result
    # 4. Write to validation file (separate from artifact)
```

### Validation Output Location

```
BEFORE:
laboratory/experiments/LAB-031/
├── experiment.md          # Original artifact

AFTER:
laboratory/experiments/LAB-031/
├── experiment.md          # Original artifact (UNCHANGED)
├── validation/
│   └── metadata-validation-experiment.md  # New file (append-only)
```

### Validation Output Format

```markdown
# Metadata Validation Report

**Artifact**: experiment.md
**Timestamp**: 2026-07-22T00:00:00Z
**Validator**: MetadataValidator v0.1.0
**Result**: PASS

## Validated Fields

| Field | Required | Present | Valid |
|-------|----------|---------|-------|
| experiment_id | Yes | Yes | Yes |
| title | Yes | Yes | Yes |
| status | Yes | Yes | Yes |
| created | Yes | Yes | Yes |

## Summary

- Total fields checked: 4
- Required fields: 4
- Missing fields: 0
- Invalid fields: 0
```

---

## File Changes Summary

### Files Added

| File | Purpose | Change Type |
|------|---------|-------------|
| `runtime/validators/metadata.py` | Validator implementation | NEW |
| `runtime/validation.py` | Validation orchestration | NEW |
| `laboratory/experiments/*/validation/` | Validation reports | NEW |

### Files Modified

| File | Change | Risk |
|------|--------|------|
| `runtime/core.py` | Add validation call | LOW |

### Files NOT Modified

| File | Reason |
|------|--------|
| Evidence collection procedure | Unchanged |
| Artifact schemas | Unchanged |
| Registry format | Unchanged |
| Runtime functions | Extended, not modified |

---

## Validation Disable Procedure

### Method 1: Comment Out (Preferred)

```python
# In runtime/core.py
def collect_evidence(evidence):
    # ... existing code ...
    
    # Metadata validation (DISABLED FOR TRIAL)
    # if config.validation_enabled:
    #     validate_metadata(artifact_path)
    
    return artifact
```

### Method 2: Configuration Flag

```python
# In governance/runtime/defaults.yaml
validation:
  enabled: false  # Set to false to disable
```

### Method 3: Remove Import

```python
# Simply don't import the validation module
# from runtime.validation import validate_metadata
```

---

## Backward Compatibility

### Verified Compatibility Points

| Component | Compatibility | Verification |
|-----------|---------------|-------------|
| Existing artifacts | ✅ COMPATIBLE | No schema change |
| Existing experiments | ✅ COMPATIBLE | Validator runs after |
| Existing reports | ✅ COMPATIBLE | No report format change |
| Existing workflow | ✅ COMPATIBLE | Workflow unchanged |
| Registry | ✅ COMPATIBLE | No registry change |

### New Files Required

| File | Created By | When |
|------|-----------|------|
| validation/*.md | Runtime | On validation |
| runtime/validators/*.py | Trial | At install |

---

## Safety Mechanisms

### Runtime Safety

| Mechanism | Protection |
|-----------|-----------|
| Try/except wrapper | Never crashes Runtime |
| Separate output file | Never corrupts artifact |
| Read-only validation | Never modifies artifact |
| Non-blocking | Never stops execution |

### Validator Safety

| Mechanism | Protection |
|-----------|-----------|
| Schema validation only | Simple, predictable |
| No content analysis | Cannot produce false positives |
| Deterministic output | Reproducible results |
| Separate output | No artifact contamination |

---

## Summary

### Change Scope

| Aspect | Scope |
|--------|-------|
| Runtime functions | Extended (1) |
| Artifact format | None |
| Registry format | None |
| Evidence procedure | Unchanged |
| Workflow | Unchanged |

### Risk Assessment

| Risk | Level | Mitigation |
|------|-------|------------|
| Runtime stability | LOW | Try/except wrapper |
| Backward compatibility | LOW | Append-only |
| Artifact corruption | NONE | Separate file |
| Performance impact | MINIMAL | Simple validation |
| Rollback complexity | NONE | Comment out |

### Integration Verdict

**APPROVED FOR TRIAL**

---

*Document Status*: COMPLETE
*Evidence Type*: analysis
*Confidence*: HIGH
