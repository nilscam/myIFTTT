const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: String,
    googleID: String,
    _services: {
        _twitter: {
            _triggers: [Schema.Types.Mixed]
        }
    }
});

const User = mongoose.model('user', userSchema);

module.exports.User = User;