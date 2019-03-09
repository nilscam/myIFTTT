const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = (req, res, next) => {
    try {
        const token = req.query.token;
        const decoded = jwt.verify(token, keys.jwtSecret);
        req.userData = decoded;
        next();
    } catch(error) {
        return res.status(401).json({
            message: "Auth failed"
        })
    }
}