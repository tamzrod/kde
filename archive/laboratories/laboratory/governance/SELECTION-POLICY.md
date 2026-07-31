# Selection Policy v1.1 - Trial Default

**Policy ID**: SELECTION-POLICY-001
**Version**: 1.1
**Status**: TRIAL (Active)
**Adopted**: 2026-07-23
**Source**: LAB-ENGINE-SEED-SELECT-001 (Follow-up)
**Review After**: 10 experiments or 2026-08-23

---

## Policy Adoption Record

| Field | Value |
|-------|-------|
| **Policy ID** | SELECTION-POLICY-001 |
| **Version** | 1.1 |
| **Status** | TRIAL (Active) |
| **Adopted Date** | 2026-07-23 |
| **Source Experiment** | LAB-ENGINE-SEED-SELECT-001 |
| **Override Allowed** | YES |
| **Review Trigger** | 10 experiments logged |

---

## Selection Policy v1.1

### SEED Selection

```
IF boundary-heavy OR confidence-critical OR evolved-discipline needed → S2
ELSE → S1
```

| Seed | When Selected |
|------|---------------|
| **S1** (Genesis) | Default for most problems |
| **S2** (Evolution) | Boundary-heavy, confidence-critical, or when S2's evolved discipline is needed |

### ENGINE Selection

```
IF diagnose/root-cause/regression/audit → Delta
ELIF design-harden/constrained-decision → Delta
ELIF diverge/brainstorm/option-gen → Gamma
ELIF routine-practical → Beta
ELIF historical-pattern → Alpha
ELIF bootstrap/meta-select/init → Delta
ELSE → Delta
```

| Engine | When Selected |
|--------|---------------|
| **Alpha** | Historical pattern analysis |
| **Beta** | Routine practical problems |
| **Gamma** | Divergent ideation, brainstorming, option generation |
| **Delta** | Diagnosis, root-cause, regression, audit, design hardening, constrained decisions, bootstrap/meta/init |

### MODE Selection

```
IF teaching/informal → md
ELIF mixed analysis → hybrid
ELSE → ir
```

| Mode | When Selected |
|------|---------------|
| **ir** | Default (investigative report format) |
| **hybrid** | Mixed analysis needed |
| **md** | Teaching or informal output |

---

## Override Mechanism

**Override is ALLOWED.**

When overriding the policy:
1. Document the reason for override in experiment metadata
2. Record in the selection tracking log
3. No approval required for override

Override example:
```
Engine Override: Used Beta instead of Delta for Problem X because [reason]
```

---

## Selection Tracking Log

**Track for next 10 experiments.**

| Experiment | Problem Type | Selected Seed | Selected Engine | Selected Mode | Override? | Override Reason |
|------------|--------------|---------------|-----------------|--------------|-----------|----------------|
| LAB-042 | Diagnosis | S1 | Delta | ir→hybrid | NO | ir not implemented |
| LAB-043 | | | | | | |
| LAB-044 | | | | | | |
| LAB-045 | | | | | | |
| LAB-046 | | | | | | |
| LAB-047 | | | | | | |
| LAB-048 | | | | | | |
| LAB-049 | | | | | | |
| LAB-050 | | | | | | |
| LAB-051 | | | | | | |

**Review Trigger**: When 10 experiments are logged, review policy effectiveness.

---

## Policy Complexity Constraint

**This policy shall NOT be made more complex.**

Additional rules, scoring systems, or decision matrices are PROHIBITED during the trial period.

If a problem type doesn't fit:
1. Default to ELSE clause (Delta for engine)
2. Document in override column
3. Do NOT add new rules

---

## Version History

| Version | Date | Change | Source |
|---------|------|--------|--------|
| 1.1 | 2026-07-23 | Initial trial adoption | LAB-ENGINE-SEED-SELECT-001 |
| 1.0 | 2026-07-23 | Policy design | LAB-ENGINE-SEED-SELECT-001 |

---

## Compliance

- [x] Override mechanism documented
- [x] Tracking log created
- [x] Complexity constraint set
- [x] Review trigger defined

---

*Status*: TRIAL ACTIVE
*Adopted*: 2026-07-23
*Review*: After 10 experiments logged
