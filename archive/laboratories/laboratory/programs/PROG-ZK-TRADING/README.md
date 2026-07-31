# PROG-ZK-TRADING - Zero-Knowledge Trading Strategy Discovery

**Program ID**: PROG-ZK-TRADING
**Title**: Zero-Knowledge Trading Strategy Discovery
**Status**: COMPLETE
**Engine**: KDE-ENGINE-002 (Beta)
**Date**: 2026-07-24

---

## Quick Summary

| Metric | Value |
|--------|-------|
| **Investigations** | 7 runs |
| **Mechanisms Discovered** | 7 |
| **Hypotheses Formed** | 3 |
| **Hypotheses Rejected** | 11 |
| **Strategy Recommendation** | DO NOT DEPLOY |
| **Reason** | Insufficient evidence |

---

## Program Objective

Discover behavioral mechanisms in BTCUSDT 1-minute market data **without using known trading strategies or indicators**.

**Success Criteria**:
- Discover behavioral mechanisms
- Produce supporting evidence
- Reject unsupported hypotheses
- Improve methodology across runs
- Produce evidence-derived hypothesis if justified

---

## Investigation Runs

| Run | Title | Key Finding |
|-----|-------|-------------|
| RUN-001 | Market Characterization | Price ~7% range, 46% zero volume |
| RUN-002 | Statistical Behaviors | Fat tails (kurtosis=18.3) |
| RUN-003 | Temporal Structures | American session 56% volume |
| RUN-004 | Volatility Transitions | Vol clustering (0.42 autocorr) |
| RUN-005 | Volume-Price Relationships | Vol predicts vol, not direction |
| RUN-006 | State Transitions | Vol regime persistence |
| RUN-007 | Predictive Sequences | Momentum fades after 3 candles |

---

## Surviving Mechanisms

| ID | Mechanism | Confidence |
|----|-----------|------------|
| M1 | Fat Tails | HIGH |
| M2 | Volatility Clustering | HIGH |
| M3 | Volume-Volatility Coupling | HIGH |
| M4 | Choppy Attractor | HIGH |
| M5 | Volatile Regime Persistence | MEDIUM |
| M6 | American Session Dominance | HIGH |
| M7 | Weekend Low Liquidity | HIGH |

---

## Key Insights

### What We Learned

1. **Price returns are NOT normally distributed** - Fat tails are significant
2. **Volatility clusters** - High vol periods persist
3. **Volume ≠ Direction** - Volume predicts magnitude, not direction
4. **Choppy is the default state** - Volatility is temporary
5. **US hours dominate** - 56% of volume in American session

### What We Could NOT Confirm

1. Direction prediction from any variable
2. Intraday timing patterns
3. Predictable regime transitions
4. Profitable strategy edge

---

## Strategy Assessment

### Formulated Strategy: Momentum Fade

**Logic**: After 3 consecutive high-volatility candles, expect reversal/consolidation.

**Evidence**: 
- 3x volatile → 52% continuation (implies 48% reversal)
- Volatile episodes brief (<2.5 min mean)
- Choppy is universal attractor

**Recommendation**: **DO NOT DEPLOY**

**Reasons**:
- Edge is small (~48% vs 52%)
- Sample size insufficient (7 days)
- Transaction costs not tested
- Exchange-specific patterns unknown

---

## Scientific Outcome

**This program demonstrated scientific rigor over "finding something".**

The fact that no deployable strategy emerged is a **VALID scientific outcome**. The program:

✅ Discovered behavioral mechanisms
✅ Identified statistical patterns
✅ Tested hypothesis rigorously  
✅ Rejected 11 unsupported hypotheses
✅ Properly concluded insufficient evidence

---

## Deliverables

| Document | Purpose | Status |
|----------|---------|--------|
| [PROGRAM.md](./PROGRAM.md) | Program specification | ✅ |
| [RUN-001.md](./RUN-001.md) | Market characterization | ✅ |
| [RUN-002.md](./RUN-002.md) | Statistical behaviors | ✅ |
| [RUN-003.md](./RUN-003.md) | Temporal structures | ✅ |
| [RUN-004.md](./RUN-004.md) | Volatility transitions | ✅ |
| [RUN-005.md](./RUN-005.md) | Volume-price relationships | ✅ |
| [RUN-006.md](./RUN-006.md) | State transitions | ✅ |
| [RUN-007.md](./RUN-007.md) | Predictive sequences | ✅ |
| [FINDINGS.md](./FINDINGS.md) | Summary of findings | ✅ |
| [HYPOTHESES.md](./HYPOTHESES.md) | All hypotheses | ✅ |
| [MECHANISMS.md](./MECHANISMS.md) | Surviving mechanisms | ✅ |
| [STRATEGY.md](./STRATEGY.md) | Strategy (not deployed) | ✅ |
| [REVIEW.md](./REVIEW.md) | Program review | ✅ |
| [NEXT-STEPS.md](./NEXT-STEPS.md) | Future work | ✅ |
| README.md | This summary | ✅ |

---

## Limitations

1. **7-day sample** - Insufficient for robust conclusions
2. **Binance.US only** - May not generalize
3. **No transaction costs** - Strategy viability unknown
4. **No external data** - Context missing

---

## Recommended Next Steps

| Priority | Action |
|----------|--------|
| HIGH | Validate on 30+ days data |
| HIGH | Test on multiple exchanges |
| HIGH | Add transaction cost analysis |
| MEDIUM | Apply advanced statistics |
| MEDIUM | Order book analysis |

---

**Program Status**: COMPLETE
**KDE Version**: KDE-ENGINE-002 (Beta) v0.1.0
**Runtime**: READY
