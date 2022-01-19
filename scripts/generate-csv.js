try {
    const commandLineArguments = parseCommandLineArguments(process.argv);
    run(commandLineArguments);
} catch (e) {
    console.error(e.message);
}

function run({ numberOfRecords }) {
    const startTime = new Date('2022-01-19T10:39:00Z').getTime();
    const minuteMs = 60 * 1000;

    console.log('id;timestamp;value');

    for (var i = 0; i < numberOfRecords; i++) {
        const timestampTime = startTime + i * minuteMs;
        const timestampDate = new Date(timestampTime);
        const value = Math.round(Math.random() * 100000) / 100;
        console.log(`${i + 1};${timestampDate.toISOString()};${value}`);
    }
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
