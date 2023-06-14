const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function greeting(name) {
    console.log(`Hello, ${name}!`);
    console.log(`The length of your name is: ${name.length}`);
    readline.close();
}

function processUserInput(callback) {
    readline.question(`What's your name? `, callback);
}

// New callback function to console.log the name in uppercase and its length
const uppercaseGreetingAndLength = (name) => {
    console.log(`Hello, ${name.toUpperCase()}!`);
    console.log(`The length of your name is: ${name.length}`);
    readline.close();
};

processUserInput(greeting);
