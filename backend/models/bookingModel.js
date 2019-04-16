const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create booking schema and reference booking schema within it.
const bookingSchema = new Schema({
    _bookingId: Schema.Types.ObjectId,
    user: { type: Schema.ObjectId, ref: 'User' },
    roomId: { type: Schema.ObjectId, ref: 'Room' },
    bookingStart: Date,
    bookingEnd: Date,
    startHour: Number,
    duration: Number
  })
// Create the model
const Booking = mongoose.model("booking", bookingSchema);

// Export the model
module.exports = Booking;