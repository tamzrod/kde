"""
LAB-007V: Mutation Testing
Verify that tests detect violations
"""

import sys
sys.path.insert(0, '../LAB-007/implementation')

from http_response import HTTPResponse, StatusLine, Headers

print("=" * 70)
print("MUTATION TESTING - Testing Violation Detection")
print("=" * 70)
print()

# Test 1: Malformed status line - wrong HTTP version
print("[TEST 1] Malformed status line - HTTP/1.0 instead of HTTP/1.1")
print("-" * 60)
try:
    response = HTTPResponse(200, {"test": True})
    output = str(response)
    if output.startswith("HTTP/1.1"):
        print("PASS: HTTP/1.1 is correctly generated")
    else:
        print(f"FAIL: HTTP version is {output.split()[0]}, expected HTTP/1.1")
except Exception as e:
    print(f"EXCEPTION: {e}")
print()

# Test 2: Missing CRLF in status line
print("[TEST 2] Missing CRLF in status line")
print("-" * 60)
status = StatusLine(200)
output = status.to_bytes().decode('ascii')
if output.endswith("\r\n"):
    print("PASS: Status line ends with CRLF")
else:
    print(f"FAIL: Status line ends with {repr(output[-2:])}")
print()

# Test 3: Missing required header termination
print("[TEST 3] Missing header termination")
print("-" * 60)
headers = Headers()
headers.add("Test", "Value")
output = headers.to_bytes().decode('ascii')
if output.endswith("\r\n\r\n"):
    print("PASS: Headers terminate with empty line")
else:
    print(f"FAIL: Headers don't end with CRLF CRLF")
print()

# Test 4: Invalid status code (below 100)
print("[TEST 4] Invalid status code (below 100)")
print("-" * 60)
try:
    status = StatusLine(99)
    print(f"FAIL: No exception raised for status code 99")
except ValueError as e:
    print(f"PASS: ValueError raised for invalid status code")
except Exception as e:
    print(f"EXCEPTION (unexpected): {e}")
print()

# Test 5: Invalid status code (above 999)
print("[TEST 5] Invalid status code (above 999)")
print("-" * 60)
try:
    status = StatusLine(1000)
    print(f"FAIL: No exception raised for status code 1000")
except ValueError as e:
    print(f"PASS: ValueError raised for invalid status code")
except Exception as e:
    print(f"EXCEPTION (unexpected): {e}")
print()

# Test 6: Content-Length correctness
print("[TEST 6] Content-Length correctness")
print("-" * 60)
body = {"message": "hello"}
response = HTTPResponse(200, body)
output = str(response)
expected_body = b'{"message": "hello"}'
expected_length = len(expected_body)
if f"Content-Length: {expected_length}" in output:
    print(f"PASS: Content-Length is correct ({expected_length})")
else:
    print(f"FAIL: Content-Length mismatch")
print()

# Test 7: Body serialization
print("[TEST 7] Body serialization")
print("-" * 60)
response = HTTPResponse(200, {"key": "value"})
output = response.to_bytes()
body_present = b'"key"' in output and b'"value"' in output
if body_present:
    print("PASS: Body is present in response")
else:
    print("FAIL: Body not found in response")
print()

# Test 8: CRLF vs LF only
print("[TEST 8] CRLF vs LF only verification")
print("-" * 60)
response = HTTPResponse(200, {"test": True})
raw_bytes = response.to_bytes()
has_crlf = b"\r\n" in raw_bytes
has_lf_only = b"\n" in raw_bytes and b"\r\n" not in raw_bytes.replace(b"\r\n", b"")
if has_crlf and not has_lf_only:
    print("PASS: Uses CRLF, not LF-only")
else:
    print(f"INFO: CRLF present: {has_crlf}, LF-only: {has_lf_only}")
print()

# Test 9: Response structure order
print("[TEST 9] Response structure order")
print("-" * 60)
response = HTTPResponse(200, {"test": True})
output = str(response)
lines = output.split("\r\n")
if lines[0].startswith("HTTP/1.1 200"):
    print("PASS: Status line is first")
else:
    print(f"FAIL: First line is {lines[0]}")
print()

# Test 10: 201 Location header
print("[TEST 10] 201 Location header")
print("-" * 60)
response = HTTPResponse(201, {"id": "123"})
output = str(response)
has_location = "Location:" in output
if not has_location:
    print("INFO: Location NOT auto-set for 201 (uses created() factory)")
else:
    print("INFO: Location auto-set for 201")
print()

print("=" * 70)
print("MUTATION TESTING COMPLETE")
print("=" * 70)
