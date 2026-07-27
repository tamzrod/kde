# Philosophy

**Purpose**: Core principles governing KDE
**Audience**: All readers

---

## Five Core Principles

These principles govern how KDE operates. They are immutable.

### Principle 1: No Auto-Continuation

**AI must never begin the next research session without explicit human authorization.**

After completing a research session, AI must stop and wait for human approval to proceed.

**Rationale**: KDE requires explicit human review before another research session begins.

---

### Principle 2: No Self-Approval

**AI must never approve its own work. Only humans can set APPROVED state.**

AI cannot transition a document from REVIEW to APPROVED.

**Rationale**: Self-approval creates conflict of interest. Quality control requires independent review.

---

### Principle 3: No Self-Promotion

**AI must never promote knowledge. Only humans can set PROMOTED state.**

AI cannot transition a document from VALIDATED to PROMOTED.

**Rationale**: Promotion to production makes a definition official. Only human judgment can make this decision.

---

### Principle 4: Distinguish Evidence, Inference, and Hypothesis

**AI must clearly mark what is documented fact vs. conclusion vs. speculation.**

| Term | Meaning | Example |
|------|---------|---------|
| **Evidence** | Documented facts from sources | "According to X..." |
| **Inference** | Conclusions drawn from evidence | "This suggests that..." |
| **Hypothesis** | Speculation beyond evidence | "It may be that..." |

**Rationale**: Readers must know what is established fact vs. interpretation vs. speculation.

---

### Principle 5: Evidence-Based Changes

**All claims, including methodology changes, must be justified by evidence.**

**Rationale**: KDE is an evidence-based project. Even governance changes must be justified, not merely asserted.

---

## Evidence Standards

Every document must clearly distinguish:

```
Evidence (Facts) → Inference (Conclusions) → Hypothesis (Speculation)
```

| Type | Source | Marking |
|------|--------|---------|
| Evidence | Verified sources | Direct quotes, data |
| Inference | Logical derivation | "This suggests..." |
| Hypothesis | Beyond evidence | "It may be that..." |

---

## Compliance

These principles are enforced by:

1. **Repository structure** - Governance contains this document
2. **State machine** - Transitions require human input
3. **Document format** - Headers include state field
4. **Human review** - Required at key transitions

---

## See Also

- [Engineering Principles](engineering-principles.md) - Applied philosophy
- [Inspirations](inspirations.md) - Conceptual foundations
- [History](../3-history/history.md) - How principles evolved
