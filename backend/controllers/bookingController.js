const Room = require("../models/roomModel");
const express = require("express");
const server = express();
const moment = require('moment')

module.exports = {
   // GET - Get rooms that are available from database
   /** 
     * 1. GET all room documents and get their bookings
     * 2. Using the date and time passed from the user, loop through each booking for
     *    each room and return false if there is a clash for the given time and date.
     * 3. Put all rooms which have a true value into an array - these are the rooms which
     *    are availble for the time and date the user asked for.
     * 4. Send the array of available rooms back to the frontend.
     */
   available: async (req, res) => {
    Room.find({}).then(function(rooms) {
      res.send(rooms);

      //To check if room is available
      bookingSchema.path('bookingStart').validate(function(value){
        let roomId = this.roomId

        //Get new booking start and end times based on users parameters and convert into number value
        let newBookingStart = value.getTime()
        let newBookingEnd = value.getTime()

        //Function to check booking clashes
        let bookingClash = (existingBookingStart, existingBookingEnd, newBookingStart, newBookingEnd)=>{
          if (newBookingStart >= existingBookingStart && newBookingStart < existingBookingEnd || 
            existingBookingStart >= newBookingStart && existingBookingStart < newBookingEnd) {
            
              throw new Error(
                'Booking could not be saved, There is a clash with existing booking'
              )
            }
            return false
        }
        //Locate the room document containing bookings
        return Room.findById(roomId).then(room=>{
         
          //Loop through each existing booking and return false if there is a clash
          return room.bookings.every(booking=>{
            //Convert existing booking Date objects into number values
            let existingBookingStart = new Date(booking.bookingStart).getTime()
            let existingBookingEnd = new Date(booking.bookingEnd).getTime()
            
            //Check clash between new and existing booking
            return !bookingClash(
              existingBookingStart,
              existingBookingEnd,
              newBookingStart,
              newBookingEnd
            )
          })
        })
      })
    });
  },

  // POST - Make a new booking and store it in database
  new: async (req, res) => {
    Room.find({}).then(function(rooms) {
      res.send(rooms);
    });
  },

  // GET - Show deatils about a certain booking by accesing the database and retriving the details in JSON
  details: async (req, res) => {
    const name = req.params.name;
    Room.findOne({ name }).then(function(room) {
      res.send(room);
    });
  },

  /** PUT - Update Logic Flow
   *  1. Look for the item, if not existing, return 404 and exit route.
   *  2. If exisiting, validate the update using Joi and check that there are no time clashes.
   *  3. If validation fails, return 400 - bad request
   *  4. If validation passes, update the instance of the booking in database
   *  5. Return the updated booking confirmation back to user
   */
  edit: async (req, res) => {
    const name = req.params.name;
    Room.findOne({ name }).then(function(room) {
      res.send(room);
    });
  },

  /** DELETE - Delete Logic Flow
   *  1. Look for the item, if not existing, return 404 and exit route.
   *  2. If existing, delete the item
   *  3. Return the deleted item confirmation to user
   */

  // If booking is not found, return 404 and exit route. The "return" prevents
  // the rest of the route code from being run
  // if (!booking)
  // return res.status(404).send("The booking with the given ID was not found");

  delete: async (req, res) => {
    const name = req.params.name;
    Room.findOne({ name }).then(function(room) {
      res.send(room);
    });
  }
};
