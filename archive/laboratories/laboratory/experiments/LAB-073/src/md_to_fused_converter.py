"""
MD to FUSED Converter

Converts Markdown files to FUSED format for KDE Fused Mode.
"""

import json
import re
from pathlib import Path
from dataclasses import dataclass, asdict
from typing import Dict, List, Any, Optional
from datetime import datetime


@dataclass
class FusedConfig:
    """FUSED format configuration."""
    version: str = "1.0"
    header: bool = True
    delimiter: str = "|"
    key_value: str = "="
    array_prefix: str = "||"


class MarkdownParser:
    """Parse markdown content to structured data."""
    
    @staticmethod
    def parse_file(file_path: Path) -> Dict[str, Any]:
        """Parse a markdown file to structured data."""
        content = file_path.read_text(encoding='utf-8')
        return MarkdownParser.parse_content(content, file_path.stem)
    
    @staticmethod
    def parse_content(content: str, name: str = "root") -> Dict[str, Any]:
        """Parse markdown content to dict."""
        result = {
            "_meta": {
                "name": name,
                "type": "markdown",
                "timestamp": datetime.utcnow().isoformat() + "Z"
            }
        }
        
        current_section = result
        section_stack = [result]
        
        lines = content.split('\n')
        i = 0
        
        while i < len(lines):
            line = lines[i].rstrip()
            
            # Headers
            if line.startswith('# '):
                key = MarkdownParser._clean_key(line[2:].strip())
                current_section[key] = {}
                section_stack.append(current_section)
                current_section = current_section[key]
            
            elif line.startswith('## '):
                key = MarkdownParser._clean_key(line[3:].strip())
                current_section[key] = {}
                section_stack.append(current_section)
                current_section = current_section[key]
            
            elif line.startswith('### '):
                key = MarkdownParser._clean_key(line[4:].strip())
                current_section[key] = {}
                section_stack.append(current_section)
                current_section = current_section[key]
            
            # Key-value pairs (bold format: **key**: value)
            elif '**' in line:
                match = re.search(r'\*\*([^*]+)\*\*\s*:\s*(.*)', line)
                if match:
                    key = MarkdownParser._clean_key(match.group(1))
                    value = match.group(2).strip()
                    current_section[key] = value
            
            # Lists
            elif line.startswith('- ') or line.startswith('* '):
                item = line[2:].strip()
                if 'items' not in current_section:
                    current_section['items'] = []
                current_section['items'].append(item)
            
            # Table rows
            elif line.startswith('|') and '---' not in line:
                cells = [c.strip() for c in line.split('|')[1:-1]]
                if 'table' not in current_section:
                    current_section['table'] = []
                current_section['table'].append(cells)
            
            # Metadata (Key: Value format)
            elif ':' in line and not line.startswith('|'):
                parts = line.split(':', 1)
                if len(parts) == 2:
                    key = MarkdownParser._clean_key(parts[0].strip())
                    value = parts[1].strip()
                    if value and not value.startswith('**'):
                        current_section[key] = value
            
            # End of section
            elif line == '---':
                if len(section_stack) > 1:
                    section_stack.pop()
                    current_section = section_stack[-1]
            
            i += 1
        
        return result
    
    @staticmethod
    def _clean_key(key: str) -> str:
        """Clean a key for use in FUSED format."""
        # Remove special characters, lowercase, replace spaces with underscores
        key = re.sub(r'[^\w\s-]', '', key)
        key = re.sub(r'\s+', '_', key)
        return key.lower()


class FusedSerializer:
    """Serialize data to FUSED format."""
    
    def __init__(self, config: Optional[FusedConfig] = None):
        self.config = config or FusedConfig()
    
    def serialize(self, data: Dict[str, Any], indent: str = "") -> str:
        """Serialize dict to FUSED format."""
        lines = []
        
        if self.config.header:
            lines.append(f"# FUSEDv{self.config.version}")
            lines.append("")
        
        lines.extend(self._serialize_dict(data, indent))
        
        return '\n'.join(lines)
    
    def _serialize_dict(self, data: Dict[str, Any], indent: str = "") -> List[str]:
        """Serialize a dictionary to FUSED lines."""
        lines = []
        delim = self.config.delimiter
        kv = self.config.key_value
        
        for key, value in data.items():
            if key.startswith('_'):
                # Meta fields - include as comments
                if isinstance(value, dict):
                    for k, v in value.items():
                        lines.append(f"# {k}: {v}")
                continue
            
            if isinstance(value, dict):
                lines.append(f"{indent}{delim}{key}")
                lines.extend(self._serialize_dict(value, indent + "  "))
            elif isinstance(value, list):
                lines.append(f"{indent}{delim}{key}")
                for item in value:
                    if isinstance(item, dict):
                        lines.append(f"{indent}  {delim}{delim}")
                        lines.extend(self._serialize_dict(item, indent + "    "))
                    else:
                        lines.append(f"{indent}  {delim}{delim}{item}")
            else:
                # Scalar value
                value_str = str(value).replace('\n', ' ')
                lines.append(f"{indent}{delim}{key}{kv}{value_str}")
        
        return lines
    
    def deserialize(self, fused_content: str) -> Dict[str, Any]:
        """Parse FUSED format back to dict."""
        result = {}
        current = result
        stack = [result]
        indent_level = 0
        
        for line in fused_content.split('\n'):
            line = line.rstrip()
            
            # Skip comments and headers
            if not line or line.startswith('#'):
                continue
            
            # Calculate indent
            indent = len(line) - len(line.lstrip())
            indent_level = indent // 2
            
            # Parse line
            if self.config.delimiter in line:
                parts = line.lstrip().split(self.config.delimiter)
                
                # Adjust stack based on indent
                while len(stack) > 1 and len(stack) > indent_level + 1:
                    stack.pop()
                current = stack[-1]
                
                for i, part in enumerate(parts):
                    part = part.strip()
                    if not part:
                        continue
                    
                    if self.config.key_value in part:
                        # Key-value
                        kv_parts = part.split(self.config.key_value, 1)
                        key = kv_parts[0].strip()
                        value = kv_parts[1].strip() if len(kv_parts) > 1 else ""
                        current[key] = value
                    elif part.startswith(self.config.array_prefix):
                        # Array item
                        item = part[2:].strip()
                        if 'items' not in current:
                            current['items'] = []
                        current['items'].append(item)
                    else:
                        # Section
                        current[part] = {}
                        stack.append(current[part])


class KDEConverter:
    """Convert KDE runtime to FUSED format."""
    
    def __init__(self, kde_root: Path, fused_root: Path):
        self.kde_root = Path(kde_root)
        self.fused_root = Path(fused_root)
        self.md_parser = MarkdownParser()
        self.fused_serializer = FusedSerializer()
        self.stats = {
            "files_processed": 0,
            "files_converted": 0,
            "bytes_saved": 0,
            "errors": []
        }
    
    def convert_file(self, md_file: Path, fused_file: Path) -> Dict[str, Any]:
        """Convert a single markdown file to FUSED."""
        try:
            # Parse markdown
            data = self.md_parser.parse_file(md_file)
            
            # Serialize to FUSED
            fused_content = self.fused_serializer.serialize(data)
            
            # Save
            fused_file.parent.mkdir(parents=True, exist_ok=True)
            fused_file.write_text(fused_content, encoding='utf-8')
            
            # Stats
            original_size = md_file.stat().st_size
            new_size = len(fused_content.encode('utf-8'))
            
            self.stats["files_converted"] += 1
            self.stats["bytes_saved"] += original_size - new_size
            
            return {
                "file": str(md_file.relative_to(self.kde_root)),
                "original_size": original_size,
                "fused_size": new_size,
                "status": "success"
            }
            
        except Exception as e:
            self.stats["errors"].append({
                "file": str(md_file),
                "error": str(e)
            })
            return {
                "file": str(md_file),
                "status": "error",
                "error": str(e)
            }
        finally:
            self.stats["files_processed"] += 1
    
    def convert_directory(self, source_dir: str, target_dir: str) -> List[Dict]:
        """Convert all markdown files in a directory."""
        results = []
        source = self.kde_root / source_dir
        target = self.fused_root / target_dir
        
        if not source.exists():
            return [{"error": f"Source directory not found: {source}"}]
        
        for md_file in source.rglob("*.md"):
            relative = md_file.relative_to(source)
            fused_file = target / relative.with_suffix('.fused')
            
            result = self.convert_file(md_file, fused_file)
            results.append(result)
        
        return results
    
    def get_stats(self) -> Dict[str, Any]:
        """Get conversion statistics."""
        return {
            **self.stats,
            "success_rate": (
                self.stats["files_converted"] / max(self.stats["files_processed"], 1)
            ) * 100
        }


def main():
    """Run conversion."""
    kde_root = Path('/workspace/project/kde')
    fused_root = kde_root / 'fused-runtime'
    
    print("=" * 70)
    print("KDE MD to FUSED CONVERTER")
    print("=" * 70)
    
    converter = KDEConverter(kde_root, fused_root)
    
    # Convert seeds
    print("\nConverting SEEDS...")
    seed_results = converter.convert_directory('seeds', 'seeds')
    print(f"  Converted: {len(seed_results)} files")
    
    # Convert engines
    print("\nConverting ENGINES...")
    engine_results = converter.convert_directory('engines', 'engines')
    print(f"  Converted: {len(engine_results)} files")
    
    # Convert governance
    print("\nConverting GOVERNANCE...")
    gov_results = converter.convert_directory('governance', 'governance')
    print(f"  Converted: {len(gov_results)} files")
    
    # Stats
    stats = converter.get_stats()
    
    print("\n" + "=" * 70)
    print("CONVERSION STATISTICS")
    print("=" * 70)
    
    print(f"\nFiles Processed: {stats['files_processed']}")
    print(f"Files Converted: {stats['files_converted']}")
    print(f"Success Rate: {stats['success_rate']:.1f}%")
    print(f"Bytes Saved: {stats['bytes_saved']:,} ({stats['bytes_saved']/1024:.1f} KB)")
    
    if stats['errors']:
        print(f"\nErrors: {len(stats['errors'])}")
        for err in stats['errors'][:5]:
            print(f"  - {err['file']}: {err.get('error', 'Unknown')}")
    
    # Save results
    output = {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "stats": stats,
        "seed_results": seed_results,
        "engine_results": engine_results,
        "gov_results": gov_results
    }
    
    output_file = kde_root / 'laboratory' / 'experiments' / 'LAB-073' / 'evidence' / 'conversion_results.json'
    output_file.parent.mkdir(parents=True, exist_ok=True)
    with open(output_file, 'w') as f:
        json.dump(output, f, indent=2)
    
    print(f"\nResults saved to: {output_file}")
    
    return stats


if __name__ == "__main__":
    main()
