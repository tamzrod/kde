# MECHANISM-VALIDATION.md - Mechanism Validation Report

**Experiment ID**: LAB-TEMPORAL-VALIDATION
**created**: 2026-07-24T16:05:00Z
**modified**: 2026-07-24T16:10:00Z
**Status**: COMPLETE
**Engine**: KDE-ENGINE-002 (Beta)

---

## Mechanism Validation Matrix

| ID | Mechanism | Discovery | Validation | Status | Confidence Change |
|----|-----------|-----------|------------|--------|------------------|
| M1 | Fat Tails | 16.4 | 35.4 | ✅ STRONGER | + |
| M2 | Volatility Clustering | 0.42 | 0.17 | ❌ WEAKER | - |
| M3 | Volume-Volatility Coupling | 0.61 | 0.06 | ❌ LOST | - |
| M4 | Choppy Attractor | 61% | 28% | ⚠️ DEGRADED | - |
| M5 | Volatile Regime Persistence | 22% | 16% | ❌ WEAKER | - |
| M6 | American Session Dominance | 56% | 44% | ✅ PERSISTS | ~ |
| M7 | Weekend Low Liquidity | 0.17 | 0.45 | ✅ PERSISTS | + |

---

## Detailed Mechanism Analysis

### M1: Fat Tails

**Classification**: Statistical Evidence

**Discovery**: Kurtosis = 16.39
**Validation**: Kurtosis = 35.37

**OBS-M1-1**: Validation shows STRONGER fat tails than discovery

**Evidence**: Kurtosis increased by 116% (16.4 → 35.4)

**Conclusion**: Extreme returns MORE common in validation period.

**Confidence Change**: INCREASED

---

### M2: Volatility Clustering

**Classification**: Behavioral Mechanism

**Discovery**: Lag-1 autocorrelation = 0.42
**Validation**: Lag-1 autocorrelation = 0.17

**OBS-M2-1**: Volatility clustering DECREASED by 60%

**Evidence**: Autocorrelation dropped from 0.42 to 0.17

**Conclusion**: Volatility persistence is REGIME-DEPENDENT.

**Confidence Change**: DECREASED

---

### M3: Volume-Volatility Coupling

**Classification**: Behavioral Mechanism

**Discovery**: Correlation = 0.61
**Validation**: Correlation = 0.06

**OBS-M3-1**: Volume-volatility relationship essentially LOST

**Evidence**: Correlation dropped from 0.61 to 0.06 (near zero)

**Conclusion**: Volume does not predict volatility in this market regime.

**Confidence Change**: DECREASED SIGNIFICANTLY

---

### M4: Choppy Attractor

**Classification**: State Transition Mechanism

**Discovery**: CHOPPY→CHOPPY = 61%
**Validation**: CHOPPY→CHOPPY = 28%

**OBS-M4-1**: Choppy self-transition DECREASED by 54%

**Discovery Matrix**:
```
QUIET → CHOPPY: 45%
CHOPPY → CHOPPY: 61%
VOL → CHOPPY: 47%
```

**Validation Matrix**:
```
QUIET → CHOPPY: 22%
CHOPPY → CHOPPY: 28%
VOL → CHOPPY: 29%
```

**Conclusion**: Market spends less time in stable choppy state.

**Confidence Change**: DECREASED

---

### M5: Volatile Regime Persistence

**Classification**: Behavioral Mechanism

**Discovery**: VOL→VOL = 22% (2.75x random)
**Validation**: VOL→VOL = 16% (1.8x random)

**OBS-M5-1**: Momentum in volatile regimes DECREASED

**Evidence**: Self-transition probability dropped from 22% to 16%

**Conclusion**: Volatile regimes are LESS STICKY in validation period.

**Confidence Change**: DECREASED

---

### M6: American Session Dominance

**Classification**: Structural Mechanism

**Discovery**: 56% American session volume
**Validation**: 44% American session volume

**OBS-M6-1**: American dominance PERSISTS at lower rate

**Evidence**: Still the largest session, just less dominant

**Conclusion**: Session structure is ROBUST but varies by regime.

**Confidence Change**: STABLE

---

### M7: Weekend Low Liquidity

**Classification**: Structural Mechanism

**Discovery**: Saturday/Friday volume = 0.17
**Validation**: Saturday/Friday volume = 0.45

**OBS-M7-1**: Weekend pattern PERSISTS

**Evidence**: Saturday still has lower volume than Friday

**Note**: Ratio INCREASED (less extreme) but pattern preserved

**Conclusion**: Weekend structure is ROBUST.

**Confidence Change**: STABLE

---

## Mechanism Degradation Analysis

### OBS-D1: Structural Mechanisms More Stable

**Evidence**: M1, M6, M7 (structural) all validated
**Evidence**: M2, M3, M5 (behavioral) did not validate

**Inference**: Market STRUCTURE is more stable than market BEHAVIOR.

---

### OBS-D2: Volatility Mechanisms Degraded

**Evidence**: M2, M3, M4, M5 all involve volatility dynamics

**Inference**: Volatility behavior is REGIME-SENSITIVE.

---

### OBS-D3: Distribution Properties More Stable

**Evidence**: Fat tails (M1) strengthened in validation

**Inference**: Return distribution properties are MORE FUNDAMENTAL.

---

## Mechanism Summary

### Validated Mechanisms (Confidence Maintained or Increased)

| ID | Mechanism | Status | Notes |
|----|-----------|--------|-------|
| M1 | Fat Tails | ✅ STRONGER | 116% increase |
| M6 | American Session | ✅ PERSISTS | 44% vs 56% |
| M7 | Weekend Low | ✅ PERSISTS | Ratio changed but pattern |

### Non-Validated Mechanisms (Confidence Decreased)

| ID | Mechanism | Status | Notes |
|----|-----------|--------|-------|
| M2 | Vol Clustering | ❌ WEAKER | -60% |
| M3 | Vol-Vol Coupling | ❌ LOST | Near zero |
| M4 | Choppy Attractor | ⚠️ DEGRADED | -54% |
| M5 | Vol Regime Persistence | ❌ WEAKER | -27% |

---

## Conclusions

### Key Finding

**Market mechanisms are regime-dependent. Structural properties persist; behavioral properties degrade.**

### Implications for Strategy

1. Strategies based on M2, M3, M4, M5 are RISKY
2. Strategies based on M1, M6, M7 are MORE ROBUST
3. Regime detection is critical for strategy selection

---

**Validation Status**: COMPLETE
