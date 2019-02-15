const passport = require('passport');
const AzureAdOAuth2Strategy = require('passport-azure-ad-oauth2');
const keys = require('./office365-keys');

passport.use(new AzureAdOAuth2Strategy({
    clientID: keys.office365.APP_ID,
    clientSecret: keys.office365.APP_PASSWORD,
    callbackURL: keys.office365.REDIRECT_URI,
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('OFFICE365:')
    console.log(accessToken);
//    console.log(refreshToken);
    console.log(profile);
    //User.findOrCreate({ instagramId: profile.id }, function (err, user) {
      console.log("EMPTY");
      console.log(done);
      done(null, accessToken);
  }
));