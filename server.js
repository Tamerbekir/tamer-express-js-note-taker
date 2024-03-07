// // Required variables and required functions for express
// const fs = require('fs');
// const express = require('express');
// const app = express();
// const path = require('path');


// //variable that creates a unique ID when a note is saved. Gets put into json along 
// //with anew note
// const uniqueId = `id_${Date.now()}`;

// //! MIDDLEWARE - USE FOR ALL INCOMING REQUESTS
// // Tells server to work with JSON
// app.use(express.json());
// // Used for parsing incoming request bodies that are URL-encoded 
// app.use(express.urlencoded({ extended: true }));
// // Gives access to all the folders/files in public directory
// app.use(express.static(path.join(__dirname, 'public')));


// //! POST - WRITING FILE
// // Route that adds a new note to the database
// app.post('/api/notes', (req, res) => {
//     // Grabbing db.json file content that is eventually going to get the
//     //new note posted into it
//     const exisitingNotes = require('./db/db.json');
//     // The new note is going to be grabbed from the body of the request
//     const newNote = req.body;
//     //assigning a new id to this newly created note (uniqueId variable declared above)
//     //will give every note a unique ID.
//     newNote.id = uniqueId;
//     // Pushing newNote into array (db.json file)
//     exisitingNotes.push(newNote);
//     //Save the note and save the note back into the db.json file
//     fs.writeFileSync('./db/db.json', JSON.stringify(exisitingNotes))
//         res.json(exisitingNotes)
//     })






// Added required variables/functions for EXPRESS
const express = require('express');
// Variable that is required to grab data from other files in the directory.
const path = require('path');
// Varaible that takes the API route from the directory and uses it in the server.
const apiRoutes = require('./routes/apiRoutes');
// Varaible that takes the HTML route from the directory and uses it in the server.
const htmlRoutes = require('./routes/htmlRoutes');

// Required variable for EXPRESS
const app = express();

//! Middleware
// Tells server to work with JSON
app.use(express.json());
// Used for parsing incoming request bodies that are URL-encoded 
app.use(express.urlencoded({ extended: true }));
// Gives access to all the folders/files in public directory
app.use(express.static(path.join(__dirname, 'public')));


// Tells the server to use the api and HTML routes using the variable definded above.
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//! PORT
// Using enviornmental variable to set port number or defualt 3001
const PORT = process.env.PORT || 3001;
// Will listen for port in terminal and give message when server is running.
app.listen(PORT, () => console.log(`Server started on localhost:${PORT}`));

