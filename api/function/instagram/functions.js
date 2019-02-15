const User = require('../../models/user-model').User;
const request = require('request-promise');

var instaFunc = {
    getLatestPicture: function (req) {
        return User.findOne({ _id: req.userData.userId }).then((currentUser) => {
            //var access_token = currentUser._services._instagram.access_token;
            var access_token = "8406347569.228cd00.e45432e27d804307b4a21425aec145db";
            var url = 'https://api.instagram.com/v1/users/self/media/recent/?count=1&access_token=' + access_token;
            return request(url).then(body => {
                var result = JSON.parse(body);
                var objToReturn = {
                    type: "",
                    link: "",
                    location: null,
                    attribution: null,
                    downloadImage: "",
                };
                var obj = currentUser._services._instagram._triggers[0];
                if (obj.latestPostId == result['data'][0].id) {
                    objToReturn.type = result['data'][0].type;
                    objToReturn.link = result['data'][0].link;
                    objToReturn.location = result['data'][0].location;
                    objToReturn.attribution = result['data'][0].attribution;
                    objToReturn.downloadImage = result['data'][0].link + 'media/?size=m';
                };
                console.log(objToReturn);
                return objToReturn;
            }).then(value => {
                return value;
            });
        }).then(function (value) {
            return value;
        });
    },
};

module.exports = instaFunc;