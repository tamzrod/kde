<!-- KDE_RUNTIME_AUTHENTICITY: GENERIC_AI_WITH_KDE_FORMAT -->
# INV-056: Should KDE Adopt Caveman Token Reduction Patterns?

**Status**: INVESTIGATION  
**Parent**: INV-055  
**Created**: 2026-07-28  
**Source**: INV-055 follow-up  
**Investigator**: OpenHands Agent

---

## Summary

[INFERENCE: This investigation analyzes whether KDE should adopt token reduction patterns from the Caveman Claude Code skill, evaluating applicability to KDE's investigation workflow and Knowledge-on-Demand Runtime.]

## Background

From INV-055, Caveman provides 8 token reduction principles:
1. Read ≤3 files before acting
2. Squash over read — grep one function, don't read the file
3. Diff over re-read — after edits, `git diff`, don't re-read
4. Brief tool outputs — summarize, don't dump
5. One-pass file reads — never read the same file twice
6. Compress before referencing — large files cited repeatedly: compress first run
7. Skip unchanged context — don't re-explain what the user knows
8. Memory over re-discovery — cite MEMORY.md, don't re-derive

## Pattern Analysis

### Pattern 1: Read ≤3 Files Before Acting

| Aspect | Analysis |
|--------|----------|
| **Description** | Limit initial file reads to 3 before taking action |
| **KDE Current** | Investigation workflow reads context on session start |
| **Applicability** | MEDIUM — Could add guidance to SOPs |

[EVIDENCE: KDE SOP-005 retrieval policy already limits initial context retrieval based on investigation type.]

### Pattern 2: Squash Over Read

| Aspect | Analysis |
|--------|----------|
| **Description** | Use grep/squash instead of full file reads |
| **KDE Current** | File reads are typically intentional, not exploratory |
| **Applicability** | HIGH — Could add `squash` command to KDE skills |

[EVIDENCE: KDE runtime retrieval system already targets specific artifacts, not full files.]

### Pattern 3: Diff Over Re-Read

| Aspect | Analysis |
|--------|----------|
| **Description** | Use `git diff` after edits instead of re-reading |
| **KDE Current** | Investigations often re-examine changed files |
| **Applicability** | HIGH — Aligned with evidence-based approach |

[EVIDENCE: KDE state machine tracks document changes, could integrate diff tracking.]

### Pattern 4: Brief Tool Outputs

| Aspect | Analysis |
|--------|----------|
| **Description** | Summarize bash outputs instead of dumping full output |
| **KDE Current** | Terminal outputs are often verbose |
| **Applicability** | MEDIUM — User preference dependent |

[EVIDENCE: KDE output formatting is minimal by default, but tool outputs can be large.]

### Pattern 5: One-Pass File Reads

| Aspect | Analysis |
|--------|----------|
| **Description** | Never read the same file twice in a session |
| **KDE Current** | Runtime retrieval caches knowledge artifacts |
| **Applicability** | LOW — Already handled by KDE retrieval engine |

[EVIDENCE: KDE Knowledge-on-Demand Runtime maintains context across sessions.]

### Pattern 6: Compress Before Referencing

| Aspect | Analysis |
|--------|----------|
| **Description** | Summarize large files before citing repeatedly |
| **KDE Current** | Knowledge artifacts have `summary` field |
| **Applicability** | MEDIUM — Could enforce compression for large artifacts |

[EVIDENCE: KDE Knowledge Document Specification includes summary requirements.]

### Pattern 7: Skip Unchanged Context

| Aspect | Analysis |
|--------|----------|
| **Description** | Don't re-explain what the user knows |
| **KDE Current** | Session context includes historical work |
| **Applicability** | HIGH — Reduces token waste on known information |

[EVIDENCE: KDE Five Core Principles already encourage brevity and evidence-based claims.]

### Pattern 8: Memory Over Re-Discovery

| Aspect | Analysis |
|--------|----------|
| **Description** | Cite MEMORY.md instead of re-deriving facts |
| **KDE Current** | /knowledge/ system serves this purpose |
| **Applicability** | HIGH — Core KDE principle |

[EVIDENCE: KDE Knowledge Classification Rules define provenance and citation requirements.]

## Recommendations

### HIGH Applicability (Recommend Adopting)

| Pattern | KDE Integration |
|---------|-----------------|
| **Squash Over Read** | Add `squash` mode to investigation skills |
| **Diff Over Re-Read** | Integrate git diff tracking into state machine |
| **Skip Unchanged Context** | Add context efficiency guidelines to SOP-005 |
| **Memory Over Re-Discovery** | Already core to KDE, reinforce with tooling |

### MEDIUM Applicability (Consider Later)

| Pattern | Notes |
|---------|-------|
| **Read ≤3 Files** | Already in SOP-005, could be more explicit |
| **Brief Tool Outputs** | User preference, not core to KDE |
| **Compress Before Referencing** | Already in knowledge spec, could enforce |

### LOW Applicability (Not Needed)

| Pattern | Reason |
|---------|--------|
| **One-Pass File Reads** | Already handled by KDE retrieval engine |

## Conclusion

[INFERENCE: KDE should adopt 4 of the 8 caveman patterns as they align well with existing KDE architecture and could improve investigation efficiency.]

### Recommended Actions

1. **Adopt Pattern 2, 3, 7, 8** — Integrate into KDE workflow documentation
2. **Extend Pattern 6** — Enforce compression for large knowledge artifacts
3. **Create `squash` skill** — Enable targeted file reading
4. **Update SOP-005** — Add context efficiency guidelines

## Evidence

[EVIDENCE: INV-055 caveman analysis]
[EVIDENCE: KDE SOP-005 retrieval policy]
[EVIDENCE: KDE Knowledge Document Specification]
[EVIDENCE: KDE Knowledge Classification Rules]

## Next Steps

1. Human review of recommendations
2. If approved: Create implementation tickets
3. If rejected: Document reasoning and close

---

**Document Status**: INVESTIGATION  
**Human Review Required**: Yes  
**Blocking**: Cannot self-approve (Principle 2)
