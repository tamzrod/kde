# LAB-017: Experimental Problem

**Experiment ID**: LAB-017
**Problem**: Spacecraft Propulsion System Anomaly Investigation
**Date**: 2026-07-20

---

## PROBLEM STATEMENT

### Scenario: ISS-7 Propulsion System Anomaly

A spacecraft (ISS-7) has experienced an anomaly in its ion propulsion system during a routine orbital maneuver. You are the investigation team.

### Background

**ISS-7 Ion Propulsion System:**
- Xenon ion thruster array
- 8 thruster modules (numbered T1-T8)
- Nominal thrust: 250 mN per thruster
- Mission: Mars cargo delivery
- Crew: None (autonomous)
- Anomaly occurred: 2026-07-19, 14:32:17 UTC

### Anomaly Description

During orbital insertion burn at Mars approach:
- Thrusters T3 and T4 showed thrust oscillation
- T3: 250 mN → 180-310 mN (oscillating)
- T4: 250 mN → 120-380 mN (oscillating)
- Other thrusters remained nominal
- Oscillation frequency: ~47 Hz
- Duration: 12.3 seconds
- Self-corrected after 12.3 seconds
- Mission completed successfully but requires investigation

### Evidence Available

| Evidence ID | Type | Description |
|-------------|------|-------------|
| EV-001 | Telemetry Log | Full thruster telemetry during anomaly |
| EV-002 | Power Data | Power consumption data for T3, T4 |
| EV-003 | Temperature Log | Thruster housing temperatures |
| EV-004 | Propellant Flow | Xenon flow rate measurements |
| EV-005 | Environmental | Spacecraft bus voltages |
| EV-006 | Timeline | Sequence of events |
| EV-007 | Historical | Previous thruster performance data |
| EV-008 | Maintenance | Last maintenance record |
| EV-009 | Design Spec | Thruster design specifications |
| EV-010 | Error Codes | System error logs |

### Investigation Tasks

For each engine, produce:

1. **Knowledge Statements**: What caused the anomaly?
2. **Evidence Chain**: What evidence supports the conclusion?
3. **Confidence Level**: How certain is the conclusion?
4. **Ambiguities**: What remains uncertain?
5. **Contradictions**: Any conflicting evidence?
6. **Assumptions**: What assumptions were made?
7. **Recommendations**: What should be done?

---

## EVIDENCE DETAILS

### EV-001: Telemetry Log
```
[14:32:15.000] T1: 250.1 mN | T2: 249.8 mN | T3: 250.2 mN | T4: 249.9 mN
[14:32:16.000] T1: 250.0 mN | T2: 250.1 mN | T3: 250.0 mN | T4: 250.1 mN
[14:32:17.000] T1: 250.2 mN | T2: 249.9 mN | T3: 181-309 mN | T4: 122-378 mN
[14:32:17.012] T1: 249.8 mN | T2: 250.2 mN | T3: 192-287 mN | T4: 155-342 mN
[14:32:17.024] T1: 250.0 mN | T2: 250.1 mN | T3: 178-302 mN | T4: 131-365 mN
... (oscillation continues)
[14:32:29.300] T3: 250.0 mN | T4: 249.8 mN (stabilized)
```

### EV-002: Power Data
```
Time: 14:32:17 - 14:32:29
T3 Power: Normal 2.4 kW → Oscillating 1.8-3.1 kW
T4 Power: Normal 2.4 kW → Oscillating 1.2-3.8 kW
Bus Voltage: Stable at 400V (nominal)
```

### EV-003: Temperature Log
```
Pre-anomaly (14:32:10): T3: 847K | T4: 852K
During anomaly (14:32:17-29): T3: 847-856K | T4: 852-867K
Post-anomaly (14:32:30): T3: 848K | T4: 854K
```

### EV-004: Propellant Flow
```
T3 Flow: 2.1 mg/s nominal → 1.8-2.4 mg/s oscillating
T4 Flow: 2.1 mg/s nominal → 1.5-2.7 mg/s oscillating
Other thrusters: Stable at 2.1 mg/s
```

### EV-005: Environmental Data
```
Spacecraft Bus: 400.0V (nominal)
Solar Array Output: 12.4 kW (nominal)
Battery State: 87% (nominal)
No anomalies detected in bus systems
```

### EV-006: Event Timeline
```
14:32:15.000 - Nominal operation
14:32:16.500 - Mars approach burn initiated
14:32:17.000 - T3, T4 oscillation begins
14:32:29.300 - Oscillation ends, nominal operation
14:32:30.000 - Burn completed successfully
```

### EV-007: Historical Data
```
T3 - 847 operational hours, 3 previous anomalies (minor)
T4 - 892 operational hours, 1 previous anomaly (minor)
System-wide issues: None
```

### EV-008: Maintenance Record
```
Last Maintenance: 2026-06-15 (35 days ago)
T3 Service: Cathode replacement (45 days ago)
T4 Service: Full overhaul (92 days ago)
Maintenance window: Next scheduled 2026-08-01
```

### EV-009: Design Specifications
```
Thrust Oscillation Limit: ±5% (12.5 mN)
Oscillation Frequency Range: 40-60 Hz (nominal: 48 Hz)
Self-Correction: Yes (after 10 seconds max)
Fail-Safe: Automatic shutdown after 30 seconds
```

### EV-010: Error Codes
```
No error codes logged during anomaly
Self-correction successful
No hardware faults detected post-anomaly
```

---

## INVESTIGATION QUESTION

**Primary Question:**
What is the most likely cause of the T3 and T4 thrust oscillation anomaly?

**Secondary Questions:**
1. Was this a random event or systematic?
2. What is the recurrence probability?
3. What maintenance actions are recommended?

---

## EXPECTED OUTPUT

Each engine run should produce:

### Alpha Output
- Pattern identification (if any)
- Confidence level (H/M/L)
- Basic evidence linking

### Beta Output
- Context conditions
- Statistical confidence
- Boundary definitions
- Evidence with provenance

### Gamma Output
- Causal mechanism hypothesis
- Confounder analysis
- Effect estimation
- Intervention predictions

---

## EXPERIMENTAL CONTROLS

| Control | Method |
|---------|--------|
| Same problem | All engines investigate identical scenario |
| Same evidence | All engines receive identical evidence |
| Engine isolation | Engines do not see each other's outputs |
| Run independence | Each run is independent |

---

**Problem Approved**: Ready for engine execution
