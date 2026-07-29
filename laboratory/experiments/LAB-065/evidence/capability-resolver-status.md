# CapabilityResolver Integration Status

**Evidence ID**: EVID-ECU-002
**Experiment**: LAB-065
**created**: 2026-07-29T04:10:00Z
**Engine**: KDE-ENGINE-001

---

## CapabilityResolver Analysis

### Capabilities

The `CapabilityResolver` class (`runtime/ecu/resolver/__init__.py`) provides:

| Method | Purpose | Status |
|--------|---------|--------|
| `resolve()` | Match request capabilities to engines | ✅ Implemented |
| `_find_engines_for_capability()` | Find engines with specific capabilities | ✅ Implemented |
| `_calculate_match_score()` | Score relevance based on keywords | ✅ Implemented |
| `_generate_engine_selections()` | Generate ranked engine selections | ✅ Implemented |
| `select_seeds()` | Find seeds compatible with selected engines | ✅ Implemented |
| `generate_resolution_report()` | Generate resolution summary | ✅ Implemented |

### Scoring Algorithm

```python
def _calculate_match_score(self, capability, keywords):
    if not keywords:
        return 0.5  # Default score
    
    # Count keyword matches
    matches = sum(1 for kw in keywords if kw in capability.keywords)
    
    # Score = matches/total + base (0.3)
    score = matches / len(keywords) + 0.3
    return min(score, 1.0)  # Cap at 1.0
```

### Selection Algorithm

1. **First pass**: Find engines satisfying ALL required capabilities
2. **Second pass**: Add engines with ≥50% capability coverage
3. **Scoring**: Average match score + priority bonus
4. **Compatibility**: Filter by engine-seed compatibility lists

### Integration Gap

**Location**: `RuntimeECU.execute()` (`runtime/ecu/__init__.py`)

**Current Code**:
```python
def execute(
    self,
    request: ExecutionRequest,
    engine_selections: List[EngineSelection],  # ← Required input
    seed_selections: List[SeedSelection],     # ← Required input
    ...
):
    # No call to self.capability_resolver.resolve()
```

**What Should Happen**:
```python
def execute(
    self,
    request: ExecutionRequest,
    engine_selections: Optional[List[EngineSelection]] = None,
    seed_selections: Optional[List[SeedSelection]] = None,
    ...
):
    # Automatic resolution if not provided
    if engine_selections is None:
        engine_selections = self.capability_resolver.resolve(
            request,
            self.engine_registry.get_active_engines(),
            self.seed_registry.get_active_seeds()
        )
```

---

## Available Engines

From `runtime/ecu/registry/engine_registry.py`:

| Engine ID | Codename | Status | Capabilities |
|-----------|----------|--------|--------------|
| KDE-ENGINE-001 | ALPHA | ACTIVE | Reasoning, Analysis |
| KDE-ENGINE-002 | BETA | ACTIVE | Reasoning, Analysis, Synthesis |
| KDE-ENGINE-003 | GAMMA | ACTIVE | Reasoning, Analysis, Synthesis, Validation |
| KDE-ENGINE-004 | DELTA | ACTIVE | Reasoning, Analysis, Generation |
| KDE-ENGINE-005 | EPSILON | ACTIVE | Validation, Evaluation |
| KDE-ENGINE-006 | ADVERSARIAL | ACTIVE | Evaluation, Analysis |
| KDE-ENGINE-007 | CONSENSUS-SYNTH | ACTIVE | Synthesis, Validation |
| KDE-ENGINE-008 | PROTOCOL-SYNTH | ACTIVE | Synthesis, Generation |

### Capability Coverage Matrix

| Capability | ALPHA | BETA | GAMMA | DELTA | EPSILON | ADVERSARIAL | CONSENSUS | PROTOCOL |
|------------|-------|------|-------|-------|---------|-------------|-----------|----------|
| REASONING | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| ANALYSIS | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| SYNTHESIS | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ |
| VALIDATION | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ | ✅ | ❌ |
| GENERATION | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ |
| EVALUATION | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |

---

## Available Seeds

From `runtime/ecu/registry/seed_registry.py`:

| Seed ID | Name | Status | Purpose |
|---------|------|--------|---------|
| SEED-001 | Genesis | FROZEN | Five Core Principles (Governance) |
| SEED-002 | Evidence Model | ACTIVE | Evidence classification |
| SEED-003 | Confidence Model | ACTIVE | Confidence assessment |
| SEED-EVOLUTION | Evolution | ACTIVE | Evolutionary principles |

### Seed-Engine Compatibility

| Seed | Compatible Engines |
|------|-------------------|
| Genesis (SEED-001) | All (governance seed) |
| Evidence Model (SEED-002) | EPSILON, ADVERSARIAL |
| Confidence Model (SEED-003) | GAMMA, EPSILON |
| Evolution (SEED-EVOLUTION) | BETA, GAMMA, CONSENSUS-SYNTH |

---

## Recommendation

**Integrate CapabilityResolver into ECU.execute()** with optional parameters:

```python
async def execute(
    self,
    request: ExecutionRequest,
    engine_selections: Optional[List[EngineSelection]] = None,
    seed_selections: Optional[List[SeedSelection]] = None,
    allow_auto_select: bool = True
) -> ECUExecutionResult:
    
    # Automatic resolution
    if allow_auto_select and engine_selections is None:
        engines = self.engine_registry.get_active_engines()
        seeds = self.seed_registry.get_active_seeds()
        
        engine_selections = self.capability_resolver.resolve(
            request, engines, seeds
        )
        
        if not engine_selections:
            raise NoSuitableEngineError(request)
    
    if allow_auto_select and seed_selections is None:
        seed_selections = self.capability_resolver.select_seeds(
            engine_selections,
            request.preferred_seeds,
            self.seed_registry.get_active_seeds()
        )
    
    return await self._execute_with_selections(
        request, engine_selections, seed_selections
    )
```

---
