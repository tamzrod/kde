# Processes

**Purpose**: KDE's investigation and document workflows
**Audience**: Practitioners

---

## Overview

KDE uses systematic processes to ensure quality and traceability. Two key workflows govern operations:

1. **Scientific Loop** - How investigations proceed
2. **Document Lifecycle** - How documents transition states

---

## Scientific Loop

The foundation of KDE investigation:

```
    ┌─────────────┐
    │  OBSERVE    │ Gather data, collect facts
    └──────┬──────┘
           ↓
    ┌─────────────┐
    │ HYPOTHESIZE │ Form hypothesis from observations
    └──────┬──────┘
           ↓
    ┌─────────────┐
    │   PREDICT    │ Deduce predictions from hypothesis
    └──────┬──────┘
           ↓
    ┌─────────────┐
    │    TEST      │ Test predictions experimentally
    └──────┬──────┘
           ↓
    ┌─────────────┐
    │   ANALYZE   │ Analyze test results
    └──────┬──────┘
           ↓
    ┌─────────────┐
    │  ITERATE?   │ Continue loop or conclude?
    └─────────────┘
```

### Loop Principles

| Step | Principle |
|------|-----------|
| Observe | Document facts without interpretation |
| Hypothesize | Form testable statements |
| Predict | Logical consequences of hypothesis |
| Test | Validate through experiment |
| Analyze | Interpret results objectively |
| Iterate | Continue until confidence achieved |

---

## Investigation Lifecycle

Investigations progress through states:

```
PROPOSED → APPROVED → IN_PROGRESS → REVIEW → COMPLETE
    ↓           ↓           ↓           ↓
  (reject)   (reject)   (block)    (revise)
```

### State Definitions

| State | Description | Required Action |
|-------|-------------|-----------------|
| **PROPOSED** | Submitted for approval | Await human authorization |
| **APPROVED** | Human authorized work | Begin investigation |
| **IN_PROGRESS** | Active investigation | Conduct systematic inquiry |
| **REVIEW** | Awaiting human review | Submit for review |
| **COMPLETE** | Investigation finished | Document closure |

### Transitions

| From | To | Trigger |
|------|-----|---------|
| PROPOSED | APPROVED | Human approves |
| PROPOSED | (reject) | Human rejects |
| APPROVED | IN_PROGRESS | Begin work |
| IN_PROGRESS | REVIEW | Submit for review |
| IN_PROGRESS | (block) | Issue encountered |
| REVIEW | COMPLETE | Human approves |
| REVIEW | (revise) | Human requests changes |

---

## Document State Machine

Documents transition through states:

```
DRAFT → REVIEW → APPROVED → VALIDATED → PROMOTED
  ↓        ↓         ↓          ↓          ↓
(reject) (revise)  (reject)   (reject)   (rejected)
```

### State Definitions

| State | Description | Authority |
|-------|-------------|-----------|
| **DRAFT** | Work in progress | AI |
| **REVIEW** | Submitted for human review | Human |
| **APPROVED** | Human approved | Human |
| **VALIDATED** | Passed validation | Laboratory |
| **PROMOTED** | Moved to /knowledge/ | Human |

### Transitions

| From | To | Trigger |
|------|-----|---------|
| DRAFT | REVIEW | AI submits |
| REVIEW | APPROVED | Human approves |
| REVIEW | DRAFT | Human requests revision |
| REVIEW | (reject) | Human rejects |
| APPROVED | VALIDATED | Validation passes |
| APPROVED | (reject) | Validation fails |
| VALIDATED | PROMOTED | Human promotes |
| VALIDATED | (reject) | Human rejects |

---

## Bootstrap Gates

Before starting any work, verify:

| Gate | Check | Purpose |
|------|-------|---------|
| **B1** | Runtime state | Environment ready |
| **B1** | Experiments directory | Workspace exists |
| **B1** | Laboratory rules | Governance active |
| **B2** | Git log | No uncommitted violations |
| **B2** | Git status | Working tree clean |
| **B3** | Python runtime | Environment valid |
| **B3** | Dependencies | Required packages available |

---

## Approval Authority

| Decision | Authority | Rationale |
|----------|-----------|-----------|
| Begin investigation | Human | Prevent unauthorized work |
| Approve investigation | Human | Quality control |
| Approve document | Human | Independence |
| Validate work | Laboratory | Systematic check |
| Promote knowledge | Human | Official status |

---

## See Also

- [Evidence](evidence.md) - Evidence standards
- [Engines and Seeds](../5-core-concepts/engines-and-seeds.md) - Investigation components
- [Knowledge](../5-core-concepts/knowledge.md) - Knowledge lifecycle
