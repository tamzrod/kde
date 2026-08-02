# Knowledge Discovery Engine (KDE)

**Architecture**: Hive Model v1.1
**Philosophy**: Knowledge as the primary asset

---

## Hive Model

KDE is organized as a Hive with one **Core** (Queen) and multiple **Workers**.

```
                    Core (Queen)
                        │
        ┌───────────────┼───────────────┐
        │               │               │
     Worker         Worker          Worker
        │               │               │
    Observation    Observation    Observation
```

---

## Core Principles

1. **Workers only observe** - Workers produce observations, not knowledge
2. **Core promotes knowledge** - Only Core can promote to Knowledge Layer
3. **Knowledge is permanent** - Never deleted, only archived

---

## Directory Structure

```
kde/
├── core/           # Core (Queen) runtime
├── workers/        # Domain workers
├── capabilities/   # Shared capabilities
├── plugins/        # Format handlers
├── knowledge/      # PRIMARY ASSET - Validated knowledge
├── archive/        # Historical memory (read-only)
└── docs/           # Templates and documentation
```

---

## Key Rules

- **Knowledge Layer** is the permanent memory - never modified by Workers
- **Core** manages sessions, authorization, and knowledge promotion
- **Workers** observe sources and produce observations
- **Archive** preserves all historical investigations

---

**Design Philosophy**: Knowledge over implementation. Architecture serves knowledge.