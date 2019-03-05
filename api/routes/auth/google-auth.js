var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var express = require('express');
var router = express.Router();
const keys = require('../../config/authKeys.js').google
const User = require('../../models/user-model').User;
const mongoose = require('mongoose');

passport.use(new GoogleStrategy({
    clientID: keys.clientID,
    clientSecret: keys.clientSecret,
    callbackURL: '/api/user/google/redirect'
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOne({provider_id: profile.id, provider: 'google'}).then((currentUser) => {
    //   if (currentUser)
    //      login
    //   else
    //      create
    // }
     console.log('new user');
     console.log(accessToken);
     console.log(profile);
     var user = {
         username: profile.displayName,
         authId: profile.id,
     }
     console.log(user);
     done(null, user);
  }
));

// GET /api/user/google/auth
router.get('/auth', passport.authenticate('google', { scope: ['profile'] }));

router.get('/redirect', passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('here');
    res.redirect('/home');
  }
);

module.exports = router;
