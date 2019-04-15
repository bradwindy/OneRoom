const express = require('express');
const server = express();
const router = require('express-promise-router')();

const RoomController = require('../controllers/roomController');

//Display room information

router.route('/room')
.get(RoomController.roominfo)

module.exports = router;