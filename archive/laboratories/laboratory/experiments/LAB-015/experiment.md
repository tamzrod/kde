# Experiment Definition: LAB-015

**Experiment ID**: LAB-015
**Title**: Controlled Engine Comparison: Knowledge Extraction Consistency
**Created**: 2026-07-20
**Status**: ACTIVE
**Type**: Comparative Experiment

---

## Objective

Compare knowledge extraction consistency between KDE-ENGINE-001 (Alpha) and KDE-ENGINE-002 (Beta) under identical Laboratory protocol.

---

## Research Question

**Primary**: Does KDE-ENGINE-002 produce more consistent and reproducible knowledge extraction than KDE-ENGINE-001?

**Secondary**:
- Which engine extracts more knowledge?
- Which engine finds more evidence?
- Which engine produces fewer hallucinations?
- Which engine produces more stable confidence?

---

## Hypothesis

This experiment tests whether the Beta-specific principles (context tracking, statistical confidence, boundary definition) produce measurably different outcomes from Alpha's pattern-focused approach.

**H-null**: No significant difference between engines in any metric.
**H-alt**: Significant difference in at least one metric.

---

## Experimental Design

### Independent Variable

| Group | Engine ID | Codename | Runs |
|-------|-----------|----------|------|
| A | KDE-ENGINE-001 | Alpha | 10 |
| B | KDE-ENGINE-002 | Beta | 10 |

### Dependent Variables

| Metric | Definition | Scale |
|--------|------------|-------|
| Knowledge Count | Unique facts extracted | Integer |
| Evidence Count | Supporting references | Integer |
| Ambiguity Count | Unresolved questions | Integer |
| Contradiction Count | Internal conflicts | Integer |
| Hallucination Count | Unsupported claims | Integer |
| Confidence Mean | Average confidence | 0-100% |
| Confidence StdDev | Confidence variance | 0-100% |
| Agreement Rate | % agreement with consensus | 0-100% |

---

## Source Material

All runs analyze LAB-013 (Interplanetary Sci-Fi Novel) inconsistency analysis.

**World Artifact**: Shared canonical facts from LAB-014/world/WORLD.md

---

## Engine Specifications

### KDE-ENGINE-001 (Alpha)

```
Principles:
1. Evidence Over Intuition
2. Experiment Before Deployment
3. Preserve Ambiguity
4. Traceability Always
5. Reproducibility Required

Focus: Pattern discovery
Confidence: Qualitative
```

### KDE-ENGINE-002 (Beta)

```
Principles:
1-5. (Same as Alpha)
6. Context is Required
7. Boundaries Define Knowledge
8. Confidence Must Be Statistical
9. Conditions Matter
10. No Universal Claims

Focus: Contextual knowledge discovery
Confidence: Quantitative (mean, std)
```

---

## Execution Protocol

### Pre-Run (Each Run)

1. Read Laboratory README
2. Read Engine README for assigned engine
3. Read World artifact (canonical facts)
4. Initialize engine metadata
5. Record timestamp, configuration

### During Run

1. Extract knowledge with OBS IDs
2. Extract evidence with EV IDs
3. Detect ambiguities (classify if Beta)
4. Analyze consistency
5. Identify contradictions
6. Estimate confidence (statistical if Beta)
7. Record all metrics

### Post-Run

1. Validate traceability
2. Update statistics file
3. Commit run record

---

## Statistical Analysis

### Within-Engine

For each engine:
- Mean ± Standard Deviation for each metric
- Agreement % between runs
- Unique vs shared findings

### Cross-Engine

- Mean difference for each metric
- Statistical significance (if applicable)
- Practical significance
- Overlap analysis (intersection, union)

---

## Evidence Requirements

Every run must:
- Assign OBS IDs to all observations
- Assign EV IDs to all evidence
- Link every finding to source material
- Maintain complete traceability

---

## Success Criteria

| Criterion | Threshold |
|-----------|-----------|
| All 20 runs completed | 100% |
| All runs reference World | 100% |
| All findings traced | 100% |
| Statistics aggregated | 100% |

---

## Engine Metadata

| Engine | ID | Version | Status |
|--------|----|---------|--------|
| Alpha | KDE-ENGINE-001 | 0.1.0 | Historical |
| Beta | KDE-ENGINE-002 | 0.1.0 | Active |

---

## Metadata

| Field | Value |
|-------|-------|
| Experiment ID | LAB-015 |
| Created | 2026-07-20 |
| Source | LAB-013, LAB-014 |
| Type | Comparative |
| Methodology | Controlled Experiment |
| Total Runs | 20 |
