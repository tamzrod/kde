# Knowledge Collection: LAB-010 - Power Plant Controller

**Domain**: Reactive Power Control
**Date**: 2026-07-19
**Status**: IN PROGRESS

---

## 1. Electrical Engineering Fundamentals

### Observations

| OBS-ID | Observation | Evidence | Classification |
|--------|-------------|----------|----------------|
| OBS-EE-001 | Reactive power (Q) measured in VAR | EE-001 | EVIDENCE |
| OBS-EE-002 | Voltage (V) measured in Volts | EE-001 | EVIDENCE |
| OBS-EE-003 | Current (I) measured in Amperes | EE-001 | EVIDENCE |
| OBS-EE-004 | Impedance (Z) relates V and I | EE-001 | EVIDENCE |
| OBS-EE-005 | Complex power S = P + jQ | EE-001 | EVIDENCE |
| OBS-EE-006 | Q = V² × B (for capacitive/inductive) | EE-001 | EVIDENCE |
| OBS-EE-007 | Grid voltage oscillates at 50/60 Hz | EE-001 | EVIDENCE |

### Evidence

| EV-ID | Source | Description |
|-------|--------|-------------|
| EE-001 | Electrical Engineering Fundamentals | Kirchhoff's laws, power equations |

### Equations

| EQ-ID | Equation | Source | Classification |
|-------|----------|--------|----------------|
| EQ-EE-001 | S = P + jQ | EE-001 | EVIDENCE |
| EQ-EE-002 | Q = V² × B | EE-001 | EVIDENCE |
| EQ-EE-003 | V = I × Z | EE-001 | EVIDENCE |

---

## 2. IEC 61850 / IEEE 1547 Standards

### Observations

| OBS-ID | Observation | Evidence | Classification |
|--------|-------------|----------|----------------|
| OBS-IEC-001 | POI voltage regulation required | IEC-001 | EVIDENCE |
| OBS-IEC-002 | Reactive power response time < 1s | IEEE-1547 | EVIDENCE |
| OBS-IEC-003 | Voltage deadband defined | IEC-001 | EVIDENCE |
| OBS-IEC-004 | Q = f(V) control characteristic | IEC-001 | EVIDENCE |
| OBS-IEC-005 | Voltage setpoint configurable | IEC-001 | EVIDENCE |
| OBS-IEC-006 | Reactive power limits configurable | IEEE-1547 | EVIDENCE |

### Evidence

| EV-ID | Source | Description |
|-------|--------|-------------|
| IEC-001 | IEC 61850-7-2 | Control and monitoring |
| IEEE-1547 | IEEE 1547-2018 | Interconnection standard |

### Control Characteristic

| EQ-ID | Equation | Source | Classification |
|-------|----------|--------|----------------|
| EQ-IEC-001 | Q_ref = K × (V_meas - V_set) | IEC-001 | EVIDENCE |
| EQ-IEC-002 | V_set ± deadband = limits | IEC-001 | EVIDENCE |

### Parameters

| PARAM-ID | Parameter | Value | Source | Classification |
|----------|-----------|-------|--------|----------------|
| P-001 | V_set | Configurable | IEC-001 | TUNABLE |
| P-002 | deadband | Configurable | IEC-001 | TUNABLE |
| P-003 | K (gain) | Configurable | IEC-001 | TUNABLE |
| P-004 | Q_max | Configurable | IEEE-1547 | TUNABLE |
| P-005 | Q_min | Configurable | IEEE-1547 | TUNABLE |

---

## 3. Control Theory

### Observations

| OBS-ID | Observation | Evidence | Classification |
|--------|-------------|----------|----------------|
| OBS-CT-001 | First-order system response | CT-001 | EVIDENCE |
| OBS-CT-002 | Time constant τ defines response | CT-001 | EVIDENCE |
| OBS-CT-003 | Step response: y(t) = K × (1 - e^(-t/τ)) | CT-001 | EVIDENCE |
| OBS-CT-004 | Measurement has delay | CT-001 | EVIDENCE |
| OBS-CT-005 | PI controller eliminates steady-state error | CT-001 | EVIDENCE |

### Evidence

| EV-ID | Source | Description |
|-------|--------|-------------|
| CT-001 | Control Systems Engineering | First-order systems, PI control |

### Equations

| EQ-ID | Equation | Source | Classification |
|-------|----------|--------|----------------|
| EQ-CT-001 | τ × dQ/dt + Q = Q_ref | CT-001 | EVIDENCE |
| EQ-CT-002 | Q_meas(t) = Q(t - T_delay) | CT-001 | EVIDENCE |
| EQ-CT-003 | Q_inverter = Q_ref × (1 - e^(-t/τ)) | CT-001 | EVIDENCE |

### Parameters

| PARAM-ID | Parameter | Source | Classification |
|----------|-----------|--------|----------------|
| P-006 | τ (time constant) | CT-001 | TUNABLE |
| P-007 | T_delay (measurement) | CT-001 | TUNABLE |

---

## 4. Grid Impedance Model

### Observations

| OBS-ID | Observation | Evidence | Classification |
|--------|-------------|----------|----------------|
| OBS-GRID-001 | Grid impedance affects voltage | GRID-001 | EVIDENCE |
| OBS-GRID-002 | Z = R + jX | GRID-001 | EVIDENCE |
| OBS-GRID-003 | X/R ratio varies by location | GRID-001 | ASSUMPTION |
| OBS-GRID-004 | Short-circuit ratio defines strength | GRID-001 | EVIDENCE |

### Evidence

| EV-ID | Source | Description |
|-------|--------|-------------|
| GRID-001 | Power System Analysis | Grid modeling |

### Equations

| EQ-ID | Equation | Source | Classification |
|-------|----------|--------|----------------|
| EQ-GRID-001 | V_POI = V_grid - I × Z | GRID-001 | EVIDENCE |
| EQ-GRID-002 | Z = R + jX | GRID-001 | EVIDENCE |

### Parameters

| PARAM-ID | Parameter | Source | Classification |
|----------|-----------|--------|----------------|
| P-008 | R (resistance) | GRID-001 | TUNABLE |
| P-009 | X (reactance) | GRID-001 | TUNABLE |
| P-010 | V_grid (source voltage) | GRID-001 | ASSUMPTION |

---

## 5. Unknown / Assumptions

### Unknown Parameters

| ID | Unknown | Justification |
|----|---------|---------------|
| U-001 | Grid voltage variation pattern | Not in sources |
| U-002 | Load variation | Not in sources |
| U-003 | Harmonics | Not in sources |
| U-004 | Fault conditions | Not in sources |

### Engineering Assumptions

| ID | Assumption | Rationale | Risk |
|----|-----------|-----------|------|
| A-001 | V_grid is constant 1.0 pu | Simplified model | MEDIUM |
| A-002 | Grid impedance is fixed | Simplified model | MEDIUM |
| A-003 | Linear response below limits | Control characteristic | LOW |
| A-004 | No communication delays | Local control | MEDIUM |

---

## 6. Consolidated Knowledge Summary

### States Identified

| State | Definition | Source | Classification |
|-------|------------|--------|----------------|
| S-001 | Q_actual | Current reactive power output | MEASURED |
| S-002 | Q_ref | Target reactive power | INTERNAL |
| S-003 | V_POI | POI voltage | MEASURED |
| S-004 | V_set | Voltage setpoint | CONFIGURABLE |

### Inputs Identified

| Input | Definition | Source | Classification |
|-------|------------|--------|----------------|
| I-001 | V_set | Voltage setpoint | TUNABLE |
| I-002 | V_grid | Source voltage | ASSUMPTION |

### Outputs Identified

| Output | Definition | Source | Classification |
|--------|------------|--------|----------------|
| O-001 | Q_ref | Reactive power reference | CONTROL OUTPUT |
| O-002 | V_POI | POI voltage | MONITOR OUTPUT |

### Internal Variables

| Variable | Definition | Source | Classification |
|----------|------------|--------|----------------|
| V-001 | Q_error | Voltage error | DERIVED |
| V-002 | Q_rate | Rate of change | DERIVED |

### Physical Relationships

| EQ-ID | Equation | Source | Classification |
|-------|----------|--------|----------------|
| EQ-001 | Q_error = V_meas - V_set | IEC | EVIDENCE |
| EQ-002 | Q_ref = K × Q_error | IEC | EVIDENCE |
| EQ-003 | dQ/dt = (Q_ref - Q)/τ | Control Theory | EVIDENCE |
| EQ-004 | V_POI = V_grid - f(Q, Z) | Grid | EVIDENCE |

### Constraints

| CON-ID | Constraint | Source | Classification |
|--------|------------|--------|----------------|
| C-001 | Q_min ≤ Q ≤ Q_max | IEEE-1547 | EVIDENCE |
| C-002 | V_min ≤ V_POI ≤ V_max | IEC | EVIDENCE |
| C-003 | |dQ/dt| ≤ rate_limit | IEEE-1547 | EVIDENCE |

---

## 7. Knowledge Assessment

### Evidence Quality

| Source | Quality | Coverage |
|--------|---------|----------|
| Electrical Engineering | HIGH | 3 equations |
| IEC 61850 / IEEE 1547 | HIGH | 2 equations, 5 parameters |
| Control Theory | HIGH | 3 equations, 2 parameters |
| Grid Modeling | MEDIUM | 2 equations, 3 parameters |

### Model Completeness

| Component | Knowledge | Gap |
|-----------|----------|-----|
| Control law | COMPLETE | None |
| Inverter response | PARTIAL | τ not specified |
| Grid model | PARTIAL | R, X not specified |
| Voltage calculation | COMPLETE | Equation known |
| Constraints | COMPLETE | IEEE limits |

### Readiness Assessment

**Sufficient knowledge for minimal model**: YES
**Gaps**: Grid parameters are tunable, not known
**Missing physics**: Harmonics, fault conditions (not needed for basic model)
