const { parentPort, workerData } = require('worker_threads');

const { min, max } = workerData;

const array = [];
let count = 0;

for (let i = min; i < max; i++) {
    array.push(i);
}

for (let i = 0; i < array.length; i++) {
    if (array[i] % 3 === 0) {
        count++;
    }
}

parentPort.postMessage({
    count,
});