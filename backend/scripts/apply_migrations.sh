#!/bin/sh
set -eu

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ENV_FILE="$SCRIPT_DIR/../.env"

if [ ! -f "$ENV_FILE" ]; then
  echo "Error: .env file not found at $ENV_FILE" >&2
  exit 1
fi

. "$ENV_FILE"

export PGPASSWORD="$POSTGRES_PASSWORD"
MIGRATIONS_DIR="$SCRIPT_DIR/../src/db/migrations"

echo "Connecting to $POSTGRES_USER@$DB_HOST:$DB_PORT/$POSTGRES_DB"
echo "Running migrations from: $MIGRATIONS_DIR"
echo

set -- "$MIGRATIONS_DIR"/*.sql
if [ ! -f "$1" ]; then
  echo "No .sql files found in $MIGRATIONS_DIR"
  exit 0
fi

for file in "$@"; do
  name=$(basename "$file")
  echo "-> $name"
  psql \
    --host="$DB_HOST" \
    --port="$DB_PORT" \
    --dbname="$POSTGRES_DB" \
    --username="$POSTGRES_USER" \
    --file="$file" \
    -v ON_ERROR_STOP=1 \
    --quiet
done

echo
echo "Done."

# ─── Regenerate Kysely types ──────────────────────────────────────────────────

echo "Regenerating DB types..."
DATABASE_URL="postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@$DB_HOST:$DB_PORT/$POSTGRES_DB" \
  npx kysely-codegen --dialect postgres --url "$DATABASE_URL" --out-file "$SCRIPT_DIR/../src/db/schema.ts"
echo "Types updated."
