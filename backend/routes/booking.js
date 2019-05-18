const express = require('express');
const server = express();
const router = require('express-promise-router')();
const { authJWT } = require('../passport');
const { validateBody, schemas } = require('../helpers/routeHelpers'); // calling both things present in the helper file
const BookingController = require('../controllers/bookingController.js');

// GET all available rooms for user
router.route('/available')
    .get(BookingController.available);

// PUT a booking - Make a booking
router.route('/newBooking/:id')
    .put(BookingController.new);

// GET details about a booking
router.route('/showBooking')
    .get(BookingController.details);

// PUT - Update a booking
router.route('/editBooking')
    .put(BookingController.edit);
    /** Update Logic Flows
     *  1. Look for the item, if not existing, return 404 and exit route.
     *  2. If exisiting, validate the update using Joi and check that there are no time clashes.
     *  3. If validation fails, return 400 - bad request
     *  4. If validation passes, update the instance of the booking in database
     *  5. Return the updated booking confirmation back to user
     */
// PUT - Update a booking
router.route('/editBooking')
    .put(BookingController.edit);

// DELETE a booking
router.route('/deleteBooking/:roomId/:bookingId')
    .delete(BookingController.delete);
    /** Delete Logic Flow
     *  1. Look for the item, if not existing, return 404 and exit route.
     *  2. If existing, delete the item
     *  3. Return the deleted item confirmation to user
     */
  
    // If booking is not found, return 404 and exit route. The "return" prevents
    // the rest of the route code from being run
    // if (!booking)
    // return res.status(404).send("The booking with the given ID was not found");
  
module.exports = router;