const { Worker } = require("worker_threads");

let array = [];

performance.mark('simple start');

let count = 0;

for (let i = 0; i < 300_000; i++) {
    array.push(i);
}

for (let i = 0; i < array.length; i++) {
    if (array[i] % 3 === 0) {
        count++;
    }
}

console.log('Result: ', count);

performance.mark('simple end');
performance.measure('simple', 'simple start', 'simple end');

console.log('Result time: ', performance.getEntriesByName('simple').pop().startTime);

const TOTAL = 300_000;
const THREADS = 10;
const PART = TOTAL / THREADS;

performance.mark('work start');

const runWorker = (min, max) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', {
            workerData: {
                min,
                max,
            },
        });

        worker.on('message', (result) => {
            resolve(result);
        });

        worker.on('error', (error) => {
            reject(error);
        });

        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
};

const main = async () => {
    const workers = [];

    for (let i = 0; i < THREADS; i++) {
        const min = i * PART;
        const max = i === THREADS - 1 ? TOTAL : min + PART;

        workers.push(runWorker(min, max));
    }

    const results = await Promise.all(workers);

    const count = results.reduce((sum, item) => {
        return sum + item.count;
    }, 0);

    performance.mark('work end');
    performance.measure('work', 'work start', 'work end');

    const measure = performance.getEntriesByName('work').pop();

    console.log('Result:', count);
    console.log('Result time:', measure.duration);

    performance.clearMarks();
    performance.clearMeasures();
};

main();