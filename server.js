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


//! POST - WRITING FILE
// Route that adds a new note to the database
app.post('/api/notes', (req, res) => {
    // Grabbing db.json file content that is eventually going to get the
    //new note posted into it
    const exisitingNotes = require('./db/db.json');
    // The new note is going to be grabbed from the body of the request
    const newNote = req.body;
    //assigning a new id to this newly created note (uniqueId variable declared above)
    //will give every note a unique ID.
    newNote.id = uniqueId;
    // Pushing newNote into array (db.json file)
    exisitingNotes.push(newNote);
    //Save the note and save the note back into the db.json file
    fs.writeFileSync('./db/db.json', JSON.stringify(exisitingNotes))
        res.json(exisitingNotes)
    })



//! GET - READING FILE 
// Api/notes will read the contents inside of the db.json file and return 
//the saved notes/information inside.
app.get('/api/notes', (req, res) => {
    // Reading the files(or notes) from the json array file
    fs.readFile('./db/db.json', (err, data) => {
        // Variable made to make the  data easier to work with in JS.
        let parsedData = JSON.parse(data);
        // Response is made and note is parsed to make the data readable
        res.json(parsedData);
        // If there is an error, user will get a message, otherwise it
        (err) ? res.status(500).json('Error in posting review') : console.log("Note read sucessfully")
    });   
});

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


//! PORT
// Using enviornmental variable to set port number or defualt 3001
const PORT =  process.env.PORT || 3001;
// Will listen for port in terminal and give message when server is running.
app.listen(PORT, () => console.log(`Server started on localhost:${PORT}`));





