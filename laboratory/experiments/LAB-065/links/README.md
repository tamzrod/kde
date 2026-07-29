# Links: LAB-065 ECU Runtime Analysis

**Experiment**: LAB-065
**created**: 2026-07-29T04:30:00Z

---

## Investigation Link

[INV-088: ECU Runtime Execution Control Architecture](../investigations/INV-088/)

---

## Evidence Links

| Evidence | Location |
|----------|----------|
| Execution Flow | [evidence/execution-flow-analysis.md](evidence/execution-flow-analysis.md) |
| Capability Resolver | [evidence/capability-resolver-status.md](evidence/capability-resolver-status.md) |
| Genesis Usage | [evidence/genesis-usage-pattern.md](evidence/genesis-usage-pattern.md) |
| Engine Selection | [evidence/engine-selection-gaps.md](evidence/engine-selection-gaps.md) |
| Architecture | [evidence/architecture-comparison.md](evidence/architecture-comparison.md) |

---

## Run Links

| Run ID | Status | Result |
|--------|--------|--------|
| [RUN-001](runs/run-001.md) | COMPLETE | SUPPORTS |

---

## External References

| Source | Description |
|--------|-------------|
| `runtime/ecu/__init__.py` | RuntimeECU implementation |
| `runtime/ecu/resolver/__init__.py` | CapabilityResolver |
| `runtime/ecu/planner/__init__.py` | ExecutionPlanner |
| `runtime/principles_enforcer.py` | FivePrinciplesEnforcer |

---
