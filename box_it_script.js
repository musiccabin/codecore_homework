#!/home/susannah/.nvm/versions/node/v11.15.0/bin/node

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

function drawBarAfter(x) {
    const verticalBar = '\u2503';
    return x + verticalBar;
}



function boxOrParseIt() {
    const input = process.argv[2];
    if (input !== undefined && input.includes('\.csv')) {
        const fs = require('fs');
        const textByLine = fs.readFileSync(input).toString().split("\r\n");
        console.log(textByLine);
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
    const headers = [];
    headers.push(arr[0]);
    numOfCol = headers.length;
    numOfRow = arr.length;
    const lengths = [];
    for (let col in headers) {
        const tmp = [];
        for (let row of arr) {
            tmp.push(row[col].length);
        }
        lengths.push(Math.max(...tmp));  
    }
    let lengthTotal = 0;
    for (const num of lengths) {
        lengthTotal += num;
    }
    lengthTotal += headers.length - 1;
    output = drawTopBorder(lengthTotal) + '\n' + '\u2503';
    for (i = 0; i < headers.length; i++) {
        output += drawBarAfter(headers[i] + ' '.repeat(lengths[i]-headers[i].length));
    }
    output += '\n';
    for (i = 1; i < arr.length; i++) {
        output += drawMiddleBorder(lengthTotal) + '\n' + '\u2503';
        for (j = 0; j < headers.length; j++) {
            output += drawBarAfter(arr[i][j] + " ".repeat(lengths[j]-arr[i][j].length));
        }
        output += '\n';
    }
    // for (let i = 0; i < arr0.length; i++) {
    //     output += drawMiddleBorder(length) + '\n';
    //     tmp0 = arr0[i] + " ".repeat(len0 - arr0[i].length);
    //     tmp1 = arr1[i] + ' '.repeat(len1 - arr1[i].length);
    //     output += drawBarsAround(tmp0) + drawBarsAround(tmp1) + '\n';
    output += drawBottomBorder(lengthTotal); 
    return output;
}

console.log(boxItMultiCol([['names','house'],['jon snow','stark'],['other name','other house']]));

console.log(boxOrParseIt());
