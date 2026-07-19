# MCP Laboratory Experiment Registry

**Last Updated**: 2026-07-19  
**Total Experiments**: 1  
**Active Experiments**: 1  
**Schema Version**: 1.0

---

## Registry Table

| ID | Title | Status | Runs | Assessment | Confidence | Reproducibility |
|----|-------|--------|------|------------|------------|-----------------|
| MCP-001 | MCP Runtime Architecture Validation | ACTIVE | 1 | PENDING | UNDEFINED | PENDING |

---

## SQL Schema Reference

This registry is designed for migration to SQLite or PostgreSQL.

```sql
-- Experiments Table
CREATE TABLE experiments (
    id              TEXT PRIMARY KEY,          -- MCP-XXX
    title           TEXT NOT NULL,             -- Experiment title
    status          TEXT NOT NULL,            -- PLANNED|ACTIVE|COMPLETE|SUSPENDED
    created_date    TEXT NOT NULL,             -- ISO8601 date
    start_date      TEXT,                     -- ISO8601 date (when first run executed)
    last_run_date   TEXT,                    -- ISO8601 date (most recent run)
    run_count       INTEGER DEFAULT 0,         -- Number of runs executed
    assessment      TEXT,                     -- PENDING|SUPPORTS|CONTRADICTS|INCONCLUSIVE
    confidence      TEXT,                     -- HIGH|MEDIUM|LOW|UNDEFINED
    reproducibility TEXT,                      -- REPRODUCED|PARTIAL|NOT_REPRODUCED|PENDING
    
    created_at      TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at      TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Runs Table
CREATE TABLE runs (
    id              TEXT PRIMARY KEY,          -- MCP-XXX/RUN-XXX
    experiment_id   TEXT NOT NULL,             -- Foreign key to experiments.id
    run_number      INTEGER NOT NULL,           -- Sequential run number
    run_date        TEXT NOT NULL,             -- ISO8601 datetime
    executor        TEXT,                      -- Who executed the run
    duration        TEXT,                      -- ISO8601 duration
    status          TEXT NOT NULL,              -- PENDING|RUNNING|COMPLETE|FAILED|ABORTED
    outcome         TEXT,                      -- SUPPORTS|CONTRADICTS|INCONCLUSIVE
    
    created_at      TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Evidence Table
CREATE TABLE evidence (
    id              TEXT PRIMARY KEY,          -- MCP-XXX/EV-XXX
    experiment_id   TEXT NOT NULL,             -- Foreign key to experiments.id
    run_id          TEXT,                     -- Optional: link to specific run
    evidence_type   TEXT NOT NULL,            -- log|measurement|screenshot|commit|document
    source          TEXT NOT NULL,             -- File path or external reference
    hash            TEXT NOT NULL,             -- SHA-256 hash
    timestamp       TEXT,                     -- When evidence was collected
    description     TEXT,                     -- Human-readable description
    
    created_at      TEXT DEFAULT CURRENT_TIMESTAMP
);
```

---

## Field Definitions

### Experiment Fields

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| ID | TEXT | Unique identifier (MCP-XXX) | Yes |
| Title | TEXT | Experiment title | Yes |
| Status | TEXT | PLANNED/ACTIVE/COMPLETE/SUSPENDED | Yes |
| Created Date | TEXT | ISO8601 date | Yes |
| Start Date | TEXT | First run execution date | No |
| Last Run Date | TEXT | Most recent run date | No |
| Run Count | INTEGER | Total runs executed | No |
| Assessment | TEXT | PENDING/SUPPORTS/CONTRADICTS/INCONCLUSIVE | No |
| Confidence | TEXT | HIGH/MEDIUM/LOW/UNDEFINED | No |
| Reproducibility | TEXT | REPRODUCED/PARTIAL/NOT_REPRODUCED/PENDING | No |

### Run Fields

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| ID | TEXT | Unique run ID (MCP-XXX/RUN-XXX) | Yes |
| Experiment ID | TEXT | Parent experiment | Yes |
| Run Number | INTEGER | Sequential number | Yes |
| Run Date | TEXT | ISO8601 datetime | Yes |
| Executor | TEXT | Who ran the experiment | No |
| Duration | TEXT | Execution duration | No |
| Status | TEXT | PENDING/RUNNING/COMPLETE/FAILED/ABORTED | Yes |
| Outcome | TEXT | SUPPORTS/CONTRADICTS/INCONCLUSIVE | No |

---

## Status Legend

| Status | Description |
|--------|-------------|
| PLANNED | Designed but not executed |
| ACTIVE | Running experiments |
| COMPLETE | All planned runs executed |
| SUSPENDED | Temporarily paused |

---

## Assessment Legend

| Assessment | Description |
|------------|-------------|
| PENDING | Not yet determined |
| SUPPORTS | Evidence confirms the architecture decision |
| CONTRADICTS | Evidence challenges the architecture decision |
| INCONCLUSIVE | Evidence is insufficient |

---

## Confidence Legend

| Confidence | Description |
|------------|-------------|
| UNDEFINED | No runs completed |
| LOW | <3 runs OR reproducibility not established |
| MEDIUM | ≥3 runs, partial reproducibility |
| HIGH | ≥5 runs, consistent reproducibility |

---

## Reproducibility Legend

| Value | Description |
|-------|-------------|
| PENDING | Not enough runs to assess |
| REPRODUCED | Multiple independent runs show consistent results |
| PARTIAL | Some runs consistent, some not |
| NOT_REPRODUCED | Results vary significantly across runs |

---

## Recent Activity

| Date | ID | Activity | Details |
|------|-----|----------|---------|
| 2026-07-19 | MCP-001 | Experiment Created | Inventory Management System test |

---

## Archive

Archived experiments are moved here after completion:

| ID | Title | Archived | Assessment | Summary |
|----|-------|----------|------------|----------|
| (No archived experiments) | | | | |
