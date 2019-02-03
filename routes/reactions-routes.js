const router = require('express').Router();
const twitterRoutes = require('./reactions/twitterReaction-routes');

router.use('/twitter', twitterRoutes);

module.exports = router;