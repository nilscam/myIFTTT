const router = require('express').Router();
const keys = require('../config/keys');
const Services = require('../models/user-model').Services;

const authCheck = (req, res, next) => {
	if (!req.user) {
		res.redirect('/auth/login');
	} else {
		next();
	}
};

router.get('/', authCheck, (req, res) => {
	res.render('profile', {user: req.user});
});

router.get('/weather', authCheck, (req, res) => {
    Services.findOne({user: req.user._id}).then((currentService) => {
		if (currentService) {
			currentService.meteo.place = req.query.place;
			currentService.save();
        }
        res.send('Ok');
	});
});

module.exports = router;