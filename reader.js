const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});


// function taking input and removing any spaces from it
async function readInput() {
    let input = await new Promise(userInput => {
        readline.question("Write an operation:", userInput)
        return userInput
    })
    return input
}

module.exports = { readInput}