const superagent = require ('superagent');
const fs = require('fs')

// CALLBACK-HELL
//
// fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
//     superagent
//         .get(`https://dog.ceo/api/breed/${data.trim()}/images/random`)
//         .then(res => {
//             console.log(res.body.message);
//             fs.writeFile('dog.img.txt', res.body.message, err => {
//             if (err) return consolge.log(err);
//                 console.log('Dog img saved to file succesfully');
//             });
//         })
//         .catch(err => console.log(err.message));
// });

// PROMISES
const readFilePro = file => {
    // executor function
    return new Promise( (resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) reject ("File not found");
            resolve(data);
        })
    })
}

const writeFilePro = data => {
    return new Promise((resolve, reject) => {
        fs.writeFile('dog.img.txt', data, err => {
            if (err) reject('File not found');
            resolve("Dog image saved to file succesfully0");
        });
    });
};
//
// readFilePro(`${__dirname}/dog.txt`)
//     .then(data => superagent
//         .get(`https://dog.ceo/api/breed/${data.trim()}/images/random`)
//         .then(res => writeFilePro(res.body.message))
//         .then(res => console.log(res))
//         .catch(err => console.log(err))
//         .finally(() => console.log("I am done!!")),
//         );

// ASYNC / AWAIT
//
// const getDogPics = async () => {
//     try {
//         const data = await readFilePro(`${__dirname}/dog.txt`)
//         const res = await superagent.get(`https://dog.ceo/api/breed/${data.trim()}/images/random`);
//         const text = await writeFilePro(res.body.message);
//         return text;
//     } catch (e) {
//         throw new Error(e.message)
//         console.log(e);
//     }
// }
//
// // IIFE Immediately Invoked Function Expressions
// console.log('1: Will get dog pics!');
// (async () => {
//     try {
//         const data = await getDogPics();
//         console.log("2: ", data)
//     } catch (e) {
//         console.log(e);
//     }
// })();
// console.log('3: Done getting dog pics')

// Waiting for multiple promises

const getDogPics = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`)
        const res1 = await superagent.get(`https://dog.ceo/api/breed/${data.trim()}/images/random`);
        const res2 = await superagent.get(`https://dog.ceo/api/breed/${data.trim()}/images/random`);
        const res3 = await superagent.get(`https://dog.ceo/api/breed/${data.trim()}/images/random`);

        const all = await Promise.all([res1, res2, res3]);
        const images = all.map ( el => el.body.message);
        console.log(images)

        const text = await writeFilePro(images.join('\n'));
        console.log(text);
    } catch (e) {
        throw new Error(e.message)
    }
}

getDogPics()