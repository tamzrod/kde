# Question: What is Ambiguity?

**Session**: RS-003
**Question**: What is Ambiguity?
**Stage**: COMPLETE
**State**: PROMOTED
**Methodology Version**: v1.0
**Promoted**: 2026-07-19

## Status

Question                  ✅
Literature Review         ✅
Evidence Collection       ✅
Analysis                 ✅
Synthesis                ✅
Working Definition        ✅
Validation               ✅
Knowledge Promotion      ✅

Dependencies: None (Tier 1: Foundational)
Last Updated: 2026-07-19

---

# Literature Review: What is Ambiguity?

## 1. Philosophy

### Definition
In philosophy, ambiguity relates to **indeterminacy of meaning**. A statement is ambiguous when it can reasonably be interpreted in multiple ways. Philosophy distinguishes ambiguity from vagueness and unclarity:
- **Semantic ambiguity**: A term has multiple meanings
- **Syntactic ambiguity**: Structure allows multiple parses
- **Pragmatic ambiguity**: Speech act has multiple possible intentions

### Key Concepts
- **Meaning**: What a term or statement conveys
- **Interpretation**: The act of assigning meaning
- **Indeterminacy**: When meaning cannot be uniquely determined
- **Plurality of meaning**: Multiple legitimate interpretations
- **Context-sensitivity**: Meaning depends on context

### Assumptions
- Meaning is in some sense determinate (otherwise communication would be impossible)
- Ambiguity can be identified and analyzed
- Some interpretations are better than others
- Language can be made more precise

### Strengths
- Rigorous analysis of linguistic indeterminacy
- Distinguishes ambiguity from related phenomena
- Connects to broader questions about meaning and reference

### Limitations
- Focuses primarily on linguistic ambiguity
- May underemphasize conceptual ambiguity beyond language
- Often assumes ambiguity is a problem to be resolved

### Relevance to Engineering
- Philosophical ambiguity analysis helps identify unclear requirements
- Distinguishing ambiguity types aids in resolution strategies
- Understanding indeterminacy is foundational for precise engineering

---

## 2. Epistemology

### Definition
In epistemology, ambiguity relates to **knowledge uncertainty**. Ambiguity arises when evidence or reasoning does not uniquely determine a conclusion:
- **Evidential ambiguity**: Evidence supports multiple conclusions
- **Reasoning ambiguity**: Multiple valid inference paths lead to different conclusions
- **Underdetermination**: Data underdetermines theory (Quine)

### Key Concepts
- **Underdetermination**: Evidence never uniquely determines theory
- **Confirmational holism**: Theories tested as wholes, not individually
- **Equivalence**: Multiple theories equally supported by evidence
- **Revision**: Beliefs may need revision without definitive evidence

### Assumptions
- Some beliefs are better supported than others
- Rational belief requires weighing evidence appropriately
- Ambiguity in evidence is a genuine epistemic challenge
- Reasoning under ambiguity is possible and sometimes rational

### Strengths
- Connects ambiguity to fundamental epistemological questions
- Addresses how we reason under uncertainty
- Provides frameworks for belief revision

### Limitations
- Often abstract and technical
- May not address practical ambiguity resolution
- Can be overly focused on scientific contexts

### Relevance to Engineering
- Underdetermination affects engineering decision-making
- Engineering often proceeds with multiple equally-valid approaches
- Belief revision frameworks apply to engineering knowledge updates

---

## 3. Science

### Definition
In science, ambiguity appears as **theory underdetermination** and **measurement uncertainty**:
- **Theoretical ambiguity**: Multiple theories fit available data
- **Measurement ambiguity**: Instruments have finite precision
- **Operational ambiguity**: Concepts defined by measurement procedures
- **Statistical ambiguity**: Results may arise from multiple causes

### Key Concepts
- **Operationalization**: Defining concepts through measurement
- **Measurement error**: Difference between true and observed values
- **Confidence intervals**: Range of plausible values
- **Model uncertainty**: Unknown model form may be correct
- **Systematic vs. random error**: Different uncertainty sources

### Assumptions
- Uncertainty can be quantified and managed
- Ambiguity can be reduced through more data
- Measurement precision has practical limits
- Statistical methods handle some ambiguity

### Strengths
- Quantitative frameworks for uncertainty
- Clear distinction between random and systematic effects
- Tools for decision-making under uncertainty

### Limitations
- Not all ambiguity is quantifiable
- Overconfidence in statistical results
- May create false precision
- Some sources of ambiguity resist measurement

### Relevance to Engineering
- Measurement and testing deal with scientific ambiguity
- Statistical methods manage experimental uncertainty
- Understanding uncertainty sources informs design

---

## 4. Engineering

### Definition
Engineering treats ambiguity as a **practical challenge to be managed** rather than eliminated:
- **Requirements ambiguity**: Specifications admit multiple interpretations
- **Design ambiguity**: Multiple valid solutions to problems
- **Implementation ambiguity**: Code/specifications allow multiple behaviors
- **Stakeholder ambiguity**: Different stakeholders interpret needs differently

### Key Concepts
- **Requirements engineering**: Techniques for clarifying specifications
- **Design margins**: Allowing for interpretation variation
- **Tolerance analysis**: Accepting variation within bounds
- **Prototyping**: Resolving ambiguity through iteration
- **Standards**: Codifying unambiguous practices

### Assumptions
- Ambiguity in requirements leads to problems
- Ambiguity can be reduced through process
- Some ambiguity is acceptable within tolerances
- Communication can resolve many ambiguities

### Strengths
- Practical, action-oriented approach
- Well-developed requirements engineering practices
- Tolerance and margin concepts handle acceptable variation
- Iteration as ambiguity resolution

### Limitations
- Not all ambiguity can be economically eliminated
- Over-specification can limit flexibility
- Some design ambiguity is irreducible (creative choices)
- Process can add cost without resolving ambiguity

### Relevance to Engineering
- This IS the domain — engineering's treatment of ambiguity is central
- Requirements, design, and implementation ambiguity are daily challenges
- Tolerance and margin concepts directly applicable to KDE

---

## 5. Linguistics

### Definition
Linguistics studies ambiguity as a **systematic property of natural language**:
- **Lexical ambiguity**: Words have multiple meanings (bank)
- **Syntactic ambiguity**: Structures allow multiple parses (flying planes)
- **Semantic ambiguity**: Meanings indeterminate (time flies)
- **Pragmatic ambiguity**: Intentions unclear (that's interesting)

### Key Concepts
- **Polysemy**: Single word, multiple related meanings
- **Homonymy**: Single word, unrelated meanings
- **Attachment ambiguity**: Phrase attachment unclear
- **Scope ambiguity**: Logical scope unclear
- **Disambiguation**: Context or cues resolve ambiguity

### Assumptions
- Ambiguity is inherent in natural language
- Speakers and listeners handle ambiguity routinely
- Context provides cues for disambiguation
- Ambiguity is not merely noise but has communicative functions

### Strengths
- Systematic typology of ambiguity forms
- Cognitive mechanisms for disambiguation
- Recognition that ambiguity serves purposes

### Limitations
- Focuses on linguistic rather than conceptual ambiguity
- Laboratory language may not reflect real-world ambiguity
- May underemphasize ambiguity in technical discourse

### Relevance to Engineering
- Requirements are linguistic artifacts — ambiguity types apply
- Communication between engineers involves disambiguation
- Technical language attempts to reduce ambiguity

---

## 6. Mathematics and Logic

### Definition
In formal systems, ambiguity is treated as **indeterminacy that should be eliminated**:
- **Formal ambiguity**: Symbol or expression admits multiple interpretations
- **Interpretations**: Mappings from formal to intended meaning
- **Underspecification**: Formal language allows multiple completions
- **Completeness**: Formal systems cannot determine all truths

### Key Concepts
- **Syntax vs. semantics**: Form vs. meaning
- **Interpretation**: Assigning meanings to symbols
- **Underspecification**: Deliberately incomplete formalization
- **Incompleteness**: Some truths cannot be proven (Gödel)
- **Independence**: Some statements undecidable within system

### Assumptions
- Formal language should be unambiguous
- Ambiguity in mathematics is error, not feature
- Formal systems have precise meanings
- Some indeterminacy is unavoidable (incompleteness)

### Strengths
- Ideal of precision
- Clear analysis of what can and cannot be determined
- Tools for reducing ambiguity (formalization)

### Limitations
- Not all concepts admit formalization
- Formalization costs effort and may lose meaning
- Incompleteness shows limits of formal approaches
- Real-world problems resist complete formalization

### Relevance to Engineering
- Software specifications aim for mathematical precision
- Formal methods attempt to eliminate ambiguity
- Incompleteness has implications for verification

---

## 7. Artificial Intelligence

### Definition
AI addresses ambiguity through **disambiguation and uncertainty quantification**:
- **Word sense disambiguation**: Selecting correct word meaning
- **Coreference resolution**: Determining what pronouns refer to
- **Uncertainty quantification**: Assigning probabilities to outcomes
- **Fuzzy logic**: Handling degree-based truth
- **Commonsense reasoning**: Resolving implicit assumptions

### Key Concepts
- **NLP disambiguation**: Using context to resolve ambiguity
- **Probabilistic models**: Representing uncertainty
- **Fuzzy sets**: Gradual membership rather than binary
- **Default reasoning**: Assuming typical interpretations
- **Commonsense knowledge**: Background for disambiguation

### Assumptions
- Ambiguity can be computationally resolved
- Context provides sufficient information for disambiguation
- Statistical patterns capture ambiguity patterns
- Some residual ambiguity is acceptable

### Strengths
- Practical tools for handling linguistic ambiguity
- Probabilistic frameworks for uncertainty
- Machine learning approaches scale to real text

### Limitations
- Ambiguity resolution is never perfect
- Some ambiguity is intentional (humor, poetry)
- Commonsense reasoning remains difficult
- May remove valuable ambiguity (multiple interpretations)

### Relevance to Engineering
- AI tools for requirements analysis
- Natural language interfaces face ambiguity challenges
- Uncertainty quantification in AI systems

---

## 8. Decision Theory

### Definition
Decision theory treats ambiguity as a form of **uncertainty requiring choice under incomplete information**:
- **Knightian uncertainty**: Unmeasurable uncertainty (vs. risk)
- **Ambiguity aversion**: Preference for known over unknown probabilities
- **Robust decision-making**: Decisions that perform well across uncertainties
- **Sensitivity analysis**: Testing decisions under different assumptions

### Key Concepts
- **Risk**: Uncertainty with known probabilities
- **Ambiguity**: Uncertainty with unknown probabilities
- **Maximin**: Choose action with best worst-case outcome
- **Regret minimization**: Choose action minimizing maximum regret
- **Info-gathering**: Reduce ambiguity before deciding

### Assumptions
- Decisions must be made despite ambiguity
- Some choices are better than others under ambiguity
- Ambiguity can be reduced through information gathering
- Rational decision-making is possible under uncertainty

### Strengths
- Clear frameworks for decision under ambiguity
- Recognition that not all uncertainty is quantifiable
- Tools for robust decision-making

### Limitations
- Frameworks don't eliminate ambiguity
- Ambiguity aversion may be irrational
- Perfect robustness may be impossible
- Decision paralysis under extreme ambiguity

### Relevance to Engineering
- Engineering decisions made under ambiguity
- Robust design philosophy
- Risk vs. ambiguity tradeoff in engineering

---

# Summary Table

| Discipline | Core Definition of Ambiguity |
|------------|------------------------------|
| Philosophy | Indeterminacy of meaning; multiple possible interpretations |
| Epistemology | Knowledge uncertainty; evidence underdetermines conclusion |
| Science | Theory underdetermination; measurement uncertainty |
| Engineering | Practical challenge; requirements and design admit multiple interpretations |
| Linguistics | Systematic property of natural language |
| Mathematics | Indeterminacy that should be formally eliminated |
| AI | Uncertainty to be computationally resolved |
| Decision Theory | Unmeasurable uncertainty; choice under incomplete information |

---

# Comparative Analysis

## Common Characteristics Across All Definitions

1. **Multiple interpretations** — All definitions acknowledge ambiguity involves plurality of possible meanings, interpretations, or outcomes. Ambiguity is not singularity but multiplicity.

2. **Indeterminacy** — Ambiguity involves inability to uniquely determine a single correct interpretation, conclusion, or value. Something remains open, unresolved, or underspecified.

3. **Choice requirement** — Ambiguity requires someone to choose or decide among alternatives. Pure ambiguity without decision would be inert. Ambiguity creates action pressure.

4. **Context-dependence** — What counts as ambiguous depends on context, standards, and purpose. Same expression may be unambiguous in one context, ambiguous in another.

5. **Gradation** — Ambiguity is not binary (present/absent) but scalar. Some things are more ambiguous than others. Ambiguity admits degrees.

## Unique Characteristics by Discipline

| Characteristic | Disciplines | Implication |
|----------------|-------------|-------------|
| Truth-values | Logic, Philosophy | Ambiguity may affect truth |
| Probability | Decision Theory, AI, Science | Ambiguity as probability distribution |
| Meaning | Linguistics, Philosophy | Ambiguity in language and concepts |
| Action | Engineering, Decision Theory | Ambiguity blocks or complicates action |
| Resolution | AI, Engineering | Ambiguity can be resolved through effort |

## Conflicting Assumptions

1. **Problem vs. Feature**
   - Philosophy, Mathematics, Logic: Ambiguity is a problem to be eliminated
   - Linguistics, Some Engineering: Ambiguity is a feature that serves purposes
   - This conflicts on whether ambiguity should be eliminated or embraced

2. **Eliminability**
   - Mathematics, Formal Methods: All ambiguity can in principle be eliminated through precision
   - Philosophy, Decision Theory: Some ambiguity is irreducible
   - This conflicts on whether complete disambiguation is possible

3. **Measurability**
   - Science, AI: Ambiguity can be quantified (probability, confidence intervals)
   - Decision Theory: Knightian uncertainty resists quantification
   - This conflicts on whether ambiguity is tractable

4. **Resolution Cost**
   - Engineering: Ambiguity resolution has costs; tradeoffs exist
   - Mathematics: Precision should be pursued regardless of cost
   - This conflicts on how much disambiguation is economically justified

## Fundamental Concepts Across Disciplines

1. **Multiplicity** — Ambiguity involves multiple possibilities; one thing, multiple meanings
2. **Indeterminacy** — Cannot uniquely determine correct interpretation
3. **Interpretation** — Someone must assign meaning; ambiguity is not self-resolving
4. **Action implication** — Ambiguity affects what actions are appropriate
5. **Gradation** — Ambiguity admits degrees, not binary presence/absence

## Semantic vs. Substantive Disagreements

**Likely Semantic**:
- "Ambiguity" vs. "vagueness" vs. "unclarity" — may describe related but distinct phenomena
- "Interpretation" vs. "meaning" vs. "sense" — may be theoretical variants
- "Resolution" vs. "elimination" vs. "disambiguation" — may be process variants

**Likely Substantive**:
- Whether ambiguity is eliminable (mathematics vs. philosophy)
- Whether ambiguity is quantifiable (probability vs. Knightian uncertainty)
- Whether ambiguity is problem or feature (formal vs. linguistic traditions)

---

# Synthesis

## What KDE Should Adopt

1. **Ambiguity as action blocker**
   - Engineering knowledge that is ambiguous blocks effective action
   - KDE should identify and address ambiguity that prevents knowledge use
   - Some ambiguity is acceptable; blocking ambiguity requires resolution

2. **Multi-level ambiguity concept**
   - Ambiguity appears at linguistic, conceptual, and practical levels
   - Requirements ambiguity (linguistic) differs from design ambiguity (conceptual)
   - KDE should recognize ambiguity types and appropriate responses

3. **Ambiguity tolerance as design principle**
   - Not all ambiguity needs resolution
   - Some ambiguity enables flexibility and creativity
   - KDE should distinguish blocking ambiguity from productive ambiguity

4. **Gradation of ambiguity**
   - Ambiguity is not binary; it admits degrees
   - Different ambiguity levels require different responses
   - KDE should enable assessment of ambiguity severity

5. **Resolution through iteration**
   - Ambiguity often resolves through action and feedback
   - Prototyping and testing reveal and resolve ambiguity
   - KDE should support iterative ambiguity resolution

## What KDE Should Reject

1. **Complete ambiguity elimination**
   - Total disambiguation is impossible and unnecessary
   - Reject the notion that all ambiguity must be resolved
   - Focus on blocking ambiguity, not all ambiguity

2. **Ambiguity as error**
   - Some ambiguity is legitimate and useful
   - Reject treating all ambiguity as failure
   - Design for appropriate ambiguity levels

3. **Quantification as default**
   - Not all ambiguity admits probability quantification
   - Reject forcing quantification where inappropriate
   - Use qualitative frameworks for Knightian uncertainty

4. **Linguistic reductionism**
   - Ambiguity is not merely linguistic
   - Conceptual and practical ambiguity exist beyond language
   - KDE should address non-linguistic ambiguity

## What KDE Should Leave Unresolved

1. **Whether ambiguity is eliminable in principle**
   - Whether complete disambiguation is theoretically possible
   - KDE can operate with practical ambiguity resolution

2. **Optimal ambiguity levels**
   - How much ambiguity is "right" for different contexts
   - This may be domain and task-dependent

3. **Ambiguity's relationship to truth**
   - Whether ambiguous statements have truth values
   - Engineering practice may not require this resolution

## Essential Concepts for Engineering

1. **Blocking vs. productive ambiguity** — Some ambiguity enables; some blocks
2. **Ambiguity tolerance** — Systems and people can handle ambiguity levels
3. **Resolution through iteration** — Action reveals and resolves ambiguity
4. **Multi-level analysis** — Linguistic, conceptual, practical ambiguity differ
5. **Gradation** — Ambiguity severity affects appropriate response

## Concepts Outside KDE Scope

1. **Philosophical ambiguity of language** — Deep linguistic philosophy questions
2. **Complete formalization** — Mathematical ideal beyond engineering needs
3. **Truth-value gaps** — Semantic puzzles about ambiguous statements

---

# Candidate Working Definition

## WORKING DEFINITION (Not Validated)

Based on the evidence and synthesis, the following is a single candidate working definition for KDE:

> **Engineering ambiguity is multiplicity of interpretation that blocks or complicates knowledge use.**

## Rationale

This definition emerges from the synthesis:

- **"Multiplicity of interpretation"** — Ambiguity involves multiple possible meanings or conclusions
- **"Blocks or complicates"** — Only blocking ambiguity requires action; some ambiguity is productive
- **"Knowledge use"** — Focus is on how ambiguity affects engineering knowledge application

## What This Definition Excludes

- Multiplicity that does not affect knowledge use
- Productive ambiguity that enables rather than blocks
- Ambiguity that can be tolerated within margins

## What This Definition Accommodates

- Requirements ambiguity (linguistic, blocking)
- Design ambiguity (conceptual, often productive)
- Implementation ambiguity (practical, resolution through iteration)
- Varying ambiguity severity

## Not a Final Definition

This is a **WORKING definition** that will be validated through KDE methodology before potential promotion to `/knowledge/`.

---

# Validation Plan

Before KDE accepts this working definition, it will be validated against the following criteria:

## 1. Classification Test
Can the definition classify engineering ambiguity?
- Does the definition clearly distinguish ambiguous from unambiguous knowledge?
- Can engineers use this to identify blocking ambiguity?

## 2. Action Test
Does the definition guide action?
- Does it distinguish ambiguity requiring resolution from productive ambiguity?
- Does it suggest appropriate responses to different ambiguity types?

## 3. Relationship Test
How does ambiguity relate to knowledge and evidence?
- Does ambiguity affect knowledge use as defined in Q1?
- Does evidence help resolve ambiguity as defined in Q2?

## 4. Consistency Test
Does the definition remain consistent?
- Does it complement Q1's knowledge definition?
- Does it complement Q2's evidence definition?

## 5. Counterexample Test
Can the definition survive counterexamples?
- Are there cases where blocking ambiguity is acceptable?
- Are there cases where productive ambiguity should be eliminated?

## Validation Execution

### Test 1: Classification Test
**Question**: Can the definition classify engineering ambiguity?

**Test**: Apply definition to engineering ambiguity examples.

| Example | Classification | Result |
|---------|---------------|--------|
| "The system shall respond quickly" (undefined "quickly") | Multiple interpretations; blocks knowledge use | ✅ Ambiguity |
| "Use standard industry practices" | Context-dependent; may or may not block | ⚠️ Edge case |
| Precise spec: "Response time < 100ms" | Single interpretation | ✅ Not ambiguity |
| Design option A vs. B equally valid | Multiplicity but enables creativity | ⚠️ Productive ambiguity |
| "User-friendly interface" (undefined) | Multiple interpretations; blocks implementation | ✅ Ambiguity |

**Result**: PASS — The definition successfully classifies blocking ambiguity while recognizing productive ambiguity.

---

### Test 2: Action Test
**Question**: Does the definition guide action?

| Ambiguity Type | Requires Action? | Evidence |
|---------------|-----------------|----------|
| Blocking ambiguity | Yes | Definition: "blocks or complicates" |
| Productive ambiguity | No | Definition excludes non-blocking multiplicity |
| Tolerable ambiguity | No | Definition focuses on knowledge use impact |

**Result**: PASS — The definition distinguishes ambiguity types and suggests appropriate responses.

---

### Test 3: Relationship Test
**Question**: How does ambiguity relate to knowledge and evidence?

| Check | Result | Analysis |
|-------|--------|----------|
| Ambiguity blocks knowledge use | ✅ Yes | Explicit in definition |
| Knowledge enables action | ✅ Yes | From KDE-001 |
| Evidence enables evaluation | ✅ Yes | From KDE-002 |
| Ambiguity blocks evaluation | ✅ Yes | Consistent with blocking knowledge use |

**Result**: PASS — Ambiguity is complementary to knowledge and evidence concepts.

---

### Test 4: Consistency Test
**Question**: Does the definition remain consistent with other Tier 1 definitions?

| Cross-reference | Consistent? | Analysis |
|----------------|-------------|----------|
| Knowledge Definition (RS-001) | ✅ Yes | Ambiguity blocks action; knowledge enables action |
| Evidence Definition (RS-002) | ✅ Yes | Ambiguity complicates evaluation; evidence enables it |

**Result**: PASS — Definition is consistent with and complementary to other Tier 1 definitions.

---

### Test 5: Counterexample Test
**Question**: Can the definition survive counterexamples?

| Counterexample | Handling | Result |
|----------------|----------|--------|
| "Creative design options" | Enables flexibility; not blocking | ✅ Correctly excluded |
| Overly strict spec (no interpretation room) | No multiplicity; not ambiguous | ✅ Correctly excluded |
| Unknown requirements | Blocks knowledge use; ambiguous | ✅ Correctly included |
| Established best practice | Single interpretation; not ambiguous | ✅ Correctly excluded |

**Result**: PASS — Edge cases handled appropriately. No fundamental counterexamples found.

---

## Validation Summary

| Test | Result |
|------|--------|
| Classification Test | ✅ PASS |
| Action Test | ✅ PASS |
| Relationship Test | ✅ PASS |
| Consistency Test | ✅ PASS |
| Counterexample Test | ✅ PASS |

**Overall Validation**: ✅ PASSED

All five validation tests passed. The working definition satisfies KDE standards.

---

## Validation Status

**VALIDATED** — All validation tests passed. Ready for Knowledge Promotion.

---

# Knowledge Promotion

## Status

**PROMOTED** ✅

## Promotion Details

- **Promoted to**: `/knowledge/003-what-is-ambiguity.md`
- **Promoted on**: 2026-07-19
- **Validated**: All 5 methodology tests passed
- **Approved by**: Human reviewer

## Validation Note

This definition was validated through **methodology review**, not empirical application. Empirical validation will be reserved for future engineering application and operational experience.

## Research Record

This research session is complete. The validated definition is now in `/knowledge/`.

---

## Current Understanding

Ambiguity is the presence of multiple interpretations that blocks or complicates knowledge use. Across eight disciplines:

- **Multiplicity**: Ambiguity involves multiple possible meanings or conclusions
- **Indeterminacy**: Cannot uniquely determine correct interpretation
- **Action implication**: Ambiguity affects what actions are appropriate
- **Gradation**: Ambiguity admits degrees, not binary presence/absence
- **Context-dependence**: What counts as ambiguous depends on context

Key insight: Not all ambiguity requires resolution. Some ambiguity enables flexibility and creativity. KDE should focus on blocking ambiguity that prevents knowledge use.

## Evidence
(Extensive disciplinary analysis above with cited frameworks)

## Counter Evidence
- Some ambiguity is productive and should be preserved
- Quantification of ambiguity is not always appropriate
- Complete disambiguation may be impossible and unnecessary

## Open Questions
1. How should KDE distinguish blocking from productive ambiguity?
2. What ambiguity resolution methods work in different contexts?
3. How does ambiguity tolerance vary across engineers and systems?
4. When should KDE accept ambiguity rather than resolve it?

## References
- Quine, W.V.O. (1960). *Word and Object*
- Gödel, K. (1931). "On Formally Undecidable Propositions"
- Dummett, M. (1975). *The Logical Basis of Metaphysics*
- Knight, F.H. (1921). *Risk, Uncertainty and Profit*
- Lakoff, G. (1987). *Women, Fire, and Dangerous Things*
