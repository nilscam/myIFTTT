const router = require('express').Router();
const checkAuth = require('../../middleware/check-auth');
const request = require('request');
const User = require('../../models/user-model').User;

router.get('/', checkAuth, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ Mailer: "OK" }));
});

module.exports = router;