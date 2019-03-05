const router = require('express').Router();
const User = require('../models/user-model').User;
const dateAndTimeRoutes = require('./triggers/dateAndTimeTriggers');
const instagramRoutes = require('./triggers/instagramTriggers');
const mailerRoutes = require('./triggers/mailerTriggers');
const checkAuth = require('../middleware/check-auth');

router.use('/dateAndTime', dateAndTimeRoutes);
router.use('/instagram', instagramRoutes);
router.use('/mailer', mailerRoutes);


const weather = require('weather-js');

router.get('/', checkAuth, (req, res) => {
    // weather.find({search: "Marseille", degreeType: 'C'}, function(err, result) {
    //     if (err) {
    //         console.log("ERROR meteo: " + err);
    //     } else {
    //         console.log(result);
    //         if (result[0]) {
    //             res.send(JSON.stringify(result[0].current, 0, 2));
    //         }
    //     }
    // });
    // console.log(req.userData);
    // User.findOne({_id: req.userData.userId}).then((currentUser) => {
    //     if (currentUser) {
    //         servicesToAff = {
    //             code: 200,
    //             error: null,
    //             data: currentUser._services,
    //         };
    //         res.send(JSON.stringify(servicesToAff, 0, 2));
    //     } else {
    //         res.send({code: 500, error: "User not found"});
    //     }
	// });
});

module.exports = router;