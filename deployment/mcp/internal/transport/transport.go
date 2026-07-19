// Package transport provides transport layer implementations.
package transport

import (
	"github.com/kde/mcp/internal/runtime"
)

// Transport interface for handling client connections.
// Transport is the only thing that changes for networking.
// MCP runtime itself is unchanged.
type Transport interface {
	Serve(runtime *runtime.Runtime) error
	Close() error
}

// LocalTransport provides local (in-process) transport.
type LocalTransport struct{}

// NewLocalTransport creates a new local transport.
func NewLocalTransport() *LocalTransport {
	return &LocalTransport{}
}

// Serve starts the local transport.
func (t *LocalTransport) Serve(r *runtime.Runtime) error {
	// Local transport is synchronous - just return nil
	return nil
}

// Close closes the local transport.
func (t *LocalTransport) Close() error {
	return nil
}
