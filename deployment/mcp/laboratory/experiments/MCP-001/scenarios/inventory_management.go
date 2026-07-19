// Package scenarios provides test scenarios for MCP Runtime.
package scenarios

import (
	"context"

	"github.com/kde/mcp/laboratory/client"
)

// InventoryManagementScenario demonstrates MCP with an inventory management system.
func InventoryManagementScenario() {
	ctx := context.Background()
	
	// Create test client
	testClient := client.NewClient("inventory-ai")
	
	// Initialize connection
	if err := testClient.Initialize("/fixtures/inventory-project"); err != nil {
		panic(err)
	}
	defer testClient.Close()
	
	// Run the inventory management scenario
	scenario := client.Scenario{
		Name:        "Inventory Management System",
		Description: "Test MCP runtime with inventory management operations",
		Steps: []client.ScenarioStep{
			{
				Action: "Check system status",
				Tool:   "status",
				Args:   map[string]interface{}{},
				Expected: map[string]interface{}{
					"status": "ok",
				},
			},
			{
				Action: "Initialize inventory project",
				Tool:   "initialize",
				Args: map[string]interface{}{
					"name": "warehouse-alpha",
				},
				Expected: map[string]interface{}{
					"initialized": true,
				},
			},
			{
				Action: "Add new inventory item",
				Tool:   "add_item",
				Args: map[string]interface{}{
					"name":     "Premium Widget",
					"sku":      "WGT-001",
					"quantity": 100,
					"price":    29.99,
					"category": "widgets",
				},
			},
			{
				Action: "List all inventory items",
				Tool:   "list_items",
				Args: map[string]interface{}{
					"filter": "all",
				},
			},
			{
				Action: "Update stock for existing item",
				Tool:   "update_stock",
				Args: map[string]interface{}{
					"item_id":  "item-1",
					"quantity": 150,
					"reason":   "restock",
				},
			},
			{
				Action: "Check for low stock items",
				Tool:   "check_low_stock",
				Args: map[string]interface{}{
					"threshold": 10,
				},
			},
			{
				Action: "Collect inventory data for analysis",
				Tool:   "collect",
				Args: map[string]interface{}{
					"source":    "./inventory-data.json",
					"type":      "evidence",
					"category":  "inventory_snapshot",
				},
			},
			{
				Action: "Generate inventory report",
				Tool:   "generate_report",
				Args: map[string]interface{}{
					"report_type": "full_inventory",
					"format":      "json",
				},
			},
		},
	}
	
	testClient.Run(ctx, scenario)
}

// InventoryLowStockAlertScenario tests low stock alerting functionality.
func InventoryLowStockAlertScenario() {
	ctx := context.Background()
	
	testClient := client.NewClient("alert-system")
	testClient.Initialize("/fixtures/inventory-project")
	defer testClient.Close()
	
	scenario := client.Scenario{
		Name:        "Low Stock Alert System",
		Description: "Test automatic low stock detection and alerting",
		Steps: []client.ScenarioStep{
			{
				Action: "Check current stock levels",
				Tool:   "check_low_stock",
				Args: map[string]interface{}{
					"threshold": 20,
				},
			},
			{
				Action: "Trigger reorder for low stock item",
				Tool:   "update_stock",
				Args: map[string]interface{}{
					"item_id":  "item-3",
					"quantity": 100,
					"reason":   "reorder",
				},
			},
			{
				Action: "Verify stock levels after reorder",
				Tool:   "check_low_stock",
				Args: map[string]interface{}{
					"threshold": 20,
				},
			},
		},
	}
	
	testClient.Run(ctx, scenario)
}

// InventoryBulkOperationsScenario tests bulk inventory operations.
func InventoryBulkOperationsScenario() {
	ctx := context.Background()
	
	testClient := client.NewClient("bulk-processor")
	testClient.Initialize("/fixtures/inventory-project")
	defer testClient.Close()
	
	scenario := client.Scenario{
		Name:        "Bulk Inventory Operations",
		Description: "Test bulk add, update, and reporting operations",
		Steps: []client.ScenarioStep{
			{
				Action: "Add multiple items in batch",
				Tool:   "add_item",
				Args: map[string]interface{}{
					"name":     "Bulk Item 1",
					"sku":      "BLK-001",
					"quantity": 500,
					"batch":    true,
				},
			},
			{
				Action: "List all items after bulk add",
				Tool:   "list_items",
				Args: map[string]interface{}{
					"filter": "recent",
				},
			},
			{
				Action: "Generate summary report",
				Tool:   "generate_report",
				Args: map[string]interface{}{
					"report_type": "summary",
					"period":      "daily",
				},
			},
		},
	}
	
	testClient.Run(ctx, scenario)
}
