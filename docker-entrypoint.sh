#!/bin/sh

echo "Waiting for PostgresDB to start..."
chmod +x wait-for
./wait-for bsc-project-database:5432

echo "Migrating the database..."
yarn prisma migrate deploy

echo "Building and Starting the backend..."
yarn run up:production