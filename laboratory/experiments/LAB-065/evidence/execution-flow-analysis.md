# ECU Execution Flow Analysis

**Evidence ID**: EVID-ECU-001
**Experiment**: LAB-065
**created**: 2026-07-29T04:05:00Z
**Engine**: KDE-ENGINE-001

---

## Current ECU Execution Flow

### Trace of RuntimeECU.execute()

```python
# From runtime/ecu/__init__.py (simplified)
def execute(
    self,
    request: ExecutionRequest,
    engine_selections: List[EngineSelection],  # ← INPUT PARAMETER
    seed_selections: List[SeedSelection],       # ← INPUT PARAMETER
    ...
) -> ECUExecutionResult:
    
    # Step 1: Generate plan (uses INPUT selections)
    plan = self.execution_planner.create_plan(
        request,
        engine_selections,  # Already selected by caller
        seed_selections     # Already selected by caller
    )
    
    # Step 2: No automatic capability resolution
    # (CapabilityResolver exists but is NOT called here)
    
    # Step 3: Execute plan steps
    results = []
    for step in plan.steps:
        # Execute with pre-selected engine + seed
        result = self._execute_step(step)
        results.append(result)
    
    # Step 4: Aggregate results
    aggregated = self.result_aggregator.aggregate(...)
    
    return aggregated
```

### Missing Integration Points

| Step | What Should Happen | What Actually Happens |
|------|-------------------|----------------------|
| 1 | Classify request type | Request passed as-is |
| 2 | Resolve required capabilities | Capabilities ignored |
| 3 | Select best engine | Caller provides selection |
| 4 | Select best seed | Caller provides selection |
| 5 | Determine execution mode | Caller provides mode |
| 6 | Check governance policies | Passive checks only |

### Call Chain Analysis

```
External Caller (e.g., agent-server)
    ↓
RuntimeECU.execute(request, engine_selections, seed_selections)
    ↓
ExecutionPlanner.create_plan(request, engine_selections, seed_selections)
    ↓
[NO AUTOMATIC RESOLUTION]
    ↓
Execute with pre-selected components
```

---

## CapabilityResolver Integration Status

### What CapabilityResolver Can Do

```python
# From runtime/ecu/resolver/__init__.py
class CapabilityResolver:
    
    def resolve(
        self,
        request: ExecutionRequest,
        engines: List[EngineMetadata],
        seeds: List[SeedMetadata]
    ) -> List[EngineSelection]:
        # ✓ Matches required capabilities to engine capabilities
        # ✓ Calculates match scores
        # ✓ Ranks engines by confidence
        # ✓ Returns sorted selections
```

### Why It's Not Being Called

1. **No trigger in execute()**: The `resolve()` method is never called inside `RuntimeECU.execute()`
2. **Input parameters bypass resolution**: External callers provide pre-selected engines/seeds
3. **No automatic integration**: The resolver must be explicitly invoked by the caller

### Evidence from Code

```python
# runtime/ecu/__init__.py line ~255
def execute(self, request, engine_selections, seed_selections, ...):
    """
    Execute an investigation.
    
    Args:
        request: The execution request
        engine_selections: Selected engines ← EXTERNAL INPUT
        seed_selections: Selected seeds ← EXTERNAL INPUT
    """
    # Note: No call to self.capability_resolver.resolve()
```

---

## Recommendations

### Integration Point

Add automatic resolution to `RuntimeECU.execute()`:

```python
async def execute(
    self,
    request: ExecutionRequest,
    engine_selections: Optional[List[EngineSelection]] = None,
    seed_selections: Optional[List[SeedSelection]] = None,
    ...
) -> ECUExecutionResult:
    
    # If not provided, automatically resolve
    if not engine_selections:
        engine_selections = self.capability_resolver.resolve(
            request,
            self.engine_registry.get_active_engines(),
            self.seed_registry.get_active_seeds()
        )
    
    if not seed_selections:
        seed_selections = self.capability_resolver.select_seeds(
            engine_selections,
            request.preferred_seeds,
            self.seed_registry.get_active_seeds()
        )
    
    # Continue with execution...
```

### Additional Components Needed

1. **Request Classifier**: Determine investigation type and required capabilities
2. **Mode Selector**: Choose between SINGLE, SEQUENTIAL, PARALLEL based on task
3. **Adaptive Switch**: Allow mid-execution engine switching for stage-based workflows

---

## Conclusion

The ECU has the infrastructure for intelligent execution planning, but the actual execution path bypasses this infrastructure by requiring pre-selected engines and seeds as input parameters. Integrating the CapabilityResolver into `execute()` would enable automatic selection.

---
