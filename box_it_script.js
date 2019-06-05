#! home/susannah/.nvm/versions/node/v11.15.0/bin/node

function drawLine(num) {
    const bar = '\u2501';
    return bar.repeat(num);
}

// console.log(drawLine(5));

function drawTopBorder(num) {
    const topLeftCorner = '\u250F';
    const topRightBorder = '\u2513';
    return topLeftCorner + drawLine(num) + topRightBorder;
}

// console.log(drawTopBorder(0));
// console.log(drawTopBorder(4));

function drawMiddleBorder(num) {
    const middleLeftCorner = '\u2523';
    const middleRightCorner = '\u252B';
    return middleLeftCorner + drawLine(num) + middleRightCorner;
}

// console.log(drawMiddleBorder(0));
// console.log(drawMiddleBorder(8));

function drawBottomBorder(num) {
    const bottomLeftCorner = '\u2517';
    const bottomRightBorder = '\u251B';
    return bottomLeftCorner + drawLine(num) + bottomRightBorder;
}

// console.log(drawBottomBorder(0));
// console.log(drawBottomBorder(2));

function drawBarsAround(x) {
    const verticalBar = '\u2503';
    return verticalBar + x + verticalBar;
}

// console.log(drawBarsAround('My name is Dan'));
// console.log(drawBarsAround("You are Jane  "));
// console.log(drawBarsAround("  You are Bill"));



function boxOrParseIt() {
    const input = process.argv[2];
    if (input !== undefined && input.includes('\.csv')) {
        const fs = require('fs');
        const textByLine = fs.readFileSync(input).toString().split("\n");
        return boxItMultiCol(textByLine);
    } else {
        const arrOfStr = [];
        let i = 2;
        while (process.argv[i] !== undefined) {
            arrOfStr.push(process.argv[i]);
            i += 1;
        }
        return boxIt(arrOfStr);
    }
}

function boxIt(arrOfStr) {
    if (arrOfStr.length === 0) {
        return drawTopBorder(0) + '\n' + drawBottomBorder(0);
    } else {
        const lengths = [];
    for (const str of arrOfStr) {
        lengths.push(str.length);
    }
    length = Math.max(...lengths);
    output = drawTopBorder(length) + '\n';
    for (let str of arrOfStr) {
        tmp = str + " ".repeat(length-str.length);
        if (str === arrOfStr[0]) {
            output += drawBarsAround(tmp) + '\n';
        } else {
            output += drawMiddleBorder(length) + '\n' + drawBarsAround(tmp) + '\n';
        }
    }
    output += drawBottomBorder(length);
    return output;
    }   
}

// console.log(boxIt(['Jon Snow', 'Cersei Lannister']));
// emptyArr = [];
// console.log(boxIt(emptyArr));

function boxItMultiCol(arr) {
    const arr0 = arr.split('\n')[0];
    const arr1 = arr.split('\n')[1];
    const len0 = Math.max(Math.max(...arr0), 4);
    const len1 = Math.max(Math.max(...arr1), 5);
    length = len0 + len1;
    
    output = drawTopBorder(arr0 + arr1) + drawBarsAround('Name' + ' '.repeat(len0 - 4)) + drawBarsAround('House' + ' '.repeat(len1 - 5));
    for (let i = 0; i < arr0.length; i++) {
        output += drawMiddleBorder(length) + '\n';
        tmp0 = arr0[i] + " ".repeat(len0 - arr0[i].length);
        tmp1 = arr1[i] + ' '.repeat(len1 - arr1[i].length);
        output += drawBarsAround(tmp0) + drawBarsAround(tmp1) + '\n';
    }
    output += drawBottomBorder(length); 
    return output;
}

console.log(boxOrParseIt());
