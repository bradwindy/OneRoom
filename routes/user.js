const express = require('express');
const server = express();
const router = require('express-promise-router')();
const { authJWT } = require('../passport');
const UserController = require('../controllers/userController.js');

// Route to return all info about a certain user
router.route('/:username')
    .get(authJWT,UserController.userInfo);

module.exports = router;