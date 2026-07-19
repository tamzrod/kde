// Package internal contains the MCP Runtime infrastructure.
// MCP knows nothing about KDE business logic - these are pure infrastructure types.
package internal

import (
	"context"
	"time"
)

// Tool represents a tool registered by KDE, not defined by MCP.
// MCP only stores and dispatches tools - it does not know what they do.
type Tool interface {
	Name() string
	Description() string
	InputSchema() JSONSchema
	Execute(ctx context.Context, args map[string]interface{}) (Result, error)
}

// JSONSchema represents a JSON Schema for tool input validation.
type JSONSchema struct {
	Type       string                 `json:"type"`
	Properties map[string]interface{} `json:"properties,omitempty"`
	Required   []string               `json:"required,omitempty"`
}

// Result is a generic execution result container.
type Result struct {
	Data    interface{} `json:"data"`
	Success bool       `json:"success"`
}

// Request is a generic request container.
type Request struct {
	Tool string                 `json:"tool"`
	Args map[string]interface{} `json:"args"`
	ID   string                 `json:"id"`
}

// Response is a generic response container.
type Response struct {
	Result *Result `json:"result,omitempty"`
	Error  *Error  `json:"error,omitempty"`
	ID     string  `json:"id"`
}

// Registry stores tools registered by KDE.
// MCP does NOT define tools - it only stores what KDE registers.
type Registry interface {
	Register(tool Tool) error
	Unregister(name string) error
	Get(name string) (Tool, error)
	List() []Tool
}

// ProjectLoader interface that KDE implements.
// MCP does NOT define project structure (config.yaml, knowledge/, etc.)
// MCP only asks KDE to load/unload.
type ProjectLoader interface {
	Load(path string) (*Project, error)
	Unload(project *Project) error
	Validate(path string) error
}

// Project represents an opaque project reference.
// MCP does not know the internal structure of a project.
type Project struct {
	Root  string       `json:"root"`
	State ProjectState `json:"state"`
}

// ProjectState represents the current state of a project.
type ProjectState string

const (
	ProjectStateUnloaded ProjectState = "unloaded"
	ProjectStateLoading  ProjectState = "loading"
	ProjectStateActive  ProjectState = "active"
	ProjectStateError   ProjectState = "error"
)

// Session represents a client session.
// Session is communication state only - MCP does not know what tools do.
type Session struct {
	ID           SessionID           `json:"id"`
	Project      *Project            `json:"project"`
	Context      context.Context     `json:"-"`
	Metadata     map[string]string   `json:"metadata"`
	History      []CallRecord        `json:"history"`
	CreatedAt    time.Time           `json:"created_at"`
	LastActivity time.Time           `json:"last_activity"`
	State        SessionState        `json:"state"`
}

// SessionID is a unique session identifier.
type SessionID string

// SessionState represents the current state of a session.
type SessionState string

const (
	SessionStateCreated SessionState = "created"
	SessionStateActive  SessionState = "active"
	SessionStateIdle    SessionState = "idle"
	SessionStateClosing SessionState = "closing"
	SessionStateClosed  SessionState = "closed"
)

// CallRecord records a single tool call in session history.
type CallRecord struct {
	ID          string     `json:"id"`
	ToolName    string     `json:"tool_name"`
	StartedAt   time.Time  `json:"started_at"`
	CompletedAt time.Time  `json:"completed_at"`
	Duration    time.Duration `json:"duration"`
	Success     bool       `json:"success"`
	Error       *Error     `json:"error,omitempty"`
}

// Transport interface for handling client connections.
// Transport is the only thing that changes for networking.
// MCP runtime itself is unchanged.
type Transport interface {
	Serve(runtime *Runtime) error
	Close() error
}

// Runtime represents the MCP Runtime.
// Runtime owns process, KDE reference, registry, and sessions.
type Runtime struct {
	config   *RuntimeConfig
	state    RuntimeState
	registry Registry
	loader   ProjectLoader
	sessions map[SessionID]*Session
	engine   interface{} // KDE engine reference (opaque to MCP)
}

// RuntimeConfig contains runtime configuration.
type RuntimeConfig struct {
	WorkingDir        string
	SessionTimeout    time.Duration
	MaxConcurrent     int
	EnableDiscovery   bool
	DiscoveryPath     string
}

// RuntimeState represents the current state of the runtime.
type RuntimeState string

const (
	RuntimeStateCreated     RuntimeState = "created"
	RuntimeStateInitializing RuntimeState = "initializing"
	RuntimeStateReady      RuntimeState = "ready"
	RuntimeStateShuttingDown RuntimeState = "shutting_down"
	RuntimeStateShutdown   RuntimeState = "shutdown"
)

// Error represents a standard MCP error.
type Error struct {
	Code      ErrorCode               `json:"code"`
	Name      string                  `json:"name"`
	Message   string                  `json:"message"`
	Details   map[string]interface{}  `json:"details,omitempty"`
	Timestamp time.Time               `json:"timestamp"`
	RequestID string                  `json:"request_id,omitempty"`
	Cause     error                   `json:"-"`
}

// ErrorCode represents a numeric error code.
type ErrorCode int

const (
	// Runtime errors (1000-1999)
	ErrInternalRuntime   ErrorCode = 1000
	ErrRuntimeNotReady  ErrorCode = 1001
	ErrRuntimeShuttingDown ErrorCode = 1002

	// Project errors (1100-1199)
	ErrProjectNotFound   ErrorCode = 1100
	ErrProjectLoadFailed ErrorCode = 1101
	ErrProjectInvalid   ErrorCode = 1102
	ErrProjectExists    ErrorCode = 1103

	// Session errors (1200-1299)
	ErrSessionNotFound  ErrorCode = 1200
	ErrSessionExpired   ErrorCode = 1201
	ErrSessionClosed    ErrorCode = 1202
	ErrMaxSessions      ErrorCode = 1203

	// Tool errors (2000-2999)
	ErrUnknownTool     ErrorCode = 2000
	ErrInvalidArgs     ErrorCode = 2001
	ErrToolNotFound    ErrorCode = 2002
	ErrToolExecFailed  ErrorCode = 2003

	// Transport errors (3000-3999)
	ErrTransportError ErrorCode = 3000

	// System errors (9000-9999)
	ErrIOError         ErrorCode = 9000
	ErrPermission     ErrorCode = 9001
	ErrResourceNotFound ErrorCode = 9002
)

// ToolRequest represents a request to execute a tool.
type ToolRequest struct {
	Tool string                 `json:"tool"`
	Args map[string]interface{} `json:"args"`
	ID   string                 `json:"id"`
}

// ToolResponse represents a response from tool execution.
type ToolResponse struct {
	CallID string  `json:"call_id"`
	Result *Result `json:"result,omitempty"`
	Error  *Error  `json:"error,omitempty"`
}
