# Synthesis Template

**Template Version**: 1.0.0
**Date**: 2026-07-21
**Architecture**: Architecture C

---

## Purpose

This template defines the structure for synthesizing evidence into insights. Synthesis transforms raw observations into meaningful patterns.

---

## Synthesis Principles

| Principle | Description |
|-----------|-------------|
| **Evidence-Based** | All insights trace to evidence |
| **Pattern Recognition** | Identify common patterns |
| **Alternative Consideration** | Acknowledge alternative interpretations |
| **Confidence Assessment** | Assess confidence in findings |

---

## Synthesis Document Template

```markdown
# Synthesis Report: [Investigation/Experiment]

**ID**: SYN-XXX
**Investigation**: INV-XXX
**Experiment**: LAB-XXX (if applicable)
**Date**: YYYY-MM-DDTHH:MM:SSZ
**Synthesis Level**: [Single Run|Multi-Run|Cross-Experiment]

---

## Evidence Summary

### Evidence Collected

| Evidence ID | Type | Source | Count | Quality |
|-------------|------|--------|-------|---------|
| EV-001 | measurement | RUN-001 | [N] | HIGH |
| EV-002 | log | RUN-001, RUN-002 | [N] | HIGH |
| EV-003 | screenshot | RUN-003 | [N] | MEDIUM |

### Observations Synthesized

| Category | Count |
|----------|-------|
| Measurements | [N] |
| Facts | [N] |
| Events | [N] |
| Behaviors | [N] |

---

## Pattern Identification

### Common Patterns

| Pattern ID | Description | Supporting Evidence | Frequency |
|------------|-------------|---------------------|-----------|
| PAT-001 | [Pattern description] | EV-001, EV-002 | [N] |
| PAT-002 | [Pattern description] | EV-003 | [N] |

### Correlation Patterns

| Variable A | Variable B | Correlation | Evidence |
|-----------|------------|-------------|----------|
| [A] | [B] | [positive/negative/none] | [EV-XXX] |

### Sequence Patterns

| Sequence | Occurrences | Evidence |
|----------|-------------|----------|
| [A] → [B] → [C] | [N] | [EV-XXX] |

---

## Statistical Analysis

### Summary Statistics

| Metric | Value | Std Dev | N |
|--------|-------|---------|---|
| [Metric 1] | [mean] | [std] | [N] |
| [Metric 2] | [mean] | [std] | [N] |

### Statistical Tests

| Test | Result | p-value | Interpretation |
|------|--------|---------|----------------|
| [Test name] | [result] | [p-value] | [significant/not significant] |

### Reproducibility Assessment

| Factor | Assessment |
|--------|------------|
| Cross-run consistency | [HIGH/MEDIUM/LOW] |
| Statistical significance | [YES/NO] |
| Effect size | [LARGE/MEDIUM/SMALL] |

---

## Interpretation

### What the Evidence Says

[Clear statement of what the evidence demonstrates]

### What This Means

[Interpretation of the evidence]

### Alternative Interpretations

[Other possible interpretations and why they are less likely]

---

## Confidence Assessment

| Factor | Assessment | Justification |
|--------|------------|--------------|
| Evidence Quality | [HIGH/MEDIUM/LOW] | [Rationale] |
| Reproducibility | [HIGH/MEDIUM/LOW] | [Rationale] |
| Consistency | [HIGH/MEDIUM/LOW] | [Rationale] |
| Alternative Explanations | [ADDRESSED/NOT ADDRESSED] | [Rationale] |

### Overall Confidence

**Level**: [HIGH/MEDIUM/LOW]

**Justification**: [Brief explanation of overall confidence]

---

## Limitations

[Any limitations of this synthesis]

---

## Unexpected Findings

[Any findings that were not anticipated]

---

## Implications

[What this synthesis means for the investigation]

---

## Next Steps

- [ ] Additional analysis needed
- [ ] Further experiments required
- [ ] Ready for validation

---

## Reference

For synthesis protocol, see [`../WORKFLOW.md`](../WORKFLOW.md)
