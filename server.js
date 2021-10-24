const express = require('express');
const path = require('path');
const fs = require('fs');


const notes = require('./db/db.json');
const routes = require('./routes/routes');

const PORT = process.env.PORT || 3001;
const app = express();

class object {
    constructor(id, title, text){
        this.id = id;
        this.title = title;
        this.text = text;
    }
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Function to find note by title
function findByQuery(title, notes) {
    const result = notes.filter(note => note.title === title)[0];
    return result;
  }

// GET requests to find notes
app.get('/api/notes', (req, res) => {
    res.json(notes);
  });

app.get('/api/notes/:title', (req, res) => {
    const result = findByQuery(req.query.title, notes);
    res.json(result);
  });

// app.get('/api/query', (req, res) => {
//     res.json(req.query);
// });

app.get('/notes', function(req,res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});


// POST routes to add new notes
let globalData;
const writeNote = (body) => {
    
    fs.readFile('./db/db.json', 'utf-8', function (err, data) {
        globalData = data;
        console.log(data);
        notes.push(body);
    
        fs.writeFile('./db/db.json', JSON.stringify(notes), () =>{console.log('fileWritten')})
    })
};




app.post('/api/notes', (req, res) => {
    // req.body is where our incoming content will be
    
    let reqBody = req.body;
    reqBody.id = notes.length;
    let body = new object(reqBody.id, reqBody.title, reqBody.text);
    console.log(body);
    writeNote(body);
    // fs.readFile('./db/db.json','utf-8', (err, data) => {
    //     console.log(data);
    //     globalData = data;
    //     console.log('working')})
    
    res.json(globalData);
    
  });



// app.post('/api/notes', (req, res) => {
//     const newNote = req.body;
  
//     console.log(newNote);
  
//     notes.push(newNote);
  
//     res.json(newNote);
//   });


  // app.use('/api', routes);



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });