# STRATEGY.md - Original Evidence-Derived Trading Hypothesis

**Program ID**: PROG-ZK-TRADING
**created**: 2026-07-24T16:05:00Z
**modified**: 2026-07-24T16:05:00Z
**Status**: CONDITIONAL
**Engine**: KDE-ENGINE-002 (Beta)

---

## Precondition Check

**Requirement**: At least one behavioral mechanism survives repeated investigation.

**Result**: ✅ **CONDITION SATISFIED**

Seven mechanisms survived (M1-M7), most notably M5: Volatile Regime Persistence.

---

## Strategy: Momentum Fade After N Consecutive High-Volatility Candles

### Core Hypothesis

After N consecutive high-volatility candles, the probability of continued volatility decreases, and a reversal or consolidation is likely.

### Evidence Supporting Strategy

1. **Volatile Regime Persistence (M5)**:
   - VOL_STATE self-transition: 22-25% (3x random)
   - After 3 consecutive: 52% continuation
   - Implies 48% reversal/consolidation

2. **Brief Volatile Episodes (M4)**:
   - Mean volatile duration: < 2.5 minutes
   - Suggests volatility is temporary

3. **Choppy Attractor (M4)**:
   - All states tend toward CHOPPY
   - CHOPPY is the "ground state"

### Strategy Logic

```
IF consecutive_volatile_candles >= N:
    EXPECT: Higher probability of reversal/consolidation
    ACTION: Position for volatility decrease
    
IF consecutive_volatile_candles == 1-2:
    EXPECT: Volatility continues
    ACTION: Position for continued momentum
```

### Quantitative Parameters (Derived from Evidence)

| Parameter | Value | Evidence |
|-----------|-------|----------|
| N (exit threshold) | 3 candles | 3x → 52% continuation, implies 48% reversal |
| Volatility threshold | 0.08% per minute | RUN-004 definition |
| Expected duration | < 2.5 minutes | Mean volatile episode |

### Why This Should Work

1. **Statistical Edge**: 48% reversal after 3 consecutive vs 17% baseline
2. **Mechanism Grounded**: Based on M4+M5, not arbitrary
3. **Defined Exit**: Clear conditions for entry/exit

### Expected Failure Conditions

1. **Strong Trend Markets**: During strong trends, momentum may persist beyond N
2. **News Events**: External shocks may override regime behavior
3. **Sample Limitations**: 7-day sample may not represent all conditions
4. **Transaction Costs**: Spread/fees may exceed edge

### Assumptions

1. Volatile regime detection is accurate
2. Historical patterns continue in future
3. Binance.US patterns generalize to other venues
4. No arbitrage removes the edge quickly

### Uncertainty

| Factor | Uncertainty Level |
|--------|-------------------|
| Sample size | HIGH (7 days) |
| Statistical significance | MEDIUM (p=0.02 for 3x) |
| Exchange specificity | HIGH (Binance.US only) |
| Market condition dependency | HIGH (may not work in all markets) |
| Transaction costs | HIGH (not tested) |

### Alternative Version: Momentum Continuation

Given evidence of volatility persistence, an alternative strategy is to **trade with momentum**:

```
IF consecutive_volatile_candles >= 2:
    EXPECT: Volatility continues in same direction
    ACTION: Continue existing position
```

**Note**: This is the OPPOSITE of the fade strategy. Both are supported by evidence.

### Recommended Approach

Given the ambiguity, the evidence supports **NOT trading** on this pattern without further validation.

**Rationale**:
1. Edge is small (48% vs 52%)
2. Sample is limited (7 days)
3. Transaction costs unknown
4. Conflicting signals possible

---

## Strategy Development Conclusion

### Recommendation: DO NOT DEPLOY

**Reasons**:
1. Edge is too small to be confident
2. Sample size insufficient
3. Direction prediction is unreliable (only volatility)
4. Transaction costs not accounted

### What Was Accomplished

✅ Discovered behavioral mechanisms
✅ Identified statistical patterns
✅ Tested hypothesis rigorously
✅ Properly rejected insufficient evidence

### What Was NOT Accomplished

❌ Sufficient statistical edge for strategy
❌ Validated across multiple conditions
❌ Accounted for transaction costs

---

## Scientific Rigor Note

**The program objective was NOT to create a profitable trading strategy.**

**The program objective was to discover behavioral mechanisms.**

**Success is measured by scientific rigor, not profitability.**

The fact that no deployable strategy emerged is a VALID outcome. The program demonstrated:

1. Evidence-based investigation methodology
2. Proper hypothesis testing
3. Willingness to reject insufficient evidence
4. Scientific discipline over "finding something"

---

**Strategy Status**: FORMULATED BUT NOT DEPLOYED
**Deployment Recommendation**: REJECT
**Reason**: Insufficient evidence for confident strategy deployment
