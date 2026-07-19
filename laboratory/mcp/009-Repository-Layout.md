# Repository Layout

## 1. Overview

The MCP Runtime repository follows a clean Go project structure with clear separation between runtime code, KDE integration, and testing infrastructure.

## 2. Top-Level Structure

```
kde/
├── deployment/                  # Production implementations
│   └── mcp/                     # MCP Runtime
│       ├── cmd/                 # CLI entry points
│       ├── internal/            # Internal packages
│       │   ├── runtime/          # Core runtime
│       │   ├── project/         # Project management
│       │   ├── session/         # Session management
│       │   ├── tools/           # Tool implementations
│       │   ├── errors/          # Error definitions
│       │   ├── discovery/       # Project discovery
│       │   └── kde/             # KDE integration
│       ├── laboratory/          # Test harness
│       │   ├── scenarios/       # Test scenarios
│       │   └── client/          # Client simulator
│       └── deploy/              # Deployment configs
│
├── research/                    # Research artifacts (not MCP)
├── knowledge/                   # Validated knowledge (not MCP)
├── governance/                  # Methodology rules (not MCP)
└── laboratory/                  # KDE Laboratory (not MCP)
```

## 3. Directory Purposes

### 3.1 cmd/mcp

CLI entry points for the MCP Runtime.

```
cmd/
└── kde/
    ├── main.go                  # Main CLI entry
    ├── init.go                  # 'kde init' subcommand
    └── tool.go                   # 'kde tool' subcommand
```

**Purpose**: Command-line interface to the MCP Runtime.

### 3.2 internal/runtime

Core runtime logic.

```
internal/
└── runtime/
    ├── runtime.go               # Runtime implementation
    ├── runtime_test.go          # Unit tests
    ├── lifecycle.go             # State machine
    ├── config.go                # Configuration
    ├── registry.go              # Tool registry
    └── interfaces.go            # Public interfaces
```

**Purpose**: Runtime initialization, shutdown, and coordination.

### 3.3 internal/project

Project discovery and management.

```
internal/
└── project/
    ├── project.go                # Project type
    ├── discover.go               # Discovery algorithm
    ├── load.go                   # Project loading
    ├── config.go                 # Config parsing
    └── project_test.go           # Unit tests
```

**Purpose**: Locate `.kde` directories, load configuration.

### 3.4 internal/session

Session lifecycle management.

```
internal/
└── session/
    ├── session.go                # Session type
    ├── manager.go                # Session manager
    ├── context.go                # Execution context
    ├── history.go                # Tool call history
    └── session_test.go           # Unit tests
```

**Purpose**: Manage client sessions, track tool execution.

### 3.5 internal/tools

Tool implementations.

```
internal/
└── tools/
    ├── registry.go               # Tool registry
    ├── tool.go                   # Tool interface
    ├── dispatcher.go             # Request dispatcher
    │
    ├── builtin/                  # Built-in tools
    │   ├── builtin.go            # Built-in tools
    │   ├── initialize.go        # 'initialize' tool
    │   ├── status.go             # 'status' tool
    │   ├── collect.go            # 'collect' tool
    │   ├── analyze.go            # 'analyze' tool
    │   ├── verify.go             # 'verify' tool
    │   ├── simulate.go            # 'simulate' tool
    │   ├── report.go             # 'report' tool
    │   └── knowledge.go          # 'knowledge' tool
    │
    └── tools_test.go            # Integration tests
```

**Purpose**: Register and dispatch tools to KDE.

### 3.6 internal/errors

Error definitions and handling.

```
internal/
└── errors/
    ├── errors.go                 # Error types
    ├── codes.go                  # Error code registry
    ├── handler.go                # Error handler
    └── errors_test.go           # Unit tests
```

**Purpose**: Consistent, deterministic error handling.

### 3.7 internal/discovery

Project discovery implementation.

```
internal/
└── discovery/
    ├── walker.go                 # Directory walker
    ├── marker.go                 # .kde marker detection
    └── discovery_test.go        # Unit tests
```

**Purpose**: Walk directory tree upward, find `.kde` markers.

### 3.8 internal/kde

KDE engine integration.

```
internal/
└── kde/
    ├── engine.go                 # KDE engine interface
    ├── loader.go                 # KDE loader
    ├── types.go                  # KDE type mappings
    └── kde_test.go              # Integration tests
```

**Purpose**: Load and interact with KDE engine. **KDE logic lives in KDE; this is only the integration layer.**

### 3.9 laboratory/mcp

Test harness for MCP Runtime.

```
laboratory/
└── mcp/
    ├── client/                  # Test client
    │   ├── client.go            # Client simulator
    │   └── scenarios.go        # Scenario runner
    │
    ├── scenarios/              # Test scenarios
    │   ├── project_lifecycle.go
    │   ├── tool_execution.go
    │   ├── error_handling.go
    │   └── concurrency.go
    │
    ├── fixtures/               # Test fixtures
    │   └── test-project/      # Sample project
    │
    ├── 008-Local-Execution.md
    ├── 009-Repository-Layout.md
    └── README.md              # Laboratory documentation
```

**Purpose**: Validate MCP Runtime behavior. **Never contains production logic.**

### 3.10 deploy/

Deployment configurations.

```
deploy/
├── docker/                     # Docker deployment
│   ├── Dockerfile
│   └── docker-compose.yml
├── kubernetes/                 # K8s deployment
│   └── k8s.yaml
└── config/                     # Configuration templates
    └── config.yaml
```

**Purpose**: Production deployment configurations.

## 4. Key Principles

### 4.1 Internal Packages

All packages under `internal/` are internal to the MCP Runtime:
- Not exported for external use
- Can change without notice
- Subject to internal testing only

### 4.2 Public API

The public API is minimal:

```
kde/
└── kde.go                      # Public API entry point
```

```go
package kde

// Public API
type Runtime interface { ... }
type Session interface { ... }
type ToolRequest interface { ... }
type ToolResponse interface { ... }

// Factory functions
func NewRuntime(config *RuntimeConfig) (Runtime, error)
```

### 4.3 Laboratory Isolation

The `laboratory/mcp/` directory is **completely separate** from production code:
- Not imported by runtime
- Tests runtime as black box
- Simulates AI client behavior
- Can be deleted without affecting runtime

## 5. Alternative Layouts Considered

### 5.1 Flat Structure

```
mcp/
├── runtime.go
├── project.go
├── session.go
├── tools.go
└── errors.go
```

**Rejected**: Does not scale as project grows.

### 5.2 KDE Mixed with MCP

```
kde/
├── mcp/
│   └── runtime.go
└── kde/
    └── engine.go
```

**Rejected**: Creates coupling between MCP and KDE internals.

### 5.3 Selected Layout

The selected layout keeps MCP self-contained while allowing clear KDE integration:

```
mcp/
├── internal/      # MCP internals
├── laboratory/    # MCP tests
└── cmd/           # MCP entry points

kde/
└── kde/           # KDE engine (separate)
```

## 6. File Naming Conventions

| Pattern | Purpose |
|---------|---------|
| `*.go` | Go source files |
| `*_test.go` | Test files |
| `*.yaml` | Configuration files |
| `*.md` | Documentation |
| `testdata/` | Test fixtures |

## 7. Module Structure

```go
// go.mod
module github.com/kde/mcp

go 1.21

require (
    // Internal dependencies
)

require (
    // KDE engine interface
    github.com/kde/kde v1.0.0
)
```

## 8. Build Targets

| Target | Command | Output |
|--------|---------|--------|
| Library | `go build` | mcp.a |
| CLI | `go build ./cmd/kde` | kde (binary) |
| Tests | `go test ./...` | Test results |
| Docker | `docker build` | kde:latest |

## 9. Summary

The repository layout provides:

1. ✅ Clear separation between MCP and KDE
2. ✅ Testable internal structure
3. ✅ Isolated laboratory for testing
4. ✅ Minimal public API surface
5. ✅ Scalable as project grows
