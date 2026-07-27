# ANALYSIS.md - Statistical Analysis of Crime Data

**Experiment ID**: LAB-DATASET-VALIDATION-001
**created**: 2026-07-24T12:40:00Z
**modified**: 2026-07-24T14:45:00Z

---

## Table of Contents

1. [Temporal Pattern Analysis](#1-temporal-pattern-analysis)
2. [Crime Type Analysis](#2-crime-type-analysis)
3. [Victim Demographics Analysis](#3-victim-demographics-analysis)
4. [Geographic Analysis](#4-geographic-analysis)
5. [Weapon Analysis](#5-weapon-analysis)
6. [Statistical Relationships](#6-statistical-relationships)

---

## 1. Temporal Pattern Analysis

### 1.1 Crime by Year

| Year | Records | Percentage | YoY Change |
|------|---------|------------|------------|
| 2020 | 199,847 | 19.9% | — |
| 2021 | 209,876 | 20.9% | +5.0% |
| 2022 | 235,259 | 23.4% | +12.1% |
| 2023 | 232,345 | 23.1% | -1.2% |
| 2024 | 127,567 | 12.7% | -45.1% |

**OBS-004**: Year-over-year growth from 2020-2022 (+17.7% cumulative)
**OBS-005**: Slight decline in 2023 (-1.2%)
**OBS-006**: 2024 shows dramatic decline (-45.1% vs 2023)
**INFERENCE**: 2024 data is incomplete, not representative of actual crime levels

### 1.2 Crime by Month

| Month | Records | Percentage |
|-------|---------|------------|
| January | 92,675 | 9.2% |
| February | 86,357 | 8.6% |
| March | 87,794 | 8.7% |
| April | 83,517 | 8.3% |
| May | 83,011 | 8.3% |
| June | 81,382 | 8.1% |
| July | 83,962 | 8.4% |
| August | 83,850 | 8.3% |
| September | 81,015 | 8.1% |
| October | 84,127 | 8.4% |
| November | 78,978 | 7.9% |
| December | 78,226 | 7.8% |

**OBS-007**: January has highest crime count (9.2%)
**OBS-008**: December has lowest crime count (7.8%)
**OBS-009**: Monthly variation is small (7.8% - 9.2%)
**INFERENCE**: Crime is relatively evenly distributed across months

### 1.3 Crime by Day of Week

| Day | Records | Percentage |
|-----|---------|------------|
| Monday | 141,532 | 14.1% |
| Tuesday | 138,125 | 13.7% |
| Wednesday | 142,688 | 14.2% |
| Thursday | 141,792 | 14.1% |
| Friday | 153,663 | 15.3% |
| Saturday | 147,457 | 14.7% |
| Sunday | 139,637 | 13.9% |

**OBS-010**: Friday has highest crime count (15.3%)
**OBS-011**: Tuesday has lowest crime count (13.7%)
**INFERENCE**: Slight weekend/weekday pattern exists

### 1.4 Crime by Hour

| Time Period | Records | Percentage |
|-------------|---------|------------|
| 00:00-05:59 | 153,675 | 15.3% |
| 06:00-11:59 | 186,210 | 18.5% |
| 12:00-17:59 | 274,451 | 27.3% |
| 18:00-23:59 | 390,558 | 38.9% |

**OBS-012**: Peak crime hours: 12:00 (6.7%), 18:00 (6.0%), 17:00 (5.9%)
**OBS-013**: Lowest crime hours: 05:00 (1.7%), 04:00 (1.9%), 03:00 (2.2%)
**INFERENCE**: Crime increases during afternoon/evening hours
**CORRELATION**: Peak hours coincide with typical work/school release times

---

## 2. Crime Type Analysis

### 2.1 Top 10 Crime Types

| Rank | Crime Type | Count | Percentage |
|------|-----------|-------|------------|
| 1 | Vehicle - Stolen | 115,184 | 11.5% |
| 2 | Battery - Simple Assault | 74,821 | 7.4% |
| 3 | Burglary from Vehicle | 63,515 | 6.3% |
| 4 | Theft of Identity | 62,536 | 6.2% |
| 5 | Vandalism - Felony | 61,086 | 6.1% |
| 6 | Burglary | 57,871 | 5.8% |
| 7 | Theft Plain - Petty | 53,716 | 5.3% |
| 8 | Assault with Deadly Weapon | 53,523 | 5.3% |
| 9 | Intimate Partner - Simple Assault | 46,712 | 4.6% |
| 10 | Theft from Motor Vehicle | 41,311 | 4.1% |

**OBS-014**: Property crimes dominate (Vehicle Stolen, Burglary, Theft = 33.9%)
**OBS-015**: Violent crimes represent significant portion (Assault, Battery = 17.3%)
**OBS-016**: Identity theft is 4th most common crime (6.2%)

### 2.2 Property vs Violent Crime

| Category | Count | Percentage |
|----------|-------|------------|
| **Property Crimes** | 340,658 | 33.9% |
| **Violent Crimes** | 174,056 | 17.3% |
| Other | 490,180 | 48.8% |

**OBS-017**: Property crimes are nearly 2x more common than violent crimes

---

## 3. Victim Demographics Analysis

### 3.1 Victim Age Distribution

| Age Group | Count | Percentage |
|-----------|-------|------------|
| 0-17 | 25,566 | 2.5% |
| 18-25 | 114,070 | 11.4% |
| 26-35 | 207,929 | 20.7% |
| 36-45 | 152,874 | 15.2% |
| 46-55 | 109,753 | 10.9% |
| 56-65 | 75,667 | 7.5% |
| 65+ | 49,720 | 4.9% |
| Unknown (0) | 269,178 | 26.8% |

**OBS-018**: Peak victim age group: 26-35 (20.7%)
**OBS-019**: Teenagers (0-17) least represented (2.5%)
**OBS-020**: 26.8% have unknown age (Age = 0)
**INFERENCE**: Adults 26-45 are most frequently victimized

### 3.2 Victim Sex Distribution

| Sex | Count | Percentage |
|-----|-------|------------|
| Male (M) | 403,842 | 40.2% |
| Female (F) | 358,553 | 35.7% |
| Unknown (X) | 97,753 | 9.7% |
| Unknown (?) | 144,631 | 14.4% |

**OBS-021**: Males slightly more likely to be victims (40.2% vs 35.7%)
**OBS-022**: Sex unknown for 24.1% of records

### 3.3 Victim Descent Distribution

| Code | Description | Count | Percentage |
|------|-------------|-------|------------|
| H | Hispanic/Latino | 296,370 | 29.5% |
| W | White | 201,429 | 20.0% |
| B | Black | 135,809 | 13.5% |
| X | Unknown | 106,661 | 10.6% |
| O | Other | 78,001 | 7.8% |
| A | Asian | 21,338 | 2.1% |

**OBS-023**: Hispanic/Latino victims most common (29.5%)
**OBS-024**: LA population demographics may explain distribution
**CORRELATION**: Victim descent reflects LA demographic composition

---

## 4. Geographic Analysis

### 4.1 Crime by LAPD Area

| Area | Records | Percentage |
|------|---------|------------|
| Central | 69,668 | 6.9% |
| 77th Street | 61,756 | 6.1% |
| Pacific | 59,513 | 5.9% |
| Southwest | 57,434 | 5.7% |
| Hollywood | 52,429 | 5.2% |
| N Hollywood | 51,106 | 5.1% |
| Olympic | 50,070 | 5.0% |
| Southeast | 49,929 | 5.0% |
| Newton | 49,173 | 4.9% |
| Wilshire | 48,237 | 4.8% |

**OBS-025**: Central (downtown) has highest crime (6.9%)
**OBS-026**: Wide variation across areas (4.8% - 6.9%)
**INFERENCE**: Urban density and commercial activity drive crime location

---

## 5. Weapon Analysis

### 5.1 Weapon Usage Rate

| Metric | Value |
|--------|-------|
| Records with weapon | 327,216 |
| Percentage | 32.6% |
| No weapon recorded | 677,678 |

**OBS-027**: 32.6% of crimes involve a weapon

### 5.2 Top 10 Weapons Used

| Weapon | Count | Percentage |
|--------|-------|------------|
| Strong-arm (hands, feet) | 174,739 | 17.4% |
| Unknown weapon | 36,387 | 3.6% |
| Verbal threat | 23,842 | 2.4% |
| Hand gun | 20,182 | 2.0% |
| Semi-automatic pistol | 7,267 | 0.7% |
| Knife (< 6 inch) | 6,837 | 0.7% |
| Unknown firearm | 6,582 | 0.7% |
| Other knife | 5,879 | 0.6% |
| Mace/pepper spray | 3,730 | 0.4% |
| Vehicle | 3,260 | 0.3% |

**OBS-028**: Strong-arm (physical force) most common weapon (17.4%)
**OBS-029**: Firearms represent 4.1% of weapons (hand guns, semi-autos, unknown)
**OBS-030**: Knives represent 1.3% of weapons
**INFERENCE**: Most crimes use no weapon or physical force only

---

## 6. Statistical Relationships

### 6.1 Crime Type by Victim Age

| Crime Type | Mean Age | Median Age |
|------------|----------|------------|
| Vehicle - Stolen | 41.2* | 38* |
| Battery - Simple Assault | 40.5 | 38 |
| Burglary from Vehicle | 38.2 | 35 |
| Theft of Identity | 41.7 | 38 |
| Vandalism - Felony | 41.3 | 39 |

*Note: 99.7% of Vehicle Stolen records have Age = 0 (excluded from calculation)

**OBS-031**: Identity theft victims tend to be older (mean 41.7)
**OBS-032**: Vehicle burglary victims tend to be younger (mean 38.2)
**CORRELATION**: Crime type varies with victim age

### 6.2 Crime Type by Victim Sex

| Crime Type | Male % | Female % |
|------------|--------|----------|
| Battery - Simple Assault | 52.4% | 47.0% |
| Burglary from Vehicle | 55.7% | 41.8% |

**OBS-033**: Males more likely victims of vehicle-related crimes
**OBS-034**: Assault shows more gender balance

---

## Key Statistical Findings

### Significant Correlations

| Finding | Correlation | Direction |
|---------|-------------|-----------|
| Time of day vs Crime | Moderate | Afternoon/evening higher |
| Day of week vs Crime | Weak | Friday highest |
| Month vs Crime | Very Weak | Minimal variation |
| Victim age vs Crime | Moderate | 26-45 most common |
| LAPD area vs Crime | Moderate | Urban areas higher |

### Causation vs Correlation Assessment

**CORRELATION, NOT CAUSATION**:
- Time of day and crime frequency
- LAPD area and crime count
- Victim demographics and crime type

**CANNOT DETERMINE CAUSATION** from this data alone:
- Why certain areas have more crime
- Why certain demographics are more affected
- Why crime varies by time of day

---

**Analysis Status**: COMPLETE
