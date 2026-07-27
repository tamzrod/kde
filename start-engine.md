# Start Engine

**Aliases**: `start engine`, `start-runtime`, `initialize kde`, `init kde`, `run`

---

## Purpose

This file provides the canonical procedure for starting the KDE Runtime engine.

---

## Bootstrap Sequence

When you say "start engine", "start runtime", or similar commands, follow this procedure:

### Step 1: Acknowledge Laboratory Rules

Before any work, acknowledge the Five Core Principles from `/seeds/seed-001/principles/5-principles.md`:

| Rule | Description |
|------|-------------|
| **No Auto-Continuation** | Never begin next session without human authorization |
| **No Self-Approval** | Never approve your own work |
| **No Self-Promotion** | Never promote knowledge to production |
| **Distinguish Evidence** | Mark fact vs. conclusion vs. speculation |
| **Evidence-Based Changes** | All claims must be justified |

### Step 2: Load Alias Registry

The alias system is automatically loaded during initialization:

```python
from runtime.aliases import get_registry
registry = get_registry()
registry.load()
```

### Step 3: Initialize Dependencies

Dependencies are installed automatically if needed:

```bash
pip install pyyaml
```

### Step 4: Initialize KDE Runtime ECU

```python
import sys
sys.path.insert(0, '/workspace/project/kde')

from runtime.ecu import create_ecu

ecu = create_ecu('/workspace/project/kde')
```

### Step 5: Run Pre-Flight Check

After initialization, run the pre-flight check to verify readiness:

```python
from runtime.preflight import run_preflight_check, format_report

report = run_preflight_check()
print(format_report(report))
```

---

## Alias System

The KDE Runtime includes an alias system for human-friendly commands:

### Canonical Commands

| Command | Description |
|---------|-------------|
| `start engine` | Initialize KDE Runtime ECU |
| `pre-flight check` | Verify runtime readiness |
| `mission ready` | Session readiness confirmation |
| `check state` | Read runtime state |
| `run demo` | Execute demonstration routine |
| `bootstrap` | Canonical entry point |

### Alias Resolution

All aliases resolve to canonical commands:

```
'start-runtime' → 'start engine'
'init kde' → 'start engine'
'systems check' → 'pre-flight check'
'health' → 'pre-flight check'
'go' → 'pre-flight check'
```

---

## Active Configuration

| Component | ID | Version | Status |
|-----------|-----|---------|--------|
| **Engine** | KDE-ENGINE-002 (Beta) | 0.1.0 | Active |
| **Seed** | SEED-001 (Genesis) | 1.0.0 | FROZEN |
| **Architecture** | Architecture C | 1.0.0 | Production |

---

## Common Commands

| Command | Procedure |
|---------|-----------|
| `start engine` | Initialize KDE Runtime |
| `run demo` | Execute `python3 -c "from runtime.runtime import demo; demo()"` |
| `check state` | Read `/runtime/state.json` |

---

## Detailed Procedure

For the full initialization procedure, see:
- [`laboratory/BOOTSTRAP.md`](./laboratory/BOOTSTRAP.md) - Canonical entry point
- [`laboratory/LABORATORY-RULES.md`](./laboratory/LABORATORY-RULES.md) - Runtime initialization

---

**Document Status**: APPROVED  
**Source**: INV-054  
**Approved**: 2026-07-27
