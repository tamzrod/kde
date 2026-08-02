# Core (Queen Runtime)

**Purpose**: Core is the runtime Queen of the Hive

---

## Core Responsibilities

- **Session Management**: Coordinate sessions with Workers
- **Authorization**: Approve or deny requests
- **Audit Trail**: Maintain complete history
- **Knowledge Promotion**: Only Core promotes knowledge to the Knowledge Layer

---

## Core Rules

1. **Workers only observe** - Workers produce observations, not knowledge
2. **Core promotes knowledge** - Only Core can promote to Knowledge Layer
3. **Core is domain-agnostic** - Core does not understand domain specifics

---

## Directories

```
core/
├── protocols/       # Session and authorization protocols
├── audit/          # Audit trail and logs
└── README.md       # This file
```

---

**Core = Queen Runtime**
