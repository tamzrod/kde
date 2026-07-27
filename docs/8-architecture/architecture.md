# Architecture

**Purpose**: KDE's repository and directory structure
**Audience**: Contributors, developers

---

## Repository Overview

KDE uses a five-directory canonical structure:

```
kde/
├── seeds/           # Immutable reasoning DNA
├── engines/        # Methodology implementations
├── laboratory/     # Scientific workflow
├── knowledge/      # Validated knowledge
└── governance/     # Repository governance
```

---

## Directory Organization

### /seeds/

Immutable foundational principles.

```
seeds/
├── seed-001/       # Genesis (frozen)
│   ├── principles/
│   └── specifications/
└── seed-002/       # Evolution (frozen)
    ├── principles/
    └── specifications/
```

**Rule**: Seeds are never modified after creation.

### /engines/

Reasoning methodology implementations.

```
engines/
├── alpha/          # KDE-ENGINE-001 (historical)
├── beta/          # KDE-ENGINE-002 (active)
├── gamma/         # KDE-ENGINE-003 (active)
├── delta/         # KDE-ENGINE-004 (active)
└── current.md     # Active engine reference
```

### /laboratory/

Scientific investigation workspace.

```
laboratory/
├── investigations/     # Investigation artifacts
│   └── INV-XXX/
├── experiments/        # Experiment records
│   └── LAB-XXX/
├── validations/        # Validation reports
├── bootstrap.md       # Session entry point
└── laboratory-rules.md
```

### /knowledge/

Validated knowledge base.

```
knowledge/
├── foundational/      # Core definitions
├── domain/           # Domain knowledge
├── patterns/         # Recurring patterns
└── lessons/          # Lessons learned
```

### /governance/

Rules and policies.

```
governance/
├── runtime/         # Runtime configuration
├── proposals/       # Change proposals
└── policies/        # Policy documents
```

---

## File Naming Conventions

### Investigation Files

| Pattern | Example | Purpose |
|---------|---------|---------|
| `INV-XXX/` | `INV-001/` | Investigation directory |
| `INVESTIGATION.md` | | Main document |
| `EVIDENCE.md` | | Supporting evidence |

### Experiment Files

| Pattern | Example | Purpose |
|---------|---------|---------|
| `LAB-XXX/` | `LAB-001/` | Experiment directory |
| `experiment.md` | | Experiment specification |
| `results.md` | | Experiment results |

### Knowledge Files

| Pattern | Example | Purpose |
|---------|---------|---------|
| `DOMAIN-XXX.md` | `DOMAIN-001.md` | Domain definition |
| `PATTERN-XXX.md` | `PATTERN-001.md` | Pattern description |

### Governance Files

| Pattern | Example | Purpose |
|---------|---------|---------|
| `PROPOSAL-XXX.md` | `PROPOSAL-001.md` | Change proposal |
| `POLICY-XXX.md` | `POLICY-001.md` | Policy document |
| `PATCH-XXX/` | `PATCH-001/` | Patch directory |

---

## Key Entry Points

### Session Entry

```
laboratory/BOOTSTRAP.md
```

This is the canonical entry point for every session.

### Core Principles

```
seeds/seed-001/principles/5-principles.md
```

The five core principles that govern KDE.

### Runtime

```
runtime/ecu/
```

The ECU implementation for orchestration.

---

## Component Relationships

```
     Human
       │
       ▼
  ┌─────────┐
  │ Bootstrap│
  └────┬────┘
       │
       ▼
  ┌─────────┐
  │   ECU   │◄──── Governance
  └────┬────┘
       │
  ┌────┴────┐
  │         │
  ▼         ▼
Engine    Seed
  │
  ▼
Laboratory
  │
  ▼
Knowledge
```

---

## See Also

- [Models](models.md) - Engine, Seed, ECU models
- [Contributing](../10-contributing/contributing.md) - How to contribute
- [Reference](../9-reference/commands.md) - Command reference
