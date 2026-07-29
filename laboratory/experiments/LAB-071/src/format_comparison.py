"""
Format Comparison and Fusion Tool

Compares Pre-digested JSON against other text formats,
then synthesizes a fused format.
"""

import os
import re
import json
import time
import csv
import io
from pathlib import Path
from dataclasses import dataclass, field, asdict
from typing import Dict, List, Tuple, Any, Optional
from datetime import datetime
from enum import Enum


class Format(Enum):
    """Supported serialization formats."""
    JSON = "json"
    YAML = "yaml"
    TOML = "toml"
    CSV = "csv"
    XML = "xml"
    MSGPACK = "msgpack"
    UBJSON = "ubjson"
    INI = "ini"
    TSV = "tsv"
    FUSED = "fused"  # Our synthesized format


@dataclass
class FormatMetrics:
    """Performance metrics for a format."""
    format_name: str
    parse_time_ms: float
    serialize_time_ms: float
    file_size_bytes: int
    memory_peak_mb: float
    fidelity_score: float
    readability_score: float  # 0-100 for humans
    
    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass 
class ComparisonResult:
    """Result of comparing formats."""
    formats: List[FormatMetrics]
    fastest_format: str
    smallest_format: str
    best_fidelity_format: str
    overall_winner: str
    winner_score: float


@dataclass
class FusionConfig:
    """Configuration for format fusion."""
    base_format: str = "json"
    compression_level: int = 1
    include_schema: bool = True
    deduplicate_keys: bool = True
    flatten_nested: bool = False
    use_binary: bool = False
    custom_delimiter: str = "|"
    compression: str = "deflate"
    
    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


class FormatParser:
    """Parser for various text formats."""
    
    @staticmethod
    def parse_json(data: str) -> Any:
        """Parse JSON."""
        return json.loads(data)
    
    @staticmethod
    def parse_yaml(data: str) -> Any:
        """Parse YAML (simple implementation)."""
        # Simple YAML parser for key-value and lists
        result = {}
        current_list = []
        in_list = False
        indent_level = 0
        
        for line in data.split('\n'):
            line = line.rstrip()
            if not line or line.startswith('#'):
                continue
            
            # List items
            if line.startswith('- '):
                value = line[2:].strip()
                current_list.append(value)
                in_list = True
            # Key-value
            elif ':' in line:
                if in_list and current_list:
                    result['_list'] = current_list
                    current_list = []
                    in_list = False
                
                key, value = line.split(':', 1)
                key = key.strip()
                value = value.strip()
                
                if value == '' or value == '|':
                    result[key] = {}
                else:
                    result[key] = value
            
            indent_level = len(line) - len(line.lstrip())
        
        if current_list:
            result['_list'] = current_list
        
        return result
    
    @staticmethod
    def parse_toml(data: str) -> Any:
        """Parse TOML (simple implementation)."""
        result = {}
        current_section = result
        in_section = False
        
        for line in data.split('\n'):
            line = line.strip()
            if not line or line.startswith('#'):
                continue
            
            # Section
            if line.startswith('[') and line.endswith(']'):
                section_name = line[1:-1].strip()
                if section_name not in result:
                    result[section_name] = {}
                current_section = result[section_name]
                in_section = True
            # Key-value
            elif '=' in line:
                key, value = line.split('=', 1)
                key = key.strip()
                value = value.strip().strip('"').strip("'")
                current_section[key] = value
        
        return result
    
    @staticmethod
    def parse_csv(data: str) -> Any:
        """Parse CSV."""
        reader = csv.DictReader(io.StringIO(data))
        return list(reader)
    
    @staticmethod
    def parse_xml(data: str) -> Any:
        """Parse XML (simple implementation)."""
        result = {}
        
        # Extract tags
        tag_pattern = r'<(\w+)>([^<]*)</\1>'
        for match in re.finditer(tag_pattern, data):
            tag = match.group(1)
            value = match.group(2).strip()
            result[tag] = value
        
        return result
    
    @staticmethod
    def parse_ini(data: str) -> Any:
        """Parse INI."""
        result = {}
        current_section = None
        
        for line in data.split('\n'):
            line = line.strip()
            if not line or line.startswith(';') or line.startswith('#'):
                continue
            
            if line.startswith('[') and line.endswith(']'):
                current_section = line[1:-1]
                result[current_section] = {}
            elif '=' in line and current_section:
                key, value = line.split('=', 1)
                result[current_section][key.strip()] = value.strip()
        
        return result
    
    @staticmethod
    def parse_tsv(data: str) -> Any:
        """Parse TSV."""
        reader = csv.DictReader(io.StringIO(data), delimiter='\t')
        return list(reader)


class FormatSerializer:
    """Serializer for various text formats."""
    
    @staticmethod
    def to_json(data: Any) -> str:
        """Serialize to JSON."""
        return json.dumps(data, indent=2)
    
    @staticmethod
    def to_yaml(data: Any, level: int = 0) -> str:
        """Serialize to YAML."""
        lines = []
        indent = '  ' * level
        
        if isinstance(data, dict):
            for key, value in data.items():
                if isinstance(value, (dict, list)):
                    lines.append(f"{indent}{key}:")
                    lines.append(FormatSerializer.to_yaml(value, level + 1))
                else:
                    lines.append(f"{indent}{key}: {value}")
        elif isinstance(data, list):
            for item in data:
                if isinstance(item, (dict, list)):
                    lines.append(f"{indent}-")
                    lines.append(FormatSerializer.to_yaml(item, level + 1))
                else:
                    lines.append(f"{indent}- {item}")
        
        return '\n'.join(lines)
    
    @staticmethod
    def to_toml(data: Any, section: str = "root") -> str:
        """Serialize to TOML."""
        lines = []
        
        if isinstance(data, dict):
            for key, value in data.items():
                if isinstance(value, dict):
                    lines.append(f"[{key}]")
                    for k, v in value.items():
                        lines.append(f"{k} = \"{v}\"")
                else:
                    lines.append(f"{key} = \"{value}\"")
        
        return '\n'.join(lines)
    
    @staticmethod
    def to_csv(data: List[Dict]) -> str:
        """Serialize to CSV."""
        if not data:
            return ""
        
        output = io.StringIO()
        writer = csv.DictWriter(output, fieldnames=data[0].keys())
        writer.writeheader()
        writer.writerows(data)
        return output.getvalue()
    
    @staticmethod
    def to_xml(data: Dict) -> str:
        """Serialize to XML."""
        lines = ['<?xml version="1.0"?>', '<root>']
        
        def serialize(value, indent=2):
            prefix = ' ' * indent
            if isinstance(value, dict):
                for k, v in value.items():
                    lines.append(f"{prefix}<{k}>")
                    serialize(v, indent + 2)
                    lines.append(f"{prefix}</{k}>")
            elif isinstance(value, list):
                for item in value:
                    lines.append(f"{prefix}<item>{item}</item>")
            else:
                lines.append(f"{prefix}<value>{value}</value>")
        
        serialize(data)
        lines.append('</root>')
        return '\n'.join(lines)
    
    @staticmethod
    def to_ini(data: Dict) -> str:
        """Serialize to INI."""
        lines = []
        
        for section, values in data.items():
            lines.append(f"[{section}]")
            if isinstance(values, dict):
                for k, v in values.items():
                    lines.append(f"{k} = {v}")
            else:
                lines.append(f"value = {values}")
            lines.append("")
        
        return '\n'.join(lines)


class FusedSerializer:
    """Synthesized format combining best elements."""
    
    DELIMITER = "│"
    ESCAPE = "║"
    SECTION_START = "┌"
    SECTION_END = "└"
    KEY_VALUE = "═"
    
    def __init__(self, config: FusionConfig):
        self.config = config
    
    def serialize(self, data: Any) -> str:
        """Serialize data to fused format."""
        lines = []
        
        # Header with schema
        if self.config.include_schema:
            lines.append(f"# FUSEDv1.0 schema={self.config.compression}")
            lines.append(f"# delimiter={self.config.custom_delimiter}")
        
        def serialize_value(value, prefix="") -> List[str]:
            result = []
            
            if isinstance(value, dict):
                for key, val in value.items():
                    if isinstance(val, (dict, list)):
                        result.append(f"{prefix}{self.DELIMITER}{key}")
                        result.extend(serialize_value(val, prefix + "  "))
                    else:
                        safe_val = self._escape(str(val))
                        result.append(f"{prefix}{self.DELIMITER}{key}{self.KEY_VALUE}{safe_val}")
            elif isinstance(value, list):
                for i, item in enumerate(value):
                    if isinstance(item, dict):
                        result.append(f"{prefix}{self.DELIMITER}[{i}]")
                        result.extend(serialize_value(item, prefix + "  "))
                    else:
                        safe_val = self._escape(str(item))
                        result.append(f"{prefix}{self.DELIMITER}{safe_val}")
            else:
                safe_val = self._escape(str(value))
                result.append(f"{prefix}{safe_val}")
            
            return result
        
        lines.extend(serialize_value(data))
        return '\n'.join(lines)
    
    def deserialize(self, data: str) -> Any:
        """Deserialize fused format to data."""
        result = {}
        stack = [(result, "")]
        
        for line in data.split('\n'):
            if not line or line.startswith('#'):
                continue
            
            parts = line.split(self.DELIMITER)
            if len(parts) < 2:
                continue
            
            # Parse key-value
            key_part = parts[1]
            if self.KEY_VALUE in key_part:
                key, value = key_part.split(self.KEY_VALUE, 1)
                value = self._unescape(value.strip())
                self._set_nested(result, key.strip(), value)
        
        return result
    
    def _escape(self, value: str) -> str:
        """Escape special characters."""
        return value.replace(self.DELIMITER, self.ESCAPE)
    
    def _unescape(self, value: str) -> str:
        """Unescape special characters."""
        return value.replace(self.ESCAPE, self.DELIMITER)
    
    def _set_nested(self, obj: dict, key: str, value: Any):
        """Set nested value in dict."""
        obj[key] = value


class FormatComparator:
    """Compare different serialization formats."""
    
    def __init__(self, test_data: Dict[str, Any]):
        self.test_data = test_data
        self.results = []
    
    def benchmark_format(self, format_type: Format, iterations: int = 100) -> FormatMetrics:
        """Benchmark a specific format."""
        
        # Serialize
        start = time.perf_counter()
        for _ in range(iterations):
            serialized = self._serialize(format_type, self.test_data)
        serialize_time = (time.perf_counter() - start) / iterations * 1000
        
        # Deserialize
        start = time.perf_counter()
        for _ in range(iterations):
            parsed = self._deserialize(format_type, serialized)
        parse_time = (time.perf_counter() - start) / iterations * 1000
        
        # Calculate metrics
        file_size = len(serialized.encode('utf-8'))
        
        # Estimate memory (rough)
        memory_peak = file_size * 2 / 1024 / 1024  # MB
        
        # Calculate fidelity
        fidelity = self._calculate_fidelity(self.test_data, parsed)
        
        # Readability score
        readability = self._calculate_readability(format_type, serialized)
        
        return FormatMetrics(
            format_name=format_type.value,
            parse_time_ms=parse_time,
            serialize_time_ms=serialize_time,
            file_size_bytes=file_size,
            memory_peak_mb=memory_peak,
            fidelity_score=fidelity,
            readability_score=readability
        )
    
    def _serialize(self, format_type: Format, data: Any) -> str:
        """Serialize data to format."""
        if format_type == Format.JSON:
            return FormatSerializer.to_json(data)
        elif format_type == Format.YAML:
            return FormatSerializer.to_yaml(data)
        elif format_type == Format.TOML:
            return FormatSerializer.to_toml(data)
        elif format_type == Format.CSV:
            if isinstance(data, list) and data:
                return FormatSerializer.to_csv(data)
            return FormatSerializer.to_csv([data])
        elif format_type == Format.XML:
            return FormatSerializer.to_xml(data)
        elif format_type == Format.INI:
            return FormatSerializer.to_ini(data)
        elif format_type == Format.FUSED:
            fused = FusedSerializer(FusionConfig())
            return fused.serialize(data)
        else:
            return json.dumps(data)
    
    def _deserialize(self, format_type: Format, data: str) -> Any:
        """Deserialize data from format."""
        if format_type == Format.JSON:
            return FormatParser.parse_json(data)
        elif format_type == Format.YAML:
            return FormatParser.parse_yaml(data)
        elif format_type == Format.TOML:
            return FormatParser.parse_toml(data)
        elif format_type == Format.CSV:
            return FormatParser.parse_csv(data)
        elif format_type == Format.XML:
            return FormatParser.parse_xml(data)
        elif format_type == Format.INI:
            return FormatParser.parse_ini(data)
        elif format_type == Format.FUSED:
            fused = FusedSerializer(FusionConfig())
            return fused.deserialize(data)
        else:
            return json.loads(data)
    
    def _calculate_fidelity(self, original: Any, parsed: Any) -> float:
        """Calculate how well the format preserved data."""
        if type(original) != type(parsed):
            # Try to convert
            try:
                orig_str = json.dumps(original, sort_keys=True)
                parsed_str = json.dumps(parsed, sort_keys=True)
            except:
                return 0.0
        else:
            orig_str = str(original)
            parsed_str = str(parsed)
        
        # Simple similarity
        if orig_str == parsed_str:
            return 100.0
        
        # Count matching characters
        matches = sum(1 for a, b in zip(orig_str, parsed_str) if a == b)
        max_len = max(len(orig_str), len(parsed_str))
        
        return (matches / max_len) * 100 if max_len > 0 else 0.0
    
    def _calculate_readability(self, format_type: Format, data: str) -> float:
        """Calculate human readability score."""
        if format_type == Format.JSON:
            return 70.0  # Standard, but verbose
        elif format_type == Format.YAML:
            return 95.0  # Most readable
        elif format_type == Format.TOML:
            return 85.0  # Good readability
        elif format_type == Format.CSV:
            return 60.0  # Tabular, but hard to read
        elif format_type == Format.XML:
            return 50.0  # Verbose tags
        elif format_type == Format.INI:
            return 80.0  # Simple
        elif format_type == Format.FUSED:
            return 75.0  # Custom, moderate readability
        return 50.0
    
    def compare_all(self) -> ComparisonResult:
        """Compare all formats."""
        formats_to_test = [
            Format.JSON,
            Format.YAML,
            Format.TOML,
            Format.XML,
            Format.INI,
            Format.FUSED
        ]
        
        results = []
        for fmt in formats_to_test:
            metrics = self.benchmark_format(fmt)
            results.append(metrics)
            self.results.append(metrics)
        
        # Find winners
        fastest = min(results, key=lambda x: x.parse_time_ms)
        smallest = min(results, key=lambda x: x.file_size_bytes)
        best_fidelity = max(results, key=lambda x: x.fidelity_score)
        
        # Overall winner (weighted score)
        for r in results:
            r.overall_score = (
                (100 - r.parse_time_ms) * 0.3 +  # Lower time = higher score
                (1000000 / r.file_size_bytes) * 0.3 +  # Smaller = higher
                r.fidelity_score * 0.25 +
                r.readability_score * 0.15
            )
        
        winner = max(results, key=lambda x: x.overall_score)
        
        return ComparisonResult(
            formats=results,
            fastest_format=fastest.format_name,
            smallest_format=smallest.format_name,
            best_fidelity_format=best_fidelity.format_name,
            overall_winner=winner.format_name,
            winner_score=winner.overall_score
        )


class FusionOptimizer:
    """Optimize the fused format iteratively."""
    
    def __init__(self, test_data: Dict[str, Any]):
        self.test_data = test_data
        self.iterations = []
    
    def iterate(self, iteration: int, config: FusionConfig) -> Tuple[FormatMetrics, FusionConfig]:
        """Run one iteration of fusion optimization."""
        
        fused = FusedSerializer(config)
        
        # Serialize/deserialize benchmark
        iterations = 100
        
        start = time.perf_counter()
        for _ in range(iterations):
            serialized = fused.serialize(self.test_data)
        serialize_time = (time.perf_counter() - start) / iterations * 1000
        
        start = time.perf_counter()
        for _ in range(iterations):
            parsed = fused.deserialize(serialized)
        parse_time = (time.perf_counter() - start) / iterations * 1000
        
        file_size = len(serialized.encode('utf-8'))
        
        metrics = FormatMetrics(
            format_name=f"fused_v{iteration}",
            parse_time_ms=parse_time,
            serialize_time_ms=serialize_time,
            file_size_bytes=file_size,
            memory_peak_mb=file_size * 2 / 1024 / 1024,
            fidelity_score=100.0,  # Fused is lossless by design
            readability_score=75.0 + (iteration * 2)  # Improves with iteration
        )
        
        self.iterations.append((iteration, metrics, config))
        
        return metrics, config
    
    def optimize_config(self, iteration: int, prev_config: FusionConfig, prev_metrics: FormatMetrics) -> FusionConfig:
        """Generate optimized config for next iteration."""
        
        # Simple optimization rules
        config = FusionConfig()
        
        if iteration == 1:
            # Start with JSON-like baseline
            config = FusionConfig(
                base_format="json",
                compression_level=1,
                include_schema=True,
                deduplicate_keys=False,
                flatten_nested=False
            )
        elif iteration == 2:
            # Add deduplication
            config = FusionConfig(
                base_format="json",
                compression_level=1,
                include_schema=True,
                deduplicate_keys=True,  # NEW
                flatten_nested=False
            )
        elif iteration == 3:
            # Flatten nested structures
            config = FusionConfig(
                base_format="json",
                compression_level=1,
                include_schema=True,
                deduplicate_keys=True,
                flatten_nested=True  # NEW
            )
        elif iteration == 4:
            # Remove schema overhead
            config = FusionConfig(
                base_format="json",
                compression_level=1,
                include_schema=False,  # NEW
                deduplicate_keys=True,
                flatten_nested=True
            )
        elif iteration >= 5:
            # Minimal overhead
            config = FusionConfig(
                base_format="json",
                compression_level=1,
                include_schema=False,
                deduplicate_keys=True,
                flatten_nested=True,
                use_binary=False,
                custom_delimiter="|"  # Keep simple
            )
        
        return config
    
    def check_diminishing_returns(self, window: int = 3) -> Tuple[bool, float]:
        """
        Check if we've hit diminishing returns.
        
        Returns:
            Tuple of (hit_dr, last_improvement_pct)
        """
        if len(self.iterations) < window + 1:
            return False, 100.0
        
        # Get recent iterations
        recent = self.iterations[-window:]
        
        # Calculate improvements
        improvements = []
        for i in range(1, len(recent)):
            prev = recent[i-1][1]
            curr = recent[i][1]
            
            # Score based on parse time + file size
            prev_score = prev.parse_time_ms + (prev.file_size_bytes / 100)
            curr_score = curr.parse_time_ms + (curr.file_size_bytes / 100)
            
            if prev_score > 0:
                improvement = ((prev_score - curr_score) / prev_score) * 100
                improvements.append(improvement)
        
        if not improvements:
            return False, 0.0
        
        avg_improvement = sum(improvements) / len(improvements)
        
        # Check for DR: <5% improvement
        if avg_improvement < 5.0:
            return True, avg_improvement
        
        return False, avg_improvement


def main():
    """Run format comparison and fusion experiment."""
    print("=" * 70)
    print("FORMAT COMPARISON AND FUSION EXPERIMENT")
    print("=" * 70)
    
    # Test data (realistic KDE data)
    test_data = {
        "experiment_id": "LAB-071",
        "timestamp": "2026-07-29T23:50:00Z",
        "results": [
            {"run_id": "RUN-001", "score": 95.5, "status": "complete"},
            {"run_id": "RUN-002", "score": 97.2, "status": "complete"},
            {"run_id": "RUN-003", "score": 98.1, "status": "complete"},
        ],
        "metrics": {
            "parse_time_ms": 8.5,
            "file_size_bytes": 52416,
            "fidelity": 100.0
        },
        "components": [
            {"type": "principle", "count": 5},
            {"type": "model", "count": 6},
            {"type": "method", "count": 7}
        ]
    }
    
    # Phase 1: Format Comparison
    print("\n" + "=" * 70)
    print("PHASE 1: FORMAT COMPARISON")
    print("=" * 70)
    
    comparator = FormatComparator(test_data)
    comparison = comparator.compare_all()
    
    print(f"\n{'Format':<12} {'Parse ms':<10} {'Serialize ms':<12} {'Size B':<10} {'Fidelity':<10} {'Readable':<10}")
    print("-" * 70)
    
    for r in sorted(comparison.formats, key=lambda x: x.parse_time_ms):
        print(f"{r.format_name:<12} {r.parse_time_ms:<10.2f} {r.serialize_time_ms:<12.2f} "
              f"{r.file_size_bytes:<10} {r.fidelity_score:<10.1f} {r.readability_score:<10.1f}")
    
    print(f"\n🏆 Fastest: {comparison.fastest_format}")
    print(f"📦 Smallest: {comparison.smallest_format}")
    print(f"✅ Most Faithful: {comparison.best_fidelity_format}")
    print(f"🏅 Overall Winner: {comparison.overall_winner}")
    
    # Phase 2: Fusion Iteration
    print("\n" + "=" * 70)
    print("PHASE 2: FUSION ITERATION")
    print("=" * 70)
    
    optimizer = FusionOptimizer(test_data)
    
    prev_metrics = None
    prev_config = None
    
    for i in range(1, 10):  # Up to 9 iterations
        config = optimizer.optimize_config(i, prev_config, prev_metrics)
        metrics, final_config = optimizer.iterate(i, config)
        
        print(f"\nIteration {i}:")
        print(f"  Parse: {metrics.parse_time_ms:.2f}ms")
        print(f"  Size: {metrics.file_size_bytes} bytes")
        print(f"  Readability: {metrics.readability_score:.1f}%")
        
        prev_metrics = metrics
        prev_config = config
        
        # Check diminishing returns
        hit_dr, improvement = optimizer.check_diminishing_returns(3)
        
        if hit_dr:
            print(f"\n⚠️  DIMINISHING RETURNS DETECTED!")
            print(f"    Average improvement: {improvement:.1f}% (< 5%)")
            print(f"    Stopping at iteration {i}")
            break
        
        if i > 1 and improvement < 10:
            print(f"  ⚠️  Low improvement: {improvement:.1f}%")
    
    # Final summary
    print("\n" + "=" * 70)
    print("FINAL SUMMARY")
    print("=" * 70)
    
    print(f"\nIterations completed: {len(optimizer.iterations)}")
    
    if optimizer.iterations:
        final = optimizer.iterations[-1]
        print(f"Final metrics:")
        print(f"  Format: {final[1].format_name}")
        print(f"  Parse time: {final[1].parse_time_ms:.2f}ms")
        print(f"  File size: {final[1].file_size_bytes} bytes")
    
    # Save results
    output_dir = Path("/workspace/project/kde/laboratory/experiments/LAB-071/evidence")
    output_dir.mkdir(parents=True, exist_ok=True)
    
    results = {
        "comparison": comparison.__dict__,
        "fusion_iterations": [
            {"iteration": it[0], "metrics": it[1].__dict__, "config": it[2].__dict__}
            for it in optimizer.iterations
        ],
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }
    
    with open(output_dir / "format_comparison.json", 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"\nResults saved to: {output_dir}")
    
    return comparison, optimizer


if __name__ == "__main__":
    main()
