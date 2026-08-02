# Foundry (Queen)

**Purpose**: The Foundry creates and evolves Workers. It is NOT a runtime orchestrator.

---

## Foundry Responsibilities

The Foundry (Queen) is responsible for:
- **Creating Workers** - Designing and building new Workers
- **Evolving Workers** - Improving Worker designs over time
- **Preserving Knowledge** - Maintaining the Knowledge Layer
- **Defining Standards** - Establishing Worker requirements
- **Publishing Releases** - Distributing Worker versions
- **Learning Lessons** - Capturing lessons from Worker evolution

---

## Foundry Rules

1. **Foundry never performs production work** - Only creates and evolves Workers
2. **Foundry never executes Worker responsibilities** - Workers operate independently
3. **Workers are independent** - Workers function without the Foundry at runtime
4. **Knowledge is permanent** - Survives all architectural changes

---

## Directories

```
foundry/
├── knowledge/           # The permanent Knowledge Layer
├── templates/           # Worker creation templates
├── standards/           # Worker requirements and standards
├── releases/            # Published Worker versions
├── protocols/           # Worker-Foundry interaction protocols
├── audit/               # Audit trail
├── capabilities/         # Shared capability definitions
├── plugins/             # Shared plugin interfaces
└── README.md            # This file
```

---

## Worker Lifecycle

```
Knowledge → Worker Design → Worker Development → Worker Validation → Worker Release
     ↑                                                                              ↓
     └────────────────── Lessons Learned ← Worker Evolution ←───────────────┘
```

---

**The Foundry creates Workers. Workers live independently.**
