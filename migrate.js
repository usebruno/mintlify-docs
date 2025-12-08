#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../bruno-docs/src/pages');
const targetDir = __dirname;

// Mapping of file names to titles (extracted from _meta.js files)
const titleMappings = {
  'what-is-bruno': 'What is Bruno?',
  'manifesto': 'Manifesto',
  'feedback-community': 'Feedback & Community',
  'download': 'Download',
  'create-a-collection': 'Create a Collection',
  'create-a-folder': 'Create a Folder',
  'create-a-request': 'Create a Request',
  'create-a-test': 'Create a Test',
  'run-a-collection': 'Run a Collection',
  'settings': 'Settings',
  'proxy-config': 'Proxy Configuration',
  'history': 'History',
  'import-collections': 'Import Collections',
  'export-collections': 'Export Collections',
  'import-export-environments': 'Import & Export Environments',
  'postman-migration': 'Postman Migration',
  'script-translator': 'Script Translator',
  'javascript-sandbox': 'JavaScript Sandbox',
  'overview': 'Overview',
  'activate-license': 'Activate License',
  'license-portal': 'License Portal',
  'license-overview': 'License Overview'
};

// Function to extract title from first heading or use mapping
function extractTitle(content, fileName) {
  const match = content.match(/^#\s+(.+)$/m);
  if (match) {
    return match[1];
  }
  return titleMappings[fileName] || fileName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// Function to convert Nextra Callout to Mintlify format
function convertCallouts(content) {
  // Convert Callout imports
  content = content.replace(/import\s+{\s*Callout\s*}\s+from\s+['"]nextra\/components['"];?\s*\n?/g, '');
  
  // Convert Callout components
  // Match: <Callout type="info">...</Callout>
  content = content.replace(/<Callout\s+type="info">([\s\S]*?)<\/Callout>/g, '<Info>$1</Info>');
  content = content.replace(/<Callout\s+type="warning">([\s\S]*?)<\/Callout>/g, '<Warning>$1</Warning>');
  content = content.replace(/<Callout\s+type="error">([\s\S]*?)<\/Callout>/g, '<Error>$1</Error>');
  content = content.replace(/<Callout\s+type="tip">([\s\S]*?)<\/Callout>/g, '<Tip>$1</Tip>');
  content = content.replace(/<Callout\s+type="important">([\s\S]*?)<\/Callout>/g, '<Note>$1</Note>');
  content = content.replace(/<Callout>([\s\S]*?)<\/Callout>/g, '<Note>$1</Note>');
  
  return content;
}

// Function to convert Nextra Tabs to Mintlify format
function convertTabs(content) {
  // Remove Tabs imports
  content = content.replace(/import\s+{\s*Tabs?,?\s*Tab\s*}\s+from\s+['"]nextra\/components['"];?\s*\n?/g, '');
  
  // Convert basic Tabs structure
  content = content.replace(/<Tabs\s+items={([^}]+)}>/g, '<Tabs>');
  content = content.replace(/<Tab>([\s\S]*?)<\/Tab>/g, '<Tab title="$1">$1</Tab>');
  
  return content;
}

// Function to adjust image paths
function adjustImagePaths(content) {
  // Change /screenshots/ to /images/screenshots/
  content = content.replace(/\!\[([^\]]*)\]\(\/screenshots\//g, '![$1](/images/screenshots/');
  content = content.replace(/\!\[([^\]]*)\]\(\/files\//g, '![$1](/images/files/');
  content = content.replace(/\!\[([^\]]*)\]\(\/static\//g, '![$1](/images/static/');
  
  // Change src="/screenshots/ to src="/images/screenshots/
  content = content.replace(/src="\/screenshots\//g, 'src="/images/screenshots/');
  content = content.replace(/src="\/files\//g, 'src="/images/files/');
  
  return content;
}

// Function to remove custom imports
function removeCustomImports(content) {
  // Remove custom component imports that don't exist in Mintlify
  content = content.replace(/import\s+{\s*[^}]+\s*}\s+from\s+['"]@\/components\/[^'"]+['"];?\s*\n?/g, '');
  content = content.replace(/import\s+{\s*Video\s*}\s+from\s+[^;]+;?\s*\n?/g, '');
  content = content.replace(/import\s+{\s*PromptVar\s*}\s+from\s+[^;]+;?\s*\n?/g, '');
  
  // Remove custom components (replace with simple code)
  content = content.replace(/<PromptVar>([^<]+)<\/PromptVar>/g, '`{{?$1}}`');
  content = content.replace(/<Video[^>]*>[\s\S]*?<\/Video>/g, '');
  
  return content;
}

// Function to add frontmatter if missing
function ensureFrontmatter(content, fileName, filePath) {
  if (!content.startsWith('---')) {
    const title = extractTitle(content, fileName);
    const frontmatter = `---\ntitle: "${title}"\n---\n\n`;
    return frontmatter + content;
  }
  return content;
}

// Function to process a single MDX file
function processFile(sourceFile, targetFile) {
  try {
    let content = fs.readFileSync(sourceFile, 'utf-8');
    const fileName = path.basename(sourceFile, '.mdx');
    const filePath = path.relative(sourceDir, sourceFile);
    
    // Apply conversions
    content = convertCallouts(content);
    content = convertTabs(content);
    content = adjustImagePaths(content);
    content = removeCustomImports(content);
    content = ensureFrontmatter(content, fileName, filePath);
    
    // Ensure target directory exists
    const targetDirPath = path.dirname(targetFile);
    if (!fs.existsSync(targetDirPath)) {
      fs.mkdirSync(targetDirPath, { recursive: true });
    }
    
    fs.writeFileSync(targetFile, content, 'utf-8');
    console.log(`✓ Migrated: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`✗ Error migrating ${sourceFile}:`, error.message);
    return false;
  }
}

// Function to recursively process directory
function processDirectory(sourceDir, targetDir, relativePath = '') {
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
  let successCount = 0;
  let failCount = 0;
  
  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    
    // Skip _meta.js, _app.tsx, and other non-MDX files
    if (entry.name.startsWith('_') || entry.name.startsWith('.')) {
      continue;
    }
    
    if (entry.isDirectory()) {
      const newRelativePath = path.join(relativePath, entry.name);
      const stats = processDirectory(sourcePath, targetDir, newRelativePath);
      successCount += stats.success;
      failCount += stats.fail;
    } else if (entry.name.endsWith('.mdx')) {
      const targetPath = path.join(targetDir, relativePath, entry.name);
      if (processFile(sourcePath, targetPath)) {
        successCount++;
      } else {
        failCount++;
      }
    }
  }
  
  return { success: successCount, fail: failCount };
}

// Main execution
console.log('Starting migration from Nextra to Mintlify...\n');
console.log(`Source: ${sourceDir}`);
console.log(`Target: ${targetDir}\n`);

const stats = processDirectory(sourceDir, targetDir);

console.log(`\n✅ Migration complete!`);
console.log(`   Successful: ${stats.success}`);
console.log(`   Failed: ${stats.fail}`);
console.log(`   Total: ${stats.success + stats.fail}`);

