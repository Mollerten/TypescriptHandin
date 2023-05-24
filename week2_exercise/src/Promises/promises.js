const add = (x, y) => x + y

const subtract = (x, y) => x - y

const multiply = (x, y) => x * y

const divide = (x, y) => {
    if (y === 0) throw new Error('Cannot divide by zero');
    return x / y
}


const calculatePro = (x, y, operation) => {
    return new Promise((resolve, reject) => {
        try {
            const result = operation(x, y);
            resolve(result);
        } catch (err) {
            reject('Illegal operation')
        }
    });
};

// i am confusion.. Forsæt ved Class exerise 2.d
calculatePro(10, 2, divide)
    .then(result => console.log('10 / 2 = ', result))
    .then(result => calculatePro(result, 10, multiply))
    .then(result => console.log(result))
    .catch(err => console.log(err))
