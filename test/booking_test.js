const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chai = require("chai");
const Room = require("../models/roomModel");
const BookingController = require("../controllers/bookingController.js");
const expect = chai.expect;
// Create a new schema that accepts a 'name' object.
// 'name' is a required field
// const testSchema = new Schema({
//   name: { type: String, required: true }
// });
//Create a new collection called 'Name'
// const Name = mongoose.model('Name', testSchema);
describe("Database Tests", function() {
  //Before starting the test, create a sandboxed database connection
  //Once a connection is established invoke done()
  before(function(done) {
    mongoose.connect(
      "mongodb://localhost/RoomEaseTest",
      { useCreateIndex: true, useNewUrlParser: true },
      function() {}
    );
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error"));
    db.once("open", function() {
      console.log("We are connected to test database!");
      done();
    });
  });
  describe("Test Room Database", function() {
    it("New room saved to test database", function(done) {
      const room = new Room({
        name: "G03",
        capacity: "6",
        facilities: {
          projector: "true",
          tv: "true",
          whiteboard: "true"
        }
      });
      room.save(done);
    });
    it("Dont save incorrect room format to database", function(done) {
      //Attempt to save with wrong info. An error should trigger
      const wrongRoom = new Room({
        ndqaame: "G03",
        capacit32134y: "6"
      });
      wrongRoom.save(err => {
        if (err) {
          return done();
        }
        throw new Error("Should generate error!");
      });
    });
    it("Should retrieve the previously saved room from test database", function(done) {
      Room.find({ name: "G03" }, (err, name) => {
        if (err) {
          throw err;
        }
        if (name.length === 0) {
          throw new Error("No data!");
        }
        done();
      });
    });
    it("New booking saved to database", function(done) {
        setTimeout(done, 30000);
      let req = {
          body: {
            endTime: "2019-05-09T03:00:00.000Z",
            startTime: "2019-05-09T01:00:00.000Z",
            duration: 2,
            bookingName: "Test Bookinngggs",
            roomId: "5cdc23e9c2cc2cb38ac545e5",
            startHour: 11,
            user: "5cb83f4d871bc0bb0662d944"
          }
      };

    //   let res = {
    //       room: [],
    //       status: ''
    //   };

      BookingController.new(req)
      done();
      if(err)
      throw err;
        });
      });
    });
  //After all tests are finished drop database and close connection
//   after(function(done) {
//     mongoose.connection.db.dropDatabase(function() {
//       mongoose.connection.close(done);
//     });
//   });
