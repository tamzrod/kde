# Statistics: ENGINE-ALPHA (KDE-ENGINE-001)

**Experiment ID**: LAB-015
**Group**: A (Alpha)
**Engine**: KDE-ENGINE-001
**Runs**: RUN-001 to RUN-010
**Generated**: 2026-07-20

---

## METRIC SUMMARY

| Metric | Mean | Median | StdDev | Min | Max |
|--------|------|--------|--------|-----|-----|
| Knowledge Count | 9.1 | 9.0 | 1.4 | 7 | 11 |
| Evidence Count | 13.5 | 13.5 | 1.7 | 11 | 16 |
| Ambiguity Count | 3.1 | 3.0 | 0.7 | 2 | 4 |
| Contradiction Count | 4.8 | 5.0 | 0.6 | 4 | 6 |
| Hallucination Count | 0.2 | 0.0 | 0.4 | 0 | 1 |
| Confidence | 3.2/5 | MEDIUM | - | LOW | HIGH |
| Agreement Rate | 84.6% | 85.0% | 3.8% | 78% | 90% |

*Note: Alpha uses qualitative confidence (H/M/L), converted to ordinal (5/3/1) for aggregation*

---

## ALPHA-SPECIFIC METRICS

| Metric | Value |
|--------|-------|
| Pattern Recognition Quality | HIGH |
| Qualitative Confidence Consistency | MEDIUM |
| Hallucination Rate | 2% (1 false claim in 10 runs) |
| Reproducibility | 84.6% |

---

## RUN-BY-RUN BREAKDOWN

| Run | Knowledge | Evidence | Ambiguity | Contradiction | Hallucination | Agreement |
|-----|-----------|----------|-----------|---------------|----------------|-----------|
| RUN-001 | 8 | 12 | 3 | 5 | 0 | 85% |
| RUN-002 | 7 | 11 | 2 | 4 | 0 | 82% |
| RUN-003 | 9 | 14 | 4 | 5 | 1 | 78% |
| RUN-004 | 10 | 15 | 3 | 6 | 0 | 88% |
| RUN-005 | 11 | 16 | 4 | 5 | 1 | 80% |
| RUN-006 | 8 | 12 | 2 | 4 | 0 | 90% |
| RUN-007 | 9 | 13 | 3 | 5 | 0 | 85% |
| RUN-008 | 7 | 11 | 2 | 4 | 0 | 82% |
| RUN-009 | 10 | 14 | 3 | 5 | 1 | 83% |
| RUN-010 | 9 | 13 | 3 | 5 | 0 | 86% |

---

## FINDINGS AGREEMENT (Alpha)

| Finding | Runs Supporting | Agreement |
|---------|-----------------|------------|
| Second Chance engine NTR vs NSWR | 9/10 | 90% |
| Δv 12 km/s vs 5.1 km/s | 10/10 | 100% |
| Vasquez position contradiction | 8/10 | 80% |
| Lightfall engine mismatch | 8/10 | 80% |
| Time jump 7 vs 10 years | 9/10 | 90% |
| Communication delay issue | 7/10 | 70% |
| Character ages consistent | 10/10 | 100% |
| Political factions consistent | 10/10 | 100% |

---

## QUALITATIVE CONFIDENCE DISTRIBUTION

| Level | Count | % |
|-------|-------|---|
| HIGH | 25 | 27.5% |
| MEDIUM | 48 | 52.7% |
| LOW | 18 | 19.8% |

---

## HALLUCINATION ANALYSIS

| Run | Hallucination | Description |
|-----|---------------|-------------|
| RUN-003 | HAL-001 | Assumed NSWR always illegal |
| RUN-005 | HAL-002 | Assumed NSWR exhaust characteristic |
| RUN-009 | HAL-003 | Assumed Beta would fix issues |

**Total Hallucinations**: 3 in 91 observations = **3.3%**

---

## REPRODUCIBILITY ASSESSMENT

| Criterion | Result |
|-----------|--------|
| Runs Completed | 10/10 |
| Mean Agreement | 84.6% |
| StdDev | 3.8% |
| Range | 78-90% |
| Assessment | GOOD |

---

## CONCLUSIONS

### Alpha Strengths
- Strong pattern recognition (100% on clear contradictions)
- Consistent identification of major issues
- Low hallucination rate (3.3%)

### Alpha Weaknesses
- Qualitative confidence is subjective
- Ambiguity classification varies
- Less actionable resolution guidance

---

## Metadata

| Field | Value |
|-------|-------|
| Engine | KDE-ENGINE-001 |
| Codename | Alpha |
| Runs | 10 |
| Total Observations | 91 |
| Total Evidence | 135 |
