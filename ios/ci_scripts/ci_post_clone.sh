#!/bin/sh

# Fail on error
set -e

# Install CocoaPods
echo "Installing CocoaPods..."
brew install cocoapods || true

# Navigate to project root (2 levels up from ios/ci_scripts)
cd ../..

# Install Node dependencies
echo "Installing NPM dependencies..."
npm install

# Build Web Assets
echo "Building Web Assets..."
npm run build

# Sync Capacitor to iOS
echo "Syncing Capacitor..."
npx cap sync ios

# Fix Pods (if sync didn't fully handle it or if repo-update needed)
cd ios/App
echo "Installing Pods..."
pod install --repo-update
