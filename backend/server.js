// Just trying out Express.js
// Express see’s that we have a GET request hitting our route, runs the query against our 
// Google SQL database and returns the result as JSON. We can now consume this API in our 
// mobile app, our web app, or wherever we want!

// As we add more complexity to add a user, query a room, make a booking etc. Our API will
// get a lot bigger. So We will store/organise all our routes into a "routes" directory.
// Similarly, we will have a "controllers" directory which will store all our MySQL query logic.

require('dotenv').config()

const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const connection = require('./database');

// app.route('/books/:userId')

// This is a route. Route's perform a specific task by calling our API.
// the /user route helps us retrive all the users from our Cloud SQL and displays it onto a webpage as JSON.
server.route('/user')
  .get(function(req, res, next) {
    connection.query(
      "SELECT * FROM `user`", req.params.userId,
      function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  });

server.get('/status', (req, res) => res.send('Working!'));

// Port 8080 for Google App Engine
server.set('port', process.env.PORT || 3000);
server.listen(3000);