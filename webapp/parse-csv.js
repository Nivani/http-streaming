export default async function *parseCsv(readableStream) {
    let headers = undefined;
    for await (const line of readLines(readableStream.getReader())) {
        const splitResult = line.split(';').map(header => header.trim());

        if (!headers) {
            headers = splitResult
        } else {
            const obj = {};
            for (let i=0; i < splitResult.length; i++) {
                obj[headers[i]] = splitResult[i];
            }
            yield obj;
        }
    }
}

async function *readLines(reader) {
    const textDecoder = new TextDecoder();
    let partOfLine = '';
    for await (const chunk of readChunks(reader)) {
        const chunkText = textDecoder.decode(chunk);
        const chunkLines = chunkText.split('\n');
        if (chunkLines.length > 0) {
            if (chunkLines.length === 1) {
                partOfLine += chunkLines[0];
            } else {
                yield partOfLine + chunkLines[0];
                for (let i=1; i < chunkLines.length - 1; i++) {
                    yield chunkLines[i];
                }
                partOfLine = chunkLines[chunkLines.length - 1];
            }
        }
    }
}

function readChunks(reader) {
    return {
        async* [Symbol.asyncIterator]() {
            let readResult = await reader.read();
            while (!readResult.done) {
                yield readResult.value;
                readResult = await reader.read();
            }
        },
    };
}
