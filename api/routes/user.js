const router = require('express').Router();
const Twitter = require('twitter');
const User = require('../models/user-model').User;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const request = require('request-promise')
const checkAuth = require('../middleware/check-auth');
const googleAuth = require('./auth/google-auth')
const twitterAuth = require('./auth/twitter-auth')


router.use('/google', googleAuth)
router.use('/twitter', twitterAuth)

router.post('/signup', (req, res, next) => {
    User.findOne({username: req.body.username, provider: false}).then((currentUser) => {
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
                        username: req.body.username,
                        password: hash
                    });
                    user
                      .save()
                      .then(result => {
                          const token = jwt.sign({
                              username: user.username,
                              userId: user._id,
                          }, keys.jwtSecret, {
                              expiresIn: "10d"
                          });
                          res.status(201).json({
                              message: 'User created',
                              token: token
                          });
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

router.post('/login', (req, res, next) => {
    User.findOne({username: req.body.username}).then((currentUser) => {
        if (currentUser) {
            bcrypt.compare(req.body.password, currentUser.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        username: currentUser.username,
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

router.delete('/:userId', (req, res, next) => {
    User.remove({ _id: req.params.userId})
      .exec()
      .then(result => {
          res.status(200).json({
              message: "User deleted"
          });
      })
      .catch(err => {
        res.status(500).json({
            error: err
        })
      });
})

router.post('/twitterConnect', checkAuth, (req, res) => {
    User.findOne({_id: req.userData.userId}).then((currentUser) => {
        if (currentUser) {
            currentUser._services._twitter._token = req.body.token;
            currentUser._services._twitter._token_secret = req.body.token_secret;
            var client = new Twitter({
                consumer_key: keys.twitter.consumer_key,
                consumer_secret: keys.twitter.consumer_secret,
                access_token_key: currentUser._services._twitter._token,
                access_token_secret: currentUser._services._twitter._token_secret
            });
            client.get('account/verify_credentials', {}, function(error, profile, response) {
                if (!error) {
                    currentUser._services._twitter._id = profile.id_str;
                    currentUser._services._twitter._username = profile.screen_name;
                    currentUser._services._twitter._photo = profile.profile_image_url;
                    currentUser.save();
                    res.status(200).send({error: null});
                } else {
                    res.status(500).send({error: "User not found"});
                }
              });
        } else {
            res.status(500).send({error: "User not found"});
        }
	});
});

router.post('/instagram', checkAuth, (req, res) => {
    User.findOne({_id: req.userData.userId}).then((currentUser) => {
        if (currentUser) {
            currentUser._services._instagram._token = req.body.token;
            request({
                url: 'https://api.instagram.com/v1/users/self/?access_token=' + req.body.token,
            }, function (error, response, body) {
                if (error || response.statusCode !== 200) {
                    res.status(500).send({error: "Bad credential"});
                } else {
                    currentUser._services._instagram._id = body.data.id;
                    currentUser._services._instagram._username = body.data.username;
                    currentUser._services._instagram._photo = body.data.profile_picture;
                    currentUser.save();
                    res.status(200).send({error: null});
                };
            })
        } else {
            res.status(500).send({error: "User not found"});
        }
    });
});

module.exports = router;
