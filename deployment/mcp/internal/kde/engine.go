// Package kde provides KDE engine integration.
// KDE logic lives in KDE; this is only the integration layer.
package kde

import (
	"github.com/kde/mcp/internal/discovery"
	"github.com/kde/mcp/internal/errors"
	"github.com/kde/mcp/internal/runtime"
	"github.com/kde/mcp/internal/tools/builtin"
)

// Loader loads the KDE engine.
type Loader struct {
	walker *discovery.Walker
}

// NewLoader creates a new KDE engine loader.
func NewLoader() *Loader {
	return &Loader{
		walker: discovery.NewWalker(),
	}
}

// Load loads the KDE engine for a project.
func (l *Loader) Load(projectPath string) (*runtime.Project, error) {
	// Discover the project
	projectRoot, err := l.walker.Discover(projectPath)
	if err != nil {
		return nil, err
	}

	// Validate the project
	if err := l.walker.DetectMarker(projectRoot); err != nil {
		return nil, errors.NewError(errors.CodeProjectInvalid, "Invalid KDE project").
			WithCause(err)
	}

	return &runtime.Project{
		Root:  projectRoot,
		State: runtime.ProjectStateActive,
	}, nil
}

// Unload unloads a project.
func (l *Loader) Unload(project *runtime.Project) error {
	if project == nil {
		return errors.NewError(errors.CodeProjectInvalid, "Project cannot be nil")
	}
	project.State = runtime.ProjectStateUnloaded
	return nil
}

// Validate validates a project path.
func (l *Loader) Validate(projectPath string) error {
	_, err := l.walker.Discover(projectPath)
	return err
}

// Engine represents the KDE engine interface.
type Engine interface {
	Initialize() error
	Shutdown() error
	RegisterTools(registry *tools.Registry) error
}

// DefaultEngine is a placeholder for the KDE engine.
type DefaultEngine struct{}

// Initialize initializes the engine.
func (e *DefaultEngine) Initialize() error {
	return nil
}

// Shutdown shuts down the engine.
func (e *DefaultEngine) Shutdown() error {
	return nil
}

// RegisterTools registers KDE tools with the registry.
func (e *DefaultEngine) RegisterTools(registry *tools.Registry) error {
	// Register built-in tools
	return builtin.RegisterBuiltinTools(registry)
}
