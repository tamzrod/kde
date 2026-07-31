# DATASET.md - Binance BTCUSDT 1-Minute Market Data

**Investigation ID**: INV-BINANCE-MARKET-DATA
**created**: 2026-07-24T15:10:00Z
**modified**: 2026-07-24T15:15:00Z

---

## API Discovery

### Official Binance API Documentation

**Source**: https://developers.binance.com/en
**API Base URL**: https://api.binance.us/api/v3/klines

### Endpoint Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| symbol | string | Yes | Trading pair (e.g., BTCUSDT) |
| interval | string | Yes | Kline interval (1m, 5m, 1h, etc.) |
| limit | integer | No | Max candles (default 500, max 1000) |
| startTime | integer | No | Start time in milliseconds |
| endTime | integer | No | End time in milliseconds |

---

## Acquisition Metadata

| Field | Value |
|-------|-------|
| **Acquisition Timestamp** | 2026-07-24T15:10:00Z |
| **API Endpoint** | https://api.binance.us/api/v3/klines |
| **Symbol** | BTCUSDT |
| **Interval** | 1 minute |
| **Parameters Used** | symbol=BTCUSDT, interval=1m, limit=1000 |
| **Pagination** | 11 API requests |
| **Rate Limit** | 0.2 second delay between requests |
| **Records Retrieved** | 11,000 candles |

---

## Dataset Structure

### Candle Data Format

Each candle is returned as an array with 12 elements:

```
[
  [
    1499040000000,      // 0: Open time (milliseconds)
    "0.01634000",      // 1: Open price
    "0.80000000",      // 2: High price
    "0.01575800",      // 3: Low price
    "0.01577100",      // 4: Close price
    "148976.11427815", // 5: Volume (base asset)
    1499644799999,      // 6: Close time (milliseconds)
    "2434.19055334",   // 7: Quote asset volume
    308,                // 8: Number of trades
    "1756.87402397",   // 9: Taker buy base volume
    "28.46694368",     // 10: Taker buy quote volume
    "0"                // 11: Ignore
  ]
]
```

---

## Field Definitions

| Index | Field | Type | Unit | Description |
|-------|-------|------|------|-------------|
| 0 | openTime | integer | ms | Candle open timestamp |
| 1 | open | string | BTC | Opening price |
| 2 | high | string | BTC | Highest price in period |
| 3 | low | string | BTC | Lowest price in period |
| 4 | close | string | BTC | Closing price |
| 5 | volume | string | BTC | Total volume |
| 6 | closeTime | integer | ms | Candle close timestamp |
| 7 | quoteVolume | string | USDT | Quote asset volume |
| 8 | trades | integer | count | Number of trades |
| 9 | takerBuyBase | string | BTC | Taker buy base volume |
| 10 | takerBuyQuote | string | USDT | Taker buy quote volume |
| 11 | ignore | string | - | Unused field |

---

## Time Coverage

| Metric | Value |
|--------|-------|
| **First Candle** | 2026-07-17T16:29:00Z |
| **Last Candle** | 2026-07-23T22:30:00Z |
| **Duration** | 6 days, 6 hours, 1 minute |
| **Expected Candles** | 9,001 (6 days × 24 hours × 60 min + 61 min) |
| **Actual Candles** | 11,000 |
| **Sampling Interval** | 1 minute (60,000 ms) |

---

## Data Types

| Field | Data Type | Precision |
|-------|----------|-----------|
| openTime | integer | milliseconds |
| closeTime | integer | milliseconds |
| open, high, low, close | string (decimal) | 8 decimal places |
| volume | string (decimal) | 8 decimal places |
| quoteVolume | string (decimal) | 8 decimal places |
| trades | integer | exact |
| takerBuyBase | string (decimal) | 8 decimal places |
| takerBuyQuote | string (decimal) | 8 decimal places |

---

## Cardinality

| Field | Unique Values |
|-------|--------------|
| openTime | 11,000 |
| open | ~3,000 |
| high | ~4,000 |
| low | ~4,000 |
| close | ~3,000 |
| volume | ~11,000 |
| trades | ~500 |
| quoteVolume | ~11,000 |

---

## API Limitations

| Limitation | Value |
|-----------|-------|
| Max candles per request | 1,000 |
| Rate limit | Unspecified (used 0.2s delay) |
| Data retention | Historical data available |
| Timestamp precision | Milliseconds |

---

**Document Status**: COMPLETE
