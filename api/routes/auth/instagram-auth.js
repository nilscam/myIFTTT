const passport = require('passport');
const InstagramStrategy = require('passport-instagram').Strategy;
const request = require('request')
const axios = require('axios');
var express = require('express');
var router = express.Router();
const keys = require('../../config/keys')
const User = require('../../models/user-model').User;
const mongoose = require('mongoose');
const checkAuth = require('../../middleware/check-auth');

passport.use(new InstagramStrategy({
    clientID: keys.instagramKey.clientID,
    clientSecret: keys.instagramKey.clientSecret,
    callbackURL: keys.instagramKey.callBackUrl
},
    function (req, accessToken, refreshToken, profile, done) {
        User.findOne({ _id: req.session.userId }).then((currentUser) => {
            if (currentUser) {
                currentUser._services._instagram._token = accessToken;
                currentUser._services._instagram._id = profile._json.data.id;
                currentUser._services._instagram._username = profile._json.data.username;
                currentUser._services._instagram._photo = profile._json.data.profile_picture
                currentUser.save();
            };
            done(null, {})
        })
    }));

router.get('/auth', checkAuth, function (req, res, next) {
    req.session.userId = req.userData.userId;
    next();
}, passport.authorize('instagram'));

router.get('/redirect',
    passport.authorize('instagram'),
    function (req, res) {
        res.redirect('/home');
    }
);

module.exports = router