# Investigation Template

**Template Version**: 1.0.0
**Date**: 2026-07-21
**Architecture**: Architecture C

---

## Purpose

This template defines the structure for Investigations. Investigations own the scientific purpose (WHY), while Experiments own the execution (HOW).

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
        └── LAB-001.md
```

---

## investigation.md

```markdown
# Investigation: INV-XXX

**ID**: INV-XXX
**Title**: [Investigation Title]
**Version**: 1.0.0
**Date**: YYYY-MM-DDTHH:MM:SSZ
**Status**: DRAFT|ACTIVE|COMPLETE|PROMOTED|ARCHIVED
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

---

## Status

Idea                    ✅
Investigation           ⏳
Evidence Collection     ⏳
Observation             ⏳
Synthesis               ⏳
Validation              ⏳
Candidate Knowledge     ⏳
Promotion Proposal      ⏳
Knowledge Repository    ⏳

**Symbols**: ✅ Complete | 🔄 In Progress | ⏳ Pending
```

---

## hypothesis.md

```markdown
# Hypothesis: INV-XXX

**Investigation**: INV-XXX
**Date**: YYYY-MM-DDTHH:MM:SSZ

## Hypothesis

[State the hypothesis clearly and precisely]

## Rationale

[Why is this hypothesis worth testing?]

## Predictions

1. [Prediction 1]
2. [Prediction 2]
3. [Prediction 3]

## Falsification Criteria

[What evidence would disprove this hypothesis?]
```

---

## analysis.md

```markdown
# Analysis: INV-XXX

**Investigation**: INV-XXX
**Date**: YYYY-MM-DDTHH:MM:SSZ

## Analysis Summary

[What does the evidence say?]

## Evidence Review

### Supporting Evidence

| Evidence ID | Description | Relevance |
|-------------|-------------|-----------|
| EV-001 | [Description] | High |
| EV-002 | [Description] | Medium |

### Contradicting Evidence

| Evidence ID | Description | Impact |
|-------------|-------------|--------|
| EV-003 | [Description] | Minor |

## Interpretation

[What does this mean?]

## Alternative Explanations

[What other interpretations are possible?]

## Implications

[What are the implications for KDE?]
```

---

## conclusion.md

```markdown
# Conclusion: INV-XXX

**Investigation**: INV-XXX
**Date**: YYYY-MM-DDTHH:MM:SSZ
**Confidence**: HIGH|MEDIUM|LOW

## Final Conclusion

[State the conclusion clearly and precisely]

## Evidence Summary

[Summary of supporting evidence with references]

## Confidence Assessment

| Factor | Assessment |
|--------|------------|
| Evidence Quality | [HIGH/MEDIUM/LOW] |
| Reproducibility | [HIGH/MEDIUM/LOW] |
| Consistency | [HIGH/MEDIUM/LOW] |
| Overall | [HIGH/MEDIUM/LOW] |

## Limitations

[Any limitations or boundary conditions of this conclusion]

## Recommendations

[Any recommendations based on this conclusion]
```

---

## lessons-learned.md

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

## Process Observations

[Observations about the investigation process itself]
```

---

## index.md

```markdown
# Investigation INV-XXX: Experiment Index

**Investigation**: INV-XXX
**Title**: [Title]
**Updated**: YYYY-MM-DDTHH:MM:SSZ
**Status**: [STATUS]

## Experiments

| ID | Status | Summary |
|----|--------|---------|
| [LAB-001](links/LAB-001.md) | COMPLETE | [Brief summary] |
| [LAB-002](links/LAB-002.md) | ACTIVE | [Brief summary] |

## Links

Experiments are linked via the `links/` directory.

## Status

[Overall investigation status summary]
```

---

## links/LAB-XXX.md

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

## Status

[Experiment status within investigation]
```

---

## Metadata Standard

Every investigation artifact SHALL contain:

| Field | Format | Example |
|-------|--------|---------|
| ID | INV-XXX | INV-001 |
| Version | X.Y.Z | 1.0.0 |
| Date | ISO-8601 | 2026-07-21T12:00:00Z |
| Status | DRAFT\|ACTIVE\|COMPLETE\|PROMOTED\|ARCHIVED | ACTIVE |
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
