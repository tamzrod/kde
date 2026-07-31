# Agreement Matrix: LAB-018

**Experiment ID**: LAB-018
**Date**: 2026-07-20

---

## AGREEMENT MATRIX

### Universal Concepts (≥70% Support)

| ID | Concept | Runs | Support % | Mean Confidence | Category |
|----|---------|------|-----------|----------------|----------|
| AC-01 | Identity | 30 | 100% | 96% ± 2% | UNIVERSAL |
| AC-02 | Semantic Agreement | 30 | 100% | 94% ± 3% | UNIVERSAL |
| AC-03 | Intent Representation | 29 | 97% | 91% ± 5% | UNIVERSAL |
| AC-04 | Capability Representation | 28 | 93% | 90% ± 5% | UNIVERSAL |
| AC-05 | Evidence Representation | 28 | 93% | 91% ± 5% | UNIVERSAL |
| AC-06 | Encoding Agreement | 28 | 93% | 93% ± 3% | UNIVERSAL |
| AC-07 | State Representation | 27 | 90% | 88% ± 6% | UNIVERSAL |
| AC-08 | Authorization | 27 | 90% | 94% ± 4% | UNIVERSAL |
| AC-09 | Error Communication | 27 | 90% | 91% ± 5% | UNIVERSAL |
| AC-10 | Version Management | 26 | 87% | 92% ± 4% | UNIVERSAL |
| AC-11 | Feedback Mechanism | 26 | 87% | 85% ± 7% | UNIVERSAL |
| AC-12 | Verification Protocol | 26 | 87% | 90% ± 5% | UNIVERSAL |
| AC-13 | Temporal Context | 25 | 83% | 91% ± 5% | UNIVERSAL |
| AC-14 | Security/Privacy | 25 | 83% | 93% ± 4% | UNIVERSAL |
| AC-15 | Audit/Logging | 24 | 80% | 93% ± 4% | UNIVERSAL |
| AC-16 | Capability Discovery | 24 | 80% | 92% ± 4% | UNIVERSAL |
| AC-17 | Timeout/Retry | 23 | 77% | 91% ± 5% | UNIVERSAL |
| AC-18 | Trust Representation | 23 | 77% | 88% ± 6% | UNIVERSAL |
| AC-19 | State Synchronization | 24 | 80% | 90% ± 5% | UNIVERSAL |
| AC-20 | Lifecycle Management | 22 | 73% | 91% ± 5% | UNIVERSAL |
| AC-21 | Transaction/Atomicity | 22 | 73% | 92% ± 4% | UNIVERSAL |
| AC-22 | Observability | 21 | 70% | 92% ± 4% | UNIVERSAL |

---

## CONTEXT-DEPENDENT CONCEPTS (40-69% Support)

| ID | Concept | Runs | Support % | Mean Confidence | Category |
|----|---------|------|-----------|----------------|----------|
| CD-01 | Routing/Addressing | 20 | 67% | 90% ± 5% | CONTEXT-DEPENDENT |
| CD-02 | Idempotency | 20 | 67% | 91% ± 5% | CONTEXT-DEPENDENT |
| CD-03 | Priority | 19 | 63% | 88% ± 6% | CONTEXT-DEPENDENT |
| CD-04 | Event Communication | 19 | 63% | 91% ± 5% | CONTEXT-DEPENDENT |
| CD-05 | Batch Operations | 18 | 60% | 90% ± 6% | CONTEXT-DEPENDENT |
| CD-06 | Negotiation | 18 | 60% | 90% ± 5% | CONTEXT-DEPENDENT |
| CD-07 | Dependency Management | 18 | 60% | 90% ± 6% | CONTEXT-DEPENDENT |
| CD-08 | Schema Evolution | 17 | 57% | 90% ± 6% | CONTEXT-DEPENDENT |
| CD-09 | Rate Limiting | 17 | 57% | 88% ± 6% | CONTEXT-DEPENDENT |
| CD-10 | Composability | 17 | 57% | 91% ± 5% | CONTEXT-DEPENDENT |
| CD-11 | Contracts | 16 | 53% | 88% ± 6% | CONTEXT-DEPENDENT |
| CD-12 | Quality of Service | 15 | 50% | 88% ± 6% | CONTEXT-DEPENDENT |

---

## EXPERIMENTAL CONCEPTS (<40% Support)

| ID | Concept | Runs | Support % | Mean Confidence | Category |
|----|---------|------|-----------|----------------|----------|
| EX-01 | Filtering/Subscriptions | 14 | 47% | 87% ± 7% | EXPERIMENTAL |
| EX-02 | Quality of Service | 15 | 50% | 88% ± 6% | CONTEXT-DEPENDENT |
| EX-03 | Meta-Communication | 12 | 40% | 86% ± 7% | EXPERIMENTAL |

---

## AGREEMENT SUMMARY

| Category | Count | Avg Confidence |
|----------|-------|----------------|
| UNIVERSAL | 22 | 91% ± 4% |
| CONTEXT-DEPENDENT | 10 | 89% ± 5% |
| EXPERIMENTAL | 2 | 87% ± 7% |
| **TOTAL** | **34** | **90% ± 5%** |

---

## ARCHITECTURAL LAYERS

### Layer 1: Foundation (100% Agreement)

| Component | Purpose |
|-----------|---------|
| Identity | Who is communicating |
| Semantic Agreement | What symbols mean |

### Layer 2: Core (90%+ Agreement)

| Component | Purpose |
|-----------|---------|
| Intent | What is being requested |
| Capabilities | What can be done |
| Evidence | Proof of claims |
| Encoding | How data is formatted |
| State | Current context |

### Layer 3: Reliability (80%+ Agreement)

| Component | Purpose |
|-----------|---------|
| Authorization | Permission to act |
| Error Communication | Failure handling |
| Version Management | Compatibility |
| Feedback | Confirmation |
| Verification | Claim validation |
| Temporal Context | Time awareness |
| Security | Protection |

### Layer 4: Operations (70-80% Agreement)

| Component | Purpose |
|-----------|---------|
| Audit/Logging | Accountability |
| Capability Discovery | Learning capabilities |
| Timeout/Retry | Reliability |
| Trust | Confidence level |
| State Sync | Consistency |
| Lifecycle | State management |
| Transactions | Atomicity |
| Observability | Monitoring |

---

## COVERAGE MATRIX

| Layer | Universal | Coverage |
|-------|-----------|----------|
| Foundation | 2 | 100% |
| Core | 6 | 90%+ |
| Reliability | 8 | 80%+ |
| Operations | 6 | 70-80% |

---

## Metadata

| Field | Value |
|-------|-------|
| Matrix ID | AGREEMENT-MATRIX-LAB-018 |
| Categories | 3 |
| Total Concepts | 34 |
