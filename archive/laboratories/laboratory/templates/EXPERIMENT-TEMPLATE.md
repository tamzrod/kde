# KDE Laboratory Experiment Template

**Template ID**: EXP-TEMPLATE
**Version**: 2.0.0
**Date**: 2026-07-24
**Source**: LAB-BOOTSTRAP-ENGINE-AUDIT-001 REC-003
**Status**: APPROVED

---

## Purpose

This template ensures all KDE experiments include proper engine selection documentation.

---

## Experiment Header Template

```markdown
# [Experiment Title]

## Experiment ID

**ID**: EXP-[NUMBER]
**Created**: [DATE]
**Status**: IN_PROGRESS

---

## Engine Selection

**Auto-Selected Engine**: [KDE-ENGINE-002 (Beta) | KDE-ENGINE-003 (Gamma) | KDE-ENGINE-004 (Delta)]
**Selection Rationale**: [Explain why this engine was selected]

### Keywords Detected

| Keyword | Engine Matched |
|--------|----------------|
| [keyword] | [engine] |
| ... | ... |

### Alternative Engines Considered

| Engine | Score | Reason for Not Selecting |
|--------|-------|------------------------|
| [engine] | [score] | [reason] |

### Session Override (if applicable)

**Override Applied**: [YES/NO]
**If YES**: [reason for override]

---

## Experiment Details

### Objective

[Describe the experiment objective]

### Dataset

[Describe the dataset used]

### Methodology

[Describe the methodology]

### Expected Outcomes

[Describe expected outcomes]

---

## Results

[Document results here]

---

## Conclusions

[Document conclusions here]

---

## Appendix: Engine Selection Log

```yaml
engine_selection:
  timestamp: [timestamp]
  problem_statement: "[problem]"
  selected_engine: "[engine-id]"
  confidence: [percentage]
  keywords_detected: [list]
  scores:
    beta: [score]
    gamma: [score]
    delta: [score]
  justification: "[reason]"
  override: [true/false]
  override_reason: "[reason if overridden]"
```

---

## Version History

| Version | Date | Changes | Authority |
|---------|------|---------|-----------|
| 1.0.0 | [date] | Initial template | [authority] |
| 2.0.0 | 2026-07-24 | Added engine selection section | Human (REC-003 approved) |
```

---

## REC-003 Implementation Checklist

| Action | Status |
|--------|--------|
| Update experiment template | ✅ COMPLETE |
| Add engine selection to header | ✅ COMPLETE |
| Add selection log appendix | ✅ COMPLETE |
| Document in laboratory templates | 📋 PLANNED |

---

**Status**: APPROVED
**Authority**: Human Authority
**Source**: LAB-BOOTSTRAP-ENGINE-AUDIT-001 REC-003
