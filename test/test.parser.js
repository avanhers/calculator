const parser = require("../parser");
const assert = require('assert');
const it = (desc, fn) => {
    try {
        fn();
        console.log('\x1b[32m%s\x1b[0m', `\u2714 ${desc}`);
    } catch (error) {
        console.log('\n');
        console.log('\x1b[31m%s\x1b[0m', `\u2718 ${desc}`);
        console.error(error);
    }
};

console.log("-----Testing Parser:-----")


console.log("  ---Testing atoI:---")
// each test case is of form [strArg, indexArg, valueRes, indexAfterRes ]
TestCase = [
    ["+21", "0", "21", "3"],
    ["-21678", "0", "-21678", "6"],
    ["5+(-4575)", "3", "-4575", 8]
]
TestCase.forEach(element =>
    it(`atoi(${element[0]}, ${element[1]}) \
, should return { value:${element[2]}, indexAfter:${element[3]}}}`, () => {
        assert.deepEqual
            (parser.atoI(element[0], element[1]),
                { value: element[2], indexAfter: element[3] });
    }));


console.log("  ---Testing parseInput:---")
// each test case is of form [str, calculationArray]
TestCase = [
    ["+21", [21]],
    ["-2*(3+(-5))", [-2, '*', '(', 3, '+', -5, ')']],
]

TestCase.forEach(element =>
    it(`parseInput(${element[0]}}) \
, should return ${element[1]}`, () => {
        assert.deepEqual
            (parser.parseInput(element[0]), element[1]);}
    ));

