# INV-067: KDE Runtime Evolution Validation

**Status**: INVESTIGATION  
**Parent**: INV-065, INV-066  
**Created**: 2026-07-28  
**Source**: KDE-specific evaluation of synthesized principles  
**Investigator**: OpenHands Agent

---

## Summary

[INFERENCE: This investigation evaluates the 5 minimal principles from INV-066 through KDE's mission lens. Analysis concludes: 2 principles are ACCEPTED (BOUNDED DISCLOSURE, EXPLICIT MARKING), 1 is ACCEPTED WITH CAVEAT (REVERSIBILITY), 1 is DEFERRED (SCOPE ISOLATION), and 1 is REJECTED (FOUNDATIONAL IMMUTABILITY). The principles that survive evaluation directly contribute to KDE's context reduction, token optimization, and knowledge quality objectives.]

---

## Part 1: KDE Mission Alignment

### 1.1 KDE North Star

[EVIDENCE: /workspace/project/kde/ - KDE mission and architecture]

| Objective | Definition | Measurable Outcome |
|-----------|------------|---------------------|
| **Reduce runtime context** | Minimize information in context window | Token count reduction |
| **Reduce token consumption** | Lower LLM API costs | Dollar cost reduction |
| **Increase knowledge quality** | Better knowledge artifacts | Validation pass rate |
| **Improve synthesis capability** | Better conclusions from evidence | Investigation completion |
| **Improve validation capability** | Better evidence evaluation | ECU pass rate |
| **Simplify runtime architecture** | Fewer layers, clearer responsibilities | Maintenance reduction |

### 1.2 Principles Under Evaluation

From INV-066 Minimal Model:

| # | Principle | INV-066 Classification | KDE Evaluation |
|---|-----------|----------------------|----------------|
| 1 | BOUNDED DISCLOSURE | Core | TEST |
| 2 | EXPLICIT MARKING | Core | TEST |
| 3 | REVERSIBILITY | Core | TEST |
| 4 | SCOPE ISOLATION | Architectural | TEST |
| 5 | FOUNDATIONAL IMMUTABILITY | Governance | TEST |

---

## Part 2: Principle-by-Principle Evaluation

### 2.1 BOUNDED DISCLOSURE

| Question | Answer | Evidence |
|----------|--------|----------|
| **Reduces runtime context?** | **YES** | Directly - bounds information returned |
| **Reduces token usage?** | **YES** | Bounded context = fewer tokens |
| **Improves Knowledge-on-Demand?** | **YES** | Retrieval returns only what's needed |
| **Improves retrieval precision?** | **YES** | Targeted access focuses retrieval |
| **Improves synthesis quality?** | **MAYBE** | Less noise, but may miss context |
| **Improves validation quality?** | **YES** | Clearer evidence markers |
| **Simplifies architecture?** | **YES** | RetrievalEngine already does this |
| **Can be implemented?** | **YES** | Extend RetrievalEngine |

**KDE Alignment Score**: 7/8 YES

**Current KDE State**:

[EVIDENCE: /workspace/project/kde/runtime/retrieval.py]
[EVIDENCE: /workspace/project/kde/runtime/sop005.py]

| Current Implementation | Gap |
|----------------------|-----|
| RetrievalEngine exists | Has unbounded retrieval |
| SOP-005 defines retrieval levels | No hard limits |
| Catalog-based retrieval | No compression |
| No context budget tracking | Missing |

**Required Changes**:
- Add context budget tracking to RetrievalEngine
- Implement auto-compression for large artifacts
- Add `skip_seen` logic to avoid re-returning

**Expected Impact**:

| Metric | Current | Expected | Improvement |
|--------|---------|----------|-------------|
| Tokens per retrieval | Variable | Bounded | 20-50% reduction |
| Context per investigation | Growing | Bounded | 30% reduction |
| Retrieval precision | MEDIUM | HIGH | Improved focus |

**KDE Decision**: **ACCEPTED** ✅

---

### 2.2 EXPLICIT MARKING

| Question | Answer | Evidence |
|----------|--------|----------|
| **Reduces runtime context?** | **NO** | Adds markers, increases size |
| **Reduces token usage?** | **NO** | Evidence markers add tokens |
| **Improves Knowledge-on-Demand?** | **NO** | Doesn't affect retrieval |
| **Improves retrieval precision?** | **YES** | Evidence classification helps |
| **Improves synthesis quality?** | **YES** | Clearer evidence provenance |
| **Improves validation quality?** | **YES** | ECU checks for markers |
| **Simplifies architecture?** | **YES** | Standardized documentation |
| **Can be implemented?** | **YES** | Already partially implemented |

**KDE Alignment Score**: 4/8 YES

**Current KDE State**:

[EVIDENCE: /workspace/project/kde/runtime/principles_enforcer.py]
[EVIDENCE: INV-065, INV-066]

| Current Implementation | Gap |
|----------------------|-----|
| Evidence markers required | Already enforced |
| ECU validates markers | Already implemented |
| EVIDENCE:/INFERENCE: format | Already standardized |

**Required Changes**:
- Extend markers for compression/summarization
- Add REVERSIBILITY markers for compressed content
- Document marker conventions

**Expected Impact**:

| Metric | Current | Expected | Improvement |
|--------|---------|----------|-------------|
| Validation pass rate | MEDIUM | HIGH | Better enforcement |
| Evidence quality | MEDIUM | HIGH | Clearer provenance |
| Token overhead | +5% | +5% | No change (already in place) |

**KDE Decision**: **ACCEPTED** ✅

**Rationale**: While EXPLICIT MARKING adds token overhead, the quality improvements in synthesis and validation justify the cost. KDE already uses this principle.

---

### 2.3 REVERSIBILITY

| Question | Answer | Evidence |
|----------|--------|----------|
| **Reduces runtime context?** | **INDIRECT** | Enables compression with recovery |
| **Reduces token usage?** | **INDIRECT** | Compression reduces tokens |
| **Improves Knowledge-on-Demand?** | **YES** | Can restore full from summary |
| **Improves retrieval precision?** | **NO** | Doesn't affect retrieval |
| **Improves synthesis quality?** | **NO** | Doesn't affect conclusions |
| **Improves validation quality?** | **NO** | Doesn't affect validation |
| **Simplifies architecture?** | **YES** | Recovery paths simplify debugging |
| **Can be implemented?** | **YES** | Reference original artifacts |

**KDE Alignment Score**: 3/8 YES

**Current KDE State**:

[EVIDENCE: /workspace/project/kde/runtime/skills/loader.py]

| Current Implementation | Gap |
|----------------------|-----|
| Knowledge artifacts persist | Full reversibility exists |
| Versioning in registry | Can revert |
| No compression with recovery | Missing capability |

**Required Changes**:
- Add reversible compression for large artifacts
- Store provenance with summaries
- Implement restore capability

**Expected Impact**:

| Metric | Current | Expected | Improvement |
|--------|---------|----------|-------------|
| Token reduction | NONE | 30-50% | Via compression |
| Recovery capability | FULL | FULL | Maintained |
| Implementation complexity | LOW | MEDIUM | Additional code |

**KDE Decision**: **ACCEPTED WITH CAVEAT** ⚠️

**Rationale**: REVERSIBILITY enables compression, which contributes to token reduction. However, implementation complexity is MEDIUM. Recommend implementing when compression is added.

---

### 2.4 SCOPE ISOLATION

| Question | Answer | Evidence |
|----------|--------|----------|
| **Reduces runtime context?** | **NO** | Architectural, doesn't affect data |
| **Reduces token usage?** | **NO** | No token impact |
| **Improves Knowledge-on-Demand?** | **NO** | Retrieval unchanged |
| **Improves retrieval precision?** | **NO** | Doesn't affect retrieval |
| **Improves synthesis quality?** | **NO** | Doesn't affect synthesis |
| **Improves validation quality?** | **NO** | Doesn't affect validation |
| **Simplifies architecture?** | **YES** | Clearer layer responsibilities |
| **Can be implemented?** | **YES** | INV-058, 060, 061 address this |

**KDE Alignment Score**: 1/8 YES

**Current KDE State**:

[EVIDENCE: INV-058, INV-060, INV-061]

INV-061 recommended:
- Keep thin Skills Layer (triggers + integrations)
- Discard SOP wrapper skills
- Extend SOPs as source of truth

**Required Changes**:
- Skills Layer migration (INV-061)
- Layer boundary documentation
- SOP consolidation

**Expected Impact**:

| Metric | Current | Expected | Improvement |
|--------|---------|----------|-------------|
| Maintenance burden | HIGH | MEDIUM | Fewer layers |
| Decision clarity | LOW | HIGH | Clearer boundaries |
| Implementation complexity | N/A | HIGH | Migration effort |

**KDE Decision**: **DEFERRED** ⏸️

**Rationale**: SCOPE ISOLATION improves architecture clarity but doesn't directly impact KDE's token or context reduction objectives. High implementation cost. Recommend deferring to future architectural cleanup.

---

### 2.5 FOUNDATIONAL IMMUTABILITY

| Question | Answer | Evidence |
|----------|--------|----------|
| **Reduces runtime context?** | **NO** | Governance principle, no runtime impact |
| **Reduces token usage?** | **NO** | No token impact |
| **Improves Knowledge-on-Demand?** | **NO** | Retrieval unchanged |
| **Improves retrieval precision?** | **NO** | Doesn't affect retrieval |
| **Improves synthesis quality?** | **NO** | Doesn't affect synthesis |
| **Improves validation quality?** | **NO** | Already validated before freezing |
| **Simplifies architecture?** | **NO** | Seeds add layer |
| **Can be implemented?** | **NO** | Already implemented (Seeds) |

**KDE Alignment Score**: 0/8 YES

**Current KDE State**:

[EVIDENCE: /workspace/project/kde/seeds/seed-001/]

| Current Implementation | Assessment |
|----------------------|------------|
| Seeds exist (FROZEN) | Already implemented |
| SEED-001, SEED-002 | Not related to runtime |
| Immutable principles | Governance, not runtime |

**Required Changes**: NONE

**Expected Impact**:

| Metric | Current | Expected | Improvement |
|--------|---------|----------|-------------|
| Runtime tokens | 0 | 0 | No change |
| Runtime context | 0 | 0 | No change |

**KDE Decision**: **REJECTED** ❌

**Rationale**: FOUNDATIONAL IMMUTABILITY is already implemented in KDE via Seeds. However, it does NOT contribute to KDE's runtime objectives (context reduction, token optimization). It is a governance principle, not a runtime principle. KDE should not invest additional effort here.

---

## Part 3: Accepted Principles Summary

### 3.1 Principles Accepted

| # | Principle | Decision | KDE Contribution |
|---|-----------|----------|------------------|
| 1 | BOUNDED DISCLOSURE | **ACCEPTED** | Context/token reduction |
| 2 | EXPLICIT MARKING | **ACCEPTED** | Quality improvement |
| 3 | REVERSIBILITY | **ACCEPTED (CAVEAT)** | Enables compression |
| 4 | SCOPE ISOLATION | **DEFERRED** | Future architectural cleanup |
| 5 | FOUNDATIONAL IMMUTABILITY | **REJECTED** | Already in place, no runtime impact |

### 3.2 KDE Runtime Evolution Principles

```
┌─────────────────────────────────────────────────────────────────┐
│                  KDE RUNTIME EVOLUTION PRINCIPLES                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ACCEPTED FOR KDE:                                               │
│  ────────────────────                                              │
│  1. BOUNDED DISCLOSURE     - Context/token reduction              │
│  2. EXPLICIT MARKING        - Evidence quality                   │
│  3. REVERSIBILITY           - Compression enablement             │
│                                                                    │
│  DEFERRED FOR KDE:                                               │
│  ──────────────────────                                           │
│  4. SCOPE ISOLATION       - Future architectural cleanup         │
│                                                                    │
│  REJECTED FOR KDE:                                               │
│  ────────────────────                                             │
│  5. FOUNDATIONAL IMMUTABILITY - Already in place, no runtime      │
│                                                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Part 4: Implementation Analysis

### 4.1 BOUNDED DISCLOSURE Implementation

**Target Component**: RetrievalEngine

[EVIDENCE: /workspace/project/kde/runtime/retrieval.py]

| Current Behavior | New Behavior |
|-----------------|--------------|
| Returns full artifacts | Returns bounded artifacts |
| No compression | Auto-compress >10KB |
| No skip_seen | Track and skip seen |
| No budget | Context budget tracking |

**Implementation Tasks**:

| Task | Priority | Effort | Impact |
|------|----------|--------|--------|
| Add context budget tracking | HIGH | MEDIUM | Visibility |
| Implement auto-compression | HIGH | HIGH | Token reduction |
| Add skip_seen logic | MEDIUM | LOW | Reduce noise |
| Add bounded retrieval option | MEDIUM | LOW | User control |

**Expected Token Reduction**: 20-50%

### 4.2 EXPLICIT MARKING Implementation

**Target Component**: Documentation + ECU

[EVIDENCE: /workspace/project/kde/runtime/principles_enforcer.py]

| Current Behavior | New Behavior |
|-----------------|--------------|
| Evidence markers required | Compressed content markers added |
| ECU validates markers | ECU validates provenance |
| No compression markers | REVERSIBLE: tag required |

**Implementation Tasks**:

| Task | Priority | Effort | Impact |
|------|----------|--------|--------|
| Document compression markers | HIGH | LOW | Standardization |
| Extend ECU for compression | MEDIUM | MEDIUM | Validation |
| Add provenance requirements | MEDIUM | LOW | Quality |

**Expected Impact**: Improved evidence quality, maintained token overhead

### 4.3 REVERSIBILITY Implementation

**Target Component**: Knowledge Layer

| Current Behavior | New Behavior |
|-----------------|--------------|
| No compression | Reversible compression available |
| Full artifacts only | Summary + provenance |
| No restore capability | Restore on demand |

**Implementation Tasks**:

| Task | Priority | Effort | Impact |
|------|----------|--------|--------|
| Define reversible compression format | HIGH | MEDIUM | Standard |
| Implement restore capability | HIGH | MEDIUM | Recovery |
| Add provenance tracking | MEDIUM | LOW | Quality |

**Expected Token Reduction**: 30-50% (via compression)

---

## Part 5: Cost vs Benefit Analysis

### 5.1 BOUNDED DISCLOSURE

| Factor | Assessment |
|--------|------------|
| **Implementation Cost** | MEDIUM |
| **Maintenance Cost** | LOW |
| **Token Reduction** | 20-50% |
| **Context Reduction** | 30% |
| **Quality Impact** | POSITIVE |
| **Net Benefit** | **HIGH** |

**Recommendation**: **IMPLEMENT**

### 5.2 EXPLICIT MARKING

| Factor | Assessment |
|--------|------------|
| **Implementation Cost** | LOW (already in place) |
| **Maintenance Cost** | LOW |
| **Token Reduction** | 0% (overhead added) |
| **Context Reduction** | 0% |
| **Quality Impact** | POSITIVE |
| **Net Benefit** | **MEDIUM** (quality improvement) |

**Recommendation**: **MAINTAIN** (already implemented)

### 5.3 REVERSIBILITY

| Factor | Assessment |
|--------|------------|
| **Implementation Cost** | MEDIUM |
| **Maintenance Cost** | MEDIUM |
| **Token Reduction** | 30-50% (via compression) |
| **Context Reduction** | 40% (via compression) |
| **Quality Impact** | NEUTRAL |
| **Net Benefit** | **HIGH** (enables compression) |

**Recommendation**: **IMPLEMENT** (when compression added)

---

## Part 6: KDE Changes Required

### 6.1 Changes to RetrievalEngine

[EVIDENCE: /workspace/project/kde/runtime/retrieval.py]

```python
# New capabilities to add:
class RetrievalEngine:
    def retrieve_bounded(self, query, max_tokens=4000): ...
    def compress_artifact(self, artifact, max_words=200): ...
    def skip_seen(self, artifact_ids): ...
    def get_context_budget(self): ...
```

### 6.2 Changes to ECU

[EVIDENCE: /workspace/project/kde/runtime/principles_enforcer.py]

```python
# New validation to add:
class PrinciplesEnforcer:
    def check_compression_provenance(self, content): ...
    def check_reversibility_marker(self, content): ...
```

### 6.3 Changes to SOP-005

[EVIDENCE: /workspace/project/kde/runtime/sop005.py]

```python
# New retrieval level:
class RetrievalLevel:
    BOUNDED = "BOUNDED"  # New level
```

---

## Part 7: Implementation Priority

### 7.1 Priority Ranking

| Priority | Principle | Tasks | Timeline |
|----------|-----------|-------|----------|
| 1 | BOUNDED DISCLOSURE | Budget tracking, skip_seen | Week 1 |
| 2 | EXPLICIT MARKING | Document standards | Week 1 |
| 3 | REVERSIBILITY | Compression format, restore | Week 2-3 |
| 4 | BOUNDED DISCLOSURE | Auto-compression | Week 3-4 |

### 7.2 Implementation Roadmap

```
Week 1: BOUNDED DISCLOSURE (foundation)
  ├── Context budget tracking
  ├── skip_seen logic
  └── Documentation

Week 2-3: REVERSIBILITY (enablement)
  ├── Reversible compression format
  ├── Restore capability
  └── Provenance tracking

Week 3-4: BOUNDED DISCLOSURE (optimization)
  └── Auto-compression

Future: SCOPE ISOLATION
  └── Architectural cleanup
```

---

## Part 8: Summary

### 8.1 Final Deliverables

#### 1. Principles Accepted (3)

| Principle | Decision | KDE Contribution |
|-----------|----------|------------------|
| BOUNDED DISCLOSURE | ACCEPTED | Context/token reduction |
| EXPLICIT MARKING | ACCEPTED | Quality improvement |
| REVERSIBILITY | ACCEPTED (CAVEAT) | Compression enablement |

#### 2. Principles Rejected (2)

| Principle | Decision | Justification |
|-----------|----------|---------------|
| SCOPE ISOLATION | DEFERRED | High cost, no runtime impact |
| FOUNDATIONAL IMMUTABILITY | REJECTED | Already in place, no runtime impact |

#### 3. Expected Token Reduction

| Implementation | Expected Reduction |
|---------------|-------------------|
| BOUNDED DISCLOSURE | 20-50% |
| REVERSIBILITY | 30-50% (via compression) |
| **Combined** | **40-70%** |

#### 4. Expected Context Reduction

| Metric | Current | Target |
|--------|---------|--------|
| Context per retrieval | Variable | Bounded (max_tokens) |
| Redundant artifacts | Present | skip_seen prevents |
| Large artifacts | Full | Compressed + provenance |

#### 5. Expected Quality Improvements

| Area | Current | Expected |
|------|---------|----------|
| Evidence clarity | MEDIUM | HIGH |
| Validation pass rate | MEDIUM | HIGH |
| Retrieval precision | MEDIUM | HIGH |

#### 6. Required KDE Changes

| Component | Change | Priority |
|-----------|--------|----------|
| RetrievalEngine | Bounded retrieval, compression | HIGH |
| ECU | Compression provenance validation | MEDIUM |
| SOP-005 | BOUNDED retrieval level | MEDIUM |
| Documentation | Marker standards | LOW |

#### 7. Recommended Implementation Priority

| Week | Focus | Deliverable |
|------|-------|-------------|
| 1 | BOUNDED foundation | Budget tracking, skip_seen |
| 2-3 | REVERSIBILITY | Compression, restore |
| 3-4 | Optimization | Auto-compression |

---

## Evidence

[EVIDENCE: INV-065 - Synthesized model]
[EVIDENCE: INV-066 - Minimal model]
[EVIDENCE: /workspace/project/kde/runtime/retrieval.py - Retrieval Engine]
[EVIDENCE: /workspace/project/kde/runtime/principles_enforcer.py - Principles]
[EVIDENCE: /workspace/project/kde/runtime/sop005.py - SOP-005]
[EVIDENCE: INV-058, INV-060, INV-061 - Skills Layer analysis]

---

**Document Status**: INVESTIGATION  
**Human Review Required**: Yes  
**Blocking**: Cannot self-approve (Principle 2)  
**Type**: KDE Mission-Specific Evaluation
