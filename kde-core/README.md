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
├── runtime/           # Core Python runtime (~15 files)
├── fused/
│   ├── engines/       # Execution engines (Alpha, Beta, Gamma, Delta, Epsilon)
│   ├── governance/    # 26 governance rules
│   └── seeds/
│       └── seed-001/  # SEED-001 Authority (Five Core Principles)
├── bin/
│   ├── install.sh     # Installation script
│   └── kde            # Launcher
├── MODE.md            # Mode configuration
└── README.md
```

## Requirements

- Python 3.8+
- pyyaml

## Post-Install

```bash
python3 -m runtime.preflight
```

## Version

1.0.0-minimal

---

*Generated from INV-091: Minimal kde-core Footprint Analysis*
