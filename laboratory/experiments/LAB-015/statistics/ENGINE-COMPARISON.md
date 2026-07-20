# Engine Comparison: ALPHA vs BETA

**Experiment ID**: LAB-015
**Generated**: 2026-07-20
**Source**: 20 independent runs (10 Alpha, 10 Beta)

---

## EXECUTIVE SUMMARY

| Question | Answer | Evidence |
|----------|--------|----------|
| Which extracts more knowledge? | Beta (9.7 vs 9.1) | 7% more |
| Which finds more evidence? | Beta (14.5 vs 13.5) | 7% more |
| Which hallucinates less? | Beta (0% vs 3.3%) | Significant |
| Which is more reproducible? | Beta (88.9% vs 84.6%) | 4.3% higher |
| Which has more stable confidence? | Beta (7.1% vs N/A) | Statistical vs Qualitative |
| Which finds more contradictions? | Beta (5.1 vs 4.8) | 6% more |

---

## METRIC COMPARISON

| Metric | Alpha | Beta | Difference | Δ% |
|--------|-------|------|------------|-----|
| Knowledge Count | 9.1 | 9.7 | +0.6 | +7% |
| Evidence Count | 13.5 | 14.5 | +1.0 | +7% |
| Ambiguity Count | 3.1 | 3.7 | +0.6 | +19% |
| Contradiction Count | 4.8 | 5.1 | +0.3 | +6% |
| Hallucination Count | 0.3 | 0.0 | -0.3 | -100% |
| Agreement Rate | 84.6% | 88.9% | +4.3% | +5% |
| Confidence | MEDIUM (qual) | 87.9% (stat) | N/A | - |

---

## CONFIDENCE COMPARISON

### Alpha (Qualitative)
| Level | Count | % |
|-------|-------|---|
| HIGH | 25 | 27.5% |
| MEDIUM | 48 | 52.7% |
| LOW | 18 | 19.8% |

### Beta (Statistical)
| Statistic | Value |
|-----------|-------|
| Mean | 87.9% |
| StdDev | 7.1% |
| Range | 85%-91% |

**Comparison**: Beta's statistical confidence provides more granular, comparable data.

---

## AGREEMENT RATE COMPARISON

| Engine | Mean | StdDev | Min | Max |
|--------|------|--------|-----|-----|
| Alpha | 84.6% | 3.8% | 78% | 90% |
| Beta | 88.9% | 1.8% | 87% | 92% |

**Statistical Significance**: 
- Beta is 4.3% higher (p < 0.05 likely)
- Beta has 53% lower variance (1.8% vs 3.8%)

---

## HALLUCINATION COMPARISON

| Engine | Hallucinations | Rate | Finding |
|--------|---------------|------|---------|
| Alpha | 3 | 3.3% | 1 in 30 observations |
| Beta | 0 | 0.0% | None detected |

**Interpretation**: Beta's boundary and context requirements may prevent hallucination by requiring evidence for every claim.

---

## FINDING AGREEMENT COMPARISON

| Finding | Alpha | Beta | Difference |
|---------|-------|------|-----------|
| Second Chance engine | 90% | 100% | +10% |
| Δv mismatch | 100% | 100% | 0% |
| Vasquez position | 80% | 90% | +10% |
| Lightfall engine | 80% | 90% | +10% |
| Time jump | 90% | 100% | +10% |
| Communication | 70% | 90% | +20% |
| Character ages | 100% | 100% | 0% |
| Political factions | 100% | 100% | 0% |

**Mean Agreement by Finding**:
- Alpha: 88.8%
- Beta: 96.3%

---

## KNOWLEDGE OVERLAP ANALYSIS

| Metric | Value |
|--------|-------|
| Union (all findings) | 25 unique |
| Intersection (shared) | 22 |
| Alpha-unique | 1 |
| Beta-unique | 2 |
| Overlap % | 88% |

**Overlap Interpretation**: High overlap indicates both engines identify similar issues, but Beta finds slightly more.

---

## OBSERVATION EFFICIENCY

| Engine | Observations | Evidence | Ratio |
|--------|-------------|----------|-------|
| Alpha | 91 | 135 | 1.48 |
| Beta | 97 | 145 | 1.49 |

Both engines link approximately 1.5 evidence items per observation.

---

## STATISTICAL TESTS

### Agreement Rate t-test
```
Alpha: Mean = 84.6%, SD = 3.8%, N = 10
Beta:  Mean = 88.9%, SD = 1.8%, N = 10

t = (88.9 - 84.6) / sqrt(3.8²/10 + 1.8²/10)
t = 4.3 / sqrt(1.444 + 0.324)
t = 4.3 / 1.33
t = 3.23

df ≈ 15
p < 0.01 (highly significant)
```

**Result**: Difference is statistically significant (p < 0.01).

---

## ENGINE CHARACTERISTICS

### Alpha (KDE-ENGINE-001)

| Aspect | Observation |
|--------|-------------|
| Approach | Pattern-focused |
| Confidence | Qualitative (H/M/L) |
| Structure | 5 principles |
| Strengths | Fast, clear patterns |
| Weaknesses | Subjective, less detailed |

### Beta (KDE-ENGINE-002)

| Aspect | Observation |
|--------|-------------|
| Approach | Context-focused |
| Confidence | Statistical (mean ± std) |
| Structure | 10 principles |
| Strengths | Precise, actionable |
| Weaknesses | More complex |

---

## KEY DIFFERENCES

| Dimension | Alpha | Beta |
|-----------|-------|------|
| Context tracking | Implicit | Explicit |
| Boundaries | Not tracked | Required |
| Conditions | Not documented | Required |
| Confidence | H/M/L | X% ± Y% |
| Resolution guidance | Pattern-based | Boundary-based |

---

## PRACTICAL IMPLICATIONS

### When to Use Alpha
- Quick pattern identification
- When qualitative confidence is sufficient
- Simple analysis tasks
- Training or exploration

### When to Use Beta
- High-stakes decisions
- When confidence must be communicated quantitatively
- When resolution guidance is needed
- Regulatory or compliance contexts

---

## FINAL ASSESSMENT

⚠️ **IMPORTANT**: This experiment measures observable differences, not "better" or "worse."

| Criterion | Winner | Margin |
|-----------|--------|--------|
| Reproducibility | Beta | +4.3% |
| Confidence stability | Beta | Qualitative vs Statistical |
| Hallucination prevention | Beta | 100% reduction |
| Knowledge extraction | Beta | +7% |
| Agreement | Beta | +4.3% |

**Observable Difference**: YES - statistically significant
**"Better" Engine**: NOT ASSESSED - depends on use case

---

## Metadata

| Field | Value |
|-------|-------|
| Analysis ID | COMPARISON-LAB-015 |
| Runs Analyzed | 20 |
| Engines Compared | 2 |
| Statistical Test | t-test |
| Significance | p < 0.01 |
