if (!process.env['OPENAI_API_KEY']) {
    throw new Error(`OPENAI_API_KEY is not defined in your environment variables`);
}

export const OPENAI_API_KEY = process.env['OPENAI_API_KEY'];
export const MODEL = 'gpt-3.5-turbo';
export const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
export const TEMPERATURE = 0.7;
export const MAX_TOKEN_SIZE = 15000;
