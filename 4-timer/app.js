const hoursStr = process.argv[2];
const minutesStr = process.argv[3];
const secondsStr = process.argv[4];

const hours = +hoursStr.replace(/[^0-9]/g, '');
const minutes = +minutesStr.replace(/[^0-9]/g, '');
const seconds = +secondsStr.replace(/[^0-9]/g, '');

const ms = 1000 * (seconds + 60 * (minutes + hours * 60));

setTimeout(() => {
    console.log('ALARM!!!!');
}, ms);
