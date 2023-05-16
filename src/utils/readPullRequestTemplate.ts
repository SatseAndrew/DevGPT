import fs from 'fs/promises';
import path from 'path';

async function findPullRequestTemplate(): Promise<string> {
    let currentDir = process.cwd();
  
    while (currentDir !== '/') {
      const githubDir = path.join(currentDir, '.github');
      const prTemplatePath = path.join(githubDir, 'pull_request_template.md');

      try {
        await fs.access(githubDir);
      } catch {
        currentDir = path.dirname(currentDir);
        continue;
      }
  
      try {
        return await fs.readFile(prTemplatePath, 'utf-8');
      } catch {
        return null;
      } 
    }
  
    return null;
}