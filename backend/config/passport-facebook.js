const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const keys = require('./keys');

passport.use(new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: keys.facebook.callbackURL,
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    console.log(accessToken);
    done(null, profile);
  }
));
