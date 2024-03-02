// Required variables and required functions for express
const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');

//variable that creates a unique ID when a note is saved. Gets put into json along 
//with anew note
const uniqueId = `id_${Date.now()}`;



//! MIDDLEWARE - USE FOR ALL INCOMING REQUESTS
// Tells server to work with JSON
app.use(express.json());
// Used for parsing incoming request bodies that are URL-encoded 
app.use(express.urlencoded({ extended: true }));
// Gives access to all the folders/files in public directory
app.use(express.static(path.join(__dirname, 'public')));



//! GET - SENDING FILE
// Setting up the routes for the API- index, notes and wildcard.
// notes and index.html from public folder. 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Notes.html from public folder. When a GET Request is made the notes.html file 
//will be the default page. For example (http://localhost:(PORT)/notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
    console.info(`${req.method} request made for notes`);
});
// Wildcard. When a GET Request is made but there are no routes found, it will 
//go to the default page - (http://localhost:(PORT)/index)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



//! GET - READING FILE 
// Api/notes will read the contents inside of the db.json file and return 
//the saved notes/information inside.
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        (err) ? console.info(err) : console.info('Note saved sucessfully')
        let parsedData = JSON.parse(data);
        res.json(parsedData);
    });   
});

const dbJsonFile = ('./db/db.json')

//! POST - WRITING FILE
app.post('/api/notes', (req, res) => {
    const notes = req.body;
    notes.id = (uniqueId);
    dbJsonFile.push(notes);
    fs.writeFileSync(dbJsonFile, JSON.stringify(dbJsonFile));
    (err) ? console.info(err) : console.info('File written sucessfully')
    res.json(dbJsonFile);
});



//! PORT
// Using enviornmental variable to set port number or defualt 3001
const PORT =  process.env.PORT || 3001;
// Will listen for port in terminal and give message when server is running.
app.listen(PORT, () => console.log(`Server started on localhost:${PORT}`));
