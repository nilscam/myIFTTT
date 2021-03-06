const router = require('express').Router();
const User = require('../models/user-model').User;
const Logger = require('../models/logger-model').Logger;
const checkAuth = require('../middleware/check-auth');
const infosApplet = require('../infosApplet').infosApplet;
const addAppletLogger = require('../function/logger').addAppletLogger;
const activateAppletLogger = require('../function/logger').activateAppletLogger;
const deleteAppletLogger = require('../function/logger').deleteAppletLogger;
const validate = require('express-validation');
const Joi = require('joi');

router.get('/', checkAuth, (req, res) => {
    User.findOne({_id: req.userData.userId}).then((currentUser) => {
        if (currentUser) {
            var applets = {};
            var idxApplet = 0;
            for (var key in currentUser._services) {
                if (!currentUser._services.hasOwnProperty(key) || key == '$init') continue;
                var service = currentUser._services[key];
                for (var i = 0; i < service._triggers.length; i++) {
                    var tmp = service._triggers[i];
                    if (tmp.eventReaction === 'Timer' ||
                    tmp.eventReaction === 'MonthTimer' ||
                    tmp.eventReaction === 'YearTimer') {
                        tmpObj = {}
                        tmpObj.trigger = tmp;
                        tmpObj.trigger.infos = infosApplet[tmp.functionName];
                        tmpObj.reaction = tmp.reaction;
                        tmpObj.reaction.infos = infosApplet[tmp.reaction.functionName];
                        delete tmpObj.trigger['reaction']
                        applets[++idxApplet] = tmpObj;
                    }
                }
            }
            res.status(200).send(JSON.stringify(applets, 0, 2));  
        } else {
            res.status(401).send({code: 401, error: "User not found"});
        }
	});
});

function addTrigger(params) {
    return new Promise((resolve, reject) => {
        User.findOne({_id: params.req.userData.userId}).then((currentUser) => {
            if (currentUser) {
                objToAdd = {
                    id: Date.now(),
                    isActive: true,
                    timer: params.trigger.timer,
                    service: params.trigger.service,
                    eventReaction: params.trigger.eventReaction,
                    functionName: params.trigger.name,
                    params: {
                        id: currentUser._id,
                        params: params.trigger.params
                    },
                    reaction: {
                        service: params.reaction.service,
                        functionName: params.reaction.name,
                        params: params.reaction.params
                    }
                };
                var now = new Date();
                objToAdd.date = {
                    day: params.trigger.params.day ? params.trigger.params.day : now.getDay(),
                    hour: params.trigger.params.hour ? params.trigger.params.hour : now.getHours(),
                    min: params.trigger.params.minute ? params.trigger.params.minute : now.getMinutes(),
                    sec: now.getSeconds(),
                }
                if (objToAdd.functionName == "addEveryDay") {
                    objToAdd.timer = 86400000;
                } else if (objToAdd.functionName == "addEveryHour") {
                    objToAdd.timer = 3600000;
                } else if (objToAdd.functionName == "addEveryDayOfTheWeek") {
                    objToAdd.timer = 604800000;
                } else if (objToAdd.functionName == "addEveryMonth") {
                    objToAdd.eventReaction = "MonthTimer";
                } else if (objToAdd.functionName == "addEveryYear") {
                    objToAdd.eventReaction = "YearTimer";
                }
                if (currentUser._services.hasOwnProperty('_'+params.trigger.service) == false ||
                currentUser._services.hasOwnProperty('_'+params.reaction.service) == false) {
                    reject(501);
                    return;
                }
                currentUser._services['_'+params.trigger.service]._triggers.push(objToAdd);
                currentUser.save();
                addAppletLogger(params, objToAdd, resolve, reject);
            } else {
                reject(401);
            }
        });
    })
}

var payloadAddTrigger = {
    body: {
        trigger: Joi.object().keys({
            service: Joi.string().required(),
            name: Joi.string().required(),
            params: Joi.object().required(),
        }).required(),
        reaction: Joi.object().keys({
            service: Joi.string().required(),
            name: Joi.string().required(),
            params: Joi.object().required(),
        }).required(),
      }
}
router.post('/', checkAuth, validate(payloadAddTrigger), (req, res) => {
    if (req.body == undefined ||
        req.body.trigger.timer == undefined) {
            req.body.trigger.timer = 5000;
        }
    var triggerP = addTrigger({
        req: req,
        res: res,
        trigger: {
            service: req.body.trigger.service,
            name: req.body.trigger.name,
            timer: req.body.trigger.timer,
            eventReaction: "Timer",
            params: req.body.trigger.params
        },
        reaction: {
            service: req.body.reaction.service,
            name: req.body.reaction.name,
            eventReaction: req.body.trigger.name,
            params: req.body.reaction.params
        }
    });
    triggerP.then((result) => {
        res.status(result).send({code: result});  
    }, (err) => {
        res.status(err).send({code: err});  
    })
});

var payloadActivateTrigger = {
    body: {
        triggerId: Joi.number().required(),
        active: Joi.bool().required(),
      }
}
router.post('/activate', checkAuth, validate(payloadActivateTrigger) ,(req, res) => {
    User.findOne({_id: req.userData.userId}).then((currentUser) => {
        if (currentUser) {
            var foundTrigger = false;
            var triggerId = req.body.triggerId;
            var isActive = req.body.active;
            for (var key in currentUser._services) {
                if (!currentUser._services.hasOwnProperty(key) || key == '$init') continue;
                var service = currentUser._services[key];
                for (var i = 0; i < service._triggers.length; i++) {
                    var tmp = service._triggers[i];
                    if (tmp.id === triggerId) {
                        foundTrigger = true;
                        if (isActive == tmp.isActive) {
                            return res.status(201).send({code: 201, msg: "Useless Modification"});
                        }
                        currentUser._services[key]._triggers[i].isActive = isActive;
                        currentUser.markModified("_services."+key+"._triggers");
                        currentUser.save();
                        activateAppletLogger(currentUser._services[key]._triggers[i], req, currentUser, key, i).then((result) => {
                            return res.status(result).send({code: result}); 
                        }, (err) => {
                            return res.status(err).send({code: err});
                        })
                    }
                }
            }
            if (!foundTrigger) {
                return res.status(500).send({code: 500, error: "Unknown triggerId"});
            }
        } else {
            return res.status(401).send({code: 401, error: "User not found"});
        }
	});
});

var payloadDeleteTrigger = {
    body: {
        triggerId: Joi.number().required(),
      }
}
router.delete('/', checkAuth, validate(payloadDeleteTrigger),(req, res) => {
    User.findOne({_id: req.userData.userId}).then((currentUser) => {
        if (currentUser) {
            var foundTrigger = false;
            var triggerId = req.body.triggerId;
            for (var key in currentUser._services) {
                if (!currentUser._services.hasOwnProperty(key) || key == '$init') continue;
                var service = currentUser._services[key];
                for (var i = 0; i < service._triggers.length; i++) {
                    var tmp = service._triggers[i];
                    if (tmp.id === triggerId) {
                        foundTrigger = true;
                        deleteAppletLogger(currentUser._services[key]._triggers[i], req, currentUser, key, i).then((result) => {
                            return res.status(200).send({code: 200});
                        }, (err) => {
                            return res.status(err).send({code: err});
                        })
                    }
                }
            }
            if (!foundTrigger) {
                return res.status(500).send({code: 500, error: "Unknown triggerId"});
            }
        } else {
            return res.status(401).send({code: 401, error: "User not found"});
        }
	});
});

module.exports = router;