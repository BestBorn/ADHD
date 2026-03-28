#!/bin/bash

# Build and package ADHD Focus Chrome Extension

echo "📦 Building ADHD Focus Chrome Extension..."

# Create release directory
mkdir -p releases
RELEASE_DIR="releases/adhd-focus-extension-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$RELEASE_DIR"

# Copy extension files
echo "📋 Copying extension files..."
cp public/manifest.json "$RELEASE_DIR/"
cp public/popup.html "$RELEASE_DIR/"
cp public/popup.js "$RELEASE_DIR/"
cp public/background.js "$RELEASE_DIR/"
cp -r public/images "$RELEASE_DIR/" 2>/dev/null || true

# Create zip file
echo "🤐 Creating zip file..."
ARCHIVE_NAME="adhd-focus-extension-$(date +%Y%m%d-%H%M%S).zip"
cd "$RELEASE_DIR"
zip -r "../../$ARCHIVE_NAME" . > /dev/null 2>&1
cd ../..

echo ""
echo "✅ Build complete!"
echo ""
echo "📦 Extension package created: $ARCHIVE_NAME"
echo ""
echo "📥 To load in Chrome:"
echo "1. Extract the zip file"
echo "2. Go to chrome://extensions/"
echo "3. Enable 'Developer mode'"
echo "4. Click 'Load unpacked'"
echo "5. Select the extracted folder"
echo ""
echo "Or:"
echo "1. Download the zip file"
echo "2. Extract it somewhere"
echo "3. Follow the steps above"
