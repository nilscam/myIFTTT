const router = require('express').Router();
const User = require('../../models/user-model').User;
const checkAuth = require('../../middleware/check-auth');
// const addReaction = require('./twitterReaction').addReaction;
const request = require('request-promise');

const func = require('../../function/mailer/functions');

router.get('/', checkAuth, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ Mailer: "OK" }));
});

router.get('/', checkAuth, (req, res) => {

});

router.post('/sendMail', checkAuth, (req, res) => {
    //var mailUser = req.userData.mail;
    // Mettre mailUser en premier params;
    func.sendMailer(req, req.body.service, req.body.text).then(value => {
        if (value) {
            res.send(JSON.stringify({ Mailer: "OK" }));
        } else {
            res.send(JSON.stringify({ Mailer: "KO" }));
        }
    });
});

router.get('/', checkAuth, (req, res) => {
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

module.exports = router;