const db = require('../database');

module.exports = {
    roomlist: async (req, res) => {
        const query = "SELECT * FROM `room`";
        db.query(query, (error, results, fields) => {
        if (error) throw error;
        res.json(results);
        });
    },

    byname: async (req, res) => {
        const roomname = req.params.name
        const query = "SELECT * FROM `room` where room_name = ?"
        console.log("Fetching user with id: " + req.params.name)
        db.query(query, [roomname], (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    });
    }
    
 }