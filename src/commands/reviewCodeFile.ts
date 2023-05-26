import fs from 'fs/promises';
import path from 'path';
import { SystemMessage, readSystemMessage } from '../utils/readSystemMessage';
import { ChatMessage } from '../interfaces';
import { startChatLoop } from '../gpt';

export async function reviewCodeFile(filepath: string) {
    const cwd = process.cwd();
    const fullpath = path.resolve(cwd, filepath);

    try {
        fs.access(fullpath);
    } catch {
        console.error(`File does not exist: ${fullpath}`);
        return;
    }

    let code: string;

    try {
        code = await fs.readFile(fullpath, 'utf-8');
    } catch(error) {
        console.error(`Readings contents from file failed with error: ${error}`)
        return;
    }

    let systemMessage: string;

    try {
        systemMessage = await readSystemMessage(SystemMessage.SoftwareDeveloper);
    } catch(error) {
        console.error('Failed to read system message.', error);
        return;
    }

    let initialMessages: ChatMessage[] = [
        {
            "role": "system",
            "content": systemMessage
        },
        {
            "role": "user",
            "content": `Please review this code and give me feedback:\n${code}`
        }
    ];

    await startChatLoop(initialMessages);
}
