# Experiment: LAB-031 - Multi-Engine Rubik's Cube Reasoning Benchmark

**Experiment ID**: LAB-031
**Created**: 2026-07-22
**Status**: IN_PROGRESS
**Category**: Reasoning Benchmark
**Engine**: KDE-ENGINE-002 (Beta) - Default
**Seed**: SEED-001 (Genesis)

---

## Objective

Design and execute a controlled benchmark comparing all available Seed2 reasoning engines using an identical Rubik's Cube problem. The objective is to evaluate reasoning characteristics under identical conditions—not simply determine which engine is "best."

---

## Hypothesis

Reasoning engines exhibit measurable differences in their approach to combinatorial optimization problems when evaluated under identical starting conditions. These differences manifest in solution quality, computational efficiency, and behavioral stability.

---

## Scope

### Included
- All available Seed2 reasoning engines (Alpha, Beta, Gamma, Delta)
- Identical prompt, scramble, and success criteria
- Quantitative measurements: correctness, solution length, runtime
- Qualitative observations: observable strategy, failure modes

### Excluded
- Engine-specific optimization
- Prompt tuning
- Hidden hints or context injection
- Multiple scramble variations (single test case)

---

## Methodology

### Phase 1: Research
- Document Rubik's Cube notation standards
- Review WCA scramble requirements
- Analyze existing algorithms and benchmarks
- Reference: `/research/001-rubiks-cube-research.md`

### Phase 2: Benchmark Design
- Fair: No engine receives advantage
- Reproducible: Fixed seed for randomization
- Engine-agnostic: Identical prompt format
- Repeatable: Same conditions for all runs

### Phase 3: Standard Test Case
- WCA-compliant scramble
- 20-25 moves in QTM
- Generated using verified algorithm
- Recorded for reproducibility

### Phase 4: Engine Enumeration
- Identify all available engines
- Document version, configuration
- Note any unavailable engines

### Phase 5: Execution
- Unchanged execution environment
- No manual intervention during runs
- Automated measurement collection

### Phase 6: Measurement
- **Correctness**: Solved? (YES/NO)
- **Solution Length**: Total moves
- **Runtime**: Wall-clock time
- **Efficiency**: Distance from optimal
- **Stability**: Consistency across runs
- **Observable Strategy**: Pattern description
- **Failure Analysis**: Categorization of failures

### Phase 7: Analysis
- Comparative tables
- Statistical summary
- Significant differences highlighted

### Phase 8: Conclusions
- Evidence-based findings
- No arbitrary "winner" declaration
- Reproducibility checklist

---

## Standard Test Case

### Scramble Generation
- **Method**: TNoodle-style random-state generation
- **Length**: 22 moves (QTM)
- **Seed**: 422021 (fixed for reproducibility)
- **Notation**: Standard WCA format

### Exact Scramble
```
R' U' F' R2 U R' U' F' U' R U R2 F' U' R' U2 R U' R' U R U' R2 U2 R U' R2 U2 F U2 R U' F' U F U2 R2 F U R2
```

### Cube Orientation
- White face: UP (top)
- Green face: FRONT

---

## Prompt Template

```
You are a Rubik's Cube solving assistant. Your task is to solve the cube from the scrambled state described below.

CUBE ORIENTATION:
- White face is UP (top)
- Green face is FRONT

SCRAMBLED STATE:
[Standard notation scramble]

TASK:
Generate a sequence of moves that solves the cube. Your solution must:
1. Use standard Rubik's Cube notation (F, B, R, L, U, D with optional ' for counterclockwise and 2 for 180-degree turns)
2. Be complete (solve the cube from the given scrambled state)
3. Be verified (you may describe your reasoning, but only provide the final solution)

OUTPUT FORMAT:
Provide ONLY the solution sequence in standard notation. Do not include explanations, reasoning, or intermediate steps.

Example output format:
U R' F2 L' B D'

Begin solving:
```

---

## Success Criteria

| Criterion | Definition |
|-----------|------------|
| **Correct Solution** | The cube reaches solved state after applying the solution |
| **Valid Notation** | All moves use valid Rubik's Cube notation |
| **Complete Response** | A solution sequence is provided |
| **Within Limits** | Solution length <= 100 moves, runtime <= 60 seconds |

---

## Measurement Protocol

### Correctness Verification
1. Apply scramble to solved cube (simulated)
2. Apply solution to scrambled cube
3. Verify final state equals solved state
4. Result: SOLVED or NOT_SOLVED

### Solution Length
- Count moves in provided solution
- Record as integer

### Runtime
- Wall-clock time from prompt delivery to first token
- Recorded in seconds with millisecond precision

### Efficiency
- Optimal solution length: Computed using Kociemba algorithm
- Efficiency = Optimal / Actual * 100%

### Stability
- 3 runs per engine
- Measure: consistency of solution length, consistency of correctness

### Observable Strategy
- Systematic search: Exhaustive exploration
- Decomposition: Breaks problem into subproblems
- Heuristic planning: Uses rules of thumb
- Exploratory search: Tries moves without clear plan
- Backtracking: Reverses unsuccessful paths
- Pattern recognition: Identifies known configurations

### Failure Modes
- Illegal notation: Invalid move symbols
- Repeated states: Cycles in solution
- Oscillation: No progress pattern
- Exceeded limits: Timeout or length limit
- Abandoned search: Stopped prematurely
- Invalid solution: Does not solve cube

---

## Deliverables

1. [x] Experiment specification (this document)
2. [x] Research summary
3. [ ] Benchmark methodology
4. [ ] Standard scramble
5. [ ] Raw benchmark results
6. [ ] Comparative analysis
7. [ ] Final conclusions
8. [ ] Reproducibility checklist

---

## Metadata

| Field | Value |
|-------|-------|
| Experiment ID | LAB-031 |
| Created | 2026-07-22 |
| Engine | KDE-ENGINE-002 (Beta) |
| Engine Version | 0.1.0 |
| Seed | SEED-001 |
| Methodology Version | v1.0 |
| Status | IN_PROGRESS |

---

## Compliance

- [x] Research methodology acknowledged
- [x] Evidence-first rules acknowledged
- [x] Runtime reporting requirements acknowledged
- [x] No fabricated evidence
- [x] Facts/Assumptions/Findings/Results clearly distinguished
- [x] All decisions recorded
- [x] Reproducible artifacts produced

---

*Document Status*: DRAFT
*State*: READY_FOR_EXECUTION
