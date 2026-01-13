#!/bin/bash

# Auto-publish script for BlockBox content changes
# This script commits and pushes changes to GitHub

echo "🚀 Publishing changes to GitHub Pages..."

# Check if there are changes
if ! git diff --quiet || ! git diff --cached --quiet; then
    # Add all HTML files
    git add index.html stats.html

    # Commit with timestamp
    timestamp=$(date "+%Y-%m-%d %H:%M:%S")
    git commit -m "content: update via edit mode - $timestamp"

    # Push to GitHub
    git push origin main

    echo "✅ Changes published successfully!"
    echo "🌐 Live at: https://jadenschwartz22-ops.github.io/blockbox-landing/"
else
    echo "ℹ️  No changes to publish"
fi
