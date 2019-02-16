const router = require('express').Router();
const Twitter = require('twitter');
const User = require('../../models/user-model').User;
const keys = require('../../config/keys');
const checkAuth = require('../../middleware/check-auth');

router.get('/', checkAuth, (req, res) => {
	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ Twitter: "OK" }));
});

router.post('/connect', checkAuth, (req, res) => {
    User.findOne({_id: req.userData.userId}).then((currentUser) => {
        if (currentUser) {
            currentUser._services._twitter._token = req.body.token;
            currentUser._services._twitter._token_secret = req.body.token_secret;
            var client = new Twitter({
                consumer_key: keys.twitter.consumer_key,
                consumer_secret: keys.twitter.consumer_secret,
                access_token_key: currentUser._services._twitter._token,
                access_token_secret: currentUser._services._twitter._token_secret
            });
            client.get('account/verify_credentials', {}, function(error, profile, response) {
                if (!error) {
                    currentUser._services._twitter._id = profile.id_str;
                    currentUser._services._twitter._username = profile.screen_name;
                    currentUser._services._twitter._photo = profile.profile_image_url;
                    currentUser.save();
                    res.status(200).send({error: null});
                } else {
                    res.status(500).send({error: "User not found"});
                }
              });
        } else {
            res.status(500).send({error: "User not found"});
        }
	});
});

function addTrigger(req, res, functionName, timer, eventReaction) {
    User.findOne({_id: req.userData.userId}).then((currentUser) => {
        if (currentUser) {
            objToAdd = {
                id: Date.now(),
                timer: timer,
                eventReaction: eventReaction,
                functionName: functionName,
                params: {
                    id: currentUser._id
                },
            };
            currentUser._services._twitter._triggers.push(objToAdd);
            currentUser.save();
            tg.addTrigger(objToAdd._id, objToAdd);
            res.status(200).send({code: 200, error: null, triggerAdd: objToAdd});
        } else {
            res.status(401).send({error: "User not found"});
        }
	});
}

router.post('/checkNewTweet', checkAuth, (req, res) => {
    addTrigger(req, res, 'checkNewTweet', "5000", "Timer");
});

// router.post('/sendTweet', checkAuth, (req, res) => {
//     addTrigger(req, res, 'sendTweet');
// });

router.post('/checkNewMention', checkAuth, (req, res) => {
    addTrigger(req, res, 'checkNewMention', "5000", "Timer");
});

router.post('/checkNewTweetHashtag', checkAuth, (req, res) => {
    addTrigger(req, res, 'checkNewTweetHashtag', "5000", "Timer");
});

router.post('/checkFollower', checkAuth, (req, res) => {
    addTrigger(req, res, 'checkFollower', "5000", "Timer");
});

router.post('/checkNewLike', checkAuth, (req, res) => {
    addTrigger(req, res, 'checkNewLike', "5000", "Timer");
});

module.exports = router;