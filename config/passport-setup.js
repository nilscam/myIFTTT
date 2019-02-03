const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model').User;
const Services = require('../models/user-model').Services;

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).populate('services').then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy({
		// options for the google strat
		callbackURL: '/auth/google/redirect',
		clientID: keys.google.clientID,
		clientSecret: keys.google.clientSecret
	}, (accessToken, refreshToken, profile, done) => {
		// passport callback function
		User.findOne({googleID: profile.id}).exec((err, currentUser) => {
            if (err) return handleError(err);
			if (currentUser) {
				done(null, currentUser);
			} else {
				
				var user = new User({
					username: profile.displayName,
                    googleID: profile.id,
                    // services: {

                    // }
                });
				user.save(function (err) {
                    if (err) console.log(err);
                    done(null, user);
					// var services = new Services({
					// 	user: user,
					// 	timer: 1,
					// 	meteo: {
					// 		isActive: false,
					// 		place: "Marseille, France",
					// 		daysToAff: 5,
					// 	},
					// });
					// services.save((err) => {
					// 	user.services = services;
					// 	user.save().then((newUser) => {
					// 		done(null, newUser);
					// 	});
					// });
				});
			}
		});
	})
)