<!-- KDE_RUNTIME_AUTHENTICITY: GENERIC_AI_WITH_KDE_FORMAT -->
# INV-058: Skills Layer vs Expert Layer - Architectural Analysis

**Status**: INVESTIGATION  
**Parent**: INV-057  
**Created**: 2026-07-28  
**Source**: INV-057 follow-up (caveman patterns)  
**Investigator**: OpenHands Agent

---

## Summary

[INFERENCE: This investigation analyzes the relationship between the Skills Layer (runtime/skills/) and the Expert Layer (experts/) to determine whether they represent distinct architectural concepts, overlapping responsibilities, or the same capability under different terminology.]

## Background

During INV-057, the caveman patterns were recommended for integration into the Skills Layer. This raised a question: what is the relationship between the Skills Layer and the Expert Layer?

[EVIDENCE: /workspace/project/kde/runtime/skills/ - Runtime Skill Loader]
[EVIDENCE: /workspace/project/kde/experts/ - KDE Experts system]

---

## Concept Definitions

### Skills Layer

[EVIDENCE: /workspace/project/kde/runtime/skills/loader.py]

| Aspect | Definition |
|--------|------------|
| **Purpose** | Dynamic skill loading for the KDE Runtime |
| **Trigger** | Task triggers (e.g., "new_investigation", "continuation") |
| **Lifecycle** | DRAFT → EXPERIMENTAL → VALIDATED → PROMOTED → DEPRECATED → ARCHIVED |
| **Produces** | Context contributions (instructions, workflows, constraints, examples) |
| **Dependencies** | Resolves skill dependencies, builds execution context |
| **Usage** | "The Runtime SHALL: 1. Identify task, 2. Determine required skills, 3. Load selected skills, 4. Construct engine context" |

### Expert Layer

[EVIDENCE: /workspace/project/kde/experts/_lifecycle.md]

| Aspect | Definition |
|--------|------------|
| **Purpose** | Domain expert knowledge bases for the Knowledge Discovery Engine |
| **Trigger** | Domain-specific tasks (e.g., "Render CB-101", "DNP3 protocol") |
| **Lifecycle** | SYNTHESIZED → CANDIDATE → VALIDATED → REGISTERED → ACTIVE |
| **Produces** | Structured results with confidence, decisions, validation |
| **Dependencies** | Knowledge references, interface contracts |
| **Usage** | "Engine identifies task domain, selects expert from registry, loads expert interface + knowledge, invokes expert" |

---

## Comparative Analysis

### Side-by-Side Comparison

| Dimension | Skills Layer | Expert Layer |
|-----------|--------------|--------------|
| **Primary Purpose** | Runtime task execution | Domain knowledge access |
| **Scope** | Workflow, procedures, constraints | Domain rules, standards, best practices |
| **Lifecycle** | DRAFT → PROMOTED | SYNTHESIZED → ACTIVE |
| **Trigger** | Task triggers (investigation type) | Domain identification |
| **Output** | Context contributions | Structured results + confidence |
| **Consumer** | Runtime/Orchestrator | Engines |
| **Example** | "/squash", "/compress" | "DNP3-EXPERT-001", "KDE-EXPERT-001" |
| **Location** | `/runtime/skills/` | `/experts/` |

### Conceptual Mapping

| Skills Layer Concept | Expert Layer Equivalent |
|---------------------|------------------------|
| `SkillMetadata` | `Expert` with `interface.yaml` |
| `SkillStatus` | Expert lifecycle states |
| `SkillLoader` | `ExpertRegistry` + invocation |
| `context_contributions` | Domain knowledge + rules |
| `triggers` | Domain identification |
| `dependencies` | `knowledge_refs` |

---

## Architectural Relationship

### Option A: Distinct Concepts

**Thesis**: Skills and Experts serve fundamentally different purposes.

| Skills Layer Is For | Expert Layer Is For |
|---------------------|---------------------|
| How to execute tasks | What domain knowledge exists |
| Procedures and workflows | Rules and standards |
| Runtime orchestration | Knowledge discovery |
| "Do X using Y" | "Y contains Z rules" |

**Evidence Supporting**:
- Skills produce context (instructions, constraints)
- Experts produce results (decisions, validations)
- Skills are consumed by Runtime
- Experts are consumed by Engines

### Option B: Overlapping Responsibilities

**Thesis**: Both handle task-specific knowledge with similar patterns.

| Shared Concern | Skills Layer Handling | Expert Layer Handling |
|----------------|----------------------|----------------------|
| Task identification | triggers | domain |
| Knowledge dependency | required_knowledge | knowledge_refs |
| Version control | version | interface.yaml |
| Lifecycle management | SkillStatus | Expert lifecycle |

**Evidence Supporting**:
- Both have metadata, versioning, dependencies
- Both have lifecycle management
- Both contribute to execution context
- Both are registered and discoverable

### Option C: Same Capability, Different Names

**Thesis**: "Skills" and "Experts" are the same architectural pattern under different terminology.

| If Same | Evidence |
|---------|----------|
| What changes? | Names, not structure |
| Why two names? | Historical evolution |
| Can they merge? | Potentially, with migration |

**Evidence Against**:
- Different lifecycle states
- Different output formats
- Different consumers (Runtime vs Engines)
- Different lifecycle ownership

---

## Decision: Overlapping Responsibilities with Distinct Purposes

[INFERENCE: The Skills Layer and Expert Layer represent overlapping architectural patterns with distinct purposes. They are not the same capability, but they share concerns about task identification, knowledge dependencies, and lifecycle management.]

### Architectural Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    KDE ARCHITECTURE                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────┐         ┌─────────────────┐                │
│  │   Skills Layer  │         │   Expert Layer  │                │
│  │                 │         │                 │                │
│  │ Purpose:        │         │ Purpose:        │                │
│  │ Runtime task    │         │ Domain knowledge │               │
│  │ execution       │         │ access          │                │
│  │                 │         │                 │                │
│  │ Produces:       │         │ Produces:       │                │
│  │ Context for     │         │ Results for     │                │
│  │ Runtime         │         │ Engines         │                │
│  │                 │         │                 │                │
│  │ Examples:       │         │ Examples:       │                │
│  │ /squash         │         │ DNP3-EXPERT-001 │                │
│  │ /compress       │         │ KDE-EXPERT-001  │                │
│  └────────┬────────┘         └────────┬────────┘                │
│           │                           │                          │
│           │         OVERLAP          │                          │
│           │  ┌─────────────────────┐  │                          │
│           └──│ Metadata, Version, │──┘                          │
│              │ Dependencies,       │                             │
│              │ Triggers, Registry  │                             │
│              └─────────────────────┘                             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Shared Concerns

| Concern | Skills Layer | Expert Layer |
|---------|--------------|--------------|
| Metadata | `SkillMetadata` | `interface.yaml` |
| Versioning | Semantic | Semantic |
| Dependencies | `required_knowledge` | `knowledge_refs` |
| Triggers | `triggers` | `domain` |
| Registry | `SkillRegistry` | `ExpertRegistry` |
| Lifecycle | Status-based | State-based |

### Distinct Purposes

| Purpose | Skills Layer | Expert Layer |
|---------|--------------|--------------|
| **Goal** | Execute tasks efficiently | Access domain knowledge |
| **Output** | Context contributions | Structured results |
| **Confidence** | N/A | HIGH/MEDIUM/LOW |
| **Validation** | Via status | Via `validation` object |
| **Consumer** | Runtime | Engines |

---

## Impact on KDE Architecture

### Current State Assessment

| Component | Status | Analysis |
|-----------|--------|----------|
| Skills Layer | Implemented | `/runtime/skills/loader.py` |
| Expert Layer | Implemented | `/experts/` directory |
| Integration | Separate | No direct coupling |
| Consolidation | Not needed | Distinct purposes |

### Architectural Friction Points

| Issue | Description | Severity |
|-------|-------------|----------|
| **Terminology confusion** | Two similar patterns with different names | LOW |
| **Lifecycle divergence** | Different state machines | MEDIUM |
| **Knowledge duplication** | `required_knowledge` vs `knowledge_refs` | MEDIUM |
| **Registry separation** | Two registries for similar data | LOW |

### Recommendations

#### Option 1: Keep Separate (Status Quo)

| Pros | Cons |
|------|------|
| Clear purpose distinction | Terminology confusion |
| Independent evolution | Potential knowledge duplication |
| Matches current usage | Two registries to maintain |

**Recommendation**: Keep separate if the layers continue to serve distinct purposes.

#### Option 2: Unify Under Skills

| Pros | Cons |
|------|------|
| Single registry | Migration effort |
| Consistent terminology | Risk of breaking changes |
| Simplified architecture | Need to reconcile outputs |

**Recommendation**: Consider unification if the layers converge in purpose.

#### Option 3: Bridge with Integration Layer

| Pros | Cons |
|------|------|
| Preserve distinction | Additional complexity |
| Enable cross-referencing | Two registries remain |
| Clear boundaries | Integration maintenance |

**Recommendation**: Add integration if cross-layer dependencies emerge.

---

## Impact on Caveman Adoption

Based on the analysis:

| Caveman Pattern | Target Layer | Rationale |
|-----------------|--------------|-----------|
| Squash Over Read | **Skills Layer** | Runtime task execution, not domain knowledge |
| Diff Over Re-Read | **Orchestrator** | Workspace coordination |
| Skip Unchanged Context | **Retrieval Engine** | Retrieval optimization |
| Compress Before Reference | **Retrieval Engine** | Same rationale |

**Note**: The caveman patterns do NOT belong in the Expert Layer because:
- Experts provide domain knowledge (DNP3, SLD, Governance)
- Caveman patterns provide runtime efficiency
- The layers serve different consumers (Engines vs Runtime)

---

## Conclusion

[INFERENCE: The Skills Layer and Expert Layer represent overlapping architectural patterns (metadata, versioning, dependencies, lifecycle) with distinct purposes (runtime execution vs. domain knowledge). They are not the same capability, nor are they completely distinct — they share concerns but serve different roles in the KDE architecture.]

### Key Findings

1. **Not the same capability**: Different outputs, consumers, and purposes
2. **Not completely distinct**: Share metadata, versioning, dependency patterns
3. **Architectural overlap**: Lifecycle management, registry patterns
4. **Clear distinction**: Skills → Runtime; Experts → Engines

### Architectural Recommendation

| Recommendation | Rationale |
|----------------|----------|
| Keep separate | Distinct purposes justify separation |
| Document overlap | Reduce confusion with clear definitions |
| Bridge if needed | Integration layer for cross-layer dependencies |

---

## Evidence

[EVIDENCE: /workspace/project/kde/runtime/skills/loader.py - SkillLoader, SkillRegistry, SkillMetadata]
[EVIDENCE: /workspace/project/kde/experts/_lifecycle.md - Expert lifecycle and invocation]
[EVIDENCE: /workspace/project/kde/experts/_template/interface.yaml - Expert interface definition]
[EVIDENCE: /workspace/project/kde/experts/README.md - Expert registry]
[EVIDENCE: INV-057]

## Next Steps

1. Human review of architectural analysis
2. If clarification needed: Create architectural decision record
3. If divergence needed: Propose consolidation plan
4. If separation confirmed: Document boundaries

---

**Document Status**: INVESTIGATION  
**Human Review Required**: Yes  
**Blocking**: Cannot self-approve (Principle 2)
