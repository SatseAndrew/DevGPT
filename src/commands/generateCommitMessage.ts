import { getStagedChanges  } from "../git";
import fs from 'fs';
import { SystemMessage, readSystemMessage } from "../utils/readSystemMessage";
import { ChatMessage } from "../interfaces";
import { startChatLoop } from "../gpt";

export async function generateCommitMessage() {
    const stagedChanges = await getStagedChanges();

    if (!stagedChanges) {
        console.log('No changes staged for commit.');
        return;
    }

    let systemMessage: string;
    try {
        systemMessage = await readSystemMessage(SystemMessage.SoftwareDeveloper);
    } catch (error) {
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
            "content": `Please write a git commit message based on the following changes:\n${stagedChanges}`
        }
    ];

    await startChatLoop(initialMessages);
}
