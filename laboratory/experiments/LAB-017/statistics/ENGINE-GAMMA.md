# Engine Summary: GAMMA (KDE-ENGINE-003)

**Experiment ID**: LAB-017
**Engine**: KDE-ENGINE-003
**Runs**: RUN-011 to RUN-015
**Generated**: 2026-07-20

---

## ENGINE CHARACTERISTICS

| Aspect | Gamma Approach |
|--------|---------------|
| **Discovery Type** | Causal Knowledge Discovery |
| **Question** | "How does X causally lead to Y?" |
| **Confidence** | Causal (X% ± Y%) |
| **Context** | Required |
| **Boundaries** | Required |
| **Mechanism** | Explicit documentation |
| **Confounders** | Explicit analysis |
| **Intervention** | Prediction |

---

## RUN-BY-RUN METRICS

| Run | Causal Hypotheses | Mechanisms | Confounders | Interventions | Causal Confidence |
|-----|------------------|------------|-------------|---------------|-------------------|
| RUN-011 | 1 | 1 | 1 | 2 | 85% ± 8% |
| RUN-012 | 1 | 1 | 0 | 1 | 87% ± 6% |
| RUN-013 | 1 | 1 | 1 | 1 | 67% ± 18% |
| RUN-014 | 1 | 1 | 0 | 1 | 96% ± 2% |
| RUN-015 | 4 | 1 | 3 | 3 | 84% ± 7% |

---

## AGGREGATE METRICS

| Metric | Mean | StdDev | Min | Max |
|--------|------|--------|-----|-----|
| Causal Hypotheses | 1.6 | 1.2 | 1 | 4 |
| Mechanisms | 1.0 | 0.0 | 1 | 1 |
| Confounders | 1.0 | 1.1 | 0 | 3 |
| Interventions | 1.6 | 0.8 | 1 | 3 |
| Causal Confidence | 83.8% | 8.2% | 67% | 96% |

---

## CAUSAL HYPOTHESES

### Primary Causal Hypothesis

**CH-001: Upstream Flow Instability**

| Element | Value |
|---------|-------|
| Cause | Propellant feed system instability |
| Effect | Thrust oscillation in T3, T4 |
| Mechanism | Flow oscillation propagates to thrusters |
| Temporal | Simultaneous (cannot determine precedence) |
| Confidence | 85% ± 8% |

### Supporting Hypotheses

| CH | Hypothesis | Confidence | Status |
|----|-----------|------------|--------|
| CH-002 | High-demand trigger | 87% ± 6% | SUPPORTED |
| CH-003 | T4 maintenance cause | 67% ± 18% | UNCERTAIN |
| CH-004 | Self-correction mechanism | 96% ± 2% | VALIDATED |

---

## MECHANISM IDENTIFICATION

### Root Cause Mechanism

```
Step 1: High thrust demand (burn initiation)
        ↓
Step 2: Propellant feed system responds with oscillation
        ↓
Step 3: Flow oscillation reaches thrusters T3, T4
        ↓
Step 4: Thrusters convert flow oscillation to thrust oscillation
        ↓
Step 5: Self-regulation corrects flow after 12.3 seconds
```

**Mechanism Confidence**: 91% ± 5%

---

## CONFOUNDER ANALYSIS

### Confounders Addressed

| Confounder | Evidence | Adjustment | Residual |
|------------|----------|------------|----------|
| Bus voltage | EV-005 | YES (not involved) | None |
| Temperature | EV-003 | PARTIAL | Unknown |
| Maintenance state | EV-008 | PARTIAL | Unknown |
| Operational hours | EV-007 | YES (similar) | None |

---

## EFFECT ESTIMATION

### Average Treatment Effect

| Effect | Value | Confidence |
|--------|-------|------------|
| Oscillation amplitude | 28 mN | 85% ± 8% |
| T3 amplitude | 128 mN | 92% ± 4% |
| T4 amplitude | 158 mN | 93% ± 4% |
| Duration | 12.3s | 97% ± 2% |

---

## INTERVENTION PREDICTIONS

### Priority Interventions

| Intervention | Prediction | Confidence | Side Effects |
|-------------|------------|-----------|-------------|
| Optimize feed system | Reduced oscillation | 82% ± 10% | Minimal |
| Reduce demand rate | Prevention | 78% ± 12% | System redesign |
| Replace T4 | May reduce severity | 45% ± 30% | Cost, delay |

### Intervention Confidence Distribution

| Confidence Level | Interventions |
|-----------------|---------------|
| ≥ 80% | 1 (feed optimization) |
| 70-79% | 1 (demand reduction) |
| < 70% | 1 (T4 replacement) |

---

## CAUSAL ASSUMPTIONS

| Assumption | Type | Testable | Violation Consequence |
|------------|------|----------|---------------------|
| Flow causes thrust oscillation | Mechanism | Yes | Reversed causality |
| T3/T4 share feed system | Structural | Partial | Independent causes |
| Self-correction complete | Temporal | Yes | Recurrence |
| No unmeasured confounders | Causal sufficiency | Unknown | Bias |

---

## AMBIGUITY HANDLING (CAUSAL)

| Ambiguity | Type | Impact | Resolution |
|-----------|------|--------|------------|
| Specific feed component | Mechanism | HIGH | Requires inspection |
| T4 severity cause | Confounding | HIGH | Uncertain (67%) |
| Temporal precedence | Temporal | MEDIUM | Cannot determine |
| Recurrence probability | Prediction | MEDIUM | Requires monitoring |

---

## STRENGTHS OBSERVED

| Strength | Evidence |
|----------|----------|
| Causal hypothesis generation | 1.6 hypotheses/run |
| Mechanism documentation | Explicit step-by-step |
| Confounder analysis | Explicit adjustment |
| Intervention prediction | Actionable recommendations |
| Effect estimation | Quantified ATE |
| Causal confidence | Statistical + causal basis |

---

## WEAKNESSES OBSERVED

| Weakness | Evidence |
|----------|----------|
| Cannot prove causation | Observational data only |
| Temporal precedence uncertain | Simultaneous data |
| Confounder adjustment incomplete | Partial residual |
| Mechanism inference | Requires validation |

---

## FAILURE CASES

| Case | Evidence |
|------|----------|
| Cannot establish temporal precedence | EV-006 (simultaneous) |
| T4 maintenance correlation uncertain | 67% confidence |
| Cannot predict recurrence probability | No time-series data |

---

## REPRODUCIBILITY

| Metric | Value |
|--------|-------|
| Primary conclusion agreement | 100% (5/5 runs) |
| Mechanism agreement | 100% (5/5 runs) |
| Causal confidence consistency | 83.8% ± 8.2% |
| Intervention agreement | 100% (feed system priority) |

---

## ENGINE GAMMA ASSESSMENT

| Dimension | Assessment |
|-----------|------------|
| **Knowledge Discovery** | EXCELLENT - Causal hypotheses |
| **Evidence Quality** | HIGH - Causal analysis |
| **Reasoning Consistency** | HIGH - Stable mechanisms |
| **Confidence Calibration** | EXCELLENT - Causal + statistical |
| **Ambiguity Detection** | HIGH - Causal uncertainties |
| **Contradiction Detection** | MODERATE - Implicit in confounder analysis |
| **Reproducibility** | HIGH - Consistent mechanisms |
| **Novel Insights** | HIGH - Mechanisms and interventions |
| **Explainability** | EXCELLENT - Causal chain |
| **Engineering Value** | EXCELLENT - Actionable predictions |

---

## SUMMARY

Gamma successfully identified the causal mechanism of the propulsion anomaly, including a 5-step mechanism chain and intervention predictions. The engine demonstrated superior causal reasoning compared to Alpha and Beta, with explicit causal hypotheses, mechanism documentation, and effect estimations.

---

## Metadata

| Field | Value |
|-------|-------|
| Engine | KDE-ENGINE-003 |
| Codename | Gamma |
| Total Runs | 5 |
| Total Causal Hypotheses | 8 |
| Total Mechanisms | 5 |
| Total Confounders | 5 |
| Total Interventions | 8 |
| Mean Causal Confidence | 83.8% ± 8.2% |
