# Capability Template

**Purpose**: Template for creating reusable Capabilities

---

## Capability Definition

A Capability is a reusable function that can be shared across Workers. Capabilities contain no domain knowledge.

| Attribute | Description |
|-----------|-------------|
| **Name** | Capability identifier |
| **Function** | What the capability does |
| **Inputs** | Required inputs |
| **Outputs** | Result format |

---

## Capability Structure

```
capabilities/[capability-name]/
├── README.md          # Capability description
├── SPEC.md            # Technical specification
└── impl/              # Implementation (if applicable)
    └── (code files)
```

---

## Core Capabilities

| Capability | Function |
|------------|----------|
| OCR | Text extraction from images |
| Transcription | Audio to text conversion |
| Image Recognition | Object detection in images |
| Embeddings | Vectorization for similarity |
| Metadata Extraction | File metadata parsing |
| Parsing | Structured data extraction |
| Diff | Text difference analysis |

---

## Anti-Patterns

- ❌ Capability contains domain logic
- ❌ Capability stores knowledge
- ❌ Capability makes decisions

---

**Template Version**: 1.0
