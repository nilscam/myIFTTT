const router = require('express').Router();
const User = require('../models/user-model').User;
const checkAuth = require('../middleware/check-auth');
const infosApplet = require('../infosApplet').infosApplet;
const servicesColor = require('../infosApplet').servicesColor;

router.get('/', checkAuth, (req, res) => {
    res.status(200).send({
        services: [
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
                    }
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
                reactions: {}
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
                reactions: {}
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
                reactions: {}
            }
        ]
    });
});

module.exports = router;