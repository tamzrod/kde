# Engineering Relationship Taxonomy

**Source**: KDE-EXPERT-SLD-002
**Date**: 2026-07-23
**Status**: COMPLETE

---

## Overview

This taxonomy defines all engineering relationships between validated SLD primitive symbols. Relationships are organized by category and include semantic meaning, constraints, and evidence.

---

## Category: Electrical (ELEC)

### ELEC-01: Upstream Connection

| Property | Value |
|----------|-------|
| **Code** | ELEC-01 |
| **Name** | Upstream Connection |
| **Meaning** | Component receives power from upstream source |
| **Directionality** | Unidirectional (power flows from source to load) |
| **Applicable Symbols** | CB, DS, ES, BUS, CON |
| **Constraint** | Every component except ground must have upstream connection |
| **Mandatory** | YES |
| **Evidence** | Canonical feeder assembly: BUS → DS → CB → ES → DS → CON |
| **Confidence** | 95% |

**Example**:
```
BUS (upstream) → DS (downstream)
```

---

### ELEC-02: Downstream Connection

| Property | Value |
|----------|-------|
| **Code** | ELEC-02 |
| **Name** | Downstream Connection |
| **Meaning** | Component feeds power to downstream load |
| **Directionality** | Unidirectional |
| **Applicable Symbols** | CB, DS, ES, BUS, CON |
| **Constraint** | Every component except external line must have downstream connection |
| **Mandatory** | YES |
| **Evidence** | Feeder path continues to outgoing line |
| **Confidence** | 95% |

---

### ELEC-03: Series Connection

| Property | Value |
|----------|-------|
| **Code** | ELEC-03 |
| **Name** | Series Connection |
| **Meaning** | Components connected in electrical series (same current path) |
| **Directionality** | Bidirectional (power can flow either direction) |
| **Applicable Symbols** | DS, CB, ES |
| **Constraint** | Series components must all pass same current |
| **Mandatory** | YES |
| **Evidence** | DS–CB–ES pattern in feeder assembly |
| **Confidence** | 95% |

**Example**:
```
DS (Series) → CB (Series) → ES (Series)
```

---

### ELEC-04: Parallel Connection

| Property | Value |
|----------|-------|
| **Code** | ELEC-04 |
| **Name** | Parallel Connection |
| **Meaning** | Components share same voltage level, different current paths |
| **Directionality** | Bidirectional |
| **Applicable Symbols** | BUS, CON |
| **Constraint** | Parallel branches must have same voltage |
| **Mandatory** | CONTEXT |
| **Evidence** | Multiple feeders connected to same bus |
| **Confidence** | 90% |

---

### ELEC-05: Ground Connection

| Property | Value |
|----------|-------|
| **Code** | ELEC-05 |
| **Name** | Ground Connection |
| **Meaning** | Component is connected to earth reference |
| **Directionality** | Unidirectional (to ground) |
| **Applicable Symbols** | ES, GND |
| **Constraint** | ES when CLOSED creates ground connection |
| **Mandatory** | YES (when ES closed) |
| **Evidence** | ES symbol includes ground symbol |
| **Confidence** | 95% |

---

## Category: Functional (FUNC)

### FUNC-01: Source Function

| Property | Value |
|----------|-------|
| **Code** | FUNC-01 |
| **Name** | Source Function |
| **Meaning** | Component provides power to the system |
| **Directionality** | Non-directional |
| **Applicable Symbols** | BUS, XFMR |
| **Constraint** | System must have at least one source |
| **Mandatory** | YES |
| **Evidence** | Busbar represents voltage source |
| **Confidence** | 95% |

---

### FUNC-02: Load Function

| Property | Value |
|----------|-------|
| **Code** | FUNC-02 |
| **Name** | Load Function |
| **Meaning** | Component consumes power |
| **Directionality** | Non-directional |
| **Applicable Symbols** | CON (to external load) |
| **Constraint** | Feeder must eventually reach a load |
| **Mandatory** | CONTEXT |
| **Evidence** | Outgoing line represents load connection |
| **Confidence** | 85% |

---

### FUNC-03: Switching Function

| Property | Value |
|----------|-------|
| **Code** | FUNC-03 |
| **Name** | Switching Function |
| **Meaning** | Component can interrupt current flow |
| **Directionality** | Non-directional |
| **Applicable Symbols** | CB, DS |
| **Constraint** | Only CB and DS have switching capability |
| **Mandatory** | YES (for CB, DS) |
| **Evidence** | State changes affect power flow |
| **Confidence** | 95% |

---

### FUNC-04: Protection Function

| Property | Value |
|----------|-------|
| **Code** | FUNC-04 |
| **Name** | Protection Function |
| **Meaning** | Component provides fault protection |
| **Directionality** | Non-directional |
| **Applicable Symbols** | CB, FUSE, RECLOSER |
| **Constraint** | CB provides primary protection |
| **Mandatory** | YES (for CB) |
| **Evidence** | CB is primary protection in feeder assembly |
| **Confidence** | 95% |

---

## Category: Protection (PROT)

### PROT-01: Protected By

| Property | Value |
|----------|-------|
| **Code** | PROT-01 |
| **Name** | Protected By |
| **Meaning** | Component is protected by upstream protective device |
| **Directionality** | Upstream protective device protects downstream load |
| **Applicable Symbols** | DS, ES, CON |
| **Constraint** | Load must be protected by CB |
| **Mandatory** | YES |
| **Evidence** | Feeder assembly: CB protects DS and downstream |
| **Confidence** | 95% |

---

### PROT-02: Protects

| Property | Value |
|----------|-------|
| **Code** | PROT-02 |
| **Name** | Protects |
| **Meaning** | Protective device guards against faults on downstream |
| **Directionality** | Upstream device protects downstream |
| **Applicable Symbols** | CB, FUSE, RECLOSER |
| **Constraint** | Protective device must be upstream of protected load |
| **Mandatory** | YES (for CB) |
| **Evidence** | CB at upstream position protects entire feeder |
| **Confidence** | 95% |

---

### PROT-03: Isolation For

| Property | Value |
|----------|-------|
| **Code** | PROT-03 |
| **Name** | Isolation For |
| **Meaning** | DS isolates CB for safe maintenance |
| **Directionality** | DS upstream of CB enables CB isolation |
| **Applicable Symbols** | DS |
| **Constraint** | DS_TOP isolates CB for maintenance |
| **Mandatory** | RECOMMENDED |
| **Evidence** | DS_TOP is immediately upstream of CB |
| **Confidence** | 90% |

---

## Category: Isolation (ISOL)

### ISOL-01: Upstream Isolation

| Property | Value |
|----------|-------|
| **Code** | ISOL-01 |
| **Name** | Upstream Isolation |
| **Meaning** | DS upstream of CB creates isolation zone |
| **Directionality** | DS → CB |
| **Applicable Symbols** | DS, CB |
| **Constraint** | CB maintenance requires upstream DS open |
| **Mandatory** | RECOMMENDED |
| **Evidence** | DS_TOP isolates CB |
| **Confidence** | 90% |

---

### ISOL-02: Downstream Isolation

| Property | Value |
|----------|-------|
| **Code** | ISOL-02 |
| **Name** | Downstream Isolation |
| **Meaning** | DS downstream isolates line for maintenance |
| **Directionality** | CB → DS |
| **Applicable Symbols** | CB, DS |
| **Constraint** | Line maintenance requires CB open first, then DS |
| **Mandatory** | RECOMMENDED |
| **Evidence** | DS_BOTTOM isolates outgoing line |
| **Confidence** | 90% |

---

### ISOL-03: Ground For Work

| Property | Value |
|----------|-------|
| **Code** | ISOL-03 |
| **Name** | Ground For Work |
| **Meaning** | ES provides grounding for safe work |
| **Directionality** | ES connects to ground when closed |
| **Applicable Symbols** | ES |
| **Constraint** | ES grounds conductor for worker safety |
| **Mandatory** | CONTEXT |
| **Evidence** | ES is CLOSED when line is grounded for work |
| **Confidence** | 95% |

---

## Category: Measurement (MEAS)

### MEAS-01: Voltage Measurement

| Property | Value |
|----------|-------|
| **Code** | MEAS-01 |
| **Name** | Voltage Measurement |
| **Meaning** | Component has associated voltage measurement |
| **Directionality** | Non-directional |
| **Applicable Symbols** | BUS, CB, DS |
| **Constraint** | Voltage measurement is typical for major equipment |
| **Mandatory** | NO |
| **Evidence** | Bus voltage displayed on SLD |
| **Confidence** | 80% |

---

### MEAS-02: Current Measurement

| Property | Value |
|----------|-------|
| **Code** | MEAS-02 |
| **Name** | Current Measurement |
| **Meaning** | Component has associated current measurement |
| **Directionality** | Non-directional |
| **Applicable Symbols** | CB, CON |
| **Constraint** | Current measurement typically at CB |
| **Mandatory** | NO |
| **Evidence** | MW/MVAR values on conductors |
| **Confidence** | 80% |

---

## Summary Statistics

| Category | Relationships | Confidence |
|----------|--------------|------------|
| Electrical (ELEC) | 5 | 95% |
| Functional (FUNC) | 4 | 93% |
| Protection (PROT) | 3 | 93% |
| Isolation (ISOL) | 3 | 92% |
| Measurement (MEAS) | 2 | 80% |
| **TOTAL** | **17** | **91%** |

---

*Taxonomy complete: 2026-07-23*
