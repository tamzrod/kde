# HYPOTHESES.md - Generated Hypotheses

**Program ID**: PROG-ZK-TRADING
**created**: 2026-07-24T16:00:00Z
**modified**: 2026-07-24T16:00:00Z
**Status**: COMPLETE
**Engine**: KDE-ENGINE-002 (Beta)

---

## Hypothesis H1: Volatility Momentum Hypothesis

**Status**: FORMULATED (requires further validation)

### Statement

High-volatility periods exhibit directional persistence, but eventually revert to choppy consolidation. The market alternates between momentum phases (volatile) and consolidation phases (choppy).

### Evidence

1. VOL_UP self-transition: 22% (vs 8% random expected) - 2.75x
2. VOL_DN self-transition: 25% (vs 8% random expected) - 3.13x
3. Consecutive volatile candles strengthen momentum (3x → 52% continuation)
4. Mean volatile duration: < 2.5 minutes
5. CHOPPY is universal attractor (61% self-transition)

### Confidence

**MEDIUM**

Rationale: Observed in 7-day sample, statistically significant for VOL_DN (p=0.002), but sample size limited.

### Limitations

1. 7-day sample may not represent long-term behavior
2. Binance.US-specific patterns may not generalize
3. Short volatile episodes make timing difficult
4. Direction edge is small (6-7%)

### Confounding Factors

1. Market news/events not controlled
2. Sample period may have specific market conditions
3. Other variables not measured (order flow, etc.)

### Falsification Experiments

1. Test on longer time series (30+ days)
2. Test on different exchanges (Binance.com, Coinbase)
3. Test during different market conditions (bull/bear)
4. Account for transaction costs

---

## Hypothesis H2: Volume Clustering Hypothesis

**Status**: FORMULATED

### Statement

High-volume periods cluster together. After a high-volume candle, the probability of another high-volume candle increases significantly.

### Evidence

1. HIGH → HIGH volatility transition: 30% (vs 17% baseline)
2. Consecutive HIGH: 2x → 45%, 3x → 58%
3. Volume-volatility correlation: 0.61

### Confidence

**HIGH**

### Limitations

1. Zero-volume candles (46%) complicate analysis
2. Binance.US-specific market making may affect pattern

---

## Hypothesis H3: Consolidation-Volatility Hypothesis

**Status**: FORMULATED

### Statement

Extended periods of low volatility (choppy) are followed by elevated volatility. Long consolidations precede moves.

### Evidence

1. 20+ candle CHOPPY → next volatility 34% higher
2. All states tend toward CHOPPY
3. Volatile states are brief when they occur

### Confidence

**MEDIUM**

### Limitations

1. Limited sample of long consolidations
2. Does not predict direction

---

## Untested Hypotheses

The following hypotheses were suggested but not tested due to scope:

### UH-1: Weekend Effect

**Suggestion**: Weekend has different volatility/return characteristics

**Evidence from RUN-003**: Saturday lowest volume, 52% win rate

**Status**: Untested

### UH-2: American Session Advantage

**Suggestion**: Trading during US hours has different properties

**Evidence from RUN-003**: 56% of volume in US hours

**Status**: Untested

---

## Rejected Hypotheses

See FINDINGS.md for complete list of rejected hypotheses.

---

**Hypotheses Status**: COMPLETE
**Total Hypotheses Formed**: 3
**Total Hypotheses Rejected**: 11
