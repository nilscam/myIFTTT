const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const request = require('request')
const axios = require('axios');
var express = require('express');
var router = express.Router();
const keys = require('../../config/keys')
const User = require('../../models/user-model').User;
const mongoose = require('mongoose');
const checkAuth = require('../../middleware/check-auth');

passport.use(
	new TwitterStrategy({
		consumerKey: keys.twitter.consumer_key,
		consumerSecret: keys.twitter.consumer_secret,
		callbackURL: '/api/user/twitter/redirect',
		passReqToCallback: true
	},
	function(req, token, tokenSecret, profile, cb) {
        User.findOne({_id: req.session.userId}).then((currentUser) => {
            if (currentUser) {
                currentUser._services._twitter._token = token;
                currentUser._services._twitter._token_secret = token_secret;
                currentUser._services._twitter._id = profile.id_str;
                currentUser._services._twitter._username = profile.screen_name;
                currentUser._services._twitter._photo = profile.profile_image_url;
                currentUser.save();
                return cb(null, {});
            } else {
                return cb(null, {});
            }
        });
    }));

router.get('/auth', checkAuth, function(req, res, next) {
    req.session.userId = req.userData.userId;
    next();
 }, passport.authorize('twitter'));

router.get('/redirect',
    passport.authorize('twitter'),
    function(req, res) {
      res.redirect('/home');
    }
);

module.exports = router;