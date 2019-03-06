const router = require('express').Router();
const User = require('../models/user-model').User;
const checkAuth = require('../middleware/check-auth');
const infosApplet = require('../infosApplet').infosApplet;
const servicesColor = require('../infosApplet').servicesColor;

var services = 
[
    {
        nameService: "twitter",
        displayName: "Twitter",
        image: "http://localhost:8080/images/twitter.png",
        color: servicesColor['twitter'],
        triggers: [
            {
                name: "checkNewTweet",
                infos: infosApplet['checkNewTweet'],
            },
            {
                name: "checkNewMention",
                infos: infosApplet['checkNewMention'],
            },
            {
                name: "checkNewTweetHashtag",
                infos: infosApplet['checkNewTweetHashtag'],
            },
            {
                name: "checkNewFollower",
                infos: infosApplet['checkNewFollower'],
            },
            {
                name: "checkNewLike",
                infos: infosApplet['checkNewLike'],
            },
        ],
        reactions: [
            {
                name: "sendTweet",
                infos: infosApplet['sendTweet'],
            },
            {
                name: "sendTweetImage",
                infos: infosApplet['sendTweetImage'],
            },
            {
                name: "updateBio",
                infos: infosApplet['updateBio'],
            },
        ]
    },
    {
        nameService: "dateAndTime",
        displayName: "Date & Time",
        image: "http://localhost:8080/images/dateAndTime.png",
        color: servicesColor['dateAndTime'],
        triggers: [
            {
                name: "addEveryDay",
                infos: infosApplet['addEveryDay'],
            },
            {
                name: "addEveryHour",
                infos: infosApplet['addEveryHour'],
            },
            {
                name: "addEveryDayOfTheWeek",
                infos: infosApplet['addEveryDayOfTheWeek'],
            },
            {
                name: "addEveryMonth",
                infos: infosApplet['addEveryMonth'],
            },
            {
                name: "addEveryYear",
                infos: infosApplet['addEveryYear'],
            },
        ],
        reactions: [{}]
    },
    {
        nameService: "nasa",
        displayName: "Space",
        image: "http://localhost:8080/images/nasa.png",
        color: servicesColor['nasa'],
        triggers: [
            {
                name: "newsOfTheDay",
                infos: infosApplet['newsOfTheDay'],
            },
            {
                name: "imageOfTheDay",
                infos: infosApplet['imageOfTheDay'],
            },
        ],
        reactions: [{}]
    },
    {
        nameService: "instagram",
        displayName: "Instagram",
        image: "http://localhost:8080/images/instagram.png",
        color: servicesColor['intagram'],
        triggers: [
            {
                name: "checkLatestPicture",
                infos: infosApplet['checkLatestPicture'],
            },
        ],
        reactions: [{}]
    },
    {
        nameService: "mailer",
        displayName: "Mailer",
        image: "http://localhost:8080/images/mailer.png",
        color: servicesColor['mailer'],
        triggers: [{}],
        reactions: [
            {
                name: "sendMailer",
                infos: infosApplet['sendMailer'],
            },
        ]
    },
    {
        nameService: "weather",
        displayName: "Weather",
        image: "http://localhost:8080/images/weather.png",
        color: servicesColor['weather'],
        triggers: [
            {
                name: "temperatureBelow",
                infos: infosApplet['temperatureBelow'],
            },
            {
                name: "temperatureAbove",
                infos: infosApplet['temperatureAbove'],
            },
            {
                name: "humidityLevelAbove",
                infos: infosApplet['humidityLevelAbove'],
            },
            {
                name: "currentConditionChangesTo",
                infos: infosApplet['currentConditionChangesTo'],
            },
        ],
        reactions: [{}]
    },
    {
        nameService: "cryptocurrency",
        displayName: "Cryptocurrency",
        image: "http://localhost:8080/images/cryptocurrency.png",
        color: servicesColor['cryptocurrency'],
        triggers: [
            {
                name: "checkValueCryptocurrency",
                infos: infosApplet['checkValueCryptocurrency'],
            },
        ],
        reactions: [{}]
    },
]

var genericObjInService = {
    name: "",
    description: ""
}

var genericService = {
    name: "",
    actions: [],
    reactions: [],
}

var objToSend = {
    client: {
        host: "",
    },
    server: {
        current_time: "",
        services: []
    }
}

router.get('', (req, res) => {
    var i = 0;
    var obj = objToSend;
    obj.server.current_time = Date();
    while (i <= services.length) {
        obj.server.services.pop(genericService);
        obj.server.services[i].name = services[i].nameService;
        i += 1;
    }
    res.send(obj);
});

module.exports = router;