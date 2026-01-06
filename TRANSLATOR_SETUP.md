# Script Translator Component Setup

## ✅ Files Organized (Following Mintlify Best Practices)

According to [Mintlify's documentation](https://www.mintlify.com/docs/create/reusable-snippets#reusable-snippets), all React components must be in the `snippets` directory.

### Components Structure
```
snippets/
├── translator/
│   ├── translator.tsx       # Main component (exported)
│   ├── editor-layout.tsx    # Monaco editors
│   ├── toolbar.tsx          # Controls
│   ├── utils.ts             # Translation logic
│   └── themes.ts            # Theme list
├── ui/                      # shadcn/ui components (16 files)
│   ├── badge.tsx
│   ├── button.tsx
│   ├── dialog.tsx
│   ├── select.tsx
│   └── ... (12 more)
└── lib/
    └── utils.ts             # Utilities
```

### Assets
```
images/
├── bruno.svg
├── postman.svg
└── static/
    └── themes/              # 55 theme JSON files
```

## 📝 Import Path (Mintlify Style)

The script-translator.mdx file imports the component using Mintlify's snippet syntax:

```mdx
---
title: "Scripts Translator"
---

import { Translator } from '/snippets/translator/translator';

Welcome to the **Postman** to **Bruno** scripts translator. 
This is the same function that runs behind the **Import Postman Collection** feature in Bruno.

<Translator />
```

**Important:** 
- ✅ Use `/snippets/` prefix (absolute path from root)
- ✅ Components must use arrow function syntax: `export const Translator = () => { ... }`
- ✅ All components in `snippets/` directory won't render as standalone pages

## 🔧 Changes Made

### 1. Moved to Snippets Directory
All components moved from `components/` to `snippets/` as per Mintlify requirements.

### 2. Updated Import Paths
All internal imports updated to use relative paths within snippets:
- `../ui/dialog` for UI components
- `../lib/utils` for utilities
- `./utils` for local files

### 3. Image Paths
- `/images/postman.svg` and `/images/bruno.svg` for logos
- `/images/static/themes/*.json` for editor themes

### 4. Removed Next.js Dependencies
- No `next/image` - using regular `<img>` tags
- No `next-themes` - simplified theme handling
- Added `typeof window !== 'undefined'` checks for SSR compatibility

## 🚀 Installation & Setup

### 1. Install Dependencies

```bash
cd /Users/ganeshpatil/Desktop/bruno/mintlify
npm install
```

This installs:
- `@monaco-editor/react` - Monaco code editor
- `@radix-ui/*` - UI primitives
- `lucide-react` - Icons
- `sonner` - Toast notifications
- `react-resizable-panels` - Resizable layout
- Other utilities

### 2. Start Dev Server

```bash
npm run dev
```

### 3. View the Translator

Navigate to: `http://localhost:3000/get-started/import-export-data/script-translator`

## ✨ Features

The interactive translator includes:

✅ **Real-time Translation** - Converts Postman scripts to Bruno as you type
✅ **Monaco Editor** - Full-featured code editor with syntax highlighting  
✅ **13 Editor Themes** - Choose from multiple color schemes
✅ **Resizable Panels** - Drag to adjust Postman/Bruno code views
✅ **Layout Modes** - Switch between horizontal and vertical layouts
✅ **Copy to Clipboard** - One-click copy of translated code
✅ **Fullscreen Mode** - Expand to fullscreen for better editing
✅ **Local Storage** - Saves your code between sessions

## 📦 Dependencies in package.json

```json
{
  "dependencies": {
    "@monaco-editor/react": "^4.7.0",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-toggle-group": "^1.1.11",
    "lucide-react": "^0.556.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-resizable-panels": "^3.0.6",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.4.0"
  }
}
```

## 🔧 Troubleshooting

### Component Not Rendering?

1. **Check Import Path** - Must use `/snippets/` prefix
   ```mdx
   import { Translator } from '/snippets/translator/translator';
   ```

2. **Verify Arrow Function** - Component must use arrow syntax
   ```tsx
   export const Translator = () => { ... }  // ✅ Correct
   export function Translator() { ... }      // ❌ Wrong
   ```

3. **Install Dependencies** - Run `npm install`

4. **Restart Dev Server** - Stop and restart `npm run dev`

5. **Check Console** - Look for import errors in browser console

### Common Issues

**Issue:** "Cannot find module '/snippets/translator/translator'"
**Solution:** Ensure the file is in `snippets/` directory, not `components/`

**Issue:** Component renders blank
**Solution:** Check browser console for React errors, ensure all dependencies are installed

**Issue:** Monaco editor not loading
**Solution:** Verify `@monaco-editor/react` is installed and theme JSON files are in `/images/static/themes/`

## 📚 Reference

- [Mintlify Reusable Snippets](https://www.mintlify.com/docs/create/reusable-snippets)
- [Mintlify React Components](https://www.mintlify.com/docs/customize/react)
- [Monaco Editor React](https://github.com/suren-atoyan/monaco-react)
- [shadcn/ui Components](https://ui.shadcn.com/)

## ✅ Verification Checklist

- [x] All components in `snippets/` directory
- [x] Import uses `/snippets/` prefix
- [x] Components use arrow function syntax
- [x] Image paths use `/images/` prefix
- [x] No Next.js specific imports
- [x] SSR-safe (window checks)
- [x] Dependencies added to package.json
- [x] components.json updated with correct aliases
