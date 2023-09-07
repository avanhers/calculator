const parser = require("../parser");
const assert = require('assert');
const utils = require("./test.utils")

console.log("-----Testing Parser:-----")
console.log("  ---Testing isDigit:---")
// each test case is of form [strArg, indexArg, valueRes, indexAfterRes ]
TestCases = [
    ["0",true],
    ["1", true],
    ["9", true],
    ["c",false],
    ["+",false],
]
TestCases.forEach(element =>
    utils.it(`isDigit(${element[0]}) \
, should return ${element[1]}}`, () => {
        assert.equal
            (parser.isDigit(element[0]),
                element[1]);
    }));



console.log("  ---Testing atoI:---")
// each test case is of form [strArg, indexArg, valueRes, indexAfterRes ]
TestCases = [
    ["+21", 0, 21, 3],
    ["-21678", 0, -21678, 6],
    ["---+-25", 0, 25, 7],
    ["5+(-+4575)", 3, -4575, 9],
]
TestCases.forEach(element =>
    utils.it(`atoI(${element[0]}, ${element[1]}) \
, should return { value:${element[2]}, indexAfter:${element[3]}}}`, () => {
        assert.deepEqual
            (parser.atoI(element[0], element[1]),
                { value: element[2], indexAfter: element[3] });
    }));


console.log("  ---Testing atoF:---")
// each test case is of form [strArg, indexArg, valueRes, indexAfterRes ]
TestCases = [
    ["+21.5", 0, 21.5, 5],
    ["-0.2", 0, -0.2, 4],
    ["--+-1.25", 0,-1.25, 8],
    ["5+(-+45.75)", 3, -45.75, 10],
]
TestCases.forEach(element =>
    utils.it(`atoF(${element[0]}, ${element[1]}) \
, should return { value:${element[2]}, indexAfter:${element[3]}}}`, () => {
        assert.deepEqual
            (parser.atoF(element[0], element[1]),
                { value: element[2], indexAfter: element[3] });
    }));


console.log("  ---Testing parseInput:---")
// each test case is of form [str, calculationArray]
TestCases = [
    ["+21", [21]],
    ["-2*(3+(-5))", [-2, '*', '(', 3, '+', -5, ')']],
]

TestCases.forEach(element =>
    utils.it(`parseInput(${element[0]}}) \
, should return ${element[1]}`, () => {
        assert.deepEqual
            (parser.parseInput(element[0]), element[1]);}
    ));

