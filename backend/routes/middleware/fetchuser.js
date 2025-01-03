const jwt = require('jsonwebtoken');

// Middleware to fetch the user based on JWT token
const fetchuser = (req, res, next) => {
  // Get the token from the header (ensure it's named 'auth-token' and handle case insensitivity)
  const token = req.header('auth-token') || req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: "Authentication token is missing. Please log in to access this resource." });
  }

  try {
    // Ensure that JWT_SECRET is available
    const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret_key";
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }

    // Verify the token using the JWT secret
    const data = jwt.verify(token, jwtSecret);

    // Attach the user data (user ID) to the request object
    req.user = data.user;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error verifying token:', error.message);

    // Specific error handling
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: "Invalid authentication token. Please log in again." });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Authentication token has expired. Please log in again." });
    }

    // Generic error handler
    return res.status(500).json({ error: "Something went wrong while verifying the token." });
  }
};

module.exports = fetchuser;
