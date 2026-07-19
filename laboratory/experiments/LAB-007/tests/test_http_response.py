# HTTP/1.1 Response Generator Tests
# LAB-007 Validation Tests

"""
Test Program for HTTP/1.1 Response Generator

This test program demonstrates:
1. Correct behavior - responses that comply with RFC 7230/7231
2. Incorrect behavior - attempts to violate the standard
3. Boundary conditions - edge cases

Every test traces to collected knowledge.
"""

import unittest
from http_response import HTTPResponse, StatusLine, Headers, ok, created, bad_request


class TestStatusLine(unittest.TestCase):
    """Test status line generation."""
    
    def test_status_line_format(self):
        """
        Test that status line follows RFC 7230 §3.1.2 format.
        
        Requirements:
        - M-01: HTTP/1.1 SP status-code SP reason-phrase CRLF
        - M-02: HTTP-version = "HTTP/1.1"
        - M-04: CRLF is line terminator
        """
        status = StatusLine(200)
        result = status.to_bytes()
        
        # Decode and check format
        decoded = result.decode('ascii')
        
        # M-02: HTTP-version must be HTTP/1.1
        self.assertTrue(decoded.startswith("HTTP/1.1 "))
        
        # M-03: Status code is 3-digit number
        self.assertIn("200", decoded)
        
        # M-04: Ends with CRLF
        self.assertTrue(decoded.endswith("\r\n"))
        
        # M-01: Has two spaces (HTTP/1.1 SP status SP phrase CRLF)
        parts = decoded.strip().split(" ")
        self.assertEqual(len(parts), 3)  # HTTP/1.1, 200, OK
    
    def test_status_code_validation(self):
        """
        Test that status codes are validated.
        
        Requirements:
        - M-03: Status code must be 3-digit number (100-999)
        """
        # Valid codes
        for code in [100, 200, 404, 500, 999]:
            status = StatusLine(code)
            self.assertEqual(status.status_code, code)
        
        # Invalid codes should raise ValueError
        with self.assertRaises(ValueError):
            StatusLine(99)  # Too low
        
        with self.assertRaises(ValueError):
            StatusLine(1000)  # Too high
    
    def test_custom_reason_phrase(self):
        """
        Test custom reason phrase.
        
        Requirements:
        - F-01: Reason phrase is optional, can be customized
        """
        status = StatusLine(200, "Success")
        result = status.to_bytes().decode('ascii')
        
        self.assertIn("Success", result)
        self.assertIn("200", result)


class TestHeaders(unittest.TestCase):
    """Test header generation."""
    
    def test_header_format(self):
        """
        Test that headers follow RFC 7230 §3.2 format.
        
        Requirements:
        - M-06: Header field format: name: value CRLF
        """
        headers = Headers()
        headers.add("Content-Type", "application/json")
        
        result = headers.to_bytes().decode('ascii')
        
        # M-06: Format name: value CRLF
        self.assertIn("Content-Type: application/json", result)
        
        # M-04: Ends with CRLF
        self.assertTrue(result.endswith("\r\n"))
    
    def test_header_termination(self):
        """
        Test that header section terminates with empty line.
        
        Requirements:
        - M-05: Headers end with empty line (CRLF)
        """
        headers = Headers()
        headers.add("X-Custom", "value")
        
        result = headers.to_bytes().decode('ascii')
        
        # Should have double CRLF at end (last header + empty line)
        self.assertTrue(result.endswith("\r\n\r\n"))


class TestHTTPResponse(unittest.TestCase):
    """Test complete HTTP response generation."""
    
    def test_response_structure(self):
        """
        Test complete response structure.
        
        Requirements:
        - M-01: Status line first
        - M-05: Headers after status line
        - M-07: Body after headers
        """
        response = HTTPResponse(200, {"message": "hello"})
        result = response.to_bytes().decode('ascii', errors='replace')
        
        # Split into parts
        parts = result.split("\r\n\r\n", 1)
        
        # First part is status line + headers
        first_part = parts[0]
        
        # Status line is first
        self.assertTrue(first_part.startswith("HTTP/1.1 200 OK"))
        
        # Headers present
        self.assertIn("Content-Type:", first_part)
        self.assertIn("Content-Length:", first_part)
        self.assertIn("Date:", first_part)
    
    def test_required_headers(self):
        """
        Test that required headers are present.
        
        Requirements:
        - O-03: Date header
        - O-05: Server header
        """
        response = HTTPResponse(200, {"test": True})
        result = str(response)
        
        # O-03: Date header
        self.assertIn("Date:", result)
        
        # O-05: Server header
        self.assertIn("Server:", result)
    
    def test_content_length(self):
        """
        Test that Content-Length is set correctly.
        
        Requirements:
        - O-02: Content-Length header
        - M-07: Body length from Content-Length
        """
        body = {"message": "hello"}
        response = HTTPResponse(200, body)
        
        # Calculate expected length
        expected_body = json.dumps(body).encode('utf-8')
        expected_length = len(expected_body)
        
        # Check Content-Length header
        result = str(response)
        self.assertIn(f"Content-Length: {expected_length}", result)
    
    def test_201_location_header(self):
        """
        Test that 201 includes Location header.
        
        Requirements:
        - O-04: Location header for 201 Created
        """
        response = created("/tasks/123", {"id": "123"})
        result = str(response)
        
        # O-04: Location header
        self.assertIn("Location: /tasks/123", result)
        
        # Should be 201
        self.assertTrue(result.startswith("HTTP/1.1 201"))


class TestCorrectBehavior(unittest.TestCase):
    """Tests for correct HTTP/1.1 behavior."""
    
    def test_minimal_response(self):
        """Test minimal valid response (no body)."""
        response = HTTPResponse(204)
        result = response.to_bytes()
        
        # Should be just status + headers + empty line
        decoded = result.decode('ascii')
        
        # Status line
        self.assertTrue(decoded.startswith("HTTP/1.1 204"))
        
        # No Content-Length for no body
        self.assertNotIn("Content-Length:", decoded)
    
    def test_json_response(self):
        """Test JSON response with all headers."""
        response = ok({"data": [1, 2, 3]})
        result = str(response)
        
        # Content-Type should be application/json
        self.assertIn("Content-Type: application/json", result)
        
        # Content-Length should match
        body_bytes = json.dumps({"data": [1, 2, 3]}).encode('utf-8')
        self.assertIn(f"Content-Length: {len(body_bytes)}", result)


class TestIncorrectBehavior(unittest.TestCase):
    """Tests that demonstrate incorrect behavior is prevented."""
    
    def test_invalid_http_version_rejected(self):
        """
        Test that HTTP/1.0 is not generated.
        
        Requirements:
        - M-02: HTTP-version MUST be HTTP/1.1
        
        Note: The implementation only generates HTTP/1.1, 
        so this tests that incorrect versions cannot be created.
        """
        response = HTTPResponse(200, {"test": True})
        result = str(response)
        
        # M-02: Only HTTP/1.1
        self.assertTrue(result.startswith("HTTP/1.1 200"))
        self.assertFalse(result.startswith("HTTP/1.0"))
    
    def test_missing_crlf_prevented(self):
        """
        Test that CRLF is always present.
        
        Requirements:
        - M-04: CRLF is line terminator
        
        The implementation always uses \\r\\n, so missing CRLF is impossible.
        """
        response = HTTPResponse(200, {"test": True})
        result = response.to_bytes()
        
        # All lines should end with CRLF
        decoded = result.decode('ascii', errors='replace')
        lines = decoded.split('\r\n')
        
        # Should not have lines without CRLF (except last if no trailing newline)
        for i, line in enumerate(lines[:-1]):
            self.assertFalse(line.endswith('\n'), f"Line {i} has incorrect ending")


class TestBoundaryConditions(unittest.TestCase):
    """Tests for boundary conditions."""
    
    def test_status_code_boundaries(self):
        """Test status code boundaries (100-999)."""
        # Minimum valid
        status = StatusLine(100)
        self.assertEqual(status.status_code, 100)
        
        # Maximum valid
        status = StatusLine(999)
        self.assertEqual(status.status_code, 999)
        
        # Invalid: below 100
        with self.assertRaises(ValueError):
            StatusLine(99)
        
        # Invalid: above 999
        with self.assertRaises(ValueError):
            StatusLine(1000)
    
    def test_empty_body(self):
        """Test response with no body."""
        response = HTTPResponse(200)
        result = response.to_bytes()
        
        decoded = result.decode('ascii')
        
        # Should have status and headers
        self.assertTrue(decoded.startswith("HTTP/1.1 200"))
        self.assertIn("Date:", decoded)
        
        # No body after headers
        self.assertTrue(decoded.endswith("\r\n\r\n"))
    
    def test_large_body(self):
        """Test response with large body."""
        large_data = {"data": list(range(10000))}
        response = HTTPResponse(200, large_data)
        result = response.to_bytes()
        
        # Content-Length should match actual body
        body = json.dumps(large_data).encode('utf-8')
        self.assertEqual(len(result) - len(str(response)[:-len(body)]), len(body))


class TestTraceability(unittest.TestCase):
    """Tests that verify traceability to knowledge."""
    
    def test_all_requirements_covered(self):
        """
        Verify all mandatory requirements are implemented.
        
        Requirements tracked:
        - M-01: Status line format
        - M-02: HTTP-version
        - M-03: Status code validation
        - M-04: CRLF terminators
        - M-05: Header termination
        - M-06: Header format
        - M-07: Content-Length
        """
        # This is a meta-test that verifies traceability documentation
        # The actual requirements are tested in other test classes
        
        # Verify implementation file contains traceability comments
        with open('implementation/http_response.py', 'r') as f:
            content = f.read()
        
        # Check all M-series requirements are documented
        for i in range(1, 8):
            self.assertIn(f"M-{i:02d}", content, 
                        f"Requirement M-{i:02d} should be documented")
        
        # Check all O-series are documented
        for i in range(1, 7):
            self.assertIn(f"O-{i:02d}", content, 
                        f"Feature O-{i:02d} should be documented")
        
        # Check F-series that are used in implementation (F-01, F-02, F-05)
        used_freedom_ids = ['F-01', 'F-02', 'F-05']
        for fid in used_freedom_ids:
            self.assertIn(fid, content, 
                        f"Freedom {fid} should be documented")


if __name__ == '__main__':
    import json
    
    print("=" * 70)
    print("HTTP/1.1 Response Generator - Test Suite")
    print("=" * 70)
    print()
    print("Knowledge Traceability:")
    print("- M-01 through M-07: Mandatory requirements (RFC 7230)")
    print("- O-01 through O-06: Optional features (RFC 7231)")
    print("- F-01 through F-05: Implementation freedoms")
    print("- AS-01 through AS-04: Tracked assumptions")
    print()
    print("Test Categories:")
    print("1. Status Line Generation (RFC 7230 §3.1.2)")
    print("2. Header Generation (RFC 7230 §3.2)")
    print("3. Complete Response (RFC 7230 §3.3)")
    print("4. Correct Behavior")
    print("5. Incorrect Behavior Prevention")
    print("6. Boundary Conditions")
    print("7. Traceability Verification")
    print()
    print("=" * 70)
    print()
    
    unittest.main(verbosity=2)
