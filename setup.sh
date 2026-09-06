#!/bin/bash
# Quick Start Script for Pokémon Explorer

echo "🚀 Setting up Pokémon Explorer..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo "✅ npm found: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✨ Setup complete!"
echo ""
echo "To start the server, run:"
echo "  npm start"
echo ""
echo "For development with auto-reload:"
echo "  npm install -g nodemon"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:5000"
echo ""
