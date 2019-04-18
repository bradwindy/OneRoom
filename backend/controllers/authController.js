const JWT = require('jsonwebtoken');
const User = require("../models/userModel");
const { JWT_SECRET } = require('../configuration');
const express = require('express');
const server = express();

signToken = user => {
  return JWT.sign({
    iss: 'Roomease',
    sub: user.id,
    iat: new Date().getTime(), //current time 
    exp: Math.floor(Date.now() / 1000) + (60 * 60) // Expires in 1 hour
  }, JWT_SECRET);
}

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
    //generate the token
    const token = signToken(newUser);
    // Respond with token
    res.status(200).json({ token });
  },

  signIn: async (req, res, next) => {
    // Need to generate a token which will allow authenticated user to access private resources
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {
    console.log('Access to secret resource!');
    res.json({ secret: "resource" });
  }
};
