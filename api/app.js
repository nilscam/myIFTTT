const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
var path = require('path');
var history = require('connect-history-api-fallback');
const passport = require('passport')
const request = require('request-promise');
const cookieSession = require('cookie-session');

// Routes API
const triggersRoutes = require('./routes/triggers');
const reactionsRoutes = require('./routes/reactions');
const userRoutes = require('./routes/user');
const servicesRoutes = require('./routes/services');
const appletRoutes = require('./routes/applet');
const aboutJsonRoutes = require('./routes/jsonRoutes');
const activityRoutes = require('./routes/activity');

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
const newYorkTimesFunctions = require('./function/newYorkTimes/functions');
const cryptocurrencyFunctions = require('./function/cryptocurrency/functions');

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

    // New York Times
    checkLastNewYorkTimes: newYorkTimesFunctions.checkLastNewYorkTimes,
    checkTopNewYorkTimes: newYorkTimesFunctions.checkTopNewYorkTimes,

    // Cryptocurrency
    checkValueCryptocurrency: cryptocurrencyFunctions.checkValueCryptocurrency,

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

    app.use(cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: ["jfdskfjsdkjfk"]
    }));

    // initialize passport
    app.use(passport.initialize());

    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser((user, done) => done(null, user))



    app.use('/api/triggers', triggersRoutes);
    app.use('/api/reactions', reactionsRoutes);
    app.use('/api/user', userRoutes);
    app.use('/api/services', servicesRoutes);
    app.use('/api/applet', appletRoutes);
    app.use('/about.json', aboutJsonRoutes);
    app.use('/api/activity', activityRoutes);

    app.use(history())

    app.use(express.static(__dirname + '/public'));
    app.use(express.static(__dirname + '/../frontend/vue/dist/'));
    app.use(express.static(__dirname + '/../frontend/vue/src/assets/'));



    // connect to mongodb
    mongoose.connect(keys.mongodb.dbURL, () => {
        console.log('Connected to mongodb');
    });

//     app.get('/test', (req, res) => {
//         var i = 0;
//         const requestOptions = {
//             method: 'GET',
//             uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
//             qs: {
//                 start: 1,
//                 limit: 5000,
//                 convert: 'EUR'
//               },
//             headers: {
//               'X-CMC_PRO_API_KEY': keys.cryptocurrency.API_KEY
//             },
//             json: true,
//           };
// //        if (currentUser) {
//             request(requestOptions).then(response => {
//                 var name = "Bitcoin";
//                 var currentV = "4000";
//                 var conver = 'EUR';
//                 while (i <= 1000) {
//                     if (response.data[i].name == name) {
//                         var objTarget = response.data[i];
//                         i = 1001;
//                     }
//                     i += 1;
//                 }
//                 var first = Number(currentV);
//                 var second = Number(objTarget.quote[conver].price);
//                 res.send(objTarget);
//               }).catch((err) => {
//                 console.log('API call error:', err.message);
//                 res.send('ko')
//               });
//   //      };
//     });

    // app.get('/google/success', function (req, res) {res.sendFile(path.join(__dirname + "/../frontend/vue/dist/index.html"));});
    // app.get('/', function (req, res) {
    //     res.sendFile(path.join(__dirname + "/../frontend/vue/dist/index.html"));
    // });
    // set up routes

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
