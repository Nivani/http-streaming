import parseCsv from './parse-csv.js';

const App = {
    data() {
        return {
            streaming: false,
            measurements: [],
        };
    },
    methods: {
        streamFile() {
            this.measurements = [];
            this.streaming = true;
            const response = fetch('https://localhost:3443/big.csv')
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
