---
name: kde-investigation-framework
type: repo
triggers:
  - investigation
  - experiment
  - start engine
  - preflight check
---

# KDE Investigation Framework Skill

This repository operates under the Knowledge-Driven Engineering (KDE) Laboratory methodology.

## Purpose

This skill provides guidance for conducting investigations and experiments within the KDE Laboratory framework.

## Authoritative Sources

| Content | Location | Purpose |
|---------|----------|---------|
| Five Core Principles | `runtime/principles_enforcer.py` | Actual enforcement code |
| Laboratory Workflow | `laboratory/WORKFLOW.md` | Investigation lifecycle (9 stages) |
| Investigation Templates | `laboratory/templates/investigation-template.md` | Investigation artifact template |
| Experiment Templates | `laboratory/templates/experiment-template.md` | Experiment artifact template |
| ECU Runtime | `runtime/ecu/` | Execution control and governance |
| Pre-Flight Check | `runtime/preflight.py` | System readiness verification |

## Investigation Workflow

When conducting investigations, follow the 9-stage workflow defined in `laboratory/WORKFLOW.md`:

1. IDEA → 2. INVESTIGATION → 3. EVIDENCE COLLECTION → 4. OBSERVATION → 5. SYNTHESIS → 6. VALIDATION → 7. CANDIDATE KNOWLEDGE → 8. PROMOTION → 9. KNOWLEDGE REPOSITORY

## Required Artifacts

For each investigation, create artifacts in `/laboratory/investigations/INV-XXX/`:
- `investigation.md` - Research question and scope
- `index.md` - Experiment index
- `links/` - Links to experiments

For each experiment, create artifacts in `/laboratory/experiments/LAB-XXX/`:
- `experiment.md` - Experiment definition with hypothesis
- `runs/` - Run records
- `evidence/` - Evidence files

## Version Stamping

All investigation artifacts MUST include:
- **Engine**: KDE-ENGINE-XXX (vX.Y.Z)
- **Seed**: SEED-XXX (vX.Y.Z)
- Timestamps in ISO-8601 UTC format

## Quick Start

### Auto-Initialization (Recommended)
The KDE Runtime now auto-initializes when you import the bootstrap module:

```bash
python3 -c "import runtime.bootstrap"
```

This automatically:
1. Checks and installs required dependencies (pyyaml, jsonschema)
2. Detects the current execution mode (MD or FUSED)
3. Initializes the ECU and engine registry
4. Runs and displays the pre-flight check

### Manual Pre-Flight Check
To run the pre-flight check manually:

```bash
python3 -c "
from runtime.preflight import run_preflight_check, format_report
report = run_preflight_check()
print(format_report(report))
"
```

See `laboratory/WORKFLOW.md` for the complete investigation protocol.
