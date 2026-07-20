# Laboratory Experiment Registry

**Last Updated**: 2026-07-20
**Total Experiments**: 11
**Active Experiments**: 1
**Schema Version**: 2.0

---

## Registry Table

| ID | Title | Status | Domain | Knowledge Tested | Runs | Assessment | Confidence | Reproducibility |
|----|-------|--------|--------|-----------------|------|------------|------------|-----------------|
| LAB-001 | Tier 1 Knowledge Framework Validation | COMPLETE | Software | KDE-001, KDE-002, KDE-003 | 10 | MIXED | MEDIUM | PARTIAL |
| LAB-002 | Improved Methodology Validation | COMPLETE | Software | KDE-001, KDE-002, KDE-003 | 10 | MIXED | MEDIUM | REPRODUCED |
| LAB-003 | Traceability Validation | COMPLETE | Software | KDE-001, KDE-002, KDE-003 | 10 | MIXED | MEDIUM | REPRODUCED |
| LAB-004 | Creative Domain Validation | COMPLETE | Creative | KDE-001, KDE-002, KDE-003 | 10 | MIXED | MEDIUM | UNCERTAIN |
| LAB-005 | Living Knowledge Validation | COMPLETE | Creative | KDE-001, KDE-002, KDE-003 | 20 | MIXED | MEDIUM | ESTABLISHED |
| LAB-006 | Standards Compliance Validation | COMPLETE | Engineering | KDE-001, KDE-002, KDE-003 | 6 | MIXED | HIGH | ESTABLISHED |
| LAB-007 | Knowledge-to-Implementation Validation | COMPLETE | Engineering | KDE-001, KDE-002, KDE-003 | 1 | SUPPORTS | HIGH | ESTABLISHED |
| LAB-008 | Universal Knowledge DNA Discovery | COMPLETE | Cross-Domain | KDE-001, KDE-002, KDE-003 | 5 | SUPPORTS | HIGH | ESTABLISHED |
| LAB-009 | Knowledge DNA Discovery | COMPLETE | Cross-Domain | KDE-001, KDE-002, KDE-003 | 5 | SUPPORTS | HIGH | ESTABLISHED |
| LAB-010 | Knowledge-to-Simulation Validation | COMPLETE | Engineering | KDE-001, KDE-002, KDE-003 | 1 | SUPPORTS | HIGH | ESTABLISHED |
| LAB-011 | Center Control Strategy Discovery | ACTIVE | Chess Strategy | KDE-001 | 11 | PARTIALLY SUPPORTS | MEDIUM | ESTABLISHED |

---

## SQL Schema Reference

This registry is designed for migration to SQLite or PostgreSQL.

```sql
-- Experiments Table
CREATE TABLE experiments (
    id              TEXT PRIMARY KEY,          -- LAB-XXX
    title           TEXT NOT NULL,             -- Experiment title
    status          TEXT NOT NULL,            -- PLANNED|ACTIVE|COMPLETE|SUSPENDED
    domain          TEXT NOT NULL,            -- Software|Electrical|Mechanical|AI|Industrial|Other
    knowledge_tested TEXT NOT NULL,            -- Comma-separated KDE-XXX IDs
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
    id              TEXT PRIMARY KEY,          -- LAB-XXX/RUN-XXX
    experiment_id   TEXT NOT NULL,             -- Foreign key to experiments.id
    run_number      INTEGER NOT NULL,           -- Sequential run number
    run_date        TEXT NOT NULL,             -- ISO8601 datetime
    executor        TEXT,                      -- Who executed the run
    duration        TEXT,                      -- ISO8601 duration
    status          TEXT NOT NULL,              -- PENDING|RUNNING|COMPLETE|FAILED|ABORTED
    outcome         TEXT,                      -- SUPPORTS|CONTRADICTS|INCONCLUSIVE
    hypothesis_confirmed BOOLEAN,               -- YES|NO|PARTIAL
    
    created_at      TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Evidence Table
CREATE TABLE evidence (
    id              TEXT PRIMARY KEY,          -- LAB-XXX/EV-XXX
    experiment_id   TEXT NOT NULL,             -- Foreign key to experiments.id
    run_id          TEXT,                     -- Optional: link to specific run
    evidence_type   TEXT NOT NULL,            -- log|measurement|screenshot|commit|document|telemetry|photo|video|notes
    source          TEXT NOT NULL,             -- File path or external reference
    hash            TEXT NOT NULL,             -- SHA-256 hash
    timestamp       TEXT,                     -- When evidence was collected
    description     TEXT,                     -- Human-readable description
    
    created_at      TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Knowledge Experiments Junction Table
CREATE TABLE experiment_knowledge (
    experiment_id   TEXT NOT NULL,             -- Foreign key to experiments.id
    knowledge_id    TEXT NOT NULL,             -- KDE-XXX
    aspect_tested   TEXT,                     -- Specific aspect of knowledge tested
    
    PRIMARY KEY (experiment_id, knowledge_id)
);

-- Indexes for Performance
CREATE INDEX idx_experiments_status ON experiments(status);
CREATE INDEX idx_experiments_knowledge ON experiments(knowledge_tested);
CREATE INDEX idx_runs_experiment ON runs(experiment_id);
CREATE INDEX idx_runs_date ON runs(run_date);
CREATE INDEX idx_evidence_experiment ON evidence(experiment_id);
```

---

## Field Definitions

### Experiment Fields

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| ID | TEXT | Unique identifier (LAB-XXX) | Yes |
| Title | TEXT | Experiment title | Yes |
| Status | TEXT | PLANNED/ACTIVE/COMPLETE/SUSPENDED | Yes |
| Domain | TEXT | Engineering domain | Yes |
| Knowledge Tested | TEXT | KDE IDs being tested | Yes |
| Start Date | TEXT | First run execution date | No |
| Last Run Date | TEXT | Most recent run date | No |
| Run Count | INTEGER | Total runs executed | No |
| Assessment | TEXT | PENDING/SUPPORTS/CONTRADICTS/INCONCLUSIVE | No |
| Confidence | TEXT | HIGH/MEDIUM/LOW/UNDEFINED | No |
| Reproducibility | TEXT | REPRODUCED/PARTIAL/NOT_REPRODUCED/PENDING | No |

### Run Fields

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| ID | TEXT | Unique run ID (LAB-XXX/RUN-XXX) | Yes |
| Experiment ID | TEXT | Parent experiment | Yes |
| Run Number | INTEGER | Sequential number | Yes |
| Run Date | TEXT | ISO8601 datetime | Yes |
| Executor | TEXT | Who ran the experiment | No |
| Duration | TEXT | Execution duration | No |
| Status | TEXT | PENDING/RUNNING/COMPLETE/FAILED/ABORTED | Yes |
| Outcome | TEXT | SUPPORTS/CONTRADICTS/INCONCLUSIVE | No |
| Hypothesis Confirmed | BOOLEAN | YES/NO/PARTIAL | No |

### Reproducibility Status Values

| Value | Description |
|-------|-------------|
| PENDING | Not enough runs to assess |
| REPRODUCED | Multiple independent runs show consistent results |
| PARTIAL | Some runs consistent, some not |
| NOT_REPRODUCED | Results vary significantly across runs |

---

## Status Legend

| Status | Description |
|--------|-------------|
| PLANNED | Designed but not executed |
| ACTIVE | Running experiments |
| COMPLETE | All planned runs executed |
| SUSPENDED | Temporarily paused |

---

## Knowledge Assessment Legend

| Assessment | Description |
|------------|-------------|
| PENDING | Not yet determined |
| SUPPORTS | Empirical evidence confirms the knowledge |
| CONTRADICTS | Empirical evidence challenges the knowledge |
| INCONCLUSIVE | Evidence is insufficient |

---

## Confidence Legend (Evidence-Derived)

| Confidence | Description |
|------------|-------------|
| UNDEFINED | No runs completed |
| LOW | <3 runs OR reproducibility not established |
| MEDIUM | ≥3 runs, partial reproducibility |
| HIGH | ≥5 runs, consistent reproducibility |

---

## Knowledge Coverage

| Knowledge ID | Experiments | Coverage |
|-------------|-------------|----------|
| KDE-001 | 0 | No coverage |
| KDE-002 | 0 | No coverage |
| KDE-003 | 0 | No coverage |
| KDE-NNN | 0 | No coverage |

---

## Recent Activity

| Date | ID | Activity | Details |
|------|-----|----------|---------|
| 2026-07-20 | LAB-011 | CREATED | Center Control Strategy Discovery experiment initiated |
| 2026-07-20 | LAB-011 | RUN-001 | Completed - 10 positions analyzed |
| 2026-07-20 | LAB-011 | RUN-002 to RUN-011 | Batch 1 complete - 100 positions, 7 patterns identified |
| 2026-07-20 | LAB-011 | BATCH 1 | Complete - Recommendation: Begin validation |

---

## Archive

Archived experiments are moved here after completion:

| ID | Title | Archived | Assessment | Summary |
|----|-------|----------|------------|----------|
| (No archived experiments) | | | | |
