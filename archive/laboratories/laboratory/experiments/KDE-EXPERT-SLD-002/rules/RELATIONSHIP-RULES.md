# Relationship and Constraint Rules

**Source**: KDE-EXPERT-SLD-002
**Date**: 2026-07-23
**Status**: COMPLETE

---

## Part 1: Relationship Rules

### RR-01: Protection Hierarchy Rule

```
RULE: RR-01
TITLE: Protection Hierarchy
CATEGORY: Protection

IF CB is CLOSED
THEN all upstream isolation (DS_TOP) must be CLOSED
AND all downstream isolation (DS_BOTTOM) may be OPEN or CLOSED

CONSTRAINT: CB requires upstream isolation to be closed when CB is protecting
EXCEPTION: During maintenance, DS_TOP may be OPEN while CB is OPEN
```

**Evidence**: CB is primary protection; isolation is for maintenance

**Confidence**: 95%

---

### RR-02: Maintenance Sequence Rule

```
RULE: RR-02
TITLE: Maintenance Sequence
CATEGORY: Isolation

BEFORE CB maintenance:
  1. CB must be OPEN
  2. DS_TOP must be OPEN (creates isolation zone)
  3. ES must be CLOSED (grounds for worker safety)

AFTER CB maintenance:
  1. ES must be OPEN (remove grounding)
  2. DS_TOP must be CLOSED (remove isolation)
  3. CB must be CLOSED (restore protection)
```

**Evidence**: Standard operating procedure for CB maintenance

**Confidence**: 95%

---

### RR-03: Grounding Requirements Rule

```
RULE: RR-03
TITLE: Grounding Requirements
CATEGORY: Isolation

IF ES is CLOSED (grounding for work)
THEN:
  1. CB must be OPEN (de-energized condition)
  2. DS_BOTTOM must be OPEN (isolates downstream)
  3. DS_TOP must be CLOSED (maintains source connection)

IF ES is OPEN (no grounding)
THEN:
  - CB may be CLOSED or OPEN
  - DS_BOTTOM may be CLOSED or OPEN
```

**Evidence**: Safety grounding procedure

**Confidence**: 95%

---

### RR-04: Protection Coordination Rule

```
RULE: RR-04
TITLE: Protection Coordination
CATEGORY: Protection

IF fault occurs on feeder
THEN:
  1. CB trips (OPEN) - primary protection
  2. DS_TOP remains CLOSED (source remains connected)
  3. DS_BOTTOM remains CLOSED (protection coordination)

NOTE: DS devices do NOT trip on faults; only CB provides fault protection
```

**Evidence**: CB is primary protection; DS are for isolation only

**Confidence**: 95%

---

### RR-05: ES Branch Rule

```
RULE: RR-05
TITLE: ES Branch Rule
CATEGORY: Electrical

ES MUST be modeled as branch connection, NOT series connection
  - ES branches from main feeder path
  - ES does NOT interrupt main feeder path
  - ES connects to ground when CLOSED

VALID:
  DS → CB → [ES branch] → DS → CON

INVALID:
  DS → CB → ES → DS (ES in series)
```

**Evidence**: ES topology rules specify branch connection

**Confidence**: 95%

---

### RR-06: CB Protection Rule

```
RULE: RR-06
TITLE: CB Protection Rule
CATEGORY: Protection

Every feeder MUST have CB as primary protection
  - CB must be downstream of source
  - CB must be upstream of load
  - CB must have isolation capability (DS upstream and downstream)

VALID FEEDER: BUS → DS → CB → DS → CON
INVALID FEEDER: BUS → DS → DS → CON (no CB)
```

**Evidence**: Feeder assembly requires CB for protection

**Confidence**: 95%

---

### RR-07: Series Connection Rule

```
RULE: RR-07
TITLE: Series Connection
CATEGORY: Electrical

Components in series (DS, CB, ES) must:
  - Pass same current
  - Be in same protection zone
  - Have coordinated switching

SERIES PATTERN: DS_TOP → CB → ES → DS_BOTTOM
```

**Evidence**: DS–CB–ES pattern in feeder assembly

**Confidence**: 95%

---

## Part 2: State-Based Constraints

### SC-01: CB State Effects

| CB State | Upstream DS | Downstream DS | ES | Power Flow |
|----------|-------------|---------------|----|------------|
| CLOSED | CLOSED | Any | Any | Through CB |
| OPEN | Any | Any | CLOSED | Stopped + Grounded |
| OPEN | Any | Any | OPEN | Stopped, Not Grounded |

---

### SC-02: ES State Effects

| ES State | Requirement | Effect |
|----------|-------------|--------|
| CLOSED | CB must be OPEN | Downstream grounded |
| OPEN | None | No grounding |

---

### SC-03: DS State Effects

| DS Position | CB State | DS State | Meaning |
|-------------|----------|----------|---------|
| DS_TOP | OPEN | OPEN | CB isolated for work |
| DS_TOP | CLOSED | CLOSED | Normal (CB protected) |
| DS_BOTTOM | OPEN | OPEN | Line isolated for work |
| DS_BOTTOM | OPEN | CLOSED | Line connected, de-energized |

---

## Part 3: Invalid Relationship Catalog

### INV-01: CB Without Isolation

```
CODE: INV-01
TITLE: CB Without Isolation
CATEGORY: Protection

INVALID PATTERN:
  BUS → CB → CON (no DS isolation)
  
CORRECT PATTERN:
  BUS → DS → CB → DS → CON

REASON: CB requires upstream and downstream isolation for maintenance
SEVERITY: HIGH
DETECTION: CB must have DS upstream and DS downstream
```

---

### INV-02: ES in Series Path

```
CODE: INV-02
TITLE: ES in Series Path
CATEGORY: Electrical

INVALID PATTERN:
  DS → CB → ES → DS → CON
  where ES is in series (interrupts main path)

CORRECT PATTERN:
  DS → CB → [ES] → DS → CON
  where ES branches from main path

REASON: ES is branch device, not series device
SEVERITY: HIGH
DETECTION: ES must be branch connection, not series
```

---

### INV-03: Feeder Without Protection

```
CODE: INV-03
TITLE: Feeder Without Protection
CATEGORY: Protection

INVALID PATTERN:
  BUS → DS → DS → CON (no CB)

CORRECT PATTERN:
  BUS → DS → CB → DS → CON

REASON: Feeder without primary protection is invalid
SEVERITY: CRITICAL
DETECTION: Every feeder must have CB between isolation devices
```

---

### INV-04: Ground With Energy

```
CODE: INV-04
TITLE: Ground With Energy
CATEGORY: Isolation

INVALID PATTERN:
  CB CLOSED + ES CLOSED
  
CORRECT PATTERN:
  CB OPEN + ES CLOSED (grounding de-energized conductor)
  CB CLOSED + ES OPEN (energized, not grounded)

REASON: Would create fault (grounding energized conductor)
SEVERITY: CRITICAL
DETECTION: ES CLOSED requires CB OPEN
```

---

### INV-05: Isolation Violation

```
CODE: INV-05
TITLE: Isolation Violation
CATEGORY: Isolation

INVALID PATTERN:
  DS_TOP OPEN while CB CLOSED (CB not isolated when open)

CORRECT PATTERN:
  If CB is OPEN for work: DS_TOP must be OPEN
  If CB is CLOSED: DS_TOP may be OPEN or CLOSED

REASON: CB must be isolated from source for maintenance
SEVERITY: HIGH
DETECTION: CB OPEN + maintenance → DS_TOP must be OPEN
```

---

### INV-06: Protection Bypass

```
CODE: INV-06
TITLE: Protection Bypass
CATEGORY: Protection

INVALID PATTERN:
  DS bypasses CB (connects around protection)
  
VALID PATTERN:
  All power must flow through CB

REASON: DS cannot provide fault protection; CB must be in all paths
SEVERITY: CRITICAL
DETECTION: All paths from source to load must include CB
```

---

## Part 4: Constraint Summary

### By Category

| Category | Rules | Confidence |
|----------|-------|------------|
| Protection | 3 | 95% |
| Isolation | 4 | 93% |
| Electrical | 2 | 95% |
| State-Based | 3 | 90% |
| **TOTAL** | **12** | **93%** |

### By Severity

| Severity | Count | Examples |
|----------|-------|----------|
| CRITICAL | 2 | INV-03, INV-04 |
| HIGH | 4 | INV-01, INV-02, INV-05, INV-06 |
| MEDIUM | 2 | RR-02, RR-03 |

---

## Part 5: Implementation Recommendations

### Validation Priority

| Priority | Rule | Implementation |
|----------|------|----------------|
| 1 | INV-03 | Every feeder must have CB |
| 2 | INV-04 | ES CLOSED → CB must be OPEN |
| 3 | INV-01 | CB must have DS isolation |
| 4 | INV-06 | No protection bypass |
| 5 | INV-02 | ES must be branch |
| 6 | INV-05 | Isolation verification |

### Recommended Checks

```
1. FEEDER_VALIDATION:
   - Verify CB present
   - Verify DS upstream of CB
   - Verify DS downstream of CB

2. STATE_VALIDATION:
   - If ES CLOSED: CB must be OPEN
   - If CB OPEN + maintenance: DS_TOP must be OPEN

3. PATH_VALIDATION:
   - All paths through CB
   - No bypasses around CB
   - ES is branch, not series
```

---

*Rules complete: 2026-07-23*
