const router = require('express').Router();
const keys = require('../../../config/keys');
const User = require('../../models/user-model').User;
const checkAuth = require('../../middleware/check-auth');

function addReaction(currentUser, req, objToAdd) { 
    isFound = false;
    currentUser._services["_"+req.params.triggerServiceName]._triggers.forEach(function(value) {
        if (value.name == req.params.trigger && !value.reactionName) {
            value.isActive = true;
            value.reactionName = objToAdd;
            isFound = true;
        }
    });
    if (isFound) {
        currentUser.markModified('_services._'+req.params.triggerServiceName+'._triggers');
    }
    return (isFound);
}

router.get('/', checkAuth, (req, res) => {
	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ DateAndTime: "OK" }));
});


router.post('/sendTweet/:triggerServiceName/:trigger', checkAuth, (req, res) => {
    User.findOne({_id: req.userData.userId}).then((currentUser) => {
        if (currentUser) {
            objToAdd = {
                nameService: "twitter",
                reaction: "sendTweet",
                tweet: req.body.tweet ? req.body.tweet : null,
                functionName: "sendTweet"};
            if (addReaction(currentUser, req, objToAdd)) {
                currentUser.save();
                res.status(200).send({code: 200, error: null, reactionAdd: objToAdd});
            } else {
                res.status(500).send({code: 500, error: "No trigger for "+req.params.triggerServiceName+" available."});
            }
        } else {
            res.status(500).send({code: 500, error: "User not found"});
        }
	});
});

module.exports = router;