const router = require('express').Router();
const passport = require('passport');

router.get('/authorize_user',  
  passport.authenticate('facebook', {
    scope: ['publish_actions', 'manage_pages']
  }
));

router.get('/authorize_user',
  passport.authenticate('facebook', { 
    successRedirect: '/',
    failureRedirect: '/login'
  }));

module.exports = router;