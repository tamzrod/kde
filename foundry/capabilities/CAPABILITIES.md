# Capabilities

**Purpose**: Shared capabilities across all Workers

---

## Definition

Capabilities are reusable functions that contain no domain knowledge. They can be shared across multiple Workers.

---

## Available Capabilities

| Capability | Function | Used By |
|------------|----------|---------|
| OCR | Text extraction from images | Librarian Worker |
| Transcription | Audio to text conversion | Librarian Worker |
| Image Recognition | Object detection | Librarian Worker |
| Embeddings | Vectorization for similarity | All Workers |
| Metadata Extraction | File metadata parsing | All Workers |
| Parsing | Structured data extraction | All Workers |
| Diff | Text difference analysis | Git Worker |

---

## Adding Capabilities

To add a new capability, create a directory under `capabilities/` with:
- `README.md` - Capability description
- `SPEC.md` - Technical specification

---

**Capabilities are domain-agnostic and reusable.**
