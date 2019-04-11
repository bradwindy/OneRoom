// Just trying out Express.js
// Express see’s that we have a GET request hitting our route, runs the query against our 
// Google SQL database and returns the result as JSON. We can now consume this API in our 
// mobile app, our web app, or wherever we want!

// As we add more complexity to add a user, query a room, make a booking etc. Our API will
// get a lot bigger. So We will store/organise all our routes into a "routes" directory.
// Similarly, we will have a "controllers" directory which will store all our MySQL query logic.


require('dotenv').config();

const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const connection = require('./database');
// Capital J as what is returned from this module is a class and classes need to be uppercase
// Joi helps us validate user input on the server side.
const Joi = require('joi');

// Allows our Express app/server to use JSON data
server.use(express.json());

// server.route('/books/:userId')

// Skeleton For user registration
server.route('/api/register')
  .post((req, res) => {
    const schema = {
      name: Joi.string().min(2).required()
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      // Helps us retrieve the error message. We can collect multiple errors from the details array
      // and concatenate the errors to display them all to the user.
      res.status(400).send(result.error.details[0].message);
      return;
    }
  });

// Skeleton For user login


// Skeleton To delete a booking 
server.route('/api/booking/:id')
  .delete((req, res) => {
    /** Delete Logic Flow 
     *  1. Look for the item, if not existing, return 404 and exit route.
     *  2. If existing, delete the item
     *  3. Return the deleted item confirmation to user
     */

    // If booking is not found, return 404 and exit route. The "return" prevents
    // the rest of the route code from being run
    if (!booking) return res.status(404).send('The booking with the given ID was not found');
  });

// This is a route. Route's perform a specific task by calling our API.
// the /user route helps us retrieve all the users from our Cloud SQL and displays it onto a web page as JSON.
server.route('/user')
  .get(function (req, res, next) {
    connection.query(
      "SELECT * FROM `user`",
      function (error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  });

// Route to return a user based of the ID that is passed on from the front end
// This route will also provide the way we should implement SQL securely, effectively
// and efficiently.
server.route('/user/:id')
  .get(function (req, res, next) {
    const userID = req.params.id
    const query = "SELECT * FROM `user` where user_ID = ?"
    console.log("Fetching user with id: " + req.params.id)
    connection.query(query, [userID], (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    }
    );
  });

server.get('/status', (req, res) => res.send('Working!'));

// PORT is an environment (env) variable. Environment variables refers
// to the variable that the environment in which a process runs. 
// The value is set outside the environment.

// If the PORT for the environment is set then use "port" otherwise use 3000
const port = process.env.PORT || 3000;
// Port 8080 for Google App Engine
//server.set('port', process.env.PORT || 3000);
server.listen(port, () => console.log(`Listening on port ${port}...`))