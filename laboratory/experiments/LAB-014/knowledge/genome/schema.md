# Information DNA Genome Schema

**Document**: GENOME-SCHEMA.md
**Version**: 1.0
**Date**: 2026-07-19
**Status**: ACTIVE

---

## Overview

This document defines the schema for the Information DNA Genome. Every Gene in the Genome must conform to this schema.

---

## Gene Schema

Every Gene in the Genome SHALL contain:

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| **gene_id** | TEXT | Unique identifier | GENE-0001 |
| **canonical_statement** | TEXT | The validated truth | "Traceability principle applies universally" |
| **description** | TEXT | Extended explanation | Detailed description |
| **status** | TEXT | Current status | ACTIVE, SUPERSEDED, DEPRECATED, REJECTED |
| **classification** | TEXT | Gene classification | STABLE_CORE, DOMAIN_ADAPTER, EXPERIMENTAL, etc. |
| **origin_experiment** | TEXT | First lab that produced this gene | LAB-011 |
| **supporting_experiments** | LIST | Experiments that support this gene | [LAB-011, LAB-012, LAB-013] |
| **contradicting_experiments** | LIST | Experiments that challenge this gene | [] |
| **evidence_references** | LIST | Evidence item IDs | [OBS-062, OBS-063] |
| **relationships** | LIST | Relationship definitions | See Relationships section |
| **confidence** | TEXT | Evidence-derived confidence | HIGH, MEDIUM, LOW |
| **version** | INTEGER | Current version number | 1 |
| **governance_status** | TEXT | Governance approval status | APPROVED, PENDING, UNDER_REVIEW |
| **last_validation** | TEXT | ISO 8601 date | 2026-07-19 |

### Optional Fields (with justification required if omitted)

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| **parents** | LIST | Parent gene IDs | [GENE-0001] |
| **children** | LIST | Child gene IDs | [GENE-0003] |
| **mutation_history** | LIST | Version history | See Mutation History |
| **applicable_domains** | LIST | Valid application domains | [SOFTWARE, ENGINEERING] |
| **known_limitations** | TEXT | Known boundaries | "Not tested in AI domain" |
| **research_questions** | LIST | Open questions | ["How to validate in AI domain?"] |

---

## Classification Schema

### STABLE_CORE

Genes that remain valid across all tested domains.

**Criteria**:
- Validated in ≥4 diverse domains
- No contradicting experiments
- HIGH confidence
- Traceability: 100%

**Examples**:
- Traceability principle
- Evidence-based nature
- 9-field structure

### DOMAIN_ADAPTER

Genes that require domain-specific calibration.

**Criteria**:
- Validated in multiple domains
- Domain-specific variations exist
- MEDIUM-HIGH confidence

**Examples**:
- Confidence thresholds (varies by domain)
- Reproducibility definitions

### EXPERIMENTAL

Genes that are hypothesized but not fully validated.

**Criteria**:
- Limited supporting evidence
- Requires additional validation
- MEDIUM-LOW confidence

**Examples**:
- Systematic weaknesses (needs solution validation)

### DEPRECATED

Genes that have been superseded or invalidated.

**Criteria**:
- Replaced by refined gene
- Contradicting evidence > supporting evidence
- LOW confidence

### REJECTED

Genes that were never validated.

**Criteria**:
- No supporting evidence
- Contradicting evidence present
- Cannot be synthesized

### HYPOTHESIS

Genes proposed but not yet synthesized.

**Criteria**:
- Derived from existing genes
- Not yet validated
- Requires experiment

---

## Relationship Types

### PARENT_OF
```
Gene A is the parent of Gene B
A → B
```

### CHILD_OF
```
Gene B is a child of Gene A
B → A (reverse)
```

### REFINES
```
Gene B refines Gene A (more specific)
A ← B
```

### REFINED_BY
```
Gene A is refined by Gene B
A → B (reverse)
```

### CONTRADICTS
```
Gene B contradicts Gene A
A ←/→ B
```

### SUPPORTS
```
Gene B supports Gene A
A ← B
```

### CONTAINS
```
Gene A contains component B
A contains B
```

### PART_OF
```
Gene B is part of Gene A
B part of A (reverse)
```

---

## Mutation History Schema

Every mutation SHALL be recorded:

```yaml
mutation_history:
  - version: 1
    date: 2026-07-19
    experiment: LAB-014
    type: INITIAL_SYNTHESIS
    description: "Initial gene synthesis from LAB-011"
    evidence_added: []
    confidence_changed: null
    
  - version: 2
    date: YYYY-MM-DD
    experiment: LAB-XXX
    type: REFINEMENT | CONTRADICTION | DEPRECATION | PROMOTION | SPLIT | MERGE
    description: "Description of change"
    evidence_added: [OBS-XXX]
    confidence_changed: MEDIUM → HIGH
    predecessor: GENE-XXXX
```

### Mutation Types

| Type | Description | Effect |
|------|-------------|--------|
| INITIAL_SYNTHESIS | First creation of gene | Version 1 |
| REFINEMENT | More specific version | Version increment |
| CONTRADICTION | Contradicting evidence found | Confidence may decrease |
| DEPRECATION | Superseded by better gene | Status → DEPRECATED |
| PROMOTION | Experimental → Stable | Classification change |
| DEMOTION | Stable → Experimental | Classification change |
| SPLIT | One gene becomes two | Two new genes |
| MERGE | Two genes become one | One new gene |

---

## Governance Status Schema

| Status | Description | Requirements |
|--------|-------------|--------------|
| PENDING | Awaiting governance review | Evidence complete |
| UNDER_REVIEW | Currently being reviewed | Governance active |
| APPROVED | Approved for Genome | Governance decision |
| REJECTED | Rejected by governance | Cannot be in Genome |
| SUPERSEDED | Replaced by newer version | History preserved |

---

## Versioning Rules

1. **Major Version**: Increment when classification changes (STABLE_CORE ↔ DOMAIN_ADAPTER)
2. **Minor Version**: Increment when evidence added or confidence changes
3. **Patch Version**: Increment for documentation changes

**Current Versioning**: Single integer (1, 2, 3...) for simplicity.

---

## Immutability Rules

1. Once a Gene is created, its canonical_statement CANNOT be changed
2. New understanding produces a new Gene (mutation)
3. Historical Genes are preserved with their original statements
4. Mutations link new genes to predecessors

---

## Validation Rules

Every Gene in the Genome MUST satisfy:

1. **Evidence Rule**: Must have ≥1 evidence reference
2. **Traceability Rule**: Every evidence reference must be valid
3. **Classification Rule**: Classification must match criteria
4. **Mutation Rule**: Must have mutation_history entry for creation
5. **Status Rule**: Status must be valid value

---

## Export Format

The Genome SHALL be exportable as:

1. **Markdown**: Human-readable documentation
2. **JSON**: Machine-readable format
3. **YAML**: Configuration format
4. **SQL**: Database import

---

## Schema Version

**Current Schema Version**: 1.0
**Last Updated**: 2026-07-19
**Changes from Previous**: Initial schema

---

## Implementation Notes

- Gene IDs use GENE-XXXX format (4-digit zero-padded)
- Dates use ISO 8601 format (YYYY-MM-DD)
- Confidence levels: VERY_HIGH > HIGH > MEDIUM > LOW
- All TEXT fields support Markdown formatting
