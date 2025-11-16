#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DIST_DIR="$ROOT_DIR/dist"

printf '\n==> Cleaning previous dist folder if it exists...\n'
rm -rf "$DIST_DIR"

printf '\n==> Building Expo web bundle with production env...\n'
export NODE_ENV=production
export PUBLIC_URL=/fitrack2
(cd "$ROOT_DIR" && npm run build:web)

printf '\n==> Adding GitHub Pages helpers (.nojekyll + 404 redirect)...\n'
touch "$DIST_DIR/.nojekyll"
cp "$DIST_DIR/index.html" "$DIST_DIR/404.html"

printf '\n==> Previewing dist via local static server (Ctrl+C to stop)...\n'
(cd "$DIST_DIR" && npx --yes serve . -p 3000)
