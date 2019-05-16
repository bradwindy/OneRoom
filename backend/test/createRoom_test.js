// const mocha = require("mocha");
// const assert = require("assert");
// const fs = require("fs");
// const Room = require("../models/roomModel");

// // Describe tests
// describe("Creating room documents", function() {
//     this.timeout(40000);
//   // Create tests
//   it("creates 20 rooms", done => {
//     // const room = new Room ({
//     //     "name": "G03",
//     //     "capacity": "6",
//     //     "facilities": {
//     //         "projector": "true",
//     //         "tv": "true",
//     //         "whiteboard": "true"
//     //     }
//     // });
//     // room.save()
//     //     .then(() => {
//     //     assert(!room.isNew);
//     //     done();
//     let roomData = fs.readFileSync("./rooms.json");
//     let rooms = JSON.parse(roomData);
//     Room.insertMany(rooms).then(() => {
//       console.log(room.name);
//       assert(room[0].name === "G01") ;
//       done();
//     });
//   });
// });
