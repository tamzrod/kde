"""
Bootstrap Module for KDE Runtime

Provides automatic initialization of the KDE Runtime on import.
Handles dependency checking, ECU initialization, and mode detection.

Usage:
    from runtime.bootstrap import bootstrap
    report = bootstrap()
    
Or simply import the module to auto-initialize:
    import runtime.bootstrap  # Auto-initializes on import

The bootstrap process:
1. Ensure dependencies are installed
2. Initialize the ECU and engine registry  
3. Detect current execution mode (MD/FUSED)
4. Run preflight check and return report
"""

import os
import sys
from typing import Optional

# Auto-initialize flag - set to False to disable auto-init
_AUTO_INIT_ENABLED = True


def get_kde_mode() -> dict:
    """
    Determine the current KDE execution mode.
    
    Returns:
        Dictionary with mode details:
        - mode: 'MD' or 'FUSED'
        - source: Where the mode was determined from
        - path: Content directory path
    """
    # Priority 1: Environment variable
    env_mode = os.getenv('KDE_MODE', '').upper()
    if env_mode in ('MD', 'FUSED'):
        return {
            'mode': env_mode,
            'source': 'environment_variable',
            'path': 'N/A (runtime optimized)'
        }
    
    # Priority 2: MODE.md file
    mode_file = '/workspace/project/kde/MODE.md'
    if os.path.exists(mode_file):
        try:
            with open(mode_file, 'r') as f:
                content = f.read()
                if 'Current Mode: 2' in content or '**Current Mode: 2**' in content:
                    return {
                        'mode': 'FUSED',
                        'source': 'MODE.md',
                        'path': '/fused-runtime/'
                    }
                elif 'Current Mode: 1' in content or '**Current Mode: 1**' in content:
                    return {
                        'mode': 'MD',
                        'source': 'MODE.md',
                        'path': '/seeds/, /engines/, /governance/'
                    }
        except Exception:
            pass
    
    # Default to MD
    return {
        'mode': 'MD',
        'source': 'default',
        'path': '/seeds/, /engines/, /governance/'
    }


def bootstrap(verbose: bool = True) -> Optional[dict]:
    """
    Initialize the KDE Runtime.
    
    This function:
    1. Ensures all required dependencies are installed
    2. Initializes the ECU and engine registry
    3. Detects the current execution mode
    4. Runs and returns the preflight check report
    
    Args:
        verbose: Whether to print initialization progress
        
    Returns:
        PreflightReport if successful, None if failed
    """
    if not _AUTO_INIT_ENABLED:
        if verbose:
            print("KDE Bootstrap: Auto-init disabled")
        return None
    
    if verbose:
        print("=" * 60)
        print("KDE RUNTIME BOOTSTRAP")
        print("=" * 60)
    
    # Step 1: Check dependencies
    if verbose:
        print("\n■ Checking Dependencies")
        print("-" * 40)
    
    from .dependencies import ensure_dependencies
    dep_results = ensure_dependencies(verbose=verbose)
    
    # Check if all required dependencies are available
    missing_deps = [mod for mod, status in dep_results.items() if not status]
    if missing_deps:
        if verbose:
            print(f"\n❌ Bootstrap failed: Missing dependencies: {missing_deps}")
        raise BootstrapError(f"Missing dependencies: {missing_deps}")
    
    # Step 2: Detect mode
    if verbose:
        print("\n■ Detecting Execution Mode")
        print("-" * 40)
    
    mode = get_kde_mode()
    mode_icon = "⚡" if mode['mode'] == 'FUSED' else "📄"
    if verbose:
        print(f"  {mode_icon} Mode: {mode['mode']}")
        print(f"  Source: {mode['source']}")
        print(f"  Path: {mode['path']}")
    
    # Step 3: Initialize ECU
    if verbose:
        print("\n■ Initializing ECU")
        print("-" * 40)
    
    try:
        from runtime.ecu import create_ecu
        ecu = create_ecu('/workspace/project/kde')
        
        if verbose:
            state = ecu.get_runtime_state()
            eng = state.get('engine_registry', {})
            seed = state.get('seed_registry', {})
            print(f"  ✅ Engines: {eng.get('total_engines', 0)} ({eng.get('active', 0)} active)")
            print(f"  ✅ Seeds: {seed.get('total_seeds', 0)} registered")
    except Exception as e:
        if verbose:
            print(f"  ❌ ECU initialization failed: {e}")
        return None
    
    # Step 4: Run preflight check
    if verbose:
        print("\n■ Running Pre-Flight Check")
        print("-" * 40)
    
    try:
        from runtime.preflight import run_preflight_check, format_report
        report = run_preflight_check()
        
        if verbose:
            print("  ✅ Pre-flight check complete")
            print("\n" + format_report(report))
        
        if verbose:
            print("\n" + "=" * 60)
            print("KDE RUNTIME READY")
            print("=" * 60)
        
        return {
            'status': 'success',
            'mode': mode,
            'ecu_initialized': True,
            'report': report
        }
    except Exception as e:
        if verbose:
            print(f"  ❌ Pre-flight check failed: {e}")
        return {
            'status': 'failed',
            'mode': mode,
            'ecu_initialized': True,
            'error': str(e)
        }


def disable_auto_init():
    """Disable automatic initialization on import."""
    global _AUTO_INIT_ENABLED
    _AUTO_INIT_ENABLED = False


def enable_auto_init():
    """Enable automatic initialization on import."""
    global _AUTO_INIT_ENABLED
    _AUTO_INIT_ENABLED = True


# Auto-initialize on import (can be disabled with disable_auto_init())
# Note: This runs the full bootstrap process when the module is imported
# Comment out the next line to disable auto-init

class BootstrapError(Exception):
    """Raised when bootstrap fails due to missing dependencies."""
    pass

try:
    _bootstrap_result = bootstrap(verbose=True)
except Exception as e:
    print(f"\n❌ KDE Bootstrap Failed: {e}")
    print("Please install missing dependencies manually:")
    print("  pip install pyyaml jsonschema")
    _bootstrap_result = {'status': 'failed', 'error': str(e)}
