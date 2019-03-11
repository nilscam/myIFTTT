const router = require('express').Router();
const User = require('../models/user-model').User;
const checkAuth = require('../middleware/check-auth');
const infosApplet = require('../infosApplet').infosApplet;
const servicesColor = require('../infosApplet').servicesColor;
var ip = require('ip');

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
            reactions: []
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
            reactions: []
        },
        {
            nameService: "instagram",
            displayName: "Instagram",
            image: "http://localhost:8080/images/instagram.png",
            color: servicesColor['intagram'],
            triggers: [
                {
                    name: "checkNewPost",
                    infos: infosApplet['checkNewPost'],
                },
            ],
            reactions: []
        },
        {
            nameService: "mailer",
            displayName: "Mailer",
            image: "http://localhost:8080/images/mailer.png",
            color: servicesColor['mailer'],
            triggers: [],
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
            reactions: []
        },
        {
            nameService: "newYorkTimes",
            displayName: "New York Times",
            image: "http://localhost:8080/images/newyorktimes.png",
            color: servicesColor['newYorkTimes'],
            triggers: [
                {
                    name: "checkLastNewYorkTimes",
                    infos: infosApplet['checkLastNewYorkTimes'],
                },
                {
                    name: "checkTopNewYorkTimes",
                    infos: infosApplet['checkTopNewYorkTimes'],
                },
            ],
            reactions: []
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
            reactions: []
        },
    ]

var genericObjInService = {
    name: "",
    description: ""
}

router.get('', (req, res) => {
    var i = 0;
    var obj = {
        client: {
            host: "",
        },
        server: {
            current_time: "",
            services: []
        }
    };

    obj.client.host = ip.address();
    obj.server.current_time = Date.now();

    while (i <= services.length) {
        var objToAdd = {
            name: "",
            actions: [],
            reactions: [],
        }
        for (s = 0; s < services.length; s++) {
            if (i == s) {
                var readService = services[s];
                objToAdd.name = readService.nameService;
                for (t = 0; t < readService.triggers.length; t++) {
                    var objTriggerToAdd = {
                        name: "",
                        description: ""
                    }
                    objTriggerToAdd.name = readService.triggers[t].name
                    var description = infosApplet[objTriggerToAdd.name].description
                    objTriggerToAdd.description = description;
//                        console.log(description);
//                    objTriggerToAdd.description = ;
                    objToAdd.actions.push(objTriggerToAdd);
                }
                for (r = 0; r < readService.reactions.length; r++) {
                    var objReactionToAdd = {
                        name: "",
                        description: ""
                    }
                    objReactionToAdd.name = readService.reactions[r].name
                    var description = infosApplet[objReactionToAdd.name].description
                    objReactionToAdd.description = description;
                    objToAdd.reactions.push(objReactionToAdd);
                }
                obj.server.services.push(objToAdd);
                break;
            }
        }
        //        obj.server.services[i].name = services[i].nameService;
        i += 1;
    }
    res.send(obj);
});

module.exports = router;