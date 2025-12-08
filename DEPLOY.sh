#!/bin/bash

# Quick Deployment Script for Bruno Mintlify Docs
# This script helps you push to GitHub

echo "🚀 Bruno Mintlify Docs - Deployment Helper"
echo "==========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "mint.json" ]; then
    echo "❌ Error: mint.json not found. Are you in the mintlify directory?"
    exit 1
fi

echo "📝 Step 1: Initialize Git Repository"
echo "-------------------------------------"

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "Initializing git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

echo ""
echo "📦 Step 2: Add and Commit Files"
echo "--------------------------------"

# Add all files
git add .

# Commit
read -p "Enter commit message (or press Enter for default): " commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Deploy Bruno docs to Mintlify"
fi

git commit -m "$commit_msg"
echo "✅ Files committed"

echo ""
echo "🔗 Step 3: Add GitHub Remote"
echo "-----------------------------"

# Check if remote already exists
if git remote | grep -q "origin"; then
    echo "✅ Remote 'origin' already exists"
    git remote -v
else
    echo ""
    echo "Please create a GitHub repository first:"
    echo "1. Go to: https://github.com/new"
    echo "2. Create repository: bruno-docs-mintlify"
    echo "3. DO NOT initialize with README"
    echo ""
    read -p "Enter your GitHub repository URL: " repo_url
    
    if [ -z "$repo_url" ]; then
        echo "❌ No repository URL provided"
        exit 1
    fi
    
    git remote add origin "$repo_url"
    echo "✅ Remote added: $repo_url"
fi

echo ""
echo "🚀 Step 4: Push to GitHub"
echo "-------------------------"

# Set branch to main
git branch -M main

# Push
echo "Pushing to GitHub..."
if git push -u origin main; then
    echo "✅ Successfully pushed to GitHub!"
else
    echo ""
    echo "⚠️  Push failed. You may need to force push if repository exists:"
    echo "   git push -u origin main --force"
    exit 1
fi

echo ""
echo "✅ SUCCESS! Your code is on GitHub"
echo "=================================="
echo ""
echo "📋 Next Steps:"
echo "1. Go to: https://mintlify.com"
echo "2. Sign up with GitHub"
echo "3. Click 'New Project'"
echo "4. Connect your repository"
echo "5. Deploy!"
echo ""
echo "🎯 Your docs will be live at:"
echo "   https://[your-project].mintlify.app"
echo ""
echo "📚 For detailed guide, see: DEPLOYMENT_GUIDE.md"
echo ""

