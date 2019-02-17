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
                image: "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjAgu2T1LbgAhVpAWMBHTOnD74QjRx6BAgBEAU&url=https%3A%2F%2Ffr.wikipedia.org%2Fwiki%2FTwitter&psig=AOvVaw3-AOR09OGJY2UoZimy2jLy&ust=1550076787304071",
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
                image: "https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiO5YzH27bgAhUN1hoKHUXsAnoQjRx6BAgBEAU&url=http%3A%2F%2Ffreeiconshop.com%2Ficon%2Fclock-icon-flat%2F&psig=AOvVaw0A7nBA5NLOEe6udVhZJpIM&ust=1550078763614896",
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
            }
        ]
    });
});

module.exports = router;