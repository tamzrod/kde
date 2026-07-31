# Investigation: LAB-039 - Semantic Dimension Investigation

**Investigation ID**: LAB-039
**Title**: Semantic Dimension Investigation
**Created**: 2026-07-22
**Status**: COMPLETE
**Engine**: KDE-ENGINE-002 (Beta) v0.1.0
**Seed**: SEED-001 (Genesis) v1.0.0

---

## Executive Summary

### Objective

Determine whether the six knowledge categories represent:
- **Model A**: Independent primitive families
- **Model B**: Semantic dimensions applicable to the same knowledge object
- **Model C**: A hybrid model

### Background

LAB-037 identified multiple primitive models (propositional, procedural, causal, contextual).
LAB-038 proposed six categories (Declarative, Procedural, Causal, Contextual, Evidential, Normative).
A critical question remains: Are these categories independent types or dimensions of a unified model?

### Evidence-Based Findings

**Finding 1**: Some categories can exist independently (Declarative, Causal).
**Finding 2**: Some categories cannot exist without others (Evidential requires something to support).
**Finding 3**: Real-world knowledge objects contain multiple categories simultaneously.
**Finding 4**: Categories show dependency relationships but are not strictly hierarchical.

### Conclusion

**Recommendation: Model C (Hybrid) is most defensible.**

The evidence suggests that the six categories are neither purely independent primitive families nor purely semantic dimensions. Instead, they form a hybrid model where:
- Some categories (Declarative, Procedural, Causal, Normative) can function as primary knowledge content
- Some categories (Contextual, Evidential) function as supplementary dimensions that qualify primary content

---

## 1. Research Tier 1 — Conceptual Independence

### 1.1 Declarative (D)

**Can it exist independently?**
Yes.

**Evidence**:
- Propositions can be stated without procedural, causal, contextual, evidential, or normative components
- "The sky is blue" is a complete declarative statement
- No other category is required for semantic completeness

**Does it require another category?**
No, but it can be enhanced by others.

**Can it stand alone as knowledge?**
Yes.

**Conclusion**: Declarative is independently viable as a primary category.

### 1.2 Procedural (P)

**Can it exist independently?**
Partially.

**Evidence**:
- A procedure like "turn left" can be stated without declarative support
- However, procedures often include declarative elements ("what to do")
- Procedures require a performer and conditions (contextual elements)

**Does it require another category?**
Partially. Procedures require context to be actionable.

**Can it stand alone as knowledge?**
Yes, but with implicit context.

**Conclusion**: Procedural is independently viable but often co-occurs with Contextual.

### 1.3 Causal (C)

**Can it exist independently?**
Yes.

**Evidence**:
- "A causes B" is a complete causal statement
- No other category is semantically required
- Causal relationships can be stated as propositions

**Does it require another category?**
No, but causal claims benefit from evidence.

**Can it stand alone as knowledge?**
Yes.

**Conclusion**: Causal is independently viable as a primary category.

### 1.4 Contextual (X)

**Can it exist independently?**
No.

**Evidence**:
- "When it's raining" or "In summer" cannot stand alone as knowledge
- Contextual statements require something to contextualize
- They are inherently relational

**Does it require another category?**
Yes. Contextual requires primary content to qualify.

**Can it stand alone as knowledge?**
No.

**Conclusion**: Contextual is NOT independently viable. It functions as a dimension, not a primary category.

### 1.5 Evidential (E)

**Can it exist independently?**
No.

**Evidence**:
- "This evidence supports..." requires a claim to support
- Evidence relationships are inherently relational
- Evidence cannot exist without something to provide evidence for

**Does it require another category?**
Yes. Evidential requires primary content (Declarative, Causal, etc.).

**Can it stand alone as knowledge?**
No.

**Conclusion**: Evidential is NOT independently viable. It functions as a dimension, not a primary category.

### 1.6 Normative (N)

**Can it exist independently?**
Partially.

**Evidence**:
- "You must do X" is a complete normative statement
- Norms can exist without being applied to specific cases
- However, norms typically include implicit procedural elements

**Does it require another category?**
Partially. Norms often imply procedures.

**Can it stand alone as knowledge?**
Yes, but may be enhanced by Procedural.

**Conclusion**: Normative is independently viable as a primary category, but often co-occurs with Procedural.

### 1.7 Conceptual Independence Summary

| Category | Independent? | Requires Others? | Functions As |
|----------|-------------|------------------|-------------|
| Declarative (D) | Yes | No | Primary |
| Procedural (P) | Yes | No (implicit context) | Primary |
| Causal (C) | Yes | No | Primary |
| Contextual (X) | No | Yes (primary content) | Dimension |
| Evidential (E) | No | Yes (primary content) | Dimension |
| Normative (N) | Yes | No (implies procedures) | Primary |

---

## 2. Research Tier 2 — Cross-Category Analysis

### 2.1 Engineering Specification Example

**Object**: "Steel bridge design specification"

**Category Analysis**:

| Component | Primary Category | Additional Categories |
|-----------|-----------------|---------------------|
| "Tensile strength: 400 MPa" | Declarative | Contextual (applies to steel), Evidential (test data) |
| "Use Grade 50 steel" | Normative | Procedural (how to select) |
| "Load calculations per AISC" | Procedural | Normative (following standard) |
| "Fatigue caused by cyclic loading" | Causal | Evidential (mechanism evidence) |
| "Valid for bridges < 50m span" | Contextual | Declarative (scope) |

**Observation**: Multiple categories coexist in the same artifact. Categories are not exclusive.

### 2.2 Scientific Paper Example

**Object**: "Climate Change Research Paper"

**Category Analysis**:

| Component | Primary Category | Additional Categories |
|-----------|-----------------|---------------------|
| "Global temperature rose 1.1°C" | Declarative | Evidential (measurement data) |
| "CO2 causes warming (radiative forcing)" | Causal | Evidential (mechanism studies) |
| "Method: 50-year temperature record" | Procedural | Contextual (measurement context) |
| "Applies to global, not regional" | Contextual | Declarative (scope statement) |
| "Findings support emission reduction" | Evidential | Normative (implied policy) |

**Observation**: Categories interweave throughout the document. No single category dominates.

### 2.3 Legal Regulation Example

**Object**: "OSHA Safety Regulation 29 CFR 1910.134"

**Category Analysis**:

| Component | Primary Category | Additional Categories |
|-----------|-----------------|---------------------|
| "Employers must provide respirators" | Normative | Procedural (what to provide) |
| "When exposure exceeds PEL" | Contextual | Declarative (threshold) |
| "NIOSH-certified equipment required" | Normative | Evidential (certification) |
| "Respiratory hazards cause lung disease" | Causal | Evidential (health data) |
| "Required fit testing procedures" | Procedural | Normative (compliance) |

**Observation**: Regulation naturally contains all six categories. Categories are complementary.

### 2.4 Operating Procedure Example

**Object**: "Nuclear Power Plant Shutdown Procedure"

**Category Analysis**:

| Component | Primary Category | Additional Categories |
|-----------|-----------------|---------------------|
| "Step 1: Insert control rods" | Procedural | Normative (must do) |
| "When reactor temp exceeds 600°F" | Contextual | Declarative (threshold) |
| "Rod insertion slows reaction (neutron absorption)" | Causal | Evidential (physics) |
| "Log all parameter readings" | Normative | Procedural (how to log) |
| "Approved per NRC reg 50.54" | Evidential | Normative (authority) |

**Observation**: Procedures inherently combine all categories. Separation would lose meaning.

### 2.5 Medical Guideline Example

**Object**: "Diabetes Treatment Guideline"

**Category Analysis**:

| Component | Primary Category | Additional Categories |
|-----------|-----------------|---------------------|
| "HbA1c target < 7%" | Declarative | Normative (goal) |
| "Metformin is first-line therapy" | Normative | Evidential (clinical trials) |
| "When to initiate insulin" | Contextual | Procedural (decision procedure) |
| "Insulin lowers blood glucose (mechanism)" | Causal | Evidential (pharmacology) |
| "Patient-specific factors may modify" | Contextual | Declarative (considerations) |

**Observation**: Guidelines are inherently multi-dimensional. Category separation would fragment clinical knowledge.

### 2.6 Cross-Category Analysis Summary

**Evidence from Examples**:

| Domain | Categories Present | Primary Categories | Dimension Categories |
|--------|-------------------|-------------------|---------------------|
| Engineering | All 6 | D, P, C, N | X, E |
| Scientific | All 6 | D, C | P, X, E, N |
| Legal | All 6 | N, P | D, X, E, C |
| Operating Procedure | All 6 | P, N | D, C, X, E |
| Medical | All 6 | D, N, C | P, X, E |

**Key Observation**: All six categories appear in every domain examined. No domain uses only one category type.

---

## 3. Research Tier 3 — Dependency Mapping

### 3.1 Dependency Analysis

**Can Category X exist without Category Y?**

| | Without D | Without P | Without C | Without X | Without E | Without N |
|---|-----------|-----------|-----------|-----------|-----------|-----------|
| **D** | - | Yes | Yes | Yes | Yes | Yes |
| **P** | Yes | - | Yes | Partial | Yes | Yes |
| **C** | Yes | Yes | - | Yes | Yes | Yes |
| **X** | No | No | No | - | No | No |
| **E** | No | No | No | No | - | No |
| **N** | Yes | Partial | Yes | Yes | Yes | - |

**Legend**: "No" = requires, "Yes" = can exist without, "Partial" = usually co-occurs but not required

### 3.2 Dependency Diagram

```
                    +---------------+
                    |   PRIMARY     |
                    |   CONTENT     |
                    +-------+-------+
                            |
        +-------------------+-------------------+
        |                   |                   |
    +---+---+           +---+---+           +---+---+
    |Declarative|       |Procedural|       | Causal |
    |    (D)   |       |   (P)   |       |   (C) |
    +---------+           +---------+           +---------+
        |                   |                   |
        |                   |                   |
        +--------------------+--------------------+
                             |
                    +--------+--------+
                    |  SUPPLEMENTARY   |
                    |    QUALITIES    |
                    +--------+--------+
                             |
                        +----+----+
                        |Contextual| (X)
                        |Evidential| (E)
                        |Normative | (N)
                        +----------+
```

**Key Insight**: Contextual (X) and Evidential (E) are purely supplementary. Normative (N) is primarily primary but often supplementary.

### 3.3 Dependency Relationships

**Pure Dependencies** (Category X requires Category Y):

| Dependency | Direction | Evidence |
|-----------|-----------|----------|
| X requires D | X → D | Context must contextualize something (Declarative) |
| X requires P | X → P | Context must contextualize a procedure |
| X requires C | X → C | Context must contextualize a cause |
| E requires D | E → D | Evidence must support a declarative claim |
| E requires C | E → C | Evidence must support a causal claim |
| N requires P | N → P | Norms often imply procedures ("must do X") |

**Partial Dependencies** (Category X often co-occurs with Y but not required):

| Dependency | Evidence |
|-----------|----------|
| P → X | Procedures often have contextual scope |
| N → D | Norms often include declarative statements |
| C → E | Causal claims often have supporting evidence |

### 3.4 Category Classification by Dependency

**Primary Categories** (can exist independently):

| Category | Can Stand Alone | Primary Function |
|----------|----------------|------------------|
| Declarative | Yes | Expresses what is |
| Procedural | Yes (implicit context) | Expresses how to act |
| Causal | Yes | Expresses why things happen |
| Normative | Yes | Expresses what ought to be |

**Supplementary Dimensions** (require primary content):

| Category | Requires Primary | Primary Function |
|----------|----------------|------------------|
| Contextual | Yes | Qualifies scope and applicability |
| Evidential | Yes | Qualifies support and confidence |

### 3.5 Asymmetric Dependency Structure

**Finding**: The dependency structure is asymmetric.

- Contextual and Evidential depend on primary categories
- Primary categories do not depend on Contextual or Evidential
- This means Contextual and Evidential can be added to any knowledge object
- Primary categories have intrinsic semantic value without supplements

**Implication**: This supports a hybrid model where primary categories are core and supplementary categories are optional dimensions.

---

## 4. Research Tier 4 — Composition

### 4.1 Composition Analysis

**Question**: Can one knowledge object naturally contain multiple semantic dimensions?

### 4.2 Engineering Specification Composition

**Object**: Design Rule

**Decomposition**:

```
Design Rule: "Steel beams in bridge structures must have a minimum flange thickness of 10mm when the span exceeds 20 meters."

Components:
1. Declarative: "Steel beams have a minimum flange thickness of 10mm"
2. Contextual: "When the span exceeds 20 meters" (applicability scope)
3. Contextual: "In bridge structures" (domain scope)
4. Normative: "Must have" (obligation)
5. Evidential: Implicit (based on structural engineering calculations)
6. Causal: Implicit (thickness prevents buckling under load)

Result: 1 primary (D) + 2 supplementary (X) + 1 primary (N) + 2 implicit (C, E)
```

**Can it be decomposed into separate objects?**
- Yes, theoretically
- But decomposition loses coherence
- The rule's meaning emerges from the combination

### 4.3 Investigation Report Composition

**Object**: LAB-037 Investigation

**Decomposition**:

```
LAB-037 Investigation Report:

1. Declarative components:
   - "Multiple primitive models exist" (finding)
   - "No universally atomic primitive" (finding)

2. Procedural components:
   - "Validation requires evidence" (methodology)
   - "Follow investigation lifecycle" (process)

3. Causal components:
   - "Because different knowledge types..." (explanation)
   - "Gettier problem shows..." (justification)

4. Contextual components:
   - "For engineering knowledge" (scope)
   - "Within constraints" (KDE-001 context)

5. Evidential components:
   - "Evidence from philosophy..." (support)
   - "Evidence from KR..." (support)

6. Normative components:
   - "Must be validated" (requirement)
   - "Shall include evidence" (standard)
```

**Observation**: The investigation naturally contains all six categories. They are not separable.

### 4.4 Standards Document Composition

**Object**: ISO 9001 Quality Standard

**Decomposition**:

```
ISO 9001 Section 7.1.3:

"Monitoring and measuring resources
The organization shall ensure that provided monitoring and measuring resources are available and used..."

Components:
1. Normative: "The organization shall ensure" (obligation)
2. Declarative: "Monitoring and measuring resources are available" (state)
3. Procedural: "Monitoring and measuring" (action)
4. Contextual: "When applicable" (conditional scope)
5. Evidential: "Records shall be retained" (evidence requirement)
6. Causal: Implicit (resource availability enables quality monitoring)
```

**Observation**: Even short standard clauses contain multiple categories.

### 4.5 Composition Analysis Summary

| Knowledge Object | Can Decompose? | Decomposition Preserves Meaning? |
|-----------------|----------------|--------------------------------|
| Design Rule | Yes (theoretically) | No (loses coherence) |
| Investigation Report | Yes (by section) | Partial (context lost) |
| Standard Clause | Yes (by statement) | No (integrated meaning) |
| Medical Guideline | Yes (by component) | Partial (clinical context lost) |
| Procedure | Yes (by step) | Partial (procedure coherence) |

**Finding**: While decomposition is theoretically possible, it typically loses emergent meaning. The categories are semantically integrated.

---

## 5. Research Tier 5 — Architectural Implications

### 5.1 Model A: Independent Primitive Families

**Description**: Each category is a separate primitive type. Categories cannot mix.

**Properties**:

| Property | Assessment |
|----------|------------|
| Expressiveness | Low (cannot express multi-category knowledge) |
| Completeness | Low (real knowledge is multi-dimensional) |
| Extensibility | Medium (add new primitives) |
| Validation | Medium (per-primitive validation) |
| Retrieval | High (category-based indexing) |
| Composition | Low (combining primitives is complex) |

**Evidence Against Model A**:
- Cross-category analysis showed all examples contain multiple categories
- Decomposition loses meaning
- Categories co-occur naturally in all domains

### 5.2 Model B: Pure Semantic Dimensions

**Description**: All categories are dimensions of a single knowledge object. Any object has values on all dimensions.

**Properties**:

| Property | Assessment |
|----------|------------|
| Expressiveness | High (can express any combination) |
| Completeness | High (all dimensions present) |
| Extensibility | Low (dimensions are fixed) |
| Validation | Complex (dimension interactions) |
| Retrieval | Medium (multi-dimensional queries) |
| Composition | High (natural integration) |

**Evidence Against Model B**:
- Conceptual independence analysis showed Contextual and Evidential require primary content
- Declarative can exist without Contextual (e.g., timeless facts)
- Some dimensions are optional, not universal

### 5.3 Model C: Hybrid Model

**Description**:
- Primary categories (D, P, C, N) are core knowledge content
- Supplementary dimensions (X, E) are optional qualifiers
- Primary categories can exist independently
- Supplementary dimensions require primary content

**Properties**:

| Property | Assessment |
|----------|------------|
| Expressiveness | High (can express independent and multi-dimensional) |
| Completeness | High (covers all cases) |
| Extensibility | Medium (can add new primary or supplementary) |
| Validation | Medium (per-category validation, optional dimension validation) |
| Retrieval | High (category indexing + dimensional queries) |
| Composition | High (natural integration) |

**Evidence For Model C**:
- Matches conceptual independence analysis
- Accommodates both independent and multi-category objects
- Preserves emergent meaning under composition
- Reflects actual knowledge usage in all domains

### 5.4 Model Comparison

| Property | Model A (Independent) | Model B (Dimensions) | Model C (Hybrid) |
|----------|---------------------|---------------------|------------------|
| **Expressiveness** | Low | High | High |
| **Completeness** | Low | High | High |
| **Independence** | High | Low | Medium |
| **Extensibility** | Medium | Low | Medium |
| **Validation** | Medium | Complex | Medium |
| **Retrieval** | High | Medium | High |
| **Composition** | Low | High | High |
| **Matches Evidence** | No | Partial | Yes |

### 5.5 Architectural Implication

**Model C (Hybrid) is most defensible because**:

1. **Matches empirical reality**: All examined knowledge objects contain multiple categories
2. **Preserves independence**: Primary categories can exist alone
3. **Explains dependency**: Contextual and Evidential require primary content
4. **Enables composition**: Categories integrate naturally
5. **Supports retrieval**: Can index by primary category and filter by dimensions

---

## 6. Findings and Open Questions

### 6.1 Findings

**Finding 1**: Categories show asymmetric dependencies.

**Evidence**: Contextual (X) and Evidential (E) require primary categories; primary categories do not require X or E.

**Finding 2**: Real-world knowledge objects are inherently multi-dimensional.

**Evidence**: All examined examples (engineering, scientific, legal, medical) contain all six categories.

**Finding 3**: Decomposition loses emergent meaning.

**Evidence**: While categories can theoretically be separated, the combination carries meaning that individual categories lack.

**Finding 4**: Hybrid model best explains the evidence.

**Evidence**: Neither purely independent (A) nor purely dimensional (B) models fully capture knowledge structure.

### 6.2 Relationship to Previous Investigations

| LAB-037 Finding | LAB-039 Interpretation |
|-----------------|----------------------|
| Multiple primitive models exist | Primary categories are the relevant primitives |
| No universal primitive | Primary categories are distinct but complementary |
| Context-dependence | Contextual is supplementary, not primitive |

| LAB-038 Finding | LAB-039 Interpretation |
|-----------------|----------------------|
| Six categories exist | Confirmed with structural analysis |
| Categories not mutually exclusive | Confirmed; multi-dimensional objects are norm |
| KDE artifacts covered | Confirmed; artifacts are inherently multi-dimensional |

### 6.3 Open Questions

| Question | Why It Matters | Evidence Gap |
|----------|----------------|--------------|
| Should Normative be primary or supplementary? | Affects model structure | Could function either way |
| Can primary categories be further unified? | Simpler model possible | Theoretical exploration needed |
| What is the validation implication? | Practical concern | Implementation research needed |
| Are there additional categories? | Completeness concern | Cross-domain validation needed |

---

## 7. Recommendation

### 7.1 Conclusion

**Model C (Hybrid) is most defensible.**

The six categories from LAB-038 are neither purely independent primitive families (Model A) nor purely semantic dimensions (Model B). Instead, they form a hybrid model:

**Primary Categories** (core knowledge content):
- Declarative (D): "That" knowledge
- Procedural (P): "How" knowledge
- Causal (C): "Why" knowledge
- Normative (N): "Ought" knowledge

**Supplementary Dimensions** (optional qualifiers):
- Contextual (X): Scope and applicability
- Evidential (E): Support and confidence

### 7.2 Architectural Implications

The hybrid model implies:

1. **Knowledge objects have a primary category** (their core type)
2. **Knowledge objects may have supplementary dimensions** (optional qualifiers)
3. **Supplementary dimensions require primary content** (cannot exist alone)
4. **Primary categories can exist independently** (can stand alone)
5. **Categories integrate naturally** (decomposition loses meaning)

### 7.3 KDE Applicability

For KDE, this means:

1. **Artifacts have primary classification** (e.g., Claim = Declarative)
2. **Artifacts may have supplementary dimensions** (e.g., Claim + Evidence + Context)
3. **Classification supports retrieval** (index by primary, filter by dimensions)
4. **Multi-dimensional objects are normal** (single-category objects are edge cases)

### 7.4 Model Summary

```
KNOWLEDGE OBJECT
    │
    ├── Primary Category (required, one of):
    │       ├── Declarative
    │       ├── Procedural
    │       ├── Causal
    │       └── Normative
    │
    └── Supplementary Dimensions (optional, multiple):
            ├── Contextual
            └── Evidential
```

---

## 8. Confidence Assessment

### Confidence by Finding

| Finding | Confidence | Rationale |
|---------|-----------|------------|
| Finding 1: Asymmetric dependencies | HIGH | Direct evidence from dependency analysis |
| Finding 2: Multi-dimensional objects | HIGH | Cross-domain evidence all showed this |
| Finding 3: Decomposition loses meaning | MEDIUM-HIGH | Theoretical + empirical support |
| Finding 4: Hybrid model best | MEDIUM-HIGH | Best fit to all evidence |

### Overall Confidence

**MEDIUM-HIGH**

The investigation is grounded in cross-domain evidence and conceptual analysis. However, empirical validation with knowledge classification tasks would strengthen confidence.

### Limitations

1. Analysis is theoretical with empirical support
2. Alternative models exist (could not test all)
3. Implementation implications not explored
4. Normative classification remains ambiguous

---

## 9. Compliance

This investigation follows the Laboratory Rules (SEED-001):

| Rule | Compliance |
|------|------------|
| No Auto-Continuation | ✓ Investigation complete |
| No Self-Approval | ✓ Human review required |
| No Self-Promotion | ✓ Not applicable |
| Distinguish Evidence | ✓ All findings labeled |
| Evidence-Based Changes | ✓ All claims supported |

### LAB-037 and LAB-038 Relationship

| Previous Claim | LAB-039 Assessment |
|---------------|-------------------|
| LAB-037: Multiple primitive models | Confirmed with structural refinement |
| LAB-038: Six categories exist | Confirmed with primary/dimension classification |
| LAB-038: Categories not exclusive | Confirmed and explained |

---

## 10. Deliverables Checklist

- [x] Investigation Report (this document)
- [x] Dependency Analysis (Section 3)
- [x] Composition Examples (Section 4)
- [x] Cross-Domain Validation (Section 2)
- [x] Supporting Evidence (cited throughout)
- [x] Open Questions (Section 6.3)
- [x] Recommendation (Section 7)

---

## 11. References

### KDE Internal References

| Document | Relevance |
|----------|-----------|
| LAB-037 (Knowledge Primitive) | Primitives mapped to primary categories |
| LAB-038 (Knowledge Taxonomy) | Six categories as starting point |
| KDE-001 (What is Knowledge?) | Engineering knowledge definition |
| KDE-002 (What is Evidence?) | Evidential category support |

### External References

| Source | Relevance |
|--------|----------|
| Ryle, G. (1949) | Declarative/procedural distinction |
| Polanyi, M. (1966) | Tacit knowledge |
| Ranganathan (1933) | Faceted classification |
| Anderson, J. (1980) | Declarative/procedural memory |

---

**Document Status**: COMPLETE
**Confidence**: MEDIUM-HIGH
**Conclusion**: Hybrid model (Model C) is most defensible

---

*Investigation complete. Awaiting human review.*
