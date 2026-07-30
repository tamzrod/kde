# kde-core (Minimal)

**Minimum KDE Runtime - ~65 files, ~332KB**

## Installation

```bash
# Install to current directory
./bin/install.sh

# Or use the kde command
./bin/kde preflight
```

## Contents

```
kde-core/
├── laboratory/       # Laboratory Rules (Synthesized v1.0.0)
├── runtime/          # Core Python runtime (~15 files)
├── fused/
│   ├── engines/      # Execution engines (Alpha, Beta, Gamma, Delta, Epsilon)
│   ├── governance/   # 26 governance rules
│   └── seeds/
│       └── seed-001/ # SEED-001 Authority (Five Core Principles)
├── bin/
│   ├── install.sh    # Installation script
│   ├── sync.sh       # Sync with main repository
│   └── kde           # Launcher
├── MODE.md           # Mode configuration
└── README.md
```

## Usage

### Preflight Check

```bash
./bin/kde preflight
# or
python3 -m runtime.preflight
```

### Sync with Main Repository

```bash
# Preview what would be synced
./bin/sync.sh --dry-run

# Sync changes
./bin/sync.sh

# Sync and auto-commit
./bin/sync.sh --auto-commit

# Sync from specific remote/branch
./bin/sync.sh --remote upstream --branch main
```

Or use the kde command:

```bash
./bin/kde sync --dry-run
./bin/kde sync
./bin/kde sync --auto-commit
```

## Laboratory Rules

The synthesized Laboratory Rules are defined in `laboratory/`:

| File | Description |
|------|-------------|
| `BOOTSTRAP.md` | Entry point for KDE sessions |
| `LABORATORY-RULES.md` | Full synthesized rules (6 rules) |
| `RULES.md` | Rules reference |

**The Six Core Rules**:
1. Authorization Required
2. No Self-Authority
3. Evidence-Based Content
4. Boundaries
5. Protection
6. Checkpoints

## Requirements

- Python 3.8+
- pyyaml

## Version

1.0.0-minimal

---

*Generated from INV-091: Minimal kde-core Footprint Analysis*
