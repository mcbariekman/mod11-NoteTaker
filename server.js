// Import the required modules
const express = require('express');
const path = require('path');

// Import the API and HTML routes
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Create a new express application
const app = express();

// Set the port number for the server
const PORT = process.env.PORT || 3000;

// Add middleware to parse incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));

// Add middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Define a route to serve the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Add middleware to serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to serve the notes.js file
app.get('/public/notes.js', (req, res) => {
  res.set('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, '/public/notes.js'));
});

// Add the API and HTML routes to the application
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
