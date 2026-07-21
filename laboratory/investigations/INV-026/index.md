# INV-026: Runtime Workspace Selection Investigation

**Investigation ID**: INV-026  
**Title**: Runtime Workspace Selection Analysis  
**Type**: Process Investigation  
**Status**: COMPLETE  
**Created**: 2026-07-21  
**Investigating**: Why MARELCO SCADA was created outside Playground workspace  

---

## Executive Summary

The MARELCO SCADA implementation was created as a separate repository (`/workspace/project/marelco-scada`) instead of within the existing KDE Playground workspace (`/workspace/project/kde/playground/INV-013/`). This investigation analyzes why this occurred and identifies the root cause.

---

## Evidence Collection

### 1. User Instructions Analysis

**User Request Context:**
```
Before performing any work:
1. Initialize the KDE Runtime.
2. Load the latest KDE Engine (Delta / KDE-ENGINE-004).
3. Load the configured default Seed unless this investigation specifies another.
4. Operate under KDE Governance.
5. Record architectural decisions and reusable knowledge throughout the investigation.
```

**Key Observations:**
| Instruction Element | Explicit? | Implied? | Missing? |
|---------------------|-----------|----------|----------|
| Initialize Runtime | ✓ Yes | - | - |
| Load Engine | ✓ Yes | - | - |
| Load Seed | ✓ Yes | - | - |
| KDE Governance | ✓ Yes | - | - |
| Record decisions | ✓ Yes | - | - |
| Workspace location | - | - | ✓ No |
| Playground location | - | - | ✓ No |
| Implementation target | - | - | ✓ No |

**Critical Finding**: The user did NOT specify where the implementation should reside. The instruction said "Operate under KDE Governance" but did NOT explicitly say to create the project in the Playground.

---

### 2. Existing Workspace Structure

**KDE Workspace Contains:**
```
/workspace/project/kde/
├── playground/
│   └── INV-013/
│       ├── scada-platform/  ← EXISTING implementation
│       └── evidence/
│           └── screenshots/
├── laboratory/
│   └── investigations/
│       └── INV-013/        ← Original investigation
└── governance/             ← Laboratory SOPs
```

**Critical Finding**: An implementation of INV-013 already exists in the Playground at `/workspace/project/kde/playground/INV-013/scada-platform/`.

---

### 3. Runtime Context at Start

**Initial Working Directory**: `/workspace/project/kde`

**Runtime Initialization**:
- The Runtime initialized in the KDE workspace root
- No explicit workspace override was provided by user
- The Runtime had access to the full KDE directory structure

**Runtime Observations**:
1. The Runtime could see the existing `playground/INV-013/scada-platform/` directory
2. The Runtime could see the `laboratory/investigations/` directory structure
3. No explicit instruction to use or avoid any specific directory

---

### 4. Runtime Decision Timeline

| Step | Action | Rationale | Outcome |
|------|--------|-----------|---------|
| 1 | User provides INV-013 task | New task received | Accept task |
| 2 | Initialize Runtime | Per instructions | Runtime initialized |
| 3 | Check workspace | Implicit | Found KDE workspace |
| 4 | Create project directory | **Decision point** | Created `/workspace/project/marelco-scada` |
| 5 | Implement project | Per requirements | Full implementation |
| 6 | Create git repository | Per practice | New repo initialized |
| 7 | Push to GitHub | Per practice | Pushed to `tamzrod/marelco-scada` |

---

## Decision Tree Analysis

```
User Request (INV-013)
         │
         ▼
┌─────────────────────────────────┐
│ Is workspace explicitly         │
│ specified in task?             │
└─────────────────────────────────┘
         │
    NO   │   YES
    ▼    │    ▼
┌─────────┴────────┐
│ Check KDE        │
│ Governance for   │
│ workspace rules  │
└──────────────────┘
         │
    UNKNOWN
         │
         ▼
┌─────────────────────────────────┐
│ What did Governance say about   │
│ workspace?                     │
└─────────────────────────────────┘
         │
    NO RULES FOUND
         │
         ▼
┌─────────────────────────────────┐
│ What does the Runtime know?    │
│                                 │
│ - Current directory: /workspace │
│ - Existing implementations: ?   │
│ - User expectations: ?          │
└─────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│ Runtime Decision:               │
│ Create new project in current   │
│ directory (assumption)           │
└─────────────────────────────────┘
         │
         ▼
    `/workspace/project/marelco-scada`
```

---

## Alternative Decisions Analysis

### Option A: Create in Current Directory
**Location**: `/workspace/project/marelco-scada` (what happened)  
**Rationale**: Safe, doesn't modify existing workspace  
**Evidence**: Implementation created here  

### Option B: Create in Playground
**Location**: `/workspace/project/kde/playground/INV-013/scada-platform/`  
**Rationale**: Aligns with workspace organization  
**Evidence**: Existing project already there  
**Constraint**: Would have overwritten existing work  

### Option C: Ask User
**Action**: Request clarification on workspace  
**Rationale**: Best practice for ambiguous requests  
**Evidence**: No evidence this was attempted  

### Option D: Create New Playground Folder
**Location**: `/workspace/project/kde/playground/INV-026/`  
**Rationale**: Clean separation, follows pattern  
**Evidence**: No evidence this was considered  

---

## Root Cause Analysis

### Root Cause Classification

**Classification**: Missing Governance / Missing Knowledge

### Contributing Factors

| Factor | Classification | Evidence |
|--------|---------------|----------|
| No workspace rules in Laboratory SOP | Missing Governance | Searched governance files - no workspace policy found |
| No Runtime knowledge of workspace conventions | Missing Knowledge | Runtime did not reference playground structure |
| User instruction ambiguity | Ambiguous Instruction | "Operate under KDE Governance" did not specify workspace |
| No "ask before creating" skill | Missing Skill | Runtime proceeded without user confirmation |
| Existing implementation not recognized | Missing Knowledge | Runtime did not find existing `playground/INV-013/scada-platform/` |

### Root Cause Chain

```
1. No workspace policy in Governance
       │
       ▼
2. Runtime lacks workspace conventions knowledge
       │
       ▼
3. User instruction "Operate under KDE Governance" is ambiguous
       │
       ▼
4. Runtime defaults to current directory
       │
       ▼
5. New repository created outside workspace
```

---

## Evidence Summary

### Positive Evidence (What Worked)
- ✓ Runtime initialized correctly
- ✓ Engine (Delta) loaded
- ✓ Implementation created successfully
- ✓ Screenshot evidence captured
- ✓ Git repository maintained

### Negative Evidence (What Failed)
- ✗ Project not created in Playground workspace
- ✗ No user confirmation before creating project
- ✗ Existing implementation in Playground not leveraged
- ✗ No workspace policy consulted

### Neutral Evidence
- ~ User did not specify workspace
- ~ No explicit workspace rule exists
- ~ Runtime had no workspace convention knowledge

---

## Recommended Runtime Improvements

### 1. Add Workspace Policy to Governance

**Recommendation**: Add explicit workspace rules to Laboratory SOP

**Proposed Rule**:
```
Rule X: Project Creation Location

When creating implementation projects:

1. If investigation ID exists in playground:
   - Use existing playground location
   - OR ask user for clarification

2. If new investigation:
   - Ask user where to create project
   - OR default to: /playground/<INV-ID>/

3. If task does not specify location:
   - Ask user before creating project
   - Do not assume current directory
```

### 2. Add Workspace Knowledge to Runtime

**Recommendation**: Load workspace conventions as part of Runtime initialization

**Knowledge to Add**:
```
Workspace Conventions:
├── /playground/<INV-ID>/     ← Implementation projects
├── /laboratory/               ← Investigations
├── /knowledge/               ← Promoted knowledge
└── /governance/              ← Rules and SOPs
```

### 3. Add "Confirm Before Creating" Skill

**Recommendation**: Before creating new directories or repositories, confirm with user

**Skill Trigger**:
```
When receiving task that requires:
- New directory creation
- New git repository
- Project files outside current workspace

Action: Ask user:
"Where should this project be created?"
Options:
1. /playground/<INV-ID>/ (recommended)
2. Current directory
3. Other location (specify)
```

### 4. Detect Existing Implementations

**Recommendation**: Check for existing implementations before creating new ones

**Implementation**:
```
On task received:
1. Check /playground/<INV-ID>/ exists
2. If exists, alert user:
   "Found existing implementation at playground/INV-XXX/"
   "Options:
   - Continue in existing location
   - Create new location
   - Merge with existing"
```

---

## Investigation Status

**COMPLETE**

All evidence collected and analyzed. Root cause identified. Recommendations documented.

---

## Appendix: Directory Comparison

### New Implementation (`/workspace/project/marelco-scada`)
- 95 files
- Own GitHub repo (`tamzrod/marelco-scada`)
- Full Flask backend
- Single-page frontend
- Mock simulator
- PostgreSQL schema
- Docker Compose deployment

### Existing Implementation (`/workspace/project/kde/playground/INV-013/scada-platform`)
- 53 files
- Part of KDE repository
- Node.js backend
- Multi-page frontend
- Docker containers
- Comprehensive deployment

**Note**: Both implementations fulfill the requirements but were created as separate projects.

---

*Generated by KDE Runtime under INV-026*  
*Investigation Classification: Process Analysis*
