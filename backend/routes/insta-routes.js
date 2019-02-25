const router = require('express').Router();
const passport = require('passport');

//https://www.instagram.com/oauth/authorize/?client_id=228cd009e7284b4ab7a8e6154d001340&redirect_uri=http://localhost:8080/auth/instagram/callback&response_type=code

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

router.get('/authorize_user',
  passport.authenticate('instagram'),
  function (req, res) {
    console.log(req.user.accessToken);
    console.log(req.user.profile.id);
    console.log(req.user.profile.username);
    console.log(req.user.profile._json['data'].profile_picture);
    res.send('ok');
    // The request will be redirected to Instagram for authentication, so this
    // function will not be called.
  });

router.get('/login', function (request, response) {
  response.redirect(config.instagram.auth_url);
});

module.exports = router;