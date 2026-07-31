# Statistics: ENGINE-BETA (KDE-ENGINE-002)

**Experiment ID**: LAB-015
**Group**: B (Beta)
**Engine**: KDE-ENGINE-002
**Runs**: RUN-011 to RUN-020
**Generated**: 2026-07-20

---

## METRIC SUMMARY

| Metric | Mean | Median | StdDev | Min | Max |
|--------|------|--------|--------|-----|-----|
| Knowledge Count | 9.7 | 10.0 | 1.0 | 8 | 11 |
| Evidence Count | 14.5 | 15.0 | 1.3 | 12 | 16 |
| Ambiguity Count | 3.7 | 4.0 | 0.7 | 2 | 5 |
| Contradiction Count | 5.1 | 5.0 | 0.5 | 4 | 6 |
| Hallucination Count | 0.0 | 0.0 | 0.0 | 0 | 0 |
| Confidence Mean | 87.9% | 88.0% | - | - | - |
| Confidence StdDev | 7.1% | 6.8% | 1.4% | 4.8% | 9.1% |
| Agreement Rate | 88.9% | 88.5% | 1.8% | 87% | 92% |

---

## BETA-SPECIFIC METRICS

| Metric | Value |
|--------|-------|
| Statistical Confidence | REQUIRED |
| Context Tracking | ENABLED |
| Boundary Definition | REQUIRED |
| Conditions Documented | 100% |
| Hallucination Rate | 0% |
| Reproducibility | 88.9% |

---

## RUN-BY-RUN BREAKDOWN

| Run | Knowledge | Evidence | Ambiguity | Contradiction | Hallucination | Conf Mean | Conf Std | Agreement |
|-----|-----------|----------|-----------|---------------|---------------|-----------|----------|-----------|
| RUN-011 | 10 | 15 | 4 | 5 | 0 | 87% | 8.5% | 88% |
| RUN-012 | 9 | 14 | 4 | 5 | 0 | 89% | 7.2% | 90% |
| RUN-013 | 11 | 16 | 5 | 6 | 0 | 85% | 9.1% | 87% |
| RUN-014 | 10 | 15 | 4 | 5 | 0 | 88% | 6.8% | 89% |
| RUN-015 | 9 | 14 | 3 | 5 | 0 | 90% | 5.5% | 91% |
| RUN-016 | 10 | 15 | 4 | 5 | 0 | 87% | 7.8% | 88% |
| RUN-017 | 9 | 13 | 3 | 5 | 0 | 88% | 6.2% | 89% |
| RUN-018 | 8 | 12 | 2 | 4 | 0 | 91% | 4.8% | 92% |
| RUN-019 | 10 | 15 | 4 | 5 | 0 | 86% | 8.4% | 87% |
| RUN-020 | 11 | 16 | 4 | 6 | 0 | 88% | 7.1% | 89% |

---

## CONFIDENCE DISTRIBUTION (Beta)

| Statistic | Value |
|-----------|-------|
| Grand Mean | 87.9% |
| Grand StdDev | 7.1% |
| Median | 88.0% |
| Range | 85%-91% |
| Variance | 50.4%² |

---

## FINDINGS AGREEMENT (Beta)

| Finding | Runs Supporting | Mean Confidence | StdDev | Agreement |
|---------|-----------------|-----------------|--------|-----------|
| Second Chance engine NTR vs NSWR | 10/10 | 96% | 2.1% | 100% |
| Δv 12 km/s vs 5.1 km/s | 10/10 | 99% | 0.5% | 100% |
| Vasquez position contradiction | 9/10 | 92% | 3.0% | 90% |
| Lightfall engine mismatch | 9/10 | 85% | 5.2% | 90% |
| Time jump 7 vs 10 years | 10/10 | 93% | 3.0% | 100% |
| Communication delay issue | 9/10 | 90% | 4.5% | 90% |
| Character ages consistent | 10/10 | 95% | 2.5% | 100% |
| Political factions consistent | 10/10 | 94% | 3.0% | 100% |

---

## BOUNDARY ANALYSIS (Beta)

| Boundary Type | Count | Mean Confidence |
|----------------|-------|-----------------|
| Narrative vs Spec | 3 | 94% |
| Profile vs Scene | 2 | 90% |
| Premise vs Narrative | 2 | 88% |
| Calculation vs Claim | 2 | 98% |
| Other | 1 | 85% |

---

## CONDITIONS DOCUMENTED (Beta)

| Condition Type | Count | Documentation Rate |
|----------------|-------|---------------------|
| Temporal | 4 | 100% |
| Spatial | 2 | 100% |
| Contextual | 5 | 100% |
| Boundary | 3 | 100% |

---

## HALLUCINATION ANALYSIS (Beta)

| Run | Hallucination | Description |
|-----|---------------|-------------|
| (none) | - | - |

**Total Hallucinations**: 0 in 97 observations = **0.0%**

---

## REPRODUCIBILITY ASSESSMENT

| Criterion | Result |
|-----------|--------|
| Runs Completed | 10/10 |
| Mean Agreement | 88.9% |
| StdDev | 1.8% |
| Range | 87-92% |
| Confidence Stability | HIGH |
| Assessment | EXCELLENT |

---

## CONCLUSIONS

### Beta Strengths
- Statistical confidence for all findings
- Zero hallucinations
- Explicit boundary and context tracking
- More actionable resolution guidance
- Higher agreement rate (88.9% vs 84.6%)
- Lower confidence variance

### Beta Weaknesses
- More complex methodology
- Requires more documentation
- Slightly higher knowledge count (may indicate over-analysis)

---

## Metadata

| Field | Value |
|-------|-------|
| Engine | KDE-ENGINE-002 |
| Codename | Beta |
| Runs | 10 |
| Total Observations | 97 |
| Total Evidence | 145 |
| Total Boundaries | 10 |
| Total Conditions | 14 |
