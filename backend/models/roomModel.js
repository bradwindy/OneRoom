const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create room schema and reference booking schema within it.
const roomSchema = new Schema({
    name: { type: String, index: true, required: true },
    capacity: { type: Number, required: true },
    facilities: {
      projector: { type: Boolean, default: false },
      tv: { type: Boolean, default: false },
      whiteboard: { type: Boolean, default: false }
    },
    bookings: [bookingSchema]
});

// Create the model
const Room = mongoose.model("room", roomSchema);

// Export the model
module.exports = Room;
