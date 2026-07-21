# INV-021: Engineering Expert Registration

**Investigation ID**: INV-021  
**Title**: Engineering Expert Artifact Architecture  
**Type**: Architecture Investigation  
**Status**: COMPLETE  
**Created**: 2026-07-21  
**Engine**: KDE-ENGINE-004 (Delta)

---

## Executive Summary

This investigation establishes the **Engineering Expert** as a first-class KDE artifact. Based on evidence from INV-020, which demonstrated that Candidate Engineering Experts could not be located because they did not exist as repository artifacts, this investigation defines:

1. **What an Engineering Expert is** (RQ-001)
2. **Why Experts should be first-class artifacts** (RQ-002)
3. **Where Experts should reside** (RQ-003)
4. **What files constitute an Expert** (RQ-004)
5. **How Runtime discovers Experts** (RQ-005)
6. **What lifecycle Experts follow** (RQ-006)
7. **How Experts evolve** (RQ-007)
8. **How Experts reference Knowledge** (RQ-008)

### Key Deliverables

| Deliverable | Status | Location |
|-------------|--------|----------|
| Expert Architecture Specification | ✅ Complete | `architecture/EXPERT-ARCHITECTURE.md` |
| Repository Structure Proposal | ✅ Complete | Section 3 |
| Lifecycle Definition | ✅ Complete | Section 4 |
| Runtime Integration Spec | ✅ Complete | Section 5 |
| Governance Model | ✅ Complete | Section 6 |

### Recommendation

**Promote Architecture to Knowledge**

The Engineering Expert architecture is ready for governance review and potential promotion to `/knowledge/`.

---

## 1. Research Questions

### RQ-001: What is an Engineering Expert?

**Question**: What is an Engineering Expert?

**Answer**: An Engineering Expert is a first-class KDE artifact that encapsulates domain-specific knowledge, capabilities, and validation criteria for producing high-quality engineering artifacts.

**Evidence**:
- INV-020 validation report demonstrated need for codifying engineering expertise
- Knowledge Documents record what is known; Experts record how to apply that knowledge
- Domain knowledge from INV-027 (utility-sld) requires an Expert to apply

**Formal Definition** (from `EXPERT-ARCHITECTURE.md`):

```
An Engineering Expert is a first-class KDE artifact that encapsulates 
domain-specific knowledge, capabilities, and validation criteria for 
producing high-quality engineering artifacts in a specific domain.
```

**Comparison with Related Artifacts**:

| Artifact | Purpose | Lifecycle | Action |
|----------|---------|-----------|--------|
| Knowledge Document | Record validated understanding | DRAFT → PROMOTED | Inform |
| Engineering Expert | Generate domain artifacts | SYNTHESIZED → REGISTERED | Execute |
| Skill | Guide agent behavior | DRAFT → PROMOTED | Guide |
| SOP | Define procedural steps | APPROVED | Follow |

---

### RQ-002: Should Engineering Experts Be First-Class Artifacts?

**Question**: Should Engineering Experts be treated as first-class KDE artifacts?

**Answer**: **YES** - Engineering Experts should be first-class artifacts.

**Evidence**:

| Factor | Finding | Evidence |
|--------|---------|----------|
| Discoverability | Runtime cannot find Experts | INV-020 validation report |
| Lifecycle | Experts need distinct states | SYNTHESIZED → REGISTERED |
| Governance | Experts need human registration | RULE-2 (No Self-Approval) |
| Validation | Experts need validation criteria | Standards compliance |
| Versioning | Experts evolve with knowledge | Change tracking |

**Advantages of First-Class Status**:

1. **Discoverable**: Runtime can locate Experts by domain
2. **Versionable**: Experts track their evolution
3. **Governable**: Human registration required
4. **Validatable**: Evidence-based validation criteria
5. **Traceable**: Bidirectional knowledge references

**Alternative Rejected**: Treating Experts as Skills

| Aspect | Expert | Skill |
|--------|--------|-------|
| Primary action | Generate | Guide |
| Output | Artifacts | Instructions |
| Validation | Output quality | Compliance |
| Lifecycle | SYNTHESIZED→REGISTERED | DRAFT→PROMOTED |

---

### RQ-003: Repository Location

**Question**: Where should Engineering Experts reside within the KDE repository?

**Answer**: Engineering Experts should reside at `experts/` (top-level directory).

**Evidence**:

| Option | Path | Evaluation |
|--------|------|------------|
| A | `knowledge/experts/` | ❌ Mixes reference with execution |
| B | `experts/` | ✅ Clear separation, easy discovery |
| C | `runtime/experts/` | ❌ Mixes artifacts with code |
| D | `knowledge/engineering/` | ❌ Too deep, inconsistent |

**Proposed Structure**:

```
kde/
├── knowledge/                    # Knowledge Documents
├── experts/                      # Engineering Experts (NEW)
│   ├── _registry.yaml            # Expert registry index
│   ├── _lifecycle.md             # Lifecycle specification
│   └── {domain}/
│       └── {expert-id}/
│           ├── expert.yaml
│           ├── capabilities.yaml
│           ├── knowledge-refs.yaml
│           ├── validation.yaml
│           └── implementation/
├── runtime/
└── laboratory/
```

**Rationale**:
- `experts/` provides clear separation from Knowledge
- Easy discovery by Runtime
- Consistent with top-level directory pattern
- Allows domain organization

---

### RQ-004: Required Files

**Question**: What files constitute an Engineering Expert?

**Answer**: An Expert requires 4 core files plus optional implementation directory.

**Evidence**: Based on Expert model analysis and KDE artifact patterns.

**Required Files**:

| File | Purpose | Content |
|------|---------|---------|
| `expert.yaml` | Expert metadata | ID, version, status, domain |
| `capabilities.yaml` | Capability specification | What Expert can do |
| `knowledge-refs.yaml` | Knowledge dependencies | External Knowledge references |
| `validation.yaml` | Validation criteria | How Expert is validated |

**Optional Files**:

| File | Purpose | When Required |
|------|---------|---------------|
| `implementation/` | Expert implementation | When Expert has code |
| `changelog.md` | Version history | Always recommended |

**Minimum Artifact Set**: 4 files (expert.yaml, capabilities.yaml, knowledge-refs.yaml, validation.yaml)

---

### RQ-005: Discovery Mechanism

**Question**: How should the KDE Runtime discover Engineering Experts?

**Answer**: Runtime discovers Experts through a registry-based approach.

**Evidence**: Based on Runtime behavior and Knowledge retrieval patterns.

**Discovery Process**:

```
1. Runtime initializes
2. Load experts/_registry.yaml
3. Filter by domain (if specified)
4. Filter by status (REGISTERED or ACTIVE)
5. Load Expert specifications
6. Resolve Knowledge dependencies
7. Initialize Expert for use
```

**Runtime Functions**:

```python
discover_experts(domain: str = None) -> List[Expert]
load_expert(expert_id: str) -> Expert
invoke_expert(expert_id: str, context: dict) -> dict
report_unavailable(domain: str) -> Report
```

**Behavior When Not Found**:

```
Investigation Request (domain: electrical-engineering)
        │
        ▼
┌───────────────────────┐
│ Discover Experts       │
│ Filter: REGISTERED    │
└───────────┬───────────┘
            │
      ┌─────┴─────┐
      │           │
    Found      Not Found
      │           │
      ▼           ▼
┌───────────┐ ┌───────────────┐
│ Load and  │ │ Report:       │
│ Use       │ │ "No Expert    │
│           │ │ available for  │
│           │ │ electrical-    │
│           │ │ engineering"   │
└───────────┘ └───────────────┘
```

---

### RQ-006: Expert Lifecycle

**Question**: What lifecycle should Engineering Experts follow?

**Answer**: Experts follow a 6-state lifecycle: SYNTHESIZED → CANDIDATE → VALIDATED → REGISTERED → ACTIVE → DEPRECATED

**Evidence**: Based on Knowledge lifecycle and validation findings.

**Lifecycle States**:

| State | Description | Authority |
|-------|-------------|-----------|
| SYNTHESIZED | Expert created from investigation | Investigator |
| CANDIDATE | Ready for validation | Investigator |
| VALIDATED | Passed validation | Validator |
| REGISTERED | Entered in Expert Registry | Human |
| ACTIVE | In production use | Runtime |
| DEPRECATED | Superseded or invalid | Human |

**State Diagram**:

```
SYNTHESIZED ─► CANDIDATE ─► VALIDATED ─► REGISTERED ─► ACTIVE
                    │              │            │
                    ▼              ▼            ▼
              (reject)         (reject)    DEPRECATED
```

**Transition Table**:

| From | To | Authority | Evidence |
|------|-----|-----------|----------|
| (new) | SYNTHESIZED | Investigator | Expert created |
| SYNTHESIZED | CANDIDATE | Investigator | Spec complete |
| CANDIDATE | VALIDATED | Validator | Validation passed |
| CANDIDATE | SYNTHESIZED | Validator | Revision needed |
| VALIDATED | REGISTERED | Human | RULE-2 compliance |
| REGISTERED | ACTIVE | Runtime | First use |
| ACTIVE | DEPRECATED | Human | Deprecation approved |

**Why REGISTERED requires Human Authority**:
- RULE-2 (No Self-Approval): AI cannot approve its own artifacts
- Expert registration makes Expert available for production use
- Human must verify Expert quality before production deployment

---

### RQ-007: Expert Evolution

**Question**: How should Engineering Experts evolve?

**Answer**: Experts evolve through validation cycles when Knowledge is updated or new evidence is collected.

**Evidence**: Based on Knowledge lifecycle and validation patterns.

**Evolution Triggers**:

| Trigger | Source | Action |
|---------|--------|--------|
| Knowledge updated | Knowledge lifecycle | Review Expert integration |
| New validation evidence | Laboratory | Re-validate Expert |
| Lessons learned | Investigation | Update capabilities |
| Domain expansion | New investigation | Extend Expert |
| Deprecation | Human decision | Deprecate Expert |

**Evolution Process**:

```
Knowledge Update
      │
      ▼
┌───────────────────────┐
│ Expert references     │
│ updated Knowledge     │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│ Expert status:        │
│ VALIDATED → DRAFT     │
│ (requires re-validation)│
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│ Re-validate Expert    │
│ - Check references    │
│ - Test capabilities   │
│ - Verify outputs      │
└───────────┬───────────┘
            │
      ┌─────┴─────┐
      │           │
    Pass        Fail
      │           │
      ▼           ▼
┌───────────┐ ┌───────────────┐
│ VALIDATED  │ │ Update Expert │
└───────────┘ └───────────────┘
```

**Version Management**:

| Change Type | Version Bump | Example |
|-------------|-------------|---------|
| Major | X.0.0 | New capabilities, breaking changes |
| Minor | 0.X.0 | Additional capabilities, refined validation |
| Patch | 0.0.X | Bug fixes, documentation updates |

---

### RQ-008: Knowledge References

**Question**: How should Engineering Experts reference Knowledge?

**Answer**: Experts reference Knowledge through explicit, traceable dependencies without duplicating content.

**Evidence**: Based on Knowledge ownership patterns and Expert architecture.

**Reference Model**:

```
┌─────────────────────────────────────────────────────────────┐
│                    ENGINEERING EXPERT                        │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                 Capabilities                         │   │
│  │  - Defines what Expert can do                        │   │
│  │  - References Knowledge for domain rules             │   │
│  │  - Specifies integration points                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                │
│                           ▼                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Knowledge References                   │   │
│  │                                                      │   │
│  │  - KDE-UTY-SLD-001 (principles)                      │   │
│  │  - KDE-UTY-SLD-002 (design-rules)                   │   │
│  │  - KDE-UTY-SLD-003 (symbols)                        │   │
│  │                                                      │   │
│  │  Expert references Knowledge but does NOT copy it    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Ownership Boundaries**:

| What | Owned By | Expert Can |
|------|----------|------------|
| Domain principles | Knowledge | Reference |
| Design rules | Knowledge | Apply |
| Validation criteria | Expert | Define |
| Implementation patterns | Expert | Define |
| Output format | Expert | Define |
| Knowledge accuracy | Knowledge | Trust |

**Traceability Requirements**:

Every Expert SHALL maintain:
1. List of Knowledge dependencies
2. Sections used from each Knowledge
3. Integration point in Expert
4. Bidirectional links (Expert → Knowledge, Knowledge → Expert)

---

## 2. Architecture Specification

### 2.1 Overview

The Engineering Expert architecture is documented in full at:
`architecture/EXPERT-ARCHITECTURE.md`

### 2.2 Key Components

| Component | Purpose |
|-----------|---------|
| Artifact Model | Defines what constitutes an Expert |
| Repository Structure | Where Experts reside |
| Lifecycle | States and transitions |
| Runtime Integration | How Runtime uses Experts |
| Knowledge Integration | How Experts reference Knowledge |
| Governance Model | Authority and validation |

---

## 3. Repository Proposal

### 3.1 Proposed Structure

```
kde/
├── knowledge/                    # Knowledge Documents (existing)
│   ├── foundational/
│   ├── architecture/
│   ├── domain/
│   │   └── utility-sld/         # SLD domain knowledge
│   └── governance/
├── experts/                      # Engineering Experts (NEW)
│   ├── _registry.yaml           # Expert registry
│   ├── _lifecycle.md            # Lifecycle specification
│   └── electrical-engineering/   # Domain
│       └── sld/                  # SLD Expert
│           ├── expert.yaml
│           ├── capabilities.yaml
│           ├── knowledge-refs.yaml
│           ├── validation.yaml
│           └── changelog.md
├── runtime/                      # Runtime (existing)
└── laboratory/                   # Laboratory (existing)
```

### 3.2 Registry Format

```yaml
# experts/_registry.yaml
registry:
  version: 1.0.0
  experts:
    - id: KDE-EXPERT-SLD-001
      name: Single Line Diagram Expert
      status: CANDIDATE
      domain: electrical-engineering
      path: electrical-engineering/sld/
```

---

## 4. Runtime Integration

### 4.1 Discovery

Runtime discovers Experts by:
1. Loading `experts/_registry.yaml`
2. Filtering by domain
3. Filtering by status (REGISTERED or ACTIVE)
4. Loading Expert specifications

### 4.2 Invocation

```
Investigation Request
        │
        ▼
┌───────────────────────┐
│ Identify Domain       │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│ Find Expert          │
│ Check Registry       │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│ Load Expert           │
│ - expert.yaml         │
│ - capabilities.yaml   │
│ - knowledge-refs.yaml │
│ - validation.yaml     │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│ Apply Expert          │
│ - Use prompts         │
│ - Apply patterns       │
│ - Validate output      │
└───────────────────────┘
```

---

## 5. Governance Proposal

### 5.1 Authority Matrix

| Action | Authority | Rationale |
|--------|-----------|-----------|
| Create Expert | Investigator | SYNTHESIZED state |
| Submit for validation | Investigator | CANDIDATE state |
| Validate Expert | Validator | VALIDATED state |
| Register Expert | Human | RULE-2 compliance |
| Deprecate Expert | Human | Governance authority |

### 5.2 Validation Requirements

| Aspect | Requirement |
|--------|-------------|
| Repeatability | 3+ test runs with consistent output |
| Standards compliance | Validation checklist |
| Knowledge integration | All references valid |
| Capability verification | Test case per capability |

---

## 6. Evidence Register

| Evidence | Description | Source |
|----------|-------------|--------|
| INV-020 | Expert not found | validation-report.md |
| INV-027 | SLD knowledge extracted | utility-sld/ |
| RULE-2 | No Self-Approval | LABORATORY-RULES.md |
| Knowledge Lifecycle | Pattern for Expert lifecycle | KDE-KNOWLEDGE-LIFECYCLE.md |
| Artifact Spec | Pattern for Expert spec | KDE-KNOWLEDGE-DOCUMENT-SPECIFICATION.md |

---

## 7. Lessons Learned

### 7.1 What This Investigation Validated

1. **Experts are distinct from Knowledge**: Experts generate; Knowledge informs
2. **Experts need lifecycle management**: SYNTHESIZED → REGISTERED
3. **Human registration required**: RULE-2 applies to Experts
4. **Discovery mechanism needed**: Registry-based approach
5. **Validation criteria essential**: Output quality assurance

### 7.2 What Gaps Remain

1. **Expert implementation**: Architecture defined; implementation needed
2. **Runtime integration**: Functions specified; code not written
3. **Validation test suite**: Criteria defined; tests not created

---

## 8. Deliverables

| Deliverable | Status | Location |
|-------------|--------|----------|
| Architecture Specification | ✅ | `architecture/EXPERT-ARCHITECTURE.md` |
| Repository Structure | ✅ | Section 3 |
| Lifecycle Definition | ✅ | Section 4 |
| Runtime Integration | ✅ | Section 5 |
| Governance Model | ✅ | Section 6 |
| Evidence Register | ✅ | Section 6 |

---

## 9. Recommendation

### 9.1 Decision

**PROMOTE Architecture to Knowledge**

The Engineering Expert architecture is evidence-based, complete, and ready for governance review.

### 9.2 Rationale

1. Based on evidence from INV-020 (Expert not found)
2. Follows established KDE patterns (Knowledge lifecycle)
3. Complies with Laboratory Rules (RULE-2)
4. Addresses all 8 research questions
5. Complete artifact specification provided

### 9.3 Next Steps

| Step | Action | Owner |
|------|--------|-------|
| 1 | Review architecture | Governance |
| 2 | Approve repository structure | Governance |
| 3 | Implement Expert registry | Runtime |
| 4 | Create KDE-EXPERT-SLD-001 | Investigator |
| 5 | Validate first Expert | Laboratory |

---

## 10. Research Question Summary

| RQ | Question | Answer |
|----|----------|--------|
| RQ-001 | What is an Engineering Expert? | First-class artifact for generating domain artifacts |
| RQ-002 | First-class artifact? | YES - Required for discovery, governance, validation |
| RQ-003 | Repository location? | `experts/` (top-level) |
| RQ-004 | Required files? | 4 core files (expert.yaml, capabilities.yaml, knowledge-refs.yaml, validation.yaml) |
| RQ-005 | Discovery mechanism? | Registry-based discovery by Runtime |
| RQ-006 | Lifecycle? | SYNTHESIZED → CANDIDATE → VALIDATED → REGISTERED → ACTIVE → DEPRECATED |
| RQ-007 | Evolution? | Triggered by Knowledge updates, validation evidence, lessons learned |
| RQ-008 | Knowledge references? | Explicit dependencies with ownership boundaries |

---

## 11. Investigation Status

**COMPLETE**

---

*Generated by KDE under INV-021*  
*Engineering Expert Artifact Architecture Investigation*
