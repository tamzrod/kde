<!-- KDE_RUNTIME_AUTHENTICITY: GENERIC_AI_WITH_KDE_FORMAT -->
# INV-060: Critical Evaluation of the Skills Layer Architecture

**Status**: INVESTIGATION  
**Parent**: INV-059  
**Created**: 2026-07-28  
**Source**: INV-059 follow-up  
**Investigator**: OpenHands Agent

---

## Summary

[INFERENCE: This investigation critically evaluates whether the Skills Layer represents a necessary architectural primitive or whether it is an unnecessary abstraction layer that duplicates functionality already provided by SOPs, the Retrieval Engine, and other existing components.]

## Background

From INV-057 to INV-059, the caveman patterns were proposed for integration into the Skills Layer. This raises a fundamental architectural question: is the Skills Layer a necessary primitive, or can its responsibilities be absorbed by existing layers?

[EVIDENCE: /workspace/project/kde/runtime/skills/registry.json - Skills Registry]
[EVIDENCE: /workspace/project/kde/runtime/sop005.py - SOP-005 Executor]
[EVIDENCE: /workspace/project/kde/runtime/retrieval.py - Retrieval Engine]
[EVIDENCE: INV-057, INV-058, INV-059]

---

## Critical Analysis: What Does the Skills Layer Actually Do?

### Skills Registry Contents

[EVIDENCE: /workspace/project/kde/runtime/skills/registry.json]

| Skill ID | Name | Description | Wraps |
|----------|------|-------------|-------|
| skill-investigation-planning | Investigation Planning | Plans investigations following SOP-001 | **SOP-001** |
| skill-experiment-design | Experiment Design | Designs experiments following SOP-002 | **SOP-002** |
| skill-knowledge-retrieval | Knowledge Retrieval | Retrieves using SOP-005 | **SOP-005 + RetrievalEngine** |
| skill-evidence-collection | Evidence Collection | Collects evidence following SOP-004 | **SOP-004** |
| skill-decision-attribution | Decision Attribution | Attributes decisions with evidence | **runtime/attribution.py** |
| skill-artifact-traceability | Artifact Traceability | Maintains traceability | **KDE-ARCH-005, ARCH-006** |
| skill-governance-review | Governance Review | Facilitates governance approval | **SOP-006, SOP-007** |
| skill-frontend-design | Frontend Design | Produces frontend interfaces | **External skill** |

### Observation: Skills Are Procedural Wrappers

**Every Skill in the registry is a wrapper around existing KDE components:**

| Skill | What It Wraps | What It Adds |
|-------|---------------|--------------|
| Investigation Planning | SOP-001 | Context contributions (instructions, workflow, constraints) |
| Experiment Design | SOP-002 | Context contributions |
| Knowledge Retrieval | SOP-005 + RetrievalEngine | Context contributions |
| Evidence Collection | SOP-004 | Context contributions |
| Decision Attribution | runtime/attribution.py | Context contributions |
| Artifact Traceability | KDE-ARCH-005 | Context contributions |

**What are "context contributions"?**
```python
"context_contributions": {
    "instructions": "Follow SOP-001 Investigation Lifecycle...",
    "workflow": [...],
    "constraints": [...],
    "examples": [...]
}
```

---

## Architectural Overlap Analysis

### Overlap Map

```
┌─────────────────────────────────────────────────────────────────┐
│                    ARCHITECTURAL OVERLAPS                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Skills Layer                                                     │
│       │                                                           │
│       ├── skill-investigation-planning                          │
│       │        ↓                                                  │
│       │   SOP-001 (Investigation Lifecycle)                      │
│       │        ↓                                                  │
│       │   Laboratory (executes investigations)                    │
│       │                                                           │
│       ├── skill-knowledge-retrieval                              │
│       │        ↓                                                  │
│       │   SOP-005 (Retrieval Policy)                              │
│       │        ↓                                                  │
│       │   RetrievalEngine (actual retrieval)                     │
│       │                                                           │
│       ├── skill-evidence-collection                              │
│       │        ↓                                                  │
│       │   SOP-004 (Evidence Standards)                           │
│       │        ↓                                                  │
│       │   Laboratory (collects evidence)                         │
│       │                                                           │
│       └── skill-decision-attribution                             │
│                ↓                                                  │
│           runtime/attribution.py                                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Specific Overlaps

#### 1. Skills vs SOPs

| Aspect | Skills | SOPs |
|-------|-------|------|
| **Purpose** | "Context contributions" | Procedural guidance |
| **Content** | Instructions, workflow, constraints | Step-by-step procedures |
| **Format** | JSON context_contributions | Markdown documents |
| **Lifecycle** | DRAFT → PROMOTED | Defined in governance |
| **Duplication?** | YES - Same information, different format | - |

**Evidence**: 
- skill-investigation-planning: "Follow SOP-001 Investigation Lifecycle"
- skill-experiment-design: "Apply SOP-002 Experiment Lifecycle"

#### 2. skill-knowledge-retrieval vs SOP-005 + RetrievalEngine

| Aspect | Skill | What It Calls |
|--------|-------|---------------|
| **Does it retrieve?** | NO - just instructs to use SOP-005 | SOP-005 evaluates context |
| **Does it retrieve artifacts?** | NO - just instructs | RetrievalEngine does actual retrieval |
| **Value added?** | Ambiguous | - |

**Evidence**: skill-knowledge-retrieval says "Execute Knowledge-on-Demand retrieval using SOP-005 matrix" but doesn't actually execute anything - it just adds context instructions.

#### 3. Skills vs Runtime ECU

| Aspect | Skills | ECU |
|--------|--------|-----|
| **SkillLoader** | Selects skills based on triggers | ECU has resolver for capabilities |
| **Context building** | Combines skill context contributions | Builds investigation context |
| **Execution planning** | Via skills | ECU.planner does this |

**Evidence**: SkillLoader.build_context() produces context; RuntimeECU.initialize() produces context. Both are investigating context.

---

## Architectural Friction Points

### Friction 1: Information Duplication

| Skill Says | SOP Says |
|-----------|----------|
| "Follow SOP-001 Investigation Lifecycle with 6 phases" | SOP-001 defines the 6 phases |
| "Apply SOP-002 Experiment Lifecycle" | SOP-002 defines the lifecycle |
| "Apply SOP-004 Evidence Standards" | SOP-004 defines the standards |

**Question**: Why have both? Why not reference the SOP directly?

### Friction 2: Layer Ambiguity

| Question | Answer |
|----------|--------|
| Who executes investigations? | Laboratory / Delta Engine |
| Who retrieves knowledge? | Retrieval Engine |
| Who evaluates SOP-005? | SOP005Executor |
| Who uses Skills? | Runtime (SkillLoader) |
| What do Skills actually execute? | Nothing - they provide context |

### Friction 3: Purpose Confusion

The SkillLoader says:
```
The Runtime SHALL:
1. Identify engineering task
2. Determine required skills
3. Resolve dependencies
4. Load selected skills
5. Construct engine context
6. Execute Engine

No Engine modifications are permitted.
```

But:
- Skills don't execute - they contribute context
- The "Engine" (Delta, etc.) executes
- Skills are just instruction aggregators

---

## Challenge: Is the Skills Layer Necessary?

### The Null Hypothesis

**The Skills Layer may be unnecessary if:**
1. SOPs provide procedural guidance (already exists)
2. The Retrieval Engine provides knowledge retrieval (already exists)
3. The Runtime ECU provides execution planning (already exists)
4. The Orchestrator provides workspace coordination (already exists)

**What does the Skills Layer add?**
- Context contributions (instructions, workflow, constraints, examples)
- Trigger-based skill selection
- Dependency resolution

**Can these be absorbed?**
- Instructions → Reference SOPs directly
- Triggers → Map directly to investigation types
- Dependencies → SOPs already have dependencies

### Alternative: SOPs as the Source of Truth

If Skills just wrap SOPs, why not:

```
┌─────────────────────────────────────────────────────────────────┐
│                    PROPOSED SIMPLIFICATION                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Investigation Type → SOP Selector → Execute SOP → Build Context  │
│                                                                  │
│  No Skills Layer needed - SOPs ARE the skills                    │
│                                                                  │
│  Current:                                                          │
│  Trigger → Skill Selection → Skill Context → SOP Execution         │
│           ↑                                                           │
│           Duplication                                               │
│                                                                  │
│  Proposed:                                                         │
│  Investigation Type → SOP Selector → SOP Context + Execution    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Alternative Interpretations

### Alternative A: Skills Are a User Interface Layer

**Thesis**: Skills provide a human-friendly interface to complex procedures.

| Interpretation | Analysis |
|---------------|----------|
| Skills are triggers | Humans invoke "/skill-investigation-planning" |
| SOPs are implementation | Machines follow SOP-001 |
| Skills are shortcuts | Abbreviated references to full SOPs |

**Evidence**: The `frontend-design` skill references an external skill, suggesting Skills might be integration points.

### Alternative B: Skills Provide Context Merging

**Thesis**: Skills aggregate context from multiple sources (SOPs, knowledge, constraints).

| Interpretation | Analysis |
|---------------|----------|
| Skills merge | Instructions + SOPs + Knowledge + Constraints |
| Output is combined | `context_contributions` |
| Single invocation | vs multiple SOP lookups |

**Evidence**: SkillLoader.build_context() combines contributions from multiple skills.

### Alternative C: Skills Are Versioned Procedure References

**Thesis**: Skills pin specific versions of procedures, enabling reproducibility.

| Interpretation | Analysis |
|---------------|----------|
| Skills version SOPs | "SOP-001 v1.2" vs latest |
| Enables audit | What procedure was used when? |
| Reproducibility | Same skill = same behavior |

**Evidence**: Each skill has version, source, validation_evidence fields.

---

## Assessment: Is Skills Layer Necessary?

### Evidence For Necessity

| Evidence | Weight | Interpretation |
|----------|--------|----------------|
| Skills exist | Medium | Architectural artifact |
| Has lifecycle | Medium | Like other KDE components |
| Provides context | Low | Just SOP references |
| Trigger-based | Low | Could be investigation type |

### Evidence Against Necessity

| Evidence | Weight | Interpretation |
|----------|--------|----------------|
| Skills wrap SOPs | HIGH | Duplication |
| No execution | HIGH | Just context, not action |
| RetrievalEngine exists | HIGH | Already does retrieval |
| Attribution exists | HIGH | Already does attribution |

### Finding: Architectural Primitive vs Convenience Wrapper

[INFERENCE: The Skills Layer is more likely a convenience wrapper than a necessary architectural primitive. Its core value appears to be providing trigger-based access to SOPs and aggregating their context contributions, but this functionality could potentially be absorbed by existing layers.]

---

## Impact Analysis: If Skills Layer Were Removed

### What Would Need to Change

| If Skills Removed | Absorbed By | Risk |
|-------------------|------------|------|
| Trigger-based selection | Investigation types | LOW |
| Context merging | Runtime ECU | MEDIUM |
| Investigation planning skill | SOP-001 directly | LOW |
| Knowledge retrieval skill | Retrieval Engine + SOP-005 | LOW |
| Evidence collection skill | SOP-004 + Laboratory | LOW |

### What Could Stay the Same

| Component | Reason to Keep |
|-----------|----------------|
| SOPs | Source of procedural truth |
| RetrievalEngine | Actual retrieval implementation |
| Runtime ECU | Execution control |
| Experts | Domain knowledge (INV-058 confirmed) |

### Migration Path

1. **Phase 1**: Deprecate Skills Layer
2. **Phase 2**: Map investigation types directly to SOPs
3. **Phase 3**: Runtime ECU builds context from SOPs
4. **Phase 4**: Remove Skills Layer

---

## Conclusion

[INFERENCE: The Skills Layer appears to be a convenience wrapper rather than a necessary architectural primitive. Its primary function - providing "context contributions" - is essentially a reformatting of SOP content. The Retrieval Engine, SOPs, and Runtime ECU already provide the core functionality. However, the Skills Layer may provide value as a user interface layer (trigger-based invocation) and as a versioned reference to procedures. Complete removal would require migration effort with MEDIUM risk. A more conservative approach would be to mark the Skills Layer as deprecated and not extend it for new capabilities like caveman patterns.]

### Key Findings

| Finding | Evidence |
|---------|----------|
| Skills wrap SOPs | Every skill references SOPs in context_contributions |
| No execution | Skills produce context, don't execute |
| RetrievalEngine exists | skill-knowledge-retrieval duplicates RetrievalEngine |
| Attribution exists | skill-decision-attribution duplicates runtime/attribution.py |
| Convenience wrapper | Adds trigger-based access and context merging |

### Architectural Recommendation

| Recommendation | Rationale |
|----------------|----------|
| Do NOT create new skills for caveman patterns | Would extend unnecessary layer |
| Consider deprecating Skills Layer | Duplicates existing functionality |
| Extend SOPs instead | Source of procedural truth |
| Keep RetrievalEngine | Actual implementation |

### Alternative: Keep Skills as Thin Interface

If Skills Layer is kept, it should be:
- **Thin**: Just trigger mapping, no content duplication
- **References**: Point to SOPs, don't wrap them
- **Versioned**: Pin specific SOP versions for audit

---

## Evidence

[EVIDENCE: /workspace/project/kde/runtime/skills/registry.json - Skills definitions]
[EVIDENCE: /workspace/project/kde/runtime/skills/loader.py - SkillLoader implementation]
[EVIDENCE: /workspace/project/kde/runtime/sop005.py - SOP-005 Executor]
[EVIDENCE: /workspace/project/kde/runtime/retrieval.py - Retrieval Engine]
[EVIDENCE: /workspace/project/kde/runtime/attribution.py - Decision Attribution]
[EVIDENCE: /workspace/project/kde/runtime/runtime.py - Knowledge-on-Demand Runtime]
[EVIDENCE: INV-057, INV-058, INV-059]

## Next Steps

1. Human review of architectural critique
2. If Skills Layer is unnecessary: Propose migration plan
3. If Skills Layer is necessary: Document unique value
4. Decision: Deprecate, keep thin, or extend

---

**Document Status**: INVESTIGATION  
**Human Review Required**: Yes  
**Blocking**: Cannot self-approve (Principle 2)
