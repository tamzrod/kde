# Audit Trail Format

**Document ID**: OPS-002
**Type**: Audit Specification
**Status**: DEFINED
**Purpose**: Define the format for audit trail entries

---

## Overview

The audit trail records all significant actions and decisions within KDE. It provides accountability and traceability.

---

## Audit Log Location

`operations/audit/sessions/`

**Format**: `SESSION-YYYY-MM-DD-NNN.yaml`

---

## Session Audit Entry

```yaml
session:
  id: SESSION-YYYY-MM-DD-NNN
  date: YYYY-MM-DD
  start_time: HH:MM:SS
  end_time: HH:MM:SS
  type: investigation|validation|population|review|maintenance
  
stage:
  current: "Stage N"
  objective: description
  
knowledge_applied:
  - id: KNOWLEDGE-ID
    title: title
    citation: reference
    
gaps_identified:
  - id: GAP-NNN
    severity: HIGH|MEDIUM|LOW
    description: text
    recommended: action
    
authorizations:
  - type: proceed|approve|promote|deprecate
    granted_by: human_id
    timestamp: YYYY-MM-DD HH:MM:SS
    notes: text
    
work_completed:
  - description
  - description
    
next_action:
  description: text
  authority_needed: human|ai
  
status: complete|pending_authorization

terminal_message: "Research session complete. Awaiting human review."
```

---

## Authorization Record

### For Proceed

```yaml
authorization:
  type: proceed
  session_id: SESSION-YYYY-MM-DD-NNN
  granted_by: human_id
  timestamp: YYYY-MM-DD HH:MM:SS
  scope: continue|next_stage|specific_task
  conditions: text
```

### For Knowledge Approval

```yaml
authorization:
  type: approve
  session_id: SESSION-YYYY-MM-DD-NNN
  granted_by: human_id
  timestamp: YYYY-MM-DD HH:MM:SS
  knowledge_id: KNOWLEDGE-ID
  knowledge_title: title
  scope: approved|approved_with_changes|rejected
  notes: text
```

### For Knowledge Promotion

```yaml
authorization:
  type: promote
  session_id: SESSION-YYYY-MM-DD-NNN
  granted_by: human_id
  timestamp: YYYY-MM-DD HH:MM:SS
  knowledge_id: KNOWLEDGE-ID
  from_status: approved
  to_status: promoted
  version: X.Y.Z
```

---

## Example: Complete Session Audit

```yaml
session:
  id: SESSION-2026-07-31-001
  date: 2026-07-31
  start_time: 10:00:00
  end_time: 10:45:00
  type: investigation
  
stage:
  current: "Stage 2"
  objective: "Define the Knowledge Layer"
  
knowledge_applied:
  - id: DEFN-001
    title: "What is Knowledge?"
    citation: "knowledge/definitions/DEFN-001.md"
    
gaps_identified: []

authorizations:
  - type: proceed
    granted_by: human
    timestamp: 2026-07-31 10:45:00
    notes: "Approved to continue to Stage 3"
    
work_completed:
  - "Created WHAT-IS-KNOWLEDGE.md"
  - "Created KNOWLEDGE-OBJECT.md schema"
  - "Created KNOWLEDGE-LIFECYCLE.md"
  - "Created KNOWLEDGE-TYPES.md"
  - "Created PROMOTION-RULES.md"
    
next_action:
  description: "Proceed to Stage 3"
  authority_needed: "human"
  
status: complete

terminal_message: "Research session complete. Awaiting human review."
```

---

## Audit Log Index

`operations/audit/INDEX.yaml`

```yaml
index:
  last_updated: YYYY-MM-DD
  total_sessions: NNN
  by_type:
    investigation: NNN
    validation: NNN
    population: NNN
    review: NNN
    maintenance: NNN
  by_status:
    complete: NNN
    pending_authorization: NNN
  recent:
    - id: SESSION-YYYY-MM-DD-NNN
      date: YYYY-MM-DD
      type: type
      status: status
```

---

## Compliance

- Every session MUST produce an audit entry
- Every authorization MUST be recorded
- Audit entries MUST be complete before session closes
- Terminal message MUST be present

---

**Document Status**: DEFINED
**Authority**: Human
**Related**: AI-INTERFACE.md, BOOTSTRAP.md
