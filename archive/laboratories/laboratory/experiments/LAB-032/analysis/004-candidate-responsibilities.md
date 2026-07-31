# Candidate Responsibilities: Evidence Integrity Validation

**Analysis Date**: 2026-07-22
**Experiment**: LAB-032
**Status**: COMPLETE

---

## Candidate Responsibility 1: Evidence Classification Validation

### Description

Validate that evidence type accurately reflects the evidence content. Prevent misclassification such as labeling simulated data as "measurement."

### Validation Rules

| Rule | Description | Example |
|------|-------------|---------|
| R1.1 | If "measurement" classification, check for empirical collection | "measurement" without empirical source → WARNING |
| R1.2 | If "simulation" present, classification cannot be "measurement" | Contains "simulated" → classification ≠ "measurement" |
| R1.3 | If "estimate" present, classification cannot be "measurement" | Contains "estimated" → classification ≠ "measurement" |
| R1.4 | If "prediction" present, classification cannot be "measurement" | Contains "predicted" → classification ≠ "measurement" |

### LAB-031 Example

```yaml
# Document header states:
Status: COMPLETE (Simulated)

# Evidence is classified as:
Type: measurement

# Validation result:
⚠️  WARNING: "measurement" classification with "simulated" qualifier
```

### Automated Detection Feasibility: HIGH

**Approach**: Pattern matching + content analysis

```python
def validate_classification(document):
    classification = extract_evidence_type(document)
    content = extract_content(document)
    
    qualifiers = ["simulated", "estimated", "predicted", "computed", "modeled"]
    
    for qualifier in qualifiers:
        if qualifier in content.lower():
            if classification == "measurement":
                return ValidationResult.WARNING, f"'{classification}' with '{qualifier}' qualifier"
    
    return ValidationResult.PASS
```

### Implementation Complexity: LOW

---

## Candidate Responsibility 2: Consistency Validation

### Description

Detect contradictions between declared and reported values within and across artifacts.

### Validation Rules

| Rule | Description | Example |
|------|-------------|---------|
| R2.1 | Optimal solution ≥ any reported solution | Reported 18 < Declared 19 → ERROR |
| R2.2 | Efficiency = (optimal / reported) × 100% | Efficiency > 100% without explanation → WARNING |
| R2.3 | Run count consistent across artifacts | experiment.md ≠ runs/*.md → ERROR |
| R2.4 | Solution length ≥ 1 | Reported < 1 → ERROR |

### LAB-031 Example

```yaml
# Declared:
Optimal Solution: 19 moves

# Reported (Delta RUN-010):
Solution Length: 18

# Validation result:
❌ ERROR: Reported solution (18) < Declared optimal (19)
⚠️  WARNING: Efficiency > 100% (calculated: 105.6%)
```

### Automated Detection Feasibility: HIGH

**Approach**: Numeric comparison + constraint rules

```python
def validate_consistency(document, declared_values):
    reported = extract_numeric_values(document)
    
    for key, value in reported.items():
        if key in declared_values:
            if key == "solution_length":
                if value < declared_values[key]:
                    return ValidationResult.ERROR, f"Reported ({value}) < Optimal ({declared_values[key]})"
            
            if key == "efficiency":
                if value > 100 and not has_explanation(document):
                    return ValidationResult.WARNING, f"Efficiency > 100% without explanation"
    
    return ValidationResult.PASS
```

### Implementation Complexity: LOW

---

## Candidate Responsibility 3: Provenance Validation

### Description

Ensure provenance metadata accompanies quantitative statements. Validate provenance types.

### Provenance Types

| Type | Definition | Example |
|------|------------|---------|
| Measured | Empirical observation | Direct measurement |
| Derived | Computed from other data | Calculated average |
| Referenced | From external source | Cited paper |
| Estimated | Approximate calculation | Approximation |
| Simulated | Model-based generation | Computer simulation |
| Unknown | Unspecified source | No source indicated |

### Validation Rules

| Rule | Description | Example |
|------|-------------|---------|
| R3.1 | Quantitative statements require provenance | Numeric claim → provenance field required |
| R3.2 | Provenance type must be valid | Type ∈ {Measured, Derived, ...} |
| R3.3 | External references require citation | "Referenced" → citation required |
| R3.4 | Unknown provenance flagged | "Unknown" → WARNING |

### LAB-031 Example

```yaml
# Quantitative claim:
Optimal Solution: 19 moves

# Provenance:
Source: Computed via Kociemba

# Validation result:
✅ PASS: Provenance present and valid
```

### Automated Detection Feasibility: MEDIUM

**Approach**: Schema enforcement + citation checking

```python
def validate_provenance(evidence):
    if has_quantitative_claims(evidence):
        if not has_provenance(evidence):
            return ValidationResult.ERROR, "Quantitative claims require provenance"
        
        provenance_type = extract_provenance_type(evidence)
        if provenance_type == "Unknown":
            return ValidationResult.WARNING, "Provenance is Unknown"
        
        if provenance_type == "Referenced":
            if not has_citation(evidence):
                return ValidationResult.ERROR, "Referenced provenance requires citation"
    
    return ValidationResult.PASS
```

### Implementation Complexity: MEDIUM

---

## Candidate Responsibility 4: Cross-Artifact Validation

### Description

Ensure consistency across multiple artifacts in an experiment.

### Artifacts to Validate

| Artifact | Consistency Checks |
|----------|-------------------|
| experiment.md | Matches TRACKER.md on status, engines |
| TRACKER.md | Matches registry.md on experiment count |
| runs/*.md | Sum matches run count in TRACKER.md |
| analysis/*.md | References exist in runs/ |
| conclusions | Supported by evidence in runs/ |

### Validation Rules

| Rule | Description | Example |
|------|-------------|---------|
| R4.1 | Run count consistent | experiment.md "12 runs" = runs/*.md count |
| R4.2 | Status transitions valid | COMPLETE → not ACTIVE |
| R4.3 | Conclusions supported | Each claim → evidence reference |
| R4.4 | Cross-references valid | analysis/ → existing runs/ files |

### LAB-031 Example

```yaml
# experiment.md declares:
Runs: 12

# runs/ contains:
RUN-001.md, RUN-002.md, ... RUN-012.md = 12 files

# Validation result:
✅ PASS: Run count consistent
```

### Automated Detection Feasibility: MEDIUM

**Approach**: Schema comparison + reference verification

```python
def validate_cross_artifacts(experiment_dir):
    experiment = load_artifact("experiment.md")
    tracker = load_artifact("TRACKER.md")
    runs = list_artifacts("runs/")
    
    # Check run count consistency
    declared_runs = extract_run_count(experiment)
    actual_runs = len(runs)
    
    if declared_runs != actual_runs:
        return ValidationResult.ERROR, f"Declared runs ({declared_runs}) ≠ Actual ({actual_runs})"
    
    # Check status consistency
    if experiment.status != tracker.status:
        return ValidationResult.WARNING, f"Status mismatch: {experiment.status} vs {tracker.status}"
    
    return ValidationResult.PASS
```

### Implementation Complexity: MEDIUM

---

## Candidate Responsibility 5: Confidence Validation

### Description

Constrain confidence levels based on evidence quality.

### Confidence-Constraint Matrix

| Evidence Type | LOW | MEDIUM | HIGH | VERY HIGH |
|--------------|-----|--------|------|-----------|
| Measured | ✓ | ✓ | ✓ | - |
| Derived | ✓ | ✓ | - | - |
| Simulated | ✓ | - | - | - |
| Estimated | ✓ | - | - | - |
| Referenced | ✓ | ✓ | - | - |
| Unknown | ✓ | - | - | - |

### Validation Rules

| Rule | Description | Example |
|------|-------------|---------|
| R5.1 | Simulation cannot justify HIGH+ | Simulated evidence → confidence ≤ MEDIUM |
| R5.2 | Single measurement limits confidence | n=1 → confidence ≤ MEDIUM |
| R5.3 | Unknown provenance limits confidence | Unknown source → confidence ≤ LOW |
| R5.4 | Extrapolation reduces confidence | Extrapolated → -1 level |

### LAB-031 Example

```yaml
# Evidence classification:
Type: measurement (but simulated)

# Declared confidence:
Confidence: MEDIUM

# Validation result:
✅ PASS: Simulated evidence with MEDIUM confidence is valid
```

### Automated Detection Feasibility: MEDIUM

**Approach**: Rule-based constraint application

```python
CONFIDENCE_CONSTRAINTS = {
    "simulation": "MEDIUM",
    "single_measurement": "MEDIUM",
    "unknown_provenance": "LOW",
    "extrapolation": -1,  # Reduce by one level
}

def validate_confidence(evidence):
    provenance = extract_provenance(evidence)
    sample_size = extract_sample_size(evidence)
    confidence = extract_confidence(evidence)
    
    constraints = []
    
    if provenance == "simulation":
        constraints.append(CONFIDENCE_CONSTRAINTS["simulation"])
    
    if sample_size == 1:
        constraints.append(CONFIDENCE_CONSTRAINTS["single_measurement"])
    
    if provenance == "Unknown":
        constraints.append(CONFIDENCE_CONSTRAINTS["unknown_provenance"])
    
    max_allowed = max(constraints) if constraints else "VERY HIGH"
    
    if CONFIDENCE_LEVELS[confidence] > CONFIDENCE_LEVELS[max_allowed]:
        return ValidationResult.WARNING, f"Confidence '{confidence}' exceeds constraint for evidence type"
    
    return ValidationResult.PASS
```

### Implementation Complexity: MEDIUM

---

## Candidate Responsibility 6: Integrity Rules

### Description

Enforce runtime integrity constraints on evidence and conclusions.

### Integrity Rules

| Rule | Description | Detection | Severity |
|------|-------------|----------|----------|
| R6.1 | Impossible claims | Numeric violations | HIGH |
| R6.2 | Contradictory data | Logical conflicts | HIGH |
| R6.3 | Unsupported conclusions | Missing evidence | MEDIUM |
| R6.4 | Missing references | Uncited claims | MEDIUM |
| R6.5 | Circular evidence | Self-referential | HIGH |
| R6.6 | Duplicated evidence | SHA-256 duplicate | LOW |
| R6.7 | Orphaned conclusions | No supporting evidence | MEDIUM |

### R6.1: Impossible Claims

```yaml
# Example violations:
- Efficiency > 100% without explanation
- Solution length > 100 (arbitrary limit)
- Runtime < 0
- Consistency rating > 100%
```

### R6.2: Contradictory Data

```yaml
# Example:
Artifact A declares: "All engines solved the cube"
Artifact B declares: "Alpha failed on 2 runs"
# Validation: CONFLICT ERROR
```

### R6.3: Unsupported Conclusions

```yaml
# Example:
Conclusion: "Beta is the best engine"
Evidence: None cited

# Validation: WARNING - Conclusion requires supporting evidence
```

### Automated Detection Feasibility: VARIABLE

| Rule | Detection Method | Complexity |
|------|----------------|------------|
| R6.1 | Numeric bounds | LOW |
| R6.2 | Cross-reference check | MEDIUM |
| R6.3 | Evidence citation check | MEDIUM |
| R6.4 | Citation extraction | LOW |
| R6.5 | Graph cycle detection | HIGH |
| R6.6 | SHA-256 comparison | LOW |
| R6.7 | Citation tree analysis | MEDIUM |

### Implementation Complexity: VARIABLE (LOW to HIGH)

---

## Responsibility Summary

| Responsibility | Automated Feasibility | Implementation Complexity | Priority |
|---------------|---------------------|------------------------|----------|
| Classification Validation | HIGH | LOW | HIGH |
| Consistency Validation | HIGH | LOW | HIGH |
| Provenance Validation | MEDIUM | MEDIUM | MEDIUM |
| Cross-Artifact Validation | MEDIUM | MEDIUM | MEDIUM |
| Confidence Validation | MEDIUM | MEDIUM | MEDIUM |
| Integrity Rules | VARIABLE | VARIABLE | MEDIUM-HIGH |

---

## Recommendations

### Immediate (Phase 1)
1. **Classification Validation** - Detect simulated vs. measured
2. **Consistency Validation** - Detect numeric contradictions

### Short-term (Phase 2)
3. **Provenance Validation** - Require provenance metadata
4. **Integrity Rules (R6.1-R6.4)** - Basic integrity checking

### Long-term (Phase 3)
5. **Cross-Artifact Validation** - Full artifact consistency
6. **Confidence Validation** - Constraint enforcement
7. **Integrity Rules (R6.5-R6.7)** - Complex integrity checking

---

*Document Status*: COMPLETE
*Evidence Type*: analysis
*Confidence*: HIGH
