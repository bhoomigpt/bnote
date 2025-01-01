const User = require('../models/User');
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require('./middleware/fetchuser')

// Replace with a strong secret key for JWT
const JWT_SECRET = "your_secure_jwt_secret_key";

// Middleware for fetching the authenticated user
const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ error: "Access denied: No token provided" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Access denied: Invalid token" });
  }
};

// Route 1: Create a User using: POST "/api/auth/createUser"
router.post(
  '/createUser',
  [
    body('name', 'Name must be at least 3 characters long').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "A user with this email already exists" });
      }

      // Securely hash the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create the user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      // Generate JWT token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({ message: "User created successfully", authToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Route 2: Authenticate a User using: POST "/api/auth/login"
router.post(
  '/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be empty').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      // Match passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      // Generate JWT token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET, { expiresIn: '1h' });

      res.json({ authToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Route 3: Get logged-in user details using: GET "/api/auth/getUser"
router.get('/getUser', fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
