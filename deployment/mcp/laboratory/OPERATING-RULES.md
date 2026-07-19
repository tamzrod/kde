# MCP Laboratory Operating Rules

**Document Version**: 1.0  
**Date**: 2026-07-19  
**Status**: OPERATING PROCEDURES

---

## 1. Purpose

This document defines operating procedures for the MCP Laboratory, ensuring consistent and reproducible experiment execution.

---

## 2. Experiment Naming Convention

### 2.1 Experiment ID Format

```
MCP-XXX
```

Where:
- `MCP` = MCP Laboratory prefix
- `XXX` = Sequential number (001, 002, 003, ...)

### 2.2 Run ID Format

```
MCP-XXX/RUN-YYY
```

Where:
- `MCP-XXX` = Parent experiment ID
- `RUN-YYY` = Sequential run number within experiment

### 2.3 Evidence ID Format

```
MCP-XXX/EV-YYY
```

Where:
- `MCP-XXX` = Parent experiment ID
- `EV-YYY` = Sequential evidence number

---

## 3. Experiment Workflow

### 3.1 Creating an Experiment

```bash
# 1. Create experiment directory
mkdir -p experiments/MCP-XXX

# 2. Copy experiment template
cp templates/experiment-template.md experiments/MCP-XXX/experiment.md

# 3. Create required directories
mkdir -p experiments/MCP-XXX/{runs,evidence,fixtures,scenarios,client}

# 4. Create experiment entry in registry
# Edit registry.md with new experiment
```

### 3.2 Executing a Run

```bash
# 1. Navigate to experiment
cd experiments/MCP-XXX

# 2. Execute tests
go test -v ./... 2>&1 | tee runs/RUN-XXX.md

# OR use test script
./run_tests.sh > runs/RUN-XXX.md

# 3. Collect evidence
# Add evidence references to evidence/references.md

# 4. Update registry
# Edit runs in registry.md
```

### 3.3 Completing an Experiment

```bash
# 1. Create conclusions
# Write experiments/MCP-XXX/conclusions.md

# 2. Create impact report
# Write experiments/MCP-XXX/impact.md

# 3. Update registry status
# Change status from ACTIVE to COMPLETE

# 4. Archive if appropriate
# Move to archive/ if experiment is deprecated
```

---

## 4. Documentation Standards

### 4.1 Experiment.md Requirements

| Field | Required | Description |
|-------|----------|-------------|
| ID | Yes | MCP-XXX |
| Title | Yes | Descriptive title |
| Hypothesis | Yes | Testable statement |
| Objectives | Yes | Measurable goals |
| Success Criteria | Yes | Pass/fail conditions |
| Environment | Yes | Test environment |
| Procedure | Yes | Step-by-step instructions |

### 4.2 Run Record Requirements

| Field | Required | Description |
|-------|----------|-------------|
| Run ID | Yes | MCP-XXX/RUN-YYY |
| Date | Yes | ISO8601 format |
| Executor | Yes | Who ran the test |
| Environment | Yes | Test environment state |
| Results | Yes | Actual outcomes |
| Evidence | Yes | References to collected evidence |

### 4.3 Evidence Reference Requirements

| Field | Required | Description |
|-------|----------|-------------|
| Evidence ID | Yes | MCP-XXX/EV-YYY |
| Type | Yes | log, measurement, screenshot, etc. |
| Source | Yes | File path or external reference |
| Hash | Yes | SHA-256 verification hash |
| Description | Yes | Human-readable description |

---

## 5. Quality Standards

### 5.1 Minimum Run Requirements

| Experiment Type | Minimum Runs |
|-----------------|--------------|
| Architecture Validation | 3 |
| Interface Testing | 3 |
| Performance Benchmarking | 5 |
| Integration Testing | 3 |

### 5.2 Evidence Quality

- All evidence must be verifiable (hash or signature)
- Evidence must be timestamped
- Evidence must be non-repudiable
- Large files (>10MB) must use external storage with reference

---

## 6. Access Control

### 6.1 Write Access

| Role | Access Level |
|------|-------------|
| Laboratory Manager | Full write |
| Experiment Owner | Full write to owned experiments |
| Reviewers | Read only |

### 6.2 Read Access

| Role | Access Level |
|------|-------------|
| All Team Members | Full read |
| External Auditors | Full read (with notice) |

---

## 7. Retention Policy

| Artifact | Retention Period |
|----------|------------------|
| Experiment definitions | Permanent |
| Run records | Permanent |
| Evidence | Permanent |
| Test code | Until experiment archived |
| Temporary files | 30 days |

---

**Document Status**: OPERATING RULES DEFINED  
**Compliance Required**: Yes
