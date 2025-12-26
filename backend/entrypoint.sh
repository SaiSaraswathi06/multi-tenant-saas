#!/bin/sh

echo "⏳ Running migrations..."
psql -U $DB_USER -d $DB_NAME -h database -f /app/migrations/001_init.sql

echo "📥 Seeding data..."
psql -U $DB_USER -d $DB_NAME -h database -f /app/seed/002_seed.sql

echo "🚀 Starting Backend Server..."
npm start
