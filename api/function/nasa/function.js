const request = require('request');

const User = require('../../models/user-model').User;
const keys = require('../../config/keys');
const sortParams = require('../sortParams').sortParams;

// ! Triggers

function newsOfTheDay(params) {
    User.findOne({_id: params.params.id}).then((currentUser) => {
        request('https://api.nasa.gov/planetary/apod?api_key=' + keys.nasa.api_key, { json: true }, (err, res, body) => {
            if (currentUser._services._nasa._last_title != body.title) {
                currentUser._services._nasa._last_title = body.title;
                currentUser.save();
                var paramsFromTrigger = {
                    nasa: {
                        title: body.title,
                    }
                }
                params.paramsFromTrigger = paramsFromTrigger
                tg.sendEvent(params.params.id, "newsOfTheDay", params);
            }
        });
    });
}

function imageOfTheDay(params) {
    User.findOne({_id: params.params.id}).then((currentUser) => {
        request('https://api.nasa.gov/planetary/apod?api_key=' + keys.nasa.api_key, { json: true }, (err, res, body) => {
            if (currentUser._services._nasa._last_url == "0") {
                currentUser._services._nasa._last_url = body.url;
                currentUser.save();
            } else if (currentUser._services._nasa._last_url != body.url) {
                currentUser._services._nasa._last_url = body.url;
                currentUser.save();
                var paramsFromTrigger = {
                    nasa: {
                        image: body.url,
                    }
                }
                params.paramsFromTrigger = paramsFromTrigger
                tg.sendEvent(params.params.id, "imageOfTheDay", params);
            }
        });
    });
}


// ! Reactions

module.exports = {
    newsOfTheDay: newsOfTheDay,
    imageOfTheDay: imageOfTheDay,
}