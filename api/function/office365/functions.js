const User = require('../../models/user-model').User;
const request = require('request-promise');

var office365Func = {
    postMail: function(req) {
        User.findOne({ _id: req.userData.userId }).then((value) => {
            
        });
    },
};

module.exports = office365Func;