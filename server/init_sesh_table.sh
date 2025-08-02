#!/bin/sh

until pg_isready -h db -p 5432 -U postgres; do
  sleep 2
done

psql "$SCRIPT_DB_URL" <<'EOSQL'
CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid");

CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");
EOSQL