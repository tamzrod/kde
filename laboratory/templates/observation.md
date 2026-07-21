# Observation Template

**Template Version**: 1.0.0
**Date**: 2026-07-21
**Architecture**: Architecture C

---

## Purpose

This template defines the structure for documenting observations during experiments. Observations document what was seen, not what it means.

---

## Observation Principles

| Principle | Description |
|-----------|-------------|
| **Factuality** | Document only what was observed |
| **Objectivity** | Avoid interpretation |
| **Traceability** | Link to evidence |
| **Completeness** | Document all observations |

---

## Observation Categories

| Category | Description | Example |
|----------|-------------|---------|
| **Measurement** | Quantitative data | "Response time: 245ms" |
| **Fact** | Verifiable statement | "File created at path X" |
| **Event** | Discrete occurrence | "Error logged at 14:32:05" |
| **Behavior** | Observed action pattern | "System retries 3 times" |

---

## Observation Document Template

```markdown
# Observation Report: [Experiment/Investigation]

**ID**: OBS-XXX
**Date**: YYYY-MM-DDTHH:MM:SSZ
**Observer**: [Name]
**Run**: [RUN-XXX]

---

## Run Context

| Field | Value |
|-------|-------|
| Experiment | LAB-XXX |
| Investigation | INV-XXX |
| Run Number | [N] |
| Start Time | [Time] |
| End Time | [Time] |
| Duration | [Duration] |

---

## Observations

### Measurements

| Observation ID | Metric | Value | Unit | Timestamp |
|---------------|--------|-------|------|-----------|
| OBS-001 | [Metric] | [Value] | [Unit] | HH:MM:SS |
| OBS-002 | [Metric] | [Value] | [Unit] | HH:MM:SS |

### Facts

| Observation ID | Fact | Evidence Link |
|---------------|------|---------------|
| OBS-003 | [Fact statement] | [EV-XXX] |
| OBS-004 | [Fact statement] | [EV-XXX] |

### Events

| Observation ID | Event | Timestamp | Evidence Link |
|---------------|-------|-----------|---------------|
| OBS-005 | [Event description] | HH:MM:SS | [EV-XXX] |
| OBS-006 | [Event description] | HH:MM:SS | [EV-XXX] |

### Behaviors

| Observation ID | Behavior | Frequency | Evidence Link |
|---------------|----------|-----------|---------------|
| OBS-007 | [Behavior description] | [N times] | [EV-XXX] |
| OBS-008 | [Behavior description] | [N times] | [EV-XXX] |

---

## Raw Data Summary

[Summary of raw data collected]

| Data Type | Count | Size |
|-----------|-------|------|
| Logs | [N] | [size] |
| Measurements | [N] | [size] |
| Screenshots | [N] | [size] |

---

## Unusual Observations

[Any observations that deviate from expected behavior]

---

## Anomalies

[Any unexpected occurrences that warrant investigation]

---

## Notes

[Any additional observations or context]
```

---

## Observation Guidelines

### What to Document

- [ ] All measurements taken
- [ ] All events that occurred
- [ ] All behaviors observed
- [ ] All anomalies encountered
- [ ] All evidence collected

### What NOT to Interpret

- [ ] Do not explain why something happened
- [ ] Do not speculate about causes
- [ ] Do not draw conclusions
- [ ] Do not assess impact

### Evidence Linking

Every observation MUST link to at least one evidence item:

```markdown
| Observation ID | Observation | Evidence Link |
|---------------|-------------|---------------|
| OBS-001 | [Description] | EV-001 |
```

---

## Reference

For observation protocol, see [`../WORKFLOW.md`](../WORKFLOW.md)
