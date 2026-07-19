// Package laboratory provides MCP Runtime testing.
package laboratory

import (
	"fmt"
	"os"

	"github.com/kde/mcp/laboratory/scenarios"
)

// RunInventoryTests runs all inventory management test scenarios.
func RunInventoryTests() {
	fmt.Println("╔══════════════════════════════════════════════════════════╗")
	fmt.Println("║     MCP Laboratory - Inventory Management Tests         ║")
	fmt.Println("╚══════════════════════════════════════════════════════════╝")
	fmt.Println()
	
	// Run all inventory scenarios
	scenarios.InventoryManagementScenario()
	scenarios.InventoryLowStockAlertScenario()
	scenarios.InventoryBulkOperationsScenario()
	
	fmt.Println("╔══════════════════════════════════════════════════════════╗")
	fmt.Println("║                    All Tests Complete                    ║")
	fmt.Println("╚══════════════════════════════════════════════════════════╝")
}

func main() {
	RunInventoryTests()
	os.Exit(0)
}
