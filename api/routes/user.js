const router = require('express').Router();
const Twitter = require('twitter');
const User = require('../models/user-model').User;
const Logger = require('../models/logger-model').Logger;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const request = require('request-promise')
const checkAuth = require('../middleware/check-auth');
const googleAuth = require('./auth/google-auth')
const twitterAuth = require('./auth/twitter-auth')
const instagramAuth = require('./auth/instagram-auth')
const validate = require('express-validation');
const Joi = require('joi');

router.use('/google', googleAuth)
router.use('/twitter', twitterAuth)
router.use('/instagram', instagramAuth)

var payloadLoginUser = {
    body: {
        email: Joi.string().required(),
        password: Joi.string().required(),
      }
}
router.post('/signup', validate(payloadLoginUser), (req, res, next) => {
    User.findOne({email: req.body.email, provider: ""}).then((currentUser) => {
        if (currentUser) {
            res.status(409).json({
                message: 'Username already exist'
            })
        } else {
            // Create User
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user
                      .save()
                      .then(result => {
                          const token = jwt.sign({
                              email: user.email,
                              userId: user._id,
                          }, keys.jwtSecret, {
                              expiresIn: "10d"
                          });
                          const logger = new Logger({
                              _id: user._id
                          })
                          logger.save().then(result => {
                            res.status(201).json({
                                message: 'User created',
                                token: token
                            });
                          })
                      })
                      .catch(err => {
                        res.status(500).json({
                            error: err
                        })
                      });
                }
            });
        }
    });
});

router.post('/login', validate(payloadLoginUser), (req, res, next) => {
    User.findOne({email: req.body.email, provider: ""}).then((currentUser) => {
        if (currentUser) {
            bcrypt.compare(req.body.password, currentUser.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email: currentUser.email,
                        userId: currentUser._id,
                    }, keys.jwtSecret, {
                        expiresIn: "10d"
                    });
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    })
                }
                return res.status(401).json({
                    message: "Auth failed"
                })
            })
        } else {
            return res.status(401).json({
                message: "Auth failed"
            })
        }
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    });
})


router.post('/update', checkAuth, validate(payloadLoginUser), (req, res) => {
    User.findOne({_id: req.userData.userId}).then((currentUser) => {
        if (currentUser) {
            if (!req.body.email || !req.body.password) {
                return res.status(401).send({error: "No email or password"});
            }
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    currentUser.email = req.body.email;
                    currentUser.password = hash;
                    currentUser
                      .save()
                      .then(result => {
                          const token = jwt.sign({
                              email: currentUser.email,
                              userId: currentUser._id,
                          }, keys.jwtSecret, {
                              expiresIn: "10d"
                          });
                          return res.status(200).json({
                              message: 'Update Info OK',
                              token: token
                          });
                      })
                      .catch(err => {
                        return res.status(500).json({
                            error: err
                        })
                      });
                }
            });
        } else {
            return res.status(500).send({error: "User not found"});
        }
    });
});

router.delete('/', checkAuth, (req, res, next) => {
    User.deleteOne({ _id: req.userData.userId})
      .exec()
      .then(result => {
        Logger.deleteOne({ _id: req.userData.userId})
        .exec()
        .then(result => {
            return res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err => {
            return res.status(500).json({
                error: err
            })
        });
      })
      .catch(err => {
        return res.status(500).json({
            error: err
        })
      });
})

router.get('/checkProfile', checkAuth, (req, res) => {
    User.findOne({_id: req.userData.userId}).then((currentUser) => {
        var authenticate = [
            instagram = {
                service: "instagram",
                isConnect: false,
                username: "",
                color: "e84393",
            },
            twitter = {
                service: "twitter",
                isConnect: false,
                username: "",
                color: "1da1f2",
            }]
        if (currentUser) {
            if (currentUser._services._instagram._id != 0) {
                authenticate[0].isConnect = true;
                authenticate[0].username = currentUser._services._instagram._username;
            }
            if (currentUser._services._twitter._id != 0) {
                authenticate[1].isConnect = true;
                authenticate[1].username = currentUser._services._twitter._username;
            }
            res.status(200).json({ authenticate });
        } else {
            res.status(401).send({error: "User not found"});
        }
	});
})

var payloadUnlinkUser = {
    body: {
        service: Joi.string().required(),
      }
}
router.post('/unlink', checkAuth, (req, res) => {
    User.findOne({_id: req.userData.userId}).then((currentUser) => {
        if (!currentUser) {
            return res.status(401).send({error: "User not found"});
        }
        var service = req.body.service;
        if (service == "twitter") {
            currentUser._services._twitter._id = 0;
            currentUser._services._twitter._token = "";
            currentUser._services._twitter._token_secret = "";
        } else if (service == "instagram") {
            currentUser._services._instagram._id = 0;
            currentUser._services._instagram._token = "";
        } else {
            return res.status(500).send({ error: "Invalid service name" });
        }
        currentUser.save();
        return res.status(200).send({ code: 200 });
	});
})

// router.post('/twitterConnect', checkAuth, (req, res) => {
//     User.findOne({_id: req.userData.userId}).then((currentUser) => {
//         if (currentUser) {
//             currentUser._services._twitter._token = req.body.token;
//             currentUser._services._twitter._token_secret = req.body.token_secret;
//             var client = new Twitter({
//                 consumer_key: keys.twitter.consumer_key,
//                 consumer_secret: keys.twitter.consumer_secret,
//                 access_token_key: currentUser._services._twitter._token,
//                 access_token_secret: currentUser._services._twitter._token_secret
//             });
//             client.get('account/verify_credentials', {}, function(error, profile, response) {
//                 if (!error) {
//                     currentUser._services._twitter._id = profile.id_str;
//                     currentUser._services._twitter._username = profile.screen_name;
//                     currentUser._services._twitter._photo = profile.profile_image_url;
//                     currentUser.save();
//                     res.status(200).send({error: null});
//                 } else {
//                     res.status(422).send({error: "Bad credential"});
//                 }
//               });
//         } else {
//             res.status(401).send({error: "User not found"});
//         }
// 	});
// });

// router.post('/instagramConnect', checkAuth, (req, res) => {
//     User.findOne({_id: req.userData.userId}).then((currentUser) => {
//         if (currentUser) {
//             currentUser._services._instagram._token = req.body.token;
//             request({
//                 url: 'https://api.instagram.com/v1/users/self/?access_token=' + req.body.token,
//             }, function (error, response, body) {
//                 if (error || response.statusCode !== 200) {
//                     res.status(422).send({error: "Bad credential"});
//                 } else {
//                     currentUser._services._instagram._id = body.data.id;
//                     currentUser._services._instagram._username = body.data.username;
//                     currentUser._services._instagram._photo = body.data.profile_picture;
//                     currentUser.save();
//                     res.status(200).send({error: null});
//                 };
//             })
//         } else {
//             res.status(401).send({error: "User not found"});
//         }
//     });
// });

module.exports = router;
