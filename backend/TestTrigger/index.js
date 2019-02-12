const TriggerHandler = require('./TriggerHandler.js').TriggerHandler;

var item = {
    _id: "972929028",
    username: "Test",
    password: "TestMDP",
    _services: {
        _twitter: {
            _triggers: [
                {
                    id: 1320,
                    timer: "1000",
                    eventReaction: "Timer",
                    functionName: "FctTest",
                    params: {
                        1: "42",
                        2: {
                            name: "LeNom",
                            mdp: "LeMdp"
                        }
                    }
                },
                {
                    id: 1111,
                    timer: "0",
                    eventReaction: "sendTweet",
                    functionName: "FctTest2",
                    params: {
                    }
                }
            ]
        },
        _dateAndTime: {
            _triggers: [
                {
                    id: 1125,
                    timer: "2000",
                    eventReaction: "Timer",
                    functionName: "FctTest2",
                    params: {
                        1: "43",
                    }
                }
            ]
        }
    }
};

module = {
    FctTest: FctTest,
    FctTest2: FctTest2
};

function FctTest(params) {
    console.log("FctTest");
}

function FctTest2(params) {
    console.log("FctTest2");
}

var tg = new TriggerHandler(module);


tg.addTrigger(item._id, item._services._dateAndTime._triggers[0]);
//tg.modifyTrigger(item._id, item._services._dateAndTime._triggers[0].id, item._services._twitter._triggers[0]);
//tg.clearTrigger(item._id, item._services._dateAndTime._triggers[0]);
//tg.showTimerList();

tg.sendEvent(item._id, "sendTweet");