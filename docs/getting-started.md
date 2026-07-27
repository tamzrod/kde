# Getting Started with KDE

A quick guide to running your first KDE investigation.

---

## Prerequisites

- Python 3.10+
- Git access

## Step 1: Start the Engine

```python
from runtime.ecu import create_ecu

ecu = create_ecu('/path/to/kde')
```

Or use command alias:
```
start engine
```

## Step 2: Verify Readiness

```
pre-flight check
```

Expected output:
```
■ CHECK 1: INITIALIZATION
  Status: ✅ READY

■ CHECK 2: ENGINE REGISTRY
  Engines: 8 total | 7 active

■ CHECK 3: SEED REGISTRY
  Seeds: 4 registered

■ CHECK 4: POLICY LAYER
  Rules: 8 | Active Violations: 0

■ CHECK 5: SYSTEM HEALTH
  Status: ✅ HEALTHY
```

## Step 3: Begin Investigation

```
run investigation
```

---

## Common Commands

| Task | Command |
|------|---------|
| Start runtime | `start engine` |
| Check status | `pre-flight check` |
| Verify readiness | `mission ready` |
| View state | `check state` |

---

## Next Steps

- Read [Runtime Concepts](runtime-concepts.md)
- Review [Laboratory Workflow](laboratory.md)
- Understand [Governance Rules](governance.md)
