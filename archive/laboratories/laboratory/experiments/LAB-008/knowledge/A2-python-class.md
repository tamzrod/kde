# Knowledge Collection: Artifact A2 - Python Source Code

**Artifact**: A2
**Type**: Source Code (Software)
**Domain**: Software Engineering
**Source**: Software Implementation

---

## Observation

| OBS-ID | Observation | Evidence |
|--------|-------------|----------|
| OBS-A2-001 | Artifact is Python source code | EV-A2-001 |
| OBS-A2-002 | Contains module docstring | EV-A2-001 |
| OBS-A2-003 | Contains class definitions (Task, TaskManager) | EV-A2-001 |
| OBS-A2-004 | Contains method definitions | EV-A2-001 |
| OBS-A2-005 | Contains type hints (List, Optional, Dict) | EV-A2-001 |
| OBS-A2-006 | Contains parameter definitions with types | EV-A2-001 |
| OBS-A2-007 | Contains return type annotations | EV-A2-001 |
| OBS-A2-008 | Contains attribute declarations | EV-A2-001 |
| OBS-A2-009 | Contains docstrings (class and method level) | EV-A2-001 |
| OBS-A2-010 | Has author/version metadata in docstring | EV-A2-001 |
| OBS-A2-011 | Contains import statements | EV-A2-001 |
| OBS-A2-012 | Uses Python naming conventions (snake_case, PascalCase) | EV-A2-001 |

---

## Evidence

| EV-ID | Type | Source | Description | Supports |
|-------|------|--------|-------------|----------|
| EV-A2-001 | file | artifacts/A2-python-class.py | Python source code | OBS-A2-001 through OBS-A2-012 |

---

## Traceability Validation

**Status**: VALID

| Check | Result |
|-------|--------|
| Every Observation has Evidence | PASS (12/12) |
| Every Evidence supports Observation | PASS (1/1) |

---

## Extracted Knowledge Elements

| ID | Element | Category | Source Location |
|----|---------|----------|----------------|
| A2-K001 | Module Name | Identification | File name |
| A2-K002 | Language | Classification | Python syntax |
| A2-K003 | Classes | Structure | class Task, class TaskManager |
| A2-K004 | Methods | Structure | def create, def read, etc. |
| A2-K005 | Parameters | Interface | (self, id, title) |
| A2-K006 | Return Types | Interface | -> Task, -> Optional[Task] |
| A2-K007 | Attributes | State | self.id, self.title, etc. |
| A2-K008 | Type Hints | Typing | typing.List, typing.Optional |
| A2-K009 | Documentation | Metadata | """docstring""" |
| A2-K010 | Author | Metadata | Author: Development Team |
| A2-K011 | Version | Metadata | Version: 1.0.0 |
| A2-K012 | Dependencies | Requirements | from typing import ... |

---

## Ambiguities

| ID | Ambiguity | Classification | Evidence |
|----|-----------|----------------|----------|
| A2-A001 | Docstring vs type hint: which is authoritative? | Productive | Multiple sources |
| A2-A002 | Version in docstring vs __version__ variable | Minor | Metadata location |

---

## Assumptions

| ID | Assumption | Rationale |
|----|------------|-----------|
| A2-AS001 | Type hints are accurate | Python typing convention |
| A2-AS002 | Docstrings describe intended behavior | Documentation practice |

---

## Unique to This Artifact

- Programming language syntax
- Type hint annotations
- Method/function distinction
- Import statements
- Class-based structure

---

## Common Attributes (Preliminary)

Adding from A2:
- Dependencies (new)
- Interface specification (new)
- Language (new)
- Documentation location (docstring)
