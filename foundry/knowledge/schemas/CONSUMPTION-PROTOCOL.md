# AI Consumption Protocol

**Document ID**: SCHEMA-002
**Type**: Protocol
**Status**: DEFINED
**Purpose**: Define how AI consumes the Knowledge Layer

---

## Overview

This document defines how AI agents consume, use, and interact with the Knowledge Layer. It establishes the protocol for knowledge retrieval, application, and gap identification.

**Principle**: AI consumes the Knowledge Layer first and fills only the remaining gaps with general reasoning.

---

## Consumption Hierarchy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         AI CONSUMPTION HIERARCHY                           │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────┐
                              │  KNOWLEDGE  │
                              │    LAYER    │
                              │  (Primary)  │
                              └──────┬──────┘
                                     │
                         ┌───────────┼───────────┐
                         │                       │
                         ▼                       ▼
                 ┌─────────────┐         ┌─────────────┐
                 │   MATCH?   │         │  NO MATCH?  │
                 └──────┬──────┘         └──────┬──────┘
                        │                       │
              ┌─────────┴─────────┐             │
              │                   │             ▼
              ▼                   ▼     ┌─────────────┐
      ┌─────────────┐     ┌─────────────┐│ GENERAL     │
      │   APPLY     │     │  EXPAND    ││ REASONING   │
      │  KNOWLEDGE  │     │   SCOPE    ││  (Gap Fill) │
      └─────────────┘     └─────────────┘└─────────────┘
```

---

## Consumption Rules

### Rule 1: Consult First

AI SHALL consult the Knowledge Layer before using general reasoning.

**Process**:
1. Identify the question or task
2. Check Knowledge Layer for relevant knowledge
3. If found, apply knowledge
4. If not found, use general reasoning
5. Flag the gap for knowledge capture

### Rule 2: Cite Precisely

AI SHALL cite specific knowledge items when making claims.

| Citation Format | Example |
|----------------|---------|
| Type + ID | `principle/PRIN-001` |
| Document reference | `knowledge/foundation/WHAT-IS-KNOWLEDGE.md` |
| Inline | `According to PRIN-001-AUTO-CONTINUATION...` |

### Rule 3: Respect Scope

AI SHALL apply knowledge only within defined boundaries.

| Scope Element | Behavior |
|--------------|----------|
| `applies_to` | Use knowledge for these contexts |
| `excludes` | Do not use knowledge for these contexts |
| `conditions` | Verify conditions before applying |

### Rule 4: Distinguish Sources

AI SHALL clearly distinguish between:

| Source | Marker | Example |
|--------|--------|---------|
| **Knowledge Layer** | Direct citation | "According to KNOWLEDGE..." |
| **Inference** | Mark as inference | "This suggests that..." |
| **Hypothesis** | Mark as hypothesis | "It may be that..." |
| **General Reasoning** | Mark as reasoning | "Based on general reasoning..." |

### Rule 5: Flag Gaps

AI SHALL identify when no knowledge exists for a situation.

**Gap Report Format**:
```markdown
## Knowledge Gap Detected

**Question**: [What was being asked]
**No knowledge found**: [Relevant knowledge types checked]
**Action taken**: [How gap was filled]
**Gap flagged**: YES
**Recommended**: [Suggested knowledge to create]
```

---

## Retrieval Protocol

### Step 1: Identify Query Type

| Query Type | Knowledge Type | Example |
|-----------|---------------|---------|
| "How should I..." | workflow | Procedure questions |
| "What is..." | definition | Concept questions |
| "Why should I..." | principle | Rule questions |
| "When should I..." | pattern | Solution questions |
| "What happened..." | lesson | Experience questions |
| "Why did we choose..." | decision | Rationale questions |

### Step 2: Search Knowledge Layer

**Search Order**:
1. Exact match by ID
2. Type-specific search
3. Keyword search
4. Related knowledge
5. Dependency chain

### Step 3: Apply or Extend

| Condition | Action |
|-----------|--------|
| Exact match found | Apply directly |
| Partial match | Apply with scope clarification |
| Related match | Apply and note relationship |
| No match | Flag gap, use reasoning |

---

## Application Protocol

### For Principles

1. Verify applicability to current context
2. Check if principle is foundational (immutable)
3. Apply without modification
4. Cite the principle
5. Report if unable to apply

### For Patterns

1. Verify problem matches pattern context
2. Check forces and conditions
3. Apply solution
4. Document any adaptations
5. Report effectiveness

### For Workflows

1. Identify current step
2. Check prerequisites
3. Execute step
4. Verify exit criteria
5. Move to next step

### For Definitions

1. Verify scope applicability
2. Apply definition
3. Use components as needed
4. Distinguish from related terms

### For Decisions

1. Verify context matches
2. Review rationale
3. Apply decision
4. Note any context differences
5. Flag if decision needs review

### For Lessons

1. Check applicability to current situation
2. Apply mitigation if relevant
3. Note any variations
4. Report if lesson is outdated

---

## Gap Identification

### When to Flag a Gap

AI SHALL flag a gap when:

| Condition | Example |
|-----------|---------|
| No knowledge exists | "What is X?" has no definition |
| Knowledge incomplete | Definition missing scope |
| Knowledge outdated | Lesson from deprecated era |
| Knowledge contradictory | Two principles conflict |
| Knowledge missing evidence | Claim without support |

### Gap Severity

| Severity | Criteria | Action |
|----------|---------|--------|
| **HIGH** | Blocks work | Flag immediately, use reasoning |
| **MEDIUM** | Reduces quality | Flag, note uncertainty |
| **LOW** | Minor gap | Log for future knowledge |

### Gap Reporting

Every session SHALL include a gap report if gaps were identified:

```markdown
## Gap Report

| Gap ID | Severity | Description | Recommended Action |
|--------|----------|-------------|-------------------|
| GAP-001 | HIGH | No definition for X | Create definition |
| GAP-002 | MEDIUM | Outdated lesson | Review and update |
```

---

## Session Protocol

### Session Start

1. Read `operations/roadmap/ROADMAP.md`
2. Check current stage and objectives
3. Identify relevant knowledge for task
4. Load applicable principles
5. Begin work

### During Session

1. Check knowledge before reasoning
2. Cite knowledge when applying
3. Mark inference vs. knowledge
4. Flag gaps when detected
5. Maintain audit trail

### Session End

1. Report gaps identified
2. Summarize knowledge applied
3. Request human authorization (if needed)
4. Log to audit trail
5. State: "Research session complete. Awaiting human review."

---

## Anti-Patterns

### Invalid Consumption

| Anti-Pattern | Violation | Correct Behavior |
|--------------|-----------|-----------------|
| Skip consultation | Rule 1 | Always check layer first |
| Generic citation | Rule 2 | Cite specific items |
| Apply outside scope | Rule 3 | Respect boundaries |
| No distinction | Rule 4 | Mark source type |
| Ignore gaps | Rule 5 | Report all gaps |

### Invalid Claims

| Anti-Pattern | Correct Behavior |
|--------------|-----------------|
| "Knowledge shows..." | "KNOWLEDGE-LAYER/PRIN-001 states..." |
| Unmarked inference | "[Inference]: This suggests..." |
| Unmarked hypothesis | "[Hypothesis]: It may be that..." |
| Assumed coverage | "No knowledge found for X. Using reasoning." |

---

## Knowledge Update Protocol

AI SHALL NOT update the Knowledge Layer directly. To update:

1. **Propose**: Submit candidate through promotion process
2. **Justify**: Provide evidence and rationale
3. **Submit**: Create candidate knowledge object
4. **Wait**: Human reviews and approves
5. **Promote**: Human promotes to Knowledge Layer

See: `knowledge/foundation/PROMOTION-RULES.md`

---

## Examples

### Example 1: Applying a Principle

```markdown
## Task: Decide whether to continue without authorization

**Knowledge Check**: 
- Consulting knowledge/foundation/PROMOTION-RULES.md
- Found: PRIN-001-AUTO-CONTINUATION

**Application**:
According to PRIN-001-AUTO-CONTINUATION: "AI must wait for explicit human 
authorization before continuing."

**Decision**: Do not continue. Request authorization.

**Citation**: knowledge/foundation/PROMOTION-RULES.md#five-core-principles
```

### Example 2: No Knowledge Found

```markdown
## Task: Explain topic X

**Knowledge Check**:
- Searching definition type...
- No definition for "topic X"
- Searching related knowledge...
- No related knowledge found

**Result**: GAP IDENTIFIED

**Gap Report**:
| Gap | Severity | Description | Recommended |
|-----|----------|-------------|-------------|
| GAP-001 | HIGH | No definition for "topic X" | Create DEFN |

**Action**: Using general reasoning to explain, but noting gap.
[General Reasoning]: Based on domain knowledge, topic X refers to...
```

### Example 3: Mixed Sources

```markdown
## Analysis

**From Knowledge Layer**:
According to DEFN-001-WHAT-IS-KNOWLEDGE: "Knowledge is validated understanding..."

**Inference**:
[Inference]: This implies that validation is a prerequisite for knowledge.

**Hypothesis**:
[Hypothesis]: Perhaps all AI outputs should be treated as non-knowledge until validated.

**General Reasoning**:
[General Reasoning]: From first principles, X must work because Y...
```

---

## Compliance

AI operating within KDE SHALL comply with this protocol.

**Verification**:
- Session audits check for knowledge citations
- Gap reports track unidentified knowledge
- Citation quality reviewed

---

**Document Status**: DEFINED
**Authority**: Human
**Related**: WHAT-IS-KNOWLEDGE.md, PROMOTION-RULES.md, KNOWLEDGE-OBJECT.md
