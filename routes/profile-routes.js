const router = require('express').Router();
const keys = require('../config/keys');
const User = require('../models/user-model').User;

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

router.get('/addTrigger', authCheck, (req, res) => {
    User.findOne({_id: req.user._id}).then((currentUser) => {
        if (currentUser) {
            currentUser._services._twitter._triggers.push({
                name: "addEveryDay",
                reactionName: null});
            currentUser.save();
            res.send('OK');
        } else {
            res.send('KO');
        }
	});
});

router.get('/addReaction', authCheck, (req, res) => {
    User.findOne({_id: req.user._id}).then((currentUser) => {
        if (currentUser) {
            currentUser._services._twitter._triggers.forEach(function(value) {
                if (value.name == "addEveryHour")
                    value.reactionName = {
                        nameService: "insta",
                        reaction: "insta update",
                        message: "lol",
                        functionName: "instalol"};
            });
            currentUser.markModified('_services._twitter._triggers');
            currentUser.save();
            var m = require('./testFunc.js');
            m['f1']();
            res.send('OK');
        } else {
            res.send('KO');
        }
	});
});

module.exports = router;