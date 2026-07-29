---
name: kde-investigation-framework
type: pointer
triggers:
  - investigation
  - experiment
  - start engine
  - preflight check
---

# KDE Investigation Framework Skill

## Runtime Entry Point

```bash
python3 runtime/preflight.py
```

## Mode Configuration

Mode is read from `MODE.md`:
- **Mode 1**: Uses `runtime/` content (Markdown format)
- **Mode 2**: Uses `fused-runtime/` content (FUSED format)

Both modes use the same Python runtime from `runtime/`.

## Quick Start

```python
from runtime.preflight import run_preflight_check, format_report
report = run_preflight_check()
print(format_report(report))
```
