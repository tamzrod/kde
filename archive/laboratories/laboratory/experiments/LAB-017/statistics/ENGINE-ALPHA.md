# Engine Summary: ALPHA (KDE-ENGINE-001)

**Experiment ID**: LAB-017
**Engine**: KDE-ENGINE-001
**Runs**: RUN-001 to RUN-005
**Generated**: 2026-07-20

---

## ENGINE CHARACTERISTICS

| Aspect | Alpha Approach |
|--------|----------------|
| **Discovery Type** | Pattern Detection |
| **Question** | "Does X correlate with Y?" |
| **Confidence** | Qualitative (HIGH/MEDIUM/LOW) |
| **Context** | None |
| **Boundaries** | None |

---

## RUN-BY-RUN METRICS

| Run | Patterns | Knowledge | Confidence | Ambiguities | Contradictions |
|-----|----------|-----------|------------|-------------|----------------|
| RUN-001 | 3 | 3 | MEDIUM | 3 | 0 |
| RUN-002 | 3 | 5 | MEDIUM | 3 | 0 |
| RUN-003 | 3 | 3 | MEDIUM | 3 | 0 |
| RUN-004 | 3 | 3 | LOW | 3 | 0 |
| RUN-005 | 4 | 5 | MEDIUM | 3 | 0 |

---

## AGGREGATE METRICS

| Metric | Mean | StdDev | Min | Max |
|--------|------|--------|-----|-----|
| Patterns per Run | 3.2 | 0.4 | 3 | 4 |
| Knowledge per Run | 3.8 | 1.0 | 3 | 5 |
| Confidence | MEDIUM | - | LOW | MEDIUM |
| Ambiguities | 3.0 | 0.0 | 3 | 3 |
| Contradictions | 0.0 | 0.0 | 0 | 0 |

---

## KNOWLEDGE DISCOVERED

### Consistent Knowledge (All Runs)

| Knowledge | Confidence | Evidence |
|-----------|------------|----------|
| Both T3 and T4 affected | HIGH | EV-001, EV-002 |
| Upstream cause suspected | MEDIUM | EV-004, EV-005 |
| Self-correction occurred | HIGH | EV-006, EV-010 |

### Variable Knowledge (Some Runs)

| Knowledge | Runs | Confidence |
|-----------|------|------------|
| Propellant flow oscillation | 4/5 | HIGH |
| T4 more severe | 2/5 | MEDIUM |
| Maintenance correlation | 1/5 | LOW |

---

## PATTERN DETECTION

### Patterns Identified

| Pattern | Runs Supporting | Evidence |
|---------|-----------------|----------|
| Upstream cause | 3/5 | EV-001,004,005 |
| T4 severity | 2/5 | EV-001,002,008 |
| Self-correction | 3/5 | EV-006,009,010 |
| Timing correlation | 1/5 | EV-006 |

---

## AMBIGUITY HANDLING

| Ambiguity | Runs Identifying | Impact |
|-----------|-----------------|--------|
| Root cause component unknown | 5/5 | HIGH |
| Why T3/T4 together | 4/5 | HIGH |
| T4 severity cause | 2/5 | MEDIUM |
| Recurrence probability | 1/5 | MEDIUM |

---

## CONTRADICTION DETECTION

**Contradictions Found**: 0

Alpha did not detect any contradictions in the evidence.

---

## ASSUMPTIONS

| Assumption | Runs Using | Confidence Impact |
|------------|-----------|-------------------|
| Telemetry accurate | 5/5 | Implicit HIGH |
| Oscillation real | 5/5 | Implicit HIGH |
| T3/T4 related | 3/5 | MEDIUM confidence |

---

## ROOT CAUSE HYPOTHESIS (ALPHA CONSENSUS)

**Primary Hypothesis**: Upstream propellant feed system instability

**Confidence**: MEDIUM

**Supporting Evidence**:
- Both thrusters affected simultaneously
- Flow oscillation correlates with thrust
- No bus anomalies
- Self-correction indicates system integrity

---

## STRENGTHS OBSERVED

| Strength | Evidence |
|----------|----------|
| Pattern identification | Strong - 3.2 patterns/run |
| Evidence utilization | Consistent - all evidence reviewed |
| Ambiguity detection | Strong - 3 ambiguities/run |
| Consistency | High - all runs agree on primary cause |
| Simplicity | Clear, direct reasoning |

---

## WEAKNESSES OBSERVED

| Weakness | Evidence |
|----------|----------|
| No context conditions | Cannot specify when patterns apply |
| No boundaries | Cannot define when patterns fail |
| Qualitative confidence | Cannot quantify uncertainty |
| Limited differentiation | Similar output across runs |

---

## FAILURE CASES

| Case | Evidence |
|------|----------|
| Cannot determine specific component | All runs |
| Cannot quantify T4 severity cause | 3/5 runs |
| Cannot predict recurrence | All runs |

---

## REPRODUCIBILITY

| Metric | Value |
|--------|-------|
| Primary conclusion agreement | 100% (5/5 runs) |
| Secondary conclusion agreement | 60% (3/5 runs) |
| Confidence consistency | MEDIUM (all runs) |
| Pattern consistency | HIGH (3.2 ± 0.4) |

---

## ENGINE ALPHA ASSESSMENT

| Dimension | Assessment |
|-----------|------------|
| **Knowledge Discovery** | GOOD - Pattern-based detection |
| **Evidence Quality** | HIGH - All evidence reviewed |
| **Reasoning Consistency** | HIGH - Consistent conclusions |
| **Confidence Calibration** | LOW - Qualitative only |
| **Ambiguity Detection** | HIGH - Strong documentation |
| **Contradiction Detection** | LOW - No contradictions found |
| **Reproducibility** | HIGH - Consistent results |
| **Novel Insights** | MODERATE - Similar across runs |
| **Explainability** | HIGH - Clear reasoning |
| **Engineering Value** | MODERATE - Actionable but limited |

---

## SUMMARY

Alpha successfully identified the upstream propellant feed system as the likely root cause with MEDIUM confidence. The engine demonstrated strong pattern detection and ambiguity identification but was limited by qualitative confidence assessment and lack of context/boundary specification.

---

## Metadata

| Field | Value |
|-------|-------|
| Engine | KDE-ENGINE-001 |
| Codename | Alpha |
| Total Runs | 5 |
| Total Patterns | 16 |
| Total Knowledge | 19 |
| Total Ambiguities | 15 |
| Total Contradictions | 0 |
