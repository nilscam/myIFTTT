const express = require('express');
// Routes
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const servicesRoutes = require('./routes/services-routes');
const settingsRoutes = require('./routes/settings-routes');
const triggersRoutes = require('./routes/triggers-routes');
const reactionsRoutes = require('./routes/reactions-routes');

const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
//var expressVue = require("express-vue");

const app = express();

// const expressVueMiddleware = expressVue.init();
// app.use(expressVueMiddleware);

// set up view engine
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views/'));

app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000,
	keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURL, () => {
	console.log('Connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/services', servicesRoutes);
app.use('/settings', settingsRoutes);
app.use('/triggers', triggersRoutes);
app.use('/reactions', reactionsRoutes);

// create home route
app.get('/', (req, res) => {
	res.render('home', {user: req.user});
});

app.listen(8080, () => {
	console.log('App now listening for request on port 8080');
});