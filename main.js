const parser = require("./parser");
const solver = require("./solver")
const reader = require("./reader")

async function run() {

    while (1) {
        try {
            let input = await reader.readInput()
            let calculationArray = parser.parseInput(input)
            let result = solver.solve(calculationArray, true, true)
            console.log(result)
        } catch (e) {
            console.log('Something went wrong: ', e)
        }
    }
}

run()