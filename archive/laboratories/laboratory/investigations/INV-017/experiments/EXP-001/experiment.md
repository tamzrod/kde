# EXP-001: Knowledge-on-Demand Decision Strategies

**Experiment ID**: EXP-001  
**Title**: Knowledge-on-Demand Decision Strategies  
**Parent Investigation**: INV-017 (Knowledge-on-Demand Architecture)  
**Status**: COMPLETE  
**Date**: 2026-07-21  
**Engine**: KDE-ENGINE-004 (Delta)  

---

## Purpose

This experiment evaluates different strategies for determining when KDE should retrieve previously acquired knowledge.

**Objective**: Determine which decision strategy produces the best balance between relevance, simplicity, and engineering effectiveness.

**Constraint**: This experiment does NOT implement a retrieval system. It evaluates decision strategies only.

---

## Research Question

> Which knowledge retrieval decision strategy produces the best balance between relevance, simplicity, and engineering effectiveness?

---

## Strategy Analysis

### Strategy A — Always Retrieve

#### Description
Every investigation loads all available knowledge before execution.

#### How It Operates
```
Investigation Start
    │
    ▼
Load ALL Knowledge Artifacts
    │
    ▼
Construct Investigation Context
    │
    ▼
Begin Investigation
```

#### Strengths
| Strength | Evidence |
|----------|----------|
| Maximum recall | All relevant knowledge included |
| Simple implementation | No decision logic required |
| Consistent behavior | Same action every time |
| No missed knowledge | Impossible to forget relevant artifacts |

#### Weaknesses
| Weakness | Evidence |
|----------|----------|
| Information overload | 14+ artifacts loaded every time |
| Token consumption | High context cost |
| Noise | Irrelevant knowledge dilutes context |
| Scalability | Degrades with knowledge base growth |
| Simple tasks penalized | Routine work incurs full overhead |

#### Implementation Complexity
- **Low**: No decision logic, just load everything

#### KDE Philosophy Alignment
- **Partial**: Simple but inefficient
- Violates "appropriate" retrieval from SOP-005

#### Evaluation Scores

| Criterion | Score | Justification |
|-----------|-------|---------------|
| Simplicity | 9/10 | No decision logic |
| Precision | 2/10 | High noise from irrelevant knowledge |
| Recall | 10/10 | All knowledge retrieved |
| Explainability | 10/10 | "Load everything" |
| Repeatability | 10/10 | Deterministic |
| Scalability | 2/10 | Degrades with knowledge growth |
| Engineering Value | 3/10 | Quality稀释 by noise |
| Governance Compliance | 3/10 | Violates SOP-005 retrieval matrix |
| **Total** | **49/90** | |

---

### Strategy B — Keyword Retrieval

#### Description
Retrieve knowledge matching keywords from the current investigation.

#### How It Operates
```
Investigation Start
    │
    ▼
Extract Keywords
    │
    ▼
Match Against Knowledge Index
    │
    ▼
Retrieve Matching Artifacts
    │
    ▼
Begin Investigation
```

#### Strengths
| Strength | Evidence |
|----------|----------|
| Targeted retrieval | Matches specific terms |
| Reduced noise | Only keyword-matched artifacts |
| Scalable | Index-based matching |
| Explainable | "Retrieved X because of keyword Y" |

#### Weaknesses
| Weakness | Evidence |
|----------|----------|
| Keyword brittleness | "SCADA" won't match "distribution" |
| False negatives | Relevant but unlabeled knowledge missed |
| False positives | Irrelevant matches on common terms |
| Maintenance burden | Index must be kept current |
| Context loss | Keywords miss semantic relationships |

#### Implementation Complexity
- **Medium**: Keyword extraction + index + matching

#### KDE Philosophy Alignment
- **Partial**: Simple matching but misses semantic knowledge

#### Evaluation Scores

| Criterion | Score | Justification |
|-----------|-------|---------------|
| Simplicity | 6/10 | Requires index maintenance |
| Precision | 5/10 | Some false positives |
| Recall | 5/10 | Keyword mismatches cause misses |
| Explainability | 8/10 | "Retrieved for keyword X" |
| Repeatability | 8/10 | Consistent matching |
| Scalability | 7/10 | Index-based matching |
| Engineering Value | 5/10 | Moderate noise and misses |
| Governance Compliance | 6/10 | Supports but not mandated |
| **Total** | **50/90** | |

---

### Strategy C — Complexity-Based Retrieval

#### Description
Estimate investigation complexity. Only retrieve knowledge when the task exceeds a predefined complexity threshold.

#### How It Operates
```
Investigation Start
    │
    ▼
Estimate Complexity
    │
    ├─── Low ──► Minimal Retrieval
    │
    └─── High ──► Full Retrieval
    │
    ▼
Begin Investigation
```

#### Strengths
| Strength | Evidence |
|----------|----------|
| Proportional effort | Complexity matches retrieval |
| Resource efficiency | Low-overhead for simple tasks |
| Scalable | Handles varied task types |
| Intuitive | Human-like prioritization |

#### Weaknesses
| Weakness | Evidence |
|----------|----------|
| Complexity estimation hard | What makes "complex"? |
| Threshold calibration | Who sets the threshold? |
| False negatives | Complex task misclassified as simple |
| False positives | Simple task misclassified as complex |
| Circular logic | Need knowledge to estimate complexity? |
| Threshold drift | Changes over time |

#### Implementation Complexity
- **High**: Requires complexity model + threshold definition

#### KDE Philosophy Alignment
- **Partial**: Attempts optimization but complex to define

#### Evaluation Scores

| Criterion | Score | Justification |
|-----------|-------|---------------|
| Simplicity | 3/10 | Complexity model required |
| Precision | 4/10 | Threshold causes errors |
| Recall | 6/10 | Variable based on classification |
| Explainability | 4/10 | Why is this complex/simple? |
| Repeatability | 5/10 | Classification varies |
| Scalability | 7/10 | Adapts to task type |
| Engineering Value | 5/10 | Proportional effort |
| Governance Compliance | 5/10 | Not defined in SOP |
| **Total** | **39/90** | |

---

### Strategy D — Engine-Decides

#### Description
Allow the active Engine to determine whether knowledge retrieval is required.

#### How It Operates
```
Investigation Start
    │
    ▼
Engine Reasoning
    │
    ├─── "I need knowledge" ──► Retrieve
    │
    └─── "I don't need knowledge" ──► Skip
    │
    ▼
Begin Investigation
```

#### Strengths
| Strength | Evidence |
|----------|----------|
| Contextual judgment | Engine considers task context |
| Flexible | Adapts to specific needs |
| Self-regulating | Engine knows what it needs |

#### Weaknesses
| Weakness | Evidence |
|----------|----------|
| Non-deterministic | Different engines = different decisions |
| Unmeasurable | Can't track retrieval rates |
| Ungovernable | No policy enforcement |
| Inconsistent | Depends on LLM randomness |
| Unpredictable | Same task may produce different retrieval |
| Inv-015 lesson ignored | We measured 0% retrieval when Engine decides |

#### Implementation Complexity
- **Low** (conceptually) / **N/A** (already exists)

#### KDE Philosophy Alignment
- **Poor**: This is what INV-015 showed doesn't work
- Evidence: INV-015 measured 0% retrieval rate with Engine deciding

#### Evaluation Scores

| Criterion | Score | Justification |
|-----------|-------|---------------|
| Simplicity | 9/10 | No mechanism needed |
| Precision | 2/10 | INV-015: 0% retrieval rate |
| Recall | 2/10 | INV-015: 0% retrieval rate |
| Explainability | 1/10 | "Engine decided" is not explainable |
| Repeatability | 1/10 | Non-deterministic |
| Scalability | 5/10 | Depends on engine |
| Engineering Value | 1/10 | Inv-015 showed no improvement |
| Governance Compliance | 1/10 | Violates SOP governance |
| **Total** | **22/90** | **LOWEST RANKED** |

---

### Strategy E — Hybrid (SOP-Based)

#### Description
Use Laboratory SOP to determine whether retrieval is necessary. If retrieval is required:
1. Identify the knowledge domain
2. Retrieve only relevant knowledge
3. Construct the investigation context

#### How It Operates
```
Investigation Start
    │
    ▼
Apply SOP-005 Retrieval Matrix
    │
    ▼
Determine Retrieval Context
    │
    ├─── Continuation ──► REQUIRED
    ├─── Similar ──► RECOMMENDED
    ├─── Novel ──► OPTIONAL
    └─── Routine ──► MINIMAL
    │
    ▼
Retrieve Based on Context
    │
    ▼
Document Retrieval Decision
    │
    ▼
Begin Investigation
```

#### Strengths
| Strength | Evidence |
|----------|----------|
| Governance-aligned | Built on SOP-005 |
| Proportional | Context determines retrieval |
| Explainable | "SOP says retrieval is REQUIRED" |
| Maintainable | Change policy, not code |
| Repeatable | Same context = same decision |
| Flexible | Handles multiple contexts |
| Evidence-based | Based on INV-015 findings |

#### Weaknesses
| Weakness | Evidence |
|----------|----------|
| Policy-dependent | Requires SOP-005 to exist |
| Context classification | Must determine correct context |
| Partial recall | "Optional" may be ignored |

#### Implementation Complexity
- **Medium**: Requires SOP enforcement + context classification

#### KDE Philosophy Alignment
- **Excellent**: Directly implements SOP-005
- Aligns with governance, not just engine reasoning

#### Evaluation Scores

| Criterion | Score | Justification |
|-----------|-------|---------------|
| Simplicity | 7/10 | Clear decision matrix |
| Precision | 8/10 | Context-based retrieval |
| Recall | 7/10 | Proportional to context |
| Explainability | 9/10 | "SOP-005 §5.2 requires retrieval" |
| Repeatability | 9/10 | Policy-driven, deterministic |
| Scalability | 8/10 | Context matrix scales |
| Engineering Value | 8/10 | Addresses INV-015 gap |
| Governance Compliance | 10/10 | Implements SOP-005 |
| **Total** | **66/90** | **HIGHEST RANKED** |

---

## Comparative Analysis

### Strategy Comparison Matrix

| Strategy | Simplicity | Precision | Recall | Explainability | Repeatability | Scalability | Engineering Value | Governance | **Total** |
|----------|------------|-----------|--------|----------------|---------------|-------------|-------------------|------------|-----------|
| A: Always | 9 | 2 | 10 | 10 | 10 | 2 | 3 | 3 | **49** |
| B: Keyword | 6 | 5 | 5 | 8 | 8 | 7 | 5 | 6 | **50** |
| C: Complexity | 3 | 4 | 6 | 4 | 5 | 7 | 5 | 5 | **39** |
| D: Engine | 9 | 2 | 2 | 1 | 1 | 5 | 1 | 1 | **22** |
| **E: Hybrid** | 7 | 8 | 7 | 9 | 9 | 8 | 8 | **10** | **66** |

### Ranking

| Rank | Strategy | Total | Recommendation |
|------|----------|-------|---------------|
| 1 | **E: Hybrid (SOP-Based)** | **66** | ✅ **RECOMMENDED** |
| 2 | B: Keyword | 50 | Alternative |
| 3 | A: Always | 49 | Simple fallback |
| 4 | C: Complexity | 39 | Rejected |
| 5 | D: Engine-Decides | 22 | ❌ **REJECTED** |

---

## Recommendation

### Adopt Strategy E — Hybrid (SOP-Based)

### Rationale

1. **Governance Alignment**: Directly implements SOP-005 Knowledge Retrieval Policy
2. **Evidence-Based**: Addresses INV-015 finding (0% retrieval when Engine decides)
3. **Explainable**: Decisions can be traced to specific SOP sections
4. **Repeatable**: Policy-driven, not model-dependent
5. **Maintainable**: Change policy (document), not code

### Evidence Supporting Recommendation

| Evidence | Source | Weight |
|----------|--------|--------|
| SOP-005 exists | Governance | High |
| INV-015 measured 0% for Engine-decides | INV-015 | High |
| Strategy D scored 22/90 | This experiment | High |
| Strategy E scored 66/90 | This experiment | High |

### Implementation Requirements

For INV-017 (Knowledge-on-Demand Architecture):

1. **SOP-005 Enforcement**: Runtime must apply retrieval matrix
2. **Context Classification**: Investigation provides context type
3. **Retrieval Documentation**: Log retrieval decisions per SOP-005
4. **Metrics**: Track retrieval rate by context type

### Alignment with KDE Philosophy

| Principle | Strategy E Alignment |
|-----------|---------------------|
| Governance owns policy | ✅ SOP defines retrieval |
| Engine reasons, doesn't decide policy | ✅ SOP-005 determines retrieval |
| Evidence-based | ✅ Based on INV-015 |
| Repeatable | ✅ Policy-driven |

---

## Lessons Learned

### What This Experiment Taught

1. **Engine-decides doesn't work**: INV-015 evidence confirmed by Strategy D's low score
2. **Always Retrieve is naive**: Simple but inefficient
3. **Keyword matching is brittle**: Misses semantic relationships
4. **Complexity-based is circular**: Need knowledge to estimate complexity
5. **SOP-based is best**: Governance-aligned, explainable, maintainable

### Key Insight

The best retrieval strategy is one that implements governance policy, not one that delegates to the Engine. The Engine should reason about retrieved knowledge, not decide whether to retrieve it.

---

## Follow-up Experiments

### Recommended

| Experiment | Purpose |
|------------|---------|
| EXP-002 | Validate context classification accuracy |
| EXP-003 | Measure retrieval rate with SOP-005 enforcement |
| EXP-004 | Compare SOP-based vs keyword retrieval |

---

## Experiment Completeness

| Requirement | Status |
|-------------|--------|
| All 5 strategies analyzed | ✅ |
| Comparison matrix produced | ✅ |
| Recommendation made | ✅ |
| Rationale documented | ✅ |
| Lessons learned captured | ✅ |
| Follow-up experiments proposed | ✅ |

---

**Experiment Status**: COMPLETE  
**Confidence**: HIGH (based on comparative analysis and evidence)  
**Recommendation**: Adopt Strategy E - Hybrid (SOP-Based)  
**Supporting Evidence**: INV-015, SOP-005, comparative matrix

---

*Generated by KDE under EXP-001*
*Evidence-based strategy evaluation*
