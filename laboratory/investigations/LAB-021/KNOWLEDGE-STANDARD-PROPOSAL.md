# Knowledge Repository Standard Proposal

**Document Type**: Proposal
**Investigation**: LAB-021
**Date**: 2026-07-21T07:20:00Z
**Status**: DRAFT

---

## Purpose

This proposal defines a standard structure for all Knowledge Repository artifacts. It addresses the inconsistencies and gaps identified during the LAB-021 investigation.

---

## Background

The LAB-021 investigation audited the Knowledge Repository and found:

1. **Three distinct document structures** in use
2. **Missing standard metadata** in domain documents
3. **No formal promotion workflow**
4. **Inconsistent naming conventions**
5. **Traceability gaps** to investigations

This proposal addresses each finding.

---

## Proposal 1: Standard Document Template

### Mandatory Header

```markdown
---
knowledge-id: KDE-XXX
title: [Document Title]
version: X.Y.Z
status: [DRAFT|VALIDATED|PROMOTED|DEPRECATED]
confidence: [LOW|MEDIUM|HIGH]
evidence-level: [Level 1-5]
category: [FOUNDATIONAL|ARGUMENTATION|ARCHITECTURE|DOMAIN]
domain: [null|GIS|Typography|Visualization|...]
source-investigation: [INV-XXX]
evidence-references: [EV-XXX, EV-XXX]
created: YYYY-MM-DDTHH:MM:SSZ
last-modified: YYYY-MM-DDTHH:MM:SSZ
promoted: [YYYY-MM-DD|null]
approved-by: [Name|null]
---
```

### Required Sections

```markdown
# [Title]

## Definition

[One paragraph definition of the knowledge]

## Summary

[Brief overview of the knowledge (2-3 paragraphs)]

## Evidence

### Supporting Evidence
| Evidence ID | Description | Source |
|-------------|-------------|--------|
| EV-XXX | [Description] | [Source] |

### Contradicting Evidence
| Evidence ID | Description | Impact |
|-------------|-------------|--------|
| [if any] | [Description] | [Minor/Major/Critical] |

## Confidence Assessment

| Factor | Assessment | Rationale |
|--------|------------|-----------|
| Evidence Quality | [HIGH/MEDIUM/LOW] | [Rationale] |
| Reproducibility | [HIGH/MEDIUM/LOW] | [Rationale] |
| Consistency | [HIGH/MEDIUM/LOW] | [Rationale] |
| **Overall** | [HIGH/MEDIUM/LOW] | [Summary] |

## Validation

[How this knowledge was validated]

## Dependencies

- [Other knowledge this depends on]
- [Investigation that created this]

## Related Knowledge

- [Related KDE-XXX]
- [Related KDE-YYY]

## Usage

[How to apply this knowledge]

## Limitations

[Any limitations or boundary conditions]

## Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | YYYY-MM-DD | Initial | [Name] |

## Provenance

| Field | Value |
|-------|-------|
| Investigation | [INV-XXX] |
| Experiment | [LAB-XXX] |
| Evidence | [EV-XXX, EV-YYY] |
| Validator | [Name] |
| Approver | [Name] |
| Promoter | [Name] |
```

---

## Proposal 2: Naming Conventions

### Pattern

```
[Category]-[Sequence]-[Title].md
```

### Categories

| Category | Prefix | Example |
|----------|--------|---------|
| Foundational | FND | FND-001-what-is-knowledge.md |
| Architecture | ARCH | ARCH-001-architecture-c.md |
| Methodology | MTH | MTH-001-research-methodology.md |
| Domain | [Domain] | GIS-fundamentals.md |
| Governance | GOV | GOV-001-promotion-rules.md |

### Rules

1. Use lowercase for all file names
2. Use hyphens to separate words
3. Include sequence number for cross-referencing
4. Include category for filtering

---

## Proposal 3: Promotion Workflow

### Promotion Proposal Template

```markdown
# Knowledge Promotion Proposal: [Title]

**Knowledge ID**: KDE-XXX
**Investigation**: INV-XXX
**Date**: YYYY-MM-DD
**Proposer**: [Name]

---

## Candidate Knowledge

### Statement

[Clear statement of knowledge]

### Confidence

| Factor | Assessment |
|--------|------------|
| Evidence Quality | [HIGH/MEDIUM/LOW] |
| Reproducibility | [HIGH/MEDIUM/LOW] |
| Consistency | [HIGH/MEDIUM/LOW] |
| **Overall** | [HIGH/MEDIUM/LOW] |

### Evidence Summary

| Type | Count | Quality |
|------|-------|---------|
| Supporting | [N] | [HIGH/MEDIUM/LOW] |
| Contradicting | [N] | [N/A/MINOR/MAJOR] |

---

## Traceability

| Artifact | Reference |
|---------|----------|
| Investigation | [INV-XXX] |
| Synthesis | [SYN-XXX] |
| Validation | [VAL-XXX] |
| Conclusion | [conclusion.md] |

---

## Approval

| Role | Name | Date | Decision |
|------|------|------|----------|
| Proposer | [Name] | YYYY-MM-DD | PROPOSED |
| Validator | [Name] | YYYY-MM-DD | [APPROVED/REVISIONS REQUIRED] |
| Human Approver | [Name] | YYYY-MM-DD | [APPROVED/REJECTED] |

---

**Note**: AI cannot approve or promote knowledge. Only humans can set PROMOTED state.
```

### Promotion Steps

1. **Complete Investigation**
   - All evidence collected
   - Synthesis created
   - Validation passed

2. **Prepare Proposal**
   - Fill promotion template
   - Include all traceability links
   - Attach evidence references

3. **Submit for Validation**
   - Validator reviews evidence
   - Validator confirms quality
   - Validator recommends approval/revision

4. **Human Approval**
   - Human reviews proposal
   - Human approves or rejects
   - Human promotes knowledge

5. **Archive**
   - Move to /knowledge/
   - Update index
   - Update investigation status

---

## Proposal 4: Traceability Requirements

### Mandatory Traceability

Every knowledge document SHALL link to:

| Artifact | Required | Format |
|----------|----------|--------|
| Source Investigation | YES | `INV-XXX` |
| Evidence | YES | `EV-XXX` list |
| Validator | YES | Name |
| Approver | YES | Name |
| Promotion Date | YES | ISO-8601 |

### Optional Traceability

| Artifact | Format |
|----------|--------|
| Supporting Experiments | `LAB-XXX` list |
| Related Knowledge | `KDE-XXX` list |
| Previous Version | `KDE-XXX vN.N.N` |

---

## Proposal 5: Status Values

### Standard Status Values

| Status | Meaning | Transitions |
|--------|---------|-------------|
| DRAFT | Work in progress | → VALIDATED |
| VALIDATED | Passed validation | → PROMOTED, DEPRECATED |
| PROMOTED | In Knowledge Repository | → DEPRECATED |
| DEPRECATED | Superseded or invalid | — |

### Governance Authority

| Status | Human Required |
|--------|----------------|
| DRAFT | No |
| VALIDATED | No (validation authority) |
| PROMOTED | YES (human approval) |
| DEPRECATED | YES (human decision) |

---

## Implementation Plan

### Phase 1: Define Standard (Immediate)

1. Adopt document template
2. Define naming conventions
3. Create promotion workflow

### Phase 2: Migrate Existing (Short-term)

1. Migrate KDE-ARCH documents to new format
2. Migrate Tier 1 documents to new format
3. Add metadata to domain documents

### Phase 3: Enforce (Ongoing)

1. Require standard format for new knowledge
2. Audit existing knowledge quarterly
3. Update template based on experience

---

## Expected Outcomes

| Outcome | Metric |
|---------|--------|
| Consistent structure | 100% documents follow template |
| Traceability | 100% documents link to investigation |
| Clear promotion | 100% promoted knowledge has proposal |
| Version control | 100% documents have version history |

---

## Open Questions

1. Should existing knowledge be migrated or grandfathered?
2. Who approves domain-specific knowledge?
3. Should confidence levels be standardized?
4. How to handle conflicting knowledge?

---

## References

- LAB-021 Investigation: [`./findings/FINDINGS.md`](./findings/FINDINGS.md)
- Knowledge README: [`/knowledge/README.md`](../../knowledge/README.md)
- Promotion Rules: [`KDE-ARCH-008.md`](../../knowledge/KDE-ARCH-008.md)
- Metadata Standard: [`KDE-ARCH-006.md`](../../knowledge/KDE-ARCH-006.md)
