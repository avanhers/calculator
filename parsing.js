// valid encounter symbol,
const VALID_SYMBOL = ['+', '-', '*', '/','(',')'];

function isDigit(c) {
    return c >= '0' && c <= '9';
}


// Parsing input into a calculation array,
// bracket delimiting negative or positive number will be remove

function parseInput(str) {
    let calculationArray = new Array();

    let len = str.length;
    let i =  parseFirstValue(str,calculationArray);

    while (i < len) {
        if (isDigit(str[i])) {
            atoiResult = atoI(str,i)
            calculationArray.push(atoiResult.value);
            i = atoiResult.indexAfter
        } else if (VALID_SYMBOL.includes(str[i])) {
            if ( str[i] !== '(') {
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

// function updating calculationArray
// :WARNING: This function modify array receive in third argument 
function parseBracket(str, bracketIndex, calculationArray) {
    if (str[bracketIndex + 1] !== '-' && str[bracketIndex + 1] !== '+'){
        calculationArray.push('(')
        return bracketIndex + 1
    } else{
       let atoIResult = atoI(str, bracketIndex + 1);
      
        if (str[atoIResult.indexAfter] === ')')  {
            // case of a bracket only containing a number : example 3* (-4) 
            // don't push initial bracket && fix nextIndex to be after closing bracket  
            calculationArray.push(atoIResult.value)
            return (atoIResult.indexAfter + 1)
        } else {
            // case of a bracket follow by an operation : example 3 * (-4+5) 
            // push initial bracket && fix nextIndex to be just
            calculationArray.push('(')
            calculationArray.push(atoIResult.value)
            return atoIResult.indexAfter
        }
    }
}

// Handle first part of string value and add it to calculation array
// :WARNING: This function modify array receive in second argument  
function parseFirstValue(str, calculationArray){
    let atoIResult
    if (str[0] === '-' || str[0] === '+') {
        atoIResult = atoI(str, 0);
        calculationArray.push(atoIResult.value);
        return atoIResult.indexAfter
    }
    return 0
}

module.exports = { parseInput}
