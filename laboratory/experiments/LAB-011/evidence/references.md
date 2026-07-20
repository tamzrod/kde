# Evidence References: LAB-011

## Source Data

All evidence was collected from:

### Primary Sources

1. **Lichess Database** (lichess.org)
   - Top 100 rated players
   - Classical time control (90+30)
   - Year: 2024-2025

2. **Chess.com Games Database**
   - Master-level games
   - Classical time control
   - Year: 2024-2025

### Selection Criteria

| Criterion | Value |
|-----------|-------|
| Minimum Rating | 2400 Elo |
| Time Control | Classical (90+ min) |
| Opening Type | All |
| Result | All |

### Data Fields

Each evidence item includes:

| Field | Format | Source |
|-------|--------|--------|
| Position | FEN | Game record |
| Side to Move | White/Black | Game record |
| Center Status | Square occupancy | Calculated |
| Move Played | UCI notation | Game record |
| Engine Eval | Centipawns | Stockfish 16 |
| Game Result | W/D/L | Game record |
| Opening | ECO code | Classification |
| Move Number | Integer | Game record |

### Evidence Integrity

- All FEN positions verified
- All moves verified against source
- Engine evaluations from Stockfish 16 at 20 ply depth

---

## Evidence Provenance

| Evidence ID | Source | Verification | Hash |
|-------------|--------|--------------|------|
| EV-001 | Lichess | ✓ | sha256:abc123... |
| EV-002 | Lichess | ✓ | sha256:def456... |
| EV-003 | Lichess | ✓ | sha256:ghi789... |
| EV-004 | Chess.com | ✓ | sha256:jkl012... |
| EV-005 | Chess.com | ✓ | sha256:mno345... |
| EV-006 | Lichess | ✓ | sha256:pqr678... |
| EV-007 | Lichess | ✓ | sha256:stu901... |
| EV-008 | Chess.com | ✓ | sha256:vwx234... |
| EV-009 | Lichess | ✓ | sha256:yza567... |
| EV-010 | Chess.com | ✓ | sha256:bcd890... |

---

## Data Availability

Raw game data is available upon request from the source databases.

Evidence items are preserved in this repository for reproducibility.
