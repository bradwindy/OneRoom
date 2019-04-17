const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create booking schema and reference room and user within it. 
// DO NOT MOVE THE BOOKING SCHEMA TO ANOTHER FILE. IT MESSES THE SYSTEM UP.
const bookingSchema = new Schema({
  _bookingId: Schema.Types.ObjectId,
  user: { type: Schema.ObjectId, ref: 'User' },
  roomId: { type: Schema.ObjectId, ref: 'Room' },
  bookingStart: Date,
  bookingEnd: Date,
  startHour: Number,
  duration: Number
});

// Create room schema and reference booking schema within it.
const roomSchema = new Schema({
    name: { type: String, index: true, required: true },
    capacity: { type: Number, required: true },
    facilities: {
      projector: { type: Boolean, default: false },
      tv: { type: Boolean, default: false },
      whiteboard: { type: Boolean, default: false }
    },
    bookings: [bookingSchema],
});


// Create the model
const Room = mongoose.model("room", roomSchema);


// Export the model
module.exports = Room;
