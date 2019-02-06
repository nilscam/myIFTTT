const router = require('express').Router();
const keys = require('../../config/keys');
const checkAuth = require('../../middleware/check-auth');

router.get('/', checkAuth, (req, res) => {
	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ Twitter: "OK" }));
});

module.exports = router;