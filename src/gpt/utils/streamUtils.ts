import { DATA_PREFIX, NEWLINE, DONE } from '../config/streamConfig';

export async function* processData(bufferedData: string) {
    let newlineIndex: number;
    while ((newlineIndex = bufferedData.indexOf(NEWLINE)) !== -1) {
        const strData = bufferedData.substring(0, newlineIndex);
        const content = parseAndYieldContent(strData);
        if (content) {
            yield content;
        }
        bufferedData = bufferedData.slice(newlineIndex + 1);
    }
    return bufferedData;
}

export async function* handleStreamEnd(bufferedData: string) {
    const content = parseAndYieldContent(bufferedData);
    if (content) {
        yield content;
    }
}

function parseJson(jsonString: string) {
    try {
        return JSON.parse(jsonString);
    } catch (err) {
        console.error(`Error parsing JSON: ${jsonString}. Error: ${err}`);
        return null;
    }
}

function parseAndYieldContent(data: string) {
    if (data.startsWith(DATA_PREFIX) && !data.includes(DONE)) {
        const jsonString = data.slice(DATA_PREFIX.length).trim();
        const jsonData = parseJson(jsonString);
        if (jsonData && jsonData.choices?.[0]?.delta?.content) {
            return jsonData.choices[0].delta.content;
        }
    }
    return null;
}
