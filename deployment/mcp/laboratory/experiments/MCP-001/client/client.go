// Package client provides a test client simulator for MCP Runtime.
package client

import (
	"context"
	"fmt"
	"time"
)

// Client simulates an AI client interacting with the MCP Runtime.
type Client struct {
	name      string
	projectID string
	runtime   interface{} // MCP Runtime interface
}

// NewClient creates a new test client.
func NewClient(name string) *Client {
	return &Client{
		name: name,
	}
}

// Initialize initializes the client connection to a project.
func (c *Client) Initialize(projectPath string) error {
	c.projectID = projectPath
	fmt.Printf("[%s] Initializing connection to project: %s\n", c.name, projectPath)
	return nil
}

// Status requests runtime status.
func (c *Client) Status() (map[string]interface{}, error) {
	fmt.Printf("[%s] Requesting status...\n", c.name)
	
	// Simulate status response
	return map[string]interface{}{
		"runtime": map[string]interface{}{
			"version": "1.0.0",
			"state":   "ready",
		},
		"client": c.name,
		"time":   time.Now().Format(time.RFC3339),
	}, nil
}

// ExecuteTool executes a tool with the given name and arguments.
func (c *Client) ExecuteTool(toolName string, args map[string]interface{}) (map[string]interface{}, error) {
	fmt.Printf("[%s] Executing tool: %s with args: %v\n", c.name, toolName, args)
	
	// Simulate tool execution
	result := simulateToolExecution(toolName, args)
	
	return result, nil
}

// Close closes the client connection.
func (c *Client) Close() error {
	fmt.Printf("[%s] Closing connection\n", c.name)
	c.projectID = ""
	return nil
}

// simulateToolExecution simulates tool execution for testing.
func simulateToolExecution(toolName string, args map[string]interface{}) map[string]interface{} {
	now := time.Now().Format(time.RFC3339)
	
	switch toolName {
	case "status":
		return map[string]interface{}{
			"status":    "ok",
			"timestamp": now,
		}
		
	case "initialize":
		name := args["name"]
		if name == nil {
			name = "unnamed"
		}
		return map[string]interface{}{
			"project_id":  name,
			"initialized": true,
			"timestamp":   now,
		}
		
	case "collect":
		source := args["source"]
		collectType := args["type"]
		if collectType == nil {
			collectType = "artifact"
		}
		return map[string]interface{}{
			"collection_id": fmt.Sprintf("col-%d", time.Now().Unix()),
			"source":       source,
			"type":        collectType,
			"timestamp":    now,
		}
		
	case "add_item":
		return map[string]interface{}{
			"item_id":    fmt.Sprintf("item-%d", time.Now().Unix()),
			"name":       args["name"],
			"quantity":   args["quantity"],
			"added":      true,
			"timestamp":  now,
		}
		
	case "list_items":
		return map[string]interface{}{
			"items": []map[string]interface{}{
				{"item_id": "item-1", "name": "Widget A", "quantity": 100},
				{"item_id": "item-2", "name": "Widget B", "quantity": 50},
				{"item_id": "item-3", "name": "Gadget X", "quantity": 25},
			},
			"count":     3,
			"timestamp": now,
		}
		
	case "update_stock":
		return map[string]interface{}{
			"item_id":    args["item_id"],
			"new_amount": args["quantity"],
			"updated":    true,
			"timestamp":  now,
		}
		
	case "check_low_stock":
		return map[string]interface{}{
			"low_stock_items": []map[string]interface{}{
				{"item_id": "item-3", "name": "Gadget X", "quantity": 5, "threshold": 10},
			},
			"count":     1,
			"timestamp": now,
		}
		
	case "generate_report":
		return map[string]interface{}{
			"report_id": fmt.Sprintf("rpt-%d", time.Now().Unix()),
			"type":      args["report_type"],
			"summary": map[string]interface{}{
				"total_items":       3,
				"total_quantity":    175,
				"low_stock_count":   1,
				"last_updated":      now,
			},
			"generated_at": now,
		}
		
	default:
		return map[string]interface{}{
			"tool":     toolName,
			"executed": true,
			"timestamp": now,
		}
	}
}

// Scenario represents a test scenario.
type Scenario struct {
	Name        string
	Description string
	Steps       []ScenarioStep
}

// ScenarioStep represents a single step in a scenario.
type ScenarioStep struct {
	Action      string
	Tool        string
	Args        map[string]interface{}
	Expected    map[string]interface{}
}

// Run executes a scenario.
func (c *Client) Run(ctx context.Context, scenario Scenario) error {
	fmt.Printf("\n=== Running Scenario: %s ===\n", scenario.Name)
	fmt.Printf("Description: %s\n\n", scenario.Description)
	
	for i, step := range scenario.Steps {
		fmt.Printf("Step %d: %s (tool: %s)\n", i+1, step.Action, step.Tool)
		
		result, err := c.ExecuteTool(step.Tool, step.Args)
		if err != nil {
			fmt.Printf("  ❌ Error: %v\n", err)
			return err
		}
		
		fmt.Printf("  ✓ Result: %v\n\n", result)
		
		// Check expected values
		if step.Expected != nil {
			for key, expectedValue := range step.Expected {
				if actualValue, ok := result[key]; ok {
					if actualValue != expectedValue {
						fmt.Printf("  ⚠ Warning: Expected %s=%v, got %v\n", key, expectedValue, actualValue)
					}
				}
			}
		}
	}
	
	fmt.Printf("=== Scenario Complete ===\n\n")
	return nil
}
