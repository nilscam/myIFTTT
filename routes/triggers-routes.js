const router = require('express').Router();
const twitterRoutes = require('./triggers/twitterTriggers-routes');
const dateAndTimeRoutes = require('./triggers/dateAndTimeTriggers-routes');

router.use('/twitter', twitterRoutes);
router.use('/dateAndTime', dateAndTimeRoutes);

module.exports = router;