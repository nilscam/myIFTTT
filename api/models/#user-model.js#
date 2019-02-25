const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    _services: {
        _twitter: {
            _triggers: [Schema.Types.Mixed]
        },
        _dateAndTime: {
            _triggers: [Schema.Types.Mixed]
        }
    }
});

const User = mongoose.model('user', userSchema);

module.exports.User = User;