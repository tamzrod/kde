# Expert System

**Version**: 1.2.0 | **Status**: APPROVED

---

## How Beta Engine Calls an Expert

```python
# 1. Engine identifies task domain
task = "Render circuit breaker CB-101"

# 2. Engine selects expert from registry
expert = registry.get_by_domain("utility-sld")  # → KDE-EXPERT-SLD-001

# 3. Engine loads expert interface + knowledge
interface = load_yaml(f"{expert.path}/interface.yaml")
knowledge = load_knowledge(interface.dependencies)

# 4. Engine invokes expert
result = expert.invoke(
    task="Render CB-101",
    action="render",
    context={"voltage_level": "115kV"},
    knowledge_refs=["KDE-PRIM-CB-001"]
)

# 5. Expert returns structured output
assert result.confidence in [HIGH, MEDIUM, LOW]
assert result.validation is not None
```

---

## Expert Structure

```
[domain]/kde-expert-[id]-001/
├── SPEC.md         # Purpose, scope, capabilities
├── interface.yaml   # Engine contract
└── CHANGELOG.md   # Version history
```

---

## Lifecycle

```
SYNTHESIZED → CANDIDATE → VALIDATED → REGISTERED → ACTIVE
                    ↓           ↓
              (revision)   (deprecated)
```

---

## Add New Expert

1. `mkdir experts/[domain]/kde-expert-[id]-001/`
2. Copy `_template/SPEC.md` + `interface.yaml`
3. Fill in details
4. Add to `_registry.yaml`
5. Commit + push

---

**v1.2.0 | 2026-07-22**
