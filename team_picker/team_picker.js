const express = require('express');
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const knex = require('./client');

// const notesRouter = require('./routes/notes/create')

const methodOverride = require('method-override');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}));
app.use(
    methodOverride((req, res) => {
        if (req.body && req.body._method) {
            // console.log(req.body);
            // console.log(req.body._method);
            const method = req.body._method;
            return method;
        }
    })
)
// app.use('/',notesRouter);


// app.use((req,res,next) => {
//     res.locals.username = '';
//     const username = req.cookies.username;
//     if (username) {
//         res.locals.username = username;
//     } else {
//         if (req.url === '/sign_in') {
//             next();
//         } else {
//             res.render('signIn');
//         }
// }})

const PORT = 8989;
const ADDRESS = 'localhost';
app.listen(PORT, ADDRESS, () => {
    console.log(`server listening on ${ADDRESS}:${PORT}`);
})

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

app.get('/cohorts/new', (req, res) => {
    res.render('new');
})

app.post('/cohorts', (req, res) => {
    knex('team_picker') // --- START SQL
        .insert({
            logoURL: req.body.logoURL,
            name: req.body.cohortName,
            members: req.body.members,
        })
        .orderBy('createdAt', 'DESC')
        .returning('*') // --- END SQL
        .then(data => {
            res.redirect('/cohorts');
            // const cohorts = data;
            // res.render('cohorts', {
            //     cohorts
            // })
        });
})

app.get('/cohorts', (req, res) => {
    knex('team_picker') // --- START SQL
        .orderBy('createdAt', 'DESC')
        .returning('*') // --- END SQL
        .then(data => {
            const cohorts = data;
            res.render('cohorts', {
                cohorts
            })
        });
})

// app.get('/',(req,res) => {
//     console.log(req.cookies);
//     console.log(res.locals.username);
//     const username = res.locals.username;
//     res.render('home',{username: username, weather: 'rains'});
// })

// app.get('/contact_us',(req,res) => {
//     // console.log(req.query);
//     // console.log(req.body.fullName);
//     res.render('contactUs');
// })

// app.get('/thank_you',(req,res) => {
//     const {fullName, favColor, msg} = req.query;
//     // console.log(req.body.fullName)
//     // console.log(req.query.fullName)
//     res.render('thankYou', {fullName});
// })

// const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;
// app.post('/sign_in',(req,res) => {
//     // console.log(req.body);
//     res.cookie('username',req.body.username, {maxAge: COOKIE_MAX_AGE});
//     res.redirect('/');
//     res.end();
// })

// app.post('/sign_out',(req,res) => {
//     // console.log(req.body);
//     res.clearCookie('username');
//     res.redirect('/');
//     res.end();
// })

// app.get('/articles/new',(req,res) => {
//     res.render('articles/new');
// });

app.get('/cohorts/:id', (req, res) => {
    console.log('cool')
    console.log(req.query)
    const id = req.params.id;
    if (req.query.cohortName) {
        const {
            logoURL,
            cohortName,
            members
        } = req.query;
        knex('team_picker')
            .where('id', id)
            .update({
                logoURL: logoURL,
                name: cohortName,
                members: members
            })
            .returning('*')
            .then(data => {
                const cohort = data[0];
                console.log(cohort);
                // res.cookie('members', cohort.members)
                const teams = [],
                    header = '';
                res.render('show', {
                    cohort: cohort,
                    teams: teams,
                    header: header
                })
            })
    } else {
        knex('team_picker')
            .where('id', id)
            .returning('*')
            .then(data => {
                const cohort = data[0];
                // res.cookie('members', cohort.members)
                const teams = [],
                    header = ''
                res.render('show', {
                    cohort: cohort,
                    teams: teams,
                    header: header
                })
            })
    }
})

app.post('/cohorts/:id', (req, res) => {
    const id = req.params.id;
    knex('team_picker')
        .where('id', id)
        .then(data => {
            if (data[0]) {
                const cohort = data[0];
                // res.cookie('cohortMembers', cohort.members);
                const teams = [];
                // console.log(req.body)
                const teamCount = req.body.teamCount;
                const numberPerTeam = req.body.numberPerTeam;
                const quantity = req.body.quantity;
                // console.log(quantity)
                // console.log(numberPerTeam)
                // console.log(teamCount)
                if (teamCount === 'on') {
                    let allNames = cohort.members.split(', ');
                    for (let i = 0; i < 10; i++) {
                        shuffle(allNames);
                    }
                    // console.log(allNames)
                    let teamCount = 1;
                    const cutOff = Math.floor(allNames.length / quantity);
                    // console.log(cutOff);
                    while (teamCount < quantity) {
                        let team = '';
                        for (let i = 1; i <= cutOff; i++) {
                            if (i == 1) {
                                team += allNames[i - 1];
                            } else {
                                team += `, ${allNames[i-1]}`
                            }
                        }
                        // console.log(team)
                        teams.push(team);
                        teamCount++;
                        allNames = allNames.slice(cutOff);
                    }
                    teams.push(allNames);
                } else if (numberPerTeam === 'on') {
                    let allNames = cohort.members.split(', ');
                    for (let i = 0; i < 10; i++) {
                        shuffle(allNames);
                    }
                    // console.log(allNames)
                    let cutOff = quantity;
                    while (allNames.length > quantity) {
                        let team = '';
                        for (let i = 1; i <= cutOff; i++) {
                            if (i == 1) {
                                team += allNames[i - 1];
                            } else {
                                team += `, ${allNames[i-1]}`
                            }
                        }
                        // console.log('ok')
                        teams.push(team);
                        allNames = allNames.slice(cutOff);
                    }
                    teams.push(allNames);
                }
                // console.log(cohort)
                const header = "# Members"
                res.render('show', {
                    cohort: cohort,
                    teams: teams,
                    header: header
                })
            } else {
                res.send(`Unexpected error.`);
            }
        })
})

app.post('/cohorts/:id/edit', (req, res) => {
    const id = req.params.id;
    knex('team_picker')
        .where('id', id)
        .first()
        .then(cohort => {
            if (cohort) {
                res.render('edit', {
                    cohort: cohort
                })
            } else {
                res.send(`Cannot find cohort with id=${id}`);
            }
        })
})

app.delete('/cohorts/:id', (req, res) => {
    const id = req.params.id;

    knex('team_picker')
        .where('id', id)
        .del()
        .then(() => {
            res.redirect('/cohorts');
        });
    // res.send('Deleting ');
});

app.put('/cohorts/:id', (req, res) => {
    console.log('ok')
    const id = req.params.id;
    console.log(req.body);
    const {
        logoURL,
        name,
        members
    } = req.body;
    knex('team_picker')
        .where('id', id)
        .first()
        .update({
            logoURL,
            name,
            members
        })
        .returning('*')
        .then(data => {
            //   console.log(data)
            //   console.log('ok1');
            // const cohort = data;
            res.redirect(`/cohorts/${cohort.id}`);
        });
});