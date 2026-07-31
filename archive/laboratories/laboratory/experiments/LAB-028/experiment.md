# Experiment: LAB-028 — Classification Mechanism Falsification

**Experiment ID**: LAB-028
**Date**: 2026-07-21
**Status**: ACTIVE
**Type**: Falsification Experiment

---

## Objective

Evaluate whether the current Knowledge Repository classification mechanism can consistently classify knowledge domains.

**This is NOT** a reclassification exercise. The goal is to test whether the decision mechanism is logically consistent.

---

## Hypothesis

**H₀ (Null)**: The current classification mechanism is internally consistent. If concepts are classified differently, there exists an objective criterion that distinguishes them.

**H₁**: The current classification mechanism may classify similar concepts differently because the classification criteria are insufficient or internally inconsistent.

---

## Research Questions

1. What defines a Knowledge Domain?
2. What defines an Architectural Knowledge Area?
3. Can independent reviewers consistently reproduce the same classifications using only the documented rules?
4. Do similar concepts receive similar classifications?
5. Does terminology influence classification?

---

## Experiment Design

### Independent Reviewers

Three reviewers (R1, R2, R3) independently classify 10 concepts using only the documented rules from `KDE-KNOWLEDGE-CLASSIFICATION-RULES.md`.

### Concepts to Classify

```
Desktop Runtime
Visualization
GIS
Networking
Database
Operating System
Microservices
Event-Driven Systems
Compiler
Machine Learning
```

### Classification Options

For each concept, reviewers determine:
- **Domain** — Application guidance for a specific area
- **Architecture** — System-level specifications
- **Both** — Contains elements of both
- **Neither** — Does not fit classification criteria

### Success Criteria

The mechanism succeeds only if:
1. Independent reviewers reach similar conclusions
2. Identical criteria produce identical classifications
3. Every classification is supported by explicit rules
4. No concept requires subjective interpretation

---

## Evaluation

### Phase 1: Independent Classification

Each reviewer classifies independently without seeing others' answers.

### Phase 2: Comparison

Compare classifications across reviewers.

### Phase 3: Falsification Attempt

Attempt to find:
- Inconsistencies
- Hidden assumptions
- Terminology bias
- Subjective interpretation

---

## Status

| Phase | Status |
|-------|--------|
| Phase 1: Independent Classification | ✅ Complete |
| Phase 2: Comparison | ✅ Complete |
| Phase 3: Falsification | ✅ Complete |
| Phase 4: Analysis | ✅ Complete |

---

## Conclusion

**The classification mechanism was falsified.** The experiment demonstrated that:

1. Independent reviewers agreed 60% of the time
2. Hidden assumptions exist that are not documented
3. Terminology influences classification
4. General-purpose technologies cannot be consistently classified

**The mechanism requires revision** — specifically, the addition of explicit guidance for ambiguous concepts.

---

## Files

| Document | Description |
|----------|-------------|
| `experiment.md` | Experiment overview |
| `reviewer-1.md` | Independent classification |
| `reviewer-2.md` | Independent classification |
| `reviewer-3.md` | Independent classification |
| `comparison.md` | Classification comparison |
| `falsification.md` | Falsification attempt |
| `recommendation.md` | Final recommendation |
