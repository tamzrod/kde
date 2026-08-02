# Knowledge Discovery Engine (KDE)

**Architecture**: Autonomous Worker Model
**Philosophy**: The Foundry creates Workers. Workers live independently.

---

## Hive Model

KDE is organized as a Hive with one **Foundry** (Queen) and multiple **Workers**.

```
         Foundry (Queen)
              │
    ┌─────────┼─────────┐
    │         │         │
 Creates   Evolves   Publishes
  │         │         │
  ▼         ▼         ▼
 Worker   Worker   Worker
    │         │         │
    └─────────┴─────────┘
              │
         Workers Live
        Independently
```

---

## Foundry (Queen) Responsibilities

The Foundry is responsible for:
- **Creating Workers** - Designing and building new Workers
- **Evolving Workers** - Improving Worker designs over time
- **Preserving Knowledge** - Maintaining the Knowledge Layer
- **Defining Standards** - Establishing Worker requirements
- **Publishing Releases** - Distributing Worker versions

The Foundry **NEVER** performs production work or executes Worker responsibilities.

---

## Worker Responsibilities

Every Worker is responsible for:
- **Observing** its domain independently
- **Processing** raw data with own plugins
- **Producing** observations
- **Learning** from local experience
- **Operating** without the Foundry

Workers are **independent deployable products**.

---

## Directory Structure

```
kde/
├── foundry/               # The Foundry (Queen)
│   ├── knowledge/         # The permanent Knowledge Layer
│   ├── templates/         # Worker creation templates
│   ├── standards/         # Worker requirements
│   ├── releases/          # Published Worker versions
│   ├── protocols/         # Worker-Foundry interaction
│   ├── capabilities/      # Shared capability definitions
│   ├── plugins/          # Shared plugin interfaces
│   └── audit/             # Audit trail
│
├── workers/               # Workers (independent deployable packages)
│   └── [domain]-worker/  # Example: os-worker, git-worker
│       ├── deploy/        # Docker deployment
│       ├── src/           # Source code
│       ├── plugins/       # Own plugins
│       ├── capabilities/  # Own capabilities
│       ├── models/        # Own AI models
│       ├── docs/          # Worker documentation
│       └── worker.yaml    # Worker metadata
│
├── docs/                  # Human documentation
│   ├── tutorials/         # How-to guides
│   ├── guides/           # In-depth guides
│   └── api/               # API documentation
│
├── archive/               # Historical memory (read-only)
│
└── README.md
```

---

## Key Principles

1. **Workers deploy independently** - Can be copied and deployed anywhere
2. **Workers run without the Foundry** - No runtime dependency
3. **Knowledge is permanent** - Survives all architectural changes
4. **Foundry creates Workers** - But does not operate them
5. **Archive is sacred** - Never delete historical knowledge

---

**The Foundry creates Workers. Workers live independently.**