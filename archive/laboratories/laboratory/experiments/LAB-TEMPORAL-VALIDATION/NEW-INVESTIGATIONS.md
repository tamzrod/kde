# NEW-INVESTIGATIONS.md - New Investigation Proposals

**Experiment ID**: LAB-TEMPORAL-VALIDATION
**created**: 2026-07-24T16:25:00Z
**modified**: 2026-07-24T16:30:00Z
**Status**: COMPLETE
**Engine**: KDE-ENGINE-002 (Beta)

---

## Phase 2: Evolution Investigation

Following validation, the following investigations are proposed based on findings.

---

## Investigation Proposal 1: Regime Detection

**Title**: Regime Detection from First Principles

**Objective**: Discover method to detect market regime from price/volume data alone.

**Evidence Supporting Investigation**:
- M2, M3, M4, M5 all degraded in different regime
- M1, M6, M7 persisted across regimes
- Regime differences explain mechanism instability

**Proposed Methodology**:
1. Define regime features (volatility level, clustering, volume profile)
2. Cluster periods by regime characteristics
3. Test regime stability over time
4. Validate regime detection on held-out data

**Expected Outcome**: Regime classifier that improves strategy allocation

**Priority**: HIGH

---

## Investigation Proposal 2: Mechanism Stability Index

**Title**: Mechanism Stability Index (MSI)

**Objective**: Quantify mechanism stability across time periods.

**Evidence Supporting Investigation**:
- Some mechanisms validated, others did not
- Need systematic way to track mechanism health
- MSI could inform capital allocation

**Proposed Methodology**:
1. Define stability metrics per mechanism
2. Track metrics across multiple periods
3. Calculate composite MSI
4. Use MSI to adjust position sizing

**Expected Outcome**: Quantitative mechanism health tracking

**Priority**: MEDIUM

---

## Investigation Proposal 3: Win Rate vs Mean Return Stability

**Title**: Win Rate vs Mean Return Stability Analysis

**Objective**: Understand why win rate is more stable than mean return.

**Evidence Supporting Investigation**:
- Discovery: 52% win rate, +0.011% mean
- Validation: 50% win rate, -0.019% mean
- Win rate more consistent than mean

**Proposed Methodology**:
1. Analyze distribution of individual trade returns
2. Compare variance of win/loss magnitudes
3. Test asymmetry in win/loss distribution
4. Model stability of each component

**Expected Outcome**: Understanding of what makes win rate stable

**Priority**: MEDIUM

---

## Investigation Proposal 4: Structural Mechanism Defense

**Title**: Why Structural Mechanisms Persist

**Objective**: Investigate why M1, M6, M7 validated while M2-M5 did not.

**Evidence Supporting Investigation**:
- M1 (Fat Tails): Statistical property of returns
- M6 (American Session): Physical trading hours
- M7 (Weekend Low): Human behavior pattern
- M2-M5: Behavioral market dynamics

**Proposed Methodology**:
1. Classify mechanisms by type (structural/behavioral)
2. Test classification on new datasets
3. Develop theory of mechanism persistence
4. Apply classification to new mechanisms

**Expected Outcome**: Mechanism classification framework

**Priority**: HIGH

---

## Investigation Proposal 5: Position Sizing Optimization

**Title**: Evidence-Weighted Position Sizing (EWPS) Optimization

**Objective**: Refine the EWPS methodology discovered in this experiment.

**Evidence Supporting Investigation**:
- EWPS produced 4-7% recommended position size
- Evidence quality is primary driver
- Regime uncertainty requires adjustment

**Proposed Methodology**:
1. Test EWPS on historical data
2. Optimize weight coefficients
3. Add new evidence sources
4. Validate on holdout periods

**Expected Outcome**: Refined position sizing methodology

**Priority**: MEDIUM

---

## Investigation Proposal 6: Multi-Regime Backtesting

**Title**: Strategy Performance Across Market Regimes

**Objective**: Test Momentum Fade strategy across bull/bear/sideways regimes.

**Evidence Supporting Investigation**:
- Validation period showed different behavior
- Regime may explain strategy inconsistency
- Need to understand regime-strategy interaction

**Proposed Methodology**:
1. Define bull/bear/sideways regimes
2. Identify historical regime periods
3. Test strategy in each regime
4. Develop regime-conditional strategy

**Expected Outcome**: Strategy robust to regime changes

**Priority**: HIGH

---

## Investigation Proposal 7: Mechanism Interaction Network

**Title**: Mechanism Interaction Network

**Objective**: Map dependencies between mechanisms.

**Evidence Supporting Investigation**:
- M2 (vol clustering) and M5 (vol persistence) may be related
- M3 (vol-vol coupling) may influence M2
- Need to understand mechanism relationships

**Proposed Methodology**:
1. Identify mechanism correlations
2. Map causal relationships
3. Identify key (hub) mechanisms
4. Test network structure over time

**Expected Outcome**: Mechanism dependency map

**Priority**: LOW

---

## Summary of Proposed Investigations

| ID | Investigation | Priority | Resource Estimate |
|----|---------------|----------|-------------------|
| INV-1 | Regime Detection | HIGH | 2-3 weeks |
| INV-2 | Mechanism Stability Index | MEDIUM | 1-2 weeks |
| INV-3 | Win Rate vs Mean Return | MEDIUM | 1 week |
| INV-4 | Structural Mechanism Defense | HIGH | 2-3 weeks |
| INV-5 | EWPS Optimization | MEDIUM | 1-2 weeks |
| INV-6 | Multi-Regime Backtesting | HIGH | 2-3 weeks |
| INV-7 | Mechanism Interaction Network | LOW | 1 week |

---

## Recommended Next Investigation

**INV-1: Regime Detection from First Principles**

**Rationale**:
- Would resolve uncertainty that caused mechanism failures
- Directly addresses capital allocation questions
- Could improve all future strategies

---

**Investigation Proposals Status**: COMPLETE
