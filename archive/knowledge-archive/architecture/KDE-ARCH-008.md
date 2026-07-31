# KDE-ARCH-008: Knowledge Promotion Rules

**Knowledge ID**: KDE-ARCH-008
**Title**: Rules for Promoting Knowledge from Laboratory to Knowledge Subsystem
**Version**: 1.0.0
**Status**: ESTABLISHED
**Evidence Level**: Level 3 — Reproducible
**Created**: 2026-07-20T14:00:00Z
**Last Validated**: 2026-07-20T14:00:00Z

---

## Definition

Validated Laboratory conclusions are promoted to the Knowledge subsystem through a rigorous evidence-based process. Knowledge promotion requires meeting defined maturity thresholds.

## Maturity Levels

| Level | Name | Description | Requirements |
|-------|------|-------------|--------------|
| 1 | Experimental | Single successful execution | 1 run |
| 2 | Repeatable | Multiple runs converge | 10+ runs, same Seed/Engine |
| 3 | Reproducible | Different methodologies converge | 60+ runs, different configurations |
| 4 | Generalized | Conclusion holds across domains | Domain validation |
| 5 | Established | No contradictory evidence | Sustained validation |

## Promotion Criteria

### Level 2 Promotion (Repeatable)

| Criterion | Threshold | Verification |
|-----------|-----------|--------------|
| Run Count | ≥10 runs | Count runs |
| Agreement Rate | ≥80% | Calculate statistics |
| Confidence | MEDIUM+ | Assess reasoning quality |

### Level 3 Promotion (Reproducible)

| Criterion | Threshold | Verification |
|-----------|-----------|--------------|
| Configurations | ≥2 different Seeds or Engines | Review configurations |
| Total Runs | ≥60 runs | Count runs |
| Directional Agreement | 100% | Calculate agreement |
| Confidence | HIGH | Assess all evidence |

### Level 4 Promotion (Generalized)

| Criterion | Threshold | Verification |
|-----------|-----------|--------------|
| Domain Coverage | ≥3 different domains | Review scope |
| Cross-Domain Agreement | ≥80% | Calculate agreement |
| Confidence | HIGH | Assess all evidence |

### Level 5 Promotion (Established)

| Criterion | Threshold | Verification |
|-----------|-----------|--------------|
| Sustained Validation | ≥6 months | Review timeline |
| Contradictory Evidence | None | Review all evidence |
| Community Acceptance | Documented | Review discussions |

## Promotion Process

### Step 1: Experiment Completion

1. All runs execute and complete
2. Statistics are generated
3. Synthesis is created
4. Recommendation is documented

### Step 2: Self-Assessment

```
Does the evidence support the conclusion?
    │
    ├──► YES → Proceed to peer review
    └──► NO → Revise conclusion or conduct more runs
```

### Step 3: Maturity Evaluation

1. Count runs and configurations
2. Calculate agreement rates
3. Assess confidence level
4. Determine eligible promotion level

### Step 4: Documentation

Promote knowledge by:
1. Creating entry in `/knowledge/`
2. Linking to original experiment
3. Recording maturity level
4. Documenting confidence

### Step 5: Governance Review (for Level 4+)

1. Submit promotion request to Governance
2. Present evidence summary
3. Address questions
4. Receive approval

## Anti-Patterns

The following are NOT valid promotion criteria:

| Anti-Pattern | Why Invalid |
|--------------|-------------|
| "One run succeeded" | Insufficient evidence |
| "Majority agreed" | No threshold, no confidence |
| "Previous experiments agreed" | No independence |
| "Engine recommends" | No evidence-based validation |
| "Seemed obvious" | Subjective, not empirical |

---

## Supporting Experiments

| Experiment | Purpose | Result |
|------------|---------|--------|
| LAB-020 | Architecture Synthesis | Promotion criteria identified |
| LAB-021 | Predictive Validation | Promotion process confirmed |
| LAB-022 | Multi-Run Validation | Level 2 criteria validated |
| LAB-023 | Cross-Engine Reproducibility | Level 3 criteria validated |

---

## Dependencies

- KDE-ARCH-001: Architecture C Specification
- KDE-ARCH-003: Artifact Lifecycle
- KDE-ARCH-006: Metadata Standard

---

## Related Knowledge

- KDE-ARCH-001: Architecture C Specification
- KDE-ARCH-003: Artifact Lifecycle
- KDE-ARCH-006: Metadata Standard
- KDE-ARCH-007: Timestamp Standard

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-07-20 | Initial established knowledge |

---

## Governance Authority

KDE-GOV-004: Knowledge maturity levels are mandatory.

KDE-GOV-005: Architecture is governed by evidence.

---

## Reference

- Architecture: [`laboratory/ARCHITECTURE-C.md`](../laboratory/ARCHITECTURE-C.md)
- Governance: [`laboratory/governance/promotion-rules.md`](../laboratory/governance/promotion-rules.md)
