const jwt = require('jsonwebtoken');
const JWT_SECRET = 'yourJWTSecretKey'; // Yaha apna JWT secret key likhein

module.exports = function (req, res, next) {
    // Check if token exists in header
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Access denied. No token provided." });
    }

    try {
        // Verify token
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Invalid token." });
    }
};
