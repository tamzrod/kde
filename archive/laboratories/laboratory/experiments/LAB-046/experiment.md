# LAB-046: Gamma Causal Repeatability Validation

**Experiment ID**: LAB-046
**Title**: Gamma Causal Repeatability Validation
**Date**: 2026-07-23
**Status**: COMPLETE
**Engine**: KDE-ENGINE-003 (Gamma)
**Seed**: SEED-001 (Genesis)
**Purpose**: Validate Gamma produces consistent causal discoveries across multiple runs

---

## Objective

Validate that Gamma produces consistent causal discoveries across multiple independent runs on the same problem. This experiment addresses the "repeatability" gap identified in LAB-045.

---

## Hypothesis

**H1**: Gamma will produce consistent causal hypotheses across 5 independent runs on the same problem.

**H2**: The causal mechanism identified by Gamma will be consistent across all runs.

**H3**: The confidence levels assigned by Gamma will be within acceptable variance across runs.

---

## Problem Statement

### Scenario: Electrical System Fault Investigation

**Problem**: An electrical distribution system has experienced intermittent faults. Investigate the root cause and causal mechanism.

**Evidence Available**:

| Evidence ID | Type | Description |
|-------------|------|-------------|
| EV-001 | Fault Log | 15 fault events over 30 days |
| EV-002 | Sensor Data | Temperature, voltage, current readings |
| EV-003 | Maintenance Records | Last 5 maintenance events |
| EV-004 | System Diagram | Single-line diagram |
| EV-005 | Weather Data | Correlation with high humidity days |
| EV-006 | Load Profile | Daily load patterns |
| EV-007 | Component Age | Age of key components |
| EV-008 | Error Codes | Diagnostic codes from events |

**Investigation Question**:
What is the causal mechanism by which environmental factors lead to electrical faults?

---

## Experimental Design

### Run Structure

| Run | Engine | Purpose |
|-----|--------|---------|
| RUN-001 | Gamma | Initial causal analysis |
| RUN-002 | Gamma | Repeat analysis (independent) |
| RUN-003 | Gamma | Repeat analysis (independent) |
| RUN-004 | Gamma | Repeat analysis (independent) |
| RUN-005 | Gamma | Repeat analysis (independent) |

### Isolation Requirements

Each run MUST:
- [ ] Use identical evidence (EV-001 through EV-008)
- [ ] NOT read previous Gamma runs
- [ ] NOT read Beta or Alpha runs
- [ ] Begin fresh investigation
- [ ] Document isolation verification

---

## Metrics for Repeatability

| Metric | Acceptable Variance |
|--------|---------------------|
| Primary causal hypothesis agreement | ≥80% |
| Mechanism steps agreement | ≥80% |
| Confidence level variance | ±10% |
| Confounder identification | ≥60% overlap |
| Intervention predictions | ≥60% overlap |

---

## Expected Outcomes

### If Hypothesis H1 is CONFIRMED
- Primary causal hypothesis is consistent across all 5 runs
- Evidence: ≥4 of 5 runs identify same root cause

### If Hypothesis H1 is REJECTED
- Primary causal hypothesis varies significantly across runs
- Evidence: <4 of 5 runs agree on root cause

---

## Evidence Sources

| Evidence | Content |
|----------|---------|
| EV-001 | Fault events correlate with high humidity (12/15 events) |
| EV-002 | Temperature spikes precede 8/15 faults by 2-4 hours |
| EV-003 | Insulation replaced 45 days ago |
| EV-004 | Cable runs through underground conduit |
| EV-005 | 10/15 faults on days with >80% humidity |
| EV-006 | Peak load hours (2-6 PM) correlate with 9/15 faults |
| EV-007 | Cable age: 12 years (expected life: 15 years) |
| EV-008 | Error codes indicate insulation degradation |

---

## Run Assignments

### RUN-001 through RUN-005

All runs use identical:
- Problem statement
- Evidence set
- Investigation question
- Isolation requirements

---

## Metadata

| Field | Value |
|-------|-------|
| Experiment ID | LAB-046 |
| Type | Validation Experiment |
| Engine | KDE-ENGINE-003 (Gamma) |
| Runs Planned | 5 |
| Hypothesis | H1: Consistent causal discovery |

---

*Experiment initiated per LAB-045 recommendation*
