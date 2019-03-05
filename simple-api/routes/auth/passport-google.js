var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var express = require('express');
var router = express.Router();

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.

const keys = {
  clientID: '34526951253-nms32bsim1367e4p8nn9ls7236d4om7m.apps.googleusercontent.com',
  clientSecret: 'D4TsVpBvI7CDpG0Hz_KilNQp'
}

passport.use(new GoogleStrategy({
    clientID: keys.clientID,
    clientSecret: keys.clientSecret,
    callbackURL: "/users/google/redirect"
  },
  function(accessToken, refreshToken, profile, done) {
     // User.findOrCreate({ googleId: profile.id }, function (err, user) {
     //   return done(err, user);
     // });
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

router.get('/auth',
  passport.authenticate('google', { scope: ['profile'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/redirect', passport.authenticate('google', { failureRedirect: '/users/failure' }),
  function(req, res) {
    console.log('here');
    res.redirect('/users/success');
  }
);

module.exports = router;
