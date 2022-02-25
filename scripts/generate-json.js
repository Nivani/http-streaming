try {
    const arguments = parseCommandLineArguments(process.argv);
    run(arguments);
} catch (e) {
    console.error(e.message);
}

function run({ numberOfRecords }) {
    const startTime = new Date('2022-01-19T10:39:00Z').getTime();
    const minuteMs = 60 * 1000;

    console.log('[');

    for (let i = 0; i < numberOfRecords; i++) {
        const timestampTime = startTime + i * minuteMs;
        const timestampDate = new Date(timestampTime);
        const measurementRecord = {
            id: i + 1,
            timestamp: timestampDate.toISOString(),
            value: (Math.sin(i / numberOfRecords * 2 * Math.PI) + 1) * 100 + (Math.random() - 0.5) * 25,
        };
        console.log(`  ${JSON.stringify(measurementRecord)}${i < numberOfRecords - 1 ? ',' : ''}`);
    }

    console.log(']');
}

function parseCommandLineArguments(argv) {
    if (argv.length < 3) {
        throw new Error('missing parameter for number of records');
    }

    const numberOfRecords = parseFloat(argv[2]);

    if (isNaN(numberOfRecords)) {
        throw new Error(`invalid number of records '${argv[2]}'`);
    }

    return { numberOfRecords };
}
