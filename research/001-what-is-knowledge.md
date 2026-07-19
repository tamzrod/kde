# Question: What is Knowledge?

## Question
What is Knowledge?

## Status
- Stage: 🟡 In Progress
- Dependencies: None (Tier 1: Foundational)
- Last Updated: 2026-07-19

---

# Discipline Analysis: What is Knowledge?

## 1. Philosophy

### Definition
Knowledge in philosophy has historically been defined as **justified true belief (JTB)** — the tripartite theory originating from Plato's *Meno* and *Theaetetus*. A person knows something if they: (1) believe it, (2) it is true, and (3) they have justification for believing it.

### Key Concepts
- **Justification**: The warrant or evidence that supports a belief
- **Truth**: The correspondence of belief to reality
- **Belief**: The psychological state of accepting something as true
- **Gettier problems**: Edmund Gettier demonstrated in 1963 that JTB is insufficient; justified true beliefs can still fail to constitute knowledge

### Assumptions
- Knowledge requires a mind or cognitive agent
- Truth is objective and discoverable
- Justification is transmissible from evidence to belief

### Strengths
- Provides a clear tripartite structure
- Intuitive and aligns with common sense understanding
- Has dominated Western philosophical thought for centuries

### Limitations
- The Gettier problem shows JTB is neither necessary nor sufficient
- No consensus on what constitutes "justification" (internalism vs. externalism debate)
- Does not account for practical knowledge or know-how

### Relevance to Engineering
- Philosophy provides the foundational framework for thinking about knowledge
- The JTB structure offers a starting point for engineering knowledge systems
- The Gettier problem shows engineering knowledge systems need to go beyond simple truth-checking

---

## 2. Epistemology

### Definition
Epistemology is the branch of philosophy concerned with the theory of knowledge. It studies the nature, sources, limits, and validity of knowledge. Beyond JTB, contemporary epistemology explores:
- **Naturalized epistemology**: Knowledge studied through empirical methods
- **Social epistemology**: Knowledge in social contexts
- **Feminist epistemology**: How gender affects knowledge production

### Key Concepts
- **A priori knowledge**: Knowledge independent of experience (e.g., mathematics)
- **A posteriori knowledge**: Knowledge derived from experience (e.g., empirical facts)
- **Propositional knowledge**: Knowing that something is true
- **Know-how**: Knowing how to do something (procedural knowledge)
- **Acquaintance**: Direct awareness of something without inference

### Assumptions
- Knowledge is distinguishable from mere belief, opinion, or guesswork
- There are different types of knowledge with different characteristics
- Epistemic justification can be analyzed

### Strengths
- Rigorous analytical methods
- Long historical tradition with deep insights
- Addresses fundamental questions about certainty and doubt

### Limitations
- Often disconnected from practical applications
- Analytical tradition can be overly technical
- Social and contextual dimensions sometimes underemphasized

### Relevance to Engineering
- Distinction between propositional knowledge and know-how mirrors declarative vs. procedural knowledge in software
- Social epistemology relevant for collaborative engineering
- Questions of expertise and authority in engineering contexts

---

## 3. Science

### Definition
Scientific knowledge is knowledge obtained through the **scientific method**: systematic observation, experimentation, and formulation of hypotheses that can be tested and potentially falsified. Science prioritizes:
- **Empirical evidence**: Based on observation and experiment
- **Falsifiability**: Claims must be testable and potentially disprovable (Karl Popper)
- **Reproducibility**: Results should be replicable by other researchers
- **Peer review**: Claims are evaluated by expert communities

### Key Concepts
- **Hypothesis**: A testable explanation
- **Theory**: A well-substantiated explanation supported by extensive evidence
- **Law**: A descriptive generalization about how phenomena behave
- **Falsification**: The process of showing a hypothesis to be false
- **Paradigm**: A framework of scientific thought (Thomas Kuhn)

### Assumptions
- The natural world operates according to discoverable laws
- Human senses and instruments can reliably detect reality
- Objective truth about the natural world exists
- Knowledge should be publicly verifiable

### Strengths
- Highly successful at predicting and explaining natural phenomena
- Self-correcting mechanism through peer review and replication
- Produces reliable, actionable knowledge about the physical world

### Limitations
- Limited to what can be empirically tested
- Scientific theories are provisional, not absolute truths
- Cannot address values, ethics, or aesthetic judgments
- Observer effects can influence measurements

### Relevance to Engineering
- Scientific method provides model for evidence-based engineering decisions
- Falsifiability principle suggests engineering knowledge should be testable
- Reproducibility concerns apply to engineering experiments and prototypes

---

## 4. Engineering

### Definition
Engineering does not have a single unified definition of knowledge. Engineering knowledge is characteristically **applied and pragmatic** — knowledge that enables the design and creation of artifacts. Key perspectives:
- **Knowing-in-action**: Knowledge manifested through skilled performance (Schön)
- **Design knowledge**: Knowledge about creating solutions to problems
- **Technical knowledge**: Specialized knowledge within engineering disciplines
- **Engineering judgment**: The ability to make good decisions under uncertainty

### Key Concepts
- **Constraints**: Engineering operates within given constraints (budget, time, materials, regulations)
- **Trade-offs**: Solutions involve balancing competing objectives
- **Abstraction**: The ability to model complex systems in simpler terms
- **Iteration**: Engineering involves cycles of design-test-revise
- **Robustness**: Knowledge must work across varying conditions

### Assumptions
- The purpose of knowledge is to enable effective action
- Uncertainty is inherent and must be managed, not eliminated
- Context matters — solutions that work in one situation may not work in another
- Experience and tacit knowledge are legitimate forms of engineering knowledge

### Strengths
- Action-oriented — knowledge is measured by what it enables
- Embraces uncertainty and trade-offs
- Values practical wisdom alongside theoretical understanding
- Accumulated through successful practice

### Limitations
- Often tacit and difficult to articulate
- Domain-specific, resisting generalization
- May overemphasize successful outcomes over understanding why something works
- Practical constraints can lead to satisficing rather than optimizing

### Relevance to Engineering
- This IS the domain — engineering's pragmatic view of knowledge is central to KDE
- The know-how vs. know-that distinction is crucial
- Engineering's tolerance for uncertainty may be essential for KDE methodology

---

## 5. Information Science

### Definition
Information science studies the **collection, organization, storage, retrieval, and dissemination of information**. Knowledge, in this view, is often treated as processed information or information in context:
- **Data**: Raw, unprocessed facts
- **Information**: Data that has been organized and processed
- **Knowledge**: Information that has been contextualized and internalized
- **Wisdom**: The ability to use knowledge effectively

### Key Concepts
- **Information lifecycle**: Creation → processing → storage → retrieval → use
- **Knowledge representation**: How knowledge is structured and encoded
- **Ontologies**: Formal representations of concepts and relationships
- **Knowledge graphs**: Networks of interconnected entities
- **Semantic web**: Making information machine-readable

### Assumptions
- Knowledge can be decomposed into discrete units
- Knowledge can be represented symbolically
- Processing and organization enhance the value of information
- There are optimal ways to structure and retrieve knowledge

### Strengths
- Provides frameworks for organizing and accessing knowledge
- Bridges human knowledge and computational systems
- Practical tools for knowledge management

### Limitations
- May oversimplify knowledge by treating it as purely symbolic
- Often neglects tacit, embodied, and contextual dimensions
- Focus on representation may miss the phenomenology of knowing
- Knowledge-as-commodity metaphor may be reductive

### Relevance to Engineering
- Knowledge representation techniques directly applicable to engineering knowledge bases
- Information architecture provides models for knowledge systems
- The DIKW hierarchy (Data-Information-Knowledge-Wisdom) is a useful analytical tool

---

## 6. Artificial Intelligence

### Definition
AI approaches to knowledge vary by paradigm:
- **Symbolic AI**: Knowledge as manipulable symbols, rules, and logical representations
- **Machine Learning**: Knowledge as learned statistical patterns in data
- **Knowledge Graphs**: Knowledge as networks of entities and relationships
- **Neural Networks**: Knowledge as distributed representations in connection weights

### Key Concepts
- **Knowledge base**: A structured collection of facts and rules
- **Inference engine**: Mechanism for deriving new knowledge from existing knowledge
- **Training data**: Examples from which machine learning systems derive patterns
- **Embedding**: Vector representations of concepts that capture semantic relationships
- **Knowledge distillation**: Transferring knowledge from large models to smaller ones

### Assumptions
- Intelligence (and knowledge) can be computational
- Learning from data can produce useful knowledge
- Knowledge can be encoded in formal languages
- Patterns in data can generalize to new situations

### Strengths
- Successfully applies knowledge to practical problems
- Can discover patterns humans might miss
- Scales with data and computational resources
- Produces actionable, operationalized knowledge

### Limitations
- Often lacks understanding in the human sense
- Brittle — can fail dramatically on out-of-distribution inputs
- Knowledge is often opaque and hard to interpret
- Cannot easily integrate multiple sources of knowledge

### Relevance to Engineering
- Knowledge representation and reasoning techniques applicable to engineering systems
- Machine learning provides tools for deriving knowledge from data
- The challenge of explainability in AI mirrors challenges in engineering knowledge capture

---

## 7. Knowledge Management

### Definition
Knowledge management (KM) is the discipline of systematically managing organizational knowledge. It focuses on:
- **Tacit knowledge**: Knowledge that is difficult to transfer (Polanyi's "we know more than we can tell")
- **Explicit knowledge**: Knowledge that can be codified and communicated
- **Knowledge transfer**: Moving knowledge between people, groups, or systems
- **Knowledge creation**: Generating new organizational knowledge

### Key Concepts
- **SECI model**: Socialization, Externalization, Combination, Internalization (Nonaka & Takeuchi)
- **Communities of practice**: Groups united by shared practice and expertise
- **Best practices**: Knowledge about what works, captured and shared
- **Lessons learned**: Knowledge from experience, documented for future use
- **Chief knowledge officer**: Executive role responsible for KM

### Assumptions
- Organizational knowledge exists and can be managed
- Tacit knowledge can be converted to explicit (to some degree)
- Sharing knowledge benefits the organization
- Knowledge has economic value

### Strengths
- Practical focus on capturing and sharing knowledge
- Addresses social and organizational dimensions of knowledge
- Bridges academic understanding and organizational practice
- Emphasis on knowledge processes (creation, sharing, use)

### Limitations
- Can become bureaucratic — "knowledge management" as box-ticking
- May over-emphasize explicit knowledge at expense of tacit
- Difficult to measure impact of KM activities
- Assumes knowledge can be "managed" like other resources

### Relevance to Engineering
- The tacit/explicit distinction is crucial for engineering knowledge
- SECI model provides framework for engineering knowledge processes
- Engineering teams face exactly these knowledge transfer challenges

---

## 8. Cognitive Science

### Definition
Cognitive science studies the mind and cognition from interdisciplinary perspectives (psychology, neuroscience, linguistics, philosophy of mind, AI, anthropology). Knowledge in cognitive science is viewed as:
- **Mental representations**: Knowledge as structures in the mind/brain
- **Distributed cognition**: Knowledge distributed across individuals, artifacts, and environment
- **Embodied cognition**: Knowledge shaped by and expressed through the body
- **Enactivism**: Knowledge as emerging from dynamic interaction with environment

### Key Concepts
- **Schema**: Mental frameworks for organizing knowledge
- **Working memory**: Active processing of limited information
- **Long-term memory**: Storage of knowledge over time (procedural and declarative)
- **Situated cognition**: Knowledge is always situated in context
- **Extended mind**: Mind can include external tools and artifacts

### Assumptions
- Mind is (at least partially) computational
- Knowledge is realized in the brain (or embodied system)
- Cognition is situated and environment-dependent
- There are mechanisms of learning and memory that can be studied

### Strengths
- Empirical grounding in experimental methods
- Bridges multiple perspectives on knowledge
- Attention to brain mechanisms, not just behavior
- Growing understanding of how knowledge is learned and stored

### Limitations
- Hard problem of consciousness remains unsolved
- Still debating fundamental questions about representation
- Often studied in artificial settings, may not reflect real-world knowledge
- Hard to bridge cognitive and social levels of analysis

### Relevance to Engineering
- Understanding human cognition informs how to design knowledge systems
- Memory models suggest approaches for knowledge retention and retrieval
- Embodied cognition perspective challenges purely symbolic approaches

---

# Summary of Discipline Definitions

| Discipline | Core Definition of Knowledge |
|------------|------------------------------|
| Philosophy | Justified true belief (with acknowledged problems) |
| Epistemology | The nature, sources, and limits of knowledge (multiple forms) |
| Science | Empirically verified, reproducible, falsifiable claims |
| Engineering | Actionable understanding enabling effective practice |
| Information Science | Processed information in context (DIKW hierarchy) |
| AI | Computationally represented and processable information |
| Knowledge Management | Organizational asset that can be created, shared, and managed |
| Cognitive Science | Mental/cerebral structures enabling adaptive behavior |

---

# Analysis

## Common Characteristics Across All Definitions

Every discipline identifies the following characteristics, though they may name them differently:

1. **Referentiality** — All definitions describe knowledge as *about* something. Knowledge is not arbitrary; it points beyond itself to something it represents, corresponds to, or enables action upon. This "aboutness" appears in philosophy (truth), science (correspondence to reality), AI (representation), and cognitive science (intentionality).

2. **Capacity distinction** — All definitions distinguish knowledge from raw input. Knowledge is not the data received, the stimuli experienced, or the information encountered. It involves transformation, processing, or organization of input into something more useful. This is explicit in DIKW hierarchy and implicit in all other accounts.

3. **Functional value** — Despite theoretical emphases, every discipline ultimately connects knowledge to some function: explaining, predicting, acting, performing, solving, deciding. Even pure philosophy values knowledge for its role in living well or understanding existence.

4. **Structural organization** — No discipline treats knowledge as isolated facts. All describe knowledge as having internal structure: relationships, dependencies, networks, schemas, hierarchies, or patterns. Facts in isolation are not knowledge.

5. **Agent-dependence** — Whether framed as belief, mental state, organizational asset, or computational state, knowledge is always * someone's* knowledge or * something's* knowledge. There is no "view from nowhere" knowledge.

## Unique Characteristics by Discipline

Some characteristics appear only in specific traditions:

| Characteristic | Disciplines | Implication |
|----------------|-------------|-------------|
| Truth requirement | Philosophy, Science | Implies epistemic realism |
| Practical success | Engineering, Pragmatism | Implies pragmatic criterion |
| Symbolic encoding | AI, Information Science | Implies computational tractability |
| Tacitness | KM, Polanyi, Embodied cognition | Implies limits of explicit knowledge |
| Social construction | Social epistemology, KM | Implies distributed nature |
| Bodily involvement | Embodied cognition | Implies non-cerebral knowledge |

## Conflicting Assumptions

1. **Realism vs. Constructivism**
   - Philosophy (traditional) and Science assume knowledge corresponds to mind-independent reality
   - Social epistemology and constructivism assume knowledge is shaped by social/contextual factors
   - This conflict concerns whether knowledge is *discovered* or *constructed*

2. **Individual vs. Collective**
   - Traditional epistemology locates knowledge in individual minds
   - KM and social epistemology allow collectives, organizations, and cultures to "know"
   - This conflicts on whether knowledge requires a possessor and what kind of possessor

3. **Symbolic vs. Embodied**
   - AI and Information Science assume knowledge can be symbolically represented
   - Embodied cognition argues much knowledge is pre-reflective and non-symbolic
   - This conflicts on whether all knowledge is potentially explicit

4. **Stable vs. Fluid**
   - Information Science and traditional epistemology treat knowledge as a thing (stored, retrieved)
   - Process philosophy and some KM treat knowing as an activity, not a state
   - This conflicts on whether knowledge is a noun or a verb

## Fundamental Concepts Across Disciplines

Regardless of theoretical orientation, these concepts appear essential:

1. **Representation** — Knowledge represents something beyond itself. Whether called truth, correspondence, mapping, or reference, all accounts require some relationship between knowledge and what it is about.

2. **Transformation** — Knowledge is not raw input. Something happens between experiencing data and having knowledge. Whether called processing, interpretation, internalization, or learning, raw input becomes transformed knowledge.

3. **Structure** — Knowledge has internal organization. Facts are not isolated. Relationships, patterns, and connections constitute understanding. This structure is what allows inference, application, and transfer.

4. **Potentiality** — Knowledge is always about potential: potential action, prediction, explanation, or understanding. Knowledge is not merely historical record but enables future behavior.

5. **Context** — Knowledge is always *in* context. Whether called situation, domain, embodiment, or culture, knowledge is always situated. Context-free knowledge, if it exists, would be trivial or useless.

## Why No Universal Definition Has Emerged

1. **Different purposes, different emphases**
   - Philosophy seeks necessary and sufficient conditions for knowledge claims
   - Science seeks reliable methods for generating predictive claims
   - Engineering seeks effective approaches for achieving outcomes
   - These purposes pull definitions in incompatible directions

2. **The JTB structure created a target, not a solution**
   - Gettier's critique showed JTB is insufficient, but produced no consensus replacement
   - Fifty years of post-Gettier epistemology have not resolved the problem
   - The field may lack sufficient concepts to solve it

3. **"Knowledge" is a natural language word with multiple uses**
   - We say "I know that P" (propositional)
   - We say "I know how to X" (procedural)
   - We say "I know this person" (acquaintance)
   - These may be family-resemblance concepts, not a single phenomenon

4. **Each discipline captures something real, misses something else**
   - A definition adequate for science may be inadequate for engineering
   - A definition adequate for individual cognition may miss social knowledge
   - A definition adequate for explicit knowledge may miss tacit knowledge

5. **The concept is reflexive**
   - Any definition of knowledge is itself knowledge
   - This creates peculiar self-reference problems
   - We are using knowledge to define knowledge

## Semantic vs. Substantive Disagreements

**Likely Semantic** (differences in wording, not essence):
- "Representation" vs. "correspondence" vs. "aboutness" — may describe the same relationship
- "Justification" vs. "validation" vs. "warrant" — may be procedural variants
- "Knowledge" vs. "understanding" — may be the same phenomenon at different granularity

**Likely Substantive** (genuine theoretical disagreement):
- Whether truth is required (JTB insists; pragmatism denies)
- Whether tacit knowledge exists (Polanyi argues yes; symbolic AI implies no)
- Whether collectives can know (KM and social epistemology say yes; traditional epistemology implies no)
- Whether knowledge is a state or a process (implies different methodologies)

## Findings Relevant to Engineering

1. **The know-that/know-how distinction is fundamental**
   - Engineering is primarily know-how domain
   - Propositional definitions (JTB) are insufficient for engineering knowledge
   - Any KDE definition must address procedural and practical knowledge

2. **Tacit knowledge cannot be ignored**
   - Polanyi's "we know more than we can tell" is especially true in engineering
   - Expertise is largely tacit
   - Engineering knowledge systems must account for knowledge that resists explicit capture

3. **Practical success is a legitimate validation criterion**
   - Engineering can legitimately use "works in practice" as evidence
   - This does not replace theoretical understanding but complements it
   - KDE can adopt pragmatic validation alongside other methods

4. **Knowledge is distributed**
   - Engineering knowledge is in individuals, teams, documents, tools, and artifacts
   - No single location captures engineering knowledge
   - KDE systems must enable distributed knowledge access

5. **Constraints shape knowledge requirements**
   - Engineering operates under constraints (budget, time, materials)
   - Knowledge is not merely true but useful *given constraints*
   - KDE should consider knowledge sufficiency rather than completeness

6. **Iteration is a knowledge process**
   - Schön's "reflection-in-action" captures how engineers learn from practice
   - Engineering knowledge is generated through cycles of design-test-revise
   - KDE methodology should incorporate iterative knowledge generation

7. **Multiple representations are needed**
   - Different contexts need different knowledge representations
   - No single formalism captures all engineering knowledge
   - KDE should support multiple representation schemes

---

# Open Questions

1. **The Gettier problem remains unsolved** — Is there a satisfactory solution to the problem of justified true beliefs that are not knowledge?

2. **Tacit knowledge** — How can we understand, capture, and transfer knowledge that cannot be fully articulated?

3. **Knowledge and action** — How exactly does knowledge enable action? Is there a gap between propositional knowledge and know-how?

4. **Individual vs. collective** — Is knowledge fundamentally individual, or can groups, organizations, and systems have knowledge?

5. **Stability vs. fluidity** — Is knowledge relatively stable (stored, retrieved), or is it more like an ongoing process of knowing?

6. **Knowledge and truth** — Must knowledge be true? Are there forms of knowledge that are useful but not "true"?

7. **Knowledge across domains** — Do different domains (science, engineering, art) have fundamentally different kinds of knowledge, or is there a common core?

---

# Candidate Working Definitions (Not Selected)

These are definitions from the literature that could serve as starting points for KDE. No selection has been made.

1. **"Knowledge is justified true belief"** (Plato) — The traditional philosophical definition, despite its problems

2. **"Knowledge is the human appropriation of information"** (DIKW hierarchy) — Information science perspective

3. **"Knowledge is the capacity for effective action"** (Pragmatist) — Engineering-adjacent view

4. **"Knowledge is what enables successful performance"** (Cognitive science) — Behavioral criterion

5. **"Knowledge is organized experience"** (Schön) — Practical knowledge perspective

6. **"Knowledge is the sum of what is known"** (Dictionary) — Common usage placeholder

7. **"Knowledge is justified belief that works"** (Pragmatic synthesis) — Combining JTB with pragmatism

8. **"Knowledge is a network of relationships between concepts"** (Semantic web) — Representational view

---

## Current Understanding

Knowledge is a contested concept with no universal definition. Across eight disciplines, we observe:

- **Structural commonalities**: Knowledge involves representations, structures, or patterns that "stand for" something beyond themselves
- **Functional commonality**: Knowledge enables action, prediction, or effective behavior
- **Distinction from data**: Knowledge is not raw data but data processed, contextualized, and internalized
- **Context-dependence**: Knowledge is always situated in some context (mind, culture, domain)
- **Tacit dimension**: Much valuable knowledge is tacit and resists explicit articulation

No single discipline has definitively solved the question "What is knowledge?" The debate continues.

## Evidence
(Extensive disciplinary analysis above with cited frameworks)

## Counter Evidence
- The lack of consensus suggests knowledge may be a family-resemblance concept without necessary and sufficient conditions
- Different domains may require fundamentally different knowledge concepts
- The word "knowledge" may refer to different phenomena in different contexts

## Open Questions
1. Which definition(s) are most relevant for an engineering context?
2. How do we handle the gap between propositional knowledge and know-how?
3. What does it mean to "validate" knowledge in an engineering context?
4. Can organizational knowledge be treated as a single concept with engineering applications?

## References
- Plato. *Meno* and *Theaetetus*
- Gettier, E. (1963). "Is Justified True Belief Knowledge?" *Analysis*
- Popper, K. (1959). *The Logic of Scientific Discovery*
- Kuhn, T. (1962). *The Structure of Scientific Revolutions*
- Polanyi, M. (1966). *The Tacit Dimension*
- Nonaka, I. & Takeuchi, H. (1995). *The Knowledge-Creating Company*
- Schön, D. (1983). *The Reflective Practitioner*
- Russell, B. (1948). *Human Knowledge: Its Scope and Limits*
- Newell, A. (1982). "Knowledge and Data" in *IEEE Expert*
