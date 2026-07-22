# Validation Execution Model: LAB-034

**Analysis Date**: 2026-07-22
**Experiment**: LAB-034
**Status**: COMPLETE

---

## Execution Model Overview

This document defines how the Shadow Validation Prototype executes validation on experiment artifacts without modifying the Runtime.

---

## Execution Triggers

### Trigger Types

| Trigger | Description | Use Case |
|---------|-------------|----------|
| **Manual** | User initiates validation | On-demand testing |
| **Scheduled** | Cron/scheduler periodic scan | Continuous monitoring |
| **Event-Based** | Experiment completion event | Real-time validation |
| **Batch** | Process multiple experiments | Historical analysis |

### Trigger Configuration

```yaml
triggers:
  manual:
    enabled: true
    command: "shadow-validate --experiment LAB-031"
  
  scheduled:
    enabled: true
    interval: "1h"
    watch_dirs:
      - "/runtime/experiments"
  
  event_based:
    enabled: true
    event_source: "runtime_completion"
    callback: "on_experiment_complete"
  
  batch:
    enabled: true
    experiments:
      - LAB-001
      - LAB-002
      - LAB-031
```

---

## Artifact Reception

### Reception Protocol

```
Runtime completes experiment
        │
        ▼
Runtime exports artifacts (copy or symlink)
        │
        ▼
Shadow detects new artifacts in inbox
        │
        ▼
Shadow ingests artifacts
        │
        ▼
Shadow validates
        │
        ▼
Shadow generates report (shadow storage only)
        │
        ▼
Runtime continues unchanged
```

### Artifact Export Methods

| Method | Description | Pros | Cons |
|--------|-------------|------|-------|
| **Copy** | Duplicate artifacts to inbox | Simple, safe | Storage duplication |
| **Symlink** | Link to original artifacts | No duplication | Cannot modify |
| **Bind Mount** | Read-only mount | Zero duplication | Requires root |
| **Webhook** | HTTP push to shadow | Real-time | More complex |

### Recommended: Copy Method

**Rationale**:
- Simplest implementation
- Complete isolation
- No Runtime modification
- Easy rollback

---

## Validation Execution Flow

### Phase 1: Artifact Collection

```
1. Scan inbox directory
   └── Find: experiment directories

2. For each experiment:
   a. Verify directory structure
      └── Required: experiment.md, TRACKER.md
      └── Optional: runs/, analysis/
   
   b. Collect file list
      └── Record: paths, sizes, hashes
   
   c. Verify integrity
      └── Compare: SHA-256 checksums
   
   d. Index artifacts
      └── Store: artifact registry
```

### Phase 2: Schema Validation

```
1. Load validation schemas
   └── schemas/evidence_types.yaml
   └── schemas/provenance_types.yaml
   └── schemas/metadata_required.yaml
   └── schemas/confidence_matrix.yaml
   └── schemas/integrity_rules.yaml

2. For each artifact:
   a. Load appropriate schema
   
   b. Validate structure
   
   c. Record schema validation result
   
   d. Continue on schema error (log and skip)
```

### Phase 3: Content Validation

```
1. Run Classification Validator
   └── Input: artifact content, declared type
   └── Output: PASS/WARNING/ERROR

2. Run Provenance Validator
   └── Input: artifact content, provenance field
   └── Output: PASS/WARNING/ERROR

3. Run Confidence Validator
   └── Input: evidence type, declared confidence
   └── Output: PASS/WARNING/ERROR

4. Run Metadata Validator
   └── Input: artifact metadata
   └── Output: PASS/WARNING/ERROR
```

### Phase 4: Cross-Artifact Validation

```
1. Run Consistency Validator
   └── Input: declared values (experiment.md), reported values (runs)
   └── Output: PASS/WARNING/ERROR

2. Run Cross-Artifact Validator
   └── Input: all artifacts in experiment
   └── Output: PASS/WARNING/ERROR

3. Run Runtime Rule Validator
   └── Input: all artifacts
   └── Output: PASS/WARNING/ERROR

4. Run Report Validator
   └── Input: report artifacts, evidence artifacts
   └── Output: PASS/WARNING/ERROR
```

### Phase 5: Registry Validation

```
1. Run Registry Validator
   └── Input: registry.md, experiment directories
   └── Output: PASS/WARNING/ERROR
```

### Phase 6: Report Generation

```
1. Aggregate validation results
   └── Combine: all validator outputs

2. Generate report
   └── Template: validation-report.md
   └── Include: findings, metrics, recommendations

3. Archive report
   └── Location: /shadow-prototype/reports/{experiment_id}/

4. Record metrics
   └── Store: validation metrics
```

---

## Validator Execution Model

### Base Validator Interface

```python
class BaseValidator:
    """Base class for all shadow validators."""
    
    def __init__(self, config):
        self.config = config
        self.name = self.__class__.__name__
    
    def validate(self, artifacts) -> ValidationResult:
        """
        Execute validation on artifacts.
        
        Args:
            artifacts: Dict of artifact_name -> artifact_content
        
        Returns:
            ValidationResult with PASS/WARNING/ERROR and findings
        """
        raise NotImplementedError
    
    def _log(self, level, message):
        """Log validation activity."""
        pass
    
    def _record_finding(self, finding):
        """Record a validation finding."""
        pass
```

### Deterministic Execution

Each validator MUST:

```python
def validate(self, artifacts) -> ValidationResult:
    # 1. Load schema (deterministic)
    schema = self._load_schema()
    
    # 2. Parse artifacts (deterministic)
    parsed = self._parse(artifacts)
    
    # 3. Apply rules (deterministic)
    findings = self._apply_rules(parsed, schema)
    
    # 4. Return result (deterministic)
    return ValidationResult(
        validator=self.name,
        status=self._determine_status(findings),
        findings=findings,
        timestamp=datetime.now()  # Logged, not used in logic
    )
```

### Finding Structure

```python
@dataclass
class ValidationFinding:
    """A single validation finding."""
    
    validator: str           # Which validator
    severity: str            # HIGH, MEDIUM, LOW
    status: str             # PASS, WARNING, ERROR
    category: str            # classification, provenance, etc.
    description: str        # Human-readable description
    artifact: str            # Which artifact
    location: str            # File:line or reference
    expected: str           # What was expected
    actual: str             # What was found
    suggestion: str         # How to fix (optional)
```

---

## Result Recording

### Recording Model

```
Validation Complete
        │
        ▼
┌───────────────────────────────────────────────┐
│           RESULT RECORDING                       │
└───────────────────────────────────────────────┘
        │
        ▼
┌───────────────────────────────────────────────┐
│ 1. Aggregate all findings                     │
│    └── Combine: validator findings            │
└───────────────────────────────────────────────┘
        │
        ▼
┌───────────────────────────────────────────────┐
│ 2. Calculate summary metrics                  │
│    └── Total findings                        │
│    └── By severity                          │
│    └── By status                            │
│    └── By validator                         │
└───────────────────────────────────────────────┘
        │
        ▼
┌───────────────────────────────────────────────┐
│ 3. Generate report                          │
│    └── Report template                      │
│    └── Include findings                      │
│    └── Include metrics                      │
│    └── Include recommendations              │
└───────────────────────────────────────────────┘
        │
        ▼
┌───────────────────────────────────────────────┐
│ 4. Archive report                           │
│    └── Location: shadow reports             │
│    └── Format: Markdown + JSON             │
│    └── Link: to original artifacts         │
└───────────────────────────────────────────────┘
```

### Report Output Structure

```yaml
validation_report:
  metadata:
    experiment_id: "LAB-031"
    validation_timestamp: "2026-07-22T00:00:00Z"
    shadow_version: "0.1.0"
    validators_run: 9
  
  summary:
    total_findings: 3
    errors: 1
    warnings: 2
    passes: 6
  
  findings:
    - validator: "consistency"
      severity: "HIGH"
      status: "ERROR"
      description: "Reported solution < Declared optimal"
      artifact: "runs/benchmark-results.md"
      location: "line 75"
      expected: ">= 19"
      actual: "18"
    
    - validator: "classification"
      severity: "MEDIUM"
      status: "WARNING"
      description: "measurement type with simulated qualifier"
      artifact: "runs/benchmark-results.md"
      location: "header"
  
  metrics:
    execution_time_ms: 245
    artifacts_validated: 12
    validators_passed: 7
    validators_warned: 1
    validators_errored: 1
```

---

## Evidence Linking

### Link Model

Each finding MUST link to evidence:

```python
@dataclass
class FindingEvidence:
    """Evidence supporting a validation finding."""
    
    finding_id: str         # Links to finding
    artifact: str           # Source artifact
    location: str           # File:line reference
    content: str            # Relevant content snippet
    justification: str      # Why this evidence supports finding
```

### Linking Process

```
1. Validator generates finding
   └── Finding references artifact + location

2. Shadow extracts evidence
   └── Read: specific line/content from artifact
   └── Capture: relevant snippet

3. Shadow links evidence to finding
   └── Store: FindingEvidence with justification

4. Report includes evidence
   └── Show: finding with supporting evidence
   └── Show: why this evidence supports finding
```

---

## Reproducibility Verification

### Reproducibility Requirements

| Requirement | Verification |
|------------|--------------|
| Same input = same output | Run validator twice, compare results |
| Deterministic rules | No random in validation logic |
| No external dependencies | Validate offline |
| Timestamps logged but not used | Code review |

### Verification Process

```python
def verify_reproducibility(validator, test_artifacts):
    """Verify validator is reproducible."""
    
    results = []
    
    for i in range(3):
        result = validator.validate(test_artifacts)
        results.append(result)
    
    # All results should be identical
    for result in results[1:]:
        assert result == results[0], "Non-deterministic behavior"
    
    return True
```

---

## Execution Model Summary

### Key Characteristics

| Characteristic | Value |
|---------------|-------|
| Trigger Types | Manual, Scheduled, Event, Batch |
| Artifact Reception | Copy method (safe, simple) |
| Execution Model | Deterministic, stateless |
| Result Recording | Separate storage, linked evidence |
| Reproducibility | Verified per-validator |

### Safety Characteristics

| Characteristic | Value |
|---------------|-------|
| Runtime Modification | Zero |
| Artifact Modification | Zero |
| Execution Influence | Zero |
| Registry Pollution | Zero |

---

*Document Status*: COMPLETE
*Evidence Type*: analysis
*Confidence*: HIGH
