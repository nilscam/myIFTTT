var servicesColor = {
    twitter: "1da1f2",
    dateAndTime: "95a5a6",
    nasa: "2e294e",
    intagram: "e84393",
    mailer: "fdcb6e",
    weather: "2c3e50",
    newYorkTimes: "1e272e",
    cryptocurrency: "fbc531"
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
            day: "Number",
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
    newsOfTheDay : {
        title: "News of the day by NASA",
        description: "This trigger fires every time NASA posts a news.",
        color: servicesColor['nasa'],
        params: {}
    },
    imageOfTheDay : {
        title: "Image of the day by NASA",
        description: "This trigger fires every time NASA posts a new picture.",
        color: servicesColor['nasa'],
        params: {}
    },
    sendMailer: {
        title: "Post a mail",
        description: "This trigger send mail when something was new.",
        color: servicesColor['mailer'],
        params: {
            text: "String"
        }
    },
    checkLatestPicture: {
        title: "New photo is post",
        description:  "This trigger fires every time you post a new photo.",
        color: servicesColor['intagram'],
        params: {}
    },
    temperatureBelow : {
        title: "Current temperature drops below",
        description: "This trigger fires whenever the temperature drops below the value you provide.",
        color: servicesColor['weather'],
        params: {
            value: "Number",
        }
    },
    temperatureAbove : {
        title: "Current temperature rises above",
        description: "This trigger fires whenever the temperature rises above the value you provide.",
        color: servicesColor['weather'],
        params: {
            value: "Number",
        }
    },
    humidityLevelAbove : {
        title: "Current humidity level rises above",
        description: "This trigger fires whenever the humidity level rises above the value you provide.",
        color: servicesColor['weather'],
        params: {
            value: "Number",
        }
    },
    currentConditionChangesTo : {
        title: "Current condition changes to",
        description: "This trigger fires whenever the current condition of the weather equal the value you provide.",
        color: servicesColor['weather'],
        params: {
            text: "String",
        }
    },
    checkLastNewYorkTimes : {
        title: "New post from New York Times",
        description: "Get the latest post of New York Times.",
        color: servicesColor['newYorkTimes'],
        params: {}
    },
    checkTopNewYorkTimes : {
        title: "Check new top from New York Times",
        description: "If a new Top is posted on the section",
        color: servicesColor['newYorkTimes'],
        params: {}
    },
    checkValueCryptocurrency: {
        title: "Check if value is more than target value",
        description: "It's for people want to know if there crypto is more than target value",
        color: servicesColor['cryptocurrency'],
        params: {
            value: "String",
            name: "String"
        }
    }
}



module.exports.infosApplet = infosApplet;

module.exports.servicesColor = servicesColor;