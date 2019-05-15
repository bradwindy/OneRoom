const mocha = require('mocha');
const assert = require('assert');
const fs = require("fs");
const Room = require("../models/roomModel");

// Describe tests
describe('Creating room documents', function() {

    // Create tests
    it('creates 20 rooms', (done) => {
        this.timeout(10000);
        // const room = new Room ({
        //     "name": "G03",
        //     "capacity": "6",
        //     "facilities": {
        //         "projector": "true",
        //         "tv": "true",
        //         "whiteboard": "true"
        //     }
        // });
        // room.save()
        //     .then(() => {
        //     assert(!room.isNew);
        //     done();
        let roomData = fs.readFileSync("./rooms.json");
        let rooms = JSON.parse(roomData);
        Room.insertMany(rooms)
        .then(() => {
            assert(Room.count({}) === 20);
            done();
        });
    });

});