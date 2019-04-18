const User = require("../models/userModel");
const express = require('express');
const server = express();

module.exports = {
  register: async (req, res, next) => {
    // Need to get user details from front end
    const { name, studentId, username, email, password } = req.body.user;
    // Check if there is an existing user with the same email
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(403).json({ error: "Email is already in use" });
    }
    // Checking if our JSON data passed from Axios (frontend) is recieved by our api in the backend.
    console.log(name);
    console.log(studentId);
    console.log(username);
    console.log(email);
    console.log(password);
    // Create the new user object using the userModel schema
    const newUser = new User({ name, studentId, username, email, password });
    // Store the user into the database and wiat for this to finish before moving on
    await newUser.save();
    next();
  },

  secret: async (req, res, next) => {
    console.log('Access to secret resource!');
    res.json({ secret: "resource" });
  }
};
