# Migration Inventory

**Document Version**: 1.0.0
**Date**: 2026-07-20T14:45:00Z
**Status**: COMPLETE
**Architecture**: Architecture C v1.0.0

---

## Executive Summary

This inventory documents all artifacts requiring migration to Architecture C v1.0.0. The migration is planned to preserve all information while implementing the new organizational structure.

### Inventory Summary

| Category | Count | Status |
|----------|-------|--------|
| Investigations | 10 | 0 migrated, 10 pending |
| Experiments | 19+ | 4 migrated (LAB-020-023), 15+ pending |
| Templates | 4 | 4 validated, 0 pending |
| Governance | 2+ | 2 created, 0 pending |

---

## Investigation Inventory

| ID | Current Location | Target Location | Status | Priority |
|----|------------------|-----------------|--------|----------|
| INV-001 | investigations/INV-001/ | investigations/INV-001/ | PENDING | HIGH |
| INV-002 | investigations/INV-002/ | investigations/INV-002/ | PENDING | MEDIUM |
| INV-003 | investigations/INV-003/ | investigations/INV-003/ | PENDING | MEDIUM |
| INV-004 | investigations/INV-004/ | investigations/INV-004/ | PENDING | LOW |
| INV-005 | investigations/INV-005/ | investigations/INV-005/ | PENDING | LOW |
| INV-006 | investigations/INV-006/ | investigations/INV-006/ | PENDING | LOW |
| INV-007 | investigations/INV-007/ | investigations/INV-007/ | PENDING | LOW |
| INV-008 | investigations/INV-008/ | investigations/INV-008/ | PENDING | LOW |
| INV-009 | investigations/INV-009/ | investigations/INV-009/ | PENDING | LOW |
| INV-010 | investigations/INV-010/ | investigations/INV-010/ | PENDING | LOW |

---

## Experiment Inventory

| ID | Current Location | Target Location | Dependencies | Status | Priority |
|----|------------------|-----------------|--------------|--------|----------|
| LAB-001 | experiments/LAB-001/ | experiments/LAB-001/ | INV-001 | PENDING | HIGH |
| LAB-002 | experiments/LAB-002/ | experiments/LAB-002/ | INV-001 | PENDING | HIGH |
| LAB-003 | experiments/LAB-003/ | experiments/LAB-003/ | INV-001 | PENDING | HIGH |
| LAB-004 | experiments/LAB-004/ | experiments/LAB-004/ | INV-001 | PENDING | HIGH |
| LAB-005 | experiments/LAB-005/ | experiments/LAB-005/ | INV-001 | PENDING | MEDIUM |
| LAB-006 | experiments/LAB-006/ | experiments/LAB-006/ | INV-002 | PENDING | MEDIUM |
| LAB-007 | experiments/LAB-007/ | experiments/LAB-007/ | INV-002 | PENDING | MEDIUM |
| LAB-007V | experiments/LAB-007V/ | experiments/LAB-007V/ | INV-002 | PENDING | MEDIUM |
| LAB-008 | experiments/LAB-008/ | experiments/LAB-008/ | INV-003 | PENDING | LOW |
| LAB-009 | experiments/LAB-009/ | experiments/LAB-009/ | INV-003 | PENDING | LOW |
| LAB-010 | experiments/LAB-010/ | experiments/LAB-010/ | INV-003 | PENDING | LOW |
| LAB-011 | experiments/LAB-011/ | experiments/LAB-011/ | INV-004 | PENDING | LOW |
| LAB-012 | experiments/LAB-012/ | experiments/LAB-012/ | INV-004 | PENDING | LOW |
| LAB-013 | experiments/LAB-013/ | experiments/LAB-013/ | INV-005 | PENDING | LOW |
| LAB-014 | experiments/LAB-014/ | experiments/LAB-014/ | INV-005 | PENDING | LOW |
| LAB-015 | experiments/LAB-015/ | experiments/LAB-015/ | INV-006 | PENDING | LOW |
| LAB-016 | experiments/LAB-016/ | experiments/LAB-016/ | INV-006 | PENDING | LOW |
| LAB-017 | experiments/LAB-017/ | experiments/LAB-017/ | INV-007 | PENDING | LOW |
| LAB-018 | experiments/LAB-018/ | experiments/LAB-018/ | INV-008 | PENDING | LOW |
| LAB-019 | experiments/LAB-019/ | experiments/LAB-019/ | INV-008 | PENDING | LOW |
| LAB-020 | experiments/LAB-020/ | experiments/LAB-020/ | Architecture | ✅ COMPLETE | - |
| LAB-021 | experiments/LAB-021/ | experiments/LAB-021/ | Architecture | ✅ COMPLETE | - |
| LAB-022 | experiments/LAB-022/ | experiments/LAB-022/ | Architecture | ✅ COMPLETE | - |
| LAB-023 | experiments/LAB-023/ | experiments/LAB-023/ | Architecture | ✅ COMPLETE | - |

---

## Migration Priority Classification

### HIGH Priority

**Rationale**: Core architecture validation experiments, must be preserved accurately.

| ID | Reason |
|----|--------|
| LAB-001 to LAB-004 | Related to INV-001 (What is Knowledge?) |
| LAB-020 to LAB-023 | Architecture C validation (COMPLETE) |

### MEDIUM Priority

**Rationale**: Important investigations but lower risk of data loss.

| ID | Reason |
|----|--------|
| LAB-005 to LAB-007V | Related to active investigations |

### LOW Priority

**Rationale**: Historical experiments, can be migrated later.

| ID | Reason |
|----|--------|
| LAB-008 to LAB-019 | Historical experiments |

---

## Migration Complexity Assessment

### Low Complexity

Artifacts that require minimal structural changes:
- Already in correct directory
- Just need metadata additions
- Link format updates

### Medium Complexity

Artifacts requiring structural reorganization:
- Need new directory structures
- Need bidirectional links created
- Need metadata files added

### High Complexity

Artifacts requiring significant reorganization:
- Deeply nested structures
- Multiple cross-references
- Complex dependencies

---

## Dependencies Matrix

| Investigation | Experiments | Evidence Count | Complexity |
|--------------|-------------|----------------|------------|
| INV-001 | LAB-001, LAB-002, LAB-003, LAB-004, LAB-005 | 5 | HIGH |
| INV-002 | LAB-006, LAB-007, LAB-007V | 3 | MEDIUM |
| INV-003 | LAB-008, LAB-009, LAB-010 | 3 | MEDIUM |
| INV-004 | LAB-011, LAB-012 | 2 | LOW |
| INV-005 | LAB-013, LAB-014 | 2 | LOW |
| INV-006 | LAB-015, LAB-016 | 2 | LOW |
| INV-007 | LAB-017 | 1 | LOW |
| INV-008 | LAB-018, LAB-019 | 2 | LOW |
| INV-009 | None | 0 | LOW |
| INV-010 | None | 0 | LOW |

---

## Reference

See also:
- [`MIGRATION-PLAN.md`](MIGRATION-PLAN.md)
- [`RISK-ASSESSMENT.md`](RISK-ASSESSMENT.md)
