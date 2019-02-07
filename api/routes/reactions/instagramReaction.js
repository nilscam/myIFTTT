const router = require('express').Router();
const User = require('../../models/user-model').User;
const checkAuth = require('../../middleware/check-auth');
const addReaction = require('./twitterReaction').addReaction;

router.get('/', checkAuth, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ DateAndTime: "OK" }));
});

router.post('/sendPicture/:triggerServiceName/:trigger', checkAuth, (req, res) => {
    User.findOne({ _id: req.userData.userId }).then((currentUser) => {
        if (currentUser) {
            objToAdd = {
                nameService: "instagram",
                reaction: "sendPicture",
                picture: req.body.picture ? req.body.picture : null,
                functionName: "sendPicture"
            };
            if (addReaction(currentUser, req, objToAdd)) {
                currentUser.save();
                res.status(200).send({code: 200, error: null, reactionAdd: objToAdd});
            } else {
                res.status(500).send({code: 500, error: "No trigger for " + req.params.triggerServiceName + " available."});
            }
        } else {
            res.status(500).send({ code: 500, error: "User not found" });
        }
    });
});

module.exports = router;