# ANALYSIS.md - Statistical Analysis of BTCUSDT Market Data

**Investigation ID**: INV-BINANCE-MARKET-DATA
**created**: 2026-07-24T15:20:00Z
**modified**: 2026-07-24T15:25:00Z

---

## 1. Price Analysis

### 1.1 Price Statistics

| Metric | Open (USD) | Close (USD) |
|--------|-------------|-------------|
| Minimum | 62,545.36 | 62,592.27 |
| Maximum | 66,947.78 | 66,941.71 |
| Mean | 64,956.88 | 64,957.11 |
| Range | 4,402.42 | 4,349.44 |

**OBS-007**: Price range spans approximately 7% from minimum to maximum over the observation period.

### 1.2 Price Movement

| Metric | Value |
|--------|-------|
| Starting Price | 66,947.78 |
| Ending Price | 62,947.27 |
| Net Change | -4,000.51 |
| Percentage Change | -5.98% |

**OBS-008**: Net price movement was negative over the observation period (approximately 7 days).

---

## 2. Return Analysis

### 2.1 Return Statistics

| Metric | Value |
|--------|-------|
| Mean Return | 0.0000% |
| Min Return | -0.6082% |
| Max Return | 0.4155% |
| Std Deviation | 0.0414% |

**OBS-009**: Mean return is essentially zero, indicating no persistent directional bias over the period.

### 2.2 Volatility

| Metric | Value |
|--------|-------|
| Volatility (1σ) | 0.0414% per minute |
| Annualized Volatility | ~20.8% |
| Max Single Candle Range | 0.7631% |

**OBS-010**: 1-minute volatility is low, consistent with large-cap asset trading.

---

## 3. Volume Analysis

### 3.1 Volume Statistics

| Metric | Value |
|--------|-------|
| Total Volume | 297.40 BTC |
| Non-zero Candles | 5,898 (53.6%) |
| Zero Volume Candles | 5,102 (46.4%) |
| Mean Volume (non-zero) | 0.0504 BTC |
| Max Volume | 3.4054 BTC |

**OBS-011**: Nearly half of 1-minute candles have zero volume, indicating intermittent trading.

### 3.2 Quote Volume

| Metric | Value |
|--------|-------|
| Total Quote Volume | ~$19.3M USDT |

---

## 4. Trade Analysis

### 4.1 Trade Statistics

| Metric | Value |
|--------|-------|
| Total Trades | 28,147 |
| Mean Trades/Candle | 2.6 |
| Max Trades/Candle | 238 |
| Zero Trade Candles | 5,102 |

**OBS-012**: Average of 2.6 trades per minute, with high variance.

---

## 5. Temporal Patterns

### 5.1 Hourly Volume Distribution (UTC)

| Hour | Volume (BTC) | Rank |
|------|-------------|------|
| 18:00 | 25.57 | 1 |
| 16:00 | 20.75 | 2 |
| 00:00 | 19.87 | 3 |
| 22:00 | 18.07 | 4 |
| 14:00 | 18.72 | 5 |
| 02:00 | 2.44 | 24 |
| 10:00 | 2.53 | 23 |
| 07:00 | 2.82 | 22 |

**OBS-013**: Peak trading hours are 16:00-18:00 UTC (afternoon US hours).
**OBS-014**: Lowest trading hours are 02:00-10:00 UTC (night/early morning US hours).

### 5.2 Hourly Trade Distribution (UTC)

| Period | Trades | Observation |
|--------|--------|-------------|
| Peak Hours (13:00-19:00) | 11,833 | 42% of total |
| Off Hours (00:00-06:00) | 5,279 | 19% of total |

**OBS-015**: 42% of trades occur during 6-hour peak window.

### 5.3 Day of Week Volume (UTC)

| Day | Volume (BTC) | Rank |
|-----|-------------|------|
| Friday | 80.44 | 1 |
| Tuesday | 62.72 | 2 |
| Monday | 51.18 | 3 |
| Wednesday | 36.06 | 4 |
| Sunday | 32.06 | 5 |
| Thursday | 21.20 | 6 |
| Saturday | 13.74 | 7 |

**OBS-016**: Friday has highest trading volume, Saturday lowest.

### 5.4 Day of Week Trade Distribution (UTC)

| Day | Trades | Percentage |
|-----|--------|------------|
| Friday | 7,660 | 27.2% |
| Monday | 4,852 | 17.2% |
| Tuesday | 4,780 | 17.0% |
| Wednesday | 3,518 | 12.5% |
| Thursday | 3,492 | 12.4% |
| Sunday | 2,450 | 8.7% |
| Saturday | 1,395 | 5.0% |

**OBS-017**: Friday accounts for 27.2% of all trades, more than 5x Saturday.

---

## 6. Price Range Analysis

### 6.1 Candle Range Statistics

| Metric | Value |
|--------|-------|
| Mean Range | 0.0113% |
| Max Range | 0.7631% |
| Large Range (>0.1%) | ~2% of candles |

**OBS-018**: Most 1-minute candles have very small ranges, with occasional large moves.

---

## 7. Statistical Relationships

### 7.1 Volume-Trade Relationship

| Observation | Evidence |
|-------------|----------|
| High correlation | Volume and trade count correlate positively |
| Non-zero overlap | All high-volume candles have trades |

**CORRELATION**: Volume and number of trades are correlated but not perfectly.

### 7.2 Time-Volume Relationship

| Observation | Evidence |
|-------------|----------|
| Peak hours | Higher volume during 16:00-18:00 UTC |
| Low hours | Lower volume during 02:00-10:00 UTC |

**CORRELATION**: Time of day correlates with trading volume.

---

## 8. Anomalies

### 8.1 Identified Anomalies

| Anomaly | Count | Percentage |
|---------|-------|------------|
| Zero Volume Candles | 5,102 | 46.4% |
| Single Trade Candles | ~3,000 | ~27% |
| Large Range Candles (>0.5%) | ~50 | ~0.5% |

### 8.2 Zero Volume Pattern

**OBS-019**: Zero volume candles are not randomly distributed.

**INFERENCE**: Zero volume candles may indicate:
1. Binance.US market maker behavior
2. Low liquidity periods
3. Artificial exchange behavior

**Note**: This pattern may be specific to Binance.US vs Binance.com.

---

## 9. Statistical Evidence Summary

| Finding | Classification | Confidence |
|---------|---------------|------------|
| Negative net return | STATISTICAL EVIDENCE | HIGH |
| Low 1-minute volatility | STATISTICAL EVIDENCE | HIGH |
| Peak hours pattern | STATISTICAL EVIDENCE | HIGH |
| Friday peak volume | STATISTICAL EVIDENCE | MEDIUM |
| High zero-volume rate | STATISTICAL EVIDENCE | HIGH |
| Price range pattern | STATISTICAL EVIDENCE | HIGH |

---

## 10. Correlation vs Causation

**CANNOT DETERMINE CAUSATION** for:
- Why certain hours have higher volume
- Why Friday has highest trading activity
- What causes large candle ranges
- Why some periods have zero volume

**CORRELATIONS OBSERVED**:
- Time of day ↔ Volume
- Day of week ↔ Volume
- Volume ↔ Trade count

---

**Analysis Status**: COMPLETE
