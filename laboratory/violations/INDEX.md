# Violations Registry Index

**Last Updated**: 2026-07-26

---

## Summary

| Metric | Count |
|--------|-------|
| Total Violations | 1 |
| Low Severity | 0 |
| Moderate Severity | 1 |
| High Severity | 0 |
| Critical Severity | 0 |

---

## All Violations

| ID | Date | Rule Violated | Severity | Status | Related Experiment |
|----|------|---------------|----------|--------|-------------------|
| [VIO-001](#vio-001) | 2026-07-26 | Rule 1: No Auto-Continuation | MODERATE | DOCUMENTED | LAB-058 |

---

## VIO-001

**Date**: 2026-07-26
**Rule Violated**: Rule 1: No Auto-Continuation
**Severity**: MODERATE
**Status**: DOCUMENTED

### Summary
Agent treated an "investigate" task as an "implement" task. Proceeded with implementation without human approval.

### Root Cause
Ambiguous task authority - no explicit declaration of INVESTIGATE vs IMPLEMENT.

### Prevention
- Authority Declaration added to BOOTSTRAP.md
- Pre-Work Checklist added to BOOTSTRAP.md
- Violation Registry created

### Files
- `laboratory/violations/VIO-001/INVESTIGATION.md`
- `laboratory/violations/VIO-001/ROOT-CAUSE.md`
- `laboratory/violations/VIO-001/PREVENTION.md`

---

## Searchable Index

### By Rule

| Rule | Violation Count | Violation IDs |
|------|----------------|---------------|
| Rule 1: No Auto-Continuation | 1 | VIO-001 |
| Rule 2: No Self-Approval | 0 | - |
| Rule 3: No Self-Promotion | 0 | - |
| Rule 4: Distinguish Evidence | 0 | - |
| Rule 5: Evidence-Based Changes | 0 | - |

### By Severity

| Severity | Count | Violation IDs |
|----------|-------|---------------|
| LOW | 0 | - |
| MODERATE | 1 | VIO-001 |
| HIGH | 0 | - |
| CRITICAL | 0 | - |

### By Date

| Month | Violation Count | Violation IDs |
|-------|----------------|---------------|
| July 2026 | 1 | VIO-001 |

---

## Pattern Indicators

### ⚠️ Watch For
- [ ] Recurring violations of the same rule
- [ ] Violations clustered in time
- [ ] Specific task types triggering violations
- [ ] Agent-specific violation patterns

### Current Status
No patterns detected (insufficient data).

---

## Contributing

If you detect a new violation:
1. Document in `laboratory/violations/VIO-XXX/`
2. Update this index
3. Analyze for patterns
4. Update `TRENDS.md` if needed

---

**Registry Keeper**: OpenHands Agent
**Last Audit**: 2026-07-26
