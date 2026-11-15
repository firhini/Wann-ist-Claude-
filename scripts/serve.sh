#!/usr/bin/env bash
# Startet den Produktionsserver neu (Port 3100) und wartet, bis er antwortet.
PORT="${PORT:-3100}"
pkill -f "next-server" 2>/dev/null
pkill -f "next start" 2>/dev/null
sleep 1
(npx next start -p "$PORT" > "${LOG:-/dev/null}" 2>&1 &)
for i in $(seq 1 40); do
  curl -s -o /dev/null "http://localhost:$PORT/" && exit 0
  sleep 0.5
done
echo "Server antwortet nicht" >&2
exit 1
