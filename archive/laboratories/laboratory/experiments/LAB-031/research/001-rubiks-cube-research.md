# Research Summary: Rubik's Cube Reasoning Benchmark

**Research Date**: 2026-07-22
**Experiment**: LAB-031
**Category**: Reasoning Benchmark

---

## 1. Standard Rubik's Cube Notation

### Face Notation (Fact)

| Symbol | Meaning | Type |
|--------|---------|------|
| **F** | Front face | Quarter turn clockwise |
| **B** | Back face | Quarter turn clockwise |
| **R** | Right face | Quarter turn clockwise |
| **L** | Left face | Quarter turn clockwise |
| **U** | Up face | Quarter turn clockwise |
| **D** | Down face | Quarter turn clockwise |

### Modifiers (Fact)

| Symbol | Meaning | Example |
|--------|---------|---------|
| **'** (prime) | Counterclockwise turn | R' means turn R face counterclockwise |
| **2** | Half turn (180°) | U2 means turn U face 180° |
| **lowercase** | Two layers simultaneously | r means turn R and M layers together |

### Move Counting Metrics (Fact)

| Metric | Definition | Max Moves |
|--------|------------|-----------|
| **HTM** (Half Turn Metric) | Each face turn counts as 1, regardless of angle | 20 |
| **QTM** (Quarter Turn Metric) | 90° = 1 move, 180° = 2 moves | 26 |

---

## 2. WCA Scramble Standards (Fact)

Source: [WCA Regulations](https://www.worldcubeassociation.org/regulations)

- **Random-state scrambles**: Produces equally likely legal states
- **Minimum distance**: All scrambles require at least 2 moves to solve
- **Standard orientation**: White on top, Green on front
- **Scramble length**: Typically 20-25 moves in QTM
- **Official program**: TNoodle-WCA-1.2.3

---

## 3. God's Number (Fact)

**Established by**: Morley Davidson et al., 2010
**Source**: [cube20.org](https://www.cube20.org)

| Metric | God's Number | Proof Date |
|--------|-------------|------------|
| HTM | **20** | 2010 |
| QTM | **26** | N/A (updated result) |

**Key insight**: Every position of the Rubik's Cube can be solved in 20 moves or fewer in HTM.

---

## 4. Solving Methods (Fact)

### CFOP (Fridrich Method)

**Proposer**: Jessica Fridrich
**Steps**: Cross → F2L → OLL → PLL
**Average moves**: 55-60 (speedcubing)
**Algorithms**: 78 (F2L) + 57 (OLL) + 21 (PLL)

### Roux Method

**Proposer**: Gilles Roux (2003)
**Steps**: First Block → Second Block → CMLL → LSE
**Average moves**: 48 (speedcubing)
**Characteristics**: Block-building, M-slice heavy, few rotations

### ZZ Method

**Creator**: Zbigniew Zborowski (2006)
**Steps**: EOLine → Block Building → Last Layer
**Average moves**: 45-55
**Characteristics**: Reduces face rotations, uses edge orientation

---

## 5. Algorithms

### Kociemba Two-Phase Algorithm

**Source**: [Kociemba's Homepage](https://kociemba.org)

- **Phase 1**: Reduce to G1 subgroup (orientation + UD-slice)
- **Phase 2**: Solve from G1 using restricted moves
- **Average solution**: <20 moves
- **Implementation**: Available in Python (rubikscube-twophasesolver)

### Thistlethwaite Algorithm

**Source**: [Jaap's Puzzle Page](https://www.jaapsch.net/puzzles/thistle.htm)

- **4 Phases**: Progressive subgroup reduction
- **Maximum moves**: 52 (original), improved to ~45
- **Phase 1**: All moves allowed
- **Phase 2**: L, R, F, B, U, D (no U/D quarter turns)
- **Phase 3**: L, R, F, B, U², D²
- **Phase 4**: L², R², F², B², U², D²

---

## 6. Existing Benchmarks

### Cube Bench (arXiv:2512.20595)

**Source**: [arXiv](https://arxiv.org/html/2512.20595v1)

A recent benchmark for evaluating spatial and sequential reasoning in multimodal large language models:

| Skill | Description |
|-------|-------------|
| Reconstruction | Reconstruct cube faces from images/text |
| Move Selection | Choose optimal next move |
| Outcome Prediction | Predict move outcome without applying |
| Execution | Execute multi-step plans |
| Error Recovery | Detect and revise errors |

**Finding**: Current MLLMs can reconstruct/verify state but struggle with long sequences.

---

## 7. Research Findings Summary

### Established Facts
1. Standard notation is universally accepted (F, B, R, L, U, D with ' and 2 modifiers)
2. WCA uses random-state scrambles with TNoodle
3. God's Number is 20 in HTM, 26 in QTM
4. Multiple solving methods exist with different trade-offs
5. Kociemba's algorithm achieves near-optimal solutions efficiently

### Interpretations
1. The cube provides a clean testbed for reasoning (discrete, verifiable, combinatorial)
2. Human solving methods emphasize pattern recognition over brute-force
3. AI benchmarks should distinguish between verification and generation tasks

### Assumptions
1. Identical starting conditions will produce comparable results across engines
2. Solution length is a reasonable proxy for reasoning quality
3. Multiple runs can reveal stability differences

---

## 8. Sources

| Source | Type | Key Contribution |
|--------|------|------------------|
| cube20.org | Research | God's Number proof |
| WCA Regulations | Official | Scramble standards |
| Kociemba.org | Algorithm | Two-phase solver |
| jaapsch.net | Reference | Thistlethwaite algorithm |
| arXiv:2512.20595 | Benchmark | Cube Bench |
| jperm.net | Tutorial | CFOP, Roux, ZZ methods |

---

**Document Status**: COMPLETE
**Confidence**: HIGH
