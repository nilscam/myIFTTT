const Logger = require('../models/logger-model').Logger;
const infosApplet = require('../infosApplet').infosApplet;

function addAppletLogger(params, objToAdd, resolve, reject) {
    Logger.findOne({_id: params.req.userData.userId}).then((currentLogger) => {
        if (!currentLogger) {
            reject(401);
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

function activateAppletLogger(params, req, currentUser, key, i) {
    return new Promise((resolve, reject) => {
        Logger.findOne({_id: req.userData.userId}).then((currentLogger) => {
            if (!currentLogger) {
                reject(401);
            }
            if (currentLogger.logs.length > 15) {
                currentLogger.logs.splice(0, currentLogger.logs.length - 15);
            }
            var title;
            var extraMessage;
            if (params.isActive) {
                title = "Applet turned on";
                extraMessage = "You turned on your applet"
            } else {
                title = "Applet turned off";
                extraMessage = "You turned off your applet"
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
            if (params.isActive) {
                tg.addTrigger(req.userData.userId, currentUser._services[key]._triggers[i]);
            } else {
                tg.clearTrigger(req.userData.userId, currentUser._services[key]._triggers[i].id);
            }
            resolve(200);
        });
    })
}

function deleteAppletLogger(params, req, currentUser, key, i) {
    return new Promise((resolve, reject) => {
        Logger.findOne({_id: req.userData.userId}).then((currentLogger) => {
            if (!currentLogger) {
                reject(401);
            }
            if (currentLogger.logs.length > 15) {
                currentLogger.logs.splice(0, currentLogger.logs.length - 15);
            }
            var titleTrigger = infosApplet[params.functionName].title;
            var titleReaction = infosApplet[params.reaction.functionName].title;
            var triggerId = currentUser._services[key]._triggers[i].id;
            var logToAdd = {
                title: "Applet deleted",
                date: new Date(),
                applet_message: "If "+titleTrigger+", then "+titleReaction,
                extra_message: "You deleted an applet",
                trigger: params
            }
            currentLogger.logs.push(logToAdd);
            currentLogger.save();
            currentUser._services[key]._triggers.splice(i, 1);
            currentUser.save();
            tg.clearTrigger(req.userData.userId, triggerId);
            resolve(200);
        });
    })
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
module.exports.activateAppletLogger = activateAppletLogger;
module.exports.deleteAppletLogger = deleteAppletLogger;
module.exports.appletRanLogger = appletRanLogger;