require('dotenv').config(); // Load environment variables from .env file
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
    // Get token from the Authorization header (Bearer token format)
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).send({ error: "Access denied. No token provided." });
    }

    try {
        // Verify the token
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;  // Attach user data to the request object
        next();  // Move to the next middleware or route handler
    } catch (error) {
        res.status(401).send({ error: "Invalid token." });
    }
};
