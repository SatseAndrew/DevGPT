import dotenv from 'dotenv';
dotenv.config();
import { Command } from 'commander';
import { generateCommitMessage } from './commands/generateCommitMessage';

const program = new Command();

program
    .name('dev-gpt')
    .description('An application that integrates GPT with your development workflow, assisting with Git operations, code review and debugging.')
    .version('0.0.1');

program
    .command('generate <type>')
    .action(async (type: string) => {
        if (type === 'git-message') {
            await generateCommitMessage();
        }
    });

program.parse(process.argv);
