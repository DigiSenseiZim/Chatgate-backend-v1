const jwt = require('jsonwebtoken');
const {validateToken} = require("../utils/tokenUtils");

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    const user = validateToken(token);
    if (!user) return res.status(401).json({ message: 'Invalid Token' });

    req.user = user; // Attach decoded user info to request
    next();
};

module.exports = authMiddleware;
