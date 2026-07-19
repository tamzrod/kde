# Knowledge K4: Database Table Structure
# Source: SQLite Schema - After ingestion

## Extracted Knowledge (No Metadata)

### Observations

| ID | Observation | Evidence |
|----|-------------|----------|
| OBS-K4-001 | Database contains tasks table | CREATE TABLE tasks |
| OBS-K4-002 | Database contains tags table | CREATE TABLE tags |
| OBS-K4-003 | Database contains task_tags junction table | CREATE TABLE task_tags |
| OBS-K4-004 | tasks table has id column | id TEXT |
| OBS-K4-005 | tasks table has title column | title TEXT |
| OBS-K4-006 | tasks table has completed column | completed INTEGER |
| OBS-K4-007 | tasks table has priority column | priority INTEGER |
| OBS-K4-008 | tasks table has created_at column | created_at TEXT |
| OBS-K4-009 | tasks table has updated_at column | updated_at TEXT |
| OBS-K4-010 | tasks.id is primary key | PRIMARY KEY |
| OBS-K4-011 | tasks.title has NOT NULL constraint | NOT NULL |
| OBS-K4-012 | tasks.completed has default 0 | DEFAULT 0 |
| OBS-K4-013 | tasks.priority has CHECK constraint | CHECK(1-5) |
| OBS-K4-014 | tasks table has self-referential foreign key | parent_id REFERENCES tasks |
| OBS-K4-015 | task_tags links tasks and tags | FOREIGN KEY |

### Assertions

| ID | Assertion | Evidence |
|----|-----------|----------|
| AST-K4-001 | id uniquely identifies row | PRIMARY KEY |
| AST-K4-002 | title must have value | NOT NULL |
| AST-K4-003 | completed is 0 or 1 | DEFAULT 0 |
| AST-K4-004 | priority is 1-5 | CHECK constraint |
| AST-K4-005 | created_at auto-set | DEFAULT (datetime) |
| AST-K4-006 | tasks can have subtasks | parent_id FK |

### Entities

| ID | Entity | Columns |
|----|--------|---------|
| ENT-K4-001 | tasks | id, title, completed, priority, created_at, updated_at, deleted_at, parent_id |
| ENT-K4-002 | tags | id, name, color |
| ENT-K4-003 | task_tags | task_id, tag_id |

### Attributes

| ID | Attribute | Entity | Type | Required | Default | Constraints |
|----|-----------|--------|------|----------|---------|-------------|
| ATT-K4-001 | id | tasks | TEXT | true | - | PRIMARY KEY |
| ATT-K4-002 | title | tasks | TEXT | true | - | NOT NULL, CHECK(length>0) |
| ATT-K4-003 | completed | tasks | INTEGER | true | 0 | CHECK(0-1) |
| ATT-K4-004 | priority | tasks | INTEGER | false | 3 | CHECK(1-5) |
| ATT-K4-005 | created_at | tasks | TEXT | true | datetime | - |
| ATT-K4-006 | updated_at | tasks | TEXT | true | datetime | - |
| ATT-K4-007 | deleted_at | tasks | TEXT | false | NULL | - |
| ATT-K4-008 | parent_id | tasks | TEXT | false | NULL | FK → tasks.id |
| ATT-K4-009 | id | tags | INTEGER | true | - | PRIMARY KEY |
| ATT-K4-010 | name | tags | TEXT | true | - | UNIQUE |
| ATT-K4-011 | color | tags | TEXT | false | #808080 | - |

### Constraints

| ID | Constraint | Applies To |
|----|------------|------------|
| CON-K4-001 | PRIMARY KEY | tasks.id, tags.id |
| CON-K4-002 | NOT NULL | tasks.title, tags.name |
| CON-K4-003 | DEFAULT value | tasks.completed, tasks.created_at, tags.color |
| CON-K4-004 | CHECK range | tasks.priority |
| CON-K4-005 | CHECK value | tasks.completed |
| CON-K4-006 | UNIQUE | tags.name |
| CON-K4-007 | FOREIGN KEY | tasks.parent_id, task_tags |

### Relationships

| ID | Relationship | Source | Target | Type |
|----|-------------|--------|--------|------|
| REL-K4-001 | has_subtask | tasks | tasks | one-to-many (self) |
| REL-K4-002 | tagged_with | tasks | tags | many-to-many |
| REL-K4-003 | belongs_to | task_tags | tasks | many-to-one |
| REL-K4-004 | belongs_to | task_tags | tags | many-to-one |

### Evidence

| ID | Evidence | Source |
|----|----------|--------|
| EV-K4-001 | SQLite DDL | Schema definition |

### Ambiguities

| ID | Ambiguity | Classification |
|----|-----------|----------------|
| AMB-K4-001 | TEXT storage for dates vs ISO8601 | Productive |
| AMB-K4-002 | Soft delete semantics | Minor |

### Assumptions

| ID | Assumption | Rationale |
|----|------------|-----------|
| AS-K4-001 | datetime() returns ISO8601 | SQLite default |

---

## Knowledge Structure Summary

```
Database Knowledge:
├── Entities:
│   ├── tasks
│   │   ├── id (TEXT, PK, required)
│   │   ├── title (TEXT, required, non-empty)
│   │   ├── completed (INTEGER, default: 0)
│   │   ├── priority (INTEGER, optional, 1-5)
│   │   ├── created_at (TEXT, auto)
│   │   ├── updated_at (TEXT, auto)
│   │   ├── deleted_at (TEXT, nullable)
│   │   └── parent_id (TEXT, FK → tasks)
│   ├── tags
│   │   ├── id (INTEGER, PK)
│   │   ├── name (TEXT, unique)
│   │   └── color (TEXT, default)
│   └── task_tags
│       ├── task_id (TEXT, FK → tasks)
│       └── tag_id (INTEGER, FK → tags)
├── Constraints:
│   ├── PRIMARY KEY on id
│   ├── NOT NULL on title, name
│   ├── CHECK on priority (1-5)
│   ├── DEFAULT on completed, timestamps
│   └── UNIQUE on tags.name
└── Relationships:
    ├── tasks → tasks (self-reference, one-to-many)
    ├── tasks ↔ tags (many-to-many via task_tags)
    └── task_tags → tasks, tags (many-to-one)
```
