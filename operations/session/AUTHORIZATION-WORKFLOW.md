# Authorization Workflow

**Document ID**: OPS-003
**Type**: Workflow
**Status**: DEFINED
**Purpose**: Define how human authorization works in KDE

---

## Overview

Human authorization is required at key decision points. This document defines the authorization workflow, who can authorize what, and how authorization is recorded.

---

## Authorization Points

| Decision | Who Can Authorize | When Required |
|----------|-------------------|---------------|
| Continue to next stage | Human | After each stage |
| Approve knowledge | Human | After review |
| Promote knowledge | Human | To move to Knowledge Layer |
| Deprecate knowledge | Human | To remove from layer |
| Revise knowledge | Human | For major revisions |
| Override principle | Human | Only for emergency |

---

## Authorization Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         AUTHORIZATION FLOW                                    │
└─────────────────────────────────────────────────────────────────────────────┘

    ┌─────────────┐
    │   SESSION   │
    │   WORK      │
    └──────┬──────┘
           │
           ▼
    ┌─────────────┐
    │  REQUEST    │  AI requests authorization
    │ AUTHORIZATION│
    └──────┬──────┘
           │
           ▼
    ┌─────────────┐
    │   HUMAN     │
    │   REVIEW    │
    └──────┬──────┘
           │
     ┌─────┴─────┐
     │           │
     ▼           ▼
┌─────────┐ ┌─────────┐ ┌─────────┐
│GRANTED  │ │GRANTED  │ │ DENIED  │
│w/ scope │ │w/ changes│ │         │
└────┬────┘ └────┬────┘ └────┬────┘
     │           │           │
     ▼           ▼           ▼
┌─────────┐ ┌─────────┐ ┌─────────┐
│ CONTINUE│ │ REVISE  │ │  HOLD   │
│         │ │ & RESUB │ │         │
└─────────┘ └─────────┘ └─────────┘
```

---

## Authorization Request

### Format

When AI needs authorization, it produces:

```markdown
## Authorization Request

**Session**: SESSION-YYYY-MM-DD-NNN
**Date**: YYYY-MM-DD
**Requesting**: [proceed|approve|promote|deprecate|revise]

**Task Completed**:
- Description of work

**Next Action**:
- What should happen next

**Authority Needed**: human

**Options**:
- [ ] Authorize to continue
- [ ] Request changes
- [ ] Hold for review
- [ ] Deny

**Notes for Reviewer**:
- Any additional context
```

---

## Authorization Response

### Grant Authorization

```markdown
## Authorization Granted

**Session**: SESSION-YYYY-MM-DD-NNN
**Type**: [proceed|approve|promote|deprecate|revise]
**Granted By**: human_id
**Timestamp**: YYYY-MM-DD HH:MM:SS

**Scope**: [full|partial|specific]
**Conditions**: [any conditions or notes]

[Optional comments]
```

### Grant with Changes

```markdown
## Authorization Granted with Changes

**Session**: SESSION-YYYY-MM-DD-NNN
**Type**: [approve|revise]
**Granted By**: human_id
**Timestamp**: YYYY-MM-DD HH:MM:SS

**Required Changes**:
- Change 1
- Change 2

**Resubmit After**: Changes made
```

### Deny Authorization

```markdown
## Authorization Denied

**Session**: SESSION-YYYY-MM-DD-NNN
**Type**: [proceed|approve|promote|deprecate|revise]
**Denied By**: human_id
**Timestamp**: YYYY-MM-DD HH:MM:SS

**Reason**: [explanation]
**Next Steps**: [what to do instead]
```

---

## Stage Authorization

### After Each Stage

1. AI completes stage deliverables
2. AI produces authorization request
3. Human reviews deliverables
4. Human grants or denies
5. If granted, AI proceeds to next stage
6. If denied, AI revises and resubmits

### Stage Authorization Checklist

```
□ All deliverables for stage completed
□ All deliverables reviewed for consistency
□ No blocking issues identified
□ Knowledge citations verified
□ Gaps identified and flagged
□ Authorization request formatted correctly
```

---

## Knowledge Authorization

### For Knowledge Approval

1. AI submits candidate knowledge
2. Human reviews against criteria:
   - Validated (tests passed)
   - Evidence cited
   - Scope clear
   - No conflicts
3. Human approves or returns

### For Knowledge Promotion

1. Knowledge is in APPROVED state
2. Human reviews promotion request
3. Human confirms:
   - Evidence complete
   - Version assigned
   - ID assigned
4. Human promotes knowledge

---

## Emergency Override

### When Allowed

Emergency override is allowed only for:
- Critical safety issues
- Time-sensitive requirements
- Temporary fixes

### Process

1. Document emergency justification
2. Obtain immediate authorization (can be verbal)
3. Implement with documented scope
4. Complete full process within 30 days
5. Report outcome

### Limitations

Emergency override does NOT allow:
- Permanent changes to principles
- Elimination of required reviews
- Circumvention of evidence requirements

---

## Recording Authorization

### In Session Audit

```yaml
authorizations:
  - type: proceed
    granted_by: human_id
    timestamp: YYYY-MM-DD HH:MM:SS
    scope: continue
    notes: Approved to proceed
```

### In Audit Trail

All authorizations recorded to `operations/audit/`.

Format: `AUTH-YYYY-MM-DD-NNN.yaml`

---

## Anti-Patterns

### AI Must Not

| Anti-Pattern | Violation |
|--------------|-----------|
| Self-authorize | Violates No Self-Approval |
| Skip authorization | Violates process |
| Assume authorization | Must wait for explicit response |
| Proceed without response | Must wait for decision |

### Human Must Not

| Anti-Pattern | Violation |
|--------------|-----------|
| Auto-approve without review | Violates oversight |
| Approve without evidence | Violates evidence requirement |
| Skip documentation | Violates audit requirement |

---

## Compliance

Every authorization must:
1. Be requested explicitly
2. Be responded to explicitly
3. Be recorded in audit trail
4. Follow this format

---

## Examples

### Example 1: Stage Proceed

**AI Request**:
```markdown
## Authorization Request

**Session**: SESSION-2026-07-31-001
**Requesting**: proceed

**Task Completed**: Completed Stage 2 deliverables

**Next Action**: Proceed to Stage 3

**Authority Needed**: human
```

**Human Response**:
```markdown
## Authorization Granted

**Session**: SESSION-2026-07-31-001
**Type**: proceed
**Granted By**: human
**Timestamp**: 2026-07-31 12:00:00

Proceed to Stage 3.
```

---

### Example 2: Knowledge Approval

**AI Request**:
```markdown
## Authorization Request

**Session**: SESSION-2026-07-31-002
**Requesting**: approve

**Knowledge**: DEFN-001-WHAT-IS-KNOWLEDGE
**Task**: Review for approval

**Validation**: 5/5 tests passed
**Evidence**: INV-001 source cited

**Authority Needed**: human
```

**Human Response**:
```markdown
## Authorization Granted

**Session**: SESSION-2026-07-31-002
**Type**: approve
**Granted By**: human
**Timestamp**: 2026-07-31 13:00:00

Knowledge approved for promotion.
```

---

**Document Status**: DEFINED
**Authority**: Human
**Related**: AI-INTERFACE.md, AUDIT-FORMAT.md, BOOTSTRAP.md
