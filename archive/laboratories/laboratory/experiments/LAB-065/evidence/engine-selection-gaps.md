# Engine Selection Gap Analysis

**Evidence ID**: EVID-ECU-004
**Experiment**: LAB-065
**created**: 2026-07-29T04:20:00Z
**Engine**: KDE-ENGINE-001

---

## Engine Selection Requirements

### Required Inputs (Current)

```python
def execute(
    self,
    request: ExecutionRequest,
    engine_selections: List[EngineSelection],  # ← REQUIRED
    seed_selections: List[SeedSelection],      # ← REQUIRED
    ...
)
```

### Missing Capabilities

| Capability | Required | Provided | Gap |
|------------|----------|----------|-----|
| Request Classification | ✅ | ❌ | No investigation type detection |
| Capability Extraction | ✅ | ❌ | No keyword-to-capability mapping |
| Engine Matching | ✅ | ✅ | Exists but not invoked |
| Seed Matching | ✅ | ✅ | Exists but not invoked |
| Mode Selection | ✅ | ❌ | No automatic mode determination |

---

## Investigation Stage Mapping

### Recommended Engine Assignments

| Stage | Recommended Engine | Current Support |
|-------|-------------------|----------------|
| IDEA | ALPHA (Analysis) | ✅ GAMMA supports |
| INVESTIGATION | BETA (Synthesis) | ✅ Supported |
| EVIDENCE | EPSILON (Validation) | ✅ Supported |
| OBSERVATION | ALPHA (Analysis) | ✅ Supported |
| SYNTHESIS | BETA/GAMMA (Synthesis) | ✅ Supported |
| VALIDATION | EPSILON (Validation) | ✅ Supported |
| PROMOTION | ADVERSARIAL (Evaluation) | ✅ Supported |

### Gap Analysis

**Current State**: No stage-based routing
**Recommended State**: Automatic engine selection based on investigation stage

---

## Capability-to-Engine Mapping

### Request → Capabilities

```python
# Example request analysis
request = ExecutionRequest(
    description="Analyze chess techniques",
    required_capabilities=[CapabilityType.ANALYSIS],
    keywords=["chess", "techniques"]
)
```

### Capabilities → Engines

| Required Capability | Matching Engines | Top Selection |
|--------------------|------------------|---------------|
| ANALYSIS | ALPHA, BETA, GAMMA, DELTA, ADVERSARIAL | ALPHA (specialized) |
| SYNTHESIS | BETA, GAMMA, CONSENSUS-SYNTH, PROTOCOL-SYNTH | BETA (generalist) |
| VALIDATION | GAMMA, EPSILON, CONSENSUS-SYNTH | EPSILON (specialized) |
| EVALUATION | EPSILON, ADVERSARIAL | ADVERSARIAL (specialized) |
| GENERATION | DELTA, PROTOCOL-SYNTH | DELTA (generalist) |
| REASONING | ALPHA, BETA, GAMMA, DELTA | ALPHA (specialized) |

---

## Mode Selection Criteria

### Current Modes

| Mode | When Selected | Current Logic |
|------|---------------|---------------|
| SINGLE | selection_count == 1 | Based on input count |
| SEQUENTIAL | selection_count > 1, has dependencies | Based on dependencies |
| PARALLEL | selection_count > 1, no deps, count ≤ 3 | Based on count |
| CONSENSUS | consensus_mode specified | Based on user preference |
| SEED_ASSISTED | preferred_seeds > 1 | Based on user preference |

### Recommended Mode Selection

| Task Type | Recommended Mode | Criteria |
|-----------|------------------|----------|
| Simple analysis | SINGLE | Single capability, no dependencies |
| Complex investigation | SEQUENTIAL | Multiple stages, dependencies |
| Parallel research | PARALLEL | Independent subtasks |
| Critical validation | CONSENSUS | High-stakes decisions |
| Multi-seed context | SEED_ASSISTED | Multiple perspectives |

---

## Integration Recommendations

### 1. Add Request Classifier

```python
class RequestClassifier:
    """Classify investigation requests."""
    
    def classify(self, request: ExecutionRequest) -> InvestigationType:
        # Analyze description and keywords
        # Determine investigation stage
        # Extract required capabilities
        pass
```

### 2. Integrate CapabilityResolver

```python
# In RuntimeECU.execute()
if engine_selections is None:
    engine_selections = self.capability_resolver.resolve(
        request,
        self.engine_registry.get_active_engines(),
        self.seed_registry.get_active_seeds()
    )
```

### 3. Add Mode Selector

```python
class ModeSelector:
    """Select execution mode based on task."""
    
    def select_mode(
        self,
        request: ExecutionRequest,
        engine_selections: List[EngineSelection]
    ) -> ExecutionMode:
        # Analyze task complexity
        # Check engine dependencies
        # Determine appropriate mode
        pass
```

---

## Summary

| Gap | Impact | Fix |
|-----|--------|-----|
| No request classification | One-size-fits-all | Add RequestClassifier |
| CapabilityResolver not integrated | Static execution | Integrate into execute() |
| No automatic mode selection | Fixed modes | Add ModeSelector |
| No stage-based routing | Suboptimal engines | Add investigation type detection |

---
