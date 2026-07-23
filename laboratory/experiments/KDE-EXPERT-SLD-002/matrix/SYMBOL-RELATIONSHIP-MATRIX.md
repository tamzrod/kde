# Symbol Relationship Matrix

**Source**: KDE-EXPERT-SLD-002
**Date**: 2026-07-23
**Status**: COMPLETE

---

## Overview

This matrix defines relationships between validated SLD primitives. Each primitive has defined upstream, downstream, peer, and optional relationships.

---

## Primitive: CB (Circuit Breaker)

### CB Relationship Summary

| Relationship | With | Type | Direction | Mandatory | Confidence |
|--------------|------|------|-----------|-----------|------------|
| Upstream Of | DS, ES, CON | ELEC-01 | Upstream | YES | 95% |
| Downstream Of | BUS, DS | ELEC-02 | Downstream | YES | 95% |
| Protected By | (none) | PROT-01 | Upstream | NO | N/A |
| Protects | DS, ES, CON | PROT-02 | Downstream | YES | 95% |
| Isolated By Upstream | DS_TOP | ISOL-01 | Upstream | RECOMMENDED | 90% |
| Isolates Downstream | DS_BOTTOM | ISOL-02 | Downstream | RECOMMENDED | 90% |

### CB Detailed Relationships

#### Upstream Relationships (CB receives power from)

| Source | Relationship | Type | Evidence |
|--------|--------------|------|----------|
| BUS | Direct feed | ELEC-01 | BUS is source |
| DS_TOP | After isolation | ELEC-01 | DS_TOP → CB |

#### Downstream Relationships (CB feeds power to)

| Target | Relationship | Type | Evidence |
|--------|--------------|------|----------|
| DS_BOTTOM | Through ES | ELEC-02 | CB → ES → DS_BOTTOM |
| CON | Outgoing line | ELEC-02 | DS_BOTTOM → CON |

#### Peer Relationships

| Peer | Relationship | Type | Evidence |
|------|--------------|------|----------|
| (none) | N/A | N/A | CB is typically not in parallel |

#### Optional Relationships

| Target | Relationship | Type | Confidence |
|--------|--------------|------|------------|
| MEAS-02 | Current measurement | MEAS-02 | 80% |
| MEAS-01 | Voltage measurement | MEAS-01 | 80% |

---

## Primitive: DS (Disconnect Switch)

### DS Relationship Summary

| Relationship | With | Type | Direction | Mandatory | Confidence |
|--------------|------|------|-----------|-----------|------------|
| Upstream Of | CB, DS, ES, CON | ELEC-01 | Upstream | YES | 95% |
| Downstream Of | BUS, CB, DS | ELEC-02 | Downstream | YES | 95% |
| Series With | CB, ES | ELEC-03 | Bidirectional | YES | 95% |
| Protected By | CB | PROT-01 | Upstream | YES | 95% |
| Isolates For | CB (top), CON (bottom) | PROT-03 | Adjacent | RECOMMENDED | 90% |

### DS Position Variants

#### DS_TOP (Upstream of CB)

| Relationship | Target | Type | Evidence |
|--------------|--------|------|----------|
| Feeds | CB | ELEC-01 | DS_TOP → CB |
| Protected By | (none upstream) | PROT-01 | N/A |
| Isolation For | CB | ISOL-01 | DS_TOP isolates CB |

#### DS_BOTTOM (Downstream of CB)

| Relationship | Target | Type | Evidence |
|--------------|--------|------|----------|
| Receives From | CB/ES | ELEC-02 | CB → ES → DS_BOTTOM |
| Protected By | CB | PROT-01 | CB protects DS_BOTTOM |
| Isolation For | CON | ISOL-02 | DS_BOTTOM isolates CON |

---

## Primitive: ES (Earthing Switch)

### ES Relationship Summary

| Relationship | With | Type | Direction | Mandatory | Confidence |
|--------------|------|------|-----------|-----------|------------|
| Upstream Of | CON | ELEC-01 | Upstream | YES | 85% |
| Downstream Of | CB, DS | ELEC-02 | Downstream | YES | 95% |
| Series With | DS, CB | ELEC-03 | Bidirectional | YES | 95% |
| Branch From | Main Path | ELEC-04 | Branch | YES | 95% |
| Ground Connection | GND | ELEC-05 | To Ground | YES (when CLOSED) | 95% |
| Protected By | CB | PROT-01 | Upstream | YES | 95% |
| Grounds For | Downstream work | ISOL-03 | To Ground | CONTEXT | 95% |

### ES Special Characteristics

| Characteristic | Value | Evidence |
|----------------|-------|----------|
| Is Branch | YES | ES branches from main path, does NOT interrupt |
| Grounds When | CLOSED | ES-CLOSED = grounded |
| Can Energize | NO | ES cannot source power |
| Protection Role | Ground provision | Grounds for safe work |

---

## Primitive: BUS (Busbar)

### BUS Relationship Summary

| Relationship | With | Type | Direction | Mandatory | Confidence |
|--------------|------|------|-----------|-----------|------------|
| Source Of | DS, CB, CON | FUNC-01 | Downstream | YES | 95% |
| Parallel With | Other Buses | ELEC-04 | Parallel | CONTEXT | 90% |
| Feeds | Multiple Feeders | ELEC-02 | Downstream | YES | 95% |
| Voltage Source | All connected | ELEC-01 | Upstream | YES | 95% |

### BUS Connection Rules

| Rule | Description | Evidence |
|------|-------------|----------|
| Single voltage | BUS has one voltage level | 115kV, 69kV, etc. |
| Multiple feeders | BUS can feed multiple feeders | Parallel DS connections |
| Sectioning | BUS can be sectioned | Section gaps |

---

## Primitive: CON (Conductor)

### CON Relationship Summary

| Relationship | With | Type | Direction | Mandatory | Confidence |
|--------------|------|------|-----------|-----------|------------|
| Upstream Of | (external) | ELEC-01 | Upstream | YES | 85% |
| Downstream Of | DS, CB | ELEC-02 | Downstream | YES | 90% |
| Parallel With | Other Lines | ELEC-04 | Parallel | CONTEXT | 80% |
| Protected By | CB | PROT-01 | Upstream | YES | 90% |

### CON Context Variants

| Context | Upstream | Downstream | Evidence |
|---------|----------|------------|----------|
| Feeder end | DS_BOTTOM | External load | Outgoing line |
| Bus connection | BUS | DS_TOP | Incoming line |

---

## Primitive: GND (Ground)

### GND Relationship Summary

| Relationship | With | Type | Direction | Mandatory | Confidence |
|--------------|------|------|-----------|-----------|------------|
| Receives | ES connection | ELEC-05 | From ES | YES | 95% |
| Static | Always | N/A | N/A | YES | 100% |

### GND Characteristics

| Characteristic | Value | Evidence |
|----------------|-------|----------|
| Is Reference | YES | GND is earth reference |
| Can Source | NO | GND cannot source power |
| Can Load | NO | GND grounds, doesn't consume |
| Always Required | NO | Only when ES closed |

---

## Cross-Primitive Summary

### Relationship Count by Primitive

| Primitive | Upstream | Downstream | Peer | Optional | Total |
|-----------|----------|------------|------|----------|-------|
| CB | 2 | 3 | 0 | 2 | 7 |
| DS | 2 | 3 | 2 | 0 | 7 |
| ES | 2 | 2 | 2 | 1 | 7 |
| BUS | 1 | 3 | 1 | 0 | 5 |
| CON | 1 | 1 | 1 | 0 | 3 |
| GND | 1 | 0 | 0 | 0 | 1 |

### Mandatory Relationship Count

| Primitive | Mandatory | Optional | Total | % Mandatory |
|-----------|-----------|----------|-------|-------------|
| CB | 4 | 3 | 7 | 57% |
| DS | 5 | 2 | 7 | 71% |
| ES | 5 | 2 | 7 | 71% |
| BUS | 4 | 1 | 5 | 80% |
| CON | 3 | 0 | 3 | 100% |
| GND | 1 | 0 | 1 | 100% |

---

## Relationship Type Distribution

### By Category

| Category | Count | Percentage |
|----------|-------|------------|
| Electrical (ELEC) | 10 | 43% |
| Functional (FUNC) | 2 | 9% |
| Protection (PROT) | 5 | 22% |
| Isolation (ISOL) | 4 | 17% |
| Measurement (MEAS) | 2 | 9% |
| **TOTAL** | **23** | 100% |

### By Directionality

| Direction | Count | Percentage |
|-----------|-------|------------|
| Upstream | 7 | 30% |
| Downstream | 8 | 35% |
| Bidirectional | 5 | 22% |
| Non-directional | 3 | 13% |

---

*Matrix complete: 2026-07-23*
