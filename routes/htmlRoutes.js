// Variable that is required to grab data from other files in the directory.
const path = require('path');
// Added the required packages that handle EXPRESS.
const express = require('express');
// Variable that handles the Routes for in our server.
const router = express.Router();

//! GET Routes for serving the index page
// Route that GETS the index.html file in directory and adds it to the server.
router.get('/', (req, res) => {
    // index.html is sent to the server.
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Route that GETS the notes.html file in directory and adds it to the server.
router.get('/notes', (req, res) => {
    // index.html is sent to the server.
    res.sendFile(path.join(__dirname, '../public/notes.html'));
    console.info(`${req.method} request made for notes`);
});

// Wildcard route. When a GET Request is made but there are no routes found, it will 
// go to the default page - (http://localhost:(PORT)/index)
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Exports the content here into the server.js file.
module.exports = router;
