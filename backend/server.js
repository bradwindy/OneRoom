// Just trying out Express.js
// Express see’s that we have a GET request hitting our route, runs the query against our
// Google SQL database and returns the result as JSON. We can now consume this API in our
// mobile app, our web app, or wherever we want!

// As we add more complexity to add a user, query a room, make a booking etc. Our API will
// get a lot bigger. So We will store/organise all our routes into a "routes" directory.
// Similarly, we will have a "controllers" directory which will store all our MySQL query logic.

require("dotenv").config();

const express = require("express");
const server = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const morgan = require("morgan");
//const db = require('./database');
const mongoose = require("mongoose");
const Room = require("./models/roomModel");

/** Connecting to local instance of MongoDB
 *  If connection is successful, check if the old room collection is present and delete it.
 *  Then insert, Mock room data is automatically created in database.
 *  Otherwise, error will be printed in console.
 *  https://github.com/Automattic/mongoose/issues/4135
 *  https://stackoverflow.com/questions/54587040/import-external-json-file-to-mongodb-using-nodejs-and-mongoose
 */
mongoose
  .connect(
    "mongodb://localhost/Roomease",
    { useCreateIndex: true, useNewUrlParser: true },
    function() {
      /* dummy function */
    }
  )
  .then(() => {
    mongoose.connection.db
      .listCollections({ name: "rooms" })
      .next(function(err) {
        if (!err) {
          Room.deleteMany({}, function(err) {
            return console.log("Older collections removed.");
          });
        }
        let roomData = fs.readFileSync("./rooms.json");
        let rooms = JSON.parse(roomData);
        Room.insertMany(rooms);
        return console.log("Database is ready for use.");
      });
  })
  .catch(err => {
    // mongoose connection error will be handled here
    console.error("Error starting database", err.stack);
    process.exit(1);
  });

/** Middlewares */
server.use(morgan("dev"));

// Allows our Express app/server to use JSON data
// https://stackoverflow.com/questions/10005939/how-do-i-consume-the-json-post-data-in-an-express-application
server.use(express.json());
server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Allows our server to use cross origin requests. This allows us to test our backend and frontend simultaneously on localhost.
// https://github.com/axios/axios/issues/853
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/** Routes */
server.use("/auth", require("./routes/auth"));
server.use("/room", require("./routes/room"));

// Route to retrive room details from database and send it to frontend
server.route("/api/rooms").get((req, res, next) => {
  const query = "SELECT * FROM `room`";
  db.query(query, (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

// Skeleton To delete a booking
server.route("/api/booking/:id").delete((req, res) => {
  /** Delete Logic Flow
   *  1. Look for the item, if not existing, return 404 and exit route.
   *  2. If existing, delete the item
   *  3. Return the deleted item confirmation to user
   */

  // If booking is not found, return 404 and exit route. The "return" prevents
  // the rest of the route code from being run
  if (!booking)
    return res.status(404).send("The booking with the given ID was not found");
});

// This is a route. Route's perform a specific task by calling our API.
// the /user route helps us retrieve all the users from our Cloud SQL and displays it onto a web page as JSON.
server.route("/user").get(function(req, res, next) {
  db.query("SELECT * FROM `user`", function(error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

// Route to return a user based of the ID that is passed on from the front end
// This route will also provide the way we should implement SQL securely, effectively
// and efficiently.
server.route("/user/:id").get(function(req, res, next) {
  const userID = req.params.id;
  const query = "SELECT * FROM `user` where user_ID = ?";
  console.log("Fetching user with id: " + req.params.id);
  db.query(query, [userID], (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

server.get("/status", (req, res) => res.send("Working!"));

/** Server Information */

// PORT is an environment (env) variable. Environment variables refers
// to the variable that the environment in which a process runs.
// The value is set outside the environment.

// If the PORT for the environment is set then use "port" otherwise use 3000
const port = process.env.PORT || 3000;
// Port 8080 for Google App Engine
//server.set('port', process.env.PORT || 3000);
server.listen(port, () => console.log(`Listening on port ${port}...`));
