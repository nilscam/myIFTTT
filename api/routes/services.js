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
                    },
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
            },
            {
                nameService: "nasa",
                displayName: "Space",
                image: "https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjRvdyqiMPgAhUgA2MBHT9kAYEQjRx6BAgBEAU&url=https%3A%2F%2Fwww.miifotos.com%2Fim%25C3%25A1genes%2Fsvg-space-icon-c1.html&psig=AOvVaw2vc-BCKlqLVh16KR7-fIRX&ust=1550503045994801",
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
                nameService: "instagram",
                displayName: "Instagram",
                image: "https://www.google.fr/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiBnNW0x8XgAhUjx4UKHVqBCXgQjRx6BAgBEAQ&url=https%3A%2F%2Ffr.wikipedia.org%2Fwiki%2FInstagram&psig=AOvVaw0oyOukoIok-sNezR9uUNlU&ust=1550588762202048",
                color: servicesColor['intagram'],
                triggers: [
                    {
                        name: "checkLatestPicture",
                        infos: infosApplet['checkLatestPicture'],
                    },
                ],
            },
            {
                nameService: "mailer",
                displayName: "Mailer",
                image: "https://www.google.fr/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwi9kqqry8XgAhUn2OAKHYPgCYcQjRx6BAgBEAQ&url=https%3A%2F%2Fcreativecommons.org%2Fwebsite-icons%2F&psig=AOvVaw0UruGx2FhC4jS1GSKpdVNd&ust=1550589811934276",
                color: servicesColor['mailer'],
                triggers: [
                    {
                        name: "sendMailer",
                        infos: infosApplet['sendMailer'],
                    },
                ],
            },
        ]
    });
});

module.exports = router;