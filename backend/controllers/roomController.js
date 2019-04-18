//const db = require('../database');
const Room = require('../models/roomModel')
const express = require('express');
const server = express();

module.exports = {

    //GET list of all rooms from database and display it in JSON form
    allRooms: async (req, res) => {
        Room.find({}).then(function(rooms){
            res.send(rooms);
        });
        
    },

    //Find room details using the room name and display details from database in JSON
    byname: async (req, res) => {
      Room.findOne({name:req.params.name}, function(room){
        res.send(room)
      })   
    }
  };
    //GET room details using the room name and display details from database in JSON
    roomDetail: async (req, res) => {
      const name = req.params.name;
        Room.findOne({name}).then(function(room){
            res.send(room);
        });
    }
};
