# FINDINGS.md - Evidence-Based Findings

**Investigation ID**: INV-BINANCE-MARKET-DATA
**created**: 2026-07-24T15:25:00Z
**modified**: 2026-07-24T15:30:00Z

---

## Summary of Evidence-Based Findings

This document presents findings derived solely from the acquired BTCUSDT 1-minute market data. Each finding is classified as OBSERVATION, STATISTICAL EVIDENCE, INFERENCE, or HYPOTHESIS.

---

## Price Behavior Findings

### Finding P1: Overall Price Movement

**Classification**: STATISTICAL EVIDENCE

**Evidence**:
- Starting price: $66,947.78
- Ending price: $62,947.27
- Net change: -$4,000.51 (-5.98%)

**Conclusion**: BTCUSDT price declined approximately 6% over the observation period.

---

### Finding P2: Price Range

**Classification**: STATISTICAL EVIDENCE

**Evidence**:
- Minimum: $62,545.36
- Maximum: $66,947.78
- Range: $4,402.42 (7.0%)

**Conclusion**: Within the observation period, price oscillated within a 7% range.

---

## Volatility Findings

### Finding V1: 1-Minute Volatility

**Classification**: STATISTICAL EVIDENCE

**Evidence**:
- Mean candle range: 0.0113%
- Standard deviation of returns: 0.0414%
- Max single-candle range: 0.7631%

**Conclusion**: BTCUSDT exhibits low per-minute volatility with occasional larger movements.

---

### Finding V2: Extreme Price Moves

**Classification**: STATISTICAL EVIDENCE

**Evidence**:
- Maximum positive return: +0.4155%
- Maximum negative return: -0.6082%
- Candles with >0.5% range: ~50 (0.5%)

**Conclusion**: Extreme moves (>0.5%) are rare but occur.

---

## Volume Findings

### Finding V3: Volume Distribution

**Classification**: STATISTICAL EVIDENCE

**Evidence**:
- Total volume: 297.40 BTC
- Mean (non-zero): 0.0504 BTC
- Zero volume candles: 5,102 (46.4%)

**Conclusion**: Nearly half of 1-minute candles have no trading activity.

---

### Finding V4: Volume Concentration

**Classification**: STATISTICAL EVIDENCE

**Evidence**:
- Top hour (18:00 UTC): 25.57 BTC (8.6%)
- Top 6 hours (13:00-19:00): ~115 BTC (38.7%)
- Bottom 6 hours (02:00-08:00): ~25 BTC (8.4%)

**Conclusion**: Trading volume is concentrated in specific hours.

---

## Temporal Pattern Findings

### Finding T1: Hourly Trading Pattern

**Classification**: STATISTICAL EVIDENCE

**Evidence**:
- Peak: 16:00-18:00 UTC (afternoon US trading hours)
- Low: 02:00-10:00 UTC (late night/early morning US hours)

**INFERENCE**: Trading activity correlates with US market hours.

**HYPOTHESIS H1**: BTC trading volume follows a pattern tied to Western market hours.

---

### Finding T2: Day of Week Pattern

**Classification**: STATISTICAL EVIDENCE

**Evidence**:
- Friday: 80.44 BTC (27.0%)
- Saturday: 13.74 BTC (4.6%)

**Conclusion**: Friday has ~6x more trading than Saturday.

**INFERENCE**: Weekend trading is significantly lower.

**HYPOTHESIS H2**: The Friday volume peak may be related to weekly option expirations or institutional settlement patterns.

---

## Statistical Property Findings

### Finding S1: Return Distribution

**Classification**: STATISTICAL EVIDENCE

**Evidence**:
- Mean return: ~0%
- Skewness: Slightly negative (more large drops than large gains)
- Kurtosis: High (fat tails)

**Conclusion**: Returns show slight negative skew with fat tails.

---

### Finding S2: Zero Volume Prevalence

**Classification**: OBSERVATION

**Evidence**:
- 46.4% of candles have zero volume
- Zero volume occurs at all hours

**HYPOTHESIS H3**: Zero-volume candles may indicate:
1. Exchange market-making behavior
2. Deliberate non-trading periods
3. Data artifact from API

---

## Hypotheses Generated

### Hypothesis H1: US Market Hours Correlation

**Statement**: BTC trading volume correlates with US market trading hours.

**Evidence**: Peak hours (16:00-18:00 UTC) coincide with US afternoon trading.

---

### Hypothesis H2: Friday Volume Peak

**Statement**: Friday's high volume may relate to institutional weekly settlements.

**Evidence**: Friday has 6x more volume than Saturday.

---

### Hypothesis H3: Exchange Market Making

**Statement**: Zero-volume candles may be a result of Binance.US market-making behavior.

**Evidence**: 46.4% zero volume rate is unusually high.

---

### Hypothesis H4: Fat Tail Distribution

**Statement**: BTC returns follow a fat-tailed distribution.

**Evidence**: Max return (+0.42%) is 10x larger than mean return (0%).

---

## Causation Assessment

### Cannot Determine Causation For:

1. **Why prices declined 6%**
   - Requires additional market context

2. **Why certain hours have higher volume**
   - Requires behavioral/external data

3. **Why Friday has highest volume**
   - Requires market structure analysis

4. **Why 46% of candles have zero volume**
   - Requires exchange behavior data

---

## Dataset Limitations

### Limitation L1: Binance.US vs Binance.com

The data was obtained from Binance.US, not Binance.com. Patterns may differ between exchanges.

---

### Limitation L2: Observation Period

The 7-day window captures a specific market condition (price decline). Longer periods needed for general conclusions.

---

### Limitation L3: Single Asset

Only BTCUSDT was analyzed. Findings may not generalize to other pairs.

---

### Limitation L4: No External Data

Analysis is based solely on OHLCV data. External factors (news, macro events) not considered.

---

## Conclusions

### Confirmed Findings

1. **Price declined ~6%** over observation period
2. **Low 1-minute volatility** with occasional large moves
3. **Temporal patterns** exist in volume by hour and day
4. **High zero-volume rate** (46.4%) requires explanation

### Unable to Confirm

1. Causes of price movement direction
2. Causes of volume patterns
3. Whether zero-volume is exchange behavior or data artifact

---

**Findings Status**: COMPLETE
**Confidence Level**: HIGH for statistical evidence, MEDIUM for inferences, LOW for hypotheses
