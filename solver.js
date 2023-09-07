// Class supporting a basic Operation 
class Operation {
    lValue;
    rValue;
    operator;

    constructor(arr) {
        if (arr.length != 3) {
            throw 'Invalid Operation'
        }
        this.lValue = arr[0];
        this.operator = arr[1];
        this.rValue = arr[2]
    }

    evaluate() {
        switch (this.operator) {
            case "+":
                return this.lValue + this.rValue
            case "-":
                return this.lValue - this.rValue
            case "/":
                if (this.rValue === 0) {
                     throw `invalid operation: division by zero is not possible in : ${this.lValue}${this.operator}${this.rValue}`
                }
                return this.lValue / this.rValue
            case "*":
                return this.lValue * this.rValue
            default:
                throw 'invalid operation: unkown operand '
        }
    }
}


function processOperation(operationArray) {
    let operation = new Operation(operationArray)
    return operation.evaluate()
}

// Recursive function that solve a calculation array
// argument checkParentheses and checkPrios are boolean, 
// thos arguments are here to avoid unecessary operation after a recursive call
function resolve(array, checkParentheses, checkPrios) {
    let len = array.length
    if (len === 3 ) {
        return processOperation(array)
    } else if (len === 1){
        return array[0]
    }

    if (checkParentheses) {
        for (let index = 0; index < len; index++) {
            if (array[index] === '(') {
                updatedArray = handleParentheses(array, index)
                
                return resolve(updatedArray, true, true)
            }
        }
    }

    if (checkPrios) {
        for (let index = 0; index < len; index++) {
            if (array[index] === '*' || array[index] === '/') {
                updatedArray = doPriorityOperation(array, index)  
                return resolve(updatedArray, false, true)
            }
        }
    }
    return resolve(doRest(array), false, false)
}

// function resolving a bracketOperation
function handleParentheses(array, index) {
    let closingBracketIndex = findMatchingBracket(array,index,'(',')')
    subArr = array.slice(index + 1, closingBracketIndex)
    let bracketResult =  resolve(subArr, true, true)
    let startingArray = index - 1 < 0 ? [] : array.slice(0, index);
    let endingArray = array.slice(closingBracketIndex+1);
    newArr = startingArray.concat(bracketResult).concat(endingArray);
    return newArr
}


function doPriorityOperation(array, index) {
    let startingArray = index - 1 <= 0 ? [] : array.slice(0, index - 1)
    let endingArray = array.slice(index + 2)
    
    let operationArr = array.slice(index - 1, index + 2)
    blockResult = processOperation(operationArr)
    newArr = startingArray.concat(blockResult).concat(endingArray);
    return newArr
}

function doRest(array) {
    let operationArr = array.slice(0, 3)
    blockResult = processOperation(operationArr)
    newArr = [blockResult].concat(array.slice(3))
    return newArr
}


// given index of an opening bracket find the index of corresponding closing bracket.
function findMatchingBracket(str, index, openingBraket, closingBraket){
    let find = 1
    let len = str.length
    while (index < len && find !=0 ){
        index++;
       switch (str[index]){
        case openingBraket:
            find++
            break;
        case closingBraket:
            find--
            break;
        default:
            break;
       }
    }
    if (index === len && find !=0 ){
        throw 'Invalid Operation, at least one closing bracket is missing'
    }
    return index;
}

module.exports = { resolve}