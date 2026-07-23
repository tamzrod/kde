# Investigation Index: LAB-040

**Investigation ID**: LAB-040
**Title**: Knowledge Object Investigation
**Status**: COMPLETE
**Date**: 2026-07-22

---

## Investigation Overview

| Field | Value |
|-------|-------|
| **Investigation ID** | LAB-040 |
| **Title** | Knowledge Object Investigation |
| **Status** | COMPLETE |
| **Created** | 2026-07-22 |
| **Engine** | KDE-ENGINE-002 (Beta) v0.1.0 |
| **Seed** | SEED-001 (Genesis) v1.0.0 |

---

## Research Question

What is a Knowledge Object fundamentally?

---

## Conclusion

**A defensible working definition exists for KDE.**

> A Knowledge Object is an identified unit of actionable understanding, classified by primary category and supplementary dimensions, with associated evidence and provenance.

---

## Key Findings

| Finding | Confidence | Description |
|---------|-----------|-------------|
| 1 | HIGH | No universal definition exists |
| 2 | HIGH | Multiple candidate definitions exist |
| 3 | MEDIUM-HIGH | Identity is relational and context-dependent |
| 4 | MEDIUM-HIGH | Lifecycle is externally imposed |
| 5 | MEDIUM | Working definition constructed for KDE |

---

## Candidate Definitions Evaluated

| Model | Description | Fit to KDE |
|-------|-------------|-----------|
| Descriptive | Statement about the world | Partial |
| Structural | Structured container | Yes |
| Relational | Defined by relationships | Yes |
| Semantic | Meaning-bearing unit | Yes |
| Computational | Processable data | Partial |
| Cognitive | Mental representation | Partial |
| **Working Definition** | Identified unit with classification | **Yes** |

---

## Knowledge Object Structure

```
KnowledgeObject {
  identifier: URI
  primaryCategory: Declarative | Procedural | Causal | Normative
  supplementaryDimensions: {
    contextual?: Scope
    evidential?: Support
  }
  content: [Content specific to primaryCategory]
  evidence: [Evidence references]
  provenance: Provenance chain
}
```

---

## Relationship to Previous Investigations

| Investigation | Finding | LAB-040 Contribution |
|--------------|---------|---------------------|
| LAB-037 | Multiple primitive models | Maps to primary categories |
| LAB-038 | Six categories | Classification basis |
| LAB-039 | Hybrid model | Structural basis |

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
| LAB-037 (Knowledge Primitive) | Primitive models |
| LAB-038 (Knowledge Taxonomy) | Six categories |
| LAB-039 (Semantic Dimension) | Hybrid model |
| KDE-001 (What is Knowledge?) | Actionable understanding |
| KDE-002 (What is Evidence?) | Evidence dimension |

---

## Investigation Metadata

| Field | Value |
|-------|-------|
| Confidence | MEDIUM-HIGH |
| Conclusion | Working definition exists for KDE |

---

*Investigation complete. Awaiting human review.*
