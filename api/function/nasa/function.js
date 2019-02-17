const request = require('request');

const User = require('../../models/user-model').User;
const keys = require('../../config/keys');
const sortParams = require('../sortParams').sortParams;

// ! Triggers

function newsOfTheDay(params) {
    User.findOne({_id: params.id}).then((currentUser) => {
        request('https://api.nasa.gov/planetary/apod?api_key=' + keys.nasa.api_key, { json: true }, (err, res, body) => {
            // if (currentUser._services._nasa._last_title == "0") {
            //     currentUser._services._nasa._last_title = body.title;
            //     currentUser.save();
            // } else 
            if (currentUser._services._nasa._last_title != body.title) {
                currentUser._services._nasa._last_title = body.title;
                currentUser.save();
                var paramToSend = {
                    nasa: {
                        title: body.title,
                    }
                }
                tg.sendEvent(params.id, "newsOfTheDay", paramToSend);
            }
        });
    });
}

function imageOfTheDay(params) {
    User.findOne({_id: params.id}).then((currentUser) => {
        request('https://api.nasa.gov/planetary/apod?api_key=' + keys.nasa.api_key, { json: true }, (err, res, body) => {
            if (currentUser._services._nasa._last_url == "0") {
                currentUser._services._nasa._last_url = body.url;
                currentUser.save();
            } else if (currentUser._services._nasa._last_url != body.url) {
                currentUser._services._nasa._last_url = body.url;
                currentUser.save();
                var paramToSend = {
                    nasa: {
                        image: body.url,
                    }
                }
                tg.sendEvent(params.id, "imageOfTheDay", paramToSend);
            }
        });
    });
}


// ! Reactions

module.exports = {
    newsOfTheDay: newsOfTheDay,
    imageOfTheDay: imageOfTheDay,
}