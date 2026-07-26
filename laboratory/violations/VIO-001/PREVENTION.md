# VIO-001: Prevention Recommendations

**Violation ID**: VIO-001
**Date**: 2026-07-26

---

## Implemented Prevention Mechanisms

### 1. Violation Registry (REC-001)

**Status**: IMPLEMENTED

Created `laboratory/violations/` directory structure:
- `laboratory/violations/VIO-001/` - First violation documented
- `laboratory/violations/INDEX.md` - Registry index
- `laboratory/violations/README.md` - Registry documentation

### 2. Authority Declaration in Bootstrap (REC-002)

**Status**: IMPLEMENTED

Modified `laboratory/BOOTSTRAP.md` to include:
- Authority Declaration section
- Task type declaration (INVESTIGATE / IMPLEMENT / REPORT)
- Explicit confirmation requirement

### 3. Pre-Work Checklist (REC-003)

**Status**: IMPLEMENTED

Added mandatory checklist to `laboratory/BOOTSTRAP.md`:
- Bootstrap gates passed
- Task type declared
- Authority confirmed
- Investigation documented (if INVESTIGATE)
- Human approval received (if IMPLEMENT)

### 4. Seed Update (REC-004)

**Status**: PENDING

Proposed addition to `seeds/seed-001/`:

```markdown
### Principle 6: Explicit Authority

Before beginning ANY task:
1. Declare task type (INVESTIGATE / IMPLEMENT / REPORT)
2. State current authority level
3. Wait for explicit confirmation if implementing
4. Document investigation before implementing
```

**Note**: Requires human approval to add to seed.

---

## Prevention Checklist

For future tasks, apply this checklist:

```
Before starting ANY task:
□ Bootstrap gates verified
□ Task type declared: [INVESTIGATE / IMPLEMENT / REPORT]
□ Authority level stated: [________________]
□ Investigation documented (if INVESTIGATE): [YES / N/A]
□ Human approval received (if IMPLEMENT): [YES / N/A]

If ANY answer is missing or NO:
  → STOP
  → Request clarification
  → Wait for explicit instruction
```

---

## Red Flags

Watch for these patterns that often precede violations:

| Pattern | Example | Correct Response |
|---------|---------|------------------|
| "Investigate X" | No explicit approval | Document, then ask |
| "Look into" | Vague instruction | Clarify intent |
| "Figure out" | Action implied | Ask: investigate or implement? |
| Complex task | Multi-step | Break into approved phases |
| Time pressure | "Quick" or "just" | Still requires checkpoint |

---

## Recovery Protocol

If a violation is detected:

1. **Stop immediately** - Do not continue the violating behavior
2. **Acknowledge** - State clearly what rule was violated
3. **Document** - Record in `laboratory/violations/VIO-XXX/`
4. **Analyze** - Perform root cause analysis
5. **Propose** - Suggest prevention mechanisms
6. **Wait** - Do not proceed without explicit approval

---

**Prevention documented**: 2026-07-26
