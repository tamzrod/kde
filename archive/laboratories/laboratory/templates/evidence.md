# Evidence Template

**Template Version**: 1.0.0
**Date**: 2026-07-21
**Architecture**: Architecture C

---

## Purpose

This template defines the structure for evidence references in experiments.

---

## Evidence Types

| Type | Description | Storage Location |
|------|-------------|------------------|
| log | System-generated records | /evidence/logs/ |
| measurement | Quantitative data | /evidence/measurements/ |
| screenshot | Visual captures | /evidence/media/ |
| commit | Version control records | /evidence/repositories/ |
| document | Structured text | /evidence/documents/ |
| telemetry | Automated data collection | /evidence/telemetry/ |
| photo | Physical records | /evidence/media/ |
| video | Temporal records | /evidence/media/ |
| notes | Human observations | /evidence/notes/ |

---

## Evidence Index Template

```markdown
# Evidence References: LAB-XXX

**Total Evidence Items**: 0
**Evidence Integrity**: PENDING
**Quality Rating**: UNDEFINED
**Last Updated**: YYYY-MM-DDTHH:MM:SSZ

---

## Evidence Index

| ID | Type | Source | Hash | Timestamp | Description |
|----|------|--------|------|----------|-------------|
| EV-001 | [type] | [path] | sha256:... | YYYY-MM-DD HH:MM | [Description] |
| EV-002 | [type] | [path] | sha256:... | YYYY-MM-DD HH:MM | [Description] |

---

## Evidence Collection Summary

| Run | Evidence Count | Types | Status |
|-----|---------------|-------|--------|
| RUN-001 | 0 | - | PENDING |
| RUN-002 | 0 | - | PENDING |
| RUN-003 | 0 | - | PENDING |

---

## Integrity Verification

All evidence must be verified using SHA-256 checksums before inclusion.

### Verification Command

```bash
sha256sum [file]
```

### Verification Log

| Evidence ID | Verified | Date | By |
|-------------|----------|------|-----|
| EV-001 | ☐ | YYYY-MM-DD | [Name] |
| EV-002 | ☐ | YYYY-MM-DD | [Name] |
```

---

## Evidence Detail Template

### Single Evidence Entry

```markdown
### EV-XXX: [Name]

| Field | Value |
|-------|-------|
| ID | EV-XXX |
| Type | [type] |
| Source | [path or reference] |
| SHA-256 Hash | [hash] |
| Timestamp | YYYY-MM-DD HH:MM:SS |
| Size | [size] |
| Relevance | [Why this evidence matters] |
| Access Path | [External storage location] |

### Evidence Content Preview

[Optional: Brief preview or excerpt of evidence content]

### Related Evidence

| Related ID | Relationship |
|------------|--------------|
| EV-XXX | [precedes/follows/supports] |
```

---

## Evidence Evidence Quality Assessment

### Quality Factors

| Factor | Assessment | Evidence |
|--------|------------|----------|
| Sample Size | [Sufficient/Insufficient] | [N runs] |
| Integrity | [Verified/Unverified] | [SHA-256 status] |
| Relevance | [High/Medium/Low] | [Rationale] |
| Completeness | [Complete/Partial] | [Coverage] |

### Quality Rating

| Rating | Criteria |
|--------|----------|
| **HIGH** | All factors HIGH |
| **MEDIUM** | Some factors MEDIUM |
| **LOW** | Any factor LOW |

---

## Evidence Linking

### From Experiment to Evidence

**File**: `experiments/LAB-XXX/metadata/evidence.md`

```markdown
# Evidence Metadata: LAB-XXX

**Experiment**: LAB-XXX
**Investigation**: INV-XXX
**Evidence Count**: [N]
**Total Size**: [size]
**Quality Rating**: [HIGH/MEDIUM/LOW]

## Evidence Links

| Evidence ID | Type | Relevance |
|-------------|------|-----------|
| EV-001 | log | High - Primary output |
| EV-002 | measurement | High - Performance data |
```

### From Evidence to Experiment

**File**: `evidence/LAB-XXX/index.md`

```markdown
# Evidence Index: LAB-XXX

**Experiment**: LAB-XXX
**Investigation**: INV-XXX
**Evidence Count**: [N]

## Evidence

All evidence for LAB-XXX is stored at:
`/laboratory/experiments/LAB-XXX/evidence/`
```

---

## Reference

For evidence management protocol, see [`../EVIDENCE.md`](../EVIDENCE.md)
