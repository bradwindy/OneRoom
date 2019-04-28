const express = require('express');
const server = express();
const router = require('express-promise-router')();
const { authJWT } = require('../passport');
const RoomController = require('../controllers/roomController.js');

//Get list of rooms from the database
router.route('/all')
    .get(authJWT, RoomController.allRooms);

//Get room details based on room names
router.route('/:name')
    .get(authJWT, RoomController.roomDetail);

module.exports = router;