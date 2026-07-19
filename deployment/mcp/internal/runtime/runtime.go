// Package runtime provides the core MCP Runtime implementation.
package runtime

import (
	"context"
	"fmt"
	"sync"
	"time"

	"github.com/kde/mcp/internal/errors"
	"github.com/kde/mcp/internal/session"
	"github.com/kde/mcp/internal/tools"
)

// Runtime represents the MCP Runtime.
// Runtime owns process lifecycle, KDE reference, registry, and sessions.
type Runtime struct {
	config   *Config
	state    State
	mu       sync.RWMutex
	registry *tools.Registry
	loader   ProjectLoader
	sessions *session.Manager
}

// Config contains runtime configuration.
type Config struct {
	WorkingDir      string
	SessionTimeout  time.Duration
	IdleTimeout     time.Duration
	ToolTimeout     time.Duration
	MaxConcurrent   int
	MaxHistorySize  int
	EnableDiscovery bool
	DiscoveryPath   string
}

// DefaultConfig returns the default runtime configuration.
func DefaultConfig() *Config {
	return &Config{
		SessionTimeout:  30 * time.Minute,
		IdleTimeout:      5 * time.Minute,
		ToolTimeout:      5 * time.Minute,
		MaxConcurrent:    10,
		MaxHistorySize:   1000,
		EnableDiscovery:  true,
	}
}

// State represents the current state of the runtime.
type State string

const (
	StateCreated      State = "created"
	StateInitializing State = "initializing"
	StateReady        State = "ready"
	StateShuttingDown State = "shutting_down"
	StateShutdown     State = "shutdown"
)

// New creates a new Runtime with the given configuration.
func New(cfg *Config) (*Runtime, error) {
	if cfg == nil {
		cfg = DefaultConfig()
	}

	r := &Runtime{
		config:   cfg,
		state:    StateCreated,
		registry: tools.NewRegistry(),
		sessions: session.NewManager(session.Config{
			SessionTimeout:  cfg.SessionTimeout,
			IdleTimeout:     cfg.IdleTimeout,
			ToolTimeout:     cfg.ToolTimeout,
			MaxConcurrent:   cfg.MaxConcurrent,
			MaxHistorySize:  cfg.MaxHistorySize,
		}),
	}

	return r, nil
}

// Initialize initializes the runtime.
func (r *Runtime) Initialize(ctx context.Context) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if r.state != StateCreated {
		return errors.ErrRuntimeNotInitialized.WithDetail("state", string(r.state))
	}

	r.state = StateInitializing

	// TODO: Load KDE engine, initialize components
	// For now, just set ready state
	r.state = StateReady

	return nil
}

// Shutdown gracefully shuts down the runtime.
func (r *Runtime) Shutdown(ctx context.Context) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if r.state == StateShutdown {
		return nil
	}

	r.state = StateShuttingDown

	// Close all sessions
	r.sessions.CloseAll()

	// TODO: Unload KDE engine, cleanup components

	r.state = StateShutdown
	return nil
}

// State returns the current runtime state.
func (r *Runtime) State() State {
	r.mu.RLock()
	defer r.mu.RUnlock()
	return r.state
}

// IsReady returns true if the runtime is ready.
func (r *Runtime) IsReady() bool {
	return r.State() == StateReady
}

// Registry returns the tool registry.
func (r *Runtime) Registry() *tools.Registry {
	return r.registry
}

// SessionManager returns the session manager.
func (r *Runtime) SessionManager() *session.Manager {
	return r.sessions
}

// SetProjectLoader sets the project loader.
func (r *Runtime) SetProjectLoader(loader ProjectLoader) {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.loader = loader
}

// DiscoverProject discovers a project starting from the working directory.
func (r *Runtime) DiscoverProject(ctx context.Context, startPath string) (*Project, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	if r.state != StateReady && r.state != StateCreated {
		return nil, errors.ErrRuntimeNotReady
	}

	if r.loader == nil {
		return nil, errors.NewError(errors.CodeInternalRuntime, "No project loader configured")
	}

	return r.loader.Load(startPath)
}

// Status returns the runtime status.
func (r *Runtime) Status() Status {
	r.mu.RLock()
	defer r.mu.RUnlock()

	return Status{
		Version:       "1.0.0",
		State:         string(r.state),
		SessionCount:  r.sessions.Count(),
		ToolCount:     r.registry.Count(),
		ReadyAt:        time.Now(),
	}
}

// Status represents the runtime status.
type Status struct {
	Version      string    `json:"version"`
	State        string    `json:"state"`
	SessionCount int       `json:"session_count"`
	ToolCount    int       `json:"tool_count"`
	ReadyAt      time.Time `json:"ready_at"`
}

// Project represents a KDE project.
type Project struct {
	Root  string          `json:"root"`
	State ProjectState    `json:"state"`
	Name  string          `json:"name,omitempty"`
}

// ProjectState represents the state of a project.
type ProjectState string

const (
	ProjectStateUnloaded ProjectState = "unloaded"
	ProjectStateLoading  ProjectState = "loading"
	ProjectStateActive   ProjectState = "active"
	ProjectStateError    ProjectState = "error"
)

// ProjectLoader interface for loading/unloading projects.
type ProjectLoader interface {
	Load(path string) (*Project, error)
	Unload(project *Project) error
	Validate(path string) error
}

// Validate performs runtime validation.
func (r *Runtime) Validate() error {
	r.mu.RLock()
	defer r.mu.RUnlock()

	if r.state != StateReady && r.state != StateCreated {
		return fmt.Errorf("runtime in invalid state: %s", r.state)
	}

	if r.registry == nil {
		return fmt.Errorf("registry not initialized")
	}

	if r.sessions == nil {
		return fmt.Errorf("session manager not initialized")
	}

	return nil
}
