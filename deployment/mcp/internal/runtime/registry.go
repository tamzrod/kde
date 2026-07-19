// Package runtime provides the core MCP Runtime implementation.
package runtime

import (
	"sync"

	"github.com/kde/mcp/internal/errors"
)

// Tool represents a tool that can be executed by the runtime.
type Tool interface {
	Name() string
	Description() string
	Execute(ctx interface{}, args map[string]interface{}) (interface{}, error)
}

// Registry stores tools registered by KDE.
// MCP does NOT define tools - it only stores what KDE registers.
type Registry struct {
	mu    sync.RWMutex
	tools map[string]Tool
}

// NewRegistry creates a new tool registry.
func NewRegistry() *Registry {
	return &Registry{
		tools: make(map[string]Tool),
	}
}

// Register registers a tool with the registry.
func (r *Registry) Register(tool Tool) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if tool == nil {
		return errors.NewError(errors.CodeInternalRuntime, "Cannot register nil tool")
	}

	name := tool.Name()
	if name == "" {
		return errors.NewError(errors.CodeInternalRuntime, "Tool name cannot be empty")
	}

	if _, exists := r.tools[name]; exists {
		return errors.NewError(errors.CodeProjectExists, "Tool already registered").
			WithDetail("tool", name)
	}

	r.tools[name] = tool
	return nil
}

// Unregister unregisters a tool from the registry.
func (r *Registry) Unregister(name string) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if _, exists := r.tools[name]; !exists {
		return errors.NewError(errors.CodeUnknownTool, "Tool not found").
			WithDetail("tool", name)
	}

	delete(r.tools, name)
	return nil
}

// Get retrieves a tool by name.
func (r *Registry) Get(name string) (Tool, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()

	tool, exists := r.tools[name]
	if !exists {
		return nil, errors.NewError(errors.CodeUnknownTool, "Tool not found").
			WithDetail("tool", name)
	}

	return tool, nil
}

// List returns all registered tools.
func (r *Registry) List() []Tool {
	r.mu.RLock()
	defer r.mu.RUnlock()

	tools := make([]Tool, 0, len(r.tools))
	for _, tool := range r.tools {
		tools = append(tools, tool)
	}

	return tools
}

// Count returns the number of registered tools.
func (r *Registry) Count() int {
	r.mu.RLock()
	defer r.mu.RUnlock()
	return len(r.tools)
}

// Has returns true if a tool is registered.
func (r *Registry) Has(name string) bool {
	r.mu.RLock()
	defer r.mu.RUnlock()
	_, exists := r.tools[name]
	return exists
}

// Clear removes all registered tools.
func (r *Registry) Clear() {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.tools = make(map[string]Tool)
}
