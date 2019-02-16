const router = require('express').Router();
const passport = require('passport');

//https://www.instagram.com/oauth/authorize/?client_id=228cd009e7284b4ab7a8e6154d001340&redirect_uri=http://localhost:8080/auth/instagram/callback&response_type=code

/*router.get('/authorize_user',
  passport.authenticate('instagram'),
  function (req, res) {
    console.log(res.query.code);
    res.send(res.query.code);
    // The request will be redirected to Instagram for authentication, so this
    // function will not be called.
  });

router.get('/login', function (request, response) {
  response.redirect(config.instagram.auth_url);
});
*/

router.get('/auth/azureadoauth2',
  passport.authenticate('azure_ad_oauth2'));

router.get('/authorize_user', 
  passport.authenticate('azure_ad_oauth2', { failureRedirect: '/login' }),
  function (req, res) {

    // Successful authentication, redirect home.
    res.send(res.query.code);
    res.redirect('/');
  });

module.exports = router;