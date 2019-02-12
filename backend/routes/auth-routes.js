const router = require('express').Router();
const passport = require('passport');

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

// auth login
router.get('/login', (req, res) => {
	res.render('login', {user: req.user});
});

// auth logout
router.get('/logout', (req, res) => {
	// handle with passport
	req.logout();
	res.redirect('/');
});

// auth with google
router.get('/google', passport.authenticate('google', {
	scope: ['profile']
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
	res.redirect('/profile/');
});

router.get('/twitter', passport.authorize('twitter'));

router.get('/twitter/return', passport.authorize('twitter'), (req, res) => {
	res.redirect('/profile');
});


module.exports = router;