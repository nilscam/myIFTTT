const router = require('express').Router();
const twitterRoutes = require('./reactions/twitterReaction');
const instagramRoutes = require('./reactions/instagramReaction');

router.use('/twitter', twitterRoutes);
router.use('/instagram', instagramRoutes);

module.exports = router;