#! /usr/bin/env sh

# script/update: Update application to run for is current checkout

set -e

cd "$(dirname "$0")/.."

script/bootstrap.sh

echo "===> Updating database..."
if [ -f "prisma/prisma.schema" ]; then
  echo "===> execute database migration..."
  npx prisma migrate dev --preview-feature
fi