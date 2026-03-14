#!/bin/bash
set -euo pipefail

DOMAIN="construmaxpiscinas.com"
BASE="$HOME/domains/$DOMAIN"
APP="$BASE/nodejs"
PERSIST="$BASE/storage/uploads"

# carpetas persistentes
mkdir -p "$PERSIST/images" "$PERSIST/videos"

# symlinks para la app (nodejs/)
cd "$APP"
ln -sfn ../storage/uploads/images images
ln -sfn ../storage/uploads/videos videos

# symlinks para URLs publicas (/images y /videos)
cd "$BASE/public_html"
ln -sfn ../storage/uploads/images images
ln -sfn ../storage/uploads/videos videos

# permisos basicos
chmod -R u+rwX,go+rX "$PERSIST" || true