# KDE Dual-Mode Configuration

**Mode**: FUSED (ACTIVE)

---

## Switching Modes

### Method 1: Environment Variable

```bash
# For FUSED Mode (AI-optimized)
export KDE_MODE=fused

# For MD Mode (default, human-readable)
export KDE_MODE=md
```

### Method 2: Config File

Create `.kderc` in project root:

```ini
[kde]
mode = fused  # or "md"
```

### Method 3: Runtime Flag

Pass mode at runtime:

```bash
kde --mode fused
kde --mode md
```

---

## Mode Comparison

| Aspect | MD Mode | FUSED Mode |
|--------|---------|------------|
| Format | Markdown | FUSED (.fused) |
| Location | `/seeds/`, `/engines/` | `/fused-runtime/` |
| Tokens | +34% | baseline |
| Parse Speed | -16% | baseline |
| Human Readable | ✅ Excellent | ⚠️ Functional |
| Git-Friendly | ✅ Excellent | ✅ Good |
| AI Efficiency | ⚠️ Higher cost | ✅ Lower cost |

---

## Current Configuration

| Setting | Value |
|---------|-------|
| Active Mode | FUSED |
| Runtime Path | `/fused-runtime/` |
| Default Mode | MD (original) |

---

## How Mode Switching Works

### KDE Runtime Loader

```python
import os
from pathlib import Path

class KDEModeLoader:
    def __init__(self):
        self.mode = os.getenv('KDE_MODE', 'md')
        
    def get_runtime_path(self) -> Path:
        if self.mode == 'fused':
            return Path('/fused-runtime')
        return Path('/')  # Original runtime
    
    def get_content(self, path: str) -> str:
        full_path = self.get_runtime_path() / path
        return full_path.read_text()
```

---

## Recommendations

| Use Case | Recommended Mode |
|----------|-----------------|
| Content authoring | MD |
| Debugging | MD |
| Documentation | MD |
| Production AI ops | FUSED |
| High-frequency processing | FUSED |
| Token-limited AI | FUSED |

---

## Verification

Check current mode:

```bash
echo $KDE_MODE
```

List available content:

```bash
# MD Mode
ls -la seeds/ engines/ governance/

# FUSED Mode
ls -la fused-runtime/seeds/ fused-runtime/engines/ fused-runtime/governance/
```

---

## Future: Auto Mode Switching

Planned feature: Automatic mode selection based on context.

```python
def auto_select_mode():
    if is_human_reading():
        return 'md'
    elif is_ai_processing():
        return 'fused'
    return 'md'  # default
```
