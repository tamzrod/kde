// Package session provides session lifecycle management.
package session

import (
	"context"
	"sync"
	"time"

	"github.com/google/uuid"
	"github.com/kde/mcp/internal/errors"
)

// Config contains session manager configuration.
type Config struct {
	SessionTimeout time.Duration
	IdleTimeout    time.Duration
	ToolTimeout    time.Duration
	MaxConcurrent  int
	MaxHistorySize int
}

// DefaultConfig returns the default session configuration.
func DefaultConfig() *Config {
	return &Config{
		SessionTimeout: 30 * time.Minute,
		IdleTimeout:    5 * time.Minute,
		ToolTimeout:    5 * time.Minute,
		MaxConcurrent:  10,
		MaxHistorySize: 1000,
	}
}

// Manager manages client sessions.
type Manager struct {
	config   Config
	mu       sync.RWMutex
	sessions map[ID]*Session
}

// ID is a unique session identifier.
type ID string

// NewID generates a new session ID.
func NewID() ID {
	return ID(uuid.New().String())
}

// NewManager creates a new session manager.
func NewManager(cfg Config) *Manager {
	if cfg.SessionTimeout == 0 {
		cfg.SessionTimeout = 30 * time.Minute
	}
	if cfg.IdleTimeout == 0 {
		cfg.IdleTimeout = 5 * time.Minute
	}
	if cfg.ToolTimeout == 0 {
		cfg.ToolTimeout = 5 * time.Minute
	}
	if cfg.MaxConcurrent == 0 {
		cfg.MaxConcurrent = 10
	}
	if cfg.MaxHistorySize == 0 {
		cfg.MaxHistorySize = 1000
	}

	return &Manager{
		config:   cfg,
		sessions: make(map[ID]*Session),
	}
}

// Create creates a new session.
func (m *Manager) Create(projectID string) (*Session, error) {
	m.mu.Lock()
	defer m.mu.Unlock()

	if len(m.sessions) >= m.config.MaxConcurrent {
		return nil, errors.NewError(errors.CodeMaxSessions, "Too many concurrent sessions").
			WithDetail("max", m.config.MaxConcurrent)
	}

	ctx, cancel := context.WithTimeout(context.Background(), m.config.SessionTimeout)

	session := &Session{
		id:           NewID(),
		projectID:    projectID,
		context:      ctx,
		cancel:       cancel,
		state:        StateActive,
		history:      make([]Call, 0, m.config.MaxHistorySize),
		startedAt:    time.Now(),
		lastActivity: time.Now(),
		maxHistory:   m.config.MaxHistorySize,
	}

	m.sessions[session.id] = session
	return session, nil
}

// Get retrieves a session by ID.
func (m *Manager) Get(id ID) (*Session, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()

	session, exists := m.sessions[id]
	if !exists {
		return nil, errors.NewError(errors.CodeSessionNotFound, "Session not found").
			WithDetail("session_id", string(id))
	}

	return session, nil
}

// Close closes a session.
func (m *Manager) Close(id ID) error {
	m.mu.Lock()
	defer m.mu.Unlock()

	session, exists := m.sessions[id]
	if !exists {
		return errors.NewError(errors.CodeSessionNotFound, "Session not found").
			WithDetail("session_id", string(id))
	}

	session.Close()
	delete(m.sessions, id)
	return nil
}

// CloseAll closes all sessions.
func (m *Manager) CloseAll() {
	m.mu.Lock()
	defer m.mu.Unlock()

	for id := range m.sessions {
		m.sessions[id].Close()
		delete(m.sessions, id)
	}
}

// Count returns the number of active sessions.
func (m *Manager) Count() int {
	m.mu.RLock()
	defer m.mu.RUnlock()
	return len(m.sessions)
}

// Session represents a client session.
type Session struct {
	id            ID
	projectID     string
	context       context.Context
	cancel        context.CancelFunc
	state         State
	history       []Call
	maxHistory    int
	startedAt     time.Time
	lastActivity  time.Time
	mu            sync.Mutex
}

// ID returns the session ID.
func (s *Session) ID() ID {
	return s.id
}

// ProjectID returns the project ID associated with the session.
func (s *Session) ProjectID() string {
	return s.projectID
}

// State returns the current session state.
func (s *Session) State() State {
	s.mu.Lock()
	defer s.mu.Unlock()
	return s.state
}

// History returns the session call history.
func (s *Session) History() []Call {
	s.mu.Lock()
	defer s.mu.Unlock()
	result := make([]Call, len(s.history))
	copy(result, s.history)
	return result
}

// RecordCall records a tool call in the session history.
func (s *Session) RecordCall(call Call) {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.history = append(s.history, call)
	if len(s.history) > s.maxHistory {
		s.history = s.history[len(s.history)-s.maxHistory:]
	}
	s.lastActivity = time.Now()
}

// Close closes the session.
func (s *Session) Close() {
	s.mu.Lock()
	defer s.mu.Unlock()

	if s.cancel != nil {
		s.cancel()
	}
	s.state = StateClosed
}

// UpdateActivity updates the last activity timestamp.
func (s *Session) UpdateActivity() {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.lastActivity = time.Now()
}

// StartedAt returns when the session was created.
func (s *Session) StartedAt() time.Time {
	return s.startedAt
}

// LastActivity returns when the last activity occurred.
func (s *Session) LastActivity() time.Time {
	s.mu.Lock()
	defer s.mu.Unlock()
	return s.lastActivity
}

// State represents the state of a session.
type State string

const (
	StateCreated  State = "created"
	StateActive   State = "active"
	StateIdle     State = "idle"
	StateClosing  State = "closing"
	StateClosed   State = "closed"
)

// Call represents a tool call in session history.
type Call struct {
	ID          string     `json:"id"`
	ToolName    string     `json:"tool_name"`
	Args        map[string]interface{} `json:"args,omitempty"`
	StartedAt   time.Time  `json:"started_at"`
	CompletedAt time.Time  `json:"completed_at,omitempty"`
	Duration    time.Duration `json:"duration,omitempty"`
	Success     bool       `json:"success"`
	Error       *errors.Error `json:"error,omitempty"`
}
