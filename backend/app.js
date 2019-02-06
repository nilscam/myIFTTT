const express = require('express');
var path = require('path');
// Routes
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');

const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

module.exports = {
    launch_client: function(port) {
        const app = express();

        // set up view engine
        app.set('view engine', 'ejs');
        app.set('views', path.join(__dirname, '/../frontend/views'));
        app.use(express.static(__dirname + '/../frontend/views/'));

        app.use(cookieSession({
            maxAge: 24 * 60 * 60 * 1000,
            keys: [keys.session.cookieKey]
        }));

        // initialize passport
        app.use(passport.initialize());
        app.use(passport.session());

        // set up routes
        app.use('/auth', authRoutes);
        app.use('/profile', profileRoutes);

        // create home route
        app.get('/', (req, res) => {
            res.render('home', {user: req.user});
        });

        app.listen(port, () => {
            console.log('App now listening for request on port '+port);
        });
    }
}