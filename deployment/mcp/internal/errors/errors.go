// Package errors provides MCP Runtime error handling.
// MCP defines infrastructure errors only - KDE tool errors are passed through.
package errors

import (
	"fmt"
	"time"
)

// Error represents a standard MCP error.
type Error struct {
	Code      Code       `json:"code"`
	Name      string     `json:"name"`
	Message   string     `json:"message"`
	Details   Details    `json:"details,omitempty"`
	Timestamp time.Time  `json:"timestamp"`
	RequestID string     `json:"request_id,omitempty"`
	Cause     error      `json:"-"`
}

// Details is a map of additional error details.
type Details map[string]interface{}

// Code represents a numeric error code.
type Code int

const (
	// Runtime errors (1000-1999)
	CodeInternalRuntime    Code = 1000
	CodeRuntimeNotReady    Code = 1001
	CodeRuntimeShuttingDown Code = 1002

	// Project errors (1100-1199)
	CodeProjectNotFound    Code = 1100
	CodeProjectLoadFailed  Code = 1101
	CodeProjectInvalid     Code = 1102
	CodeProjectExists      Code = 1103
	CodeProjectPermission  Code = 1104

	// Session errors (1200-1299)
	CodeSessionNotFound   Code = 1200
	CodeSessionNotActive   Code = 1201
	CodeSessionExpired     Code = 1202
	CodeSessionClosed      Code = 1203
	CodeMaxSessions        Code = 1204

	// Tool validation errors (2000-2099)
	CodeInvalidArguments       Code = 2100
	CodeMissingRequiredArgument Code = 2101
	CodeInvalidArgumentType    Code = 2102
	CodeInvalidArgumentValue   Code = 2103
	CodeUnknownTool            Code = 2104
	CodeToolNotAvailable       Code = 2105

	// Tool execution errors (2200-2299)
	CodeExecutionFailed       Code = 2200
	CodeExecutionTimeout      Code = 2201
	CodeExecutionCancelled    Code = 2202
	CodeToolImplementationError Code = 2203

	// KDE errors (2300-2399)
	CodeKDEError           Code = 2300
	CodeKnowledgeNotFound  Code = 2301
	CodeKnowledgeAccessDenied Code = 2302
	CodeEvidenceNotFound   Code = 2303
	CodeEvidenceAccessDenied Code = 2304
	CodeVerificationFailed  Code = 2305
	CodeAnalysisFailed      Code = 2306
	CodeSimulationFailed    Code = 2307

	// Transport errors (3000-3999)
	CodeTransportError Code = 3000

	// System errors (9000-9999)
	CodeIOError          Code = 9000
	CodePermissionDenied Code = 9001
	CodeResourceNotFound Code = 9002
	CodeResourceConflict Code = 9003
)

// ErrorDefinition contains metadata for an error code.
type ErrorDefinition struct {
	Name        string
	HTTPStatus  int
	Message     string
	IsRetryable bool
}

// ErrorCodes maps error codes to their definitions.
var ErrorCodes = map[Code]ErrorDefinition{
	CodeInternalRuntime: {Name: "INTERNAL_RUNTIME_ERROR", HTTPStatus: 500, Message: "Unexpected internal error", IsRetryable: false},
	CodeRuntimeNotReady: {Name: "RUNTIME_NOT_READY", HTTPStatus: 500, Message: "Runtime not started", IsRetryable: false},
	CodeRuntimeShuttingDown: {Name: "RUNTIME_SHUTTING_DOWN", HTTPStatus: 503, Message: "Runtime is shutting down", IsRetryable: false},

	CodeProjectNotFound: {Name: "PROJECT_NOT_INITIALIZED", HTTPStatus: 404, Message: "No .kde found in path", IsRetryable: false},
	CodeProjectLoadFailed: {Name: "PROJECT_LOADING_FAILED", HTTPStatus: 500, Message: "Failed to load project", IsRetryable: true},
	CodeProjectInvalid: {Name: "PROJECT_CONFIG_INVALID", HTTPStatus: 400, Message: "Invalid config.yaml", IsRetryable: false},
	CodeProjectExists: {Name: "PROJECT_ALREADY_EXISTS", HTTPStatus: 409, Message: "Project already exists", IsRetryable: false},
	CodeProjectPermission: {Name: "PROJECT_PERMISSION_DENIED", HTTPStatus: 403, Message: "Cannot access project", IsRetryable: false},

	CodeSessionNotFound: {Name: "SESSION_NOT_FOUND", HTTPStatus: 404, Message: "Session does not exist", IsRetryable: false},
	CodeSessionNotActive: {Name: "SESSION_NOT_ACTIVE", HTTPStatus: 400, Message: "Session not in active state", IsRetryable: false},
	CodeSessionExpired: {Name: "SESSION_EXPIRED", HTTPStatus: 410, Message: "Session timed out", IsRetryable: false},
	CodeSessionClosed: {Name: "SESSION_CLOSED", HTTPStatus: 410, Message: "Session was closed", IsRetryable: false},
	CodeMaxSessions: {Name: "MAX_SESSIONS_EXCEEDED", HTTPStatus: 429, Message: "Too many concurrent sessions", IsRetryable: true},

	CodeInvalidArguments: {Name: "INVALID_ARGUMENTS", HTTPStatus: 400, Message: "Generic argument validation failed", IsRetryable: false},
	CodeMissingRequiredArgument: {Name: "MISSING_REQUIRED_ARGUMENT", HTTPStatus: 400, Message: "Required argument not provided", IsRetryable: false},
	CodeInvalidArgumentType: {Name: "INVALID_ARGUMENT_TYPE", HTTPStatus: 400, Message: "Argument has wrong type", IsRetryable: false},
	CodeInvalidArgumentValue: {Name: "INVALID_ARGUMENT_VALUE", HTTPStatus: 400, Message: "Argument value is invalid", IsRetryable: false},
	CodeUnknownTool: {Name: "UNKNOWN_TOOL", HTTPStatus: 404, Message: "Tool does not exist", IsRetryable: false},
	CodeToolNotAvailable: {Name: "TOOL_NOT_AVAILABLE", HTTPStatus: 403, Message: "Tool not enabled for project", IsRetryable: false},

	CodeExecutionFailed: {Name: "EXECUTION_FAILED", HTTPStatus: 500, Message: "Tool execution failed", IsRetryable: true},
	CodeExecutionTimeout: {Name: "EXECUTION_TIMEOUT", HTTPStatus: 504, Message: "Tool execution timed out", IsRetryable: true},
	CodeExecutionCancelled: {Name: "EXECUTION_CANCELLED", HTTPStatus: 499, Message: "Tool execution cancelled", IsRetryable: false},
	CodeToolImplementationError: {Name: "TOOL_IMPLEMENTATION_ERROR", HTTPStatus: 500, Message: "Tool has internal error", IsRetryable: false},

	CodeKDEError: {Name: "KDE_ERROR", HTTPStatus: 500, Message: "KDE engine error", IsRetryable: true},
	CodeKnowledgeNotFound: {Name: "KNOWLEDGE_NOT_FOUND", HTTPStatus: 404, Message: "Knowledge ID not found", IsRetryable: false},
	CodeKnowledgeAccessDenied: {Name: "KNOWLEDGE_ACCESS_DENIED", HTTPStatus: 403, Message: "Cannot access knowledge", IsRetryable: false},
	CodeEvidenceNotFound: {Name: "EVIDENCE_NOT_FOUND", HTTPStatus: 404, Message: "Evidence ID not found", IsRetryable: false},
	CodeEvidenceAccessDenied: {Name: "EVIDENCE_ACCESS_DENIED", HTTPStatus: 403, Message: "Cannot access evidence", IsRetryable: false},
	CodeVerificationFailed: {Name: "VERIFICATION_FAILED", HTTPStatus: 500, Message: "Verification could not complete", IsRetryable: true},
	CodeAnalysisFailed: {Name: "ANALYSIS_FAILED", HTTPStatus: 500, Message: "Analysis could not complete", IsRetryable: true},
	CodeSimulationFailed: {Name: "SIMULATION_FAILED", HTTPStatus: 500, Message: "Simulation could not complete", IsRetryable: true},

	CodeTransportError: {Name: "TRANSPORT_ERROR", HTTPStatus: 500, Message: "Transport error", IsRetryable: true},

	CodeIOError: {Name: "IO_ERROR", HTTPStatus: 500, Message: "File system or IO error", IsRetryable: true},
	CodePermissionDenied: {Name: "PERMISSION_DENIED", HTTPStatus: 403, Message: "OS permission denied", IsRetryable: false},
	CodeResourceNotFound: {Name: "RESOURCE_NOT_FOUND", HTTPStatus: 404, Message: "Resource file not found", IsRetryable: false},
	CodeResourceConflict: {Name: "RESOURCE_CONFLICT", HTTPStatus: 409, Message: "Resource conflict", IsRetryable: false},
}

// NewError creates a new Error with the given code and message.
func NewError(code Code, message string) *Error {
	def := ErrorCodes[code]
	return &Error{
		Code:      code,
		Name:      def.Name,
		Message:   message,
		Details:   make(Details),
		Timestamp: time.Now(),
	}
}

// Error implements the error interface.
func (e *Error) Error() string {
	return fmt.Sprintf("[%d] %s: %s", e.Code, e.Name, e.Message)
}

// WithDetail adds a key-value detail to the error.
func (e *Error) WithDetail(key string, value interface{}) *Error {
	e.Details[key] = value
	return e
}

// WithDetails adds multiple key-value details to the error.
func (e *Error) WithDetails(details Details) *Error {
	for k, v := range details {
		e.Details[k] = v
	}
	return e
}

// WithCause wraps an underlying error.
func (e *Error) WithCause(cause error) *Error {
	e.Cause = cause
	return e
}

// WithRequestID sets the request ID.
func (e *Error) WithRequestID(id string) *Error {
	e.RequestID = id
	return e
}

// HTTPStatus returns the HTTP status code for this error.
func (e *Error) HTTPStatus() int {
	return ErrorCodes[e.Code].HTTPStatus
}

// IsRetryable returns true if the error is retryable.
func (e *Error) IsRetryable() bool {
	return ErrorCodes[e.Code].IsRetryable
}

// ValidationError represents an argument validation error.
type ValidationError struct {
	Field   string      `json:"field"`
	Code    Code        `json:"code"`
	Message string      `json:"message"`
	Value   interface{} `json:"value,omitempty"`
}

// Error implements the error interface.
func (e *ValidationError) Error() string {
	return fmt.Sprintf("%s: %s (value: %v)", e.Field, e.Message, e.Value)
}

// ValidationErrors is a collection of validation errors.
type ValidationErrors []ValidationError

// Error implements the error interface.
func (ve ValidationErrors) Error() string {
	if len(ve) == 0 {
		return ""
	}
	if len(ve) == 1 {
		return ve[0].Error()
	}
	return fmt.Sprintf("%d validation errors", len(ve))
}

// HasErrors returns true if there are any validation errors.
func (ve ValidationErrors) HasErrors() bool {
	return len(ve) > 0
}

// InvalidArguments creates an error from validation errors.
func InvalidArguments(errors ValidationErrors) *Error {
	return NewError(CodeInvalidArguments, "Argument validation failed").
		WithDetail("arguments", errors)
}

// Predefined errors for common scenarios.
var (
	ErrProjectNotInitialized = NewError(CodeProjectNotFound, "No KDE project found. Run 'kde init' to initialize.")
	ErrProjectExists = NewError(CodeProjectExists, "Project already exists")
	ErrRuntimeNotInitialized = NewError(CodeRuntimeNotReady, "Runtime not started")
	ErrRuntimeNotReady = NewError(CodeRuntimeNotReady, "Runtime not ready to handle requests")
	ErrRuntimeShutting = NewError(CodeRuntimeShuttingDown, "Runtime is shutting down")
)

// IsError checks if err is an *Error.
func IsError(err error) bool {
	_, ok := err.(*Error)
	return ok
}
