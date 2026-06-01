#!/usr/bin/env bash
set -e

echo "career-ops setup"
echo "================"

# ── Node.js ───────────────────────────────────────────────────────────────────
if ! command -v node &>/dev/null; then
  echo "ERROR: Node.js not found. Install v18+ from https://nodejs.org"
  exit 1
fi

node -e "if (parseInt(process.version.slice(1)) < 18) { process.exit(1) }" || {
  echo "ERROR: Node.js v18+ required. Found: $(node --version)"
  exit 1
}
echo "Node.js $(node --version) OK"

# ── npm dependencies ──────────────────────────────────────────────────────────
echo "Installing npm dependencies..."
npm install

# ── Playwright chromium (PDF generation) ─────────────────────────────────────
echo "Installing Playwright chromium..."
npx playwright install chromium

# ── Claude Code ───────────────────────────────────────────────────────────────
if ! command -v claude &>/dev/null; then
  echo "Installing Claude Code..."
  npm install -g @anthropic-ai/claude-code
else
  echo "Claude Code $(claude --version 2>/dev/null | head -1) already installed"
fi

# ── Caveman plugin (optional — terse AI response mode) ────────────────────────
# Adds the caveman marketplace to ~/.claude/settings.json and enables the plugin.
# Skip with: SKIP_CAVEMAN=1 ./setup.sh
if [ "${SKIP_CAVEMAN:-0}" != "1" ]; then
  SETTINGS="$HOME/.claude/settings.json"
  if [ ! -f "$SETTINGS" ]; then
    mkdir -p "$HOME/.claude"
    echo '{}' > "$SETTINGS"
  fi

  # Check if caveman marketplace already registered
  if ! grep -q '"caveman"' "$SETTINGS" 2>/dev/null; then
    echo "Registering caveman marketplace in $SETTINGS..."
    # Use node to safely merge JSON — avoids jq dependency
    node -e "
      const fs = require('fs');
      const s = JSON.parse(fs.readFileSync('$SETTINGS', 'utf8'));
      s.extraKnownMarketplaces = s.extraKnownMarketplaces || {};
      s.extraKnownMarketplaces.caveman = { source: { repo: 'JuliusBrussee/caveman', source: 'github' } };
      s.enabledPlugins = s.enabledPlugins || {};
      s['enabledPlugins']['caveman@caveman'] = true;
      fs.writeFileSync('$SETTINGS', JSON.stringify(s, null, 4));
    "
    echo "Caveman registered. Restart Claude Code to activate."
  else
    echo "Caveman already registered"
  fi
fi

# ── Done ──────────────────────────────────────────────────────────────────────
echo ""
echo "Setup complete. Start with:"
echo "  claude"
echo ""
echo "First run will guide you through onboarding (CV, profile, portals)."
echo "To reset an existing install for a new user: tell Claude 'reset'"
