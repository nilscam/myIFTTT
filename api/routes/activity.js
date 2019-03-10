const router = require('express').Router();
const Logger = require('../models/logger-model').Logger;
const checkAuth = require('../middleware/check-auth');
const infosApplet = require('../infosApplet').infosApplet;

router.get('/', checkAuth, (req, res) => {
    Logger.findOne({_id: req.userData.userId}).then((currentLogger) => {
        if (currentLogger) {
            for (var i = 0; i < currentLogger.logs.length; i++) {
                currentLogger.logs[i].trigger.infos = infosApplet[currentLogger.logs[i].trigger.functionName]
                currentLogger.logs[i].trigger.reaction.infos = infosApplet[currentLogger.logs[i].trigger.reaction.functionName]
            }
            var returnArray = currentLogger.logs.reverse();
            res.status(200).send(JSON.stringify(returnArray, 0, 2));
        } else {
            res.status(401).send({code: 401, error: "User not found"});
        }
	});
});

module.exports = router;