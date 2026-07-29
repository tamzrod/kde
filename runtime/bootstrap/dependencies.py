"""
Dependency Management Module

Ensures all required dependencies for the KDE Runtime are available.
Automatically installs missing dependencies or provides clear error messages.
"""

import sys
import importlib
import subprocess
from typing import Dict, List, Tuple

# Required dependencies: module_name -> package_name (for pip install)
REQUIRED_DEPENDENCIES: Dict[str, str] = {
    'yaml': 'pyyaml',
    'jsonschema': 'jsonschema',  # For validation
}

# Optional dependencies with fallbacks
OPTIONAL_DEPENDENCIES: Dict[str, str] = {
    'numpy': 'numpy',  # For numerical operations
    'pandas': 'pandas',  # For data analysis
}


def check_module(module_name: str) -> Tuple[bool, str]:
    """
    Check if a module is available.
    
    Args:
        module_name: Name of the module to check
        
    Returns:
        Tuple of (available, version_info)
    """
    try:
        module = importlib.import_module(module_name)
        version = getattr(module, '__version__', 'unknown')
        return True, version
    except ImportError:
        return False, 'not installed'


def install_package(package_name: str) -> bool:
    """
    Install a package using pip.
    
    Args:
        package_name: Name of the package to install
        
    Returns:
        True if installation successful, False otherwise
    """
    try:
        subprocess.check_call(
            [sys.executable, '-m', 'pip', 'install', '-q', package_name],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL
        )
        return True
    except subprocess.CalledProcessError:
        return False


def ensure_dependencies(verbose: bool = True) -> Dict[str, bool]:
    """
    Ensure all required dependencies are installed.
    
    Args:
        verbose: Whether to print status messages
        
    Returns:
        Dictionary of module_name -> installation_status
    """
    results = {}
    
    for module_name, package_name in REQUIRED_DEPENDENCIES.items():
        available, version = check_module(module_name)
        
        if available:
            if verbose:
                print(f"  ✅ {module_name} ({version})")
            results[module_name] = True
        else:
            if verbose:
                print(f"  ⏳ {module_name} not found, installing {package_name}...")
            
            if install_package(package_name):
                # Re-check after installation
                available, version = check_module(module_name)
                if available:
                    if verbose:
                        print(f"  ✅ {module_name} installed ({version})")
                    results[module_name] = True
                else:
                    if verbose:
                        print(f"  ❌ Failed to install {module_name}")
                    results[module_name] = False
            else:
                if verbose:
                    print(f"  ❌ Could not install {module_name}")
                results[module_name] = False
    
    return results


def get_dependency_status() -> Dict[str, Dict[str, str]]:
    """
    Get the status of all dependencies.
    
    Returns:
        Dictionary with module details
    """
    status = {
        'required': {},
        'optional': {}
    }
    
    for module_name, package_name in REQUIRED_DEPENDENCIES.items():
        available, version = check_module(module_name)
        status['required'][module_name] = {
            'package': package_name,
            'available': available,
            'version': version
        }
    
    for module_name, package_name in OPTIONAL_DEPENDENCIES.items():
        available, version = check_module(module_name)
        status['optional'][module_name] = {
            'package': package_name,
            'available': available,
            'version': version
        }
    
    return status
