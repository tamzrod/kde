# Observations: LAB-022 — Knowledge Document Architecture

**Investigation**: LAB-022
**Date**: 2026-07-21T08:05:00Z
**Status**: DRAFT

---

## Observation 1: Purpose of Knowledge vs Investigation

### Evidence
- `knowledge/README.md`: "Knowledge is the canonical location for validated concepts"
- `laboratory/RULES.md`: Laboratory is "where investigations are executed"

### Inference
Knowledge and Investigation serve fundamentally different purposes:
- **Investigation**: Explores and discovers (WHY + HOW)
- **Knowledge**: Records and preserves (WHAT + WHY_VALIDATED)

### Confidence: HIGH

---

## Observation 2: Document Structure Classes

### Evidence

**Class A: Foundational Definitions**
- Files: `001-what-is-knowledge.md`, `002-what-is-evidence.md`, `003-what-is-ambiguity.md`
- Structure: Discipline analysis, validation tests, justification

**Class B: Architecture Specifications**
- Files: `KDE-ARCH-001.md` through `KDE-ARCH-010.md`
- Structure: Definition, core principles, supporting experiments, dependencies, version history

**Class C: Domain Knowledge**
- Files: `gis/*.md`, `typography/*.md`
- Structure: Domain-specific content, code examples, practical guidance

### Inference
Three distinct document classes exist with different purposes:
1. **Foundational**: Philosophy and epistemology grounding
2. **Architecture**: KDE system specifications
3. **Domain**: Engineering practice guidance

### Confidence: HIGH

---

## Observation 3: Metadata Gaps

### Evidence
- KDE-ARCH documents have: ID, version, status, evidence level, created, validated, supporting experiments
- GIS domain documents have: Title, content, (sometimes) source footer
- Foundational documents have: Definition ID, source, stage, state, methodology version, promoted

### Inference
Current metadata is inconsistent and category-dependent. A universal minimum set is not enforced.

### Confidence: HIGH

---

## Observation 4: Provenance Patterns

### Evidence

**Investigation → Knowledge Relationship**
- KDE-ARCH-001 references "Supporting Experiments" (LAB-020, LAB-021, etc.)
- 001-what-is-knowledge.md references "Source: RS-001"
- No systematic bidirectional links exist

**Knowledge → Laboratory Relationship**
- No evidence of knowledge documents linking back to investigations
- No evidence of investigation conclusion documents

### Inference
Provenance is partial: Knowledge references sources but:
1. No bidirectional traceability (Lab → Knowledge exists, Knowledge → Lab is weak)
2. No evidence registry
3. No validation record

### Confidence: MEDIUM

---

## Observation 5: Lifecycle States

### Evidence

**Investigation States** (from KDE-ARCH-003)
- ACTIVE → COMPLETE → PROMOTED

**Knowledge Maturity Levels** (from KDE-ARCH-003)
- Level 1: Experimental (1 run)
- Level 2: Repeatable (10+ runs)
- Level 3: Reproducible (60+ runs)
- Level 4: Generalized (cross-domain)
- Level 5: Established (no contradictions)

**Current Document States Observed**
- "PROMOTED" (foundational)
- "ESTABLISHED" (architecture)
- No state field (domain)

### Inference
Two overlapping lifecycle concepts exist:
1. **State**: Document lifecycle (DRAFT → VALIDATED → PROMOTED → DEPRECATED)
2. **Maturity**: Evidence lifecycle (Experimental → Established)

These are conflated in current documents.

### Confidence: HIGH

---

## Observation 6: Content Types

### Evidence

**Definition Sections** (all documents)
- "Definition" section present in all KDE-ARCH and foundational documents
- Domain documents use "Overview" instead

**Supporting Content**
- Foundational: Discipline analysis, validation tests
- Architecture: Supporting experiments, dependencies, governance
- Domain: Code examples, practical rules

**Missing Content**
- No "Limitations" section in most documents
- No "Trade-offs" section
- No "Usage" guidance in architecture documents
- No "Confidence" in domain documents

### Inference
Content structure varies by class, but common patterns exist that are not consistently applied.

### Confidence: MEDIUM

---

## Observation 7: Knowledge vs Laboratory Ownership

### Evidence

From `KDE-ARCH-002.md`:
```
| Artifact | Owner | Owned By |
|----------|-------|----------|
| Knowledge | Knowledge subsystem | Governance |
| Investigation | Investigation | Investigation subsystem |
```

### Inference
Knowledge ownership transfers from Investigation to Governance at promotion. This boundary is important for understanding document responsibilities.

### Confidence: HIGH

---

## Observation 8: Relationships to KDE Components

### Evidence

**Laboratory**
- Source of investigations and experiments
- Knowledge promotes from Laboratory

**Governance**
- Owns Knowledge (KDE-ARCH-002)
- Sets validation requirements (KDE-ARCH-008)
- Makes promotion decisions

**Seeds**
- Define methodology (SEED-001)
- Structure research process

**Engines**
- Execute investigations
- Generate evidence

### Inference
Knowledge sits at the intersection of:
- Evidence (from Laboratory)
- Authority (from Governance)
- Methodology (from Seeds/Engines)

### Confidence: HIGH

---

## Summary of Observations

| # | Observation | Confidence | Implication |
|---|-------------|------------|-------------|
| 1 | Purpose differs: Investigation vs Knowledge | HIGH | Different document classes needed |
| 2 | Document classes exist: Foundational, Architecture, Domain | HIGH | Template per class or universal with optional sections |
| 3 | Metadata gaps | HIGH | Universal minimum metadata required |
| 4 | Provenance is partial | MEDIUM | Bidirectional traceability needed |
| 5 | Two lifecycle concepts conflated | HIGH | Separate state and maturity |
| 6 | Content patterns vary | MEDIUM | Standard sections per class |
| 7 | Ownership transfers at promotion | HIGH | Clear boundary definitions |
| 8 | Knowledge at component intersection | HIGH | Multiple relationship types |
