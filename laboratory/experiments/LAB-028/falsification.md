# Falsification Attempt

**Date**: 2026-07-21

---

## Purpose

Attempt to falsify the current classification mechanism by finding cases where:
1. Identical criteria produce different outcomes
2. Hidden assumptions exist
3. Terminology influences classification
4. Subjective interpretation affects results

---

## Falsification Test 1: Identical Criteria, Different Outcomes

### Test

Apply the same rule ("applies to multiple domains") to similar concepts.

### Results

| Concept | Applies to Multiple Domains? | Classification |
|---------|------------------------------|---------------|
| Desktop Runtime | Yes (all desktop apps) | Architecture |
| Visualization | Yes (GIS, dashboards, reports) | Domain |

### Conclusion

**FAILED FALSIFICATION** — Same criteria produced different outcomes for concepts with similar scope.

### Evidence of Hidden Assumption

Reviewers implicitly distinguished between:
- Concepts that ARE domains (Visualization)
- Concepts that ENABLE domains (Desktop Runtime)

This distinction is NOT in the documented rules.

---

## Falsification Test 2: Terminology Influence

### Test

Does the NAME of a concept influence classification?

### Results

| Name Pattern | Typical Classification |
|-------------|----------------------|
| Contains "Runtime" | Architecture |
| Contains "System" | Architecture |
| Contains "OS" / "Operating" | Architecture |
| Domain name (GIS, Typography) | Domain |

### Conclusion

**FAILED FALSIFICATION** — Terminology appears to influence classification intuition.

### Evidence

- "Event-Driven **Systems**" → Architecture
- "**Microservices**" → Architecture
- "**GIS**" → Domain
- "**Visualization**" → Domain

The pattern is consistent but suggests the rules rely on terminology recognition rather than explicit criteria.

---

## Falsification Test 3: Infrastructure vs. Application

### Test

Can we distinguish "infrastructure" from "application" consistently?

### Hypothesis

Infrastructure = Architecture
Application = Domain

### Results

| Concept | Is Infrastructure? | Is Application? | Classification |
|---------|--------------------|--------------------|---------------|
| Desktop Runtime | Yes | No | Architecture |
| Operating System | Yes | No | Architecture |
| Visualization | No | Yes | Domain |
| GIS | No | Yes | Domain |
| Database | Yes | Yes | Unclear |
| Networking | Yes | Yes | Unclear |

### Conclusion

**PARTIAL FAILURE** — The distinction works for clear cases but fails for general-purpose technologies.

### Hidden Assumption Revealed

The rules assume a binary distinction (Architecture OR Domain) but some concepts are BOTH infrastructure AND application-specific.

---

## Falsification Test 4: Subjective Interpretation

### Test

Do reviewers interpret "system-wide" the same way?

### Evidence

**Reviewer 1**: "Networking applies to all domains" → Both
**Reviewer 2**: "Networking applies to all domains" → Both
**Reviewer 3**: "Networks are foundational infrastructure" → Architecture

Same evidence, different interpretation.

### Conclusion

**FAILED FALSIFICATION** — Subjective interpretation affects classification for ambiguous cases.

---

## Summary of Falsification Attempts

| Test | Result | Evidence |
|------|--------|----------|
| Identical criteria | ❌ FAILED | Visualization vs Desktop Runtime |
| Terminology influence | ❌ FAILED | Name patterns correlate with classification |
| Infrastructure vs App | ⚠️ PARTIAL | Clear cases work, ambiguous don't |
| Subjective interpretation | ❌ FAILED | Same evidence, different conclusions |

---

## Hidden Assumptions Identified

### Assumption 1: "Architecture = Infrastructure"

**Undocumented rule**: Concepts that provide runtime environments are Architecture.

**Example**: Desktop Runtime, Operating System

### Assumption 2: "Domain = Specialized Technique"

**Undocumented rule**: Concepts with distinct techniques/patterns are Domains.

**Example**: GIS (cartography), Visualization (charts/maps)

### Assumption 3: "General Purpose = Architecture"

**Undocumented rule**: Technologies applicable to many domains are Architecture.

**Example**: Machine Learning, Databases, Networking

**Problem**: This conflicts with Assumption 2 for general-purpose techniques.

### Assumption 4: "Domain = Has Practitioners"

**Undocumented rule**: Fields with dedicated practitioners are Domains.

**Example**: GIS (GIS analysts), Visualization (data viz specialists)

**Problem**: Developers are practitioners for all of these.

---

## The Fundamental Problem

The classification rules are **incomplete**. They define:
- Foundational = Philosophical
- Architecture = System-wide
- Domain = Domain-specific

But they do NOT define:
- What makes something "system-wide" vs "domain-specific"
- How to classify concepts that are both
- The distinction between "infrastructure", "tool", and "technique"

---

## Conclusion

**The classification mechanism CANNOT consistently classify all concepts.**

The falsification tests revealed:
1. Hidden assumptions not in documented rules
2. Terminology influence on classification
3. Subjective interpretation for ambiguous cases
4. No clear distinction for general-purpose technologies

**The mechanism requires revision.**

---

## Confidence

**HIGH** — Falsification tests were systematic and evidence-based.
