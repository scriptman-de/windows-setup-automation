#! /usr/bin/env sh

# script/bootstrap: Resolve all dependencies that the application requires to
#                   run

set -e

cd "$(dirname "$0")/.."

if [ -f "package.json" ]; then
  echo "===> installing npm dependencies..."
  npm install
fi