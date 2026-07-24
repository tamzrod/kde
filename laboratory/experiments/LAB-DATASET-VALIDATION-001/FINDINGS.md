# FINDINGS.md - Evidence-Based Findings

**Experiment ID**: LAB-DATASET-VALIDATION-001
**created**: 2026-07-24T12:45:00Z
**modified**: 2026-07-24T14:50:00Z

---

## Summary of Evidence-Based Findings

This document presents findings derived solely from the LA Crime Dataset 2020-2024. Each finding is classified as OBSERVATION, STATISTICAL EVIDENCE, INFERENCE, or HYPOTHESIS.

---

## Temporal Findings

### Finding T1: Crime Frequency by Time of Day

**Classification**: STATISTICAL EVIDENCE

**Evidence**:
- Peak hours: 12:00 (6.7%), 18:00 (6.0%), 17:00 (5.9%)
- Lowest hours: 05:00 (1.7%), 04:00 (1.9%), 03:00 (2.2%)
- Evening/afternoon (12:00-23:59): 66.2% of crimes

**Conclusion**: Crime frequency increases significantly during afternoon and evening hours, peaking around midday and 5-7 PM.

---

### Finding T2: Day of Week Pattern

**Classification**: STATISTICAL EVIDENCE

**Evidence**:
- Friday: 153,663 (15.3%)
- Tuesday: 138,125 (13.7%)
- Range: 13.7% - 15.3% (1.6 percentage points)

**Conclusion**: Crime shows a slight increase on Fridays compared to other days, but the variation is relatively small.

---

### Finding T3: Yearly Crime Trend

**Classification**: OBSERVATION

**Evidence**:
- 2020: 199,847
- 2021: 209,876 (+5.0%)
- 2022: 235,259 (+12.1%)
- 2023: 232,345 (-1.2%)
- 2024: 127,567 (-45.1%)

**HYPOTHESIS H1**: The 2024 data is incomplete due to the dataset's stated archival status (last updated March 2026, covering through December 2024).

**Alternative HYPOTHESIS H2**: There was an actual decrease in crime in 2024.

**Note**: Without additional data, cannot determine which hypothesis is correct.

---

## Crime Type Findings

### Finding C1: Property Crime Dominance

**Classification**: STATISTICAL EVIDENCE

**Evidence**:
- Vehicle Stolen: 115,184 (11.5%)
- Burglary from Vehicle: 63,515 (6.3%)
- Theft of Identity: 62,536 (6.2%)
- Burglary: 57,871 (5.8%)
- Property crimes total: 340,658 (33.9%)

**Conclusion**: Property crimes constitute the largest category of reported crimes, with vehicle-related theft being the most common.

---

### Finding C2: Violence Rate

**Classification**: STATISTICAL EVIDENCE

**Evidence**:
- Assault with Deadly Weapon: 53,523 (5.3%)
- Battery - Simple Assault: 74,821 (7.4%)
- Violent crimes total: 174,056 (17.3%)
- Weapon used: 32.6% of all crimes
- Strong-arm only: 17.4%

**Conclusion**: While violent crimes represent 17.3% of total crimes, most violence does not involve weapons.

---

### Finding C3: Identity Theft Prevalence

**Classification**: STATISTICAL EVIDENCE

**Evidence**:
- Theft of Identity: 62,536 (6.2%)
- Rank: 4th most common crime
- Victims tend to be older (mean age 41.7)

**Conclusion**: Identity theft is a significant crime category, particularly affecting older adults.

---

## Victim Demographics Findings

### Finding D1: Victim Age Distribution

**Classification**: STATISTICAL EVIDENCE

**Evidence**:
- Age 26-35: 207,929 (20.7%)
- Age 36-45: 152,874 (15.2%)
- Age 18-25: 114,070 (11.4%)
- Total 18-45: 474,873 (47.3%)

**Conclusion**: Adults aged 18-45 constitute the majority of identified crime victims.

---

### Finding D2: Unknown Victim Data

**Classification**: OBSERVATION

**Evidence**:
- Age = 0: 269,178 (26.8%)
- Sex unknown: 144,631 (14.4%)
- Descent unknown: 144,643 (14.4%)

**Conclusion**: A significant portion of records lack victim demographic information.

---

### Finding D3: Vehicle Crime Victim Gap

**Classification**: OBSERVATION

**Evidence**:
- Vehicle Stolen: 115,184 records
- Age = 0: 114,837 (99.7%)
- Valid age data: 346 (0.3%)

**HYPOTHESIS H3**: Vehicle Stolen crimes often lack victim data because the crime targets property rather than persons, and vehicle owner information may be obtained from DMV records rather than victim statements.

---

## Geographic Findings

### Finding G1: Crime Distribution by Area

**Classification**: STATISTICAL EVIDENCE

**Evidence**:
- Central (downtown): 69,668 (6.9%)
- 77th Street: 61,756 (6.1%)
- Pacific: 59,513 (5.9%)
- Range: 6.9% to 4.8%

**Conclusion**: Crime is not uniformly distributed; downtown and south/central LA areas show higher crime concentrations.

---

### Finding G2: Geographic Coordinate Anomalies

**Classification**: OBSERVATION

**Evidence**:
- Coordinates (0, 0): 2,240 records (0.2%)
- Cross Street available: 15.3%

**Conclusion**: A small percentage of records lack valid geographic coordinates.

---

## Weapon Findings

### Finding W1: Weapon Prevalence

**Classification**: STATISTICAL EVIDENCE

**Evidence**:
- Weapon used: 327,216 (32.6%)
- No weapon: 677,678 (67.4%)
- Strong-arm (physical force): 174,739 (17.4%)

**Conclusion**: Two-thirds of crimes do not involve a weapon; when weapons are used, physical force is most common.

---

### Finding W2: Firearm Usage

**Classification**: STATISTICAL EVIDENCE

**Evidence**:
- Hand gun: 20,182 (2.0%)
- Semi-automatic pistol: 7,267 (0.7%)
- Unknown firearm: 6,582 (0.7%)
- Firearms total: ~34,031 (3.4% of all crimes)

**Conclusion**: Firearms are used in approximately 3.4% of all reported crimes.

---

## Hypotheses Generated

### Hypothesis H4: Crime Time Pattern

**Statement**: Crime increases during times when people are most likely to be away from home (midday, evening commute).

**Evidence Support**:
- Peak at 12:00 and 17:00-18:00
- Lowest in early morning (03:00-05:00)

**Alternative Explanation**: Police reporting patterns may influence recorded times.

---

### Hypothesis H5: Property Crime Victim Demographics

**Statement**: Property crimes have higher rates of unknown victim data because property crimes may be reported without direct victim involvement (e.g., security cameras, neighbor reports).

**Evidence Support**:
- Vehicle Stolen: 99.7% unknown age
- Identity Theft: 1.8% unknown age

---

### Hypothesis H6: Area Crime Concentration

**Statement**: Higher crime in certain areas is correlated with population density and commercial activity.

**Evidence Support**:
- Central (downtown): highest crime
- Less urban areas: lower crime

**Cannot Determine**: Causation requires additional demographic and environmental data.

---

## Dataset Limitations

### Limitation L1: Temporal Incompleteness

The 2024 data appears incomplete based on the significant drop in record count compared to prior years.

---

### Limitation L2: Missing Victim Data

Over 25% of records have unknown victim age, limiting demographic analysis.

---

### Limitation L3: Manual Data Entry

The dataset was transcribed from paper reports, which may introduce errors.

---

### Limitation L4: Causation Gap

This dataset shows correlations but cannot establish causation without additional contextual data (economic indicators, police presence, demographics, etc.).

---

## Conclusions

### Confirmed Findings

1. **Temporal patterns exist** in crime frequency by hour and day
2. **Property crimes dominate** LA crime reports
3. **Adults 18-45** are most frequently victimized
4. **Downtown areas** have highest crime concentrations
5. **Most crimes involve no weapon** or only physical force

### Unable to Confirm

1. Causes of crime patterns
2. Effectiveness of law enforcement interventions
3. Impact of socioeconomic factors
4. Year-over-year trend accuracy (2024 data issue)

---

**Findings Status**: COMPLETE
**Confidence Level**: HIGH for statistical evidence, MEDIUM for inferences
