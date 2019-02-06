const appApi = require('./api/app');
const appClient = require('./backend/app');

<<<<<<< HEAD
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const path = require('path')
//var expressVue = require("express-vue");

const app = express();

// const expressVueMiddleware = expressVue.init();
// app.use(expressVueMiddleware);

// set up view engine
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views/'));
app.use(express.static(path.join(__dirname, 'node_modules')));

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

// create home route
app.get('/', (req, res) => {
	res.render('home', {user: req.user});
});

app.listen(8080, () => {
	console.log('App now listening for request on port 8080');
});
=======
appApi.launch_api(8080);
appClient.launch_client(3000);
>>>>>>> 6466a968e76c1eb588219ef752c316fa2ed98a59
