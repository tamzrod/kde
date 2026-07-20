# World Artifact: LAB-014

**Source**: LAB-013 (Interplanetary Sci-Fi Novel)
**Type**: Canonical Fact Snapshot
**Created**: 2026-07-20
**Purpose**: Single source of truth for all run analyses

---

## CANONICAL CHARACTER FACTS

### Primary Characters

| ID | Name | Born | Age in 2247 | Origin | Role | Source |
|----|------|------|-------------|--------|------|--------|
| CHR-001 | Maya Chen-Reyes | 2224 CE | 23 | Mars (New Chicago) | Salvage pilot, protagonist | RUN-002 |
| CHR-002 | Jin Reyes | 2221 CE | 26 | Luna | Martian Intelligence | RUN-002 |
| CHR-003 | Director Yuki Tanaka | 2156 CE | 91 | GenShip Prometheus | ISD Director | RUN-002 |
| CHR-004 | Admiral Sarah Volkov | 2178 CE | 69 | Earth (Siberian) | Earth Fleet Commander | RUN-002 |
| CHR-005 | Dr. Yusuf Okonkwo | 2201 CE | 46 | Venus (Cytherean Dream) | Linguist | RUN-002 |
| CHR-006 | Captain Elena Vasquez | 2215 CE | 32 | Mars (Olympus City) | Military Commander | RUN-002 |

---

## CANONICAL SPACECRAFT FACTS

### ISS Second Chance (Maya's Ship)

| ID | Attribute | Value | Source |
|----|-----------|-------|--------|
| SCF-001 | Type | Salvage Tug | RUN-001 |
| SCF-002 | Original Type | Ore Hauler | RUN-001 |
| SCF-003 | Mass | 340 metric tons | RUN-001 |
| SCF-004 | Crew | 4 (Maya, copilot, navigator, engineer) | RUN-001 |
| SCF-005 | Age | 12 years (at story start) | RUN-001 |
| SCF-006 | **ORIGINAL Engine** | NTR (Nuclear Thermal Rocket) | RUN-001:53 |
| SCF-007 | Original Acceleration | 0.003g | RUN-001:53 |
| SCF-008 | Engine Nickname | "The Brick" | RUN-001:53 |
| SCF-009 | **UPGRADED Engine** | NSWR (Nuclear Salt-Water Rocket) | RUN-001:121, spec |
| SCF-010 | Upgraded Acceleration | 0.02g | RUN-001:spec |
| SCF-011 | **Δv Budget (spec)** | 12 km/s | RUN-001:spec |
| SCF-012 | **Δv Budget (calc)** | 5,100 m/s (5.1 km/s) | RUN-001:calc |
| SCF-013 | Fuel Consumed | 40% (at artifact mission) | RUN-001:156 |
| SCF-014 | Transit Time (Belt) | 11 days continuous thrust | RUN-001:156 |
| SCF-015 | Fuel | Enriched uranium saltwater solution | RUN-001:spec |

**⚠️ CONFLICT FLAGGED**: SCF-006 vs SCF-009 (NTR vs NSWR), SCF-011 vs SCF-012 (12 km/s vs 5.1 km/s)

### Lightfall (Maya's Scout Ship)

| ID | Attribute | Value | Source |
|----|-----------|-------|--------|
| SCF-020 | Type | Scout (fast) | RUN-002 |
| SCF-021 | Build | Modified NTR scout | RUN-002 |
| SCF-022 | Builder | Belt shipyards | RUN-002 |
| SCF-023 | Acceleration | 0.08g | RUN-003:44 |
| SCF-024 | **Engine (chapter)** | NTR | RUN-003:44 |
| SCF-025 | **Engine (evidence)** | NSWR | refs |
| SCF-026 | Mass | 400 metric tons (loaded) | refs |
| SCF-027 | Weapons | Twin HEL (High-Energy Lasers) | RUN-003:64 |
| SCF-028 | Command | Maya Chen-Reyes | RUN-003 |

**⚠️ CONFLICT FLAGGED**: SCF-024 vs SCF-025 (NTR vs NSWR)

### MFV Ironclad (Vasquez's Ship)

| ID | Attribute | Value | Source |
|----|-----------|-------|--------|
| SCF-040 | Class | Corvette | experiment |
| SCF-041 | Affiliation | Martian Navy | RUN-002 |
| SCF-042 | Commander | Captain Elena Vasquez | RUN-002 |
| SCF-043 | Status | "Newest and most advanced" in 2247 | RUN-002 |

### EHF Sovereign (Earth Fleet Flagship)

| ID | Attribute | Value | Source |
|----|-----------|-------|--------|
| SCF-050 | Class | Cruiser | RUN-001:spec |
| SCF-051 | Mass | 4,200 metric tons | RUN-001:spec |
| SCF-052 | Crew | 180 | RUN-001:spec |
| SCF-053 | Propulsion | Dual NSWR with chemical maneuvering | RUN-001:spec |
| SCF-054 | Δv Budget | 18 km/s | RUN-001:spec |
| SCF-055 | Armament | Not specified | - |

### ISD Prometheus (Science Vessel)

| ID | Attribute | Value | Source |
|----|-----------|-------|--------|
| SCF-060 | Type | Modified Colony Ship | RUN-001 |
| SCF-061 | Mass | 18,000 metric tons | RUN-001:spec |
| SCF-062 | Crew | 45 (science) + 120 (crew) | RUN-001:spec |
| SCF-063 | Propulsion | NTR | RUN-001 |

---

## CANONICAL PROPULSION SPECIFICATIONS

### Engine Types Referenced

| ID | Type | Isp (sec) | Isp (km/s) | Notes |
|----|------|-----------|------------|-------|
| PRP-001 | Chemical (LOX/LH2) | 450 | 4.4 | Baseline |
| PRP-002 | Nuclear Thermal (NTR) | 900 | 8.8 | Maya's original |
| PRP-003 | Nuclear Salt-Water (NSWR) | 1000-2000 | 9.8-19.6 | Maya's upgrade |
| PRP-004 | Solar Electric (Ion) | 3000-5000 | 29-49 | Station keeping |

### Tsiolkovsky Calculation (Second Chance)

```
Equation: Δv = Ve × ln(m0 / mf)
Variables:
  - Ve = 8,000 m/s (NSWR exhaust velocity)
  - m0 = 340,000 kg (wet mass)
  - mf = 180,000 kg (dry mass after fuel)
  - ln(340/180) = ln(1.889) = 0.636
Calculation:
  - Δv = 8,000 × 0.636 = 5,088 m/s ≈ 5,100 m/s
```

**⚠️ CONFLICT**: Spec sheet says 12 km/s, calculation shows 5.1 km/s

---

## CANONICAL TIMELINE FACTS

### Story Timeline

| ID | Event | Year | Notes | Source |
|----|-------|------|-------|--------|
| TML-001 | Prometheus generation ship launched | ~2096 | From Earth | RUN-002 |
| TML-002 | Prometheus generation ship arrives Mars | ~2156 | 60-year voyage | RUN-002 |
| TML-003 | Tanaka born | 2156 CE | On Prometheus | RUN-002 |
| TML-004 | Jin born | 2221 CE | Luna | RUN-002 |
| TML-005 | Maya born | 2224 CE | Mars (New Chicago) | RUN-002 |
| TML-006 | Vasquez born | 2215 CE | Mars (Olympus City) | RUN-002 |
| TML-007 | Okonkwo born | 2201 CE | Venus | RUN-002 |
| TML-008 | Volkov born | 2178 CE | Earth | RUN-002 |
| TML-009 | Book One Setting | 2247-2249 CE | Alien artifact discovery | experiment |
| TML-010 | Book Two Setting | 2250-2253 CE | First contact | experiment |
| TML-011 | Book Three Setting | 2254-2261 CE | Time jump | experiment |
| TML-012 | **Time Jump Duration (stated)** | 7 years | Book Three premise | experiment |
| TML-013 | **Time Jump Duration (calculated)** | 10 years | 2249→2259 | RUN-002 |

**⚠️ CONFLICT**: TML-012 vs TML-013 (7 years vs 10 years)

---

## CANONICAL POLITICAL FACTS

### Factions

| ID | Faction | Territory | Government | Source |
|----|---------|-----------|------------|--------|
| POL-001 | Earth-Luna Hegemony | Earth, Moon, L-points | Federal Republic | experiment |
| POL-002 | Martian Commonwealth | Mars, Phobos, Deimos | Federal Republic | experiment |
| POL-003 | Belt Conglomerate | Main Belt | Corporate Council | experiment |
| POL-004 | Venus Atmospheric Union | Venus clouds | Syndicate | experiment |

---

## CANONICAL PHYSICS FACTS

### Known Physics Constraints Applied

| ID | Principle | Application | Status |
|----|-----------|-------------|--------|
| PHY-001 | Conservation of Momentum | All thrust requires reaction mass | ✅ Applied |
| PHY-002 | Tsiolkovsky Equation | Δv = Ve × ln(m0/mf) | ✅ Applied |
| PHY-003 | Time Dilation | Mentioned for relativistic travel | ✅ Applied |
| PHY-004 | Light-speed Limit | Communication delays | ✅ Applied |
| PHY-005 | No FTL | Excluded from universe | ✅ Stated |

---

## KNOWN CONFLICTS (Pre-flagged)

| Conflict ID | Type | Items | Source |
|--------------|------|-------|--------|
| CNF-001 | Engine Type | SCF-006 vs SCF-009 (Second Chance) | RUN-001 |
| CNF-002 | Δv Budget | SCF-011 vs SCF-012 (Second Chance) | RUN-001 |
| CNF-003 | Engine Type | SCF-024 vs SCF-025 (Lightfall) | RUN-003 |
| CNF-004 | Vasquez Position | Character profile vs Scene narrative | RUN-002, RUN-003 |
| CNF-005 | Time Jump | 7 years vs 10 years | experiment, RUN-002 |

---

## World Artifact Metadata

| Field | Value |
|-------|-------|
| Artifact ID | WORLD-LAB-014 |
| Source Experiment | LAB-013 |
| Facts Extracted | 60+ canonical facts |
| Conflicts Pre-identified | 5 |
| Last Updated | 2026-07-20 |
