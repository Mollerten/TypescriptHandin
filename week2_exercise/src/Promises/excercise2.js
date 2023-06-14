async function calculate(x, y, operation) {
    try {
        const result = await operation(x, y);
        return result;
    } catch (error) {
        throw error;
    }
}

async function add(x, y) {
    return x + y;
}

async function subtract(x, y) {
    return x - y;
}

async function multiply(x, y) {
    return x * y;
}

async function divide(x, y) {
    if (y === 0) {
        throw new Error("Divide by zero error");
    }
    return x / y;
}

// Usage with async/await syntax
async function performCalculations() {
    try {

        const result1 = await calculate(5, 3, add);
        console.log("5 + 3 =", result1);

        const result2 = await calculate(result1, 2, multiply);
        console.log("8 * 2 =", result2);

        const result3 = await calculate(result2, 4, divide);
        console.log("16 / 4 =", result3);

        const result4 = await calculate(result3, 2, subtract);
        console.log("14 - 2 =", result4);
        console.log("Done!");
    } catch (error) {
        console.error("Error:", error.message);
    }
}


async function performChainedCalculations() {
    try {

        const initialValue = 2;
        let result = initialValue;

        result = await calculate(result, 5, add);
        console.log(`${initialValue} + 5 = ${result}`);

        result = await calculate(result, 3, subtract);
        console.log(`${result} - 3 = ${result}`);

        result = await calculate(result, 2, multiply);
        console.log(`${result} * 2 = ${result}`);

        result = await calculate(result, 4, divide);
        console.log(`${result} / 4 = ${result}`);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

console.log("---------- Using async/await ----------");
performCalculations();

// console.log("---------- Using chained async/await ----------");
// performChainedCalculations();