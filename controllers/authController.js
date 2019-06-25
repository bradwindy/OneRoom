const User = require("../models/userModel");

module.exports = {
  register: async (req, res) => {
    // Need to get user details from front end
    const { name, studentId, username, email, password } = req.body;
    // Check if there is an existing user with the same email
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(403).json({ error: "Email is already in use" });
    }

    // Create the new user object using the userModel schema
    const newUser = new User({ name, studentId, username, email, password });
    // Store the user into the database and wiat for this to finish before moving on
    await newUser.save();
    res.status(200).json({ success: "New user registered!" });
    //next();
  },

  // Template route to check if our JWT Token auth is working. Testing purposes only.
  secret: async (req, res) => {
    console.log('Access to secret resource!');
    res.json({ secret: "resource" });
  }
};
