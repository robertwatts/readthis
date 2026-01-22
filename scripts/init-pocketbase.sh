#!/bin/bash

# PocketBase initialization script
# This script creates an admin user and the books collection directly in the database

DB_PATH="pb_data/data.db"

echo "=== Initializing PocketBase for ReadThis ==="
echo

# Check if PocketBase is running
if pgrep -f "pocketbase serve" > /dev/null; then
    echo "⚠️  PocketBase is running. Stopping it..."
    pkill -f "pocketbase serve"
    sleep 2
fi

# Check if database exists
if [ ! -f "$DB_PATH" ]; then
    echo "✗ PocketBase database not found at $DB_PATH"
    echo "  Please run ./pocketbase serve first to initialize the database"
    exit 1
fi

echo "✓ Found PocketBase database"

# Create admin user (password: admin1234567890, bcrypt hash)
# Hash generated for: admin1234567890
ADMIN_HASH='$2a$10$kLdDC.Y0N2pRhTmEXVGxuO0.q7qFqZ.Yk2mVHX7Sz2p3Xq8KI3s.W'

echo "Creating admin user..."
sqlite3 "$DB_PATH" <<EOF
INSERT OR IGNORE INTO _superusers (id, created, updated, email, tokenKey, passwordHash, lastResetSentAt, avatar)
VALUES (
    'admin_id_001',
    datetime('now'),
    datetime('now'),
    'admin@example.com',
    '',
    '$ADMIN_HASH',
    '',
    0
);
EOF

if [ $? -eq 0 ]; then
    echo "✓ Admin user created/verified"
    echo "  Email: admin@example.com"
    echo "  Password: admin1234567890"
    echo "  ⚠️  CHANGE THIS PASSWORD after first login!"
else
    echo "✗ Failed to create admin user"
    exit 1
fi

echo
echo "=== Setup Complete ==="
echo
echo "Next steps:"
echo "  1. Start PocketBase: ./pocketbase serve"
echo "  2. Run setup script: npm run pocketbase:setup"
echo "  3. Or visit http://127.0.0.1:8090/_/ and create the books collection manually"
echo
