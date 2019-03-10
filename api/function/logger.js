const Logger = require('../models/logger-model').Logger;
const infosApplet = require('../infosApplet').infosApplet;

function addAppletLogger(params, resolve, reject) {
    Logger.findOne({_id: params.req.userData.userId}).then((currentLogger) => {
        if (!currentLogger) {
            reject(500);
        }
        if (currentLogger.logs.length > 15) {
            currentLogger.logs.splice(0, currentLogger.logs.length - 15);
        }
        var titleTrigger = infosApplet[objToAdd.functionName].title;
        var titleReaction = infosApplet[objToAdd.reaction.functionName].title;
        var logToAdd = {
            title: "Applet created",
            date: new Date(),
            applet_message: "If "+titleTrigger+", then "+titleReaction,
            extra_message: "You created an applet",
            trigger: objToAdd
        }
        currentLogger.logs.push(logToAdd);
        currentLogger.save();
        tg.addTrigger(params.req.userData.userId, objToAdd);
        resolve(200);
    });
}

function appletRanLogger(params, errorMessage) {
    Logger.findOne({_id: params.params.id}).then((currentLogger) => {
        if (!currentLogger) {
            return;
        }
        if (currentLogger.logs.length > 15) {
            currentLogger.logs.splice(0, currentLogger.logs.length - 15);
        }
        var extraMessage;
        var title;
        if (errorMessage) {
            title = "Applet failed";
            extraMessage = errorMessage;
        } else {
            title = "Applet ran";
            extraMessage = "Applet ran successfully"
        }
        var titleTrigger = infosApplet[params.functionName].title;
        var titleReaction = infosApplet[params.reaction.functionName].title;
        var logToAdd = {
            title: title,
            date: new Date(),
            applet_message: "If "+titleTrigger+", then "+titleReaction,
            extra_message: extraMessage,
            trigger: params
        }
        currentLogger.logs.push(logToAdd);
        currentLogger.save();
    });
}

module.exports.addAppletLogger = addAppletLogger;
module.exports.appletRanLogger = appletRanLogger;