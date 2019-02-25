const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    _services: {
        _twitter: {
            _id: Number,
            _username: String,
            _photo: String,
            _token: String,
            _token_secret: String,
            _last_tweet: { type: String, default: '0' },
            _last_mention: { type: String, default: '0' },
            _last_tweet_hashtag: { type: String, default: '0' },
            _last_follower: { type: String, default: '0' },
            _last_like: { type: String, default: '0' },
            _triggers: [Schema.Types.Mixed]
        },
        _instagram: {
            _triggers: [Schema.Types.Mixed]
        },
        _dateAndTime: {
            _triggers: [Schema.Types.Mixed]
        },
        _nasa: {
            _last_title: { type: String, default: '0' },
            _last_url: { type: String, default: '0' },
            _triggers: [Schema.Types.Mixed]
        },
        _weather: {
            _last_tempBelowAct: { type: String, default: "0" },
            _last_tempAboveAct: { type: String, default: "0" },
            _last_humidityAboveAct: { type: String, default: "0" },
            _last_condChangesAct: { type: String, default: "0" },
            _location: { type: String, default: 'Marseille' },
            _triggers: [Schema.Types.Mixed]
        }
    }
});

const User = mongoose.model('user', userSchema);

module.exports.User = User;