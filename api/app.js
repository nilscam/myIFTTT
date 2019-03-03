const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
// Routes API
const triggersRoutes = require('./routes/triggers');
const reactionsRoutes = require('./routes/reactions');
const userRoutes = require('./routes/user');
const servicesRoutes = require('./routes/services');
const appletRoutes = require('./routes/applet');

const mongoose = require('mongoose');
const keys = require('./config/keys');

// ! Functions Triggers and Reactions
const triggerHandler = require('./TriggerHandler.js').TriggerHandler;

const instagramFunctions = require('./function/instagram/functions');
const mailerFunctions = require('./function/mailer/functions');
const twitterFunctions = require('./function/twitter/function');
const dateAndTimeFunctions = require('./function/dateAndTime/function');
const nasaFunctions = require('./function/nasa/function');
const weatherFunctions = require('./function/weather/function');

exportFunctions = {
    checkNewTweet: twitterFunctions.checkNewTweet,
    checkNewMention: twitterFunctions.checkNewMention,
    checkNewTweetHashtag: twitterFunctions.checkNewTweetHashtag,
    checkNewFollower: twitterFunctions.checkNewFollower,
    checkNewLike: twitterFunctions.checkNewLike,
    sendTweet: twitterFunctions.sendTweet,
    sendTweetImage: twitterFunctions.sendTweetImage,
    updateBio: twitterFunctions.updateBio,

    addEveryDay : dateAndTimeFunctions.addEveryDay,
    addEveryHour : dateAndTimeFunctions.addEveryHour,
    addEveryDayOfTheWeek : dateAndTimeFunctions.addEveryDayOfTheWeek,
    addEveryMonth : dateAndTimeFunctions.addEveryMonth,
    addEveryYear : dateAndTimeFunctions.addEveryYear,

    newsOfTheDay: nasaFunctions.newsOfTheDay,
    imageOfTheDay: nasaFunctions.imageOfTheDay,

    // Instagram
    checkNewPost: instagramFunctions.checkNewPost,

    // Mailer
    sendMailer: mailerFunctions.sendMailer,

    temperatureBelow : weatherFunctions.temperatureBelow,
    temperatureAbove : weatherFunctions.temperatureAbove,
    humidityLevelAbove : weatherFunctions.humidityLevelAbove,
    currentConditionChangesTo : weatherFunctions.currentConditionChangesTo,
};

global.tg = new triggerHandler(exportFunctions);

function launch_api(port) {
    const app = express();
    app.use(cors())

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    app.use(express.static(__dirname + '/public'));

    // connect to mongodb
    mongoose.connect(keys.mongodb.dbURL, () => {
        console.log('Connected to mongodb');
    });

    app.get('/login', function (req, res) {
      res.send('login -> failure !')
    })
    app.get('/home', function (req, res) {
      res.send('home -> success !')
    })

    // set up routes
    app.use('/api/triggers', triggersRoutes);
    app.use('/api/reactions', reactionsRoutes);
    app.use('/api/user', userRoutes);
    app.use('/api/services', servicesRoutes);
    app.use('/api/applet', appletRoutes);

    app.use((req, res, next) => {
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

        console.log(fullUrl);
        const error = new Error('Not found');
        error.status = 404;
        next(error);
    });

    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.json({
            error: {
                message: error.message
            }
        })
    });

    app.listen(port, () => {
        console.log('App now listening for request on port '+port);
    });
}

module.exports = {launch_api: launch_api}
