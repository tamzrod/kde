# Information DNA Gene Registry

**Document**: GENE-REGISTRY.md
**Genome Version**: 1.0
**Date**: 2026-07-19
**Total Genes**: 9

---

## Gene Registry

| Gene ID | Canonical Statement | Classification | Status | Confidence | Version |
|---------|-------------------|----------------|--------|------------|---------|
| GENE-0001 | Traceability principle applies universally | STABLE_CORE | ACTIVE | HIGH | 1 |
| GENE-0002 | Evidence-based nature is invariant | STABLE_CORE | ACTIVE | HIGH | 1 |
| GENE-0003 | 9-field structure enables systematic comparison | STABLE_CORE | ACTIVE | HIGH | 1 |
| GENE-0004 | Ambiguity identification works across domains | STABLE_CORE | ACTIVE | MEDIUM | 1 |
| GENE-0005 | Two-level DNA hierarchy exists | STABLE_CORE | ACTIVE | MEDIUM | 1 |
| GENE-0006 | Confidence thresholds are domain-dependent | DOMAIN_ADAPTER | ACTIVE | MEDIUM | 1 |
| GENE-0007 | Reproducibility definition varies by domain | DOMAIN_ADAPTER | ACTIVE | HIGH | 1 |
| GENE-0008 | Methodology has systematic weaknesses | EXPERIMENTAL | ACTIVE | MEDIUM | 1 |
| GENE-0009 | Applicability boundary exists between formal and interpretive domains | STABLE_CORE | ACTIVE | HIGH | 1 |

---

## Classification Summary

| Classification | Count | Genes |
|---------------|-------|-------|
| STABLE_CORE | 6 | GENE-0001, GENE-0002, GENE-0003, GENE-0004, GENE-0005, GENE-0009 |
| DOMAIN_ADAPTER | 2 | GENE-0006, GENE-0007 |
| EXPERIMENTAL | 1 | GENE-0008 |
| DEPRECATED | 0 | - |
| REJECTED | 0 | - |
| HYPOTHESIS | 0 | - |

---

## Status Summary

| Status | Count | Genes |
|--------|-------|-------|
| ACTIVE | 9 | All |
| SUPERSEDED | 0 | - |
| DEPRECATED | 0 | - |
| REJECTED | 0 | - |

---

## Confidence Summary

| Confidence | Count | Genes |
|------------|-------|-------|
| VERY_HIGH | 0 | - |
| HIGH | 5 | GENE-0001, GENE-0002, GENE-0003, GENE-0007, GENE-0009 |
| MEDIUM | 4 | GENE-0004, GENE-0005, GENE-0006, GENE-0008 |
| LOW | 0 | - |

---

## Origin Summary

| Experiment | Genes Produced |
|------------|----------------|
| LAB-011 | GENE-0001, GENE-0003, GENE-0004, GENE-0005 |
| LAB-012 | GENE-0006, GENE-0008 |
| LAB-013 | GENE-0002, GENE-0007, GENE-0009 |
| LAB-014 | (Genome Formation) |

---

## Gene-to-Source Mapping

| Gene ID | Source DNA | Origin Lab |
|---------|-----------|------------|
| GENE-0001 | SYN-METH-003 (traceability), SYN-BOUND-001 (stable core) | LAB-011, LAB-013 |
| GENE-0002 | SYN-BOUND-001 (evidence-based) | LAB-013 |
| GENE-0003 | SYN-METH-003 (9-field structure) | LAB-011 |
| GENE-0004 | SYN-BOUND-001 (ambiguity identification) | LAB-013 |
| GENE-0005 | SYN-METH-002 (two-level hierarchy) | LAB-011 |
| GENE-0006 | SYN-METH-004, SYN-VAL-001 (confidence thresholds) | LAB-011, LAB-012 |
| GENE-0007 | SYN-VAL-002, SYN-BOUND-002 (reproducibility) | LAB-012, LAB-013 |
| GENE-0008 | SYN-VAL-002 (systematic weaknesses) | LAB-012 |
| GENE-0009 | SYN-BOUND-003 (applicability boundary) | LAB-013 |

---

## Governance Status

| Status | Count | Genes |
|--------|-------|-------|
| APPROVED | 0 | - |
| PENDING | 9 | All |
| UNDER_REVIEW | 0 | - |
| REJECTED | 0 | - |

---

## Relationship Graph

```
STABLE_CORE (6 genes)
├── GENE-0001 (Traceability)
├── GENE-0002 (Evidence-based)
├── GENE-0003 (9-field structure)
├── GENE-0004 (Ambiguity ID)
├── GENE-0005 (Two-level hierarchy)
└── GENE-0009 (Applicability boundary)
    │
    ▼ REFINED BY
    │
DOMAIN_ADAPTER (2 genes)
├── GENE-0006 (Confidence thresholds)
└── GENE-0007 (Reproducibility)
    │
    ▼ RELATED TO
    │
EXPERIMENTAL (1 gene)
└── GENE-0008 (Systematic weaknesses)
```

---

## Quick Reference

### Find by Classification
- **STABLE_CORE**: Most validated, universal applicability
- **DOMAIN_ADAPTER**: Requires domain-specific calibration
- **EXPERIMENTAL**: Needs additional validation

### Find by Confidence
- **HIGH**: Strong evidence, validated
- **MEDIUM**: Some evidence, partial validation
- **LOW**: Limited evidence

### Find by Origin
- **LAB-011**: Foundational methodology DNA
- **LAB-012**: Validation refinements
- **LAB-013**: Boundary determination

---

## Last Updated

**Date**: 2026-07-19
**Updated By**: LAB-014 (Genome Formation)
**Next Update**: Upon Governance Approval
