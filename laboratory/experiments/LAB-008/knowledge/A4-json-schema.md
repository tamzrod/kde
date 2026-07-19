# Knowledge Collection: Artifact A4 - JSON Schema

**Artifact**: A4
**Type**: Specification (API Design)
**Domain**: API Design
**Source**: OpenAPI/JSON Schema

---

## Observation

| OBS-ID | Observation | Evidence |
|--------|-------------|----------|
| OBS-A4-001 | Artifact is JSON Schema format | EV-A4-001 |
| OBS-A4-002 | Contains $schema reference | EV-A4-001 |
| OBS-A4-003 | Contains $id identifier | EV-A4-001 |
| OBS-A4-004 | Contains title and description | EV-A4-001 |
| OBS-A4-005 | Contains type specification | EV-A4-001 |
| OBS-A4-006 | Contains required fields list | EV-A4-001 |
| OBS-A4-007 | Contains properties definition | EV-A4-001 |
| OBS-A4-008 | Contains field type constraints | EV-A4-001 |
| OBS-A4-009 | Contains format specifications (uuid, date-time) | EV-A4-001 |
| OBS-A4-010 | Contains enum constraints | EV-A4-001 |
| OBS-A4-011 | Contains default values | EV-A4-001 |
| OBS-A4-012 | Contains min/max constraints | EV-A4-001 |
| OBS-A4-013 | Contains examples array | EV-A4-001 |
| OBS-A4-014 | Contains nested object definition (metadata) | EV-A4-001 |

---

## Evidence

| EV-ID | Type | Source | Description | Supports |
|-------|------|--------|-------------|----------|
| EV-A4-001 | file | artifacts/A4-json-schema.json | JSON Schema specification | OBS-A4-001 through OBS-A4-014 |

---

## Traceability Validation

**Status**: VALID

| Check | Result |
|-------|--------|
| Every Observation has Evidence | PASS (14/14) |
| Every Evidence supports Observation | PASS (1/1) |

---

## Extracted Knowledge Elements

| ID | Element | Category | Source Field |
|----|---------|----------|-------------|
| A4-K001 | Schema Identifier | Identification | $id |
| A4-K002 | Schema Version | Classification | $schema |
| A4-K003 | Entity Title | Identification | title |
| A4-K004 | Description | Documentation | description |
| A4-K005 | Entity Type | Classification | type |
| A4-K006 | Required Fields | Constraints | required[] |
| A4-K007 | Field Definitions | Schema | properties{} |
| A4-K008 | Field Types | Typing | properties.*.type |
| A4-K009 | Format Constraints | Validation | properties.*.format |
| A4-K010 | Enumeration Values | Constraints | properties.*.enum |
| A4-K011 | Default Values | Initialization | properties.*.default |
| A4-K012 | Range Constraints | Validation | minimum, maximum |
| A4-K013 | Length Constraints | Validation | minLength, maxLength |
| A4-K014 | Examples | Samples | examples[] |
| A4-K015 | Nested Objects | Structure | metadata{} |

---

## Ambiguities

| ID | Ambiguity | Classification | Evidence |
|----|-----------|----------------|----------|
| A4-A001 | $schema vs $id - which is version identifier? | Productive | Two different URIs |
| A4-A002 | format vs type - are they consistent? | Minor | string + format vs type + enum |

---

## Assumptions

| ID | Assumption | Rationale |
|----|------------|-----------|
| A4-AS001 | format values follow spec-defined set | JSON Schema standard |
| A4-AS002 | default values are intended initialization | Schema semantics |

---

## Unique to This Artifact

- JSON Schema specific keywords ($schema, $id)
- Format specifications (uuid, date-time)
- Type array syntax
- Default value declarations
- Examples array
- Constraint keywords (minimum, minLength, etc.)

---

## Common Attributes (Preliminary)

Adding from A4:
- Schema/Entity identifier
- Version/reference
- Type classification
- Field definitions
- Constraints
- Examples
