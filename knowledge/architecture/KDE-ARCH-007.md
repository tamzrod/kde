# KDE-ARCH-007: Timestamp Standard

**Knowledge ID**: KDE-ARCH-007
**Title**: ISO-8601 Timestamp Format with Second Precision
**Version**: 1.0.0
**Status**: ESTABLISHED
**Evidence Level**: Level 3 — Reproducible
**Created**: 2026-07-20T14:00:00Z
**Last Validated**: 2026-07-20T14:00:00Z

---

## Definition

Every KDE artifact SHALL include timestamps with second precision in ISO-8601 format. This ensures accurate provenance tracking and temporal ordering.

## Timestamp Format

### Standard Format

```
YYYY-MM-DDTHH:MM:SSZ
```

Example: `2026-07-20T14:00:00Z`

### With Timezone Offset

```
YYYY-MM-DDTHH:MM:SS±HH:MM
```

Example: `2026-07-20T14:00:00+08:00`

### Requirements

| Requirement | Description |
|-------------|-------------|
| Year | 4 digits (YYYY) |
| Month | 2 digits (MM) |
| Day | 2 digits (DD) |
| Hour | 2 digits (HH) |
| Minute | 2 digits (MM) |
| Second | 2 digits (SS) - **MANDATORY** |
| Separator | T between date and time |
| Timezone | Z for UTC or ±HH:MM offset |

## Required Timestamps

### Every Artifact

| Timestamp | Description |
|-----------|-------------|
| Created | When artifact was first created |
| Modified | When artifact was last changed |

### Experiments

| Timestamp | Description |
|-----------|-------------|
| Created | Experiment created |
| Modified | Last modification |
| Execution Started | First run started |
| Execution Completed | Last run completed |

### Runs

| Timestamp | Description |
|-----------|-------------|
| Timestamp | Run execution time |
| Execution Started | Run started |
| Execution Completed | Run finished |

### Knowledge

| Timestamp | Description |
|-----------|-------------|
| Created | Knowledge created |
| Last Validated | Last validation confirmation |

## Examples

### Valid Timestamps

| Timestamp | Status |
|-----------|--------|
| 2026-07-20T14:00:00Z | ✅ Valid |
| 2026-07-20T14:00:00+08:00 | ✅ Valid |
| 2026-07-20T14:00:00-05:00 | ✅ Valid |

### Invalid Timestamps

| Timestamp | Issue |
|-----------|-------|
| 2026-07-20 | ❌ Missing time |
| 2026-07-20 14:00 | ❌ Missing seconds |
| July 20 2026 | ❌ Wrong format |
| 2026/07/20 14:00:00 | ❌ Wrong separator |

---

## Supporting Experiments

| Experiment | Purpose | Result |
|------------|---------|--------|
| LAB-020 | Architecture Synthesis | Timestamp standard identified |
| LAB-021 | Predictive Validation | Timestamp precision confirmed |
| LAB-022 | Multi-Run Validation | Timestamp standard validated |
| LAB-023 | Cross-Engine Reproducibility | Timestamp rules validated |

---

## Dependencies

- KDE-ARCH-001: Architecture C Specification
- KDE-ARCH-006: Metadata Standard

---

## Related Knowledge

- KDE-ARCH-001: Architecture C Specification
- KDE-ARCH-006: Metadata Standard
- KDE-ARCH-008: Knowledge Promotion Rules

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-07-20 | Initial established knowledge |

---

## Governance Authority

KDE-GOV-007: Timestamp format with second precision is mandatory.

---

## Reference

- Architecture: [`laboratory/ARCHITECTURE-C.md`](../laboratory/ARCHITECTURE-C.md)
- Reference Implementation: [`laboratory/REFERENCE-IMPLEMENTATION.md`](../laboratory/REFERENCE-IMPLEMENTATION.md)
