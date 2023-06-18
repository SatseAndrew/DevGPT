#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config();
import { Command } from 'commander';
import { generateCommitMessage } from './commands/generateCommitMessage';
import { reviewCodeFile } from './commands/reviewCodeFile';
import { generatePullRequestDescription } from './commands/generatePullRequestDescription';
import { fetchJiraIssue } from './jira';

const program = new Command();

program
    .name('dev-gpt')
    .description('An application that integrates GPT with your development workflow, assisting with Git operations, code review and debugging.')
    .version('0.0.1');

program
    .command('write git message')
    .action(generateCommitMessage);

program
    .command('write pr description')
    .action(generatePullRequestDescription);

program
    .command('review <filepath>')
    .description('Reviews the code and provides feedback from the specified file')
    .action(reviewCodeFile);

program.parse(process.argv);
