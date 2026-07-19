// Package tools provides tool registry and dispatching functionality.
package tools

import (
	"context"
	"sync"

	"github.com/google/uuid"
	"github.com/kde/mcp/internal/errors"
)

// Tool represents a callable tool.
type Tool interface {
	Name() string
	Description() string
	InputSchema() Schema
	Execute(ctx context.Context, args map[string]interface{}) (Result, error)
}

// Schema represents a JSON Schema for tool input.
type Schema struct {
	Type       string                 `json:"type"`
	Properties map[string]interface{} `json:"properties,omitempty"`
	Required   []string               `json:"required,omitempty"`
}

// Result represents a tool execution result.
type Result struct {
	Data    interface{} `json:"data"`
	Success bool        `json:"success"`
}

// Registry stores and manages tools.
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

// Unregister unregisters a tool.
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

// Dispatcher dispatches tool requests to registered tools.
type Dispatcher struct {
	registry *Registry
}

// NewDispatcher creates a new tool dispatcher.
func NewDispatcher(registry *Registry) *Dispatcher {
	return &Dispatcher{
		registry: registry,
	}
}

// Request represents a tool execution request.
type Request struct {
	Tool  string                 `json:"tool"`
	Args  map[string]interface{} `json:"args"`
	ID    string                 `json:"id"`
}

// Response represents a tool execution response.
type Response struct {
	CallID string  `json:"call_id"`
	Result *Result `json:"result,omitempty"`
	Error  *errors.Error `json:"error,omitempty"`
}

// Execute dispatches a tool request.
func (d *Dispatcher) Execute(ctx context.Context, req Request) Response {
	// Generate call ID
	callID := uuid.New().String()
	if req.ID != "" {
		callID = req.ID
	}

	// Get the tool
	tool, err := d.registry.Get(req.Tool)
	if err != nil {
		return Response{
			CallID: callID,
			Error:  err.(*errors.Error),
		}
	}

	// Execute the tool
	result, err := tool.Execute(ctx, req.Args)
	if err != nil {
		var mcpErr *errors.Error
		if errors.IsError(err) {
			mcpErr = err.(*errors.Error)
		} else {
			mcpErr = errors.NewError(errors.CodeExecutionFailed, "Tool execution failed").
				WithCause(err)
		}
		return Response{
			CallID: callID,
			Error:  mcpErr,
		}
	}

	return Response{
		CallID: callID,
		Result: &result,
	}
}

// Validate validates tool arguments against the tool's schema.
func (d *Dispatcher) Validate(toolName string, args map[string]interface{}) errors.ValidationErrors {
	tool, err := d.registry.Get(toolName)
	if err != nil {
		return nil
	}

	schema := tool.InputSchema()
	return ValidateArgs(schema, args)
}

// ValidateArgs validates arguments against a schema.
func ValidateArgs(schema Schema, args map[string]interface{}) errors.ValidationErrors {
	var validationErrors errors.ValidationErrors

	// Check required fields
	for _, required := range schema.Required {
		if _, exists := args[required]; !exists {
			validationErrors = append(validationErrors, errors.ValidationError{
				Field:   required,
				Code:    errors.CodeMissingRequiredArgument,
				Message: "Required argument not provided",
			})
		}
	}

	// Additional validation could be added here for type checking, etc.

	return validationErrors
}
