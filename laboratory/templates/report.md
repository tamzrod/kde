# Final Report Template

**Template Version**: 1.0.0
**Date**: 2026-07-21
**Architecture**: Architecture C

---

## Purpose

This template defines the structure for final investigation reports. The report synthesizes all investigation activities into a comprehensive document.

---

## Final Report Template

```markdown
# Final Report: [Investigation Title]

**Investigation ID**: INV-XXX
**Title**: [Investigation Title]
**Date**: YYYY-MM-DDTHH:MM:SSZ
**Status**: COMPLETE
**Confidence**: [HIGH/MEDIUM/LOW]
**Author**: [Author Name]

---

## Executive Summary

[Brief summary of the investigation, findings, and recommendations. 2-3 paragraphs maximum.]

---

## Investigation Overview

### Research Question

[Restate the research question addressed by this investigation]

### Scope

**Included**:
- [Item 1]
- [Item 2]

**Excluded**:
- [Item 1]
- [Item 2]

### Methodology

[Summary of the methodology used, including Engine reference]

| Component | Value |
|-----------|-------|
| Engine | [Engine ID and version] |
| Seed | [Seed ID and version] |
| Experiments | [Number of experiments] |
| Runs | [Total runs executed] |

---

## Findings

### Primary Finding

[Clear statement of the primary finding]

### Supporting Evidence

| Evidence ID | Description | Relevance |
|-------------|-------------|-----------|
| EV-001 | [Description] | High |
| EV-002 | [Description] | Medium |

### Secondary Findings

[Any additional findings from the investigation]

---

## Analysis

### Evidence Synthesis

[Summary of how evidence was synthesized into findings]

### Pattern Summary

| Pattern | Evidence Support | Confidence |
|---------|------------------|------------|
| [Pattern 1] | [EV-XXX] | [HIGH/MEDIUM/LOW] |
| [Pattern 2] | [EV-XXX] | [HIGH/MEDIUM/LOW] |

### Statistical Analysis

[Summary of statistical analysis performed]

| Metric | Value | Interpretation |
|--------|-------|----------------|
| [Metric 1] | [Value] | [Interpretation] |

---

## Confidence Assessment

### Confidence Factors

| Factor | Assessment | Justification |
|--------|------------|--------------|
| Evidence Quality | [HIGH/MEDIUM/LOW] | [Rationale] |
| Reproducibility | [HIGH/MEDIUM/LOW] | [Rationale] |
| Consistency | [HIGH/MEDIUM/LOW] | [Rationale] |
| Alternative Explanations | [ADDRESSED/NOT ADDRESSED] | [Rationale] |

### Overall Confidence

**Level**: [HIGH/MEDIUM/LOW]

**Justification**: [Brief explanation]

---

## Implications

### For KDE

[What these findings mean for KDE]

### For Practice

[Recommendations for practice based on findings]

### For Future Research

[Areas identified for further investigation]

---

## Limitations

[Any limitations of this investigation and their impact on findings]

---

## Lessons Learned

### What Worked

-

### What Didn't Work

-

### Future Improvements

-

---

## Experiments and Evidence

### Experiments Conducted

| Experiment ID | Status | Key Finding |
|---------------|--------|-------------|
| LAB-001 | COMPLETE | [Finding] |
| LAB-002 | ACTIVE | [Finding] |

### Evidence Summary

| Type | Count | Total Size |
|------|-------|------------|
| log | [N] | [size] |
| measurement | [N] | [size] |
| document | [N] | [size] |

---

## Attachments

- Investigation: [`investigation.md`](./investigation.md)
- Hypothesis: [`hypothesis.md`](./hypothesis.md)
- Analysis: [`analysis.md`](./analysis.md)
- Conclusion: [`conclusion.md`](./conclusion.md)
- Lessons Learned: [`lessons-learned.md`](./lessons-learned.md)
- Evidence Index: [`../experiments/LAB-XXX/evidence/index.md`](../experiments/LAB-XXX/evidence/index.md)

---

## Approval

| Role | Name | Date | Decision |
|------|------|------|----------|
| Laboratory | [Name] | YYYY-MM-DD | COMPLETE |
| Validator | [Name] | YYYY-MM-DD | [APPROVED/REVISIONS REQUIRED] |
| Governance | [Name] | YYYY-MM-DD | [PENDING/APPROVED] |

---

## Reference

For investigation protocol, see [`../WORKFLOW.md`](../WORKFLOW.md)
