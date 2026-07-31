# Commands

---

## Command Categories

| Category | Purpose |
|----------|---------|
| Runtime | Session management |
| Investigation | Investigation operations |
| Knowledge | Knowledge operations |
| System | System utilities |

---

## Runtime Commands

### start engine

Initialize KDE runtime.

```bash
start engine
```

**Aliases**: `initialize kde`, `init kde`, `run`

---

### pre-flight check

Verify system readiness.

```bash
pre-flight check
```

**Aliases**: `systems check`, `health`, `check`, `go`

Checks five things:
1. Initialization
2. Engine Registry
3. Seed Registry
4. Policy Layer
5. System Health

---

### mission ready

Confirm operational status.

```bash
mission ready
```

**Aliases**: `go for launch`

---

### check state

View current runtime state.

```bash
check state
```

**Aliases**: `status report`

---

## Investigation Commands

### bootstrap

Run bootstrap gates.

```bash
bootstrap
```

---

### run investigation

Begin new investigation.

```bash
run investigation
```

---

### check investigation

View investigation status.

```bash
check investigation [id]
```

---

## Configuration

### Runtime Configuration

Location: `/governance/runtime/defaults.yaml`

```yaml
runtime:
  default_engine: KDE-ENGINE-002
  default_seed: SEED-001
  policy_enforcement: true
```

### Engine Selection

Automatic (default) or manual:

```yaml
# Automatic (default)
engine_selection: automatic

# Manual override
engine_selection: manual
engine: KDE-ENGINE-003
```

---

## Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `KDE_ROOT` | KDE root directory | Current |
| `KDE_ENGINE` | Override engine | Auto |
| `KDE_SEED` | Override seed | SEED-001 |

---

## Quick Reference

| Command | Aliases | Purpose |
|---------|---------|---------|
| `start engine` | init, run | Initialize runtime |
| `pre-flight check` | check, go | Verify readiness |
| `mission ready` | go for launch | Confirm status |
| `check state` | status report | View state |
| `bootstrap` | | Run bootstrap |
| `run demo` | | Run demo |

---

## See Also

- [Glossary](glossary.md) — Terminology
- [Guides](../7-guides/guides.md) — Usage guides
- [ECU](../5-core-concepts/ecu.md) — Runtime details
