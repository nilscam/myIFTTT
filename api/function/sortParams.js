function sortParams(params) {
    if (params.reaction.params.hasOwnProperty('text')) {
        if (params.paramsFromTrigger.hasOwnProperty('twitter')) {
            if (params.paramsFromTrigger.twitter.hasOwnProperty('tweet')) {
                params.reaction.params.text = params.reaction.params.text.replace("{tweet}", params.paramsFromTrigger.twitter.tweet.text);
            }
        } else if (params.paramsFromTrigger.hasOwnProperty('nasa')) {
            if (params.paramsFromTrigger.nasa.hasOwnProperty('title')) {
                params.reaction.params.text = params.reaction.params.text.replace("{title}", params.paramsFromTrigger.nasa.title);
            } else if (params.paramsFromTrigger.nasa.hasOwnProperty('image')) {
                params.reaction.params.text = params.reaction.params.text.replace("{image}", params.paramsFromTrigger.nasa.image);
            }
        } else if (params.paramsFromTrigger.hasOwnProperty('newYorkTimes')) {
            if (params.paramsFromTrigger.newYorkTimes.hasOwnProperty('title')) {
                params.reaction.params.title = params.paramsFromTrigger.newYorkTimes.title;
            }
            if (params.paramsFromTrigger.newYorkTimes.hasOwnProperty('description')) {
                params.reaction.params.text = params.reaction.params.text.replace("{description}", params.paramsFromTrigger.newYorkTimes.description);
            }
        } else if (params.paramsFromTrigger.hasOwnProperty('cryptocurrency')) {
            if (params.paramsFromTrigger.cryptocurrency.hasOwnProperty('title')) {
                params.reaction.params.title = params.paramsFromTrigger.cryptocurrency.title;
            }
            if (params.paramsFromTrigger.cryptocurrency.hasOwnProperty('description')) {
                params.reaction.params.text = params.reaction.params.text.replace("{description}", params.paramsFromTrigger.cryptocurrency.description);
            }
        }
    }
    return (params);
}

module.exports.sortParams = sortParams;