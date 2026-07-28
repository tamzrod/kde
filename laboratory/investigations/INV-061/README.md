<!-- KDE_RUNTIME_AUTHENTICITY: GENERIC_AI_WITH_KDE_FORMAT -->
# INV-061: Skills Layer Disposition - Keep or Discard?

**Status**: INVESTIGATION  
**Parent**: INV-060  
**Created**: 2026-07-28  
**Source**: INV-060 follow-up (final recommendation)  
**Investigator**: OpenHands Agent

---

## Summary

[INFERENCE: Based on the critical analysis in INV-060, this investigation provides definitive recommendations on what to keep, what to discard, and what to adapt regarding the Skills Layer architecture.]

## Findings Summary from INV-060

### What the Skills Layer Actually Is

| Aspect | Finding |
|--------|---------|
| **Definition** | Procedural wrappers around SOPs |
| **Execution** | NONE - just provides context |
| **Overlap** | HIGH - duplicates SOPs, RetrievalEngine, attribution |
| **Unique Value** | Trigger-based invocation, context merging |

### Evidence Summary

| Evidence | Interpretation |
|---------|---------------|
| Skills wrap SOPs | Every skill rephrases SOP content as JSON |
| skill-knowledge-retrieval | Duplicate of SOP-005 + RetrievalEngine |
| skill-decision-attribution | Duplicate of runtime/attribution.py |
| Context contributions | Reformat SOPs, not new information |
| No execution code | Skills don't do anything, just instruct |

---

## Disposition Analysis

### What the Skills Layer Contains

[EVIDENCE: /workspace/project/kde/runtime/skills/registry.json]

| Skill | Purpose | Keep? | Rationale |
|-------|---------|-------|-----------|
| skill-investigation-planning | Wrapper for SOP-001 | **DISCARD** | SOP-001 IS the procedure |
| skill-experiment-design | Wrapper for SOP-002 | **DISCARD** | SOP-002 IS the procedure |
| skill-knowledge-retrieval | Wrapper for SOP-005 + RetrievalEngine | **DISCARD** | Redundant with existing |
| skill-evidence-collection | Wrapper for SOP-004 | **DISCARD** | SOP-004 IS the procedure |
| skill-decision-attribution | Wrapper for runtime/attribution.py | **DISCARD** | runtime/attribution.py IS the implementation |
| skill-artifact-traceability | Wrapper for KDE-ARCH-005/006 | **KEEP** | May provide unique versioning value |
| skill-governance-review | Wrapper for SOP-006/007 | **DISCARD** | SOPs IS the procedure |
| skill-frontend-design | External skill reference | **KEEP** | External integration, not SOP wrapper |

---

## What to KEEP

### 1. Trigger-Based Invocation System

| Aspect | Analysis |
|--------|----------|
| **What** | SkillLoader.select_skills_for_task(triggers) |
| **Value** | Maps investigation types → required procedures |
| **Decision** | **KEEP** - Useful UX pattern |
| **Adaptation** | Refactor to directly select SOPs, not Skills |

**Evidence**: The trigger system provides a useful abstraction for task → procedure mapping.

### 2. External Skill Integration

| Aspect | Analysis |
|--------|----------|
| **What** | skill-frontend-design references external skill |
| **Value** | Integration point for external capabilities |
| **Decision** | **KEEP** - Enables extensibility |
| **Adaptation** | Rename to "External Integrations" |

**Evidence**: External skills like frontend-design are NOT SOP wrappers - they're actual capabilities.

### 3. Versioning Pattern

| Aspect | Analysis |
|--------|----------|
| **What** | Skills have version, source, validation_evidence |
| **Value** | Enables audit trail of procedures used |
| **Decision** | **KEEP** - Apply to SOPs instead |
| **Adaptation** | SOPs should have versioned lifecycle |

**Evidence**: Each skill pins a specific SOP version, enabling reproducibility.

---

## What to DISCARD

### 1. All SOP Wrapper Skills

| Skill | Replace With |
|-------|-------------|
| skill-investigation-planning | Reference SOP-001 directly |
| skill-experiment-design | Reference SOP-002 directly |
| skill-evidence-collection | Reference SOP-004 directly |
| skill-governance-review | Reference SOP-006/007 directly |

**Rationale**: These skills add no value - they just rephrase SOP content as JSON context_contributions.

### 2. skill-knowledge-retrieval

| Aspect | Analysis |
|--------|----------|
| **What** | Wrapper for SOP-005 + RetrievalEngine |
| **Current behavior** | Says "Execute Knowledge-on-Demand retrieval" without executing |
| **Decision** | **DISCARD** |
| **Replace with** | Direct use of SOP005Executor + RetrievalEngine |

**Rationale**: Redundant with existing components. The retrieval already happens in runtime.py.

### 3. skill-decision-attribution

| Aspect | Analysis |
|--------|----------|
| **What** | Wrapper for runtime/attribution.py |
| **Current behavior** | Says "Record decision origin" without recording |
| **Decision** | **DISCARD** |
| **Replace with** | Direct use of DecisionAttributor |

**Rationale**: runtime/attribution.py implements the attribution - the skill just adds context.

---

## What to ADAPT

### 1. Keep Only: External Integrations + Trigger System

```
┌─────────────────────────────────────────────────────────────────┐
│                    PROPOSED ARCHITECTURE                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Runtime Layer                                                    │
│  ├── Trigger System (KEEP)                                       │
│  │      └── Maps investigation type → SOPs to execute            │
│  │                                                            │
│  ├── External Integrations (KEEP)                                │
│  │      └── skill-frontend-design, future external skills     │
│  │                                                            │
│  └── Context Builder (ADAPT)                                    │
│         └── Merge SOP context + External context + Knowledge    │
│                                                                  │
│  NOT in Runtime Layer:                                            │
│  ├── SOP wrappers (DISCARD)                                     │
│  ├── Retrieval engine (already in runtime.py)                   │
│  └── Attribution (already in runtime/attribution.py)             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 2. New Skills Layer Definition

**If Skills Layer is kept**, redefine it:

```python
# NEW Skill Definition (simplified)
@dataclass
class Skill:
    id: str
    name: str
    type: Literal["external_integration", "procedure_reference"]
    
    # For external integrations:
    invoke: callable  # Actual execution
    
    # For procedure references:
    sop_id: str  # Direct SOP reference
    version: str  # Pinned version
```

**Skills should either:**
1. **Execute something** (external integrations)
2. **Reference something** (SOP with version pin)

**NOT both** - and NOT just rephrase SOP content.

### 3. Migration Path

| Phase | Action | Rationale |
|-------|--------|-----------|
| **Phase 1** | Deprecate SOP wrapper skills | Mark as deprecated, no new usage |
| **Phase 2** | Runtime uses SOPs directly | Remove skill → SOP mapping |
| **Phase 3** | Keep only external integrations | skill-frontend-design stays |
| **Phase 4** | Remove Skills Layer | If only integrations remain |

---

## Decision Matrix

| Component | Current | Decision | New Implementation |
|-----------|---------|----------|-------------------|
| skill-investigation-planning | Wrapper | **DISCARD** | Reference SOP-001 |
| skill-experiment-design | Wrapper | **DISCARD** | Reference SOP-002 |
| skill-knowledge-retrieval | Wrapper | **DISCARD** | Use RetrievalEngine |
| skill-evidence-collection | Wrapper | **DISCARD** | Reference SOP-004 |
| skill-decision-attribution | Wrapper | **DISCARD** | Use attribution.py |
| skill-artifact-traceability | Wrapper | **DISCARD** | Version ARCH-005/006 directly |
| skill-governance-review | Wrapper | **DISCARD** | Reference SOP-006/007 |
| skill-frontend-design | External | **KEEP** | Rename to External Integrations |
| Trigger System | Mapping | **KEEP** | Adapt to select SOPs |
| Context Builder | Aggregator | **ADAPT** | Merge SOP + External context |

---

## Implementation Recommendation

### Recommendation: Keep Thin Skills Layer

Based on evidence from INV-058 through INV-060:

| Action | Implementation |
|--------|----------------|
| **KEEP** | Trigger-based invocation system |
| **KEEP** | External skill integrations (skill-frontend-design) |
| **KEEP** | Context merging capability |
| **DISCARD** | All SOP wrapper skills |
| **ADAPT** | Skills Layer renamed to "Runtime Integrations" |

### New Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    PROPOSED ARCHITECTURE                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  /runtime/integrations/                                          │
│  ├── __init__.py                                                │
│  ├── triggers.py         # Investigation type → SOP mapping    │
│  ├── context.py          # Context builder (SOP + External)    │
│  ├── external/                                                  │
│  │   ├── __init__.py                                            │
│  │   └── frontend_design.py  # skill-frontend-design           │
│  └── registry.json      # External integrations only           │
│                                                                  │
│  /runtime/sops/                                                  │
│  ├── sop001.py           # SOP-001 Investigation Lifecycle     │
│  ├── sop002.py           # SOP-002 Experiment Lifecycle        │
│  └── ...                  # Other SOPs                        │
│                                                                  │
│  /runtime/skills/ (DEPRECATED)                                   │
│  └── [Removed - SOP wrappers go here]                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Caveman Patterns Decision

| Pattern | INV-057 Target | INV-061 Decision |
|---------|---------------|------------------|
| squash | Skills Layer | **Implement as External Integration** |
| compress | Skills Layer | **Implement as External Integration** |
| diff | Orchestrator | **Keep as Orchestrator feature** |
| nuke | Skills Layer | **Implement as Runtime capability** |

**Rationale**: Since Skills Layer is being deprecated, caveman patterns should be implemented as:
- External integrations (squash, compress)
- Runtime capabilities (nuke)
- Orchestrator features (diff)

---

## Final Recommendation

### Summary

| Category | Decision | Count |
|----------|----------|-------|
| **KEEP** | Trigger system, External integrations, Context builder | 3 |
| **DISCARD** | All SOP wrapper skills | 7 |
| **ADAPT** | Skills Layer → Runtime Integrations | 1 |

### Action Items

| Item | Action | Priority |
|------|--------|----------|
| Deprecate SOP wrapper skills | Mark in registry.json | HIGH |
| Migrate to direct SOP references | Update investigation workflow | HIGH |
| Keep skill-frontend-design | Move to External Integrations | MEDIUM |
| Implement caveman as integrations | squash, compress as external | MEDIUM |
| Document new architecture | Update runtime docs | MEDIUM |

---

## Evidence

[EVIDENCE: /workspace/project/kde/runtime/skills/registry.json - Current skills]
[EVIDENCE: /workspace/project/kde/runtime/skills/loader.py - SkillLoader]
[EVIDENCE: /workspace/project/kde/runtime/sop005.py - SOP-005 Executor]
[EVIDENCE: /workspace/project/kde/runtime/retrieval.py - Retrieval Engine]
[EVIDENCE: /workspace/project/kde/runtime/attribution.py - Decision Attribution]
[EVIDENCE: INV-057, INV-058, INV-059, INV-060]

## Next Steps

1. Human review of disposition recommendations
2. If approved: Create implementation tickets
3. If rejected: Document alternative approach

---

**Document Status**: INVESTIGATION  
**Human Review Required**: Yes  
**Blocking**: Cannot self-approve (Principle 2)
