# Architecture

---

## The Simple Idea

KDE has five directories. Each serves a purpose. Together, they enable systematic investigation.

---

## The Five Directories

```
kde/
├── seeds/           # Immutable reasoning DNA
├── engines/        # Methodology implementations
├── laboratory/     # Scientific workflow
├── knowledge/      # Validated knowledge
└── governance/     # Repository governance
```

---

## What Each Directory Does

### /seeds/

Immutable foundational principles. Once created, never modified.

```
seeds/
├── seed-001/       # Genesis (frozen)
├── seed-002/       # Evolution (frozen)
```

### /engines/

Reasoning methodology implementations.

```
engines/
├── alpha/          # KDE-ENGINE-001 (historical)
├── beta/          # KDE-ENGINE-002 (active)
├── gamma/         # KDE-ENGINE-003 (active)
├── delta/         # KDE-ENGINE-004 (active)
```

### /laboratory/

Where investigations happen.

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

## How They Connect

```
Human Request
      │
      ▼
  Bootstrap
      │
      ▼
     ECU ◄── Governance
      │
      ▼
  Engine + Seed
      │
      ▼
  Laboratory
      │
      ▼
   Knowledge
```

---

## File Naming

| Pattern | Example | Purpose |
|---------|---------|---------|
| `INV-XXX/` | `INV-001/` | Investigation directory |
| `LAB-XXX/` | `LAB-001/` | Experiment directory |
| `DOMAIN-XXX.md` | | Domain definition |
| `PATTERN-XXX.md` | | Pattern description |
| `PROPOSAL-XXX.md` | | Change proposal |

---

## Key Entry Points

| Entry | Location | Purpose |
|-------|----------|---------|
| Session | `laboratory/BOOTSTRAP.md` | Start here |
| Principles | `seeds/seed-001/principles/5-principles.md` | Core rules |
| Runtime | `runtime/ecu/` | ECU implementation |

---

## See Also

- [Models](models.md) — Technical details
- [Contributing](../10-contributing/contributing.md) — How to contribute
- [Commands](../9-reference/commands.md) — Reference
