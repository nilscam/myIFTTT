const User = require('../../models/user-model').User;
const request = require('request-promise');
const keys = require('../../config/keys');

var newYorkTimeFunc = {
    checkLastNewYorkTimes: function (params) {
        User.findOne({ _id: params.id }).then((currentUser) => {
            if (currentUser) {
                request({
                    url: 'https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=' + keys.newYorkTimes.API_KEY,
                }, function (error, response, body) {
                    var result = JSON.parse(body);
                    if (result.results != undefined) {
                        var multi = result.results[0].multimedia;
                        if (currentUser._services._newYorkTimes._date == "0") {
                            currentUser._services._newYorkTimes._section = result.results[0].section;
                            currentUser._services._newYorkTimes._title = result.results[0].title;
                            currentUser._services._newYorkTimes._byline = result.results[0].byline;
                            currentUser._services._newYorkTimes._item_type = result.results[0].item_type;
                            currentUser._services._newYorkTimes._description = result.results[0].abstract;
                            currentUser._services._newYorkTimes._multimedia = result.results[0].multimedia[multi.length - 1].url;
                            currentUser._services._newYorkTimes._date = result.results[0].published_date;
                            currentUser.save();
                        } else {
                            if (currentUser._services._newYorkTimes._date != result.results[0].published_date) {
                                currentUser._services._newYorkTimes._section = result.results[0].section;
                                currentUser._services._newYorkTimes._title = result.results[0].title;
                                currentUser._services._newYorkTimes._byline = result.results[0].byline;
                                currentUser._services._newYorkTimes._item_type = result.results[0].item_type;
                                currentUser._services._newYorkTimes._description = result.results[0].abstract;
                                currentUser._services._newYorkTimes._multimedia = result.results[0].multimedia[multi.length - 1].url;
                                currentUser._services._newYorkTimes._date = result.results[0].published_date;
                                currentUser.save();
                                var paramToSend = {
                                    newYorkTimes: {
                                        section: currentUser._services._newYorkTimes._section,
                                        title: currentUser._services._newYorkTimes._title,
                                        byline: currentUser._services._newYorkTimes._byline,
                                        item_type: currentUser._services._newYorkTimes._item_type,
                                        description: currentUser._services._newYorkTimes._description,
                                        multimedia: currentUser._services._newYorkTimes._multimedia,
                                    }
                                }
                                tg.sendEvent(params.id, "checkLastNewYorkTimes", paramToSend);
                            }
                        }
                    }
                })
            };
        });
    },
    //    The possible section value are: 
    //arts, automobiles, books, business, fashion, food, health, home, insider, magazine, movies, national, nyregion, obituaries, opinion, politics, realestate, science, sports, sundayreview, technology, theater, tmagazine, travel, upshot, and world.
    checkTopNewYorkTimes: function (params) {
        User.findOne({ _id: params.id }).then((currentUser) => {
            if (currentUser) {
                request({
                    url: 'https://api.nytimes.com/svc/topstories/v2/' + currentUser._services._newYorkTimes._theme + '.json?api-key=' + keys.newYorkTimes.API_KEY,
                }, function (error, response, body) {
                    var result = JSON.parse(body);
                    var multi = result.results[0].multimedia
                    if (currentUser._services._newYorkTimes._date == "0") {
                        currentUser._services._newYorkTimes._section = result.results[0].section;
                        currentUser._services._newYorkTimes._title = result.results[0].title;
                        currentUser._services._newYorkTimes._byline = result.results[0].byline;
                        currentUser._services._newYorkTimes._item_type = result.results[0].item_type;
                        currentUser._services._newYorkTimes._description = result.results[0].abstract;
                        currentUser._services._newYorkTimes._multimedia = result.results[0].multimedia[multi.length - 1].url;
                        currentUser._services._newYorkTimes._date = result.results[0].published_date;
                        currentUser.save();
                    } else {
                        if (currentUser._services._newYorkTimes._date != result.results[0].published_date) {
                            currentUser._services._newYorkTimes._section = result.results[0].section;
                            currentUser._services._newYorkTimes._title = result.results[0].title;
                            currentUser._services._newYorkTimes._byline = result.results[0].byline;
                            currentUser._services._newYorkTimes._item_type = result.results[0].item_type;
                            currentUser._services._newYorkTimes._description = result.results[0].abstract;
                            currentUser._services._newYorkTimes._multimedia = result.results[0].multimedia[multi.length - 1].url;
                            currentUser._services._newYorkTimes._date = result.results[0].published_date;
                            currentUser.save();
                            var paramToSend = {
                                newYorkTimes: {
                                    section: currentUser._services._newYorkTimes._section,
                                    title: currentUser._services._newYorkTimes._title,
                                    byline: currentUser._services._newYorkTimes._byline,
                                    item_type: currentUser._services._newYorkTimes._item_type,
                                    description: currentUser._services._newYorkTimes._description,
                                    multimedia: currentUser._services._newYorkTimes._multimedia,
                                }
                            }
                            tg.sendEvent(params.id, "checkTopNewYorkTimes", paramToSend);
                        }
                    }
                })
            };
        });
    },

};

module.exports = newYorkTimeFunc;