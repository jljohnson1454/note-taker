const express = require('express');
const path = require('path');

const notes = require('./db/db.json');
const routes = require('./routes/routes');

const PORT = process.env.PORT || 3001;
const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static('public'));

function findByQuery(title, notes) {
    const result = notes.filter(note => note.title === title)[0];
    return result;
  }

app.get('/api/notes', (req, res) => {
    res.json(notes);
  });

app.get('/api/notes/:title', (req, res) => {
    const result = findByQuery(req.params.title, notes);
    res.json(result);
  });



  // app.use('/api', routes);



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });