const words = require("./database/words.json")

const wordArray = words[0].word
const nameArray = []

for(let i = 0; i < 10; i++) {
    const A = Math.floor(Math.random() * wordArray.length)
    let B

    do {
        B = Math.floor(Math.random() * wordArray.length)
    } while (B === A)

    const name = wordArray[A] + wordArray[B] + (Math.floor(Math.random() * 9999))
    nameArray.push(name)
}

console.log(nameArray)

