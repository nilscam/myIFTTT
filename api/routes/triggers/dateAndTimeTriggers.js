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
            res.status(200).send({code: 200, error: null, triggerAdd: objToAdd});
        } else {
            res.status(500).send({code: 500, error: "User not found"});
        }
	});
});

router.post('/addEveryHour', checkAuth, (req, res) => {
    User.findOne({_id: req.userData.userId}).then((currentUser) => {
        if (currentUser) {
            objToAdd = {
                isActive: false,
                name: "addEveryHour",
                minute: req.body.minute ? req.body.minute : 0,
                reactionName: null};
            currentUser._services._dateAndTime._triggers.push(objToAdd);
            currentUser.save();
            res.status(200).send({code: 200, error: null, triggerAdd: objToAdd});
        } else {
            res.status(500).send({code: 500, error: "User not found"});
        }
	});
});

router.post('/addEveryDayOfTheWeek', checkAuth, (req, res) => {
    User.findOne({_id: req.userData.userId}).then((currentUser) => {
        if (currentUser) {
            objToAdd = {
                isActive: false,
                name: "addEveryDayOfTheWeek",
                day: req.body.day ? req.body.day : "Monday",
                hour: req.body.hour ? req.body.hour : 0,
                minute: req.body.minute ? req.body.minute : 0,
                reactionName: null};
            currentUser._services._dateAndTime._triggers.push(objToAdd);
            currentUser.save();
            res.status(200).send({code: 200, error: null, triggerAdd: objToAdd});
        } else {
            res.status(500).send({code: 500, error: "User not found"});
        }
	});
});

router.post('/addEveryMonth', checkAuth, (req, res) => {
    User.findOne({_id: req.userData.userId}).then((currentUser) => {
        if (currentUser) {
            objToAdd = {
                isActive: false,
                name: "addEveryMonth",
                day: req.body.day ? req.body.day : 1,
                hour: req.body.hour ? req.body.hour : 0,
                minute: req.body.minute ? req.body.minute : 0,
                reactionName: null};
            currentUser._services._dateAndTime._triggers.push(objToAdd);
            currentUser.save();
            res.status(200).send({code: 200, error: null, triggerAdd: objToAdd});
        } else {
            res.status(500).send({code: 500, error: "User not found"});
        }
	});
});

router.post('/addEveryYear', checkAuth, (req, res) => {
    User.findOne({_id: req.userData.userId}).then((currentUser) => {
        if (currentUser) {
            objToAdd = {
                isActive: false,
                name: "addEveryYear",
                month: req.body.month ? req.body.month : 1,
                day: req.body.day ? req.body.day : 1,
                hour: req.body.hour ? req.body.hour : 0,
                minute: req.body.minute ? req.body.minute : 0,
                reactionName: null};
            currentUser._services._dateAndTime._triggers.push(objToAdd);
            currentUser.save();
            res.status(200).send({code: 200, error: null, triggerAdd: objToAdd});
        } else {
            res.status(500).send({code: 500, error: "User not found"});
        }
	});
});

module.exports = router;