const User = require('../models/userModel');

module.exports = {

    //GET details about a certain user from databased and display it in JSON form
    userInfo: async (req, res) => {
        const username = req.params.username;
        User.findOne({username}).then(function(userDetails){
            res.send(userDetails);
        });
    }
};
