const passport = require('passport');
const InstagramStrategy = require('passport-instagram');
const keys = require('./insta-keys');

passport.use(new InstagramStrategy({
    clientID: keys.instagramKey.clientID,
    clientSecret: keys.instagramKey.clientSecret,
    callbackURL: keys.instagramKey.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('INSTA:')
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    //User.findOrCreate({ instagramId: profile.id }, function (err, user) {
      console.log("EMPTY");
      console.log(done);
  }
));