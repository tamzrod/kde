# Comparative Analysis: ALPHA vs BETA vs GAMMA

**Experiment ID**: LAB-017
**Date**: 2026-07-20
**Source**: 15 independent runs (5 per engine)

---

## EXECUTIVE SUMMARY

This experiment compared three KDE reasoning engines (Alpha, Beta, Gamma) on the same problem: investigating a spacecraft propulsion system anomaly.

### Key Findings

| Finding | Evidence |
|---------|----------|
| All engines identified same root cause | 100% agreement |
| Confidence expression differs | Qualitative → Statistical → Causal |
| Causal reasoning increases actionability | Gamma provides interventions |
| Context/boundary awareness increases with engine maturity | Alpha → Beta → Gamma |

---

## COMPARISON TABLE

| Metric | Alpha | Beta | Gamma |
|--------|-------|------|-------|
| **Knowledge Discovery** | GOOD | EXCELLENT | EXCELLENT |
| **Evidence Quality** | HIGH | HIGH | HIGH |
| **Reasoning Consistency** | HIGH | HIGH | HIGH |
| **Confidence Calibration** | LOW | EXCELLENT | EXCELLENT |
| **Ambiguity Detection** | HIGH | HIGH | HIGH |
| **Contradiction Detection** | LOW | MODERATE | MODERATE |
| **Reproducibility** | HIGH | HIGH | HIGH |
| **Novel Insights** | MODERATE | MODERATE | HIGH |
| **Explainability** | HIGH | HIGH | EXCELLENT |
| **Engineering Value** | MODERATE | HIGH | EXCELLENT |

---

## 1. KNOWLEDGE DISCOVERY

### Alpha Approach
Pattern-based detection focusing on correlations.

**Output**: "T3 and T4 both oscillated" (correlation)

### Beta Approach
Contextual correlation detection.

**Output**: "T3 and T4 oscillate during high-demand operations" (contextual correlation)

### Gamma Approach
Causal mechanism identification.

**Output**: "High demand causes upstream flow oscillation, which causes T3/T4 thrust oscillation" (causal mechanism)

### Assessment

| Engine | Assessment | Evidence |
|--------|------------|----------|
| Alpha | GOOD | 3.8 knowledge/run, pattern-based |
| Beta | EXCELLENT | 2.4 knowledge/run with context |
| Gamma | EXCELLENT | 1.6 causal hypotheses with mechanisms |

---

## 2. EVIDENCE QUALITY

### Evidence Utilization

| Engine | Evidence Used | Provenance |
|--------|--------------|------------|
| Alpha | 10/10 | Basic |
| Beta | 10/10 | Full |
| Gamma | 10/10 | Full + Causal |

### Evidence Linking

| Engine | Evidence Chains | Quality |
|--------|-----------------|---------|
| Alpha | 3.8 per knowledge | Basic |
| Beta | Full per knowledge | Statistical |
| Gamma | Full per hypothesis | Causal |

### Assessment

All engines utilized all evidence with appropriate linking.

---

## 3. REASONING QUALITY

### Reasoning Approach

| Engine | Approach | Consistency |
|--------|----------|--------------|
| Alpha | Pattern → Correlation | HIGH (5/5 agree) |
| Beta | Context → Conditions | HIGH (5/5 agree) |
| Gamma | Causal → Mechanism | HIGH (5/5 agree) |

### Reasoning Trace Comparison

| Stage | Alpha | Beta | Gamma |
|-------|-------|------|-------|
| 1 | Evidence → Observation | Evidence → Observation | Evidence → Observation |
| 2 | Observation → Pattern | Observation → Pattern | Observation → Pattern |
| 3 | Pattern → Validation | Pattern → Statistical | Pattern → Validation |
| 4 | - | Pattern → Context | Statistical → Causal |
| 5 | - | Context → Boundary | Causal → Mechanism |
| 6 | - | - | Mechanism → Intervention |

### Assessment

| Engine | Assessment | Evidence |
|--------|------------|----------|
| Alpha | HIGH | Consistent conclusions |
| Beta | HIGH | Consistent + contextual |
| Gamma | HIGH | Consistent + causal |

---

## 4. CONFIDENCE CALIBRATION

### Confidence Expression

| Engine | Format | Example |
|--------|--------|---------|
| Alpha | Qualitative | MEDIUM |
| Beta | Statistical | 94% ± 3% |
| Gamma | Causal | 85% ± 8% (causal basis) |

### Confidence Metrics

| Engine | Mean | StdDev | Range |
|--------|------|--------|-------|
| Alpha | MEDIUM | N/A | LOW-MEDIUM |
| Beta | 88.0% | 5.6% | 67%-99% |
| Gamma | 83.8% | 8.2% | 67%-96% |

### Assessment

| Engine | Assessment | Evidence |
|--------|------------|----------|
| Alpha | LOW | Qualitative only |
| Beta | EXCELLENT | Quantitative uncertainty |
| Gamma | EXCELLENT | Quantitative + causal basis |

---

## 5. AMBIGUITY DETECTION

### Ambiguities Identified

| Engine | Ambiguities | Per Run | Impact |
|--------|-------------|---------|--------|
| Alpha | 15 | 3.0 | HIGH |
| Beta | 15+ | 3.0+ | HIGH |
| Gamma | 4+ | 4.0 | HIGH |

### Ambiguity Documentation

| Engine | Format | Completeness |
|--------|--------|--------------|
| Alpha | List | Basic |
| Beta | With conditions | Full |
| Gamma | With resolution path | Full + causal |

### Assessment

| Engine | Assessment | Evidence |
|--------|------------|----------|
| Alpha | HIGH | Strong documentation |
| Beta | HIGH | Conditions specified |
| Gamma | HIGH | Resolution paths |

---

## 6. CONTRADICTION DETECTION

### Contradictions Found

| Engine | Count | Handling |
|--------|-------|----------|
| Alpha | 0 | None |
| Beta | 0 | Boundaries substitute |
| Gamma | 0 | Confounder analysis |

### Assessment

All engines found no contradictions, which is consistent with a well-designed experiment.

---

## 7. REPRODUCIBILITY

### Primary Conclusion Agreement

| Engine | Agreement | Evidence |
|--------|-----------|----------|
| Alpha | 100% (5/5) | "Upstream cause" |
| Beta | 100% (5/5) | "Flow instability" |
| Gamma | 100% (5/5) | "Feed system" |

### Cross-Engine Agreement

| Comparison | Agreement | Evidence |
|------------|-----------|----------|
| Alpha vs Beta | 100% | Same root cause |
| Alpha vs Gamma | 100% | Same root cause |
| Beta vs Gamma | 100% | Same root cause |

### Assessment

| Engine | Assessment | Evidence |
|--------|------------|----------|
| Alpha | HIGH | 100% internal |
| Beta | HIGH | 100% internal |
| Gamma | HIGH | 100% internal + cross |

---

## 8. NOVEL INSIGHT GENERATION

### Unique Insights by Engine

| Engine | Insights | Examples |
|--------|----------|----------|
| Alpha | MODERATE | Pattern-based correlations |
| Beta | MODERATE | Context conditions, boundaries |
| Gamma | HIGH | Mechanisms, interventions |

### Engine-Specific Insights

| Engine | Novel Contribution |
|--------|-------------------|
| Alpha | Basic correlation identification |
| Beta | Trigger conditions, specificity boundaries |
| Gamma | 5-step mechanism, intervention predictions |

### Assessment

| Engine | Assessment | Evidence |
|--------|------------|----------|
| Alpha | MODERATE | Basic patterns |
| Beta | MODERATE | Context insight |
| Gamma | HIGH | Causal mechanisms |

---

## 9. EXPLAINABILITY

### Explanation Quality

| Engine | Format | Completeness |
|--------|--------|--------------|
| Alpha | Pattern statement | Basic |
| Beta | With context/boundaries | Full |
| Gamma | With mechanism/intervention | Complete |

### Mechanism Documentation

| Engine | Mechanism | Confidence |
|--------|-----------|------------|
| Alpha | No | N/A |
| Beta | No | N/A |
| Gamma | YES | 91% ± 5% |

### Assessment

| Engine | Assessment | Evidence |
|--------|------------|----------|
| Alpha | HIGH | Clear patterns |
| Beta | HIGH | Clear context |
| Gamma | EXCELLENT | Complete causal chain |

---

## 10. PRACTICAL ENGINEERING VALUE

### Recommendations Produced

| Engine | Recommendations | Actionability |
|--------|----------------|----------------|
| Alpha | 4 | General |
| Beta | 6 | Specific |
| Gamma | 8 | Prioritized + predicted |

### Intervention Predictions

| Engine | Interventions | Confidence | Side Effects |
|--------|---------------|------------|---------------|
| Alpha | 0 | N/A | N/A |
| Beta | 0 | N/A | N/A |
| Gamma | 3 | 45-82% | Documented |

### Assessment

| Engine | Assessment | Evidence |
|--------|------------|----------|
| Alpha | MODERATE | Actionable but vague |
| Beta | HIGH | Specific conditions |
| Gamma | EXCELLENT | Prioritized predictions |

---

## ENGINE CHARACTERIZATION

### Alpha: Pattern Discovery Engine

**Approach**: "Does X correlate with Y?"

**Best For**:
- Quick pattern identification
- Initial exploration
- Legacy compatibility

**Strengths**:
- Fast, simple reasoning
- Clear pattern identification
- Strong consistency

**Limitations**:
- No context specification
- Qualitative confidence
- No mechanism understanding

---

### Beta: Contextual Knowledge Engine

**Approach**: "When does X correlate with Y?"

**Best For**:
- Production experiments
- Statistical validation
- Boundary understanding

**Strengths**:
- Statistical confidence
- Context conditions
- Explicit boundaries

**Limitations**:
- No causal mechanism
- Cannot predict interventions
- Correlation only

---

### Gamma: Causal Discovery Engine

**Approach**: "How does X causally lead to Y?"

**Best For**:
- Root cause analysis
- Intervention planning
- Mechanism understanding

**Strengths**:
- Causal mechanisms
- Intervention predictions
- Effect estimation

**Limitations**:
- Requires more assumptions
- Cannot prove causation
- Higher complexity

---

## COMPLEMENTARY CHARACTERISTICS

### When to Use Each Engine

| Scenario | Recommended Engine |
|----------|-------------------|
| Quick exploration | Alpha |
| Statistical validation | Beta |
| Production decisions | Beta or Gamma |
| Root cause analysis | Gamma |
| Intervention planning | Gamma |
| Mechanism understanding | Gamma |

### Engine Combinations

| Combination | Synergy |
|-------------|---------|
| Alpha → Beta | Quick to validated |
| Beta → Gamma | Validated to causal |
| All three | Complete analysis |

---

## TRADE-OFF ANALYSIS

### Speed vs Completeness

| Engine | Speed | Completeness |
|--------|-------|-------------|
| Alpha | Fastest | Moderate |
| Beta | Medium | High |
| Gamma | Slowest | Highest |

### Simplicity vs Actionability

| Engine | Simplicity | Actionability |
|--------|------------|---------------|
| Alpha | Highest | Moderate |
| Beta | High | High |
| Gamma | Lowest | Highest |

---

## CONCLUSIONS

### Research Question Answer

**When solving the same problem under identical laboratory conditions, how do Alpha, Beta, and Gamma compare?**

**Answer**: All three engines converge on the same root cause (upstream propellant feed system), but differ in:
1. **Confidence expression**: Qualitative → Statistical → Causal
2. **Explanation depth**: Correlation → Context → Mechanism
3. **Actionability**: Recommendations → Conditions → Interventions

### Key Observations

1. **Convergence**: All engines agree on root cause (100%)
2. **Divergence**: Confidence and explanation sophistication differ
3. **Complementarity**: Each engine serves different purposes
4. **Progression**: Engine maturity increases with version

### Recommendations

| Situation | Engine | Rationale |
|-----------|--------|----------|
| Initial exploration | Alpha | Fast, clear |
| Production validation | Beta | Statistical, contextual |
| Decision support | Gamma | Causal, actionable |
| Root cause analysis | Gamma | Mechanisms, interventions |

---

## Metadata

| Field | Value |
|-------|-------|
| Analysis ID | COMPARISON-LAB-017 |
| Total Runs | 15 |
| Engines Compared | 3 |
| Agreement Rate | 100% |
| Primary Finding | Convergence with divergence in sophistication |
