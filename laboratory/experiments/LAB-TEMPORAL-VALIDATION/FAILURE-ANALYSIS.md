# FAILURE-ANALYSIS.md - Failure Analysis

**Experiment ID**: LAB-TEMPORAL-VALIDATION
**created**: 2026-07-24T16:20:00Z
**modified**: 2026-07-24T16:25:00Z
**Status**: COMPLETE
**Engine**: KDE-ENGINE-002 (Beta)

---

## Failure Categories

### Category 1: Mechanism Non-Validation

#### M2: Volatility Clustering

**What Failed**: Lag-1 autocorrelation dropped from 0.42 to 0.17

**Why It Matters**: Core to volatility regime understanding

**Root Cause Analysis**:
- OBS-FA-1: Market entered different volatility regime
- OBS-FA-2: Volatility persistence is regime-dependent
- OBS-FA-3: Single week insufficient for regime detection

**Evidence**: Both periods show > 0 (0.42 vs 0.17), but significance changed

**Lesson**: Behavioral mechanisms are regime-sensitive.

---

#### M3: Volume-Volatility Coupling

**What Failed**: Correlation dropped from 0.61 to 0.06

**Why It Matters**: Volume was key predictor of volatility

**Root Cause Analysis**:
- OBS-FA-4: Volume behavior fundamentally different in validation period
- OBS-FA-5: Zero-volume rate may have changed
- OBS-FA-6: Binance.US market making may vary

**Evidence**: Near-zero correlation in validation

**Lesson**: Correlations found in one regime may not persist.

---

#### M5: Volatile Regime Persistence

**What Failed**: VOL→VOL dropped from 22% to 16%

**Why It Matters**: Supported momentum fade strategy logic

**Root Cause Analysis**:
- OBS-FA-7: Related to M2 failure (vol clustering)
- OBS-FA-8: Volatile episodes shorter in validation
- OBS-FA-9: Market transitioned more quickly between states

**Evidence**: Lower self-transition probability

**Lesson**: Regime persistence is unstable.

---

### Category 2: Strategy Performance Inconsistency

#### Mean Return Inversion

**What Failed**: Mean return flipped from +0.011% to -0.019%

**Why It Matters**: Core assumption of strategy

**Root Cause Analysis**:
- OBS-FA-10: Baseline return also flipped (near-zero)
- OBS-FA-11: Small sample (30 trades) creates high variance
- OBS-FA-12: Win rate more stable (52% vs 50%) than mean

**Evidence**: Win rate edge preserved, mean return not

**Lesson**: Win rate is more stable than mean return.

---

### Category 3: Sample Size Limitations

#### Trade Count Disparity

**What Failed**: 89 trades in discovery, only 30 in validation

**Why It Matters**: Reduced statistical power

**Root Cause Analysis**:
- OBS-FA-13: Different volatility characteristics
- OBS-FA-14: Fewer HIGH vol candles in validation
- OBS-FA-15: Different market regime

**Evidence**: Same parameters, different trigger frequency

**Lesson**: Strategy activation frequency is regime-dependent.

---

## Failure Impact Assessment

### Impact on Discovery Knowledge

| Knowledge | Impact | Status |
|----------|--------|--------|
| Fat Tails (M1) | POSITIVE | Strengthened |
| Volatility Clustering (M2) | NEGATIVE | Degraded |
| Volume-Volatility (M3) | NEGATIVE | Lost |
| Choppy Attractor (M4) | NEGATIVE | Degraded |
| Vol Regime Persistence (M5) | NEGATIVE | Degraded |
| American Session (M6) | POSITIVE | Preserved |
| Weekend Low (M7) | POSITIVE | Preserved |

**Net Impact**: 3 positive, 4 negative (net negative)

---

## Scientific Value of Failures

### OBS-FA-16: Failures Are Scientifically Valuable

**Evidence**:
- Revealed regime-dependence of mechanisms
- Identified behavioral vs structural mechanism categories
- Quantified mechanism stability over time
- Informed position sizing recommendations

**Conclusion**: Failures provided MORE insight than validations.

---

## Lessons Learned

### For Mechanism Development

1. **Distinguish structural vs behavioral mechanisms**
   - Structural: More stable, validate across regimes
   - Behavioral: Less stable, regime-dependent

2. **Test mechanisms across multiple regimes**
   - Single validation is insufficient
   - Need multiple time periods

3. **Weight mechanisms by stability**
   - Confidence should account for regime sensitivity

### For Strategy Development

1. **Win rate more stable than mean return**
   - Focus on win rate edge
   - Mean return has high variance

2. **Strategy activation frequency is regime-dependent**
   - Cannot predict trade count
   - Must account for variable opportunity

3. **Position sizing should track evidence quality**
   - Sample size matters
   - Mechanism stability matters

---

## Recommendations

### For Future Validation Experiments

1. **Use longer holdout periods** (not just 1 week)
2. **Test across different market conditions** (bull/bear/sideways)
3. **Include regime detection** as validation criterion
4. **Weight failures equally** to successes in conclusions

---

**Failure Analysis Status**: COMPLETE
