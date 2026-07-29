# Experiment: AI Operational Criteria - Token Usage, Mutation, Response Time

**Experiment ID**: LAB-072
**created**: 2026-07-30T01:15:00Z
**modified**: 2026-07-30T01:15:00Z
**started**: 2026-07-30T01:15:00Z
**completed**: PENDING
**Status**: IN_PROGRESS
**Domain**: AI Operations Performance
**Methodology Version**: v2.0
**Engine**: KDE-ENGINE-001
**Seed**: SEED-001 (Genesis)
**Investigation**: INV-DIMINISHING-RETURNS-001
**Parent**: LAB-069 (Pre-digested), LAB-070 (MD vs Pre-digested), LAB-071 (Format Comparison)

---

## Objective

Measure AI-specific operational criteria when processing KDE content:
1. **Token Usage** - How many tokens consumed/generated
2. **Mutation Rate** - How often content changes during processing
3. **Response Time** - End-to-end latency for AI operations

**Goal**: Find the optimal KDE content format that minimizes AI operational costs.

---

## AI-Specific Metrics

### 1. Token Usage

| Metric | Description | Target |
|--------|-------------|--------|
| Input Tokens | Tokens sent to AI | Lower is better |
| Output Tokens | Tokens returned by AI | Lower is better |
| Total Tokens | Combined usage | Lower is better |
| Token Efficiency | Useful info per token | Higher is better |

### 2. Mutation Rate

| Metric | Description | Target |
|--------|-------------|--------|
| Content Drift | % of content changed | Lower is better |
| Semantic Shift | Meaning changed | Lower is better |
| Structure Change | Format altered | Lower is better |
| Stability Score | 100% - mutation | Higher is better |

### 3. Response Time

| Metric | Description | Target |
|--------|-------------|--------|
| Parse Time | Time to prepare input | Lower is better |
| AI Latency | Time AI takes to respond | Lower is better |
| Total Time | End-to-end | Lower is better |
| Throughput | Operations per second | Higher is better |

---

## Formats to Test

| Format | Description | Expected Token Efficiency |
|--------|-------------|--------------------------|
| Raw Markdown | Original .md files | Baseline |
| Pre-digested JSON | Compiled from LAB-069 | Higher |
| FUSED | Custom format from LAB-071 | TBD |
| Optimized JSON | Minified, schema-stripped | Higher |

---

## KDE Operations to Test

### Op 1: Knowledge Extraction
- Input: SEED-001 principles
- AI Task: Extract key definitions
- Measure: Output tokens, accuracy

### Op 2: Pattern Recognition  
- Input: Multiple experiment results
- AI Task: Find patterns across runs
- Measure: Input tokens, response time

### Op 3: Boundary Detection
- Input: Investigation documents
- AI Task: Identify knowledge boundaries
- Measure: Mutation rate, semantic shift

### Op 4: Summary Generation
- Input: Full experiment record
- AI Task: Generate executive summary
- Measure: Output tokens, total time

---

## Hypothesis

**Hypothesis Statement**: Pre-processed formats (Pre-digested JSON) will reduce AI operational costs compared to raw markdown, showing lower token usage, reduced mutation, and faster response times.

---

## Run Plan

| Run | Focus | Data | Metrics |
|-----|-------|------|---------|
| RUN-001 | Token Usage - Raw MD | SEED-001 principles | Input/output tokens |
| RUN-002 | Token Usage - Pre-digested | Same content as JSON | Compare tokens |
| RUN-003 | Mutation Rate - MD | KDE operations | Drift %, semantic shift |
| RUN-004 | Mutation Rate - Pre-digested | Same operations | Compare stability |
| RUN-005 | Response Time - MD | All 4 operations | Total time |
| RUN-006 | Response Time - Pre-digested | All 4 operations | Compare speed |
| RUN-007+ | Iterations | Until DR | Diminishing returns |

---

## Diminishing Returns Protocol

Per INV-DIMINISHING-RETURNS-001:
- Stop when improvement <5% for 2 consecutive runs
- Document when <10% (warning zone)

---

## Success Criteria

1. Token reduction: >10% with Pre-digested
2. Mutation reduction: >15% with Pre-digested
3. Response time: >20% faster with Pre-digested
4. Overall: Pre-digested is better for AI operations

---

## Metadata

| Field | Value |
|-------|-------|
| Experiment ID | LAB-072 |
| Investigation | INV-DIMINISHING-RETURNS-001 |
| Parent | LAB-069, LAB-070, LAB-071 |
| Schema Version | 2.0 |
