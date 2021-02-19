#! /usr/bin/env zsh
set -e

cd "$(dirname "$0")/.."

if [ -f "prisma/prisma.schema" ]; then
  echo "===> execute database migration..."
  npx prisma migrate dev --preview-feature
fi

echo "===> build nextjs app"
npm run build