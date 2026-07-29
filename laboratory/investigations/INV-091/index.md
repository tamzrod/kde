# Investigation INV-091: Experiment Index

**Investigation**: INV-091 - KDE Runtime Auto-Initialization Failure
**Updated**: 2026-07-29T23:12:00Z
**Status**: ACTIVE

---

## Quick Summary

Root cause analysis of why KDE Runtime fails to auto-load on session start. Identified two issues: (1) missing `pyyaml` dependency, and (2) no automatic initialization entry point in skills.

---

## Root Causes Identified

| Issue | Impact | Status |
|-------|--------|--------|
| Missing pyyaml | Blocked all imports | ✅ Fixed |
| No auto-init entry point | Manual command required | 🔄 Needs fix |
| Skills triggers passive | No auto-action on keywords | 🔄 Needs design |

---

## Experiments

| ID | Status | Summary |
|----|--------|---------|
| LAB-075 | 🔄 IN_PROGRESS | Auto-Initialization Fix Implementation |

---

## Key Findings

1. **Skills define triggers but no actions** - Keywords like "preflight check" should trigger initialization
2. **Missing dependency breaks entire runtime** - `pyyaml` required by `runtime/__init__.py`
3. **No bootstrap entry point** - Session start doesn't invoke runtime initialization

---

## Metadata

- **Engine**: KDE-ENGINE-001
- **Seed**: SEED-001 (Genesis)
- **Domain**: Runtime Infrastructure
