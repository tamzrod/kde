module github.com/kde/mcp

go 1.21

require github.com/google/uuid v1.4.0

// Exclude laboratory test code from main module build
// Laboratory code has separate module structure
exclude github.com/kde/mcp/laboratory v0.0.0
