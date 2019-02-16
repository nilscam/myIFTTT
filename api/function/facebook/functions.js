const User = require('../../models/user-model').User;
const request = require('request-promise');

var facebookFunc = {
    postWall: function(req) {
        User.findOne({ _id: req.userData.userId }).then((value) => {
            var access_token = 'EAAGLYZBhlzAMBAG3LLCbJZCGlA8hABv3m1UFfWY79iRfMwsfSguZCO9louJkfscp9vCWyAczdeiFtaTZAS7LPP5cPycHz6ZBQTZBOG6LnVAnAfjQQhvdpDnDXU0nepKIr6sOCk8yGuhyxYmnefygOS565s06bCaXuMZBx6SiUQZAogZDZD';
            var url = 'https://graph.facebook.com/me?fields=id,name,birthday,email&access_token=' + access_token;

            request(url).then(body => {
                console.log(body);
            });
        });
    },
};

module.exports = facebookFunc;