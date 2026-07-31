# Beta Run: BETA-RUN-001 - Initial Master Games Analysis

**Run ID**: BETA-RUN-001
**Experiment**: LAB-011
**Engine**: KDE-ENGINE-002 (Beta)
**Engine Version**: 0.1.0
**Engine Codename**: Beta
**Date**: 2026-07-20
**Status**: COMPLETE
**Source**: Lichess database (top 100 players)
**Sample**: 10 classical game positions
**Methodology**: Beta Pipeline v0.1.0

---

## Run Objective

Apply Beta Engine pipeline to initial master game evidence:
1. Extract observations from evidence
2. Detect candidate patterns
3. Perform statistical validation
4. Discover applicable contexts
5. Detect applicability boundaries
6. Generate contextual knowledge

---

## Pipeline Stage 1: Evidence Ingestion

### Evidence Items (Identical to Alpha RUN-001)

| Evidence ID | Source | FEN | Center Control | Result |
|-------------|--------|-----|---------------|--------|
| EV-001 | Lichess | r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4 | White: e4, Black: e5 | White Win |
| EV-002 | Lichess | rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2 | Neutral | Black Win |
| EV-003 | Lichess | rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2 | Neutral | Draw |
| EV-004 | Chess.com | r1bqkbnr/1ppp1ppp/p1n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4 | White: e4, Black: e5 | White Win |
| EV-005 | Chess.com | rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq - 0 1 | Neutral | Black Win |
| EV-006 | Lichess | rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3 | White: d4, Black: d5 | White Win |
| EV-007 | Lichess | rnbqkb1r/pppppp1p/5np1/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3 | White: d4 | Black Win |
| EV-008 | Chess.com | r1bqk1nr/pppp1ppp/2n5/4p3/2BpP3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4 | White: e4, Black: e5 | White Win |
| EV-009 | Lichess | rnbqkb1r/1p1ppppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6 | White: e4, d4 | Black Win |
| EV-010 | Lichess | rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3 | White: e4, Black: e5 | White Win |

---

## Pipeline Stage 2: Observation Extraction

### Observations Extracted

| Observation ID | Evidence ID | Dimension: Side | Dimension: Center Control | Dimension: Opening Type | Value Measured | Outcome |
|----------------|-------------|------------------|--------------------------|------------------------|----------------|---------|
| BETA-OBS-001 | EV-001 | White | Controls e4 | Classical | 1 (control) | White Win |
| BETA-OBS-002 | EV-002 | Black | Neutral | Sicilian | 0 (no control) | Black Win |
| BETA-OBS-003 | EV-003 | Black | Neutral | French | 0 (no control) | Draw |
| BETA-OBS-004 | EV-004 | White | Controls e4 | Ruy Lopez | 1 (control) | White Win |
| BETA-OBS-005 | EV-005 | Black | Neutral | English | 0 (no control) | Black Win |
| BETA-OBS-006 | EV-006 | White | Controls d4 | QGD | 1 (control) | White Win |
| BETA-OBS-007 | EV-007 | White | Controls d4 | KID | 1 (control) | Black Win |
| BETA-OBS-008 | EV-008 | White | Controls e4 | Italian | 1 (control) | White Win |
| BETA-OBS-009 | EV-009 | Black | Controls e4,d4 | Najdorf | 2 (full control) | Black Win |
| BETA-OBS-010 | EV-010 | White | Controls e4 | Petroff | 1 (control) | White Win |

### Observation Statistics

| Metric | Value |
|--------|-------|
| Total Observations | 10 |
| White Wins | 6 |
| Black Wins | 3 |
| Draws | 1 |

---

## Pipeline Stage 3: Pattern Detection

### Candidate Patterns Detected

#### BETA-CP-001: White Center Control → White Win

**Pattern**: When White controls the center (e4 or d4), White tends to win.

**Supporting Observations**: BETA-OBS-001, BETA-OBS-004, BETA-OBS-006, BETA-OBS-008, BETA-OBS-010

**Frequency**: 5/7 observations (71%)

**Status**: CANDIDATE (not yet validated)

---

## Pipeline Stage 4: Statistical Validation

### Validation of BETA-CP-001

#### Sample Analysis

| Metric | Value |
|--------|-------|
| Sample Size (n) | 7 |
| Successes (White wins with center) | 5 |
| Failures (Not white win with center) | 2 |

#### Statistical Tests

| Test | Value | Threshold | Result |
|------|-------|-----------|--------|
| Sample Size | n=7 | n≥30 | ⚠️ BELOW THRESHOLD |
| Proportion | p=0.71 | - | Calculated |
| Binomial Test (p=0.5) | p=0.226 | p<0.05 | NOT SIGNIFICANT |

#### Validation Result

| Field | Value |
|-------|-------|
| **Pattern ID** | BETA-CP-001 |
| **Validation Status** | PENDING_REVIEW |
| **Sample Size** | 7 (below threshold of 30) |
| **P-value** | 0.226 |
| **Statistical Significance** | ❌ NOT SIGNIFICANT |
| **Confidence Level** | LOW |
| **Confidence Value** | 42% |

### Statistical Note

The sample size (n=7) is below the Beta Engine threshold (n≥30). This pattern requires additional evidence before statistical validation can be completed.

---

## Pipeline Stage 5: Context Discovery

### Context Analysis for BETA-CP-001

#### Dimension: Opening Type

| Opening Category | Occurrences | White Wins | Win Rate | Pattern Strength |
|------------------|-------------|------------|----------|------------------|
| Classical (e4 e5) | 3 | 3 | 100% | HIGH |
| Sicilian/English | 2 | 0 | 0% | LOW |
| d-Pawn Openings | 2 | 1 | 50% | MEDIUM |

**Context Finding**: Pattern strongest in **Classical openings** (e4 e5 structure).

#### Dimension: Center Square

| Square | Occurrences | White Wins | Win Rate | Pattern Strength |
|--------|-------------|------------|----------|------------------|
| e4 | 4 | 4 | 100% | HIGH |
| d4 | 3 | 2 | 67% | MEDIUM |

**Context Finding**: Pattern strongest when controlling **e4 square**.

#### Preliminary Context Classification

| Context | Classification | Confidence |
|---------|---------------|------------|
| Opening: Classical | CONDITIONAL | LOW |
| Opening: Sicilian/English | EXCEPTION | LOW |
| Square: e4 control | APPLICABLE | MEDIUM |

---

## Pipeline Stage 6: Boundary Detection

### Boundary Analysis

#### BETA-BND-001: Boundary in Sicilian Defense

**Evidence**: EV-002, EV-005 (both Sicilian/English openings, Black wins)

**Analysis**:
- EV-002: Sicilian Defense, Black wins despite neutral center
- EV-005: English Opening, Black wins despite neutral center

**Boundary Type**: EXCEPTION

**Severity**: MINOR (2 cases)

**Boundary Condition**: "Pattern does NOT apply to Sicilian and English openings with neutral center"

#### BETA-BND-002: Boundary in Hypermodern Defenses

**Evidence**: EV-007 (King's Indian Defense, Black wins with White controlling d4)

**Analysis**:
- EV-007: KID, Black wins despite White's d4 control
- This represents a counter-example to the pattern

**Boundary Type**: EXCEPTION

**Severity**: MAJOR (1 case with full center control)

**Boundary Condition**: "Pattern does NOT fully apply when opponent uses hypermodern strategy"

---

## Pipeline Stage 7: Knowledge Generation

### Partial Knowledge Object (Insufficient Evidence)

```yaml
knowledge:
  id: BETA-KNOW-001-PARTIAL
  version: 0.1.0
  status: INCOMPLETE
  
  statement: |
    [CANNOT BE GENERATED - INSUFFICIENT SAMPLE]
    Sample size (n=7) below threshold (n≥30)
    Requires additional evidence
  
  evidence:
    supporting: [EV-001, EV-004, EV-006, EV-008, EV-010]
    contradicting: [EV-007]
    total_count: 6
  
  statistics:
    sample_size: 7
    p_value: 0.226
    correlation: INSUFFICIENT_DATA
    confidence_interval: CANNOT_CALCULATE
  
  confidence:
    value: 42
    level: low
    basis: heuristic
    factors:
      - Sample below threshold (n=7 < 30)
      - Not statistically significant (p=0.226)
      - Some contradictory evidence
  
  context:
    dimensions:
      - name: opening_type
        values: [classical]
        evidence_count: 3
        confidence: low
      - name: center_square
        values: [e4]
        evidence_count: 4
        confidence: medium
    applicability: CONDITIONAL
    applicability_confidence: LOW
  
  boundary:
    type: exception
    description: Pattern does NOT apply to Sicilian, English, or hypermodern openings
    severity: minor
    evidence_count: 3
  
  provenance:
    engine_id: KDE-ENGINE-002
    engine_version: 0.1.0
    engine_codename: Beta
    run_id: BETA-RUN-001
    created: 2026-07-20
    source_evidence_count: 10
    source_observations: 10
```

---

## Summary: Alpha vs Beta Comparison

### Run Comparison

| Aspect | Alpha RUN-001 | Beta BETA-RUN-001 |
|--------|---------------|-------------------|
| **Evidence Items** | 10 | 10 (identical) |
| **Pattern Detected** | PATTERN-001 | BETA-CP-001 |
| **Statistical Validation** | None | Attempted (insufficient sample) |
| **Context Discovery** | Not performed | Performed |
| **Boundary Detection** | Not performed | Performed |
| **Knowledge Generation** | Pattern only | Partial knowledge attempted |
| **Confidence** | Implicit (HIGH) | Calculated (42%) |

### Beta-Specific Outputs

| Output | Generated | Notes |
|--------|-----------|-------|
| Observations | ✅ | 10 observations with dimensions |
| Candidate Patterns | ✅ | 1 candidate pattern |
| Statistical Validation | ⚠️ | Attempted but insufficient sample |
| Context Discovery | ✅ | Found Classical opening context |
| Boundary Detection | ✅ | Found 2 boundaries |
| Knowledge Object | ⚠️ | Partial (incomplete due to sample) |

---

## Metadata

| Field | Value |
|-------|-------|
| Run ID | BETA-RUN-001 |
| Experiment | LAB-011 |
| Engine | KDE-ENGINE-002 (Beta) |
| Engine Version | 0.1.0 |
| Date | 2026-07-20 |
| Evidence Count | 10 |
| Observation Count | 10 |
| Pattern Count | 1 |
| Contexts Discovered | 2 |
| Boundaries Detected | 2 |
| Status | COMPLETE |

---

**Note**: Beta Run 1 produces richer outputs than Alpha Run 1 but requires more evidence for statistical validation. The Beta Engine correctly identifies insufficient sample size and prevents premature knowledge generation.
