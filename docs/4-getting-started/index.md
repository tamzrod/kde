# Getting Started

**Purpose**: Prerequisites and setup
**Audience**: New users

---

## Prerequisites

### Software Requirements

| Requirement | Version | Purpose |
|-------------|---------|---------|
| Python | 3.10+ | Runtime execution |
| Git | Latest | Version control |
| Terminal | Any | Command interface |

### Environment Requirements

- Write access to working directory
- Network access for Git operations
- Sufficient disk space for repository

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/tamzrod/kde.git
cd kde
```

### 2. Verify Installation

Run the pre-flight check:

```bash
python3 -m runtime.ecu
```

Expected output:
```
■ CHECK 1: INITIALIZATION
  Status: ✅ READY

■ CHECK 2: ENGINE REGISTRY
  Engines: [N] total | Active

■ CHECK 3: SEED REGISTRY
  Seeds: [N] registered

■ CHECK 4: POLICY LAYER
  Rules: [N]
  Active Violations: 0

■ CHECK 5: SYSTEM HEALTH
  Status: ✅ HEALTHY
```

### 3. Initialize Session

The first command in any session should be:

```
start engine
```

This initializes the KDE Runtime with all components.

---

## Quick Reference

| Task | Command |
|------|---------|
| Start runtime | `start engine` |
| Check status | `pre-flight check` |
| Verify readiness | `mission ready` |
| View state | `check state` |

---

## First Steps

Once installed:

1. [Run your first investigation](first-investigation.md)
2. Review [Core Concepts](../5-core-concepts/engines-and-seeds.md)
3. Explore [How It Works](../6-how-it-works/processes.md)

---

## Troubleshooting

### Import Errors

If you encounter import errors:

```bash
export PYTHONPATH=/path/to/kde:$PYTHONPATH
```

### Runtime Not Ready

If runtime shows not ready:

1. Check Python version: `python3 --version`
2. Verify repository integrity: `git status`
3. Try restarting: `start engine`

---

## See Also

- [First Investigation](first-investigation.md) - Run your first investigation
- [Core Concepts](../5-core-concepts/engines-and-seeds.md) - Understand KDE components
- [Commands](../9-reference/commands.md) - Full command reference
