# Knowledge K1: HTTP/1.1 Response Requirements
# Source: RFC 7230 - After ingestion

## Extracted Knowledge (No Metadata)

### Observations

| ID | Observation | Evidence |
|----|-------------|----------|
| OBS-K1-001 | HTTP response contains status line | RFC 7230 §3.1.2 |
| OBS-K1-002 | HTTP response contains header section | RFC 7230 §3 |
| OBS-K1-003 | HTTP response may contain message body | RFC 7230 §3.3 |
| OBS-K1-004 | Status line contains HTTP version | RFC 7230 §3.1.2 |
| OBS-K1-005 | Status line contains numeric status code | RFC 7230 §3.1.2 |
| OBS-K1-006 | Status line contains reason phrase | RFC 7230 §3.1.2 |
| OBS-K1-007 | Each header is a name-value pair | RFC 7230 §3.2 |
| OBS-K1-008 | Header section terminates with empty line | RFC 7230 §3 |
| OBS-K1-009 | Body presence indicated by Content-Length | RFC 7230 §3.3.2 |

### Assertions

| ID | Assertion | Evidence |
|----|-----------|----------|
| AST-K1-001 | HTTP version MUST be "HTTP/1.1" | RFC 7230 §2.5 |
| AST-K1-002 | Status code MUST be 3 digits (100-999) | RFC 7230 §3.1.2 |
| AST-K1-003 | Reason phrase is optional | RFC 7230 §3.1.2 |
| AST-K1-004 | Headers MUST end with CRLF | RFC 7230 §1.2 |
| AST-K1-005 | Body length determined by Content-Length | RFC 7230 §3.3.2 |

### Constraints

| ID | Constraint | Applies To |
|----|------------|------------|
| CON-K1-001 | HTTP-version = "HTTP/1.1" | status_line |
| CON-K1-002 | status-code ∈ [100, 999] | status_line |
| CON-K1-003 | Line terminator = CRLF (\r\n) | headers |
| CON-K1-004 | Header format: name ":" OWS value OWS | headers |

### Relationships

| ID | Relationship | Source | Target |
|----|-------------|--------|--------|
| REL-K1-001 | precedes | status_line | headers |
| REL-K1-002 | precedes | headers | body |
| REL-K1-003 | indicates | Content-Length | body_presence |

### Evidence

| ID | Evidence | Source |
|----|----------|--------|
| EV-K1-001 | RFC 7230 §3.1.2 | status line specification |
| EV-K1-002 | RFC 7230 §3 | header specification |
| EV-K1-003 | RFC 7230 §3.3 | body specification |

### Ambiguities

| ID | Ambiguity | Classification |
|----|-----------|----------------|
| AMB-K1-001 | Reason phrase content not specified | Productive |
| AMB-K1-002 | Header order not specified | Productive |

### Assumptions

| ID | Assumption | Rationale |
|----|------------|-----------|
| AS-K1-001 | Standard reason phrases used | Common practice |

---

## Knowledge Structure Summary

```
HTTP Response Knowledge:
├── Structure:
│   ├── status_line (required)
│   │   ├── HTTP-version (constant: HTTP/1.1)
│   │   ├── status-code (numeric, 100-999)
│   │   └── reason-phrase (optional text)
│   ├── headers (required)
│   │   └── [name-value pairs]
│   └── body (optional)
│       └── length indicated by Content-Length
├── Constraints:
│   ├── CRLF terminators
│   ├── 3-digit status codes
│   └── Empty line terminates headers
└── Relationships:
    ├── status_line → headers
    └── headers → body
```
