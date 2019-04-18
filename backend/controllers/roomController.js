//const db = require('../database');
const Room = require('../models/roomModel')
const express = require('express');
const server = express();

module.exports = {
  //Find list of all rooms from database and display it in JSON form
  roomlist: async (req, res) => {
    // const query = "SELECT * FROM `room`";
    // db.query(query, (error, results, fields) => {
    // if (error) throw error;
    // res.json(results);
    // });
  },

    //Find list of all rooms from database and display it in JSON form
    roomlist: async (req, res) => {
        Room.find({}).then(function(rooms){
            res.send(rooms);
        });
        
    },

    //Find room details using the room name and display details from database in JSON
    byname: async (req, res) => {
      Room.findOne({name:req.params.name}, function(err, room){
        res.send(room)
      })   
    }
  };