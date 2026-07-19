# Evolution Recommendations: LAB-015

**Experiment**: LAB-015 (Genome Evolution Validation)
**Date**: 2026-07-19

---

## Overview

This document contains recommendations for improving the Genome evolution process based on validation findings from LAB-015.

---

## Recommendations Summary

| Priority | Recommendation | Action Required |
|----------|----------------|----------------|
| CRITICAL | Add Circular Dependency Validation | Protocol addition |
| CRITICAL | Add Foundational Gene Protection | Protocol addition |
| HIGH | Add Competing Proposal Protocol | Protocol addition |
| HIGH | Add Evidence Weighting Protocol | Protocol addition |
| MEDIUM | Add ARCHIVED Status | Lifecycle addition |
| MEDIUM | Add Cascade Analysis | Protocol addition |
| LOW | Define Schema Migration Strategy | Documentation |

---

## Protocol Additions

### 1. Circular Dependency Validation (CRITICAL)

**Problem**: Gene mutations could create circular dependencies (A → B → A).

**Recommendation**: Add validation to gene creation:

```markdown
## Circular Dependency Validation

Before creating a new gene:
1. Collect all predecessors
2. Collect all successors
3. Check for cycles in relationship graph
4. If cycle detected: REJECT gene creation
5. Document rejection reason

Validation Rule:
- No gene may have a predecessor that has it as a successor
- No circular paths in relationship graph
```

**Implementation**: Add validation function to gene creation workflow.

---

### 2. Foundational Gene Protection (CRITICAL)

**Problem**: Deprecation of foundational genes (GENE-0001, GENE-0009) would cascade to all child genes.

**Recommendation**: Add Foundational Gene Registry and Impact Analysis:

```markdown
## Foundational Gene Registry

FOUNDATIONAL GENES (Cannot be deprecated without major restructuring):
- GENE-0001: Traceability Principle
- GENE-0002: Evidence-Based Nature
- GENE-0009: Applicability Boundary

## Impact Analysis Requirement

Before deprecating a FOUNDATIONAL gene:
1. Identify all child genes
2. Identify all relationships
3. Calculate cascade effect
4. Decide: deprecate together OR restructure
5. Prepare migration plan
6. Submit to Governance with impact analysis
7. Governance review required
```

**Implementation**: Add FOUNDATIONAL status and impact_analysis section to lifecycle.

---

### 3. Competing Proposal Protocol (HIGH)

**Problem**: Multiple researchers may propose conflicting genes.

**Recommendation**: Add Competing Proposal Resolution:

```markdown
## Competing Proposal Protocol

When competing gene proposals are identified:
1. Flag both as COMPETING_PROPOSAL
2. Do not create either gene until resolved
3. Collect all evidence for each proposal
4. Compare evidence quality and quantity
5. Identify conflicts in canonical statements
6. Request Governance review
7. Governance decides:
   - Option A: Accept proposal with more evidence
   - Option B: Accept both, clarify distinction
   - Option C: Reject both, require new synthesis
8. Document resolution in both gene files
```

**Implementation**: Add COMPETING_PROPOSAL status to lifecycle.

---

### 4. Evidence Weighting Protocol (HIGH)

**Problem**: Simultaneous contradictory evidence - which wins?

**Recommendation**: Add Evidence Weighting Guidelines:

```markdown
## Evidence Weighting Guidelines

When calculating confidence with contradictory evidence:
1. Weight by source reliability:
   - Peer-reviewed: 1.0
   - Laboratory experiment: 0.9
   - Expert opinion: 0.7
   - Preliminary observation: 0.5

2. Weight by methodology quality:
   - Formal methodology: 1.0
   - Documented methodology: 0.8
   - Ad hoc methodology: 0.5

3. Weight by recency:
   - Recent (last 30 days): 1.0
   - Recent (last 90 days): 0.9
   - Older: 0.7

4. Calculate net evidence:
   supporting_weight = sum(supporting × weights)
   contradicting_weight = sum(contradicting × weights)
   net = supporting - contradicting

5. Adjust confidence based on net value
```

**Implementation**: Add evidence_weighting section to confidence calculation.

---

### 5. ARCHIVED Status (MEDIUM)

**Problem**: Gene count grows indefinitely over time.

**Recommendation**: Add ARCHIVED status:

```markdown
## Lifecycle States (Updated)

| State | Description | Entry Criteria |
|-------|-------------|----------------|
| HYPOTHESIS | Proposed but not synthesized | Derived from existing genes |
| EXPERIMENTAL | Synthesized, limited validation | ≥1 supporting experiment |
| DOMAIN_ADAPTER | Validated in multiple domains | ≥3 supporting experiments |
| STABLE_CORE | Validated universally | ≥4 diverse domains, no contradictions |
| SUPERSEDED | Replaced by refined version | New version created |
| DEPRECATED | Invalidated or obsolete | Governance approval |
| ARCHIVED | Historical record only | 3+ successor generations |

## Archive Criteria

A gene becomes ARCHIVED when:
1. It has been SUPERSEDED by 3 or more generations
2. No active genes reference it as a direct predecessor
3. It is not a FOUNDATIONAL gene
4. Governance approves archival

## Archive Effect

Archived genes:
- Remain in Genome for historical reference
- Are excluded from default queries
- Can be retrieved for historical analysis
- Cannot be modified
- Are marked as historical only
```

**Implementation**: Add ARCHIVED status to lifecycle and registry.

---

### 6. Cascade Analysis (MEDIUM)

**Problem**: Gene splits can cascade to related genes.

**Recommendation**: Add Cascade Analysis:

```markdown
## Cascade Analysis

Before gene split:
1. Identify all related genes
2. Check for cascade effects:
   - Related genes affected?
   - Relationships require updates?
   - Classification changes?
3. If cascade detected:
   - Process all changes in single mutation cycle
   - Document cascade dependencies
   - Update all affected genes together
4. Example cascade:
   - GENE-0008 split:
     - GENE-0011 (new)
     - GENE-0012 (new)
     - GENE-0013 (new, related to GENE-0007)
     - GENE-0007 (update relationships)
```

**Implementation**: Add cascade_analysis section to gene split protocol.

---

### 7. Schema Migration Strategy (LOW)

**Problem**: Genome schema will evolve; migration needed.

**Recommendation**: Document migration approach:

```markdown
## Schema Migration Strategy

### Version Compatibility

GENOME-SCHEMA-1.0: Initial schema (current)
GENOME-SCHEMA-1.1: With additional protocols (recommended)
GENOME-SCHEMA-2.0: Breaking changes (future)

### Migration Rules

1. Backward compatible changes (new optional fields):
   - Add field as optional
   - Existing genes remain valid
   - Version incremented: 1.0 → 1.1

2. Breaking changes (required new fields):
   - Create migration script
   - Run on all genes
   - Version incremented: 1.x → 2.0

3. Gene schema reference:
   - Each gene file should reference schema version
   - GENE-XXXX.md: "Schema: GENOME-SCHEMA-1.0"
```

**Implementation**: Add schema reference to gene template.

---

## Implementation Priority

| Phase | Recommendations | Timeline |
|-------|------------------|----------|
| PHASE 1 | Circular Dependency, Foundational Protection | Immediate |
| PHASE 2 | Competing Proposals, Evidence Weighting | Within 30 days |
| PHASE 3 | ARCHIVED Status, Cascade Analysis | Within 60 days |
| PHASE 4 | Schema Migration Strategy | Within 90 days |

---

## Governance Implications

### Required Governance Actions

| Action | Authority | Required For |
|-------|----------|-------------|
| Approve Protocol Additions | Governance Body | All CRITICAL and HIGH |
| Define FOUNDATIONAL Genes | Governance Body | Critical genes |
| Resolve Competing Proposals | Governance Body | Conflicting genes |
| Approve Deprecation | Governance Body | Foundational genes |

### Governance Process Updates

1. Add protocol review to Governance responsibilities
2. Establish timeline for protocol approvals
3. Define escalation for critical issues
4. Document Governance decisions in changelog

---

## Recommendations for Future Experiments

### LAB-016: Apply Evolution to Real Evidence
- Implement recommended protocols
- Test with actual evidence from experiments
- Validate protocol effectiveness

### LAB-017: Governance Formalization
- Formalize Governance review process
- Define Governance membership
- Establish decision criteria

### LAB-018: Tooling Development
- Develop validation tooling for gene creation
- Build relationship graph visualization
- Create evidence tracking system

---

## Conclusion

LAB-015 identified 8 weaknesses in the evolution process, all with available mitigations. Implementing the recommended protocols will strengthen the Genome evolution mechanisms and enable long-term scientific evolution while preserving traceability and reproducibility.

The evolution model is fundamentally sound; these recommendations enhance it for production use.

---

## Approval Required

| Recommendation | Governance Approval Required |
|----------------|----------------------------|
| Circular Dependency Validation | NO |
| Foundational Gene Protection | YES |
| Competing Proposal Protocol | YES |
| Evidence Weighting Protocol | NO |
| ARCHIVED Status | NO |
| Cascade Analysis | NO |
| Schema Migration Strategy | NO |
