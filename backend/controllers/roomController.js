<<<<<<< HEAD
const db = require('../database');
const Room = require('../models/roomModel')

=======
>>>>>>> e76ee2419139be9c1efdcae104fe57b5a5f36d2b
module.exports = {
  //Find list of all rooms from database and display it in JSON form
  roomlist: async (req, res) => {
    // const query = "SELECT * FROM `room`";
    // db.query(query, (error, results, fields) => {
    // if (error) throw error;
    // res.json(results);
    // });
  },

<<<<<<< HEAD
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
=======
  //Find room details using the room name and display details from database in JSON
  byname: async (req, res) => {
    // const roomname = req.params.name
    // const query = "SELECT * FROM `room` where room_name = ?"
    // console.log("Fetching user with id: " + req.params.name)
    // db.query(query, [roomname], (error, results, fields) => {
    // if (error) throw error;
    // res.json(results);
  }
};
>>>>>>> e76ee2419139be9c1efdcae104fe57b5a5f36d2b
