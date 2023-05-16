import { promises as fs } from 'fs';
import path from 'path';

export enum SystemMessage {
    GitAssistant = "gitAssistant"
}

export async function readSystemMessage(systemMessage: SystemMessage) {
    const filepath = path.resolve(__dirname, `../system-messages/${systemMessage}.txt`);
    return await fs.readFile(filepath, 'utf-8');
}