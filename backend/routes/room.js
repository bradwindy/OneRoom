const express = require('express');
const server = express();
const router = require('express-promise-router')();
const { authJWT } = require('../passport');
const RoomController = require('../controllers/roomController.js');
const BookingController = require('../controllers/bookingController.js');

//Get list of rooms from the database
router.route('/all')
    .get(authJWT, RoomController.allRooms);

//Get list of available rooms from the database
router.route('/available')
    .get(authJWT, RoomController.available);

//Get room details based on room names
router.route('/:name')
    .get(authJWT, RoomController.roomDetail);

module.exports = router;