# Laboratory

---

## The Simple Idea

A laboratory is where scientists do science. It has the tools, the protocols, the space for systematic inquiry.

KDE's Laboratory is the same. It's where investigations happen—the structured environment for systematic inquiry.

---

## Real-World Observation

Scientific labs don't just have beakers and Bunsen burners. They have protocols. Safety rules. Documentation standards. Equipment logs.

A chemist can't just mix chemicals and see what happens. They follow procedures, document observations, and reproduce results.

The lab isn't the science. It's the environment that makes science possible.

KDE's Laboratory is the same. It's not the investigation—it's the environment that makes investigation possible.

---

## The Structure

```
laboratory/
├── investigations/     # Investigation artifacts
├── experiments/        # Experiment records
├── validations/        # Validation reports
├── questions/         # Research questions
└── bootstrap.md       # Session entry point
```

Each investigation lives here. Each experiment is recorded. Each question is tracked.

---

## The Investigation Lifecycle

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

Notice: every transition requires human action. This isn't bureaucracy—it's independence.

---

## The Scientific Loop

Every investigation follows the scientific loop:

```
OBSERVE → HYPOTHESIZE → PREDICT → TEST → ANALYZE → ITERATE?
```

1. **Observe** — Gather data
2. **Hypothesize** — Form a testable idea
3. **Predict** — What should we see if true?
4. **Test** — Check the prediction
5. **Analyze** — What did we learn?
6. **Iterate?** — Continue or conclude?

This isn't KDE's invention. It's how systematic inquiry works.

---

## Bootstrap Gates

Before starting investigation, KDE verifies readiness:

| Gate | Checks |
|------|--------|
| **B1** | Runtime state, experiments directory, rules |
| **B2** | Git log, git status |
| **B3** | Environment (Python, dependencies) |

These aren't optional. They're how you know you're ready.

---

## Investigation Template

Every investigation follows this structure:

```markdown
# Investigation Title

**Investigation ID**: INV-XXX
**Date**: YYYY-MM-DD
**Engine**: KDE-ENGINE-XXX
**Seed**: SEED-XXX

## Objective
What are you investigating?

## Scope
What does this cover?

## Evidence
What did you find?

## Conclusions
What can you conclude?

## Limitations
What are the limitations?

## Next Steps
What should happen next?
```

---

## Quality Standards

Every investigation must:
- Have a clear objective
- Follow systematic methodology
- Document all evidence
- Trace reasoning
- Acknowledge limitations

Every piece of evidence must be:
- **Sourced** — Origin identified
- **Verifiable** — Can be checked
- **Relevant** — Supports claims
- **Sufficient** — Adequate for conclusions

---

## See Also

- [Processes](../6-how-it-works/processes.md) — How investigations flow
- [Evidence](../6-how-it-works/evidence.md) — Evidence standards
- [Knowledge](knowledge.md) — The product of investigation
