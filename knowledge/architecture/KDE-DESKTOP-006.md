# Industrial Deployment Patterns

**Knowledge ID**: KDE-DESKTOP-006
**Title**: Industrial Air-Gapped Deployment Patterns
**Class**: ARCHITECTURE
**Version**: 1.0.0
**Status**: CANDIDATE
**Confidence**: MEDIUM
**Evidence Level**: 3
**Owner**: KDE Governance
**Created**: 2026-07-21
**Updated**: 2026-07-21
**Reviewed**: TBD
**Source Investigation**: INV-032
**Evidence**:
  - EV-006: Industrial deployment patterns (Windows IoT, Yocto, OSTree)

---

## Definition

Industrial Air-Gapped Deployment Patterns describe the requirements and implementation approaches for deploying desktop applications in air-gapped industrial environments, including reproducible builds, offline activation, transactional updates, and factory provisioning.

---

## Summary

Air-gapped industrial deployments require reproducible builds with signing, offline activation mechanisms (ePKEA for Windows), transactional updates with rollback capability (OSTree for Linux), and provisioning packages for factory deployment. These requirements differ significantly from consumer deployment patterns.

---

## Pattern Description

### Industrial vs Consumer Deployment

| Aspect | Consumer | Industrial |
|--------|----------|------------|
| Network | Always connected | Air-gapped |
| Updates | Auto-update | Manual/transactional |
| Licensing | Online activation | Offline activation |
| Deployment | App stores | Factory provisioning |
| Rollback | Limited | Required |

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Factory/Provisioning                        │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Provisioning Package │ Signed Images │ Keys     │   │
│  └─────────────────────────────────────────────────┘   │
└────────────────────────┬──────────────────────────────┘
                         │ Physical media (USB/DVD)
                         ▼
┌─────────────────────────────────────────────────────────┐
│              Air-Gapped Industrial System                │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐   │
│  │ OS Layer │  │ App      │  │ Update/Rollback     │   │
│  │ (Signed) │  │ (Signed) │  │ (OSTree/Transactional) │   │
│  └──────────┘  └──────────┘  └──────────────────────┘   │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Offline License Manager (ePKEA/OEM)              │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## Implementation Requirements

### 1. Reproducible Builds

| Requirement | Implementation |
|-------------|----------------|
| Deterministic builds | Consistent toolchain, timestamps |
| Version control | Git commit for every build |
| Source verification | Checksums, signatures |
| Build environment | Containerized reproducible environment |

### 2. Code Signing

| Platform | Approach |
|----------|----------|
| Windows | Authenticode, EV certificates |
| Linux | GPG signatures, dm-verity |
| Both | Secure boot chain |

### 3. Offline Activation

| Platform | Mechanism |
|----------|-----------|
| Windows | ePKEA, OEM license, KMS |
| Linux | License file, hardware binding |

### 4. Transactional Updates

| Platform | Tool |
|---------|------|
| Linux | OSTree, snap, Flatpak |
| Windows | In-house transactional update |
| Cross-platform | Custom update with rollback |

### 5. Factory Provisioning

| Component | Description |
|-----------|-------------|
| Base image | Pre-installed OS and dependencies |
| Provisioning package | Application + configuration |
| Activation data | License keys, certificates |
| Initialization scripts | First-run setup |

---

## Evidence

### Supporting Evidence

| Evidence ID | Source | Finding |
|-------------|--------|---------|
| EV-006 | Windows IoT | ePKEA offline activation |
| EV-006 | Yocto | Reproducible builds, signed images |
| EV-006 | OSTree | Transactional updates with rollback |

### Key Findings

1. **Reproducible builds**: Essential for air-gapped verification
2. **Offline activation**: ePKEA/OEM license models
3. **Transactional updates**: OSTree provides rollback capability
4. **Factory provisioning**: Physical media and provisioning packages

---

## Deployment Checklist

### Build Requirements

- [ ] Reproducible build environment configured
- [ ] All source code version controlled
- [ ] Build reproducibility verified
- [ ] Code signing configured
- [ ] Secure boot integration planned

### Activation

- [ ] Offline activation mechanism selected
- [ ] License key management system
- [ ] Hardware binding strategy (if required)
- [ ] Activation testing in air-gapped environment

### Updates

- [ ] Transactional update system selected
- [ ] Rollback mechanism tested
- [ ] Update signing configured
- [ ] Delta update support (if needed)

### Deployment

- [ ] Factory provisioning process defined
- [ ] Physical media strategy (USB/DVD)
- [ ] Initial configuration management
- [ ] Deployment documentation

---

## Confidence Assessment

| Factor | Assessment | Rationale |
|--------|------------|-----------|
| Evidence Quality | MEDIUM | Documentation sources, limited vendor coverage |
| Reproducibility | MEDIUM | Platform-specific variations |
| Consistency | MEDIUM | Patterns consistent, implementation varies |

**Overall Confidence**: MEDIUM

---

## Limitations

1. SCADA vendor-specific patterns not deeply covered
2. Real-time industrial system requirements not addressed
3. Specific licensing nuances limited in evidence
4. Emerging industrial frameworks not covered

---

## Related Knowledge

- KDE-DESKTOP-001: Desktop Runtime Multi-Process Architecture
- KDE-DESKTOP-005: Desktop Application Security Model
- KDE-DESKTOP-003: Desktop Runtime Selection Criteria

---

## Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2026-07-21 | Initial extraction from INV-032 | KDE Laboratory |

---

## Provenance

| Source | Reference | Date |
|--------|-----------|------|
| Investigation | INV-032 | 2026-07-21 |
| Evidence | EV-006 | 2026-07-21 |
| Extraction | Manual | 2026-07-21 |
