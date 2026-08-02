# Knowledge Lifecycle

**Document ID**: FOUND-002
**Type**: Lifecycle Definition
**Status**: FOUNDATIONAL
**Authority**: Human

---

## Overview

This document defines how knowledge moves from creation to archival. Every knowledge object follows this lifecycle.

---

## Lifecycle Stages

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           KNOWLEDGE LIFECYCLE                               │
└─────────────────────────────────────────────────────────────────────────────┘

    ┌─────────┐
    │CONVERS- │  Initial discovery or question
    │  ATION  │
    └────┬────┘
         │
         ▼
    ┌─────────┐
    │CANDIDATE│  Proposed for Knowledge Layer
    └────┬────┘
         │
         ▼
    ┌─────────┐
    │ REVIEW  │  Under evaluation
    └────┬────┘
         │
         ▼
    ┌─────────┐
    │APPROVED │  Ready for promotion
    └────┬────┘
         │
         ▼
    ┌─────────┐
    │PROMOTED │  In the Knowledge Layer
    └────┬────┘
         │
         ▼
    ┌─────────┐
    │REVISION │  May be updated (minor changes)
    │    or   │
    │ARCHIVED │
    └─────────┘
```

---

## Stage Definitions

### Stage 1: Conversation

**Status**: Pre-candidate
**Purpose**: Initial discovery, question, or investigation

| Attribute | Value |
|-----------|-------|
| **Entry** | New question or discovery |
| **Exit** | Formulated as candidate knowledge |
| **Actor** | AI or Human |
| **Authority** | None required |

**Activities**:
- Investigation
- Evidence collection
- Analysis
- Formulation

**Exit Criteria**:
- Clear knowledge statement
- Initial evidence gathered
- Scope identified

---

### Stage 2: Candidate

**Status**: Proposed
**Purpose**: Submitted for Knowledge Layer consideration

| Attribute | Value |
|-----------|-------|
| **Entry** | Submission for promotion |
| **Exit** | Accepted for review or rejected |
| **Actor** | AI (can submit) |
| **Authority** | None required for submission |

**Activities**:
- Documentation in candidate format
- Evidence compilation
- Test preparation

**Exit Criteria**:
- Knowledge object schema complete
- Evidence list populated
- Type classification assigned

**Exit Actions**:
- **Accept**: Move to Review
- **Reject**: Return to Conversation with feedback

---

### Stage 3: Review

**Status**: Under Evaluation
**Purpose**: Validation and quality assurance

| Attribute | Value |
|-----------|-------|
| **Entry** | Candidate accepted |
| **Exit** | Approved or returned |
| **Actor** | Human reviewer(s) |
| **Authority** | Human |

**Activities**:
- Validation testing (see PROMOTION-RULES.md)
- Evidence verification
- Scope verification
- Consistency checking

**Exit Criteria**:
- All validation tests passed
- Evidence verified
- No conflicts with existing knowledge
- Scope clearly defined

**Exit Actions**:
- **Approve**: Move to Approved
- **Return**: Return to Candidate with required changes
- **Reject**: Move to Archived (not suitable)

---

### Stage 4: Approved

**Status**: Ready for Promotion
**Purpose**: Final authorization stage

| Attribute | Value |
|-----------|-------|
| **Entry** | Review passed |
| **Exit** | Promoted or held |
| **Actor** | Human authority |
| **Authority** | Human (required) |

**Activities**:
- Final human authorization
- Version assignment
- ID assignment
- Entry preparation

**Exit Criteria**:
- Human authorization obtained
- Version number assigned
- Unique ID assigned

**Exit Actions**:
- **Promote**: Move to Promoted
- **Hold**: Remain in Approved (pending external factors)

---

### Stage 5: Promoted

**Status**: In Knowledge Layer
**Purpose**: Active, reusable knowledge

| Attribute | Value |
|-----------|-------|
| **Entry** | Human authorization |
| **Exit** | Revision, Deprecation, or Archive |
| **Actor** | System (automated) |
| **Authority** | Human (required for exit) |

**Activities**:
- Available for AI consumption
- Version tracked
- Usage monitored

**Exit Actions**:
- **Revise**: Update (minor or major change)
- **Deprecate**: Mark as obsolete
- **Archive**: Preserve for historical reference

---

### Stage 6: Revision

**Status**: Updated
**Purpose**: Knowledge update while maintaining continuity

| Attribute | Value |
|-----------|-------|
| **Entry** | Update proposed |
| **Exit** | Return to Review or Promoted |
| **Actor** | Human or AI (proposal) |
| **Authority** | Human (required for approval) |

**Revision Types**:

| Type | Version Change | Definition Change |
|------|---------------|-------------------|
| **Minor** | MINOR | Scope expanded, new evidence added |
| **Major** | MAJOR | Definition modified |

**Minor Revision (e.g., 1.0.0 → 1.1.0)**:
- Scope can be expanded
- New evidence can be added
- Definition remains unchanged
- Review may be abbreviated

**Major Revision (e.g., 1.0.0 → 2.0.0)**:
- Definition may be modified
- Full review required
- Breaking changes documented

---

### Stage 7: Deprecated

**Status**: Obsolete
**Purpose**: Knowledge no longer recommended

| Attribute | Value |
|-----------|-------|
| **Entry** | Marked obsolete |
| **Exit** | Archived |
| **Actor** | Human authority |
| **Authority** | Human (required) |

**Deprecation Reasons**:
- Superseded by better formulation
- Evidence invalidated
- Domain changed fundamentally
- Scope no longer applicable

**Activities**:
- Mark as deprecated (not deleted)
- Document deprecation reason
- Reference replacement (if any)
- Warn against new use

**Exit Actions**:
- **Archive**: Preserve for historical reference

---

### Stage 8: Archived

**Status**: Historical
**Purpose**: Preserved for reference, not for active use

| Attribute | Value |
|-----------|-------|
| **Entry** | Deprecated or Rejected |
| **Exit** | None (terminal) |
| **Actor** | System (automated) |
| **Authority** | None required |

**Activities**:
- Preserved with full history
- Removed from active knowledge
- Available for reference

---

## Transition Matrix

| From | To | Required | Authority |
|------|----|----------|-----------|
| Conversation | Candidate | Submit | None |
| Candidate | Review | Accept | Human |
| Candidate | Conversation | Return | Human |
| Review | Approved | Pass all tests | Human |
| Review | Candidate | Fail tests | Human |
| Review | Archived | Reject | Human |
| Approved | Promoted | Authorize | Human |
| Approved | Approved | Hold | Human |
| Promoted | Revision | Propose change | Human |
| Promoted | Deprecated | Mark obsolete | Human |
| Revision | Review | Major change | Human |
| Revision | Promoted | Minor change | Human |
| Deprecated | Archived | N/A | System |
| Archived | (terminal) | N/A | N/A |

---

## State Transitions

### Valid Transitions

```
Conversation → Candidate
Candidate → Review
Candidate → Conversation (return)
Review → Approved
Review → Candidate (return)
Review → Archived (reject)
Approved → Promoted
Approved → Approved (hold)
Promoted → Revision
Promoted → Deprecated
Revision → Review (major)
Revision → Promoted (minor)
Deprecated → Archived
```

### Invalid Transitions

```
Conversation → Promoted (skip stages)
Candidate → Promoted (skip review)
Review → Promoted (skip approval)
Promoted → Candidate (cannot revert)
Archived → Promoted (cannot restore)
```

---

## Version Tracking

### Version Format

`MAJOR.MINOR.PATCH`

| Component | Increment On | Example |
|-----------|-------------|---------|
| MAJOR | Breaking definition change | 1.0.0 → 2.0.0 |
| MINOR | Non-breaking expansion | 1.0.0 → 1.1.0 |
| PATCH | Correction, no content change | 1.0.0 → 1.0.1 |

### Version History

Each knowledge object maintains:
- Full version history
- Change descriptions
- Author of each version
- Timestamp of each version

---

## Quality Gates

### Candidate Gate

| Check | Requirement |
|-------|-------------|
| Schema Compliance | All required fields present |
| Type Assigned | Valid knowledge type |
| Evidence Listed | At least one evidence item |

### Review Gate

| Check | Requirement |
|-------|-------------|
| Validation Tests | All required tests passed |
| Evidence Verified | All evidence items verified |
| No Conflicts | No contradictions with existing knowledge |
| Scope Clear | Boundaries well-defined |

### Approval Gate

| Check | Requirement |
|-------|-------------|
| Human Authorization | Explicit human approval |
| ID Assigned | Unique identifier assigned |
| Version Assigned | Semantic version assigned |

### Promotion Gate

| Check | Requirement |
|-------|-------------|
| Authority | Human authority obtained |
| Format | Correct schema format |
| ID Unique | Identifier not in use |

---

## Exception Handling

### Rejected Knowledge

Knowledge that fails review:
1. Returns to Candidate with feedback
2. May be revised and resubmitted
3. May be archived if unsuitable

### Contradictory Knowledge

When new knowledge contradicts existing:
1. Both cannot be in Promoted state
2. Resolution required before promotion
3. Options: Deprecate old, modify new, or split scope

### Circular Dependencies

Knowledge objects must not form circular dependencies:
1. Dependency check required before promotion
2. Circular dependencies must be resolved

---

**Document Status**: FOUNDATIONAL
**Authority**: Human
**Related**: WHAT-IS-KNOWLEDGE.md, PROMOTION-RULES.md, KNOWLEDGE-OBJECT.md
