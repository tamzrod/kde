# Knowledge K3: API Field Constraints
# Source: JSON Schema - After ingestion

## Extracted Knowledge (No Metadata)

### Observations

| ID | Observation | Evidence |
|----|-------------|----------|
| OBS-K3-001 | Schema defines object type | type: "object" |
| OBS-K3-002 | Schema defines field named "id" | properties.id |
| OBS-K3-003 | Schema defines field named "title" | properties.title |
| OBS-K3-004 | Schema defines field named "status" | properties.status |
| OBS-K3-005 | "id" field has string type | properties.id.type |
| OBS-K3-006 | "id" field has uuid format | properties.id.format |
| OBS-K3-007 | "title" field has string type | properties.title.type |
| OBS-K3-008 | "status" field has enum type | properties.status.enum |
| OBS-K3-009 | "status" enum values defined | pending, in_progress, completed |
| OBS-K3-010 | Required fields list exists | required[] |
| OBS-K3-011 | id is required | required[0] |
| OBS-K3-012 | title is required | required[1] |
| OBS-K3-013 | status is required | required[2] |

### Assertions

| ID | Assertion | Evidence |
|----|-----------|----------|
| AST-K3-001 | id field value must match uuid format | format: "uuid" |
| AST-K3-002 | title field value must be non-empty string | minLength: 1 |
| AST-K3-003 | title field value has max length | maxLength: 500 |
| AST-K3-004 | status field value must be one of enum values | enum: [...] |
| AST-K3-005 | id field is required | required[] |
| AST-K3-006 | title field is required | required[] |
| AST-K3-007 | status field is required | required[] |

### Entities

| ID | Entity | Fields |
|----|--------|--------|
| ENT-K3-001 | Task | id, title, status, priority, tags, metadata |

### Attributes

| ID | Attribute | Entity | Type | Format | Required | Constraints |
|----|-----------|--------|------|--------|----------|-------------|
| ATT-K3-001 | id | Task | string | uuid | true | - |
| ATT-K3-002 | title | Task | string | - | true | minLength: 1, maxLength: 500 |
| ATT-K3-003 | status | Task | string | enum | true | enum: [pending, in_progress, completed] |
| ATT-K3-004 | priority | Task | integer | - | false | min: 1, max: 5, default: 3 |
| ATT-K3-005 | tags | Task | array | - | false | items: string, default: [] |
| ATT-K3-006 | metadata | Task | object | - | false | - |

### Constraints

| ID | Constraint | Applies To |
|----|------------|------------|
| CON-K3-001 | type = "uuid" | Task.id |
| CON-K3-002 | minLength = 1 | Task.title |
| CON-K3-003 | maxLength = 500 | Task.title |
| CON-K3-004 | enum values | Task.status |
| CON-K3-005 | minimum = 1 | Task.priority |
| CON-K3-006 | maximum = 5 | Task.priority |
| CON-K3-007 | required fields | Task.id, Task.title, Task.status |

### Evidence

| ID | Evidence | Source |
|----|----------|--------|
| EV-K3-001 | JSON Schema specification | Schema definition |

### Ambiguities

| ID | Ambiguity | Classification |
|----|-----------|----------------|
| AMB-K3-001 | uuid format validation not specified | Productive |
| AMB-K3-002 | array items validation scope | Minor |

### Assumptions

| ID | Assumption | Rationale |
|----|------------|-----------|
| AS-K3-001 | uuid format follows RFC 4122 | Standard assumption |

---

## Knowledge Structure Summary

```
JSON Schema Knowledge:
├── Entities:
│   └── Task
│       └── Attributes:
│           ├── id (string, uuid, required)
│           ├── title (string, required, 1-500 chars)
│           ├── status (string, enum, required)
│           ├── priority (integer, optional, 1-5)
│           ├── tags (array, optional)
│           └── metadata (object, optional)
├── Constraints:
│   ├── id: uuid format
│   ├── title: 1-500 characters
│   ├── status: enum values
│   └── priority: 1-5 range
└── Required Fields:
    └── [id, title, status]
```
