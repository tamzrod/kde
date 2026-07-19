# Model Specification: PPC Reactive Power Control

**Experiment**: LAB-010
**Date**: 2026-07-19
**Status**: SPECIFIED

---

## 1. Model Overview

**Purpose**: Minimal executable simulation of PPC reactive power control

**Scope**: Single inverter controlling reactive power to regulate POI voltage

**Boundaries**:
- Grid voltage (external)
- Reactive power output (controlled)
- POI voltage (regulated)

---

## 2. State Variables

| ID | State | Symbol | Unit | Type | Source |
|----|-------|--------|------|------|--------|
| S-001 | Inverter reactive power | Q | VAR | INTERNAL | EQ-CT-001 |
| S-002 | Voltage error | V_error | pu | DERIVED | EQ-001 |
| S-003 | POI voltage | V_POI | pu | OUTPUT | EQ-004 |

---

## 3. Inputs (Control)

| ID | Input | Symbol | Unit | Default | Classification |
|----|-------|--------|------|---------|---------------|
| I-001 | Voltage setpoint | V_set | pu | 1.00 | TUNABLE (P-001) |
| I-002 | Proportional gain | K_p | - | 1.0 | TUNABLE (P-003) |
| I-003 | Time constant | tau | s | 0.1 | TUNABLE (P-006) |

---

## 4. Outputs

| ID | Output | Symbol | Unit | Description |
|----|--------|--------|------|-------------|
| O-001 | Reactive power reference | Q_ref | VAR | Control target |
| O-002 | Actual reactive power | Q | VAR | System response |
| O-003 | POI voltage | V_POI | pu | Regulation result |

---

## 5. Internal Variables

| ID | Variable | Symbol | Unit | Equation | Classification |
|----|----------|--------|------|---------|---------------|
| V-001 | Voltage error | V_error | pu | V_meas - V_set | DERIVED |
| V-002 | Q reference before limits | Q_raw | VAR | K_p × V_error | COMPUTED |

---

## 6. Equations

### 6.1 Voltage Error Calculation

| Property | Value |
|----------|-------|
| Equation | V_error = V_meas - V_set |
| Symbol | V_error = V_meas - V_set |
| Source | EQ-001 (IEC 61850) |
| Classification | EVIDENCE |
| Justification | Standard proportional control error calculation |

### 6.2 Reactive Power Reference

| Property | Value |
|----------|-------|
| Equation | Q_ref = K_p × V_error |
| Symbol | Q_ref = K_p × V_error |
| Source | EQ-IEC-001 (IEC 61850) |
| Classification | EVIDENCE |
| Justification | Linear Q = f(V) characteristic per IEC standard |

### 6.3 Inverter Response (First Order)

| Property | Value |
|----------|-------|
| Equation | τ × dQ/dt + Q = Q_ref |
| Symbol | dQ/dt = (Q_ref - Q) / τ |
| Source | EQ-CT-001 (Control Theory) |
| Classification | EVIDENCE |
| Justification | First-order approximation of inverter dynamics |

### 6.4 POI Voltage (Simplified Grid Model)

| Property | Value |
|----------|-------|
| Equation | V_POI = V_grid - Q / (V × B) |
| Source | EQ-EE-002, EQ-GRID-001 |
| Classification | EVIDENCE + ASSUMPTION |
| Justification | Simplified voltage droop with grid impedance |

**ASSUMPTION**: Grid is strong (SCR > 5), simplified model sufficient

---

## 7. Constraints

| ID | Constraint | Equation | Source | Classification |
|----|------------|----------|--------|----------------|
| C-001 | Q max | Q_ref ≤ Q_max | IEEE-1547 | EVIDENCE |
| C-002 | Q min | Q_ref ≥ Q_min | IEEE-1547 | EVIDENCE |
| C-003 | Rate limit | |dQ/dt| ≤ rate_limit | IEEE-1547 | EVIDENCE |

### Constraint Parameters

| PARAM-ID | Parameter | Default | Source | Classification |
|----------|-----------|---------|--------|----------------|
| P-004 | Q_max | 100 VAR | IEEE-1547 | TUNABLE |
| P-005 | Q_min | -100 VAR | IEEE-1547 | TUNABLE |
| P-011 | rate_limit | 10 VAR/s | IEEE-1547 | TUNABLE |

---

## 8. State Diagram

```
                    ┌─────────────┐
                    │    START    │
                    └──────┬──────┘
                           │
                           ▼
                ┌─────────────────────┐
                │  Initialize States  │
                │  Q = 0              │
                │  V_set = 1.0 pu     │
                └──────────┬──────────┘
                           │
                           ▼
                   ┌──────────────┐
                   │  Read V_meas │
                   └──────┬───────┘
                          │
                          ▼
                ┌─────────────────────┐
                │  V_error = V_meas    │
                │       - V_set        │
                │  Q_ref = K_p × V_err │
                └──────────┬───────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │  Apply Constraints  │
                │  Q_ref = clamp      │
                │    (Q_min, Q_max)  │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │  Update Q            │
                │  dQ/dt = (Q_ref-Q)/τ │
                └──────────┬───────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │  Calculate V_POI   │
                │  V_POI = f(Q, Z)   │
                └──────────┬───────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │  Output Results     │
                │  Q, V_POI, Q_ref   │
                └──────────┬───────────┘
                           │
                           ▼
                    ┌────────────┐
                    │    LOOP    │
                    └────────────┘
```

---

## 9. Parameters Summary

| PARAM-ID | Parameter | Symbol | Default | Unit | Source | Classification |
|----------|-----------|--------|---------|------|--------|---------------|
| P-001 | Voltage setpoint | V_set | 1.00 | pu | IEC-001 | TUNABLE |
| P-003 | Proportional gain | K_p | 1.0 | - | IEC-001 | TUNABLE |
| P-004 | Q max | Q_max | 100 | VAR | IEEE-1547 | TUNABLE |
| P-005 | Q min | Q_min | -100 | VAR | IEEE-1547 | TUNABLE |
| P-006 | Time constant | τ | 0.1 | s | CT-001 | TUNABLE |
| P-010 | Grid voltage | V_grid | 1.00 | pu | GRID-001 | ASSUMPTION |
| P-011 | Rate limit | rate_limit | 10 | VAR/s | IEEE-1547 | TUNABLE |

---

## 10. Assumptions Register

| ID | Assumption | Evidence | Risk | Mitigation |
|----|-----------|----------|------|------------|
| A-001 | V_grid = 1.0 pu | Simplified model | MEDIUM | Document as tunable |
| A-002 | Strong grid (SCR > 5) | Grid strength | MEDIUM | Validate with data |
| A-003 | Linear response | Control theory | LOW | Standard approach |
| A-004 | No communication delay | Local control | MEDIUM | Document limitation |

---

## 11. Model Readiness

| Component | Status | Evidence |
|-----------|--------|----------|
| Control law | READY | EQ-001, EQ-IEC-001 |
| Inverter dynamics | READY | EQ-CT-001 |
| Grid model | READY (simplified) | EQ-EE-002 |
| Constraints | READY | C-001, C-002, C-003 |

**Conclusion**: Sufficient knowledge exists for minimal executable model
