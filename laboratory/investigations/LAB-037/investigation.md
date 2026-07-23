# Investigation: LAB-037 - Knowledge Primitive Investigation

**Investigation ID**: LAB-037
**Title**: Knowledge Primitive Investigation
**Created**: 2026-07-22
**Status**: COMPLETE
**Engine**: KDE-ENGINE-002 (Beta) v0.1.0
**Seed**: SEED-001 (Genesis) v1.0.0

---

## Executive Summary

### Objective

Investigate whether knowledge can be decomposed into the smallest semantically complete primitive that can be independently stored, validated, referenced, and recombined into higher-level knowledge structures.

### Evidence-Based Findings

This investigation examined knowledge atomicity from multiple disciplinary perspectives. The evidence suggests:

**Finding 1**: A universally applicable knowledge primitive does not exist.

**Finding 2**: Multiple candidate primitive models exist with different trade-offs.

**Finding 3**: The appropriate primitive depends on use case context.

### Conclusion

**Recommendation: Multiple competing primitive models exist.**

No single knowledge primitive emerges as universally superior. Different representations serve different purposes: propositional knowledge, procedural knowledge, causal knowledge, and contextual knowledge each require different primitives.

---

## 1. Research Tier 1 — Knowledge Foundations

### 1.1 What is Knowledge?

**Evidence from KDE foundational knowledge (KDE-001)**:

> *Engineering knowledge is actionable understanding that enables effective practice within constraints.*

Key characteristics:
- **Actionable**: Must enable action; passive knowing is insufficient
- **Understanding**: More than data; involves comprehension and relationships
- **Effective practice**: Success in use is the criterion; truth is not required
- **Within constraints**: Engineering operates under practical constraints

**Philosophical Evidence**:

| Theory | Definition | Implication for Primitives |
|--------|-----------|--------------------------|
| Justified True Belief (JTB) | Know = justified + true + belief | Primitive requires 3 components |
| Gettier Problem | JTB is insufficient | More complex justification needed |
| Reliabilism | True belief produced by reliable process | Primitive needs reliability indicator |
| Contextualism | Truth depends on context | Primitive needs context field |

### 1.2 What Distinguishes Knowledge from Information?

**Evidence from KDE foundational knowledge (KDE-001, KDE-002)**:

| Concept | KDE-001 (Knowledge) | KDE-002 (Evidence) |
|---------|---------------------|-------------------|
| Focus | Enables action | Supports evaluation |
| Relationship | Knowledge → enables action | Evidence → supports knowledge |
| Direction | Forward (action) | Backward (justification) |

**Information Theory Evidence** (Shannon):
- Information = reduction of uncertainty
- Data → Information → Knowledge is a hierarchy
- Knowledge adds contextual meaning to information

**Implication**: Knowledge primitive must include or reference contextual meaning.

### 1.3 What Constitutes a Complete Unit of Knowledge?

**Evidence from Knowledge Document Specification (KDE-KNOWLEDGE-SPEC-001)**:

A Knowledge Document requires:
1. Definition (one-paragraph statement of what is known)
2. Summary (2-3 paragraph overview)
3. Evidence (supporting evidence with references)
4. Provenance (complete traceability chain)

**Minimal complete unit requires**:
- Statement of what is known
- Evidence supporting the statement
- Provenance linking to source

### 1.4 Can Knowledge Exist Independently of Context?

**Evidence**: Context-dependence is a recurring theme across disciplines.

| Discipline | View on Context | Evidence |
|------------|-----------------|----------|
| Philosophy | Contextualism (varying strictness standards) | Heller (1988) |
| Science | Context-independent truth possible | Popper (1959) |
| Engineering | Context is fundamental | KDE-001: "within constraints" |
| Cognitive Science | Schemas require context | Bartlett (1932) |

**Finding**: Knowledge primitive must include context specification, but context itself may not be decomposable.

---

## 2. Research Tier 2 — Knowledge Atomicity

### 2.1 Does a Smallest Meaningful Knowledge Unit Exist?

**Competing Viewpoints**:

**Viewpoint A: Atomic Knowledge Units Exist**

Evidence:
- Natural language semantics: Minimal meaning units (morphemes, sememes)
- Semantic web: RDF triples as atomic knowledge
- Cognitive science: Conceptual primitives (Rosch's prototype theory)

Arguments for:
- Simpler storage and retrieval
- Easier validation
- Recombinability

**Viewpoint B: Knowledge is Inherently Holistic**

Evidence:
- Gestalt psychology: Whole exceeds sum of parts
- Wittgenstein: Meaning determined by use (language games)
- Polanyi: Tacit knowledge resists decomposition

Arguments against:
- Decomposition destroys meaning
- Context determines interpretation
- Relationships are constitutive, not accidental

**Viewpoint C: Context-Dependent Atomicity**

Evidence:
- Atomism works for some knowledge types (propositional)
- Fails for other types (procedural, tacit)

**Synthesis**: No universally atomic unit exists. Atomicity depends on knowledge type.

### 2.2 Properties That Might Define an Atomic Unit

| Property | Description | Evidence |
|----------|-------------|----------|
| **Semantic Completeness** | Can stand alone with meaning | RDF triple |
| **Indivisibility** | Cannot be split without loss | Philosophy: simples |
| **Context-Independence** | Meaning unchanged by external factors | Disputed |
| **Valuation** | Can be evaluated as true/false | Propositional knowledge |
| **Actionability** | Enables specific action | KDE-001 |

### 2.3 At What Point Does Decomposition Destroy Meaning?

**Evidence from linguistics**:
- Morphemes: Smallest meaningful units in language
- Problem: Same morpheme has different meanings in different contexts
- Decomposition loses pragmatic meaning

**Evidence from knowledge representation**:
- RDF triples: Subject-Predicate-Object
- Problem: Predicate semantics require background knowledge
- Decomposition loses inferential meaning

**Evidence from cognitive science**:
- Concepts: Activated as wholes
- Problem: Retrieval involves whole schema, not parts
- Decomposition loses activation context

**Conclusion**: Decomposition destroys meaning when relationships are constitutive rather than accidental.

### 2.4 Can an Atomic Unit Remain Meaningful Without Relationships?

**Evidence**:

| Unit Type | Can Stand Alone? | Evidence |
|-----------|------------------|----------|
| Proposition | Yes (semantically) | Logic: propositions are truth-bearers |
| Fact | Yes (if context provided) | metaphysics: facts are truth-makers |
| Rule | Partial (needs application context) | Engineering: rules need constraints |
| Pattern | No (requires instances) | Science: patterns need data |
| Relationship | No (requires relata) | Graph theory: edges require nodes |

**Finding**: Only propositions and facts can potentially stand alone. All other candidates require relationships for meaning.

---

## 3. Research Tier 3 — Knowledge Composition

### 3.1 How Do Primitives Combine?

**Composition Mechanisms Identified**:

1. **Logical Composition**: AND, OR, NOT (propositional logic)
2. **Causal Composition**: If-then rules (causal reasoning)
3. **Hierarchical Composition**: Part-whole (mereology)
4. **Temporal Composition**: Before-after (temporal logic)
5. **Belief Composition**: Probability distributions (Bayesian)
6. **Narrative Composition**: Story structure (argumentation)

### 3.2 What Relationships Connect Primitives?

**Relationship Types**:

| Relationship | Type | Example |
|--------------|------|---------|
| Implication | Logical | A → B |
| Causation | Causal | A causes B |
| Composition | Mereological | A is part of B |
| Temporal | Sequential | A before B |
| Subsumption | Hierarchical | A is-a B |
| Association | Correlational | A correlates with B |

### 3.3 Can Larger Knowledge Structures Emerge Naturally?

**Evidence from emergence theory**:

| Type of Emergence | Description | Example |
|------------------|-------------|---------|
| Weak emergence | Derivable from parts | Salt dissolving |
| Strong emergence | Not derivable | Consciousness (disputed) |
| Nomological emergence | Law-level novelty | Natural laws |

**Finding**: Knowledge structures exhibit weak emergence. Complex knowledge can be (in principle) decomposed, but the decomposition may not preserve explanatory power.

### 3.4 Can Investigations Be Reconstructed from Primitives?

**Evidence from causal tracing methodology**:
- Complex reasoning chains can be decomposed
- Reconstruction requires preserving inferential links
- Some reasoning is abductive (inference to best explanation), resisting decomposition

**Conclusion**: Investigations can be partially reconstructed from primitives, but reconstruction quality depends on relationship preservation.

---

## 4. Research Tier 4 — Validation

### 4.1 How Is a Primitive Validated?

**Validation Approaches**:

| Approach | Applicable Primitive | Evidence |
|----------|-------------------|----------|
| Empirical | Observation primitives | Science: observation statements |
| Logical | Propositional primitives | Logic: proof systems |
| Procedural | Action primitives | Engineering: test runs |
| Social | Normative primitives | Philosophy: consensus |
| Causal | Mechanism primitives | Science: mechanism identification |

### 4.2 Can Confidence Exist at Primitive Level?

**Evidence from probability theory**:
- Confidence (subjective probability) can attach to any proposition
- Confidence is epistemic, not semantic
- Primitive can have confidence independently of other primitives

**Evidence from KDE-002 (Evidence definition)**:
- Evidence supports or refutes claims
- Confidence requires evidence
- Primitive can have evidence directly attached

**Finding**: Yes, confidence can exist at primitive level.

### 4.3 Can Evidence Attach Directly to Primitives?

**Evidence from RDF and semantic web**:
- Triples can have provenance metadata
- Reification allows evidence attachment
- Evidence is itself a primitive

**Evidence from KDE-EVIDENCE.md**:
- Evidence types: log, measurement, screenshot, document, etc.
- Evidence is stored separately from claims
- Evidence links to supporting claims

**Finding**: Yes, evidence can attach directly to primitives.

### 4.4 How Should Conflicting Primitives Coexist?

**Resolution Mechanisms**:

| Mechanism | Description | Evidence |
|-----------|-------------|----------|
| Priority | Higher priority overrides | Conflict resolution rules |
| Confidence | Higher confidence wins | Bayesian updating |
| Context | Context determines applicability | Contextualism |
| Reification | Mark as disputed | Epistemic status fields |
| Partitioning | Separate knowledge bases | Domain separation |

---

## 5. Research Tier 5 — KDE Suitability

### 5.1 Could Identified Primitives Support KDE Investigations?

**Analysis**:

| Primitive Candidate | KDE Investigation Support | Evidence |
|-------------------|-------------------------|----------|
| Propositions | High | Investigations produce propositional findings |
| Evidence items | High | Evidence is central to KDE methodology |
| Rules | Medium | Engineering rules can be encoded |
| Contexts | Medium | KDE-002: "in context" |
| Relationships | High | Investigations track relationships |

**Finding**: Multiple primitive types can support KDE investigations.

### 5.2 Could Primitives Support Engineering Knowledge?

**Evidence from KDE-001**:
- Engineering knowledge is "actionable understanding"
- Requires context ("within constraints")
- Validated through practice

**Finding**: Engineering knowledge requires primitives that include:
- Action capability
- Constraint specification
- Context dependence
- Validation evidence

### 5.3 Could Primitives Support Scientific Knowledge?

**Evidence from scientific method**:
- Requires falsifiability
- Requires reproducibility
- Requires evidence

**Finding**: Scientific knowledge requires primitives that include:
- Testability indicators
- Reproducibility metadata
- Evidence chains

### 5.4 Could Primitives Support Decision Support?

**Evidence from decision theory**:
- Decisions require options, outcomes, utilities
- Uncertainty must be represented
- Preferences must be specified

**Finding**: Decision support requires:
- Option primitives
- Outcome primitives
- Utility primitives
- Uncertainty primitives

### 5.5 Could Primitives Support Cross-Domain Reasoning?

**Evidence from transfer learning**:
- Knowledge transfer is possible
- Abstraction enables transfer
- Domain-specific elements resist transfer

**Finding**: Cross-domain reasoning requires:
- Abstraction hierarchy
- Domain-specific and domain-general primitives
- Mapping primitives between domains

---

## 6. Candidate Primitive Models

### Model A: Propositional Primitive

**Structure**:
```
Proposition:
  - statement: string
  - confidence: float [0,1]
  - evidence: list[Evidence]
  - provenance: Provenance
```

**Properties**:
- Semantic completeness: Yes (truth-evaluable)
- Context-independence: Partial (statement may have implicit context)
- Validation: Through evidence and confidence

### Model B: Contextual Primitive

**Structure**:
```
ContextualKnowledge:
  - claim: Proposition
  - context: Context
  - scope: Scope (when, where, for whom)
  - applicability: ApplicabilityConditions
  - evidence: list[Evidence]
```

**Properties**:
- Semantic completeness: Yes (claim + context)
- Context-independence: No (context is part of meaning)
- Validation: Through evidence and scope checking

### Model C: Causal Primitive

**Structure**:
```
CausalKnowledge:
  - mechanism: Mechanism
  - antecedent: Condition
  - consequent: Outcome
  - reliability: ReliabilityMetric
  - evidence: list[Evidence]
```

**Properties**:
- Semantic completeness: Yes (mechanism explains connection)
- Context-independence: No (mechanism has scope)
- Validation: Through mechanism identification

### Model D: Procedural Primitive

**Structure**:
```
Procedure:
  - preconditions: list[Condition]
  - actions: list[Action]
  - postconditions: list[Condition]
  - constraints: list[Constraint]
  - evidence: list[Evidence]
```

**Properties**:
- Semantic completeness: Yes (complete procedure)
- Context-independence: No (preconditions specify context)
- Validation: Through execution

### Model Comparison

| Model | Completeness | Independence | Validation | Best For |
|-------|------------|--------------|------------|----------|
| Propositional | High | High | Evidence | Facts, claims |
| Contextual | High | Low | Scope | Engineering |
| Causal | High | Low | Mechanism | Science |
| Procedural | High | Low | Execution | Engineering |

---

## 7. Findings and Open Questions

### 7.1 Findings

**Finding 1**: A universally atomic knowledge primitive does not exist.

**Evidence**: Different knowledge types (propositional, procedural, causal, contextual) require different primitive structures. Decomposition destroys meaning for some types.

**Finding 2**: Multiple candidate primitive models exist with different trade-offs.

**Evidence**: Propositional, contextual, causal, and procedural models each optimize for different properties. No single model dominates.

**Finding 3**: The appropriate primitive depends on use case context.

**Evidence**: Engineering knowledge favors contextual primitives; scientific knowledge favors causal primitives; decision support favors procedural primitives.

**Finding 4**: Knowledge primitives require relationships to achieve full meaning.

**Evidence**: Even "atomic" propositions derive meaning from logical relationships, causal relationships, and contextual relationships.

**Finding 5**: Validation and confidence can exist at primitive level.

**Evidence**: Evidence attachment and confidence assignment are independent of primitive type.

### 7.2 Open Questions

| Question | Why It Matters | Evidence Gap |
|----------|----------------|--------------|
| What is the minimal set of primitive types? | Enables consistent representation | Empirical analysis needed |
| How do primitives maintain meaning under decomposition? | Critical for storage and retrieval | Theoretical framework incomplete |
| Can strong emergence occur in knowledge structures? | Implications for reconstruction | Philosophical dispute |
| What is the appropriate granularity for KDE? | Affects implementation | Use-case analysis needed |

---

## 8. Recommendation

### 8.1 Conclusion

**Evidence supports conclusion: Multiple competing primitive models exist.**

No single knowledge primitive emerges as universally superior. The appropriate primitive depends on:

1. **Knowledge type**: Propositional, procedural, causal, or contextual
2. **Use case**: Engineering, science, decision support
3. **Validation requirements**: Evidence availability, confidence needs
4. **Composition requirements**: Relationship preservation

### 8.2 Recommended Approach for KDE

Given KDE's focus on **engineering knowledge** ("actionable understanding within constraints"), the investigation recommends:

**Use contextual primitives as the primary model**, with support for:

1. **Claim** (what is known)
2. **Context** (when, where, for whom applicable)
3. **Evidence** (supporting documentation)
4. **Confidence** (subjective probability)
5. **Relationships** (links to other primitives)

This aligns with:
- KDE-001: "actionable understanding" → requires claim + context
- KDE-002: "in context" → evidence evaluation depends on context
- Engineering practice: "within constraints" → context is fundamental

### 8.3 Implementation Caveats

**The investigation did not design implementation.** Further work is needed to:

1. Determine appropriate granularity for KDE use cases
2. Define relationship types between primitives
3. Design validation protocols for primitives
4. Assess storage and retrieval requirements

### 8.4 Alternative Consideration

If KDE determines that a simpler model is sufficient, **propositional primitives** provide:
- Lower complexity
- Easier validation
- Well-understood composition

Trade-off: Loss of contextual nuance and engineering-specific features.

---

## 9. Confidence Assessment

### Confidence by Finding

| Finding | Confidence | Rationale |
|---------|-----------|------------|
| Finding 1: No universal primitive | HIGH | Consistent evidence across disciplines |
| Finding 2: Multiple models exist | HIGH | Direct evidence from analysis |
| Finding 3: Context-dependence | HIGH | Consistent with KDE-001, KDE-002 |
| Finding 4: Relationships required | MEDIUM | Theoretical support, empirical gap |
| Finding 5: Validation possible | HIGH | Consistent with KDE methodology |

### Overall Confidence

**MEDIUM-HIGH**

The investigation is theoretically grounded across multiple disciplines. However, empirical validation with actual KDE knowledge artifacts would strengthen confidence in the recommended approach.

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
- [x] Findings (Section 7)
- [x] Open Questions (Section 7.2)
- [x] Candidate Primitive Models (Section 6)
- [x] Supporting Evidence (cited throughout)
- [x] Recommendation (Section 8)

---

## 12. References

### KDE Internal References

| Document | Relevance |
|----------|-----------|
| KDE-001 (What is Knowledge?) | Foundational definition |
| KDE-002 (What is Evidence?) | Evidence-knowledge relationship |
| KDE-KNOWLEDGE-SPEC-001 | Knowledge document structure |
| LAB-036 (previous investigation) | Artifact hierarchy analysis |

### External References

| Source | Relevance |
|--------|----------|
| Plato, *Meno*, *Theaetetus* | JTB theory origin |
| Gettier (1963) | JTB insufficiency |
| Polanyi (1966) | Tacit knowledge |
| Shannon (1948) | Information theory |
| Rosch (1975) | Prototype theory |
| Wittgenstein (1953) | Language games |
| Bartlett (1932) | Schema theory |

---

**Document Status**: COMPLETE
**Confidence**: MEDIUM-HIGH
**Conclusion**: Multiple competing primitive models exist

---

*Investigation complete. Awaiting human review.*
