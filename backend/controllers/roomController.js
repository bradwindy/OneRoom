const db = require('../database');

module.exports = {
    roomlist: async (req, res) => {
        const query = "SELECT * FROM `room`";
        db.query(query, (error, results, fields) => {
        if (error) throw error;
        res.json(results);
        });
    },

    byid: async (req, res) => {
        const query = "SELECT * FROM `room` where room_ID = ?"
        db.query(query, [userID], (error, results, fields) => {
        if (error) throw error;
        res.json(results);
      });
    }
    
 }