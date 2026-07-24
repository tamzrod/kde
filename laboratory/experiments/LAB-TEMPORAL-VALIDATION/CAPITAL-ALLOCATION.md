# CAPITAL-ALLOCATION.md - Capital Allocation Investigation

**Experiment ID**: LAB-TEMPORAL-VALIDATION
**created**: 2026-07-24T16:15:00Z
**modified**: 2026-07-24T16:20:00Z
**Status**: COMPLETE
**Engine**: KDE-ENGINE-002 (Beta)

---

## Investigation Objective

Determine capital allocation methodology based on evidence rather than convention.

---

## Capital Allocation Framework

### Evidence-Based Allocation Principles

#### Principle 1: Mechanism Allocation

Allocate capital proportionally to mechanism confidence.

| Mechanism | Validation Status | Confidence | Allocation |
|-----------|------------------|------------|------------|
| M1: Fat Tails | ✅ STRONGER | HIGH | 25% |
| M6: American Session | ✅ PERSISTS | MEDIUM | 20% |
| M7: Weekend Low | ✅ PERSISTS | MEDIUM | 20% |
| M2: Vol Clustering | ❌ WEAKER | LOW | 10% |
| M3: Vol-Vol Coupling | ❌ LOST | NONE | 0% |
| M4: Choppy Attractor | ⚠️ DEGRADED | LOW | 15% |
| M5: Vol Regime Persistence | ❌ WEAKER | LOW | 10% |
| **Total** | | | **100%** |

#### Principle 2: Strategy Allocation

Allocate capital proportionally to strategy confidence.

| Strategy | Health Score | Evidence Quality | Allocation |
|----------|--------------|------------------|------------|
| Momentum Fade | 6.4/10 | MEDIUM | 50% |
| (No other strategies) | | | 50% cash |

#### Principle 3: Reserve Capital

Maintain reserve for:
- Mechanism monitoring
- New investigation funding
- Emergency drawdown

**Recommended Reserve**: 30% of capital

---

## Capital Allocation Model

### Evidence-Weighted Capital Allocation (EWCA)

```
Total Capital = 100%
├── Reserve Capital: 30%
├── Strategy Capital: 35% (70% × 50%)
│   └── Momentum Fade: 35%
└── Mechanism Capital: 35% (70% × 50%)
    ├── M1 (Fat Tails): 8.75%
    ├── M6 (American Session): 7%
    ├── M7 (Weekend Low): 7%
    ├── M4 (Choppy): 5.25%
    └── M2, M5 (Low): 3.5% each
```

---

## Risk Exposure Analysis

### OBS-CA-1: Concentration Risk

**Evidence**: 35% allocated to single strategy

**Risk**: Strategy failure affects 35% of invested capital

**Mitigation**: Reserve capital and multiple mechanisms

### OBS-CA-2: Mechanism Dependency

**Evidence**: M1, M6, M7 support 70% of mechanism allocation

**Risk**: If these mechanisms degrade, 70% of mechanism capital at risk

**Mitigation**: Continuous mechanism monitoring

### OBS-CA-3: Liquidity Risk

**Evidence**: Weekend low liquidity (M7)

**Risk**: Cannot exit positions during low liquidity

**Mitigation**: Avoid positions before weekends

---

## Allocation Recommendations

### Summary

| Category | Allocation | Rationale |
|----------|------------|------------|
| Reserve | 30% | Safety, new investigations |
| Momentum Fade Strategy | 35% | Positive edge, moderate health |
| Mechanism Capital | 35% | Split across mechanisms |

### Specific Allocation

| Asset | Allocation | Evidence |
|-------|------------|----------|
| BTCUSDT (Strategy) | 35% | Positive edge validated |
| BTCUSDT (M1 exposure) | 9% | Fat tails always present |
| BTCUSDT (M6/M7 exposure) | 14% | Session patterns |
| BTCUSDT (M4/M2/M5) | 7% | Partial validation |
| Cash/Reserve | 35% | Safety buffer |

---

## Capital Allocation Conclusion

### Key Discoveries

1. **Single strategy should not exceed 35%** of capital
2. **30% reserve** should be maintained for safety
3. **Mechanism diversification** provides risk reduction
4. **Evidence weighting** produces unique allocation not matching conventions

### Evidence for Recommended Allocation

| Factor | Evidence | Weight |
|--------|----------|--------|
| Strategy edge | Validated in both periods | HIGH |
| Strategy sample | Still small (119 total) | MEDIUM |
| Mechanism stability | 3/7 validated | MEDIUM |
| Regime uncertainty | Present | MEDIUM |

---

**Capital Allocation Status**: COMPLETE
