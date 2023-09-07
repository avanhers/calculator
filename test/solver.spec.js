const assert = require('assert');
const utils = require("./test.utils")
const solver = require("../solver")


console.log("-----Testing Solver:-----")

// each test case is of form [calculationArray, expectedResult]
TestCases = [
    [[2,'+',5],7],
    [[5,'*','(',2,'+',5,')'],35],
    [[1.5,'*','(','(',-3,'+',-5,')','*','(',2,'-',3,')',')'],12],


]
TestCases.forEach(element =>
    utils.it(`solve([${element[0]}],1,1) \
, should return ${element[1]}}`, () => {
        assert.equal
            (solver.solve(element[0],1,1),
                element[1]);
    }));