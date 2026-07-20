# KDE-ARCH-006: Metadata Standard

**Knowledge ID**: KDE-ARCH-006
**Title**: Mandatory Metadata Fields and Formats for KDE Artifacts
**Version**: 1.0.0
**Status**: ESTABLISHED
**Evidence Level**: Level 3 — Reproducible
**Created**: 2026-07-20T14:00:00Z
**Last Validated**: 2026-07-20T14:00:00Z

---

## Definition

Every KDE artifact SHALL include mandatory metadata fields to ensure traceability, provenance, and governance compliance.

## Investigation Metadata

| Field | Required | Format | Example |
|-------|----------|--------|---------|
| ID | YES | INV-XXX | INV-001 |
| Title | YES | String | What is Knowledge? |
| Version | YES | X.Y.Z | 1.0.0 |
| Status | YES | ACTIVE\|COMPLETE\|PROMOTED | ACTIVE |
| Author | YES | Name | KDE Governance |
| Created | YES | ISO-8601 | 2026-07-20T14:00:00Z |
| Modified | YES | ISO-8601 | 2026-07-20T14:00:00Z |

## Experiment Metadata

| Field | Required | Format | Example |
|-------|----------|--------|---------|
| ID | YES | LAB-XXX | LAB-001 |
| Investigation | YES | INV-XXX | INV-001 |
| Version | YES | X.Y.Z | 1.0.0 |
| Status | YES | DRAFT\|ACTIVE\|COMPLETE\|FAILED | ACTIVE |
| Engine | YES | Engine ID | KDE-ENGINE-003 |
| Seed | YES | Seed ID | Seed-002 |
| Author | YES | Name | Seed-002 + Engine-003 |
| Created | YES | ISO-8601 | 2026-07-20T14:00:00Z |
| Modified | YES | ISO-8601 | 2026-07-20T14:00:00Z |

## Run Metadata (YAML)

```yaml
Run ID: RUN-XXX
Experiment: LAB-XXX
Version: X.Y.Z
Status: PENDING|IN_PROGRESS|COMPLETE|FAILED
Author: [Author]
Timestamp: YYYY-MM-DDTHH:MM:SSZ
Execution Started: YYYY-MM-DDTHH:MM:SSZ
Execution Completed: YYYY-MM-DDTHH:MM:SSZ
Last Modified: YYYY-MM-DDTHH:MM:SSZ
Duration: [Seconds]
```

## Evidence Metadata

| Field | Required | Format | Example |
|-------|----------|--------|---------|
| Evidence ID | YES | E-XXX | E-001 |
| Type | YES | String | Statistical, Empirical, Expert |
| Source | YES | Artifact ID | LAB-001 |
| Timestamp | YES | ISO-8601 | 2026-07-20T14:00:00Z |

---

## Supporting Experiments

| Experiment | Purpose | Result |
|------------|---------|--------|
| LAB-020 | Architecture Synthesis | Metadata standard identified |
| LAB-021 | Predictive Validation | Metadata completeness confirmed |
| LAB-022 | Multi-Run Validation | Metadata rules validated |
| LAB-023 | Cross-Engine Reproducibility | Metadata standard validated |

---

## Dependencies

- KDE-ARCH-001: Architecture C Specification
- KDE-ARCH-007: Timestamp Standard

---

## Related Knowledge

- KDE-ARCH-001: Architecture C Specification
- KDE-ARCH-007: Timestamp Standard
- KDE-ARCH-008: Knowledge Promotion Rules

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-07-20 | Initial established knowledge |

---

## Governance Authority

KDE-GOV-007: Timestamp standard is mandatory.

KDE-GOV-008: Single ownership rule is mandatory.

---

## Reference

- Architecture: [`laboratory/ARCHITECTURE-C.md`](../laboratory/ARCHITECTURE-C.md)
- Reference Implementation: [`laboratory/REFERENCE-IMPLEMENTATION.md`](../laboratory/REFERENCE-IMPLEMENTATION.md)
