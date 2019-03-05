const passport = require('passport');
const InstagramStrategy = require('passport-instagram');
const keys = require('./keys');

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

router.post('/instagram', checkAuth, (req, res) => {
    User.findOne({_id: req.userData.userId}).then((currentUser) => {
        if (currentUser) {
            currentUser._services._instagram._token = req.body.token;
            request({
                url: 'https://api.instagram.com/v1/users/self/?access_token=' + req.body.token,
            }, function (error, response, body) {
                if (error || response.statusCode !== 200) {
                    res.status(500).send({error: "Bad credential"});
                } else {
                    currentUser._services._instagram._id = body.data.id;
                    currentUser._services._instagram._username = body.data.username;
                    currentUser._services._instagram._photo = body.data.profile_picture;
                    currentUser.save();
                    res.status(200).send({error: null});
                };
            })
        } else {
            res.status(500).send({error: "User not found"});
        }
    });
});