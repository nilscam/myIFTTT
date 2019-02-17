var servicesColor = {
    twitter: "1da1f2",
    dateAndTime: "95a5a6",
}

var infosApplet = {
    checkNewTweet : {
        title: "New tweet by you",
        description: "This trigger fires every time you post a new tweet.",
        color: servicesColor['twitter'],
        params: {}
    },
    checkNewMention : {
        title: "New mention of you",
        description: "This trigger fires every time you are @mentioned in a tweet.",
        color: servicesColor['twitter'],
        params: {}
    },
    checkNewTweetHashtag : {
        title: "New tweet by you with hashtag",
        description: "This trigger fires every time you post a new tweet with specific hashtag.",
        color: servicesColor['twitter'],
        params: {
            hashtag: "String"
        }
    },
    checkNewFollower : {
        title: "New follower",
        description: "This trigger fires every time a new user starts following you.",
        color: servicesColor['twitter'],
        params: {}
    },
    checkNewLike : {
        title: "New liked tweet by you",
        description: "This trigger fires every time you like a tweet.",
        color: servicesColor['twitter'],
        params: {}
    },
    sendTweet : {
        title: "Post a tweet",
        description: "This action will post a new tweet on your account.",
        color: servicesColor['twitter'],
        params: {
            text: "String"
        }
    },
    sendTweetImage : {
        title: "Post a tweet with image",
        description: "This action will post a new tweet on your account with linked image.",
        color: servicesColor['twitter'],
        params: {
            text: "String"
        }
    },
    updateBio : {
        title: "Update bio",
        description: "This action will update your bio.",
        color: servicesColor['twitter'],
        params: {
            text: "String"
        }
    },
    addEveryDay : {
        title: "Every day at",
        description: "This trigger fires every single day at a specific time set by you.",
        color: servicesColor['dateAndTime'],
        params: {
            hour: "Hour",
            minute: "Minute"
        }
    },
    addEveryHour : {
        title: "Every hour at",
        description: "This trigger fires every hour at a specific time set by you.",
        color: servicesColor['dateAndTime'],
        params: {
            minute: "Minute"
        }
    },
    addEveryDayOfTheWeek : {
        title: "Every day of the week at",
        description: "This trigger fires only on specific days of the week at the time you provide.",
        color: servicesColor['dateAndTime'],
        params: {
            day: "Day",
            hour: "Hour",
            minute: "Minute"
        }
    },
    addEveryMonth : {
        title: "Every month on the",
        description: "This trigger fires every month on the day and time you specify.",
        color: servicesColor['dateAndTime'],
        params: {
            Day: "Number",
            hour: "Hour",
            minute: "Minute"
        }
    },
    addEveryYear : {
        title: "Every year on",
        description: "This trigger fires every year on the date and time you specify.",
        color: servicesColor['dateAndTime'],
        params: {
            month: "Number",
            day: "Number",
            hour: "Hour",
            minute: "Minute"
        }
    },
}

module.exports.infosApplet = infosApplet;
module.exports.servicesColor = servicesColor;