const mocha = require('mocha');
const assert = require('assert');
const fs = require("fs");
const Room = require("../models/roomModel");



describe('Reading room details', () => {

    it('finds room with the name of SnoopDoggyDogg', (done) => {


        const room = new Room({
            "name": "SnoopDoggyDogg",
            "capacity": "100",
            "facilities": {
                "projector": "true",
                "tv": "true",
                "whiteboard": "true"
            }
        });
        room.save()
            .then(() => {
                //console.log(room.name);
                assert(room.name === "SnoopDoggyDogg");
                console.log(room.name);
                done();
            });
        });
    });




