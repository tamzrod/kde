# FINDINGS.md - Program Findings Summary

**Program ID**: PROG-ZK-TRADING
**created**: 2026-07-24T15:55:00Z
**modified**: 2026-07-24T16:00:00Z
**Status**: COMPLETE
**Engine**: KDE-ENGINE-002 (Beta)

---

## Summary

This program performed zero-knowledge discovery of behavioral mechanisms in BTCUSDT 1-minute market data. Seven investigation runs were conducted, each building upon previous findings.

---

## Investigation Runs Completed

| Run | Title | Mechanisms | Hypotheses | Rejected |
|-----|-------|------------|------------|----------|
| RUN-001 | Market Characterization | 3 | 0 | 0 |
| RUN-002 | Statistical Behaviors | 4 | 0 | 1 |
| RUN-003 | Temporal Structures | 4 | 0 | 2 |
| RUN-004 | Volatility Transitions | 4 | 0 | 2 |
| RUN-005 | Volume-Price Relationships | 5 | 0 | 2 |
| RUN-006 | State Transitions | 4 | 1 | 2 |
| RUN-007 | Predictive Sequences | 4 | 0 | 2 |
| **TOTAL** | | **28** | **1** | **11** |

---

## Key Findings by Category

### Price Behavior

| Finding | Evidence | Confidence |
|---------|----------|------------|
| Fat tails in returns | Kurtosis = 18.3 vs normal 3 | HIGH |
| Weak mean reversion | Lag-1 autocorrelation = -0.023 | LOW |
| ~6% net decline | Over 7-day period | HIGH |

### Volatility Behavior

| Finding | Evidence | Confidence |
|---------|----------|------------|
| Volatility clustering | Lag-1 autocorrelation = 0.42 | HIGH |
| Medium state attractor | 74% self-transition | HIGH |
| Volatility rises slowly | LOW→HIGH 0.4% vs HIGH→LOW 1.4% | MEDIUM |

### Volume Behavior

| Finding | Evidence | Confidence |
|---------|----------|------------|
| Strong vol correlation | Correlation = 0.61 | HIGH |
| No direction prediction | Up% ~49% regardless | HIGH |
| Volume leads volatility | HIGH→HIGH 30% vs 17% baseline | HIGH |
| American session dominance | 56% of volume | HIGH |

### Temporal Behavior

| Finding | Evidence | Confidence |
|---------|----------|------------|
| Friday anomaly | Highest vol and volume | MEDIUM |
| Weekend low liquidity | Saturday 10x less than Friday | HIGH |
| Evening volatility | 10% higher at 18:00 UTC | LOW |

### State Transition Behavior

| Finding | Evidence | Confidence |
|---------|----------|------------|
| Volatile regime persistence | 3x random self-transition | HIGH |
| Choppy attractor | 61% self-transition | HIGH |
| Brief volatile episodes | <2.5 min mean duration | HIGH |

---

## Failed Hypotheses

1. Returns are normally distributed (REJECTED - fat tails)
2. Returns show intraday directional bias (REJECTED - no bias)
3. European session differs from Asian (REJECTED - similar)
4. Volatility follows random walk (REJECTED - persistence)
5. High volatility predicts returns (REJECTED - no direction)
6. Volume predicts next returns (REJECTED - no direction)
7. Volume breakout precedes direction (REJECTED)
8. Quiet leads to explosive moves (REJECTED)
9. Vol always reverses (REJECTED - persistence exists)
10. Long consolidation predicts direction (REJECTED)
11. Returns are normal (REJECTED)

---

## Evidence Summary

### Strongest Evidence

1. **Fat Tails**: Kurtosis 18.3 is unambiguous
2. **Volatility Clustering**: 0.42 autocorrelation is strong
3. **Volume-Volatility Coupling**: 0.61 correlation is strong
4. **American Session Dominance**: 56% is clear majority
5. **Volatile Regime Persistence**: 3x random is significant

### Weakest Evidence

1. **Intraday Hourly Patterns**: Differences are small
2. **Directional Bias in Volatile States**: Edges are small (6-7%)
3. **Consolidation-Volatility Link**: Limited sample

---

## Limitations

| Limitation | Impact | Mitigation |
|------------|--------|------------|
| 7-day sample | HIGH | Cannot confirm long-term patterns |
| Binance.US only | HIGH | May not generalize |
| No transaction costs | HIGH | Strategy may be unprofitable |
| No external factors | MEDIUM | Market context missing |

---

## Conclusions

### What We Discovered

1. **Market has fat tails** - Extreme moves more common than normal
2. **Volatility clusters** - High vol periods persist
3. **Volume-variance coupled** - High volume = high vol
4. **Session patterns exist** - US hours dominate
5. **State transitions follow rules** - Choppy is the attractor

### What We Could Not Confirm

1. **Direction prediction** - Volume/volatility don't predict direction
2. **Intraday patterns** - Hourly effects are weak
3. **Predictable regimes** - No strong regime identification

---

**Findings Status**: COMPLETE
