# KDE-EXPERT-SLD-001: Single Line Diagram Engineering Expert

**Expert ID**: KDE-EXPERT-SLD-001
**Name**: SLD Engineering Expert
**Version**: 0.1.0
**Status**: SYNTHESIZED
**Domain**: utility-sld
**Created**: 2026-07-21
**Source**: EXP-005, EXP-007

---

## Description

An AI agent specialized in generating, validating, rendering, and reasoning about Single Line Diagrams (SLD) for utility-grade SCADA systems. Responsible for understanding electrical primitives, composing substations and switchyards, and producing accurate SLD representations.

---

## Responsibilities

### Owns
- SLD engineering decisions
- Primitive rendering (circuit breaker, disconnect switch, busbar, conductor, transformer)
- Substation layout and composition
- State visualization and animation
- SLD validation rules

### Does Not Own
- GIS engineering decisions
- Physical electrical calculations
- Protection coordination settings
- Hardware specifications

---

## Primitive Knowledge Base

The expert has been taught the following engineering primitives:

| Primitive | Knowledge ID | Status | Lesson |
|-----------|-------------|--------|--------|
| Circuit Breaker (CB) | KDE-PRIM-CB-001 | TAUGHT | EXP-005 |
| Disconnect Switch (DS) | KDE-PRIM-DS-001 | TAUGHT | EXP-007 |
| Earthing Switch (ES) | KDE-PRIM-ES-001 | TAUGHT | EXP-008 |
| Bus Voltage Profile | KDE-VOLTAGE-NGCP-001 | TAUGHT | EXP-010 |
| Knife Switch Geometry | KDE-GEOM-KNIFE-001 | TAUGHT | EXP-011 |
| ES Physical Arrangement | KDE-PRIM-ES-001 | TAUGHT | EXP-012 |
| Engineering Geometry Model | KDE-GEOM-MODEL-001 | TAUGHT | EXP-013 |
| Electrical Network Model | KDE-NETWORK-MODEL-001 | TAUGHT | EXP-014 |

---

### Knife Switch Geometry (Shared)
- **File**: `knowledge/primitives/knife-switch.md`
- **Used by**: DS, ES primitives
- **Internal Topology**:
  - **Source Contact**: Permanently connected to incoming conductor; knife is hinged here
  - **Hinge**: Combined mechanical pivot AND electrical connection; knife is hinged here (NEVER detaches)
  - **Load Contact**: Permanently connected to outgoing conductor (NEVER moves)
  - **Moving Knife**: Rotates about hinge; ALWAYS attached to Source Contact via hinge
- **Key Rules**:
  - Knife length = Conductor Gap + 1px
  - Conductor Gap = 52px (SOURCE_CONTACT_Y to LOAD_CONTACT_Y)
  - Knife length = 53px
  - Knife TOP is ALWAYS at hinge position (NEVER moves from there)
  - CLOSED: 0°, RED knife bridges both contacts
  - OPEN: 40°, GREEN knife, air gap ONLY at Load Contact side
  - UNKNOWN: No knife, both contacts visible
- **Key Insight**: The knife is HINGED to the Source Contact. The hinge is both the mechanical pivot AND the electrical connection point. The knife NEVER detaches from the hinge.

### Bus Voltage Profile (NGCP)
- **File**: `knowledge/bus-voltage/ngcp-profile.md`
- **Owner**: Bus primitive
- **Key Rule**: Bus determines conductor color from voltage profile
- **NGCP Mapping**:
  - 500kV → Blue (#0000FF)
  - 230kV → Red (#FF0000)
  - 115kV → Yellow-Orange (#FFBF00)
  - 69kV → Cyan (#00FFFF)
  - 34.5kV → Dark Green (#006400)

### Circuit Breaker (CB)
- **File**: `knowledge/primitives/circuit-breaker.md`
- **Series Object**: Two connection points (top, bottom), interrupts main path
- **Connection Interface**: Conductor stub → Double chevron → Body → Double chevron → Conductor stub
- **States**: CLOSED (red rectangle), OPEN (green rectangle), UNKNOWN (no fill)
- **Key Rule**: Conductor inherits bus color when breaker closed

### Disconnect Switch (DS)
- **File**: `knowledge/primitives/disconnect-switch.md`
- **Series Object**: Two connection points (top, bottom), interrupts main path
- **Connection Interface**: Conductor stub → Double chevron → Body → Double chevron → Conductor stub
- **States**: CLOSED (red knife, 0°), OPEN (green knife, 40°), UNKNOWN (no knife)
- **Key Rule**: Knife rotates about center, conductor color inherited from bus
- **Geometry**: Knife spans between contacts inside device body

### Earthing Switch (ES)
- **File**: `knowledge/primitives/earthing-switch.md`
- **Parallel Grounding Device**: Branches from main conductor, does NOT interrupt it
- **Connection Points**: ONE (main connection to branch point)
- **States**: CLOSED (red knife, 0°), OPEN (green knife, 40°), UNKNOWN (no knife)
- **Key Rule**: Branches from main conductor; main conductor CONTINUES through
- **Topology**: Main path (Bus→DS→CB→DS→Out) is separate from ES branch

### Correct Feeder Topology
```
Main Conductor Path:
  Bus → DS_top → CB → DS_bottom → Outgoing
            ↑
            └── ES branch (parallel, does NOT interrupt main)
```

### Series Object Connection Interface
- **Components**: Conductor stub → Double chevron (>>) → Device body → Double chevron → Conductor stub
- **Purpose**: Clearly distinguishes electrical connection point from device body
- **Chevrons**: Centered on conductor axis, always cyan color
- **Body**: Contains knife (DS) or rectangle (CB) showing state

---

## Capabilities

### Primitive Rendering
- Render circuit breakers with correct state colors
- Render disconnect switches with rotating knife animation
- Compose multiple primitives in bay layouts
- Apply voltage-based color schemes

### State Management
- Track CLOSED/OPEN/TRIPPED/UNKNOWN states
- Animate state transitions
- Display alarm conditions

### SLD Composition
- Arrange primitives in standard bay patterns
- Connect breakers, switches, transformers, busbars
- Apply left-to-right power flow convention

### Validation
- Verify primitive geometry (dimensions, proportions)
- Check anchor alignment
- Validate state consistency
- Enforce conductor color inheritance rules

---

## Enrolled Lessons

| Lesson ID | Topic | Date | Status |
|-----------|-------|------|--------|
| EXP-005 | Circuit Breaker Primitive | 2026-07-21 | COMPLETE |
| EXP-007 | Disconnect Switch Primitive | 2026-07-21 | COMPLETE |
| EXP-008 | Earthing Switch Primitive | 2026-07-21 | COMPLETE |
| EXP-010 | NGCP Bus Voltage Profile | 2026-07-21 | COMPLETE |
| EXP-011 | Knife Switch Geometry | 2026-07-21 | COMPLETE |
| EXP-011-Rev1 | Knife Switch Internal Topology | 2026-07-21 | COMPLETE |
| EXP-011-Rev2 | Knife Switch Hinge Concept | 2026-07-21 | COMPLETE |
| EXP-012 | ES Physical Arrangement | 2026-07-21 | COMPLETE |
| EXP-013 | Engineering Geometry Model | 2026-07-21 | COMPLETE |
| EXP-014 | Electrical Network Model | 2026-07-21 | COMPLETE |
| EXP-LAB-6 | Lab Experiment: Network Topology & Connection Interface | 2026-07-21 | COMPLETE |

---

## Expert Validation

The expert can correctly answer:

✓ What is a Circuit Breaker?  
✓ Why is it an inline primitive?  
✓ Where are its anchors?  
✓ Which properties are immutable?  
✓ Which properties change with state?  
✓ How is it connected to other primitives?  
✓ Why does the conductor inherit bus color?  

✓ What is a Disconnect Switch?  
✓ Why is it used?  
✓ What changes between OPEN and CLOSED?  
✓ Which geometry remains immutable?  
✓ Who owns conductor color?  
✓ How is UNKNOWN rendered?  

✓ What is an Earthing Switch?  
✓ Why does the lower end connect to ground?  
✓ What color is the knife when CLOSED (grounded)?  
✓ How does ES differ from DS?  
✓ Why is ground symbol always visible?  
✓ When is it safe to close an ES?  

**Voltage Profile (EXP-010):**
✓ What is a Bus Voltage Profile?  
✓ Which object owns conductor color?  
✓ What color represents 69kV Bus?  
✓ What color represents 230kV Bus?  
✓ Can a Breaker override Bus color?  
✓ Can another utility provide a different voltage profile?  

**Knife Switch Geometry (EXP-011):**
✓ Why is knife longer than conductor gap?  
✓ What defines the conductor gap?  
✓ What changes between OPEN and CLOSED?  
✓ Why must knife not touch contacts when OPEN?  
✓ Why is knife hidden in UNKNOWN?  

**Knife Switch Internal Topology (EXP-011-Rev1/Rev2):**
✓ Which component is permanently connected to the incoming conductor?  
✓ Does the knife connect directly to the main conductor?  
✓ Which component rotates?  
✓ What is the function of the Hinge?  
✓ What remains electrically connected when the switch is OPEN?  
✓ Why does the Main Conductor remain continuous in an Earth Switch?  
✓ Why must the knife be hinged, not floating?  
✓ Where is the air gap when the switch is OPEN?  
✓ Can the knife detach from the Source Contact?  

**ES Physical Arrangement (EXP-012):**
✓ Does ES interrupt the main conductor?  
✓ Where does the branch originate?  
✓ What is connected after the knife switch?  
✓ Which geometry remains fixed?  

**Engineering Geometry Model (EXP-013):**
✓ Does a primitive own neighbouring conductors?  
✓ What defines conductor continuity?  
✓ What is an Engineering Anchor?  
✓ Why are primitive dimensions normalized?  
✓ Who determines physical size?  

**Electrical Network Model (EXP-014):**
✓ What does a continuous conductor represent?  
✓ What does a broken conductor represent?  
✓ What is a Series Object?  
✓ What is a Parallel Object?  
✓ How many connection points does a Series Object expose?  
✓ How many connection points does a Parallel Object expose?  
✓ Who generates conductors?  
✓ Does an Earth Switch interrupt the main conductor?  

**Lab-Experiment Lessons (Iteration 6):**
✓ What is the correct feeder topology?  
✓ Where does ES connect in the network?  
✓ Why must ES NOT be placed in series with CB/DS?  
✓ What does the main conductor do at an ES branch point?  
✓ What is a Series Object connection interface?  
✓ What are the components of a connection interface?  
✓ Why are chevrons used in the connection interface?  
✓ How is Series Object state visualization preserved with chevrons?  

---

## Governance

**Status**: SYNTHESIZED
**Next Action**: Validate expert capabilities
**Priority**: High
