# INV-057: Human-Facing Documentation Reconstruction

**Investigation ID**: INV-057
**Date**: 2026-07-27
**Engine**: KDE-ENGINE-002
**Seed**: SEED-001
**Status**: COMPLETE
**Authority**: Investigation Proposal (Human-Authorized)

---

## Executive Summary

This investigation designs the complete human-facing documentation architecture for KDE from first principles.

**Approach**: Blank slate design, independent of current /docs structure.

---

## 1. Audience Definition

### Primary Audiences

| Audience | Need | Priority |
|----------|------|----------|
| **First-time Reader** | Understanding what KDE is and why it matters | PRIMARY |
| **Evaluator** | Assessing KDE for adoption | PRIMARY |
| **Practitioner** | Using KDE methodology | SECONDARY |
| **Contributor** | Extending or improving KDE | SECONDARY |

### Audience Definitions

#### First-time Reader

A person encountering KDE for the first time. They need:
- What KDE is (clear definition)
- Why KDE exists (problem it solves)
- How KDE works (high-level overview)
- How to get started (first steps)

**Assumption**: No prior knowledge of KDE methodology.

#### Evaluator

A person deciding whether to adopt KDE. They need:
- KDE's value proposition
- Comparison to alternatives
- Evidence of effectiveness
- Implementation requirements

**Assumption**: Technically sophisticated but unfamiliar with KDE.

#### Practitioner

A person actively using KDE. They need:
- Workflow guidance
- Command reference
- Troubleshooting
- Best practices

**Assumption**: Already understands KDE basics.

#### Contributor

A person extending KDE. They need:
- Architecture documentation
- Governance rules
- Development guidelines
- Contribution process

**Assumption**: Familiar with KDE and technical implementation.

---

## 2. Documentation Vision

### Vision Statement

> **KDE Documentation** enables humans to understand, evaluate, and apply knowledge discovery engineering methodology through clear explanation, evidence-based reasoning, and progressive learning.

### Core Purpose

| Purpose | Description |
|---------|-------------|
| **Understand** | Learn what KDE is and why it matters |
| **Evaluate** | Assess KDE's value for specific use cases |
| **Apply** | Use KDE methodology effectively |
| **Extend** | Contribute to KDE's evolution |

---

## 3. Documentation Philosophy

### Foundational Principles

| Principle | Application | Source |
|-----------|-------------|--------|
| **Evidence over assertion** | Every claim cites sources | 5-Principles |
| **Progressive disclosure** | Simple first, complex later | UX design |
| **Human-centered** | Written for humans, not AI | Audience analysis |
| **Complete narratives** | Tell the full story | KDE story |
| **Traceable decisions** | Link to investigations | LAB philosophy |

### Writing Standards

| Standard | Rule |
|----------|------|
| **Citations** | Every factual claim links to evidence |
| **Examples** | Abstract concepts illustrated with concrete examples |
| **Structure** | Consistent document template |
| **Voice** | Direct, active, confident |
| **Completeness** | Answer why, not just how |

---

## 4. KDE Story

### The Narrative Foundation

**Opening Question** (from README.md):
> "What must we understand before we can define Knowledge Discovery Engine?"

### The KDE Story Arc

| Phase | Question | Answer |
|-------|----------|--------|
| **Beginning** | Why does KDE exist? | Knowledge is valuable but undisciplined |
| **Conflict** | What problems exist? | Ad-hoc approaches, no validation, no governance |
| **Resolution** | What is KDE? | Evidence-based, systematic, governed methodology |
| **Implications** | What can you do with it? | Apply, extend, contribute |

### Key Themes

| Theme | Evidence | Importance |
|-------|----------|------------|
| **Discovery** | "Knowledge Discovery Engine" | KDE is about finding knowledge |
| **Engineering** | Scientific methodology | Rigorous, not casual |
| **Governance** | 5 Principles | Human oversight required |
| **Evolution** | 6 Generations | KDE learns from itself |

---

## 5. Knowledge Architecture

### Documentation Categories

Based on audience needs and content purpose:

| Category | Purpose | Audience |
|----------|---------|----------|
| **Introduction** | Orientation and motivation | First-time, Evaluator |
| **Philosophy** | Core principles | First-time, Evaluator |
| **How It Works** | Mechanics and flow | Practitioner |
| **Getting Started** | First steps | Practitioner |
| **Guides** | Task-based help | Practitioner |
| **Reference** | Technical details | Contributor |
| **History** | Evolution and lessons | All |

### Alternative Considered: Layered Architecture

| Layer | Depth | Audience |
|-------|-------|----------|
| **Overview** | Shallow | First-time |
| **Guide** | Medium | Practitioner |
| **Reference** | Deep | Contributor |

**Decision**: Rejected layered approach. Audience transitions make linear reading difficult.

**Selected**: Category-based with audience tagging.

---

## 6. Learning Journey

### Path 1: Understanding KDE

For First-time Readers and Evaluators:

```
1. Introduction/
   ├── what-is-kde.md          [START HERE]
   ├── why-kde-exists.md
   ├── kde-vs-alternatives.md
   └── quick-overview.md

2. Philosophy/
   ├── evidence-before-claims.md
   ├── governance-model.md
   ├── scientific-approach.md
   └── five-principles.md

3. History/
   ├── kde-evolution.md
   ├── key-milestones.md
   └── lessons-learned.md
```

### Path 2: Using KDE

For Practitioners:

```
4. Getting Started/
   ├── prerequisites.md
   ├── first-investigation.md
   ├── understanding-evidence.md
   └── common-patterns.md

5. How It Works/
   ├── investigation-lifecycle.md
   ├── experiment-workflow.md
   ├── knowledge-promotion.md
   └── governance-process.md

6. Guides/
   ├── running-an-investigation.md
   ├── conducting-an-experiment.md
   ├── writing-investigation.md
   └── using-aliases.md
```

### Path 3: Extending KDE

For Contributors:

```
7. Architecture/
   ├── system-overview.md
   ├── engine-model.md
   ├── seed-model.md
   ├── ecu-architecture.md
   └── repository-structure.md

8. Reference/
   ├── commands.md
   ├── aliases.md
   ├── glossary.md
   ├── governance-reference.md
   └── api-reference.md

9. Contributing/
   ├── how-to-contribute.md
   ├── governance-rules.md
   ├── investigation-standards.md
   └── experimental-guidelines.md
```

### Knowledge Prerequisites

| Document | Requires | Provides |
|----------|----------|----------|
| what-is-kde.md | None | Foundation |
| why-kde-exists.md | what-is-kde.md | Context |
| five-principles.md | what-is-kde.md | Philosophy |
| first-investigation.md | what-is-kde.md, philosophy | Application |
| system-overview.md | what-is-kde.md | Architecture |

---

## 7. Documentation Hierarchy

### Root Structure

```
/docs/
├── index.md                  # Entry point (START HERE)
├── README.md                 # Quick navigation
│
├── 1-introduction/          # Orientation
├── 2-philosophy/            # Principles
├── 3-history/               # Evolution
├── 4-getting-started/        # First steps
├── 5-how-it-works/           # Mechanics
├── 6-guides/                 # Tasks
├── 7-architecture/           # Technical
├── 8-reference/              # Details
└── 9-contributing/          # Extension
```

### Numbered Prefixes

Rationale: Establishes reading order without enforcing it.

| Prefix | Category | Purpose |
|--------|----------|---------|
| 1 | Introduction | "What is this?" |
| 2 | Philosophy | "Why does it work this way?" |
| 3 | History | "How did it get here?" |
| 4 | Getting Started | "How do I begin?" |
| 5 | How It Works | "How does it function?" |
| 6 | Guides | "How do I do X?" |
| 7 | Architecture | "How is it built?" |
| 8 | Reference | "What are the details?" |
| 9 | Contributing | "How do I extend it?" |

---

## 8. Navigation Model

### Entry Points

| Entry | Document | Audience |
|-------|----------|----------|
| **Primary** | /docs/index.md | First-time reader |
| **Quick Start** | /docs/4-getting-started/prerequisites.md | Impatient reader |
| **Reference** | /docs/8-reference/commands.md | Practitioner |

### Cross-References

Every document should include:

```
## See Also
- [Related Topic](../category/document.md)
- [Background Context](../category/background.md)
```

### Navigation Aids

| Element | Location | Purpose |
|---------|----------|---------|
| **Progress indicator** | index.md | Shows reading journey |
| **Breadcrumbs** | All docs | Shows location |
| **Quick links** | index.md | Jump to common topics |
| **Search** | All pages | Find specific content |

---

## 9. Writing Standards

### Document Template

```markdown
# [Document Title]

**Purpose**: One-sentence summary
**Audience**: [Target audience]
**Prerequisites**: [What to read first]

---

## Overview

[2-3 sentence introduction]

## [Section 1]

[Content]

## [Section 2]

[Content]

## Summary

[Wrap-up with key takeaways]

## See Also

- [Related doc](../category/document.md)
```

### Citation Format

For evidence-based claims:

```
[Evidence]

> **Source**: [Document name](link)
> **Evidence**: [Quote or summary]
> **Relevance**: [Why this supports the claim]
```

### Voice and Tone

| Aspect | Standard |
|--------|----------|
| **Voice** | Active |
| **Tone** | Professional, clear |
| **Complexity** | Appropriate to audience |
| **Completeness** | Answer why and how |

---

## 10. Documentation Roadmap

### Phase 1: Foundation (Priority Order)

| Order | Document | Audience | Priority |
|-------|----------|----------|----------|
| 1 | index.md | First-time | CRITICAL |
| 2 | what-is-kde.md | First-time | CRITICAL |
| 3 | why-kde-exists.md | First-time | HIGH |
| 4 | five-principles.md | First-time | HIGH |
| 5 | kde-evolution.md | First-time | MEDIUM |

### Phase 2: Application

| Order | Document | Audience | Priority |
|-------|----------|----------|----------|
| 6 | prerequisites.md | Practitioner | HIGH |
| 7 | first-investigation.md | Practitioner | HIGH |
| 8 | investigation-lifecycle.md | Practitioner | HIGH |
| 9 | understanding-evidence.md | Practitioner | MEDIUM |

---

## Section Definitions

### Section 4: Getting Started

**Purpose**: Guide new users from zero to first successful investigation.

**Scope**:
- Prerequisites (software, environment)
- Installation/setup
- First session initialization
- Running first investigation
- Understanding output
- Next steps

**Navigation**:
```
getting-started/
├── index.md                    # Entry point for section
├── prerequisites.md            # What you need
├── installation.md             # Setup guide
├── first-session.md            # Initialize KDE
├── first-investigation.md      # Run investigation
├── understanding-output.md     # Interpret results
└── next-steps.md               # Where to go next
```

**Evidence**: BOOTSTRAP.md (session initialization), existing getting-started.md

---

### Section 5: Core Concepts

**Purpose**: Explain the fundamental building blocks of KDE.

**Scope**:
- Engine (reasoning methodology)
- Seed (foundational principles)
- ECU (orchestration)
- Laboratory (investigation workflow)
- Knowledge (validated definitions)
- Governance (rules and policies)

**Navigation**:
```
core-concepts/
├── index.md                    # Entry point
├── engines.md                  # Reasoning methodology
├── seeds.md                    # Foundational principles
├── ecu.md                      # Execution Control Unit
├── laboratory.md               # Investigation workspace
├── knowledge.md                # Validated knowledge
└── governance.md                # Rules and policies
```

**Evidence**: docs/runtime-concepts.md, README.md canonical structure

---

### Section 6: How It Works

**Purpose**: Explain the mechanics and processes of KDE.

**Scope**:
- Scientific loop (observe → hypothesize → predict → test → analyze)
- Investigation lifecycle (proposed → approved → in_progress → review → complete)
- Document state machine (draft → review → approved → validated → promoted)
- Bootstrap gates (B1, B2, B3)
- Evidence standards (fact, inference, speculation)

**Navigation**:
```
how-it-works/
├── index.md                    # Entry point
├── scientific-loop.md          # The loop
├── investigation-lifecycle.md  # Investigation process
├── state-machine.md            # Document states
├── bootstrap-gates.md          # Initialization checks
├── evidence-standards.md       # Fact vs inference vs speculation
└── knowledge-promotion.md      # How knowledge becomes official
```

**Evidence**: laboratory/scientific-loop.md, governance/STATE-MACHINE.md, laboratory.md

---

### Section 7: Guides

**Purpose**: Task-based instructions for common operations.

**Scope**:
- Running an investigation
- Conducting an experiment
- Writing investigation documents
- Using aliases
- Navigating the laboratory
- Promoting knowledge
- Handling violations

**Navigation**:
```
guides/
├── index.md                    # Entry point
├── running-investigation.md     # Step-by-step
├── conducting-experiment.md     # Lab work
├── writing-investigation.md     # Documentation
├── using-aliases.md            # Commands
├── navigating-laboratory.md     # Directory structure
├── promoting-knowledge.md      # Knowledge lifecycle
└── handling-violations.md      # When things go wrong
```

**Evidence**: Existing laboratory workflow patterns

---

### Section 8: Architecture

**Purpose**: Technical documentation of KDE's internal structure.

**Scope**:
- Repository structure
- Runtime architecture
- Engine architecture
- Seed architecture
- ECU components
- Directory organization
- File naming conventions

**Navigation**:
```
architecture/
├── index.md                    # Entry point
├── repository-structure.md     # Top-level organization
├── runtime-architecture.md     # ECU, orchestrator
├── engine-architecture.md     # Engine model
├── seed-architecture.md       # Seed model
├── directory-organization.md  # Folders explained
└── naming-conventions.md      # File naming standards
```

**Evidence**: README.md, .kde/ structure, runtime/ecu/

---

### Section 9: Reference

**Purpose**: Complete technical reference for commands and APIs.

**Scope**:
- Command reference
- Alias system
- API documentation
- Configuration
- Glossary of terms

**Navigation**:
```
reference/
├── index.md                    # Entry point
├── commands.md                 # Full command list
├── aliases.md                  # Alias registry
├── api-reference.md            # ECU API
├── configuration.md            # Runtime config
└── glossary.md                 # Terminology
```

**Evidence**: runtime/aliases/registry.json, start-engine.md

---

### Section 10: Contributing

**Purpose**: Guide for extending and improving KDE.

**Scope**:
- How to contribute
- Governance rules
- Investigation standards
- Experimental guidelines
- Creating new engines
- Creating new seeds
- Raising proposals

**Navigation**:
```
contributing/
├── index.md                    # Entry point
├── how-to-contribute.md        # Getting started
├── governance-rules.md         # What you can and cannot change
├── investigation-standards.md  # Quality standards
├── experimental-guidelines.md   # Lab work rules
├── creating-engine.md           # Engine development
├── creating-seed.md             # Seed development
└── raising-proposals.md        # Change process
```

**Evidence**: CONTRIBUTING.md, governance/ documents, engines/future-engines.md

---

## Complete Architecture (REFINED)

**Target: 20-25 documents**

```markdown
/docs/
├── index.md                          # START HERE

├── 1-introduction/
│   ├── what-is-kde.md               # What KDE is
│   ├── why-kde.md                   # Problem it solves
│   └── vision.md                    # Long-term purpose

├── 2-foundations/
│   ├── philosophy.md                 # Core principles
│   ├── engineering-principles.md     # Engineering mindset
│   └── inspirations.md              # All 8 inspirations as chapters
│       ├── scientific-method.md      # Chapter
│       ├── engineering.md            # Chapter
│       ├── aviation.md               # Chapter
│       ├── industrial-automation.md  # Chapter
│       ├── root-cause-analysis.md    # Chapter
│       ├── theory-of-evolution.md    # Chapter
│       ├── cultivation.md            # Chapter
│       └── isekai.md                # Chapter

├── 3-history/
│   └── history.md                   # Single narrative (timeline, milestones, lessons)

├── 4-getting-started/
│   ├── index.md                     # Prerequisites + Installation
│   ├── first-investigation.md       # First session + run investigation
│   └── next-steps.md                # Where to go next

├── 5-core-concepts/
│   ├── engines-and-seeds.md         # Engine + Seed together
│   ├── ecu.md                       # Execution Control Unit
│   ├── laboratory.md                # Investigation workflow
│   └── knowledge.md                 # Knowledge lifecycle + Governance

├── 6-how-it-works/
│   ├── processes.md                 # Scientific loop + Lifecycle + State machine
│   └── evidence.md                  # Evidence standards + Bootstrap gates

├── 7-guides/
│   └── guides.md                    # All task-based guides in one

├── 8-architecture/
│   ├── architecture.md              # Repository + Directory + Naming
│   └── models.md                    # Engine + Seed + ECU models

├── 9-reference/
│   ├── commands.md                  # Commands + Aliases + Config
│   └── glossary.md                  # Terminology

└── 10-contributing/
    └── contributing.md              # All contributing guidance in one
```

---

## Document Count Summary

| Section | Original | Refined | Reduction |
|---------|----------|---------|-----------|
| 1-introduction | 3 | 3 | 0 |
| 2-foundations | 12 | 3 | -9 |
| 3-history | 4 | 1 | -3 |
| 4-getting-started | 7 | 3 | -4 |
| 5-core-concepts | 7 | 4 | -3 |
| 6-how-it-works | 7 | 2 | -5 |
| 7-guides | 8 | 1 | -7 |
| 8-architecture | 7 | 2 | -5 |
| 9-reference | 6 | 2 | -4 |
| 10-contributing | 8 | 1 | -7 |
| **TOTAL** | **69** | **23** | **-46 (67%)** |

---

## Refinement Rationale

### Consolidated Documents

| Original | Merged Into | Reason |
|----------|-------------|--------|
| prerequisites.md + installation.md | index.md | Brief, related setup |
| scientific-method + systems-thinking | inspirations.md | Part of foundations |
| cultivation, isekai, aviation, etc. | inspirations.md | All are inspiration chapters |
| timeline + milestones + evolution | history.md | Single narrative |
| engines.md + seeds.md | engines-and-seeds.md | Inseparable pair |
| evidence-standards + bootstrap-gates | evidence.md | Related concepts |
| scientific-loop + lifecycle + state-machine | processes.md | Process flow |
| all 8 guides | guides.md | Single practical reference |
| repository + directory + naming | architecture.md | Related structure |
| commands + aliases + config | commands.md | Related reference |
| all 6 contributing | contributing.md | Single workflow |

### Preserved Documents

| Document | Reason Preserved |
|----------|------------------|
| what-is-kde.md | Entry point for section |
| vision.md | Distinct long-term view |
| why-kde.md | Distinct problem framing |
| philosophy.md | Core foundational concept |
| ecu.md | Standalone major component |
| laboratory.md | Standalone major component |
| knowledge.md | Standalone with governance |
| glossary.md | Reference document |
| models.md | Technical reference |

---

## Deliverables Summary

### 1. Human-Facing Documentation Vision ✅

> KDE Documentation enables humans to understand, evaluate, and apply knowledge discovery engineering methodology through clear explanation, evidence-based reasoning, and progressive learning.

### 2. Documentation Philosophy ✅

| Principle | Application |
|-----------|-------------|
| Evidence over assertion | Every claim cites sources |
| Progressive disclosure | Simple first, complex later |
| Human-centered | Written for humans |
| Complete narratives | Tell full story |
| Traceable decisions | Link to investigations |

### 3. Audience Definition ✅

| Audience | Primary Need |
|----------|-------------|
| First-time Reader | Understanding |
| Evaluator | Assessment |
| Practitioner | Application |
| Contributor | Extension |

### 4. Learning Journey ✅

| Path | Documents | Audience |
|------|-----------|----------|
| Understanding | 1-introduction, 2-philosophy, 3-history | First-time |
| Using | 4-getting-started, 5-how-it-works, 6-guides | Practitioner |
| Extending | 7-architecture, 8-reference, 9-contributing | Contributor |

### 5. Information Architecture ✅

```
/docs/
├── 1-introduction/
├── 2-philosophy/
├── 3-history/
├── 4-getting-started/
├── 5-how-it-works/
├── 6-guides/
├── 7-architecture/
├── 8-reference/
└── 9-contributing/
```

### 6. Hierarchy Recommendation ✅

Numbered prefixes (1-9) establish reading order.

### 7. Navigation Model ✅

| Element | Purpose |
|---------|---------|
| index.md | Entry point |
| Breadcrumbs | Location awareness |
| See Also | Cross-references |
| Progress | Journey tracking |

### 8. Writing Standards ✅

| Standard | Rule |
|----------|------|
| Template | Consistent structure |
| Citations | Evidence-linked claims |
| Voice | Active, clear, complete |

### 9. Documentation Roadmap ✅

| Phase | Documents | Priority |
|-------|-----------|----------|
| Foundation | 5 | CRITICAL/HIGH |
| Application | 4 | HIGH/MEDIUM |
| Reference | 3 | HIGH/MEDIUM |
| Deep Dive | 3 | MEDIUM |

---

---

## Next Steps (Requires Approval)

| Phase | Action | Owner |
|-------|--------|-------|
| 1 | Create /docs/4-getting-started/ structure | Human |
| 2 | Create /docs/5-core-concepts/ structure | Human |
| 3 | Create /docs/6-how-it-works/ structure | Human |
| 4 | Create /docs/7-guides/ structure | Human |
| 5 | Create /docs/8-architecture/ structure | Human |
| 6 | Create /docs/9-reference/ structure | Human |
| 7 | Create /docs/10-contributing/ structure | Human |

---

**Status**: COMPLETE
**Awaiting**: Human review
