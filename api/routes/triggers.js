const router = require('express').Router();
const User = require('../models/user-model').User;
const twitterRoutes = require('./triggers/twitterTriggers');
const dateAndTimeRoutes = require('./triggers/dateAndTimeTriggers');
const instagramRoutes = require('./triggers/instagramTriggers');
const mailerRoutes = require('./triggers/mailerTriggers');
const facebookRoutes = require('./triggers/facebookTriggers');
const office365Routes = require('./triggers/office365Triggers');
const checkAuth = require('../middleware/check-auth');

router.use('/twitter', twitterRoutes);
router.use('/dateAndTime', dateAndTimeRoutes);
router.use('/instagram', instagramRoutes);
router.use('/mailer', mailerRoutes);
router.use('/facebook', facebookRoutes);
router.use('/office365', office365Routes);


router.get('/', checkAuth, (req, res) => {
    console.log(req.userData);
    User.findOne({_id: req.userData.userId}).then((currentUser) => {
        if (currentUser) {
            servicesToAff = {
                code: 200,
                error: null,
                data: currentUser._services,
            };
            res.send(JSON.stringify(servicesToAff, 0, 2));
        } else {
            res.send({code: 500, error: "User not found"});
        }
	});
});

module.exports = router;