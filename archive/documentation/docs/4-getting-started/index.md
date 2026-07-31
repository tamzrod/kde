# Getting Started

---

## The Simple Idea

Starting KDE is like starting a research session. Before you begin investigating, you check that your tools are ready, your environment is set, and your governance is active.

This is the pre-flight check.

---

## What You Need

| Requirement | Version | Why |
|-------------|---------|-----|
| Python | 3.10+ | Runs the runtime |
| Git | Any recent | Manages knowledge base |
| Terminal | Any | Interface to KDE |

---

## Installation

### Step 1: Get the Code

```bash
git clone https://github.com/tamzrod/kde.git
cd kde
```

### Step 2: Verify Everything Works

Run the pre-flight check:

```bash
python3 -m runtime.ecu
```

You should see:

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

### Step 3: Start Your Session

```
start engine
```

This initializes everything. You'll see confirmation when KDE is ready.

---

## Quick Reference

| Task | Command |
|------|---------|
| Start | `start engine` |
| Check status | `pre-flight check` |
| Verify readiness | `mission ready` |
| View state | `check state` |

---

## Common Issues

### Import Errors

```bash
export PYTHONPATH=/path/to/kde:$PYTHONPATH
```

### Not Ready

1. Check Python: `python3 --version`
2. Check repo: `git status`
3. Restart: `start engine`

---

## What Comes Next

With KDE running, you're ready to investigate.

**[Run Your First Investigation](first-investigation.md)** — See KDE in action
