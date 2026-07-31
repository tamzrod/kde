# HTTP/1.1 Response Generator
# Generated from KDE Laboratory LAB-007

"""
HTTP/1.1 Response Generator

This implementation is completely traceable to collected knowledge.

Knowledge Sources:
- M-01 through M-07: Mandatory requirements (RFC 7230)
- O-01 through O-06: Optional features (RFC 7231)
- F-01 through F-05: Implementation freedoms
- AS-01 through AS-04: Tracked assumptions

Traceability:
Every line of code is justified by one of:
- Standard requirement (M-series)
- Optional feature (O-series)
- Design decision (F-series)
- Assumption (AS-series)

Evidence:
- EV-RFC7230: RFC 7230 (Message Syntax)
- EV-RFC7231: RFC 7231 (Semantics)
"""

import json
from typing import Dict, Optional, Any
from datetime import datetime, timezone


# =============================================================================
# STATUS LINE GENERATION (M-01, M-02, M-03, M-04)
# =============================================================================

class StatusLine:
    """
    Generates HTTP/1.1 status line.
    
    Standard Requirements:
    - M-01: HTTP/1.1 SP status-code SP reason-phrase CRLF
    - M-02: HTTP-version MUST be "HTTP/1.1"
    - M-03: status-code MUST be 3-digit number
    - M-04: CRLF is line terminator
    """
    
    # Standard reason phrases (F-01: Use standard phrases)
    REASON_PHRASES: Dict[int, str] = {
        200: "OK",
        201: "Created",
        204: "No Content",
        400: "Bad Request",
        401: "Unauthorized",
        403: "Forbidden",
        404: "Not Found",
        500: "Internal Server Error",
        502: "Bad Gateway",
        503: "Service Unavailable",
    }
    
    def __init__(self, status_code: int, reason_phrase: Optional[str] = None):
        """
        Initialize status line.
        
        Justification:
        - status_code: M-03 (3-digit number)
        - reason_phrase: F-01 (optional, use standard if not provided)
        """
        # M-03: Status code validation - MUST be 3-digit
        if not (100 <= status_code <= 999):
            raise ValueError(f"Status code must be 3-digit: {status_code}")
        self.status_code = status_code
        
        # F-01: Use provided phrase or standard phrase
        if reason_phrase is not None:
            self.reason_phrase = reason_phrase
        else:
            self.reason_phrase = self.REASON_PHRASES.get(status_code, "Unknown")
    
    def to_bytes(self) -> bytes:
        """
        Generate status line as bytes.
        
        Justification:
        - M-01: HTTP/1.1 SP status-code SP reason-phrase CRLF
        - M-02: HTTP-version = "HTTP/1.1"
        - M-04: CRLF = \\r\\n
        """
        # M-02: HTTP-version is always "HTTP/1.1"
        http_version = "HTTP/1.1"
        
        # M-01: Format: HTTP/1.1 SP status-code SP reason-phrase CRLF
        # Using bytes for proper encoding (F-05: ASCII)
        status_line = f"{http_version} {self.status_code} {self.reason_phrase}\r\n"
        return status_line.encode('ascii')


# =============================================================================
# HEADER GENERATION (M-05, M-06, O-01, O-02, O-03, O-05)
# =============================================================================

class Headers:
    """
    Generates HTTP/1.1 headers.
    
    Standard Requirements:
    - M-05: Headers end with empty line (CRLF)
    - M-06: Header field format: name:value CRLF
    - O-02: Content-Length header
    - O-03: Date header
    
    Design Decisions:
    - F-02: Header order is alphabetical
    """
    
    def __init__(self):
        """Initialize empty headers container."""
        self._headers: Dict[str, str] = {}
    
    def add(self, name: str, value: str) -> 'Headers':
        """
        Add a header.
        
        Justification:
        - M-06: Header field format
        
        Design Decision:
        - F-02: Header names are title-cased for consistency
        """
        # M-06: Header names are case-insensitive, but we normalize
        self._headers[name.title()] = value
        return self
    
    def set_content_type(self, content_type: str) -> 'Headers':
        """
        Set Content-Type header.
        
        Justification:
        - O-01: Content-Type header is optional but recommended
        """
        return self.add("Content-Type", content_type)
    
    def set_content_length(self, length: int) -> 'Headers':
        """
        Set Content-Length header.
        
        Justification:
        - O-02: Content-Length for body length
        - M-07: Body length determined by Content-Length
        """
        return self.add("Content-Length", str(length))
    
    def set_date(self) -> 'Headers':
        """
        Set Date header.
        
        Justification:
        - O-03: Date header (RFC 7231 §2.5)
        - AS-04: ISO 8601 format for dates
        """
        # RFC 7231 §2.5: IMF-fixdate format
        now = datetime.now(timezone.utc)
        date_str = now.strftime('%a, %d %b %Y %H:%M:%S GMT')
        return self.add("Date", date_str)
    
    def set_server(self, server: str = "KDE-LAB/1.0") -> 'Headers':
        """
        Set Server header.
        
        Justification:
        - O-05: Server header
        - AS-03: Server identification string
        """
        return self.add("Server", server)
    
    def set_location(self, location: str) -> 'Headers':
        """
        Set Location header.
        
        Justification:
        - O-04: Location header (RFC 7231 §7.1.2)
        """
        return self.add("Location", location)
    
    def to_bytes(self) -> bytes:
        """
        Generate headers as bytes.
        
        Justification:
        - M-06: Header format: name: value\\r\\n
        - M-05: Empty line (\\r\\n) terminates headers
        - F-02: Headers in alphabetical order
        """
        lines = []
        
        # F-02: Alphabetical header order for consistency
        for name in sorted(self._headers.keys()):
            value = self._headers[name]
            # M-06: Format: name: value\\r\\n
            lines.append(f"{name}: {value}\r\n")
        
        # M-05: Empty line terminates header section
        lines.append("\r\n")
        
        return "".join(lines).encode('ascii')


# =============================================================================
# HTTP RESPONSE (COMBINING ALL PARTS)
# =============================================================================

class HTTPResponse:
    """
    Generates complete HTTP/1.1 response.
    
    Combines:
    - Status line (M-01 through M-04)
    - Headers (M-05, M-06, O-01 through O-05)
    - Body (optional)
    
    Standard Requirements:
    - M-01 through M-07: All mandatory requirements
    - O-01 through O-06: Optional features
    """
    
    def __init__(
        self,
        status_code: int,
        body: Optional[Any] = None,
        content_type: str = "application/json",
        reason_phrase: Optional[str] = None,
        headers: Optional[Dict[str, str]] = None
    ):
        """
        Initialize HTTP response.
        
        Justification:
        - status_code: M-03
        - body: Optional (M-07 handles length)
        - content_type: AS-01 (application/json convention)
        """
        # Generate status line
        self.status_line = StatusLine(status_code, reason_phrase)
        
        # Initialize headers
        self.headers = Headers()
        
        # O-03: Always include Date header
        self.headers.set_date()
        
        # O-05: Always include Server header
        self.headers.set_server()
        
        # O-01: Set Content-Type if body present
        if body is not None:
            # AS-01: application/json convention
            self.headers.set_content_type(content_type)
        
        # Add custom headers
        if headers:
            for name, value in headers.items():
                self.headers.add(name, value)
        
        # Process body
        self.body = body
        if body is not None:
            # AS-02: Serialize body as JSON string
            if isinstance(body, (dict, list)):
                body_bytes = json.dumps(body).encode('utf-8')
            else:
                body_bytes = str(body).encode('utf-8')
            
            # O-02: Content-Length for body length
            self.headers.set_content_length(len(body_bytes))
            self._body_bytes = body_bytes
        else:
            self._body_bytes = b""
    
    def to_bytes(self) -> bytes:
        """
        Generate complete HTTP response as bytes.
        
        Justification:
        - M-01: Status line first
        - M-05: Headers follow status line
        - M-06: Header format
        - M-07: Body length from Content-Length
        """
        parts = []
        
        # M-01: Status line
        parts.append(self.status_line.to_bytes())
        
        # M-05: Headers
        parts.append(self.headers.to_bytes())
        
        # M-07: Body (if present)
        parts.append(self._body_bytes)
        
        return b"".join(parts)
    
    def __str__(self) -> str:
        """String representation for debugging."""
        return self.to_bytes().decode('ascii', errors='replace')


# =============================================================================
# FACTORY FUNCTIONS (CONVENIENCE)
# =============================================================================

def ok(body: Any = None, **kwargs) -> HTTPResponse:
    """Create 200 OK response."""
    return HTTPResponse(200, body, **kwargs)


def created(location: str, body: Any = None, **kwargs) -> HTTPResponse:
    """
    Create 201 Created response.
    
    Justification:
    - O-04: Location header required for 201
    """
    headers = kwargs.pop('headers', {})
    headers['Location'] = location
    return HTTPResponse(201, body, headers=headers, **kwargs)


def bad_request(message: str = "Bad Request", **kwargs) -> HTTPResponse:
    """Create 400 Bad Request response."""
    return HTTPResponse(400, {"error": message}, **kwargs)


def not_found(message: str = "Not Found", **kwargs) -> HTTPResponse:
    """Create 404 Not Found response."""
    return HTTPResponse(404, {"error": message}, **kwargs)


def internal_error(message: str = "Internal Server Error", **kwargs) -> HTTPResponse:
    """Create 500 Internal Server Error response."""
    return HTTPResponse(500, {"error": message}, **kwargs)
