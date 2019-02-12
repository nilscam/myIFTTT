const router = require('express').Router();
const User = require('../../models/user-model').User;
const checkAuth = require('../../middleware/check-auth');
const addReaction = require('./twitterReaction').addReaction;
const request = require('request-promise');

const func = require('../../function/instagram/functions');

router.get('/', checkAuth, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ Instagram: "OK" }));
});

router.get('/testCheck', checkAuth, (req, res) => {
    func.getLatestPicture(req).then(value => {
        console.log(value);
    })
})

router.get('/checkNewPost', checkAuth, (req, res) => {
    User.findOne({ _id: req.userData.userId }).then((currentUser) => {
        if (currentUser) {
            //var access_token = currentUser._services._instagram.access_token;
            var access_token = "8406347569.228cd00.e45432e27d804307b4a21425aec145db";
            request({
                url: 'https://api.instagram.com/v1/users/self/media/recent/?count=1&access_token=' + access_token,
            }, function (error, response, body) {
                if (error || response.statusCode !== 200) {
                    res.send(JSON.stringify({ Instagram: "KO" }));
                } else {
                    var result = JSON.parse(body);
                    var obj = currentUser._services._instagram._triggers[0];
                    if (obj.latestPostId != result['data'][0].id) {
                        obj.latestPostId = result['data'][0].id;
                        obj.triggerOn = true;
                        currentUser._services._instagram._triggers.pop();
                        currentUser._services._instagram._triggers.push(obj);
                        currentUser.save();
                        res.send(JSON.stringify({ Instagram: "OK" }));
                    } else {
                        obj.triggerOn = false;
                        res.send(JSON.stringify({ Instagram: "KO" }));
                    }
                };
            })
        };
    });
});

router.post('/latestPicture/:triggerServiceName/:trigger', checkAuth, (req, res) => {
    User.findOne({ _id: req.userData.userId }).then((currentUser) => {
        if (currentUser) {
            objToAdd = {
                nameService: "instagram",
                reaction: "latestPicture",
                picture: req.body.picture ? req.body.picture : null,
                functionName: "latestPicture"
            };
            if (addReaction(currentUser, req, objToAdd)) {
                currentUser.save();
                res.status(200).send({ code: 200, error: null, reactionAdd: objToAdd });
            } else {
                res.status(500).send({ code: 500, error: "No trigger for " + req.params.triggerServiceName + " available." });
            }
        } else {
            res.status(500).send({ code: 500, error: "User not found" });
        }
    });
});

module.exports = router;