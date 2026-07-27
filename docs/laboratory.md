# Laboratory Workflow

The KDE laboratory provides a systematic approach to investigation.

---

## Investigation Lifecycle

```
PROPOSED → APPROVED → IN_PROGRESS → REVIEW → COMPLETE
    ↓           ↓           ↓           ↓
  (reject)   (reject)   (block)    (revise)
```

---

## Investigation Structure

Each investigation contains:

| File | Purpose |
|------|---------|
| `INVESTIGATION.md` | Main investigation document |
| `EVIDENCE.md` | Supporting evidence |
| `*.md` | Additional analysis |

---

## Scientific Loop

```
    ┌─────────────┐
    │  OBSERVE    │
    └──────┬──────┘
           ↓
    ┌─────────────┐
    │  HYPOTHESIZE │
    └──────┬──────┘
           ↓
    ┌─────────────┐
    │   PREDICT    │
    └──────┬──────┘
           ↓
    ┌─────────────┐
    │   TEST      │
    └──────┬──────┘
           ↓
    ┌─────────────┐
    │  ANALYZE    │
    └──────┬──────┘
           ↓
    ┌─────────────┐
    │  ITERATE?   │
    └─────────────┘
```

---

## Bootstrap Gates

Before starting investigation, verify:

| Gate | Check |
|------|-------|
| B1 | Runtime state, experiments directory, rules |
| B2 | Git log, git status |
| B3 | Environment (Python, dependencies) |

---

## Evidence Standards

| Type | Description |
|------|-------------|
| Fact | Directly observable data |
| Inference | Logical derivation from facts |
| Speculation | Hypothesis not yet tested |

Mark evidence type clearly in documentation.

---

## See Also

- [Runtime Concepts](runtime-concepts.md)
- [Governance](governance.md)
