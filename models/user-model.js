const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: String,
	googleID: String,
	accessTokenGoogle: String,
	services: { type: Schema.Types.ObjectId, ref: 'services' }
});

const meteoSchema = new Schema({
	isActive: Boolean,
	place: String,
	daysToAff: Number
});

const servicesSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'users' },
	meteo: meteoSchema,
});

const User = mongoose.model('user', userSchema);
const Services = mongoose.model('services', servicesSchema);

module.exports.User = User;
module.exports.Services = Services;