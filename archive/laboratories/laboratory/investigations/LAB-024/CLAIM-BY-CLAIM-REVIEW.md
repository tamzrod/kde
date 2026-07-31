# Claim-by-Claim Review: LAB-024

**Investigation**: LAB-024
**Date**: 2026-07-21T10:10:00Z
**Status**: DRAFT

---

## Claim 1: Definition of Knowledge Document

### LAB-022 Position

> A Knowledge Document is a validated, provenance-tracked artifact that records actionable understanding for engineering practice, owned by Governance, and promoted from the Laboratory.

**Evidence**: knowledge/README.md, KDE-ARCH-002

### LAB-023 Position

LAB-023 did not challenge the definition directly. No counterargument presented.

### Evidence Assessment

| Source | Evidence |
|--------|----------|
| knowledge/README.md | "Knowledge is the canonical location for validated concepts" |
| KDE-ARCH-002.md | "Knowledge | Knowledge subsystem | Governance" |

### Verdict

**ACCEPT**

**Reason**: Definition is well-supported by repository evidence. Clear boundaries established.

**Confidence**: HIGH

---

## Claim 2: Knowledge vs Investigation Distinction

### LAB-022 Position

Knowledge and Investigation serve different purposes:
- Investigation: Discover truth
- Knowledge: Record truth
- Ownership transfers at promotion
- Different lifecycles

**Evidence**: KDE-ARCH-003, RULES.md

### LAB-023 Position

LAB-023 did not challenge this distinction. No counterargument presented.

### Evidence Assessment

| Source | Evidence |
|--------|----------|
| KDE-ARCH-003.md | Investigation states vs Knowledge maturity levels defined |
| RULES.md | Laboratory owns experiments; Governance owns knowledge |

### Verdict

**ACCEPT**

**Reason**: Clear distinction supported by multiple documents. Ownership model consistent.

**Confidence**: HIGH

---

## Claim 3: Five Document Classes

### LAB-022 Position

Five document classes are sufficient:
1. Foundational
2. Architecture
3. Domain
4. Governance
5. Argumentation

### LAB-023 Position (Counterexample 5, 6, 7)

- **Counterexample 5**: knowledge-summary documents fit no class
- **Counterexample 6**: SCADA patterns (KDE-ARCH-009) doesn't fit Architecture
- **Counterexample 7**: Tradeoffs (KDE-ARCH-010) doesn't fit Argumentation

### Evidence Assessment

**For LAB-022**:
| Source | Evidence |
|--------|----------|
| knowledge/001-what-is-knowledge.md | Fits Foundational class |
| KDE-ARCH-001.md | Fits Architecture class |
| gis/design-rules.md | Fits Domain class |

**For LAB-023**:
| Source | Evidence |
|--------|----------|
| gis/knowledge-summary.md | Does not fit any class |
| KDE-ARCH-009.md | Domain patterns in ARCH namespace |
| KDE-ARCH-010.md | Tradeoff analysis structure |

### Analysis

LAB-023 correctly identifies that knowledge-summary documents (INV-031 synthesis) don't fit any class. However:

1. **knowledge-summary documents are Laboratory artifacts** that were incorrectly placed in Knowledge
2. **SCADA patterns**: KDE-ARCH-009 contains both KDE architecture AND domain patterns - the naming predates the specification
3. **Tradeoffs**: KDE-ARCH-010 structure is similar to Argumentation but lacks explicit decision documentation

### Verdict

**AMEND**

**Reason**: The five-class model is fundamentally sound but:
1. knowledge-summary documents should be removed from Knowledge (Laboratory artifacts)
2. A 6th "Domain-Architecture" class should be considered for domain-specific patterns
3. Tradeoff Analysis should be documented as variant of Argumentation

**Required Changes**:
- Add guidance that knowledge-summary belongs in Laboratory
- Clarify Architecture class scope
- Document Tradeoff Analysis as Argumentation variant

**Confidence**: MEDIUM-HIGH

---

## Claim 4: Universal Mandatory Metadata

### LAB-022 Position

Universal mandatory metadata:
- id, title, version, status
- category, source-investigation
- evidence-references
- created, last-modified, promoted, approved-by

### LAB-023 Position (Counterexample 2, 3)

- **Counterexample 2**: Valid Until field missing
- **Counterexample 3**: Field naming inconsistency ("Source Investigation" vs "source-investigation")

### Evidence Assessment

**For LAB-022**:
| Source | Evidence |
|--------|----------|
| All KDE-ARCH docs | Have id, title, version, status, created |
| 001-what-is-knowledge.md | Has promoted, approved-by |

**For LAB-023**:
| Source | Evidence |
|--------|----------|
| KDE-ARCH-009.md | Has "Valid Until: 2026-10-20" |
| Existing docs | Use "Source Investigation" (not hyphenated) |

### Analysis

LAB-023 correctly identifies gaps:

1. **Valid Until**: Reasonable for experimental (Level 1) knowledge. LAB-022's specification is incomplete, not incorrect.

2. **Field naming**: LAB-022 standardizes names with hyphens. Existing documents use different conventions. This is a migration issue, not a specification flaw.

### Verdict

**AMEND**

**Reason**: Core metadata is sound but incomplete:

1. Add `valid-until` as **optional** metadata field
2. Document naming convention (hyphenated for machine parsing)
3. Provide migration path for existing documents

**Not Accepted**:
- LAB-023's field naming complaint is about existing documents, not the specification itself

**Confidence**: HIGH

---

## Claim 5: Universal Mandatory Sections

### LAB-022 Position

Mandatory sections:
1. Definition
2. Summary
3. Evidence
4. Provenance

### LAB-023 Position (Counterexample 4, 9)

- **Counterexample 4**: Domain documents use "Overview" not "Definition"
- **Counterexample 9**: Foundational exceeds specification

### Evidence Assessment

**For LAB-022**:
| Source | Evidence |
|--------|----------|
| KDE-ARCH-001.md | Has Definition, Evidence, Provenance |
| Specification | Defines 4 mandatory sections |

**For LAB-023**:
| Source | Evidence |
|--------|----------|
| gis/design-rules.md | Has "Overview" not "Definition" |
| 001-what-is-knowledge.md | Has many sections beyond minimum |

### Analysis

LAB-023 makes valid points:

1. **Domain Definition**: Domain documents define domain scope through "Overview" - this is semantically equivalent. The requirement should allow "Overview" for Domain class OR add a Definition section to domain documents.

2. **Foundational exceeds spec**: This is NOT a problem. Specifications define minimums, not maximums. LAB-023 misidentifies this as a flaw.

### Verdict

**AMEND**

**Reason**: 
1. **Accept** the four mandatory sections concept
2. **Clarify** that "Definition" may be titled "Overview" for Domain class
3. **Reject** the claim that exceeding requirements is a flaw

**Confidence**: HIGH

---

## Claim 6: Provenance Requirements

### LAB-022 Position

Every Knowledge Document SHALL include provenance links to:
- Investigation
- Evidence
- Validator
- Approver
- Promotion Date

### LAB-023 Position (Counterexample 8)

**Counterexample 8**: Domain documents cite external sources (industry standards), not KDE investigations.

### Evidence Assessment

**For LAB-022**:
| Source | Evidence |
|--------|----------|
| KDE-ARCH-005.md | Traceability model with links |
| Specification | Provenance section required |

**For LAB-023**:
| Source | Evidence |
|--------|----------|
| gis/design-rules.md | "*Source: GIS engineering standards*" |
| typography/fundamentals.md | "*Source: Material Design, Nielsen Norman Group*" |

### Analysis

LAB-023 correctly identifies a gap:

Domain knowledge may be derived from external authoritative sources, not KDE investigations. The specification assumes KDE investigations as the sole source of evidence.

However:
1. External sources are valid evidence (KDE-002: "Engineering evidence is retrievable support")
2. The provenance model should accommodate external sources
3. Domain documents DO have provenance (just external, not internal)

### Verdict

**AMEND**

**Reason**: Core provenance concept is sound but needs to:
1. Accept external sources as valid evidence
2. Distinguish internal (KDE investigation) vs external (industry standards) provenance
3. Maintain traceability even for external sources

**Confidence**: HIGH

---

## Claim 7: Lifecycle Model

### LAB-022 Position

Lifecycle states:
- DRAFT → VALIDATED → PROMOTED → DEPRECATED

### LAB-023 Position (Counterexample 1)

**Counterexample 1**: KDE-ARCH-009 and KDE-ARCH-010 use "CANDIDATE" status, which is not in the specification.

### Evidence Assessment

**For LAB-022**:
| Source | Evidence |
|--------|----------|
| KDE-ARCH-003.md | Lifecycle states defined |
| Specification | Four states listed |

**For LAB-023**:
| Source | Evidence |
|--------|----------|
| KDE-ARCH-009.md | Status: CANDIDATE |
| KDE-ARCH-010.md | Status: CANDIDATE |

### Analysis

LAB-023 correctly identifies that "CANDIDATE" is used but not in the specification.

"CANDIDATE" represents an intermediate state between DRAFT and VALIDATED - a document ready for review but not yet validated.

This is a legitimate state that the specification should accommodate.

### Verdict

**AMEND**

**Reason**:
1. Add CANDIDATE as valid intermediate state
2. Full lifecycle: DRAFT → CANDIDATE → VALIDATED → PROMOTED → DEPRECATED

**Confidence**: HIGH

---

## Claim 8: Confidence Model

### LAB-022 Position

Confidence represented through:
- Evidence Quality (LOW/MEDIUM/HIGH)
- Reproducibility (LOW/MEDIUM/HIGH)
- Consistency (LOW/MEDIUM/HIGH)
- Overall assessment

Evidence maturity levels (1-5) from KDE-ARCH-003.

### LAB-023 Position (Counterexample 10)

**Counterexample 10**: Evidence level varies by document but specification doesn't explain how structure should vary by maturity.

### Evidence Assessment

**For LAB-022**:
| Source | Evidence |
|--------|----------|
| KDE-ARCH-003.md | Evidence levels defined (1-5) |
| Specification | Confidence metadata defined |

**For LAB-023**:
| Source | Evidence |
|--------|----------|
| KDE-ARCH-009.md | Evidence Level: Level 1 |
| KDE-ARCH-001.md | Evidence Level: Level 3 |

### Analysis

LAB-023 raises a valid point but it is about guidance, not specification.

The specification correctly records evidence level. Whether structure should vary by level is an implementation question.

**Counterexample 10 does not invalidate the confidence model.**

### Verdict

**ACCEPT**

**Reason**: Confidence model is sound. LAB-023's complaint is about missing guidance, not a flaw in the model itself.

**Confidence**: HIGH

---

## Claim 9: Document Class Requirements

### LAB-022 Position

Each class has specific required sections.

### LAB-023 Position

Classes are ambiguous:
- Architecture class includes domain patterns
- Argumentation class doesn't fit Tradeoffs

### Evidence Assessment

Same as Claim 3 (Five Document Classes).

### Verdict

**AMEND**

See Claim 3 for reasoning. Class requirements are sound with clarifications.

---

## Claim 10: Separation of Knowledge and Laboratory

### LAB-022 Position

Knowledge and Laboratory are separate:
- Knowledge: Permanent, validated artifacts
- Laboratory: Investigation artifacts

### LAB-023 Position (Counterexample 5)

knowledge-summary documents are Laboratory artifacts incorrectly placed in Knowledge.

### Evidence Assessment

**LAB-023 is correct.** knowledge-summary documents contain:
- "*Generated from INV-031 Investigation*"
- Synthesis content from investigations

These belong in Laboratory, not Knowledge.

### Verdict

**ACCEPT** (LAB-022 is correct about the principle)

**Plus Action**: knowledge-summary documents should be moved from Knowledge to Laboratory.

**Confidence**: HIGH

---

## Summary of Verdicts

| Claim | Verdict | Confidence |
|-------|---------|------------|
| 1. Definition | ACCEPT | HIGH |
| 2. Distinction | ACCEPT | HIGH |
| 3. Five Classes | AMEND | MEDIUM-HIGH |
| 4. Mandatory Metadata | AMEND | HIGH |
| 5. Mandatory Sections | AMEND | HIGH |
| 6. Provenance | AMEND | HIGH |
| 7. Lifecycle | AMEND | HIGH |
| 8. Confidence Model | ACCEPT | HIGH |
| 9. Class Requirements | AMEND | MEDIUM-HIGH |
| 10. Separation | ACCEPT | HIGH |

**Accept**: 4 claims
**Amend**: 5 claims
**Reject**: 0 claims
