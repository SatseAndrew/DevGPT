import { Command } from 'commander';

const program = new Command();

program
    .name('dev-gpt')
    .description('An application that integrates GPT with your development workflow, assisting with Git operations, code review and debugging.')
    .version('0.0.1');

program.parse(process.argv);