# Recommendations: LAB-024

**Investigation**: LAB-024
**Date**: 2026-07-21T10:35:00Z
**Status**: FINAL

---

## Purpose

This document provides specific recommendations for implementing the arbitration verdict.

---

## Immediate Actions

### 1. Update LAB-022 Specification

Amend the Knowledge Document Specification with these changes:

#### A. Lifecycle Model (Claim 7)

**Current**:
```yaml
status: DRAFT|VALIDATED|PROMOTED|DEPRECATED
```

**Amended**:
```yaml
status: DRAFT|CANDIDATE|VALIDATED|PROMOTED|DEPRECATED
```

#### B. Metadata (Claim 4)

**Add to optional metadata**:
```yaml
valid-until: YYYY-MM-DD  # For time-limited knowledge (optional)
```

**Add migration guidance**:
```markdown
## Field Naming Convention

Use hyphenated names for machine parsing:
- `source-investigation` (not "Source Investigation")
- `evidence-references` (not "Evidence References")

Existing documents may use alternative formats during transition.
```

#### C. Provenance (Claim 6)

**Amend provenance section**:
```markdown
## Provenance

Knowledge SHALL maintain traceability to its sources.

### Internal Provenance
- Investigation: INV-XXX
- Evidence: EV-XXX (from KDE investigations)

### External Provenance
- Standard: [Name, Version, URL]
- Source: [Authoritative source name]
- Citation: [Formal citation if applicable]

Both internal and external provenance are valid.
```

#### D. Sections (Claim 5)

**Amend mandatory sections for Domain class**:
```markdown
## Universal Mandatory Sections

Every Knowledge Document SHALL include:

1. **Definition** — One-paragraph statement of what is known
   - Note: Domain class MAY use "Overview" instead
2. **Summary** — 2-3 paragraph overview
3. **Evidence** — Supporting evidence with references
4. **Provenance** — Complete traceability chain

### Minimum vs Maximum

Specifications define minimum requirements. Documents MAY include additional sections beyond the minimum.
```

#### E. Document Classes (Claim 3)

**Clarify Architecture class**:
```markdown
## Class 2: Architecture Specification

**Purpose**: Define KDE system architecture.

**Subtypes**:
- KDE System Architecture: KDE-wide specifications
- Domain Architecture: Domain-specific patterns (e.g., SCADA patterns)

**Note**: Domain Architecture documents may use "ARCH" prefix if they represent architectural patterns for a domain.
```

**Document Tradeoff Analysis variant**:
```markdown
## Class 5: Argumentation

**Subtypes**:
- Decision Rationale: Why a decision was made
- Tradeoff Analysis: Comparison of alternatives (e.g., KDE-ARCH-010)

Tradeoff Analysis documents shall include:
- Definition (decision or question)
- Options Considered (table format)
- Decision Made
- Rationale
- Evidence
- Conditions for each option
```

---

## Repository Actions

### 2. Remove knowledge-summary from Knowledge (Claim 10)

Move these files from `/knowledge/` to their source investigations in `/laboratory/investigations/`:

| File | Destination |
|------|-------------|
| knowledge/gis/knowledge-summary.md | laboratory/investigations/INV-031/ |
| knowledge/typography/knowledge-summary.md | laboratory/investigations/INV-030/ |
| knowledge/utility-sld/knowledge-summary.md | laboratory/investigations/INV-029/ |
| knowledge/visualization/knowledge-summary.md | laboratory/investigations/INV-028/ |

### 3. Update Domain Documents

Add Definition section or rename Overview to Definition:

| File | Current | Recommended |
|------|---------|-------------|
| gis/design-rules.md | ## Overview | ## Definition (or ## Overview with content defining domain scope) |
| typography/fundamentals.md | ## Overview | ## Definition |

---

## Governance Actions

### 4. Establish Document Class Guidelines

Create guidance for:
1. When to use Foundational class
2. When to use Architecture class (KDE vs Domain)
3. When to use Domain class
4. When to use Argumentation class (including Tradeoffs)
5. When to use Governance class

### 5. Establish Provenance Standards

Document acceptable external sources:
1. Industry standards (ISA, IEC, OGC, etc.)
2. Academic publications
3. Vendor documentation
4. Authoritative references

---

## Implementation Priority

### Priority 1 (Immediate)

1. Update specification with CANDIDATE status
2. Add valid-until metadata field
3. Update provenance model for external sources

### Priority 2 (Short-term)

4. Remove knowledge-summary from Knowledge
5. Update Domain documents
6. Document class subtypes

### Priority 3 (Ongoing)

7. Create governance guidance
8. Train investigators on class selection
9. Establish provenance standards

---

## Monitoring

Track these metrics:
1. Documents following amended specification
2. Documents with valid provenance
3. Documents correctly classified
4. Documents with appropriate lifecycle state

---

## References

- LAB-022: [`../LAB-022/KNOWLEDGE-DOCUMENT-SPECIFICATION.md`](../LAB-022/KNOWLEDGE-DOCUMENT-SPECIFICATION.md)
- LAB-023: [`../LAB-023/FALSIFICATION-REPORT.md`](../LAB-023/FALSIFICATION-REPORT.md)
- LAB-024: [`VERDICT.md`](./VERDICT.md)
