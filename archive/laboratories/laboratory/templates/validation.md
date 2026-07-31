# Validation Template

**Template Version**: 1.0.0
**Date**: 2026-07-21
**Architecture**: Architecture C

---

## Purpose

This template defines the structure for validation reports. Validation verifies that findings meet quality standards.

---

## Validation Principles

| Principle | Description |
|-----------|-------------|
| **Quality Verification** | Verify findings meet standards |
| **Evidence Traceability** | All claims trace to evidence |
| **Logical Soundness** | Reasoning is valid |
| **Completeness** | All dimensions addressed |

---

## Validation Report Template

```markdown
# Validation Report: [Investigation/Experiment]

**ID**: VAL-XXX
**Investigation**: INV-XXX
**Experiment**: LAB-XXX (if applicable)
**Date**: YYYY-MM-DDTHH:MM:SSZ
**Validator**: [Name/Role]
**Status**: PASS|FAIL|CONDITIONAL PASS

---

## Validation Summary

| Criterion | Status | Notes |
|-----------|--------|-------|
| Evidence Quality | [PASS/FAIL] | |
| Logical Consistency | [PASS/FAIL] | |
| Assumption Management | [PASS/FAIL] | |
| Completeness | [PASS/FAIL] | |
| Reproducibility | [PASS/FAIL] | |
| Alternative Explanations | [PASS/FAIL] | |
| Limitations | [PASS/FAIL] | |
| Confidence | [PASS/FAIL] | |

### Overall Status

**Status**: [PASS | FAIL | CONDITIONAL PASS]

---

## Detailed Findings

### Evidence Quality

**Requirement**: Claims trace to documented evidence

| Check | Status | Details |
|-------|--------|---------|
| Evidence exists | ☐ | |
| Evidence verified (SHA-256) | ☐ | |
| Evidence relevant | ☐ | |
| Evidence sufficient | ☐ | |
| Counter-evidence included | ☐ | |

**Verdict**: [PASS/FAIL]

**Details**: [Assessment details]

### Logical Consistency

**Requirement**: Reasoning follows from evidence

| Check | Status | Details |
|-------|--------|---------|
| Conclusions follow evidence | ☐ | |
| No logical fallacies | ☐ | |
| Assumptions explicit | ☐ | |
| Inference chains valid | ☐ | |

**Verdict**: [PASS/FAIL]

**Details**: [Assessment details]

### Assumption Management

**Requirement**: Assumptions are documented

| Check | Status | Details |
|-------|--------|---------|
| Assumptions listed | ☐ | |
| Assumptions justified | ☐ | |
| Assumptions reasonable | ☐ | |
| Impact assessed | ☐ | |

**Verdict**: [PASS/FAIL]

**Details**: [Assessment details]

### Completeness

**Requirement**: All dimensions addressed

| Check | Status | Details |
|-------|--------|---------|
| Scope covered | ☐ | |
| No scope creep | ☐ | |
| Boundaries clear | ☐ | |
| Edge cases addressed | ☐ | |

**Verdict**: [PASS/FAIL]

**Details**: [Assessment details]

### Reproducibility

**Requirement**: Results consistent across runs

| Check | Status | Details |
|-------|--------|---------|
| Runs completed | ☐ | |
| Results consistent | ☐ | |
| Statistics support | ☐ | |
| Reproducibility documented | ☐ | |

**Verdict**: [PASS/FAIL]

**Details**: [Assessment details]

### Alternative Explanations

**Requirement**: Alternative interpretations considered

| Check | Status | Details |
|-------|--------|---------|
| Alternatives identified | ☐ | |
| Alternatives addressed | ☐ | |
| Counter-evidence acknowledged | ☐ | |
| Ruling out justified | ☐ | |

**Verdict**: [PASS/FAIL]

**Details**: [Assessment details]

### Limitations

**Requirement**: Limitations acknowledged

| Check | Status | Details |
|-------|--------|---------|
| Limitations documented | ☐ | |
| Impact assessed | ☐ | |
| Future work identified | ☐ | |
| Limitations don't invalidate | ☐ | |

**Verdict**: [PASS/FAIL]

**Details**: [Assessment details]

### Confidence

**Requirement**: Confidence level justified

| Check | Status | Details |
|-------|--------|---------|
| Confidence matches evidence | ☐ | |
| Confidence matches reproducibility | ☐ | |
| Confidence basis documented | ☐ | |
| Uncertainty acknowledged | ☐ | |

**Verdict**: [PASS/FAIL]

**Details**: [Assessment details]

---

## Validation Checklist

### Pre-Validation Checklist

- [ ] Evidence collected
- [ ] Evidence verified (SHA-256)
- [ ] Synthesis complete
- [ ] All runs executed
- [ ] Alternative explanations considered

### Post-Validation Checklist

- [ ] Validation report complete
- [ ] Findings revised (if needed)
- [ ] Confidence documented
- [ ] Limitations acknowledged
- [ ] Recommendations provided

---

## Recommendations

### Required Changes

[Any changes required before approval]

### Suggested Improvements

[Any suggested but not required improvements]

### Approval Recommendation

[RECOMMEND APPROVAL | RECOMMEND REVISION | RECOMMEND REJECTION]

---

## Validator Signature

**Validator**: _______________________

**Role**: _______________________

**Date**: _______________________

---

## Reference

For validation protocol, see [`../VALIDATION.md`](../VALIDATION.md)
