# INV-068: KDE Implementation Planning

**Status**: INVESTIGATION  
**Parent**: INV-067  
**Created**: 2026-07-28  
**Source**: Implementation planning for validated principles  
**Investigator**: OpenHands Agent

---

## Summary

[INFERENCE: This investigation produces an implementation roadmap for 3 accepted principles (BOUNDED DISCLOSURE, EXPLICIT MARKING, REVERSIBILITY) following minimal viable implementation principles. The roadmap identifies 4 milestones with measurable experiments, prioritizes existing component extension over new architecture, and recommends context budget tracking as the first implementation task.]

---

## Part 1: Principles as Hypotheses

### 1.1 Accepted Principles from INV-067

[EVIDENCE: INV-067]

| # | Principle | Hypothesis |
|---|-----------|------------|
| 1 | BOUNDED DISCLOSURE | Bounded retrieval reduces context without losing essential information |
| 2 | EXPLICIT MARKING | Compression provenance markers improve evidence quality |
| 3 | REVERSIBILITY | Reversible compression enables significant token reduction |

### 1.2 Implementation as Experiment

| Principle | Current State | Hypothesis to Test |
|-----------|---------------|-------------------|
| **BOUNDED DISCLOSURE** | Unbounded retrieval | Bounded retrieval produces equivalent outcomes with less context |
| **EXPLICIT MARKING** | Evidence markers only | Compression provenance markers are detectable and validated |
| **REVERSIBILITY** | Full artifacts only | Compressed artifacts can be restored when needed |

---

## Part 2: Component Analysis

### 2.1 Current KDE Architecture

[EVIDENCE: /workspace/project/kde/runtime/]

```
/runtime/
├── retrieval.py         # Knowledge retrieval
├── sop005.py            # Retrieval policy
├── principles_enforcer.py # Evidence validation
├── attribution.py       # Decision attribution
├── skills/             # Skill loader
├── catalog.json        # Knowledge catalog
└── state.json          # Runtime state
```

### 2.2 BOUNDED DISCLOSURE Analysis

| Aspect | Current State | Required Change |
|--------|---------------|-----------------|
| **Runtime changes** | None | Add budget tracking to RetrievalEngine |
| **Engine changes** | None | None |
| **Knowledge changes** | None | Add size metadata to artifacts |
| **Metadata changes** | None | Add artifact_size field |
| **Storage changes** | None | None |
| **API changes** | None | Add max_tokens parameter |
| **UI changes** | None | None |

**Conclusion**: **No new components required** - extend RetrievalEngine

### 2.3 EXPLICIT MARKING Analysis

| Aspect | Current State | Required Change |
|--------|---------------|-----------------|
| **Runtime changes** | ECU validates markers | Add compression provenance check |
| **Engine changes** | None | None |
| **Knowledge changes** | Evidence markers | Add COMPRESSED: provenance tag |
| **Metadata changes** | None | Add compression_metadata field |
| **Storage changes** | None | None |
| **API changes** | None | None |
| **UI changes** | None | None |

**Conclusion**: **No new components required** - extend ECU + document format

### 2.4 REVERSIBILITY Analysis

| Aspect | Current State | Required Change |
|--------|---------------|-----------------|
| **Runtime changes** | None | Add reversible compressor |
| **Engine changes** | None | None |
| **Knowledge changes** | None | Add restore capability |
| **Metadata changes** | None | Add provenance chain |
| **Storage changes** | None | None |
| **API changes** | retrieval.py | Add compress(), restore() methods |
| **UI changes** | None | None |

**Conclusion**: **No new components required** - extend RetrievalEngine + new compressor module

---

## Part 3: Dependency Analysis

### 3.1 Implementation Dependencies

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEPENDENCY GRAPH                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                    │
│  Milestone 1: Context Budget Tracking                              │
│  └─── No dependencies                                              │
│                                                                    │
│  Milestone 2: Skip-Seen Logic                                     │
│  └─── Requires: Milestone 1 (budget tracking)                     │
│                                                                    │
│  Milestone 3: Compression with Provenance                          │
│  └─── Requires: Milestone 1 (metadata)                           │
│  └─── Parallel with: Milestone 2                                   │
│                                                                    │
│  Milestone 4: Restore Capability                                   │
│  └─── Requires: Milestone 3 (compression)                         │
│                                                                    │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Blocking Tasks

| Task | Blocked By | Can Proceed After |
|------|------------|-------------------|
| Skip-Seen | Budget tracking | M1 complete |
| Compression | Metadata fields | M1 complete |
| Restore | Compression | M3 complete |
| ECU validation | Compression format | M3 complete |

### 3.3 Parallelizable Work

| Work | Parallel With | Independent? |
|------|---------------|--------------|
| ECU provenance check | Retrieval changes | NO - needs format |
| Document compression tag | Retrieval changes | YES - documentation only |
| Artifact metadata | Retrieval changes | YES - catalog update |

---

## Part 4: Experimental Planning

### 4.1 Milestone 1: Context Budget Tracking

**Hypothesis**: Budget tracking enables visibility into context consumption.

#### What Will Be Tested

| Question | Measurement |
|----------|-------------|
| Can context size be tracked per retrieval? | Yes/No + token count |
| Does tracking add measurable overhead? | Latency delta |
| Is budget visible to users? | Log output verified |

#### Success Criteria

| Criterion | Metric | Threshold |
|-----------|--------|-----------|
| Budget tracked | Log entries present | 100% |
| Overhead acceptable | Latency increase | <10ms |
| Data accurate | Token count vs actual | ±5% |

#### Failure Criteria

| Criterion | Metric | Threshold |
|-----------|--------|-----------|
| Tracking unreliable | Missing entries | >1% |
| Overhead unacceptable | Latency increase | >100ms |

#### Experiment Repeatability

- Use INVESTIGATION-001 through INVESTIGATION-005
- Run 5 retrievals each
- Compare budget logs

---

### 4.2 Milestone 2: Skip-Seen Logic

**Hypothesis**: Skipping previously returned artifacts reduces redundant context.

#### What Will Be Tested

| Question | Measurement |
|----------|-------------|
| Does skip_seen prevent re-return? | Count of duplicates |
| Does skip_seen affect outcomes? | Investigation completion |
| Is force-reload available? | Manual override works |

#### Success Criteria

| Criterion | Metric | Threshold |
|-----------|--------|-----------|
| Duplicates prevented | Zero duplicates | 100% |
| Outcomes unaffected | Investigation complete | 100% |
| Override available | Force-reload works | 100% |

#### Failure Criteria

| Criterion | Metric | Threshold |
|-----------|--------|-----------|
| Required artifacts skipped | Investigation fails | >0% |
| Override broken | Cannot force-reload | Any failure |

#### Experiment Repeatability

- Continue investigations from M1
- Measure duplicate count
- Compare investigation completion

---

### 4.3 Milestone 3: Compression with Provenance

**Hypothesis**: Reversible compression reduces artifact size while preserving essential information.

#### What Will Be Tested

| Question | Measurement |
|----------|-------------|
| Does compression reduce size? | Size before/after |
| Is provenance detectable? | COMPRESSED: tag present |
| Is provenance validated? | ECU passes/fails |

#### Success Criteria

| Criterion | Metric | Threshold |
|-----------|--------|-----------|
| Size reduction | Compression ratio | >50% for >10KB |
| Tag present | Provenance marker | 100% |
| Validation passes | ECU result | 100% |

#### Failure Criteria

| Criterion | Metric | Threshold |
|-----------|--------|-----------|
| Size reduction insufficient | Ratio | <20% |
| Tag missing | Marker absent | >0% |
| Validation fails | ECU result | >0% |

#### Experiment Repeatability

- Retrieve 10 artifacts >10KB
- Measure original size
- Compress and measure
- Validate with ECU

---

### 4.4 Milestone 4: Restore Capability

**Hypothesis**: Compressed artifacts can be restored to original content when needed.

#### What Will Be Tested

| Question | Measurement |
|----------|-------------|
| Can compressed be restored? | Byte-for-byte match |
| Is restoration verifiable? | Checksum matches |
| Does restoration add overhead? | Latency delta |

#### Success Criteria

| Criterion | Metric | Threshold |
|-----------|--------|-----------|
| Restoration accurate | Match | 100% |
| Overhead acceptable | Latency | <500ms |

#### Failure Criteria

| Criterion | Metric | Threshold |
|-----------|--------|-----------|
| Restoration inaccurate | Mismatch | >0% |

#### Experiment Repeatability

- Compress artifacts from M3
- Restore and compare
- Measure latency

---

## Part 5: Incremental Roadmap

### 5.1 Milestone 1: Context Budget Tracking

| Aspect | Detail |
|--------|--------|
| **Objective** | Enable visibility into context consumption |
| **Scope** | RetrievalEngine + logging |
| **Deliverables** | Budget tracking in RetrievalEngine, log output |
| **Risks** | Low - logging only |
| **Exit Criteria** | 5 successful test retrievals with budget logs |

**Implementation**:
```python
# retrieval.py additions
class RetrievalEngine:
    def retrieve(self, query, max_tokens=None):
        # Track before
        before_size = len(str(self.catalog))
        
        # Existing logic...
        
        # Track after
        after_size = len(str(results))
        budget = after_size - before_size
        self.log_budget(query, budget, before_size, after_size)
```

---

### 5.2 Milestone 2: Skip-Seen Logic

| Aspect | Detail |
|--------|--------|
| **Objective** | Prevent redundant artifact retrieval |
| **Scope** | RetrievalEngine + session tracking |
| **Deliverables** | skip_seen(), force_reload() |
| **Risks** | MEDIUM - may skip needed artifacts |
| **Exit Criteria** | 5 retrievals with zero duplicates, investigations complete |

**Implementation**:
```python
# retrieval.py additions
class RetrievalEngine:
    def __init__(self):
        self._seen_artifacts = set()
    
    def skip_seen(self, artifact_ids):
        self._seen_artifacts.update(artifact_ids)
    
    def retrieve(self, query, force_reload=False):
        if force_reload:
            self._seen_artifacts.clear()
        
        results = self._fetch(query)
        results = [r for r in results if r.id not in self._seen_artifacts]
        
        return results
```

---

### 5.3 Milestone 3: Compression with Provenance

| Aspect | Detail |
|--------|--------|
| **Objective** | Reduce artifact size with verifiable provenance |
| **Scope** | New compressor module + RetrievalEngine |
| **Deliverables** | compress_artifact(), COMPRESSED: tag |
| **Risks** | MEDIUM - compression quality |
| **Exit Criteria** | 10 artifacts compressed >50%, all tagged |

**New Module**:
```python
# runtime/compressor.py
def compress_artifact(artifact, max_words=200):
    """Compress artifact to max_words with provenance."""
    
    summary = summarize(artifact.content, max_words)
    
    return {
        "original_size": len(artifact.content),
        "compressed": summary,
        "provenance": f"COMPRESSED: {len(artifact.content)} → {len(summary)}",
        "can_restore": True,
        "checksum": hash(artifact.content)
    }
```

---

### 5.4 Milestone 4: Restore Capability

| Aspect | Detail |
|--------|--------|
| **Objective** | Verify compressed artifacts can be restored |
| **Scope** | Compressor module + verification |
| **Deliverables** | restore_artifact(), verification tests |
| **Risks** | LOW - checksum validation |
| **Exit Criteria** | 10 restores byte-for-byte accurate |

**Implementation**:
```python
# runtime/compressor.py
def restore_artifact(compressed, original_source):
    """Restore artifact from compressed + source."""
    
    if hash(original_source) != compressed["checksum"]:
        raise ValueError("Source checksum mismatch")
    
    return original_source
```

---

## Part 6: Architecture Review

### 6.1 Fit with Current Architecture

[EVIDENCE: /workspace/project/kde/runtime/]

| Component | Can Extend? | Evidence |
|-----------|-------------|----------|
| RetrievalEngine | **YES** | retrieval.py exists, extensible |
| ECU | **YES** | principles_enforcer.py extensible |
| SOP-005 | **YES** | sop005.py extensible |
| Skills | YES | loader.py extensible |

**Conclusion**: **All required capabilities can extend existing components**

### 6.2 New Components Required

| Component | Required? | Justification |
|-----------|-----------|---------------|
| New Layer | **NO** | Not required |
| New Engine | **NO** | Not required |
| New Skill | **NO** | Runtime change only |
| New Module | **YES** | compressor.py for compression |

### 6.3 Complexity Assessment

| Change | Complexity | Reason |
|--------|------------|--------|
| Budget tracking | **LOW** | Logging only |
| Skip-seen | **LOW** | Set operations |
| Compression | **MEDIUM** | Summarization algorithm |
| Restore | **LOW** | Checksum validation |

**Total Implementation Complexity**: MEDIUM

---

## Part 7: Technical Risks

### 7.1 Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Compression loses detail | MEDIUM | HIGH | Provenance markers required, restore capability |
| Skip-seen skips needed | MEDIUM | HIGH | Force-reload always available |
| Budget overhead | LOW | LOW | Logging only |
| Restore failure | LOW | MEDIUM | Checksum validation |

### 7.2 Fallback Plans

| Risk | Fallback |
|------|----------|
| Compression loses detail | Disable compression, use full artifacts |
| Skip-seen skips needed | Force-reload as escape hatch |
| Restore failure | Full artifact always available |

---

## Part 8: Success Metrics

### 8.1 Milestone 1 Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Budget tracked | 100% | Log entries / retrievals |
| Overhead | <10ms | Latency delta |
| Accuracy | ±5% | Token count vs actual |

### 8.2 Milestone 2 Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Duplicates prevented | 100% | Duplicate count / total |
| Outcomes unaffected | 100% | Investigation completion |
| Override works | 100% | Manual test |

### 8.3 Milestone 3 Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Compression ratio | >50% | Size before/after |
| Tag present | 100% | Marker detection |
| Validation passes | 100% | ECU result |

### 8.4 Milestone 4 Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Restore accuracy | 100% | Byte comparison |
| Overhead | <500ms | Latency delta |

---

## Part 9: Summary

### 9.1 Final Deliverables

#### 1. Implementation Roadmap

| Milestone | Focus | Duration |
|-----------|-------|----------|
| 1 | Context Budget Tracking | 1-2 days |
| 2 | Skip-Seen Logic | 1-2 days |
| 3 | Compression + Provenance | 3-5 days |
| 4 | Restore Capability | 1-2 days |
| **Total** | | **1-2 weeks** |

#### 2. Dependency Graph

```
M1: Budget Tracking ─┬─→ M2: Skip-Seen
                     │
                     └─→ M3: Compression ─→ M4: Restore
```

#### 3. Milestone Breakdown

| Milestone | Deliverables | Exit Criteria |
|-----------|--------------|---------------|
| 1 | Budget tracking | 5 successful retrievals with logs |
| 2 | skip_seen() | Zero duplicates, complete investigations |
| 3 | compress() + provenance | >50% reduction, 100% tagged |
| 4 | restore() | 100% accurate restores |

#### 4. Experimental Validation Plan

| Hypothesis | Test Method | Success |
|------------|-------------|---------|
| Budget tracking enables visibility | Log inspection | Log entries present |
| Skip-seen prevents duplicates | Duplicate count | Zero duplicates |
| Compression reduces size | Size measurement | >50% reduction |
| Restore is accurate | Byte comparison | 100% match |

#### 5. Success Metrics

| Metric | Milestone | Target |
|--------|-----------|--------|
| Budget logged | 1 | 100% |
| Duplicates prevented | 2 | 100% |
| Compression ratio | 3 | >50% |
| Restore accuracy | 4 | 100% |

#### 6. Technical Risks

| Risk | Mitigation |
|------|------------|
| Compression loses detail | Provenance + restore |
| Skip-seen skips needed | Force-reload |
| Implementation complexity | Incremental milestones |

#### 7. Architectural Impact

| Change | Impact |
|--------|--------|
| New module | compressor.py |
| Extended | retrieval.py, principles_enforcer.py |
| New metadata | artifact_size, provenance, checksum |
| **New layers** | NONE |

#### 8. Recommended First Implementation Task

```
┌─────────────────────────────────────────────────────────────────┐
│                    FIRST IMPLEMENTATION TASK                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                    │
│  MILESTONE 1: Context Budget Tracking                              │
│                                                                    │
│  Task: Add budget tracking to RetrievalEngine                      │
│  File: /workspace/project/kde/runtime/retrieval.py                 │
│  Effort: 1-2 hours                                                 │
│  Risk: LOW                                                         │
│                                                                    │
│  Justification:                                                    │
│  - No new architecture required                                    │
│  - Enables visibility for all subsequent experiments                │
│  - Establishes measurement baseline                                │
│  - Low risk, high information value                                │
│                                                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Evidence

[EVIDENCE: INV-067 - Validated principles]
[EVIDENCE: /workspace/project/kde/runtime/retrieval.py - Retrieval Engine]
[EVIDENCE: /workspace/project/kde/runtime/principles_enforcer.py - ECU]
[EVIDENCE: /workspace/project/kde/runtime/sop005.py - SOP-005]

---

**Document Status**: INVESTIGATION  
**Human Review Required**: Yes  
**Blocking**: Cannot self-approve (Principle 2)  
**Type**: Implementation Planning Investigation
