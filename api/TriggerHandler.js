const User = require('./models/user-model').User;

class TriggerHandler {
    constructor(functions) {
        this.functions = functions;
        this.timerList = [];
        this.instance = this;
    }

    showTimerList() {
        for (var i = 0; i < this.timerList.length; i++) {
            console.log({userId: this.timerList[i].userId,
            triggerId: this.timerList[i].triggerId});
        }
    }

    modifyTrigger(userId, oldTriggerId, newTrigger) {
        this.clearTrigger(userId, oldTriggerId);
        this.addTrigger(userId, newTrigger);
    }

    clearTrigger(userId, triggerId) {
        for (var i = 0; i < this.timerList.length; i++)
            if (this.timerList[i].userId === userId && this.timerList[i].triggerId === triggerId) {
                clearInterval(this.timerList[i].handler);
                return this.timerList.splice(i, 1);
            }
    }

    static runFunction(functions, name, params) {
        if (functions[name]) {
            //console.log(name + " --- " + JSON.stringify(params, null, 2))
            functions[name](params);
        } else {
            console.log("Function ", name, " doesn't exist");
        }
    }

    addTrigger(userId, newTrigger) {
        var handler = '';
        var functions = this.functions;
        if (newTrigger.eventReaction === "Timer") {
            handler = setInterval(function () {
              TriggerHandler.runFunction(functions, newTrigger.functionName, newTrigger.params)
            }, newTrigger.timer);
            this.timerList.push({userId: userId, triggerId: newTrigger.id, handler: handler});
        }
    }


    sendEvent(userId, event, params) {
        var functions = this.functions;
        User.findOne({_id: userId}).then((item) => {
            for (var key in item._services) {
                if (!item._services.hasOwnProperty(key) || key == '$init') continue;
                var service = item._services[key];
                for (var i = 0; i < service._triggers.length; i++) {
                    var tmp = service._triggers[i];
                    var tmpParams = {
                        funcParams: tmp.params,
                        triggerParams: params
                    };
                    if (tmp.eventReaction === event)
                        TriggerHandler
                            .runFunction(functions, tmp.functionName, tmpParams);
                }
            }
        });
    }
}


module.exports = { TriggerHandler };

