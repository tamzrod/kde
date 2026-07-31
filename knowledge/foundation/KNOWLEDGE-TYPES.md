# Knowledge Types

**Document ID**: FOUND-003
**Type**: Type Taxonomy
**Status**: FOUNDATIONAL
**Authority**: Human

---

## Overview

This document defines the primitive types of knowledge in the Knowledge Layer. Each type has a specific purpose, scope, and relationships.

---

## Type Summary

| Type | Purpose | Example |
|------|---------|---------|
| **principle** | Immutable operating rules | "No Self-Approval" |
| **pattern** | Validated reusable solutions | "Scientific Learning Loop" |
| **workflow** | Standard process steps | "Promotion Process" |
| **definition** | Concept clarification | "What is Evidence?" |
| **decision** | Documented rationale | "Why GraphQL over REST" |
| **lesson** | Learned experience | "Don't assume X" |

---

## Type: principle

**Directory**: `knowledge/principles/`

### Purpose

Immutable operating rules that govern behavior. Principles do not explain how things work—they dictate how things must be done.

### When to Use

- Rules that must not be violated
- Constraints on behavior
- Non-negotiable requirements
- Foundational operating rules

### Characteristics

| Attribute | Value |
|-----------|-------|
| **Immutability** | HIGH - Changes require new seed |
| **Scope** | Universal within scope |
| **Evidence** | Rationale, not empirical |
| **Versioning** | MAJOR only (breaking changes = new principle) |

### Examples

```
PRIN-001-AUTO-CONTINUATION
  "AI must wait for explicit human authorization before continuing"

PRIN-002-SELF-APPROVAL
  "AI must not approve its own work"

PRIN-003-SELF-PROMOTION
  "AI must not promote knowledge without human authorization"
```

### Relationships

| Relationship | With | Description |
|--------------|------|-------------|
| **refines** | pattern | Principles guide patterns |
| **constrains** | workflow | Principles constrain workflows |
| **derived_from** | principle | Derived principles from foundational |

### Anti-Patterns

| Anti-Pattern | Wrong | Right |
|--------------|-------|-------|
| Prescriptive | "Do X, Y, Z" | "X must not happen" |
| Variable | "Sometimes Y" | "Always/Never X" |
| Context-dependent | "In case A" | Universal within scope |

---

## Type: pattern

**Directory**: `knowledge/patterns/`

### Purpose

Validated reusable solutions to recurring problems. Patterns capture what works, not why it works.

### When to Use

- Solutions proven effective
- Reusable across contexts
- Recurring problem-solution pairs
- Best practices with evidence

### Characteristics

| Attribute | Value |
|-----------|-------|
| **Immutability** | MEDIUM - Can evolve with evidence |
| **Scope** | Defined applicability |
| **Evidence** | Empirical validation |
| **Versioning** | MAJOR/MINOR |

### Examples

```
PAT-001-SCIENTIFIC-LOOP
  "Research → Knowledge → Laboratory → Evidence → Governance → Research"

PAT-002-SEPARATION-OF-CONCERNS
  "Divide by responsibility; each component has single concern"
```

### Structure

```yaml
pattern:
  name: string
  problem: string          # What problem it solves
  context: string          # When to apply
  forces: array            # Factors to consider
  solution: string         # The pattern
  consequences: array      # Results of applying
  evidence: array          # Why it works
  related_patterns: array  # Similar patterns
```

### Relationships

| Relationship | With | Description |
|--------------|------|-------------|
| **guides** | workflow | Patterns inform workflows |
| **embodies** | principle | Patterns follow principles |
| **similar_to** | pattern | Related patterns |

---

## Type: workflow

**Directory**: `knowledge/workflows/`

### Purpose

Standard processes that describe how to accomplish something. Workflows are procedural knowledge.

### When to Use

- Multi-step processes
- Standard procedures
- Required sequences
- Operational processes

### Characteristics

| Attribute | Value |
|-----------|-------|
| **Immutability** | LOW - Can be optimized |
| **Scope** | Defined procedure |
| **Evidence** | Process effectiveness |
| **Versioning** | MINOR/PATCH |

### Examples

```
WF-001-PROMOTION
  "Conversation → Candidate → Review → Approved → Promoted"

WF-002-SESSION-START
  "Read ROADMAP → Acknowledge Principles → Begin Work"
```

### Structure

```yaml
workflow:
  name: string
  purpose: string
  steps:
    - order: number
      action: string
      actor: string          # Who performs
      authority: string      # What authority needed
      exit_criteria: string
  exceptions: array
  related_workflows: array
```

### Relationships

| Relationship | With | Description |
|--------------|------|-------------|
| **follows** | principle | Workflows follow principles |
| **uses** | pattern | Workflows use patterns |
| **part_of** | workflow | Sub-workflows |

---

## Type: definition

**Directory**: `knowledge/definitions/`

### Purpose

Clarification of concepts and terms. Definitions establish meaning.

### When to Use

- Clarifying ambiguous terms
- Establishing terminology
- Explaining concepts
- Foundational understanding

### Characteristics

| Attribute | Value |
|-----------|-------|
| **Immutability** | HIGH - Changes create new version |
| **Scope** | Concept-specific |
| **Evidence** | Analysis, reasoning |
| **Versioning** | MAJOR (breaking) or PATCH (clarity) |

### Examples

```
DEFN-001-WHAT-IS-KNOWLEDGE
  "Knowledge is validated understanding that enables effective action"

DEFN-002-WHAT-IS-EVIDENCE
  "Evidence is verifiable information that supports or refutes a claim"
```

### Structure

```yaml
definition:
  term: string
  definition: string        # The definition itself
  components: array          # Key components
  scope: string             # What it applies to
  related_terms: array       # Related definitions
  examples: array           # Illustrative examples
  counter_examples: array    # What it is not
```

### Relationships

| Relationship | With | Description |
|--------------|------|-------------|
| **distinguishes_from** | definition | Clear boundaries |
| **complements** | definition | Together form understanding |
| **used_by** | pattern | Patterns use definitions |

---

## Type: decision

**Directory**: `knowledge/decisions/`

### Purpose

Documentation of why a choice was made. Decisions capture rationale.

### When to Use

- Architectural choices
- Tool selection
- Process adoption
- Trade-off resolutions

### Characteristics

| Attribute | Value |
|-----------|-------|
| **Immutability** | LOW - Context may change |
| **Scope** | Specific decision |
| **Evidence** | Options considered, tradeoffs |
| **Versioning** | MINOR (new options) or PATCH (clarity) |

### Examples

```
DEC-001-GRAPHQL-VS-REST
  "Chose GraphQL for flexible querying in complex domains"

DEC-002-MARKDOWN-FORMAT
  "Chose Markdown for simplicity and portability"
```

### Structure

```yaml
decision:
  title: string
  context: string           # Situation requiring decision
  options_considered: array # All options
  criteria: array            # How decision was made
  chosen: string            # What was chosen
  rationale: string          # Why chosen
  tradeoffs: array           # What was sacrificed
  consequences: array        # Expected results
  review_date: datetime      # When to re-evaluate
```

### Relationships

| Relationship | With | Description |
|--------------|------|-------------|
| **supersedes** | decision | Replaces previous decision |
| **influenced_by** | decision | Builds on previous |
| **implements** | principle | Decision follows principle |

---

## Type: lesson

**Directory**: `knowledge/lessons/`

### Purpose

Experience-based learning. Lessons capture what was learned.

### When to Use

- Post-mortems
- Retrospectives
- Experience documentation
- Avoidance guidance

### Characteristics

| Attribute | Value |
|-----------|-------|
| **Immutability** | MEDIUM - Can be updated |
| **Scope** | Specific context |
| **Evidence** | Experience, outcome |
| **Versioning** | MINOR/PATCH |

### Examples

```
LESSON-001-FROM-SEED-001
  "Engine contains reasoning DNA - separate Seed from Engine"

LESSON-002-BOUNDARIES
  "Boundaries became blurred - enforce ownership"
```

### Structure

```yaml
lesson:
  title: string
  observation: string        # What was observed
  evidence: array            # What happened
  impact: string             # HIGH/MEDIUM/LOW
  resolution: string          # How addressed
  applicable: array          # When this applies
  mitigation: string          # How to avoid
```

### Relationships

| Relationship | With | Description |
|--------------|------|-------------|
| **derived_from** | investigation | From investigation |
| **applies_to** | pattern | Lesson informs pattern |
| **contradicts** | pattern | Lesson challenges pattern |

---

## Type Relationships

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         KNOWLEDGE TYPE RELATIONSHIPS                        │
└─────────────────────────────────────────────────────────────────────────────┘

                          ┌─────────────┐
                          │  PRINCIPLE  │
                          │ (immutable) │
                          └──────┬──────┘
                                 │ guides
                                 ▼
        ┌────────────────────────────────────────┐
        │                                        │
        ▼                                        ▼
┌─────────────┐                          ┌─────────────┐
│   PATTERN   │◄───── embodies ─────────│  WORKFLOW   │
│ (validated) │                          │ (procedural)│
└──────┬──────┘                          └──────┬──────┘
       │                                        │
       │ defines terms                          │
       ▼                                        │
┌─────────────┐                                 │
│ DEFINITION  │                                 │
│  (clarifies)│                                 │
└──────┬──────┘                                 │
       │                                        │
       │ informs                                │
       ▼                                        │
┌─────────────┐                                 │
│  DECISION   │                                 │
│ (rationale) │                                 │
└──────┬──────┘                                 │
       │                                        │
       │ captures                               │
       ▼                                        │
┌─────────────┐
│   LESSON    │
│ (experience)│
└─────────────┘
```

---

## Type Selection Guide

### Which Type?

| If you need... | Use... |
|----------------|--------|
| A rule that must not be violated | principle |
| A proven solution to a problem | pattern |
| A process to follow | workflow |
| To clarify what something means | definition |
| To document why you chose something | decision |
| To capture learned experience | lesson |

### Type Combinations

| Combination | When to Use |
|-------------|-------------|
| principle + pattern | Rule that enables solution |
| pattern + workflow | Solution that requires procedure |
| definition + pattern | Term used in solution |
| decision + lesson | Choice informed by experience |

---

## Validation by Type

| Type | Required Validation |
|------|-------------------|
| principle | Rationale, non-contradiction |
| pattern | Empirical evidence, reproducibility |
| workflow | Effectiveness, exception handling |
| definition | Clarity, consistency, distinction |
| decision | Options considered, tradeoffs documented |
| lesson | Experience evidence, applicability |

---

**Document Status**: FOUNDATIONAL
**Authority**: Human
**Related**: WHAT-IS-KNOWLEDGE.md, PROMOTION-RULES.md
