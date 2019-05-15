const mocha = require('mocha');
const assert = require('assert');
const fs = require("fs");
const Room = require("../models/roomModel");

describe('Reading room details\n', () => {

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
                assert(room.name === "SnoopDoggyDogg");
                done();
            });   
            console.log(room.name);
        });
    });




