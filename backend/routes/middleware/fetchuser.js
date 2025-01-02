const jwt = require('jsonwebtoken');

const fetchuser = (req, res, next) => {
  // Get the token from the headers
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ error: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token using your secret
    req.user = data.user;  // Add the user data to the request object
    next();  // Proceed to the next middleware or route
  } catch (error) {
    return res.status(401).json({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
