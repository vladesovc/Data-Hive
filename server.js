const express = require('express');
const path = require('path');
const fs = require('fs');
const { error } = require('console');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));




//api routes
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        let note = JSON.parse(data)
        res.json(note)
    })
})




// html routes


// create 3 html routes 
app.get('/', (req, res)=> {
    res.sendFile(path.join (__dirname, '/public/index.html'))
}) 

app.get('/notes', (req, res) => {
    res.sendFile(path.join (__dirname, '/public/notes.html'))
})

app.get('*', (req, res) => {
    res.sendFile(path.join (__dirname, '/public/index.html'))
})







app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
