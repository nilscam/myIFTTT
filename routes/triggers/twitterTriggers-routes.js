const router = require('express').Router();
const keys = require('../../config/keys');
const request = require('request');
const weather = require('weather-js');

const authCheck = (req, res, next) => {
	if (!req.user) {
		res.redirect('/auth/login');
	} else {
		next();
	}
};

router.get('/', authCheck, (req, res) => {
	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ Twitter: "OK" }));
});

module.exports = router;