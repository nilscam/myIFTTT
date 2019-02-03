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

function addReaction(currentUser, req, objToAdd) { 
    currentUser._services["_"+req.params.triggerServiceName]._triggers.forEach(function(value) {
        if (value.name == req.params.trigger && !value.reactionName) {
            value.reactionName = objToAdd;
        }
    });
    currentUser.markModified('_services._'+req.params.triggerServiceName+'._triggers');
}

router.get('/', authCheck, (req, res) => {
	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ DateAndTime: "OK" }));
});


router.get('/sendTweet/:triggerServiceName/:trigger', authCheck, (req, res) => {
    User.findOne({_id: req.user._id}).then((currentUser) => {
        if (currentUser) {
            objToAdd = {
                nameService: "twitter",
                reaction: "sendTweet",
                tweet: req.query.tweet ? req.query.tweet : null,
                functionName: "sendTweet"};
            addReaction(currentUser, req, objToAdd);
            currentUser.save();
            res.send({code: 200, error: null, reactionAdd: objToAdd});
        } else {
            res.send({code: 500, error: "User not found"});
        }
	});
});

module.exports = router;