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
                    timer: "5000",
                    date : {
                        day: "6",
                        hour: "1",
                        min: "39",
                        sec: "0"
                    },
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
                    id: 1321,
                    timer: "5000",
                    date : {
                        day: "6",
                        hour: "1",
                        min: "11",
                        sec: "0"
                    },
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
                    timer: "5000",
                    date : {
                        day: "6",
                        hour: "1",
                        min: "11",
                        sec: "0"
                    },
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
    console.log(params.name);
}

function FctTest2(params) {
    console.log("FctTest2");
}

var tg = new TriggerHandler(module);


//tg.modifyTrigger(item._id, item._services._dateAndTime._triggers[0].id, item._services._twitter._triggers[0]);
//tg.clearTrigger(item._id, item._services._dateAndTime._triggers[0]);
//tg.showTimerList();

//tg.sendEvent(item._id, "sendTweet");

//tg.startEveryone(13, 23, 45,  32);
//tg.addTrigger(item._id, item._services._twitter._triggers[0]);

tg.startEveryone();

/*
tg.addTrigger(item._id, item._services._twitter._triggers[1]);
tg.showDelayList();
tg.showTimerList();
tg.clearTrigger(item._id, item._services._twitter._triggers[0].id);
tg.showDelayList();
tg.showTimerList();
*/
