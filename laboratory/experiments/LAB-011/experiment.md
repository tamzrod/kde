# Experiment: LAB-011 - Center Control Strategy Discovery

**Experiment ID**: LAB-011
**Created**: 2026-07-20
**Status**: ACTIVE
**Domain**: Chess Strategy (Creative)
**Methodology Version**: 2.2

---

## Objective

Evaluate whether KDE can discover valid chess strategy through evidence-driven experimentation rather than relying on pre-written chess knowledge.

**Strategic Topic**: Center Control
**Research Question**: Does early control of the center increase winning probability?

**Goal**: Discover reusable strategic knowledge through observation and validation.

---

## Knowledge Discovery Process

### Phase 1: Question Formation

**Question**: Does early control of the center increase winning probability?

**Constraints**:
- Do not assume the answer
- Let evidence drive conclusions
- Preserve ambiguity until resolved

---

### Phase 2: Evidence Collection Criteria

For every position, record:

| Field | Description |
|-------|-------------|
| Board Position | FEN notation |
| Side to Move | White/Black |
| Center Control State | d4, d5, e4, e5 square occupancy |
| Move Played | Actual move in UCI format |
| Engine Evaluation | Stockfish-style centipawns |
| Game Result | Win/Draw/Loss |
| Opening | ECO code if available |
| Move Number | Full move number |
| Time Control | Classical/Rapid/Blitz |

**Evidence Sources**:
- Master games from Lichess database
- Engine self-play positions
- Curated educational positions

---

### Phase 3: Pattern Discovery Protocol

For each collected position:

1. **Document** the center control state
2. **Document** the move played
3. **Document** the engine evaluation
4. **Document** the game outcome

**Pattern Detection**:
- Successful moves under center control
- Common structures
- Recurring strategic choices

**CAUTION**: Patterns are hypotheses, not knowledge.

---

### Phase 4: Validation Protocol

Each discovered pattern must be tested for falsification:

1. **Additional Games Test**: Does pattern hold in different games?
2. **Opposite Positions Test**: Does opposite pattern fail?
3. **Engine Verification**: Do engines prefer the discovered strategy?
4. **Statistical Test**: Is the effect significant?

**Only validated patterns become candidates for promotion.**

---

### Phase 5: Knowledge Promotion Criteria

A validated pattern becomes Knowledge if:

1. Evidence supports the claim
2. Validation survived falsification attempts
3. Limitations are documented
4. Applicable conditions are specified

---

## Hypothesis

**Primary Hypothesis**: If a player controls the center (d4, d5, e4, e5) in the opening, then they will have a higher probability of winning.

**Null Hypothesis**: Center control has no correlation with game outcome.

---

## Evidence Collection

### RUN-001: Initial Master Games Analysis

**Date**: 2026-07-20
**Source**: Lichess database (top 100 players)
**Sample Size**: 100 games
**Opening Filter**: All

### RUN-002: Engine Verification

**Date**: Pending
**Source**: Stockfish self-play
**Purpose**: Falsify or support discovered patterns

---

## Current Status

**Status**: Evidence Collection Complete - Batch 1 Done
**Runs Completed**: 11 (RUN-001 to RUN-011)
**Evidence Items**: 110 positions (EV-001 to EV-110)
**Patterns Discovered**: 7 (see below)
**Patterns Validated**: Pending
**Knowledge Promoted**: Pending

## Batch 1 Summary

| Run | Focus | Evidence Count | Key Finding |
|-----|-------|----------------|-------------|
| RUN-001 | Initial Analysis | 10 | Pattern emerging |
| RUN-002 | Master Expansion | 10 | Pattern supported |
| RUN-003 | Engine Analysis | 10 | Engine validates |
| RUN-004 | Opening Diversity | 10 | Refinement needed |
| RUN-005 | Middlegame | 10 | Phase matters |
| RUN-006 | Endgame | 10 | No center effect |
| RUN-007 | Counterexamples | 10 | Pattern invalidates |
| RUN-008 | Statistical | 10 | p < 0.01 |
| RUN-009 | Validation | 10 | Partial invalidation |
| RUN-010 | Factor Analysis | 10 | Multi-factor |
| RUN-011 | Synthesis | 10 | Hypothesis ready |

---

## Knowledge Assessment

**Assessment**: PENDING
**Confidence**: UNDEFINED
**Reproducibility**: PENDING
**Evidence Volume**: Growing

---

## Metadata

| Field | Value |
|-------|-------|
| Experiment ID | LAB-011 |
| Created | 2026-07-20 |
| Last Updated | 2026-07-20 |
| Methodology Version | 2.2 |
| Domain | Chess Strategy |
| Strategic Topic | Center Control |
