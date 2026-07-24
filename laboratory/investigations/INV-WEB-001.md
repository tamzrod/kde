# INV-WEB-001: Official Personal Website Design Synthesis

**Investigation ID**: INV-WEB-001  
**Title**: Official Personal Website Design Synthesis  
**Status**: IN_PROGRESS  
**Date**: 2026-07-24  
**Engine**: KDE-ENGINE-002 (Beta)  
**Authority**: Bootstrap Protocol  

---

## Executive Summary

This investigation synthesizes a minimalist personal website for **Tamz Rod**, creator and founder of KDE (Knowledge Discovery Engine). The design reflects observed engineering principles: evidence-based reasoning, deterministic systems, schema-driven correctness, and knowledge-as-primary-artifact philosophy.

---

## Evidence Collection

### GitHub Profile Analysis

| Field | Observation |
|-------|-------------|
| **Profile Completeness** | Minimal - no bio, name, blog, or location specified |
| **Repositories** | 22 public repositories |
| **Social Presence** | No Twitter, minimal external links |
| **Followers/Following** | 1 follower, 0 following |

**Inference**: Subject prefers work to speak for itself. Not seeking social validation.

---

### Repository Theme Analysis

| Repository | Description | Core Theme |
|------------|-------------|------------|
| **KDE** | Knowledge Discovery Engine | Evidence-based knowledge management |
| **KDSE** | Knowledge-Driven Software Engineering | Structured knowledge as primary artifact |
| **Librarian** | Evidence retrieval engine | Filesystem-first, bounded collections |
| **Zeno** | Schema-driven configuration instrument | "Make it hard for user to make a mistake" |
| **Prism** | Deterministic binary transformation | (payload + formats) → exact output |
| **OpenTerminal** | Deterministic AI operator | Permission engine, audit logs |
| **forge** | Industrial device simulation | Domain-neutral device models |
| **dnp3, modbus, rma** | Industrial protocols | IEC standards, correctness over convenience |

---

### Engineering Philosophy Evidence

#### Theme 1: Evidence First

**Evidence (KDSE README)**:
> "P-001: Evidence First - No engineering work without evidence"

**Evidence (Librarian README)**:
> "Evidence over summaries - Assemble facts, let the agent reason"

**Inference**: The subject treats evidence as foundational. Claims require justification.

#### Theme 2: Knowledge as Primary Artifact

**Evidence (KDSE README)**:
> "KDSE is an engineering methodology that treats structured knowledge as the primary software artifact, from which architecture, implementation, and verification are systematically derived."

**Inference**: Subject believes structured knowledge should drive engineering, not be an afterthought.

#### Theme 3: Determinism

**Evidence (Prism README)**:
> "(payload + payload_format + target_format) → exactly ONE output value"

**Evidence (Zeno README)**:
> "Zeno enforces correctness. It provides deterministic validation, structural authority, and explicit lifecycle control."

**Evidence (OpenTerminal README)**:
> "The system prioritizes reliability over complexity"

**Inference**: Subject values predictable, reproducible outcomes over flexibility.

#### Theme 4: Schema-Driven Correctness

**Evidence (Zeno README)**:
> "Schema is authoritative."  
> "Make it hard for the user to make a mistake."

**Inference**: Subject believes constraints prevent errors better than corrections.

#### Theme 5: Ownership Boundaries

**Evidence (KDSE README)**:
```
| Layer | Owner | Contains | Location |
|-------|-------|----------|----------|
| Project Layer | Software Project | Deliverables | Project root |
| Runtime Layer | KDSE Runtime | State, sessions | .kdse/ |
```

**Inference**: Clear separation of concerns is essential for maintainability.

#### Theme 6: Formal Methods Influence

**Evidence (Repositories)**:
- IEC 61850, IEEE 1815 (DNP3) references
- Industrial protocol implementations
- Validation/simulation engines

**Inference**: Subject applies rigorous engineering practices from industrial control systems.

#### Theme 7: Minimal and Opinionated

**Evidence (mma2 README)**:
> "A deterministic, minimal, and opinionated Modbus TCP memory core"

**Inference**: Subject prefers clean, focused implementations over feature bloat.

---

### Differentiation from Typical Developer

| Typical Developer | Tamz Rod |
|------------------|----------|
| Chases frameworks/trends | Deep in foundational protocols |
| Ships features fast | Validates correctness first |
| Flexible/adaptive | Deterministic/rigorous |
| Knowledge as byproduct | Knowledge as primary artifact |
| Social media presence | Minimal, work speaks |
| Full-stack generalist | Domain expert (industrial/knowledge) |
| Assumes correctness | Proves correctness |

---

## Design Synthesis

### Design Philosophy Alignment

Based on evidence, the website must embody:

1. **Restraint over decoration** — No visual noise
2. **Clarity over cleverness** — Immediate comprehension
3. **Structure over chaos** — Semantic hierarchy
4. **Evidence-based claims** — Demonstrated through work, not promises
5. **Timeless over trendy** — No design fads

### Target Audience Analysis

| Audience | Needs |
|----------|-------|
| **Engineers** | Technical credibility, methodology clarity, code access |
| **Researchers** | Knowledge frameworks, evidence patterns, reproducibility |
| **Organizations** | Trust, professionalism, expertise verification |
| **Collaborators** | Clear communication, contribution paths |

---

## Information Architecture

### Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│                     tamzrod.io                               │
├─────────────────────────────────────────────────────────────┤
│  Navigation: [Work] [Knowledge] [Contact]                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  HERO                                                        │
│  Name / Title / One-line descriptor                         │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ABOUT                                                       │
│  Evidence-based personal statement                           │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  WORK                                                        │
│  Selected repositories with context                          │
│  - KDE (Knowledge Discovery Engine)                          │
│  - KDSE (Methodology)                                        │
│  - Industrial (Protocols)                                   │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  APPROACH                                                    │
│  Core principles (5-6 max)                                   │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  CONTACT                                                     │
│  Direct contact (email)                                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Navigation Logic

| Section | Purpose | Content Type |
|---------|---------|--------------|
| **Work** | Anchor to repositories | External links |
| **Knowledge** | Anchor to KDE methodology | Internal anchor |
| **Contact** | Anchor to contact section | Internal anchor |

---

## Wireframe

### Desktop Layout (1200px+)

```
┌────────────────────────────────────────────────────────────────┐
│  tamzrod                                    [Work] [Knowledge] [Contact] │
├────────────────────────────────────────────────────────────────┤
│                                                                    │
│                                                                    │
│                          TAMZ ROD                                  │
│                    Knowledge Engineer                              │
│                                                                    │
│                                                                    │
├────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌──────────────────────┐    ┌──────────────────────┐            │
│  │                      │    │                      │            │
│  │   SELECTED WORK      │    │   PRINCIPLES         │            │
│  │                      │    │                      │            │
│  │   [KDE]              │    │   • Evidence First   │            │
│  │   [KDSE]             │    │   • Schema Authoritative│         │
│  │   [Industrial]       │    │   • Deterministic    │            │
│  │                      │    │                      │            │
│  └──────────────────────┘    └──────────────────────┘            │
│                                                                    │
├────────────────────────────────────────────────────────────────┤
│                                                                    │
│                           CONTACT                                  │
│                      contact@tamzrod.io                            │
│                                                                    │
└────────────────────────────────────────────────────────────────┘
```

### Mobile Layout (<768px)

```
┌────────────────────────────┐
│  tamzrod        [≡]       │
├────────────────────────────┤
│                            │
│       TAMZ ROD             │
│   Knowledge Engineer       │
│                            │
├────────────────────────────┤
│                            │
│  SELECTED WORK             │
│  ┌────────────────────┐    │
│  │ KDE                │    │
│  └────────────────────┘    │
│  ┌────────────────────┐    │
│  │ KDSE               │    │
│  └────────────────────┘    │
│  ┌────────────────────┐    │
│  │ Industrial          │    │
│  └────────────────────┘    │
│                            │
├────────────────────────────┤
│                            │
│  PRINCIPLES                │
│  Evidence First            │
│  Schema Authoritative     │
│  Deterministic            │
│                            │
├────────────────────────────┤
│                            │
│  CONTACT                   │
│  contact@tamzrod.io        │
│                            │
└────────────────────────────┘
```

---

## Typography Recommendations

### Font Selection

| Element | Font | Rationale |
|---------|------|-----------|
| **Headings** | System UI / -apple-system | No external dependencies, native feel |
| **Body** | System UI / -apple-system | Consistent rendering, fast loading |
| **Monospace** | ui-monospace, monospace | Technical credibility |

**Fallback Stack**:
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
             "Helvetica Neue", Arial, sans-serif;
```

### Type Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 (Name) | 3rem / 48px | 300 (Light) | 1.2 |
| H2 (Section) | 1.5rem / 24px | 600 (SemiBold) | 1.3 |
| H3 (Subsection) | 1.125rem / 18px | 600 (SemiBold) | 1.4 |
| Body | 1rem / 16px | 400 (Regular) | 1.6 |
| Small | 0.875rem / 14px | 400 (Regular) | 1.5 |

---

## Color Palette

### Black Background Theme

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **Background** | Pure Black | `#000000` | Page background |
| **Surface** | Near Black | `#0a0a0a` | Cards, sections |
| **Border** | Dark Gray | `#1a1a1a` | Subtle dividers |
| **Text Primary** | White | `#ffffff` | Headings, primary text |
| **Text Secondary** | Light Gray | `#a0a0a0` | Descriptions, metadata |
| **Accent** | Cool White | `#e0e0e0` | Links, highlights |
| **Hover** | Pure White | `#ffffff` | Interactive states |

### Rationale

- **Black background**: Eliminates eye strain, conveys technical seriousness
- **White text**: Maximum contrast, readability
- **Minimal colors**: No distraction from content
- **Subtle borders**: Creates hierarchy without visual noise

---

## Component Hierarchy

### 1. Header Component

```
┌─────────────────────────────────────────────────────────────┐
│  tamzrod                                    [Work] [Knowledge] [Contact] │
└─────────────────────────────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Position | Fixed, top |
| Background | #000000 |
| Border-bottom | 1px solid #1a1a1a |
| Padding | 1rem 2rem |
| Z-index | 100 |

### 2. Hero Component

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│                                                              │
│                          TAMZ ROD                            │
│                    Knowledge Engineer                         │
│                                                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Padding | 8rem 2rem 6rem |
| Text-align | center |
| Name size | 3rem, weight 300 |
| Title size | 1.125rem, weight 400, secondary color |
| Max-width | 600px, centered |

### 3. Section Component

```
┌─────────────────────────────────────────────────────────────┐
│  SECTION TITLE                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Section content with semantic markup                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Max-width | 800px |
| Margin | 0 auto |
| Padding | 4rem 2rem |
| Border-top | 1px solid #1a1a1a |

### 4. Card Component (Work Items)

```
┌───────────────────────────────────────┐
│  [Icon/Initial]                        │
│                                        │
│  Project Name                          │
│                                        │
│  Brief description of the project     │
│  and its purpose.                      │
│                                        │
│  → View on GitHub                      │
└───────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Background | #0a0a0a |
| Border | 1px solid #1a1a1a |
| Padding | 1.5rem |
| Border-radius | 2px |

### 5. Principles Component

```
┌─────────────────────────────────────────────────────────────┐
│  EVIDENCE FIRST                                             │
│  No engineering work without evidence                       │
├─────────────────────────────────────────────────────────────┤
│  SCHEMA AUTHORITATIVE                                        │
│  The schema defines correctness                             │
└─────────────────────────────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| List-style | none |
| Padding | 0 |
| Each item | 2rem padding, border-bottom |

### 6. Footer/Contact Component

```
┌─────────────────────────────────────────────────────────────┐
│                           CONTACT                           │
│                      contact@tamzrod.io                     │
│                                                              │
│                      © 2024 Tamz Rod                        │
└─────────────────────────────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Text-align | center |
| Padding | 4rem 2rem |

---

## Content Strategy

### Hero Content

```
Name: TAMZ ROD
Title: Knowledge Engineer
Descriptor: Building systems that transform evidence into knowledge.
```

### About Section

**Evidence**: Based on repository analysis

> Tamz Rod is the creator of KDE (Knowledge Discovery Engine), an evidence-based methodology for transforming observations into validated knowledge. With a background in industrial protocols and formal methods, the work focuses on systems where correctness is non-negotiable: industrial control, knowledge management, and deterministic computation.

### Work Section

Selected repositories with context:

| Project | Category | One-line Description |
|---------|----------|---------------------|
| **KDE** | Core | Evidence-based knowledge discovery engine |
| **KDSE** | Methodology | Knowledge-driven software engineering framework |
| **Librarian** | Tools | Filesystem-first evidence retrieval |
| **Zeno** | Tools | Schema-driven configuration instrument |
| **Industrial** | Domain | Modbus, DNP3 protocol implementations |

### Principles Section

| Principle | Statement |
|-----------|-----------|
| **Evidence First** | No engineering work without evidence |
| **Schema Authoritative** | The schema defines correctness |
| **Deterministic** | Same input, same output, every time |
| **Bounded** | Work within defined constraints |
| **Ownership** | Clear boundaries, clear responsibility |

### Contact Section

```
Email: contact@tamzrod.io
GitHub: github.com/tamzrod
```

---

## Visual Rationale

### Why Black Background?

1. **Technical aesthetic**: Common in developer tools, terminals, IDEs
2. **Focus on content**: Eliminates visual competition
3. **Professional**: Conveys seriousness and precision
4. **Battery-friendly**: For OLED displays

### Why System Fonts?

1. **No dependencies**: Loads instantly
2. **Native feel**: Respects user preferences
3. **Fast rendering**: No font file downloads
4. **Accessible**: System fonts have excellent rendering

### Why Minimal Color?

1. **Evidence-based design**: Color used for function, not decoration
2. **Timeless**: Won't look dated in 5 years
3. **Accessible**: High contrast ratios maintained
4. **Professional**: Matches engineering philosophy

### Why Semantic HTML?

1. **Accessibility**: Screen readers, assistive technology
2. **Maintainability**: Clear structure
3. **SEO**: Search engines understand content
4. **Longevity**: Standards-based, future-proof

---

## Design Constraints Compliance

| Constraint | Implementation |
|------------|----------------|
| Black background | Background: #000000 |
| HTML5 only | Semantic elements: header, nav, main, section, article, footer |
| CSS3 only | Modern CSS: flexbox, grid, custom properties, media queries |
| No JavaScript | Zero JS in implementation |
| No frameworks | Pure CSS, no Bootstrap/Tailwind/etc. |
| No animations | No transitions, no keyframes, no transforms |
| No CSS libraries | Custom CSS only |
| Fully responsive | Mobile-first, breakpoints at 768px, 1024px |
| Semantic HTML | Proper element selection |
| Accessible | ARIA labels, alt text, keyboard navigation |
| Fast loading | No external resources except fonts (system stack) |
| Maintainable | CSS custom properties, comments, logical structure |

---

## Technical Implementation

### HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Tamz Rod - Knowledge Engineer">
  <title>Tamz Rod | Knowledge Engineer</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>...</header>
  <main>
    <section id="hero">...</section>
    <section id="about">...</section>
    <section id="work">...</section>
    <section id="principles">...</section>
    <section id="contact">...</section>
  </main>
  <footer>...</footer>
</body>
</html>
```

### CSS Architecture

```css
:root {
  /* Colors */
  --color-bg: #000000;
  --color-surface: #0a0a0a;
  --color-border: #1a1a1a;
  --color-text: #ffffff;
  --color-text-secondary: #a0a0a0;
  --color-accent: #e0e0e0;
  
  /* Typography */
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: ui-monospace, "SF Mono", Monaco, monospace;
  
  /* Spacing */
  --space-unit: 1rem;
  --space-sm: calc(var(--space-unit) * 0.5);
  --space-md: var(--space-unit);
  --space-lg: calc(var(--space-unit) * 2);
  --space-xl: calc(var(--space-unit) * 4);
  --space-2xl: calc(var(--space-unit) * 6);
}
```

---

## Validation Checklist

| Criterion | Evidence |
|-----------|----------|
| Engineering excellence | Evidence-based methodology demonstrated |
| Technical credibility | 22 repositories, industrial protocols |
| Research mindset | Knowledge frameworks, formal methods |
| Simplicity | Minimal design, no decoration |
| Professionalism | Clean structure, no marketing |
| Curiosity | Multiple domain explorations |
| Trust | No hype, work speaks |

---

## Conclusion

This website design synthesizes the observed engineering philosophy of Tamz Rod:

- **Evidence-based**: Every design decision justified by principles
- **Deterministic**: Clear structure, predictable rendering
- **Minimal**: No decoration, content-first
- **Timeless**: Classic black/white, system fonts, no trends
- **Accessible**: Semantic HTML, high contrast, keyboard navigable
- **Fast**: No external dependencies, optimized for performance

The result is a website that embodies the subject's own engineering principles: restraint, correctness, and letting the work speak for itself.

---

**Investigation Status**: READY_FOR_IMPLEMENTATION  
**Next Step**: Website implementation based on this design specification

---

*Generated by KDE-ENGINE-002 (Beta) under Bootstrap Protocol*
*Evidence sources: tamzrod GitHub profile, repository READMEs*
