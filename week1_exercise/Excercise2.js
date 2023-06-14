function add(x, y) {
    return x + y;
}

function multiply(x, y) {
    return x * y;
}

function operateOnNumbers(operator, x, y) {
    return operator(x, y);
}

console.log(operateOnNumbers(add, 3, 4));   // 7
console.log(operateOnNumbers(multiply, 3, 4));   // 12

// New lambda function to subtract the numbers
const subtract = (x, y) => {
    return x - y;
};

console.log(operateOnNumbers(subtract, 3, 4));   // -1


function applyFunctionsToNumbers(func1, func2, numbers) {
    const result = [];

    for (let i = 0; i < numbers.length; i++) {
        const number = numbers[i];
        const intermediateResult = func1(number);
        const finalResult = func2(intermediateResult);
        result.push(finalResult);
    }

    return result;
}

// Example functions: square and divide by 10
const square = (x) => x ** 2;
const divideBy10 = (x) => x / 10;

// Example array of numbers
const numbers = [1, 2, 3, 4, 5];

// Apply the functions to the numbers array
const result = applyFunctionsToNumbers(square, divideBy10, numbers);

console.log(result);
