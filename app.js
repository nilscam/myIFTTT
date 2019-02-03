const express = require('express');
var bodyParser = require('body-parser');
// Routes API
const triggersRoutes = require('./api/routes/triggers');
const reactionsRoutes = require('./api/routes/reactions');
const userRoutes = require('./api/routes/user');

const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();
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

app.listen(8080, () => {
	console.log('App now listening for request on port 8080');
});