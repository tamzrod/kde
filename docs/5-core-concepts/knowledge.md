# Knowledge

**Purpose**: KDE's knowledge lifecycle and governance
**Audience**: All readers

---

## Overview

Knowledge in KDE is not assumed—it is cultivated. Every piece of knowledge must earn its place through evidence, validation, and human approval.

---

## Knowledge Lifecycle

```
Discovery → Investigation → Validation → Approval → Promotion → Application
    ↓            ↓              ↓            ↓           ↓           ↓
  [Gap]      [Evidence]     [Testing]    [Human]     [Official]  [Used]
```

| Stage | Description | Authority |
|-------|-------------|-----------|
| **Discovery** | Gap identified | Engine |
| **Investigation** | Evidence gathered | Engine + Seed |
| **Validation** | Testing complete | Laboratory |
| **Approval** | Human review | Human |
| **Promotion** | Move to /knowledge/ | Human |
| **Application** | Used in future work | All |

---

## Document State Machine

Documents transition through states:

```
DRAFT → REVIEW → APPROVED → VALIDATED → PROMOTED
  ↓        ↓         ↓          ↓          ↓
(reject) (revise) (reject)   (reject)   (rejected)
```

| State | Meaning | Authority |
|-------|---------|-----------|
| **DRAFT** | Work in progress | AI |
| **REVIEW** | Submitted for review | Human |
| **APPROVED** | Human approved | Human |
| **VALIDATED** | Passed validation | Laboratory |
| **PROMOTED** | In /knowledge/ | Human |

---

## Governance

### Governance Principles

| Principle | Description |
|-----------|-------------|
| **Human Authority** | Humans make final decisions |
| **Evidence Requirement** | All claims need evidence |
| **Traceability** | All decisions documented |
| **Immutability** | Approved knowledge preserved |

### Governance Bodies

| Body | Role |
|------|------|
| **Human** | Approve, promote, direct |
| **Engine** | Investigate, recommend |
| **Laboratory** | Test, validate |
| **ECU** | Orchestrate, enforce |

---

## Knowledge Structure

```
knowledge/
├── foundational/      # Core definitions
├── domain/           # Domain-specific knowledge
├── patterns/         # Recurring patterns
└── lessons/          # Lessons learned
```

---

## Knowledge Criteria

Knowledge is promoted when it meets:

| Criterion | Description |
|-----------|-------------|
| **Evidence** | Supported by documented evidence |
| **Validation** | Tested and confirmed |
| **Traceability** | Complete reasoning chain |
| **Clarity** | Clearly stated and understood |
| **Utility** | Useful for future work |

---

## Knowledge Rejection

Knowledge may be rejected when:

| Reason | Description |
|--------|-------------|
| **Insufficient Evidence** | Claims not supported |
| **Invalid Reasoning** | Logic flawed |
| **Unclear** | Ambiguous or vague |
| **Contradictory** | Conflicts with existing knowledge |
| **Premature** | Not sufficiently tested |

---

## Knowledge Evolution

Approved knowledge may evolve:

| Change Type | Trigger | Authority |
|-------------|---------|-----------|
| **Refinement** | Better understanding | Human |
| **Extension** | New evidence | Human |
| **Deprecation** | Outdated | Human |
| **Replacement** | Superior alternative | Human |

---

## See Also

- [Laboratory](laboratory.md) - Investigation workspace
- [Processes](../6-how-it-works/processes.md) - Investigation workflow
- [Evidence](../6-how-it-works/evidence.md) - Evidence standards
