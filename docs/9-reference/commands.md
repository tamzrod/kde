# Commands

**Purpose**: Complete command and alias reference
**Audience**: All users

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

**Alias**: `initialize kde`, `init kde`, `run`

**Usage**:
```
start engine
```

**Output**: Runtime initialization confirmation

---

### pre-flight check

Verify system readiness.

**Alias**: `systems check`, `health`, `check`, `go`

**Usage**:
```
pre-flight check
```

**Output**: Five-point system check

---

### mission ready

Confirm operational status.

**Alias**: `go for launch`

**Usage**:
```
mission ready
```

**Output**: Mission ready confirmation

---

### check state

View current runtime state.

**Alias**: `status report`

**Usage**:
```
check state
```

**Output**: Current state information

---

## Alias Reference

### Canonical Commands

| Command | Description |
|---------|-------------|
| `start engine` | Initialize runtime |
| `pre-flight check` | Verify readiness |
| `mission ready` | Confirm status |
| `check state` | View state |
| `bootstrap` | Bootstrap session |
| `run demo` | Run demo sequence |

### Alias Categories

| Category | Commands |
|----------|----------|
| **canonical** | Primary authoritative commands |
| **operational** | Mission-oriented workflow |
| **professional** | Engineering terminology |
| **friendly** | New user-friendly commands |
| **deprecated** | Backward compatibility |

---

## Investigation Commands

### bootstrap

Run bootstrap gates.

**Usage**:
```
bootstrap
```

---

### run investigation

Begin new investigation.

**Usage**:
```
run investigation
```

---

### check investigation

View investigation status.

**Usage**:
```
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

Automatic or manual:

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

## See Also

- [Glossary](glossary.md) - Terminology
- [Guides](../7-guides/guides.md) - Usage guides
- [ECU](../5-core-concepts/ecu.md) - Runtime details
