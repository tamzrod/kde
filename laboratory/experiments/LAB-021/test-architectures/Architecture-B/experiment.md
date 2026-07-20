# Architecture B: Experiment-Centric Model

**Subject**: INV-001 (What is Knowledge?)
**Content Source**: Based on Architecture A content

## Directory Structure

```
laboratory/
└── experiments/           # Primary organizational unit
    ├── LAB-001/
    │   ├── experiment.md  # Self-contained experiment
    │   ├── runs/
    │   ├── evidence/
    │   └── metadata/
    │       ├── question-id: INV-001
    │       └── investigation-notes.md
    ├── LAB-002/
    ├── LAB-003/
    └── LAB-004/
└── investigations/        # Reference only (linked from experiments)
    └── INV-001/
        └── questions.md   # Questions (reference)
└── questions/
    └── index.md           # Master question list
```

## Artifacts Located

| Artifact | Path | Lines |
|----------|------|-------|
| LAB-001 | experiments/LAB-001/ | 147 |
| LAB-002 | experiments/LAB-002/ | 147 |
| LAB-003 | experiments/LAB-003/ | 147 |
| LAB-004 | experiments/LAB-004/ | 147 |
| Question (metadata) | experiments/LAB-001/metadata/investigation-notes.md | 10 |
| Questions reference | investigations/INV-001/questions.md | 50 |

**Total Files**: 5 directories, ~650 lines + metadata

## Task 1: Locate Artifacts for Question

### Task 1.1: Find all artifacts related to INV-001

**Procedure**:
1. Navigate to questions/index.md
2. Find INV-001 reference
3. Search experiments/ for metadata containing INV-001
4. Navigate to each experiment with INV-001 in metadata

**Measurements**:
- Directories visited: 2-5 (depending on search method)
- Files to search: All experiments (19 total) OR questions/index.md + experiment metadata
- Cross-references: metadata search

**Complexity**: High - must search or maintain index

### Task 1.2: Find specific experiment LAB-001

**Procedure**:
1. Navigate to experiments/LAB-001/
2. Open experiment.md
3. Read metadata to confirm relates to INV-001

**Measurements**:
- Directories visited: 1
- Files opened: 1

**Complexity**: Low - experiment is self-contained

## Task 2: Reconstruct Reasoning Chain

### Task 2.1: Reconstruct complete INV-001 reasoning

**Procedure**:
1. Start from question index
2. Find experiments with INV-001 metadata
3. Gather evidence from each experiment
4. Synthesize reasoning chain

**Findings**:
- Missing: Question content fragmented (no single source)
- Duplicated: Evidence may exist in multiple experiments
- Ambiguity: How to synthesize? No guidance in structure

**Measurements**:
- Files to aggregate: 4 experiments + question reference
- Aggregation logic: Must be manual or scripted
- Missing artifacts: Question full content not in experiments

## Task 3: LLM Context Reconstruction

### Task 3.1: Load investigation into LLM

**Context Size Estimate**:
- Experiments (4): ~60KB total
- Question metadata: ~1KB
- **Total**: ~61KB

**Context Reconstruction Quality**:
- Question clear: Partial (metadata only)
- Experiments linked: Yes (metadata)
- Evidence linked: Yes (within experiments)
- Knowledge connection: Via metadata

**Missing Context**:
- Full question text not in experiment context
- Relationship between experiments unclear
- No single "investigation" to load

## Task 4: Knowledge Promotion

### Task 4.1: Promote investigation to knowledge

**Procedure**:
1. Aggregate evidence from all INV-001 experiments
2. Synthesize conclusion
3. Create /knowledge/ entry
4. Update experiment metadata

**Complexity**: High
- Aggregation: Must collect from multiple experiments
- Synthesis: Manual work
- Update: Multiple metadata files

**Traceability**: Fragmented - experiments → synthesis → knowledge

## Task 5: Add New Experiment

### Task 5.1: Add LAB-005 to investigation

**Procedure**:
1. Navigate to experiments/
2. Create LAB-005/
3. Create experiment.md
4. Create metadata with question-id: INV-001
5. Update questions/index.md

**Changes Required**:
- New directory: experiments/LAB-005/
- New files: experiment.md + metadata/investigation-notes.md
- Update: questions/index.md

**Complexity**: Medium - must maintain metadata linkage

## Architecture B Summary

| Metric | Score | Notes |
|--------|-------|-------|
| Directories visited | 2-5 | Search required |
| Files to manage | 5+ | Per investigation |
| Cross-ref complexity | High | Metadata search |
| Knowledge promotion | Multiple | Aggregation required |
| Adding experiments | Medium effort | Metadata maintenance |
| Duplication risk | Low | No question duplication |

## Strengths

1. Self-contained experiments (maximum reproducibility)
2. Clear ownership: experiment owns everything
3. No deep nesting
4. Easy to find specific experiments

## Weaknesses

1. Question content not centrally located
2. Aggregation required for investigations
3. Metadata maintenance burden
4. No natural investigation history
5. Question drift risk (experiments may drift from question)

## Key Observation

Architecture B is optimized for **experiments as units of work**, not **investigations as units of knowledge**. This creates friction for question-driven research.
