

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



    sendEvent(userId, event) {
        var functions = this.functions;
        /*
            Peform a get with userId to get "item";
         */
        for (var key in item._services) {
            if (!item._services.hasOwnProperty(key)) continue;
            var service = item._services[key];
            for (var i = 0; i < service._triggers.length; i++) {
                var tmp = service._triggers[i];
                if (tmp.eventReaction === event)
                    TriggerHandler
                        .runFunction(functions, tmp.functionName, tmp.params)
            }
        }
    }
}


module.exports = { TriggerHandler };

