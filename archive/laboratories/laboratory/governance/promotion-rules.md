# Laboratory Promotion Rules

**Document Version**: 1.0.0
**Date**: 2026-07-20T13:00:00Z
**Status**: OFFICIAL
**Authority**: KDE Governance

---

## Purpose

These rules define how knowledge is promoted from the Laboratory to the Knowledge subsystem. They ensure scientific rigor while maintaining efficiency.

---

## Knowledge Maturity Levels

All Laboratory conclusions progress through maturity levels before becoming established knowledge:

| Level | Name | Description | Requirements |
|-------|------|-------------|--------------|
| Level 1 | Experimental | Single successful execution | 1 run |
| Level 2 | Repeatable | Multiple runs under same Seed/Engine converge | 10+ runs |
| Level 3 | Reproducible | Different Seeds and/or Engines converge | 60+ runs |
| Level 4 | Generalized | Conclusion holds across different domains | Domain validation |
| Level 5 | Established | No contradictory evidence exists | Sustained validation |

---

## Promotion Criteria

### For Any Promotion

| Criterion | Description | Verification |
|-----------|-------------|---------------|
| **Evidence Quality** | Claims trace to documented evidence | Review evidence files |
| **Logical Consistency** | Reasoning follows from evidence | Review analysis |
| **Assumption Management** | Assumptions are documented | Review experiment |
| **Completeness** | All dimensions addressed | Review scope |

### Level 2 Promotion (Repeatable)

| Criterion | Threshold | Verification |
|-----------|-----------|---------------|
| **Run Count** | ≥10 runs | Count runs |
| **Agreement Rate** | ≥80% | Calculate statistics |
| **Confidence** | MEDIUM+ | Assess reasoning quality |

### Level 3 Promotion (Reproducible)

| Criterion | Threshold | Verification |
|-----------|-----------|--------------|
| **Configurations** | ≥2 different Seeds or Engines | Review configurations |
| **Total Runs** | ≥60 runs | Count runs |
| **Directional Agreement** | 100% | Calculate agreement |
| **Confidence** | HIGH | Assess all evidence |

### Level 4 Promotion (Generalized)

| Criterion | Threshold | Verification |
|-----------|-----------|--------------|
| **Domain Coverage** | ≥3 different domains | Review scope |
| **Cross-Domain Agreement** | ≥80% | Calculate agreement |
| **Confidence** | HIGH | Assess all evidence |

### Level 5 Promotion (Established)

| Criterion | Threshold | Verification |
|-----------|-----------|--------------|
| **Sustained Validation** | ≥6 months | Review timeline |
| **Contradictory Evidence** | None | Review all evidence |
| **Community Acceptance** | Documented | Review discussions |

---

## Promotion Process

### Step 1: Experiment Completion

1. All runs execute and complete
2. Statistics are generated
3. Synthesis is created
4. Recommendation is documented

### Step 2: Self-Assessment

The experiment assesses itself:

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

---

## Promotion Checklist

### For Experimenter

- [ ] All runs completed
- [ ] Statistics generated
- [ ] Synthesis created
- [ ] Self-assessment documented
- [ ] Maturity level determined
- [ ] Evidence linked
- [ ] Conclusion clear

### For Governance

- [ ] Evidence reviewed
- [ ] Conclusions validated
- [ ] Promotion approved
- [ ] Knowledge entry created
- [ ] Historical reference preserved

---

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

## Escalation

### Low Confidence

If confidence is LOW:
1. Conduct more runs
2. Strengthen evidence
3. Re-assess

### Contradictory Evidence

If evidence contradicts conclusion:
1. Document contradiction
2. Investigate cause
3. Revise or reject conclusion

### Ambiguous Results

If results are ambiguous:
1. Clarify question
2. Narrow scope
3. Conduct targeted experiments

---

## Appeals

If a promotion is denied:

1. Review rejection reasons
2. Address identified issues
3. Submit revised evidence
4. Request re-evaluation

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2026-07-20 | Initial promotion rules | KDE Governance |

---

## Reference

- Architecture C: [`../ARCHITECTURE-C.md`](../ARCHITECTURE-C.md)
- Laboratory README: [`../README.md`](../README.md)
- Governance: [`../GOVERNANCE.md`](../GOVERNANCE.md)
