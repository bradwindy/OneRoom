const express = require('express');
const server = express();
const router = express.Router();

const RoomController = require('../controllers/roomController.js');

//Get list of rooms from the database
router
    .route("/")
    .get(RoomController.roomlist);

router
    .route("/:name")
    .get(RoomController.byname);

module.exports = router;