# Evidence Management

**Document Version**: 1.0.0
**Date**: 2026-07-21
**Status**: PRODUCTION
**Authority**: Architecture C

---

## Overview

This document defines how evidence is collected, managed, and preserved within the KDE Laboratory. Evidence is the empirical foundation upon which all Laboratory findings are based.

---

## Evidence Principles

| Principle | Description |
|-----------|-------------|
| **Evidence with Experiment** | Evidence is stored with the experiment that produced it |
| **Integrity Verification** | All evidence uses SHA-256 checksums for verification |
| **Bidirectional Links** | Evidence links to experiment; experiment links to evidence |
| **Reference, Not Duplicate** | Evidence is referenced; files are never duplicated |
| **Permanent Preservation** | Evidence is never deleted; it is preserved indefinitely |

---

## Evidence Definition

**Evidence** is documented facts from empirical observation that support or contradict a hypothesis.

### Evidence vs. Related Concepts

| Concept | Definition | Evidence Required |
|---------|------------|-------------------|
| **Evidence** | Documented facts from sources | Yes |
| **Inference** | Conclusions drawn from evidence | No |
| **Hypothesis** | Speculation beyond evidence | No |
| **Opinion** | Personal judgment | No |

---

## Evidence Types

| Type | Description | Storage | Example |
|------|-------------|---------|---------|
| **log** | System-generated records | /evidence/logs/ | Server logs, error logs |
| **measurement** | Quantitative data | /evidence/measurements/ | Response times, counts |
| **screenshot** | Visual captures | /evidence/media/ | UI screenshots |
| **commit** | Version control records | /evidence/repositories/ | Git commits |
| **document** | Structured text | /evidence/documents/ | Reports, specifications |
| **telemetry** | Automated data collection | /evidence/telemetry/ | Performance metrics |
| **photo** | Physical records | /evidence/media/ | Physical artifacts |
| **video** | Temporal records | /evidence/media/ | Screen recordings |
| **notes** | Human observations | /evidence/notes/ | Field notes |

---

## Evidence Collection

### Collection Procedure

1. **Identify Evidence Need**
   - Determine what evidence is required
   - Specify evidence type and format

2. **Collect Evidence**
   - Execute experiment run
   - Capture evidence during execution

3. **Preserve Evidence**
   - Store evidence with experiment
   - Generate SHA-256 checksum

4. **Create Evidence Reference**
   - Add to experiment evidence directory
   - Update evidence index

5. **Link Bidirectionally**
   - Link evidence to experiment metadata
   - Link experiment to evidence index

---

## Evidence Storage

### Storage Hierarchy

```
laboratory/
└── experiments/
    └── LAB-XXX/
        ├── experiment.md
        └── evidence/
            ├── logs/
            │   └── [evidence files]
            ├── measurements/
            │   └── [evidence files]
            ├── media/
            │   └── [evidence files]
            ├── repositories/
            │   └── [evidence files]
            ├── documents/
            │   └── [evidence files]
            ├── telemetry/
            │   └── [evidence files]
            └── notes/
                └── [evidence files]
```

### Evidence Size Strategy

| Evidence Size | Storage | Strategy |
|---------------|---------|----------|
| <1 MB | Git repository | Versioned with experiment |
| 1-10 MB | Git LFS | Large File Storage |
| >10 MB | External storage | S3/GCS/NAS; reference only |
| Historical | Archive tier | Compressed; cold storage |

---

## Evidence Integrity

### SHA-256 Verification

All evidence MUST be verified using SHA-256 checksums:

```bash
sha256sum [file]
```

### Verification Procedure

1. **Generate Checksum**
   ```bash
   sha256sum evidence.txt
   # Output: abc123...  evidence.txt
   ```

2. **Record Checksum**
   - Store checksum in evidence metadata
   - Include in evidence index

3. **Verify Periodically**
   - Re-verify before use
   - Alert if checksum mismatch

### Verification Log

| Evidence ID | File | SHA-256 | Verified | Date | By |
|-------------|------|---------|----------|------|-----|
| EV-001 | result.json | abc123... | Yes | 2026-07-21 | Agent |
| EV-002 | log.txt | def456... | Yes | 2026-07-21 | Agent |

---

## Evidence Reference Format

### Evidence Index Entry

```markdown
## Evidence Index

| ID | Type | Source | Hash | Timestamp | Description |
|----|------|--------|------|----------|-------------|
| EV-001 | log | experiments/LAB-001/evidence/logs/server.log | sha256:abc123... | 2026-07-21 14:30 | Server startup log |
```

### Evidence Detail Entry

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
| Access Path | [External storage location if applicable] |
```

---

## Evidence Collection Summary

### By Run

| Run | Evidence Count | Types | Status |
|-----|---------------|-------|--------|
| RUN-001 | 5 | log, measurement, document | COMPLETE |
| RUN-002 | 4 | log, screenshot | COMPLETE |
| RUN-003 | 6 | log, measurement, telemetry | PENDING |

### By Type

| Type | Count | Total Size |
|------|-------|------------|
| log | 45 | 2.3 MB |
| measurement | 23 | 156 KB |
| document | 12 | 890 KB |
| screenshot | 8 | 4.2 MB |

---

## Evidence Quality Assessment

### Quality Factors

| Factor | Assessment | Criteria |
|--------|------------|----------|
| Sample Size | Sufficient/Insufficient | ≥3 runs minimum |
| Integrity | Verified/Unverified | SHA-256 checksum matches |
| Relevance | High/Medium/Low | Directly supports hypothesis |
| Completeness | Complete/Partial | All expected evidence collected |
| Reproducibility | Reproduced/Partial/Not | Consistent across runs |

### Quality Rating

| Rating | Criteria |
|--------|----------|
| **HIGH** | All factors HIGH |
| **MEDIUM** | Some factors MEDIUM |
| **LOW** | Any factor LOW |

---

## Evidence Organization

### Evidence Index File

**Location**: `experiments/LAB-XXX/evidence/index.md`

```markdown
# Evidence References: LAB-XXX

**Total Evidence Items**: 12
**Evidence Integrity**: VERIFIED
**Quality Rating**: HIGH

---

## Evidence Index

| ID | Type | Source | Hash | Timestamp | Description |
|----|------|--------|------|----------|-------------|
| EV-001 | log | logs/server.log | sha256:abc123... | 2026-07-21 14:30 | Server startup |
| EV-002 | measurement | measurements/response.json | sha256:def456... | 2026-07-21 14:35 | Response times |
| ... | ... | ... | ... | ... | ... |

---

## Evidence Collection Summary

| Run | Evidence Count | Status |
|-----|---------------|--------|
| RUN-001 | 5 | COMPLETE |
| RUN-002 | 4 | COMPLETE |
| RUN-003 | 3 | PENDING |

---

## Evidence Linking

### From Experiment to Evidence

**File**: `experiments/LAB-XXX/metadata/evidence.md`

```markdown
# Evidence Metadata: LAB-XXX

**Experiment**: LAB-XXX
**Evidence Count**: 12
**Total Size**: 7.5 MB

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
**Evidence Count**: 12

## Evidence

All evidence for LAB-XXX is stored at:
`/laboratory/experiments/LAB-XXX/evidence/`
```

---

## Evidence Preservation

### Preservation Rules

| Rule | Description |
|------|-------------|
| **Never Delete** | Evidence is never deleted |
| **Archive Instead** | Completed experiments are archived |
| **Maintain Links** | Bidirectional links are preserved |
| **Verify Integrity** | Periodically verify checksums |

### Archive Procedure

1. **Complete Experiment**
   - All runs executed
   - All evidence collected
   - Synthesis complete

2. **Archive Evidence**
   - Move to archived experiment directory
   - Verify all checksums
   - Update evidence registry

3. **Update Indices**
   - Mark evidence as archived
   - Update experiment status
   - Maintain traceability

---

## Evidence Access

### Access Control

| Role | Access Level |
|------|--------------|
| Laboratory | Full access |
| Investigation Lead | Read access |
| Governance | Audit access |
| Public | No access (internal only) |

### Access Log

All evidence access is logged:

| Timestamp | User | Evidence ID | Action |
|-----------|------|-------------|--------|
| 2026-07-21 14:30 | Agent | EV-001 | Read |
| 2026-07-21 14:35 | Agent | EV-002 | Verify |

---

## Revision History

| Version | Date | Changes | Authority |
|---------|------|---------|-----------|
| 1.0.0 | 2026-07-21 | Initial version | Architecture C |

---

## Related Documents

| Document | Purpose |
|----------|---------|
| [`DIRECTORY.md`](./DIRECTORY.md) | Directory architecture |
| [`WORKFLOW.md`](./WORKFLOW.md) | Investigation lifecycle |
| [`VALIDATION.md`](./VALIDATION.md) | Validation protocols |
| [`PROMOTION.md`](./PROMOTION.md) | Knowledge promotion |

---

**Document Status**: PRODUCTION
**Authority**: Architecture C
