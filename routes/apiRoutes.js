// Added the required packages that handle EXPRESS.
const express = require('express');
const fs = require('fs');
// Variable that is required to grab data from other files in the directory.
const path = require('path');
// Variable that handles the Routes for in our server.
const router = express.Router();

// Variable that provides a unique ID every time it's called. 
// This will be used as an id for each note created by the user.
const uniqueId = `id_${Date.now()}`;

//! POST ROUTE CONTENT
// This is where the notes get posted on to the page.
// Router posts to the server.
router.post('/notes', (req, res) => {
    // Variable that reads and imports the content from the db.json file. 
    // The require function allows us to read the json data, which in this case are the notes.
    const existingNotes = require('../db/db.json');
    // A variable made that is definded by the request body. It contains the data sent.
    const newNote = req.body;
    // The data that is sent to the request body is then assigned a unique ID (defined above).
    newNote.id = uniqueId;
    // The array of exisiting notes gets the new note then added to it using a PUSH method
    existingNotes.push(newNote);
    // A function that writes the files into the db.json file, along with the exisiting and newly added note.
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(existingNotes));
    // Method used to send a json response to the client. 
    //It is sending the updated list of notes (existingNotes) back to the client. 
    res.json(existingNotes);
});

//! GET ROUTE CONTENT
// This is for retrieving notes posted.
// Router GETS notes from the server.
router.get('/notes', (req, res) => {
    // The file db.json is read and all the content inside of it.
    fs.readFile(path.join(__dirname, '../db/db.json'), (err, data) => {
        // A variable that defines the parsed JSON data.
        // The JSON.parse(data) converts the data, which is a string, into a array.
        let parsedData = JSON.parse(data);
        // Method used to send a json response to the client. 
        //It is sending the updated list of notes (parsedData) back to the client.
        res.json(parsedData);
        // Error message that displays err if there was any errors getting data, otherwise success message. 
        (err) ? console.error(err) : console.log("Notes retrieved notes successfully.");
        })
    })

// Exports the router. In this case it is exported to the server.js file
module.exports = router;
