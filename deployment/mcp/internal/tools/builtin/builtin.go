// Package builtin provides built-in MCP tools.
package builtin

import (
	"context"
	"encoding/json"
	"time"

	"github.com/kde/mcp/internal/discovery"
	"github.com/kde/mcp/internal/tools"
)

// StatusTool returns runtime status information.
type StatusTool struct{}

// NewStatusTool creates a new status tool.
func NewStatusTool() *StatusTool {
	return &StatusTool{}
}

// Name returns the tool name.
func (t *StatusTool) Name() string {
	return "status"
}

// Description returns the tool description.
func (t *StatusTool) Description() string {
	return "Get the current runtime status and information"
}

// InputSchema returns the input schema.
func (t *StatusTool) InputSchema() tools.Schema {
	return tools.Schema{
		Type:       "object",
		Properties: map[string]interface{}{},
		Required:   []string{},
	}
}

// Execute executes the status tool.
func (t *StatusTool) Execute(ctx context.Context, args map[string]interface{}) (tools.Result, error) {
	return tools.Result{
		Data: map[string]interface{}{
			"status":    "ok",
			"timestamp": time.Now().UTC().Format(time.RFC3339),
		},
		Success: true,
	}, nil
}

// InitializeTool initializes a new KDE project.
type InitializeTool struct {
	walker *discovery.Walker
}

// NewInitializeTool creates a new initialize tool.
func NewInitializeTool() *InitializeTool {
	return &InitializeTool{
		walker: discovery.NewWalker(),
	}
}

// Name returns the tool name.
func (t *InitializeTool) Name() string {
	return "initialize"
}

// Description returns the tool description.
func (t *InitializeTool) Description() string {
	return "Initialize a new KDE project in the current directory"
}

// InputSchema returns the input schema.
func (t *InitializeTool) InputSchema() tools.Schema {
	return tools.Schema{
		Type: "object",
		Properties: map[string]interface{}{
			"name": map[string]interface{}{
				"type":        "string",
				"description": "Project name",
			},
			"path": map[string]interface{}{
				"type":        "string",
				"description": "Path to initialize (defaults to current directory)",
			},
		},
		Required: []string{"name"},
	}
}

// Execute executes the initialize tool.
func (t *InitializeTool) Execute(ctx context.Context, args map[string]interface{}) (tools.Result, error) {
	name, ok := args["name"].(string)
	if !ok || name == "" {
		return tools.Result{}, nil
	}

	path, ok := args["path"].(string)
	if !ok || path == "" {
		path = "."
	}

	// Create the marker
	if err := t.walker.CreateMarker(path); err != nil {
		return tools.Result{}, err
	}

	return tools.Result{
		Data: map[string]interface{}{
			"project_id": name,
			"path":       path,
			"initialized": true,
		},
		Success: true,
	}, nil
}

// CollectTool collects evidence or artifacts.
type CollectTool struct{}

// NewCollectTool creates a new collect tool.
func NewCollectTool() *CollectTool {
	return &CollectTool{}
}

// Name returns the tool name.
func (t *CollectTool) Name() string {
	return "collect"
}

// Description returns the tool description.
func (t *CollectTool) Description() string {
	return "Collect evidence or artifacts into the project"
}

// InputSchema returns the input schema.
func (t *CollectTool) InputSchema() tools.Schema {
	return tools.Schema{
		Type: "object",
		Properties: map[string]interface{}{
			"source": map[string]interface{}{
				"type":        "string",
				"description": "Source path to collect from",
			},
			"type": map[string]interface{}{
				"type":        "string",
				"description": "Type: evidence, artifact, or data",
				"enum":        []string{"evidence", "artifact", "data"},
			},
		},
		Required: []string{"source", "type"},
	}
}

// Execute executes the collect tool.
func (t *CollectTool) Execute(ctx context.Context, args map[string]interface{}) (tools.Result, error) {
	source, ok := args["source"].(string)
	if !ok {
		source = ""
	}

	collectType, ok := args["type"].(string)
	if !ok {
		collectType = "artifact"
	}

	// Generate collection ID
	collectionID := time.Now().Format("20060102150405")

	return tools.Result{
		Data: map[string]interface{}{
			"collection_id": collectionID,
			"source":        source,
			"type":          collectType,
		},
		Success: true,
	}, nil
}

// ListTools lists all available tools.
type ListToolsTool struct {
	registry *tools.Registry
}

// NewListToolsTool creates a new list tools tool.
func NewListToolsTool(registry *tools.Registry) *ListToolsTool {
	return &ListToolsTool{
		registry: registry,
	}
}

// Name returns the tool name.
func (t *ListToolsTool) Name() string {
	return "list_tools"
}

// Description returns the tool description.
func (t *ListToolsTool) Description() string {
	return "List all available tools"
}

// InputSchema returns the input schema.
func (t *ListToolsTool) InputSchema() tools.Schema {
	return tools.Schema{
		Type:       "object",
		Properties: map[string]interface{}{},
		Required:   []string{},
	}
}

// Execute executes the list tools tool.
func (t *ListToolsTool) Execute(ctx context.Context, args map[string]interface{}) (tools.Result, error) {
	toolList := t.registry.List()

	toolsInfo := make([]map[string]interface{}, 0, len(toolList))
	for _, tool := range toolList {
		schema := tool.InputSchema()
		schemaJSON, _ := json.Marshal(schema)

		toolsInfo = append(toolsInfo, map[string]interface{}{
			"name":        tool.Name(),
			"description": tool.Description(),
			"schema":      string(schemaJSON),
		})
	}

	return tools.Result{
		Data: map[string]interface{}{
			"tools": toolList,
		},
		Success: true,
	}, nil
}

// RegisterBuiltinTools registers all built-in tools with the registry.
func RegisterBuiltinTools(registry *tools.Registry) error {
	builtinTools := []tools.Tool{
		NewStatusTool(),
		NewInitializeTool(),
		NewCollectTool(),
		NewListToolsTool(registry),
	}

	for _, tool := range builtinTools {
		if err := registry.Register(tool); err != nil {
			return err
		}
	}

	return nil
}
