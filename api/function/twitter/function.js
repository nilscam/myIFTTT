const User = require('../../models/user-model').User;
const keys = require('../../config/keys');
const Twitter = require('twitter');
const sortParams = require('../sortParams').sortParams;
const appletRanLogger = require('../logger').appletRanLogger;

// ! Triggers

function checkNewTweet(params) {
    User.findOne({_id: params.params.id}).then((currentUser) => {
        var client = new Twitter({
            consumer_key: keys.twitter.consumer_key,
            consumer_secret: keys.twitter.consumer_secret,
            access_token_key: currentUser._services._twitter._token,
            access_token_secret: currentUser._services._twitter._token_secret
        });
        client.get('statuses/user_timeline', {count: 1}, function(error, tweets, response) {
            if (!error) {
                if (tweets.length > 0 && currentUser._services._twitter._last_tweet == "0") {
                    currentUser._services._twitter._last_tweet = tweets[0].id_str;
                    currentUser.save();
                } else if (tweets.length > 0 && currentUser._services._twitter._last_tweet != tweets[0].id_str) {
                    currentUser._services._twitter._last_tweet = tweets[0].id_str;
                    currentUser.save();
                    var paramsFromTrigger = {
                        twitter: {
                            tweet: tweets[0],
                        }
                    }
                    params.paramsFromTrigger = paramsFromTrigger
                    tg.sendEvent(params.params.id, "checkNewTweet", params);
                }
            }
        });
    });
}

function checkNewMention(params) {
    User.findOne({_id: params.params.id}).then((currentUser) => {
        var client = new Twitter({
            consumer_key: keys.twitter.consumer_key,
            consumer_secret: keys.twitter.consumer_secret,
            access_token_key: currentUser._services._twitter._token,
            access_token_secret: currentUser._services._twitter._token_secret
        });
        client.get('statuses/mentions_timeline', {count: 1}, function(error, tweets, response) {
            if (!error) {
                if (tweets.length > 0 && currentUser._services._twitter._last_mention == "0") {
                    currentUser._services._twitter._last_mention = tweets[0].id_str;
                    currentUser.save();
                } else if (tweets.length > 0 && currentUser._services._twitter._last_mention != tweets[0].id_str) {
                    currentUser._services._twitter._last_mention = tweets[0].id_str;
                    currentUser.save();
                    var paramsFromTrigger = {
                        twitter: {
                            tweet: tweets[0],
                        }
                    }
                    params.paramsFromTrigger = paramsFromTrigger
                    tg.sendEvent(params.params.id, "checkNewMention", params);
                }
            }
        });
    });
}

function checkNewTweetHashtag(params) {
    User.findOne({_id: params.params.id}).then((currentUser) => {
        var client = new Twitter({
            consumer_key: keys.twitter.consumer_key,
            consumer_secret: keys.twitter.consumer_secret,
            access_token_key: currentUser._services._twitter._token,
            access_token_secret: currentUser._services._twitter._token_secret
        });
        client.get('statuses/user_timeline', {count: 2}, function(error, tweets, response) {
            if (!error) {
                tweets.forEach(function(value) {
                    if (value.text.indexOf(params.params.params.hashtag) > -1 && currentUser._services._twitter._last_tweet_hashtag != value.id_str) {
                        currentUser._services._twitter._last_tweet_hashtag = value.id_str;
                        currentUser.save();
                        var paramsFromTrigger = {
                            twitter: {
                                tweet: value,
                            }
                        }
                        params.paramsFromTrigger = paramsFromTrigger
                        tg.sendEvent(params.params.id, "checkNewTweetHashtag", params);
                    }
                });
            }
        });
    });
}

function checkNewFollower(params) {
    User.findOne({_id: params.params.id}).then((currentUser) => {
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
                    var paramsFromTrigger = {
                        twitter: {
                            follower: followers.ids[0],
                        }
                    }
                    params.paramsFromTrigger = paramsFromTrigger
                    tg.sendEvent(params.params.id, "checkNewFollower", params);
                }
            }
        });
    });
}

function checkNewLike(params) {
    User.findOne({_id: params.params.id}).then((currentUser) => {
        var client = new Twitter({
            consumer_key: keys.twitter.consumer_key,
            consumer_secret: keys.twitter.consumer_secret,
            access_token_key: currentUser._services._twitter._token,
            access_token_secret: currentUser._services._twitter._token_secret
        });
        client.get('favorites/list', {count: 1}, function(error, tweets, response) {
            console.log(error);
            if (!error) {
                console.log(tweets)
                console.log(tweets.length)
                console.log(currentUser._services._twitter._last_like);
                if (tweets.length > 0 && currentUser._services._twitter._last_like == "0") {
                    currentUser._services._twitter._last_like = tweets[0].id_str;
                    currentUser.save();
                } else if (tweets.length > 0 && currentUser._services._twitter._last_like != tweets[0].id_str) {
                    currentUser._services._twitter._last_like = tweets[0].id_str;
                    currentUser.save();
                    var paramsFromTrigger = {
                        twitter: {
                            tweet: tweets[0],
                        }
                    }
                    params.paramsFromTrigger = paramsFromTrigger
                    tg.sendEvent(params.params.id, "checkNewMention", params);
                }
            }
        });
    });
}

// ! Reactions

function resetCredentials(currentUser) {
    currentUser._services._twitter._id = 0;
    currentUser._services._twitter._token = "";
    currentUser._services._twitter._token_secret = "";
    currentUser.save();
}

function sendTweet(params) {
    params = sortParams(params);
    User.findOne({_id: params.params.id}).then((currentUser) => {
        var client = new Twitter({
            consumer_key: keys.twitter.consumer_key,
            consumer_secret: keys.twitter.consumer_secret,
            access_token_key: currentUser._services._twitter._token,
            access_token_secret: currentUser._services._twitter._token_secret
        });
        client.post('statuses/update', {status: params.reaction.params.text}, function(error, tweet, response) {
            var errorMessage = undefined;
            if (error) {
                if (error[0].code == 89) {
                    resetCredentials(currentUser);
                }
                console.log(error);
                errorMessage = error[0].message;
            }
            appletRanLogger(params, errorMessage);
        });
    });
}

function sendTweetImage(params) {
    params = sortParams(params);
    User.findOne({_id: params.params.id}).then((currentUser) => {
        var client = new Twitter({
            consumer_key: keys.twitter.consumer_key,
            consumer_secret: keys.twitter.consumer_secret,
            access_token_key: currentUser._services._twitter._token,
            access_token_secret: currentUser._services._twitter._token_secret
        });
        client.post('statuses/update', {status: params.reaction.params.text}, function(error, tweet, response) {
            var errorMessage = undefined;
            if (error) {
                if (error[0].code == 89) {
                    resetCredentials(currentUser);
                }
                console.log(error);
                errorMessage = error[0].message;
            }
            appletRanLogger(params, errorMessage);
        });
    });
}

function updateBio(params) {
    params = sortParams(params);
    User.findOne({_id: params.params.id}).then((currentUser) => {
        var client = new Twitter({
            consumer_key: keys.twitter.consumer_key,
            consumer_secret: keys.twitter.consumer_secret,
            access_token_key: currentUser._services._twitter._token,
            access_token_secret: currentUser._services._twitter._token_secret
        });
        client.post('account/update_profile', {description: params.reaction.params.text}, function(error, tweet, response) {
            var errorMessage = undefined;
            if (error) {
                if (error[0].code == 89) {
                    resetCredentials(currentUser);
                }
                console.log(error);
                errorMessage = error[0].message;
            }
            appletRanLogger(params, errorMessage);
        });
    });
}

module.exports = {
    checkNewTweet: checkNewTweet,
    checkNewMention: checkNewMention,
    checkNewTweetHashtag: checkNewTweetHashtag,
    checkNewFollower: checkNewFollower,
    checkNewLike: checkNewLike,
    sendTweet: sendTweet,
    sendTweetImage: sendTweetImage,
    updateBio: updateBio,
}