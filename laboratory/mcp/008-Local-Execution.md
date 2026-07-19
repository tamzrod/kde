# Local Execution Design

## 1. Overview

The MCP Runtime starts with **local execution only**. No networking, no HTTP, no JSON-RPC. This approach:

- ✅ Simplifies initial implementation
- ✅ Focuses on core MCP↔KDE interface
- ✅ Makes testing straightforward
- ✅ Reduces attack surface
- ✅ Minimizes changes when networking is added later

## 2. Execution Models

### 2.1 Local Direct Execution (Phase 1)

```
┌─────────────────────────────────────────────────────────────────┐
│                     LOCAL DIRECT EXECUTION                       │
└─────────────────────────────────────────────────────────────────┘

    ┌─────────────┐
    │  Laboratory │
    │ (Test Client)│
    └──────┬──────┘
           │ Direct function call
           ▼
    ┌─────────────┐
    │  MCP Runtime│
    │  (Library)  │
    └──────┬──────┘
           │ Direct function call
           ▼
    ┌─────────────┐
    │  KDE Engine │
    └─────────────┘
```

**Characteristics**:
- MCP Runtime as Go library/package
- Direct function calls
- Same process
- No IPC
- No network

### 2.2 Local Process Execution (Phase 2)

```
┌─────────────────────────────────────────────────────────────────┐
│                    LOCAL PROCESS EXECUTION                       │
└─────────────────────────────────────────────────────────────────┘

    ┌─────────────┐
    │  Laboratory │
    │ (Test Client)│
    └──────┬──────┘
           │ stdin/stdout pipes
           ▼
    ┌─────────────┐
    │  MCP Runtime│
    │  (CLI Tool) │
    └──────┬──────┘
           │ Process call
           ▼
    ┌─────────────┐
    │  KDE Engine │
    └─────────────┘
```

**Characteristics**:
- MCP Runtime as CLI tool
- JSON messages over stdin/stdout
- Separate process
- Still local-only
- Protocol defined but not networked

### 2.3 Networked Execution (Phase 3) — Future

```
┌─────────────────────────────────────────────────────────────────┐
│                    NETWORKED EXECUTION (Future)                  │
└─────────────────────────────────────────────────────────────────┘

    ┌─────────────┐
    │  AI Client  │
    └──────┬──────┘
           │ HTTP/JSON-RPC
           ▼
    ┌─────────────┐     ┌─────────────┐
    │ HTTP Server │────▶│ MCP Runtime │
    │   (Add-on)  │     └──────┬──────┘
    └─────────────┘            │ Local call
                              ▼
                       ┌─────────────┐
                       │  KDE Engine │
                       └─────────────┘
```

**Characteristics**:
- HTTP transport layer added
- JSON-RPC protocol
- MCP spec compliance
- Minimal changes to core

## 3. Local Execution API

### 3.1 Library Mode (Phase 1)

```go
package kde

// Create runtime with configuration
runtime, err := kde.NewRuntime(kde.RuntimeConfig{
    WorkingDir: "/path/to/start",
})

// Discover project
project, err := runtime.DiscoverProject()
if err != nil {
    // Handle error
}

// Create session
session, err := runtime.CreateSession(project)
if err != nil {
    // Handle error
}

// Execute tool
result, err := session.Execute(tool.Request{
    Tool: "status",
    Args: nil,
})
if err != nil {
    // Handle error
}

fmt.Printf("Result: %v\n", result)

// Shutdown
runtime.Shutdown()
```

### 3.2 CLI Mode (Phase 2)

```bash
# Initialize project
$ kde init --name my-project

# Execute tool
$ kde tool status
{
  "runtime": { "version": "1.0.0", "state": "READY" },
  "project": { "name": "my-project" }
}

# Execute with arguments
$ kde tool collect --source ./evidence.txt --type evidence
{
  "collection_id": "uuid",
  "destination": "/path/to/.kde/evidence/uuid"
}
```

## 4. Message Protocol (Local)

Even in local mode, we define a message protocol for consistency:

### 4.1 Request Message

```json
{
  "jsonrpc": "2.0",
  "method": "tool.execute",
  "params": {
    "tool": "collect",
    "arguments": {
      "source": "./evidence.txt",
      "type": "evidence"
    }
  },
  "id": "req-1"
}
```

### 4.2 Response Message

```json
{
  "jsonrpc": "2.0",
  "result": {
    "success": true,
    "data": {
      "collection_id": "uuid",
      "destination": "/path/to/.kde/evidence/uuid"
    }
  },
  "id": "req-1"
}
```

### 4.3 Error Response

```json
{
  "jsonrpc": "2.0",
  "error": {
    "code": 1100,
    "message": "No KDE project found"
  },
  "id": "req-1"
}
```

## 5. Laboratory Integration

The Laboratory acts as the test client:

```
┌─────────────────────────────────────────────────────────────────┐
│                         LABORATORY                                │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    Test Scenarios                           │ │
│  │                                                             │ │
│  │  Scenario 1: Initialize new project                         │ │
│  │  Scenario 2: Execute status tool                           │ │
│  │  Scenario 3: Handle error gracefully                       │ │
│  │  Scenario 4: Concurrent tool execution                    │ │
│  │                                                             │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Calls MCP Runtime
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       MCP RUNTIME                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Calls KDE
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        KDE ENGINE                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 6. Adding Networking Later

When networking is added, minimal changes are needed:

### 6.1 Architecture Extension

```
┌─────────────────────────────────────────────────────────────────┐
│                      ADDED: Network Layer                         │
└─────────────────────────────────────────────────────────────────┘

    ┌─────────────┐
    │  AI Client  │    (Remote)
    └──────┬──────┘
           │ HTTP
           ▼
    ┌─────────────┐
    │ HTTP Server │
    │  (New)      │
    └──────┬──────┘
           │ Local call
           ▼
    ┌─────────────┐
    │ MCP Runtime │    (Existing - unchanged interface)
    │  (Library)  │
    └──────┬──────┘
           │
           ▼
    ┌─────────────┐
    │  KDE Engine │
    └─────────────┘
```

### 6.2 Changes Required for Networking

| Component | Change |
|-----------|--------|
| HTTP Server | New package |
| JSON-RPC Handler | New package |
| Authentication | New package |
| Request Routing | New package |
| MCP Runtime | **No changes** |
| KDE Engine | **No changes** |
| Tool implementations | **No changes** |

## 7. Security Considerations (Local)

| Concern | Mitigation |
|---------|------------|
| Path traversal | Validate all paths |
| File access | Sandbox to project dir |
| Command injection | No shell execution |
| Resource exhaustion | Set memory/CPU limits |
| Privilege escalation | Run as unprivileged user |

## 8. Testing Strategy

### 8.1 Unit Tests

```go
func TestProjectDiscovery(t *testing.T) {
    // Create temp directory structure
    tmpDir := t.TempDir()
    projectDir := filepath.Join(tmpDir, "project")
    os.MkdirAll(filepath.Join(projectDir, ".kde"), 0755)
    
    // Test discovery
    runtime := NewRuntime(RuntimeConfig{WorkingDir: projectDir})
    project, err := runtime.DiscoverProject()
    
    assert.NoError(t, err)
    assert.NotNil(t, project)
}
```

### 8.2 Integration Tests

```go
func TestToolExecution(t *testing.T) {
    // Setup full stack
    runtime := SetupTestRuntime(t)
    session := CreateTestSession(t, runtime)
    
    // Execute tool
    result, err := session.Execute(ToolRequest{
        Tool: "status",
        Args: nil,
    })
    
    assert.NoError(t, err)
    assert.True(t, result.Success)
}
```

### 8.3 Laboratory Tests

```go
// laboratory/scenarios/project_lifecycle_test.go
func TestProjectLifecycle(t *testing.T) {
    // Simulate AI client behavior
    client := NewTestClient()
    
    // Initialize project
    client.Initialize("test-project")
    
    // Execute tools
    client.Status()
    client.Collect("./evidence")
    client.Analyze("evidence-id", "pattern")
    
    // Verify results
    assert.Equal(t, EXPECTED_STATE, client.LastState())
}
```

## 9. Performance Characteristics

| Metric | Local Mode | Future Network |
|--------|-----------|----------------|
| Latency | < 1ms | 10-100ms |
| Throughput | Unlimited | Limited by server |
| Scalability | Single process | Horizontal |
| Complexity | Low | Medium |

## 10. Summary

Local execution provides:

1. ✅ Simple initial implementation
2. ✅ Direct MCP↔KDE testing
3. ✅ No networking complexity
4. ✅ Easy debugging
5. ✅ Clear separation of concerns

Future networking adds only:
- HTTP transport layer
- JSON-RPC protocol
- Authentication
- Remote routing

The core MCP Runtime and KDE Engine remain **unchanged**.
