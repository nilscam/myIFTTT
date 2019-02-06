const router = require('express').Router();
const User = require('../models/user-model').User;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res, next) => {
    User.findOne({username: req.body.username}).then((currentUser) => {
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
                          res.status(201).json({
                              message: 'User created'
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
                        expiresIn: "10h"
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

module.exports = router;