const User = require('../../models/user-model').User;
const keys = require('../../config/keys');

// ! Triggers

// ! HERE COMES OLIVIER

function addEveryDay(params) {
    // 864 000 00
}
function addEveryHour(params) {
    // 3600 000
}
function addEveryDayOfTheWeek(params) {
    // 604800000
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