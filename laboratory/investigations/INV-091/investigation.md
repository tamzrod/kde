# Investigation: INV-091 - KDE Runtime Auto-Initialization

**ID**: INV-091
**Title**: KDE Runtime Auto-Initialization Failure Root Cause Analysis
**Version**: 1.0.0
**Date**: 2026-07-29T23:12:00Z
**Status**: ACTIVE
**Author**: OpenHands Agent

---

## Research Question

Why does the KDE Runtime fail to automatically load on session start, requiring manual invocation of `run_preflight_check()`? What is the expected auto-initialization path and what breaks it?

## Scope

### Included
- Trace initialization path from session start
- Identify missing auto-loading mechanism
- Document dependency issues
- Analyze skills file integration

### Excluded
- Changes to OpenHands core (outside repo control)
- Modifications to skill injection mechanism

## Background

### Observed Behavior
When starting a session in the KDE repository, the runtime does not automatically initialize. Users must manually run:

```bash
python3 -c "
from runtime.preflight import run_preflight_check, format_report
report = run_preflight_check()
print(format_report(report))
"
```

### Skills File Configuration
The `.openhands/skills/kde-investigation-framework.md` and `.agents/skills/kde-investigation-framework.md` files contain:

```yaml
---
name: kde-investigation-framework
type: repo
triggers:
  - investigation
  - experiment
  - start engine
  - preflight check
---
```

The triggers suggest auto-loading on certain keywords, but the initialization is not automatic.

## Root Cause Analysis

### Issue 1: Missing Dependency
**Symptom**: `ModuleNotFoundError: No module named 'yaml'`
**Root Cause**: `pyyaml` not installed in environment
**Evidence**: The runtime `__init__.py` imports `yaml` for engine registry
**Resolution**: Install `pyyaml`

### Issue 2: No Auto-Initialization Entry Point
**Symptom**: Runtime not loaded on session start
**Root Cause**: No automatic initialization when session starts
**Evidence**: Skills file only provides manual command, no auto-init
**Expected Path**: 
```
Session Start → Load Skills → Auto-Initialize Runtime → Ready
Actual Path:
Session Start → Load Skills → [Manual Command Required] → Ready
```

### Issue 3: Skills Auto-Load Mechanism
**Symptom**: Keywords don't trigger auto-initialization
**Root Cause**: Skills define triggers but not auto-actions
**Evidence**: Skills file shows triggers but no initialization code
**Expected**: Triggers should invoke preflight check
**Actual**: Triggers are passive, manual command required

## Hypotheses

**H1**: The skills triggers should include automatic runtime initialization, not just documentation.

**H2**: An `__init__.py` or `bootstrap.py` file should be created to auto-load the runtime on session start.

**H3**: The missing `pyyaml` dependency should be documented or auto-installed.

---

## Status

| Stage | Status |
|-------|--------|
| Idea | ✅ |
| Investigation | ✅ |
| Evidence Collection | 🔄 |
| Observation | ⏳ |
| Synthesis | ⏳ |
| Validation | ⏳ |
| Candidate Knowledge | ⏳ |
| Promotion Proposal | ⏳ |
| Knowledge Repository | ⏳ |

---

## Evidence

| Evidence ID | Description |
|------------|-------------|
| EVID-AUTO-001 | Skills file configuration |
| EVID-AUTO-002 | Runtime `__init__.py` imports |
| EVID-AUTO-003 | Missing dependency trace |
| EVID-AUTO-004 | Mode detection mechanism |

---

## Metadata

- **Engine**: KDE-ENGINE-001
- **Seed**: SEED-001 (Genesis)
- **Methodology Version**: v2.0
- **Domain**: Runtime Infrastructure
