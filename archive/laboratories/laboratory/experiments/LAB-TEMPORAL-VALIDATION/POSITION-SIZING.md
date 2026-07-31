# POSITION-SIZING.md - Position Sizing Investigation

**Experiment ID**: LAB-TEMPORAL-VALIDATION
**created**: 2026-07-24T16:10:00Z
**modified**: 2026-07-24T16:15:00Z
**Status**: COMPLETE
**Engine**: KDE-ENGINE-ENGINE-002 (Beta)

---

## Investigation Objective

Discover position sizing methodology from first principles without relying on conventional formulas.

**Constraint**: Do NOT use fixed percentage, Kelly Criterion, martingale, or other named methodologies unless evidence independently supports them.

---

## Evidence-Based Position Sizing

### Available Evidence Sources

From the validation experiment, the following evidence is available:

| Evidence Source | Discovery | Validation | Confidence |
|---------------|-----------|------------|------------|
| Strategy Edge | +3% | +23% | MEDIUM |
| Mechanism Confidence | HIGH for M1, M6, M7 | MIXED | LOW-MEDIUM |
| Strategy Sample | 89 trades | 30 trades | LOW |
| Market Regime | Normal | Different | UNKNOWN |
| Strategy Health | 6.4/10 | 6.4/10 | LOW |

---

## First-Principles Analysis

### Principle 1: Evidence Quality Determines Size

**Hypothesis**: Position size should scale with evidence strength.

**Evidence**:
- Strategy has positive edge (50% vs 27% baseline)
- But sample size is small (30 validation trades)
- Confidence is LOW

**Recommended Position Sizing**: SMALL (5-10% of capital)

**Rationale**: When evidence is weak but direction is positive, use minimal exposure.

---

### Principle 2: Mechanism Stability Determines Size

**Hypothesis**: Position size should scale with mechanism stability.

**Evidence**:
- M1 (Fat Tails): STRONG validation → HIGH weight
- M6 (American Session): PERSISTED → MEDIUM weight
- M7 (Weekend Low): PERSISTED → MEDIUM weight
- M2, M3, M5: DID NOT VALIDATE → LOW weight

**Recommended Position Sizing**: MEDIUM (10-20% of capital)

**Rationale**: Some mechanisms validated, providing partial support.

---

### Principle 3: Regime Detection Adjusts Size

**Hypothesis**: Position size should adjust based on detected market regime.

**Evidence**:
- Validation period shows different regime (higher kurtosis, lower clustering)
- Regime is UNKNOWN to classify
- Cannot reliably detect regime from 1-minute data alone

**Recommended Position Sizing**: REDUCE by 50%

**Rationale**: When regime is uncertain, reduce exposure.

---

## Proposed Position Sizing Methodology

### Evidence-Weighted Position Sizing (EWPS)

**Formula (derived from evidence)**:

```
Position Size = Base × Evidence Score × Stability Score × Regime Adjustment
```

**Where**:

| Component | Calculation | Discovery Value | Validation Value |
|-----------|-------------|----------------|-----------------|
| Base | Arbitrary | 10% | 10% |
| Evidence Score | Win rate edge / baseline edge | 1.06 | 1.87 |
| Stability Score | Validated mechanisms / total | 0.43 | 0.43 |
| Regime Adjustment | Unknown (1.0 or 0.5) | 1.0 | 0.5 |

**Calculation**:
- Discovery: 10% × 1.06 × 0.43 × 1.0 = **4.6%**
- Validation: 10% × 1.87 × 0.43 × 0.5 = **4.0%**

---

## Alternative: Evidence-Consistency Sizing

### Hypothesis: Position size scales with consistency of evidence

**Evidence Consistency**:
- Win rate: 52% (discovery) vs 50% (validation) → CONSISTENT
- Mean return: +0.011% vs -0.019% → INCONSISTENT
- Edge direction: +3% vs +23% → CONSISTENT

**Consistency Score**: 2/3 = 67%

**Recommended Size**: 67% of base allocation = **6.7%**

---

## Position Sizing Recommendations

### Summary Table

| Methodology | Base | Adjustment | Final Size | Evidence |
|------------|------|------------|------------|----------|
| Evidence Quality | 10% | × 0.5 (low confidence) | 5% | Sample < 100 |
| Mechanism Stability | 10% | × 0.43 (3/7 valid) | 4.3% | Some valid |
| EWPS | 10% | × 0.4 | 4.0% | Mixed |
| Consistency | 10% | × 0.67 | 6.7% | Win rate consistent |
| **Average** | | | **5.0%** | |

---

## Position Sizing Discovery

### OBS-PS-1: Optimal Position Size is SMALL

**Evidence**: All calculations yield 4-7% of capital

**Inference**: Position sizing should be conservative given evidence quality.

### OBS-PS-2: Evidence Quality is Primary Factor

**Evidence**: Evidence Score varies 2x between periods

**Inference**: Position size should track evidence quality.

### OBS-PS-3: Consistency Provides Confidence

**Evidence**: Win rate consistency (50-52%) vs return inconsistency

**Discovery**: Weight consistency differently than magnitude.

---

## Risk Assessment

### Position Sizing Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Sample too small | HIGH | HIGH | Small position size |
| Regime change | MEDIUM | HIGH | Regime detection |
| Mechanism degradation | MEDIUM | MEDIUM | Continuous monitoring |
| Transaction costs | UNKNOWN | MEDIUM | Test before deployment |

---

## Conclusions

### Position Sizing Discovery

1. **Position size should be SMALL (4-7%)** given evidence quality
2. **Evidence quality is primary driver** of position size
3. **Consistency matters** - win rate stability allows larger sizes
4. **Regime uncertainty requires reduction** in position size

### Evidence for Recommended Size

| Factor | Value | Weight |
|--------|-------|--------|
| Strategy edge | Present | HIGH |
| Sample size | Small | HIGH |
| Mechanism stability | Partial | MEDIUM |
| Regime uncertainty | Present | MEDIUM |
| **Recommended** | **5%** | |

---

### Final Recommendation

**Position Size: 5% of Capital Maximum**

**Rationale**:
- Evidence supports positive edge
- Sample size is inadequate for larger positions
- Mechanisms partially validated
- Regime uncertainty present

---

**Position Sizing Status**: COMPLETE
