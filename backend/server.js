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
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('./database');
// Encryption (Salting and Hashing for our passwords)
const bcrypt = require('bcrypt');
const saltRounds = 10;
// Authentication Packages
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MySQLStore = require('express-mysql-session')(session);

// Capital J as what is returned from this module is a class and classes need to be uppercase
// Joi helps us validate user input on the server side.
const Joi = require('joi');

// Allows our Express app/server to use JSON data
// https://stackoverflow.com/questions/10005939/how-do-i-consume-the-json-post-data-in-an-express-application
server.use(express.json());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: false
}));

// Allows our server to use cross origin requests. This allows us to test our backend and frontend simultaneously on localhost.
// https://github.com/axios/axios/issues/853
server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/** WIP CODE IGNORE */
/** This opens a session for the user and sends the session id back to the user as a cookie 
 *  @param secret helps set a SALT/HASH for our cookie. Usually a random a string.
 *  @param resave this determines whether or not a session should be updated if a user makes a change to the session (reloading a page).
 *  @param saveUninitialized sets a session and cookie for our user, each time a user visits the page.
 */
// server.use(session({
//   secret: 'avbeacjisuhwebfix', //usually generated using a random string generator
//   resave: false,
//   saveUninitialized: false, // we use this to check if a user has been authorised
//   //cookie: { secure: true }
// }));

// Initializing passport and making sure passport can integrate with our session
// server.use(passport.initialize());
// server.use(passport.session());

// passport.use(new LocalStrategy(
//   function (email, password, done) {
//     console.log(email);
//     console.log(password);
//     return done(null, 'test');
//   }
// ));

// // GET home page
// router.get('/', (req, res) => {
//   res.render('home');
// });

// User registration
server.route('/api/register')
  .post((req, res, next) => {
    const username = req.body.user.username;
    const studentid = req.body.user.studentid;
    const firstname = req.body.user.firstname;
    const lastname = req.body.user.lastname;
    const email = req.body.user.email;
    const password = req.body.user.password;

    // Checking if our JSON data passed from Axios (frontend) is recieved by our api in the backend.
    console.log(req.body.user.username);
    console.log(req.body.user.studentid);
    console.log(req.body.user.firstname);
    console.log(req.body.user.lastname);
    console.log(req.body.user.email);
    console.log(req.body.user.password);

    // Setting up a Joi Schema, which sets parameters for the user data and validates it
    const schema = Joi.object().keys({
      username: Joi.string().alphanum().min(7).max(9).required(),
      studentid: Joi.number().integer().min(100000).max(9999999).required(),
      firstname: Joi.string().min(2).required(),
      lastname: Joi.string().min(2).required(),
      email: Joi.string().email({
        minDomainAtoms: 4
      }).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    });
    /** Validating the incoming data against the above schema. 
     *  If the data is not in the required format, throw an error and display it in the backend 
     *  and send a 400 error to the frontend.
     */
    const result = Joi.validate(req.body.user, schema);
    // console.log(result)
    if (result.error) {
      // Helps us retrieve the error message. We can collect multiple errors from the details array
      // and concatenate the errors to display them all to the user.
      console.log(result.error.details[0].message);
      res.status(400).send(result.error.details[0].message);
      return;
    } else {
      /** Encrypt the password of the user using SALT and Hash
       *  Then store the user data into the database and throw any database errors to the server.
       *  Finally return the original front end data
       */
      bcrypt.hash(password, saltRounds, (err, hash) => {
        const query = "INSERT INTO `user` (username, student_ID, firstname, lastname, student_email, password) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(query, [username, studentid, firstname, lastname, email, hash], (error, results, fields) => {
          if (error) throw error;
          /** WIP CODE - IGNORE */
          // db.query("SELECT LAST_INSERT_ID() as user_ID", (error, results, fields) => {
          //   if (error) throw error;
          //   const user_ID = results[0];

          //   req.login(user_ID, function (err) {
          //     console.log(user_ID);
          return res.send(`The user ${username} has been registered and stored in the database.`);
          //if (!error) return res.send(`The user ${username} has been registered and stored in the database.`);
        })
      });
      // Sending a response back to the frontend to see if the data was passed correctly.
      //});
      //});
    }
  });

// passport.serializeUser(function (user_ID, done) {
//   done(null, user_ID);
// });

// passport.deserializeUser(function (user_ID, done) {
//   done(null, user_ID);
// });

// // User login
// server.route('/api/login')
//   .post(passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/'
//   }));


// Route to retrive room details from database and send it to frontend
server.route('/api/rooms')
  .get((req, res, next) => {
    const query = "SELECT * FROM `room`";
    db.query(query, (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    });
  });

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
    db.query(
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
    db.query(query, [userID], (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    });
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