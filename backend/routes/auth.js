const express = require('express');
const server = express();
const router = require('express-promise-router')();

const { validateBody, schemas } = require('../helpers/routeHelpers'); // calling both things present in the helper file
const AuthController = require('../controllers/authController');

/** User Registeration 
 *  1. The client makes a post request to the /register route.
 *  2. The validateBody() is called and we check if the incoming data is correct.
 *  3. Then, the AuthController.register will have access to all the data and will store the data into the database.
*/
router.route('/register')
.post(validateBody(schemas.registerSchema), AuthController.register);

// User Sign in
router.route('/signIn')
.post(AuthController.signIn);

module.exports = router;