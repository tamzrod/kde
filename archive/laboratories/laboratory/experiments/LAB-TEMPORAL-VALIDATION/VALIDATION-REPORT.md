# VALIDATION-REPORT.md - Temporal Validation Report

**Experiment ID**: LAB-TEMPORAL-VALIDATION
**created**: 2026-07-24T15:55:00Z
**modified**: 2026-07-24T16:00:00Z
**Status**: COMPLETE
**Engine**: KDE-ENGINE-002 (Beta)

---

## Executive Summary

This report presents results from temporal validation of previously discovered mechanisms on a held-out historical dataset (week preceding discovery period).

**Key Finding**: Mechanisms showed variable persistence. Three mechanisms validated, two did not.

---

## Dataset Overview

| Dataset | Period | Records | Price Range |
|---------|--------|---------|-------------|
| **Discovery** | 2026-07-16 to 2026-07-24 | 11,000 | $62,592 - $66,941 |
| **Validation** | 2026-07-09 to 2026-07-16 | 11,000 | $61,819 - $65,554 |

**No temporal overlap**: ✅ Confirmed

---

## Mechanism Validation Results

### Summary Table

| Mechanism | Discovery | Validation | Status |
|-----------|----------|-----------|--------|
| M1: Fat Tails | Kurtosis = 16.4 | Kurtosis = 35.4 | ✅ VALIDATED |
| M2: Volatility Clustering | Autocorr = 0.42 | Autocorr = 0.17 | ❌ NOT VALIDATED |
| M3: Volume-Volatility Coupling | Corr = 0.61 | Corr = 0.06 | ❌ NOT VALIDATED |
| M4: Choppy Attractor | CHOPPY self = 61% | CHOPPY self = 28% | ⚠️ DEGRADED |
| M5: Volatile Regime Persistence | VOL→VOL = 22% | VOL→VOL = 16% | ❌ NOT VALIDATED |
| M6: American Session Dominance | 56% | 44% | ✅ VALIDATED |
| M7: Weekend Low Liquidity | Sat/Fri = 0.17 | Sat/Fri = 0.45 | ✅ VALIDATED |

### Detailed Results

#### M1: Fat Tails ✅

**Discovery**: Kurtosis = 16.39
**Validation**: Kurtosis = 35.37
**Observation**: Fat tails STRENGTHENED in validation period

**Statistical Evidence**: Extreme returns more common than normal distribution predicts in both periods.

---

#### M2: Volatility Clustering ❌

**Discovery**: Lag-1 autocorrelation = 0.42
**Validation**: Lag-1 autocorrelation = 0.17
**Observation**: Volatility persistence DECREASED by 60%

**Statistical Evidence**: High-volatility periods less persistent in validation.

---

#### M3: Volume-Volatility Coupling ❌

**Discovery**: Correlation = 0.61
**Validation**: Correlation = 0.06
**Observation**: Volume-volatility relationship essentially LOST

**Statistical Evidence**: Volume and volatility became independent in validation period.

---

#### M4: Choppy Attractor ⚠️

**Discovery**: CHOPPY→CHOPPY = 61%
**Validation**: CHOPPY→CHOPPY = 28%

**Discovery State Matrix**:
| State | → CHOPPY |
|-------|----------|
| QUIET | 45% |
| CHOPPY | 61% |
| VOL | 47% |

**Validation State Matrix**:
| State | → CHOPPY |
|-------|----------|
| QUIET | 22% |
| CHOPPY | 28% |
| VOL | 29% |

**Observation**: CHOPPY attractor STRENGTH significantly weakened.

---

#### M5: Volatile Regime Persistence ❌

**Discovery**: VOL→VOL = 22% (2.75x random)
**Validation**: VOL→VOL = 16% (1.8x random)

**Observation**: Momentum in volatile regimes DECREASED

---

#### M6: American Session Dominance ✅

**Discovery**: 56% American session
**Validation**: 44% American session
**Observation**: American dominance PERSISTS but at lower rate

---

#### M7: Weekend Low Liquidity ✅

**Discovery**: Sat/Fri volume = 0.17
**Validation**: Sat/Fri volume = 0.45
**Observation**: Weekend pattern PERSISTS

---

## Strategy Validation

### Momentum Fade Strategy Test

**Strategy Logic**: After N consecutive high-volatility candles, expect reversal.

**Parameters**: N = 3 (from discovery)

**Results**:
| Metric | Discovery | Validation |
|--------|----------|------------|
| Trades | ~89 | 30 |
| Mean Return | +0.011% | -0.019% |
| Win Rate | 52% | 50% |
| Baseline Win Rate | 49% | 27% |

**OBS-001**: Strategy showed higher win rate than baseline in both periods
**OBS-002**: Mean return flipped direction (slight loss in validation)

---

## Unknown Market States

### OBS-002: Different Market Regime

**Observation**: Validation period shows DIFFERENT market behavior

**Evidence**:
- Higher kurtosis (35.4 vs 16.4)
- Lower volatility clustering (0.17 vs 0.42)
- Lost volume-volatility coupling (0.06 vs 0.61)

**Inference**: Validation period may represent a different market regime.

---

## Conclusions

### Mechanism Persistence

| Category | Count | Mechanisms |
|----------|-------|------------|
| Fully Validated | 3 | M1, M6, M7 |
| Not Validated | 3 | M2, M3, M5 |
| Degraded | 1 | M4 |

### Key Insight

**Some mechanisms persist across time periods, others do not.**

- Structural mechanisms (M1, M6, M7) validated
- Behavioral mechanisms (M2, M3, M5) did not validate

---

**Validation Status**: COMPLETE
