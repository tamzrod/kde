# DATASET-REVIEW.md - Crime Data from 2020 to 2024

**Experiment ID**: LAB-DATASET-VALIDATION-001
**created**: 2026-07-24T12:38:00Z
**modified**: 2026-07-24T14:40:00Z

---

## Dataset Information

| Field | Value |
|-------|-------|
| **Dataset Title** | Crime Data from 2020 to 2024 |
| **Source** | Los Angeles Police Department (LAPD) |
| **Publisher** | data.lacity.org |
| **Source URL** | https://catalog.data.gov/dataset/crime-data-from-2020-to-present |
| **Download URL** | https://data.lacity.org/api/v3/views/2nrs-mtv8/export.csv |
| **Download Date** | 2026-07-24T14:35:00Z |
| **License** | CC0 (Public Domain) |

---

## Dataset Metadata

| Field | Value |
|-------|-------|
| **File Format** | CSV |
| **File Size** | 288 MB |
| **Total Records** | 1,004,894 |
| **Total Columns** | 28 |
| **Date Range** | 2020-01-01 to 2024-12-30 |
| **Last Updated** | 2026-03-04 |
| **Dataset Status** | Historical (no longer updated) |

---

## Data Completeness

| Metric | Value |
|--------|-------|
| **Total Data Points** | 28,137,032 |
| **Missing Data Points** | 5,590,660 |
| **Data Completeness** | 80.13% |

---

## Column Structure

### Column Definitions

| # | Column Name | Type | Description | Completeness |
|---|------------|------|-------------|--------------|
| 1 | DR_NO | int64 | Division of Records Number (Unique ID) | 100.0% |
| 2 | Date Rptd | str | Date crime was reported | 100.0% |
| 3 | DATE OCC | str | Date crime occurred | 100.0% |
| 4 | TIME OCC | int64 | Time crime occurred (HHMM) | 100.0% |
| 5 | AREA | int64 | LAPD Area code | 100.0% |
| 6 | AREA NAME | str | LAPD Area name | 100.0% |
| 7 | Rpt Dist No | int64 | Reporting District number | 100.0% |
| 8 | Part 1-2 | int64 | Crime severity classification | 100.0% |
| 9 | Crm Cd | int64 | Crime code | 100.0% |
| 10 | Crm Cd Desc | str | Crime code description | 100.0% |
| 11 | Mocodes | str | Modus Operandi codes | 84.9% |
| 12 | Vict Age | int64 | Victim age | 100.0% |
| 13 | Vict Sex | str | Victim sex (M/F/X) | 85.6% |
| 14 | Vict Descent | str | Victim descent/ethnicity | 85.6% |
| 15 | Premis Cd | float64 | Premises code | 100.0% |
| 16 | Premis Desc | str | Premises description | 99.9% |
| 17 | Weapon Used Cd | float64 | Weapon code | 32.6% |
| 18 | Weapon Desc | str | Weapon description | 32.6% |
| 19 | Status | str | Case status code | 100.0% |
| 20 | Status Desc | str | Case status description | 100.0% |
| 21 | Crm Cd 1 | float64 | Primary crime code | 100.0% |
| 22 | Crm Cd 2 | float64 | Secondary crime code | 6.9% |
| 23 | Crm Cd 3 | float64 | Tertiary crime code | 0.2% |
| 24 | Crm Cd 4 | float64 | Quaternary crime code | 0.0% |
| 25 | LOCATION | str | Street address | 100.0% |
| 26 | Cross Street | str | Cross street | 15.3% |
| 27 | LAT | float64 | Latitude | 100.0% |
| 28 | LON | float64 | Longitude | 100.0% |

---

## Data Quality Assessment

### Missing Values Summary

| Category | Columns Affected | Missing % |
|----------|-----------------|-----------|
| **Complete** | 15 columns | 0% |
| **High Missing** | 4 columns | 14-16% |
| **Moderate Missing** | 3 columns | 32-85% |
| **Mostly Missing** | 6 columns | 84-100% |

### Anomalies Detected

| Anomaly Type | Count | Percentage |
|-------------|-------|------------|
| Victim Age = 0 | 269,178 | 26.8% |
| Victim Age < 0 | 137 | 0.01% |
| Geographic (0, 0) | 2,240 | 0.2% |
| Invalid Time | 0 | 0% |

### Specific Data Quality Issues

1. **Victim Age = 0**: 26.8% of records have age = 0
   - Highest in Vehicle Stolen (99.7% of records)
   - May indicate unknown victim or property crime

2. **Weapon Data**: 67.4% missing
   - Expected: Many crimes don't involve weapons
   - Strong-arm tactics most common (17.4%)

3. **Secondary Crime Codes**: 93-100% missing
   - Expected: Most crimes have single classification

4. **Cross Street**: 84.7% missing
   - Expected: Not all locations have cross streets

---

## Crime Classification

### Part 1-2 Distribution

| Classification | Description | Count | Percentage |
|---------------|-------------|-------|------------|
| Part 1 | Serious crimes | 602,622 | 60.0% |
| Part 2 | Less serious crimes | 402,272 | 40.0% |

### Case Status Distribution

| Status | Description | Count | Percentage |
|--------|-------------|-------|------------|
| Invest Cont | Investigation continuing | 802,772 | 79.9% |
| Adult Other | Adult, other action | 109,799 | 10.9% |
| Adult Arrest | Adult arrested | 87,152 | 8.7% |
| Juv Arrest | Juvenile arrested | 3,285 | 0.3% |
| Juv Other | Juvenile, other | 1,879 | 0.2% |

---

## Temporal Coverage

### Records by Year

| Year | Records | Percentage |
|------|---------|------------|
| 2020 | 199,847 | 19.9% |
| 2021 | 209,876 | 20.9% |
| 2022 | 235,259 | 23.4% |
| 2023 | 232,345 | 23.1% |
| 2024 | 127,567 | 12.7% |

**OBS-001**: 2024 has significantly fewer records (12.7%) compared to other years (~20-23%)
**INFERENCE**: Dataset may have been partially extracted or 2024 data is incomplete

---

## LAPD Area Distribution

| Area Name | Records | Percentage |
|-----------|---------|------------|
| Central | 69,668 | 6.9% |
| 77th Street | 61,756 | 6.1% |
| Pacific | 59,513 | 5.9% |
| Southwest | 57,434 | 5.7% |
| Hollywood | 52,429 | 5.2% |

**OBS-002**: Crime is not uniformly distributed across areas
**OBS-003**: Central has highest crime count, likely due to downtown commercial activity

---

## Dataset Limitations

1. **Temporal Incompleteness**: 2024 data appears incomplete
2. **Missing Victim Data**: 14.4% missing sex/descent, 26.8% age=0
3. **Location Privacy**: Addresses reduced to hundred blocks
4. **Manual Transcription**: Data from paper reports may contain errors
5. **Legacy System**: Transition to NIBRS means data collection methodology changed

---

**Document Status**: COMPLETE
**Evidence Level**: Source data analysis
