const express = require('express');
const app = express();
const path = require('path');


app.get('/api/notes', (req, res) => {
    res.send('Hello!');
  });





app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });