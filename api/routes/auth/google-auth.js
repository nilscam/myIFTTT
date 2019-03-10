var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var express = require('express');
var router = express.Router();
const authKeys = require('../../config/authKeys.js').google
const keys = require('../../config/keys');
const User = require('../../models/user-model').User;
const Logger = require('../../models/logger-model').Logger;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

passport.use(new GoogleStrategy({
    clientID: authKeys.clientID,
    clientSecret: authKeys.clientSecret,
    callbackURL: '/api/user/google/redirect'
  },
  function(accessToken, refreshToken, profile, done) {
     console.log('new user');
     console.log(profile);
     console.log(profile.emails[0].value);
     var user = {
       email: profile.emails[0].value,
       username: profile.displayName,
       authId: profile.id,
     }
     console.log(user);
     done(null, user);
  }
));

// GET /api/user/google/auth
router.get('/auth', passport.authenticate('google', { scope: ['profile', 'https://www.googleapis.com/auth/userinfo.email'] }));

router.get('/redirect', passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    var email = req.user.email
    var profile_id = req.user.authId
    User.findOne({provider_id: profile_id, provider: 'google'}).then((currentUser) => {
      console.log('there');
      if (currentUser) {
        const token = jwt.sign({
            email: currentUser.email,
            userId: currentUser._id,
        }, keys.jwtSecret, {
            expiresIn: "10d"
        });
        console.log('success 1');
        res.redirect('/google/success?token=' + token);
      } else {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email,
            provider: 'google',
            provider_id: profile_id
        });
        user.save()
        .then(result => {
            const token = jwt.sign({
                email: user.email,
                userId: user._id,
            }, keys.jwtSecret, {
                expiresIn: "10d"
            });
            const logger = new Logger({
                _id: user._id
            })
            logger.save().then(result => {
                console.log('success 2');
                res.redirect('/google/success?token=' + token);
            })
            // res.status(201).json({
            //     message: 'User created',
            //     token: token
            // });
        })
        .catch(err => {
          res.status(500).json({
              error: err
          })
        });
      }
    })
    .catch(err => {res.redirect('/')})
  }
);

module.exports = router;
