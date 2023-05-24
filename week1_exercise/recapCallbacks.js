//
//
 const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//
// const map = (arr, mapFunc) => {
//
//     const mapArr = [];
//
//     for (let i = 0; i < arr.length; i++) {
//         const result = mapFunc(arr[i], i);
//         mapArr.push(result);
//     }
//     return mapArr;
// }
//
// const square = map(numbers, (num) => num**2);
// console.log("squared numbers")
// console.log(square)
// console.log("***************")
//
// const evenNumbers = numbers.filter( x => x % 2 == 0)
// console.log("even numbers")
// console.log(evenNumbers);
// console.log("***************")
//
// const unEvenNumbers = numbers.filter(x => x % 2 - 1 == 0)
// console.log("uneven numbers");
// console.log(unEvenNumbers);
// console.log("**************")




// const reduce = (arr, reduceFunc, initValue) => {
//     let sum = initValue;
//     for (let i = 0; i < arr.length; i++) {
//         sum = reduceFunc(sum, arr[i])
//     }
//     return sum;
// }
//
// const sum = reduce(numbers, (sum, num) => sum + num, 0);
// console.log(sum)
//
//
// const multiply = reduce(numbers, (sum, num) => sum * num, 1)
// console.log(multiply)
//





// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
//
// function greeting(name) {
//     console.log(`Hello, ${name}!`);
//     readline.close();
// }
//
// function properGreeting(name) {
//     const firstLetter = name.charAt(0).toUpperCase()
//     const properName = firstLetter + name.slice(1);
//     console.log(`Hello, ${properName}`)
//     readline.close();
// }
//
// function processUserInput(callback) {
//     readline.question(`What's your name? `, callback);
// }
//
// //processUserInput(properGreeting);
//
// processUserInput((name) => {
//     console.log(`Hello, ${name.charAt(0).toUpperCase()}${name.slice(1)}`);
//     console.log(`You name has ${name.length} characters in it.`)
//     readline.close()
// })






//
// function add(x, y) {
//     return x + y;
// }
//
// function multiply(x, y) {
//     return x * y;
// }
//
// function divideByTen(num) {return num / 10}
//
// function liftNum(num) {return num **2}
//
// function operateOnNumbers(operator, x, y) {
//     return operator(x, y);
// }
//
// function operateTwiceOnArray(operatorOne, operatorTwo, arr) {
//     resultArr = []
//   for (let i = 0; i < arr.length; i++) {
//     const result1 = operatorOne(arr[i]);
//     const result2 = operatorTwo(result1);
//     resultArr.push(result2)
//     console.log("for each:");
//     console.log(resultArr);
//   }
//   return resultArr
// }
//
// // console.log(operateOnNumbers(add, 3, 4));   // 7
// // console.log(operateOnNumbers(multiply, 3, 4));   // 12
// // console.log(operateOnNumbers((x, y) => x - y, 5, 2));
//
// console.log(operateTwiceOnArray(liftNum, divideByTen, numbers));




function doSomething(callback) {
  console.log("Doing something");
  callback();
}

doSomething(() => {
  console.log("Callback called");
});
