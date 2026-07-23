# Revised Protection Registry (GAP-7 Revision)

**Document ID**: LAB-039-002
**Source**: LAB-039 Phase 2
**Date**: 2026-07-23
**Status**: REVISED
**Original**: LAB-037 Phase 2, LAB-038 Phase 2 Validation
**Prior Issues Addressed**: Session override conflict, Pattern validation, Error handling

---

## Revision Overview

### Original Concerns (LAB-038)

LAB-038 Phase 2 Validation identified three issues with the Protection Registry:

| Issue | Severity | Original Concern |
|-------|----------|-----------------|
| Session override conflict | HIGH | Protection could be bypassed via session override |
| Pattern validation missing | HIGH | Invalid regex could crash Runtime |
| Error handling undefined | MEDIUM | No error behavior defined |

---

## Proposed Resolution

### Resolution 1: Session Override Conflict

**Original Concern**: Session override could theoretically disable protection.

**Proposed Solution**: Explicitly define protection precedence and override rules

```markdown
## Protection Precedence

### Hierarchy of Protection

Protection levels are defined by Governance and cannot be overridden by session configuration.

```
┌─────────────────────────────────────────────────────────────┐
│                  PROTECTION PRECEDENCE HIERARCHY                │
└─────────────────────────────────────────────────────────────┘

    Governance (Highest)
         │
         ▼
    ARTIFACT-PROTECTION.md
    (Protection Matrix)
         │
         ▼
    protection.yaml
    (Runtime Configuration)
         │
         ▼
    Runtime Protection Module
    (Runtime Enforcement)
         │
         ▼
    Session Override (Lowest)
         │
         ▼
    Session CANNOT override protection settings
```

### Override Rules

**Critical Rule**: Session override CANNOT modify protection settings.

| Override Type | Protection Affected? | Rationale |
|--------------|--------------------|-----------|
| session_override.engine | NO | Engine selection only |
| session_override.seed | NO | Seed selection only |
| session_override.protection | **EXPLICITLY DENIED** | Protection is non-overridable |

### Explicit Statement

```yaml
# protection.yaml

# IMPORTANT: Protection configuration is NOT subject to session override
# This ensures protection cannot be bypassed during any session

protection:
  override_allowed: false  # PROTECTION CANNOT BE OVERRIDDEN
  
  precedence:
    - Governance: highest (defines protection levels)
    - Runtime Config: medium (loads protection)
    - Runtime Module: medium (enforces protection)
    - Session Override: lowest (CANNOT modify protection)

# Session override attempting to change protection will be:
# 1. Logged as security event
# 2. Rejected silently
# 3. Protection unchanged
```

### Enforcement Mechanism

```python
# When session override is processed:

def apply_session_override(session_config):
    """
    Apply session configuration overrides.
    Protection settings are EXCLUDED.
    """
    
    # Engine override - ALLOWED
    if 'engine' in session_config:
        apply_engine_override(session_config['engine'])
    
    # Seed override - ALLOWED
    if 'seed' in session_config:
        apply_seed_override(session_config['seed'])
    
    # Protection override - DENIED
    if 'protection' in session_config:
        log_security_event(
            event="PROTECTION_OVERRIDE_ATTEMPT",
            session=current_session,
            requested=session_config['protection'],
            action="REJECTED"
        )
        # Do NOT apply protection override
```

### Governance Justification

**Question**: Why is protection non-overridable?

**Answer**:
1. **Evidence Protection**: Historical experiments are evidence
2. **Scientific Integrity**: Evidence must be preserved
3. **Audit Trail**: Modifications must be documented
4. **Trust**: Protection ensures AI behavior is predictable
5. **Authority**: Governance defines protection, not session

**Authority Source**: Derived from Laboratory Rules (Rule 1-5) and Evidence preservation principles.
```

---

### Resolution 2: Pattern Validation

**Original Concern**: Invalid regex could crash Runtime.

**Proposed Solution**: Add explicit validation requirements and error handling

```markdown
## Pattern Validation

### Validation Requirements

Before protection.yaml is loaded into Runtime:

```
┌─────────────────────────────────────────────────────────────┐
│                   PATTERN VALIDATION PROCESS                    │
└─────────────────────────────────────────────────────────────┘

    protection.yaml
         │
         ▼
    ┌─────────────────┐
    │ Schema Validation│ ◄── Validate YAML structure
    └────────┬────────┘
             │
             ▼
    ┌─────────────────┐
    │ Pattern Extract  │ ◄── Extract all regex patterns
    └────────┬────────┘
             │
             ▼
    ┌─────────────────┐
    │ Regex Compile    │ ◄── Test each pattern compiles
    └────────┬────────┘
             │
             ▼
    ┌─────────────────┐
    │ Path Simulation │ ◄── Test patterns against sample paths
    └────────┬────────┘
             │
             ▼
    ┌─────────────────┐
    │ Error Report     │ ◄── Report any validation failures
    └────────┬────────┘
             │
             ▼
    ┌─────────────────┐
    │ Protection       │ ◄── Load if valid, abort if invalid
    │ Registry Load    │
    └─────────────────┘
```

### Validation Steps

#### Step 1: Schema Validation

```yaml
# Validate protection.yaml schema:
- protection.version: string, required
- protection.levels: object, required
- protection.artifacts: object, required
- protection.defaults: object, optional
- protection.override_allowed: boolean, required (must be false)
```

#### Step 2: Pattern Extraction

```python
def extract_patterns(protection_config):
    """
    Extract all regex patterns from configuration.
    Returns: List of (artifact_name, pattern_string) tuples
    """
    patterns = []
    
    for artifact_name, artifact_config in protection_config.artifacts.items():
        patterns.append((artifact_name, artifact_config.pattern))
    
    return patterns
```

#### Step 3: Regex Compilation

```python
def validate_regex(pattern_string):
    """
    Validate that pattern is a valid regex.
    Returns: (valid: bool, error: str | None)
    """
    try:
        re.compile(pattern_string)
        return (True, None)
    except re.error as e:
        return (False, f"Invalid regex: {e}")
```

#### Step 4: Path Simulation

```python
def simulate_pattern(paths, pattern_string):
    """
    Test pattern against sample paths.
    Returns: (matches: List[str], warnings: List[str])
    """
    compiled = re.compile(pattern_string)
    matches = []
    warnings = []
    
    for path in paths:
        if compiled.match(path):
            matches.append(path)
    
    # Check for over-broad patterns
    if len(matches) > 1000:
        warnings.append(f"Pattern '{pattern_string}' matches {len(matches)} paths - review specificity")
    
    return (matches, warnings)
```

### Validation Error Handling

```python
class PatternValidationError(Exception):
    """Raised when pattern validation fails."""
    def __init__(self, artifact_name, pattern, error):
        self.artifact_name = artifact_name
        self.pattern = pattern
        self.error = error

def load_protection_registry(config_path):
    """
    Load protection registry with validation.
    """
    try:
        config = load_yaml(config_path)
        
        # Validate override_allowed is false
        if config.protection.get('override_allowed', True):
            raise PatternValidationError(
                artifact_name="protection.override_allowed",
                pattern=None,
                error="override_allowed must be false - protection cannot be overridden"
            )
        
        # Extract and validate patterns
        patterns = extract_patterns(config)
        for artifact_name, pattern in patterns:
            valid, error = validate_regex(pattern)
            if not valid:
                raise PatternValidationError(artifact_name, pattern, error)
        
        # Build protection registry
        registry = ProtectionRegistry(config)
        
        # Log successful load
        log("Protection registry loaded successfully")
        
        return registry
        
    except PatternValidationError as e:
        # Log error and ABORT startup
        log_error(f"PROTECTION REGISTRY VALIDATION FAILED")
        log_error(f"Artifact: {e.artifact_name}")
        log_error(f"Pattern: {e.pattern}")
        log_error(f"Error: {e.error}")
        log_error("RUNTIME STARTUP ABORTED - Protection configuration invalid")
        raise
```

### Validation Configuration

```yaml
protection:
  validation:
    enabled: true
    abort_on_error: true  # ABORT Runtime if validation fails
    log_level: "ERROR"
    
    checks:
      - schema_validation
      - regex_compilation
      - path_simulation
      
  sample_paths:  # Paths to test against
    - "laboratory/experiments/LAB-001/experiment.md"
    - "laboratory/experiments/LAB-037/evidence/data.csv"
    - "seeds/seed-001/seed.yaml"
    - "knowledge/finding-001.md"
    - "governance/RUNTIME-STARTUP.md"
```
```

---

### Resolution 3: Error Handling

**Original Concern**: No error behavior defined when protection fails.

**Proposed Solution**: Define comprehensive error handling behavior

```markdown
## Error Handling

### Error Categories

| Category | Description | Behavior |
|----------|-------------|----------|
| Configuration Error | protection.yaml invalid | ABORT Runtime startup |
| Validation Error | Pattern fails validation | ABORT Runtime startup |
| Load Error | File not found | ABORT Runtime startup |
| Runtime Error | Protection check fails | Graceful degradation |
| Performance Error | Check too slow | Log and continue |

### Error Behavior by Severity

#### FATAL Errors (Abort Runtime)

```python
FATAL_ERRORS = [
    "protection.yaml not found",
    "Invalid YAML syntax",
    "Missing required field: override_allowed",
    "override_allowed is not false",
    "Invalid regex pattern",
    "Schema validation failed"
]

def handle_fatal_error(error):
    """
    FATAL errors abort Runtime startup.
    Protection is essential - no protection means no Runtime.
    """
    log_error(f"FATAL: {error}")
    log_error("PROTECTION CONFIGURATION ERROR - Runtime cannot start")
    shutdown_runtime()
```

#### WARNING Errors (Log and Continue)

```python
WARNING_ERRORS = [
    "Pattern matches no paths",
    "Pattern matches too many paths (>1000)",
    "Duplicate protection level",
    "Missing description"
]

def handle_warning_error(error):
    """
    WARNING errors are logged but Runtime continues.
    Protection may be incomplete but is functional.
    """
    log_warning(f"WARNING: {error}")
    # Continue Runtime startup
```

#### RUNTIME Errors (Graceful Degradation)

```python
def pre_write_check(artifact_path, operation):
    """
    Runtime protection check with error handling.
    """
    try:
        protection_level = protection_registry.get_protection_level(artifact_path)
        return ProtectionCheckResult(...)
        
    except Exception as e:
        # Unexpected error - fail CLOSED
        log_error(f"Unexpected error in protection check: {e}")
        log_error("Defaulting to BLOCKED for safety")
        
        return ProtectionCheckResult(
            allowed=False,
            protection_level="UNKNOWN",
            warning=f"Protection check failed: {e}",
            requires_acknowledgment=True,
            block=True,
            error=str(e)
        )
```

### Error Recovery

| Error Type | Recovery Strategy | Time to Recovery |
|-----------|------------------|------------------|
| Configuration missing | Request human fix | Until fixed |
| Invalid regex | Reject invalid patterns | Until fixed |
| File not found | Block Runtime | Until file restored |
| Runtime check failure | Block all writes | Until resolved |

### Error Logging

```yaml
protection:
  logging:
    level: "DEBUG"
    format: "[{timestamp}] [{level}] {message}"
    
    events:
      - PROTECTION_LOAD_SUCCESS
      - PROTECTION_LOAD_FAILED
      - PATTERN_VALIDATION_FAILED
      - PROTECTION_OVERRIDE_ATTEMPT
      - PROTECTION_CHECK_SUCCESS
      - PROTECTION_CHECK_FAILED
      - PROTECTION_WARNING
      
    alert_on:
      - PATTERN_VALIDATION_FAILED
      - PROTECTION_OVERRIDE_ATTEMPT
      - PROTECTION_CHECK_FAILED
```
```

---

## Authority Verification

**Question**: Does this revision follow KDE authority hierarchy?

**Analysis**:

| Layer | Requirement | Status |
|-------|-------------|--------|
| Governance | Defines protection precedence | ✓ Governance defines, not session |
| Human Authority | Humans control protection | ✓ Humans define protection.yaml |
| Session Override | Cannot override protection | ✓ Explicitly denied |
| Runtime | Must enforce non-overridable | ✓ Implemented in code |

**FINDING**: ✓ PASS - Authority hierarchy preserved and strengthened

---

## Backward Compatibility

**Question**: Is this revision backward compatible?

**Analysis**:

| Aspect | Original | Revised | Compatible? |
|--------|----------|---------|-------------|
| Session override behavior | Engine/Seed only | Same + protection denied | ✓ |
| Protection registry | Basic structure | Added validation | ✓ |
| Error handling | Not defined | Explicit behavior | ✓ (adds safety) |

**FINDING**: ✓ PASS - Fully backward compatible

---

## New Dependencies Introduced

**Question**: Does this revision introduce new dependencies?

**Analysis**:

| Dependency | Introduced By | Required For |
|------------|--------------|--------------|
| Schema validation library | Pattern validation | Prevents invalid config |
| Regex compilation | Pattern validation | Prevents runtime crashes |
| Path simulation | Pattern validation | Catches over-broad patterns |

**FINDING**: ✓ NEW DEPENDENCIES - Standard libraries (re, yaml)

---

## Gap Resolution Assessment

### Original Gap (GAP-7)

"Runtime does not know the protection status of artifacts"

### Does Revision Fully Resolve Gap?

| Aspect | Original | Revised | Improvement |
|--------|----------|---------|-------------|
| Protection configuration | ✓ YAML structure | ✓ Same + validation | Added safety |
| Machine-readable | ✓ YES | ✓ YES | Unchanged |
| Human-configured | ✓ YES | ✓ YES | Unchanged |
| Precedence defined | ✗ NO | ✓ YES | Session cannot override |
| Pattern validation | ✗ NO | ✓ YES | Prevents crashes |
| Error handling | ✗ NO | ✓ YES | Graceful degradation |

**Completeness**: PARTIAL → FULL

---

## Phase 2 Revision Summary

### Issues Addressed

| # | Issue | Status | Resolution |
|---|-------|--------|------------|
| 1 | Session override conflict | ✓ RESOLVED | override_allowed: false + enforcement |
| 2 | Pattern validation missing | ✓ RESOLVED | 4-step validation process |
| 3 | Error handling undefined | ✓ RESOLVED | Error categories + behavior |

### New Dependencies

| Dependency | Purpose |
|------------|---------|
| Schema validation | Prevent invalid config |
| Regex compilation test | Prevent runtime crashes |
| Path simulation | Catch over-broad patterns |

### Backward Compatibility

**Status**: ✓ FULLY COMPATIBLE

### Recommendation

**Phase 2 can proceed with REVISED protection.yaml containing:
- override_allowed: false (explicit non-overridable)
- validation section with 4-step process
- error handling section with categories
- logging configuration for all events

---

## Evidence Sources

| Document | Finding |
|----------|---------|
| LAB-038 Phase 2 Validation | Issues 4, 5, 6 identified |
| LAB-038 Shadow Report | Phase 2 status: Conditional Pass |
| /workspace/project/kde/laboratory/LABORATORY-RULES.md | Session override behavior |
| /workspace/project/kde/governance/runtime/defaults.yaml | Configuration standards |

---

*Document Status*: REVISED
*Investigation*: LAB-039
*Phase*: 2 - GAP-7 Revision
*Revision Date*: 2026-07-23
