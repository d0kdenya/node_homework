const  { add } = require('./add.js');
const  { subtraction } = require('./subtraction.js');
const  { multiply } = require('./multiply.js');
const  { division } = require('./division.js');

const firstNum = process.argv[2];
const secondNum = process.argv[3];

const operation = process.argv[4];

switch (operation) {
    case 'add':
        console.log(`Результат: ${firstNum} + ${secondNum} = ${add(+firstNum, +secondNum)}`);
        break;
    case 'subtraction':
        console.log(`Результат: ${firstNum} - ${secondNum} = ${subtraction(firstNum, secondNum)}`);
        break;
    case 'multiply':
        console.log(`Результат: ${firstNum} * ${secondNum} = ${multiply(firstNum, secondNum)}`);
        break;
    case 'division':
        console.log(`Результат: ${firstNum} / ${secondNum} = ${division(firstNum, secondNum)}`);
        break;
    default:
        console.log('Некорректный оператор! Указывайте оперратор из списка: "add", "subtraction", "multiply", "division"');
}
