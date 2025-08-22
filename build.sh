#!/bin/bash

# Simple build script for MTG Card Proxy

echo "Building WASM package..."
wasm-pack build

echo "Installing npm dependencies..."
cd frontend
npm install

echo "Building production files..."
npm run build

echo "Setting up docs directory..."
cd ..
mkdir -p docs
cp -r frontend/dist/* docs/
echo "Files copied to docs/ for GitHub Pages"

echo "Build complete! Run 'npm start' from root to start development server."