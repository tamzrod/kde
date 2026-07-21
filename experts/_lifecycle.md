# Engineering Expert Lifecycle

**Document ID**: KDE-EXPERT-LIFECYCLE-001  
**Version**: 1.0.0  
**Status**: CANDIDATE  
**Date**: 2026-07-21  

---

## Overview

This document defines the lifecycle states, transitions, and governance for Engineering Experts within the KDE Knowledge Discovery Engine.

---

## State Diagram

```
┌─────────────┐
│ SYNTHESIZED │
└──────┬──────┘
       │ Create
       ▼
┌─────────────┐
│  CANDIDATE  │
└──────┬──────┘
       │ Validate
       ▼
┌─────────────┐
│  VALIDATED  │
└──────┬──────┘
       │ Register
       ▼
┌─────────────┐
│ REGISTERED  │◄──────────────┐
└──────┬──────┘               │
       │                      │ Re-validate
       │ Use                  │
       ▼                      │
┌─────────────┐               │
│   ACTIVE    │───────────────┘
└──────┬──────┘
       │ Deprecate
       ▼
┌─────────────┐
│ DEPRECATED  │
└─────────────┘
```

---

## State Definitions

### SYNTHESIZED

**Description**: Expert has been created from investigation synthesis.

**Entry Conditions**:
- Expert directory created with required files
- expert.yaml, capabilities.yaml, knowledge-refs.yaml, validation.yaml present
- Initial changelog.md created

**Exit Conditions**:
- All 4 core files complete
- Capability specifications defined
- Knowledge dependencies identified
- Validation criteria specified

**Authority**: Investigator (AI)

---

### CANDIDATE

**Description**: Expert is ready for validation testing.

**Entry Conditions**:
- SYNTHESIZED state achieved
- Self-validation checklist passed
- Documentation complete

**Exit Conditions**:
- Pass: Transition to VALIDATED
- Fail: Return to SYNTHESIZED for revision

**Authority**: Investigator (AI)

---

### VALIDATED

**Description**: Expert has passed validation criteria.

**Entry Conditions**:
- All critical criteria passed (85% overall)
- No critical failures in validation report
- Repeatability verified
- Knowledge integration verified

**Exit Conditions**:
- Pass: Transition to REGISTERED (Human approval required)
- Fail: Return to CANDIDATE with revision requirements

**Authority**: Validator

---

### REGISTERED

**Description**: Expert is registered in the Expert Registry.

**Entry Conditions**:
- VALIDATED state achieved
- Human approval obtained
- Registry entry created
- Human approver recorded

**Exit Conditions**:
- First successful use: Transition to ACTIVE
- Deprecation: Transition to DEPRECATED

**Authority**: Human

---

### ACTIVE

**Description**: Expert is in production use.

**Entry Conditions**:
- REGISTERED state achieved
- Successfully used in investigation

**Exit Conditions**:
- Deprecation: Transition to DEPRECATED
- Re-validation: Return to VALIDATED

**Authority**: Runtime

---

### DEPRECATED

**Description**: Expert is no longer current or valid.

**Entry Conditions**:
- Human deprecation approval
- Replacement Expert identified (if any)

**Exit Conditions**: None (terminal state)

**Authority**: Human

---

## Transition Table

| From | To | Authority | Evidence Required |
|------|-----|-----------|------------------|
| (new) | SYNTHESIZED | Investigator | Expert directory created |
| SYNTHESIZED | CANDIDATE | Investigator | All core files complete |
| CANDIDATE | SYNTHESIZED | Validator | Revision needed |
| CANDIDATE | VALIDATED | Validator | Validation passed |
| VALIDATED | REGISTERED | Human | Approval granted |
| REGISTERED | ACTIVE | Runtime | First use |
| ACTIVE | VALIDATED | Validator | Re-validation |
| ACTIVE | DEPRECATED | Human | Deprecation approved |

---

## Validation Requirements

### Required Checks

| Check | Required For | Description |
|-------|-------------|-------------|
| Core files complete | SYNTHESIZED | expert.yaml, capabilities.yaml, knowledge-refs.yaml, validation.yaml |
| Self-validation | CANDIDATE | Developer checklist |
| Repeatability | VALIDATED | 3+ consistent runs |
| Knowledge compliance | VALIDATED | All Knowledge references valid |
| Capability tests | VALIDATED | All must-pass tests |

### Validation Report

Every VALIDATED Expert SHALL include:

```markdown
# Validation Report

## Test Environment
- Browser: Chrome Latest
- Viewport: 1920x1080
- Date: YYYY-MM-DD

## Results Summary
| Criterion | Status | Evidence |
|-----------|--------|----------|
| Engineering Correctness | PASS | Screenshots |
| Operator Usability | PASS | Test logs |
| Performance | PASS | Metrics |
| Readability | PASS | Measurements |
| Scalability | PASS | Test results |
| Professional | PASS | Screenshots |

## Pass Rate: X%
## Critical Failures: N
```

---

## Deprecation

### Reasons for Deprecation

| Reason | Description |
|--------|-------------|
| Superseded | New version replaces this |
| Invalid | Found to be incorrect |
| Obsolete | No longer applicable |
| Deprecated | Deliberately deprecated |

### Deprecation Process

1. Set `status: DEPRECATED` in expert.yaml
2. Update registry entry
3. Document deprecation reason
4. Identify replacement Expert (if any)
5. Preserve Expert files (never delete)

---

## Version Management

### Version Numbering

Semantic versioning: MAJOR.MINOR.PATCH

| Increment | When |
|-----------|------|
| MAJOR | Fundamental capability changes |
| MINOR | Added capabilities or enhanced validation |
| PATCH | Bug fixes, documentation |

### Version History

Every Expert SHALL include:

```markdown
## Version History

| Version | Date | Changes | Authority |
|---------|------|---------|-----------|
| 1.0.0 | YYYY-MM-DD | Initial version | Creator |
| 1.1.0 | YYYY-MM-DD | Added capability X | Investigator |
```

---

## References

| Document | Relationship |
|----------|--------------|
| KDE-EXPERT-ARCH-001 | Expert architecture specification |
| KDE-KNOWLEDGE-LIFECYCLE | Knowledge lifecycle pattern |

---

## Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-07-21 | Initial lifecycle |

---

**Status**: CANDIDATE  
**Ready for Review**: Yes
