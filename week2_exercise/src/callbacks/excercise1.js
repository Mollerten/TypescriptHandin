function calculate  (x, y, operation) {
return operation(x, y);
}

function add (x, y) {
    return x + y;
}

function subtract (x, y) {
    return x - y;
}

function multiply (x, y) {
    return x * y;
}

function divide (x, y) {
    return x / y;
}

// Test calculator
console.log("5 + 3 = ", calculate(5, 3, add))
console.log("5 - 3 = ", calculate(5, 3, subtract))
console.log("5 * 3 = ", calculate(5, 3, multiply))
console.log("5 / 3 = ", calculate(5, 3, divide))

