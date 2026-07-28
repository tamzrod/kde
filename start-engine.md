# Start Engine

**Aliases**: `start engine`, `start-runtime`, `initialize kde`, `init kde`, `run`

---

## Purpose

This file provides the canonical procedure for starting the KDE Runtime engine with **active Five Core Principles enforcement**.

---

## Bootstrap Sequence

When you say "start engine", "start runtime", or similar commands, follow this procedure:

### Step 1: Acknowledge and Enforce Five Core Principles

Before any work, acknowledge the Five Core Principles from `/seeds/seed-001/principles/5-principles.md`:

| Rule | Description | Enforcement |
|------|-------------|-------------|
| **No Auto-Continuation** | Never begin next session without human authorization | Checkpoints block unauthorized continuation |
| **No Self-Approval** | Never approve your own work | Blocks REVIEW → APPROVED for AI |
| **No Self-Promotion** | Never promote knowledge to production | Blocks VALIDATED → PROMOTED for AI |
| **Distinguish Evidence** | Mark fact vs. conclusion vs. speculation | Classifies content by evidence level |
| **Evidence-Based Changes** | All claims must be justified | Requires evidence citations |

### Step 2: Initialize Five Core Principles Enforcer

The enforcer is automatically initialized with the ECU.

### Step 3: Run Pre-Flight Check

Run the pre-flight check to verify readiness:

```python
from runtime.preflight import run_preflight_check, format_report
report = run_preflight_check()
print(format_report(report))
```

---

## Five Core Principles Enforcement API

The runtime provides programmatic enforcement:

- `ecu.check_state_transition()` - Blocks AI self-approval
- `ecu.check_promotion()` - Blocks AI self-promotion
- `ecu.check_content_evidence()` - Classifies content by evidence level
- `ecu.require_authorization()` - Requires human authorization for sessions
- `ecu.check_claims_evidence()` - Validates evidence for claims

---

## Active Configuration

| Component | ID | Version | Status |
|-----------|-----|---------|--------|
| **Engine** | KDE-ENGINE-002 (Beta) | 0.1.0 | Active |
| **Seed** | SEED-001 (Genesis) | 1.0.0 | FROZEN |
| **Architecture** | Architecture C | 1.0.0 | Production |
| **Principles Enforcer** | SEED-001 | 1.0.0 | ACTIVE |

---

**Document Status**: APPROVED  
**Source**: INV-054  
**Approved**: 2026-07-27  
**Updated**: 2026-07-28 - Added active enforcement module
