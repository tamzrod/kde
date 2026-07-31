# Architecture A: Investigation-Centric Model

**Subject**: INV-001 (What is Knowledge?)
**Content Source**: /laboratory/investigations/INV-001/question.md

## Directory Structure

```
laboratory/
└── investigations/
    └── INV-001/
        ├── question.md       # Research question (828 lines)
        ├── experiments/      # Nested experiments
        │   ├── LAB-001/
        │   ├── LAB-002/
        │   ├── LAB-003/
        │   └── LAB-004/
        └── evidence/         # Investigation evidence
            └── index.md
```

## Artifacts Located

| Artifact | Path | Lines |
|----------|------|-------|
| Question | question.md | 828 |
| LAB-001 | experiments/LAB-001/ | 147 |
| LAB-002 | experiments/LAB-002/ | 147 |
| LAB-003 | experiments/LAB-003/ | 147 |
| LAB-004 | experiments/LAB-004/ | 147 |
| Evidence | evidence/ | 50 |

**Total Files**: 6 directories, ~1300 lines of content

## Task 1: Locate Artifacts for Question

### Task 1.1: Find all artifacts related to INV-001

**Procedure**:
1. Navigate to investigations/
2. Navigate to INV-001/
3. Open question.md
4. To find experiments: navigate to experiments/
5. To find evidence: navigate to evidence/

**Measurements**:
- Directories visited: 4
- Files opened: 1 (question.md) + 4 (experiments) + 1 (evidence) = 6
- Cross-references to follow: experiments/ folder, evidence/ folder

**Complexity**: Moderate - investigation owns everything

### Task 1.2: Find specific experiment LAB-001

**Procedure**:
1. Navigate to investigations/INV-001/experiments/
2. Navigate to LAB-001/
3. Open experiment.md

**Measurements**:
- Directories visited: 4
- Files opened: 1

**Complexity**: Low - experiment is nested under investigation

## Task 2: Reconstruct Reasoning Chain

### Task 2.1: Reconstruct complete INV-001 reasoning

**Procedure**:
1. Open question.md - contains full investigation
2. Check experiments/ for supporting experiments
3. Check evidence/ for supporting evidence
4. Cross-reference with knowledge/KDE-001.md

**Findings**:
- Missing: No explicit link to /knowledge/KDE-001.md
- Duplicated: Question content appears in both INV-001/question.md and knowledge/001-what-is-knowledge.md
- Ambiguity: Is LAB-001 part of INV-001 or separate?

**Measurements**:
- Files in investigation: 6
- Files to cross-reference outside: 1 (knowledge/)
- Duplications detected: 1
- Missing links: 1

## Task 3: LLM Context Reconstruction

### Task 3.1: Load investigation into LLM

**Context Size Estimate**:
- question.md: ~25KB
- experiments: ~20KB
- evidence: ~5KB
- **Total**: ~50KB

**Context Reconstruction Quality**:
- Question clear: Yes
- Experiments linked: Implicit (folder structure)
- Evidence linked: Implicit (folder structure)
- Knowledge connection: Unclear (separate directory)

**Missing Context**:
- No explicit link to /knowledge/
- Relationship to other investigations unclear

## Task 4: Knowledge Promotion

### Task 4.1: Promote INV-001 to knowledge

**Procedure**:
1. Review investigation for validation criteria
2. Copy validated content to /knowledge/
3. Update investigation state to PROMOTED
4. Create cross-reference

**Complexity**: Medium
- Review: Requires reading ~828 lines
- Copy: Simple file move/copy
- Update: Requires updating 2 files (investigation + knowledge)

**Traceability**: Clear - investigation → knowledge

## Task 5: Add New Experiment

### Task 5.1: Add LAB-005 to INV-001

**Procedure**:
1. Navigate to investigations/INV-001/experiments/
2. Create LAB-005/
3. Create experiment.md
4. Add experiment to investigation

**Changes Required**:
- New directory: investigations/INV-001/experiments/LAB-005/
- New files: experiment.md
- Update: investigation question.md (optional)

**Complexity**: Low - experiment nested in investigation

## Architecture A Summary

| Metric | Score | Notes |
|--------|-------|-------|
| Directories visited | 4 | Moderate nesting |
| Files to manage | 6 | Per investigation |
| Cross-ref complexity | Medium | Folder structure implicit |
| Knowledge promotion | 2 files | Investigation + knowledge |
| Adding experiments | Low effort | Nested structure |
| Duplication risk | High | Question ↔ Knowledge |

## Strengths

1. All investigation content co-located
2. Clear ownership: investigation owns everything
3. Natural scientific workflow
4. Easy to understand structure

## Weaknesses

1. Deep nesting for large investigations
2. Question ↔ Knowledge duplication
3. Experiments appear both nested AND in flat /experiments/
4. No bidirectional links to experiments
