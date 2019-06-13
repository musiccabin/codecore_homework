class Turtle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.facing = 'east';
        this.points = [
            [x, y]
        ];
    }

    forward(n) {
        switch (this.facing) {
            case 'east':
                for (let i = 0; i < n; i++) {
                    this.points.push([(this.x + 1), this.y]);
                    this.x += 1;
                }
                break;
            case 'south':
                for (let i = 0; i < n; i++) {
                    this.points.push([this.x, (this.y + 1)]);
                    this.y += 1;
                }
                break;
            case 'west':
                for (let i = 0; i < n; i++) {
                    this.points.push([(this.x - 1), this.y]);
                    this.x -= 1;
                }
                break;
            case 'north':
                for (let i = 0; i < n; i++) {
                    this.points.push([this.x, (this.y - 1)]);
                    this.y -= 1;
                }
                break;
        }
        return this;
    }

    right() {
        switch (this.facing) {
            case 'east':
                this.facing = 'south';
                break;
            case 'south':
                this.facing = 'west';
                break;
            case 'west':
                this.facing = 'north';
                break;
            case 'north':
                this.facing = 'east';
                break;
        }
        return this;
    }

    left() {
        switch (this.facing) {
            case 'east':
                this.facing = 'north';
                break;
            case 'north':
                this.facing = 'west';
                break;
            case 'west':
                this.facing = 'south';
                break;
            case 'south':
                this.facing = 'east';
                break;
        }
        return this;
    }

    allPoints() {
        return this.points;
    }

    print() {
        let output = "-- BEGIN LOG",
            points = this.points,
            tmpArr = [];
        let minX = points[0][0],
            minY = points[0][1],
            maxX = points[0][0],
            maxY = points[0][1];
        for (const element of points) {
            tmpArr.push(element.toString().split(',').join(''));
            if (element[0] <= minX) {
                minX = element[0];
                // console.log(minX);
            } else if (maxX <= element[0]) {
                maxX = element[0];
                // console.log(maxX);
            }
            if (element[1] <= minY) {
                minY = element[1];
                // console.log(minY);
            } else if (maxY <= element[1]) {
                maxY = element[1];
                // console.log(maxY);
            }
        }
        output += '\n' + '   ';
        // console.log(tmpArr);
        for (let i = minX; i <= maxX; i++) {
            if (i >= 0 && i <= 9) {
                output += ' ' + i + ' ';
            } else {
                output += ' ' + i;
            }
        }
        output += '\n';
        // console.log(minX,maxX,minY,maxY);
        for (let j = minY; j <= maxY; j++) {
            if (j >= 0 && j <= 9) {
                output += '  ' + j + ' ';
            } else if (j < 0) {
                output += j + ' ';
            } else if (j >= 10) {
                output += ' ' + j + ' ';
            }
            for (let i = minX; i <= maxX; i++) {
                let tmp = [i, j].toString().split(',').join('');
                // console.log(tmp);
                if (tmpArr.includes(tmp)) {
                    output += '=  ';
                } else {
                    output += '-  ';
                }
            }
            output += '\n';
        }
        output += '-- END LOG'
        return output;
    }
}

// const flash = new Turtle(-2, 4).forward(3).left().forward(8).right().forward(1).left().forward(5);
// console.log(flash.allPoints().toString());
// console.log(flash.print());


let input = process.argv[2];
if (input !== undefined) {
    const printPath = (input) => {
        let initX, initY;
        if (input[0] === 't') {
            initX = parseInt(input[1]);
            initY = parseInt(input[3]);
            input = input.split('').slice(5);
        } else {
            initX = 0;
            initY = 0;
            input = input.split('');
        }
        const flash = new Turtle(initX, initY);
        // const tmp = [], arr = [];
        // for (const element of input) {
        //     arr.push(element);
        // }
        while (input.length > 0) {
            if (input[0] === 'f') {
                input.shift();
                let n = '';
                i = 0;
                // console.log(input[i]);
                while (['0', '1', '2', '3,', '4', '5', '6', '7', '8', '9'].includes(input[i])) {
                    n += input[i];
                    input.shift();
                }
                flash.forward(parseInt(n));
            } else if (input[0] === 'r') {
                flash.right();
                input.shift();
            } else if (input[0] === 'l') {
                flash.left();
                input.shift();
            }
            if (input[0] === '-') {
                input.shift();
            }
        }
        // console.log(flash.points.toString());
        return flash.print();
    }
    if (input.includes('--output=')) {
        const tmp = input.split(' ')[0];
        const newFile = tmp.slice(9);
        input = process.argv[3];
        const fs = require('fs');
        fs.writeFile(newFile, printPath(input), err => {
            console.log(printPath(input))
            if (err) {
                console.log('error!');
            } else {
                console.log(`Turtle path printed to ${newFile}!`)
            }
        })
    } else {
        console.log(printPath(input));
    }
}