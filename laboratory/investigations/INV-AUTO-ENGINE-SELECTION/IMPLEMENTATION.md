# IMPLEMENTATION.md - Automatic Engine Selection Implementation

**Source**: INV-AUTO-ENGINE-SELECTION (Human Approved)
**Date**: 2026-07-24
**Status**: COMPLETE
**Engine**: KDE-ENGINE-002 (Beta)

---

## Purpose

This document records the implementation of Automatic Engine Selection based on the approved recommendations from INV-AUTO-ENGINE-SELECTION.

**Authority**: Human Review Outcome: APPROVED

---

## Approved Recommendations Implemented

| Recommendation | Status | Evidence |
|--------------|--------|----------|
| REC-001: Implement keyword priority rules | ✅ Implemented | ENGINE-SELECTION.md |
| REC-002: Implement task classifier | ✅ Implemented | ENGINE-SELECTION.md |
| REC-003: Implement engine selection logger | ✅ Documented | ENGINE-SELECTION.md |
| REC-004: Implement sequence detector | ✅ Implemented | ENGINE-SELECTION.md |

---

## Repository Changes

### New Files Created

| File | Purpose | Version |
|------|---------|---------|
| `governance/runtime/ENGINE-SELECTION.md` | Automatic Engine Selection specification | 1.0.0 |

### Files Updated

| File | Changes | Version |
|------|---------|---------|
| `governance/runtime/RUNTIME-STARTUP.md` | Added Step 4b (Automatic Engine Selection) | 1.0.0 → 1.1.0 |
| `laboratory/BOOTSTRAP.md` | Added Engine Selection documentation | 1.0.0 → 1.1.0 |
| `engines/current.md` | Added auto-selection keywords, migration entry | Updated |

---

## Implementation Details

### 1. Keyword Priority Rules

**Source**: ENGINE-SELECTION.md Section 2

Implemented keyword-to-engine mapping based on LAB-047 evidence (>95% accuracy):

| Engine | Keywords | Confidence |
|--------|----------|------------|
| **Gamma** | why, cause, mechanism, leads to, resulted from | HIGH (90%) |
| **Gamma** | what if, prevent, intervene, how does | HIGH (85%) |
| **Delta** | bootstrap, reproduce, consistent, deterministic | HIGH (90%) |
| **Delta** | initialize, start, session | HIGH (90%) |
| **Beta** | context, when, where, condition, situation | HIGH (85%) |
| **Beta** | boundary, limit, exception, fail | HIGH (85%) |
| **Beta** | validate, check, verify | HIGH (80%) |
| **Beta** | find, detect, identify, pattern | MEDIUM (75%) |

### 2. Task Classifier

**Source**: ENGINE-SELECTION.md Section 10

Implemented algorithm for task classification:

```
FUNCTION select_engine(problem_statement, objective):
    keywords = extract_keywords(lowercase(problem_statement + " " + objective))
    scores = {
        "gamma": count_matches(keywords, GAMMA_KEYWORDS),
        "delta": count_matches(keywords, DELTA_KEYWORDS),
        "beta": count_matches(keywords, BETA_KEYWORDS)
    }
    IF reasoning_type specified: RETURN map_reasoning_to_engine(reasoning_type)
    confidence = calculate_confidence(scores, keywords)
    IF is_ambiguous(scores): RETURN resolve_conflict(scores)
    selected = argmax(scores)
    IF has_sequential_pattern(scores): RETURN (primary, secondary, sequence)
    RETURN (selected, confidence)
```

### 3. Engine Selection Logger

**Source**: ENGINE-SELECTION.md Section 8

Every selection creates a log entry:

```yaml
engine_selection_log:
  timestamp: 2026-07-24T12:00:00Z
  problem_statement: "Why did the session fail?"
  selected_engine: KDE-ENGINE-003
  engine_name: Gamma
  confidence: 90
  keywords_detected: [why, cause]
  scores: {gamma: 2, delta: 0, beta: 0}
  justification: "Causal keywords detected (why, cause)"
  sequential: null
  override: false
```

### 4. Sequence Detector

**Source**: ENGINE-SELECTION.md Section 7

Identified sequential patterns:

| Pattern | Primary | Secondary | Value |
|---------|---------|-----------|-------|
| Causal + Reproducible | Gamma | Delta | Root cause then consistency |
| Bootstrap + Analyze | Delta | Beta | Initialize then analysis |
| Context + Causal | Beta | Gamma | Context then cause |

---

## Integration with Runtime

### Startup Sequence (Updated)

```
RUNTIME STARTUP
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 1: Bootstrap (Read BOOTSTRAP.md)                      │
└─────────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 2: Load Configuration (defaults.yaml)                   │
└─────────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 3: Check Session Override                               │
└─────────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 4a: Session Override → Use Override                    │
│ Step 4b: Automatic Engine Selection (NEW)                    │
└─────────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 5: Load Selected Engine                                │
└─────────────────────────────────────────────────────────────┘
```

---

## Backward Compatibility

### Preserved Behaviors

| Behavior | Preservation Method |
|----------|-------------------|
| Default Engine (Beta) | Unchanged in defaults.yaml |
| Session Override | Unchanged, still works |
| Bootstrap Authority | Unchanged |
| Runtime defaults | Unchanged |

### New Behaviors

| New Behavior | Trigger |
|-------------|---------|
| Automatic Selection | No session_override specified AND problem_statement provided |
| Confidence Reporting | Always with selection |
| Sequential Detection | Multiple engine keywords detected |

---

## Confidence Model

| Confidence Level | Range | Behavior |
|-----------------|-------|----------|
| HIGH | 80-100% | Proceed with selection |
| MEDIUM | 50-79% | Proceed, log info |
| LOW | 30-49% | Proceed, log warning |
| VERY LOW | <30% | Use Beta default, flag |

---

## Evidence Base

The implementation is based on evidence from INV-AUTO-ENGINE-SELECTION:

| Evidence | Source | Value |
|----------|--------|-------|
| Task classification accuracy | LAB-047 | 100% (15/15) |
| Keyword-to-engine mapping | LAB-047 | >95% reliability |
| Sequential patterns | LAB-044, LAB-047 | 3 patterns identified |
| Conflict resolution | LAB-047 Phase 5 | 4 rules defined |
| Beta as default | LAB-031 | Proven (9.1s, 100% correct) |

---

## Verification

### Implementation Verification Checklist

| Check | Status | Evidence |
|-------|--------|----------|
| Keyword definitions complete | ✅ | ENGINE-SELECTION.md |
| Algorithm documented | ✅ | ENGINE-SELECTION.md |
| Confidence model defined | ✅ | ENGINE-SELECTION.md |
| Sequential patterns documented | ✅ | ENGINE-SELECTION.md |
| Logging format specified | ✅ | ENGINE-SELECTION.md |
| Runtime updated | ✅ | RUNTIME-STARTUP.md v1.1.0 |
| Bootstrap updated | ✅ | BOOTSTRAP.md v1.1.0 |
| Engine registry updated | ✅ | current.md |
| Related documents linked | ✅ | All cross-references |

---

## Change Summary

### Version Changes

| Document | Old Version | New Version |
|----------|------------|-------------|
| ENGINE-SELECTION.md | — | 1.0.0 (NEW) |
| RUNTIME-STARTUP.md | 1.0.0 | 1.1.0 |
| BOOTSTRAP.md | 1.0.0 | 1.1.0 |
| current.md | 2026-07-24 | 2026-07-24 (updated) |

### Migration Entry

Added to current.md migration history:
```
| 2026-07-24 | Auto-Selection | Automatic Engine Selection implemented (INV-AUTO-ENGINE-SELECTION) |
```

---

## Constraints Compliance

| Constraint | Compliance | Evidence |
|------------|------------|----------|
| Implement only approved recommendations | ✅ | REC-001 to REC-004 implemented |
| Do not introduce new Engines | ✅ | No new engines created |
| Do not change Engine responsibilities | ✅ | Engine specs unchanged |
| Preserve backward compatibility | ✅ | Beta remains default |
| Preserve repository authority | ✅ | Human authority unchanged |
| Base solely on investigation findings | ✅ | All from INV-AUTO-ENGINE-SELECTION |

---

## Next Steps

| Action | Owner | Status |
|--------|-------|--------|
| Commit changes | KDE-ENGINE-002 | Complete |
| Push to repository | Human | Pending |
| Notify stakeholders | Human | Pending |

---

## Related Documents

| Document | Relationship |
|----------|--------------|
| [INV-AUTO-ENGINE-SELECTION/CONCLUSION.md](./CONCLUSION.md) | Source approval |
| [ENGINE-SELECTION.md](../../governance/runtime/ENGINE-SELECTION.md) | Implementation spec |
| [RUNTIME-STARTUP.md](../../governance/runtime/RUNTIME-STARTUP.md) | Updated startup |
| [BOOTSTRAP.md](../../laboratory/BOOTSTRAP.md) | Updated bootstrap |

---

**Implementation Status**: COMPLETE
**Authority**: Human Approved
**Date**: 2026-07-24
