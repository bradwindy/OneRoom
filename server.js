/** Main backend file
 *  Launches server, database and installs middleware for processing data. */

const express = require("express");
const server = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Room = require("./models/roomModel");
const auth = require("./passport");
const path = require('path');
/** Connecting to local instance of MongoDB
 *  If connection is successful, check if the old room collection is present and delete it.
 *  Then insert, Mock room data is automatically created in database.
 *  Otherwise, error will be printed in console.
 *  https://github.com/Automattic/mongoose/issues/4135
 *  https://stackoverflow.com/questions/54587040/import-external-json-file-to-mongodb-using-nodejs-and-mongoose
 */
mongoose
  .connect(
      "mongodb://oneroom:oneroom1@ds247170.mlab.com:47170/heroku_3dj35s4s",
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

/** Middleware */
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
server.use(auth.initialize);

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
server.use("/user", require("./routes/user"));
server.use("/booking", require("./routes/booking"));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static
    server.use(express.static('app/build'));
    server.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'app', 'build', 'index.html'));
    });
}

/** Server Information
*   PORT is an environment (env) variable. Environment variables refers
*   to the variable that the environment in which a process runs.
*   The value is set outside the environment. */

// If the PORT for the environment is set then use "port" otherwise use 5000
const port = process.env.PORT || 5000;
// Port 8080 for Google App Engine
//server.set('port', process.env.PORT || 5000);
server.listen(port, () => console.log(`Listening on port ${port}...`));
