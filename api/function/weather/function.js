const User = require('../../models/user-model').User;
const keys = require('../../config/keys');
const weather = require('weather-js');

// ! Triggers

function temperatureBelow(params) {
    User.findOne({_id: params.params.id}).then((currentUser) => {
        weather.find({search: currentUser._services._weather._location, degreeType: 'C'}, function(err, result) {
            if (err) {
                console.log("Error weather: "+err);
            } else {
                if (result.length > 0 &&
                result[0].current.temperature < params.params.params.value &&
                result[0].current.day != currentUser._services._weather._last_tempBelowAct) {
                    currentUser._services._weather._last_tempBelowAct = result[0].current.day;
                    currentUser.save();
                    var paramsFromTrigger = {
                        weather: {
                            value: result[0].current.temperature,
                        }
                    }
                    params.paramsFromTrigger = paramsFromTrigger
                    tg.sendEvent(params.params.id, "temperatureBelow", params);
                }
            }
        });
    });
}
function temperatureAbove(params) {
    User.findOne({_id: params.params.id}).then((currentUser) => {
        weather.find({search: currentUser._services._weather._location, degreeType: 'C'}, function(err, result) {
            if (err) {
                console.log("Error weather: "+err);
            } else {
                if (result.length > 0 &&
                result[0].current.temperature > params.params.params.value &&
                result[0].current.day != currentUser._services._weather._last_tempAboveAct) {
                    currentUser._services._weather._last_tempAboveAct = result[0].current.day;
                    currentUser.save();
                    var paramsFromTrigger = {
                        weather: {
                            value: result[0].current.temperature,
                        }
                    }
                    params.paramsFromTrigger = paramsFromTrigger
                    tg.sendEvent(params.params.id, "temperatureAbove", params);
                }
            }
        });
    });
}
function humidityLevelAbove(params) {
    User.findOne({_id: params.params.id}).then((currentUser) => {
        weather.find({search: currentUser._services._weather._location, degreeType: 'C'}, function(err, result) {
            if (err) {
                console.log("Error weather: "+err);
            } else {
                if (result.length > 0 &&
                result[0].current.humidity > params.params.params.value &&
                result[0].current.day != currentUser._services._weather._last_humidityAboveAct) {
                    currentUser._services._weather._last_humidityAboveAct = result[0].current.day;
                    currentUser.save();
                    var paramsFromTrigger = {
                        weather: {
                            value: result[0].current.humidity,
                        }
                    }
                    params.paramsFromTrigger = paramsFromTrigger
                    tg.sendEvent(params.params.id, "humidityLevelAbove", params);
                }
            }
        });
    });
}
function currentConditionChangesTo(params) {
    User.findOne({_id: params.params.id}).then((currentUser) => {
        weather.find({search: currentUser._services._weather._location, degreeType: 'C'}, function(err, result) {
            if (err) {
                console.log("Error weather: "+err);
            } else {
                if (result.length > 0 &&
                result[0].current.skytext == params.params.params.text &&
                result[0].current.day != currentUser._services._weather._last_condChangesAct) {
                    currentUser._services._weather._last_condChangesAct = result[0].current.day;
                    currentUser.save();
                    var paramsFromTrigger = {
                        weather: {
                            value: result[0].current.skytext
                        }
                    }
                    params.paramsFromTrigger = paramsFromTrigger
                    tg.sendEvent(params.params.id, "currentConditionChangesTo", params);
                }
            }
        });
    });
}

// ! Reactions


module.exports = {
    temperatureBelow : temperatureBelow,
    temperatureAbove : temperatureAbove,
    humidityLevelAbove : humidityLevelAbove,
    currentConditionChangesTo : currentConditionChangesTo,
}