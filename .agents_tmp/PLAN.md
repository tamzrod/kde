# KDE MCP Runtime Architecture Plan

**Document Version**: 2.0 (Refactored)  
**Date**: 2026-07-19  
**Status**: ARCHITECTURAL DESIGN  
**Scope**: MCP Runtime Architecture Only

---

## Executive Summary

This plan defines the architecture for the KDE MCP Runtime—a **generic, transport-independent interface layer** that exposes KDE capabilities to AI clients.

**Core Principle**: The MCP Runtime must know as little as possible about KDE. MCP owns infrastructure. KDE owns engineering.

**Design Philosophy**: 
- Start simple. Local execution first.
- MCP remains unchanged as KDE evolves.
- No hardcoded KDE business logic.

---

## OBJECTIVE

Create the architecture and implementation plan for the KDE MCP Runtime.

The MCP Runtime is a **generic infrastructure layer** that:
- Provides transport-agnostic tool dispatch
- Manages sessions without knowing what they do
- Loads KDE projects without knowing their structure
- Exposes tools registered by KDE—not its own tools
- Provides deterministic, consistent behavior
- Is designed for testability

**Core Question**: "Is this an infrastructure concern, not a business logic concern?"

If yes, it belongs in MCP.  
If no, it belongs in KDE.

---

## CONTEXT SUMMARY

### Ownership Principle

**Every responsibility must clearly belong to exactly one component.**

| Owner | Owns |
|-------|------|
| **MCP Runtime** | Infrastructure only |
| **KDE Engine** | Business logic and engineering |
| **Laboratory** | Testing and validation |
| **Deployment** | Packaging only |

### What Belongs to MCP Runtime (Infrastructure Only)

| Responsibility | Description |
|---------------|-------------|
| Transport | Local calls or HTTP (today vs tomorrow) |
| Project Discovery | Finding `.kde` markers |
| Runtime Lifecycle | Start, run, stop the process |
| Session Management | Track client connections |
| Tool Registry | Store tools registered by KDE |
| Tool Dispatch | Route requests to handlers |
| Request Validation | Type checking, required fields |
| Error Handling | Consistent, deterministic errors |
| Project Loading | Ask KDE to load/unload projects |

### What Belongs to KDE Engine (Business Logic)

| Capability | Examples |
|------------|----------|
| Engineering Logic | Knowledge, Evidence, Analysis, Verification |
| Tool Implementations | Whatever tools KDE provides |
| Project Structure | config.yaml, knowledge/, evidence/ |
| Domain Knowledge | How to validate, analyze, simulate |

### What Belongs to Laboratory (Testing)

| Role | Description |
|------|-------------|
| AI Client Simulation | Simulates AI client behavior |
| Integration Testing | Tests MCP↔KDE interaction |
| Validation | Validates runtime behavior |

### What Belongs to Deployment (Packaging)

| Role | Description |
|------|-------------|
| Docker | Container configuration |
| Packaging | Binary distribution |
| Installers | User installation |
| Release Config | Version management |

---

## APPROACH OVERVIEW

### Final Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         AI CLIENT                                 │
│                   (Laboratory or other AI)                        │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                          TRANSPORT                                │
│              (local today, HTTP tomorrow)                         │
│                    Local │ HTTP │ ...                            │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                       MCP RUNTIME                                 │
│                    (Generic Infrastructure)                       │
│                                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │Discovery │  │Lifecycle │  │ Session  │  │ Registry │          │
│  │ Manager  │  │ Manager  │  │ Manager  │  │(tool store)│       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ Dispatch │  │ Validate │  │  Errors  │  │ Loading  │          │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘          │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                       KDE ENGINE                                  │
│                    (Black-box Business Logic)                     │
│                                                                      │
│  Registers tools  │  Implements tools  │  Owns project structure     │
│  Says what it is │  Does the work     │  Defines valid config      │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                        .kde Project                               │
│                    (Project data and config)                      │
└─────────────────────────────────────────────────────────────────┘
```

### Design Principles

1. **Infrastructure Only**: MCP knows nothing about KDE business logic
2. **KDE Registers Tools**: Runtime asks KDE what tools exist; KDE registers them
3. **Transport Agnostic**: Local today, HTTP/JSON-RPC tomorrow—same runtime
4. **Generic Sessions**: Sessions track connection state, not domain concepts
5. **Deterministic Errors**: Same inputs → same errors → no randomness
6. **Decoupled Evolution**: MCP unchanged as KDE adds capabilities

---

## IMPLEMENTATION STEPS

### Phase 1: Core Architecture (Refactored)

#### Step 1.1: Define Generic Interfaces
**Goal**: Define interfaces that contain NO KDE business logic  
**Method**: Document infrastructure-only types  
**Reference**: All interfaces use generic names

```go
// MCP knows nothing about KDE. These are pure infrastructure types.

// Tool is registered by KDE, not defined by MCP
type Tool interface {
    Name() string                    // Tool identifier
    Description() string             // Human-readable description
    InputSchema() JSONSchema         // Argument schema (tool-defined)
    Execute(ctx context.Context, args map[string]interface{}) (Result, error)
}

// Request/Response are generic containers
type Request struct {
    Tool  string
    Args  map[string]interface{}
    ID    string
}

type Response struct {
    Result Result
    Error  *Error
    ID     string
}

type Result struct {
    Data    interface{}
    Success bool
}
```

#### Step 1.2: Define Tool Registry (KDE-driven)
**Goal**: Runtime stores tools; KDE provides them  
**Method**: Document registry as a store, not a definition  

```go
// MCP does NOT define tools. It stores what KDE registers.
type Registry interface {
    Register(tool Tool) error       // KDE calls this
    Unregister(name string) error  // KDE calls this
    Get(name string) (Tool, error)
    List() []Tool                  // Returns all registered tools
}

// Initialization sequence:
// 1. Runtime starts
// 2. Runtime discovers project
// 3. Runtime loads KDE
// 4. KDE registers its tools with Registry
// 5. Runtime exposes those tools
// 6. Runtime does NOT know what tools KDE provides
```

#### Step 1.3: Define Generic Session
**Goal**: Session contains NO KDE business logic  
**Method**: Session tracks connection state only  

```go
// Session is communication state only. MCP does not know what tools do.
type Session struct {
    ID            SessionID
    Project       *Project          // Reference to project (opaque)
    Context       context.Context  // Cancellation
    Metadata      map[string]string // Client-provided metadata
    History       []CallRecord     // Tool call history (generic)
    CreatedAt     time.Time
    LastActivity  time.Time
}

type CallRecord struct {
    ID          string
    ToolName    string             // Just the name, nothing about what it does
    StartedAt   time.Time
    CompletedAt time.Time
    Success     bool
    Error       *Error             // If failed
}
```

#### Step 1.4: Define Project Loader Interface
**Goal**: MCP asks KDE to load projects; MCP knows nothing about structure  
**Method**: Define loader interface that KDE implements  

```go
// MCP does NOT define project structure (config.yaml, knowledge/, etc.)
// MCP only asks KDE to load/unload.

type ProjectLoader interface {
    Load(path string) (*Project, error)      // KDE loads project
    Unload(project *Project) error          // KDE unloads project
    Validate(path string) error            // KDE validates project
}

type Project struct {
    Root  string                          // Opaque to MCP
    State ProjectState
}

// MCP discovers .kde marker, then calls KDE.ProjectLoader.Load()
// MCP never reads config.yaml, never knows what directories exist
```

#### Step 1.5: Define Separate Lifecycles
**Goal**: Document Runtime, Project, Session, KDE as independent  
**Method**: Each owns its own lifecycle  

```
┌─────────────────────────────────────────────────────────────────────┐
│                         LIFECYCLE OWNERSHIP                          │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│     RUNTIME      │     │     PROJECT     │     │     SESSION      │
│                  │     │                  │     │                  │
│ • Owns process  │     │ • Owns .kde dir │     │ • Owns client    │
│ • Owns KDE ref   │────▶│ • Owned by      │────▶│   connection     │
│ • Owns registry  │     │   Runtime       │     │ • Owned by       │
│ • Owns sessions  │     │ • Multiple per  │     │   Runtime        │
│                  │     │   Runtime       │     │ • Multiple per   │
│ Lifecycle:       │     │                 │     │   Project        │
│ Start → Ready → │     │ Lifecycle:       │     │                 │
│ Shutdown         │     │ Load → Active → │     │ Lifecycle:       │
│                  │     │ Unload          │     │ Create → Active  │
│                  │     │                 │     │ → Close          │
└──────────────────┘     └──────────────────┘     └──────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                         KDE ENGINE                                     │
│                                                                       │
│ • Owns all business logic                                             │
│ • Owns tool implementations                                            │
│ • Owns project structure (config, knowledge, evidence)                │
│ • Registers tools with MCP registry                                    │
│ • Loads/unloads projects via ProjectLoader                            │
│                                                                       │
│ Lifecycle:                                                            │
│ Load → Register Tools → Active → Unregister → Unload                  │
└──────────────────────────────────────────────────────────────────────┘
```

#### Step 1.6: Define Transport Interface
**Goal**: Local today, HTTP tomorrow—same runtime  
**Method**: Abstract transport behind interface  

```go
// Transport is the only thing that changes for networking.
// MCP runtime itself is unchanged.

type Transport interface {
    Serve(runtime *Runtime) error
    Close() error
}

type LocalTransport struct{}      // Direct function calls (Phase 1)
type HTTPTransport struct{}       // HTTP server (Phase 2, future)

func (t *LocalTransport) Serve(r *Runtime) error {
    // Direct invocation of runtime methods
    return nil
}
```

#### Step 1.7: Define Error Model (Infrastructure Only)
**Goal**: Errors are runtime concerns, not business logic  
**Method**: Define generic error codes  

```go
// MCP defines infrastructure errors only.
// KDE tool errors are passed through as-is.

type ErrorCode int

const (
    // Runtime errors (1000-1999)
    ErrInternalRuntime   ErrorCode = 1000
    ErrRuntimeNotReady  ErrorCode = 1001
    ErrRuntimeShutting  ErrorCode = 1002

    // Project errors (1100-1199)
    ErrProjectNotFound      ErrorCode = 1100
    ErrProjectLoadFailed    ErrorCode = 1101
    ErrProjectInvalid       ErrorCode = 1102

    // Session errors (1200-1299)
    ErrSessionNotFound  ErrorCode = 1200
    ErrSessionExpired   ErrorCode = 1201
    ErrSessionClosed    ErrorCode = 1202

    // Tool errors (2000-2999)
    ErrUnknownTool     ErrorCode = 2000
    ErrInvalidArgs     ErrorCode = 2001
    ErrToolNotFound    ErrorCode = 2002
    ErrToolExecFailed  ErrorCode = 2003  // Pass-through from KDE

    // Transport errors (3000-3999)
    ErrTransportError  ErrorCode = 3000
)
```

#### Step 1.8: Define Repository Layout
**Goal**: Clean separation; source separate from deploy  
**Method**: Standard Go layout  

```
mcp/                                    # MCP Runtime source
├── cmd/
│   ├── kde/                          # CLI entry point
│   └── kde-mcp/                      # MCP server (future)
│
├── internal/
│   ├── runtime/                      # Core runtime
│   │   ├── runtime.go
│   │   ├── lifecycle.go
│   │   └── config.go
│   │
│   ├── discovery/                    # Project discovery
│   │   ├── walker.go                # Walks upward for .kde
│   │   └── marker.go                # Detects .kde marker
│   │
│   ├── project/                      # Project management
│   │   ├── loader.go                # KDE.ProjectLoader impl
│   │   └── state.go
│   │
│   ├── session/                      # Session management
│   │   ├── session.go
│   │   ├── manager.go
│   │   └── history.go
│   │
│   ├── registry/                     # Tool registry
│   │   ├── registry.go
│   │   └── tools.go                  # Generic tool store
│   │
│   ├── dispatch/                     # Tool dispatch
│   │   ├── dispatcher.go
│   │   └── validation.go
│   │
│   ├── transport/                    # Transport layer
│   │   ├── transport.go             # Interface
│   │   ├── local.go                 # Local transport
│   │   └── http.go                  # HTTP transport (future)
│   │
│   └── errors/                       # Error handling
│       ├── errors.go
│       └── codes.go
│
├── laboratory/                        # Test harness
│   ├── client/                       # Test client simulator
│   ├── scenarios/                    # Test scenarios
│   └── fixtures/                     # Test fixtures
│
├── deploy/                           # Deployment only (packaging)
│   ├── docker/
│   ├── kubernetes/
│   └── config/
│
└── kde/                              # KDE integration (interface only)
    ├── engine.go                     # KDE engine interface
    └── loader.go                     # KDE loader interface

Notes:
• Source code lives in cmd/, internal/, laboratory/
• deploy/ contains ONLY packaging, NOT source
• kde/ directory contains interfaces, not implementations
• MCP never imports kde implementations
```

---

## TESTING AND VALIDATION

### Success Criteria

A developer should immediately understand:

1. ✅ What belongs to KDE (engine) — business logic
2. ✅ What belongs to MCP Runtime (interface) — infrastructure
3. ✅ What belongs to Laboratory (test harness) — validation

### Validation Checklist

| Criteria | Evidence |
|----------|----------|
| No KDE business logic in MCP | No hardcoded tools |
| No KDE domain concepts in Session | Generic session only |
| No KDE structure assumptions | ProjectLoader interface |
| Separate lifecycles | Runtime, Project, Session, KDE independent |
| Transport abstraction | Local works today, HTTP tomorrow |
| Deterministic errors | Same input → same error |

---

## ARCHITECTURAL REVIEW COMPLIANCE

### Changes Made Per Review

| Review Item | Compliance |
|-------------|------------|
| 1. Removed KDE business logic from MCP | ✅ No hardcoded tools |
| 2. Made sessions generic | ✅ No KnowledgeScope, EvidenceScope |
| 3. Separated lifecycles | ✅ Runtime, Project, Session, KDE independent |
| 4. Removed KDE config assumptions | ✅ ProjectLoader interface |
| 5. KDE-driven tool registration | ✅ Registry stores; KDE registers |
| 6. Repository layout | ✅ cmd/, internal/, laboratory/, deploy/ |
| 7. Removed MCP knowledge of engineering | ✅ Infrastructure concepts only |
| 8. Final architectural goal | ✅ MCP unchanged as KDE evolves |

---

## NEXT STEPS

1. Review refactored architecture
2. Approve for implementation
3. Begin Phase 1: Core Runtime

---

**Document Status**: ARCHITECTURAL DESIGN COMPLETE  
**Ready for Review**: Yes

Each session carries a context with metadata:

```go
type SessionContext struct {
    SessionID   SessionID
    ProjectID   string
    UserID      string          // Optional, for multi-user
    StartedAt   time.Time
    Metadata    map[string]string
    
    // KDE-specific context
    KDEContext  *KDEContext
}

type KDEContext struct {
    KnowledgeScope []string     // Accessible knowledge IDs
    EvidenceScope []string     // Accessible evidence IDs
    Permissions   PermissionSet
}
```

## 6. Tool Execution Context

Tool execution happens within a session context:

```go
type ToolExecutionContext struct {
    Session   *ClientSession
    ToolName  string
    Args      map[string]interface{}
    StartedAt time.Time
    Timeout   time.Duration
    
    // Cancellable
    Cancel    context.CancelFunc
}

func (ctx *ToolExecutionContext) Execute() (*Result, error) {
    // Create cancellable context
    execCtx, cancel := context.WithTimeout(ctx.Session.context, ctx.Timeout)
    defer cancel()
    
    // Execute tool
    return tool.Execute(execCtx, ctx.Args)
}
```

## 7. Session Management Operations

### 7.1 Create Session

```go
func (m *SessionManager) CreateSession(project *Project) (*ClientSession, error) {
    if m.activeCount() >= m.config.MaxConcurrent {
        return nil, Error(MAX_SESSIONS_EXCEEDED)
    }
    
    ctx, cancel := context.WithTimeout(
        context.Background(),
        m.config.SessionTimeout,
    )
    
    session := &ClientSession{
        id:           NewSessionID(),
        runtime:      m.runtime,
        state:        CREATED,
        context:      ctx,
        cancel:       cancel,
        history:      []ToolCall{},
        startedAt:    time.Now(),
        lastActivity: time.Now(),
        config:       m.config,
    }
    
    m.sessions[session.id] = session
    m.activeCount++
    
    session.state = ACTIVE
    
    return session, nil
}
```

### 7.2 Execute Tool in Session

```go
func (s *ClientSession) ExecuteTool(req ToolRequest) (*ToolResponse, error) {
    if s.state != ACTIVE && s.state != IDLE {
        return nil, Error(SESSION_NOT_ACTIVE)
    }
    
    s.state = ACTIVE
    defer func() { s.state = IDLE }()
    
    // Record in history
    call := ToolCall{
        ID:        NewCallID(),
        ToolName:  req.Tool,
        Args:      req.Args,
        StartedAt: time.Now(),
    }
    s.history = append(s.history, call)
    
    // Execute
    result, err := s.runtime.DispatchTool(req.Tool, req.Args)
    
    call.CompletedAt = time.Now()
    call.Result = result
    call.Error = err
    
    s.lastActivity = time.Now()
    
    return &ToolResponse{
        CallID: call.ID,
        Result: result,
        Error:  err,
    }, nil
}
```

### 7.3 Close Session

```go
func (m *SessionManager) CloseSession(id SessionID) error {
    session, ok := m.sessions[id]
    if !ok {
        return Error(SESSION_NOT_FOUND)
    }
    
    session.state = CLOSING
    
    // Cleanup resources
    session.cancel()
    
    // Remove from registry
    delete(m.sessions, id)
    m.activeCount--
    
    session.state = CLOSED
    
    return nil
}
```

## 8. Session History

Each session maintains a history of tool calls:

```go
type ToolCall struct {
    ID          CallID
    ToolName    string
    Args        map[string]interface{}
    StartedAt   time.Time
    CompletedAt time.Time
    Duration    time.Duration
    Result      *Result
    Error       error
}

type SessionHistory struct {
    SessionID SessionID
    Calls     []ToolCall
    Summary   HistorySummary
}
```

## 9. Session Configuration

```go
type SessionConfig struct {
    // Timeout settings
    SessionTimeout time.Duration   // Max session lifetime (default: 30m)
    IdleTimeout    time.Duration   // Idle time before warning (default: 5m)
    ToolTimeout    time.Duration   // Max tool execution time (default: 5m)
    
    // Limits
    MaxHistorySize int             // Max tool calls to remember (default: 1000)
    MaxConcurrent  int             // Max concurrent sessions (default: 10)
    
    // Features
    EnableHistory   bool          // Track tool history (default: true)
    EnableCancel     bool          // Allow tool cancellation (default: true)
}
```

## 10. Error Handling

| Error | Scenario | Recovery |
|-------|----------|----------|
| SESSION_NOT_FOUND | Invalid session ID | Create new session |
| SESSION_NOT_ACTIVE | Session in terminal state | Create new session |
| MAX_SESSIONS_EXCEEDED | Too many concurrent sessions | Wait and retry |
| SESSION_EXPIRED | Timeout exceeded | Create new session |
| SESSION_CLOSED | Session was closed | Create new session |

## 11. Session vs. Project

```
┌─────────────────────────────────────────────────────────────────────┐
│                        RUNTIME (Singleton)                          │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    Project (Per .kde)                        │  │
│  │                                                               │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │  │
│  │  │  Session A  │  │  Session B  │  │  Session C  │         │  │
│  │  │  (Client 1) │  │  (Client 2) │  │  (Client 3) │         │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘         │  │
│  │                                                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

- One Runtime per process
- One Project per `.kde` directory
- Multiple Sessions per Project
- Sessions are isolated from each other
```

#### Step 1.7: Create Error Model
**Goal**: Define consistent error handling  
**Method**: Document error codes, messages, and handling  
**Reference**: 007-Error-Model.md

```markdown
## 007-Error-Model.md

# Error Model

## 1. Design Principles

### 1.1 Deterministic Errors

Given the same inputs, MCP returns the same error. This means:
- No randomness in error selection
- No hidden state affecting errors
- Same error code for same failure condition

### 1.2 Error Code Stability

Error codes are stable API contracts:
- Codes never change once defined
- Codes are machine-readable
- Messages may change; codes do not

### 1.3 Error Hierarchy

```
Error
├── Runtime Errors (1xxx)
│   ├── Project Errors
│   ├── Session Errors
│   └── Internal Errors
├── Tool Errors (2xxx)
│   ├── Validation Errors
│   ├── Execution Errors
│   └── KDE Errors
└── System Errors (9xxx)
    ├── IO Errors
    └── Permission Errors
```

## 2. Error Codes

### 2.1 Runtime Errors (1000-1999)

| Code | Name | HTTP | Description |
|------|------|------|-------------|
| 1000 | INTERNAL_RUNTIME_ERROR | 500 | Unexpected internal error |
| 1001 | RUNTIME_NOT_INITIALIZED | 500 | Runtime not started |
| 1002 | RUNTIME_SHUTTING_DOWN | 503 | Runtime is shutting down |

### 2.2 Project Errors (1100-1199)

| Code | Name | HTTP | Description |
|------|------|------|-------------|
| 1100 | PROJECT_NOT_INITIALIZED | 404 | No .kde found in path |
| 1101 | PROJECT_LOADING_FAILED | 500 | Failed to load project |
| 1102 | PROJECT_CONFIG_INVALID | 400 | Invalid config.yaml |
| 1103 | PROJECT_PERMISSION_DENIED | 403 | Cannot access project |
| 1104 | PROJECT_ALREADY_EXISTS | 409 | Project already exists |

### 2.3 Session Errors (1200-1299)

| Code | Name | HTTP | Description |
|------|------|------|-------------|
| 1200 | SESSION_NOT_FOUND | 404 | Session does not exist |
| 1201 | SESSION_NOT_ACTIVE | 400 | Session not in active state |
| 1202 | SESSION_EXPIRED | 410 | Session timed out |
| 1203 | SESSION_CLOSED | 410 | Session was closed |
| 1204 | MAX_SESSIONS_EXCEEDED | 429 | Too many concurrent sessions |

### 2.4 Tool Errors (2000-2999)

#### Validation Errors (2100-2199)

| Code | Name | HTTP | Description |
|------|------|------|-------------|
| 2100 | INVALID_ARGUMENTS | 400 | Generic argument validation failed |
| 2101 | MISSING_REQUIRED_ARGUMENT | 400 | Required argument not provided |
| 2102 | INVALID_ARGUMENT_TYPE | 400 | Argument has wrong type |
| 2103 | INVALID_ARGUMENT_VALUE | 400 | Argument value is invalid |
| 2104 | UNKNOWN_TOOL | 404 | Tool does not exist |
| 2105 | TOOL_NOT_AVAILABLE | 403 | Tool not enabled for project |

#### Execution Errors (2200-2299)

| Code | Name | HTTP | Description |
|------|------|------|-------------|
| 2200 | EXECUTION_FAILED | 500 | Tool execution failed |
| 2201 | EXECUTION_TIMEOUT | 504 | Tool execution timed out |
| 2202 | EXECUTION_CANCELLED | 499 | Tool execution cancelled |
| 2203 | TOOL_IMPLEMENTATION_ERROR | 500 | Tool has internal error |

#### KDE Errors (2300-2399)

| Code | Name | HTTP | Description |
|------|------|------|-------------|
| 2300 | KDE_ERROR | 500 | KDE engine error |
| 2301 | KNOWLEDGE_NOT_FOUND | 404 | Knowledge ID not found |
| 2302 | KNOWLEDGE_ACCESS_DENIED | 403 | Cannot access knowledge |
| 2303 | EVIDENCE_NOT_FOUND | 404 | Evidence ID not found |
| 2304 | EVIDENCE_ACCESS_DENIED | 403 | Cannot access evidence |
| 2305 | VERIFICATION_FAILED | 500 | Verification could not complete |
| 2306 | ANALYSIS_FAILED | 500 | Analysis could not complete |
| 2307 | SIMULATION_FAILED | 500 | Simulation could not complete |

### 2.5 System Errors (9000-9999)

| Code | Name | HTTP | Description |
|------|------|------|-------------|
| 9000 | IO_ERROR | 500 | File system or IO error |
| 9001 | PERMISSION_DENIED | 403 | OS permission denied |
| 9002 | RESOURCE_NOT_FOUND | 404 | Resource file not found |
| 9003 | RESOURCE_CONFLICT | 409 | Resource conflict |

## 3. Error Response Format

### 3.1 Standard Error Response

```json
{
  "error": {
    "code": 1100,
    "name": "PROJECT_NOT_INITIALIZED",
    "message": "No KDE project found. Run 'kde init' to initialize.",
    "details": {
      "searched_path": "/home/user/project/src",
      "root_path": "/"
    },
    "timestamp": "2026-07-19T08:43:08Z",
    "request_id": "req-abc123"
  }
}
```

### 3.2 Validation Error Response

```json
{
  "error": {
    "code": 2100,
    "name": "INVALID_ARGUMENTS",
    "message": "Argument validation failed",
    "details": {
      "arguments": {
        "name": {
          "code": 2103,
          "message": "Must be 1-255 characters",
          "value": ""
        },
        "type": {
          "code": 2102,
          "message": "Must be one of: evidence, artifact, data",
          "value": 123
        }
      }
    },
    "timestamp": "2026-07-19T08:43:08Z",
    "request_id": "req-abc123"
  }
}
```

## 4. Error Implementation

### 4.1 Error Type

```go
type Error struct {
    Code      ErrorCode
    Message   string
    Details   map[string]interface{}
    Timestamp time.Time
    RequestID string
    Cause     error  // Wrapped error, if any
}

func (e *Error) Error() string {
    return fmt.Sprintf("[%d] %s: %s", e.Code, e.Name(), e.Message)
}

func (e *Error) Name() string {
    return ErrorCodes[e.Code].Name
}

func (e *Error) HTTPStatus() int {
    return ErrorCodes[e.Code].HTTPStatus
}
```

### 4.2 Error Construction

```go
var (
    ErrProjectNotInitialized = NewError(
        Code(1100),
        "No KDE project found. Run 'kde init' to initialize.",
    )
    
    ErrInvalidArguments = NewError(
        Code(2100),
        "Argument validation failed",
    )
)

func NewError(code Code, message string) *Error {
    return &Error{
        Code:      code,
        Message:   message,
        Details:   make(map[string]interface{}),
        Timestamp: time.Now(),
    }
}

func (e *Error) WithDetail(key string, value interface{}) *Error {
    e.Details[key] = value
    return e
}

func (e *Error) WithCause(cause error) *Error {
    e.Cause = cause
    return e
}

func (e *Error) WithRequestID(id string) *Error {
    e.RequestID = id
    return e
}
```

### 4.3 Validation Errors

```go
type ValidationError struct {
    Field   string
    Code    ErrorCode
    Message string
    Value   interface{}
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("%s: %s (value: %v)", e.Field, e.Message, e.Value)
}

func InvalidArguments(errors []ValidationError) *Error {
    return ErrInvalidArguments.WithDetail("arguments", errors)
}
```

## 5. Error Handler Interface

```go
type ErrorHandler interface {
    // Handle converts an error to a standard error response
    Handle(err error) *Error
    
    // Wrap adds context to an error
    Wrap(err error, message string) *Error
    
    // Is returns true if the error matches the code
    Is(err error, code ErrorCode) bool
}

type DefaultErrorHandler struct {
    requestIDGenerator func() string
}

func (h *DefaultErrorHandler) Handle(err error) *Error {
    if kdeErr, ok := err.(*Error); ok {
        return kdeErr
    }
    
    // Wrap unknown errors
    return ErrInternalRuntimeError.
        WithCause(err).
        WithDetail("type", fmt.Sprintf("%T", err))
}
```

## 6. Error Recovery

| Error Category | Recovery Action |
|----------------|-----------------|
| PROJECT_NOT_INITIALIZED | User runs `kde init` |
| SESSION_EXPIRED | Create new session |
| INVALID_ARGUMENTS | Fix arguments and retry |
| EXECUTION_TIMEOUT | Retry with longer timeout or optimize |
| INTERNAL_RUNTIME_ERROR | Report to maintainers |

## 7. Logging

Errors are logged at appropriate levels:

| Code Range | Log Level | Include Details |
|------------|-----------|-----------------|
| 1xxx Runtime | ERROR | Stack trace |
| 2xxx Tool | WARN | Arguments (sanitized) |
| 9xxx System | ERROR | Full context |

## 8. Error Code Registry

```go
var ErrorCodes = map[ErrorCode]ErrorDefinition{
    1100: {
        Name:         "PROJECT_NOT_INITIALIZED",
        HTTPStatus:   404,
        Message:      "No KDE project found in path",
        IsRetryable:  false,
    },
    2100: {
        Name:         "INVALID_ARGUMENTS",
        HTTPStatus:   400,
        Message:      "Argument validation failed",
        IsRetryable:  false,
    },
    // ... etc
}
```
```

#### Step 1.8: Create Local Execution Design
**Goal**: Define local-only execution model  
**Method**: Document design without networking  
**Reference**: 008-Local-Execution.md

```markdown
## 008-Local-Execution.md

# Local Execution Design

## 1. Overview

The MCP Runtime starts with **local execution only**. No networking, no HTTP, no JSON-RPC. This approach:

- ✅ Simplifies initial implementation
- ✅ Focuses on core MCP↔KDE interface
- ✅ Makes testing straightforward
- ✅ Reduces attack surface
- ✅ Minimizes changes when networking is added later

## 2. Execution Models

### 2.1 Local Direct Execution (Phase 1)

```
┌─────────────────────────────────────────────────────────────────┐
│                     LOCAL DIRECT EXECUTION                       │
└─────────────────────────────────────────────────────────────────┘

    ┌─────────────┐
    │  Laboratory │
    │ (Test Client)│
    └──────┬──────┘
           │ Direct function call
           ▼
    ┌─────────────┐
    │  MCP Runtime│
    │  (Library)  │
    └──────┬──────┘
           │ Direct function call
           ▼
    ┌─────────────┐
    │  KDE Engine │
    └─────────────┘
```

**Characteristics**:
- MCP Runtime as Go library/package
- Direct function calls
- Same process
- No IPC
- No network

### 2.2 Local Process Execution (Phase 2)

```
┌─────────────────────────────────────────────────────────────────┐
│                    LOCAL PROCESS EXECUTION                       │
└─────────────────────────────────────────────────────────────────┘

    ┌─────────────┐
    │  Laboratory │
    │ (Test Client)│
    └──────┬──────┘
           │ stdin/stdout pipes
           ▼
    ┌─────────────┐
    │  MCP Runtime│
    │  (CLI Tool) │
    └──────┬──────┘
           │ Process call
           ▼
    ┌─────────────┐
    │  KDE Engine │
    └─────────────┘
```

**Characteristics**:
- MCP Runtime as CLI tool
- JSON messages over stdin/stdout
- Separate process
- Still local-only
- Protocol defined but not networked

### 2.3 Networked Execution (Phase 3) — Future

```
┌─────────────────────────────────────────────────────────────────┐
│                    NETWORKED EXECUTION (Future)                  │
└─────────────────────────────────────────────────────────────────┘

    ┌─────────────┐
    │  AI Client  │
    └──────┬──────┘
           │ HTTP/JSON-RPC
           ▼
    ┌─────────────┐     ┌─────────────┐
    │ HTTP Server │────▶│ MCP Runtime │
    │   (Add-on)  │     └──────┬──────┘
    └─────────────┘            │ Local call
                              ▼
                       ┌─────────────┐
                       │  KDE Engine │
                       └─────────────┘
```

**Characteristics**:
- HTTP transport layer added
- JSON-RPC protocol
- MCP spec compliance
- Minimal changes to core

## 3. Local Execution API

### 3.1 Library Mode (Phase 1)

```go
package kde

// Create runtime with configuration
runtime, err := kde.NewRuntime(kde.RuntimeConfig{
    WorkingDir: "/path/to/start",
})

// Discover project
project, err := runtime.DiscoverProject()
if err != nil {
    // Handle error
}

// Create session
session, err := runtime.CreateSession(project)
if err != nil {
    // Handle error
}

// Execute tool
result, err := session.Execute(tool.Request{
    Tool: "status",
    Args: nil,
})
if err != nil {
    // Handle error
}

fmt.Printf("Result: %v\n", result)

// Shutdown
runtime.Shutdown()
```

### 3.2 CLI Mode (Phase 2)

```bash
# Initialize project
$ kde init --name my-project

# Execute tool
$ kde tool status
{
  "runtime": { "version": "1.0.0", "state": "READY" },
  "project": { "name": "my-project" }
}

# Execute with arguments
$ kde tool collect --source ./evidence.txt --type evidence
{
  "collection_id": "uuid",
  "destination": "/path/to/.kde/evidence/uuid"
}
```

## 4. Message Protocol (Local)

Even in local mode, we define a message protocol for consistency:

### 4.1 Request Message

```json
{
  "jsonrpc": "2.0",
  "method": "tool.execute",
  "params": {
    "tool": "collect",
    "arguments": {
      "source": "./evidence.txt",
      "type": "evidence"
    }
  },
  "id": "req-1"
}
```

### 4.2 Response Message

```json
{
  "jsonrpc": "2.0",
  "result": {
    "success": true,
    "data": {
      "collection_id": "uuid",
      "destination": "/path/to/.kde/evidence/uuid"
    }
  },
  "id": "req-1"
}
```

### 4.3 Error Response

```json
{
  "jsonrpc": "2.0",
  "error": {
    "code": 1100,
    "message": "No KDE project found"
  },
  "id": "req-1"
}
```

## 5. Laboratory Integration

The Laboratory acts as the test client:

```
┌─────────────────────────────────────────────────────────────────┐
│                         LABORATORY                                │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    Test Scenarios                           │ │
│  │                                                             │ │
│  │  Scenario 1: Initialize new project                         │ │
│  │  Scenario 2: Execute status tool                           │ │
│  │  Scenario 3: Handle error gracefully                       │ │
│  │  Scenario 4: Concurrent tool execution                    │ │
│  │                                                             │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Calls MCP Runtime
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       MCP RUNTIME                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Calls KDE
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        KDE ENGINE                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 6. Adding Networking Later

When networking is added, minimal changes are needed:

### 6.1 Architecture Extension

```
┌─────────────────────────────────────────────────────────────────┐
│                      ADDED: Network Layer                         │
└─────────────────────────────────────────────────────────────────┘

    ┌─────────────┐
    │  AI Client  │    (Remote)
    └──────┬──────┘
           │ HTTP
           ▼
    ┌─────────────┐
    │ HTTP Server │
    │  (New)      │
    └──────┬──────┘
           │ Local call
           ▼
    ┌─────────────┐
    │ MCP Runtime │    (Existing - unchanged interface)
    │  (Library)  │
    └──────┬──────┘
           │
           ▼
    ┌─────────────┐
    │  KDE Engine │
    └─────────────┘
```

### 6.2 Changes Required for Networking

| Component | Change |
|-----------|--------|
| HTTP Server | New package |
| JSON-RPC Handler | New package |
| Authentication | New package |
| Request Routing | New package |
| MCP Runtime | **No changes** |
| KDE Engine | **No changes** |
| Tool implementations | **No changes** |

## 7. Security Considerations (Local)

| Concern | Mitigation |
|---------|------------|
| Path traversal | Validate all paths |
| File access | Sandbox to project dir |
| Command injection | No shell execution |
| Resource exhaustion | Set memory/CPU limits |
| Privilege escalation | Run as unprivileged user |

## 8. Testing Strategy

### 8.1 Unit Tests

```go
func TestProjectDiscovery(t *testing.T) {
    // Create temp directory structure
    tmpDir := t.TempDir()
    projectDir := filepath.Join(tmpDir, "project")
    os.MkdirAll(filepath.Join(projectDir, ".kde"), 0755)
    
    // Test discovery
    runtime := NewRuntime(RuntimeConfig{WorkingDir: projectDir})
    project, err := runtime.DiscoverProject()
    
    assert.NoError(t, err)
    assert.NotNil(t, project)
}
```

### 8.2 Integration Tests

```go
func TestToolExecution(t *testing.T) {
    // Setup full stack
    runtime := SetupTestRuntime(t)
    session := CreateTestSession(t, runtime)
    
    // Execute tool
    result, err := session.Execute(ToolRequest{
        Tool: "status",
        Args: nil,
    })
    
    assert.NoError(t, err)
    assert.True(t, result.Success)
}
```

### 8.3 Laboratory Tests

```go
// laboratory/scenarios/project_lifecycle_test.go
func TestProjectLifecycle(t *testing.T) {
    // Simulate AI client behavior
    client := NewTestClient()
    
    // Initialize project
    client.Initialize("test-project")
    
    // Execute tools
    client.Status()
    client.Collect("./evidence")
    client.Analyze("evidence-id", "pattern")
    
    // Verify results
    assert.Equal(t, EXPECTED_STATE, client.LastState())
}
```

## 9. Performance Characteristics

| Metric | Local Mode | Future Network |
|--------|-----------|----------------|
| Latency | < 1ms | 10-100ms |
| Throughput | Unlimited | Limited by server |
| Scalability | Single process | Horizontal |
| Complexity | Low | Medium |

## 10. Summary

Local execution provides:

1. ✅ Simple initial implementation
2. ✅ Direct MCP↔KDE testing
3. ✅ No networking complexity
4. ✅ Easy debugging
5. ✅ Clear separation of concerns

Future networking adds only:
- HTTP transport layer
- JSON-RPC protocol
- Authentication
- Remote routing

The core MCP Runtime and KDE Engine remain **unchanged**.
```

#### Step 1.9: Create Repository Layout
**Goal**: Define directory structure  
**Method**: Document purpose of each directory  
**Reference**: 009-Repository-Layout.md

```markdown
## 009-Repository-Layout.md

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
└── mcp/
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
| CLI | `go build ./cmd/mcp` | kde (binary) |
| Tests | `go test ./...` | Test results |
| Docker | `docker build` | kde:latest |

## 9. Summary

The repository layout provides:

1. ✅ Clear separation between MCP and KDE
2. ✅ Testable internal structure
3. ✅ Isolated laboratory for testing
4. ✅ Minimal public API surface
5. ✅ Scalable as project grows
```

#### Step 1.10: Create Development Roadmap
**Goal**: Define implementation phases  
**Method**: Document phases and milestones  
**Reference**: 010-Development-Roadmap.md

```markdown
## 010-Development-Roadmap.md

# Development Roadmap

## 1. Overview

The MCP Runtime is implemented in phases, starting with local execution and adding capabilities incrementally.

## 2. Phase Summary

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          IMPLEMENTATION PHASES                           │
└─────────────────────────────────────────────────────────────────────────┘

  Phase 1          Phase 2          Phase 3          Phase 4
┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│  Core    │──▶│  Tools   │──▶│  CLI     │──▶│ Network  │
│  Runtime │   │  Support │   │  Layer   │   │  Layer   │
└──────────┘   └──────────┘   └──────────┘   └──────────┘
     │               │               │               │
     ▼               ▼               ▼               ▼
┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│ Discovery│   │  All 8  │   │  Local   │   │   HTTP   │
│ initialize│   │  Tools  │   │  JSON    │   │  Server  │
│  status  │   │          │   │  IPC     │   │          │
└──────────┘   └──────────┘   └──────────┘   └──────────┘
```

## 3. Phase 1: Core Runtime

**Duration**: 2-3 weeks  
**Goal**: Basic runtime with discovery and minimal tools

### 3.1 Deliverables

| Deliverable | Description |
|-------------|-------------|
| Project discovery | Walk upward, find `.kde` |
| Runtime initialization | Start up, load project |
| Runtime shutdown | Clean termination |
| `initialize` tool | Create new projects |
| `status` tool | Get runtime state |
| Error handling | All error codes defined |

### 3.2 Milestones

```
Week 1:
  □ Project discovery implemented
  □ Runtime lifecycle implemented
  □ Basic error handling

Week 2:
  □ Initialize tool works
  □ Status tool works
  □ Session management

Week 3:
  □ Integration tests pass
  □ Documentation complete
  □ Phase 1 complete
```

### 3.3 Testing Requirements

- Unit tests for all components
- Integration test for full lifecycle
- Laboratory scenario: project init
- Laboratory scenario: status check

## 4. Phase 2: Tool Support

**Duration**: 3-4 weeks  
**Goal**: All 8 tools implemented and tested

### 4.1 Deliverables

| Deliverable | Description |
|-------------|-------------|
| `collect` tool | Collect evidence/artifacts |
| `analyze` tool | Analyze collected data |
| `verify` tool | Verify against knowledge |
| `simulate` tool | Run simulations |
| `report` tool | Generate reports |
| `knowledge` tool | Query knowledge base |
| Tool registry | Register/deregister tools |
| Tool dispatcher | Route requests |

### 4.2 Milestones

```
Week 4:
  □ Tool registry implemented
  □ Tool dispatcher implemented
  □ Collect tool

Week 5:
  □ Analyze tool
  □ Verify tool
  □ Knowledge tool

Week 6:
  □ Simulate tool
  □ Report tool
  □ Full integration

Week 7:
  □ All 8 tools tested
  □ Performance benchmarks
  □ Phase 2 complete
```

### 4.3 Testing Requirements

- Unit tests per tool
- Integration tests for chains
- Laboratory: full tool suite
- Laboratory: error scenarios

## 5. Phase 3: CLI Layer

**Duration**: 2 weeks  
**Goal**: CLI interface for local use

### 5.1 Deliverables

| Deliverable | Description |
|-------------|-------------|
| CLI entry point | `kde` command |
| `kde init` | Initialize project |
| `kde status` | Check status |
| `kde tool` | Execute tools |
| Local IPC | JSON over stdin/stdout |
| Help system | Built-in documentation |

### 5.2 Milestones

```
Week 8:
  □ CLI framework
  □ kde init command
  □ kde status command

Week 9:
  □ kde tool command
  □ JSON IPC protocol
  □ Help system
  □ Phase 3 complete
```

### 5.3 Testing Requirements

- CLI integration tests
- Manual testing by developers
- Laboratory: CLI scenarios

## 6. Phase 4: Network Layer (Future)

**Duration**: 4-6 weeks  
**Goal**: HTTP/JSON-RPC for remote clients

### 6.1 Deliverables

| Deliverable | Description |
|-------------|-------------|
| HTTP server | REST endpoints |
| JSON-RPC | MCP protocol |
| Authentication | Token-based auth |
| Health checks | /health endpoint |
| Metrics | Prometheus metrics |

### 6.2 Architecture Extension

```
Existing: Local execution
    │
    ▼
Add HTTP transport layer
    │
    ▼
Existing: Tools, session, errors (unchanged)
```

### 6.3 Out of Scope for This Phase

- WebSocket support
- Streaming responses
- Batch requests
- Client SDKs

## 7. Dependencies

### 7.1 External Dependencies

| Dependency | Purpose | Phase |
|-----------|---------|-------|
| Go 1.21+ | Language | 1 |
| YAML parser | Config parsing | 1 |
| Context package | Cancellation | 1 |
| Testing framework | Unit tests | 1 |

### 7.2 KDE Interface

| Interface | Purpose | Phase |
|-----------|---------|-------|
| KDE Engine | Core engine | 1 |
| Knowledge API | Query knowledge | 2 |
| Evidence API | Manage evidence | 2 |
| Analysis API | Run analysis | 2 |

## 8. Validation Plan

### 8.1 Phase 1 Validation

```bash
# Test discovery
$ cd /tmp/test-project
$ kde status
{"error": {"code": 1100, "message": "PROJECT_NOT_INITIALIZED"}}

# Initialize
$ kde init --name test
{"success": true, "project_id": "..."}

# Check status
$ kde status
{"runtime": {"version": "1.0.0", "state": "READY"}, ...}
```

### 8.2 Phase 2 Validation

```bash
# Collect evidence
$ kde tool collect --source ./evidence.txt --type evidence
{"collection_id": "uuid", ...}

# Analyze
$ kde tool analyze --target uuid --method pattern
{"analysis_id": "uuid", "patterns_found": 3, ...}

# Verify
$ kde tool verify --claim "statement"
{"assessment": "SUPPORTS", "confidence": 0.85, ...}
```

### 8.3 Phase 3 Validation

```bash
# CLI works
$ kde --help
Usage: kde <command>

# Subcommands work
$ kde init --help
Usage: kde init [flags]

# JSON IPC works
$ echo '{"method": "tool.execute", ...}' | kde tool
{"jsonrpc": "2.0", "result": {...}}
```

## 9. Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| KDE interface changes | Medium | Define stable interface, version it |
| Performance issues | Low | Benchmarks in each phase |
| Test coverage gaps | Medium | Laboratory scenarios required |
| Scope creep | High | Strict phase boundaries |

## 10. Success Criteria

Each phase is complete when:

1. ✅ All unit tests pass
2. ✅ All integration tests pass
3. ✅ Laboratory scenarios pass
4. ✅ Documentation updated
5. ✅ Code reviewed
6. ✅ No known critical bugs

## 11. Document Index

| Document | Status |
|----------|--------|
| 001-MCP-Overview.md | ✅ Designed |
| 002-Runtime-Architecture.md | ✅ Designed |
| 003-Project-Discovery.md | ✅ Designed |
| 004-Runtime-Lifecycle.md | ✅ Designed |
| 005-Tool-Model.md | ✅ Designed |
| 006-Session-Model.md | ✅ Designed |
| 007-Error-Model.md | ✅ Designed |
| 008-Local-Execution.md | ✅ Designed |
| 009-Repository-Layout.md | ✅ Designed |
| 010-Development-Roadmap.md | ✅ This document |

## 12. Summary

The development roadmap provides:

1. ✅ Phased implementation
2. ✅ Clear milestones
3. ✅ Testable checkpoints
4. ✅ Minimal initial scope
5. ✅ Extensible architecture

**Design Principle**: Start simple. Add complexity only when needed.

---

**Document Status**: ARCHITECTURAL DESIGN COMPLETE  
**Ready for Review**: Yes



