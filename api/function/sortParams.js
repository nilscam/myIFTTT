function sortParams(params) {
    var retObj = {
        id: params.funcParams.id,
    };
    if (params.funcParams.params.hasOwnProperty('text')) {
        retObj.text = params.funcParams.params.text;
        if (params.triggerParams.hasOwnProperty('twitter')) {
            if (params.triggerParams.twitter.hasOwnProperty('tweet')) {
                retObj.text = retObj.text.replace("{tweet}", params.triggerParams.twitter.tweet.text);
            }
        } else if (params.triggerParams.hasOwnProperty('nasa')) {
            if (params.triggerParams.nasa.hasOwnProperty('title')) {
                retObj.text = retObj.text.replace("{title}", params.triggerParams.nasa.title);
            } else if (params.triggerParams.nasa.hasOwnProperty('image')) {
                retObj.text = retObj.text.replace("{image}", params.triggerParams.nasa.image);
            }
        }
    }
    return (retObj);
}

module.exports.sortParams = sortParams;