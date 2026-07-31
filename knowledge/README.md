# Knowledge Layer

**Purpose**: The primary asset of KDE

---

## Purpose

The Knowledge Layer contains all validated, reusable knowledge. It is the canonical source of truth for engineering decisions.

**Principle**: AI consumes the Knowledge Layer first and fills only the remaining gaps with general reasoning.

---

## Structure

```
knowledge/
├── foundation/      # Constitutional definitions (immutable)
├── definitions/     # Engineering definitions
├── principles/      # Operating principles
├── patterns/        # Validated patterns
├── workflows/       # Standard workflows
├── decisions/       # Decision records
├── lessons/         # Lessons learned
└── schemas/         # Data schemas
```

---

## Foundation Documents

These documents define the constitutional rules for the Knowledge Layer:

| Document | Purpose |
|----------|---------|
| WHAT-IS-KNOWLEDGE.md | What is knowledge? |
| KNOWLEDGE-LIFECYCLE.md | How knowledge moves through stages |
| KNOWLEDGE-TYPES.md | What types of knowledge exist |
| PROMOTION-RULES.md | How knowledge enters the layer |

---

## Reuse Principle

Knowledge in this layer is **reusable** when:
- It has been validated
- It has clear scope
- It can be applied in multiple contexts
- It does not require modification to use

---

## Obsolescence

Knowledge becomes obsolete when:
- The evidence it was based on is invalidated
- The domain it applies to changes fundamentally
- A better formulation replaces it
- It is explicitly deprecated through governance

---

## Consumption

AI SHALL:
1. Consult the Knowledge Layer before using general reasoning
2. Cite specific knowledge when making claims
3. Distinguish between knowledge and inference
4. Update knowledge only through defined promotion channels

---

**Authority**: Human
**Modification**: Only through promotion process defined in PROMOTION-RULES.md
