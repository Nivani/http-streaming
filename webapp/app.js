import parseJsonStream from './parse-json-stream.js';

const App = {
    data() {
        return {
            streaming: false,
            measurements: [],
        };
    },
    methods: {
        streamHttp11() {
            this.streamFile('http://localhost:3000/measurements.json');
        },
        streamHttp2() {
            this.streamFile('https://localhost:3443/measurements.json');
        },
        streamFile(url) {
            this.measurements = [];
            this.streaming = true;
            fetch(url)
                .then(async (response) => {
                    let numberOfItems = 0;
                    for await (const record of parseJsonStream(response.body)) {
                        numberOfItems++;
                        // The DOM would not like 10k measurements,
                        // so we only show 100 of them
                        if (numberOfItems % 100 === 0) {
                            this.measurements.push({
                                id: record.id,
                                timestamp: new Date(record.timestamp),
                                value: record.value,
                            });
                        }
                    }
                })
                .catch(console.error)
                .finally(() => {
                    this.streaming = false;
                });
        },
    },
};

export default App;
