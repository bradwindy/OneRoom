const JWT = require('jsonwebtoken');
const db = require("../database");
const User = require("../models/userModel");

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
   
    //res.json({ user: 'created' });

    //takes an object (payload) & takes a secret (String) 
    const token = JWT.sign({
      iss: 'RoomEase',
      sub: newUser.id,
      iat: new Date().getTime(), //current time 
      exp: new Data().setDate(new Date().getDate() + 1) // current time + 1 day ahead for expiration
    }, 'roomeaseauthentication');
    console.log(token);
    // Respond with token
    res.status(200).json({ token });

    // bcrypt.hash(password, saltRounds, (err, hash) => {
    //     const query = "INSERT INTO `user` (username, student_ID, firstname, lastname, student_email, password) VALUES (?, ?, ?, ?, ?, ?)";
    //     db.query(query, [username, studentid, firstname, lastname, email, hash], (error, results, fields) => {
    //         if (error) throw error;
    //         return res.send(`The user ${username} has been registered and stored in the database.`);
    //     });
    // });
  },

  signIn: async (req, res, next) => {
    // Need to generate a token
    console.log("authController.signIn() called!");
  }
};
