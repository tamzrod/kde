# Investigation Index: LAB-039

**Investigation ID**: LAB-039
**Title**: Semantic Dimension Investigation
**Status**: COMPLETE
**Date**: 2026-07-22

---

## Investigation Overview

| Field | Value |
|-------|-------|
| **Investigation ID** | LAB-039 |
| **Title** | Semantic Dimension Investigation |
| **Status** | COMPLETE |
| **Created** | 2026-07-22 |
| **Engine** | KDE-ENGINE-002 (Beta) v0.1.0 |
| **Seed** | SEED-001 (Genesis) v1.0.0 |

---

## Research Question

Are the six knowledge categories (Declarative, Procedural, Causal, Contextual, Evidential, Normative) independent primitive families or semantic dimensions of a unified model?

---

## Conclusion

**Model C (Hybrid) is most defensible.**

The six categories form a hybrid model:
- **Primary Categories** (core knowledge content): Declarative, Procedural, Causal, Normative
- **Supplementary Dimensions** (optional qualifiers): Contextual, Evidential

---

## Key Findings

| Finding | Confidence | Description |
|---------|-----------|-------------|
| 1 | HIGH | Categories show asymmetric dependencies |
| 2 | HIGH | Real-world objects are inherently multi-dimensional |
| 3 | MEDIUM-HIGH | Decomposition loses emergent meaning |
| 4 | MEDIUM-HIGH | Hybrid model best explains evidence |

---

## Three Models Evaluated

| Model | Description | Fit to Evidence |
|-------|-------------|-----------------|
| **Model A** | Independent primitive families | Poor |
| **Model B** | Pure semantic dimensions | Partial |
| **Model C** | Hybrid (primary + supplementary) | **Best** |

---

## Architectural Model

```
KNOWLEDGE OBJECT
    │
    ├── Primary Category (required, one of):
    │       ├── Declarative (D)
    │       ├── Procedural (P)
    │       ├── Causal (C)
    │       └── Normative (N)
    │
    └── Supplementary Dimensions (optional):
            ├── Contextual (X)
            └── Evidential (E)
```

---

## Relationship to Previous Investigations

| Investigation | Finding | LAB-039 Interpretation |
|--------------|---------|----------------------|
| LAB-037 | Multiple primitive models | Primary categories are the relevant primitives |
| LAB-038 | Six categories exist | Confirmed with structural refinement |

---

## Deliverables

| Document | Status | Description |
|----------|--------|-------------|
| investigation.md | ✓ | Full investigation report |
| index.md | ✓ | This index |

---

## Related Documents

| Document | Relationship |
|----------|-------------|
| LAB-037 (Knowledge Primitive) | Primitives mapped to primary categories |
| LAB-038 (Knowledge Taxonomy) | Six categories as starting point |
| KDE-001 (What is Knowledge?) | Engineering knowledge definition |

---

## Investigation Metadata

| Field | Value |
|-------|-------|
| Confidence | MEDIUM-HIGH |
| Conclusion | Hybrid model (Model C) most defensible |
| Primary Categories | Declarative, Procedural, Causal, Normative |
| Supplementary Dimensions | Contextual, Evidential |

---

*Investigation complete. Awaiting human review.*
