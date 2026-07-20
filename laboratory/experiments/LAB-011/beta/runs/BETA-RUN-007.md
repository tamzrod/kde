# Beta Run: BETA-RUN-007 - Context Discovery Phase 2

**Run ID**: BETA-RUN-007
**Experiment**: LAB-011
**Engine**: KDE-ENGINE-002 (Beta)
**Engine Version**: 0.1.0
**Date**: 2026-07-20
**Status**: COMPLETE
**Purpose**: Additional context discovery and refinement

---

## Additional Context Analysis

### Dimension: Time Control

| Time Control | Count | White Win Rate | Context Strength |
|--------------|-------|----------------|------------------|
| Classical (90+30) | 30 | 60% | BASELINE |

**Finding**: All evidence is Classical time control. Cannot assess other time controls.

### Dimension: Player Color

| Color | Count | Win Rate | Notes |
|-------|-------|----------|-------|
| White | 30 | 60% | Pattern focus |
| Black (reverse) | 0 | - | No Black evidence |

**Finding**: Pattern is specifically about White's e4 control.

### Dimension: Tournament vs Online

| Source | Count | White Win Rate | Context Strength |
|--------|-------|----------------|------------------|
| Lichess | 15 | 60% | MEDIUM |
| Chess.com | 15 | 60% | MEDIUM |

**Finding**: Consistent across sources.

---

## Context Refinement

### Final Context Model

```yaml
primary_contexts:
  - dimension: side
    value: White
    evidence: 30
    required: true
  
  - dimension: center_square
    value: e4
    evidence: 9
    required: true
    win_rate: 100%
  
  - dimension: opening_family
    values: [ruy_lopez, italian, petroff]
    evidence: 12
    required: false
    win_rate: 92%

secondary_contexts:
  - dimension: time_control
    value: classical
    evidence: 30
    required: false
  
  - dimension: rating_range
    values: [2400+]
    evidence: 30
    required: false

excluded_contexts:
  - dimension: opening_family
    values: [sicilian, english, hypermodern]
    reason: pattern reversed
    evidence: 10
```

---

## Knowledge Refinement

```yaml
knowledge:
  id: BETA-KNOW-001
  version: 1.4
  status: VALIDATED
  
  applicability:
    primary_contexts:
      - White playing
      - e4 pawn controlled by White
      - Classical opening (Ruy Lopez, Italian, Petroff)
    
    excluded_contexts:
      - Hypermodern openings (KID, Pirc, Dutch, Modern)
      - Sicilian Defense
      - English Opening
    
    untested_contexts:
      - Endgame positions
      - Blitz/Rapid time controls
      - Below 2400 rating
```

---

## Metadata

| Field | Value |
|-------|-------|
| Run ID | BETA-RUN-007 |
| Primary Contexts | 3 |
| Secondary Contexts | 2 |
| Excluded Contexts | 3 |
| Knowledge Version | 1.4 |

---

**Beta Advantage**: Beta explicitly documents what contexts are untested, guiding future research. Alpha provides no such guidance.
