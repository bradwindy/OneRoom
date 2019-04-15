const db = require('../database');

module.exports = {
    
    roominfo: async (req, res, next) => {
        const query = "SELECT * FROM `room`";
        db.query(query[room_name, capacity, projector, tv, whiteboard], (error, results, fields) => {
            if (error) throw error;
            return res.send(`The room ${room_name} has been displayed.`);
        })
    }
}