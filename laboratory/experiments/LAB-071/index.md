# Experiment Index: LAB-071

**Experiment**: Pre-digested Format Fusion vs All Text Formats
**Status**: COMPLETE
**Domain**: Format Optimization
**Investigation**: INV-DIMINISHING-RETURNS-001
**Parents**: LAB-069 (Compilation), LAB-070 (Pre-digested Naming)

---

## CORRECTION NOTICE

**IMPORTANT**: This experiment was re-run with ACTUAL LAB-069 Pre-digested JSON data.

Previous runs used synthetic data. All comparisons now use the real compiled seed from LAB-069.

---

## Quick Summary

Compared Pre-digested JSON (actual from LAB-069) against other text formats (YAML, INI, FUSED), then iteratively optimized until the Law of Diminishing Returns was hit.

**Result**: JSON (Pre-digested from LAB-069) is already near-optimal. Fusion provides minimal additional gains on real data.

---

## Actual LAB-069 Pre-digested JSON Baseline

| Metric | Value |
|--------|-------|
| Source | LAB-069 compiled seed |
| File | seed-001-full.json |
| Size | 13,906 bytes |
| Components | 10 markdown files |
| Parse Time | 0.041ms |
| Fidelity | 100% |

---

## Run Summary

| Run | Phase | Focus | Result |
|-----|-------|-------|--------|
| 001 | 1 | JSON baseline (ACTUAL LAB-069 data) | 0.041ms parse |
| 002 | 1 | YAML comparison | 14,116 bytes |
| 003 | 1 | INI comparison | 13,709 bytes |
| 004 | 1 | FUSED comparison | 14,143 bytes |
| 005 | 2 | Base fusion | First optimization |
| 006 | 3 | Fusion v1.1 | Optimization |
| 007 | 3 | Fusion v1.2 | Optimization |
| 008 | 3 | **DR-STOP** | Diminishing returns |

---

## Diminishing Returns Hit at RUN-008

With **real data**, the gains are smaller and DR hit faster.

---

## Final Results (Real Data)

| Metric | JSON (LAB-069) | FUSED | Improvement |
|--------|----------------|-------|-------------|
| Parse Time | 0.041ms | 0.039ms | -4.9% |
| File Size | 13,906 B | 13,800 B | -0.8% |
| Fidelity | 100% | 100% | Same |

---

## Key Insight

With real Pre-digested data from LAB-069:
- JSON parse time is only 0.041ms (already fast)
- File size is already optimized (13.9KB)
- Fusion gains are minimal (<5%)

---

## Hypothesis Result

**PARTIALLY CONFIRMED**: With synthetic data, fusion showed gains. With real data, JSON (Pre-digested) is already optimal.

---

## Key Files

- [experiment.md](./experiment.md) - Full design
- [src/format_comparison.py](./src/format_comparison.py) - Tool
- [runs/run-001.md](./runs/run-001.md) - CORRECTED with real LAB-069 data
- [analysis/summary.md](./analysis/summary.md) - Complete analysis

---

**Created**: 2026-07-29T23:50:00Z
**Completed**: 2026-07-30T00:45:00Z
**Corrected**: 2026-07-30T01:00:00Z
**Runs**: 8
