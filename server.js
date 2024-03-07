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

