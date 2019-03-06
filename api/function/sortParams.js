function sortParams(params) {
    console.log(params)
    var retObj = {
        id: params.funcParams.id,
        triggerInfo: Object.keys(params.triggerParams)[0]
    };
    console.log(params)
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
        } else if (params.triggerParams.hasOwnProperty('newYorkTimes')) {
            if (params.triggerParams.newYorkTimes.hasOwnProperty('title')) {
                retObj.title = params.triggerParams.newYorkTimes.title;
            }
            if (params.triggerParams.newYorkTimes.hasOwnProperty('description')) {
                retObj.text = retObj.text.replace("{description}", params.triggerParams.newYorkTimes.description);
            }
        } else if (params.triggerParams.hasOwnProperty('cryptocurrency')) {
            if (params.triggerParams.cryptocurrency.hasOwnProperty('title')) {
                retObj.title = params.triggerParams.cryptocurrency.title;
            }
            if (params.triggerParams.cryptocurrency.hasOwnProperty('description')) {
                retObj.text = retObj.text.replace("{description}", params.triggerParams.cryptocurrency.description);
            }
        }
    }
    console.log(retObj);
    return (retObj);
}

module.exports.sortParams = sortParams;