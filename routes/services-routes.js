const router = require('express').Router();
const keys = require('../config/keys');
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
    res.send(JSON.stringify({ test: 1 }));
});

router.get('/weather', authCheck, (req, res) => {
	weather.find({search: req.user.services.meteo.place, degreeType: 'C'}, function(err, result) {
		if(err) console.log(err);
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify({
			res: result,
		}));
	});
});

router.get('/nasa', authCheck, (req, res) => {
	var nasaToSend = {
        res: null,
    };
	new Promise(function(resolve, reject) {
		request('https://api.nasa.gov/planetary/apod?api_key=' + keys.nasa.api_key, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
			nasaToSend.res = body;
			resolve('Success!');
		});
		}).then((value) => {
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify({
				nasa: nasaToSend,
			}));
		});
});

module.exports = router;