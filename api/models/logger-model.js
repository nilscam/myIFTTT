const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loggerSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    logs: [
        {
            title: { type: String, default: "" },
            date: { type: Number, default: 0 },
            applet_message: { type: String, default: "" },
            extra_message: { type: String, default: "" },
            trigger: Schema.Types.Mixed,
        }
    ]
});

const Logger = mongoose.model('logger', loggerSchema);

module.exports.Logger = Logger;