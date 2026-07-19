# Knowledge K5: CCTV Detection Event
# Source: IoT/Security - After ingestion

## Extracted Knowledge (No Metadata)

### Observations

| ID | Observation | Evidence |
|----|-------------|----------|
| OBS-K5-001 | Event is a detection event | Event type |
| OBS-K5-002 | Event has timestamp | timestamp field |
| OBS-K5-003 | Event has camera identifier | camera_id field |
| OBS-K5-004 | Event has detection type | detection_type field |
| OBS-K5-005 | Event has confidence score | confidence field |
| OBS-K5-006 | Event has bounding box | bounding_box field |
| OBS-K5-007 | Event has object class | object_class field |
| OBS-K5-008 | Camera ID is string type | "CAM-001" |
| OBS-K5-009 | Detection type indicates what was detected | "motion", "person", "vehicle" |
| OBS-K5-010 | Confidence is numeric percentage | 0.0-1.0 range |
| OBS-K5-011 | Bounding box has coordinates | x, y, width, height |
| OBS-K5-012 | Event has processing timestamp | processed_at field |

### Assertions

| ID | Assertion | Evidence |
|----|-----------|----------|
| AST-K5-001 | Camera ID identifies source | camera_id field |
| AST-K5-002 | Detection type classifies event | detection_type field |
| AST-K5-003 | Confidence indicates detection certainty | confidence field |
| AST-K5-004 | Bounding box locates detection in frame | spatial data |
| AST-K5-005 | Timestamp indicates when detected | temporal data |
| AST-K5-006 | Processed_at indicates processing completion | temporal data |
| AST-K5-007 | Confidence must be 0.0-1.0 | percentage representation |

### Entities

| ID | Entity | Properties |
|----|--------|------------|
| ENT-K5-001 | DetectionEvent | timestamp, camera_id, detection_type, confidence, bounding_box, object_class, processed_at |

### Attributes

| ID | Attribute | Entity | Type | Required | Constraints |
|----|-----------|--------|------|----------|-------------|
| ATT-K5-001 | timestamp | DetectionEvent | datetime | true | ISO8601 |
| ATT-K5-002 | camera_id | DetectionEvent | string | true | non-empty |
| ATT-K5-003 | detection_type | DetectionEvent | string | true | enum values |
| ATT-K5-004 | confidence | DetectionEvent | float | true | 0.0-1.0 |
| ATT-K5-005 | bounding_box | DetectionEvent | object | true | x, y, width, height |
| ATT-K5-006 | object_class | DetectionEvent | string | false | - |
| ATT-K5-007 | processed_at | DetectionEvent | datetime | true | ISO8601 |

### Nested Attributes

| ID | Parent | Attribute | Type | Constraints |
|----|--------|-----------|------|-------------|
| ATT-K5-008 | bounding_box | x | float | >= 0 |
| ATT-K5-009 | bounding_box | y | float | >= 0 |
| ATT-K5-010 | bounding_box | width | float | > 0 |
| ATT-K5-011 | bounding_box | height | float | > 0 |

### Constraints

| ID | Constraint | Applies To |
|----|------------|------------|
| CON-K5-001 | confidence ∈ [0.0, 1.0] | DetectionEvent.confidence |
| CON-K5-002 | x >= 0 | bounding_box.x |
| CON-K5-003 | y >= 0 | bounding_box.y |
| CON-K5-004 | width > 0 | bounding_box.width |
| CON-K5-005 | height > 0 | bounding_box.height |

### Events

| ID | Event | Entity | Properties |
|----|-------|--------|------------|
| EVT-K5-001 | detection | DetectionEvent | All attributes |

### Evidence

| ID | Evidence | Source |
|----|----------|--------|
| EV-K5-001 | CCTV detection log | Event stream |

### Ambiguities

| ID | Ambiguity | Classification |
|----|-----------|----------------|
| AMB-K5-001 | Detection type vocabulary | Productive |
| AMB-K5-002 | Coordinate system (pixel vs normalized) | Productive |
| AMB-K5-003 | Timezone of timestamps | Minor |

### Assumptions

| ID | Assumption | Rationale |
|----|------------|-----------|
| AS-K5-001 | Timestamps in UTC | Common for logs |
| AS-K5-002 | Pixel coordinates | Standard video |
| AS-K5-003 | 0.0-1.0 range for confidence | Normalized score |

---

## Knowledge Structure Summary

```
CCTV Detection Event Knowledge:
├── Entities:
│   └── DetectionEvent
│       ├── timestamp (datetime, required, ISO8601)
│       ├── camera_id (string, required)
│       ├── detection_type (string, required, enum)
│       ├── confidence (float, required, 0.0-1.0)
│       ├── bounding_box (object, required)
│       │   ├── x (float, >= 0)
│       │   ├── y (float, >= 0)
│       │   ├── width (float, > 0)
│       │   └── height (float, > 0)
│       ├── object_class (string, optional)
│       └── processed_at (datetime, required)
├── Constraints:
│   ├── confidence: 0.0-1.0
│   ├── bounding_box: positive coordinates
│   └── detection_type: known vocabulary
└── Events:
    └── detection: captured by sensor
```
