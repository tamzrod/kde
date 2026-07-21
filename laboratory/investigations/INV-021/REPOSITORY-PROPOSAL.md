# INV-021: Repository Structure Proposal for Engineering Experts

**Investigation ID**: INV-021  
**Title**: Engineering Expert Repository Structure  
**Status**: CANDIDATE  
**Date**: 2026-07-21  

---

## 1. Proposal Summary

This document proposes a repository structure for Engineering Experts within the KDE Knowledge Discovery Engine.

**Recommendation**: Create `experts/` as a top-level directory alongside `knowledge/`, `runtime/`, and `laboratory/`.

---

## 2. Evaluation of Alternatives

### 2.1 Options Considered

| Option | Path | Pros | Cons | Recommendation |
|--------|------|------|------|----------------|
| A | `knowledge/experts/` | Keeps related artifacts together | Mixes execution with reference | ❌ Rejected |
| B | `experts/` | Clear separation, easy discovery | New top-level directory | ✅ **Recommended** |
| C | `runtime/experts/` | Close to runtime code | Mixes artifacts with code | ❌ Rejected |
| D | `knowledge/engineering/` | Domain organization | Too deep, inconsistent | ❌ Rejected |
| E | `laboratory/experts/` | Part of investigation system | Wrong conceptual grouping | ❌ Rejected |

### 2.2 Rejection Rationale

| Option | Reason for Rejection |
|--------|---------------------|
| A | `knowledge/` is for reference material; Experts execute, not reference |
| C | `runtime/` is for code; Experts are artifacts, not code |
| D | Deep nesting makes discovery difficult; inconsistent with `knowledge/` |
| E | Laboratory is for investigations; Experts are for production use |

---

## 3. Proposed Structure

### 3.1 Top-Level Structure

```
kde/
├── knowledge/                    # Knowledge Documents
│   ├── foundational/             # Foundational documents
│   ├── architecture/            # Architecture documents
│   ├── domain/                  # Domain knowledge
│   │   ├── utility-sld/         # SLD domain
│   │   ├── gis/                # GIS domain
│   │   └── visualization/       # Visualization domain
│   └── governance/              # Governance documents
├── experts/                      # Engineering Experts (NEW)
│   ├── _registry.yaml           # Expert registry
│   ├── _lifecycle.md             # Expert lifecycle
│   └── {domain}/                # Domain organization
│       └── {expert-id}/          # Individual Expert
├── runtime/                      # Runtime system
│   ├── runtime.py
│   ├── skills/
│   ├── retrieval.py
│   └── orchestration/
├── laboratory/                   # Laboratory system
│   ├── investigations/
│   ├── experiments/
│   └── validations/
├── governance/                    # Governance system
└── seeds/                         # Seeds
```

### 3.2 Expert Directory Structure

```
experts/
├── _registry.yaml                 # Registry index
├── _lifecycle.md                  # Lifecycle specification
├── _specification.md              # Expert artifact specification
└── {domain}/
    └── {expert-id}/
        ├── expert.yaml            # Expert metadata
        ├── capabilities.yaml      # Capability definitions
        ├── knowledge-refs.yaml   # Knowledge dependencies
        ├── validation.yaml        # Validation criteria
        ├── implementation/         # Implementation (optional)
        │   ├── prompts/           # Prompt templates
        │   ├── patterns/           # Reusable patterns
        │   └── validators/         # Output validators
        ├── tests/                  # Validation tests (optional)
        │   ├── test-capability-1.yaml
        │   ├── test-capability-2.yaml
        │   └── ...
        └── changelog.md            # Version history
```

---

## 4. Registry Specification

### 4.1 Registry Format

```yaml
# experts/_registry.yaml
registry:
  version: 1.0.0
  last_updated: 2026-07-21
  domains:
    - name: electrical-engineering
      description: Electrical power systems engineering
      experts:
        - id: KDE-EXPERT-SLD-001
          name: Single Line Diagram Expert
          status: CANDIDATE
          version: 0.1.0
          registered: null
    - name: frontend
      description: Frontend web development
      experts:
        - id: KDE-EXPERT-UI-001
          name: Frontend Design Expert
          status: REGISTERED
          version: 1.0.0
          registered: 2026-07-21
  experts:
    - id: KDE-EXPERT-SLD-001
      name: Single Line Diagram Expert
      version: 0.1.0
      status: CANDIDATE
      domain: electrical-engineering
      path: electrical-engineering/sld/
      registered: null
    - id: KDE-EXPERT-UI-001
      name: Frontend Design Expert
      version: 1.0.0
      status: REGISTERED
      domain: frontend
      path: frontend/design/
      registered: 2026-07-21
```

### 4.2 Registry Governance

| Field | Required | Description |
|-------|----------|-------------|
| id | Yes | Unique Expert identifier |
| name | Yes | Human-readable name |
| version | Yes | Semantic version |
| status | Yes | Current lifecycle state |
| domain | Yes | Engineering domain |
| path | Yes | Relative path to Expert files |
| registered | Yes | Registration timestamp (null if not registered) |

---

## 5. Migration Plan

### 5.1 Phase 1: Create Structure

1. Create `experts/` directory
2. Create `experts/_registry.yaml` with empty registry
3. Create `experts/_lifecycle.md` with lifecycle specification
4. Create `experts/_specification.md` with Expert artifact spec

### 5.2 Phase 2: First Expert

1. Create `experts/electrical-engineering/sld/`
2. Create `expert.yaml` for KDE-EXPERT-SLD-001
3. Create `capabilities.yaml`
4. Create `knowledge-refs.yaml`
5. Create `validation.yaml`
6. Add to registry

### 5.3 Phase 3: Validation

1. Validate Expert discovery
2. Validate Expert invocation
3. Validate output quality
4. Promote to REGISTERED (human approval)

---

## 6. Evidence

| Evidence | Source | Support |
|----------|--------|---------|
| Discovery requirement | INV-020 | Runtime could not locate Expert |
| Knowledge pattern | KDE-KNOWLEDGE-LIFECYCLE.md | Artifact lifecycle pattern |
| RULE-2 compliance | LABORATORY-RULES.md | Human approval required |

---

## 7. Recommendation

**Approve `experts/` as top-level directory for Engineering Experts.**

### Rationale

1. Clear separation from Knowledge (execution vs. reference)
2. Easy discovery (top-level directory)
3. Domain organization (nested by domain)
4. Registry-based lookup (indexed)
5. Consistent with KDE structure patterns

---

## 8. Next Steps

| Step | Action | Owner |
|------|--------|-------|
| 1 | Governance review | Governance |
| 2 | Approve structure | Governance |
| 3 | Create `experts/` directory | Runtime |
| 4 | Create registry files | Runtime |
| 5 | Populate first Expert | Investigator |

---

**Status**: CANDIDATE  
**Ready for Governance Review**: Yes
