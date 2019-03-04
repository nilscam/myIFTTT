const express = require('express');
var path = require('path');
// Routes
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const instaRoutes = require('./routes/insta-routes');
const office365Routes = require('./routes/office365-routes');
const facebookRoutes = require('./routes/facebook-routes');

const passportSetupGoogle = require('./config/passport-google');
const passportSetupInsta = require('./config/passport-instagram');
const passportSetupOffice365 = require('./config/passport-office365');
const passportSetupFacebook = require('./config/passport-facebook');
const passportSetupTwitter = require('./config/passport-twitter');
const keys = require('./config/keys');
const passport = require('passport');

module.exports = {
    launch_client: function(port) {
        const app = express();

        // app.use(express.static(__dirname + '/../frontend/vue/dist/'));
        // app.use(express.static(__dirname + '/../frontend/vue/src/assets/'));

        // initialize passport
        app.use(passport.initialize());

        // set up routes
        app.use('/auth', authRoutes);
        app.use('/profile', profileRoutes);
        app.use('/instagram', instaRoutes);
        app.use('/facebook', facebookRoutes);
        app.use('/office365', office365Routes);

        // create home route
        // app.get('/', (req, res) => {
        //     res.render('home', {user: req.user});
        // });

        app.get('/', function (req, res) {
            // res.render('home', {user: req.user});
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
