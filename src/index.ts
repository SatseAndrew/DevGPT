#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config();
import { Command } from 'commander';
import { generateCommitMessage } from './commands/generateCommitMessage';
import { reviewCodeFile } from './commands/reviewCodeFile';

const program = new Command();

program
    .name('dev-gpt')
    .description('An application that integrates GPT with your development workflow, assisting with Git operations, code review and debugging.')
    .version('0.0.1');

program
    .command('generate git-message')
    .action(generateCommitMessage);

program
    .command('review <filepath>')
    .description('Reviews the code and provides feedback from the specified file')
    .action(async (filepath) => {
        await reviewCodeFile(filepath);
    });


program.parse(process.argv);
