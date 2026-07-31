# Architecture C: Hybrid Investigation-Experiment Model

**Subject**: INV-001 (What is Knowledge?)
**Content Source**: Based on Architecture A/B content

## Directory Structure

```
laboratory/
├── investigations/        # Scientific ownership
│   └── INV-001/
│       ├── investigation.md    # Question, hypothesis, scope (828 lines)
│       ├── status.md          # Current state tracking
│       └── links/
│           ├── LAB-001.md     # Link to experiment
│           ├── LAB-002.md
│           ├── LAB-003.md
│           └── LAB-004.md
├── experiments/           # Execution ownership
│   ├── LAB-001/
│   │   ├── experiment.md  # Self-contained experiment
│   │   ├── runs/
│   │   ├── evidence/
│   │   └── metadata/
│   │       ├── question-id: INV-001
│   │       └── scope: full
│   ├── LAB-002/
│   └── ...
└── evidence/              # Evidence registry (links only)
    ├── LAB-001/
    │   └── index.md       # Points to experiment evidence
    └── LAB-002/
        └── index.md
```

## Artifacts Located

| Artifact | Path | Lines | Ownership |
|----------|------|-------|-----------|
| Investigation | investigations/INV-001/investigation.md | 828 | Investigation |
| Status | investigations/INV-001/status.md | 20 | Investigation |
| Links | investigations/INV-001/links/*.md | 10 | Investigation |
| LAB-001 | experiments/LAB-001/ | 147 | Experiment |
| LAB-002 | experiments/LAB-002/ | 147 | Experiment |
| LAB-003 | experiments/LAB-003/ | 147 | Experiment |
| LAB-004 | experiments/LAB-004/ | 147 | Experiment |
| Evidence index | evidence/LAB-001/index.md | 5 | Registry |

**Total Files**: ~1450 lines, clear ownership boundaries

## Task 1: Locate Artifacts for Question

### Task 1.1: Find all artifacts related to INV-001

**Procedure**:
1. Navigate to investigations/INV-001/
2. Open investigation.md for full question
3. Open links/ directory
4. Follow links to each experiment

**Measurements**:
- Directories visited: 2 (investigation + links)
- Files to open: investigation.md + 4 link files
- Cross-references: Explicit links in links/ directory

**Complexity**: Low - investigation provides complete navigation

### Task 1.2: Find specific experiment LAB-001

**Procedure**:
1. Navigate to investigations/INV-001/links/
2. Open LAB-001.md
3. Follow link to experiments/LAB-001/

**Measurements**:
- Directories visited: 2
- Files opened: 2 (link file + experiment)

**Complexity**: Low - bidirectional link available

## Task 2: Reconstruct Reasoning Chain

### Task 2.1: Reconstruct complete INV-001 reasoning

**Procedure**:
1. Open investigation.md - full question and scope
2. Open links/*.md - enumerate all related experiments
3. For each experiment: open, review evidence
4. Cross-reference with knowledge/KDE-001.md

**Findings**:
- Complete: Investigation contains full question
- Linked: All experiments linked via links/
- Cross-reference: Can verify against knowledge/
- No duplication: Investigation ≠ Knowledge

**Measurements**:
- Files in investigation: 6 (investigation + status + links)
- Files to cross-reference: 4 experiments + knowledge/
- Duplications: None
- Missing links: None

## Task 3: LLM Context Reconstruction

### Task 3.1: Load investigation into LLM

**Context Size Estimate**:
- Investigation: ~25KB
- Links: ~1KB
- Experiments (4): ~60KB
- **Total**: ~86KB (more content, but well-organized)

**Context Reconstruction Quality**:
- Question clear: Yes (investigation.md)
- Experiments linked: Yes (links/ directory)
- Evidence linked: Yes (via experiments)
- Knowledge connection: Explicit via cross-reference

**Missing Context**:
- None identified - all artifacts accessible

## Task 4: Knowledge Promotion

### Task 4.1: Promote investigation to knowledge

**Procedure**:
1. Review investigation.md for validation
2. Aggregate evidence from linked experiments
3. Copy validated content to /knowledge/
4. Update investigation status to PROMOTED
5. Knowledge naturally relates to investigation (same ID)

**Complexity**: Low-Medium
- Review: investigation.md contains all context
- Aggregation: Via links/, explicit
- Update: investigation status + knowledge creation

**Traceability**: Excellent
- Investigation → Experiments → Evidence → Knowledge
- Bidirectional links maintain trace

## Task 5: Add New Experiment

### Task 5.1: Add LAB-005 to investigation

**Procedure**:
1. Create experiments/LAB-005/
2. Create experiment.md
3. Add metadata with question-id: INV-001
4. Create investigations/INV-001/links/LAB-005.md
5. Update investigations/INV-001/status.md

**Changes Required**:
- New directory: experiments/LAB-005/
- New files: experiment.md + metadata/
- New link: investigations/INV-001/links/LAB-005.md
- Update: investigation status

**Complexity**: Low-Medium
- Clear ownership: experiment owns execution
- Clear linkage: bidirectional links maintained
- Status tracking: automatic via update

## Architecture C Summary

| Metric | Score | Notes |
|--------|-------|-------|
| Directories visited | 2-3 | Investigation + links |
| Files to manage | 7 | Investigation + 4 experiments + links + registry |
| Cross-ref complexity | Low | Bidirectional explicit links |
| Knowledge promotion | Simple | Investigation aggregation |
| Adding experiments | Low-Medium | Link maintenance |
| Duplication risk | Low | Investigation ≠ Knowledge |

## Strengths

1. Clear ownership: Investigation = WHY, Experiment = HOW
2. Bidirectional links provide complete traceability
3. No deep nesting - flat experiment structure
4. Evidence stays with experiments (reproducibility)
5. Investigation provides central navigation
6. Natural aggregation for knowledge promotion

## Weaknesses

1. More files than A or B alone
2. Link maintenance requires discipline
3. Two structures to understand (investigations + experiments)

## Key Observation

Architecture C optimizes for **both question-driven discovery AND experiment reproducibility**. It achieves this by:
- Keeping investigations for scientific purpose
- Keeping experiments self-contained for reproducibility
- Using links to bridge the two structures

## Comparison to Predictions (from LAB-020)

| Prediction | Architecture C Performance |
|------------|---------------------------|
| Better traceability | ✅ Confirmed - bidirectional links |
| Better navigation | ✅ Confirmed - investigation provides central hub |
| Better reproducibility | ✅ Confirmed - experiments self-contained |
| Simpler knowledge promotion | ✅ Confirmed - investigation aggregates |
| Lower duplication | ✅ Confirmed - investigation ≠ knowledge |
| Clear ownership | ✅ Confirmed - WHY vs HOW separation |
