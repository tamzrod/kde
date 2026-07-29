# Experiment Index: LAB-068

**Experiment**: MD-LAB067 Bidirectional Compiler with Mutation Testing
**Status**: COMPLETE
**Domain**: Compiler Design
**Investigation**: INV-DIMINISHING-RETURNS-001

---

## Quick Summary

Built a bidirectional compiler that converts LAB-067 experiment results to/from Markdown format, then tested robustness through 28 systematic mutations across 4 categories.

**Result**: Compiler achieves 100% baseline fidelity but degrades to 84.5% overall under mutation. One critical failure: data corruption (transposed digits) not detected.

---

## Run Summary

| Run | Focus | Status | Full Recovery |
|-----|-------|--------|---------------|
| 001 | Compiler build | COMPLETE | 100% |
| 002 | Syntactic mutations | COMPLETE | 87.5% |
| 003 | Semantic mutations | COMPLETE | 50% (1 critical fail) |
| 004 | Structural mutations | COMPLETE | 50% |

---

## Key Findings

### Finding 1: Baseline Fidelity = 100%
- Compiler serializes and parses LAB-067 data perfectly
- All field types handled correctly
- Round-trip fidelity confirmed

### Finding 2: Syntactic Robustness = 87.5%
- Delimiter, whitespace, case, header changes handled
- Only number rounding causes partial loss (precision)

### Finding 3: Semantic Weakness = 50% + 1 Critical
- Most format variations handled (%, "percent", etc.)
- **CRITICAL**: MV-05 transposed digits (72→27) not detected
- No checksum or validation mechanism

### Finding 4: Structural Graceful = 62.5%
- Field renames partially handled via alias system
- Row deletion causes data loss (defaults used)
- Section reorder/duplicate/delete handled gracefully

### Finding 5: Hypothesis Confirmed
- Semantic mutations hardest to detect
- Different mutation types have different failure modes
- Graceful degradation is preferable to total failure

---

## Mutation Recovery Summary

```
Category       │ Full  │ Partial │ Fail │ Avg
───────────────┼───────┼─────────┼──────┼─────
Syntactic      │ 87.5% │  12.5%  │  0%  │ 96.9%
Semantic       │ 50%   │  25%    │12.5% │ 70%
Structural     │ 62.5% │  37.5%  │  0%  │ 87.5%
Cross-Format   │ 50%   │  50%    │  0%  │ 83.8%
───────────────┼───────┼─────────┼──────┼─────
OVERALL        │ 65%   │  25%    │ 10%  │ 84.5%
```

---

## Critical Weakness

| Issue | MV-05: Transposed Digits |
|-------|--------------------------|
| Original | 72.0 |
| Mutated | 27.0 |
| Detected | ❌ NO |
| Impact | Silent data corruption |

**Root Cause**: No checksum or validation mechanism.
**Recommendation**: Add integrity verification field.

---

## Files

### Experiment
- [experiment.md](./experiment.md) - Full experiment design

### Source Code
- [src/md_lab067_compiler.py](./src/md_lab067_compiler.py) - Compiler implementation

### Runs
- [runs/run-001.md](./runs/run-001.md) - Compiler build
- [runs/run-002.md](./runs/run-002.md) - Syntactic mutations
- [runs/run-003.md](./runs/run-003.md) - Semantic mutations
- [runs/run-004.md](./runs/run-004.md) - Structural mutations

### Analysis
- [analysis/summary.md](./analysis/summary.md) - Complete analysis

---

## Validation Against Hypothesis

| Prediction | Actual | Status |
|------------|--------|--------|
| High fidelity baseline | 100% | ✅ |
| Different failure modes by category | Confirmed | ✅ |
| Semantic hardest | 50% full, 12.5% fail | ✅ |
| Graceful degradation | 25% partial | ✅ |

**Hypothesis**: **CONFIRMED**

---

## Recommendations

1. **Add checksum**: Detect data corruption (MV-05)
2. **Expand aliases**: Improve field rename handling
3. **Document precision**: Warn when decimal precision reduced
4. **Formalize schema**: Reduce ambiguity in md format

---

## Conclusion

The MD-LAB067 bidirectional compiler is functional and robust for most mutations, but lacks validation mechanisms to detect silent data corruption. This is a critical weakness for production use.

---

**Created**: 2026-07-29T22:20:00Z
**Completed**: 2026-07-29T22:45:00Z
**Engine**: KDE-ENGINE-001
**Seed**: SEED-001 (Genesis)
