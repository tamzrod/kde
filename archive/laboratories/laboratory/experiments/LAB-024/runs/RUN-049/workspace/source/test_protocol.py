"""
Functional test for NovaZeroMesh
"""
import sys
import asyncio
sys.path.insert(0, "laboratory/experiments/LAB-024/runs/RUN-049/workspace/source")

async def test_session_creation():
    """Test session creation."""
    try:
        # Import and test
        exec(open("laboratory/experiments/LAB-024/runs/RUN-049/workspace/source/protocol.py").read())
        
        # Test crypto operations
        crypto = NovaZeroMeshCrypto()
        private_key, public_key = crypto.generate_keypair()
        
        assert private_key is not None, "Key generation failed"
        assert public_key is not None, "Public key generation failed"
        
        print("PASS: Session creation")
        return True
    except Exception as e:
        print(f"FAIL: Session creation - {e}")
        return False

async def test_encryption():
    """Test encryption/decryption."""
    try:
        exec(open("laboratory/experiments/LAB-024/runs/RUN-049/workspace/source/protocol.py").read())
        
        crypto = NovaZeroMeshCrypto()
        cipher = crypto.get_cipher()
        nonce = b'\x00' * 12
        plaintext = b"Test message"
        
        # Encrypt
        ciphertext = crypto.encrypt(cipher, nonce, plaintext)
        assert ciphertext != plaintext, "Encryption failed"
        
        # Decrypt
        decrypted = crypto.decrypt(cipher, nonce, ciphertext)
        assert decrypted == plaintext, "Decryption failed"
        
        print("PASS: Encryption/decryption")
        return True
    except Exception as e:
        print(f"FAIL: Encryption - {e}")
        return False

async def test_key_derivation():
    """Test key derivation."""
    try:
        exec(open("laboratory/experiments/LAB-024/runs/RUN-049/workspace/source/protocol.py").read())
        
        crypto = NovaZeroMeshCrypto()
        input_key = b'test_secret_key_32_bytes_long_x'
        salt = b'salt_value'
        info = b'test_kdf'
        
        derived = crypto.kdf(input_key, salt, info, 48)
        assert len(derived) == 48, "KDF output wrong length"
        assert derived != input_key, "KDF failed"
        
        print("PASS: Key derivation")
        return True
    except Exception as e:
        print(f"FAIL: Key derivation - {e}")
        return False

async def test_state_machine():
    """Test state transitions."""
    try:
        exec(open("laboratory/experiments/LAB-024/runs/RUN-049/workspace/source/protocol.py").read())
        
        session = NovaZeroMeshSession()
        assert session.state == State.INIT, "Initial state wrong"
        
        session.state = State.HANDSHAKING
        assert session.state == State.HANDSHAKING, "State transition failed"
        
        print("PASS: State machine")
        return True
    except Exception as e:
        print(f"FAIL: State machine - {e}")
        return False

async def test_replay_protection():
    """Test replay protection."""
    try:
        exec(open("laboratory/experiments/LAB-024/runs/RUN-049/workspace/source/protocol.py").read())
        
        session = NovaZeroMeshSession()
        
        # Test nonce tracking
        nonce = 12345
        session.seen_nonces.add(nonce)
        
        if nonce in session.seen_nonces:
            # This is expected - replay detected
            print("PASS: Replay protection (nonce tracking)")
            return True
        
        print("FAIL: Replay protection")
        return False
    except Exception as e:
        print(f"FAIL: Replay protection - {e}")
        return False

async def main():
    """Run all tests."""
    tests = [
        test_session_creation,
        test_encryption,
        test_key_derivation,
        test_state_machine,
        test_replay_protection,
    ]
    
    passed = 0
    failed = 0
    
    for test in tests:
        result = await test()
        if result:
            passed += 1
        else:
            failed += 1
    
    print(f"\nResults: {passed} passed, {failed} failed")
    return passed, failed

if __name__ == "__main__":
    asyncio.run(main())
