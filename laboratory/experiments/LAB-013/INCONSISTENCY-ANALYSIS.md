# LAB-013 Inconsistency Analysis

**Generated**: 2026-07-20
**Analyst**: KDE Laboratory

---

## Summary

| Severity | Count |
|----------|-------|
| CRITICAL | 3 |
| HIGH | 2 |
| MEDIUM | 3 |
| LOW | 2 |

---

## CRITICAL INCONSISTENCIES

### INC-001: Second Chance Engine Type

| Location | Claim |
|---------|-------|
| RUN-001, line 53 | "Her **NTR** (Nuclear Thermal Rocket) engine—nicknamed 'the Brick'" |
| RUN-001, spec sheet (line 318-322) | "Propulsion: **Nuclear Salt-Water Rocket (NSWR)**" |

**Analysis**: NTR and NSWR are fundamentally different propulsion systems:
- **NTR** (Nuclear Thermal Rocket): Uses nuclear fission to heat liquid hydrogen, expels through nozzle. Isp ~ 900s. Clean exhaust. Limited by hydrogen storage.
- **NSWR** (Nuclear Salt-Water Rocket): Dissolves uranium salts in water, creates plasma through nuclear reaction. Isp ~ 1000-2000s. Radioactive exhaust. Much more controversial.

**Impact**: HIGH - This changes the entire backstory of the ship, its political implications (NSWR is "technically illegal for civilian use"), and the physics of the mission.

**Resolution**: Must decide if Second Chance was originally NTR (converted) or if it was always NSWR after Tanaka's upgrade. Recommend: Original ship was NTR, upgraded to NSWR for artifact mission.

---

### INC-002: Second Chance Δv Budget

| Location | Value |
|----------|-------|
| RUN-001, Δv calculation | **5,100 m/s** (5.1 km/s) |
| RUN-001, spec sheet | **12 km/s** |

**Analysis**: The Δv calculation is mathematically correct:
- Ve = 8,000 m/s (NSWR)
- Mass ratio = 340,000 / 180,000 = 1.89
- ln(1.89) = 0.636
- Δv = 8,000 × 0.636 = **5,100 m/s**

But the spec sheet claims 12 km/s. This is a **129% discrepancy**.

**Physics Check**: For Δv = 12 km/s with Ve = 8,000 m/s:
- Required ln(m0/mf) = 12,000 / 8,000 = 1.5
- Required mass ratio = e^1.5 = **4.48**
- For dry mass 180t, fuel mass would need to be 180 × 3.48 = **627t**
- Total wet mass = **807t**, fuel fraction = **77.7%**

This fuel fraction is barely achievable for chemical rockets, impossible for NSWR which requires heavy shielding.

**Resolution**: Correct the spec sheet to say 5.1 km/s, or adjust the Δv calculation to match 12 km/s (with different parameters).

---

### INC-003: Vasquez Scene Logic

| Location | Context |
|----------|---------|
| RUN-002 character profile | "By 2247, Elena commands the **MFV Ironclad**" |
| RUN-003 Chapter 11 scene | Vasquez is **aboard the Lightfall** with Maya |
| RUN-003 line | "That's the *Olympus.*" Vasquez's recognition was immediate. "**My old command.**" |

**Analysis**: In the asteroid combat scene, Vasquez is physically on the Lightfall (giving orders, recognizing ships). But she also references the Ironclad and Olympus as if she's not commanding them.

The problem: She can't be commanding the Ironclad while also being on the Lightfall with Maya.

**Scene Text**: "Captain Vasquez, take the *Ironclad* on an intercept vector."

This implies she's NOT on the Ironclad. But the character profile says she commands it.

**Resolution**: Clarify whether Vasquez:
1. Commands the Ironclad remotely (unlikely for a military commander)
2. Has transferred to the Lightfall (needs explanation)
3. Was temporarily assigned to the ISD mission

---

## HIGH INCONSISTENCIES

### INC-004: Lightfall Engine Type

| Location | Claim |
|----------|-------|
| RUN-002 (Chapter 9) | "a modified **NTR** scout" |
| RUN-003 line 44 | "her **NTR** engine burning bright" |
| Evidence/references.md Mission 4 | "Propulsion: **NSWR** (Uranium)" |

**Analysis**: Three different sources claim different propulsion types for Lightfall.

**Resolution**: Recommend Lightfall uses **NSWR** to match its role as a "fast scout" for outer system missions. Remove NTR references, or clarify NTR was initial design, later upgraded.

---

### INC-005: Lightfall Mass

| Location | Value |
|----------|-------|
| Evidence/references.md Mission 4 | "Mass: **400t** loaded" |
| RUN-003 mentions | Never explicitly stated in narrative |

**Analysis**: Mass is only specified in evidence appendix, never in narrative. This makes it difficult to verify physics calculations.

**Resolution**: Add Lightfall mass specification to scene drafts for consistency.

---

## MEDIUM INCONSISTENCIES

### INC-006: Second Chance Acceleration Values

| Location | Value |
|----------|-------|
| RUN-001 line 53 (original) | "0.003g acceleration" (NTR) |
| RUN-001 spec sheet (upgraded) | "Max Acceleration: **0.02g** (sustained)" |

**Analysis**: 0.003g is extremely low. For reference:
- Space Shuttle: 0.3g at launch
- NTR theoretical: 0.01-0.02g
- Chemical rockets: 0.5-1g

0.003g is lower than typical ion propulsion. This seems unrealistic for NTR.

**Resolution**: Either increase the NTR acceleration to 0.01g, or change to ion propulsion for the original configuration.

---

### INC-007: Communication Range Inconsistency

| Location | Claim |
|----------|-------|
| RUN-002 Chapter 9 | "You'll be beyond communication range for **months**" |
| RUN-002 earlier | General comms delay mentioned but no specific "months" claim |

**Analysis**: Communication in the solar system is limited by light speed, but never truly "beyond range" for months. Even at Jupiter (40+ AU), round-trip light time is ~11 hours.

**Resolution**: Clarify whether this means "practical communication bandwidth" or "real-time comms impossible." Months is unrealistic for any solar system location.

---

### INC-008: Prometheus Generation Ship Timeline

| Location | Claim |
|----------|-------|
| RUN-002 character profile | Director Tanaka "born on the *Prometheus* during its **sixty-year** voyage" |
| RUN-002 | Tanaka age at Book One: **91** (effective: 73) |
| RUN-001 line 87 | "*Prometheus* during its sixty-year voyage from the homeworld" |

**Analysis**: The Prometheus voyage was 60 years. Tanaka was born during the voyage. But her age of 91 at Book One (2247) suggests she was born in ~2156.

If the Prometheus launched around 2096 and arrived ~2156 (60 years), and she was born during transit, her age works. But where did the ship launch from? Earth in ~2096 is plausible.

**Resolution**: Timeline is internally consistent, but needs explicit dates for Prometheus launch and arrival.

---

## LOW INCONSISTENCIES

### INC-009: Maya's Ship Ownership

| Location | Claim |
|----------|-------|
| RUN-002 | "She bought the *Second Chance* with her savings" |
| RUN-001 line 117 | "Maya's *Second Chance* wasn't designed for..." |

**Analysis**: Minor, but "wasn't designed" implies a factory-new vessel, not a purchase of an existing used ship. Either she bought it new (unlikely for salvage ops) or "wasn't designed" should be "wasn't intended."

**Resolution**: Change "wasn't designed for" to "wasn't intended for."

---

### INC-010: Time Jump Duration

| Location | Value |
|----------|-------|
| experiment.md Book 3 | "**Seven-year** time jump" |
| RUN-002 closing scene | Set in **2259 CE** (Book One is 2247-2249) |

**Analysis**: 2249 to 2259 is 10 years, not 7 years.

**Resolution**: Either change Book 3 premise to "ten-year time jump" or adjust the closing scene date to 2256.

---

## VERIFIED CONSISTENT ELEMENTS

### Character Ages (Verified)
| Character | Born | Age in 2247 | Source |
|-----------|------|------------|--------|
| Maya | 2224 | 23 | RUN-002 |
| Jin | 2221 | 26 | RUN-002 |
| Tanaka | 2156 | 91 | RUN-002 |
| Volkov | 2178 | 69 | RUN-002 |
| Okonkwo | 2201 | 46 | RUN-002 |
| Vasquez | 2215 | 32 | RUN-002 |

✅ **All ages are internally consistent** (mathematically correct)

### Political Factions (Verified)
| Faction | Territory | Consistent |
|---------|-----------|------------|
| Earth-Luna Hegemony | Earth, Moon, L-points | ✅ |
| Martian Commonwealth | Mars, Phobos, Deimos | ✅ |
| Belt Conglomerate | Main Belt | ✅ |
| Venus Atmospheric Union | Venus clouds | ✅ |

### Spacecraft Classes (Partially Verified)
| Ship | Class | Consistent |
|------|-------|------------|
| ISD Prometheus | Pathfinder | ✅ |
| MFV Ironclad | Corvette | ✅ |
| EHF Sovereign | Cruiser | ✅ |

---

## RECOMMENDED FIXES

### Priority 1 (Must Fix Before Publication)

1. **INC-001**: Resolve Second Chance engine type - Original NTR, upgraded to NSWR
2. **INC-002**: Correct Δv to 5.1 km/s or recalculate with proper parameters
3. **INC-003**: Clarify Vasquez's position (Lightfall vs Ironclad command)

### Priority 2 (Should Fix)

4. **INC-004**: Resolve Lightfall engine - NSWR for outer system missions
5. **INC-006**: Increase Second Chance original acceleration to realistic NTR values
6. **INC-010**: Correct time jump to 10 years (or adjust dates)

### Priority 3 (Nice to Have)

7. **INC-005**: Add explicit Lightfall mass in narrative
8. **INC-007**: Clarify communication range claims
9. **INC-008**: Add explicit Prometheus launch/arrival dates
10. **INC-009**: Minor phrasing fix for ship design

---

## PHYSICS VALIDATION

### What Works ✅

1. **Tsiolkovsky Equation**: Correctly applied in Δv calculation
2. **Orbital Mechanics**: Hohmann transfers referenced correctly
3. **Time Dilation**: Acknowledged but minimal at stated velocities
4. **Kinetic Weapons**: Energy calculations are roughly correct (1.2 tons TNT = ~5 billion joules)
5. **Laser Physics**: Basic principles correct (diffraction limits, thermal damage)

### Physics Concerns ⚠️

1. **Δv Budget (INC-002)**: The stated 12 km/s doesn't match calculation
2. **Acceleration Values**: 0.003g for NTR is unrealistically low
3. **Communication Delays**: "Months beyond range" is unrealistic for solar system

---

## CONCLUSION

LAB-013 contains **3 critical inconsistencies** that must be resolved before the novel can be considered internally consistent. The core narrative, character arcs, and political world-building are sound. The physics framework is mostly correct but has calculation errors.

**Recommendation**: Focus on resolving propulsion system inconsistencies (INC-001, INC-002, INC-004) as these affect multiple story elements. The scene logic issue (INC-003) requires clarifying Vasquez's role in the narrative.
