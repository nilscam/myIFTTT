const router = require('express').Router();
const User = require('../models/user-model').User;
const checkAuth = require('../middleware/check-auth');
const infosApplet = require('../infosApplet');

router.get('/', checkAuth, (req, res) => {
    console.log(req.userData);
    User.findOne({_id: req.userData.userId}).then((currentUser) => {
        if (currentUser) {
            var triggers = {};
            for (var key in currentUser._services) {
                if (!currentUser._services.hasOwnProperty(key) || key == '$init') continue;
                var service = currentUser._services[key];
                for (var i = 0; i < service._triggers.length; i++) {
                    var tmp = service._triggers[i];
                    if (tmp.eventReaction === 'Timer') {
                        triggers[tmp.functionName] = tmp;
                        triggers[tmp.functionName].infos = infosApplet[tmp.functionName];
                    }
                }
            }
            var applets = {};
            var idxApplet = 0;
            for (var key in currentUser._services) {
                if (!currentUser._services.hasOwnProperty(key) || key == '$init') continue;
                var service = currentUser._services[key];
                for (var i = 0; i < service._triggers.length; i++) {
                    var tmp = service._triggers[i];
                    if (tmp.eventReaction != 'Timer') {
                        var tmpObj = {
                            trigger: triggers[tmp.eventReaction],
                            reaction: tmp,
                        }
                        tmpObj.reaction.infos = infosApplet[tmp.functionName];
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
                for (var key in currentUser._services) {
                    if (!currentUser._services.hasOwnProperty(key) || key == '$init') continue;
                    var service = currentUser._services[key];
                    for (var i = 0; i < service._triggers.length; i++) {
                        var tmp = service._triggers[i];
                        if (tmp.functionName === params.trigger.name) {
                            resolve(200);
                            return;
                        }
                    }
                }
                objToAdd = {
                    id: Date.now(),
                    timer: params.trigger.timer,
                    eventReaction: params.trigger.eventReaction,
                    functionName: params.trigger.name,
                    params: {
                        id: currentUser._id,
                        params: params.trigger.params
                    },
                };
                if (currentUser._services.hasOwnProperty('_'+params.trigger.service) == false) {
                    reject(402);
                    return;
                }
                currentUser._services['_'+params.trigger.service]._triggers.push(objToAdd);
                currentUser.save();
                tg.addTrigger(objToAdd._id, objToAdd);
                resolve(200);
            } else {
                reject(401);
            }
        });
    })
}

function addReaction(params) {
    return new Promise((resolve, reject) => {
        User.findOne({_id: params.req.userData.userId}).then((currentUser) => {
            if (currentUser) {
                objToAdd = {
                    id: Date.now(),
                    timer: "0",
                    eventReaction: params.reaction.eventReaction,
                    functionName: params.reaction.name,
                    params: {
                        id: currentUser._id,
                        params: params.reaction.params
                    },
                };
                if (currentUser._services.hasOwnProperty('_'+params.reaction.service) == false) {
                    reject(402);
                    return;
                }
                currentUser._services['_'+params.reaction.service]._triggers.push(objToAdd);
                currentUser.save();
                tg.addTrigger(objToAdd._id, objToAdd);
                resolve(200);
            } else {
                reject(401);
            }
        });
    });
}

router.post('/', checkAuth, (req, res) => {
    var triggerP = addTrigger({
        req: req,
        res: res,
        trigger: {
            service: req.body.trigger.service,
            name: req.body.trigger.name,
            timer: req.body.trigger.timer,
            eventReaction: "Timer",
            params: req.body.trigger.params
        }
    });
    triggerP.then((result) => {
        var reactionP = addReaction({
            req: req,
            res: res,
            reaction: {
                service: req.body.reaction.service,
                name: req.body.reaction.name,
                eventReaction: req.body.trigger.name,
                params: req.body.reaction.params
            }
        });
        reactionP.then((result) => {
            res.status(result).send({code: result});  
        }, (err) => {
            res.status(err).send({code: err});  
        })
    }, (err) => {
        res.status(err).send({code: err});  
    })
});

module.exports = router;