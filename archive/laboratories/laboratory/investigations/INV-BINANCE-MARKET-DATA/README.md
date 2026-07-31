# INV-BINANCE-MARKET-DATA - Binance BTCUSDT 1-Minute Market Data Investigation

**Investigation ID**: INV-BINANCE-MARKET-DATA
**Title**: Binance BTCUSDT 1-Minute Market Data Investigation
**Status**: COMPLETE
**Engine**: KDE-ENGINE-002 (Beta)
**Date**: 2026-07-24
**Dataset Readiness**: SUITABLE WITH CAVEATS

---

## Quick Summary

| Metric | Value |
|--------|-------|
| **Source** | Binance.US API |
| **Symbol** | BTCUSDT |
| **Interval** | 1 minute |
| **Records** | 11,000 candles |
| **Period** | ~7 days (2026-07-17 to 2026-07-24) |
| **Dataset Readiness** | 90% |

---

## Investigation Phases

### Phase 1: Data Acquisition

- ✅ Discovered official Binance API documentation
- ✅ Identified klines endpoint: `/api/v3/klines`
- ✅ Retrieved 11,000 candles via pagination
- ✅ Recorded acquisition metadata

### Phase 2: Dataset Characterization

- ✅ Documented API structure
- ✅ Defined field semantics
- ✅ Analyzed time coverage
- ✅ Identified 12-field candle structure

### Phase 3: Dataset Qualification

- ✅ Completeness: 100%
- ⚠️ Continuity: 10 gaps from pagination
- ✅ Validity: No invalid values
- ⚠️ Zero volume: 46.4%

### Phase 4: Evidence-Based Investigation

- ✅ Price behavior analysis
- ✅ Volume analysis
- ✅ Temporal patterns
- ✅ Statistical properties

### Phase 5: Critical Review

- ✅ Assumptions documented
- ✅ Uncertainty sources identified
- ✅ Evidence limitations noted

---

## Key Findings

### Price Behavior
- Price declined 6% over observation period
- Range: $62,545 - $66,948 (7%)

### Volatility
- 1-minute volatility: 0.0414%
- Max single candle: 0.76%

### Volume Patterns
- Peak hours: 16:00-18:00 UTC
- Peak day: Friday
- Weekend low: Saturday

### Data Anomaly
- 46.4% zero-volume candles
- Requires investigation

---

## Deliverables

| Document | Purpose | Status |
|----------|---------|--------|
| [SPEC.md](./SPEC.md) | Investigation specification | ✅ |
| [DATASET.md](./DATASET.md) | Dataset characterization | ✅ |
| [QUALIFICATION.md](./QUALIFICATION.md) | Dataset qualification | ✅ |
| [ANALYSIS.md](./ANALYSIS.md) | Statistical analysis | ✅ |
| [FINDINGS.md](./FINDINGS.md) | Evidence-based conclusions | ✅ |
| [REVIEW.md](./REVIEW.md) | Critical review | ✅ |
| README.md | This summary | ✅ |

---

## API Discovery

### Endpoint
```
GET https://api.binance.us/api/v3/klines
```

### Parameters
| Parameter | Value |
|-----------|-------|
| symbol | BTCUSDT |
| interval | 1m |
| limit | 1000 |
| endTime | milliseconds |

### Rate Limit
- 0.2 second delay between requests
- Max 1000 candles per request

---

## Dataset Structure

Each candle contains 12 fields:
| Index | Field | Type |
|-------|-------|------|
| 0 | Open time | integer (ms) |
| 1 | Open | string |
| 2 | High | string |
| 3 | Low | string |
| 4 | Close | string |
| 5 | Volume | string |
| 6 | Close time | integer (ms) |
| 7 | Quote volume | string |
| 8 | Trades | integer |
| 9 | Taker buy base | string |
| 10 | Taker buy quote | string |
| 11 | Ignore | string |

---

## Limitations

1. **Binance.US only** - May not represent other exchanges
2. **7-day period** - Short for pattern detection
3. **Zero-volume anomaly** - 46.4% unexplained
4. **No external context** - News/macro not included

---

## Investigation Metadata

| Field | Value |
|-------|-------|
| Investigation ID | INV-BINANCE-MARKET-DATA |
| Engine | KDE-ENGINE-002 (Beta) |
| Bootstrap Status | QUALIFIED |
| Runtime State | READY |
| Start Date | 2026-07-24 |
| Acquisition Date | 2026-07-24 |
| End Date | 2026-07-24 |

---

## Reproducibility

### Steps to Reproduce

1. Access Binance.US API: `https://api.binance.us/api/v3/klines`
2. Request with: `symbol=BTCUSDT&interval=1m&limit=1000`
3. Paginate backwards using `endTime`
4. Sort by `openTime`
5. Analyze

### Data File

Data saved in: `data/btcusdt_1m.json`

---

**Investigation Status**: COMPLETE
**KDE Version**: KDE-ENGINE-002 (Beta) v0.1.0
**Runtime**: READY
