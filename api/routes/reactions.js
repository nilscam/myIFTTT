const router = require('express').Router();
const instagramRoutes = require('./reactions/instagramReaction');
const mailerRoutes = require('./reactions/mailerReaction');

router.use('/instagram', instagramRoutes);
router.use('/mailer', mailerRoutes);

module.exports = router;