const router = require('express').Router();
const keys = require('../../../config/keys');
const User = require('../../models/user-model').User;
const checkAuth = require('../../middleware/check-auth');

router.get('/', checkAuth, (req, res) => {
	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ DateAndTime: "OK" }));
});

router.post('/addEveryDay', checkAuth, (req, res) => {
    User.findOne({_id: req.userData.userId}).then((currentUser) => {
        if (currentUser) {
            objToAdd = {
                isActive: false,
                name: "addEveryDay",
                hour: req.body.hour ? req.body.hour : 0,
                minute: req.body.minute ? req.body.minute : 0,
                reactionName: null};
            currentUser._services._dateAndTime._triggers.push(objToAdd);
            currentUser.save();
            res.send({code: 200, error: null, triggerAdd: objToAdd});
        } else {
            res.send({code: 500, error: "User not found"});
        }
	});
});

module.exports = router;