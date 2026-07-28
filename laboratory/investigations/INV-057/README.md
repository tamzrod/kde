<!-- KDE_RUNTIME_AUTHENTICITY: GENERIC_AI_WITH_KDE_FORMAT -->
# INV-057: Caveman Adoption - Layer Selection and Impact Analysis

**Status**: INVESTIGATION  
**Parent**: INV-056  
**Created**: 2026-07-28  
**Source**: INV-056 follow-up  
**Investigator**: OpenHands Agent

---

## Summary

[INFERENCE: This investigation determines which architectural layer should adopt the caveman token reduction patterns and analyzes the impact of each adoption option.]

## KDE Runtime Architecture Layers

[EVIDENCE: Based on /workspace/project/kde/runtime/ directory structure]

| Layer | Components | Purpose |
|-------|------------|---------|
| **Skills Layer** | `/runtime/skills/` | User-facing commands (aliases, skills) |
| **Orchestrator** | `/runtime/orchestrator/` | Workspace and execution coordination |
| **Runtime ECU** | `/runtime/ecu/` | Execution control, planning, policy |
| **Retrieval Engine** | `/runtime/retrieval.py` | Knowledge retrieval and caching |
| **Instrumentation** | `/runtime/instrumentation.py` | Metrics, logging, auditing |
| **Governance** | `/runtime/ecu/governance/` | Policy, validation, lifecycle |

## Layer Analysis for Caveman Patterns

### Pattern 1: Squash Over Read (HIGH)

| Aspect | Analysis |
|--------|----------|
| **Description** | Use grep/squash instead of full file reads |
| **Target Layer** | **Retrieval Engine** or **Skills Layer** |
| **Rationale** | Retrieval already targets specific artifacts; squash would enhance targeted reads |

| Option | Pros | Cons | Recommendation |
|--------|------|------|----------------|
| Retrieval Engine | Core behavior change, automatic | Risk of breaking existing retrieval | ⚠️ Risky |
| Skills Layer | User-controlled, opt-in | Requires user action | ✅ Recommended |
| New Tool | Clean separation | Additional complexity | Consider later |

**Recommendation**: Skills Layer — Add `/squash` command that uses grep-style targeting

---

### Pattern 2: Diff Over Re-Read (HIGH)

| Aspect | Analysis |
|--------|----------|
| **Description** | Use `git diff` after edits instead of re-reading |
| **Target Layer** | **Orchestrator** or **Instrumentation** |
| **Rationale** | Orchestrator tracks workspace changes; instrumentation logs state |

| Option | Pros | Cons | Recommendation |
|--------|------|------|----------------|
| Orchestrator | Knows when files change | May not have git context | ✅ Recommended |
| Instrumentation | Already tracks events | Passive, not active | Good supplement |
| New SOP | Clear procedure | Requires human action | Document in SOPs |

**Recommendation**: Orchestrator — Auto-detect changed files and offer diff instead of re-read

---

### Pattern 3: Skip Unchanged Context (HIGH)

| Aspect | Analysis |
|--------|----------|
| **Description** | Don't re-explain what the user knows |
| **Target Layer** | **Runtime ECU** or **Retrieval Engine** |
| **Rationale** | ECU builds investigation context; Retrieval manages what's shown |

| Option | Pros | Cons | Recommendation |
|--------|------|------|----------------|
| Runtime ECU | Controls context building | Core logic change | ⚠️ Risky |
| Retrieval Engine | Filters what's retrieved | May filter needed info | ✅ Recommended |
| Skills Layer | User controls | Requires training | Good complement |

**Recommendation**: Retrieval Engine — Add "skip already seen" logic based on session history

---

### Pattern 4: Memory Over Re-Discovery (HIGH - Already Core)

| Aspect | Analysis |
|--------|----------|
| **Description** | Cite MEMORY.md instead of re-deriving facts |
| **Target Layer** | Already in **Governance** layer |
| **Current State** | /knowledge/ system with validation and promotion |

[EVIDENCE: KDE Knowledge Classification Rules define provenance requirements]

**Recommendation**: No change needed — reinforce with tooling

---

### Pattern 5: Compress Before Referencing (MEDIUM)

| Aspect | Analysis |
|--------|----------|
| **Description** | Summarize large files before citing repeatedly |
| **Target Layer** | **Retrieval Engine** or **Governance** |
| **Rationale** | Retrieval returns artifacts; Governance defines artifact specs |

| Option | Pros | Cons | Recommendation |
|--------|------|------|----------------|
| Retrieval Engine | Auto-compress on large return | May lose detail | ✅ Auto-compress >10KB |
| Governance | Enforce at creation | Late detection | Supplement with validation |
| Skills Layer | User-controlled | Requires training | Good option |

**Recommendation**: Retrieval Engine — Auto-compress artifacts >10KB before return

---

## Impact Analysis

### Layer-by-Layer Impact Summary

| Layer | Changes | Risk | Effort | Impact |
|-------|---------|------|--------|--------|
| **Skills Layer** | Add squash command | LOW | MEDIUM | HIGH (user control) |
| **Orchestrator** | Track changed files, diff offer | MEDIUM | LOW | MEDIUM |
| **Retrieval Engine** | Skip seen, auto-compress | MEDIUM | MEDIUM | HIGH (core) |
| **Governance** | Enforce compression in spec | LOW | LOW | MEDIUM |
| **Instrumentation** | Log context efficiency | LOW | LOW | LOW (audit) |

### Risk Assessment

| Change | Risk | Mitigation |
|--------|------|------------|
| Retrieval auto-compress | MEDIUM | Configurable threshold, user override |
| Retrieval skip seen | MEDIUM | Allow force-reload flag |
| Orchestrator diff offer | LOW | Opt-in, user choice |
| Skills squash | LOW | New command, no breaking change |

### Effort Estimate

| Change | Implementation | Testing | Documentation |
|--------|----------------|---------|---------------|
| Skills squash | 1 day | 2 hours | 1 hour |
| Orchestrator diff | 2 hours | 1 hour | 1 hour |
| Retrieval skip seen | 3 hours | 2 hours | 1 hour |
| Retrieval compress | 4 hours | 2 hours | 1 hour |
| **Total** | ~2 days | ~7 hours | ~4 hours |

---

## Recommended Adoption Plan

### Phase 1: Skills Layer (Quick Win)

| Action | Detail |
|--------|--------|
| Create `/squash` skill | Grep-style targeted file reading |
| Create `/compress` skill | Summarize large files to bullets |
| Create `/nuke` skill | Session summary for restart |

**Effort**: 1 day  
**Risk**: LOW  
**Impact**: HIGH (user efficiency)

---

### Phase 2: Retrieval Engine (Core Efficiency)

| Action | Detail |
|--------|--------|
| Add `skip_seen` option | Don't re-return same artifacts |
| Add auto-compress | Compress >10KB artifacts before return |
| Add context budget | Track and warn on context size |

**Effort**: 1 day  
**Risk**: MEDIUM  
**Impact**: HIGH (automatic efficiency)

---

### Phase 3: Orchestrator (Smart Suggestions)

| Action | Detail |
|--------|--------|
| Track file changes | Watch git diff after edits |
| Offer diff mode | Suggest "diff" instead of "re-read" |
| Session memory | Track what's been shown, offer recall |

**Effort**: 2 hours  
**Risk**: LOW  
**Impact**: MEDIUM (context awareness)

---

## Conclusion

[INFERENCE: The optimal adoption strategy is a phased approach starting with the Skills Layer for quick wins, then the Retrieval Engine for core efficiency, and finally the Orchestrator for smart suggestions.]

### Layer Selection Rationale

| Pattern | Primary Layer | Secondary Layer |
|---------|---------------|-----------------|
| Squash Over Read | Skills Layer | - |
| Diff Over Re-Read | Orchestrator | Skills (manual) |
| Skip Unchanged Context | Retrieval Engine | - |
| Memory Over Re-Discovery | Governance | Already in place |
| Compress Before Reference | Retrieval Engine | Governance (validation) |

### Recommended Layers per Pattern

```
┌─────────────────────────────────────────────────────────────────┐
│                    CAVEMAN PATTERNS ADOPTION                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Skills Layer     ← squash, compress, nuke commands              │
│  Retrieval Engine  ← skip_seen, auto_compress                    │
│  Orchestrator     ← diff_suggestions, session_memory             │
│  Governance       ← compression_validation (already exists)       │
│                                                                  │
│  NOT: Runtime ECU (too core), Instrumentation (passive)         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Architectural Impact Analysis

### Engine vs Seed vs Layer Decision

Based on KDE architecture definitions:

[EVIDENCE: /workspace/project/kde/engines/interface.md - Engine Interface Specification]
[EVIDENCE: /workspace/project/kde/seeds/seed-001/WHAT-IS-A-SEED.md - Seed Definition]

| Artifact | Definition | When to Use |
|----------|------------|-------------|
| **Seed** | Immutable reasoning DNA (principles, models) | New fundamental reasoning |
| **Engine** | Methodology that processes evidence → knowledge | New analysis methodology |
| **Runtime Layer** | Existing infrastructure components | Runtime optimizations, tooling |

### Caveman Analysis

| Pattern | Requires | Rationale |
|---------|----------|-----------|
| Squash Over Read | **No new artifact** | Runtime skill, not reasoning methodology |
| Diff Over Re-Read | **No new artifact** | Orchestrator enhancement, not methodology |
| Skip Unchanged Context | **No new artifact** | Retrieval optimization, not reasoning |
| Memory Over Re-Discovery | **No new artifact** | Already in Governance layer |
| Compress Before Reference | **No new artifact** | Retrieval enhancement, not methodology |

**Conclusion**: Caveman patterns do **NOT** require a new Engine or Seed.

### Why No New Engine?

An Engine processes **evidence into knowledge**. Caveman patterns:
- Don't create knowledge
- Don't validate knowledge
- Don't discover patterns

Caveman is **runtime optimization**, not knowledge methodology.

### Why No New Seed?

A Seed contains **reasoning DNA**:
- Core principles
- Foundational models
- Immutable reasoning rules

[EVIDENCE: SEED-001 is FROZEN and contains Five Core Principles]

Caveman patterns:
- Don't change how KDE reasons
- Don't add new principles
- Don't modify core models

Caveman is **efficiency tooling**, not reasoning evolution.

---

## Decision: Integrate into Existing Layers

### Recommended Integration

```
┌─────────────────────────────────────────────────────────────────┐
│                    KDE ARCHITECTURE DECISION                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Caveman Patterns → INTEGRATE into existing layers               │
│                                                                  │
│  ❌ NOT a new Engine (not knowledge methodology)                 │
│  ❌ NOT a new Seed (not reasoning evolution)                     │
│  ✅ YES to Skills Layer (squash, compress, nuke)                │
│  ✅ YES to Retrieval Engine (skip_seen, auto_compress)           │
│  ✅ YES to Orchestrator (diff_suggestions)                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Layer Assignment Summary

| Pattern | Integration Target | Classification |
|---------|-------------------|---------------|
| Squash Over Read | Skills Layer | New skill |
| Diff Over Re-Read | Orchestrator | Feature addition |
| Skip Unchanged Context | Retrieval Engine | Configuration |
| Compress Before Reference | Retrieval Engine | Feature addition |
| Memory Over Re-Discovery | Governance | Already implemented |

---

## Architectural Impact

### Scope of Change

| Aspect | Impact | Severity |
|--------|--------|----------|
| Core reasoning | None | N/A |
| Knowledge lifecycle | None | N/A |
| Seed/Engine compatibility | None | N/A |
| Runtime behavior | Medium | User-experience improvement |
| Layer dependencies | Low | Minor inter-layer coordination |

### Risk Summary

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Breaking existing retrieval | LOW | HIGH | Add feature flags |
| User confusion on squash | MEDIUM | LOW | Clear documentation |
| Over-compression losing detail | MEDIUM | MEDIUM | User override option |
| Orchestrator complexity | LOW | LOW | Simple diff detection |

### Compatibility Matrix

| Component | Compatible | Notes |
|-----------|------------|-------|
| SEED-001 (Genesis) | ✅ Yes | Patterns don't change reasoning |
| SEED-002 | ✅ Yes | Same rationale |
| All Engines | ✅ Yes | Patterns are layer-agnostic |
| Governance | ✅ Yes | Supplements existing |
| Laboratory | ✅ Yes | No experiment impact |

---

## Final Recommendation

[INFERENCE: Based on architectural analysis, caveman patterns should be integrated into existing KDE layers rather than creating new artifacts.]

### Implementation Approach

| Phase | Action | Layer | New Artifacts |
|-------|--------|-------|---------------|
| 1 | Create skills | Skills Layer | 3 skill files |
| 2 | Enhance retrieval | Retrieval Engine | 2 new methods |
| 3 | Smart suggestions | Orchestrator | 1 new module |

### NOT Required

- ❌ New Seed
- ❌ New Engine
- ❌ Seed modification
- ❌ Engine interface change
- ❌ Laboratory protocol change

---

## Evidence

[EVIDENCE: /workspace/project/kde/runtime/ directory structure]
[EVIDENCE: /workspace/project/kde/runtime/retrieval.py]
[EVIDENCE: /workspace/project/kde/runtime/orchestrator/]
[EVIDENCE: /workspace/project/kde/runtime/skills/]
[EVIDENCE: /workspace/project/kde/engines/interface.md - Engine definition]
[EVIDENCE: /workspace/project/kde/seeds/seed-001/WHAT-IS-A-SEED.md - Seed definition]
[EVIDENCE: INV-055, INV-056]

## Next Steps

1. Human review of architectural decision
2. If approved: Create implementation tickets for Phase 1 (Skills Layer)
3. If rejected: Document reasoning and close

---

**Document Status**: INVESTIGATION  
**Human Review Required**: Yes  
**Blocking**: Cannot self-approve (Principle 2)
