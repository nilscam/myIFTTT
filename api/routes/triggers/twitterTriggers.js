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

function addTrigger(req, res, functionName) {
    User.findOne({_id: req.userData.userId}).then((currentUser) => {
        if (currentUser) {
            objToAdd = {
                id: Date.now(),
                timer: "1000",
                eventReaction: "Timer",
                functionName: functionName,
                params: {
                    id: currentUser._id
                },
            };
            currentUser._services._twitter._triggers.push(objToAdd);
            currentUser.save();
            res.status(200).send({code: 200, error: null, triggerAdd: objToAdd});
        } else {
            res.status(401).send({error: "User not found"});
        }
	});
}

router.post('/checkNewTweet', checkAuth, (req, res) => {
    // User.findOne({_id: req.userData.userId}).then((currentUser) => {
    //     var client = new Twitter({
    //         consumer_key: keys.twitter.consumer_key,
    //         consumer_secret: keys.twitter.consumer_secret,
    //         access_token_key: currentUser._services._twitter._token,
    //         access_token_secret: currentUser._services._twitter._token_secret
    //     });
    //     client.get('favorites/list', {count: 1}, function(error, tweet, response) {
    //         if (!error) {
    //             console.log(tweet[0].text)
    //         }
    //     });
    // });
    addTrigger(req, res, 'checkNewTweet');
});

router.post('/checkNewMention', checkAuth, (req, res) => {
    addTrigger(req, res, 'checkNewMention');
});

router.post('/checkNewTweetHashtag', checkAuth, (req, res) => {
    addTrigger(req, res, 'checkNewTweetHashtag');
});

router.post('/checkFollower', checkAuth, (req, res) => {
    addTrigger(req, res, 'checkFollower');
});

router.post('/checkNewLike', checkAuth, (req, res) => {
    addTrigger(req, res, 'checkNewLike');
});

function checkNewTweet(params) {
    User.findOne({_id: params._id}).then((currentUser) => {
        var client = new Twitter({
            consumer_key: keys.twitter.consumer_key,
            consumer_secret: keys.twitter.consumer_secret,
            access_token_key: currentUser._services._twitter._token,
            access_token_secret: currentUser._services._twitter._token_secret
        });
        client.get('statuses/user_timeline', {count: 1}, function(error, tweets, response) {
            if (!error) {
                if (tweets.length > 1 && currentUser._services._twitter._last_tweet == "0") {
                    currentUser._services._twitter._last_tweet = tweets[0].id_str;
                    currentUser.save();
                } else if (tweets.length > 1 && currentUser._services._twitter._last_tweet != tweets[0].id_str) {
                    currentUser._services._twitter._last_tweet = tweets[0].id_str;
                    currentUser.save();
                    // tg.sendEvent(params._id, "checkNewTweet");
                }
            }
        });
    });
}

function checkNewMention(params) {
    User.findOne({_id: params._id}).then((currentUser) => {
        var client = new Twitter({
            consumer_key: keys.twitter.consumer_key,
            consumer_secret: keys.twitter.consumer_secret,
            access_token_key: currentUser._services._twitter._token,
            access_token_secret: currentUser._services._twitter._token_secret
        });
        client.get('statuses/mentions_timeline', {count: 1}, function(error, tweets, response) {
            if (!error) {
                if (tweets.length > 1 && currentUser._services._twitter._last_mention == "0") {
                    currentUser._services._twitter._last_mention = tweets[0].id_str;
                    currentUser.save();
                } else if (tweets.length > 1 && currentUser._services._twitter._last_mention != tweets[0].id_str) {
                    currentUser._services._twitter._last_mention = tweets[0].id_str;
                    currentUser.save();
                    // tg.sendEvent(params._id, "checkNewMention");
                }
            }
        });
    });
}

function checkNewTweetHashtag(params) {
    User.findOne({_id: params._id}).then((currentUser) => {
        var client = new Twitter({
            consumer_key: keys.twitter.consumer_key,
            consumer_secret: keys.twitter.consumer_secret,
            access_token_key: currentUser._services._twitter._token,
            access_token_secret: currentUser._services._twitter._token_secret
        });
        client.get('statuses/user_timeline', {count: 2}, function(error, tweets, response) {
            if (!error) {
                tweets.forEach(function(value) {
                    if (value.indexOf(params.hashtag) > -1 && currentUser._services._twitter._last_tweet_hashtag != value.id_str) {
                        currentUser._services._twitter._last_tweet_hashtag = value.id_str;
                        currentUser.save();
                        // tg.sendEvent(params._id, "checkNewTweetHashtag");
                    }
                });
            }
        });
    });
}

function checkNewFollower(params) {
    User.findOne({_id: params._id}).then((currentUser) => {
        var client = new Twitter({
            consumer_key: keys.twitter.consumer_key,
            consumer_secret: keys.twitter.consumer_secret,
            access_token_key: currentUser._services._twitter._token,
            access_token_secret: currentUser._services._twitter._token_secret
        });
        client.get('followers/ids', {count: 1}, function(error, followers, response) {
            if (!error) {
                if (followers.ids.length > 0 && currentUser._services._twitter._last_follower == "0") {
                    currentUser._services._twitter._last_follower = followers.ids[0];
                    currentUser.save();
                } else if (followers.ids.length > 0 && currentUser._services._twitter._last_follower != followers.ids[0]) {
                    currentUser._services._twitter._last_follower = followers.ids[0];
                    currentUser.save();
                    // tg.sendEvent(params._id, "checkNewFollower");
                }
            }
        });
    });
}

function checkNewLike(params) {
    User.findOne({_id: params._id}).then((currentUser) => {
        var client = new Twitter({
            consumer_key: keys.twitter.consumer_key,
            consumer_secret: keys.twitter.consumer_secret,
            access_token_key: currentUser._services._twitter._token,
            access_token_secret: currentUser._services._twitter._token_secret
        });
        client.get('favorites/list', {count: 1}, function(error, tweets, response) {
            if (!error) {
                if (tweets.length > 1 && currentUser._services._twitter._last_like == "0") {
                    currentUser._services._twitter._last_mention = tweets[0].id_str;
                    currentUser.save();
                } else if (tweets.length > 1 && currentUser._services._twitter._last_like != tweets[0].id_str) {
                    currentUser._services._twitter._last_mention = tweets[0].id_str;
                    currentUser.save();
                    // tg.sendEvent(params._id, "checkNewMention");
                }
            }
        });
    });
}

function sendTweet(params) {
    User.findOne({_id: params._id}).then((currentUser) => {
        var client = new Twitter({
            consumer_key: keys.twitter.consumer_key,
            consumer_secret: keys.twitter.consumer_secret,
            access_token_key: currentUser._services._twitter._token,
            access_token_secret: currentUser._services._twitter._token_secret
        });
        client.post('statuses/update', {status: params.tweet}, function(error, tweet, response) {
            if (error) {
                console.log(error);
            }
        });
    });
}



// Exemple Trigger / Reaction
// router.get('/checkTweetOnMe', checkAuth, (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     //add in db

//     // Regulier
//     objToAdd = {
//         id: Date.now(),
//         timer: "1000",
//         eventReaction: "Timer",
//         functionName: "checkTweetOnMe",
//         params: {},
//     };
//     tg.addTrigger(req.userData._id, objToAdd)

//     objToAdd = {
//         id: Date.now(),
//         timer: "0",
//         eventReaction: "checkTweetOnMe",
//         functionName: "sendTweet",
//         params: {
//             tweet: "Hello twitter"
//         },
//     };
//     tg.addTrigger(req.userData._id, objToAdd)
//     res.send(JSON.stringify({ Twitter: "OK" }));
// });


// //Trigger
// function checkTweetOnMe(params) {
//     if (true) {
//         tg.sendEvent(req.userData._id, "checkTweetOnMe");
//     }
// }
// //Reaction
// function sendTweet(params) {
// }



module.exports = router;