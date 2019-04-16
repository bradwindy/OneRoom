const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

// Create schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    required: true,
    unqiue: true
  },
  username: {
    type: String,
    required: true,
    unqiue: true
  },
  email: {
    type: String,
    required: true,
    unqiue: true,
    lowercase: true,
    index: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre("save", async function(next) {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Generating a password Hash along with SALT
    const passwordHash = await bcrypt.hash(this.password, salt);
    // Assign the hashed version of the password over the original plain text password
    this.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

// Create the model
const User = mongoose.model("user", userSchema);

// Export the model
module.exports = User;
