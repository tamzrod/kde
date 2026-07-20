# KDE-ENGINE-003 (Gamma) Specification

**Engine ID**: KDE-ENGINE-003
**Version**: 0.1.0
**Codename**: Gamma
**Status**: Experimental
**Effective Date**: 2026-07-20

---

## Engine Identity

| Field | Value |
|-------|-------|
| **Engine ID** | KDE-ENGINE-003 |
| **Name** | Causal Knowledge Discovery Engine |
| **Codename** | Gamma |
| **Version** | 0.1.0 |
| **Status** | Experimental |
| **Type** | Causal Inference Engine |
| **Created** | 2026-07-20 |

---

## Purpose

KDE-ENGINE-003 (Gamma) is a causal knowledge discovery engine that extends pattern detection to causal inference. While Alpha discovers correlations and Beta discovers contextual correlations, Gamma discovers causal mechanisms.

**Gamma's Discovery Question:**
```
What is the causal mechanism by which X leads to Y?
How would intervening on X change Y?
```

---

## Scope

### What Gamma Does

1. **Causal Discovery**: Identifies potential causal relationships from observational and experimental data
2. **Causal Modeling**: Constructs causal diagrams representing mechanisms
3. **Intervention Prediction**: Predicts outcomes of hypothetical interventions
4. **Confounding Analysis**: Identifies and accounts for confounding variables
5. **Causal Strength Estimation**: Quantifies the magnitude of causal effects

### What Gamma Does NOT Do

1. **Does not prove causation from correlation alone**: Requires additional evidence or assumptions
2. **Does not guarantee correct causal models**: Models are hypotheses requiring validation
3. **Does not replace randomized controlled trials**: Provides guidance for experimental design
4. **Does not handle all types of causal complexity**: Limited to specified causal structures

### Relationship to Previous Engines

| Engine | Discovery Type | Question |
|--------|---------------|----------|
| **Alpha** | Pattern Discovery | "Does X correlate with Y?" |
| **Beta** | Context Discovery | "When does X correlate with Y?" |
| **Gamma** | Causal Discovery | "How does X causally lead to Y?" |

---

## Core Innovation

### The Causal Discovery Gap

**Alpha** answers: "Does X correlate with Y?"
- Output: Correlation detected

**Beta** answers: "Under what conditions does X correlate with Y?"
- Output: Correlation with context

**Gamma** answers: "What mechanism causes X to affect Y?"
- Output: Causal mechanism with intervention prediction

### Why Causal Discovery Matters

| Question Type | Use Case |
|--------------|----------|
| Correlation | "Is X associated with Y?" |
| Prediction | "Given X, what is Y?" |
| Explanation | "Why does X affect Y?" |
| Intervention | "How can we change Y by changing X?" |

Gamma enables the last two: explanation and intervention.

---

## Engine Lifecycle

### Status Definitions

| Status | Description |
|--------|-------------|
| **Experimental** | New engine, validating methodology |
| **Active** | Validated, available for experiments |
| **Historical** | Superseded by newer engine |
| **Deprecated** | Not recommended for use |

### Current Status

**Gamma is currently in Experimental status.**

---

## Engine Hierarchy

```
KDE-ENGINE-001 (Alpha)     — Pattern Discovery
        │
        ▼
KDE-ENGINE-002 (Beta)    — Context Discovery
        │
        ▼
KDE-ENGINE-003 (Gamma)    — Causal Discovery
```

---

## Documentation

| Document | Purpose |
|----------|---------|
| specification.md | Engine identity and scope |
| methodology.md | Causal discovery methodology |
| pipeline.md | Processing pipeline |
| knowledge-model.md | Knowledge object structure |
| changes.md | Version history |
| provenance.md | Engine lineage |
| README.md | Overview and quick reference |

---

## Compatibility

| Aspect | Status |
|--------|--------|
| **Interface** | Compatible with KDE Engine Interface v1.0 |
| **Laboratory** | Compatible with Laboratory Protocol |
| **Output** | Compatible with Knowledge Object schema |
| **Previous Engines** | Gamma builds on Beta methodology |

---

## Experimental Maturity

| Dimension | Level |
|------------|-------|
| Theoretical Foundation | High |
| Methodology Validation | Pending |
| Empirical Testing | Pending |
| Production Readiness | Not yet |

**Note**: Gamma is released as Experimental to enable validation through laboratory experiments.

---

## Related Documents

- [Engine Framework](../README.md) — Framework overview
- [Engine Interface](../interface.md) — Standard interface
- [Alpha Specification](../alpha/specification.md) — Alpha engine
- [Beta Specification](../beta/specification.md) — Beta engine
- [Future Engines](../future-engines.md) — Engine roadmap

---

**Document Status**: EXPERIMENTAL
**Review Date**: Upon completion of validation experiments
