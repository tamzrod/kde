# KDE Seeds Directory

**Directory**: `.kde/seeds/`
**Purpose**: Contains immutable Seeds representing KDE reasoning generations

---

## What is a Seed?

A **Seed** is the immutable foundation of KDE reasoning. It represents:

- The fundamental DNA of how KDE discovers knowledge
- Core principles that govern AI behavior
- The scientific methodology backbone
- Evidence and confidence models
- Knowledge synthesis processes

### Seed Characteristics

| Characteristic | Description |
|----------------|-------------|
| **Immutable** | Never modified after freezing |
| **Versioned** | Unique version for each generation |
| **Reproducible** | Enables experiment reproducibility |
| **Complete** | Contains all reasoning DNA |

---

## Seed vs Engine

```
┌─────────────────────────────────────────────────────────┐
│                    K D E                                  │
└─────────────────────────────────────────────────────────┘

                    │
                    ▼
         ┌─────────────────────┐
         │        Seed         │
         │                     │
         │ Immutable reasoning │
         │     foundation      │
         └──────────┬──────────┘
                    │ consumes
                    ▼
         ┌─────────────────────┐
         │       Engine        │
         │                     │
         │  Implementation     │
         │    layer           │
         └──────────┬──────────┘
                    │ executes under
                    ▼
         ┌─────────────────────┐
         │     Laboratory      │
         │                     │
         │  Experiment         │
         │   execution        │
         └─────────────────────┘
```

### Hierarchy

| Layer | Purpose | Changes? |
|-------|---------|----------|
| **Seed** | Reasoning DNA | NEVER |
| **Engine** | Methodology | When improved |
| **Laboratory** | Execution | When needed |

---

## Available Seeds

| Seed ID | Version | Codename | Status |
|---------|---------|----------|--------|
| SEED-001 | 1.0.0 | Genesis | FROZEN |

---

## Future Evolution

If KDE reasoning fundamentally changes:

```
SEED-001 (Genesis) ──FROZEN──► [Immutable forever]

SEED-002 ──NEW SEED CREATED──► [Next generation]
```

### Rules

1. **Seed-001 is frozen** — Never modify
2. **Create new Seed** — When reasoning changes fundamentally
3. **Never overwrite** — Future Seeds inherit, never modify
4. **Engine compatibility** — Engines declare compatible Seeds

---

## Seed Contents

Each Seed contains:

```
seed-xxx/
├── seed.yaml              # Seed manifest
├── README.md              # This file
├── principles/            # Core principles
│   ├── README.md
│   └── 5-principles.md
├── scientific-loop/        # Learning loop
│   ├── README.md
│   └── loop.md
├── evidence-model/         # Evidence standards
│   ├── README.md
│   └── model.md
├── knowledge-model/        # Knowledge standards
│   ├── README.md
│   └── model.md
├── confidence-model/       # Confidence methodology
│   ├── README.md
│   └── model.md
└── ambiguity/            # Ambiguity handling
    ├── README.md
    └── handling.md
```

---

## Seed Selection

Engines specify compatible Seeds in their manifest:

```yaml
compatible_seeds:
  - SEED-001
```

---

## Related Documents

- [.kde/README.md](../README.md) — KDE directory overview
- [.kde/engines/](../engines/) — Engine implementations
- [engine/README.md](../../engine/README.md) — Engine framework

---

**Status**: ARCHITECTURAL FOUNDATION
