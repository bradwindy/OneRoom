const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const userSchema = new Schema({
    name: String,
    studentId: Number,
    username: String,
    email: {
        type: String,
        index: true
    },
    password: String
});

// Create the model
const User = mongoose.model('user', userSchema)

// Export the model
module.exports = User;