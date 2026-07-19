# KDE Research Roadmap

## 1. OBJECTIVE

Create a research roadmap that answers:

**"What must we understand before we can define Knowledge-Driven Engineering?"**

This roadmap is for discovery, not design. We do not know what KDE will become. This roadmap helps us find out.

---

## 2. RESEARCH QUESTIONS

### Tier 1: Foundational Questions
*(No dependencies - start here)*

1. **What is Knowledge?**
2. **What is Evidence?**
3. **What is Ambiguity?**

### Tier 2: Relational Questions
*(Depend on Tier 1)*

4. **What is Context?**
5. **What is Authority?**

### Tier 3: Engineering Questions
*(Depend on Tiers 1-2)*

6. **What is Engineering?**
7. **What is an Engineering Subject?**
8. **What is a Methodology?**

### Tier 4: Process Questions
*(Depend on Tiers 1-3)*

9. **How does knowledge become validated?**
10. **How should knowledge evolve?**

---

## 3. QUESTION DEPENDENCIES

```
Tier 1 (Foundational)
    │
    ├── What is Knowledge?
    │       ↓
    │   Without this, we cannot define methodology
    │
    ├── What is Evidence?
    │       ↓
    │   Without this, we cannot validate knowledge
    │
    └── What is Ambiguity?
            ↓
        Without this, we cannot define what engineering reduces

Tier 2 (Relational)
    │
    ├── What is Context?
    │       ↓
    │   Depends on: Knowledge, Evidence
    │   Without this, we cannot apply knowledge consistently
    │
    └── What is Authority?
            ↓
        Depends on: Knowledge, Evidence, Context
        Without this, we cannot govern knowledge

Tier 3 (Engineering)
    │
    ├── What is Engineering?
    │       ↓
    │   Depends on: Ambiguity, Evidence, Authority
    │   Without this, we cannot define what KDE does
    │
    ├── What is an Engineering Subject?
    │       ↓
    │   Depends on: Engineering, Context
    │   Without this, we cannot define what KDE acts upon
    │
    └── What is a Methodology?
            ↓
        Depends on: Knowledge, Evidence, Authority, Context
        Without this, we cannot define KDE itself

Tier 4 (Process)
    │
    ├── How does knowledge become validated?
    │       ↓
    │   Depends on: Evidence, Authority, Methodology
    │   This enables KDE to grow
    │
    └── How should knowledge evolve?
            ↓
        Depends on: All above
        This enables KDE to adapt
```

---

## 4. INITIAL DOCUMENTATION

Only documents needed to support research:

| Document | Purpose |
|----------|---------|
| **Research Log** | Record findings from each research question |
| **Question Tracker** | Track which questions are answered, pending, or blocked |
| **Evidence Repository** | Store evidence collected during research |
| **Glossary** | Capture definitions as we discover them |

---

## 5. MINIMAL REPOSITORY STRUCTURE

```
/kde/
├── /research/           # Research artifacts
│   ├── /logs/          # Research logs by question
│   ├── /evidence/      # Collected evidence
│   └── /questions/     # Question tracking
├── /glossary/          # Emerging definitions
├── /meetings/          # Meeting notes (if needed)
├── README.md           # Project overview
└── CONTRIBUTING.md      # How to contribute to research
```

**Rationale:**
- No `/src/`, `/docs/`, `/implementation/` - these come later
- Structure mirrors the research workflow
- Everything lives under `/research/` until concepts are validated

---

## 6. RESEARCH WORKFLOW

```
QUESTION
    │
    ├── What question are we investigating?
    │
    ▼
RESEARCH
    │
    ├── Gather existing knowledge
    ├── Examine evidence
    └── Look for counter-examples
    │
    ▼
EVIDENCE
    │
    ├── What evidence supports or contradicts?
    ├── Is evidence sufficient?
    └── Are there conflicting sources?
    │
    ▼
WORKING DEFINITION
    │
    ├── Draft a definition based on evidence
    ├── Note uncertainties
    └── Mark as "working" - not yet validated
    │
    ▼
VALIDATION
    │
    ├── Peer review
    ├── Counter-example testing
    └── Consensus check
    │
    ▼
PROMOTION
    │
    ├── If validated: Move to Glossary as "defined"
    └── If not: Return to Research with new questions
```

### Why Each Stage Exists

**Question**
- Focuses research on specific unknowns
- Prevents unfocused investigation

**Research**
- Gathers existing knowledge before creating new definitions
- Prevents reinvention
- Identifies what others have already discovered

**Evidence**
- Distinguishes opinion from fact
- Requires claims to be backed by sources
- Enables verification

**Working Definition**
- Captures current understanding
- Makes assumptions explicit
- Allows progress while acknowledging uncertainty

**Validation**
- Tests definitions against real cases
- Finds weaknesses before promotion
- Ensures quality before commitment

**Promotion**
- Advances validated concepts
- Maintains clarity about what is "official"
- Prevents premature methodology formation

---

## 7. PROJECT MILESTONES

These represent increasing understanding, not software releases.

```
MILESTONE 1: Research Foundation
│
├── Research Tier 1 questions (Knowledge, Evidence, Ambiguity)
├── Complete research logs for each
└── Produce working definitions

        ▼

MILESTONE 2: Relational Framework
│
├── Research Tier 2 questions (Context, Authority)
├── Integrate with Tier 1 findings
└── Identify gaps in foundation

        ▼

MILESTONE 3: Engineering Definition
│
├── Research Tier 3 questions (Engineering, Subject, Methodology)
├── Attempt to define KDE's scope
└── Validate against real engineering examples

        ▼

MILESTONE 4: Process Model
│
├── Research Tier 4 questions (Validation, Evolution)
├── Define how KDE should develop
└── Identify remaining unknowns

        ▼

MILESTONE 5: KDE Discovery
│
├── Synthesize all research
├── Define what KDE actually is
├── If possible: Draft methodology outline
└── If not ready: Document what is still unknown
```

---

## 8. SIMPLICITY PRINCIPLES

- **Do not speculate** - If we don't know, say so
- **Do not over-engineer** - Simple structure, simple process
- **Do not assume** - Every concept must be researched, not assumed
- **Do not rush** - Understanding takes time
- **Document the unknown** - Future research is a valid output

---

## 9. SUMMARY

This roadmap helps us discover KDE by:

1. Asking the right questions in the right order
2. Basing definitions on evidence, not assumption
3. Keeping structure minimal until structure is needed
4. Moving from questions to validated definitions
5. Acknowledging what we don't know

The goal is not to design KDE. The goal is to find out what KDE should be.

---

# KDE Research Methodology Design Proposal

## Proposal Context

During Research Session 003, a process problem was identified: the AI automatically began the next research session after completing the previous one. This is undesirable. KDE requires explicit human review before another research session begins.

This proposal designs a formal KDE Research Methodology that separates methodology from research, defines clear state transitions, and establishes mandatory human review gates.

---

## 1. Repository Organization

### Problem

Research artifacts and methodology governance are currently mixed. This creates ambiguity about which documents govern behavior and which documents contain findings.

### Alternatives Considered

**Option A: Methodology Under Research**
```
/research/
    /methodology/       # Methodology lives under research
    /sessions/          # Research session artifacts
```

**Option B: Parallel Top-Level Directories**
```
/research/              # Research session artifacts
/methodology/           # Methodology governance (separate)
```

**Option C: Methodology as Meta-Research**
```
/research/              # Research session artifacts
/meta/                  # Research about research (methodology)
```

### Recommendation: Parallel Directories with /governance/

**Proposed Structure:**
```
/kde/
├── /research/           # Research artifacts
│   ├── /sessions/      # Session logs and findings
│   ├── /evidence/       # Collected evidence
│   └── /glossary/       # Emerging definitions
├── /governance/          # Rules and standards (NEW)
│   ├── LIFECYCLE.md
│   ├── STATES.md
│   ├── AI-PRINCIPLES.md
│   └── VERSION.md
└── /meetings/          # Meeting notes
```

### Rationale

1. **Separation of Concerns**: Research artifacts answer questions; governance documents rule how questions are answered.

2. **Discoverability**: When beginning research, contributors find `/governance/` immediately. When reading findings, they find `/research/`.

3. **Naming**: "Governance" is broader and more accurate than "methodology" - it encompasses rules, standards, and policies.

4. **Contrast**: `/research/` contains findings; `/governance/` contains rules. The contrast is clear.

---

## 2. Research Lifecycle

### Research Stages

Research progresses through distinct stages:

```
QUESTION
    ↓
LITERATURE REVIEW
    ↓
EVIDENCE COLLECTION
    ↓
ANALYSIS
    ↓
SYNTHESIS
    ↓
WORKING DEFINITION
    ↓
VALIDATION
    ↓
KNOWLEDGE PROMOTION
```

Each stage is completed sequentially. A stage is complete when its deliverable exists.

### Stage Justification

| Stage | Purpose | Stop Criteria |
|-------|---------|---------------|
| **Question** | Define scope of investigation | Question is documented and unambiguous |
| **Literature Review** | Understand existing knowledge | No new sources after thorough search |
| **Evidence Collection** | Gather supporting materials | Evidence is sufficient or explicitly noted as incomplete |
| **Analysis** | Examine evidence for patterns | Analysis is documented |
| **Synthesis** | Combine findings into coherent whole | Synthesis captures key insights |
| **Working Definition** | Draft preliminary answer | Definition is documented |
| **Validation** | Test definition against cases | Validation results documented |
| **Knowledge Promotion** | Move validated knowledge to glossary | Promoted artifact exists |

### The Submit for Review Event

The transition from Working Definition to Review is an EVENT, not a stage:

```
WORKING DEFINITION
        ↓
[SUBMIT FOR REVIEW] ←── Event
        ↓
REVIEW (State)
```

This event:
- Marks the completion of research work
- Triggers the approval state machine
- Is the mandatory stopping point for AI activity

### Why Submit After Working Definition

1. **Something concrete to review**: The reviewer has a working definition to evaluate.

2. **Early feedback**: Problems are caught before validation effort is invested.

3. **Efficiency**: If the working definition is flawed, better to know before validation.

4. **Clear deliverable**: The working definition is the artifact that moves forward.

---

## 3. Approval States

### State Machine

The approval process operates as a separate state machine:

```
DRAFT
    ↓
REVIEW ←── Event: Submit for Review
    ↓
APPROVED  ← Human approval required
    ↓
VALIDATED
    ↓
PROMOTED
```

Or:

```
REVIEW
    ↓
REVISION REQUIRED ← Human rejection with feedback
    ↓
...back to DRAFT...
```

### Reviewer Actions

| Action | Meaning | Next State |
|--------|---------|------------|
| **APPROVE** | Session meets quality standards; proceed to Validation | `APPROVED` |
| **MODIFY** | Session has issues; return to AI for changes | `REVISION_REQUIRED` |
| **REJECT** | Session is fundamentally flawed; restart required | `REJECTED` |

### When AI Must Stop

The AI must stop when:
- A Working Definition has been drafted
- All preceding stages are documented
- The AI has submitted the session for review
- Move to next phase
- Add optional comments

**Modify:**
- Request specific changes
- AI must address all comments before re-submission
- AI cannot skip requested modifications

**Reject:**
- Mark session as failed
- Document reason for rejection
- New session may be started for same question

### Additional States

| State | Purpose |
|-------|---------|
| **APPROVED** | Reviewer has authorized progression |
| **NEEDS_REVISION** | Awaiting AI response to modification requests |
| **REJECTED** | Session has failed; may not proceed |
| **SUPERSEDED** | Session was later replaced by better research |

### Review Criteria

The reviewer evaluates:

1. **Completeness**: Are all lifecycle stages documented?
2. **Evidence Quality**: Is evidence sufficient and relevant?
3. **Definition Quality**: Does the working definition address the question?
4. **Clarity**: Is the work understandable to someone unfamiliar?
5. **Honesty**: Are limitations and uncertainties acknowledged?

---

## 4. Separating Stage from State

Research has two independent dimensions:

**Stage** answers: "Where are we in the research process?"

**State** answers: "What is the approval status?"

These must never be confused:

- "Research is in VALIDATION stage" - We're testing the definition
- "Research is in REVIEW state" - We're awaiting approval

Every research document shows both:

```markdown
**Session**: RS-003
**Question**: What is Evidence?
**Stage**: Analysis
**State**: DRAFT
```

---

## 5. AI Behavioral Principles

### Core Principles

**Principle 1: Stop After Working Definition**
```
AI must stop after producing the Working Definition and await human review.
```

**Principle 2: No Self-Approval**
```
AI must never approve its own work. Only humans can set APPROVED state.
```

**Principle 3: No Self-Promotion**
```
AI must never promote knowledge. Only humans can set PROMOTED state.
```

**Principle 4: Distinguish Evidence, Inference, and Hypothesis**
```
AI must clearly mark:
- Evidence: documented facts from sources
- Inference: conclusions drawn from evidence
- Hypothesis: speculation beyond evidence
```

**Principle 5: No Auto-Continuation**
```
AI must never begin the next research session without explicit human authorization.
```

### Derived Practices

These practices follow from the core principles:

- Document uncertainty when evidence is incomplete
- Note alternative interpretations when evidence is ambiguous
- State "evidence insufficient" when conclusions cannot be supported
- Preserve original work when revisions are made
- Never skip modification requests from reviewers

### What Was Removed

| Removed Rule | Reason |
|--------------|--------|
| "AI must address all modification requests" | Follows from Principle 5 (no auto-continuation) |
| "AI must document uncertainty" | Follows from Principle 4 (distinguish evidence/hypothesis) |
| "AI must acknowledge alternatives" | Follows from Principle 4 |
| "AI must stop when evidence insufficient" | Follows from Principle 4 |
| "AI must preserve history" | Obvious good practice; not a core constraint |

---

## 7. Project Governance

### What is Governance?

Governance is the system of rules, standards, and processes that govern the KDE project.

It is NOT limited to methodology. Methodology is only one artifact that governance covers.

### What Governance Covers

Governance explicitly governs:

| Domain | Description |
|--------|-------------|
| **Research** | How research questions are investigated |
| **Knowledge** | How knowledge is validated and promoted |
| **Methodology** | How the methodology itself evolves |
| **Standards** | Quality standards for all project artifacts |
| **Policies** | Project policies and guidelines |
| **Approval Processes** | How artifacts move through states |
| **Versioning** | How project artifacts are versioned |
| **Future Artifacts** | Any new governance artifacts as the project grows |

### Why Governance is Project-Level

Governance at the project level ensures:

1. **Consistency**: All artifacts follow the same rules
2. **Trust**: Contributors can trust project processes
3. **Evolution**: The project can grow without losing coherence
4. **Accountability**: Decisions are traceable

### The Meta-Problem: Governance Governs Itself

KDE's governance is subject to KDE's own principles:

1. **Evidence-based changes**: Governance changes must be justified by evidence, not opinion
2. **Review required**: Changes to governance require the same review process as research
3. **Human approval**: AI cannot modify governance without human approval
4. **Versioned**: Changes to governance are tracked and documented

### Governance Workflow

When a governance change is needed:

```
1. PROPOSE
   └── Document the proposed change with evidence
2. REVIEW
   └── Same review process as other artifacts
3. APPROVE
   └── Human approves the change
4. IMPLEMENT
   └── Update governance documents
5. COMMUNICATE
   └── Inform all contributors
```

### What This Means

- Governance documents live in `/governance/`
- Changes to governance follow the same state machine as research
- AI cannot modify governance documents without human approval
- The governance is itself evidence-based
- Governance can evolve without losing project integrity

---

## 8. Repository Naming: /methodology/ vs /governance/

### Alternatives

**Option A: `/methodology/`**
```
/research/          # Research artifacts
/methodology/        # Methodology documents
```

**Option B: `/governance/`**
```
/research/          # Research artifacts
/governance/        # Governance documents
```

### Analysis

| Factor | /methodology/ | /governance/ |
|--------|---------------|--------------|
| Clarity | Clear purpose | Broader scope |
| Discoverability | Immediately obvious | Less intuitive |
| Scope | Methodology only | Includes policies, rules, standards |
| Extensibility | Limited | Can grow to include other governance |

### Recommendation: `/governance/`

**Rationale:**

1. **Scope**: Governance is broader and more accurate. The directory contains not just methodology, but rules, standards, and policies.

2. **Future Growth**: `/governance/` can naturally expand to include:
   - Review criteria
   - Approval policies
   - Contributor guidelines
   - Version history

3. **Clarity**: `/governance/` signals that these documents rule how the project operates.

4. **Contrast**: `/research/` contains findings; `/governance/` contains rules. The contrast is clear.

5. **KDE Alignment**: The term "governance" aligns with KDE's emphasis on evidence-based, human-reviewed processes.

### What Was Rejected

`/methodology/` was rejected because:
- It implies only methodology lives here
- It doesn't convey the broader purpose of governing the project
- "Governance" is a more precise term for what these documents do

---

## 9. Simplified Status Tracking

### Document Header

Every research document should include:

```markdown
**Session**: RS-003
**Question**: What is Evidence?
**Stage**: Analysis
**State**: DRAFT
**Methodology Version**: v1.0
```

### Stage Status Table

```markdown
## Stage Progress

| Stage | Status |
|-------|--------|
| Question | ✅ |
| Literature Review | ✅ |
| Evidence Collection | ✅ |
| Analysis | 🔄 |
| Synthesis | ⏳ |
| Working Definition | ⏳ |
| Validation | ⏳ |
| Knowledge Promotion | ⏳ |

**Symbols**: ✅ Complete | 🔄 In Progress | ⏳ Pending
```

### What Was Removed

- Detailed date tracking (can be inferred from git history)
- Reviewer assignment (tracked separately)
- Session ID details (header is sufficient)

---

## 10. Simplified Versioning

### Version Format

```
KDE Research Methodology v{major}.{minor}
```

- **Major** (v1→v2): Breaking changes to lifecycle, states, or rules
- **Minor** (v1.0→v1.1): Clarifications, non-breaking additions

### Version Documentation

Each methodology document header includes:

```markdown
**Version**: v1.0
**Effective**: 2024-01-01
```

Changelog is maintained in VERSION.md:

```markdown
# Version History

## v1.1 (proposed)
- Added: Section on methodology governance

## v1.0 (2024-01-01)
- Initial methodology
```

### What Was Removed

- Complex version lifecycle states (DRAFT, PROPOSED, etc.)
- Detailed change processes
- Version metadata duplication

---

## 11. Open Questions

1. **Who approves methodology changes?** Single approver or consensus?

2. **How long to wait for review?** Timeout policy?

3. **Can stages be skipped?** In exceptional circumstances?

---

## 12. Summary

This proposal establishes a governance framework for KDE:

1. **Separates Stage from State** - Two independent dimensions; stages answer "what work?" while states answer "what approval?"
2. **Treats Submit for Review as an Event** - The transition from Working Definition to Review is an event, not a stage
3. **Simplifies state machine** - 7 essential states: DRAFT, REVIEW, APPROVED, REVISION_REQUIRED, VALIDATED, PROMOTED, REJECTED
4. **Condenses AI principles** - 5 core principles: Stop after Working Definition, No Self-Approval, No Self-Promotion, Distinguish Evidence/Inference/Hypothesis, No Auto-Continuation
5. **Expands governance scope** - Governance covers Research, Knowledge, Methodology, Standards, Policies, Approval Processes, Versioning, and Future Artifacts
6. **Governance governs itself** - Governance is subject to the same evidence-based, human-reviewed principles as everything else
7. **Recommends /governance/** - Project-level governance directory

The methodology remains simple, enforceable, and honest about its own process.
