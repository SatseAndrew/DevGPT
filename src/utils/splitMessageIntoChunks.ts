export function splitMessageIntoChunks(message: string, maxChunkSize: number): string[] {
    let chunks: string[] = [];

    for (let i = 0; i < message.length; i += maxChunkSize) {
        chunks.push(message.slice(i, i + maxChunkSize));
    }

    return chunks;
}