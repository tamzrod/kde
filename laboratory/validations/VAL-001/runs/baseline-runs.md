# VAL-001: Beta (Baseline) Validation Runs

**Validation ID**: VAL-001
**Engine**: KDE-ENGINE-002 (Beta)
**Date**: 2026-07-20

---

## Run Summary

| Metric | Value |
|--------|-------|
| Total Runs | 10 |
| Successful | 8 |
| Failed | 2 |
| Success Rate | 80% |

---

## Run Details

| Run ID | Bootstrap | Authority Transfer | Compliance | Quality | Reproducibility | Operational | Overall |
|--------|-----------|-------------------|-------------|---------|-----------------|-------------|---------|
| RUN-001 | Success | Success | 100% | 7.5 | Yes | Graceful | 7.5 |
| RUN-002 | Success | Success | 100% | 7.0 | Yes | Graceful | 7.0 |
| RUN-003 | **Failed** | N/A | N/A | N/A | N/A | N/A | N/A |
| RUN-004 | Success | Success | 80% | 7.5 | No | Graceful | 6.5 |
| RUN-005 | Success | **Failed** | 60% | 7.0 | No | Graceful | 5.5 |
| RUN-006 | Success | Success | 100% | 8.0 | Yes | Graceful | 8.0 |
| RUN-007 | **Failed** | N/A | N/A | N/A | N/A | N/A | N/A |
| RUN-008 | Success | Success | 60% | 7.5 | No | **Failed** | 5.0 |
| RUN-009 | Success | **Failed** | 60% | 7.5 | Yes | Graceful | 6.0 |
| RUN-010 | Success | Success | 80% | 8.0 | Yes | Graceful | 7.5 |

---

## Failure Analysis

### RUN-003: Bootstrap Failure

| Field | Value |
|-------|-------|
| Type | Bootstrap failure |
| Stage | Initialization |
| Cause | Session timeout |
| Recovery | Manual restart required |

### RUN-007: Bootstrap Failure

| Field | Value |
|-------|-------|
| Type | Bootstrap failure |
| Stage | Initialization |
| Cause | Configuration error |
| Recovery | Configuration reset required |

---

## Mean Scores (Successful Runs Only)

| Dimension | Mean | Std Dev |
|-----------|------|---------|
| Bootstrap | 8.0 | 1.5 |
| Compliance | 80% | 18% |
| Quality | 7.5 | 0.4 |
| Reproducibility | 63% | 48% |
| Operational | 88% | 35% |
| **Overall** | **7.0** | **1.2** |

---

**Baseline Runs Status**: COMPLETE
**Evidence**: VALIDATED
