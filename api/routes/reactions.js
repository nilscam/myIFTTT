const router = require('express').Router();
const twitterRoutes = require('./reactions/twitterReaction');
const instagramRoutes = require('./reactions/instagramReaction');
const mailerRoutes = require('./reactions/mailerReaction');
const facebookRoutes = require('./reactions/facebookReaction');
const office365Routes = require('./reactions/office365Reaction');

router.use('/twitter', twitterRoutes);
router.use('/instagram', instagramRoutes);
router.use('/mailer', mailerRoutes);
router.use('/facebook', facebookRoutes);
router.use('/office365', office365Routes);

module.exports = router;