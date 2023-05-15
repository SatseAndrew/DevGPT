import axios from 'axios';
import { OPENAI_API_URL, OPENAI_API_KEY, MODEL, TEMPERATURE } from './config/gptConfig';
import { processData, handleStreamEnd } from './utils/streamUtils';
import { ChatMessage } from '../interfaces';

export async function* completeChat(messages: ChatMessage[]) {
    if (!Array.isArray(messages) || messages.length === 0) {
        throw new Error('The messages parameter must be a non-empty array');
    }

    let response;

    try {
        response = await axios.post(
            OPENAI_API_URL,
            {
                model: MODEL,
                messages: messages,
                temperature: TEMPERATURE,
                stream: true
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                },
                responseType: 'stream'
            }
        );
    } catch (err) {
        console.error(`Error sending request: ${err}`);
        throw err;
    }

    let bufferedData = '';
    const stream = response.data;

    for await (const chunk of stream) {
        bufferedData += chunk.toString();
        bufferedData = yield* processData(bufferedData);
    }

    yield* handleStreamEnd(bufferedData);
}
