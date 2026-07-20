# Adversarial Evaluation Summary

**Evaluation ID**: EVAL-20260720-191402
**Timestamp**: 2026-07-20T19:14:02.228091Z

## Overall Results

| Metric | Value |
|--------|-------|
| Protocols Evaluated | 100 |
| Passed | 100 (100.0%) |
| Failed | 0 (0.0%) |
| Partial | 0 |
| Errors | 0 |

## Vulnerability Summary

| Severity | Count |
|----------|-------|
| Critical | 0 |
| High | 28 |
| Medium | 200 |
| Low | 100 |
| Informational | 0 |

## Score Statistics

- Mean Score: 93.2
- Median Score: 93.8
- Min Score: 91.8
- Max Score: 93.8

## Phase Performance

| Phase | Name | Avg Score | Pass Rate |
|-------|------|-----------|----------|
| 1 | Specification Review | 90.0 | 100.0% |
| 2 | Implementation Validation | 95.0 | 100.0% |
| 3 | Static Analysis | 92.5 | 0.0% |
| 4 | State Machine Testing | 90.0 | 0.0% |
| 5 | Replay Attack | 90.0 | 0.0% |
| 6 | MITM Simulation | 90.0 | 0.0% |
| 7 | Downgrade Testing | 90.0 | 0.0% |
| 8 | Fuzz Testing | 100.0 | 100.0% |
| 9 | Crypto Property Validation | 100.0 | 100.0% |
| 10 | Self-Critique | 94.4 | 100.0% |

## Recurring Weaknesses

- Incomplete State Machine: 200 occurrences
- Uncaught Exceptions: 100 occurrences
- Most Dangerous Assumption: 28 occurrences

