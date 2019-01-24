const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const keys = require('./keys');
const User = require('../models/user-model').User;
const Services = require('../models/user-model').Services;

passport.use(
	new TwitterStrategy({
		consumerKey: keys.twitter.consumer_key,
		consumerSecret: keys.twitter.consumer_secret,
		callbackURL: "http://localhost:8080/auth/twitter/return",
		passReqToCallback: true
	},
	function(req, token, tokenSecret, profile, cb) {
		//console.log('Profile =' + JSON.stringify(profile, null, 2));
		if (!req.user) {
			// Not logged-in. Authenticate based on Twitter account.
		  } else {
			Services.findOne({user: req.user._id}).then((currentService) => {
				if (currentService) {
					currentService.twitter.twitterInfo.id = profile.id;
					currentService.twitter.twitterInfo.username = profile.username;
					currentService.twitter.twitterInfo.displayName = profile.displayName;
					currentService.twitter.twitterInfo.photo = profile.photos[0].value;
					currentService.twitter.twitterInfo.description = profile._json.description;
					currentService.twitter.twitterInfo.followersCount = profile._json.followers_count;
					currentService.twitter.twitterInfo.friendsCount = profile._json.friends_count;
					currentService.twitter.twitterInfo.statusesCount = profile._json.statuses_count;
					currentService.save();
				}
			});
			return cb(null, req.user);
		}
		//console.log('Profile =' + JSON.stringify(profile));
		return cb(null, profile);
	}));
