const parser = require("./parsing");
const solver = require("./solver")
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
    return input.replaceAll(" ", "");
}


async function run() {
    while (1) {
        try {
            let input = await readInput()
            console.log("input: ", input)
            let calculationArray = parser.parseInput(input)
            console.log("calculation Array:" ,calculationArray)
            let result = solver.resolve(calculationArray, true, true)
            console.log("result of operation is:", result)
        } catch (e) {
            console.log('Something went wrong: ', e)
        }
    }
}

run()
