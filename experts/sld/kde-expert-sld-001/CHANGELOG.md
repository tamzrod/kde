# SLD Expert Changelog

## Version History

| Version | Date | Changes | Authority |
|---------|------|---------|-----------|
| 1.1.0 | 2026-07-22 | Migrated to uniform template structure (INV-037) | INV-037 |
| 1.0.0 | 2026-07-21 | Initial synthesized expert | EXP-005, EXP-007 |

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
