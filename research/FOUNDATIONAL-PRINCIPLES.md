# Foundational Principles

## Core Principle

**"Experiment before deployment."**

Methodology should first be explored in the Laboratory. Only validated concepts should be promoted into deployment targets such as MCP, CLI, API, or other interfaces. This prevents multiple implementations from evolving independently while the methodology is still changing.

## Rationale

One of the biggest lessons from KDSE was that methodology evolved simultaneously in Markdown, CLI, and MCP. This created ambiguity because multiple implementations had to evolve together.

By establishing the Laboratory as the experimental environment and Deployment as the stable destination, we ensure:
- Ideas are simulated and validated before becoming deployment artifacts
- Multiple implementations evolve in sync with validated methodology
- Ambiguity between "experimental" and "stable" is eliminated

## Application

```
RESEARCH → LABORATORY → DEPLOYMENT
   │           │            │
   │      Experiment    Stable
   │           │            │
   └────► Validate ◄───────┘
              │
              ▼
         Knowledge
```

1. **Research** generates questions and investigates them
2. **Laboratory** experiments with potential implementations
3. **Deployment** consumes validated knowledge
4. **Knowledge** is the canonical record of validated concepts
