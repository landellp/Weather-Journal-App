// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 8000;

// Callback to debug
const server = app.listen(port, listening);
function listening() {
  console.log('server running');
  console.log(`running on localhost ${port}`);
}

// GET route
app.get('/GET', function(req, res) {
    res.send(projectData);
});

// POST route
app.post('/POST', function(req, res) {
    projectData.date = req.body.date;
    projectData.temperature = req.body.main.temp;
    projectData.feelings = req.body.feelings;
    res.send(true);
});
