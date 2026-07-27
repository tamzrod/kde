# Governance

KDE governance ensures systematic, evidence-based operation.

---

## Laboratory Rules

### Rule 1: No Auto-Continuation

AI must never begin next session without explicit human authorization.

### Rule 2: No Self-Approval

AI must never approve its own work. Only humans can set APPROVED state.

### Rule 3: No Self-Promotion

AI must never promote knowledge to production without human approval.

### Rule 4: Distinguish Evidence

AI must clearly mark fact vs. conclusion vs. speculation.

### Rule 5: Evidence-Based Changes

All repository changes must be justified by evidence.

---

## Policy Layer

The ECU enforces these rules at runtime:

| Rule | Severity | Blocking |
|------|----------|----------|
| engine_must_be_registered | Error | Yes |
| engine_must_have_specification | Error | Yes |
| seed_must_be_registered | Error | Yes |
| execution_plan_must_be_valid | Error | Yes |
| no_unofficial_assets | Error | Yes |

---

## Violation Handling

When violations occur:

1. Document in investigation
2. Include evidence
3. Report to human
4. Await human review

---

## Approval Workflow

```
Agent proposes → Human reviews → Human approves → Agent implements
```

---

## See Also

- [Laboratory Workflow](laboratory.md)
- [Runtime Concepts](runtime-concepts.md)
