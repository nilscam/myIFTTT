const User = require('../../models/user-model').User;
const request = require('request-promise');
const keys = require('../../config/keys');

var cryptocurrencyFunc = {
    checkValueCryptocurrency: function (params) {
        User.findOne({ _id: params.id }).then((currentUser) => {
            console.log(params);
            const requestOptions = {
                method: 'GET',
                uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
                qs: {
                    start: 1,
                    limit: 5000,
                    convert: 'EUR'
                },
                headers: {
                    'X-CMC_PRO_API_KEY': keys.cryptocurrency.API_KEY
                },
                json: true,
            };
            if (currentUser._services._cryptocurrency._current_value == "0") {
                currentUser._services._cryptocurrency._target_value = params.params.value;
                currentUser._services._cryptocurrency._crypto_name = params.params.name;
                currentUser._services._cryptocurrency._current_value = "empty";
                currentUser._services._cryptocurrency._active = "0"
                currentUser.save();
            } else {
                request(requestOptions).then(response => {
                    var i = 0;
                    while (i <= 1000) {
                        if (response.data[i].name == currentUser._services._cryptocurrency._crypto_name) {
                            var objTarget = response.data[i];
                            i = 1001;
                        }
                        i += 1;
                    }
                    currentUser._services._cryptocurrency._current_value = objTarget.quote['EUR'].price;
                    currentUser.save();
                    var first = Number(currentUser._services._cryptocurrency._target_value);
                    var second = Number(currentUser._services._cryptocurrency._current_value);
                    var paramToSend = {
                        cryptocurrency: {
                            title: currentUser._services._cryptocurrency._crypto_name,
                            description: 'Value of your Crypto is : ' + currentUser._services._cryptocurrency._current_value,
                        }
                    };
                    if (second > first) {
                        currentUser._services._cryptocurrency._active = "1"
                        tg.sendEvent(params.id, "checkValueCryptocurrency", paramToSend);
                    }
                });
            }
        });
    },
};

module.exports = cryptocurrencyFunc;