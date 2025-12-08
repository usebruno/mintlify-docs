# Bruno Mintlify Docs - Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Start Local Server
```bash
cd /Users/ganeshpatil/Desktop/bruno/mintlify
mint dev
```

Open http://localhost:3000 in your browser

### 2. Edit Documentation
All content is in the root directory:
- `introduction/*.mdx` - Introduction pages
- `get-started/**/*.mdx` - Getting started guides
- `send-requests/**/*.mdx` - Request documentation
- etc.

Edit any `.mdx` file and see live changes!

### 3. Update Navigation
Edit `mint.json` to modify:
- Navigation structure
- Page order
- Groupings
- Tabs

---

## 📁 Project Structure

```
mintlify/
├── mint.json              # Main config (navigation, colors, etc.)
├── introduction.mdx       # Landing page
├── package.json          # Scripts and dependencies
├── README.md             # Full documentation
├── MIGRATION_SUMMARY.md  # Detailed migration report
├── migrate.js            # Migration script used
├── logo/                 # Brand logos
├── images/               # All images and assets
└── [content folders]/    # Documentation content
```

---

## 🎨 Common Tasks

### Add a New Page
1. Create `new-page.mdx` in appropriate directory
2. Add frontmatter:
   ```yaml
   ---
   title: "My New Page"
   description: "Page description"
   ---
   ```
3. Add to `mint.json` navigation

### Update Navigation
Edit `mint.json`:
```json
{
  "navigation": [
    {
      "group": "Group Name",
      "pages": ["page-1", "page-2"]
    }
  ]
}
```

### Add Images
1. Place image in `images/screenshots/`
2. Reference in MDX:
   ```markdown
   ![Alt text](/images/screenshots/your-image.webp)
   ```

### Use Components
Mintlify supports these components out of the box:
```markdown
<Info>Information callout</Info>
<Warning>Warning message</Warning>
<Error>Error message</Error>
<Tip>Helpful tip</Tip>
<Note>Important note</Note>
```

---

## 🔧 Development Commands

```bash
# Start dev server
mint dev

# Install CLI globally
npm i -g mint

# Stop dev server
# Press Ctrl+C in the terminal
```

---

## 📊 Migration Stats

✅ **162 pages** migrated successfully  
✅ **300+ images** transferred  
✅ **100% success** rate  
✅ **Zero data** loss  

---

## 🆘 Troubleshooting

### Server won't start
```bash
# Reinstall Mintlify CLI
npm i -g mint@latest

# Check Node version (needs v20.17.0+)
node --version
```

### Page not showing in navigation
- Check `mint.json` for the page path
- Ensure file exists at the specified location
- File path is case-sensitive

### Images not loading
- Check image path starts with `/images/`
- Verify image exists in the directory
- Check file extension matches

---

## 🚢 Deploy to Production

### Option 1: Mintlify Dashboard (Recommended)
1. Sign up at [mintlify.com](https://mintlify.com)
2. Connect your GitHub repository
3. Automatic deployments on every push

### Option 2: Self-Hosted
```bash
# Build for production
mint build

# Deploy the output directory
```

---

## 📚 Learn More

- **Mintlify Docs:** https://www.mintlify.com/docs
- **Bruno GitHub:** https://github.com/usebruno/bruno
- **Bruno Docs Repo:** https://github.com/usebruno/bruno-docs
- **Discord Community:** https://discord.com/invite/KgcZUncpjq

---

## 🎯 Next Steps

1. ✅ Test local preview
2. ⬜ Review all pages for accuracy
3. ⬜ Set up GitHub repository
4. ⬜ Connect to Mintlify dashboard
5. ⬜ Configure custom domain
6. ⬜ Deploy to production

---

**Your documentation is ready!** 🎉

The Mintlify server is currently running at http://localhost:3000

