const express = require('express');
const router = express.Router();
const knex = require('../../client');

// -= Article Routes =-

// NAME: article#new, METHOD: GET, PATH: /articles/new
router.get('/create', (req, res) => {
    res.render('create');
});

router.get('/notes', (req, res) => {
    knex('notes')
        .orderBy('createdAt', 'DESC')
        .then(notes => {
            res.render('notes', {
                notes: notes
            })
        })
})

router.post('/notes', (req, res) => {
    knex('notes') // --- START SQL
        .insert({
            content: req.body.content,
        })
        .returning('*') // --- END SQL
        .then(data => {
            // get the first value because db data
            // always comes in an array
            const note = data[0];
            // -- EXECUTE SQL
            res.redirect(`/notes/${note.id}`);
        });
});

// // NAME: article#create, METHOD: POST, PATH: /articles
// router.post('/', (req, res) => {
//     knex('articles') // --- START SQL
//         .insert({
//             title: req.body.title,
//             content: req.body.content,
//             viewCount: 0
//         })
//         .returning('*') // --- END SQL
//         .then(data => {
//             // get the first value because db data
//             // always comes in an array
//             const article = data[0];
//             // -- EXECUTE SQL
//             res.redirect(`/articles/${article.id}`);
//         });
// });

// router.get('/', (req, res) => {
//     knex('articles')
//         .orderBy('createdAt', 'DESC')
//         .then(articles => {
//             res.render('articles/index', {
//                 articles: articles
//             })
//         })
// })

router.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    knex('notes')
        .where('id', id)
        .first()
        .then(note => {
            if (note) {
                res.render('show', {
                    note: note
                })
            } else {
                res.send(`Cannot find note with id=${id}`);
            }
        })
})

router.get('/notes/:id/edit', (req, res) => {
    const id = req.params.id;
    knex('notes')
        .where('id', id)
        .first()
        .then(note => {
            if (note) {
                res.render('edit', {
                    note: note
                })
            } else {
                res.send(`Cannot find article with id=${id}`);
            }
        })
})

router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;

    knex('notes')
        .where('id', id)
        .del()
        .then(() => {
            res.redirect('/notes');
        });
    // res.send('Deleting ');
});

router.put('/notes/:id', (req, res) => {
    const id = req.params.id;
  
    const { content } = req.body;
  
    knex('notes')
      .where('id', id)
      .first()
      .update({
        content
      })
      .returning('*')
      .then(data => {
        const note = data[0];
        res.redirect(`/notes/${note.id}`);
      });
  });



module.exports = router;