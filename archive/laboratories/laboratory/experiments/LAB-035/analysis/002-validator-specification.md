# Validator Specification: LAB-035

**Analysis Date**: 2026-07-22
**Experiment**: LAB-035
**Status**: COMPLETE

---

## Metadata Validator Specification

This document specifies the Metadata Validator for the controlled runtime integration trial.

---

## Validator Overview

| Attribute | Value |
|-----------|-------|
| Name | MetadataValidator |
| Version | 0.1.0 |
| Type | Deterministic, read-only |
| Purpose | Validate artifact metadata schema |
| Blocking | Never |
| Output | Separate validation file |

---

## Metadata Schema

### Required Fields

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| experiment_id | string | Unique experiment identifier | Yes |
| title | string | Human-readable title | Yes |
| status | enum | Experiment status | Yes |
| created | timestamp | Creation timestamp | Yes |
| engine | string | Engine used | No |
| category | string | Experiment category | No |

### Optional Fields

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| updated | timestamp | Last update | No |
| seed | string | Seed used | No |
| tags | array | Experiment tags | No |
| notes | string | Additional notes | No |

---

## Validation Rules

### Rule 1: Required Fields Present

```yaml
rule: required_fields
description: All required fields must be present
fields:
  - experiment_id
  - title
  - status
  - created
severity: ERROR
```

**Failure Condition**: Required field is missing

**Example Failure**:
```yaml
experiment_id: LAB-035
title: Controlled Runtime Integration Trial
status: COMPLETE
# created: MISSING
```

---

### Rule 2: Field Types Valid

```yaml
rule: field_types
description: Field values must match expected types
checks:
  - field: experiment_id
    type: string
  - field: status
    type: enum
    values: [DRAFT, ACTIVE, COMPLETE, SUSPENDED, ARCHIVED]
  - field: created
    type: timestamp
severity: ERROR
```

**Failure Condition**: Field value does not match expected type

**Example Failure**:
```yaml
status: INVALID_VALUE  # Not in enum
```

---

### Rule 3: Timestamp Format

```yaml
rule: timestamp_format
description: Timestamp fields must be ISO8601 format
fields:
  - created
  - updated
format: "%Y-%m-%dT%H:%M:%SZ"
severity: ERROR
```

**Failure Condition**: Timestamp not in ISO8601 format

**Example Failure**:
```yaml
created: "2026-07-22"  # Missing time component
```

---

### Rule 4: Experiment ID Format

```yaml
rule: experiment_id_format
description: Experiment ID must match LAB-NNN pattern
pattern: "^LAB-\\d{3}$"
severity: ERROR
```

**Failure Condition**: Experiment ID does not match pattern

**Example Failure**:
```yaml
experiment_id: "experiment-1"  # Wrong format
```

---

## Validator Implementation

### Pseudocode

```python
class MetadataValidator:
    """Validates artifact metadata against schema."""
    
    VERSION = "0.1.0"
    
    def __init__(self, schema: dict):
        self.schema = schema
        self.findings = []
    
    def validate(self, artifact_metadata: dict) -> ValidationResult:
        """Execute validation on artifact metadata."""
        
        # Rule 1: Required fields
        self._check_required_fields(artifact_metadata)
        
        # Rule 2: Field types
        self._check_field_types(artifact_metadata)
        
        # Rule 3: Timestamp format
        self._check_timestamps(artifact_metadata)
        
        # Rule 4: Experiment ID format
        self._check_experiment_id_format(artifact_metadata)
        
        return self._build_result()
    
    def _check_required_fields(self, metadata: dict):
        """Check all required fields are present."""
        for field in self.schema['required']:
            if field not in metadata:
                self._add_finding(
                    severity="ERROR",
                    rule="required_fields",
                    message=f"Required field '{field}' is missing"
                )
    
    def _check_field_types(self, metadata: dict):
        """Check field values match expected types."""
        for field, spec in self.schema['properties'].items():
            if field in metadata:
                if not self._validate_type(metadata[field], spec['type']):
                    self._add_finding(
                        severity="ERROR",
                        rule="field_types",
                        message=f"Field '{field}' has invalid type"
                    )
    
    def _check_timestamps(self, metadata: dict):
        """Check timestamp fields are valid."""
        for field in ['created', 'updated']:
            if field in metadata:
                if not self._validate_timestamp(metadata[field]):
                    self._add_finding(
                        severity="ERROR",
                        rule="timestamp_format",
                        message=f"Field '{field}' is not valid ISO8601"
                    )
    
    def _check_experiment_id_format(self, metadata: dict):
        """Check experiment ID matches expected pattern."""
        if 'experiment_id' in metadata:
            if not re.match(r"^LAB-\d{3}$", metadata['experiment_id']):
                self._add_finding(
                    severity="ERROR",
                    rule="experiment_id_format",
                    message="experiment_id must match LAB-NNN format"
                )
    
    def _add_finding(self, severity, rule, message):
        """Record a validation finding."""
        self.findings.append({
            'severity': severity,
            'rule': rule,
            'message': message
        })
    
    def _build_result(self) -> ValidationResult:
        """Build final validation result."""
        has_errors = any(f['severity'] == 'ERROR' for f in self.findings)
        has_warnings = any(f['severity'] == 'WARNING' for f in self.findings)
        
        return ValidationResult(
            validator="MetadataValidator",
            version=self.VERSION,
            status="ERROR" if has_errors else "WARNING" if has_warnings else "PASS",
            findings=self.findings
        )
```

---

## Execution Flow

```
Artifact Created
       │
       ▼
┌─────────────────────────────┐
│ Extract Metadata            │
│ (Read YAML header only)     │
└─────────────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│ Load Schema                │
│ (Read schema definition)    │
└─────────────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│ Run Validation Rules        │
│ • Required fields           │
│ • Field types              │
│ • Timestamp format          │
│ • Experiment ID format      │
└─────────────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│ Generate Validation Report   │
│ (Separate file)            │
└─────────────────────────────┘
       │
       ▼
    Artifact (unchanged)
    Validation Report (new)
```

---

## Output Format

### Validation Report

```markdown
# Metadata Validation Report

**Artifact**: experiment.md
**Validator**: MetadataValidator v0.1.0
**Timestamp**: 2026-07-22T12:00:00Z
**Result**: PASS

## Validated Fields

| Field | Required | Present | Valid |
|-------|----------|---------|-------|
| experiment_id | Yes | Yes | Yes |
| title | Yes | Yes | Yes |
| status | Yes | Yes | Yes |
| created | Yes | Yes | Yes |
| engine | No | Yes | Yes |
| category | No | No | N/A |

## Validation Rules

| Rule | Result |
|------|--------|
| required_fields | PASS |
| field_types | PASS |
| timestamp_format | PASS |
| experiment_id_format | PASS |

## Findings

*No findings.*

---
```

### With Errors

```markdown
# Metadata Validation Report

**Artifact**: experiment.md
**Validator**: MetadataValidator v0.1.0
**Timestamp**: 2026-07-22T12:00:00Z
**Result**: ERROR

## Findings

| Rule | Severity | Message |
|------|---------|---------|
| required_fields | ERROR | Required field 'created' is missing |
| experiment_id_format | ERROR | experiment_id must match LAB-NNN format |

## Summary

- Total fields checked: 4
- Required fields: 4
- Missing fields: 1
- Invalid fields: 1
```

---

## Determinism Verification

### Determinism Requirements

| Requirement | Verification |
|------------|--------------|
| Same input = same output | Run twice, compare results |
| No random values | Code review |
| No time-based logic | Timestamps logged, not used |
| No external dependencies | Offline validation |

### Verification Test

```python
def test_determinism():
    """Verify validator produces identical output for same input."""
    validator = MetadataValidator(schema)
    
    metadata = {
        'experiment_id': 'LAB-035',
        'title': 'Test',
        'status': 'DRAFT',
        'created': '2026-07-22T12:00:00Z'
    }
    
    result1 = validator.validate(metadata)
    result2 = validator.validate(metadata)
    
    assert result1.status == result2.status
    assert result1.findings == result2.findings
```

---

## Error Handling

### Error Scenarios

| Scenario | Handling | Result |
|----------|----------|--------|
| Missing metadata file | Skip validation | WARNING |
| Invalid YAML | Skip validation | WARNING |
| Schema not found | Use default schema | PASS |
| Write error | Log and continue | WARNING |

### Never Happens

| Scenario | Prevention |
|----------|------------|
| Runtime crash | Try/except wrapper |
| Artifact corruption | Read-only access |
| Blocking | Never throws |
| Data loss | Append-only |

---

## Summary

| Attribute | Value |
|-----------|-------|
| Complexity | LOW |
| Risk | LOW |
| Blocking | NEVER |
| Deterministic | YES |
| Runtime Impact | MINIMAL |

---

*Document Status*: COMPLETE
*Evidence Type*: analysis
*Confidence*: HIGH
