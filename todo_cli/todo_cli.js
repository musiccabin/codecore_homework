const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Welcome to Todo CLI!' + '\n' +
    '--------------------' + '\n');
const menu = "(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit" + '\n';
const recur = () => {
    rl.question(menu, (answer => {
        if (answer === 'q') {
            console.log('see you soon! 😀');
            rl.close();
        } else if (answer === 'v') {
            if (fs.readFileSync('todo_cli.txt').toString() === '') {
                console.log('no items on your to-do list.')
                recur();
            } else {
                fs.readFile('todo_cli.txt',{encoding: 'utf8'},(err,data) => {
                    if (err) {
                        console.log('there is an error.');
                    } else {
                        console.log(data);
                        recur();
                    }
                })
            }
        } else if (answer === 'n') {
            rl.question('what?' + '\n', answer => {
                let toAppend = '';
                let nextNum = 0;
                if (fs.readFileSync('todo_cli.txt').toString() === '') {
                    nextNum = 0;
                } else {
                    nextNum = fs.readFileSync('todo_cli.txt').toString().split('\n').length - 1;
                }
                toAppend += nextNum + ' [ ] ' + answer + '\n';
                fs.appendFile('todo_cli.txt', toAppend, err => {
                    if (err) {
                        console.log('there is an error.')
                    } else {
                        recur();
                    }
                })
            })
        } else if (answer[0] === 'c') {
            let tmpArr = fs.readFileSync('todo_cli.txt').toString().split('\n');
            if (answer[1] <= tmpArr.length - 2) {
                let toComplete = tmpArr[answer[1]];
                for (let i = 0; i < toComplete.length; i++) {
                    if (toComplete[i] === ']') {
                        toComplete = toComplete.slice(i + 2);
                        break;
                    }
                }
                tmpArr.splice(answer[1], 1, `${answer[1]} [✓] ${toComplete}`);
                fs.writeFileSync('todo_cli.txt','');
                for (let i = 0; i < tmpArr.length - 1; i++) {
                    fs.appendFile('todo_cli.txt', `${tmpArr[i]}\n`, err => {
                        if (err) {
                            console.log('there is an error');
                        }
                    })
                }
                console.log(`Completed "${toComplete}".`);
                recur();
            } else {
                console.log("such task doesn't exist.");
                recur();
            }
        } else if (answer[0] === 'd') {
            let tmpArr = fs.readFileSync('todo_cli.txt').toString().split('\n');
            if (answer[1] <= tmpArr.length - 2) {
                let toDelete = tmpArr[answer[1]];
                for (let i = 0; i < toDelete.length; i++) {
                    if (toDelete[i] === ']') {
                        toDelete = toDelete.slice(i + 2);
                        break;
                    }
                }
                tmpArr.splice(answer[1], 1,);
                fs.writeFileSync('todo_cli.txt','');
                for (let i = 0; i < tmpArr.length - 1; i++) {
                    let tmp = tmpArr[i];
                    for (let j = 0; j < tmp.length; j++) {
                        if (tmp[j] === '[') {
                            tmp = tmp.slice(j);
                            break;
                        }
                    }
                    fs.appendFile('todo_cli.txt', `${i} ${tmp}\n`, err => {
                        if (err) {
                            console.log('there is an error');
                        }
                    })
                }
                console.log(`Deleted "${toDelete}".`);
                recur();
            } else {
                console.log("such task doesn't exist.");
                recur();
            }
        } else {
            console.log("such command doesn't exit.");
            recur();
        }
    }))
}
recur();