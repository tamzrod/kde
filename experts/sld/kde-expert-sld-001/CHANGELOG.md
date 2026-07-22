# SLD Expert Changelog

## Version History

| Version | Date | Changes | Authority |
|---------|------|---------|-----------|
| 1.2.0 | 2026-07-22 | **APPROVED** DS and CB symbols via LAB-SLD-TEST-001 | LAB-SLD-TEST-001 |
| 1.1.0 | 2026-07-22 | Migrated to uniform template structure (INV-037) | INV-037 |
| 1.0.0 | 2026-07-21 | Initial synthesized expert | EXP-005, EXP-007 |

---

## v1.2.0 (2026-07-22) — SYMBOL APPROVAL

### Symbols Approved
| Primitive | Status | Source | Notes |
|-----------|--------|--------|-------|
| Disconnect Switch (DS) | **APPROVED** | `playground/disconnect-switch.html` | Double chevron, knife blade, pivot/hinge |
| Circuit Breaker (CB) | **APPROVED** | `playground/CB-improved.html` | Double chevron, rectangle fill, no knife |
| Earthing Switch (ES) | DRAFT | — | Pending validation |

### Changes
- Added comprehensive geometry rules for DS symbol
- Added comprehensive geometry rules for CB symbol
- Updated Dependencies table with approval status
- Added visual structure diagrams to SPEC.md
- Documented DS vs CB key differences

### Approved DS Rules
- Structure: Conductors → Contacts → Knife → Contacts → Conductors
- Top/Bottom contacts: Horizontal lines (bus color)
- Pivot/Hinge: Circle at center contact
- Knife: Rotates 0° (closed) to 40° (open)
- Colors: Bus=cyan (69kV), Closed=red, Open=green, Unknown=hidden

### Approved CB Rules
- Structure: Conductor → Chevrons ∧∧ → Rectangle → Chevrons ∨∨ → Conductor
- Double chevrons (pure arrow heads): Bus color
- Continuous vertical line: Overlaps chevrons, bus color
- Rectangle: Centered, 36×80px, rx=4
- Colors: Chevrons=cyan (69kV), Closed=red, Open=green, Unknown=dashed

### Authority
LAB-SLD-TEST-001 (Experiment on KB-SLD-001 Knowledge Base)

---

## v1.1.0 (2026-07-22)

### Changes
- Migrated from single markdown file to uniform directory structure
- Added `SPEC.md` with complete capability definitions
- Added `interface.yaml` with Engine/Lab interface contract
- Added `CHANGELOG.md` for version tracking
- Added explicit confidence rules
- Added error handling definitions
- Added delegation rules

### Reason
Following INV-037 Expert System Refinement to achieve:
- Uniform structure across all experts
- Clear interface definition
- Easy addition of future experts

---

## v1.0.0 (2026-07-21)

### Changes
- Initial expert synthesis
- Primitives: Circuit Breaker, Disconnect Switch, Earthing Switch
- Geometry: Knife switch, bus voltage profile
- Composition: Substation layout
- Enrolled lessons from EXP-005, EXP-007, EXP-008, EXP-010, EXP-011, EXP-012, EXP-013, EXP-014

### Reason
Initial expert creation from investigation synthesis
