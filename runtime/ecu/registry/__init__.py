"""
ECU Registry Module

Automatic discovery and registration of KDE engines and seeds.
"""

import os
import re
from pathlib import Path
from typing import Tuple, Optional


def get_kde_mode() -> int:
    """
    Read the current mode from MODE.md.
    
    Returns:
        Mode number (1 or 2), defaults to 1 if unable to determine.
    """
    mode_file = Path('/workspace/project/kde/MODE.md')
    if not mode_file.exists():
        return 1
    
    try:
        content = mode_file.read_text()
        for line in content.split('\n'):
            if 'Current Mode:' in line:
                match = re.search(r'Current Mode:\s*(\d+)', line)
                if match:
                    return int(match.group(1))
    except Exception:
        pass
    
    return 1


def get_mode_paths(kde_root: str) -> Tuple[str, str, str]:
    """
    Get the correct paths based on current mode.
    
    Args:
        kde_root: Root path to the KDE runtime directory
        
    Returns:
        Tuple of (engines_dir, seeds_dir, governance_dir)
    """
    mode = get_kde_mode()
    
    if mode == 2:
        # Mode 2: FUSED format uses /fused-runtime/
        return (
            os.path.join(kde_root, "fused-runtime", "engines"),
            os.path.join(kde_root, "fused-runtime", "seeds"),
            os.path.join(kde_root, "fused-runtime", "governance")
        )
    else:
        # Mode 1: Markdown format uses standard directories
        return (
            os.path.join(kde_root, "engines"),
            os.path.join(kde_root, "seeds"),
            os.path.join(kde_root, "governance")
        )


def get_mode_info() -> dict:
    """
    Get comprehensive information about the current mode.
    
    Returns:
        Dictionary with mode details
    """
    mode = get_kde_mode()
    
    if mode == 1:
        return {
            "mode": "MODE 1",
            "mode_num": 1,
            "format": "Markdown (.md)",
            "status": "ACTIVE",
            "engines_path": "engines/",
            "seeds_path": "seeds/",
            "governance_path": "governance/",
            "use_case": "Human reading, debugging, docs"
        }
    elif mode == 2:
        return {
            "mode": "MODE 2",
            "mode_num": 2,
            "format": "FUSED (.fused)",
            "status": "ACTIVE",
            "engines_path": "fused-runtime/engines/",
            "seeds_path": "fused-runtime/seeds/",
            "governance_path": "fused-runtime/governance/",
            "use_case": "AI operations, production, tokens"
        }
    else:
        return {
            "mode": f"MODE {mode}",
            "mode_num": mode,
            "format": "Unknown",
            "status": "INVALID",
            "use_case": "Unknown"
        }


from .engine_registry import EngineRegistry
from .seed_registry import SeedRegistry

__all__ = ['EngineRegistry', 'SeedRegistry', 'get_kde_mode', 'get_mode_paths', 'get_mode_info']
