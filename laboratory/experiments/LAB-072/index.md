# Experiment Index: LAB-072

**Experiment**: AI Operational Criteria - Token Usage, Mutation, Response Time
**Status**: COMPLETE
**Domain**: AI Operations Performance
**Investigation**: INV-DIMINISHING-RETURNS-001
**Parent**: LAB-069, LAB-070, LAB-071

---

## Quick Summary

Measured AI-specific operational criteria for KDE content formats:
- **Token Usage** - How many tokens consumed
- **Mutation Rate** - How often content changes
- **Response Time** - End-to-end latency

**Result**: FUSED is best for tokens, Pre-digested is best for speed.

---

## Metrics Comparison

| Metric | Raw MD | Pre-digested | FUSED | Winner |
|--------|--------|--------------|-------|--------|
| **Token Usage** | 13,681 | 13,104 | **11,112** | FUSED (-18.8%) |
| **Response Time** | 0.051ms | **0.045ms** | 0.051ms | Pre-digested (-13.3%) |
| **Mutation Rate** | 2.6% | **0.0%** | **0.0%** | Tie |

---

## Run Summary

| Run | Focus | Key Result |
|-----|-------|------------|
| 001 | Token Usage | FUSED wins (-18.8%) |
| 002 | Response Time | Pre-digested wins (-13.3%) |
| 003 | Mutation Rate | Tie (both 0%) |
| 004 | Final Summary | Balanced recommendation |

---

## Key Findings

### Finding 1: Token Efficiency
- **FUSED** uses 18.8% fewer tokens than Raw MD
- Pre-digested uses 4.2% fewer tokens

### Finding 2: Parsing Speed
- **Pre-digested** is 13.3% faster than Raw MD
- FUSED is nearly same as Raw MD

### Finding 3: Stability
- Both Pre-digested and FUSED have **zero mutation**
- Raw MD has 2.6% drift during processing

---

## Recommendations

| Use Case | Recommended Format |
|----------|-------------------|
| Token-critical AI ops | FUSED |
| Speed-critical AI ops | Pre-digested |
| Balanced approach | Pre-digested |
| Stability required | Either |

---

## Files

- [experiment.md](./experiment.md) - Full design
- [src/ai_metrics.py](./src/ai_metrics.py) - Metrics tool
- [runs/run-001.md](./runs/run-001.md) - Token usage
- [runs/run-002.md](./runs/run-002.md) - Response time
- [runs/run-003.md](./runs/run-003.md) - Mutation rate
- [runs/run-004.md](./runs/run-004.md) - Summary
- [evidence/ai_metrics_results.json](./evidence/ai_metrics_results.json) - Raw data

---

**Created**: 2026-07-30T01:15:00Z
**Completed**: 2026-07-30T01:35:00Z
**Runs**: 4
