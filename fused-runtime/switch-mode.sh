#!/bin/bash
# KDE Mode Switcher
# Usage: ./switch-mode.sh [md|fused]

set -e

MODE="${1:-}"

# Check current mode
get_current_mode() {
    if [ -n "$KDE_MODE" ]; then
        echo "$KDE_MODE"
    elif grep -q "mode = fused" .kderc 2>/dev/null; then
        echo "fused"
    else
        echo "md"
    fi
}

# Show help
show_help() {
    echo "KDE Mode Switcher"
    echo ""
    echo "Usage: switch-mode.sh [MODE]"
    echo ""
    echo "Modes:"
    echo "  md     - Markdown mode (human-readable, default)"
    echo "  fused  - FUSED mode (AI-optimized)"
    echo ""
    echo "Options:"
    echo "  -h, --help     Show this help"
    echo "  -s, --show     Show current mode"
    echo ""
    echo "Current mode: $(get_current_mode)"
}

# Switch to MD mode
switch_to_md() {
    export KDE_MODE=md
    echo "# [kde]" > .kderc
    echo "mode = md" >> .kderc
    echo "✅ Switched to MD Mode"
    echo "   Runtime: /seeds/, /engines/, /governance/"
}

# Switch to FUSED mode
switch_to_fused() {
    export KDE_MODE=fused
    echo "# [kde]" > .kderc
    echo "mode = fused" >> .kderc
    echo "✅ Switched to FUSED Mode"
    echo "   Runtime: /fused-runtime/"
}

# Main
case "${MODE}" in
    -h|--help)
        show_help
        ;;
    -s|--show)
        echo "Current mode: $(get_current_mode)"
        ;;
    md)
        switch_to_md
        ;;
    fused)
        switch_to_fused
        ;;
    "")
        echo "Current mode: $(get_current_mode)"
        echo "Usage: switch-mode.sh [md|fused]"
        ;;
    *)
        echo "❌ Unknown mode: $MODE"
        echo "Usage: switch-mode.sh [md|fused]"
        exit 1
        ;;
esac
