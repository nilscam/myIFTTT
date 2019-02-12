const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    _services: {
        _twitter: {
            id: Number,
            username: String,
            photo: String,
            token: String,
            token_secret: String,
            last_tweet: Schema.Types.Mixed,
            last_mention: Schema.Types.Mixed,
            last_tweet_hashtag: Schema.Types.Mixed,
            last_follower: Number,
            last_like: Number,
            _triggers: [Schema.Types.Mixed]
        },
        _instagram: {
            _triggers: [Schema.Types.Mixed]
        },
        _dateAndTime: {
            _triggers: [Schema.Types.Mixed]
        }
    }
});

const User = mongoose.model('user', userSchema);

module.exports.User = User;