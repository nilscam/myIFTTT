const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
// Routes API
const triggersRoutes = require('./routes/triggers');
const reactionsRoutes = require('./routes/reactions');
const userRoutes = require('./routes/user');
const servicesRoutes = require('./routes/services');

const mongoose = require('mongoose');
const keys = require('./config/keys');

// ! Functions Triggers and Reactions
const triggerHandler = require('./TriggerHandler.js').TriggerHandler;
const twitterFunctions = require('./function/twitter/function')

exportFunctions = {
    checkNewTweet: twitterFunctions.checkNewTweet,
    sendTweet: twitterFunctions.sendTweet
};

global.tg = new triggerHandler(exportFunctions);

function launch_api(port) {
    const app = express();
    app.use(cors())

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())


    // connect to mongodb
    mongoose.connect(keys.mongodb.dbURL, () => {
        console.log('Connected to mongodb');
    });

    // set up routes
    app.use('/api/triggers', triggersRoutes);
    app.use('/api/reactions', reactionsRoutes);
    app.use('/api/user', userRoutes);
    app.use('/api/services', servicesRoutes);

    app.use((req, res, next) => {
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
