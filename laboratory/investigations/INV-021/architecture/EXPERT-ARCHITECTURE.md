# Engineering Expert Architecture Specification

**Document ID**: KDE-EXPERT-ARCH-001  
**Title**: Engineering Expert Artifact Architecture  
**Version**: 0.1.0  
**Status**: CANDIDATE  
**Confidence**: HIGH  
**Class**: ARCHITECTURE  
**Investigation**: INV-021  
**Date**: 2026-07-21  

---

## 1. Definition

### 1.1 What is an Engineering Expert?

An **Engineering Expert** is a first-class KDE artifact that encapsulates domain-specific knowledge, capabilities, and validation criteria for producing high-quality engineering artifacts in a specific domain. Unlike Knowledge Documents that record what is known, an Engineering Expert codifies how to apply that knowledge to generate engineering outputs.

| Aspect | Knowledge Document | Engineering Expert |
|--------|-------------------|--------------------|
| **Purpose** | Record validated understanding | Apply knowledge to generate artifacts |
| **Content** | Definitions, rules, evidence | Capabilities, validation criteria, patterns |
| **Output** | Reference material | Engineering artifacts (code, diagrams, designs) |
| **Action** | Inform | Execute/Generate |
| **Lifecycle** | DRAFT → PROMOTED | SYNTHESIZED → REGISTERED |
| **Owner** | Governance | Runtime |

### 1.2 Expert Characteristics

| Characteristic | Description | Evidence |
|---------------|-------------|----------|
| **Domain-Specific** | Operates within a defined engineering domain | Domain boundary defined |
| **Capability-Based** | Describes what it can do, not just what it knows | Capability specification |
| **Knowledge-Integrated** | References validated Knowledge Documents | Knowledge dependencies |
| **Validated** | Passes evidence-based validation | Validation criteria and evidence |
| **Discoverable** | Can be located by Runtime | Registry entry |
| **Versioned** | Evolves with version control | Version history |

### 1.3 Expert vs. Skill vs. Knowledge

| Artifact | Purpose | Source | Lifecycle | Action |
|----------|---------|--------|-----------|--------|
| **Knowledge Document** | Record validated understanding | Investigation | DRAFT → PROMOTED | Inform |
| **Engineering Expert** | Generate domain artifacts | Synthesis + Validation | SYNTHESIZED → REGISTERED | Execute |
| **Skill** | Guide agent behavior | Investigation | DRAFT → PROMOTED | Guide |
| **SOP** | Define procedural steps | Governance | APPROVED | Follow |

---

## 2. Engineering Expert Model

### 2.1 Artifact Structure

```
experts/
└── {domain}/
    └── {expert-id}/
        ├── expert.yaml           # Expert metadata and specification
        ├── capabilities.yaml     # What the Expert can do
        ├── knowledge-refs.yaml   # Knowledge dependencies
        ├── validation.yaml       # Validation criteria
        ├── implementation/       # Expert implementation
        │   ├── prompts/          # Prompt templates
        │   ├── patterns/         # Reusable patterns
        │   └── validators/       # Output validators
        ├── changelog.md          # Version history
        └── registry.yaml         # Registry entry
```

### 2.2 Metadata Specification (expert.yaml)

```yaml
---
id: KDE-EXPERT-{DOMAIN}-{NNN}
name: {Human-readable name}
version: {X.Y.Z}
status: {SYNTHESIZED|CANDIDATE|VALIDATED|REGISTERED|DEPRECATED}
domain: {Domain identifier}
confidence: {LOW|MEDIUM|HIGH}
evidence-level: {1-5}
owner: {Owner entity}
created: {ISO8601}
updated: {ISO8601}
source-investigation: {INV-XXX}
validation-investigation: {INV-YYY}
approver: {Name}
registered: {ISO8601}
---
```

### 2.3 Capability Specification (capabilities.yaml)

```yaml
capabilities:
  - id: {capability-id}
    name: {Capability name}
    description: {What this capability does}
    inputs:
      - name: {Input name}
        type: {Data type}
        required: {boolean}
        description: {Input description}
    outputs:
      - name: {Output name}
        type: {Data type}
        description: {Output description}
    validation:
      - criterion: {Validation criterion}
        method: {how to validate}
        expected: {expected result}
    knowledge_dependencies:
      - {Knowledge ID}
    skill_dependencies:
      - {Skill ID}
    examples:
      - input: {Example input}
        output: {Expected output}
```

### 2.4 Knowledge References (knowledge-refs.yaml)

```yaml
knowledge_dependencies:
  - id: {Knowledge ID}
    version: {Version or "any"}
    required_sections:
      - {Section name}
    usage:
      - purpose: {How used}
        priority: {critical|high|medium|low}
        integration: {How integrated into Expert}

ownership:
  expert_owns: {What Expert generates}
  knowledge_owns: {What Knowledge defines}
  boundary: {Where Expert ends and Knowledge begins}
```

### 2.5 Validation Specification (validation.yaml)

```yaml
validation:
  criteria:
    - id: {Criterion ID}
      description: {What is validated}
      method: {Validation method}
      evidence_required: {Evidence types needed}
      pass_threshold: {Numeric or percentage}
      test_cases:
        - name: {Test case name}
          input: {Test input}
          expected: {Expected output}
          validation: {How output is validated}
  repeatability:
    required: {boolean}
    test_runs: {Number of runs for validation}
    tolerance: {Acceptable variation}
  consistency:
    deterministic: {boolean}
    variation_allowed: {Description of allowed variation}
```

---

## 3. Repository Structure

### 3.1 Location Options Analysis

| Option | Path | Advantages | Disadvantages | Recommendation |
|--------|------|------------|---------------|----------------|
| **A** | `knowledge/experts/` | Keeps related artifacts together | Mixes execution with reference | Rejected |
| **B** | `experts/` | Clear separation, easy discovery | New top-level directory | **Recommended** |
| **C** | `runtime/experts/` | Close to runtime code | Mixes artifacts with code | Rejected |
| **D** | `knowledge/engineering/` | Domain organization | Too deep | Rejected |

### 3.2 Recommended Structure

```
kde/
├── knowledge/                    # Knowledge Documents (existing)
│   ├── foundational/
│   ├── architecture/
│   ├── domain/
│   └── governance/
├── experts/                      # Engineering Experts (NEW)
│   ├── _registry.yaml            # Expert registry index
│   ├── _lifecycle.md             # Lifecycle specification
│   └── {domain}/
│       └── {expert-id}/
│           ├── expert.yaml
│           ├── capabilities.yaml
│           ├── knowledge-refs.yaml
│           ├── validation.yaml
│           ├── implementation/
│           │   ├── prompts/
│           │   ├── patterns/
│           │   └── validators/
│           └── changelog.md
├── runtime/                      # Runtime (existing)
│   ├── runtime.py
│   ├── skills/
│   └── retrieval.py
└── laboratory/                   # Laboratory (existing)
```

### 3.3 Registry Structure (_registry.yaml)

```yaml
registry:
  version: 1.0.0
  last_updated: {ISO8601}
  experts:
    - id: KDE-EXPERT-SLD-001
      name: Single Line Diagram Expert
      version: 0.1.0
      status: CANDIDATE
      domain: electrical-engineering
      path: electrical-engineering/sld/
      registered: null
  domains:
    - name: electrical-engineering
      experts: 1
```

---

## 4. Expert Lifecycle

### 4.1 State Diagram

```
SYNTHESIZED -> CANDIDATE -> VALIDATED -> REGISTERED -> ACTIVE
                                    ^           |
                                    |           v
                                    +---- DEPRECATED
```

### 4.2 State Definitions

| State | Description | AI Can Set | Human Must Set |
|-------|-------------|------------|----------------|
| SYNTHESIZED | Expert created from investigation | Yes | - |
| CANDIDATE | Ready for validation | Yes | - |
| VALIDATED | Passed validation | Yes | - |
| REGISTERED | Entered in Expert Registry | No | Yes |
| ACTIVE | In production use | Yes | - |
| DEPRECATED | Superseded or invalid | No | Yes |

### 4.3 State Transition Table

| From | To | Authority | Evidence Required |
|------|-----|-----------|------------------|
| (new) | SYNTHESIZED | Investigator | Expert created |
| SYNTHESIZED | CANDIDATE | Investigator | Specification complete |
| CANDIDATE | SYNTHESIZED | Validator | Revision needed |
| CANDIDATE | VALIDATED | Validator | Validation passed |
| VALIDATED | REGISTERED | Human | Registration approved |
| REGISTERED | ACTIVE | Runtime | First successful use |
| ACTIVE | VALIDATED | Validator | Re-validation passed |
| ACTIVE | DEPRECATED | Human | Deprecation approved |

---

## 5. Runtime Integration

### 5.1 Discovery Process

```
Runtime Initialization -> Load Registry -> Discover by Domain -> Load Specs -> Resolve Dependencies -> Initialize -> Ready
```

### 5.2 Expert Invocation Flow

```
Investigation Request -> Identify Domain -> Find Expert -> Load Expert -> Apply Expert -> Record Usage
```

### 5.3 Runtime Behavior Specification

```python
class ExpertRuntime:
    def discover_experts(self, domain: str = None) -> List[Expert]:
        """Discover available Experts by domain."""
        
    def load_expert(self, expert_id: str) -> Expert:
        """Load a specific Expert with all specifications."""
        
    def invoke_expert(self, expert_id: str, context: dict) -> dict:
        """Invoke an Expert for a task with validation."""
        
    def report_unavailable(self, domain: str) -> Report:
        """Report when no Expert is available."""
```

---

## 6. Knowledge Integration

### 6.1 Dependency Model

Expert references Knowledge but does NOT copy it:

```
ENGINEERING EXPERT
  ├── Capabilities (what Expert can do)
  └── Knowledge References (external dependencies)
       ├── KDE-UTY-SLD-001 (principles)
       ├── KDE-UTY-SLD-002 (design rules)
       └── KDE-UTY-SLD-003 (symbols)
```

### 6.2 Ownership Boundaries

| What | Owned By | Expert Can |
|------|----------|------------|
| Domain principles | Knowledge | Reference |
| Design rules | Knowledge | Apply |
| Validation criteria | Expert | Define |
| Implementation patterns | Expert | Define |
| Output format | Expert | Define |
| Knowledge accuracy | Knowledge | Trust |

---

## 7. Governance Model

### 7.1 Expert Governance Authority

| Action | Authority | Rationale |
|--------|-----------|-----------|
| Create Expert | Investigator | SYNTHESIZED state |
| Submit for validation | Investigator | CANDIDATE state |
| Validate Expert | Validator | VALIDATED state |
| Register Expert | Human | RULE-2 (No Self-Approval) |
| Deprecate Expert | Human | Preserves governance |

### 7.2 Validation Requirements

| Validation Aspect | Requirement | Evidence |
|------------------|-------------|----------|
| Repeatability | Same input produces consistent output | 3+ test runs |
| Standards compliance | Output meets Knowledge standards | Validation checklist |
| Knowledge integration | All Knowledge references valid | Dependency check |
| Capability verification | Each capability tested | Test case per capability |

---

## 8. Example: KDE-EXPERT-SLD-001

### 8.1 Expert Specification

```yaml
# expert.yaml
---
id: KDE-EXPERT-SLD-001
name: Single Line Diagram Engineering Expert
version: 0.1.0
status: SYNTHESIZED
domain: electrical-engineering
---
```

### 8.2 Capabilities

```yaml
# capabilities.yaml
capabilities:
  - id: generate-topology
    name: Electrical Topology Generation
    description: Generate single line diagram topology
    inputs:
      - name: busbars
        type: array
        required: true
      - name: generators
        type: array
        required: false
    outputs:
      - name: topology
        type: object
    knowledge_dependencies:
      - KDE-UTY-SLD-006
```

---

## 9. References

| Document | Relationship |
|----------|--------------|
| INV-020 | Validation finding (Expert not found) |
| INV-027 | Domain knowledge (utility-sld) |
| KDE-KNOWLEDGE-LIFECYCLE.md | Lifecycle pattern reference |
| LABORATORY-RULES.md | RULE-2 (No Self-Approval) |

---

## 10. Revision History

| Version | Date | Changes | Authority |
|---------|------|---------|-----------|
| 0.1.0 | 2026-07-21 | Initial architecture | INV-021 |

---

**Document Status**: CANDIDATE  
**Confidence**: HIGH  
**Next Steps**: Validate through investigation
