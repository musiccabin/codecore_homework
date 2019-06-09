class Turtle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.facing = 'east';
        this.points = [[x, y]];
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
        let output = "-- BEGIN LOG", points = this.points, tmpArr = [];
        let minX = points[0][0], minY = points[0][1], maxX = points[0][0], maxY = points[0][1];
        for (const element of points) {
            tmpArr.push(element.toString().split(',').join(''));
            if (element[0] <= minX) {
                minX = element[0];
                // console.log(minX);
            } else {
                maxX = element[0];
                // console.log(maxX);
            }
            if (element[1] <= minY) {
                minY = element[1];
                // console.log(minY);
            } else {
                maxY = element[1];
                // console.log(maxY);
            }
        }
        output += '\n' + '  ';
        // console.log(tmpArr);
        for (let i = minX; i <= maxX; i++) {
            if (i >= 0) {
                output += ' ' + i;
            } else {
                output += i;
            }
        }
        output += '\n';
        // console.log(minX,maxX,minY,maxY);
        for (let j = minY; j <= maxY; j++) {
            if (j >= 0) {
                output = output + ' ' + j + ' ';
            } else {
                output = output + j + ' ';
            }
            for (let i = minX; i <= maxX; i++) {
                let tmp = [i,j].toString().split(',').join('');
                // console.log(tmp);
                if (tmpArr.includes(tmp)) {
                    output += '= ';
                } else {
                    output += '- ';
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