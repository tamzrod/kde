# Counterexamples: LAB-023

**Investigation**: LAB-023
**Date**: 2026-07-21T09:10:00Z
**Status**: DRAFT

---

## Counterexample 1: Non-Standard Status Value

### Evidence

**Document**: `knowledge/KDE-ARCH-009.md`

```markdown
**Status**: CANDIDATE
```

**Document**: `knowledge/KDE-ARCH-010.md`

```markdown
**Status**: CANDIDATE
```

### LAB-022 Specification Claim

> `status: [STATE]` where STATE is `DRAFT|VALIDATED|PROMOTED|DEPRECATED`

### Problem

"CANDIDATE" is not one of the four specified status values. The specification does not account for this status.

### Severity

**MEDIUM**

### Why Specification Fails

The specification assumes only four states but real documents use additional states. "CANDIDATE" appears to indicate "ready for review but not yet approved."

### Proposed Explanation

The specification was derived from mature documents (LEVEL 3) that already passed through candidate stages. Early-stage documents use CANDIDATE status.

---

## Counterexample 2: Missing Metadata Field

### Evidence

**Document**: `knowledge/KDE-ARCH-009.md`

```markdown
**Valid Until**: 2026-10-20
```

**Document**: `knowledge/KDE-ARCH-010.md`

```markdown
**Valid Until**: 2026-10-20
```

### Problem

"Valid Until" field is present but not in the specification's mandatory metadata.

### Severity

**MEDIUM**

### Why Specification Fails

The specification does not account for time-limited knowledge. Some knowledge has expiration dates (e.g., experimental findings that may need revalidation).

### Proposed Explanation

Experimental knowledge (Level 1) may require revalidation after a period. The specification assumes knowledge is permanent once promoted.

---

## Counterexample 3: Inconsistent Field Naming

### Evidence

**Document**: `knowledge/KDE-ARCH-009.md`

```markdown
**Source Investigation**: INV-013
```

**LAB-022 Specification**:

```yaml
source-investigation: INV-XXX
```

### Problem

The field is named "Source Investigation" (with spaces) in existing documents but "source-investigation" (with hyphen) in the specification.

### Severity

**LOW**

### Why Specification Fails

The specification standardizes field names but does not account for existing documents using different naming conventions.

### Proposed Explanation

Migration requires renaming all existing field names. The specification should specify backward compatibility or migration strategy.

---

## Counterexample 4: Missing "Definition" Section in Domain Documents

### Evidence

**Document**: `knowledge/gis/design-rules.md`

```markdown
# GIS Design Rules

## Overview
...
```

**Document**: `knowledge/typography/fundamentals.md`

```markdown
# Typography Fundamentals

## Overview
...
```

### LAB-022 Specification Claim

> Every Knowledge Document SHALL include... **Definition** — One-paragraph statement of what is known

### Problem

Domain documents use "Overview" instead of "Definition". The specification requires "Definition" but existing documents don't have it.

### Severity

**HIGH**

### Why Specification Fails

The mandatory "Definition" section requirement cannot be retroactively applied to existing domain documents. These documents define domain scope through "Overview" instead.

### Proposed Explanation

Domain documents may have different semantic structure. A "Definition" of typography is different from a "Definition" of a rule.

---

## Counterexample 5: knowledge-summary Documents

### Evidence

**Document**: `knowledge/gis/knowledge-summary.md`

```markdown
# GIS Knowledge Summary

*Generated from INV-031 Investigation*
```

**Document**: `knowledge/typography/knowledge-summary.md`

```markdown
# Typography Knowledge Summary

*Generated from INV-030 Investigation*
```

### Problem

These are synthesis documents that summarize multiple knowledge artifacts. They don't fit any of the five classes:

- Not Foundational (not philosophy)
- Not Architecture (not system spec)
- Not Domain (they summarize multiple domains)
- Not Governance (not rules)
- Not Argumentation (not decision rationale)

### Severity

**HIGH**

### Why Specification Fails

The specification has no class for "synthesis documents" or "summary documents". These documents serve a different purpose than the five defined classes.

### Proposed Explanation

These documents are Investigation artifacts (syntheses) that were incorrectly promoted to Knowledge. They belong in Laboratory, not Knowledge.

---

## Counterexample 6: SCADA Patterns Don't Fit Architecture Class

### Evidence

**Document**: `knowledge/KDE-ARCH-009.md`

```markdown
# Pattern 1: Polyglot Persistence for SCADA

### Statement
SCADA systems benefit from using specialized databases...
```

### Problem

KDE-ARCH-009 documents SCADA-specific architecture patterns. It has "ARCH" in its name but contains domain-specific patterns, not KDE system architecture.

### Severity

**MEDIUM**

### Why Specification Fails

The "Architecture" class is defined as "KDE system architecture" but ARCH documents contain domain architecture. The class boundary is ambiguous.

### Proposed Explanation

"Architecture" class should be split:
- KDE Architecture: KDE system specifications
- Domain Architecture: Domain-specific patterns

---

## Counterexample 7: Tradeoffs Don't Fit Argumentation Class

### Evidence

**Document**: `knowledge/KDE-ARCH-010.md`

```markdown
# KDE-ARCH-010: SCADA Platform Design Tradeoffs

### Tradeoff 1: Monolith vs. Microservices
```

### Problem

KDE-ARCH-010 documents design tradeoffs. It could be "Argumentation" (documenting decision rationale) but the structure doesn't match the Argumentation class template.

### Severity

**MEDIUM**

### Why Specification Fails

The Argumentation class requires:
- Definition (of the question or decision)
- Options Considered
- Decision Made
- Rationale
- Evidence

But KDE-ARCH-010 has:
- Definition
- Scope
- Multiple Tradeoffs (each with tension, options, evidence, decision, rationale, conditions)

The structure is different.

### Proposed Explanation

"Tradeoff Analysis" is a distinct document class not captured in the specification.

---

## Counterexample 8: Domain Documents Lack Provenance

### Evidence

**Document**: `knowledge/gis/design-rules.md`

```markdown
*Source: GIS engineering standards*
```

**Document**: `knowledge/typography/fundamentals.md`

```markdown
*Source: Material Design, Nielsen Norman Group, typographic principles*
```

### Problem

Domain documents have minimal provenance. They cite "standards" but don't reference specific investigations, evidence IDs, or validation records.

### Severity

**HIGH**

### Why Specification Fails

The specification requires provenance links to investigation and evidence. Domain documents lack this.

### Proposed Explanation

Domain knowledge may be derived from external sources (industry standards, vendor docs) rather than KDE investigations. The provenance model needs to account for external sources.

---

## Counterexample 9: Foundational Documents Exceed Specification

### Evidence

**Document**: `knowledge/001-what-is-knowledge.md`

Contains:
- Discipline Analysis (Philosophy, Epistemology, Science, Engineering)
- Validation Plan (5 tests)
- Validation Results
- Working Definition
- Supporting Evidence
- Counter Evidence
- Open Questions
- References

### Problem

Foundational documents have significantly more content than the specification requires. The specification lists required sections but foundational documents have many more.

### Severity

**LOW**

### Why Specification Fails

The specification sets minimum requirements but doesn't describe the full complexity of actual documents. It's underspecified.

### Proposed Explanation

The specification should distinguish between minimum requirements and recommended additional sections.

---

## Counterexample 10: Evidence Level Disagreement

### Evidence

**Document**: `knowledge/KDE-ARCH-009.md`

```markdown
**Evidence Level**: Level 1 — Experimental
```

**Document**: `knowledge/KDE-ARCH-001.md`

```markdown
**Evidence Level**: Level 3 — Reproducible
```

### Problem

Same category (Architecture) documents have different evidence levels. The specification doesn't describe how evidence level affects document structure.

### Severity

**LOW**

### Why Specification Fails

The specification mentions evidence level in metadata but doesn't explain how structure should vary based on maturity level.

### Proposed Explanation

Higher maturity documents may have more rigorous provenance requirements than experimental ones.

---

## Counterexamples Summary

| # | Counterexample | Severity | Hypothesis Failed |
|---|--------------|----------|-------------------|
| 1 | Non-standard status (CANDIDATE) | MEDIUM | H5 (Lifecycle) |
| 2 | Missing metadata (Valid Until) | MEDIUM | H2 (Metadata) |
| 3 | Inconsistent field naming | LOW | H2 (Metadata) |
| 4 | Missing Definition section | HIGH | H3 (Sections) |
| 5 | knowledge-summary documents | HIGH | H1 (Classes) |
| 6 | SCADA patterns mismatch | MEDIUM | H1 (Classes) |
| 7 | Tradeoffs mismatch | MEDIUM | H1 (Classes) |
| 8 | Domain documents lack provenance | HIGH | H4 (Provenance) |
| 9 | Foundational exceeds spec | LOW | H3 (Sections) |
| 10 | Evidence level disagreement | LOW | H5 (Lifecycle) |

---

## Critical Failures Identified

### Failure 1: Five Classes Insufficient

**Evidence**: knowledge-summary documents fit no class.

**Impact**: Some documents cannot be classified under the specification.

### Failure 2: Domain Provenance Gap

**Evidence**: Domain documents cite external standards, not KDE investigations.

**Impact**: Specification's provenance model assumes KDE investigations as sole source.

### Failure 3: Lifecycle Missing Candidate State

**Evidence**: KDE-ARCH-009 and KDE-ARCH-010 use CANDIDATE status.

**Impact**: Real documents use states not in specification.

---

## Recommendations (Not in scope - for future investigation)

1. Add "CANDIDATE" as valid status value
2. Add "valid-until" metadata for time-limited knowledge
3. Add "synthesis" as document class
4. Account for external source provenance
5. Distinguish minimum requirements from full structure
