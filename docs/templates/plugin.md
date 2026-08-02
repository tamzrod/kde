# Plugin Template

**Purpose**: Template for creating format-handling Plugins

---

## Plugin Definition

A Plugin handles specific data formats. Plugins understand formats but do not discover knowledge.

| Attribute | Description |
|-----------|-------------|
| **Format** | The data format this plugin handles |
| **Extension** | File extension(s) |
| **Parser** | How to parse the format |

---

## Plugin Structure

```
plugins/[format]-plugin/
├── README.md          # Format description
├── SPEC.md            # Format specification
└── impl/              # Implementation
    └── (parser code)
```

---

## Core Plugins

| Plugin | Handles | Workers |
|--------|---------|---------|
| PDF Plugin | PDF files | Librarian |
| Image Plugin | PNG, JPG, GIF | Librarian |
| Audio Plugin | MP3, WAV | Librarian |
| Video Plugin | MP4, MKV | Librarian |
| CAN Plugin | CAN bus data | Vehicle |
| DBC Plugin | DBC format | Vehicle |
| IEC61850 Plugin | IEC 61850 protocol | Substation |
| Git Plugin | Git repositories | Git |

---

## Anti-Patterns

- ❌ Plugin performs investigation
- ❌ Plugin produces observations
- ❌ Plugin understands domain semantics

---

**Template Version**: 1.0
