const parser = require("./parser");
const solver = require("./solver")

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});


async function run() {
    console.log("Write an operation")
    readline.on('line', (input) => {
        try {
            let calculationArray = parser.parseInput(input)
            let result = solver.solve(calculationArray, true, true)
            console.log(result)
        } catch (e) {
            console.log('Something went wrong: ', e)
        }
      }); 
}

run()

module.exports = { run }