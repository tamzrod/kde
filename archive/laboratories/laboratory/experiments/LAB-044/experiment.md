# LAB-044: Gamma vs Delta - Engine Comparison Experiment

**Experiment ID**: LAB-044
**Title**: Gamma vs Delta Engine Comparison
**Date**: 2026-07-23
**Status**: COMPLETE
**Engine**: KDE-ENGINE-002 (Beta) - Default (comparison task)
**Seed**: SEED-001 (Genesis)

---

## Objective

Compare Gamma (KDE-ENGINE-003) and Delta (KDE-ENGINE-004) on a problem requiring both causal reasoning and bootstrap initialization to determine:
1. Which engine better handles problems requiring both causal analysis AND reproducible initialization?
2. Do the engines complement or compete?
3. Should future engines combine both capabilities?

---

## Engine Profiles

### Gamma (KDE-ENGINE-003)

| Attribute | Value |
|-----------|-------|
| **Type** | Causal Discovery |
| **Discovery Question** | "How does X causally lead to Y?" |
| **Key Capabilities** | Mechanism identification, intervention prediction, confounder analysis |
| **Pipeline** | 8-stage (Evidence → Causal Discovery → Causal Knowledge) |
| **Status** | Experimental |

### Delta (KDE-ENGINE-004)

| Attribute | Value |
|-----------|-------|
| **Type** | Bootstrap-Enhanced Context Discovery |
| **Discovery Question** | "When does X correlate with Y?" |
| **Key Capabilities** | Deterministic bootstrap, authority transfer, reproducibility |
| **Pipeline** | Bootstrap + 6-stage (Evidence → Context → Knowledge) |
| **Status** | Experimental |

---

## Problem Statement

### Scenario: KDE Runtime Anomaly Investigation

**Problem**: The KDE Runtime has shown inconsistent behavior across sessions. Some sessions produce reproducible results while others show variance. Investigate the root cause.

**Evidence Available**:

| Evidence ID | Type | Description |
|-------------|------|-------------|
| EV-001 | Session Logs | 10 sessions with varying reproducibility |
| EV-002 | Runtime Config | Current Runtime configuration |
| EV-003 | Bootstrap Trace | Bootstrap execution traces |
| EV-004 | Engine Load Times | Time to initialize each engine |
| EV-005 | Authority Transfer | Records of authority transfer timing |
| EV-006 | Error Logs | Runtime errors and warnings |
| EV-007 | Policy Documents | Session override policies |
| EV-008 | Engine Specs | Gamma and Delta specifications |

**Investigation Tasks**:

1. Identify the root cause of session variance
2. Determine if bootstrap initialization affects reproducibility
3. Predict intervention outcomes to improve consistency
4. Document causal mechanism

---

## Experimental Design

### Run Structure

| Run | Engine | Purpose |
|-----|--------|---------|
| RUN-001 | Gamma | Causal analysis of variance |
| RUN-002 | Delta | Bootstrap-focused analysis |
| RUN-003 | Gamma | Repeat for reproducibility |
| RUN-004 | Delta | Repeat for reproducibility |

### Evaluation Criteria

| Criterion | Weight | Gamma Advantage | Delta Advantage |
|-----------|--------|----------------|----------------|
| Causal Analysis | 30% | HIGH | LOW |
| Bootstrap Enforcement | 20% | LOW | HIGH |
| Mechanism Documentation | 20% | HIGH | LOW |
| Intervention Prediction | 20% | HIGH | LOW |
| Reproducibility | 10% | MEDIUM | HIGH |

---

## Expected Outcomes

### If Gamma Outperforms

- Causal analysis is more valuable than bootstrap for this problem type
- Gamma should be recommended for root-cause investigations
- Delta's bootstrap adds minimal value for causal problems

### If Delta Outperforms

- Bootstrap initialization is critical for reproducibility
- Delta should be recommended for session initialization issues
- Gamma's causal analysis may be overkill

### If Neither Outperforms

- Problem requires both capabilities
- Future engine should combine Gamma + Delta
- Neither current engine is sufficient

---

## Run Assignments

### RUN-001: Gamma Analysis

**Engine**: KDE-ENGINE-003 (Gamma)
**Focus**: Causal analysis of session variance

### RUN-002: Delta Analysis

**Engine**: KDE-ENGINE-004 (Delta)
**Focus**: Bootstrap analysis of session variance

### RUN-003 & RUN-004: Reproducibility Check

Repeat runs to verify consistency within each engine.

---

## Metadata

| Field | Value |
|-------|-------|
| Experiment ID | LAB-044 |
| Type | Comparative Experiment |
| Engines Compared | Gamma (003) vs Delta (004) |
| Runs Planned | 4 (2 per engine) |
| Problem Domain | Runtime Investigation |

---

*Experiment initiated under Beta authority*
