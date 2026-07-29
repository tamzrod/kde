# Experiment Index: LAB-070

**Experiment**: MD→AI vs Pre-digested→AI Performance Comparison
**Status**: COMPLETE
**Domain**: AI Interaction Performance
**Investigation**: INV-DIMINISHING-RETURNS-001
**Parent**: LAB-069 (KDE Compilation)

---

## Quick Summary

Compared two AI interaction approaches:
1. **Raw Path (MD→AI)**: Direct markdown processing
2. **Pre-digested Path**: Pre-compiled JSON (named "Pre-digested")

**Result**: Pre-digested is 42% smaller and 5.3x faster with 100% equivalent results.

---

## Run Summary

| Run | Focus | Status | Key Result |
|-----|-------|--------|------------|
| 001 | File size | COMPLETE | -42% smaller |
| 002 | Speed | COMPLETE | 5.3x faster |
| 003 | Quality | COMPLETE | 100% match |
| 004 | Naming | COMPLETE | "Pre-digested" |

---

## Comparison Results

| Metric | Raw (MD) | Pre-digested (JSON) | Advantage |
|--------|----------|---------------------|-----------|
| File Size | 87.1 KB | 50.9 KB | -42% |
| Processing Speed | 42ms | 8ms | 5.3x faster |
| Output Match | 100% | 100% | Equal |
| Semantic Equivalence | 100% | 100% | Equal |

---

## The Method Name

After evaluating 10 candidates, **"Pre-digested"** was selected.

### Definition

> **Pre-digested**: A transformation of raw markdown content into structured JSON format, optimized for AI consumption.

### Why "Pre-digested"?

| Characteristic | Pre-digested Fits |
|----------------|-------------------|
| Speed (5.3x faster) | ✅ Ready-to-use, no parsing |
| Size (42% smaller) | ✅ Compact, optimized |
| Structure (100%) | ✅ Structured, normalized |
| AI consumption | ✅ Explicitly designed for AI |

---

## Files

### Experiment
- [experiment.md](./experiment.md) - Full experiment design

### Source Code
- [src/perf_comparison.py](./src/perf_comparison.py) - Performance comparison tool

### Runs
- [runs/run-001.md](./runs/run-001.md) - File size analysis
- [runs/run-002.md](./runs/run-002.md) - Speed benchmark
- [runs/run-003.md](./runs/run-003.md) - Result quality
- [runs/run-004.md](./runs/run-004.md) - Name evaluation

### Analysis
- [analysis/summary.md](./analysis/summary.md) - Complete analysis

---

## Validation Summary

| Hypothesis | Result |
|------------|--------|
| Pre-digested smaller | ✅ -42% |
| Pre-digested faster | ✅ 5.3x |
| Equivalent results | ✅ 100% |
| Clear name found | ✅ Pre-digested |

**Hypothesis**: **CONFIRMED**

---

## Conclusion

The Pre-digested method (synthesized path) is clearly superior:
- 42% smaller files
- 5.3x faster processing
- 100% result equivalence

**Recommended for**: AI interaction workflows where speed and efficiency matter.

---

**Created**: 2026-07-29T23:20:00Z
**Completed**: 2026-07-29T23:40:00Z
**Engine**: KDE-ENGINE-001
**Seed**: SEED-001 (Genesis)
**Parent**: LAB-069
