var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodb$oy'; 
const fetchuser = (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  const token = req.header('auth-token');

  if (!token) {
    return res.status(401).json({ error: "Access denied: No token provided" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user; 
    next(); 
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(401).json({ error: "Access denied: Invalid token" });
  }
};

module.exports = fetchuser;
