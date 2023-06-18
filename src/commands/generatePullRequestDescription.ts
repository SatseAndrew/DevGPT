import { getCommitsFromCurrentBranch, getCurrentBranch } from "../git";
import { startChatLoop } from "../gpt";
import { MAX_TOKEN_SIZE } from "../gpt/config/gptConfig";
import { ChatMessage, SimpleIssue } from "../interfaces";
import { fetchJiraIssue } from "../jira";
import { findPullRequestTemplate } from "../utils/findPullRequestTemplate";
import { SystemMessage, readSystemMessage } from "../utils/readSystemMessage";
import { splitMessageIntoChunks } from "../utils/splitMessageIntoChunks";

export async function generatePullRequestDescription() {
    let initialMessage: ChatMessage[] = [];

    // read system message
    const systemMessage = await readSystemMessage(SystemMessage.SoftwareDeveloper);

    initialMessage.push({
        role: "system",
        content: systemMessage
    })

    let message = `
        I want you to generate a pull request description. I will provide you with a pull request template, Jira ticket and git log of all commits.
        I may omit some of this data if it is not available. Once I have provided you with all the available information I will end the message with 'Done!'.
        You will then assess if there is any information missing for you to complete your task. If yes, you will prompt me back and request this information.
        Once you are ready you will start generating the pull request description.\n
    `;

    // read pull request description
    const pullRequestTemplate = await findPullRequestTemplate();

    if (pullRequestTemplate != null) {
        message += `
            Here is the pull request template:
            ${pullRequestTemplate}
        `;
    }

    // fetch jira issue
    const branchName = await getCurrentBranch();
    const match = branchName.match(/(NMA-\d+)/);

    if (match) {
        let ticketIdentifier = match[0];
        const jiraIssue = await fetchJiraIssue(ticketIdentifier);

        message += `
        Here is the jira ticket:

        Title: ${jiraIssue.title}
        Description: ${jiraIssue.description}
        `;
    }
    
    // fetch git log
    const log = await getCommitsFromCurrentBranch();

    message += `Here is the git log:\n`;

    log.forEach((commit) => {
        message += `
            Title: ${commit.subject},
            Body: ${commit.body},
            Diff: ${commit.diff}
        `;
    })

    message += 'Done!'

    // split message into smaller chunks that ChatGPT can handle
    const chunks = splitMessageIntoChunks(message, MAX_TOKEN_SIZE);

    chunks.forEach((chunk) => {
        initialMessage.push({
            role: 'user',
            content: chunk
        })
    })

    await startChatLoop(initialMessage);
}