const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');

// passport.use(
//     new GoogleStrategy({
//         // options for the google strat
//         callbackURL: '/auth/google/redirect',
//         clientID: keys.google.clientID,
//         clientSecret: keys.google.clientSecret
//     }, (accessToken, refreshToken, profile, done) => {
//         // passport callback function
//         var user = {
//             username: profile.displayName,
//             authId: profile.id,
//         }
//         done(null, user);
//     })
// )
