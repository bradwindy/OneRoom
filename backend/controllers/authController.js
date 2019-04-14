const db = require('../database');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    register: async (req, res, next) => {
        // Need to get user details
        console.log('authController.register() called!');
        const username = req.body.user.username;
        const studentid = req.body.user.studentid;
        const firstname = req.body.user.firstname;
        const lastname = req.body.user.lastname;
        const email = req.body.user.email;
        const password = req.body.user.password;

        // Checking if our JSON data passed from Axios (frontend) is recieved by our api in the backend.
        console.log(req.body.user.username);
        console.log(req.body.user.studentid);
        console.log(req.body.user.firstname);
        console.log(req.body.user.lastname);
        console.log(req.body.user.email);
        console.log(req.body.user.password);

        bcrypt.hash(password, saltRounds, (err, hash) => {
            const query = "INSERT INTO `user` (username, student_ID, firstname, lastname, student_email, password) VALUES (?, ?, ?, ?, ?, ?)";
            db.query(query, [username, studentid, firstname, lastname, email, hash], (error, results, fields) => {
                if (error) throw error;
                return res.send(`The user ${username} has been registered and stored in the database.`);
            });
        });
    },

    signIn: async (req, res, next) => {
        // Need to generate a token
        console.log('authController.signIn() called!');
    }
}