const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const keys = require('./keys');

passport.use(
	new TwitterStrategy({
		consumerKey: keys.twitter.consumer_key,
		consumerSecret: keys.twitter.consumer_secret,
		callbackURL: "http://localhost:3000/auth/twitter/return",
		passReqToCallback: true
	},
	function(req, token, tokenSecret, profile, cb) {
        //console.log('Profile =' + JSON.stringify(profile, null, 2));
        console.log(token);
        console.log(profile.id);
        console.log(profile.username);
        console.log(profile.displayName);
        console.log(profile.photos[0].value);
        console.log(profile._json.description);
        console.log(profile._json.followers_count);
        console.log(profile._json.friends_count);
        console.log(profile._json.statuses_count);
        // console.log(profile);
        return cb(null, req.user);
	}));