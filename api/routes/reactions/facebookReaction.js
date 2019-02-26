const router = require('express').Router();
const User = require('../../models/user-model').User;
const checkAuth = require('../../middleware/check-auth');
// const addReaction = require('./twitterReaction').addReaction;
const request = require('request-promise');

const func = require('../../function/facebook/functions');

router.get('/test', checkAuth, (req, res) => {
    func.postWall(req);
    res.send(JSON.stringify({ Facebook: "OK" }));
});

router.get('/access', (req, res) => {
    console.log('LOL =');
    console.log(req.body);
    console.log(req.query);
    console.log(req);
    res.send('OK');
});

router.get('/', checkAuth, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ Facebook: "OK" }));
});

module.exports = router;