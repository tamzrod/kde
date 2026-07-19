# Run Record: LAB-XXX / RUN-XXX

**Experiment ID**: LAB-XXX
**Run ID**: RUN-XXX
**Date**: YYYY-MM-DD HH:MM:SS
**Executor**: [Name or system identifier]
**Duration**: [HH:MM:SS]
**Reproducibility Run**: [YES | NO]
**Methodology Version**: 2.2

---

## Trigger

[What actually happened - the real-world event that caused the engineering decision]

**Examples**:
- User requested feature via issue
- Runtime installed into incorrect directory
- Docker build failed with error
- Repository inconsistency detected
- Documentation contradiction discovered

---

## Decision

[What engineering decision is required?]

---

## Knowledge Used

| Knowledge ID | Definition |
|-------------|------------|
| KDE-XXX | [Definition text] |

---

## Observation

[ONLY factual observations - no interpretation, no justification, no conclusions]
[Assign OBS-XXX IDs to each observation]
[Each observation must reference supporting Evidence IDs]

| OBS-ID | Observation | Evidence |
|--------|-------------|----------|
| OBS-001 | [Fact] | [EV-XXX] |
| OBS-002 | [Fact] | [EV-XXX] |

---

## Evidence

[Reference independently retrievable artifacts]
[Assign EV-XXX IDs]
[Each evidence must identify which Observation(s) it supports]

| EV-ID | Type | Source | Reference | Description | Supports |
|-------|------|--------|-----------|-------------|----------|
| EV-001 | log | terminal | stdout | Output | OBS-001, OBS-002 |
| EV-002 | file | filesystem | /path | Content | OBS-001 |

---

## Traceability Validation

**Status**: [VALID | INVALID]

### Validation Checks

| Check | Result |
|-------|--------|
| ✓ Every Observation has Evidence | [PASS/FAIL] |
| ✓ Every Evidence supports Observation | [PASS/FAIL] |

### Invalid Observations
[None / List invalid observation IDs with reason]

### Unused Evidence
[None / List unused evidence IDs]

---

## Ambiguity

| Ambiguity | Classification | Description |
|-----------|---------------|-------------|
| [Description] | [Blocking/Productive] | [What caused ambiguity] |

---

## Decision Outcome

[Record the engineering decision taken]

---

## Knowledge Assessment

| Knowledge | Assessment | Justification |
|----------|------------|---------------|
| KDE-XXX | [SUPPORTS/CONTRADICTS/INCONCLUSIVE] | [Concise reason] |

---

## Confidence

| Factor | Evidence | Assessment |
|--------|----------|------------|
| Run Count | [N runs] | [H/M/L] |
| Evidence Quality | [complete/partial/missing] | [H/M/L] |
| Reproducibility | [established/not] | [H/M/L] |
| Traceability | [100%/N% valid] | [H/M/L] |

**Confidence Level**: [HIGH | MEDIUM | LOW]

---

## Recommendation

[Continue | Repeat | Stop Experiment]

---

## Metadata

| Field | Value |
|-------|-------|
| Run ID | RUN-XXX |
| Experiment ID | LAB-XXX |
| Date | YYYY-MM-DD HH:MM:SS |
| Methodology Version | 2.2 |
