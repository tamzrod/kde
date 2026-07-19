# Run Record Template

**Template Version**: 1.0  
**Date**: 2026-07-19  

---

## Run Header

| Field | Value |
|-------|-------|
| **Run ID** | MCP-XXX/RUN-YYY |
| **Experiment ID** | MCP-XXX |
| **Run Number** | YYY |
| **Date** | YYYY-MM-DD |
| **Executor** | [Name] |
| **Duration** | [HH:MM:SS] |
| **Status** | COMPLETE |

---

## Environment State

### System

| Component | Value |
|-----------|-------|
| OS | [Operating system and version] |
| Architecture | [x86_64, arm64, etc.] |
| Kernel | [Kernel version] |

### Runtime

| Component | Version/Commit |
|-----------|---------------|
| Go | [Go version] |
| MCP Runtime | [Version/commit] |
| Dependencies | [List versions] |

### Test Data

| Item | Description |
|------|-------------|
| Project | [Test project used] |
| Configuration | [Test configuration] |
| Fixtures | [Fixtures used] |

---

## Execution Log

```
[Detailed command log with timestamps]

$ command 1
output 1

$ command 2
output 2
```

---

## Observations

### Pre-Execution

[State before running]

### During Execution

[What was observed during execution]

### Post-Execution

[State after execution]

---

## Results

### Pass/Fail

| Criterion | Expected | Actual | Pass/Fail |
|-----------|----------|--------|-----------|
| [Criterion 1] | [Value] | [Value] | ✅/❌ |
| [Criterion 2] | [Value] | [Value] | ✅/❌ |

### Overall Status

| Status | Result |
|--------|--------|
| Outcome | [SUPPORTS/CONTRADICTS/INCONCLUSIVE] |
| All Criteria Met | [YES/NO/PARTIAL] |

---

## Evidence Collected

| Evidence ID | Type | Description | Hash |
|-------------|------|-------------|------|
| MCP-XXX/EV-YYY1 | log | Test execution log | [SHA-256] |
| MCP-XXX/EV-YYY2 | screenshot | [Description] | [SHA-256] |

---

## Anomalies

[Any unexpected behavior or deviations from expected results]

---

## Notes

[Any additional notes for reproducibility]

---

## Next Run Recommendations

[Any recommendations for subsequent runs]

---

**Template**: Run Record  
**Next**: Save as experiments/MCP-XXX/runs/RUN-YYY.md
