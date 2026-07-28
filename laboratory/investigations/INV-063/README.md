# INV-063: Context Reduction Techniques - Engineering Principles Analysis

**Status**: INVESTIGATION  
**Parent**: INV-055-062 (Caveman Series)  
**Created**: 2026-07-28  
**Source**: Focus on reduction techniques from caveman  
**Investigator**: OpenHands Agent

---

## Summary

[INFERENCE: This investigation analyzes the engineering principles behind context and token reduction techniques, extracting reusable principles for knowledge-on-demand systems. The analysis focuses on what problems each technique solves, how reduction occurs, what information is preserved/discarded, and whether the principles are broadly applicable.]

---

## Context Reduction Techniques from Caveman

### Technique Inventory

| Technique | Purpose | Reduction Target |
|-----------|---------|-----------------|
| **squash** | Targeted reading | Full file → matched lines |
| **compress** | Summarization | Full document → bullets |
| **strip** | Noise removal | Code with comments → clean code |
| **diff** | Change focus | Full file → changes only |
| **brief** | Response compression | Verbose → terse |
| **prune** | Stale removal | Full memory → active entries |
| **lean** | Proactive optimization | Full context → optimized |
| **nuke** | Fresh start | Full session → summary |
| **budget** | Upfront planning | Unknown cost → estimated cost |

[EVIDENCE: /tmp/caveman/README.md, /tmp/caveman/SKILL.md]

---

## Technique-by-Technique Analysis

### 1. Squash - Targeted Reading

#### Problem Statement

| Aspect | Analysis |
|--------|----------|
| **Problem** | Reading entire file when only one function/concept is needed |
| **Waste** | O(n) tokens for O(1) information need |
| **Context explosion** | Large files dominate context window |

#### How It Reduces Context

| Step | Action | Reduction |
|------|--------|-----------|
| 1 | User specifies search term | Input: term |
| 2 | System reads file line by line | Process: grep |
| 3 | Returns only matching lines + context | Output: ~5% of file |

#### Information Analysis

| Category | What Is Preserved | What Is Discarded |
|----------|-------------------|-------------------|
| **Preserved** | Lines containing term, 2-line context | Other file content |
| **Structure** | Line numbers | File structure, imports |
| **Meaning** | Function body | File organization |

#### Reversibility

| Aspect | Analysis |
|--------|----------|
| **Reversible?** | PARTIAL |
| **Method** | Reference full file by path |
| **Loss** | No structural context of surrounding code |
| **Recovery** | Can re-read full file if needed |

#### Applicability Analysis

| Criterion | Assessment | Reasoning |
|-----------|------------|----------|
| **Problem universal?** | YES | Any system reading files |
| **Solution general?** | YES | Pattern matching is language-agnostic |
| **Information loss acceptable?** | YES | Targeted reading is intentional |
| **Reusability** | HIGH | Applicable to any file-based system |

#### Engineering Principle

```
┌─────────────────────────────────────────────────────────────────┐
│ PRINCIPLE: Targeted Access Over Bulk Retrieval                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Instead of retrieving entire resource, retrieve only matching    │
│  portions with minimal context.                                  │
│                                                                  │
│  WHEN: User/agent needs specific information from large source   │
│  HOW: Pattern match + bounded context retrieval                  │
│  TRADE-OFF: Efficiency over completeness                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### 2. Compress - Summarization

#### Problem Statement

| Aspect | Analysis |
|--------|----------|
| **Problem** | Large documents consume context when only key points needed |
| **Waste** | Full detail for high-level understanding |
| **Context explosion** | Multiple long documents exceed window |

#### How It Reduces Context

| Step | Action | Reduction |
|------|--------|-----------|
| 1 | Read full document | Input: n lines |
| 2 | Extract key facts, structure, decisions | Process: summarization |
| 3 | Output ≤200-word bullets | Output: ~5% of original |

#### Information Analysis

| Category | What Is Preserved | What Is Discarded |
|----------|-------------------|-------------------|
| **Preserved** | Key facts, structure, decisions | Supporting details, examples |
| **Meaning** | What, not how | Implementation specifics |
| **Confidence** | Summary confidence | Full evidence chain |

#### Reversibility

| Aspect | Analysis |
|--------|----------|
| **Reversible?** | NO |
| **Method** | Cannot reconstruct original from summary |
| **Loss** | Supporting details, nuance, edge cases |
| **Recovery** | Reference original document, re-read if needed |

#### Applicability Analysis

| Criterion | Assessment | Reasoning |
|-----------|------------|----------|
| **Problem universal?** | YES | Any system with large documents |
| **Solution general?** | PARTIAL | Summarization requires domain understanding |
| **Information loss acceptable?** | CONTEXT-DEPENDENT | Depends on use case |
| **Reusability** | MEDIUM | Principles transferable, implementation varies |

#### Engineering Principle

```
┌─────────────────────────────────────────────────────────────────┐
│ PRINCIPLE: Semantic Compression Over Truncation                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Compress documents to essential meaning, not arbitrary length   │
│  limits. Preserve structure, decisions, and key facts.            │
│                                                                  │
│  WHEN: Document summary needed, detail available on demand        │
│  HOW: Extract semantic essence, not just truncate                 │
│  TRADE-OFF: Breadth over depth                                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### 3. Strip - Noise Removal

#### Problem Statement

| Aspect | Analysis |
|--------|----------|
| **Problem** | Comments, logs, blank lines inflate code size without adding value |
| **Waste** | ~30-50% of code is non-executable noise |
| **Context explosion** | Code reviews, diffs include noise |

#### How It Reduces Context

| Step | Action | Reduction |
|------|--------|-----------|
| 1 | Read code with comments | Input: n lines |
| 2 | Remove comment lines, blank lines, logs | Process: filtering |
| 3 | Output clean code | Output: ~50-70% of original |

#### Information Analysis

| Category | What Is Preserved | What Is Discarded |
|----------|-------------------|-------------------|
| **Preserved** | Executable code, function signatures | Comments, docs, blank lines, logs |
| **Structure** | Code structure, flow | Author intent, explanations |
| **Behavior** | Identical | Identical |

#### Reversibility

| Aspect | Analysis |
|--------|----------|
| **Reversible?** | YES |
| **Method** | Re-read original file |
| **Loss** | Author annotations, historical comments |
| **Recovery** | Full file still available |

#### Applicability Analysis

| Criterion | Assessment | Reasoning |
|-----------|------------|----------|
| **Problem universal?** | YES | Code always has comments/logs |
| **Solution general?** | YES | Pattern-based filtering |
| **Information loss acceptable?** | YES | Executable code preserved |
| **Reusability** | HIGH | Universal to code-centric systems |

#### Engineering Principle

```
┌─────────────────────────────────────────────────────────────────┐
│ PRINCIPLE: Noise Filtering Over Content Reduction                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Remove non-essential elements (comments, logs, formatting)      │
│  while preserving executable content and structure.               │
│                                                                  │
│  WHEN: Code content needed without documentation overhead        │
│  HOW: Pattern-based filtering of noise markers                   │
│  TRADE-OFF: Clean code over annotated code                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### 4. Diff - Change-Focused View

#### Problem Statement

| Aspect | Analysis |
|--------|----------|
| **Problem** | Re-reading full files to understand changes |
| **Waste** | Unchanged content dominates diff output |
| **Context explosion** | Full file shown with small changes |

#### How It Reduces Context

| Step | Action | Reduction |
|------|--------|-----------|
| 1 | Read file or use git diff | Input: full file or +N/-N |
| 2 | Filter unchanged context | Process: diff parsing |
| 3 | Show only changes with references | Output: changes + location |

#### Information Analysis

| Category | What Is Preserved | What Is Discarded |
|----------|-------------------|-------------------|
| **Preserved** | Lines changed, file:line refs | Unchanged content |
| **Structure** | Change locations | File structure |
| **History** | What changed, not what was | Prior state |

#### Reversibility

| Aspect | Analysis |
|--------|----------|
| **Reversible?** | YES |
| **Method** | Full git history available |
| **Loss** | No view of unchanged context |
| **Recovery** | Can view full file or prior commit |

#### Applicability Analysis

| Criterion | Assessment | Reasoning |
|-----------|------------|----------|
| **Problem universal?** | YES | Any versioned system |
| **Solution general?** | YES | Diff is language-agnostic |
| **Information loss acceptable?** | YES | Only changes needed |
| **Reusability** | HIGH | Version control is universal |

#### Engineering Principle

```
┌─────────────────────────────────────────────────────────────────┐
│ PRINCIPLE: Delta Access Over Full State                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Access changes (deltas) rather than full state when           │
│  understanding modifications.                                    │
│                                                                  │
│  WHEN: Understanding what changed, not what exists              │
│  HOW: Compute/view diff between versions                         │
│  TRADE-OFF: Change focus over complete view                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### 5. Brief - Response Compression

#### Problem Statement

| Aspect | Analysis |
|--------|----------|
| **Problem** | Verbose responses dominate context when terse answer suffices |
| **Waste** | Full explanation when summary is needed |
| **Context explosion** | Multiple long responses accumulate |

#### How It Reduces Context

| Step | Action | Reduction |
|------|--------|-----------|
| 1 | Read verbose response | Input: full response |
| 2 | Extract key points | Process: bullet extraction |
| 3 | Output ≤5 bullets, ≤15 words each | Output: ~5% of original |

#### Information Analysis

| Category | What Is Preserved | What Is Discarded |
|----------|-------------------|-------------------|
| **Preserved** | Key points, decisions | Rationale, examples, caveats |
| **Tone** | Neutral | Detailed explanation |
| **Confidence** | Summary | Full reasoning chain |

#### Reversibility

| Aspect | Analysis |
|--------|----------|
| **Reversible?** | NO |
| **Method** | Cannot reconstruct original from bullets |
| **Loss** | Full reasoning, supporting context |
| **Recovery** | Must request full response again |

#### Applicability Analysis

| Criterion | Assessment | Reasoning |
|-----------|------------|----------|
| **Problem universal?** | YES | Any system with verbose outputs |
| **Solution general?** | PARTIAL | Requires understanding of what matters |
| **Information loss acceptable?** | CONTEXT-DEPENDENT | High for summaries, low for decisions |
| **Reusability** | MEDIUM | Principle transferable, implementation varies |

#### Engineering Principle

```
┌─────────────────────────────────────────────────────────────────┐
│ PRINCIPLE: Consequence-Focused Output Over Comprehensive Output    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Compress outputs to actionable conclusions, not full reasoning.  │
│  Preserve what to do, not why to do it.                          │
│                                                                  │
│  WHEN: Quick reference needed, detail available on demand        │
│  HOW: Extract actionable bullets, discard reasoning              │
│  TRADE-OFF: Terse actionability over verbose completeness       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### 6. Prune - Stale Data Removal

#### Problem Statement

| Aspect | Analysis |
|--------|----------|
| **Problem** | Memory accumulates stale, redundant, or irrelevant entries |
| **Waste** | Memory size grows without value growth |
| **Context explosion** | Old entries consume space without utility |

#### How It Reduces Context

| Step | Action | Reduction |
|------|--------|-----------|
| 1 | Review memory entries | Input: all entries |
| 2 | Check relevance, accuracy, duplicates | Process: evaluation |
| 3 | Remove stale entries | Output: active entries only |

#### Information Analysis

| Category | What Is Preserved | What Is Discarded |
|----------|-------------------|-------------------|
| **Preserved** | Current facts, active context | Stale facts, duplicates |
| **History** | Active state | Historical state |
| **Confidence** | Verified entries | Unverified/old entries |

#### Reversibility

| Aspect | Analysis |
|--------|----------|
| **Reversible?** | YES |
| **Method** | Entry was documented somewhere |
| **Loss** | Context of why entry existed |
| **Recovery** | Re-investigate if needed |

#### Applicability Analysis

| Criterion | Assessment | Reasoning |
|-----------|------------|----------|
| **Problem universal?** | YES | Any long-running memory system |
| **Solution general?** | PARTIAL | Requires relevance criteria |
| **Information loss acceptable?** | YES | Stale = no longer valid |
| **Reusability** | HIGH | Memory management is universal |

#### Engineering Principle

```
┌─────────────────────────────────────────────────────────────────┐
│ PRINCIPLE: Temporal Relevance Filtering                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Periodically remove entries that are stale, duplicate, or      │
│  no longer relevant. Maintain only active knowledge.             │
│                                                                  │
│  WHEN: Memory growing unbounded, old entries suspect             │
│  HOW: Evaluate relevance, age, accuracy; remove negatives        │
│  TRADE-OFF: Current accuracy over comprehensive history           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### 7. Lean - Proactive Optimization

#### Problem Statement

| Aspect | Analysis |
|--------|----------|
| **Problem** | Context accumulates silently until limit approached |
| **Waste** | No visibility into what's consuming space |
| **Context explosion** | No proactive management |

#### How It Reduces Context

| Step | Action | Reduction |
|------|--------|-----------|
| 1 | Audit current context | Input: full context |
| 2 | Identify inefficiencies | Process: analysis |
| 3 | Suggest optimizations | Output: action list with savings |

#### Information Analysis

| Category | What Is Preserved | What Is Discarded |
|----------|-------------------|-------------------|
| **Preserved** | Everything (diagnostic) | Nothing (recommendation only) |
| **Insight** | What's wasteful | Why it's wasteful |
| **Action** | What to optimize | How to optimize |

#### Reversibility

| Aspect | Analysis |
|--------|----------|
| **Reversible?** | YES |
| **Method** | Lean only recommends, doesn't change |
| **Loss** | None (observation only) |
| **Recovery** | N/A - observation only |

#### Applicability Analysis

| Criterion | Assessment | Reasoning |
|-----------|------------|----------|
| **Problem universal?** | YES | Any bounded resource system |
| **Solution general?** | YES | Audit + recommend pattern |
| **Information loss acceptable?** | YES | Observation doesn't modify |
| **Reusability** | HIGH | Applicable to any resource management |

#### Engineering Principle

```
┌─────────────────────────────────────────────────────────────────┐
│ PRINCIPLE: Proactive Resource Awareness                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Continuously monitor resource usage and surface optimization      │
│  opportunities before limits are reached.                       │
│                                                                  │
│  WHEN: Bounded resources with growing consumption                │
│  HOW: Audit usage, identify waste, recommend action              │
│  TRADE-OFF: Proactive awareness over reactive response          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### 8. Nuke - State Snapshot for Restart

#### Problem Statement

| Aspect | Analysis |
|--------|----------|
| **Problem** | Full session state too large for continuation |
| **Waste** | History of work consuming context for future work |
| **Context explosion** | Session grows indefinitely |

#### How It Reduces Context

| Step | Action | Reduction |
|------|--------|-----------|
| 1 | Summarize session state | Input: full history |
| 2 | Extract: task, completed, next steps | Process: state summarization |
| 3 | Output ≤300 word state document | Output: ~1% of original |

#### Information Analysis

| Category | What Is Preserved | What Is Discarded |
|----------|-------------------|-------------------|
| **Preserved** | Task, completed, next, files modified | Full conversation history |
| **State** | Current position | How position was reached |
| **Context** | What needed | What was tried |

#### Reversibility

| Aspect | Analysis |
|--------|----------|
| **Reversible?** | NO |
| **Method** | Full history lost |
| **Loss** | Complete work history, reasoning trail |
| **Recovery** | Reconstruct from summary + files |

#### Applicability Analysis

| Criterion | Assessment | Reasoning |
|-----------|------------|----------|
| **Problem universal?** | YES | Any stateful session system |
| **Solution general?** | PARTIAL | Requires state summarization capability |
| **Information loss acceptable?** | CONTEXT-DEPENDENT | High when context exhausted |
| **Reusability** | MEDIUM | State summarization is domain-specific |

#### Engineering Principle

```
┌─────────────────────────────────────────────────────────────────┐
│ PRINCIPLE: State Snapshot Over History Retention                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  When continuation is impractical, capture state summary for     │
│  restart rather than preserving full history.                   │
│                                                                  │
│  WHEN: State too large to continue, future work needed          │
│  HOW: Extract position, completed, next steps; discard history  │
│  TRADE-OFF: Restart capability over complete history           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### 9. Budget - Upfront Cost Estimation

#### Problem Statement

| Aspect | Analysis |
|--------|----------|
| **Problem** | Unknown token cost leads to mid-task context exhaustion |
| **Waste** | Work invested before context limit reached |
| **Context explosion** | No visibility into cost of planned work |

#### How It Reduces Context

| Step | Action | Reduction |
|------|--------|-----------|
| 1 | Estimate files to read | Input: task description |
| 2 | Calculate expected tokens | Process: estimation |
| 3 | Compare to budget | Output: fit assessment + recommendations |

#### Information Analysis

| Category | What Is Preserved | What Is Discarded |
|----------|-------------------|-------------------|
| **Preserved** | Everything (prevention) | Nothing (estimation only) |
| **Insight** | Cost projection | Actual cost (unknown until done) |
| **Action** | Optimization before starting | - |

#### Reversibility

| Aspect | Analysis |
|--------|----------|
| **Reversible?** | YES |
| **Method** | Budget only suggests, doesn't change |
| **Loss** | None (prediction only) |
| **Recovery** | N/A - prediction only |

#### Applicability Analysis

| Criterion | Assessment | Reasoning |
|-----------|------------|----------|
| **Problem universal?** | YES | Any resource-bounded system |
| **Solution general?** | PARTIAL | Requires cost estimation model |
| **Information loss acceptable?** | YES | Estimation doesn't modify |
| **Reusability** | MEDIUM | Principle transferable, model varies |

#### Engineering Principle

```
┌─────────────────────────────────────────────────────────────────┐
│ PRINCIPLE: Upfront Resource Planning                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Estimate resource requirements before committing to work.       │
│  Surface optimization opportunities proactively.                  │
│                                                                  │
│  WHEN: Resource limits exist, task cost unknown                │
│  HOW: Estimate based on inputs, compare to limits                │
│  TRADE-OFF: Informed planning over optimistic execution        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Cross-Cutting Analysis

### Reduction Patterns Summary

| Technique | Target | Reversibility | Loss Acceptable | Reusability |
|-----------|--------|--------------|-----------------|-------------|
| squash | Lines | PARTIAL | YES | HIGH |
| compress | Document | NO | CONTEXT-DEP | MEDIUM |
| strip | Code | YES | YES | HIGH |
| diff | State | YES | YES | HIGH |
| brief | Response | NO | CONTEXT-DEP | MEDIUM |
| prune | Memory | YES | YES | HIGH |
| lean | Context | YES | YES | HIGH |
| nuke | Session | NO | HIGH | MEDIUM |
| budget | Planning | YES | YES | MEDIUM |

### Common Themes

#### Theme 1: Precision Over Completeness

| Technique | Theme Manifestation |
|-----------|---------------------|
| squash | Exact match > full file |
| diff | Changes > full state |
| brief | Points > full response |

#### Theme 2: Reversibility Consideration

| Technique | Reversibility Strategy |
|-----------|------------------------|
| squash | Reference original file |
| strip | Re-read original |
| diff | Full history available |
| nuke | Cannot reverse - intentional |

#### Theme 3: Progressive Disclosure

| Technique | Disclosure Model |
|-----------|-----------------|
| compress | Summary → full on demand |
| brief | Points → detail on demand |
| squash | Match → context on demand |

---

## Reusable Engineering Principles

### Core Principles

#### 1. Targeted Access
```
Retrieve only what is needed, with minimal necessary context.
Applicable when: Specific information sought from large source.
Trade-off: Efficiency over completeness.
```

#### 2. Semantic Compression
```
Reduce to essential meaning, not arbitrary truncation.
Applicable when: Summary suffices, detail available on demand.
Trade-off: Breadth over depth.
```

#### 3. Noise Filtering
```
Remove non-essential elements while preserving core content.
Applicable when: Executable content needed without annotations.
Trade-off: Clean over annotated.
```

#### 4. Delta Access
```
Access changes rather than full state when understanding modifications.
Applicable when: Change comprehension needed.
Trade-off: Change focus over complete view.
```

#### 5. Temporal Relevance
```
Remove stale, duplicate, or irrelevant entries from active memory.
Applicable when: Memory growing unbounded.
Trade-off: Current accuracy over comprehensive history.
```

#### 6. Proactive Awareness
```
Continuously monitor resource usage and surface optimization opportunities.
Applicable when: Bounded resources with growing consumption.
Trade-off: Proactive over reactive.
```

#### 7. State Snapshot
```
Capture position summary for restart rather than preserving full history.
Applicable when: Continuation impractical, future work needed.
Trade-off: Restart capability over complete history.
```

#### 8. Upfront Planning
```
Estimate resource requirements before committing to work.
Applicable when: Resource limits exist, task cost unknown.
Trade-off: Informed planning over optimistic execution.
```

---

## Knowledge Gaps

| Gap | Analysis |
|-----|----------|
| Summarization quality | How to ensure semantic preservation? |
| Cost estimation accuracy | How to predict token usage reliably? |
| Pruning criteria | What makes entry "stale"? |
| State summarization | How to capture position without history? |

---

## Evidence

[EVIDENCE: /tmp/caveman/README.md - Technique descriptions]
[EVIDENCE: /tmp/caveman/SKILL.md - Full specification]
[EVIDENCE: INV-055, INV-056]

---

**Document Status**: INVESTIGATION  
**Human Review Required**: Yes  
**Blocking**: Cannot self-approve (Principle 2)  
**Focus**: Pure engineering principles, not KDE implementation
