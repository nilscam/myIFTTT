function whatToChange(type, params) {
    if (params.paramsFromTrigger.hasOwnProperty('twitter')) {
        if (params.paramsFromTrigger.twitter.hasOwnProperty('tweet')) {
            params.reaction.params[type] = params.reaction.params[type].replace("{tweet}", params.paramsFromTrigger.twitter.tweet.text);
        }
    } else if (params.paramsFromTrigger.hasOwnProperty('nasa')) {
        if (params.paramsFromTrigger.nasa.hasOwnProperty('title')) {
            params.reaction.params[type] = params.reaction.params[type].replace("{title}", params.paramsFromTrigger.nasa.title);
        } else if (params.paramsFromTrigger.nasa.hasOwnProperty('image')) {
            params.reaction.params[type] = params.reaction.params[type].replace("{image}", params.paramsFromTrigger.nasa.image);
        }
    } else if (params.paramsFromTrigger.hasOwnProperty('weather')) {
        if (params.paramsFromTrigger.weather.hasOwnProperty('value')) {
            params.reaction.params[type] = params.reaction.params[type].replace("{value}", ''+params.paramsFromTrigger.weather.value);
        }
    } else if (params.paramsFromTrigger.hasOwnProperty('instagram')) {
        if (params.paramsFromTrigger.instagram.hasOwnProperty('url')) {
            params.reaction.params[type] = params.reaction.params[type].replace("{url}", ''+params.paramsFromTrigger.instagram.url);
        }
    } else if (params.paramsFromTrigger.hasOwnProperty('newYorkTimes')) {
        if (params.paramsFromTrigger.newYorkTimes.hasOwnProperty('title')) {
            params.reaction.params[type] = params.reaction.params[type].replace("{title}", params.paramsFromTrigger.newYorkTimes.title);
        }
        if (params.paramsFromTrigger.newYorkTimes.hasOwnProperty('description')) {
            params.reaction.params[type] = params.reaction.params[type].replace("{description}", params.paramsFromTrigger.newYorkTimes.description);
        }
    } else if (params.paramsFromTrigger.hasOwnProperty('cryptocurrency')) {
        if (params.paramsFromTrigger.cryptocurrency.hasOwnProperty('title')) {
            params.reaction.params[type] = params.reaction.params[type].replace("{title}", params.paramsFromTrigger.cryptocurrency.title);
        }
        if (params.paramsFromTrigger.cryptocurrency.hasOwnProperty('description')) {
            params.reaction.params[type] = params.reaction.params[type].replace("{description}", params.paramsFromTrigger.cryptocurrency.description);
        }
    } else if (params.paramsFromTrigger.hasOwnProperty('dateAndTime')) {
        if (params.paramsFromTrigger.dateAndTime.hasOwnProperty('day')) {
            params.reaction.params[type] = params.reaction.params[type].replace("{day}", ""+params.paramsFromTrigger.dateAndTime.day);
        }
        if (params.paramsFromTrigger.dateAndTime.hasOwnProperty('hour')) {
            params.reaction.params[type] = params.reaction.params[type].replace("{hour}", ""+params.paramsFromTrigger.dateAndTime.hour);
        }
        if (params.paramsFromTrigger.dateAndTime.hasOwnProperty('min')) {
            params.reaction.params[type] = params.reaction.params[type].replace("{min}", ""+params.paramsFromTrigger.dateAndTime.min);
        }
    }
    return params
}

function sortParams(params) {
    if (params.reaction.params.hasOwnProperty('text')) {
        params = whatToChange('text', params)
    }
    if (params.reaction.params.hasOwnProperty('title')) {
        params = whatToChange('title', params)
    }
    //todo : Add title
    return (params);
}

module.exports.sortParams = sortParams;