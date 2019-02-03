const router = require('express').Router();
const keys = require('../../config/keys');
const request = require('request');
const User = require('../../models/user-model').User;

const authCheck = (req, res, next) => {
	if (!req.user) {
		res.redirect('/auth/login');
	} else {
		next();
	}
};

router.get('/', authCheck, (req, res) => {
	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ DateAndTime: "OK" }));
});

router.get('/addEveryDay', authCheck, (req, res) => {
    User.findOne({_id: req.user._id}).then((currentUser) => {
        if (currentUser) {
            objToAdd = {
                name: "addEveryDay",
                hour: req.query.hour ? req.query.hour : 0,
                minute: req.query.minute ? req.query.minute : 0,
                reactionName: null};
            currentUser._services._twitter._triggers.push(objToAdd);
            currentUser.save();
            res.send({code: 200, error: null, triggerAdd: objToAdd});
        } else {
            res.send({code: 500, error: "User not found"});
        }
	});
});

module.exports = router;