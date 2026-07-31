<!-- KDE_RUNTIME_AUTHENTICITY: GENERIC_AI_WITH_KDE_FORMAT -->
# INV-059: Runtime Operations - Skills Layer or Expert Layer?

**Status**: INVESTIGATION  
**Parent**: INV-058  
**Created**: 2026-07-28  
**Source**: INV-058 follow-up  
**Investigator**: OpenHands Agent

---

## Summary

[INFERENCE: This investigation determines whether runtime operations (squash, compress, diff, nuke) should be implemented as Skills in the Skills Layer or as capabilities provided by an Expert, and analyzes the architectural implications.]

## Background

From INV-057 and INV-058:

- **Skills Layer**: Runtime task execution, produces context contributions
- **Expert Layer**: Domain knowledge access, produces structured results with confidence

The caveman patterns (squash, compress, diff, nuke) are runtime efficiency operations. The question is: where do they belong architecturally?

[EVIDENCE: INV-057, INV-058]

---

## Runtime Operations Defined

### Caveman Operations

| Operation | Description | Output |
|-----------|-------------|--------|
| **squash** | Grep-style targeted file reading | Lines matching pattern |
| **compress** | Summarize file to ≤200-word bullets | Structured summary |
| **diff** | Show only changed hunks | Diff output |
| **nuke** | Session summary for restart | State document |

### Operation Characteristics

| Characteristic | Analysis |
|----------------|----------|
| **Purpose** | Efficiency, context management |
| **Domain** | Generic (not domain-specific) |
| **Knowledge required** | Minimal (file content, git state) |
| **Confidence level** | Not applicable (tool, not inference) |
| **Output format** | Direct result (not structured with confidence) |
| **Consumer** | Runtime/Agent directly |

---

## Option Analysis

### Option A: Skills Layer

[EVIDENCE: /workspace/project/kde/runtime/skills/loader.py]

| Aspect | Analysis |
|--------|----------|
| **Fits?** | YES |
| **Purpose match** | Runtime task execution |
| **Output match** | Context contributions (instructions, constraints) |
| **Lifecycle** | DRAFT → EXPERIMENTAL → VALIDATED → PROMOTED |
| **Example patterns** | Already defined in loader.py |

**Pros**:
- Natural fit for runtime task execution
- Already handles triggers, dependencies
- Produces context for execution
- Matches current architecture

**Cons**:
- Skills historically produce context, not direct results
- No confidence reporting
- May blur line between context and operations

### Option B: Expert Layer

[EVIDENCE: /workspace/project/kde/experts/_lifecycle.md, interface.yaml]

| Aspect | Analysis |
|--------|----------|
| **Fits?** | PARTIAL |
| **Purpose match** | Domain knowledge (not generic operations) |
| **Output match** | Structured results with confidence |
| **Lifecycle** | SYNTHESIZED → CANDIDATE → VALIDATED → REGISTERED → ACTIVE |
| **Example patterns** | DNP3-EXPERT-001, KDE-EXPERT-001 |

**Pros**:
- Provides structured interface
- Has confidence reporting
- Can reference knowledge
- Engine-consumable

**Cons**:
- Experts are domain-specific (DNP3, SLD, Governance)
- Runtime operations are generic
- Output format mismatch (no confidence for tools)
- Misuse of Expert concept

### Option C: Hybrid Approach

| Aspect | Analysis |
|--------|----------|
| **Concept** | Operations as Skills, Knowledge as Experts |
| **Rationale** | Clear separation of concerns |

**Pros**:
- Clear architectural boundaries
- Skills for "how to do"
- Experts for "what is known"
- No concept mixing

**Cons**:
- Two similar patterns
- Potential overlap concerns

---

## Expert vs Skill Decision Matrix

### When to Use Experts

[EVIDENCE: Expert lifecycle - domain knowledge for Engines]

| Condition | Use Expert |
|-----------|------------|
| Domain-specific knowledge | ✅ Yes |
| Requires confidence reporting | ✅ Yes |
| Consumed by Engines | ✅ Yes |
| Contains rules/standards | ✅ Yes |
| References KDE knowledge | ✅ Yes |

**Examples**: DNP3-EXPERT-001 (protocol), KDE-EXPERT-001 (governance)

### When to Use Skills

| Condition | Use Skill |
|-----------|----------|
| Runtime task execution | ✅ Yes |
| Generic operations | ✅ Yes |
| Consumed by Runtime | ✅ Yes |
| Produces context | ✅ Yes |
| No confidence needed | ✅ Yes |

**Examples**: `/squash`, `/compress`, `/diff`, `/nuke`

### Runtime Operations Analysis

| Operation | Domain? | Confidence? | Engine-consumed? | Decision |
|-----------|---------|------------|-----------------|----------|
| squash | Generic | No | No | **Skill** |
| compress | Generic | No | No | **Skill** |
| diff | Generic | No | No | **Skill** |
| nuke | Generic | No | No | **Skill** |

---

## Architectural Decision

### Decision: Runtime Operations Belong in Skills Layer

```
┌─────────────────────────────────────────────────────────────────┐
│                    ARCHITECTURAL DECISION                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Runtime Operations (squash, compress, diff, nuke)               │
│                         ↓                                        │
│              ┌─────────────────────────┐                        │
│              │    Skills Layer         │                        │
│              │                         │                        │
│              │ - Generic operations    │                        │
│              │ - Runtime execution     │                        │
│              │ - No confidence needed  │                        │
│              │ - Consumed by Runtime   │                        │
│              └─────────────────────────┘                        │
│                                                                  │
│  NOT in Expert Layer because:                                   │
│  ❌ Not domain-specific                                         │
│  ❌ No confidence reporting                                     │
│  ❌ Not consumed by Engines                                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Rationale

1. **Domain Specificity**
   - Operations are generic (file reading, summarization)
   - Experts are domain-specific (DNP3, SLD)
   - [EVIDENCE: Expert scope - "Owns: capabilities"]

2. **Output Format**
   - Operations produce direct results
   - Experts produce structured results with confidence
   - [EVIDENCE: Expert interface - produces: confidence]

3. **Consumer**
   - Operations consumed by Runtime/Agent
   - Experts consumed by Engines
   - [EVIDENCE: Expert lifecycle - "Engine calls..."]

4. **Knowledge Dependencies**
   - Operations don't reference KDE knowledge
   - Experts depend on knowledge artifacts
   - [EVIDENCE: Expert interface - knowledge_refs]

---

## Architectural Impact

### Skills Layer Changes

| Change | Impact | Risk |
|--------|--------|------|
| Add operations as Skills | Extend context contributions | LOW |
| Operations produce direct results | May need new output type | MEDIUM |
| Trigger-based invocation | Already supported | LOW |

### Expert Layer Changes

| Change | Impact | Risk |
|--------|--------|------|
| No changes needed | Operations don't belong here | N/A |
| Keep Experts for domain knowledge | Preserves clarity | N/A |

### Layer Boundaries

```
┌─────────────────────────────────────────────────────────────────┐
│                    LAYER RESPONSIBILITIES                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Skills Layer                    Expert Layer                    │
│  ──────────────                  ─────────────                  │
│  • Runtime operations            • Domain knowledge             │
│  • Context contribution          • Structured results           │
│  • Generic procedures            • Confidence reporting          │
│  • Tool execution                • Rule/standard application    │
│                                  • Knowledge references          │
│                                                                  │
│  Examples:                       Examples:                      │
│  • /squash                       • DNP3-EXPERT-001              │
│  • /compress                     • KDE-EXPERT-001              │
│  • /diff                                                    │
│  • /nuke                                                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Comparison with INV-058

Building on INV-058 findings:

| Finding from INV-058 | Confirmation |
|---------------------|--------------|
| Skills and Experts share patterns (metadata, versioning, deps) | ✅ Confirmed |
| Skills → Runtime, Experts → Engines | ✅ Confirmed |
| Clear purpose distinction | ✅ Confirmed |

| New Finding for Operations | Analysis |
|----------------------------|----------|
| Operations are generic, not domain-specific | ✅ Confirmed |
| Operations don't need confidence reporting | ✅ Confirmed |
| Operations consumed by Runtime, not Engines | ✅ Confirmed |
| Operations belong in Skills Layer | ✅ Decision |

---

## Conclusion

[INFERENCE: Runtime operations (squash, compress, diff, nuke) belong in the Skills Layer, not the Expert Layer. Operations are generic runtime tasks that produce direct results, while Experts are domain-specific knowledge providers that produce structured results with confidence. This maintains the architectural clarity established in INV-058.]

### Decision Summary

| Artifact Type | Layer | Rationale |
|--------------|-------|----------|
| Runtime operations | **Skills Layer** | Generic, runtime execution, direct results |
| Domain knowledge | Expert Layer | Domain-specific, engine consumption, structured results |

### Architectural Clarity

| Layer | Purpose | Output | Consumer |
|-------|---------|--------|----------|
| Skills | Runtime operations | Context/direct results | Runtime |
| Experts | Domain knowledge | Structured results + confidence | Engines |

---

## Evidence

[EVIDENCE: /workspace/project/kde/runtime/skills/loader.py - SkillLoader, context contributions]
[EVIDENCE: /workspace/project/kde/experts/_lifecycle.md - Expert lifecycle]
[EVIDENCE: /workspace/project/kde/experts/_template/interface.yaml - Expert interface]
[EVIDENCE: /workspace/project/kde/experts/sld/kde-expert-sld-001/interface.yaml - Real expert example]
[EVIDENCE: INV-057, INV-058]

## Next Steps

1. Human review of architectural decision
2. If approved: Implement operations as Skills
3. If rejected: Document alternative approach

---

**Document Status**: INVESTIGATION  
**Human Review Required**: Yes  
**Blocking**: Cannot self-approve (Principle 2)
