# Start Engine

**Aliases**: `start engine`, `start-runtime`, `initialize kde`, `init kde`, `run`

---

## Purpose

This file provides the canonical procedure for starting the KDE Runtime engine.

> **Quick Command Reference**: To start the engine, run the Python initialization procedure below or use the `start-engine.md` as a reference for the complete workflow.

---

## Quick Start

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

### Step 2: Initialize Dependencies

Ensure Python dependencies are installed:

```bash
pip install pyyaml
```

### Step 3: Initialize KDE Runtime

```python
import sys
import os

# Setup paths
sys.path.insert(0, '/workspace/project/kde')
os.chdir('/workspace/project/kde')

# Import and initialize
from runtime.ecu import create_ecu

ecu = create_ecu('/workspace/project/kde')
```

### Step 4: Verify Initialization

```python
runtime_state = ecu.get_runtime_state()
print(f"Initialized: {runtime_state['initialized']}")
print(f"Engines: {runtime_state['engines_registered']}")
print(f"Seeds: {runtime_state['seeds_registered']}")
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
