const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let arrObj;
let file = process.argv[2];
if (file === undefined) {
    file = 'todo_cli.json';
    arrObj = [];
} else if (fs.existsSync(file)) {
    let raw = fs.readFileSync(file).toString();
    if (raw === '') {
        arrObj = [];
    } else {
        arrObj = JSON.parse(raw);
    }
} else {
   fs.writeFileSync(file, '');
   arrObj = [];
}
console.log('Welcome to Todo CLI!' + '\n' +
    '--------------------' + '\n');
const menu = "(v) View • (n) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit" + '\n';
const recur = () => {
    rl.question(menu, (answer => {
        if (answer === 'q') {
            console.log('see you soon! 😀');
            rl.close();
        } else if (answer === 'v') {
            if (arrObj.length === 0) {
                console.log('no items on your to-do list.');
                recur();
            } else {
                let output = '';
                for (let i = 0; i < arrObj.length; i++) {
                    output += `${i} `;
                    if (arrObj[i]['completed'] === true) {
                        output += `[✓] ${arrObj[i]['title']}\n`;
                    } else if (arrObj[i]['completed'] === false) {
                        output += `[ ] ${arrObj[i]['title']}\n`;
                    }
                }
                console.log(output);
                recur();
            }
        } else if (answer === 'n') {
            rl.question('what?' + '\n', answer => {
                // let nextNum = 0;
                if (arrObj.length === 0) {
                    nextNum = 0;
                } else {
                    nextNum = arrObj.length - 1;
                }
                const toAppend = {};
                toAppend['completed'] = false;
                toAppend['title'] = answer;
                arrObj.push(toAppend);
                recur();
            })
        } else if (answer[0] === 'c') {
            if (answer[1] <= arrObj.length - 1) {
                let toComplete = arrObj[answer[1]]['title'];
                for (let i = 0; i < toComplete.length; i++) {
                    if (toComplete[i] === ']') {
                        toComplete = toComplete.slice(i + 2);
                        break;
                    }
                }
                toCompleteObj = {};
                toCompleteObj['title'] = toComplete;
                toCompleteObj['completed'] = true;
                arrObj.splice(answer[1], 1, toCompleteObj);
                console.log(`Completed "${toComplete}".`);
                recur();
            } else {
                console.log("such task doesn't exist.");
                recur();
            }
        } else if (answer[0] === 'd') {
            if (answer[1] <= arrObj.length - 1) {
                let toDelete = arrObj[answer[1]]['title'];
                for (let i = 0; i < toDelete.length; i++) {
                    if (toDelete[i] === ']') {
                        toDelete = toDelete.slice(i + 2);
                        break;
                    }
                }
                arrObj.splice(answer[1], 1);
                console.log(`Deleted "${toDelete}".`);
                recur();
            } else {
                console.log("such task doesn't exist.");
                recur();
            }
        } else if (answer === 's') {
            rl.question(`where? (default: ${file})`, answer => {
                if (answer === '') {
                    fs.writeFileSync(file, JSON.stringify(arrObj));
                    recur();
                } else {
                    fs.writeFileSync(answer, JSON.stringify(arrObj));
                    recur();
                }
            })

        } else {
            console.log("such command doesn't exit.");
            recur();
        }
    }))
}
recur();