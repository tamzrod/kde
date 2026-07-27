# MECHANISMS.md - Surviving Mechanisms

**Program ID**: PROG-ZK-TRADING
**created**: 2026-07-24T16:00:00Z
**modified**: 2026-07-24T16:05:00Z
**Status**: COMPLETE
**Engine**: KDE-ENGINE-002 (Beta)

---

## Surviving Mechanisms

The following mechanisms survived multiple investigation runs and falsification attempts:

---

## M1: Fat Tails Mechanism

### Description

Return distribution has "fat tails" - extreme values occur more frequently than a normal distribution would predict.

### Evidence

- Excess kurtosis = 18.3 (normal = 3)
- Min return = -0.608% vs expected -0.13% (3σ)
- Max return = +0.416% vs expected +0.13% (3σ)

### Validation

1. ✅ RUN-002: Kurtosis measured = 18.3
2. ✅ RUN-002: Extreme returns quantified
3. ✅ RUN-007: Extreme returns still present in subset analysis

### Confidence: **HIGH**

---

## M2: Volatility Clustering Mechanism

### Description

High-volatility periods cluster together. When volatility is high, it tends to remain high in subsequent periods.

### Evidence

- Lag-1 volatility autocorrelation = 0.42
- VOL_STATE → VOL_STATE: 22-25% (vs 17% random)
- Consecutive volatile candles: 3x → 52% continuation

### Validation

1. ✅ RUN-002: Autocorrelation measured
2. ✅ RUN-004: State transition matrix confirmed
3. ✅ RUN-006: Regime-like behavior observed
4. ✅ RUN-007: Momentum strengthens with consecutive candles
5. ✅ FH-001 rejected: Random walk rejected

### Confidence: **HIGH**

---

## M3: Volume-Volatility Coupling Mechanism

### Description

Volume and volatility are strongly positively correlated. High volume candles also have high absolute returns.

### Evidence

- Volume-absolute return correlation = 0.61
- HIGH volume → HIGH volatility: 30% (vs 17% baseline)
- Breakouts associated with 3x higher volume

### Validation

1. ✅ RUN-002: Correlation measured
2. ✅ RUN-005: Volume states mapped to volatility
3. ✅ RUN-007: Consecutive patterns confirmed

### Confidence: **HIGH**

---

## M4: Choppy Attractor Mechanism

### Description

All market states tend toward CHOPPY (medium volatility, low volume). CHOPPY is the "ground state" of the market.

### Evidence

- CHOPPY → CHOPPY: 61% self-transition
- All other states most likely next → CHOPPY
- Mean CHOPPY duration: 8.4 minutes (longest)

### Validation

1. ✅ RUN-004: Medium state most common
2. ✅ RUN-006: Transition matrix shows CHOPPY attractor
3. ✅ RUN-007: Consolidation precedes volatility

### Confidence: **HIGH**

---

## M5: Volatile Regime Persistence Mechanism

### Description

When the market enters a high-volatility regime, it exhibits brief directional momentum before reverting to CHOPPY.

### Evidence

- VOL_UP self-transition: 22% (2.75x random)
- VOL_DN self-transition: 25% (3.13x random)
- Mean volatile duration: < 2.5 minutes
- p-value for VOL_DN continuation: 0.002

### Validation

1. ✅ RUN-004: Persistence measured
2. ✅ RUN-006: Regime-like behavior confirmed
3. ✅ RUN-007: Statistical significance tested

### Confidence: **MEDIUM** (statistically significant but sample limited)

---

## M6: American Session Dominance Mechanism

### Description

Trading volume is concentrated in American market hours (15:00-23:59 UTC). US trading hours dominate BTCUSDT trading.

### Evidence

- American session: 56% of total volume
- Asian session: 25% of total volume
- European session: 19% of total volume

### Validation

1. ✅ RUN-001: Volume by hour documented
2. ✅ RUN-003: Session analysis completed
3. ✅ RUN-003: Clear hierarchy established

### Confidence: **HIGH**

---

## M7: Weekend Low Liquidity Mechanism

### Description

Weekend trading has significantly lower volume than weekday trading. Saturday has the lowest trading activity.

### Evidence

- Friday volume: 80.4 BTC (highest)
- Saturday volume: 13.7 BTC (lowest)
- Saturday has 5x less volume than Friday
- Saturday has 10x less volume than weekday average

### Validation

1. ✅ RUN-001: Weekend pattern observed
2. ✅ RUN-003: Day-of-week analysis completed
3. ✅ Consistent across all runs

### Confidence: **HIGH**

---

## Mechanisms Summary Table

| ID | Mechanism | Confidence | Evidence Count |
|----|-----------|------------|----------------|
| M1 | Fat Tails | HIGH | 3 runs |
| M2 | Volatility Clustering | HIGH | 5 runs |
| M3 | Volume-Volatility Coupling | HIGH | 3 runs |
| M4 | Choppy Attractor | HIGH | 3 runs |
| M5 | Volatile Regime Persistence | MEDIUM | 3 runs |
| M6 | American Session Dominance | HIGH | 2 runs |
| M7 | Weekend Low Liquidity | HIGH | 2 runs |

---

## Non-Surviving Mechanisms

The following proposed mechanisms did NOT survive investigation:

### NM1: Intraday Directional Bias

**Proposed**: Certain hours predict direction
**Result**: REJECTED - No significant directional bias by hour

### NM2: Long Consolidation → Direction

**Proposed**: Extended consolidation predicts next direction
**Result**: REJECTED - Consolidation predicts volatility, not direction

### NM3: Volume Breakout → Move

**Proposed**: High volume precedes directional moves
**Result**: REJECTED - Volume predicts magnitude, not direction

---

## Conclusion

Seven mechanisms survived repeated investigation and falsification attempts. The most robust mechanisms are:

1. **M2: Volatility Clustering** - Most evidence, highest confidence
2. **M4: Choppy Attractor** - Universal market behavior
3. **M3: Volume-Volatility Coupling** - Strong correlation

The **Volatile Regime Persistence** (M5) mechanism is most relevant for potential strategy development.

---

**Mechanisms Status**: COMPLETE
**Surviving Mechanisms**: 7
**Rejected Mechanisms**: 3
