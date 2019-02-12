const express = require('express');
var path = require('path');
// Routes
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const instaRoutes = require('./routes/insta-routes');

const passportSetup = require('./config/passport-setup');
const passportSetupInsta = require('./config/passport-instagram');
const passportSetupTwitter = require('./config/passport-twitter');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

module.exports = {
    launch_client: function(port) {
        const app = express();

        app.use(express.static(__dirname + '/../frontend/vue/dist/'));

        app.use(cookieSession({
            maxAge: 24 * 60 * 60 * 1000,
            keys: [keys.session.cookieKey]
        }));

        // initialize passport
        app.use(passport.initialize());
        app.use(passport.session());

        // set up routes
        // app.use('/auth', authRoutes);
        // app.use('/profile', profileRoutes);
        // app.use('/instagram', instaRoutes);

        // create home route
        // app.get('/', (req, res) => {
        //     res.render('home', {user: req.user});
        // });

        app.get('/', function (req, res) {
            res.sendFile(path.join(__dirname + "/../frontend/vue/dist/index.html"));
            // secretCode = "u5wk_XkNVPBLztwgW1ZhhhPe";
            // idClient = "163173170605-aea5m9jtdlp10dqplb4eq76vl5ru9t0h.apps.googleusercontent.com";
        });

        app.listen(port, () => {
            console.log('App now listening for request on port '+port);
        });

        app.use(express.static(__dirname + '/views/'));
        app.use(express.static(__dirname + "/../node_modules"));
    }
}
