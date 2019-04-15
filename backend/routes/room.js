const express = require('express');
const server = express();
const router = require('express-promise-router')();

const { validateBody, schemas } = require('../helpers/routeHelpers'); // calling both things present in the helper file
const RoomController = require('../controllers/roomController');




module.exports = router;