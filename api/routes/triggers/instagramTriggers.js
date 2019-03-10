const router = require('express').Router();
const checkAuth = require('../../middleware/check-auth');
const request = require('request');
const User = require('../../models/user-model').User;

router.get('/', checkAuth, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ Instagram: "OK" }));
});

router.post('/checkNewPicture', checkAuth, (req, res) => {
    console.log(req.userData);
    User.findOne({ _id: req.userData.userId }).then((currentUser) => {
        if (currentUser) {
            objToAdd = {
                isActive: false,
                name: "checkNewPicture",
                triggerOn: false,
                latestPostId: "",
                reactionName: null
            };
            currentUser._services._instagram._triggers.push(objToAdd);
            currentUser.save();
            res.status(200).send({ code: 200, error: null, triggerAdd: objToAdd });
        } else {
            res.status(401).send({ code: 401, error: "User not found" });
        }
    });
});

module.exports = router;