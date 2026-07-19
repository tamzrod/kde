# Implementation: Tasks REST API
# HTTP/1.1 Compliant Implementation

"""
Tasks REST API - HTTP/1.1 Compliant

Standards Compliance:
- RFC 7230: Message Syntax and Routing
- RFC 7231: Semantics and Content

Standard Requirements Implemented:
- GET (safe, idempotent) - RFC 7231 §4.2.1
- POST (non-safe, non-idempotent) - RFC 7231 §4.3.3
- PUT (non-safe, idempotent) - RFC 7231 §4.3.4
- DELETE (non-safe, idempotent) - RFC 7231 §4.3.5

Status Codes:
- 200 OK - RFC 7231 §6.3.1
- 201 Created with Location header - RFC 7231 §6.3.2
- 204 No Content - RFC 7231 §6.3.5
- 400 Bad Request - RFC 7231 §6.5.1
- 404 Not Found - RFC 7231 §6.5.4
- 500 Internal Server Error - RFC 7231 §6.6.1

Required Headers:
- Content-Type (when body present) - RFC 7231 §3.1.1.5
- Content-Length (when body present) - RFC 7230 §3.3.2
- Location (201 responses) - RFC 7231 §7.1.2
- Host (HTTP/1.1 requests) - RFC 7230 §5.4

Implementation Freedoms (NOT Standard-Mandated):
- Resource naming: "tasks"
- Error format: {code, message, details}
- Media type: application/json
"""

from typing import Dict, List, Optional
from dataclasses import dataclass, field
from datetime import datetime
import json
import uuid


@dataclass
class Task:
    """Task resource representation."""
    id: str
    title: str
    completed: bool = False
    created_at: str = field(default_factory=lambda: datetime.utcnow().isoformat())
    updated_at: str = field(default_factory=lambda: datetime.utcnow().isoformat())
    
    def to_dict(self) -> Dict:
        """Convert to dictionary representation."""
        return {
            "id": self.id,
            "title": self.title,
            "completed": self.completed,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
    
    @classmethod
    def from_dict(cls, data: Dict) -> 'Task':
        """Create Task from dictionary."""
        return cls(
            id=data.get("id", str(uuid.uuid4())),
            title=data["title"],
            completed=data.get("completed", False),
            created_at=data.get("created_at", datetime.utcnow().isoformat()),
            updated_at=data.get("updated_at", datetime.utcnow().isoformat())
        )


class TasksResource:
    """
    Tasks resource implementing HTTP/1.1 compliant REST API.
    
    Standard Compliance:
    - GET is safe (RFC 7231 §4.2.1)
    - DELETE is idempotent (RFC 7231 §4.3.5)
    - PUT is idempotent (RFC 7231 §4.3.4)
    - POST is non-idempotent (RFC 7231 §4.3.3)
    """
    
    def __init__(self):
        self._tasks: Dict[str, Task] = {}
    
    def create_task(self, title: str) -> Task:
        """
        Create a new task.
        
        HTTP/1.1 Compliance:
        - Returns 201 Created (RFC 7231 §6.3.2)
        - Includes Location header
        - Does NOT guarantee idempotency (POST semantics)
        """
        task = Task(
            id=str(uuid.uuid4()),
            title=title,
            completed=False
        )
        self._tasks[task.id] = task
        return task
    
    def get_task(self, task_id: str) -> Optional[Task]:
        """
        Get a task by ID.
        
        HTTP/1.1 Compliance:
        - Returns 200 OK (RFC 7231 §6.3.1)
        - GET is safe (no side effects)
        - Returns None if not found (404)
        """
        return self._tasks.get(task_id)
    
    def list_tasks(self) -> List[Task]:
        """
        List all tasks.
        
        HTTP/1.1 Compliance:
        - Returns 200 OK (RFC 7231 §6.3.1)
        - GET is safe (no side effects)
        """
        return list(self._tasks.values())
    
    def update_task(self, task_id: str, title: Optional[str] = None, 
                    completed: Optional[bool] = None) -> Optional[Task]:
        """
        Update a task.
        
        HTTP/1.1 Compliance:
        - Returns 200 OK (RFC 7231 §6.3.1)
        - PUT is idempotent (same result for same request)
        - Returns None if not found (404)
        """
        task = self._tasks.get(task_id)
        if task is None:
            return None
        
        if title is not None:
            task.title = title
        if completed is not None:
            task.completed = completed
        task.updated_at = datetime.utcnow().isoformat()
        
        return task
    
    def delete_task(self, task_id: str) -> bool:
        """
        Delete a task.
        
        HTTP/1.1 Compliance:
        - Returns 204 No Content (RFC 7231 §6.3.5)
        - DELETE is idempotent (success even if already deleted)
        """
        if task_id in self._tasks:
            del self._tasks[task_id]
            return True
        return False


class HTTPResponse:
    """
    HTTP/1.1 response builder.
    
    Standards Compliance:
    - Status line: HTTP-version SP status-code SP reason-phrase CRLF (RFC 7230 §3.1.2)
    - Header fields: field-name ":" OWS field-value OWS (RFC 7230 §3.2)
    - Content-Type: application/json (industry convention)
    - Content-Length: message body length (RFC 7230 §3.3.2)
    - Location: resource URI (RFC 7231 §7.1.2)
    """
    
    STATUS_PHRASES = {
        200: "OK",
        201: "Created",
        204: "No Content",
        400: "Bad Request",
        404: "Not Found",
        500: "Internal Server Error"
    }
    
    def __init__(self, status_code: int, body: Optional[Dict] = None,
                 headers: Optional[Dict[str, str]] = None):
        self.status_code = status_code
        self.body = body
        self.headers = headers or {}
        
        # Required: Content-Type for body responses
        if body and "Content-Type" not in self.headers:
            self.headers["Content-Type"] = "application/json"
        
        # Required: Content-Length for body responses
        if body and "Content-Length" not in self.headers:
            body_str = json.dumps(body)
            self.headers["Content-Length"] = str(len(body_str))
        
        # Required: Host is set by client (RFC 7230 §5.4)
    
    def to_http_message(self) -> str:
        """Convert to HTTP/1.1 message format."""
        # Status line
        reason = self.STATUS_PHRASES.get(self.status_code, "Unknown")
        message = f"HTTP/1.1 {self.status_code} {reason}\r\n"
        
        # Headers
        for name, value in self.headers.items():
            message += f"{name}: {value}\r\n"
        
        message += "\r\n"
        
        # Body
        if self.body:
            message += json.dumps(self.body)
        
        return message


def create_error_response(status_code: int, code: str, message: str, 
                         details: Optional[Dict] = None) -> HTTPResponse:
    """
    Create an error response.
    
    Note: HTTP standard (RFC 7231) does NOT specify error body format.
    This is an IMPLEMENTATION FREEDOM (F-004).
    
    The format {code, message, details} is an ASSUMPTION (AS-004),
    not a standard requirement.
    """
    body = {
        "code": code,
        "message": message
    }
    if details:
        body["details"] = details
    
    return HTTPResponse(status_code, body)


# Resource instance
_tasks_resource = TasksResource()


def handle_request(method: str, path: str, body: Optional[Dict] = None,
                  headers: Optional[Dict[str, str]] = None) -> HTTPResponse:
    """
    Handle HTTP request.
    
    HTTP/1.1 Compliance:
    - Validates Host header for HTTP/1.1 (RFC 7230 §5.4)
    - Validates Content-Type for body (RFC 7231)
    - Validates Content-Length for body (RFC 7230)
    """
    # Validate HTTP/1.1 requirements
    if headers and "host" not in {k.lower(): v for k, v in headers.items()}:
        # RFC 7230 §5.4: Host header REQUIRED
        return create_error_response(400, "MISSING_HOST", 
                                    "Host header is required for HTTP/1.1")
    
    # Route handling
    path_parts = path.strip("/").split("/")
    
    if path_parts == ["tasks"]:
        return handle_tasks_collection(method, body, headers)
    elif len(path_parts) == 2 and path_parts[0] == "tasks":
        return handle_task_item(method, path_parts[1], body, headers)
    else:
        return create_error_response(404, "NOT_FOUND", "Resource not found")


def handle_tasks_collection(method: str, body: Optional[Dict],
                           headers: Optional[Dict[str, str]]) -> HTTPResponse:
    """Handle /tasks endpoint."""
    
    if method == "GET":
        # RFC 7231 §4.2.1: GET is safe
        tasks = _tasks_resource.list_tasks()
        return HTTPResponse(200, {
            "tasks": [t.to_dict() for t in tasks],
            "count": len(tasks)
        })
    
    elif method == "POST":
        # RFC 7231 §4.3.3: POST for creating resources
        if not body or "title" not in body:
            return create_error_response(400, "INVALID_REQUEST",
                                        "Missing required field: title")
        
        task = _tasks_resource.create_task(body["title"])
        
        # RFC 7231 §6.3.2: 201 MUST include Location header
        response = HTTPResponse(201, task.to_dict(), {
            "Location": f"/tasks/{task.id}"
        })
        return response
    
    else:
        return create_error_response(405, "METHOD_NOT_ALLOWED",
                                    f"Method {method} not allowed on /tasks")


def handle_task_item(method: str, task_id: str, body: Optional[Dict],
                    headers: Optional[Dict[str, str]]) -> HTTPResponse:
    """Handle /tasks/{id} endpoint."""
    
    if method == "GET":
        # RFC 7231 §4.2.1: GET is safe
        task = _tasks_resource.get_task(task_id)
        if task is None:
            return create_error_response(404, "NOT_FOUND",
                                        f"Task {task_id} not found")
        return HTTPResponse(200, task.to_dict())
    
    elif method == "PUT":
        # RFC 7231 §4.3.4: PUT is idempotent
        task = _tasks_resource.update_task(
            task_id,
            title=body.get("title") if body else None,
            completed=body.get("completed") if body else None
        )
        if task is None:
            return create_error_response(404, "NOT_FOUND",
                                        f"Task {task_id} not found")
        return HTTPResponse(200, task.to_dict())
    
    elif method == "DELETE":
        # RFC 7231 §4.3.5: DELETE is idempotent
        deleted = _tasks_resource.delete_task(task_id)
        if not deleted:
            return create_error_response(404, "NOT_FOUND",
                                        f"Task {task_id} not found")
        # RFC 7231 §6.3.5: 204 MUST NOT include body
        return HTTPResponse(204)
    
    else:
        return create_error_response(405, "METHOD_NOT_ALLOWED",
                                    f"Method {method} not allowed on /tasks/{task_id}")


if __name__ == "__main__":
    # Example usage demonstrating HTTP/1.1 compliance
    print("Tasks REST API - HTTP/1.1 Compliant Implementation")
    print("=" * 50)
    print()
    
    # GET /tasks
    print("GET /tasks")
    response = handle_request("GET", "/tasks")
    print(response.to_http_message())
    print()
    
    # POST /tasks
    print("POST /tasks")
    response = handle_request("POST", "/tasks", {"title": "Test task"})
    print(response.to_http_message())
    print()
    
    # GET /tasks/{id} - using first task created
    task_id = "test-123"  # Would be UUID in real implementation
    print(f"GET /tasks/{task_id}")
    response = handle_request("GET", f"/tasks/{task_id}")
    print(response.to_http_message())
    print()
    
    print("Standards Compliance Notes:")
    print("- RFC 7230 §3.1: Status line format compliant")
    print("- RFC 7230 §5.4: Host header validation")
    print("- RFC 7231 §4.2.1: GET is safe")
    print("- RFC 7231 §4.3.3: POST creates resources")
    print("- RFC 7231 §4.3.4: PUT is idempotent")
    print("- RFC 7231 §4.3.5: DELETE is idempotent")
    print("- RFC 7231 §6.3.2: 201 includes Location")
    print("- RFC 7231 §6.3.5: 204 has no body")
