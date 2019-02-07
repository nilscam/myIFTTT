const router = require('express').Router();
const checkAuth = require('../../middleware/check-auth');

router.get('/', checkAuth, (req, res) => {
	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ Instagram: "OK" }));
});

module.exports = router;