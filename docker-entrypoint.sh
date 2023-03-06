#!/bin/sh

echo "Waiting for PostgresDB to start..."
chmod +x wait-for
./wait-for maskanplus-database:5432

echo "Migrating the database..."
yarn prisma migrate deploy

echo "Building the backend..."
yarn run build

echo "Starting the server..."
yarn run start:prod