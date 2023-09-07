// valid encounter symbol,
const VALID_SYMBOL = ['+', '-', '*', '/', '(', ')','.'];

function isDigit(c) {
    return c >= '0' && c <= '9';
}

// Parsing input into a calculation array,
// bracket delimiting negative or positive number will be remove

function parseInput(str) {
    str = str.replaceAll(" ", "")
    let calculationArray = new Array();
    let len = str.length;

    let i = parseFirstValue(str, calculationArray);

    while (i < len) {
        if (isDigit(str[i])) {
            atoFResult = atoF(str, i)
            calculationArray.push(atoFResult.value);
            i = atoFResult.indexAfter
        } else if (VALID_SYMBOL.includes(str[i])) {
            if (str[i] !== '(') {
                calculationArray.push(str[i]);
                i++;
            } else {
                i = parseBracket(str, i, calculationArray)
            }
        } else {
            throw `invalid character at index: ${i}, value:${str[i]}`;
        }
    }
    return calculationArray;
}

// Parse an integer starting at a given index in str
// it can start with multiple '+' or '-', sign depends of number of -
// return an Object: 
//      value: int that was parse
//      indexAfter: index of character following the parseInt 
// example atoI("2+(--+24)*5 ",3) return {value:24, indexAfter:8}
function atoI(str, index) {

    let signe = 1;
    let curr = index;
    while (str[curr] === '-' || str[curr] === '+') {
        if (str[curr] === '-') {
            signe *= -1;
        }
        curr++;
    }
    let numberIndex = curr;
    if (!isDigit(str[curr])) {
        throw `Invalid Operation: char ${str[index]} invalid`;
    }
    while (isDigit(str[curr])) {
        curr++;
    }
    return {
        value: parseInt(str.substr(numberIndex), 10) * signe,
        indexAfter: curr,
    };
}

//Parse a float starting at a given index in str
// Consist on two atoI, one for whole number part and one for decimal part
function atoF(str, index) {
    let atoIResult = atoI(str, index);
    if (str[atoIResult.indexAfter] !== ".") {
        return atoIResult;
    }
    if (!isDigit(str[atoIResult.indexAfter + 1])) {
        return atoIResult;
    }
    decimalPartAtoIResult = atoI(str, atoIResult.indexAfter + 1)

    let lenDecimalPart = decimalPartAtoIResult.indexAfter - (atoIResult.indexAfter + 1)
   
    return {
        value: atoIResult.value > 0 ? atoIResult.value + decimalPartAtoIResult.value / (10 ** lenDecimalPart)
                                    : atoIResult.value - decimalPartAtoIResult.value / (10 ** lenDecimalPart),
        indexAfter: decimalPartAtoIResult.indexAfter,
    }

}

// function updating calculationArray 
// :WARNING: This function modify array receive in third argument 
// return index of the next 'character of interest in str'
function parseBracket(str, bracketIndex, calculationArray) {
    if (str[bracketIndex + 1] !== '-' && str[bracketIndex + 1] !== '+') {
        calculationArray.push('(')
        return bracketIndex + 1
    } else {
        let atoFResult = atoF(str, bracketIndex + 1);

        if (str[atoFResult.indexAfter] === ')') {
            calculationArray.push(atoFResult.value)
            return (atoFResult.indexAfter + 1)
        } else {
            calculationArray.push('(')
            calculationArray.push(atoFResult.value)
            return atoFResult.indexAfter
        }
    }
}

// Handle first part of string value and add it to calculation array if necessary
// :WARNING: This function modify array receive in second argument
// return index of the next 'character of interest in str'
function parseFirstValue(str, calculationArray) {
    let atoFResult
    if (str[0] === '-' || str[0] === '+') {
        atoFResult = atoF(str, 0);
        calculationArray.push(atoFResult.value);
        return atoFResult.indexAfter
    }
    return 0
}


module.exports = { parseInput, atoI }
