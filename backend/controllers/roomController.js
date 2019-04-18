const db = require('../database');
const Room = require('../models/roomModel')

module.exports = {

    //Find list of all rooms from database and display it in JSON form
    roomlist: async (req, res) => {
        Room.find({}).then(function(rooms){
            res.send(rooms);
        });
        
    },

    //Find room details using the room name and display details from database in JSON
    byname: async (req, res) => {
        Room.findOne({req.params.name}).then(function(room){
            res.send(room);
        });
    }
};