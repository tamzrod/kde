# Knowledge Document Specification

**Document Type**: Specification
**Investigation**: LAB-022
**Date**: 2026-07-21T08:30:00Z
**Status**: DRAFT

---

## Purpose

This specification defines the standard architecture for all KDE Knowledge Documents. It establishes what a Knowledge Document is, what it must contain, and how it relates to other KDE components.

---

## Definition

### What is a Knowledge Document?

A **Knowledge Document** is a validated, provenance-tracked artifact that records actionable understanding for engineering practice, owned by Governance, and promoted from the Laboratory.

### Key Characteristics

| Characteristic | Description |
|----------------|-------------|
| **Validated** | Passed evidence-based validation |
| **Provenance-tracked** | Links to investigation and evidence |
| **Actionable** | Enables effective engineering practice |
| **Owned by Governance** | Ownership transferred at promotion |
| **Official** | Represents canonical KDE understanding |

---

## Universal Requirements

Every Knowledge Document SHALL include:

### Universal Mandatory Metadata

```yaml
---
id: KDE-XXX                    # Unique identifier (required)
title: [Document Title]       # Descriptive title (required)
version: X.Y.Z                # Semantic version (required)
status: [STATE]               # DRAFT|VALIDATED|PROMOTED|DEPRECATED (required)
category: [CATEGORY]          # FOUNDATIONAL|ARGUMENTATION|ARCHITECTURE|DOMAIN|GOVERNANCE (required)
source-investigation: INV-XXX  # Origin investigation (required)
evidence-references:          # Supporting evidence IDs (required)
  - EV-XXX
  - EV-YYY
created: YYYY-MM-DDTHH:MM:SSZ # Creation timestamp (required)
last-modified: YYYY-MM-DDTHH:MM:SSZ # Last modification (required)
promoted: YYYY-MM-DD          # Promotion date, null if not promoted (required)
approved-by: [Name]           # Human approver, null if not promoted (required)
---
```

### Universal Mandatory Sections

Every Knowledge Document SHALL include these sections:

1. **Definition** — One-paragraph statement of what is known
2. **Summary** — 2-3 paragraph overview of the knowledge
3. **Evidence** — Supporting evidence with references
4. **Provenance** — Complete traceability chain

### Universal Prohibited Content

Knowledge Documents SHALL NOT include:

1. Hypotheses (only validated conclusions)
2. Raw experiment data (summarize as evidence)
3. AI process documentation (belongs in Laboratory)
4. Personal opinions (must be evidence-based)
5. Unverified claims (mark as hypothesis if necessary)
6. Investigation artifacts (belongs in Laboratory)

---

## Document Classes

### Class 1: Foundational Knowledge

**Purpose**: Establish philosophical/epistemological foundations for KDE concepts.

**Category Code**: FOUNDATIONAL

**Required Metadata**:
- All universal mandatory metadata
- `confidence`: Overall confidence level

**Required Sections**:
1. Definition
2. Summary
3. Evidence
4. Provenance
5. Discipline Analysis (philosophy, epistemology, science, engineering)
6. Validation Plan
7. Validation Results

**Optional Sections**:
- Dependencies
- Related Knowledge
- Limitations
- Revision History

**Example**: `001-what-is-knowledge.md`

---

### Class 2: Architecture Specification

**Purpose**: Define KDE system architecture and specifications.

**Category Code**: ARCHITECTURE

**Required Metadata**:
- All universal mandatory metadata
- `evidence-level`: Maturity level (1-5)
- `confidence`: Overall confidence level

**Required Sections**:
1. Definition
2. Core Principles (or Definition section expanded)
3. Supporting Experiments
4. Dependencies
5. Related Knowledge
6. Version History
7. Governance Authority
8. Reference

**Optional Sections**:
- Evidence
- Limitations
- Trade-offs
- Examples

**Example**: `KDE-ARCH-001.md`

---

### Class 3: Domain Knowledge

**Purpose**: Document engineering practice within a specific domain.

**Category Code**: DOMAIN

**Required Metadata**:
- All universal mandatory metadata
- `domain`: Domain name (e.g., GIS, Typography, Visualization)
- `confidence`: Overall confidence level

**Required Sections**:
1. Definition (of domain scope)
2. Summary
3. Design Rules (or Best Practices)
4. Evidence
5. Provenance

**Optional Sections**:
- Dependencies
- Related Knowledge
- Limitations
- Trade-offs
- Usage Examples
- Code Examples

**Example**: `gis/design-rules.md`

---

### Class 4: Governance Policy

**Purpose**: Define rules, processes, and policies.

**Category Code**: GOVERNANCE

**Required Metadata**:
- All universal mandatory metadata
- `authority`: Governance document reference

**Required Sections**:
1. Definition
2. Rules
3. Enforcement
4. Exceptions
5. Provenance

**Optional Sections**:
- Rationale
- Dependencies
- Related Knowledge
- Revision History

---

### Class 5: Argumentation

**Purpose**: Document reasoning and decision-making.

**Category Code**: ARGUMENTATION

**Required Metadata**:
- All universal mandatory metadata
- `decision`: The decision made

**Required Sections**:
1. Definition (of the question or decision)
2. Options Considered
3. Decision Made
4. Rationale
5. Evidence
6. Provenance

**Optional Sections**:
- Alternatives Considered
- Trade-offs
- Dependencies

---

## Provenance Requirements

### Required Provenance Links

Every Knowledge Document SHALL include:

```markdown
## Provenance

| From | To | Reference |
|------|-----|----------|
| Knowledge | Investigation | INV-XXX |
| Knowledge | Evidence | EV-XXX, EV-YYY |
| Knowledge | Validator | [Validator Name] |
| Knowledge | Approver | [Approver Name] |
| Knowledge | Promotion Date | YYYY-MM-DD |
```

### Provenance Chain

```
Investigation (INV-XXX)
    │
    ├──► Synthesis (SYN-XXX)
    │
    └──► Conclusion (conclusion.md)
              │
              ▼
        Validation (validated.md)
              │
              ▼
        Promotion Proposal (promotion.md)
              │
              ▼
        Human Approval
              │
              ▼
        Knowledge (KDE-XXX)
```

---

## Lifecycle

### Document States

| State | Description | Human Required |
|-------|-------------|----------------|
| DRAFT | Work in progress | No |
| VALIDATED | Passed validation | No (validation authority) |
| PROMOTED | In Knowledge Repository | YES |
| DEPRECATED | Superseded or invalid | YES |

### Maturity Levels

| Level | Name | Requirements |
|-------|------|--------------|
| 1 | Experimental | Single execution |
| 2 | Repeatable | 10+ consistent runs |
| 3 | Reproducible | 60+ cross-method runs |
| 4 | Generalized | Cross-domain validation |
| 5 | Established | Sustained, no contradictions |

---

## Revision Management

### Version Numbering

- **Major (X.0.0)**: Fundamental change to definition
- **Minor (0.X.0)**: Added sections, expanded guidance
- **Patch (0.0.X)**: Corrections, clarifications

### Revision History Section

```markdown
## Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 2.0.0 | YYYY-MM-DD | Major revision | [Name] |
| 1.1.0 | YYYY-MM-DD | Minor addition | [Name] |
| 1.0.0 | YYYY-MM-DD | Initial promotion | [Name] |
```

### Deprecation

When deprecating knowledge:

1. Set `status: DEPRECATED`
2. Set `superseded-by: KDE-XXX`
3. Add deprecation notice
4. Preserve original (never delete)

---

## Relationships

### To Laboratory

- **Source**: Knowledge originates from Laboratory investigations
- **Traceability**: Bidirectional links required
- **Boundary**: Promotion marks ownership transfer

### To Governance

- **Owner**: Governance owns Knowledge after promotion
- **Authority**: Governance approves promotion
- **Policy**: Governance sets validation requirements

### To Seeds

- **Methodology**: Seeds define how investigations are conducted
- **Structure**: Seeds influence knowledge structure

### To Engines

- **Execution**: Engines execute investigations
- **Evidence**: Engines generate evidence
- **Independence**: Engines are independent of Knowledge

---

## Naming Conventions

### File Names

```
[Category]-[Sequence]-[Title].md
```

**Examples**:
- `FOUNDATIONAL-001-what-is-knowledge.md`
- `ARCHITECTURE-001-architecture-c.md`
- `GIS-fundamentals.md`
- `GOVERNANCE-promotion-rules.md`

### Knowledge IDs

```
KDE-[CATEGORY]-[NNN]
```

**Examples**:
- `KDE-001` (Foundational)
- `KDE-ARCH-001` (Architecture)
- `KDE-GIS-001` (Domain: GIS)
- `KDE-GOV-001` (Governance)

---

## Confidence Representation

### Confidence Dimensions

| Dimension | LOW | MEDIUM | HIGH |
|-----------|-----|--------|------|
| Evidence Quality | Single source | Multiple sources | Verified, cross-referenced |
| Reproducibility | Not tested | Partial replication | Confirmed by others |
| Consistency | Contradictions exist | Mostly consistent | No contradictions |

### Overall Confidence

Composite assessment considering all dimensions.

---

## Design Rule Representation

When documenting design rules:

```markdown
### Rule N: [Title]

**Statement**: Clear, actionable rule statement

**Rationale**: Why this rule exists

**When to Apply**: Context when rule applies

**Implementation**:
```[language]
code example
```

**Trade-offs**: If applicable

**Exceptions**: If applicable
```

---

## Summary

A KDE Knowledge Document is:

| Aspect | Requirement |
|--------|-------------|
| **Identity** | Unique ID, descriptive title, category |
| **Metadata** | Version, status, source investigation, evidence |
| **Content** | Definition, summary, evidence, provenance |
| **Class** | One of 5 defined classes |
| **Lifecycle** | DRAFT → VALIDATED → PROMOTED → DEPRECATED |
| **Confidence** | 3 dimensions + overall assessment |
| **Ownership** | Transfers to Governance at promotion |

---

## References

- LAB-022 Investigation: [`./investigation.md`](./investigation.md)
- LAB-022 Observations: [`./observations/OBSERVATIONS.md`](./observations/OBSERVATIONS.md)
- LAB-022 Synthesis: [`./synthesis/SYNTHESIS.md`](./synthesis/SYNTHESIS.md)
- KDE-001: What is Knowledge: [`/knowledge/001-what-is-knowledge.md`](../../knowledge/001-what-is-knowledge.md)
- KDE-ARCH-003: Artifact Lifecycle: [`/knowledge/KDE-ARCH-003.md`](../../knowledge/KDE-ARCH-003.md)
- KDE-ARCH-008: Knowledge Promotion Rules: [`/knowledge/KDE-ARCH-008.md`](../../knowledge/KDE-ARCH-008.md)
