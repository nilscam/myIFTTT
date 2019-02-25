const User = require('./models/user-model').User;

class TriggerHandler {
    constructor(functions) {
        this.functions = functions;
        this.delayList = [];
        this.timerList = [];
    }

    showDelayList() {
        console.log("Delay List: ");
        for (var i = 0; i < this.delayList.length; i++) {
            console.log({userId: this.delayList[i].userId,
                triggerId: this.delayList[i].triggerId});
        }
        console.log("End");
    }

    showTimerList() {
        console.log("Timer List: ")
        for (var i = 0; i < this.timerList.length; i++) {
            console.log({userId: this.timerList[i].userId,
                triggerId: this.timerList[i].triggerId});
        }
        console.log("End");
    }

    modifyTrigger(userId, oldTriggerId, newTrigger) {
        this.clearTrigger(userId, oldTriggerId);
        this.addTrigger(userId, newTrigger);
    }

    clearTrigger(userId, triggerId) {
        for (var i = 0; i < this.delayList.length; i++)
            if (this.delayList[i].userId === userId && this.delayList[i].triggerId === triggerId) {
                clearTimeout(this.delayList[i].handler);
                this.delayList.splice(i, 1);
            }
        for (var j = 0; j < this.timerList.length; j++) {
            if (this.timerList[j].userId === userId && this.timerList[j].triggerId === triggerId) {
                clearInterval(this.timerList[j].handler);
                this.timerList.splice(j, 1);
            }
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

    // addTrigger(userId, newTrigger) {
    //     var handler = '';
    //     var functions = this.functions;
    //     if (newTrigger.eventReaction === "Timer") {
    //         handler = setInterval(function () {
    //           TriggerHandler.runFunction(functions, newTrigger.functionName, newTrigger.params)
    //         }, newTrigger.timer);
    //         this.timerList.push({userId: userId, triggerId: newTrigger.id, handler: handler});
    //     }
    // }

    addTrigger(userId, newTrigger) {
        var intHandler = '';
        var timHandler = '';
        var functions = this.functions;
        if (newTrigger.eventReaction === "Timer") {
            timHandler = setTimeout(function () {
                intHandler = setInterval(function () {
                    TriggerHandler.runFunction(functions, newTrigger.functionName, newTrigger.params)
                }, newTrigger.timer);
            }, this.getTimeout(newTrigger.timer, newTrigger.date));
            this.delayList.push({userId: userId, triggerId: newTrigger.id, handler: timHandler});
            this.timerList.push({userId: userId, triggerId: newTrigger.id, handler: intHandler});
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

    startEveryone(userId) {
        User.findOne({_id: userId}).then((item) => {
            for (var p in item._services) {
                if (item._services.hasOwnProperty(p)) {
                    for (var i = 0; i < item._services[p]._triggers.length; i++) {
                        var trigger = item._services[p]._triggers[i];
                        this.addTrigger(item._id, trigger);
                    }
                }
            }
        });
     }

     calcDate(day, hour, min, sec) {
        var MILI = 1;
        var SEC = MILI * 1000;
        var MIN = SEC * 60;
        var HOUR = MIN * 60;
        var DAY = HOUR * 24;
        return (DAY * day + HOUR * hour + MIN * min + sec * SEC)
    }

   getTimeout(timer, date) {
       var now = new Date();
        var nowSec = this.calcDate(now.getDay(), now.getHours(),
            now.getMinutes(), now.getSeconds());
        var timerSec = this.calcDate(date.day, date.hour, date.min, date.sec);
        var diff = timerSec - nowSec;
       if (diff < 0)
            diff += 604800000;
       diff -= Number(timer);
       return diff;
    }
}


module.exports = { TriggerHandler };

