# Mintlify Deployment Guide for Bruno Docs

## 🚀 Complete Step-by-Step Deployment Instructions

Follow these steps to deploy your Bruno documentation to Mintlify and enable all features (AI chat, edit buttons, feedback).

---

## Part 1: Push to GitHub

### Step 1: Initialize Git Repository

```bash
cd /Users/ganeshpatil/Desktop/bruno/mintlify

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Bruno docs migrated to Mintlify"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `bruno-docs-mintlify` (or any name you prefer)
3. Description: "Bruno API Client Documentation (Mintlify)"
4. Choose: **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### Step 3: Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add GitHub remote (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/bruno-docs-mintlify.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/usebruno/bruno-docs-mintlify.git
git branch -M main
git push -u origin main
```

---

## Part 2: Deploy to Mintlify

### Step 1: Create Mintlify Account

1. Go to https://mintlify.com
2. Click "Sign up" or "Get Started"
3. Sign up with your GitHub account (recommended)
4. Complete the onboarding process

### Step 2: Create New Documentation Project

1. In Mintlify Dashboard, click **"New Project"** or **"Create Documentation"**
2. Choose **"Connect GitHub Repository"**
3. Select your repository: `bruno-docs-mintlify`
4. Mintlify will automatically detect the `mint.json` file

### Step 3: Configure Deployment Settings

Mintlify will ask you to configure:

1. **Repository:** Already selected
2. **Branch:** `main` (default)
3. **Build Command:** Leave default (Mintlify auto-detects)
4. **Root Directory:** Leave as `/` (root)

Click **"Deploy"**

### Step 4: Wait for Build

- First deployment takes ~2-5 minutes
- You'll see a build progress indicator
- Once complete, you'll get a URL like: `https://bruno-docs-mintlify.mintlify.app`

---

## Part 3: Verify Features

### After Deployment, Check These Features:

Visit your deployed site and verify:

#### ✅ AI Features (Top-right corner)
- [ ] **Copy page** button appears
- [ ] Clicking shows options:
  - Copy page as Markdown
  - Open in ChatGPT
  - Open in Claude
  - Connect to Cursor
  - Connect to VS Code

#### ✅ Feedback Buttons (Bottom of each page)
- [ ] **"Edit this page"** button (pencil icon)
  - Should link to: `https://github.com/YOUR-USERNAME/bruno-docs-mintlify/edit/main/[page].mdx`
- [ ] **"Report an issue"** button
  - Should link to: `https://github.com/YOUR-USERNAME/bruno-docs-mintlify/issues/new`
- [ ] **Thumbs rating** (👍 👎)
  - "Was this page helpful?"

#### ✅ Other Features
- [ ] Search works
- [ ] All pages load correctly
- [ ] Images display properly
- [ ] Navigation works
- [ ] Dark/Light mode toggle
- [ ] Mobile responsive

---

## Part 4: Custom Domain (Optional)

### Option A: Use Mintlify Subdomain (Free)
Your site is already live at: `https://bruno-docs-mintlify.mintlify.app`

### Option B: Add Custom Domain (e.g., docs.usebruno.com)

1. **In Mintlify Dashboard:**
   - Go to **Settings** → **Domain**
   - Click **"Add Custom Domain"**
   - Enter: `docs.usebruno.com`

2. **In Your DNS Provider:**
   - Add CNAME record:
     - **Name/Host:** `docs` (or `@` for root domain)
     - **Value/Target:** `cname.mintlify.app`
     - **TTL:** 3600 (or automatic)

3. **Wait for DNS Propagation:**
   - Can take 5 minutes to 48 hours
   - Use https://dnschecker.org to check status

4. **Verify in Mintlify:**
   - Mintlify will auto-verify when DNS is ready
   - SSL certificate will be automatically provisioned

---

## Part 5: Automatic Updates

Once deployed, any changes you push to GitHub will **automatically deploy**:

```bash
# Make changes to your docs
vim introduction/what-is-bruno.mdx

# Commit and push
git add .
git commit -m "Update documentation"
git push origin main

# Mintlify automatically builds and deploys (2-3 minutes)
```

---

## 🎯 Quick Reference Commands

### Daily Workflow

```bash
# 1. Navigate to project
cd /Users/ganeshpatil/Desktop/bruno/mintlify

# 2. Make changes to MDX files
# (edit files in your editor)

# 3. Test locally
mint dev
# View at http://localhost:3000

# 4. Commit and deploy
git add .
git commit -m "Your change description"
git push origin main

# Mintlify auto-deploys in 2-3 minutes
```

---

## 🔧 Troubleshooting

### Build Fails on Mintlify

**Check these common issues:**

1. **Invalid mint.json syntax**
   - Validate JSON: https://jsonlint.com
   - Copy your `mint.json` content and paste to validate

2. **Missing required fields in mint.json**
   - Ensure `name`, `navigation`, and `logo` are present

3. **Import errors**
   - Mintlify doesn't support custom React components
   - Remove or comment out custom imports

### Features Not Appearing

1. **Clear browser cache:** Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
2. **Check deployment status:** In Mintlify dashboard
3. **Verify configuration:** Ensure `feedback` and `ai` sections are in `mint.json`

### DNS Not Working

1. **Check DNS records:** https://dnschecker.org
2. **Verify CNAME:** Should point to `cname.mintlify.app`
3. **Wait longer:** Can take up to 48 hours

---

## 📊 Expected Timeline

| Step | Time |
|------|------|
| Push to GitHub | 1-2 minutes |
| Create Mintlify account | 2-3 minutes |
| Connect repository | 1 minute |
| First deployment | 2-5 minutes |
| **Total** | **~10 minutes** |
| Custom domain (optional) | 5 mins - 48 hours |

---

## ✅ Checklist

Use this checklist to track your deployment:

- [ ] Git repository initialized
- [ ] Committed all files
- [ ] Created GitHub repository
- [ ] Pushed to GitHub
- [ ] Created Mintlify account
- [ ] Connected GitHub repository
- [ ] First deployment successful
- [ ] Verified deployed URL works
- [ ] Tested AI "Copy page" button
- [ ] Tested "Edit this page" button
- [ ] Tested feedback buttons
- [ ] Custom domain configured (optional)
- [ ] DNS records verified (optional)

---

## 🎉 Success!

Once deployed, your documentation will be live with:

- ✅ Professional, fast documentation site
- ✅ AI-powered chat features
- ✅ Edit buttons for community contributions
- ✅ Automatic deployments on every push
- ✅ Built-in search
- ✅ Mobile responsive
- ✅ Analytics (available in Mintlify dashboard)

---

## 📞 Support

**Mintlify Support:**
- Documentation: https://mintlify.com/docs
- Discord: https://discord.gg/mintlify
- Email: hi@mintlify.com

**Bruno Support:**
- GitHub: https://github.com/usebruno/bruno
- Discord: https://discord.com/invite/KgcZUncpjq

---

## 🔄 Update This Documentation

To update your Mintlify docs after initial deployment:

```bash
# Make changes
git add .
git commit -m "Update docs"
git push

# That's it! Mintlify auto-deploys
```

---

**Good luck with your deployment! 🚀**

The AI features and all interactive buttons will appear once deployed to Mintlify's platform.

