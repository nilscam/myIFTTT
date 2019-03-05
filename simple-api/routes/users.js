var express = require('express');
var router = express.Router();
const googleAuth = require('./auth/passport-google')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/success', (req, res) => res.send('Success'))
router.get('/failure', (req, res) => res.send('Failure'))

router.use('/google', googleAuth)

module.exports = router;
