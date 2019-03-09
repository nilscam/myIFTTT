const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const request = require('request')
const axios = require('axios');
var express = require('express');
var router = express.Router();
const keys = require('../../config/keys')
const User = require('../../models/user-model').User;
const mongoose = require('mongoose');
const serviceAuth = require('../../middleware/services-auth');

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
        currentUser._services._twitter._token_secret = tokenSecret;
        currentUser._services._twitter._id = profile.id;
        currentUser._services._twitter._username = profile.username;
        currentUser._services._twitter._photo = profile.photos[0].value;
        currentUser.save();
        return cb(null, {});
      } else {
      	return cb(null, {});
      }
    });
  }));

router.get('/auth', serviceAuth,function(req, res, next) {
    req.session.userId = req.userData.userId;
    next();
 }, passport.authorize('twitter'));

router.get('/redirect',
    passport.authorize('twitter'),
    function(req, res) {
      res.redirect('/profile');
    }
);

module.exports = router;
