import { ChatMessage } from '../interfaces';
import { completeChat } from './completeChat';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export async function startChatLoop(initialMessages?: ChatMessage[]) {
  let messages = initialMessages ?? [];

  console.log('initial messages');
  console.log(messages);

  messages = await sendMessages(messages);

  while (true) {
    const userInput = await new Promise<string>(resolve => rl.question('You: ', resolve));
    
    // Exit chat loop if user types 'exit'
    if (userInput.toLowerCase() === 'exit') {
      console.log('Exiting chat...');
      break;
    }

    messages.push({ role: 'user', content: userInput });

    messages = await sendMessages(messages);
  }

  rl.close();
}

async function sendMessages(messages: ChatMessage[]): Promise<ChatMessage[]> {
  let bufferedResponse = '';
  const chatGenerator = completeChat(messages);
  
  process.stdout.write('AI: ');
  for await (const token of chatGenerator) {
    bufferedResponse += token;
    process.stdout.write(token);
  }
  console.log(); // Add a newline after the AI's response

  messages.push({
    role: 'assistant',
    content: bufferedResponse
  });

  return messages;
}