# Run Record: LAB-XXX / RUN-XXX

**Experiment ID**: LAB-XXX
**Run ID**: RUN-XXX
**Date**: YYYY-MM-DD HH:MM:SS
**Executor**: [Name or system identifier]
**Duration**: [HH:MM:SS]
**Reproducibility Run**: [YES | NO]
**Methodology Version**: 2.1

---

## Trigger

[What actually happened - the real-world event that caused the engineering decision]

**Examples**:
- User requested feature via issue
- Runtime installed into incorrect directory
- Docker build failed with error
- Repository inconsistency detected
- Documentation contradiction discovered

---

## Decision

[What engineering decision is required?]

---

## Knowledge Used

| Knowledge ID | Definition |
|-------------|------------|
| KDE-XXX | [Definition text] |

---

## Observation

[ONLY factual observations - no interpretation, no justification, no conclusions]

**Good examples**:
- "README contained three sections."
- "No Architecture section existed."
- "Docker exited with code 127."
- "Runtime installed into /home/openhands/.kdse."
- "File permissions were 0644."

---

## Evidence

[Reference independently retrievable artifacts]

| Evidence ID | Type | Source | Reference | Description |
|-------------|------|--------|-----------|-------------|
| EV-001 | log | terminal | commit:abc123 | Terminal output |
| EV-002 | file | filesystem | /path/to/file | Source file |
| EV-003 | commit | git | hash | Git commit |
| EV-004 | config | file | /etc/config | Configuration |
| EV-005 | output | runtime | process log | Runtime output |

**Acceptable evidence**: log files, terminal output, commit hashes, source files, runtime reports, screenshots, configuration files, PDFs, specifications

**Avoid**: "directory structure", "README analysis", "repository review"

---

## Ambiguity

| Ambiguity | Classification | Description |
|-----------|---------------|-------------|
| [Description] | [Blocking/Productive] | [What caused ambiguity] |

---

## Decision Outcome

[Record the engineering decision taken]

---

## Knowledge Assessment

| Knowledge | Assessment | Justification |
|----------|------------|---------------|
| KDE-XXX | [SUPPORTS/CONTRADICTS/INCONCLUSIVE] | [Concise reason] |

---

## Confidence

| Factor | Evidence | Assessment |
|--------|----------|------------|
| Run Count | [N runs] | [H/M/L] |
| Evidence Quality | [complete/partial/missing] | [H/M/L] |
| Reproducibility | [established/not] | [H/M/L] |

**Confidence Level**: [HIGH | MEDIUM | LOW]

---

## Recommendation

[Continue | Repeat | Stop Experiment]

---

## Metadata

| Field | Value |
|-------|-------|
| Run ID | RUN-XXX |
| Experiment ID | LAB-XXX |
| Date | YYYY-MM-DD HH:MM:SS |
| Methodology Version | 2.1 |
