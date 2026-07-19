// Package main is the CLI entry point for the KDE MCP Runtime.
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"time"

	"github.com/kde/mcp/internal/discovery"
	"github.com/kde/mcp/internal/runtime"
	"github.com/kde/mcp/internal/session"
	"github.com/kde/mcp/internal/tools"
	"github.com/kde/mcp/internal/tools/builtin"
)

func main() {
	// Get working directory
	workingDir, err := os.Getwd()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error: %v\n", err)
		os.Exit(1)
	}

	// Create runtime
	cfg := runtime.DefaultConfig()
	cfg.WorkingDir = workingDir

	mcpRuntime, err := runtime.New(cfg)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error creating runtime: %v\n", err)
		os.Exit(1)
	}

	// Initialize runtime
	ctx := context.Background()
	if err := mcpRuntime.Initialize(ctx); err != nil {
		fmt.Fprintf(os.Stderr, "Error initializing runtime: %v\n", err)
		os.Exit(1)
	}

	// Register built-in tools
	registry := mcpRuntime.Registry()
	if err := builtin.RegisterBuiltinTools(registry); err != nil {
		fmt.Fprintf(os.Stderr, "Error registering tools: %v\n", err)
		os.Exit(1)
	}

	// Create session
	sess, err := mcpRuntime.SessionManager().Create("default")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error creating session: %v\n", err)
		os.Exit(1)
	}

	// Parse command
	if len(os.Args) < 2 {
		printUsage()
		os.Exit(0)
	}

	command := os.Args[1]

	switch command {
	case "status":
		handleStatus(mcpRuntime)
	case "init":
		handleInit(os.Args[2:])
	case "tool":
		handleTool(sess, mcpRuntime, os.Args[2:])
	case "discover":
		handleDiscover(workingDir)
	case "help":
		printUsage()
	default:
		fmt.Fprintf(os.Stderr, "Unknown command: %s\n", command)
		printUsage()
		os.Exit(1)
	}

	// Shutdown
	mcpRuntime.Shutdown(ctx)
}

func printUsage() {
	fmt.Println(`KDE MCP Runtime

Usage:
  kde <command> [arguments]

Commands:
  status              Get runtime status
  init <name>         Initialize a new KDE project
  tool <name> [args]  Execute a tool
  discover            Discover project in current directory
  help                Show this help message
`)
}

func handleStatus(r *runtime.Runtime) {
	status := r.Status()
	output, err := json.MarshalIndent(status, "", "  ")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error: %v\n", err)
		os.Exit(1)
	}
	fmt.Println(string(output))
}

func handleInit(args []string) {
	if len(args) < 1 {
		fmt.Fprintf(os.Stderr, "Error: init requires a project name\n")
		os.Exit(1)
	}

	name := args[0]
	walker := discovery.NewWalker()

	workingDir, _ := os.Getwd()

	// Create marker
	if err := walker.CreateMarker(workingDir); err != nil {
		fmt.Fprintf(os.Stderr, "Error: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("Initialized KDE project '%s' at %s\n", name, workingDir)
}

func handleTool(sess *session.Session, r *runtime.Runtime, args []string) {
	if len(args) < 1 {
		fmt.Fprintf(os.Stderr, "Error: tool requires a tool name\n")
		os.Exit(1)
	}

	toolName := args[0]
	dispatcher := tools.NewDispatcher(r.Registry())

	// Parse tool arguments
	toolArgs := parseToolArgs(args[1:])

	req := tools.Request{
		Tool: toolName,
		Args: toolArgs,
		ID:   time.Now().Format("20060102150405"),
	}

	// Record call in session
	call := session.Call{
		ID:        req.ID,
		ToolName:  req.Tool,
		Args:      req.Args,
		StartedAt: time.Now(),
	}

	// Execute tool
	ctx := context.Background()
	resp := dispatcher.Execute(ctx, req)

	call.CompletedAt = time.Now()
	call.Duration = call.CompletedAt.Sub(call.StartedAt)
	call.Success = resp.Result != nil && resp.Result.Success

	if resp.Error != nil {
		call.Error = resp.Error
		call.Success = false
		fmt.Fprintf(os.Stderr, "Error: %v\n", resp.Error)
		os.Exit(1)
	}

	sess.RecordCall(call)

	output, err := json.MarshalIndent(resp.Result, "", "  ")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error: %v\n", err)
		os.Exit(1)
	}
	fmt.Println(string(output))
}

func parseToolArgs(args []string) map[string]interface{} {
	result := make(map[string]interface{})

	for _, arg := range args {
		// Parse key=value format
		for i := 0; i < len(arg); i++ {
			if arg[i] == '=' {
				key := arg[:i]
				value := arg[i+1:]
				result[key] = value
				break
			}
		}
	}

	return result
}

func handleDiscover(workingDir string) {
	walker := discovery.NewWalker()

	projectPath, err := walker.Discover(workingDir)
	if err != nil {
		fmt.Fprintf(os.Stderr, "No KDE project found: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("Found KDE project at: %s\n", projectPath)
}
