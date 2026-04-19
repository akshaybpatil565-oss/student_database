#!/bin/bash
# Automated Deployment Script for Student Database to Vercel + MongoDB

set -e

echo "=========================================="
echo "Student Database Cloud Deployment"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Install from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js detected: $(node --version)"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Vercel CLI ready"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "=========================================="
echo "STEP 1: MongoDB Atlas Setup"
echo "=========================================="
echo ""
echo "1. Go to https://www.mongodb.com/cloud/atlas"
echo "2. Sign up (free tier)"
echo "3. Create a cluster (M0 Free)"
echo "4. Wait 5-10 minutes for cluster creation"
echo "5. Go to Database Access → Add User (save username/password)"
echo "6. Go to Network Access → Allow 0.0.0.0/0"
echo "7. Click Connect → Drivers → copy connection string"
echo ""
read -p "Press Enter when MongoDB cluster is ready and connection string copied..."

echo ""
echo "=========================================="
echo "STEP 2: Vercel Deployment"
echo "=========================================="
echo ""
echo "Running: vercel"
echo "(You'll be asked to log in and authorize Vercel)"
echo ""

vercel

echo ""
echo "=========================================="
echo "STEP 3: Add Environment Variables"
echo "=========================================="
echo ""
echo "1. Go to your Vercel project dashboard"
echo "2. Go to Settings → Environment Variables"
echo "3. Add new variable:"
echo "   Name: MONGODB_URI"
echo "   Value: [paste your MongoDB connection string]"
echo "4. Redeploy or click the URL to test"
echo ""

echo "✅ Deployment complete!"
echo ""
echo "Your database is now live and accessible from anywhere!"
echo "Share your Vercel URL with other users to collaborate."
