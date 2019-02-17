const User = require('../../models/user-model').User;
const keys = require('../../config/keys');
const Twitter = require('twitter');
const sortParams = require('../sortParams').sortParams;

// ! Triggers

function checkNewTweet(params) {
    User.findOne({_id: params.id}).then((currentUser) => {
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
                    var paramToSend = {
                        twitter: {
                            tweet: tweets[0],
                        }
                    }
                    tg.sendEvent(params.id, "checkNewTweet", paramToSend);
                }
            }
        });
    });
}

function checkNewMention(params) {
    User.findOne({_id: params.id}).then((currentUser) => {
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
                    var paramToSend = {
                        twitter: {
                            tweet: tweets[0],
                        }
                    }
                    tg.sendEvent(params.id, "checkNewMention", paramToSend);
                }
            }
        });
    });
}

function checkNewTweetHashtag(params) {
    User.findOne({_id: params.id}).then((currentUser) => {
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
                        var paramToSend = {
                            twitter: {
                                tweet: tweets[0],
                            }
                        }
                        tg.sendEvent(params.id, "checkNewTweetHashtag", paramToSend);
                    }
                });
            }
        });
    });
}

function checkNewFollower(params) {
    User.findOne({_id: params.id}).then((currentUser) => {
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
                    var paramToSend = {
                        twitter: {
                            follower: followers.ids[0],
                        }
                    }
                    tg.sendEvent(params.id, "checkNewFollower", paramToSend);
                }
            }
        });
    });
}

function checkNewLike(params) {
    User.findOne({_id: params.id}).then((currentUser) => {
        var client = new Twitter({
            consumer_key: keys.twitter.consumer_key,
            consumer_secret: keys.twitter.consumer_secret,
            access_token_key: currentUser._services._twitter._token,
            access_token_secret: currentUser._services._twitter._token_secret
        });
        client.get('favorites/list', {count: 1}, function(error, tweets, response) {
            if (!error) {
                if (tweets.length > 0 && currentUser._services._twitter._last_like == "0") {
                    currentUser._services._twitter._last_mention = tweets[0].id_str;
                    currentUser.save();
                } else if (tweets.length > 0 && currentUser._services._twitter._last_like != tweets[0].id_str) {
                    currentUser._services._twitter._last_mention = tweets[0].id_str;
                    currentUser.save();
                    var paramToSend = {
                        twitter: {
                            tweet: tweets[0],
                        }
                    }
                    tg.sendEvent(params.id, "checkNewMention", paramToSend);
                }
            }
        });
    });
}

// ! Reactions

function sendTweet(params) {
    params = sortParams(params);
    User.findOne({_id: params.id}).then((currentUser) => {
        var client = new Twitter({
            consumer_key: keys.twitter.consumer_key,
            consumer_secret: keys.twitter.consumer_secret,
            access_token_key: currentUser._services._twitter._token,
            access_token_secret: currentUser._services._twitter._token_secret
        });
        client.post('statuses/update', {status: params.text}, function(error, tweet, response) {
            if (error) {
                console.log(error);
            }
        });
    });
}

function sendTweetImage(params) {
    params = sortParams(params);
    User.findOne({_id: params.id}).then((currentUser) => {
        var client = new Twitter({
            consumer_key: keys.twitter.consumer_key,
            consumer_secret: keys.twitter.consumer_secret,
            access_token_key: currentUser._services._twitter._token,
            access_token_secret: currentUser._services._twitter._token_secret
        });
        client.post('statuses/update', {status: params.text}, function(error, tweet, response) {
            if (error) {
                console.log(error);
            }
        });
    });
}

function updateBio(params) {
    params = sortParams(params);
    User.findOne({_id: params.id}).then((currentUser) => {
        var client = new Twitter({
            consumer_key: keys.twitter.consumer_key,
            consumer_secret: keys.twitter.consumer_secret,
            access_token_key: currentUser._services._twitter._token,
            access_token_secret: currentUser._services._twitter._token_secret
        });
        client.post('account/update_profile', {description: params.text}, function(error, tweet, response) {
            if (error) {
                console.log(error);
            }
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