import parseCsv from './parse-csv.js';

const App = {
    data() {
        return {
            streaming: false,
            measurements: [],
        };
    },
    methods: {
        streamHttp11() {
            this.streamFile('http://localhost:3000/big.csv');
        },
        streamHttp2() {
            this.streamFile('https://localhost:3443/big.csv');
        },
        streamFile(url) {
            this.measurements = [];
            this.streaming = true;
            fetch(url)
                .then(async (response) => {
                    let numberOfLines = 0;
                    for await (const record of parseCsv(response.body)) {
                        numberOfLines++;
                        if (numberOfLines % 1000 === 0) {
                            this.measurements.push({
                                id: record.id,
                                timestamp: new Date(record.timestamp),
                                value: parseFloat(record.value),
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
