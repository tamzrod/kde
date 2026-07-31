# Operational Rules

**Purpose**: Minimal rules for KDE operations
**Principle**: Maximum clarity, minimum complexity

---

## Knowledge Rules

### KR-001: Knowledge Definition
Knowledge is validated understanding that enables effective engineering action.

### KR-002: Evidence Requirement
All knowledge claims must cite evidence. Evidence must be:
- Verifiable
- Linked to source
- Distinguished from inference

### KR-003: Promotion Gate
Knowledge promotion requires:
1. Evidence meeting KR-002
2. Human authorization
3. Clear scope definition

---

## Investigation Rules

### IR-001: Investigation Scope
Each investigation addresses ONE question.

### IR-002: Evidence Collection
Every investigation must collect evidence before making conclusions.

### IR-003: Lessons Required
Investigations >1 day must capture lessons learned.

---

## Session Rules

### SR-001: Authorization Gate
AI must not begin next session without human authorization.

### SR-002: Approval Gate
AI must not approve own work.

### SR-003: Promotion Gate
AI must not promote knowledge without human authorization.

---

## Anti-Patterns

| Anti-Pattern | Rule |
|--------------|------|
| Speculation without evidence | KR-002 |
| Self-approval | SR-002 |
| Auto-continuation | SR-001 |
| Unscoped investigations | IR-001 |
| Missing lessons | IR-003 |

---

**Principle**: When in doubt, ask. Don't assume.
