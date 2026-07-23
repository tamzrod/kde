# Revised Chain-of-Custody Enhancement (GAP-5 Revision)

**Document ID**: LAB-039-004
**Source**: LAB-039 Phase 4
**Date**: 2026-07-23
**Status**: REVISED
**Original**: LAB-037 Phase 5, LAB-038 Phase 5 Validation
**Prior Issues Addressed**: Immutability clarification, Legacy custodian, Escalation path

---

## Revision Overview

### Original Concerns (LAB-038)

LAB-038 Phase 5 Validation identified three issues with the Chain-of-Custody enhancement:

| Issue | Severity | Original Concern |
|-------|----------|-----------------|
| Immutability clarification | MEDIUM | "Never modify" vs corrections needed |
| Legacy evidence custodian | MEDIUM | Existing evidence lacks custodian |
| Escalation path undefined | LOW | No process if custodian unavailable |

---

## Proposed Resolution

### Resolution 1: Artifact Modification Policy (Versioned Artifacts)

**Original Concern**: "Never modify" conflicts with corrections needed.

**Proposed Solution**: Clarify that evidence immutability means preservation with versioned corrections

```markdown
## Evidence Immutability Clarification

### The Immutability Principle

Evidence immutability means:
1. Original evidence is NEVER modified or deleted
2. Corrections create NEW evidence versions
3. Both original and new versions are preserved
4. Complete audit trail is maintained

### Modification Policy

```
┌─────────────────────────────────────────────────────────────┐
│                  EVIDENCE MODIFICATION POLICY                    │
└─────────────────────────────────────────────────────────────┘

    Evidence File (Original)
         │
         │ IMMUTABLE
         │ Never modified, never deleted
         ▼
    Original SHA-256 hash preserved
         │
         │
    ┌────┴────────────────────────────────────────────────────┐
    │                                                         │
    │  If CORRECTION needed:                                  │
    │                                                         │
    │  1. Create NEW evidence file                            │
    │  2. Apply corrections to NEW file                       │
    │  3. Generate NEW SHA-256 hash                          │
    │  4. Link NEW to ORIGINAL with explanation               │
    │  5. Preserve BOTH files                                │
    │                                                         │
    └─────────────────────────────────────────────────────────┘
         │
         │ NEW VERSION
         ▼
    Evidence File (Corrected v2)
```

### Version Creation Process

```python
def create_evidence_version(original_path, corrections, justification):
    """
    Create a new version of evidence with corrections.
    
    Args:
        original_path: Path to immutable original
        corrections: Description of corrections made
        justification: Why corrections were needed
    
    Returns:
        Version metadata with links to original
    """
    
    # Step 1: Verify original exists and is immutable
    assert original_path.exists()
    assert original_path.protection_level == "ABSOLUTE"
    
    # Step 2: Create new version file
    version_path = original_path.parent / f"{original_path.stem}.v{version_number}{original_path.suffix}"
    
    # Step 3: Apply corrections to new file
    with open(original_path, 'r') as orig:
        original_content = orig.read()
    
    corrected_content = apply_corrections(original_content, corrections)
    
    with open(version_path, 'w') as new:
        new.write(corrected_content)
    
    # Step 4: Generate new hash
    new_hash = sha256(version_path)
    
    # Step 5: Create version metadata
    metadata = {
        "version": version_number,
        "original": str(original_path),
        "original_hash": sha256(original_path),
        "corrected_hash": new_hash,
        "corrections": corrections,
        "justification": justification,
        "created_by": current_session.agent_id,
        "created_at": timestamp(),
        "approved_by": "REQUIRED_HUMAN_APPROVAL"
    }
    
    # Step 6: Preserve original (never delete)
    # Both original and version now exist
    
    return metadata
```

### Evidence Versioning Rules

| Rule | Description | Rationale |
|------|-------------|-----------|
| Original Preserved | Original file never deleted | Audit trail |
| Version Linked | New version links to original | Traceability |
| Justification Required | Corrections require justification | Accountability |
| Human Approval | Corrections need human approval | Authority |
| Both Accessible | Both files accessible | Complete record |

### Correction Categories

```markdown
## Allowed Corrections (Create New Version)

| Category | Example | Allowed? |
|----------|---------|----------|
| Format correction | Convert encoding | YES |
| Metadata enrichment | Add tags | YES |
| Redaction | Remove sensitive data | YES (with approval) |
| Typo fix | Correct spelling error | YES |

## Forbidden Corrections (Never Allowed)

| Category | Example | Rationale |
|----------|---------|----------|
| Data alteration | Change measurement | Scientific integrity |
| Timestamp change | Adjust dates | Audit integrity |
| Evidence removal | Delete inconvenient data | Evidence destruction |
| Finding modification | Change conclusions | Scientific fraud |

### Version Naming Convention

```
evidence/
├── data.csv                    # Original evidence (immutable)
├── data.v1.csv                # Version 1 (immutable)
├── data.v2.csv                # Version 2 (immutable)
└── data.v2.metadata.yaml      # Version metadata
```

### Version Metadata Template

```yaml
# evidence/data.v2.metadata.yaml

evidence_version:
  version: 2
  original_file: data.csv
  original_hash: "abc123..."
  
  correction:
    date: "2026-07-23"
    corrections:
      - "Fixed encoding from Latin-1 to UTF-8"
      - "Corrected typo in header"
    justification: "Format correction required for analysis"
    approved_by: "human@example.com"
    
  chain_of_custody:
    v1_created: "2026-07-20"
    v1_created_by: "Agent-001"
    v2_created: "2026-07-23"
    v2_created_by: "Agent-002"
    v2_approved_by: "human@example.com"
```
```

---

### Resolution 2: Default Evidence Custodian for Legacy Artifacts

**Original Concern**: Existing evidence lacks custodian fields.

**Proposed Solution**: Define System custodian and legacy evidence handling

```markdown
## Evidence Custodian Assignment

### Default Custodian: System

For evidence without explicit custodian assignment:

```yaml
# Evidence Custodian Assignment

## Default Custodian

When evidence lacks custodian assignment, it is assigned:

| Field | Value |
|-------|-------|
| **Custodian Type** | System (KDE Governance) |
| **Custodian ID** | SYSTEM |
| **Effective Date** | Evidence creation date |
| **Authority** | Human Governance (collective) |

## System Custodian Justification

The "System" custodian represents KDE Governance collectively because:
1. Individual AI agents may change
2. Evidence predates current agents
3. Governance is permanent
4. Accountability is maintained

### Custodian Assignment Rules

| Evidence Type | Custodian | Override Allowed |
|--------------|-----------|-----------------|
| Current evidence | Collecting agent | YES |
| Legacy evidence | SYSTEM | YES (requires approval) |
| Critical evidence | Human + Agent | NO |
| System evidence | Runtime | NO |

### Legacy Evidence Handling

```python
# When loading legacy evidence without custodian:

def get_evidence_custodian(evidence_path):
    """
    Get custodian for evidence, handling legacy cases.
    """
    
    # Check for explicit custodian in metadata
    metadata = load_evidence_metadata(evidence_path)
    
    if "custodian" in metadata:
        return metadata["custodian"]
    
    # Legacy evidence - assign SYSTEM custodian
    else:
        return {
            "type": "SYSTEM",
            "id": "SYSTEM",
            "assigned_at": evidence_path.created_date,
            "assignment_reason": "Legacy evidence - no explicit custodian"
        }

# Generate custodian assignment log
def assign_system_custodian(evidence_path):
    """
    Assign System custodian to legacy evidence.
    """
    metadata = load_or_create_metadata(evidence_path)
    
    metadata["custodian"] = {
        "type": "SYSTEM",
        "id": "SYSTEM",
        "assigned_at": timestamp(),
        "assigned_by": "runtime",
        "assignment_reason": "Legacy evidence - custodian retroactively assigned"
    }
    
    # Update metadata file
    save_metadata(metadata)
    
    # Log assignment
    log_custodian_assignment(
        evidence=evidence_path,
        custodian="SYSTEM",
        reason="Legacy evidence"
    )
```

### Legacy Evidence Migration

```
┌─────────────────────────────────────────────────────────────┐
│                  LEGACY EVIDENCE MIGRATION                      │
└─────────────────────────────────────────────────────────────┘

    Legacy Evidence Collection
         │
         ▼
    ┌─────────────────┐
    │ Identify        │
    │ Custodians      │ ◄── Check metadata for explicit custodian
    └────────┬────────┘
             │
             ▼
    ┌─────────────────┐
    │ Assign SYSTEM   │
    │ to Unassigned   │ ◄── Retroactively assign "SYSTEM" custodian
    └────────┬────────┘
             │
             ▼
    ┌─────────────────┐
    │ Log Assignment  │
    │                 │ ◄── Record in access log
    └────────┬────────┘
             │
             ▼
    ┌─────────────────┐
    │ Update Metadata │
    │                 │ ◄── Add custodian field
    └─────────────────┘
             │
             ▼
    ┌─────────────────┐
    │ Verify Integrity│
    │                 │ ◄── Confirm hashes match originals
    └─────────────────┘
```

### Legacy Evidence Limitations

```markdown
## Legacy Evidence Acknowledgment

Evidence collected before chain-of-custody implementation has limitations:

| Limitation | Impact | Mitigation |
|-----------|--------|------------|
| No custodian history | Unknown provenance | Assign SYSTEM custodian |
| No access log | Unknown who accessed | Log current access + acknowledge |
| No modification tracking | Unknown changes | Verify current hash |
| No verification history | Unknown past checks | Perform initial verification |

**Note**: These limitations are acknowledged and documented.
Legacy evidence is preserved with full current protection.
```
```

---

### Resolution 3: Escalation Path for Custodian Unavailability

**Original Concern**: No process if custodian unavailable.

**Proposed Solution**: Define clear escalation path

```markdown
## Custodian Escalation Path

### Escalation Triggers

Custodian escalation is triggered when:

| Trigger | Condition | Priority |
|---------|-----------|----------|
| Custodian Offline | No response for 48 hours | NORMAL |
| Custodian Unavailable | Agent deleted or role changed | HIGH |
| Custodian Conflict | Custodian disagrees with verification | HIGH |
| Emergency | Evidence integrity at risk | CRITICAL |

### Escalation Levels

```
┌─────────────────────────────────────────────────────────────┐
│                  CUSTODIAN ESCALATION                           │
└─────────────────────────────────────────────────────────────┘

Level 1: Attempt Contact
├── Contact custodian via configured channel
├── Wait 48 hours for response
└── Log attempt

    │
    ▼ (No response in 48 hours)
    
Level 2: Assign Temporary Custodian
├── Runtime assigns temporary custodian
├── Notify human governance
├── Temporary custodian can verify
└── Log assignment

    │
    ▼ (Issue unresolved or critical)
    
Level 3: Governance Review
├── Human governance reviews case
├── Determine resolution
├── May reassign custodian
└── Document decision

    │
    ▼ (Emergency only)
    
Level 4: Emergency Action
├── Evidence locked (read-only)
├── Investigation initiated
├── Root cause analysis
└── Process improvement
```

### Escalation Process

```python
def escalate_custodian_issue(evidence_path, trigger):
    """
    Handle custodian escalation.
    """
    
    escalation_level = determine_escalation_level(trigger)
    
    if escalation_level == 1:
        # Level 1: Attempt contact
        contact_custodian(evidence_path)
        schedule_followup(hours=48)
        
    elif escalation_level == 2:
        # Level 2: Temporary custodian
        temp_custodian = assign_temporary_custodian(evidence_path)
        notify_governance(f"Temporary custodian assigned to {evidence_path}")
        log_escalation(evidence_path, "LEVEL_2", temp_custodian)
        
    elif escalation_level == 3:
        # Level 3: Governance review
        notify_governance(f"ESCALATION: {evidence_path} requires review")
        lock_evidence(evidence_path)
        await_governance_decision(evidence_path)
        
    elif escalation_level == 4:
        # Level 4: Emergency
        emergency_lock(evidence_path)
        initiate_investigation(evidence_path)
        notify_all_stakeholders(f"EMERGENCY: {evidence_path}")
        
def assign_temporary_custodian(evidence_path):
    """
    Assign a temporary custodian for escalation.
    """
    
    # Assign to Runtime (system-level custodian)
    temp_custodian = {
        "type": "TEMPORARY",
        "id": "RUNTIME",
        "assigned_at": timestamp(),
        "original_custodian": get_original_custodian(evidence_path),
        "escalation_reason": "Original custodian unavailable"
    }
    
    # Update evidence metadata
    update_metadata(evidence_path, "temp_custodian", temp_custodian)
    
    # Return custodianship
    return temp_custodian
```

### Custodian Unavailability Response

| Scenario | Response | Authority |
|----------|----------|-----------|
| Agent deleted | Assign TEMPORARY custodian | Runtime |
| No response 48h | Assign TEMPORARY custodian | Runtime |
| Custodian conflict | Governance review | Human |
| Evidence at risk | Emergency lock | Runtime + Human |

### Notification Requirements

```yaml
# Notification matrix

notifications:
  level_1_contact:
    recipients:
      - original_custodian
    message: "Evidence verification required: {evidence_path}"
    
  level_2_temporary:
    recipients:
      - governance
      - original_custodian
    message: "Temporary custodian assigned: {evidence_path}"
    
  level_3_review:
    recipients:
      - governance
    message: "ESCALATION: {evidence_path} requires governance review"
    
  level_4_emergency:
    recipients:
      - all_stakeholders
    message: "EMERGENCY LOCK: {evidence_path}"
```

---

## Authority Verification

**Question**: Does this revision follow KDE authority hierarchy?

**Analysis**:

| Layer | Requirement | Status |
|-------|-------------|--------|
| Governance | Owns evidence policy | ✓ EVIDENCE.md is governance |
| Human Authority | Controls corrections | ✓ Human approval required |
| Evidence Protection | ABSOLUTE protection | ✓ Originals never modified |
| Chain-of-Custody | Complete record | ✓ Version metadata maintained |

**FINDING**: ✓ PASS - Authority hierarchy preserved and enhanced

---

## Backward Compatibility

**Question**: Is this revision backward compatible?

**Analysis**:

| Aspect | Original | Revised | Compatible? |
|--------|----------|---------|-------------|
| Evidence preservation | ✓ NEVER DELETE | ✓ NEVER DELETE | ✓ |
| Original immutability | ⚠️ UNCLEAR | ✓ PRESERVED | ✓ (clarified) |
| Corrections | ✗ NOT ADDRESSED | ✓ VERSIONED | ✓ (new capability) |
| Legacy custodian | ✗ NOT ADDRESSED | ✓ SYSTEM assigned | ✓ (new capability) |

**FINDING**: ✓ PASS - Fully backward compatible

---

## New Dependencies Introduced

**Question**: Does this revision introduce new dependencies?

**Analysis**:

| Dependency | Introduced By | Required For |
|------------|--------------|--------------|
| Version metadata | Versioned corrections | Track corrections |
| SYSTEM custodian | Legacy handling | Assign custodians |
| Escalation system | Unavailability | Handle unavailable custodians |

**FINDING**: ✓ NEW DEPENDENCIES - Runtime capabilities + Governance review

---

## Gap Resolution Assessment

### Original Gap (GAP-5)

"Chain-of-custody incomplete (missing custodian, periodic verification, modification tracking)"

### Does Revision Fully Resolve Gap?

| Missing Element | Original | Revised | Improvement |
|----------------|----------|---------|-------------|
| Custodian assignment | ✗ NO | ✓ YES | SYSTEM default + escalation |
| Periodic verification | ✓ YES | ✓ YES | Unchanged |
| Modification tracking | ⚠️ UNCLEAR | ✓ YES | Versioned corrections |
| Formal protocol | ✓ YES | ✓ YES | Enhanced with version metadata |

**Completeness**: SUBSTANTIAL → FULL

---

## Phase 4 Revision Summary

### Issues Addressed

| # | Issue | Status | Resolution |
|---|-------|--------|------------|
| 1 | Immutability clarification | ✓ RESOLVED | Versioned corrections + original preserved |
| 2 | Legacy evidence custodian | ✓ RESOLVED | SYSTEM custodian + migration |
| 3 | Escalation path undefined | ✓ RESOLVED | 4-level escalation + notification |

### New Dependencies

| Dependency | Purpose |
|------------|---------|
| Version metadata | Track corrections |
| SYSTEM custodian | Legacy handling |
| Escalation system | Unavailable custodians |

### Backward Compatibility

**Status**: ✓ FULLY COMPATIBLE

### Recommendation

**Phase 5 can proceed with REVISED EVIDENCE.md containing:
- Immutability clarification (originals preserved, corrections versioned)
- Default SYSTEM custodian (legacy handling)
- Escalation path (4-level with notifications)

---

## Evidence Sources

| Document | Finding |
|----------|---------|
| LAB-038 Phase 5 Validation | Issues 11, 12, 13 identified |
| LAB-038 Shadow Report | Phase 5 status: Conditional Pass |
| /workspace/project/kde/laboratory/EVIDENCE.md | Current evidence policy |
| /workspace/project/kde/laboratory/LABORATORY-RULES.md | Evidence principles |

---

*Document Status*: REVISED
*Investigation*: LAB-039
*Phase*: 4 - GAP-5 Revision
*Revision Date*: 2026-07-23
