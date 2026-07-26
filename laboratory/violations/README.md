# Laboratory Violations Registry

**Purpose**: Track and prevent Laboratory Rule violations

---

## What is This Registry?

The violations registry is a historical record of all Laboratory Rule violations. It serves three purposes:

1. **Accountability** - Document when rules were broken
2. **Learning** - Understand why violations occur
3. **Prevention** - Detect patterns and prevent future violations

---

## When to Use This Registry

### For Agents

Before starting any task:
1. Check this registry for recent violations
2. Learn from past mistakes
3. Apply prevention mechanisms

After detecting a violation:
1. Document in this registry
2. Perform root cause analysis
3. Propose prevention mechanisms

### For Humans

During review:
1. Check this registry for patterns
2. Identify systemic issues
3. Approve prevention mechanisms

---

## Registry Structure

```
laboratory/violations/
├── README.md                    # This file
├── INDEX.md                     # All violations, searchable
├── TRENDS.md                   # Pattern analysis
├── VIO-001/                    # First violation
│   ├── INVESTIGATION.md        # What happened
│   ├── ROOT-CAUSE.md          # Why it happened
│   ├── PREVENTION.md          # How to prevent
│   └── PATTERN.md             # Pattern analysis (if recurring)
├── VIO-002/
│   └── ...
```

---

## Violation Severity

| Level | Description | Example |
|-------|-------------|---------|
| **LOW** | Minor oversight, no harm | Forgot to document one step |
| **MODERATE** | Rule broken, caught before harm | Started without approval |
| **HIGH** | Significant harm or repeated | Multiple violations |
| **CRITICAL** | Systemic failure | Regular pattern of violations |

---

## Creating a New Violation Record

### Step 1: Create Directory

```bash
mkdir -p laboratory/violations/VIO-XXX
```

Use the next sequential number.

### Step 2: Create Required Files

1. `INVESTIGATION.md` - What happened
2. `ROOT-CAUSE.md` - Why it happened
3. `PREVENTION.md` - How to prevent

### Step 3: Update INDEX.md

Add the new violation to the index.

### Step 4: Notify

Alert the human overseer of the new violation.

---

## Pattern Detection

Review `TRENDS.md` quarterly for patterns such as:

- Same rule violated repeatedly
- Same root cause across violations
- Time-based patterns (end of sprint, etc.)
- Task-type patterns (investigations vs implementations)

---

## Prevention Mechanisms

See individual violation records for specific prevention mechanisms.

General prevention:
1. Authority Declaration (in BOOTSTRAP.md)
2. Pre-Work Checklist (in BOOTSTRAP.md)
3. Explicit task type declaration
4. Mandatory approval checkpoints

---

## Related Documentation

- `laboratory/BOOTSTRAP.md` - Entry point with prevention mechanisms
- `laboratory/experiments/` - All experiments
- `seeds/seed-001/` - Core principles

---

**Last Updated**: 2026-07-26
