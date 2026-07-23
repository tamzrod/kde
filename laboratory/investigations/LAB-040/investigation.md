# Investigation: LAB-040 - Knowledge Object Investigation

**Investigation ID**: LAB-040
**Title**: Knowledge Object Investigation
**Created**: 2026-07-22
**Status**: COMPLETE
**Engine**: KDE-ENGINE-002 (Beta) v0.1.0
**Seed**: SEED-001 (Genesis) v1.0.0

---

## Executive Summary

### Objective

Determine what a Knowledge Object fundamentally is.

### Background

Previous investigations established:
- LAB-037: No universal knowledge primitive exists
- LAB-038: A six-factor knowledge taxonomy exists
- LAB-039: A hybrid model best explains category relationships

LAB-039 introduced "Knowledge Object" as a container concept but never defined it. This investigation examines what a Knowledge Object fundamentally is.

### Evidence-Based Findings

**Finding 1**: "Knowledge Object" is an underspecified term with no universal definition.
**Finding 2**: Multiple candidate definitions exist across disciplines.
**Finding 3**: The definition depends on the purpose for which Knowledge Objects are used.
**Finding 4**: A working definition can be constructed for KDE purposes.

### Conclusion

**Recommendation: A defensible working definition exists for KDE.**

While no universal definition of "Knowledge Object" exists, a working definition can be constructed that serves KDE's purposes. The definition should be grounded in KDE's foundational concepts and the hybrid model from LAB-039.

---

## 1. Research Tier 1 — Existing Definitions

### 1.1 Philosophy

**Evidence from philosophy**:

| Concept | Definition | Relevance to KO |
|---------|------------|----------------|
| **Proposition** | A statement that can be true or false | Closest philosophical equivalent |
| **Belief** | A mental state of accepting something as true | Cognitive dimension |
| **Justification** | The warrant for a belief | Evidential dimension |
| **Fact** | A true proposition | Truth dimension |

**Key Insight**: Philosophy treats "what is known" as a proposition with justification. This suggests Knowledge Object = Proposition + Justification.

### 1.2 Epistemology

**Evidence from epistemology**:

| Concept | Definition | Relevance to KO |
|---------|------------|----------------|
| **Know-that** | Propositional knowledge | Declarative category |
| **Know-how** | Procedural knowledge | Procedural category |
| **Acquaintance** | Direct awareness | Direct evidence |

**Key Insight**: Epistemology distinguishes know-that and know-how. Knowledge Object must accommodate both.

### 1.3 Knowledge Representation

**Evidence from KR**:

| Concept | Definition | Relevance to KO |
|---------|------------|----------------|
| **Frame** | Knowledge structure with slots and values | Structural container |
| **Ontology** | Explicit specification of a conceptualization | Domain specification |
| **Triple** | Subject-Predicate-Object | Atomic fact unit |
| **Rule** | If-Then condition | Procedural element |

**Key Insight**: KR systems define knowledge units as structures (frames) with relationships (triples). Knowledge Object = Structured Knowledge + Relationships.

### 1.4 Semantic Web

**Evidence from Semantic Web**:

| Concept | Definition | Relevance to KO |
|---------|------------|----------------|
| **Resource** | Anything identified by URI | Identity via URI |
| **RDF Triple** | Atomic statement | Basic unit |
| **Named Graph** | Collection of triples with identity | Container concept |
| **OWL Class** | Concept definition | Classification |

**Key Insight**: Semantic Web treats Knowledge Object as a named graph (collection of triples with identity).

### 1.5 Logic

**Evidence from logic**:

| Concept | Definition | Relevance to KO |
|---------|------------|----------------|
| **Formula** | Syntactic expression | Content representation |
| **Interpretation** | Meaning assigned to formula | Semantics |
| **Theory** | Set of closed formulas | Knowledge base |
| **Model** | Structure satisfying theory | Truth conditions |

**Key Insight**: Logic treats a knowledge base (theory) as a set of formulas. Individual Knowledge Objects might be formulas or named graphs.

### 1.6 Information Science

**Evidence from Information Science**:

| Concept | Definition | Relevance to KO |
|---------|------------|----------------|
| **Document** | Information container | Physical analog |
| **Record** | Structured data | Database analog |
| **Item** | Discrete information unit | Bibliographic unit |
| **Entity** | Object of interest | Semantic unit |

**Key Insight**: Information Science treats Knowledge Object as a discrete, identifiable unit of information.

### 1.7 Cross-Disciplinary Summary

| Discipline | Basic Unit | Container Concept | Identity |
|------------|------------|------------------|----------|
| Philosophy | Proposition | Justification network | Via truth |
| Epistemology | Know-that/How | Mind | Via belief |
| KR | Frame/Rule | Knowledge base | Via structure |
| Semantic Web | Triple/Graph | Named graph | Via URI |
| Logic | Formula | Theory | Via interpretation |
| Info Science | Item/Record | Document | Via identifier |

**Key Insight**: No universal definition exists. Each discipline defines units differently based on their purposes.

---

## 2. Research Tier 2 — Candidate Models

### 2.1 Descriptive Model

**Definition**: A Knowledge Object is a description of something.

**Properties**:
- Content: A statement about the world
- Focus: What is described
- Examples: "The bridge can hold 50 tons"

**Evidence For**:
- Matches natural language: "I know that X"
- Simple and intuitive
- Matches declarative category (D)

**Evidence Against**:
- Excludes procedural knowledge ("know how")
- Excludes purely relational knowledge

### 2.2 Structural Model

**Definition**: A Knowledge Object is a structured container holding knowledge content.

**Properties**:
- Content: Structured data
- Focus: How content is organized
- Examples: Frame with slots, document with sections

**Evidence For**:
- Matches KDE-KNOWLEDGE-SPEC-001 structure
- Supports composition
- Matches hybrid model structure

**Evidence Against**:
- Content vs. structure distinction unclear
- What is the "structure" if not knowledge itself?

### 2.3 Relational Model

**Definition**: A Knowledge Object is defined by its relationships to other objects.

**Properties**:
- Content: Relationships
- Focus: Connections
- Examples: RDF triple, semantic network node

**Evidence For**:
- Matches semantic web approach
- Supports knowledge graphs
- Relationships are essential (LAB-037)

**Evidence Against**:
- Node/edge distinction arbitrary
- Objects require content, not just relationships

### 2.4 Semantic Model

**Definition**: A Knowledge Object is a meaning-bearing unit.

**Properties**:
- Content: Meaning
- Focus: Intension (sense)
- Examples: Concept, proposition, thought

**Evidence For**:
- Matches epistemology: "knowing that"
- Meaning is what knowledge is about
- Captures "understanding" from KDE-001

**Evidence Against**:
- Meaning is notoriously difficult to define
- Operationalizing "meaning" is complex

### 2.5 Computational Model

**Definition**: A Knowledge Object is a computable information unit.

**Properties**:
- Content: Processable data
- Focus: What can be computed
- Examples: Data structure, algorithm, query

**Evidence For**:
- Enables automated reasoning
- Matches AI/KR approaches
- Practical for implementation

**Evidence Against**:
- Overly implementation-focused
- May exclude non-computable knowledge
- Does not capture "understanding"

### 2.6 Cognitive Model

**Definition**: A Knowledge Object is a cognitive representation.

**Properties**:
- Content: Mental representation
- Focus: How mind stores knowledge
- Examples: Concept, schema, mental model

**Evidence For**:
- Matches human cognition
- Explains tacit knowledge
- Accounts for individual variation

**Evidence Against**:
- Mind-dependent (not all knowledge is mental)
- Difficult to observe and verify
- May not apply to externalized knowledge

### 2.7 Candidate Model Comparison

| Model | Content | Focus | Matches KDE? | Evidence |
|-------|---------|-------|-------------|----------|
| Descriptive | Statement | What is described | Partial | Excludes procedural |
| Structural | Container | Organization | Yes | Matches SPEC |
| Relational | Relationships | Connections | Yes | RDF triple |
| Semantic | Meaning | Intension | Yes | KDE-001 |
| Computational | Processable data | Computation | Partial | Too narrow |
| Cognitive | Mental state | Cognition | Partial | Mind-dependent |

**Key Finding**: No single model is universally correct. The appropriate model depends on purpose.

---

## 3. Research Tier 3 — Identity

### 3.1 What Gives a Knowledge Object Identity?

**Question**: What makes Knowledge Object A the same as or different from Knowledge Object B?

### 3.2 Identity Candidates

**Candidate 1: Content Identity**

| Criterion | A = B if | Evidence |
|-----------|----------|----------|
| Exact content match | Same text | Intuitive |
| Semantic match | Same meaning | Better philosophically |
| Category match | Same category | Matches hybrid model |

**Problem**: Content can be identical but have different identity (e.g., same fact in different documents).

**Finding**: Content alone does not determine identity.

**Candidate 2: Reference Identity**

| Criterion | A = B if | Evidence |
|-----------|----------|----------|
| URI/identifier | Same URI | Semantic Web |
| Location | Same storage | Information science |
| Source | Same origin | Provenance tracking |

**Evidence from Semantic Web**: Resources are identified by URIs. Two resources with different URIs are different, even if they have identical content.

**Finding**: Identity can be extrinsic (assigned, not inherent).

**Candidate 3: Context Identity**

| Criterion | A = B if | Evidence |
|-----------|----------|----------|
| Same context | Scope unchanged | LAB-039 |
| Same evidence | Supporting evidence | KDE-002 |
| Same category | Same hybrid type | LAB-038 |

**Evidence**: Changing context creates a different Knowledge Object (e.g., same claim in different investigations).

**Finding**: Context contributes to identity.

**Candidate 4: Relational Identity**

| Criterion | A = B if | Evidence |
|-----------|----------|----------|
| Same relationships | Links unchanged | KR |
| Same position | In same network | Graph theory |

**Evidence**: An RDF triple's identity depends on its subject and predicate (not just object).

**Finding**: Relationships contribute to identity.

### 3.3 Identity Analysis

**Can identical knowledge exist twice?**

**Evidence**: Yes, in different contexts.

- "Water boils at 100°C" can appear in multiple documents
- Each instance is a separate Knowledge Object
- Content is identical; identity differs by location/provenance

**Does changing evidence create a new object?**

**Evidence**: Yes.

- Same claim with different supporting evidence
- Confidence may differ
- Knowledge Object identity changes

**Does changing context create a new object?**

**Evidence**: Yes.

- "Valid for steel" vs "Valid for aluminum"
- Different scope → different Knowledge Object
- Matches LAB-039: Contextual is supplementary dimension

**Can one object belong to multiple investigations?**

**Evidence**: Yes.

- Same knowledge can support multiple investigations
- Reuse is expected
- Identity persists across investigations

**Is identity intrinsic or relational?**

**Evidence**: Relational.

- Identity depends on relationships to other objects
- No self-contained identity
- Matches RDF/graph-based approaches

### 3.4 Identity Conclusion

**Finding**: Knowledge Object identity is relational and context-dependent.

**Components of Identity**:
1. **Identifier**: Assigned unique reference (URI, UUID)
2. **Content**: What is known (primary category)
3. **Context**: Scope and applicability (Contextual dimension)
4. **Evidence**: Support relationships (Evidential dimension)
5. **Relationships**: Links to other objects

**Identity persists while content, context, or evidence may change.**

---

## 4. Research Tier 4 — Lifecycle

### 4.1 Lifecycle Stages

**From KDE state machine and evidence**:

| Stage | Description | Evidence |
|-------|-------------|----------|
| **Creation** | Object comes into existence | Any new artifact |
| **Classification** | Category and dimensions assigned | LAB-039 hybrid model |
| **Validation** | Evidence evaluated, confidence assigned | KDE-002 |
| **Publication** | Made available for use | STATE-MACHINE.md |
| **Use** | Referenced by other objects | Composition |
| **Revision** | Content or context updated | Evolution |
| **Deprecation** | Marked as superseded | STATE-MACHINE.md |
| **Archival** | Preserved but inactive | EVIDENCE.md |

### 4.2 Lifecycle as Fundamental vs. External

**Question**: Is lifecycle inherent to Knowledge Objects or externally imposed?

**Evidence for Fundamental**:

- Knowledge evolves (KDE-EVOLUTION.md)
- Evidence supports revision (LAB-037)
- Context changes affect validity (LAB-039)

**Evidence for External**:

- Lifecycle imposed by process (STATE-MACHINE.md)
- Same knowledge can have different lifecycles in different systems
- Lifecycle is about management, not knowledge itself

**Finding**: Lifecycle is externally imposed for management purposes, but the *potential* for change is inherent to knowledge.

### 4.3 Composition in Lifecycle

**Question**: How do Knowledge Objects compose into larger structures?

**Evidence from composition analysis (LAB-039)**:

- Categories integrate naturally
- Decomposition loses meaning
- Composition is semantic, not just structural

**Composition Mechanisms**:

| Mechanism | Example | Evidence |
|-----------|---------|----------|
| Logical | AND/OR of propositions | Propositional logic |
| Causal | Mechanism composition | Scientific explanation |
| Hierarchical | Part-whole | Engineering specs |
| Narrative | Argument structure | Investigation reports |

**Finding**: Composition is a semantic operation, not just aggregation.

### 4.4 Reuse in Lifecycle

**Question**: Can Knowledge Objects be reused?

**Evidence**: Yes.

- Same evidence supports multiple claims
- Same procedural knowledge applies in different contexts
- Knowledge is meant to be applied (KDE-001)

**Reuse Conditions**:

| Condition | Requirement | Evidence |
|-----------|-------------|----------|
| Context match | Scope must apply | LAB-039 |
| Category match | Must be applicable type | LAB-038 |
| Evidence sufficiency | Support must be adequate | KDE-002 |

**Finding**: Reuse requires context and category compatibility.

---

## 5. Research Tier 5 — Relationship to KDE

### 5.1 KDE Artifacts as Knowledge Objects?

**Question**: Are KDE artifacts (Claims, Evidence, Findings, etc.) Knowledge Objects themselves?

| KDE Concept | Knowledge Object? | Rationale |
|-------------|------------------|-----------|
| **Claim** | Yes | Declarative primary category |
| **Evidence** | Yes | Evidential dimension elevated |
| **Finding** | Yes | Declarative + Evidential |
| **Recommendation** | Yes | Normative + Procedural |
| **Definition** | Yes | Declarative category |
| **Question** | Yes | Contextual category (unknown) |
| **Decision** | Yes | Normative + Procedural + Contextual |

**Finding**: All KDE concepts can be represented as Knowledge Objects.

### 5.2 Are These Specialized Objects?

**Question**: Are KDE artifacts specialized types of Knowledge Object, or are they relationships between Knowledge Objects?

**Model A: Specialized Objects**
```
Claim IS-A KnowledgeObject (specialized)
Evidence IS-A KnowledgeObject (specialized)
```

**Evidence For**:
- Each has specific properties
- KDE-KNOWLEDGE-SPEC-001 defines specific structures
- State machines differ per artifact type

**Model B: Relationships**
```
Claim = KnowledgeObject (subject) + Relationship + Evidence (object)
```

**Evidence For**:
- Finding links Claim + Evidence
- Recommendation links Norm + Procedure
- All are compositional

**Finding**: Hybrid model best fits.

- Basic Knowledge Objects exist
- KDE artifacts are specialized Knowledge Objects with specific structures
- Relationships between Knowledge Objects also exist

### 5.3 KDE Knowledge Object Types

Based on KDE-KNOWLEDGE-SPEC-001 and LAB-039:

| Type | Primary Category | Supplementary | KDE Spec Alignment |
|------|-----------------|---------------|-------------------|
| **Claim** | Declarative | Contextual | Definition section |
| **Evidence** | Evidential | (elevated) | Evidence section |
| **Finding** | Declarative | Evidential | Analysis section |
| **Recommendation** | Normative | Procedural | Recommendation section |
| **Definition** | Declarative | - | Required section |
| **Question** | Contextual | - | Research question |
| **Procedure** | Procedural | Contextual | Method description |
| **Rule** | Normative | Contextual | Standard documents |

### 5.4 Relationship to LAB-039 Hybrid Model

```
KNOWLEDGE OBJECT (LAB-040)
    │
    ├── Primary Category (required)
    │       ├── Declarative → Claim, Finding, Definition
    │       ├── Procedural → Procedure
    │       ├── Causal → Explanation
    │       └── Normative → Rule, Recommendation
    │
    └── Supplementary Dimensions (optional)
            ├── Contextual → Scope, applicability
            └── Evidential → Evidence, support
```

**Consistency Check**: LAB-039's hybrid model accommodates KDE artifacts naturally.

---

## 6. Working Definition

### 6.1 Definition Candidates

**Candidate 1: Pure Proposition**
> A Knowledge Object is a proposition with truth conditions.

**Evaluation**: Too narrow. Excludes procedural, causal, and normative knowledge.

**Candidate 2: Pure Container**
> A Knowledge Object is a container holding knowledge content.

**Evaluation**: Too vague. Container concept is not defined.

**Candidate 3: Semantic Unit**
> A Knowledge Object is a semantically meaningful unit of knowledge.

**Evaluation**: Circular. "Semantically meaningful" requires definition.

**Candidate 4: KDE Working Definition (Proposed)**
> A Knowledge Object is an identified unit of actionable understanding, classified by primary category and supplementary dimensions, with associated evidence and provenance.

### 6.2 Working Definition Components

| Component | Source | Description |
|-----------|--------|-------------|
| **Identified** | Identity analysis | Unique reference (URI, ID) |
| **Unit** | Unit of analysis | Discrete, not further decomposed without loss |
| **Actionable** | KDE-001 | Enables effective practice |
| **Understanding** | KDE-001 | More than data; involves relationships |
| **Primary Category** | LAB-039 | Declarative, Procedural, Causal, or Normative |
| **Supplementary Dimensions** | LAB-039 | Contextual and/or Evidential |
| **Evidence** | KDE-002 | Support for the knowledge |
| **Provenance** | STATE-MACHINE | Source and lifecycle tracking |

### 6.3 Definition in Use

**Using the definition**:

For any KDE artifact, it is a Knowledge Object if it has:
1. **Identifier**: A unique reference
2. **Primary Category**: What kind of knowledge (D, P, C, or N)
3. **Supplementary Dimensions**: Optional scope (X) and support (E)
4. **Evidence**: Supporting documentation
5. **Provenance**: Track of origin and changes

**Example: Claim**
```
Claim: "The bridge can hold 50 tons"
- Identifier: "KO-2026-001"
- Primary Category: Declarative
- Supplementary Dimensions: 
  - Contextual: "Valid for steel girder bridges, span < 100m"
  - Evidential: [Design calculations, load tests]
- Evidence: Design document, test report
- Provenance: Investigation INV-X, approved Y
```

### 6.4 Limitations of the Definition

The working definition:
- Is purpose-specific (KDE use case)
- Does not claim universal validity
- Requires implementation decisions (what counts as "unit")
- May need refinement based on empirical use

---

## 7. Findings and Open Questions

### 7.1 Findings

**Finding 1**: No universal definition of "Knowledge Object" exists.

**Evidence**: Each discipline defines units differently based on their purposes. Philosophy uses propositions, KR uses frames, Semantic Web uses named graphs.

**Finding 2**: Multiple candidate definitions can be identified.

**Evidence**: Descriptive, Structural, Relational, Semantic, Computational, and Cognitive models all have supporting evidence.

**Finding 3**: Knowledge Object identity is relational and context-dependent.

**Evidence**: Identity depends on identifier, content, context, evidence, and relationships. Content alone does not determine identity.

**Finding 4**: Lifecycle is externally imposed for management, but change potential is inherent.

**Evidence**: Knowledge evolves; lifecycle processes manage this evolution.

**Finding 5**: A working definition can be constructed for KDE.

**Evidence**: The proposed working definition accommodates all KDE artifacts and aligns with LAB-037, LAB-038, and LAB-039.

### 7.2 Relationship to Previous Investigations

| LAB-037 Finding | LAB-040 Interpretation |
|-----------------|----------------------|
| Multiple primitive models | Knowledge Objects can have different primary categories |
| No universal primitive | Knowledge Object definition must accommodate multiple types |
| Context-dependence | Contextual is a supplementary dimension |

| LAB-038 Finding | LAB-040 Interpretation |
|-----------------|----------------------|
| Six categories | Knowledge Objects classified by these categories |
| Non-mutual-exclusivity | Objects can have multiple supplementary dimensions |

| LAB-039 Finding | LAB-040 Interpretation |
|-----------------|----------------------|
| Hybrid model | Knowledge Object structure matches hybrid model |
| Primary + supplementary | Object composition matches LAB-039 diagram |

### 7.3 Open Questions

| Question | Why It Matters | Evidence Gap |
|----------|----------------|--------------|
| What is the minimal "unit" for KDE? | Granularity decision | Empirical analysis needed |
| How to handle composite objects? | Composition semantics | Implementation research |
| What identity criteria for KDE? | Storage and retrieval | Use-case analysis needed |
| Can Knowledge Objects be nested? | Hierarchical structure | Design decision needed |

---

## 8. Recommendation

### 8.1 Conclusion

**Evidence supports conclusion: A defensible working definition exists for KDE.**

While no universal definition of "Knowledge Object" exists, a working definition can be constructed that:
- Accommodates all KDE artifacts
- Aligns with previous investigations (LAB-037, LAB-038, LAB-039)
- Serves KDE's purposes (actionable understanding within constraints)

### 8.2 Working Definition

> **A Knowledge Object is an identified unit of actionable understanding, classified by primary category and supplementary dimensions, with associated evidence and provenance.**

### 8.3 Formalization

```
KnowledgeObject {
  identifier: URI
  primaryCategory: Declarative | Procedural | Causal | Normative
  supplementaryDimensions: {
    contextual?: Scope
    evidential?: Support
  }
  content: [Content specific to primaryCategory]
  evidence: [Evidence references]
  provenance: Provenance chain
}
```

### 8.4 KDE Artifact Mapping

| Artifact | Primary Category | Supplementary Dimensions |
|----------|-----------------|------------------------|
| Claim | Declarative | Contextual, Evidential |
| Evidence | (Evidential elevated) | - |
| Finding | Declarative | Evidential |
| Recommendation | Normative | Procedural, Contextual |
| Definition | Declarative | - |
| Question | Contextual | - |
| Procedure | Procedural | Contextual, Evidential |
| Rule | Normative | Contextual, Evidential |

---

## 9. Confidence Assessment

### Confidence by Finding

| Finding | Confidence | Rationale |
|---------|-----------|------------|
| Finding 1: No universal definition | HIGH | Direct evidence from cross-disciplinary analysis |
| Finding 2: Multiple candidates | HIGH | Explicit models from each discipline |
| Finding 3: Relational identity | MEDIUM-HIGH | Consistent with Semantic Web and KR |
| Finding 4: External lifecycle | MEDIUM-HIGH | Matches STATE-MACHINE and evolution evidence |
| Finding 5: Working definition | MEDIUM | Grounded but purpose-specific |

### Overall Confidence

**MEDIUM-HIGH**

The investigation is grounded in cross-disciplinary evidence and aligns with previous KDE investigations. Empirical validation with actual KDE artifacts would strengthen confidence.

---

## 10. Compliance

This investigation follows the Laboratory Rules (SEED-001):

| Rule | Compliance |
|------|------------|
| No Auto-Continuation | ✓ Investigation complete |
| No Self-Approval | ✓ Human review required |
| No Self-Promotion | ✓ Not applicable |
| Distinguish Evidence | ✓ All findings labeled |
| Evidence-Based Changes | ✓ All claims supported |

---

## 11. Deliverables Checklist

- [x] Investigation Report (this document)
- [x] Research Log (implicit in tiers 1-5)
- [x] Candidate Definitions (Section 2)
- [x] Cross-Disciplinary Comparison (Section 1)
- [x] Identity Analysis (Section 3)
- [x] Lifecycle Analysis (Section 4)
- [x] Recommendation (Section 8)

---

## 12. References

### KDE Internal References

| Document | Relevance |
|----------|-----------|
| LAB-037 (Knowledge Primitive) | Primitive models inform primary categories |
| LAB-038 (Knowledge Taxonomy) | Six categories as classification basis |
| LAB-039 (Semantic Dimension) | Hybrid model as structural basis |
| KDE-001 (What is Knowledge?) | "Actionable understanding" |
| KDE-002 (What is Evidence?) | Evidence dimension |
| KDE-KNOWLEDGE-SPEC-001 | Artifact structure |
| STATE-MACHINE.md | Lifecycle and provenance |

### External References

| Source | Relevance |
|--------|----------|
| Ryle, G. (1949) | Know-that/know-how distinction |
| Polanyi, M. (1966) | Tacit knowledge |
| Brachman (1979) | KL-ONE, structured knowledge |
| Berners-Lee (2001) | Semantic Web resources |
| Sowa (2000) | Knowledge representation |

---

**Document Status**: COMPLETE
**Confidence**: MEDIUM-HIGH
**Conclusion**: A defensible working definition exists for KDE

---

*Investigation complete. Awaiting human review.*
