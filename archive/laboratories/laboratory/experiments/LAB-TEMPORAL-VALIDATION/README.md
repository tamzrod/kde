# LAB-TEMPORAL-VALIDATION - Temporal Validation & Position Sizing Discovery

**Experiment ID**: LAB-TEMPORAL-VALIDATION
**Title**: Temporal Validation & Position Sizing Discovery
**Status**: COMPLETE
**Engine**: KDE-ENGINE-002 (Beta)
**Date**: 2026-07-24

---

## Quick Summary

| Metric | Value |
|--------|-------|
| **Phase 1** | Frozen Validation |
| **Phase 2** | Evolution Investigation |
| **Mechanisms Validated** | 3/7 |
| **Mechanisms Failed** | 4/7 |
| **Strategy Win Rate Edge** | +23% (validation) |
| **Recommended Position Size** | 5% |

---

## Experiment Overview

### Objective

Evaluate whether KDE can generalize previously discovered mechanisms to unseen data while independently discovering position sizing methodology.

### Datasets

| Dataset | Period | Records | Price Range |
|---------|--------|---------|-------------|
| **Discovery** | 2026-07-16 to 2026-07-24 | 11,000 | $62,592 - $66,941 |
| **Validation** | 2026-07-09 to 2026-07-16 | 11,000 | $61,819 - $65,554 |

---

## Phase 1: Frozen Validation Results

### Mechanism Validation

| Mechanism | Discovery | Validation | Status |
|-----------|-----------|------------|--------|
| M1: Fat Tails | 16.4 | 35.4 | ✅ VALIDATED |
| M2: Volatility Clustering | 0.42 | 0.17 | ❌ FAILED |
| M3: Vol-Vol Coupling | 0.61 | 0.06 | ❌ FAILED |
| M4: Choppy Attractor | 61% | 28% | ⚠️ DEGRADED |
| M5: Vol Regime Persistence | 22% | 16% | ❌ FAILED |
| M6: American Session | 56% | 44% | ✅ VALIDATED |
| M7: Weekend Low | 0.17 | 0.45 | ✅ VALIDATED |

### Key Finding

**Structural mechanisms (M1, M6, M7) validated; behavioral mechanisms (M2-M5) did not.**

---

## Phase 2: Evolution Investigation Results

### Strategy Performance

| Metric | Discovery | Validation |
|--------|-----------|------------|
| Trades | 89 | 30 |
| Mean Return | +0.011% | -0.019% |
| Win Rate | 52% | 50% |
| Baseline Win Rate | 49% | 27% |
| Edge | +3% | +23% |

### Key Finding

**Win rate edge persisted; mean return inverted.**

---

## Position Sizing Discovery

### Evidence-Weighted Position Sizing (EWPS)

| Factor | Weight |
|--------|--------|
| Evidence Quality | HIGH |
| Mechanism Stability | MEDIUM |
| Regime Uncertainty | MEDIUM |

**Recommended Position Size**: 5% of capital

---

## Deliverables

| Document | Purpose | Status |
|----------|---------|--------|
| [VALIDATION-REPORT.md](./VALIDATION-REPORT.md) | Mechanism validation | ✅ |
| [STRATEGY-PERFORMANCE.md](./STRATEGY-PERFORMANCE.md) | Strategy analysis | ✅ |
| [MECHANISM-VALIDATION.md](./MECHANISM-VALIDATION.md) | Detailed mechanism analysis | ✅ |
| [POSITION-SIZING.md](./POSITION-SIZING.md) | Position sizing discovery | ✅ |
| [CAPITAL-ALLOCATION.md](./CAPITAL-ALLOCATION.md) | Capital allocation | ✅ |
| [FAILURE-ANALYSIS.md](./FAILURE-ANALYSIS.md) | Failure analysis | ✅ |
| [NEW-INVESTIGATIONS.md](./NEW-INVESTIGATIONS.md) | Future investigations | ✅ |
| README.md | This summary | ✅ |

---

## Key Conclusions

### What Failed

1. **Volatility Clustering (M2)**: Degraded by 60%
2. **Volume-Volatility Coupling (M3)**: Essentially lost
3. **Choppy Attractor (M4)**: Self-transition halved
4. **Vol Regime Persistence (M5)**: Momentum weakened

### What Succeeded

1. **Fat Tails (M1)**: Strengthened (kurtosis increased)
2. **American Session (M6)**: Persisted at lower rate
3. **Weekend Low (M7)**: Pattern preserved

### Key Insight

**Market mechanisms are regime-dependent. Structural properties persist; behavioral properties degrade.**

---

## Scientific Value

### Failures Were Valuable

The mechanism failures provided MORE insight than validations:
- Revealed regime-dependence
- Classified mechanism types
- Informed position sizing
- Generated new investigations

---

**Experiment Status**: COMPLETE
**KDE Version**: KDE-ENGINE-002 (Beta) v0.1.0
**Runtime**: READY
