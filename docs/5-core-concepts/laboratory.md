# Laboratory

**Purpose**: KDE's systematic investigation workspace
**Audience**: All readers

---

## Overview

The Laboratory is where investigations happen. It provides the structured environment for systematic inquiry.

---

## Laboratory Structure

```
laboratory/
├── investigations/     # Investigation artifacts
├── experiments/        # Experiment records
├── validations/        # Validation reports
├── questions/         # Research questions
└── bootstrap.md       # Session entry point
```

---

## Investigation Lifecycle

Every investigation follows this lifecycle:

```
PROPOSED → APPROVED → IN_PROGRESS → REVIEW → COMPLETE
    ↓           ↓           ↓           ↓
  (reject)   (reject)   (block)    (revise)
```

| State | Meaning |
|-------|---------|
| **PROPOSED** | Submitted for approval |
| **APPROVED** | Human authorized to proceed |
| **IN_PROGRESS** | Active investigation |
| **REVIEW** | Awaiting human review |
| **COMPLETE** | Investigation finished |

---

## Investigation Structure

Each investigation contains:

| File | Purpose |
|------|---------|
| `INVESTIGATION.md` | Main investigation document |
| `EVIDENCE.md` | Supporting evidence |
| `*.md` | Additional analysis files |

### Investigation Template

```markdown
# Investigation Title

**Investigation ID**: INV-XXX
**Date**: YYYY-MM-DD
**Engine**: KDE-ENGINE-XXX
**Seed**: SEED-XXX
**Status**: [STATUS]

---

## Objective

What are you investigating?

## Scope

What does this investigation cover?

## Methodology

How will you investigate?

## Evidence

What did you find?

## Analysis

What does the evidence mean?

## Conclusions

What can you conclude?

## Limitations

What are the limitations?

## Next Steps

What should happen next?
```

---

## Scientific Loop

The Laboratory uses the scientific loop:

```
    ┌─────────────┐
    │  OBSERVE    │ Gather data and facts
    └──────┬──────┘
           ↓
    ┌─────────────┐
    │ HYPOTHESIZE │ Form educated guess
    └──────┬──────┘
           ↓
    ┌─────────────┐
    │   PREDICT    │ Predict outcomes
    └──────┬──────┘
           ↓
    ┌─────────────┐
    │    TEST     │ Test hypothesis
    └──────┬──────┘
           ↓
    ┌─────────────┐
    │   ANALYZE   │ Interpret results
    └──────┬──────┘
           ↓
    ┌─────────────┐
    │  ITERATE?   │ Continue or conclude
    └─────────────┘
```

---

## Bootstrap Gates

Before starting investigation, verify:

| Gate | Check |
|------|-------|
| **B1** | Runtime state, experiments directory, rules |
| **B2** | Git log, git status |
| **B3** | Environment (Python, dependencies) |

---

## Quality Standards

### Investigation Quality

Every investigation must:

- Have clear objective
- Follow systematic methodology
- Document all evidence
- Trace reasoning
- Acknowledge limitations

### Evidence Quality

Evidence must be:

- **Sourced** - Origin identified
- **Verifiable** - Can be checked
- **Relevant** - Supports claims
- **Sufficient** - Adequate for conclusions

---

## See Also

- [Processes](../6-how-it-works/processes.md) - Investigation workflow
- [Evidence](../6-how-it-works/evidence.md) - Evidence standards
- [Knowledge](knowledge.md) - Knowledge lifecycle
