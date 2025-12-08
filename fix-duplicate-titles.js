#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const targetDir = __dirname;

// Function to process a single MDX file
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;
    
    // Check if file has frontmatter
    if (!content.startsWith('---')) {
      return false;
    }
    
    // Split content into frontmatter and body
    const parts = content.split('---');
    if (parts.length < 3) {
      return false;
    }
    
    const frontmatter = parts[1];
    const body = parts.slice(2).join('---');
    
    // Check if frontmatter has a title
    const titleMatch = frontmatter.match(/title:\s*["'](.+?)["']/);
    if (!titleMatch) {
      return false;
    }
    
    // Remove the first H1 heading from body if it exists
    // This handles various H1 formats: # Title, # Title \n, etc.
    const h1Pattern = /^#\s+[^\n]+\s*\n*/m;
    if (h1Pattern.test(body)) {
      const newBody = body.replace(h1Pattern, '');
      const newContent = `---${frontmatter}---${newBody}`;
      fs.writeFileSync(filePath, newContent, 'utf-8');
      console.log(`✓ Fixed: ${path.relative(targetDir, filePath)}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Function to recursively process directory
function processDirectory(dir) {
  let count = 0;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    // Skip node_modules, .git, etc.
    if (entry.name.startsWith('.') || entry.name === 'node_modules') {
      continue;
    }
    
    if (entry.isDirectory()) {
      count += processDirectory(fullPath);
    } else if (entry.name.endsWith('.mdx')) {
      if (processFile(fullPath)) {
        count++;
      }
    }
  }
  
  return count;
}

// Main execution
console.log('Fixing duplicate titles in MDX files...\n');
const fixedCount = processDirectory(targetDir);
console.log(`\n✅ Fixed ${fixedCount} files`);

