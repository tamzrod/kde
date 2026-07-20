# Investigation Template

**Template Version**: 1.0.0
**Date**: 2026-07-20
**Architecture**: Architecture C

---

## Purpose

This template defines the structure for Investigations in Architecture C. Investigations own the scientific purpose (WHY), while Experiments own the execution (HOW).

---

## Directory Structure

```
investigations/
└── INV-XXX/
    ├── investigation.md      # Required
    ├── hypothesis.md         # If applicable
    ├── analysis.md           # If applicable
    ├── conclusion.md         # If applicable
    ├── lessons-learned.md    # If applicable
    ├── index.md             # Required (experiment index)
    └── links/               # Required (links to experiments)
        ├── LAB-001.md
        └── LAB-002.md
```

---

## Required Files

### investigation.md

**ID**: INV-XXX
**Title**: [Investigation Title]
**Version**: 1.0.0
**Date**: YYYY-MM-DDTHH:MM:SSZ
**Status**: ACTIVE|COMPLETE|PROMOTED
**Author**: [Author Name]

#### Content

```markdown
# Investigation: INV-XXX

**ID**: INV-XXX
**Title**: [Investigation Title]
**Version**: 1.0.0
**Date**: YYYY-MM-DDTHH:MM:SSZ
**Status**: ACTIVE
**Author**: [Author Name]

---

## Research Question

[What question does this investigation address?]

## Scope

[What is included in this investigation? What is excluded?]

## Background

[What context is needed to understand this investigation?]

## Related

- Questions: [links to questions]
- Other Investigations: [links to related investigations]
```

---

### index.md

```markdown
# Investigation INV-XXX: Experiment Index

**Investigation**: INV-XXX
**Updated**: YYYY-MM-DDTHH:MM:SSZ

## Experiments

| ID | Status | Summary |
|----|--------|---------|
| [LAB-001](links/LAB-001.md) | COMPLETE | [Brief summary] |
| [LAB-002](links/LAB-002.md) | ACTIVE | [Brief summary] |

## Links

Experiments are linked via the `links/` directory.
```

---

### links/LAB-XXX.md

```markdown
# Link: INV-XXX → LAB-XXX

**Investigation**: INV-XXX
**Experiment**: LAB-XXX
**Linked**: YYYY-MM-DDTHH:MM:SSZ

## Relationship

[Describe how this experiment relates to the investigation]

## Key Findings

[Summary of experiment results]

## Evidence

[Link to evidence]
```

---

## Optional Files

### hypothesis.md

```markdown
# Hypothesis: INV-XXX

**Investigation**: INV-XXX
**Date**: YYYY-MM-DDTHH:MM:SSZ

## Hypothesis

[State the hypothesis]

## Rationale

[Why is this hypothesis worth testing?]

## Predictions

1. [Prediction 1]
2. [Prediction 2]
```

### analysis.md

```markdown
# Analysis: INV-XXX

**Investigation**: INV-XXX
**Date**: YYYY-MM-DDTHH:MM:SSZ

## Analysis Summary

[What does the evidence say?]

## Interpretation

[What does this mean?]

## Implications

[What are the implications for KDE?]
```

### conclusion.md

```markdown
# Conclusion: INV-XXX

**Investigation**: INV-XXX
**Date**: YYYY-MM-DDTHH:MM:SSZ
**Confidence**: HIGH|MEDIUM|LOW

## Final Conclusion

[State the conclusion]

## Evidence Summary

[Summary of supporting evidence]

## Recommendations

[Any recommendations based on this conclusion]
```

### lessons-learned.md

```markdown
# Lessons Learned: INV-XXX

**Investigation**: INV-XXX
**Date**: YYYY-MM-DDTHH:MM:SSZ

## What Worked

-

## What Didn't Work

-

## Future Improvements

-

## Unexpected Findings

-
```

---

## Metadata Standard

Every investigation artifact SHALL contain:

| Field | Format | Example |
|-------|--------|---------|
| ID | INV-XXX | INV-001 |
| Version | X.Y.Z | 1.0.0 |
| Date | ISO-8601 | 2026-07-20T12:00:00Z |
| Status | ACTIVE\|COMPLETE\|PROMOTED | ACTIVE |
| Author | Name | KDE Governance |

---

## Traceability

Investigations link to:
- [x] Questions (via investigation.md)
- [x] Experiments (via links/)
- [ ] Knowledge (via promotion to /knowledge/)

---

## Reference

For full Architecture C specification, see [`../ARCHITECTURE-C.md`](../ARCHITECTURE-C.md)
