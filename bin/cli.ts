#!/usr/bin/env bun

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function init() {
  const projectName = process.argv[2];
  
  if (!projectName) {
    console.error('\x1b[31m%s\x1b[0m', 'Please specify the project directory:');
    console.log('  create-rac-app \x1b[36m<project-directory>\x1b[0m\n');
    process.exit(1);
  }

  const targetDir = path.join(process.cwd(), projectName);
  const templateDir = path.resolve(__dirname, '../template');

  console.log(`\nCreating a new ultra-lightweight desktop app in \x1b[36m${targetDir}\x1b[0m...\n`);

  await fs.ensureDir(targetDir);
  await fs.copy(templateDir, targetDir);

  console.log('Installing frontend dependencies...');
  try {
    execSync(`cd ${path.join(targetDir, 'frontend')} && bun install`, { stdio: 'inherit' });
    console.log('\n\x1b[32m%s\x1b[0m', ' Setup complete successfully!');
    console.log('\nTo get started, run:');
    console.log(`  cd ${projectName}`);
    console.log(`  chmod +x build.sh`);
    console.log(`  ./build.sh\n`);
  } catch (err) {
    console.error('\x1b[31m%s\x1b[0m', 'Failed to install dependencies, you can run "bun install" manually.');
  }
}

init();