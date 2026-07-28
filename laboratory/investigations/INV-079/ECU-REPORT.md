# INV-079: ECU Report

**Investigation ID**: INV-079  
**Artifact**: ECU-REPORT  
**Timestamp**: 2026-07-28T06:16:21Z  
**Producer**: Runtime ECU

---

## ECU Configuration

| Field | Value |
|-------|-------|
| ECU Configured | true |
| Evidence Markers | ENFORCING |
| Inference Markers | ENFORCING |
| Marker Pattern | [EVIDENCE: ...] and [INFERENCE: ...] |

---

## ECU Validation

The Evidence Checking Unit (ECU) validates:
- Evidence markers: [EVIDENCE: source]
- Inference markers: [INFERENCE: conclusion]

---

## Validation Rules

### Evidence Markers

Format: `[EVIDENCE: source]`

| Rule | Description |
|------|-------------|
| Required for facts | All factual claims must have evidence |
| Source required | Must cite specific source |
| Path format | File paths or URLs accepted |

### Inference Markers

Format: `[INFERENCE: conclusion]`

| Rule | Description |
|------|-------------|
| Required for conclusions | All conclusions must be marked |
| Distinguishes from facts | Separates evidence from reasoning |

---

## ECU Enforcement

| Check | Status |
|-------|--------|
| Evidence markers validated | ENFORCING |
| Inference markers validated | ENFORCING |
| Unmarked facts detected | ERROR |
| Unmarked inferences detected | WARNING |

---

## Validation Summary

**ECU Status**: ENFORCING  
**Validation**: All markers checked during investigation execution  
**Reporting**: Errors/warnings logged per document
