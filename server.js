const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


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

app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        let note = JSON.parse(data)
        console.log(req.body);
        let newNote = {
            ...req.body, 
            id: uuidv4()
        }
        console.log(newNote);
        note.push(newNote)
        fs.writeFile('./db/db.json', JSON.stringify(note), (err) => {
            if (err) throw err;
            res.json(note)
        })
    })
})


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
