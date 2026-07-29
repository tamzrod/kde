# Experiment Index: LAB-072

**Experiment**: AI Operational Criteria - Complete Format Comparison
**Status**: COMPLETE
**Domain**: AI Operations Performance
**Investigation**: INV-DIMINISHING-RETURNS-001
**Parent**: LAB-069, LAB-070, LAB-071

---

## Quick Summary

Measured AI-specific operational criteria across **8 text formats**:
- **Token Usage** - How many tokens consumed
- **Mutation Rate** - Content stability during processing
- **Response Time** - End-to-end latency

**Result**: FUSED wins overall. Pre-digested wins for speed.

---

## Complete Format Tally (8 Formats)

| Rank | Format | Tokens | Parse (ms) | Drift % | vs Raw MD | Score |
|------|--------|--------|------------|---------|-----------|-------|
| 🥇 | **FUSED** | 9,029 | 0.0485 | 0.0 | **-34.0%** | 28.9 |
| 🥈 | INI | 10,274 | 0.0459 | 0.0 | -24.9% | 30.9 |
| 🥉 | TOML | 11,252 | 0.0449 | 0.0 | -17.8% | 32.8 |
| 4 | YAML | 11,990 | 0.0512 | 0.1 | -12.4% | 35.6 |
| 5 | Pre-digested | 13,104 | **0.0433** | 0.0 | -4.2% | 36.3 |
| 6 | Raw MD | 13,681 | 0.0515 | 2.5 | baseline | 39.9 |
| 7 | CSV | 13,755 | 0.1435 | 0.5 | +0.5% | 58.7 |
| 8 | XML | 19,262 | 0.0547 | 0.3 | +40.8% | 51.5 |

---

## Winners by Category

| Category | Winner | Value |
|----------|--------|-------|
| **Best Tokens** | FUSED | 9,029 (-34.0%) |
| **Best Parse** | Pre-digested | 0.0433ms (-16.1%) |
| **Best Stability** | 5-way tie | 0.0% drift |
| **Best Overall** | FUSED | Score: 28.9 |

---

## Run Summary

| Run | Focus | Key Result |
|-----|-------|------------|
| 001 | Token Usage | FUSED wins (-34.0%) |
| 002 | Response Time | Pre-digested wins (-16.1%) |
| 003 | Mutation Rate | 5 formats at 0% drift |
| 004 | Final Summary | Combined ranking |

---

## Key Findings

### Finding 1: Token Efficiency
- **FUSED** uses 34% fewer tokens than Raw MD
- INI uses 25% fewer tokens
- TOML uses 18% fewer tokens

### Finding 2: Parsing Speed
- **Pre-digested** is 16.1% faster than Raw MD
- TOML is 12.8% faster
- INI is 10.9% faster

### Finding 3: Stability
- 5 formats have **zero mutation**: FUSED, Pre-digested, TOML, INI
- Raw MD has worst stability at 2.5% drift

### Finding 4: Avoid
- **XML**: Most tokens (+40.8%), slowest parse for structured formats
- **CSV**: Slowest parse overall (2.8x slower than Pre-digested)

---

## Recommendations

| Use Case | Recommended Format | Reason |
|----------|-------------------|--------|
| Token-critical AI | **FUSED** | -34% tokens |
| Speed-critical AI | **Pre-digested** | -16% parse time |
| Balanced approach | **Pre-digested** | Best speed + good tokens |
| Production systems | **Pre-digested** | Tooling support |
| Stability required | Any structured | 0% drift |

---

## Complete Rankings

### Token Usage (Lowest = Best)
1. FUSED: 9,029 (-34.0%) 🏆
2. INI: 10,274 (-24.9%)
3. TOML: 11,252 (-17.8%)
4. YAML: 11,990 (-12.4%)
5. Pre-digested: 13,104 (-4.2%)
6. Raw MD: 13,681 baseline
7. CSV: 13,755 (+0.5%)
8. XML: 19,262 (+40.8%) ❌

### Parse Speed (Lowest = Best)
1. Pre-digested: 0.0433ms (-16.1%) 🏆
2. TOML: 0.0449ms (-12.8%)
3. INI: 0.0459ms (-10.9%)
4. FUSED: 0.0485ms (-5.9%)
5. YAML: 0.0512ms (-0.7%)
6. Raw MD: 0.0515ms baseline
7. XML: 0.0547ms (+6.1%)
8. CSV: 0.1435ms (+178.5%) ❌

---

## Files

- [experiment.md](./experiment.md) - Full design
- [src/ai_metrics.py](./src/ai_metrics.py) - Metrics tool
- [runs/run-001.md](./runs/run-001.md) - Token usage
- [runs/run-002.md](./runs/run-002.md) - Response time
- [runs/run-003.md](./runs/run-003.md) - Mutation rate
- [runs/run-004.md](./runs/run-004.md) - Summary
- [evidence/complete_format_comparison.json](./evidence/complete_format_comparison.json) - Full data

---

**Created**: 2026-07-30T01:15:00Z
**Completed**: 2026-07-30T01:35:00Z
**Updated**: 2026-07-30T02:00:00Z
**Runs**: 4
**Formats Tested**: 8
