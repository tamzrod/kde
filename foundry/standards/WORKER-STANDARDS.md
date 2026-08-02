# Worker Standards

**Purpose**: Requirements that every Worker must satisfy

---

## Design Requirements

Every Worker must satisfy these requirements:

| Requirement | Description |
|-------------|-------------|
| **Independent Deployment** | Worker can be deployed without other components |
| **Independent Upgrade** | Worker can be upgraded without affecting others |
| **Independent Testing** | Worker has its own test suite |
| **Independent Versioning** | Worker has its own version tracking |
| **No KDE Runtime Dependency** | Worker runs without KDE present |
| **Complete Dependencies** | All dependencies bundled or documented |
| **Own Plugins** | Plugins are owned by the Worker |
| **Own Models** | AI models are owned by the Worker |
| **Own Deployment** | Deployment scripts are included |

---

## Worker Structure

Every Worker must have this structure:

```
workers/
└── [domain]-worker/
    ├── deploy/              # Deployment files
    │   ├── docker-compose.yml
    │   ├── Dockerfile
    │   ├── install.sh
    │   └── uninstall.sh
    ├── src/                 # Source code
    ├── plugins/             # Plugins owned by Worker
    ├── capabilities/        # Capabilities owned by Worker
    ├── models/             # AI models owned by Worker
    ├── config/             # Configuration files
    ├── docs/                # Worker-specific documentation
    ├── tests/               # Test suite
    └── worker.yaml          # Worker metadata
```

---

## Independence Rules

### Workers Must NOT Require

- ❌ The Foundry at runtime
- ❌ Other Workers at runtime
- ❌ Shared capabilities from the Foundry
- ❌ Shared plugins from the Foundry

### Workers May Include

- ✅ Bundled capabilities
- ✅ Bundled plugins
- ✅ Bundled models
- ✅ Bundled runtime (ollama, python, etc.)

---

## Release Requirements

Every Worker release must include:

1. **Version Number** - Semantic versioning (MAJOR.MINOR.PATCH)
2. **Changelog** - What changed since last version
3. **Deployment Guide** - How to deploy this version
4. **Requirements** - Hardware/software requirements
5. **Known Issues** - Any limitations or bugs

---

## Validation Checklist

Before releasing a Worker:

- [ ] Deploys independently
- [ ] Upgrades independently
- [ ] Tests pass
- [ ] Runs without Foundry
- [ ] All dependencies bundled
- [ ] Owns plugins
- [ ] Owns models
- [ ] Deployment scripts work
- [ ] Documentation complete

---

**Every Worker is a complete, deployable product.**
