# Knowledge Object Schema

**Document ID**: SCHEMA-001
**Type**: Data Schema
**Status**: DEFINED
**Purpose**: Define the canonical knowledge object structure

---

## Overview

This document defines the canonical structure for all knowledge objects in the Knowledge Layer. It defines what fields exist, which are required, and how they relate.

**Note**: This is a schema definition, not an implementation. Storage format is not specified.

---

## Knowledge Object Structure

```yaml
knowledge_object:
  id: string              # Required - Unique identifier
  type: string            # Required - Knowledge type
  title: string            # Required - Human-readable title
  
  # Content
  definition: string       # Required - The knowledge statement
  scope: object           # Required - Applicability boundaries
  
  # Provenance
  source: object          # Required - Origin information
  evidence: array          # Required - Supporting evidence
  
  # Lifecycle
  status: string           # Required - Current lifecycle stage
  version: string          # Required - Semantic version
  history: array          # Optional - Change history
  
  # Relationships
  relationships: object    # Optional - Links to other knowledge
  dependencies: array      # Optional - Knowledge this depends on
  
  # Metadata
  author: string          # Required - Creator
  authority: string       # Required - Human approver
  created: datetime        # Required - Creation timestamp
  updated: datetime        # Required - Last update timestamp
  
  # Validation
  validation: object       # Required - Validation record
  tests_passed: array     # Required - Passed validation tests
```

---

## Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier within the Knowledge Layer |
| `type` | string | Knowledge type (see KNOWLEDGE-TYPES.md) |
| `title` | string | Human-readable, descriptive title |
| `definition` | string | The core knowledge statement |
| `scope` | object | Boundaries of applicability |
| `source` | object | Origin and provenance |
| `evidence` | array | List of supporting evidence |
| `status` | string | Current lifecycle stage |
| `version` | string | Semantic version (MAJOR.MINOR.PATCH) |
| `author` | string | Creator identifier |
| `authority` | string | Human approver identifier |
| `created` | datetime | Creation timestamp (ISO 8601) |
| `updated` | datetime | Last update timestamp (ISO 8601) |
| `validation` | object | Validation record |
| `tests_passed` | array | List of passed validation tests |

---

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `history` | array | Change history entries |
| `relationships` | object | Links to related knowledge |
| `dependencies` | array | Knowledge this depends on |
| `supersedes` | array | IDs of knowledge this replaces |
| `superseded_by` | string | ID of knowledge that replaces this |
| `deprecated` | boolean | Deprecation flag |
| `deprecation_reason` | string | Reason for deprecation |

---

## Field Definitions

### id

**Format**: `TYPE-XXX-NAME` where:
- `TYPE` = Knowledge type abbreviation
- `XXX` = Sequential number
- `NAME` = Short slug

**Examples**:
- `PRIN-001-AUTO-CONTINUATION`
- `PAT-001-SCIENTIFIC-LOOP`
- `DEFN-001-WHAT-IS-KNOWLEDGE`

**Constraints**: 
- Unique within Knowledge Layer
- Immutable once assigned
- URLs-safe characters only

---

### type

**Values** (from KNOWLEDGE-TYPES.md):
- `principle` - Operating principles
- `pattern` - Validated patterns
- `workflow` - Standard workflows
- `definition` - Engineering definitions
- `decision` - Decision records
- `lesson` - Lessons learned

---

### title

**Format**: Human-readable string
**Length**: 10-100 characters
**Style**: Title Case

**Examples**:
- "No Auto-Continuation Principle"
- "Scientific Learning Loop Pattern"
- "What is Evidence? Definition"

---

### definition

**Format**: Markdown string
**Requirements**:
- Complete sentence(s)
- States what, not how
- Includes scope implicitly

---

### scope

```yaml
scope:
  applies_to: array       # Domains/contexts where this applies
  excludes: array         # Explicit exclusions
  conditions: array       # Required conditions for applicability
  version_constraints:    # When version matters
    min: string
    max: string
```

**Example**:
```yaml
scope:
  applies_to: [engineering, software-development]
  excludes: [embedded-systems]
  conditions: [validated-methodology]
```

---

### source

```yaml
source:
  type: string           # investigation | experiment | external
  id: string             # Source identifier
  url: string            # Link to source
  citation: string        # Formal citation
```

---

### evidence

```yaml
evidence:
  - type: string          # direct | documented | experimental | field
    content: string        # Evidence content
    source: string        # Citation or reference
    verified: boolean      # Verification status
    verified_by: string    # Verifier identifier
```

---

### status

**Values** (from KNOWLEDGE-LIFECYCLE.md):
- `candidate` - Proposed, not yet reviewed
- `review` - Under review
- `approved` - Approved, awaiting promotion
- `promoted` - In the Knowledge Layer
- `deprecated` - No longer recommended
- `archived` - Preserved but not active

---

### version

**Format**: Semantic versioning (MAJOR.MINOR.PATCH)

| Component | Increment When |
|-----------|---------------|
| MAJOR | Breaking changes to definition |
| MINOR | Non-breaking additions |
| PATCH | Corrections without content change |

**Example**: `1.0.0` → `1.1.0` → `2.0.0`

---

### validation

```yaml
validation:
  tests_applied: array    # Tests that were run
  tests_passed: array     # Tests that passed
  tests_failed: array     # Tests that failed (if any)
  validator: string       # Validator identifier
  validated_at: datetime  # Validation timestamp
  limitations: array      # Known limitations
```

---

### relationships

```yaml
relationships:
  relates_to: array       # Related knowledge IDs
  refines: array          # Knowledge this refines
  refined_by: array       # Knowledge that refines this
  contradicts: array       # Knowledge that contradicts this
  complements: array      # Knowledge that complements this
```

---

## Relationships

### Between Knowledge Objects

```
KNOWLEDGE-A ──relates_to──► KNOWLEDGE-B
KNOWLEDGE-A ──refines──────► KNOWLEDGE-B  (A is more specific)
KNOWLEDGE-A ──contradicts──► KNOWLEDGE-B  (A and B conflict)
KNOWLEDGE-A ──complements──► KNOWLEDGE-B (A and B are mutually supportive)
```

### Dependencies

```
KNOWLEDGE-A (depends on) ──► KNOWLEDGE-B
KNOWLEDGE-A (requires)  ──► KNOWLEDGE-B
```

---

## Lifecycle

```
Candidate → Review → Approved → Promoted → Deprecated → Archived
    │          │         │          │          │           │
    ▼          ▼         ▼          ▼          ▼           ▼
  Proposed   Under     Ready to   In Layer   Obsolete   Preserved
             Review    Promote               No longer   Historical
                                   ▲          recommended
                                   │
                          Promotion requires
                          human authorization
```

---

## Versioning

### Version Increment Rules

| Change Type | Version Change | Example |
|-------------|---------------|---------|
| Definition unchanged, clarity improved | PATCH | "Reformatted" |
| Scope expanded, non-breaking | MINOR | "Added new applicability" |
| Definition changed, breaking | MAJOR | "Fundamental change" |

### Version Comparison

When applying knowledge, use version constraints:
- `min: "1.0.0"` - Requires at least version 1.0.0
- `max: "2.0.0"` - Applies only up to version 2.0.0
- No constraint - Any version acceptable

---

## Examples

### Minimal Valid Knowledge Object

```yaml
id: DEFN-001-WHAT-IS-KNOWLEDGE
type: definition
title: What is Knowledge?
definition: "Knowledge is validated understanding that enables effective engineering action."
scope:
  applies_to: [engineering]
  excludes: []
  conditions: []
source:
  type: investigation
  id: INV-001
evidence:
  - type: experimental
    content: "Validation test results"
    source: "INV-001/validation.md"
    verified: true
status: promoted
version: 1.0.0
author: AI
authority: Human
created: 2026-07-31T00:00:00Z
updated: 2026-07-31T00:00:00Z
validation:
  tests_applied: [classification, distinction, methodology, consistency, counterexample]
  tests_passed: [classification, distinction, methodology, consistency, counterexample]
  validator: Human
  validated_at: 2026-07-31T00:00:00Z
  limitations: []
```

---

## Schema Compliance

All knowledge objects in the Knowledge Layer MUST comply with this schema.

**Validation**:
- Required fields MUST be present
- Field types MUST match
- Identifiers MUST be unique
- Status transitions MUST follow lifecycle

---

**Document Status**: DEFINED
**Authority**: Human
**Next Review**: After Stage 2 completion
