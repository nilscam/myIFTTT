function sortParams(params) {
    var retObj = {
        id: params.funcParams.id,
    };
    if (params.funcParams.params.hasOwnProperty('text')) {
        retObj.text = params.funcParams.params.text;
        if (params.triggerParams.hasOwnProperty('twitter') &&
        params.triggerParams.twitter.hasOwnProperty('tweet')) {
            retObj.text = retObj.text.replace("{tweet}", params.triggerParams.twitter.tweet.text);
        }
    }
    return (retObj);
}

module.exports.sortParams = sortParams;