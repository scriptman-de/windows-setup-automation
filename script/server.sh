#! /usr/bin/env sh

# script/server.sh: Launch the application and any extra required processes
#                   locally.

set -e

cd "$(dirname "$0")/.."

# ensure everythin is up to date
script/update.sh

# startup the server
npm start