# LAB-015: Controlled Engine Comparison

**Experiment ID**: LAB-015
**Title**: Knowledge Extraction Consistency: KDE-ENGINE-001 vs KDE-ENGINE-002
**Date**: 2026-07-20
**Status**: ACTIVE

---

## Research Question

Does KDE-ENGINE-002 produce more consistent and reproducible knowledge extraction than KDE-ENGINE-001 when operating under the exact same Laboratory protocol?

---

## Experimental Design

### Independent Variable
**Reasoning Engine**

| Group | Engine ID | Codename | Version |
|-------|-----------|----------|---------|
| A | KDE-ENGINE-001 | Alpha | 0.1.0 |
| B | KDE-ENGINE-002 | Beta | 0.1.0 |

### Dependent Variables

| Variable | Measurement |
|----------|-------------|
| Knowledge extracted | Count per run |
| Evidence extracted | Count per run |
| Ambiguities identified | Count per run |
| Contradictions found | Count per run |
| Hallucination rate | % of false claims |
| Reproducibility | Agreement % |
| Confidence | Mean ± StdDev |
| Statistical agreement | Cohen's Kappa |

### Controlled Variables

| Variable | Value |
|----------|-------|
| Source material | LAB-013 (same for all runs) |
| Laboratory Manual | ARCHITECTURE.md |
| Prompts | Identical |
| Execution protocol | Standardized |
| World artifact | Shared canonical facts |
| Experiment structure | Identical |

---

## Sample Size

| Group | Runs | Engine |
|-------|------|--------|
| A | RUN-001 to RUN-010 | KDE-ENGINE-001 (Alpha) |
| B | RUN-011 to RUN-020 | KDE-ENGINE-002 (Beta) |

**Total**: 20 independent runs

---

## Engine Comparison

### KDE-ENGINE-001 (Alpha)

| Aspect | Description |
|--------|-------------|
| Principles | 5 Core (Evidence, Experiment, Ambiguity, Traceability, Reproducibility) |
| Focus | Pattern discovery |
| Confidence | Subjective assessment |
| Ambiguity | Preserved but not quantified |
| Context | Not explicitly tracked |

### KDE-ENGINE-002 (Beta)

| Aspect | Description |
|--------|-------------|
| Principles | 10 Core (5 Alpha + 5 Beta-specific) |
| Focus | Contextual knowledge discovery |
| Confidence | Statistical (mean, std dev) |
| Ambiguity | Classified and quantified |
| Context | Boundary and condition tracking |

---

## Protocol

Each run must:
1. Read World artifact (canonical facts)
2. Extract knowledge with OBS IDs
3. Extract evidence with EV IDs
4. Detect ambiguities
5. Analyze consistency
6. Estimate confidence
7. Record metrics

---

## Expected Outputs

| File | Description |
|------|-------------|
| README.md | This file |
| experiment.md | Full experiment definition |
| runs/engine-alpha/RUN-001.md...RUN-010.md | Alpha runs |
| runs/engine-beta/RUN-011.md...RUN-020.md | Beta runs |
| statistics/ENGINE-ALPHA.md | Alpha statistics |
| statistics/ENGINE-BETA.md | Beta statistics |
| statistics/ENGINE-COMPARISON.md | Cross-engine analysis |
| analysis/FINAL-REPORT.md | Conclusions |

---

## Success Criteria

⚠️ **IMPORTANT**: This experiment does NOT prove either engine is "better."

It measures **observable differences** using reproducible Laboratory methodology.

Every conclusion MUST reference run IDs and evidence IDs.

Unsupported conclusions are **prohibited**.
