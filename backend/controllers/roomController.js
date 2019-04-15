const db = require('../database');

module.exports = {
    roomlist: async (req, res) => {
        res
        .status(200)
        .send("This is our room list from controller");
    },

    byid: async (req, res) => {
        res 
        .status(200)
        .send("This is a single room based on id")
    }
    
 }