const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    provider: { type: String, default: "" }, // google - facebook - empty for user created via registration form
    provider_id: { type: String, default: "" },
    email: String,
    password: String,
    _services: {
        _twitter: {
            _id: { type: Number, default: 0 },
            _username: { type: String, default: '0' },
            _photo: { type: String, default: '0' },
            _token: { type: String, default: '0' },
            _token_secret: { type: String, default: '0' },
            _last_tweet: { type: String, default: '0' },
            _last_mention: { type: String, default: '0' },
            _last_tweet_hashtag: { type: String, default: '0' },
            _last_follower: { type: String, default: '0' },
            _last_like: { type: String, default: '0' },
            _triggers: [Schema.Types.Mixed]
        },
        _instagram: {
            _id: Number,
            _username: String,
            _photo: String,
            _token: String,
            _last_type: { type: String, default: '0' },
            _last_id: { type: String, default: '0' },
            _last_url: { type: String, default: '0' },
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
        _mailer: {
            _triggers: [Schema.Types.Mixed],
        },
        _weather: {
            _last_tempBelowAct: { type: String, default: "0" },
            _last_tempAboveAct: { type: String, default: "0" },
            _last_humidityAboveAct: { type: String, default: "0" },
            _last_condChangesAct: { type: String, default: "0" },
            _location: { type: String, default: 'Marseille' },
            _triggers: [Schema.Types.Mixed]
        },
        _newYorkTimes: {
            _section: { type: String, default: "0" },
            _theme: { type: String, default: "0" },
            _title: { type: String, default: "0" },
            _byline: { type: String, default: "0" },
            _item_type: { type: String, default: "0" },
            _date: { type: String, default: "0" },
            _description: { type: String, default: "0" },
            _multimedia: { type: String, default: "0" },
            _triggers: [Schema.Types.Mixed]
        },
        _cryptocurrency: {
            _convert: { type: String, default: "0" },
            _crypto_name: { type: String, default: "0" },            
            _target_value: { type: String, default: "0" },
            _current_value: { type: String, default: "0" },
            _triggers: [Schema.Types.Mixed]
        }
    }
});

const User = mongoose.model('user', userSchema);

module.exports.User = User;
