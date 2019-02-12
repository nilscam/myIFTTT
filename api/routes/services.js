const router = require('express').Router();
const User = require('../models/user-model').User;
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, (req, res) => {
    res.status(200).send({
        services: [
            {
                nameService: "twitter",
                displayName: "Twitter",
                image: "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjAgu2T1LbgAhVpAWMBHTOnD74QjRx6BAgBEAU&url=https%3A%2F%2Ffr.wikipedia.org%2Fwiki%2FTwitter&psig=AOvVaw3-AOR09OGJY2UoZimy2jLy&ust=1550076787304071",
                color: "1da1f2",
                triggers: [
                    {
                        name: "checkNewTweet",
                        title: "New tweet by you",
                        description: "This trigger fires every time you post a new tweet.",
                        params: {}
                    },
                    {
                        name: "checkNewMention",
                        title: "New mention of you",
                        description: "This trigger fires every time you are @mentioned in a tweet.",
                        params: {}
                    },
                    {
                        name: "checkNewTweetHashtag",
                        title: "New tweet by you with hashtag",
                        description: "This trigger fires every time you post a new tweet with specific hashtag.",
                        params: {
                            hashtag: "String"
                        }
                    },
                    {
                        name: "checkNewFollower",
                        title: "New follower",
                        description: "This trigger fires every time a new user starts following you.",
                        params: {}
                    },
                    {
                        name: "checkNewLike",
                        title: "New liked tweet by you",
                        description: "This trigger fires every time you like a tweet.",
                        params: {}
                    },
                ],
                reactions: [
                    {
                        name: "sendTweet",
                        title: "Post a tweet",
                        description: "This action will post a new tweet on your account.",
                        params: {
                            tweet: "String"
                        }
                    }
                ]
            },
            {
                nameService: "dateAndTime",
                displayName: "Date & Time",
                image: "https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiO5YzH27bgAhUN1hoKHUXsAnoQjRx6BAgBEAU&url=http%3A%2F%2Ffreeiconshop.com%2Ficon%2Fclock-icon-flat%2F&psig=AOvVaw0A7nBA5NLOEe6udVhZJpIM&ust=1550078763614896",
                color: "95a5a6",
                triggers: [
                    {
                        name: "addEveryDay",
                        title: "Every day at",
                        description: "This trigger fires every single day at a specific time set by you.",
                        params: {
                            hour: "Hour",
                            minute: "Minute"
                        }
                    },
                    {
                        name: "addEveryHour",
                        title: "Every hour at",
                        description: "This trigger fires every hour at a specific time set by you.",
                        params: {
                            minute: "Minute"
                        }
                    },
                    {
                        name: "addEveryDayOfTheWeek",
                        title: "Every day of the week at",
                        description: "This trigger fires only on specific days of the week at the time you provide.",
                        params: {
                            day: "Day",
                            hour: "Hour",
                            minute: "Minute"
                        }
                    },
                    {
                        name: "addEveryMonth",
                        title: "Every month on the",
                        description: "This trigger fires every month on the day and time you specify.",
                        params: {
                            Day: "Number",
                            hour: "Hour",
                            minute: "Minute"
                        }
                    },
                    {
                        name: "addEveryYear",
                        title: "Every year on",
                        description: "This trigger fires every year on the date and time you specify.",
                        params: {
                            month: "Number",
                            day: "Number",
                            hour: "Hour",
                            minute: "Minute"
                        }
                    },
                ],
                reactions: {}
            }
        ]
    });
});

module.exports = router;