#!/bin/bash
#===============================================================================
# KDE Runtime Installation Script
# 
# Usage:
#   curl -sL https://raw.githubusercontent.com/tamzrod/kde/main/scripts/install-kde.sh | bash
#
# Or download and run locally:
#   chmod +x install-kde.sh && ./install-kde.sh
#===============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
KDE_SOURCE="https://raw.githubusercontent.com/tamzrod/kde/main"
PROJECT_NAME="${PWD##*/}"

echo "=========================================="
echo "KDE Runtime Installation"
echo "=========================================="
echo ""

# Check if in git repository
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}Warning: Not in a git repository${NC}"
    echo "Creating .git directory..."
    git init
fi

# Detect project type
if [ -f "go.mod" ]; then
    PROJECT_TYPE="go"
elif [ -f "package.json" ]; then
    PROJECT_TYPE="node"
elif [ -f "requirements.txt" ] || [ -f "pyproject.toml" ]; then
    PROJECT_TYPE="python"
else
    PROJECT_TYPE="unknown"
fi

echo "Project: $PROJECT_NAME"
echo "Type: $PROJECT_TYPE"
echo ""

# Install PyYAML
echo "[1/5] Installing PyYAML..."
if python3 -c "import yaml" 2>/dev/null; then
    echo "      PyYAML already installed"
else
    pip install pyyaml --quiet
    echo -e "      ${GREEN}PyYAML installed${NC}"
fi

# Create directories
echo "[2/5] Creating directory structure..."
mkdir -p .kde/bootstrap .kde/runtime .kde/engines .kde/experts
mkdir -p .kde/knowledge .kde/governance .kde/seeds/seed-001/principles
mkdir -p .kde/commands .kde/capabilities .kde/templates .kde/verification
mkdir -p laboratory/experiments laboratory/investigations laboratory/reviews
mkdir -p .openhands
echo "      Directories created"

# Download bootstrap files
echo "[3/5] Downloading bootstrap files..."
curl -sL "$KDE_SOURCE/.kde/bootstrap/gates.py" -o .kde/bootstrap/gates.py
curl -sL "$KDE_SOURCE/.kde/bootstrap/config.yaml" -o .kde/bootstrap/config.yaml

# Update config with project name
sed -i.bak "s/My Project KDE Runtime/$PROJECT_NAME/" .kde/bootstrap/config.yaml
sed -i "s/project_type: auto/project_type: $PROJECT_TYPE/" .kde/bootstrap/config.yaml
rm -f .kde/bootstrap/config.yaml.bak
echo "      Bootstrap files downloaded"

# Download Laboratory files
echo "[4/5] Downloading laboratory files..."
curl -sL "$KDE_SOURCE/laboratory/BOOTSTRAP.md" -o laboratory/BOOTSTRAP.md
curl -sL "$KDE_SOURCE/laboratory/LABORATORY-RULES.md" -o laboratory/LABORATORY-RULES.md 2>/dev/null || true
curl -sL "$KDE_SOURCE/seeds/seed-001/principles/5-principles.md" -o seeds/seed-001/principles/5-principles.md
echo "      Laboratory files downloaded"

# Create OpenHands setup
echo "[5/5] Creating OpenHands integration..."
cat > .openhands/setup.sh << 'OPENHANDS_EOF'
#!/bin/bash
set -e
echo "=========================================="
echo "KDE Runtime Bootstrap Setup"
echo "=========================================="
if ! python3 -c "import yaml" 2>/dev/null; then
    echo "[1/3] Installing PyYAML..."
    pip install pyyaml --quiet
fi
if [ -f "go.mod" ]; then
    echo "[2/3] Go project detected"
    go mod download 2>/dev/null || true
elif [ -f "package.json" ]; then
    echo "[2/3] Node project detected"
elif [ -f "requirements.txt" ] || [ -f "pyproject.toml" ]; then
    echo "[2/3] Python project detected"
fi
echo "[3/3] Running KDE Bootstrap Gates..."
python3 .kde/bootstrap/gates.py --project-type auto || true
echo ""
echo "=========================================="
echo "Runtime ready for investigation."
echo "=========================================="
OPENHANDS_EOF
chmod +x .openhands/setup.sh
echo "      OpenHands setup created"

# Update .gitignore
echo ""
echo "Updating .gitignore..."
if [ -f ".gitignore" ]; then
    if ! grep -q "# KDE" .gitignore; then
        echo "" >> .gitignore
        echo "# KDE runtime state" >> .gitignore
        echo ".kde/runtime/state.json" >> .gitignore
        echo ".kde/runtime/.lock" >> .gitignore
        echo "      Added KDE entries to .gitignore"
    else
        echo "      KDE entries already in .gitignore"
    fi
else
    echo "# KDE runtime state" > .gitignore
    echo ".kde/runtime/state.json" >> .gitignore
    echo ".kde/runtime/.lock" >> .gitignore
    echo "      Created .gitignore with KDE entries"
fi

# Run verification
echo ""
echo "=========================================="
echo "Verifying Installation"
echo "=========================================="
python3 .kde/bootstrap/gates.py

echo ""
echo -e "${GREEN}=========================================="
echo "KDE Runtime Installation Complete!"
echo "==========================================${NC}"
echo ""
echo "Next steps:"
echo "  1. Read: laboratory/BOOTSTRAP.md"
echo "  2. Review: laboratory/LABORATORY-RULES.md"
echo "  3. Start: Create investigation in laboratory/experiments/"
echo ""
echo "For more info: docs/guides/deployment.md"
echo ""
