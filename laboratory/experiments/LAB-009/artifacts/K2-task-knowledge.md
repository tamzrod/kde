# Knowledge K2: Task Entity Properties
# Source: Software - After ingestion

## Extracted Knowledge (No Metadata)

### Observations

| ID | Observation | Evidence |
|----|-------------|----------|
| OBS-K2-001 | Task entity has identifier field | Class attribute |
| OBS-K2-002 | Task entity has title field | Class attribute |
| OBS-K2-003 | Task entity has completion status field | Class attribute |
| OBS-K2-004 | Task entity has creation timestamp | Class attribute |
| OBS-K2-005 | Identifier is string type | Type annotation |
| OBS-K2-006 | Title is string type | Type annotation |
| OBS-K2-007 | Completion status is boolean type | Type annotation |
| OBS-K2-008 | Creation timestamp is datetime type | Type annotation |
| OBS-K2-009 | Task has completion method | Class method |
| OBS-K2-010 | Task has serialization method | Class method |
| OBS-K2-011 | Identifier is required | Constructor parameter |
| OBS-K2-012 | Title is required | Constructor parameter |
| OBS-K2-013 | Completion status has default (False) | Constructor parameter |

### Assertions

| ID | Assertion | Evidence |
|----|-----------|----------|
| AST-K2-001 | Identifier uniquely identifies task | Design intent |
| AST-K2-002 | Title describes task | Design intent |
| AST-K2-003 | Completion status tracks work progress | Design intent |
| AST-K2-004 | Completion status defaults to False | Default value |
| AST-K2-005 | Identifier cannot be changed after creation | Immutable design |

### Entities

| ID | Entity | Properties |
|----|--------|------------|
| ENT-K2-001 | Task | id, title, completed, created_at |

### Attributes

| ID | Attribute | Entity | Type | Required | Default |
|----|-----------|--------|------|----------|---------|
| ATT-K2-001 | id | Task | string | true | - |
| ATT-K2-002 | title | Task | string | true | - |
| ATT-K2-003 | completed | Task | boolean | false | false |
| ATT-K2-004 | created_at | Task | datetime | true | - |

### Constraints

| ID | Constraint | Applies To |
|----|------------|------------|
| CON-K2-001 | id ≠ empty | Task.id |
| CON-K2-002 | title ≠ empty | Task.title |
| CON-K2-003 | completed ∈ {true, false} | Task.completed |

### Relationships

| ID | Relationship | Source | Target |
|----|-------------|--------|--------|
| REL-K2-001 | managed_by | Task | TaskManager |

### Methods

| ID | Method | Entity | Returns |
|----|--------|--------|---------|
| MTH-K2-001 | complete() | Task | void |
| MTH-K2-002 | to_dict() | Task | Dict |

### Evidence

| ID | Evidence | Source |
|----|----------|--------|
| EV-K2-001 | Python class definition | Source code |

### Ambiguities

| ID | Ambiguity | Classification |
|----|-----------|----------------|
| AMB-K2-001 | id format not specified | Productive |
| AMB-K2-002 | created_at auto-set or manual | Minor |

### Assumptions

| ID | Assumption | Rationale |
|----|------------|-----------|
| AS-K2-001 | id is UUID-like | Common practice |
| AS-K2-002 | created_at uses current time | Implementation |

---

## Knowledge Structure Summary

```
Task Entity Knowledge:
├── Entities:
│   └── Task
│       ├── Attributes:
│       │   ├── id (string, required)
│       │   ├── title (string, required)
│       │   ├── completed (boolean, default: false)
│       │   └── created_at (datetime)
│       └── Methods:
│           ├── complete()
│           └── to_dict()
├── Constraints:
│   ├── id ≠ empty
│   ├── title ≠ empty
│   └── completed ∈ {true, false}
└── Relationships:
    └── Task → TaskManager
```
