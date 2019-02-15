const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const keys = require('./facebook-keys');

passport.use(new FacebookStrategy({
    clientID: keys.facebook.APP_ID,
    clientSecret: keys.facebook.APP_PASSWORD,
    callbackURL: keys.facebook.REDIRECT_URI,
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    console.log(accessToken);
    done(null, profile);
  }
));