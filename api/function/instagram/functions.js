const User = require('../../models/user-model').User;
const request = require('request-promise');

var instaFunc = {
    checkNewPost: function(params) {
        User.findOne({ _id: params.params.id }).then((currentUser) => {
            if (currentUser) {
                //var access_token = currentUser._services._instagram.access_token;
                var access_token = "8406347569.228cd00.e45432e27d804307b4a21425aec145db";
                request({
                    url: 'https://api.instagram.com/v1/users/self/media/recent/?count=1&access_token=' + access_token,
                }, function (error, response, body) {
                    if (error || response.statusCode !== 200) {
                        res.send(JSON.stringify({ Instagram: "KO" }));
                    } else {
                        var result = JSON.parse(body);
                        if (currentUser._services._instagram._last_id != result['data'][0].id) {
                            currentUser._services._instagram._last_type = result['data'][0].type;
                            currentUser._services._instagram._last_id = result['data'][0].id;
                            currentUser._services._instagram._last_url = result['data'][0].link;
                            currentUser.save();
                            var paramsFromTrigger = {
                                instagram: {
                                    url: currentUser._services._instagram._last_url,
                                    type: currentUser._services._instagram._last_type,
                                }
                            }
                            params.paramsFromTrigger = paramsFromTrigger
                            tg.sendEvent(params.id, "checkNewPost", params);
                        }
                    };
                })
            };
        });
    }
};

module.exports = instaFunc;