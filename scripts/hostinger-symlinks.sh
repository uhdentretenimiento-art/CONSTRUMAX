#!/bin/bash
set -euo pipefail

DOMAIN="${DOMAIN:-construmaxpiscinas.com}"
BASE="${BASE:-$HOME/domains/$DOMAIN}"
PERSIST="${PERSIST:-$BASE/storage/uploads}"

if [ -n "${APP:-}" ]; then
  APP_DIR="$APP"
elif [ -d "$BASE/nodejs" ]; then
  APP_DIR="$BASE/nodejs"
elif [ -d "$BASE/public_html/nodejs" ]; then
  APP_DIR="$BASE/public_html/nodejs"
else
  exit 0
fi

mkdir -p "$PERSIST/images" "$PERSIST/videos"

cd "$APP_DIR"

if [ "$APP_DIR" = "$BASE/nodejs" ]; then
  ln -sfn ../storage/uploads/images images
  ln -sfn ../storage/uploads/videos videos
elif [ "$APP_DIR" = "$BASE/public_html/nodejs" ]; then
  ln -sfn ../../storage/uploads/images images
  ln -sfn ../../storage/uploads/videos videos
else
  ln -sfn "$PERSIST/images" images
  ln -sfn "$PERSIST/videos" videos
fi

chmod -R u+rwX,go+rX "$PERSIST" || true