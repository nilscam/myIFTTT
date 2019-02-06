const router = require('express').Router();
const twitterRoutes = require('./reactions/twitterReaction');

router.use('/twitter', twitterRoutes);

module.exports = router;