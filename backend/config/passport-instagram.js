const passport = require('passport');
const InstagramStrategy = require('passport-instagram');
const keys = require('./insta-keys');

passport.use(new InstagramStrategy({
    clientID: keys.instagramKey.clientID,
    clientSecret: keys.instagramKey.clientSecret,
    callbackURL: keys.instagramKey.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    //User.findOrCreate({ instagramId: profile.id }, function (err, user) {
      var user = {
        profile: profile,
        accessToken: accessToken
      }
      done(null, user);
  }
));