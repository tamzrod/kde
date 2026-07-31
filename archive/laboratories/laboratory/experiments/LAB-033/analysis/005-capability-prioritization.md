# Capability Prioritization: LAB-033

**Analysis Date**: 2026-07-22
**Experiment**: LAB-033
**Status**: COMPLETE

---

## Prioritization Framework

### Prioritization Criteria

| Criterion | Weight | Description |
|-----------|--------|-------------|
| Gap Severity | HIGH | Impact if capability is missing |
| Detected in LAB-031 | HIGH | Directly observed issue |
| Reproducibility Impact | HIGH | Effect on reproducibility claims |
| Implementation Complexity | MEDIUM | Effort to implement |
| Blocking Potential | HIGH | Prevents downstream errors |

---

## Capability Priority Matrix

| Priority | Capability | Severity | LAB-031 | Impact | Complexity |
|---------|-----------|----------|---------|--------|------------|
| P1 | Consistency Validator | HIGH | YES | HIGH | LOW |
| P1 | Metadata Validator | MEDIUM | NO | HIGH | LOW |
| P2 | Provenance Validator | MEDIUM | NO | MEDIUM | MEDIUM |
| P2 | Classification Validator | MEDIUM | YES | MEDIUM | LOW |
| P2 | Cross-Artifact Validator | MEDIUM | NO | MEDIUM | MEDIUM |
| P3 | Confidence Validator | MEDIUM | NO | MEDIUM | MEDIUM |
| P3 | Runtime Rule Validator | MEDIUM-HIGH | YES | MEDIUM | LOW |
| P4 | Report Validator | MEDIUM | NO | LOW | MEDIUM |
| P4 | Registry Validator | LOW | NO | LOW | LOW |

**Legend**: P1 = Must implement first, P2 = Implement next, P3 = Implement after P1-P2, P4 = Implement last or optionally

---

## Priority 1: Must Implement (P1)

### 1. Consistency Validator

| Attribute | Value |
|-----------|-------|
| Priority | P1 |
| Severity | HIGH |
| LAB-031 Issue | YES (18 < 19) |
| Impact | Detects contradictions between declared and reported values |
| Complexity | LOW |
| Blocking | ERROR |

**Justification**:
- Directly detected in LAB-031
- HIGH severity gap
- Simple numeric comparison
- Prevents logical errors

**Required for**: All experiments with quantitative claims

---

### 2. Metadata Validator

| Attribute | Value |
|-----------|-------|
| Priority | P1 |
| Severity | MEDIUM |
| LAB-031 Issue | NO |
| Impact | Ensures basic artifact structure |
| Complexity | LOW |
| Blocking | ERROR |

**Justification**:
- Essential for reproducibility
- Simple schema validation
- Required for SHA-256 integrity checks
- Foundation for other validators

**Required for**: All artifacts

---

## Priority 2: Implement After P1 (P2)

### 3. Provenance Validator

| Attribute | Value |
|-----------|-------|
| Priority | P2 |
| Severity | MEDIUM |
| LAB-031 Issue | NO (implied) |
| Impact | Ensures evidence source is documented |
| Complexity | MEDIUM |
| Blocking | ERROR |

**Justification**:
- Required for reproducibility
- Supports confidence validation
- Medium implementation complexity
- Validates important metadata

**Required for**: All quantitative evidence

---

### 4. Classification Validator

| Attribute | Value |
|-----------|-------|
| Priority | P2 |
| Severity | MEDIUM |
| LAB-031 Issue | YES ("measurement" vs "simulated") |
| Impact | Prevents evidence type misclassification |
| Complexity | LOW |
| Blocking | WARNING |

**Justification**:
- Directly detected in LAB-031
- Simple pattern matching
- Prevents misleading classification
- Warns rather than blocks

**Required for**: All evidence artifacts

---

### 5. Cross-Artifact Validator

| Attribute | Value |
|-----------|-------|
| Priority | P2 |
| Severity | MEDIUM |
| LAB-031 Issue | NO |
| Impact | Ensures consistency across experiment artifacts |
| Complexity | MEDIUM |
| Blocking | WARNING |

**Justification**:
- Ensures experiment coherence
- Detects orphaned artifacts
- Validates reference integrity
- Warns rather than blocks

**Required for**: Multi-artifact experiments

---

## Priority 3: Implement After P1-P2 (P3)

### 6. Confidence Validator

| Attribute | Value |
|-----------|-------|
| Priority | P3 |
| Severity | MEDIUM |
| LAB-031 Issue | NO (implied) |
| Impact | Prevents unjustified confidence claims |
| Complexity | MEDIUM |
| Blocking | WARNING |

**Justification**:
- Supports evidence quality transparency
- Depends on provenance validation
- Constraint matrix implementation
- Warns rather than blocks

**Required for**: Experiments with confidence claims

---

### 7. Runtime Rule Validator

| Attribute | Value |
|-----------|-------|
| Priority | P3 |
| Severity | MEDIUM-HIGH |
| LAB-031 Issue | YES (efficiency > 100%) |
| Impact | Enforces integrity constraints |
| Complexity | LOW |
| Blocking | ERROR |

**Justification**:
- Directly addresses LAB-031 efficiency issue
- Simple rule evaluation
- Prevents impossible claims
- High impact, low complexity

**Required for**: All experiments with numeric claims

---

## Priority 4: Implement Last or Optionally (P4)

### 8. Report Validator

| Attribute | Value |
|-----------|-------|
| Priority | P4 |
| Severity | MEDIUM |
| LAB-031 Issue | NO |
| Impact | Ensures conclusions supported by evidence |
| Complexity | MEDIUM |
| Blocking | WARNING |

**Justification**:
- Low impact if confidence validator is strong
- Complex claim-to-evidence mapping
- Requires sophisticated extraction
- Warns rather than blocks

**Required for**: Experiments with formal reports (optional for others)

---

### 9. Registry Validator

| Attribute | Value |
|-----------|-------|
| Priority | P4 |
| Severity | LOW |
| LAB-031 Issue | NO |
| Impact | Maintains repository consistency |
| Complexity | LOW |
| Blocking | ERROR |

**Justification**:
- Low severity issues if missing
- Simple state comparison
- Last stage before publication
- Errors block registration

**Required for**: Repository registration

---

## Implementation Roadmap

### Immediate (Week 1)

| Capability | Tasks |
|-----------|-------|
| Consistency Validator | Numeric comparison rules, bounds definitions |
| Metadata Validator | Schema definition, required fields |

### Short-term (Weeks 2-3)

| Capability | Tasks |
|-----------|-------|
| Provenance Validator | Provenance schema, type validation |
| Classification Validator | Pattern definitions, qualifier detection |
| Cross-Artifact Validator | Reference graph, orphaned detection |

### Medium-term (Weeks 4-5)

| Capability | Tasks |
|-----------|-------|
| Confidence Validator | Constraint matrix, provenance integration |
| Runtime Rule Validator | Rule definitions, bounds checking |

### Long-term (Weeks 6-8)

| Capability | Tasks |
|-----------|-------|
| Report Validator | Claim extraction, evidence mapping |
| Registry Validator | State comparison, consistency checking |

---

## Mandatory vs. Optional Summary

### Mandatory (Must Implement)

| # | Capability | Blocking | Priority |
|---|-----------|----------|----------|
| 1 | Consistency Validator | ERROR | P1 |
| 2 | Metadata Validator | ERROR | P1 |
| 3 | Provenance Validator | ERROR | P2 |
| 4 | Cross-Artifact Validator | WARNING | P2 |
| 5 | Runtime Rule Validator | ERROR | P3 |
| 6 | Registry Validator | ERROR | P4 |

### Recommended (Should Implement)

| # | Capability | Blocking | Priority |
|---|-----------|----------|----------|
| 7 | Classification Validator | WARNING | P2 |
| 8 | Confidence Validator | WARNING | P3 |

### Optional (Nice to Have)

| # | Capability | Blocking | Priority |
|---|-----------|----------|----------|
| 9 | Report Validator | WARNING | P4 |

---

## Success Criteria by Priority

### P1 Success (Must Have)

| Capability | Success Criteria |
|-----------|----------------|
| Consistency Validator | Detects reported < declared optimal |
| Metadata Validator | All required fields validated |

### P2 Success (Should Have)

| Capability | Success Criteria |
|-----------|----------------|
| Provenance Validator | All quantitative claims have provenance |
| Classification Validator | No "measurement" + "simulated" mismatches |
| Cross-Artifact Validator | No orphaned artifacts |

### P3 Success (Nice to Have)

| Capability | Success Criteria |
|-----------|----------------|
| Confidence Validator | No HIGH confidence on simulated data |
| Runtime Rule Validator | No efficiency > 100% without explanation |

### P4 Success (Optional)

| Capability | Success Criteria |
|-----------|----------------|
| Report Validator | All conclusions have supporting evidence |
| Registry Validator | Registry matches experiment state |

---

## Risk Assessment by Priority

| Priority | Implementation Risk | Missing Risk |
|----------|---------------------|--------------|
| P1 | LOW | HIGH |
| P2 | MEDIUM | MEDIUM |
| P3 | MEDIUM | LOW |
| P4 | LOW | LOW |

---

*Document Status*: COMPLETE
*Evidence Type*: analysis
*Confidence*: HIGH
