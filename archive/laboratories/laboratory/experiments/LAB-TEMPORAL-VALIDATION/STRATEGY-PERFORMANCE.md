# STRATEGY-PERFORMANCE.md - Strategy Performance Report

**Experiment ID**: LAB-TEMPORAL-VALIDATION
**created**: 2026-07-24T16:00:00Z
**modified**: 2026-07-24T16:05:00Z
**Status**: COMPLETE
**Engine**: KDE-ENGINE-002 (Beta)

---

## Strategy Overview

### Proposed Strategy: Momentum Fade

**Logic**: After N consecutive high-volatility candles, expect volatility to decrease and mean-reversion to occur.

**Discovery Parameters**:
- N = 3 consecutive HIGH vol candles
- Entry: After Nth candle close
- Exit: Next candle close
- Direction: Opposite to momentum

---

## Performance Metrics

### Discovery Period (2026-07-16 to 2026-07-24)

| Metric | Value |
|--------|-------|
| Trades | 89 |
| Mean Return | +0.011% |
| Win Rate | 52% |
| Baseline Win Rate | 49% |
| Edge | +3% |

### Validation Period (2026-07-09 to 2026-07-16)

| Metric | Value |
|--------|-------|
| Trades | 30 |
| Mean Return | -0.019% |
| Win Rate | 50% |
| Baseline Win Rate | 27% |
| Edge | +23% |

---

## Comparative Analysis

### OBS-001: Win Rate Edge Persists

**Evidence**:
- Discovery: +3% edge over baseline
- Validation: +23% edge over baseline

**Inference**: Win rate advantage INCREASED in validation period.

### OBS-002: Mean Return Inverted

**Evidence**:
- Discovery: +0.011% mean return
- Validation: -0.019% mean return

**Observation**: Mean return flipped direction, but baseline also flipped.

### OBS-003: Fewer Trading Opportunities

**Evidence**:
- Discovery: 89 trades
- Validation: 30 trades

**Observation**: Strategy fires less often in different market conditions.

---

## Strategy Lifecycle Assessment

### Phase 1: Activation ✅

**Status**: Strategy activated on validation data
**Triggers**: 30 occurrences of N=3 consecutive HIGH vol

### Phase 2: Execution ✅

**Status**: All 30 trades executed
**Distribution**: Spread across validation period

### Phase 3: Performance

| Period | Mean Return | Win Rate | Verdict |
|--------|------------|----------|---------|
| Discovery | +0.011% | 52% | POSITIVE |
| Validation | -0.019% | 50% | MIXED |

### Phase 4: Confidence Evolution

**Confidence at Discovery**: MEDIUM (insufficient sample)
**Confidence after Validation**: LOW (contradictory results)

---

## Strategy Health

### Indicators

| Indicator | Discovery | Validation | Assessment |
|-----------|----------|------------|------------|
| Sample Size | 89 | 30 | SMALL |
| Edge Consistency | +3% | +23% | POSITIVE |
| Mean Return | +0.011% | -0.019% | MIXED |
| Win Rate | 52% | 50% | STABLE |

### Health Score

| Component | Score | Weight |
|-----------|-------|--------|
| Edge Persistence | 8/10 | 30% |
| Win Rate Stability | 9/10 | 30% |
| Sample Adequacy | 3/10 | 20% |
| Mean Return | 5/10 | 20% |
| **Overall** | **6.4/10** | 100% |

---

## Strategy Retirement Consideration

### Arguments for Retirement

1. Mean return inverted between periods
2. Sample size still inadequate
3. Transaction costs not tested
4. Mechanism M5 (vol regime persistence) did not validate

### Arguments for Continuation

1. Win rate edge persists (50% vs 27% baseline)
2. Mechanism M1 (fat tails) validated strongly
3. Strategy logic remains mechanistically sound

### Recommendation: HOLD

**Decision**: Maintain strategy in observation mode without deployment.

---

## Conclusions

### Performance Summary

The Momentum Fade strategy showed:
- ✅ Win rate edge persisted across periods
- ⚠️ Mean return inverted
- ⚠️ Sample size remains inadequate
- ❌ One supporting mechanism (M5) did not validate

### Scientific Assessment

**The strategy demonstrates potential but lacks sufficient evidence for deployment.**

---

**Strategy Status**: OBSERVATION MODE
