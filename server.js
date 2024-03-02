// Required variables and required functions for express
const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');

//! PORT
 // Using enviornmental variable to set port number or defualt 3001
const PORT =  process.env.PORT || 3001;
// Will listen for port in terminal and give message when server is running.
app.listen(PORT, () => console.log(`Server started on https://localhost:${PORT}`));

//! MIDDLEWARE
// Access to all the folders/files in public directory
app.use(express.static(path.join(__dirname, 'public')));

//! ROUTES
// Setting up the routes for the API- index, notes and wildcard which al
// index.html from public folder. When a GET Request is made the index.html file will be default page. For example (http://localhost:3001/index)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Notes.html from public folder. When a GET Request is made the notes.html file will be the default page. For example (http://localhost:3001/notes)
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
});
// Wildcard. When a GET Request is made but there are no routes found, it will go the main page (http://localhost:3001/index)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

