# AI Session Interface

**Document ID**: OPS-001
**Type**: Session Procedure
**Status**: DEFINED
**Purpose**: Define AI session procedures for consuming the Knowledge Layer

---

## Overview

This document defines how AI begins, conducts, and ends sessions within KDE. It integrates with the Knowledge Layer consumption protocol.

---

## Session Types

| Type | Trigger | Objective |
|------|---------|-----------|
| **Investigation** | Question or problem | Find or create knowledge |
| **Validation** | Knowledge candidate | Test and validate |
| **Population** | Archive content | Migrate knowledge |
| **Review** | Authorization request | Assess and approve |
| **Maintenance** | Gap report | Update knowledge |

---

## Session Lifecycle

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SESSION LIFECYCLE                                 │
└─────────────────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────────────────────────────────────────────────┐
    │                           SESSION START                              │
    └─────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
    ┌─────────────────────────────────────────────────────────────────────┐
    │  1. Read ROADMAP                                                     │
    │  2. Check current stage                                              │
    │  3. Load relevant knowledge                                          │
    │  4. Acknowledge principles                                           │
    └─────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
    ┌─────────────────────────────────────────────────────────────────────┐
    │                           WORK PHASE                                 │
    │                                                                     │
    │  • Consult Knowledge Layer first                                      │
    │  • Apply knowledge appropriately                                     │
    │  • Distinguish evidence/inference/hypothesis                         │
    │  • Flag gaps when identified                                         │
    │  • Maintain audit trail                                              │
    └─────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
    ┌─────────────────────────────────────────────────────────────────────┐
    │                           SESSION END                                │
    │                                                                     │
    │  • Summarize findings                                                │
    │  • Report gaps                                                       │
    │  • Request authorization (if needed)                                │
    │  • Log to audit trail                                                │
    └─────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                              "Research session complete.
                               Awaiting human review."
```

---

## Session Start Procedure

### Step 1: Read Roadmap

AI SHALL begin every session by reading `operations/roadmap/ROADMAP.md` and determining:

1. **Where were we?** - Current stage and objectives
2. **What was completed?** - Previous session outcomes
3. **What remains?** - Remaining tasks
4. **What is today's objective?** - Current session goal

### Step 2: Load Context

Load knowledge relevant to the current task:

| Task Type | Load First |
|-----------|------------|
| Foundation work | `knowledge/foundation/*.md` |
| Knowledge creation | `knowledge/schemas/KNOWLEDGE-OBJECT.md` |
| Pattern work | `knowledge/patterns/*.md` |
| Any task | `knowledge/schemas/CONSUMPTION-PROTOCOL.md` |

### Step 3: Acknowledge Principles

Explicitly acknowledge the Five Core Principles:

```
I acknowledge the Five Core Principles:
1. No Auto-Continuation - Will wait for human authorization
2. No Self-Approval - Will not approve own work
3. No Self-Promotion - Will not promote knowledge without authorization
4. Distinguish Evidence - Will mark evidence vs. inference vs. hypothesis
5. Evidence-Based - Will justify all claims
```

---

## Work Phase Protocol

### Knowledge-First Approach

For every task:

```
TASK → CHECK KNOWLEDGE → APPLY or FLAG GAP → CONTINUE
           │                    │
           ▼                    ▼
    ┌────────────┐      ┌────────────┐
    │ Knowledge  │      │   Gap     │
    │ Found      │      │ Detected  │
    └─────┬──────┘      └─────┬──────┘
          │                   │
          ▼                   ▼
    ┌────────────┐      ┌────────────┐
    │ Apply     │      │ Use        │
    │ with      │      │ reasoning, │
    │ citation  │      │ flag gap   │
    └────────────┘      └────────────┘
```

### Citation Requirements

| Statement Type | Required Citation |
|---------------|------------------|
| Claims based on knowledge | Knowledge Layer reference |
| Inferences | Mark as [Inference] |
| Hypotheses | Mark as [Hypothesis] |
| General reasoning | Mark as [General Reasoning] |

### Gap Handling

When no knowledge exists:

1. **Identify**: Note the gap clearly
2. **Assess**: Determine severity (HIGH/MEDIUM/LOW)
3. **Proceed**: Use reasoning to continue
4. **Report**: Document in session end report
5. **Recommend**: Suggest knowledge creation

---

## Session End Protocol

### Required Outputs

1. **Summary**: What was accomplished
2. **Gaps**: Any knowledge gaps identified
3. **Recommendations**: Suggested next actions
4. **Authorization Request**: If needed for continuation

### Authorization Request Format

When human authorization is needed:

```markdown
## Authorization Request

**Task**: [What was completed]
**Next Action**: [What should happen next]
**Authority Needed**: [Who can authorize]
**Options**:
  - [ ] Authorize to continue
  - [ ] Request changes
  - [ ] Hold for review
```

### Terminal Statement

Every session SHALL end with:

```
"Research session complete. Awaiting human review."
```

---

## Audit Trail

### Session Log Entry

Every session SHALL log to `operations/audit/`:

```yaml
session:
  id: SESSION-YYYY-MM-DD-NNN
  date: YYYY-MM-DD
  type: investigation|validation|population|review|maintenance
  stage: Stage N
  objectives: [list]
  knowledge_applied:
    - id: KNOWLEDGE-ID
      citation: reference
  gaps_identified:
    - id: GAP-NNN
      severity: HIGH|MEDIUM|LOW
      description: text
      recommended: action
  authorization_requested: boolean
  status: complete|pending_authorization
```

---

## Example Session

### Session Start

```
## Session Start: 2026-07-31

**Reading ROADMAP.md**:
- Current stage: Stage 3 - Establish AI Consumption Protocol
- Previous: Stage 2 complete (Knowledge Layer defined)
- Objective: Create CONSUMPTION-PROTOCOL.md and AI-INTERFACE.md

**Acknowledging Principles**:
I acknowledge the Five Core Principles...

**Starting Work**:
Creating AI-INTERFACE.md as Stage 3 deliverable.
```

### During Session

```
**Knowledge Applied**:
- CONSUMPTION-PROTOCOL.md: Protocol definition
- WHAT-IS-KNOWLEDGE.md: Definition framework

**Citations**:
According to CONSUMPTION-PROTOCOL.md: "AI consumes Knowledge Layer first..."

**No gaps identified** for this task.
```

### Session End

```
## Session End

**Completed**:
- Created CONSUMPTION-PROTOCOL.md
- Created AI-INTERFACE.md
- Updated ROADMAP.md

**Gaps**: None identified

**Next Actions**:
- Review deliverables
- Proceed to Stage 4 if approved

**Authorization**: Requested for Stage 3 completion

---

"Research session complete. Awaiting human review."
```

---

## Error Handling

### Knowledge Not Found

```markdown
## Gap Detected

**Query**: [What was searched for]
**Knowledge Types Checked**: [types searched]
**Result**: No matching knowledge found

**Severity**: [HIGH/MEDIUM/LOW]
**Reasoning Used**: [Brief description]
**Recommended**: [Suggested action]
```

### Contradictory Knowledge

```markdown
## Conflict Detected

**Knowledge A**: [ID and content]
**Knowledge B**: [ID and content]
**Conflict**: [Description]

**Resolution Approach**: [How to handle]
**Recommendation**: [Escalate/review/modify]
```

### Scope Violation

```markdown
## Scope Warning

**Knowledge**: [ID]
**Claimed Scope**: [scope]
**Actual Context**: [context]
**Applies**: NO

**Action**: Not applying knowledge, flagging scope limitation
```

---

## Compliance Checklist

Before ending session, verify:

- [ ] Read ROADMAP.md
- [ ] Acknowledged Five Core Principles
- [ ] Consulted Knowledge Layer before reasoning
- [ ] Cited knowledge when applicable
- [ ] Marked inference vs. hypothesis vs. evidence
- [ ] Flagged gaps when detected
- [ ] Maintained audit trail
- [ ] Requested authorization if needed
- [ ] Stated completion message

---

## Related Documents

| Document | Purpose |
|----------|---------|
| `knowledge/schemas/CONSUMPTION-PROTOCOL.md` | How AI consumes knowledge |
| `knowledge/foundation/PROMOTION-RULES.md` | Knowledge update rules |
| `operations/roadmap/ROADMAP.md` | Project status |
| `operations/audit/` | Session logs |

---

**Document Status**: DEFINED
**Authority**: Human
**Review**: After Stage 3 completion
