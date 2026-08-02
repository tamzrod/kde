# Worker Template

**Purpose**: Template for creating deployable domain-specific Workers

---

## Overview

A Worker is a **complete, deployable product** that operates independently without the Foundry.

```
workers/
└── [domain]-worker/           # Example: os-worker, git-worker, librarian-worker
    ├── deploy/                 # DEPLOYMENT (required)
    │   ├── docker-compose.yml
    │   ├── Dockerfile
    │   ├── install.sh
    │   └── uninstall.sh
    ├── src/                    # SOURCE CODE
    │   └── (worker implementation)
    ├── plugins/                # WORKER'S PLUGINS
    │   └── (format handlers)
    ├── capabilities/           # WORKER'S CAPABILITIES
    │   └── (reusable functions)
    ├── models/                 # AI MODELS
    │   └── (bundled models)
    ├── ollama/                 # LOCAL LLM RUNTIME
    │   └── (ollama models)
    ├── config/                 # CONFIGURATION
    │   └── worker.yaml
    ├── docs/                   # WORKER DOCS
    │   ├── README.md
    │   ├── DEPLOYMENT.md
    │   └── API.md
    ├── tests/                  # TEST SUITE
    │   └── (tests)
    └── worker.yaml              # WORKER METADATA
```

---

## Required Directories

| Directory | Purpose | Required |
|-----------|---------|----------|
| `deploy/` | Deployment scripts | ✅ Yes |
| `src/` | Source code | ✅ Yes |
| `plugins/` | Format handlers | ⚙️ If needed |
| `capabilities/` | Reusable functions | ⚙️ If needed |
| `models/` | AI models | ⚙️ If needed |
| `ollama/` | Local LLM | ⚙️ If needed |
| `config/` | Configuration | ✅ Yes |
| `docs/` | Documentation | ✅ Yes |
| `tests/` | Test suite | ✅ Yes |
| `worker.yaml` | Metadata | ✅ Yes |

---

## worker.yaml Schema

```yaml
worker:
  name: example-worker
  version: 1.0.0
  domain: Example Domain
  description: What this worker does
  
  # Runtime requirements
  runtime:
    docker: true
    python: ">=3.10"
    memory: "4Gi"
    cpu: "2"
    
  # What this worker observes
  sources:
    - type: filesystem
      paths: ["/data/input"]
    - type: api
      endpoint: "https://api.example.com"
      
  # What this worker produces
  outputs:
    observations: "./observations"
    candidates: "./candidates"
    
  # Dependencies (bundled)
  bundled:
    plugins: ["pdf-handler", "image-handler"]
    capabilities: ["ocr", "embeddings"]
    
  # Contact with Foundry (optional at runtime)
  foundry:
    protocol: "async"  # or "sync", "none"
    endpoint: "https://kde.example.com/api"
```

---

## Deployment

### deploy/docker-compose.yml

```yaml
version: '3.8'
services:
  worker:
    build: .
    volumes:
      - ./data:/data
      - ./models:/models
    environment:
      - WORKER_MODE=production
    restart: unless-stopped
```

### deploy/install.sh

```bash
#!/bin/bash
# Install script for the Worker
# This script should work standalone without the Foundry
set -e

echo "Installing [domain]-worker..."

# Build Docker image
docker-compose build

# Create necessary directories
mkdir -p data observations candidates

echo "Installation complete!"
echo "Run: docker-compose up -d"
```

### deploy/uninstall.sh

```bash
#!/bin/bash
# Uninstall script for the Worker
set -e

echo "Uninstalling [domain]-worker..."

# Stop services
docker-compose down

# Remove data (optional - ask first)
read -p "Remove all data? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -rf data observations candidates
fi

echo "Uninstallation complete!"
```

---

## Worker Responsibilities

1. **Observe** - Observe raw sources in domain
2. **Process** - Process data using own plugins
3. **Produce** - Produce observations (not knowledge)
4. **Learn** - Learn from local experience (optional)

---

## Independence Rules

- Worker MUST run without the Foundry
- Worker MUST bundle all dependencies
- Worker MUST NOT require shared plugins/capabilities from Foundry
- Worker MAY include local LLM runtime

---

## Anti-Patterns

- ❌ Worker promotes knowledge directly
- ❌ Worker modifies Knowledge Layer
- ❌ Worker requires Foundry at runtime
- ❌ Worker requires other Workers

---

**A Worker is a complete, deployable product. Deploy it anywhere.**

