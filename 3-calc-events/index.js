const { EventEmitter } = require('events');;

const firstNum = process.argv[2];
const secondNum = process.argv[3];

const operation = process.argv[4];

const myEmitter = new EventEmitter();

myEmitter.on('add', (a, b) => {
    const result = a + b;

    myEmitter.emit('result', a, b, '+', result);
});

myEmitter.on('subtraction', (a, b) => {
    const result = a - b;

    myEmitter.emit('result', a, b, '-', result);
});

myEmitter.on('multiply', (a, b) => {
    const result = a * b;

    myEmitter.emit('result', a, b, '*', result);
});

myEmitter.on('division', (a, b) => {
    const result = a / b;

    myEmitter.emit('result', a, b, '/', result);
});

myEmitter.on('result', (a, b, operation, result) => {
    console.log(`Результат: ${a} ${operation} ${b} = ${result}`);
})

switch (operation) {
    case 'add':
        myEmitter.emit('add', +firstNum, +secondNum);
        break;
    case 'subtraction':
        myEmitter.emit('subtraction', firstNum, secondNum);
        break;
    case 'multiply':
        myEmitter.emit('multiply', firstNum, secondNum);
        break;
    case 'division':
        myEmitter.emit('division', firstNum, secondNum);
        break;
    default:
        console.log('Некорректный оператор! Указывайте оперратор из списка: "add", "subtraction", "multiply", "division"');
}
