var infosApplet = {
    checkNewTweet : {
        title: "New tweet by you",
        description: "This trigger fires every time you post a new tweet.",
        params: {}
    },
    checkNewMention : {
        title: "New mention of you",
        description: "This trigger fires every time you are @mentioned in a tweet.",
        params: {}
    },
    checkNewTweetHashtag : {
        title: "New tweet by you with hashtag",
        description: "This trigger fires every time you post a new tweet with specific hashtag.",
        params: {
            hashtag: "String"
        }
    },
    checkNewFollower : {
        title: "New follower",
        description: "This trigger fires every time a new user starts following you.",
        params: {}
    },
    checkNewLike : {
        title: "New liked tweet by you",
        description: "This trigger fires every time you like a tweet.",
        params: {}
    },
    sendTweet : {
        title: "Post a tweet",
        description: "This action will post a new tweet on your account.",
        params: {
            tweet: "String"
        }
    },
    addEveryDay : {
        title: "Every day at",
        description: "This trigger fires every single day at a specific time set by you.",
        params: {
            hour: "Hour",
            minute: "Minute"
        }
    },
    addEveryHour : {
        title: "Every hour at",
        description: "This trigger fires every hour at a specific time set by you.",
        params: {
            minute: "Minute"
        }
    },
    addEveryDayOfTheWeek : {
        title: "Every day of the week at",
        description: "This trigger fires only on specific days of the week at the time you provide.",
        params: {
            day: "Day",
            hour: "Hour",
            minute: "Minute"
        }
    },
    addEveryMonth : {
        title: "Every month on the",
        description: "This trigger fires every month on the day and time you specify.",
        params: {
            Day: "Number",
            hour: "Hour",
            minute: "Minute"
        }
    },
    addEveryYear : {
        title: "Every year on",
        description: "This trigger fires every year on the date and time you specify.",
        params: {
            month: "Number",
            day: "Number",
            hour: "Hour",
            minute: "Minute"
        }
    },
}

module.exports = infosApplet;