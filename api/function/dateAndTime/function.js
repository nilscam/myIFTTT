const User = require('../../models/user-model').User;
const keys = require('../../config/keys');

// ! Triggers

// ! HERE COMES OLIVIER

function addEvent(params) {
    var now = new Date();
    var paramsFromTrigger = {
        dateAndTime: {
            day: now.getDay(),
            hour: now.getHours(),
            min: now.getMinutes(),
            sec: now.getSeconds(),
        }
    }
    params.triggerParams.paramsFromTrigger = paramsFromTrigger
    tg.sendEvent(params.triggerParams.params.id, params.name, params.triggerParams);
}

function addEveryDay(params) {
    // 864 000 00
    console.log("ADD EVERY DAY")
    var sendParam = {
        triggerParams: params,
        name: "addEveryDay"
    }
    addEvent(sendParam);
}
function addEveryHour(params) {
    // 3600 000
    console.log("ADD EVERY HOUR")
    var sendParam = {
        triggerParams: params,
        name: "addEveryHour"
    }
    addEvent(sendParam);
}
function addEveryDayOfTheWeek(params) {
    // 604800000
    console.log("ADD EVERY WEEK")
    var sendParam = {
        triggerParams: params,
        name: "addEveryDayOfTheWeek"
    }
    addEvent(sendParam);
}
function addEveryMonth(params) {

}

function addEveryYear(params) {

}

// ! Reactions


module.exports = {
    addEveryDay : addEveryDay,
    addEveryHour : addEveryHour,
    addEveryDayOfTheWeek : addEveryDayOfTheWeek,
    addEveryMonth : addEveryMonth,
    addEveryYear : addEveryYear,
}